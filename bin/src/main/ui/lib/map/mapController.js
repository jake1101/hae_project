// 변수 선언
var map = null;
var mapCode = "D"; // $.cookie($fk.systemProperty.getUserInfo().id) == null ? "D" : $.cookie($fk.systemProperty.getUserInfo().id);
var drawManager = null;
var drawToolbox = null;
var drawData = {"marker":[],"arrow":[],"polyline":[],"rectangle":[],"circle":[],"ellipse":[],"polygon":[]};

var popup, Popup;
var timer;
var markers = [];

// Level
function getLevel(){
	var mapLevel;
	if(mapCode == "D"){ // Daum Map
		mapLevel = map.getLevel();
	}else if(mapCode == "G"){ // Google Map
		mapLevel = map.getZoom();
	}
	return mapLevel;
}

// Center Get Latlng
function getCenter(){
	var mapCenter;
	if(mapCode == "D"){ // Daum Map
		var center = map.getCenter();
		mapCenter = {lat:center.getLat(),lng:center.getLng()};
	}else if(mapCode == "G"){ // Google Map
		var center = map.getCenter();
		mapCenter = {lat:center.lat(),lng:center.lng()};
	}
	return mapCenter;
}

// LatLng 변환
function getLatLng(lat, lng){
	var latLng;
	if(mapCode == "D"){ // Daum Map
		latLng = new daum.maps.LatLng(lat, lng);
	}else if(mapCode == "G"){ // Google Map
		latLng = new google.maps.LatLng(lat, lng);
	}
	return latLng;
}

// ImageSize 변환
function getImageSize(w, h){
	var imageSize;
	if(mapCode == "D"){ // Daum Map
		imageSize = new daum.maps.Size(w, h);
	}else if(mapCode == "G"){ // Google Map
		imageSize = new google.maps.Size(w, h);
	}
	return imageSize;
}

//Center Set Position
function setPosition(item,lat,lng){
	if(mapCode == "D"){ // Daum Map
		item.setPosition(new daum.maps.LatLng(lat, lng));
	}else if(mapCode == "G"){ // Google Map
		item.setPosition(new google.maps.LatLng(lat, lng));
	}
}

// 좌표로 맵 이동
function setMapCenter(lat,lng){
	if(mapCode == "D"){ // Daum Map
		map.setCenter(new daum.maps.LatLng(lat, lng));
	}else if(mapCode == "G"){ // Google Map
		map.setCenter(new google.maps.LatLng(lat, lng));
	}
}

// draw event Latlng
function getEventLatlng(e, type){
	var latLng;
	if(mapCode == "D"){ // Daum Map
		if(type == "draw"){
			var coords = new daum.maps.Coords(e.coords.ib, e.coords.jb);
			latLng = {lat:coords.toLatLng().getLat(),lng:coords.toLatLng().getLng()}; // (33.45067375096625, 126.5706721005115)
		}else if(type == "marker"){
    		latLng = {lat:e.getPosition().getLat(),lng:e.getPosition().getLng()};
		}
	}else if(mapCode == "G"){ // Google Map
		if(type == "draw"){
			latLng = e.overlay.getCenter(); // (33.45067375096625, 126.5706721005115)
			latLng = {lat:e.overlay.getCenter().lat(),lng:e.overlay.getCenter().lng()}; // (33.45067375096625, 126.5706721005115)
		}else if(type == "marker"){
			latLng = {lat:e.latLng.lat(),lng:e.latLng.lng()}; // (33.45067375096625, 126.5706721005115)
		}
	}
	return latLng;
}

// 이벤트 리스너 등록
function addListener(item, type, fc, option){
	if(mapCode == "D"){ // Daum Map
		if(option == "draw"){
			drawManager.addListener(type, fc);
		}else{
			daum.maps.event.addListener(item, type, fc);
		}
	}else if(mapCode == "G"){ // Google Map
		if(option == "draw"){
			type = "overlaycomplete";
		}
		google.maps.event.addListener(item, type, fc);
	}
}

// Default Marker
function addDefaultMarker(marker, option){
	if(option.draggable ==false){
		if(mapCode == "D"){ // Daum Map
			marker = new daum.maps.Marker({
		        position: getLatLng(option.lat,option.lng),
		        map: map,
		        draggable: false
		    });
		}else if(mapCode == "G"){ // Google Map
			marker = new google.maps.Marker({
				position: {lat:option.lat, lng:option.lng},
				map: map,
				draggable: false
			});
		}
	}else{
		if(mapCode == "D"){ // Daum Map
			marker = new daum.maps.Marker({
		        position: getLatLng(option.lat,option.lng),
		        map: map,
		        draggable: true
		    });
		}else if(mapCode == "G"){ // Google Map
			marker = new google.maps.Marker({
				position: {lat:option.lat, lng:option.lng},
				map: map,
				draggable: true
			});
		}
	}
	return marker;
}

// Marker 설정하기
function addCustomeMarker(marker, imageOption){
	//console.log("imageOption > " + typeof imageOption + " / " + JSON.stringify(imageOption));
	var imageSize = getImageSize(imageOption.width, imageOption.height);
	if(mapCode == "D"){ // Daum Map
		var markerImage = new daum.maps.MarkerImage(imageOption.url, imageSize),
	    	markerPosition = getLatLng(imageOption.lat,imageOption.lng);
		
		marker = new daum.maps.Marker({
	        position: markerPosition,
	        image: markerImage,
	        map: map,
            zIndex: imageOption.zIndex
	    });
	}else if(mapCode == "G"){ // Google Map
		console.log("imageSize >> "+imageSize);
		var image = {
				url:imageOption.url,
				size:imageSize,
				scaledSize:imageSize,
				origin:new google.maps.Point(0, 0),
				//anchor:new google.maps.Point(0, imageOption.lng)
			}
		marker = new google.maps.Marker({
			position: {lat:imageOption.lat, lng:imageOption.lng},
			map: map,
			icon: image
			//icon: imageOption.url
			//title: imageOption.title,
			//zIndex: imageOption.zIndex
		});
	}
	return marker;
}


// overlay 셋팅
function setOverLay(option, marker){
	var overlayPop = null;
	if(mapCode == "D"){ // Daum Map
		overlayPop = new daum.maps.CustomOverlay(option);
	}else if(mapCode == "G"){ // Google Map
		var contentElement = htmlToElement(option.content);
		//console.log("option.position >> " + option.position + " / " + option.position.lat() + " / " + option.position.lng());
		//new google.maps.LatLng(-33.866, 151.196)
		overlayPop = new Popup(
			new google.maps.LatLng(option.position.lat(), option.position.lng())
			, contentElement
		)
		overlayPop.setMap(option.map);
	}
	return overlayPop;
}

// Element로 변환
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

// 지도 셋팅 - container, lat, lng 세가지는 필수값.
function setDefaultMap(container, lat, lng, zlevel, controller){
	if(lat == null || lng == null){
		return;
	}
	map = null;
	drawManager = null;
	drawToolbox = null;
	drawData = {"marker":[],"arrow":[],"polyline":[],"rectangle":[],"circle":[],"ellipse":[],"polygon":[]};

	popup = null;
	Popup = null;
	timer;
	markers = [];
	
	if(mapCode == "D"){ // Daum Map
		zlevel = zlevel != null ? zlevel : 3;
		var options = {
	        center: new daum.maps.LatLng(lat, lng),
	        level: zlevel
	    };

	    map = new daum.maps.Map(container, options);
	    
	    if(controller.mapTypeControl){
		    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
		    mapTypeControl = new daum.maps.MapTypeControl();
		
		    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
		    // daum.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
		    map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
		}

		if(controller.zoomControl){
		    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
		    var zoomControl = new daum.maps.ZoomControl();
		    map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
		}
	}else if(mapCode == "G"){ // Google Map
		definePopupClass();
		zlevel = zlevel != null ? (20 - zlevel) : 18;
		
	    var options = {
            center: {lat: lat, lng: lng},
            zoom: zlevel,
            zoomControl: controller.zoomControl,
            scaleControl: controller.scaleControl
        };

        map = new google.maps.Map(container, options);
	}
	
}

// Drawing Manager 셋팅
function mapDrawingManager(styleOption, viewFlag, position){
	if(mapCode == "D"){ // Daum Map
	    var options = { // Drawing Manager를 생성할 때 사용할 옵션입니다
	        map: map, // Drawing Manager로 그리기 요소를 그릴 map 객체입니다
	        drawingMode: [
	            daum.maps.Drawing.OverlayType.MARKER,
	            daum.maps.Drawing.OverlayType.ARROW,
	            daum.maps.Drawing.OverlayType.POLYLINE,
	            daum.maps.Drawing.OverlayType.RECTANGLE,
	            daum.maps.Drawing.OverlayType.CIRCLE,
	            daum.maps.Drawing.OverlayType.ELLIPSE,
	            daum.maps.Drawing.OverlayType.POLYGON
	        ],
	        // 사용자에게 제공할 그리기 가이드 툴팁입니다
	        // 사용자에게 도형을 그릴때, 드래그할때, 수정할때 가이드 툴팁을 표시하도록 설정합니다
	        guideTooltip: ['draw', 'drag', 'edit'],
	        markerOptions: {
	            draggable: true,
	            removable: true
	        },
	        arrowOptions: {
	            draggable: true,
	            removable: true,
	            strokeColor: styleOption.strokeColor,
	            hintStrokeStyle: styleOption.hintStrokeStyle
	        },
	        polylineOptions: {
	            draggable: true, // 그린 후 드래그가 가능하도록 설정합니다
	            removable: true, // 그린 후 삭제 할 수 있도록 x 버튼이 표시됩니다
	            editable: true, // 그린 후 수정할 수 있도록 설정합니다
	            strokeColor: styleOption.strokeColor,// 선 색
	            hintStrokeStyle: styleOption.hintStrokeStyle,// 그리중 마우스를 따라다니는 보조선의 선 스타일
	            hintStrokeOpacity: 0.5  // 그리중 마우스를 따라다니는 보조선의 투명도
	        },
	        rectangleOptions: {
	            draggable: true,
	            removable: true,
	            strokeColor: styleOption.strokeColor,
	            fillColor: styleOption.fillColor,
	            fillOpacity: styleOption.fillOpacity
	        },
	        circleOptions: {
	            draggable: true,
	            removable: true,
	            strokeColor: styleOption.strokeColor,
	            fillColor: styleOption.fillColor,
	            fillOpacity: styleOption.fillOpacity
	        },
	        ellipseOptions: {
	            draggable: true,
	            removable: true,
	            strokeColor: styleOption.strokeColor,
	            fillColor: styleOption.fillColor,
	            fillOpacity: styleOption.fillOpacity
	        },
	        polygonOptions: {
	            draggable: true, // 그린 후 드래그가 가능하도록 설정합니다
	            removable: true, // 그린 후 삭제 할 수 있도록 x 버튼이 표시됩니다
	            editable: true, // 그린 후 수정할 수 있도록 설정합니다
	            strokeColor: styleOption.strokeColor,
	            fillColor: styleOption.fillColor,
	            fillOpacity: styleOption.fillOpacity
	        }
	    };
	
	    // 위에 작성한 옵션으로 Drawing Manager를 생성합니다
	    drawManager = new daum.maps.Drawing.DrawingManager(options);
	
	    // Toolbox를 생성합니다.
	    // Toolbox 생성 시 위에서 생성한 DrawingManager 객체를 설정합니다.
	    // DrawingManager 객체를 꼭 설정해야만 그리기 모드와 매니저의 상태를 툴박스에 설정할 수 있습니다.
	    drawToolbox = new daum.maps.Drawing.Toolbox({drawingManager: drawManager});
	
	    // 지도 위에 Toolbox를 표시합니다
    	// TOP : 위 가운데를 의미한다. 아래로 쌓인다.
    	// TOPLEFT : 왼쪽 위를 의미한다. 오른쪽으로 쌓인다.
    	// TOPRIGHT : 오른쪽 위를 의미한다. 왼쪽으로 쌓인다.
    	// LEFT : 왼쪽 위를 의미한다. 아래로 쌓인다. (주의: 왼쪽 중앙을 의미하는 것이 아니다.)
    	// RIGHT : 오른쪽 위를 의미한다. 아래로 쌓인다. (주의: 오른쪽 중앙을 의미하는 것이 아니다.)
    	// BOTTOMLEFT : 왼쪽 아래를 의미한다. 오른쪽으로 쌓인다.
    	// BOTTOM : 아래 가운데를 의미한다. 위로 쌓인다.
    	// BOTTOMRIGHT : 오른쪽 아래를 의미한다. 왼쪽으로 쌓인다.
	    if(viewFlag){
	    	if(position == "T"){
	    		map.addControl(drawToolbox.getElement(), daum.maps.ControlPosition.TOP);
	    	}else if(position == "B"){
	    		map.addControl(drawToolbox.getElement(), daum.maps.ControlPosition.BOTTOM);
	    	}else if(position == "L"){
	    		map.addControl(drawToolbox.getElement(), daum.maps.ControlPosition.LEFT);
	    	}else if(position == "R"){
	    		map.addControl(drawToolbox.getElement(), daum.maps.ControlPosition.RIGHT);
	    	}else if(position == "TL"){
	    		map.addControl(drawToolbox.getElement(), daum.maps.ControlPosition.TOPLEFT);
	    	}else if(position == "TR"){
	    		map.addControl(drawToolbox.getElement(), daum.maps.ControlPosition.TOPRIGHT);
	    	}else if(position == "BL"){
	    		map.addControl(drawToolbox.getElement(), daum.maps.ControlPosition.BOTTOMLEFT);
	    	}else if(position == "BR"){
	    		map.addControl(drawToolbox.getElement(), daum.maps.ControlPosition.BOTTOMRIGHT);
	    	}else{
	    		map.addControl(drawToolbox.getElement(), daum.maps.ControlPosition.TOP);
	    	}
	    }
	}else if(mapCode == "G"){ // Google Map
		
		// TOP_CENTER indicates that the control should be placed along the top center of the map.
		// TOP_LEFT indicates that the control should be placed along the top left of the map, with any sub-elements of the control "flowing" towards the top center.
		// TOP_RIGHT indicates that the control should be placed along the top right of the map, with any sub-elements of the control "flowing" towards the top center.
		// LEFT_TOP indicates that the control should be placed along the top left of the map, but below any TOP_LEFT elements.
		// RIGHT_TOP indicates that the control should be placed along the top right of the map, but below any TOP_RIGHT elements.
		// LEFT_CENTER indicates that the control should be placed along the left side of the map, centered between the TOP_LEFT and BOTTOM_LEFT positions.
		// RIGHT_CENTER indicates that the control should be placed along the right side of the map, centered between the TOP_RIGHT and BOTTOM_RIGHT positions.
		// LEFT_BOTTOM indicates that the control should be placed along the bottom left of the map, but above any BOTTOM_LEFT elements.
		// RIGHT_BOTTOM indicates that the control should be placed along the bottom right of the map, but above any BOTTOM_RIGHT elements.
		// BOTTOM_CENTER indicates that the control should be placed along the bottom center of the map.
		// BOTTOM_LEFT indicates that the control should be placed along the bottom left of the map, with any sub-elements of the control "flowing" towards the bottom center.
		// BOTTOM_RIGHT indicates that the control should be placed along the bottom right of the map, with any sub-elements of the control "flowing" towards the bottom center.
		var cPosition;
		
	    if(viewFlag){
	    	if(position == "T"){
	    		cPosition = google.maps.ControlPosition.TOP_CENTER;
	    	}else if(position == "B"){
	    		cPosition = google.maps.ControlPosition.BOTTOM_CENTER;
	    	}else if(position == "L"){
	    		cPosition = google.maps.ControlPosition.LEFT_CENTER;
	    	}else if(position == "R"){
	    		cPosition = google.maps.ControlPosition.RIGHT_CENTER;
	    	}else if(position == "TL"){
	    		cPosition = google.maps.ControlPosition.TOP_LEFT;
	    	}else if(position == "TR"){
	    		cPosition = google.maps.ControlPosition.TOP_RIGHT;
	    	}else if(position == "BL"){
	    		cPosition = google.maps.ControlPosition.BOTTOM_LEFT;
	    	}else if(position == "BR"){
	    		cPosition = google.maps.ControlPosition.BOTTOM_RIGHT;
	    	}else{
	    		cPosition = google.maps.ControlPosition.TOP_CENTER;
	    	}
	    }

	    drawManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: viewFlag,
            drawingControlOptions: {
            	position: cPosition,
            	drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
            },
            //markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
            circleOptions: {
            	fillColor: styleOption.fillColor,
            	fillOpacity: styleOption.fillOpacity,
            	strokeWeight: 1,
            	clickable: false,
            	editable: true,
            	zIndex: 1
            }
        });
	}
}


//setMapType(map, "roadmap", mapCookie);
// 맵타입 변경
function setMapType(typeId){
	// typeId - roadmap, satellite, hybrid, terrain, skyview, roadview
	// google : roadmap, satellite, hybrid, terrain
	// daum : base - ROADMAP, SKYVIEW, HYBRID, ROADVIEW
	//		  overlay - OVERLAY, TRAFFIC, TERRAIN, BICYCLE, BICYCLE_HYBRID, USE_DISTRICT
	// * 다음맵의 base타입은 set으로 지도타입 변경 가능, overlay타입은 지도위에 표현해주기때문에 removeOverlayMap()을 이용하여 제거 가능
	typeId = typeId.toLowerCase();
	
	if(mapCode == "D"){ // Daum Map
		if(typeId == "roadmap"){
			map.setMapTypeId(daum.maps.MapTypeId.ROADMAP);
		}else if(typeId == "skyview"){
			map.setMapTypeId(daum.maps.MapTypeId.SKYVIEW);
		}else if(typeId == "hybrid"){
			map.setMapTypeId(daum.maps.MapTypeId.HYBRID);
		}else if(typeId == "roadview"){
			map.setMapTypeId(daum.maps.MapTypeId.ROADVIEW);
		}else if(typeId == "overlay"){
			map.addOverlayMapTypeId(daum.maps.MapTypeId.OVERLAY);
		}else if(typeId == "traffic"){
			map.addOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC);
		}else if(typeId == "terrain"){
			map.addOverlayMapTypeId(daum.maps.MapTypeId.TERRAIN);
		}else if(typeId == "bicycle"){
			map.addOverlayMapTypeId(daum.maps.MapTypeId.BICYCLE);
		}else if(typeId == "bicycle_hybrid"){
			map.addOverlayMapTypeId(daum.maps.MapTypeId.BICYCLE_HYBRID);
		}else if(typeId == "use_districe"){
			map.addOverlayMapTypeId(daum.maps.MapTypeId.USE_DISTRICT);
		}else{
			map.setMapTypeId(daum.maps.MapTypeId.ROADMAP);
		}
	}else if(mapCode == "G"){ // Google Map
		var mapTypeArr = ['roadmap', 'satellite', 'hybrid', 'terrain']; 
		if(typeId != null){
			if(mapTypeArr.indexOf(typeId) != -1){
				map.setMapTypeId(typeId);
			}else{
				map.setMapTypeId('roadmap');
			}
			map.setMapTypeId(typeId);
		}
	}
}

function removeOverlayMap(overlays, typeId){
	if(mapCode == "D"){ // Daum Map
        // 아래 지도에 그려진 도형이 있다면 모두 지웁니다
        var len = overlays.length, i = 0;
        for (; i < len; i++) {
            overlays[i].setMap(null);
        }
        overlays = [];
	}else if(mapCode == "G"){ // Google Map
        // 아래 지도에 그려진 도형이 있다면 모두 지웁니다
        var len = overlays.length, i = 0;
        for (; i < len; i++) {
            overlays[i].setMap(null);
        }
        overlays = [];
	}
	return overlays;
}


/**************************************************************************************************
 * 그리기 설정부분
 **************************************************************************************************/
function drawPolygon(polygonsArr, drawArrOverlays, option) {
    var len = polygonsArr.length, i = 0;

    if(mapCode == "D"){ // Daum Map
	    for (; i < len; i++) {
	        var path = pointsToPath(polygonsArr[i].points);
	        var style = polygonsArr[i].options;
	        var polygon = new daum.maps.Polygon({
	            map: null,   // first
	            path: path,
	            strokeColor: style.strokeColor,
	            strokeOpacity: style.strokeOpacity,
	            strokeStyle: style.strokeStyle,
	            strokeWeight: style.strokeWeight,
	            fillColor: style.fillColor,
	            fillOpacity: style.fillOpacity,
	        });
	        
	        // polygon 개별 보이기 설정을 위해
	        if(option != null){
            	if(!option){
            		var tempArr = [];
                	for(var j=0; j<drawArrOverlays[polygonsArr[i].type].length; j++){
                		var dOverLayer = drawArrOverlays[polygonsArr[i].type][j];
                		if(JSON.stringify(dOverLayer.Cg) != JSON.stringify(polygon.Cg)){
                			tempArr.push(dOverLayer);
                		}
                	}
                	//showOverlay(polygonsArr[i].type,false);
                    var list = drawArrOverlays[polygonsArr[i].type];
                    for(var l = 0 ; l < list.length ; l++){
                        list[l].setMap(null)
                    }
                	
                	drawArrOverlays[polygonsArr[i].type] = [];
                	drawArrOverlays[polygonsArr[i].type] = tempArr;
            	}else{
            		drawArrOverlays[polygonsArr[i].type].push(polygon);
            	}
            }else{
            	if(polygonsArr[i].areaId != undefined){
            		polygon.areaId = polygonsArr[i].areaId;
            	}
            	drawArrOverlays[polygonsArr[i].type].push(polygon);
            }
	        
	        //drawArrOverlays[polygonsArr[i].type].push(polygon);
	    }
    }else if(mapCode == "G"){ // Google Map
	    for (; i < len; i++) {
	    	var path = pointsToPath(polygonsArr[i].points);
	    	var style = polygonsArr[i].options;	
		    // Construct the polygon.
		    var polygon = new google.maps.Polygon({
		    	paths: path,
		    	strokeColor: style.strokeColor,
		    	strokeOpacity: style.strokeOpacity,
		    	strokeWeight: style.strokeWeight,
		    	fillColor: style.fillColor,
		    	fillOpacity: style.fillOpacity
		    });
		    
		    // polygon 개별 보이기 설정을 위해
		    if(option != null){
            	if(!option){
            		var tempArr = [];
                	for(var j=0; j<drawArrOverlays[polygonsArr[i].type].length; j++){
                		var dOverLayer = drawArrOverlays[polygonsArr[i].type][j];
                		if(JSON.stringify(dOverLayer.latLngs) != JSON.stringify(polygon.latLngs)){
                			tempArr.push(dOverLayer);
                		}
                	}
                	//showOverlay(polygonsArr[i].type,false);
                	var list = drawArrOverlays[polygonsArr[i].type];
                    for(var l = 0 ; l < list.length ; l++){
                        list[l].setMap(null)
                    }
                    
                	drawArrOverlays[polygonsArr[i].type] = [];
                	drawArrOverlays[polygonsArr[i].type] = tempArr;
            	}else{
            		drawArrOverlays[polygonsArr[i].type].push(polygon);
            	}
            }else{
            	drawArrOverlays[polygonsArr[i].type].push(polygon);
            }
		    
		    //drawArrOverlays[polygonsArr[i].type].push(polygon);
	    }
    }
	    
}

// Drawing Manager에서 가져온 데이터 중
// 선과 다각형의 꼭지점 정보를 daum.maps.LatLng객체로 생성하고 배열로 반환하는 함수입니다
function pointsToPath(points) {
    var len = points.length,
        path = [],
        i = 0;

    for (; i < len; i++) {
        var latlng = getLatLng(points[i].y, points[i].x);
        path.push(latlng);
    }

    return path;
}

// Drawing Mode
function setDrawingMap(type, option){
	if(mapCode == "D"){ // Daum Map
        drawManager.cancel();
        drawManager.select(daum.maps.drawing.OverlayType[type]);
	}else if(mapCode == "G"){ // Google Map
		type = type.toLowerCase();
		drawManager.setMap(null);
		drawManager = new google.maps.drawing.DrawingManager({drawingControl:false});
		drawManager.setMap(map);
		drawManager.setDrawingMode(type);
	}
	return drawManager; 
}

// not Drawing Mode
function cancelDrawingMap(){
	if(mapCode == "D"){ // Daum Map
        drawManager.cancel();
	}else if(mapCode == "G"){ // Google Map
		drawManager.setMap(null);
	}
}

// Drawing get Data
function getDrawingMap(){
	var drawMapArr;
	if(mapCode == "D"){ // Daum Map
		drawMapArr = drawManager.getData();
	}else if(mapCode == "G"){ // Google Map
		drawMapArr = drawData;
	}
	return drawMapArr;
}
function addMarker(lat,lng){
	for(var i=0; i<markers.length; i++){
		markers[i].setMap(null);
	}
	
	var option = {
    		lat:parseFloat(lat),
    		lng:parseFloat(lng),
    		draggable:true
    	}
     
	var marker = addDefaultMarker(marker, option);
	marker.setMap(map);
	
    var evFc = function() {
    	var latLng = getEventLatlng(marker, "marker"); // (33.45067375096625, 126.5706721005115)
    	$("#markerLat").val(latLng.lat);
    	$("#markerLon").val(latLng.lng);
    }
    addListener(marker, 'dragend', evFc, null);
    
	markers.push(marker);
    
}
function geoToPoints(geo) {
	var points = [];
	var checkStEd = false;
	var lengthCheck = geo == null ? 0 : geo.length;

	if(lengthCheck > 0){
		if(geo[0].lat == geo[lengthCheck-1].lat && geo[0].lon == geo[lengthCheck-1].lon){
			lengthCheck = lengthCheck - 1;
		}
		
		for (var i = 0; i < lengthCheck; i++) {
			var point = {x:geo[i].lon,y:geo[i].lat};
			points.push(point);
		}
	}
	
    return points;
}

/** Defines the Popup class. */
function definePopupClass() {
	/**
	 * A customized popup on the map.
	 * @param {!google.maps.LatLng} position
	 * @param {!Element} content
	 * @constructor
	 * @extends {google.maps.OverlayView}
	 */
	Popup = function(position, content) {
		this.position = position;

		content.classList.add('popup-bubble-content');
		
		var pixelOffset = document.createElement('div');
		pixelOffset.classList.add('popup-bubble-anchor');
		pixelOffset.appendChild(content);
		
		this.anchor = document.createElement('div');
		this.anchor.classList.add('popup-tip-anchor');
		this.anchor.appendChild(pixelOffset);
	    
		// Optionally stop clicks, etc., from bubbling up to the map.
		//this.stopEventPropagation();
	};
	// NOTE: google.maps.OverlayView is only defined once the Maps API has
	// loaded. That is why Popup is defined inside initMap().
	Popup.prototype = Object.create(google.maps.OverlayView.prototype);

	/** Called when the popup is added to the map. */
	Popup.prototype.onAdd = function() {
		this.getPanes().floatPane.appendChild(this.anchor);
	};

	/** Called when the popup is removed from the map. */
	Popup.prototype.onRemove = function() {
		if (this.anchor.parentElement) {
			this.anchor.parentElement.removeChild(this.anchor);
		}
	};

	/** Called when the popup needs to draw itself. */
	Popup.prototype.draw = function() {
		var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
		// Hide the popup when it is far out of view.
		var display =
			Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ? 'block' : 'none';

		if (display === 'block') {
			this.anchor.style.left = divPosition.x + 'px';
			this.anchor.style.top = divPosition.y + 'px';
		}
		if (this.anchor.style.display !== display) {
			this.anchor.style.display = display;
		}
	};

	/** Stops clicks/drags from bubbling up to the map. */
	Popup.prototype.stopEventPropagation = function() {
		var anchor = this.anchor;
		anchor.style.cursor = 'auto';

		/*
		//'click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart', 'pointerdown'
		['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart', 'pointerdown'].forEach(function(event) {
			anchor.addEventListener(event, function(e) {
				e.stopPropagation();
			});
        });
        */
	};
}
