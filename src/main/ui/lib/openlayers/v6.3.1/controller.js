var targetColor = {
		"worker" : "#ff3636",
		"vehicle" : "#2ca6e0",
		"unmapping" : "#48ce32",
		"worker_highlight" : "#ff2565",
		"vehicle_highlight" : "#2a78df",
		"unmapping_highlight" : "#26af47"
};
var geoJson = new ol.format.GeoJSON({
		    		dataProjection : 'EPSG:4326',
		    		featureProjection : 'EPSG:900913'
			    });
function loadOlMap(e) {
	if (UT.isEmpty(e.lat) && UT.isEmpty(e.lon)) { // 중심점 기본값 설정
		e.lat = 37.56682;
	    e.lon = 126.97865;
	}
	
	var defaultLayers = ["vector","satellite","hybrid"];
	
	var layers = [];
		
	for(var layer in defaultLayers){
		layers.push(createDefaultLayer(defaultLayers[layer]));
	}
	
	var center = ol.proj.fromLonLat([e.lon, e.lat]);
	
	var view = new ol.View({
	    center: center,
	    minZoom: 6,
	    zoom: 18,
	    rotation : 0,
	    extent : [12952618.137710338, 3708627.913909736, 15591835.850340905, 5433047.272023312]
	});
	
	var div = e.querySelector('.map');
	var id = e.dataHost ? e.dataHost.is : e.is;
	div.id = id + '-map'; // 지도 영역 생성
	
	var map = new ol.Map({
		controls: ol.control.defaults().extend([
			new ol.control.ScaleLine({
			      units: 'metric',
			      steps: 4,
			      text: true,
			      minWidth: 100
			})
	    ]),
		target: div.id,
		layers: layers,
		view: view,
		interactions: ol.interaction.defaults().extend([
			new ol.interaction.DragRotateAndZoom()
	    ])
	});
	
	map.set('center', center);
	
	return map;
}

function createVectorSourceLayer(map, id) {
	var source = new ol.source.Vector({});

	var layer = new ol.layer.Vector({
		source: source,
		zIndex:1
	});

	map.addLayer(layer);
	map.set(id+'_layer', layer);
	map.set(id+'_source', source);
}

function createDefaultLayer(name) {
	var layer = new ol.layer.Tile({
	    source : new ol.source.XYZ({
			url: conf.ol.vworld[name]
		}),
		className :name,
		visible : (name == "vector")
	});
	
	return layer;
}

function setFeatureStyle(feature, isShowLine, isShowBackground){
	var style = feature.getStyle();
	var fillColor = hexToRGB(feature.get('fill'), (isShowBackground)?'0.2':'0.0');
	var strokeColor = hexToRGB(feature.get('stroke'), (isShowLine)?'1.0':'0.0');
	var newStyle = new ol.style.Style({
       fill: new ol.style.Fill({color: fillColor}),
       stroke: new ol.style.Stroke({color: strokeColor, width:2})
    });
	feature.setStyle(newStyle);
}

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

function focusTarget(map, data, targetCnt){		// 타겟 포커스 처리
	map.getTargetElement().style.cursor = 'pointer';
	
	if(UT.isEmpty(map.get('overlay_layer'))){
		createVectorSourceLayer(map, 'overlay');
	}
	
	map.get('overlay_source').clear();
	map.removeOverlay(map.getOverlayById('targetPopup'));

	var source = map.get('overlay_source');
	
	var feature = data.feature.clone();
	if(feature.getStyle().getImage().getSrc().indexOf('repository') < 0 && feature.getStyle().getImage().getSrc().indexOf('fireman') < 0 ){
		feature.setStyle(new ol.style.Style({
      		image: new ol.style.Icon({
      		    crossOrigin: 'anonymous',
      		    scale :0.5,
    		    anchor : [22.5,45],
    		    anchorXUnits: 'pixels',
    		    anchorYUnits: 'pixels',
      		    src: './ui/lib/openlayers/img/'+data.targetType+'_over.png'
      		  })
	   		})
   		);
	}
	source.addFeature(feature);
	
		if(UT.isNotEmpty(feature.get('routeFeature'))){
			var routeFeature = feature.get('routeFeature').clone();

			var color = targetColor[data.targetType+'_highlight'];
		
			var overlayStyle = [
					new ol.style.Style({stroke: new ol.style.Stroke({ color: "#ffffff", width: 10})}),
					new ol.style.Style({stroke: new ol.style.Stroke({ color: color, width: 6})}),
					new ol.style.Style({stroke: new ol.style.Stroke({ color: '#ffffff', width: 1, lineDash: [4,4]})})
				];

   	 	routeFeature.setStyle(overlayStyle);
		source.addFeature(routeFeature);
   	}
	

	var overOne = false;
	// targetCnt 가 1보다 크면
	//  아래에 '외 몇 건'을 붙여준다.
	if(UT.isNotEmpty(targetCnt) && targetCnt > 1){
		overOne = true;
	}
//	<div id="arrow" style="top : ${(overOne)?'61px;':'42px;'}"></div>
//	<div id="text" style="height : ${(overOne)?'56px;':'37px;'}">
	var innerHtml = "\n\t\t<div id=\"arrow\"></div>\n\t\t<div id=\"text\">\n\t\t\t"
		.concat(data.targetType == 'unmapping' ? '[미교부 앱] <br/>' + data.targetName : data.vendorName + '[' + data.targetJobName + '] <br/>' + data.targetName, "\n\t\t\t")
		.concat(overOne ? ' 외 ' + (targetCnt - 1) + '건' : '', "\n\t\t</div>\n\t");
	
  	var popup = document.createElement("div");
	popup.classList.add('targetPopup');
	popup.innerHTML=innerHtml;

	var overlay = new ol.Overlay({
		id : 'targetPopup',
		element : popup,
		positioning : 'bottom-center',
		offset : [0,-30],
		position : data.feature.getGeometry().getCoordinates()
	});
	
	map.addOverlay(overlay);
}

var seletedListenerKey;
function clearSelectTarget(map){
	map.get('selected_source').clear();
//	map.get('history_source').clear();
//	map.get('overlay_source').clear();
	map.removeOverlay(map.getOverlayById('targetPopup'));
	ol.Observable.unByKey(seletedListenerKey);
}

function selectTarget(map, targetFeature){		// 타겟 셀렉트 처리
	clearSelectTarget(map);

	var source = map.get('selected_source');
	var feature = targetFeature.clone();
	var data = feature.get('targetInfo');
//	if(feature.getStyle()[0].getImage().getSrc().indexOf('repository') < 0 && feature.getStyle()[0].getImage().getSrc().indexOf('fireman') < 0 ){
//		feature.setStyle(targetFocusStyle(feature));
//	}
	feature.setId(targetFeature.getId());
	source.addFeature(feature);
	
	flash('selected', feature, map);
	
	setTimeout(function(){
		ol.Observable.unByKey(seletedListenerKey);
		map.get('selected_source').clear();
	},4500);
		
}

var duration = 1500;
function flash(layer, feature, map) {
  	var start = new Date().getTime();
  	//seletedListenerKey = map.get('selected_layer').on('postrender', animate);
  	seletedListenerKey = map.get(layer+'_layer').on('postrender', animate);
	function animate(event) {
        var vectorContext = ol.render.getVectorContext(event);
        var frameState = event.frameState;
        var flashGeom = feature.getGeometry().clone();
        var elapsed = frameState.time - start;
        var elapsedRatio = elapsed / duration;
        var radius = ol.easing.easeOut(elapsedRatio) * 15 + 2;		// 원크기
        var opacity = ol.easing.easeOut(1 - elapsedRatio);
        var data = feature.get('targetInfo');
        
        var style =
        	new ol.style.Style({
        		image: new ol.style.Circle({
        			radius: radius,
//        			fill: new ol.style.Fill({
//        				color: 'rgba(255, 255, 255, ' + opacity + ')',
//        			}),
        			stroke: new ol.style.Stroke({
        				color : hexToRGB(targetColor[data.targetType+"_highlight"], opacity),
        				width: 2 + opacity
        			})
        		}),
        	});

        vectorContext.setStyle(style);
        vectorContext.drawGeometry(flashGeom);
//        vectorContext.setStyle(targetFocusStyle(feature));
        vectorContext.drawGeometry(feature.getGeometry());
        
        if(data.isMappingYn == 'N'){	//unmapping 처리
//			vectorContext.setStyle(unmappingStyle);
			vectorContext.drawGeometry(feature.getGeometry());
		}
		if(data.isMobileYn == 'Y'){		//moblie 처리
//			vectorContext.setStyle(mobileStyle);
			vectorContext.drawGeometry(feature.getGeometry());
		}
		if(data.isNoSignalYn == 'Y'){	//delay 처리
//			vectorContext.setStyle(delayStyle);
			vectorContext.drawGeometry(feature.getGeometry());
		}
        if (elapsed > duration) {
        	ol.Observable.unByKey(seletedListenerKey);
        	if(map.get(layer+'_source').hasFeature(feature)){
        		flash(layer, feature, map);
        		map.render();
        	}
        	return;
        }

        map.render();
    }
}