/**
 * version 1.0 
 * 
 * @author 홍윤성
 * 
 * 이 js파일을 사용하기 위해 이 파일과 같은 경로 상에 
 *  plugins 폴더와 그 하위 내용들, jquery , scenejs.js 혹은 scenejs.min.js 가 필요하며,
 * 
 *  사용 방법 및 예시는 raysolution.html 에서 확인 할 수 있다.
 */
//var floor_rgb = {r:225/256, g:162/256, b:108/256}; // 바닥에 들어갈 색
var floor_rgb = {r:150/256, g:150/256, b:150/256}; // 바닥에 들어갈 색
var wall_rgb = {r:166/256, g:166/256, b:166/256}; // 벽과 기둥에 들어갈 색
var plane_rgb = {r: 221/256, g: 221/256, b: 187/256}; // 전체 평면의 색
//var plane_rgb = {r: 0/256, g: 102/256, b: 51/256}; // 전체 평면의 색
//var plane_rgb = {r: 38/256, g: 115/256, b: 38/256}; // 전체 평면의 색
var rack_rgb = {r:132/256, g:132/256, b:112/256};
var box_rgb = {r:153/256, g:77/256, b:0/256};




var Ray = function(){

	var camera;
	var sceneObject;
	var isConverted = false;
	var myScene;
	var sceneJsonArray = [];
	var sceneGroupArray = [];
	var selectedHighlight = false;
  var highlightWall = {};
	
	var canvasID;
	
	
	/** paramter : (DOM <canvas> 태그의 id 값,cameraType)
	 *				id 값 널 일때, 자동으로 canvas 생성, 
	 *				cameraType default 값 :  cameras/orbit
	 *				camera 타입은 cameras/orbit  그리고 cameras/pickFlyOrbit 두 개 가능.
	 *  기능              : canvas에 화면 생성. 
	 *  리턴              : root element (복수 개의 화면을 구성 해야 할 시에 구분지을 수 있는 요소.)
	 */
	this.createScene = function(canvasID,cameraType){
		console.log("getSceneStart");
		canvasID = canvasID;
		cameraType = cameraType?cameraType:"cameras/orbit";
		
		SceneJS.setConfigs({
			pluginPath:"/plugins"
		});
		myScene = SceneJS.createScene({
			"canvasId": canvasID,
			"id" : "initObject",
			"nodes": []
		});
		var cameraType = cameraType;
		createCanvas(cameraType);
		console.log(JSON.stringify(this));
		return this;
	}
	
	
	/**
	 * parameter : {} json 형태
	 * 				취급 가능한 property : yaw, pitch, zoom, zoomSensitivity, eye, look, up
	 *   			scenejs.js 참고하여 추가 가능. (zoom의 max, min 값 등 추가 가능함)
	 * 기능 : parameter 의 값으로 현재 카메라의 옵션 컨트롤
	 * 리턴 : 없음.
	 * 
	 * 
		( 사용 예시 )		
			yaw= 0,
			pitch= -20,
			zoom= 110,
			zoomSensitivity= -7.0,
			eye= {"x": 0,"y": 0,"z": 50},
			look= {"x": 0,"y": 0,"z": 0},
			up = {"x": 0,"y": 1,"z": 0}
	
	 */
	this.setCameraOptions = function(params){
		myScene.getNode("mainCameras",function(mainCameras){	
//			mainCameras.yaw= params.yaw && params.yaw!="default"? params.yaw :0;
//			mainCameras.pitch= params.pitch && params.pitch!="default"? params.pitch :-20;
//			mainCameras.zoom= params.zoom && params.zoom!="default"? params.zoom :110;
//			mainCameras.zoomSensitivity= params.zoomSensitivity && params.zoomSensitivity!="default"? params.zoomSensitivity :-7.0;
//			mainCameras.eye = params.eye && params.eye!="default"? params.eye :{"x": 0,"y": 0,"z": 50};
		//	mainCameras.setLook(params.look && params.look!="default"? params.look :{"x": 0,"y": 0,"z": 0});
	//		mainCameras.up = params.up && params.up!="default"? params.up :{"x": 0,"y": 1,"z": 0};
		})
		
	}
	
	this.addJsonData = function(jsonArray){
		isConverted = true;
		sceneJsonArray = JSON.parse(JSON.stringify(jsonArray)); // deep copy;
		if(jsonArray==null || jsonArray==undefined || jsonArray.length==0 ) return;

		myScene.getNode("centerLayer",function(layer){
			for(var i =0; i<jsonArray.length; i++){				
				
				if(jsonArray[i].type!="group"){
					
					try{
						layer.addNodes(getObjectArray(jsonArray));
	
						if(jsonArray[i].type=="textbox"){
							$("#textBoxDiv").append("<div class='"+jsonArray[i].style+" transparent-ui' id='"+jsonArray[i].id+"'></div>");
							//$("#textBoxDiv").append("asdfasdfasdfasdfsdfasdfwqrehyqwrh35y2");
							myScene.getNode(jsonArray[i].id).on("rendered",function(event){
								updateLabelPos(
										this.id,
										event.getCanvasPos(),
										event.getProjPos(),
										event.getCameraPos(),
										event.getViewPos(),
										event.getWorldPos(),
										this.data);
							});
						}
					}catch(error){
						console.log(error.message)
						continue;
					}
					
					
					
				}// end of if
				else {
					var sensor_id_array = [];
					
					var nodev = getObjectArray(jsonArray[i].items,sensor_id_array);
					layer.addNode({type:"enable", id:jsonArray[i].id, enabled:true} );
					for(var j = 0; j<nodev.length; j++){
						myScene.getNode(jsonArray[i].id,function(groupNode){
								try{
									groupNode.addNode(nodev[j]);
								}catch(error){
									console.log(error.message);
								}
							}
						);
					}
					
					
					sceneGroupArray.push(
							{
								"type":"group",
								"id":jsonArray[i].id, 
								"name":jsonArray[i].name, 
								"yarray" : jsonArray[i].yarray,
								"positions": jsonArray[i].positions,
								"items" : sensor_id_array
							}
					);
					
					for(var j = 0; j<jsonArray[i].items.length;j++){
						if(jsonArray[i].items[j].type=="textbox"){
							$("#textBoxDiv").append("<div class='"+jsonArray[i].items[j].style+" transparent-ui' id='"+jsonArray[i].items[j].id+"'></div>");
							myScene.getNode(jsonArray[i].items[j].id).on("rendered",function(event){
								updateLabelPos(
										this.id,
										event.getCanvasPos(),
										event.getProjPos(),
										event.getCameraPos(),
										event.getViewPos(),
										event.getWorldPos(),
										this.data);
							});
						}
					}// end of for
					
				}// end of else
				
				
				
			}
		});
	}
	
	this.removeJsonData = function(jsonArray){
		
		for(var i = 0; i<jsonArray.length; i++){
			myScene.getNode(jsonArray[i].id,function(nodeToRemove){
				nodeToRemove.destroy();
			})
			if(jsonArray[i].type=="textbox"){
				var textdiv = $("#"+jsonArray[i].id).remove();
			}
		}
		
	}
	
	
	
	this.createXZBasePlane = function(width,height){
		myScene.getNode("planeLayer",function(centerLayer){
			//centerLayer.addNode(getXZPlane());
			//바닥 평면
			
					var object_material = {};
					object_material.type = "material";
					object_material.color= {r:160/256,g:160/256,b:160/256};
					object_material.alpha = 1;
//					object_material.emit = 0.2;
					object_material.nodes=[];
						var object_scale = {};
						object_scale.type= "scale";
						object_scale.x= 1;
						object_scale.z= 1;
						object_scale.nodes = [];
							var object_rotate = {};
							object_rotate.type= "rotate";
							object_rotate.x= 1;
							object_rotate.angle= -90;
							object_rotate.nodes= [];
								var object_texture = {};
								object_texture.type="texture";
								object_texture.src = "/lifetip-admin/libs/scenejs-master/examples/textures/BULK_UP.png";
								object_texture.applyTo = "color";
								object_texture.nodes = [];
									var object_geometry = {};
									object_geometry.type= "geometry/plane";
									object_geometry.width= 320;
									object_geometry.height= 90;
									object_geometry.wire= false;
									object_geometry.widthSegments= 100;
									object_geometry.heightSegments= 100;
								object_texture.nodes.push(object_geometry);
							object_rotate.nodes.push(object_texture);
//							object_rotate.nodes.push(object_geometry);
						object_scale.nodes.push(object_rotate);
					object_material.nodes.push(object_scale);
				centerLayer.addNode({
					"type":"translate",
					"x":0,
					"z":0,
					nodes :[object_material]
				});
				
			
		})
	};

	this.createXYBasePlane = function(width,height){
		myScene.getNode("planeLayer",function(centerLayer){
			//centerLayer.addNode(getXZPlane());
			//바닥 평면
			
					var object_material = {};
					object_material.type = "material";
					object_material.color= {r:160/256,g:160/256,b:160/256};
					object_material.alpha = 1;
//					object_material.emit = 0.2;
					object_material.nodes=[];
						var object_scale = {};
						object_scale.type= "scale";
						object_scale.x= 1;
						object_scale.z= 1;
						object_scale.nodes = [];
							var object_rotate = {};
							object_rotate.type= "rotate";
							object_rotate.x= 1;
							object_rotate.angle= 0;
							object_rotate.nodes= [];
								var object_texture = {};
								object_texture.type="texture";
								object_texture.src = "/lifetip-admin/libs/scenejs-master/examples/textures/BULK_SIDE.png";
								object_texture.applyTo = "color";
								object_texture.nodes = [];
									var object_geometry = {};
									object_geometry.type= "geometry/plane";
									object_geometry.width= 320;
									object_geometry.height= 60;
									object_geometry.wire= false;
									object_geometry.widthSegments= 100;
									object_geometry.heightSegments= 100;
								object_texture.nodes.push(object_geometry);
							object_rotate.nodes.push(object_texture);
//							object_rotate.nodes.push(object_geometry);
						object_scale.nodes.push(object_rotate);
					object_material.nodes.push(object_scale);
				centerLayer.addNode({
					"type":"translate",
					"y":30,
					"z":-45,
					nodes :[object_material]
				});
				console.log(object_material);
			
		})
	};
	

	this.showHeightMap = function(point_type){

		myScene.getNode("centerLayer",function(centerLayer){
			centerLayer.addNode(getColorHeightMap(point_type));
		})

		
	}
	this.hideHeightMap = function(point_type){
		if(myScene.getNode(point_type)) {
			myScene.getNode(point_type,function(pointMap){
				pointMap.destroy();
			});
		}
		update_point_size();
	}
	
	
	
	function createPointMap(groupData,point_type){
		var positions = groupData.positions;
		console.log(groupData.yarray);
		var yarray = groupData.yarray;
		var groupId = groupData.id;
		if(positions==null || yarray==null) return;
		myScene.getNode(groupData.id, function(groupNode){
			//groupData.addNodes(getRandomPoints(groupId,sensor_type,positions,yarray,num,heatValue));
//			console.log("group 에 잘 들어가나.");
			console.log(JSON.stringify(groupData));
			
			for(var i =0; i<groupData.items.length;i++){
				myScene.getNode(groupData.items[i],function(sensor){
					var center_point = {"x":sensor.data.x, "y":sensor.data.y, "z":sensor.data.z};
					var temperature = sensor.data.temperature;
					var humidity = sensor.data.humidity;
//					console.log("cetnerPoint 찍히나");
//					console.log(JSON.stringify(center_point));
//					console.log("temperautre : " + temperature);
//					console.log(humidity);
//					console.log(point_type);

					myScene.getNode("pointMapLayer",function(pointMapLayer){
						var max_radius = 20; // 반경을 몇까지 할지는 추후에 정해야함.
						var point_count = 100000;// 점 갯수를 몇까지 할지도 추후에 정해줘야함.
						pointMapLayer.addNode( getRandomPointArroundSensor(groupId,center_point,point_type,temperature,humidity
								,max_radius,positions,yarray,point_count));
						
					})
				})
			}// end of for
		});
		
	}
	
	
	
	this.renderClear = function(){
		myScene.getNode("centerLayer",function(centerLayer){
			centerLayer.removeNodes();
		})
	};
	
	this.showPointer = function(x,y,z){
		x*=1; y*=1; z*=1;
		if(myScene.getNode("pointer1")) myScene.getNode("pointer1",function(pointer){ pointer.destroy();});
		myScene.getNode("baseLayer",function(baseLayer){
			baseLayer.addNode(
					{
						type : "translate" , id:"pointer1", x: x, y: y+0.5, z: z
						,nodes:[
							{
								type:"scale", id:"myScale",x:0, y:0,z:0, nodes:[
									{type:"geometry/box" ,size : [0.5,0.5,0.5]}
								]
							}
						]
					}
			)
			myScene.getNode("centerLayer",function(centerLayer){
				myScene.getNode("planeLayer",function(planeLayer){
					planeLayer.setXYZ({x:-x, y:-y, z:-z})
					centerLayer.setXYZ({x:-x, y:-y, z:-z})
					baseLayer.setXYZ({x:-x, y:-y, z:-z})
					
				})
			})
		});
		// Get scale node and animate it
	    myScene.getNode("myScale",function (myScale) {
	        var x = 1;
	        var y = 1;
	        var z = 1;
	        var xInc = 0.1;
	        myScene.on("tick",function () {
                if (x >= 1.2) {
                    xInc *= -1;
                } else if (x <= 0.8) {
                    xInc *= -1;
                }
                x += xInc;
                y += xInc;
                z += xInc;
                myScale.setXYZ({ x:x, y:y, z:z });
        
            });
        });
	};
	this.hidePointer = function(){
		if(myScene.getNode("pointer1")) myScene.getNode("pointer1").destroy();
	}

	this.selectedGroupHighlight = function(groupId){
		
		
		if(selectedHighlight ==true){
			myScene.getNode("highlightWall",function(highlightWall){
				highlightWall.destroy();
			})
		}
		for(var i =0; i<sceneGroupArray.length ; i++){
			var group = convertToFullArray(sceneGroupArray[i]);
			if(group.id ==groupId){
				selectedHighlight = true;
				myScene.getNode("centerLayer",function(centerLayer){
					centerLayer.addNode(getHighlightWall(group));
				});
			}
		}
		
	}
	
	
	
	function update_point_size(){
		
		console.log("pointsCount" + pointsCount);
		for(var i = 0; i<pointsCount; i++){
			myScene.getNode("points"+i, function (points) {
				var size = points.getPointSize();
				var increment = 0.08;
				
				myScene.on("tick", function () {
					size += increment;
					
					points.setPointSize(size);
					
					if (size > 4 || size < 2) {
						size = Math.max(1, Math.min(size, 4));
						increment *= -1;
					}
				});
			});
		}
	}
	
    function createCanvas(cameraType){
        //alert(cameraType);
        camera ={};
        camera.type=cameraType;
        camera.id="mainCameras";
        camera.nodes=[];
        if(camera.type=="cameras/orbit"||camera.type=="cameras/pickFlyOrbit"){
            camera.yaw= camera.type=="cameras/pickFlyOrbit"?180:0,
            camera.pitch= -20,
            camera.zoom= 210,
            camera.zoomSensitivity= -7.0,
            camera.eye= {"x": 0,"y": 0,"z": 50},
            camera.look= {"x": 0,"y": 0,"z": 0},
            camera.up = {"x": 0,"y": 1,"z": 0}

        }

        var d = new Date();
        var skybox = "";
        if(d.getHours()>7 && d.getHours()<18){
        	skybox = "skybox/cloudySea";
        }else if(d.getHours()>=18 && d.getHours()<20){
        	skybox = "skybox/violentDays";
        }else{
        	skybox = "skybox/grimmNight";
        }
        skybox = "skybox/grimmNight";
        
        var rotate = {};
        rotate.type = "rotate";
        rotate.id = "myRotate";
        rotate.y = 1.0;
        rotate.angle = 0;
        rotate.nodes = [];
        rotate.nodes.push(
        	{
        		type:skybox,
        		size : 5000
        	}
        );
        rotate.nodes.push(
                {
                    id:"centerLayer",
                    type:"translate",
                    x:0,
                    y:0,
                    z:0,

                }
        );
        rotate.nodes.push(
                {
                    id:"baseLayer",
                    type:"translate",
                    x:0,
                    y:0,
                    z:0,

                }
        );
        rotate.nodes.push(
        		{
                    id:"pointMapLayer",
                    type:"translate",
                    x:0,
                    y:0,
                    z:0
        		}
        );
        
        rotate.nodes.push(
                {
                    id:"planeLayer",
                    type:"translate",
                    x:0,
                    y:0,
                    z:0,
                }
        );
        camera.nodes.push(rotate);
        myScene.getNode("initObject",function(initObject){
        	initObject.addNode(camera);
        });
    }// end of createCanvas
	
	
    
    function updateLabelPos(elementId, canvasPos, projPos, cameraPos, viewPos, worldPos,message) {

        var element = $("#" + elementId);
        element.html(message);
                
        var distance = Math.sqrt(roundFloat(viewPos.x)*roundFloat(viewPos.x)
        +roundFloat(viewPos.y)*roundFloat(viewPos.y)
        + roundFloat(viewPos.z)*roundFloat(viewPos.z));

        var canvas = myScene.getCanvas();

        var zIndex = 100000 + roundFloat(viewPos.z);

        element.css("left", canvas.offsetLeft + canvasPos.x);
        element.css("top", canvas.offsetTop + canvasPos.y);
        element.css("width",7000/distance);
        element.css("height",3000/distance);
        element.css("font-size",1000/distance)
        element.css("z-index", zIndex);
        if(distance>200){
        	element.css("display","none");
        }
        else{
        	element.css("display","inline-block");
        }
    }

    function roundFloat(v) {
        return Math.round(v * 10) / 10;
    }

    
    this.setFloor_rgb = function(r,g,b){
        floor_rgb = {"r":r/256, "g":g/256, "b":b/256}; // 바닥에 들어갈 색
    } 
    this.setWall_rgb = function(r,g,b){
        wall_rgb = {"r":r/256, "g":g/256, "b":b/256}; // 벽과 기둥에 들어갈 색
    } 
    this.setPlane_rgb = function(r,g,b){
        plane_rgb = {"r":r/256, "g":g/256, "b":b/256}; // 전체 평면의 색
    } 
    this.setRack_rgb = function(r,g,b){
        rack_rgb = {"r":r/256, "g":g/256, "b":b/256}; // 랙의 색
    } 
    this.setBox_rgb = function(r,g,b){
        box_rgb = {"r":r/256, "g":g/256, "b":b/256}; // 짐의 색
    } 
    
    
    
    this.renderToggle = function(groupId, boolean){
    	myScene.getNode(groupId,function(group){
    		console.log(groupId);
    		group.setEnabled(boolean);
    	})
    };
    
    this.changeViewMode = function(type){
    	var angleValue = type=="rotate"?0.5:0;
    	myScene.getNode("myRotate", function (myRotate) {
            var angle = 0;
            myScene.on("tick",function () {
                myRotate.setAngle(angle += angleValue);
            });
        });
  
    };
    
    
    
    function getObjectArray(jsonArray,sensor_id_array){
    	var resultArray = [];
    	var jsonWithId = {};
    	$.each(jsonArray,function(index,json){
    		//alert("여기오니? getObjectArray $each 시작 !");
    		json = convertToFullArray(json); // ex) "0,2,4:7" 를[0,2,4,5,6,7] 로 바꾸어줌.  
//    		sceneJsonArray.push(json);
    		if(json.type=="box" || json.type =="boxclipQ" || json.type =="boxclipO"){
    			jsonWithId = {type:"translate", id:json.id, nodes:[]};
    			for(var i = 0; i<json.yarray.length; i++){
    				for(var j =0; j<json.xarray.length;j++){
    					for(var k=0; k<json.zarray.length; k++){
    						jsonWithId.nodes.push(getBox(json,json.xarray[j],json.yarray[i],json.zarray[k]));
    						console.log(getBox(json,json.xarray[j],json.yarray[i],json.zarray[k]));
    					}
    				}
    			}
    			resultArray.push(jsonWithId);
    		}// end of  boxclipO , boxclipQ
    		
    		else if(json.type=="floor"){
    			jsonWithId = {type:"translate", id:json.id, nodes:[]};
    			for(var i =0; i<json.yarray.length; i++){
    				jsonWithId.nodes.push(getWallOrFloor(json,json.yarray[i]));
    			}
    			resultArray.push(jsonWithId);
    		}// end of floor
    		
    		else if(json.type=="wall"){
    			jsonWithId = {type:"translate", id:json.id, nodes:[]};
    			jsonWithId.nodes.push(getWallOrFloor(json,0));
    			resultArray.push(jsonWithId);
    		}// end of wall
    		
    		else if(json.type=="rack"){
    			jsonWithId = {type:"translate", id:json.id, nodes:[]};
    			for(var i = 0; i<json.yarray.length; i++){
    				for(var j =0; j<json.xarray.length;j++){
    					for(var k=0; k<json.zarray.length; k++){
    						jsonWithId.nodes.push(getRack(json,json.xarray[j],json.yarray[i],json.zarray[k]));
    					}
    				}
    			}
    			var minHeight = json.yarray[0];
    			var maxHeight = json.yarray[json.yarray.length-1]-1;
    			if(json.pivot=="z"){
    				for(var i =minHeight; i<=maxHeight;i++){
    					for(var k = 0; k<json.zarray.length;k++){
    						jsonWithId.nodes.push(getPillar({type:"pillar", direction:"left"},json.xarray[0],i,json.zarray[k]));
    						jsonWithId.nodes.push(getPillar({type:"pillar", direction:"front"},json.xarray[0],i,json.zarray[k]));
    						jsonWithId.nodes.push(getPillar({type:"pillar", direction:"right"},json.xarray[json.xarray.length-1],i,json.zarray[k]));
    						jsonWithId.nodes.push(getPillar({type:"pillar", direction:"back"},json.xarray[json.xarray.length-1],i,json.zarray[k]));
    					}					
    				}
    			}
    			if(json.pivot=="x"){
    				for(var i =minHeight; i<=maxHeight;i++){
    					for(var j = 0; j<json.xarray.length;j++){
    						jsonWithId.nodes.push(getPillar({type:"pillar", direction:"left"},json.xarray[j],i,json.zarray[0]));
    						jsonWithId.nodes.push(getPillar({type:"pillar", direction:"back"},json.xarray[j],i,json.zarray[0]));
    						jsonWithId.nodes.push(getPillar({type:"pillar", direction:"right"},json.xarray[j],i,json.zarray[json.zarray.length-1]));
    						jsonWithId.nodes.push(getPillar({type:"pillar", direction:"front"},json.xarray[j],i,json.zarray[json.zarray.length-1]));
    					}					
    				}
    			}
    			resultArray.push(jsonWithId);
    		}// end of rack
    		
    		else if(json.type =="pillar" ){
    			jsonWithId = {type:"translate", id:json.id, nodes:[]};
    			for(var i = 0; i<json.yarray.length; i++){
    				for(var j =0; j<json.xarray.length;j++){
    					for(var k=0; k<json.zarray.length; k++){
    						jsonWithId.nodes.push(getPillar(json,json.xarray[j],json.yarray[i],json.zarray[k]));
    					}
    				}
    			}
    			resultArray.push(jsonWithId);
    		}// end of pillar
    		

    		
    		else if(json.type=="road"){
    			jsonWithId = {type:"translate", id:json.id, nodes:[]};
    			for(var i = 0; i<json.yarray.length; i++){
    				for(var j =0; j<json.xarray.length;j++){
    					for(var k=0; k<json.zarray.length; k++){
    						jsonWithId.nodes.push(getRoad(json,json.xarray[j],json.yarray[i],json.zarray[k]));
    					}
    				}
    			}
    			resultArray.push(jsonWithId);
    		}// end of road
    		
    		else if(json.type=="sensor" ||  json.type=="gateway"){
    			jsonWithId = {type:"translate", id:json.id, nodes:[], data:{x:json.xarray[0], y:json.yarray[0], z: json.zarray[0]} };
    			if(json.type=="sensor"){
    				jsonWithId.data.temperature = json.temperature 
    				jsonWithId.data.humidity = json.humidity;
    			}
    			sensor_id_array.push(json.id);
    			for(var i = 0; i<json.yarray.length; i++){
    				for(var j =0; j<json.xarray.length;j++){
    					for(var k=0; k<json.zarray.length; k++){
    						jsonWithId.nodes.push(getSphere(json,json.xarray[j],json.yarray[i],json.zarray[k]));
    					}
    				}
    			}
    			resultArray.push(jsonWithId);
    		}// end of seosor, gateway
    		
    		
    		
    		else if(json.type=="textbox"){
    			jsonWithId = {type:"translate", id:json.id, nodes:[], data:json.message};
    			for(var i = 0; i<json.yarray.length; i++){
    				for(var j =0; j<json.xarray.length;j++){
    					for(var k=0; k<json.zarray.length; k++){
    						jsonWithId.nodes.push(getTextBox(json,json.xarray[j],json.yarray[i],json.zarray[k]));
    					}
    				}
    			}
    			resultArray.push(jsonWithId);
    		}// end of textbox
    		
    		
    		
    		else if(json.type=="import"){
    			jsonWithId = {type:"translate", id:json.id, nodes:[]};
    			for(var i = 0; i<json.yarray.length; i++){
    				for(var j =0; j<json.xarray.length;j++){
    					for(var k=0; k<json.zarray.length; k++){
    						jsonWithId.nodes.push(getImportObj(json,json.xarray[j],json.yarray[i],json.zarray[k]));
    					}
    				}
    			}
    			resultArray.push(jsonWithId);
    		}// end of importObj
    		
    		
    	})
    	return resultArray;
    }// end of getObjectArray()
    
    
    
    
    
    
}; // end of ray
	

function getXZPlane(){
	var object_material = {};
	object_material.type = "material";
	object_material.color= plane_rgb;
	object_material.alpha = 1;
	object_material.emit = 0.2;
	object_material.nodes=[];
		var object_scale = {};
		object_scale.type= "scale";
		object_scale.x= 1000;
		object_scale.z= 1000;
		object_scale.nodes = [];
			var object_rotate = {};
			object_rotate.type= "rotate";
			object_rotate.x= 1;
			object_rotate.angle= 270;
			object_rotate.nodes= [];
				//var object_texture = {};
				//object_texture.type="texture";
				//object_texture.src = "../../textures/grass.jpg";
				//object_texture.applyTo = "color";
				//object_texture.nodes = [];
					var object_geometry = {};
					object_geometry.type= "geometry/plane";
					object_geometry.width= 1;
					object_geometry.height= 1;
					object_geometry.wire= true;
					object_geometry.widthSegments= 100;
					object_geometry.heightSegments= 100;
				//object_texture.nodes.push(object_geometry);
			//object_rotate.nodes.push(object_texture);
			object_rotate.nodes.push(object_geometry);
		object_scale.nodes.push(object_rotate);
	object_material.nodes.push(object_scale);
	return object_material;
}





function convertToFullArray(json){
	
	function fullArray(firstArray){
		
		var secondArray = [];
		var resultArray = [];
		
//		secondArray = firstArray[0].split(",");
//		if(firstArray.indexOf(',')!=-1){
		try{
			secondArray = firstArray.split(",");
			
		}catch(error){
			return firstArray;
		}
		
//		}
//		else{
//			secondArray[0] = firstArray;
//			alert("일로오냐?"+ firstArray[0]);
//		}
//		alert("여기오니? converToFullArray!!");
		
		for(var i = 0; i<secondArray.length;i++){
			if(secondArray[i].indexOf(":")!=-1){
				var colonIndex = secondArray[i].indexOf(":");
				for( var j = parseFloat(secondArray[i].slice(0,colonIndex)) ; 
					j <= parseFloat(secondArray[i].slice(colonIndex+1)); 
					j++ ){
					resultArray.push(j);
				}
			}else{
				resultArray.push(parseFloat(secondArray[i]));
			}
		}
		
		return resultArray;
	}
	if(json.yarray!=null && json.yarray!=undefined && json.yarray!="") json.yarray = fullArray(json.yarray);
	if(json.xarray!=null && json.xarray!=undefined && json.xarray!="") json.xarray = fullArray(json.xarray);
	if(json.zarray!=null && json.zarray!=undefined && json.zarray!="") json.zarray = fullArray(json.zarray);
	
	return json;
}

//This function makes a node that looks like a box on a shelf. 
// It needs parameters, a json data and y(height) value.
function getBox(jsonData,x,y,z){
	var type= jsonData.type;    // here,  type : box
	var direction = jsonData.direction; // Actually, this value at here is not needed.
	var id = jsonData.id;
	var posx = x;
	var posy = y;
	var posz = z;
	
	if(jsonData.type!="box"){
		
		var box_translate = {};
		box_translate.type = "translate";
		box_translate.x = getX__(type,direction,posx);
		box_translate.y = getY__(type,direction,posy+0.5);
		box_translate.z = getZ__(type,direction,posz);
		//box_translate.id = id;
		box_translate.nodes = [];
		
		var box_material = {}
		box_material.type = "material";
		box_material.color = box_rgb;
		if(jsonData.tag!=null && (jsonData.tag).indexOf("#")!=-1){
			var colorArray = color_HexToDeci(jsonData.tag);
			box_material.color = {"r":colorArray[0]/256 , "g":colorArray[1]/256, "b":colorArray[2]/256};
		}
		box_material.alpha = 0.9;
		box_material.nodes = [];
		
		var box_geometry = {};
		box_geometry.type="geometry/"+type;
		box_geometry.xSize=getXSize__(type);
		box_geometry.ySize=getYSize__(type);
		box_geometry.zSize=getZSize__(type);
		
		box_material.nodes.push(box_geometry);
		
		box_translate.nodes.push(box_material);
	}else{
		var box_translate = {};
		xSize = jsonData.xSize;
		ySize = jsonData.ySize;
		zSize = jsonData.zSize;
		
		
		box_translate.type = "translate";
		box_translate.x = getX__(type,direction,posx);
		box_translate.y = getY__(type,direction,posy+ySize);
		box_translate.z = getZ__(type,direction,posz);
		//box_translate.id = id;
		box_translate.nodes = [];
		
		var box_material = {}
		box_material.type = "material";
		box_material.color = box_rgb;
		if(jsonData.tag!=null && (jsonData.tag).indexOf("#")!=-1){
			var colorArray = color_HexToDeci(jsonData.tag)
			box_material.color = {"r":colorArray[0]/256 , "g":colorArray[1]/256, "b":colorArray[2]/256};
		}
		box_material.alpha = 0.4;
		box_material.nodes = [];
		
		var box_flags = {};
		box_flags.type = "flags";
		box_flags.flags = {"transparent":true};
		box_flags.nodes = [];
		 	
		
			var box_geometry = {};
			box_geometry.type="geometry/"+type;
			box_geometry.size = [xSize,ySize,zSize];
		box_flags.nodes.push(box_geometry)
			
		box_material.nodes.push(box_flags);
		
		box_translate.nodes.push(box_material);
	}
	
	//console.log(JSON.stringify(box_translate));
	return box_translate;
}

//This function makes a node that looks like a wall or floor. 
//It needs parameters, a json data and y(height) value.
function getWallOrFloor(jsonData,y){
 var type= jsonData.type;    // here,  type : wall or floor
 var direction = jsonData.direction; 
 var positionsArr = []; 
 var tag = jsonData.tag;
 var id = jsonData.id;
 for(var j= 0; j<jsonData.positions.length; j++){
	 positionsArr.push(jsonData.positions[j].x); // {x:20, z:20}, {x:-20, z:20}  이렇게 들어옴.
	 positionsArr.push(jsonData.positions[j].z); // {x:20, z:20}, {x:-20, z:20}  이렇게 들어옴.
 }
 
 var wall_flags = {};
 wall_flags.type = "flags"
 wall_flags.flags = {"transparent":true};
 //wall_flags.id= id;
 wall_flags.nodes = [];
 	
     var wall_material = {}
     wall_material.type = "material";
     wall_material.color = type=="floor"?floor_rgb:wall_rgb;
     wall_material.alpha = type=="floor"||type=="wall"?0.9:0.9;
     wall_material.nodes = [];
         
	         var wall_geometry = {};
	         if(type=="wall"){
	             wall_geometry.type="geometry/wall";
	             wall_geometry.positionsArr = positionsArr;
	             wall_geometry.minHeight = jsonData.minHeight;
	             wall_geometry.maxHeight = jsonData.maxHeight;
	         }
	         if(type=="floor"){
	        	 
	        	 wall_geometry.type = "texture";
	        	 wall_geometry.src = "/lifetip-admin/libs/scenejs-master/examples/textures/tile.jpg";
	        	 if(tag=="inner"){
	        		 wall_geometry.src = "/lifetip-admin/libs/scenejs-master/examples/textures/floor_in.png";
	        	 }
	        	 
	        	 wall_geometry.nodes = [
		        	 {
		        		type:"geometry/floor",
		        	 	positionsArr : positionsArr,
		        	 	yarray : [y]
		        	 }
	        	 ];
	         }
	         
     wall_material.nodes.push(wall_geometry);
 wall_flags.nodes.push(wall_material);


 //console.log(JSON.stringify(wall_translate));
 return wall_flags;
}

//This function makes a node that looks like a wall or floor. 
//It needs parameters, a json data and y(height) value.
function getHighlightWall(jsonData){
	var type= jsonData.type;    // here,  type : wall or floor
	var direction = jsonData.direction; 
	var positionsArr = []; 
	var minHeight = jsonData.yarray[0];
	var maxHeight = jsonData.yarray[0];
	for(var i =1; i<jsonData.yarray.length; i++){
		if(jsonData.yarray[i]<minHeight) minHeight = jsonData.yarray[i];
		if(jsonData.yarray[i]>maxHeight) maxHeight = jsonData.yarray[i];
	}
	
	
	
	
	
	for(var j= 0; j<jsonData.positions.length; j++){
		 positionsArr.push(jsonData.positions[j].x); // {x:20, z:20}, {x:-20, z:20}  이렇게 들어옴.
		 positionsArr.push(jsonData.positions[j].z); // {x:20, z:20}, {x:-20, z:20}  이렇게 들어옴.
	}
	
	var wall_flags = {};
	wall_flags.type = "flags"
	wall_flags.flags = {"transparent":true};
	wall_flags.nodes = [];
	wall_flags.id = "highlightWall";
	   var wall_material = {}
	   wall_material.type = "material";
	   wall_material.color = {r:0.5, g:0, b:0}
	   wall_material.alpha = 0.3;
	   wall_material.nodes = [];
	       
	       var wall_geometry = {};
	       wall_geometry.type = "geometry/wall";
           wall_geometry.positionsArr = positionsArr;
           wall_geometry.minHeight = minHeight;
           wall_geometry.maxHeight = maxHeight+3;
	   wall_material.nodes.push(wall_geometry);
	wall_flags.nodes.push(wall_material);
	

//	console.log(JSON.stringify(wall_flags));
return wall_flags;
}



//This function makes a node that looks like a shelf rack. 
// It needs parameters, a json data and y(height) value.
function getRack(jsonData,x,y,z){
    var type= jsonData.type;    // here,  type : rack
    var posx = x;
    var posy = y;
    var posz = z;
    var id = jsonData.id;
    var rack_translate = {};
    rack_translate.type = "translate";
    rack_translate.x = getX__(type,'',posx);
    rack_translate.y = getY__(type,'',posy);
    rack_translate.z = getZ__(type,'',posz);
    //rack_translate.id= id;
    rack_translate.nodes = [];
        
        var rack_material = {}
        rack_material.type = "material";
        rack_material.color = rack_rgb;
        rack_material.alpha = 0.9;
        rack_material.nodes = [];
            
            var rack_geometry = {};
            rack_geometry.type="geometry/box";
            rack_geometry.xSize=getXSize__(type);
            rack_geometry.ySize=getYSize__(type);
            rack_geometry.zSize=getZSize__(type);

        rack_material.nodes.push(rack_geometry);
    rack_translate.nodes.push(rack_material);

    //console.log(JSON.stringify(rack_translate));
    return rack_translate;
}


//This function makes a node that looks like a shelf pillar. 
// It needs parameters, a json data and y(height) value.
function getPillar(jsonData,x,y,z){
    var type= jsonData.type;    // here,  type : pillar
    var direction = jsonData.direction; 
    var posx = x;
    var posy = y;
    var posz = z;
    var id = jsonData.id;
    var pillar_translate = {};
    pillar_translate.type = "translate";
    pillar_translate.x = getX__(type,direction,posx);
    pillar_translate.y = getY__(type,direction,posy);
    pillar_translate.z = getZ__(type,direction,posz);
    //pillar_translate.id=id;
    pillar_translate.nodes = [];
        
        var pillar_flags = {};
        pillar_flags.type = "flags";
        pillar_flags.flags = {"transparent" : false};
        pillar_flags.nodes = [];
            var pillar_material = {};
            pillar_material.type = "material";
            pillar_material.color = direction=="center"?wall_rgb:rack_rgb;
            pillar_material.alpha = direction=="center"?0.9:0.9;
            pillar_material.nodes = [];
                
                var pillar_geometry = {};
                pillar_geometry.type="geometry/cylinder";
                if(jsonData.radius!=null && jsonData.raius!=0){
                	pillar_geometry.radiusTop = jsonData.radius;
                	pillar_geometry.radiusBottom = jsonData.radius;
                }else{
                	pillar_geometry.radiusTop = direction=="center"?0.3:0.07;
                	pillar_geometry.radiusBottom = direction=="center"?0.3:0.07;
                }
                pillar_geometry.height = 1;

            pillar_material.nodes.push(pillar_geometry);
        pillar_flags.nodes.push(pillar_material);
    pillar_translate.nodes.push(pillar_flags);

    //console.log(JSON.stringify(pillar_translate));
    return pillar_translate;
}




//This function makes a node that looks like a road. 
// It needs parameters, a json data and y(height) value.
function getRoad(jsonData,x,y,z){
    var type= jsonData.type;    // here,  type : road
    var direction = jsonData.direction;
    var posx = x;
    var posy = y;
    var posz = z;
    var id = jsonData.id;
    var road_translate = {};
    road_translate.type = "translate";
    road_translate.x = getX__(type,direction,posx);
    road_translate.y = getY__(type,direction,posy);
    road_translate.z = getZ__(type,direction,posz);
    //road_translate.id = id;
    road_translate.nodes = [];

        var road_geometry = {};
        road_geometry.type="geometry/road_"+direction;
    
    road_translate.nodes.push(road_geometry);

    //console.log(JSON.stringify(road_translate));
    return road_translate;
}


//This function makes a node that looks like a sphere. 
// It needs parameters, a json data and y(height) value.
function getSphere(jsonData,x,y,z){
    var type= jsonData.type;    // here,  type : sphere
    var direction = jsonData.direction; // direction is not needed
    var posx = x;
    var posy = y;
    var posz = z;
    var id = jsonData.id;
    var sphere_translate = {};
    sphere_translate.type = "translate";
    sphere_translate.x = getX__(type,direction,posx);
    sphere_translate.y = getY__(type,direction,posy)+0.3;
    sphere_translate.z = getZ__(type,direction,posz);
  
    //sphere_translate.id = id;
    sphere_translate.nodes = [];
        
        var sphere_material = {}
        sphere_material.type = "material";
        sphere_material.color = jsonData.type=="sensor"?{r:0.5, g:0.5, b:0.5}:{r:0.2, g:0.8, b:0.2};
        sphere_material.alpha = 0.9;
        sphere_material.nodes = [];
            
            var sphere_geometry = {};
            sphere_geometry.type="geometry/sphere";
            sphere_geometry.radius = 0.15;

        sphere_material.nodes.push(sphere_geometry);
    sphere_translate.nodes.push(sphere_material);

//    console.log(JSON.stringify(sphere_translate));
    return sphere_translate;
}


function getTextBox(jsonData,x,y,z){
    var type= jsonData.type;    // here,  type : textBox
    var direction = jsonData.direction; // we dont need
    var posx = x;
    var posy = y;
    var posz = z;
    var textBox_translate = {};
    textBox_translate.type = "translate";
    textBox_translate.x = getX__(type,direction,posx);
    textBox_translate.y = getY__(type,direction,posy+0.5);
    textBox_translate.z = getZ__(type,direction,posz);
    textBox_translate.data= jsonData.message;
    textBox_translate.nodes=[{type:"geometry" ,primitive:"points",positions:[posx,posy,posz], pointSize:1}];
    return textBox_translate;
    
}
function getImportObj(jsonData,x,y,z){
	var type = jsonData.type;
	var tag = jsonData.tag;
	var id = jsonData.id;
    var import_translate = {};
    import_translate.type = "translate"
    import_translate.x = x;
    import_translate.y = y+4;
    import_translate.z = z+0.5;
    import_translate.nodes = [];
    	
    	var import_rotate = {};
    	import_rotate.type = "rotate";
    	import_rotate.y=1
    	if(jsonData.direction=="left")import_rotate.angle = -90;
    	if(jsonData.direction=="right")import_rotate.angle = 90;
    	if(jsonData.direction=="back")import_rotate.angle = 180;
    	import_rotate.nodes = [];
    	
	    	var import_scale = {};
	    	import_scale.type = "scale";
	    	import_scale.x=1;
	    	import_scale.y=1;
	    	import_scale.z=1;
	    	import_scale.nodes = [];
	    	
		    	var import_material = {};
		    	import_material.type = "material";
		    	import_material.color = {"r":0.6,"g":0.6,"b":0.25};
		    	import_material.nodes = [];
		    	
			    	
			    	var import_node = {};
			    	if(tag=='obj') import_node.type="import/obj"
			    	import_node.src = "/lifetip-admin/libs/scenejs-master/examples/models/obj/"+jsonData.file_name;
	    	
			    import_material.nodes.push(import_node);
		    import_scale.nodes.push(import_material);
    	import_rotate.nodes.push(import_scale);
	import_translate.nodes.push(import_rotate);
	console.log(JSON.stringify(import_translate));
	return import_translate;
}



function getX__(type,direction, value) {
    var r = value;
    if(type=="wall"){
        if (direction == "front") r = value;
        else if (direction == "left") r = value-0.5
        else if (direction == "right") r = value+0.5
        else if (direction == "back") r = value;
        else if (direction == "ceil") r = value;
        else if (direction == "floor") r = value;
    }
    else if(type=="pillar"){
        if (direction == "front") r = value-0.4;
        else if (direction == "left") r = value-0.4
        else if (direction == "right") r = value+0.4
        else if (direction == "back") r = value+0.4;
    }
    else r = value;
    return r;
}

function getY__(type,direction, value) {
    var r = value;
    if(type=="wall"){
        if (direction== "front") r = value;
        else if (direction == "left") r = value;
        else if (direction== "right") r = value;
        else if (direction== "back") r = value;
        else if (direction== "ceil") r = value+0.5;
        else if (direction == "floor") r = value-0.5;
    }
    else if(type=="box2" || type=="boxclipQ" || type=="boxclipO"){
        r = value-0.05
    }
    else if(type=="rack"){
        r = value+0.1;
    }
    else if(type=="pillar"){
        r = value+0.6;
    }
    else if(type=="road"){
        r= value+0.08
    }
    else r = value;
    return r;
}


function getZ__(type,direction, value) {
    var r = value;
    if(type=="wall"){
        if (direction == "front") r = value+0.5;
        else if (direction == "left") r = value
        else if (direction == "right") r = value
        else if (direction == "back") r = value-0.5;
        else if (direction == "ceil") r = value;
        else if (direction == "floor") r = value;
    }
    else if(type=="pillar"){
        if (direction == "front") r = value+0.4;
        else if (direction == "left") r = value-0.4
        else if (direction == "right") r = value+0.4
        else if (direction == "back") r = value-0.4;
    }
    else r = value;
    return r;
}

    



function getXSize__(type,direction) {
    var r = 1;
    if(type=="wall"){
        if (direction == "front") r = 1;
        else if (direction == "left") r = 0.1;
        else if (direction == "right") r = 0.1;
        else if (direction == "back") r = 1;
        else if (direction == "ceil") r = 1;
        else if (direction == "floor") r = 1;
    }
    else if (type =="box" || type=="box2" || type=="boxclipQ" || type=="boxclipO" ) r = 0.85;
    else if (type=="rack") r = 1;
    return r/2;
}
function getYSize__(type,direction) {
    var r = 1;
    if(type=="wall"){
        if (direction == "front") r = 1;
        else if (direction == "left") r = 1;
        else if (direction == "right") r = 1;
        else if (direction == "back") r = 1;
        else if (direction == "ceil") r = 0.1;
        else if (direction == "floor") r = 0.1;
    }
    else if (type =="box" || type=="box2" || type=="boxclipQ" || type=="boxclipO" ) r = 0.6;
    else if (type=="rack") r = 0.1;
    return r/2;
}
function getZSize__(type,direction) {
    var r = 1;
    if(type=="wall"){
        if (direction == "front") r = 0.1;
        else if (direction == "left") r = 1;
        else if (direction == "right") r = 1;
        else if (direction == "back") r = 0.1;
        else if (direction == "ceil") r = 1;
        else if (direction == "floor") r = 1;
    }
    else if (type =="box" || type=="box2" || type=="boxclipQ" || type=="boxclipO" ) r = 0.85;
    else if (type=="rack") r = 1;
    return r/2;
}

function getRandomPointArroundSensor(groupId,center_point,point_type,temperature,humidity
										,max_radius,positions,yarray,point_count){
	var arroundPoints = [];
	arroundPoints.first = [];
	arroundPoints.second = [];
	arroundPoints.third = [];
	arroundPoints.fourth = [];
	
//	console.log(groupId);
//	console.log(JSON.stringify(center_point));
//	console.log(JSON.stringify(positions));
//	console.log(point_type);
//	console.log(point_count);
//	console.log(temperature);
//	console.log(humidity);
//	console.log(max_radius);
//	console.log(yarray);
	var minY = yarray[0];
	var maxY = yarray[0];
	for(var j = 1; j<yarray.length;j++){
		if(yarray[j]<minY) minY = yarray[j];
		if(yarray[j]>maxY) maxY = yarray[j];
	}
	var y_range = maxY-minY;
	
	for(var i =0; i<point_count ; i++){
		var point = {};
    	point.x = (Math.random()-0.5)*2*max_radius+center_point.x;
    	point.z = (Math.random()-0.5)*2*max_radius+center_point.z;
    	if(isInside(point, positions)){
    		var distance = getXZDistance(point,center_point);
//    		console.log("distance : "+distance );
//    		console.log(JSON.stringify(point));
    		if(distance <1)	arroundPoints.first.push(point.x, Math.random()*y_range+minY+0.01, point.z );
    		else if(distance>=1 && distance<4) arroundPoints.second.push(point.x, Math.random()*y_range+minY+0.01, point.z );
    		else if(distance>=4 && distance<9) arroundPoints.third.push(point.x, Math.random()*y_range+minY+0.01, point.z );
    		else if(distance>=9 && distance<20) arroundPoints.fourth.push(point.x, Math.random()*y_range+minY+0.01, point.z );
    		
    	}
	}
//	console.log(arroundPoints.first.length);
//	console.log(arroundPoints.second.length);
//	console.log(arroundPoints.third.length);
//	console.log(arroundPoints.fourth.length);
	
    var rand_point_layer={};
    if(point_type=="temperature"){
//    	 rand_point_layer.id = "temp_";
    	 var rand_point_material1 = getMaterial_temp(temperature,1,arroundPoints.first);
    	 var rand_point_material2 = getMaterial_temp(temperature,2,arroundPoints.second);
    	 var rand_point_material3 = getMaterial_temp(temperature,3,arroundPoints.third);
    	 var rand_point_material4 = getMaterial_temp(temperature,4,arroundPoints.fourth);
    }else if(point_type=="humidity"){
//    	 rand_point_layer.id = "humi_";
    	 var rand_point_material1 = getMaterial_humi(humidity,1,arroundPoints.first);
	   	 var rand_point_material2 = getMaterial_humi(humidity,2,arroundPoints.second);
	   	 var rand_point_material3 = getMaterial_humi(humidity,3,arroundPoints.third);
	   	 var rand_point_material4 = getMaterial_humi(humidity,4,arroundPoints.fourth);
    }
//    rand_point_layer.id+=groupId;
    rand_point_layer.nodes=[];
 
    
    	
//        var rand_point_material = {};
//        rand_point_material.type="material";
//        rand_point_material.color={r:0.7,g:0,b:0.3};// 온도 반영해서 색깔 넣는 것 필요함.
//        rand_point_material.alpha = 0.6;
//        rand_point_material.nodes = [];
//            var rand_point_geometry = {};
//            rand_point_geometry.type="geometry";
//            rand_point_geometry.primitive="points";
//            rand_point_geometry.positions=totalRandArr;
//            rand_point_geometry.pointSize=1;
//        rand_point_material.nodes.push(rand_point_geometry);
        rand_point_layer.nodes.push(rand_point_material1);
        rand_point_layer.nodes.push(rand_point_material2);
        rand_point_layer.nodes.push(rand_point_material3);
        rand_point_layer.nodes.push(rand_point_material4);

//    console.log(JSON.stringify(rand_point_layer));
    return rand_point_layer;

	
}
function getXZDistance(point1, point2){
	var distance = Math.sqrt((point1.x-point2.x)*(point1.x-point2.x)+ (point1.z-point2.z)*(point1.z-point2.z));
	return distance;
}
function getMaterial_temp(temperature,index,randArr){
	
	var positions = [];
	var maxTemp = 35;
	var minTemp = -15;
	var colorIndex = index;

	if(temperature>maxTemp) temperature = maxTemp;
	if(temperature<minTemp) temperature = minTemp;
	if(temperature<0) colorIndex =-3*index;
	
	var ratioTemp = (temperature-colorIndex-minTemp)*2;
	var colorObject = {};
	
	console.log(ratioTemp);
	
	if(ratioTemp >60){// temperature 가 15 도이상일때 그라데이션 값
		colorObject = {r:(200+(ratioTemp-60)*2)/256, g:(250-(ratioTemp-60)*6)/256 , b:(130-(ratioTemp-60)*5)/256};
	}else{//15도 미만 일때 그라데이션 값
		colorObject = {r:(80+(ratioTemp-60)*1)/256, g:(40+(ratioTemp)*1.3)/256 , b:(60+(ratioTemp)*2.3)/256};
	}
	
	console.log(JSON.stringify(colorObject));
	//	colorObject = {r:1,g:0,b:0};
	
	var rand_point_material = {};
	rand_point_material.alpha = 1-(index/10);
	rand_point_material.type="material";
	rand_point_material.color = colorObject;// 온도 반영해서 색깔 넣는 것 필요함.
//    rand_point_material.alpha = 1-;
    rand_point_material.nodes = [];
    for(var i =0; i<randArr.length/6; i++){
    	if(i%index==0){
    		positions.push(randArr[i*3]);
    		positions.push(randArr[i*3+1]);
    		positions.push(randArr[i*3+2]);
    	}
    }
    	var rand_point_flags = {};
    	rand_point_flags.type = "flags"
    	rand_point_flags.transparent = true;
    	rand_point_flags.nodes = [];
	        var rand_point_geometry = {};
	        rand_point_geometry.type="geometry";
	        rand_point_geometry.id = "points"+pointsCount;
	        rand_point_geometry.primitive="points";
	        rand_point_geometry.positions=positions;
	        rand_point_geometry.pointSize=5;
	    rand_point_flags.nodes.push(rand_point_geometry);  
    rand_point_material.nodes.push(rand_point_flags);
	pointsCount++;
	return rand_point_material;
}



function getRandomPoints(groupId,positions,yarray,temperature){
    var totalRandArr =[];
    
    
    var minX = positions[0].x;
	var minY = yarray[0];
	var minZ = positions[0].z;
	var maxX = positions[0].x;
	var maxY = yarray[0];
	var maxZ = positions[0].z;
	var heatPoints = [];
	for(var j = 1;j<positions.length;j++){
		if(positions[j].x<minX) minX = positions[j].x;
		if(positions[j].z<minZ) minZ = positions[j].z;
		if(positions[j].x>maxX) maxX = positions[j].x;
		if(positions[j].z>maxZ) maxZ = positions[j].z;
	}
	for(var j = 1; j<yarray.length;j++){
		if(yarray[j]<minY) minY = yarray[j];
		if(yarray[j]>maxY) maxY = yarray[j];
	}
  
    var x_range = maxX-minX;
    var y_range = maxY-minY;
    var z_range = maxZ-minZ;
    
    
    var num = polygonArea(positions)*10;
    
    for(var i = 0; i<num ; i++){
    	var point = {};
    	point.x = Math.random()*x_range+minX;
    	point.z = Math.random()*z_range+minZ;
    	if(isInside(point, positions)){
    		totalRandArr.push(point.x, Math.random()*y_range+minY+0.01, point.z );
    		
    	}
    }
    

    var totalLength = totalRandArr.length;
    var rand_point_layer={};
    rand_point_layer.id="temp_"+groupId;
    rand_point_layer.nodes=[];
 
        var rand_point_material = {};
        rand_point_material.type="material";
        rand_point_material.color= groupId=="4e0c1bd7-4380-4c0a-879f-c595065e2945"?{r:0.3,g:0.3,b:0.5}:{r:0.7,g:0,b:0.3};// 온도 반영해서 색깔 넣는 것 필요함.
        rand_point_material.alpha = 0.6;
        rand_point_material.nodes = [];
            var rand_point_geometry = {};
            rand_point_geometry.type="geometry";
            rand_point_geometry.primitive="points";
            rand_point_geometry.positions=totalRandArr;
            rand_point_geometry.pointSize=1;
        rand_point_material.nodes.push(rand_point_geometry);
        rand_point_layer.nodes.push(rand_point_material);


    console.log(JSON.stringify(rand_point_layer));
    return rand_point_layer;
}

function isInside(point, poly){ //point 는  {x:"",z:""} 이고, poly 는 [{x:"",z:""},{x:"",z:""},{x:"",z:""}] 꼴임.
	//crosses는 점q와 오른쪽 반직선과 다각형과의 교점의 개수
	var crosses = 0;
	for(var i = 0 ; i < poly.length ; i++){
		var j = (i+1)%poly.length;
		//점 point가 선분 (p[i], p[j])의 y좌표 사이에 있음
		if((poly[i].z > point.z) != (poly[j].z > point.z) ){
			//atX는 점 point를 지나는 수평선과 선분 (p[i], p[j])의 교점
			var atX = (poly[j].x- poly[i].x)*(point.z-poly[i].z)/(poly[j].z-poly[i].z)+poly[i].x;
			//atX가 오른쪽 반직선과의 교점이 맞으면 교점의 개수를 증가시킨다.
			if(point.x < atX)
				crosses++;
		}
	}
	return crosses % 2 > 0;
}


function  polygonArea(positions){
	  var area = 0;         // Accumulates area in the loop
	  var j = positions.length-1;  // The last vertex is the 'previous' one to the first
	  for (var i=0; i<positions.length; i++)
	    { area = area +  (positions[j].x+positions[i].x) * (positions[j].z-positions[i].z);
	      j = i;  //j is previous vertex to i
	    }
	  return Math.abs(area/2);
}


function getColorHeightMap(point_type){
	var heightMap_translate = {};
	heightMap_translate.type = "translate";
	heightMap_translate.x = -5;
	heightMap_translate.y = 13;
	heightMap_translate.nodes = [];
	heightMap_translate.id = point_type;
	alert("heightMap_translate.id :  " + heightMap_translate.id);
		var heightMap_material = {};
		heightMap_material.type = "material";
		heightMap_material.alpha = 0.7;
		heightMap_material.nodes = [];
			var heightMap_texture = {};
			heightMap_texture.type= "texture";
			heightMap_texture.src = "/lifetip-admin/libs/scenejs-master/examples/textures/100test_full_color.png";
			heightMap_texture.nodes = [];
				var heightMap_flags = {};
				heightMap_flags.type = "flags";
				heightMap_flags.flags = {"transparent":true};
				heightMap_flags.nodes = [];
					var heightMap_geometry = {};
					heightMap_geometry.type = "geometry/heightmap";
					heightMap_geometry.src = "/lifetip-admin/libs/scenejs-master/examples/textures/100test.png";
					//heightMap_geometry.src = "http://localhost:8081/lifetip-admin/libs/scenejs-master/examples/textures/sample01.png";
					heightMap_geometry.wire= false;
					heightMap_geometry.xSize= 100;
					heightMap_geometry.zSize= 70;
					heightMap_geometry.ySize= 30;
					heightMap_geometry.xSegments= 150;
					heightMap_geometry.zSegments= 150;
				heightMap_flags.nodes.push(heightMap_geometry);
			heightMap_texture.nodes.push(heightMap_flags);
		heightMap_material.nodes.push(heightMap_texture);
	heightMap_translate.nodes.push(heightMap_material);
	
	return heightMap_translate;

}

function color_HexToDeci(hexa){
	
	var colorStr = hexa;
	colorStr = colorStr.substring(1);
	var rStr = colorStr.substring(0,2);
	var gStr = colorStr.substring(2,4);
	var bStr = colorStr.substring(4,6);
	var rInt = parseInt(rStr, 16);
	var gInt = parseInt(gStr, 16);
	var bInt = parseInt(bStr, 16);
	return [rInt, gInt, bInt];
}