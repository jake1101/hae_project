var maxZoomLevel = 7;
var isLoadEnd = false;
var projection4326 = new OpenLayers.Projection("EPSG:4326");
var projection900913 = new OpenLayers.Projection("EPSG:900913");
var areaMarkerColor = {
  site: "#3c3c3c",
  anchor: "#3c3c3c",
  area: "#3c3c3c",
  building: "#3c3c3c"
};
var vertexStyle = {
  strokeColor: "#ff6000",
  fillColor: "#fff",
  strokeOpacity: 0.6,
  strokeWidth: 3,
  pointRadius: 5,
  graphicName: "circle"
};
var selectPolygonStyle = {
  strokeColor: "#ff6000",
  fillColor: "#ff6000",
  strokeOpacity: 0.6,
  strokeWidth: 3,
  fillOpacity: 0.3
};
var styleMap = new OpenLayers.StyleMap({
  "default": selectPolygonStyle,
  "vertex": vertexStyle,
  "temporary": selectPolygonStyle,
  "select": selectPolygonStyle
}, {
  extendDefault: false
});

function loadMap(e) {
  if (UT.isEmpty(e.lat) && UT.isEmpty(e.lon)) {
    e.lat = 37.56682;
    e.lon = 126.97865;
  }

  ; //배경지도 레이어 생성

  var baseVectorLayer = createLayer("vector", conf.map.vworld.vector);
  var baseSatelliteLayer = createLayer("satellite", conf.map.vworld.satellite);
  var hybridLayer = createLayer("hybrid", conf.map.vworld.hybrid);
  hybridLayer.isBaseLayer = false;
  hybridLayer.setVisibility(false); // 지도 중심점 생성

  var point = new OpenLayers.LonLat(e.lon, e.lat);
  point.transform(projection4326, projection900913); // 좌표 변환

  var div = e.querySelector('.map');
  var id = e.dataHost ? e.dataHost.is : e.is;
  div.id = id + '-map'; // 지도 영역 생성

  var map = new OpenLayers.Map(div.id, {
    controls: [new OpenLayers.Control.Attribution(), new OpenLayers.Control.Navigation({
      dragPanOptions: {
        enableKinetic: true
      }
    })],
    projection: projection900913,
    restrictedExtent: new OpenLayers.Bounds(13241653.254178, 3769413.870245, 15144629.5101, 4916580.790589),
    target: point,
    baseVectorLayer: baseVectorLayer,
    baseSatelliteLayer: baseSatelliteLayer,
    hybridLayer: hybridLayer,
    wmsLayer: null,
    viewLayer: null,
    dangerLayer: null,
    drawLayer: null,
    drawControl: null,
    drawReqularControl: null
  });
  map.events.register("moveend", this, function () {
    if (map.getZoom() < maxZoomLevel) {
      map.zoomTo(maxZoomLevel);
    }
  });
  map.addLayer(baseVectorLayer);
  map.addLayer(baseSatelliteLayer);
  map.addLayer(hybridLayer);
  map.setCenter(point, 17);
  new OlOverviewMarker(map, getPathUpper(document.URL));
  return map;
}

function moveToTarget(map) {
  if (map.target.CLASS_NAME == 'OpenLayers.Bounds') {
    map.zoomToExtent(map.target);
  } else {
    map.setCenter(map.target, 17);
  }
}

function createWmsLayer(e) {
  var srid = e.wmsInfo.SRS;
  var wmsLayer = new OpenLayers.Layer.WMS(name, e.wmsInfo.layerUrl, {
    "LAYERS": e.wmsInfo.LAYERS,
    "exceptions": 'application/vnd.ogc.se_inimage',
    "format": 'image/png',
    "TRANSPARENT": true
  }, {
    opacity: 1,
    // 투명도
    buffer: 0,
    displayOutsideMaxExtent: false,
    isBaseLayer: false,
    yx: {
      srid: true
    }
  });
  wmsLayer.setVisibility(false);
  e.map.addLayer(wmsLayer);
  e.map.wmsLayer = wmsLayer;
}

function createViewLayer(e) {
  var viewLayer = new OpenLayers.Layer.Vector("areaLayer");
  e.map.addLayer(viewLayer);
  e.map.viewLayer = viewLayer;
  e.areaList.forEach(function (object) {
    var feature = geoJsonToFeature(object.geoJson);
    feature.attributes.id = object.id;
    feature.attributes.areaType = object.type;
    feature.style = {
      strokeColor: object.adjunction.lineColor,
      fillColor: object.adjunction.backgroundColor,
      display: 'none'
    };
    viewLayer.addFeatures(feature);

    if (e.showViewMarker) {
      var marker = addAreaMarker(viewLayer, object.name, object.pinCircle.lon, object.pinCircle.lat, object.type);
      marker.attributes.id = object.id;
      marker.attributes.name = object.name;
      marker.attributes.areaType = object.type;
    }

    if (e.showViewLabel && !e.showViewMarker) {
      addLabelMarker(viewLayer, object);
    }
  });
  e.map.target = viewLayer.getDataExtent();
  e.map.zoomToExtent(viewLayer.getDataExtent());
}

function createDangerLayer(e) {
  var dangerStyle = new OpenLayers.Style({
    pointRadius: 3,
    fillColor: "#ff0000",
    fillOpacity: 0.2,
    pattern: "hash-45",
    patternColor: "#ff0000",
    stroke: true,
    strokeWidth: 1,
    strokeColor: "#ff0000"
  });
  var dangerLayer = new OpenLayers.Layer.Vector("dangerLayer", {
    visibility: false,
    rendererOptions: {
      zIndexing: true
    },
    styleMap: new OpenLayers.StyleMap({
      "default": dangerStyle,
      "select": {
        fillColor: "red",
        zindex: 1
      }
    })
  });
  e.map.addLayer(dangerLayer);
  e.map.dangerLayer = dangerLayer;
  e.dangerList.forEach(function (object) {
    var feature = geoJsonToFeature(object.geoJson);
    feature.attributes.id = object.id;
    feature.attributes.areaType = "danger";
    dangerLayer.addFeatures(feature);
  });
}

function createDrawLayer(e) {
  var drawLayer = new OpenLayers.Layer.Vector("drawLayer");
  e.map.addLayer(drawLayer);
  e.map.drawLayer = drawLayer;
  var drawControl = new OpenLayers.Control.DrawFeature(drawLayer, OpenLayers.Handler.Polygon);
  var drawReqularControl = new OpenLayers.Control.DrawFeature(drawLayer, OpenLayers.Handler.RegularPolygon, {});
  drawReqularControl.handler.sides = 50;
  e.map.addControl(drawControl);
  e.map.addControl(drawReqularControl);
  e.map.drawControl = drawControl;
  e.map.drawReqularControl = drawReqularControl;
}

function createLayer(name, path) {
  var layer = new OpenLayers.Layer.XYZ(name, path, {
    attribution: "",
    sphericalMercator: true,
    wrapDateLine: true,
    eventListeners: {
      "loadstart": function loadstart() {
        isLoadEnd = false;
      },
      "loadend": function loadend() {
        isLoadEnd = true;
      }
    }
  });
  return layer;
}

function addPositionMarker(layer, x, y) {
  var point = new OpenLayers.Geometry.Point(x, y);
  point.transform(projection4326, projection900913);
  var markerStyle = {
    fillOpacity: 1,
    strokeOpacity: 0,
    graphicOpacity: 1,
    graphicWidth: 24,
    graphicHeight: 30,
    backgroundGraphicZIndex: 998,
    graphicYOffset :-30,
    externalGraphic: "./ui/lib/openlayers/img/marker.png",
    display: "show"
  };
  var marker = new OpenLayers.Feature.Vector(point, {
    type: "position"
  }, markerStyle);
  layer.addFeatures([marker], {});
}

function addLabelMarker(layer, object) {
  var point = new OpenLayers.Geometry.Point(object.pinCircle.lon, object.pinCircle.lat);
  point.transform(projection4326, projection900913);
  var markerStyle = {
    label: object.name,
    fontSize: "12px",
    fontWeight: 500,
    fontFamily: 'Noto Sans KR',
    fontColor: "#6c6c6c",
    labelSelect: false,
    graphicWidth: 33,
    graphicHeight: 27,
    externalGraphic: "./ui/lib/openlayers/img/background.png",
    display: "none"
  };
  var marker = new OpenLayers.Feature.Vector(point, {
    type: "marker"
  }, markerStyle);
  marker.attributes.id = object.id;
  marker.attributes.areaType = object.type;
  layer.addFeatures([marker], {});
}

function addAreaMarker(layer, name, x, y, areaType, display) {
  var point = new OpenLayers.Geometry.Point(x, y);
  point.transform(projection4326, projection900913);
  var areaMarkerStyle = {
    label: name,
    fontSize: "12px",
    fontWeight: 500,
    fontFamily: 'Noto Sans KR',
    fontColor: areaMarkerColor[areaType],
    labelSelect: false,
    //labelOutlineColor : '#ffffff',
    //labelOutlineWidth : 2,
    labelYOffset: -14,
    graphicWidth: 25,
    graphicHeight: 25,
    graphicYOffset: -18,
    graphicZIndex: 999,
    externalGraphic: "./ui/lib/openlayers/img/" + areaType + ".png",
    backgroundWidth: 42,
    backgroundHeight: 52,
    //backgroundGraphic : "./ui/lib/openlayers/img/"+areaType+"_square.svg",
    backgroundGraphicZIndex: 999,
    display: display ? 'show' : 'none'
  };
  var marker = new OpenLayers.Feature.Vector(point, {
    type: "marker"
  }, areaMarkerStyle);
  layer.addFeatures([marker], {});

  if (layer.renderer.textRoot.getBBox().width + 10 > areaMarkerStyle.backgroundWidth) {
    areaMarkerStyle.backgroundWidth = layer.renderer.textRoot.getBBox().width + 10;
  }

  return marker;
}

function addEditControl(map, layer) {
  var virtual = {
    strokeColor: "#ff6000",
    fillColor: "#ff6000",
    strokeOpacity: 0.6,
    fillOpacity: 0.5,
    strokeWidth: 3,
    pointRadius: 4,
    graphicName: "circle"
  };
  var dragHandleStyle = {
    fillOpacity: 0,
    strokeOpacity: 0,
    graphicOpacity: 1,
    graphicWidth: 40,
    graphicHeight: 40,
    graphicXOffset: 2,
    backgroundGraphicZIndex: 999,
    externalGraphic: "./ui/lib/openlayers/img/drag.png",
    display: "show"
  };
  var editControl = new OpenLayers.Control.ModifyFeature(layer, {
    clickout: false,
    bySegment: true,
    virtualStyle: virtual,
    createVertices: true,
    vertexRenderIntent: "vertex",
    collectDragHandle: function collectDragHandle() {
      var geometry = this.feature.geometry;
      var components = geometry.components[0].components;
      var originGeometry = new OpenLayers.Geometry.Point(components[components.length - 2].x + 50, components[components.length - 2].y);

      if (this.map.getZoom() < 14) {
        dragHandleStyle.display = "none";
      }

      var origin = new OpenLayers.Feature.Vector(originGeometry, {
        type: "dragIcon"
      }, dragHandleStyle);

      originGeometry.move = function (x, y) {
        OpenLayers.Geometry.Point.prototype.move.call(this, x, y);
        geometry.move(x, y);
      };

      origin._sketch = true;
      this.dragHandle = origin;
      this.layer.addFeatures([this.dragHandle], {
        silent: true
      });
      this.layer.events.register("moveend", this.layer, function (e) {
        var features = this.getFeaturesByAttribute("type", "dragIcon");

        if (features.length > 0) {
          if (e.object.map.getZoom() < 14 && features[0].style.display == "show") {
            features[0].style.display = "none";
            this.redraw();
          } else if (e.object.map.getZoom() >= 14 && features[0].style.display == "none") {
            features[0].style.display = "show";
            this.redraw();
          }
        }
      });
    },
    mode: OpenLayers.Control.ModifyFeature.DRAG | OpenLayers.Control.ModifyFeature.RESHAPE,
    dragComplete: function dragComplete(e) {
      if (e.layer.selectedFeatures.length > 0) {
        var features = e.layer.selectedFeatures[0];

        if (features.attributes["type"] != "marker") {
          this.selectFeature(features);
        }
      }

      map.target = layer.getDataExtent();
    }
  });
  map.addControl(editControl);
  editControl.activate();
  return editControl;
}

function geoJsonToFeature(geoJson) {
  var geojson_format = new OpenLayers.Format.GeoJSON();
  var feature = geojson_format.read(geoJson);
  feature[0].geometry.transform(projection4326, projection900913);
  feature[0].attributes = {
    "type": "polygon"
  };
  return feature[0];
}

function featureToPolygonArr(oriFeature) {
  var feature = oriFeature.clone();
  var polygon = new Array();
  var verteices = feature.geometry.getVertices();

  for (var i in verteices) {
    var json = {};
    json.lat = verteices[i].y;
    json.lon = verteices[i].x;
    polygon.push(json);
  }

  return polygon;
}