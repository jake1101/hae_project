/**
 * version 1.0
 * 
 * @author 홍윤성
 * 
 * 이 js파일을 사용하기 위해 이 파일과 같은 경로 상에 plugins 폴더와 그 하위 내용들, jquery , scenejs.js 혹은
 * scenejs.min.js 가 필요하며,
 * 
 * 사용 방법 및 예시는 raysolution.html 에서 확인 할 수 있다.
 */
// var floor_rgb = {r:225/256, g:162/256, b:108/256}; // 바닥에 들어갈 색
var floor_rgb = {r:166/256, g:166/256, b:166/256}; // 바닥에 들어갈 색
var wall_rgb = {r:166/256, g:166/256, b:166/256}; // 벽과 기둥에 들어갈 색
var plane_rgb = {r: 221/256, g: 221/256, b: 187/256}; // 전체 평면의 색
// var plane_rgb = {r: 0/256, g: 102/256, b: 51/256}; // 전체 평면의 색
// var plane_rgb = {r: 38/256, g: 115/256, b: 38/256}; // 전체 평면의 색
var rack_rgb = {r:170/256, g:170/256, b:150/256};
var box_rgb = {r:153/256, g:77/256, b:0/256};




var Ray = function(){

	var me = this;
	var cuurentCanvasUUID;
	var camera;
	var cameraType;
	var loadOK=false;
	var sceneObject;
	var isConverted = false;
	var myScene;
	var sceneJsonArray = [];
	var sceneGroupArray = [];
	var selectedHighlight = false;
	var highlightWall = {};
	
	var textureList = [];
	var textureList_tick ;
	
	var modelCenterPosition = {};
	var modelTotalXwidth;
	var modelTotalZwidth;
	var rotating;
	var plugins = "plugins";
	var currentXYZ = {"x":0, "y":0, "z":0};
	this.currentXYZ = function(){return currentXYZ;}
	this.myScene = function(){return myScene;}
	this.setProjectPositions = function(positions){
		// console.log("!@#!@#"+positions[0].x);
		var point_count = 0;
		var x = 0;
		var z = 0;
		var minX = positions[0].x;
		var maxX = positions[0].x;
		var minZ = positions[0].z;
		var maxZ = positions[0].z;
		for(var i =0; i<positions.length ; i++){
			point_count++;
			x += parseInt(positions[i].x);
			z += parseInt(positions[i].z);
			if(minX>parseInt(positions[i].x)) minX = positions[i].x;
			if(maxX<parseInt(positions[i].x)) maxX = positions[i].x;
			if(minZ>parseInt(positions[i].z)) minZ = positions[i].z;
			if(maxZ<parseInt(positions[i].z)) maxZ = positions[i].z;
			
		}
		x = x/point_count;
		z = z/point_count;
		centerPosition.x = x;
		centerPosition.z = z;
		totalXwidth = maxX-minX;
		totalZwidth = maxZ-minZ;
		
		
	};
	this.setPluginPath = function(path){
		plugins = path;
	}
	
	
	
	
	/**
	 * paramter : (DOM <canvas> 태그의 id 값,cameraType) id 값 널 일때, 자동으로 canvas 생성,
	 * cameraType default 값 : cameras/orbit camera 타입은 cameras/orbit 그리고
	 * cameras/pickFlyOrbit 두 개 가능. 기능 : canvas에 화면 생성. 리턴 : root element (복수 개의
	 * 화면을 구성 해야 할 시에 구분지을 수 있는 요소.)
	 * 
	 * 완전 수정 : 2019 04 09 hys 카메라, 바닥의 평면 및 텍스쳐파일 등에 대해서 대폭 수정됨.
	 */
	this.createScene = function(canvasID,boolean_cam_type,boolean_transparent){
		console.log("getSceneStart");
		cuurentCanvasID = canvasID;
		SceneJS.setConfigs({
			pluginPath:plugins
		});
		if(boolean_transparent==undefined || boolean_transparent == null || boolean_transparent == false){
			boolean_transparent = false;
		}
		
		try{
			var id = UT.generateUUID();
			cuurentCanvasUUID = id;
		}catch(e){
			cuurentCanvasUUID = canvasID;
		}
		
		myScene = SceneJS.createScene({
			"canvasId": canvasID,
			"id" : cuurentCanvasUUID,
			"transparent" : boolean_transparent,
			"nodes": []
			
		});
		
		if(boolean_cam_type==undefined || boolean_cam_type ==null || boolean_cam_type == false){
			cameraType = "cameras/orbit";
			myScene.on("pick",function (hit) {
				if(!rotating){
					var x= hit.worldPos[0];
					var y= hit.worldPos[1];
					var z= hit.worldPos[2];
					myScene.getNode("baseLayer",function(baseLayer){
						myScene.getNode("centerLayer",function(centerLayer){
							myScene.getNode("planeLayer",function(planeLayer){
								var xyz = planeLayer.getXYZ();
								planeLayer.setXYZ({x:xyz.x-x, y:xyz.y-y, z:xyz.z-z})
								centerLayer.setXYZ({x:xyz.x-x, y:xyz.y-y, z:xyz.z-z})
								baseLayer.setXYZ({x:xyz.x-x, y:xyz.y-y, z:xyz.z-z})
								// console.log("x : "+x+" y : " + y + " z : "+
								// z);
								// console.log("x : "+(-xyz.x+x)+" y : " +
								// (-xyz.y+y) + " z : "+ (-xyz.z+z));
								currentXYZ.x = (-xyz.x+x);
								currentXYZ.y = (-xyz.y+y);
								currentXYZ.z = (-xyz.z+z);
								//me.clipMove();
								// me.showPointer(0,0,0);
							})
						})
					});
				}
		    });
		}else{
			cameraType = "cameras/pickFlyOrbit";
		}
		
		
		
		return this;
	}
	this.removeCamera = function(cameraExist){
		if(cameraExist==true){
			//
			
			// console.log("removeCamera!");
			myScene.getNode("mainCameras", function(mainCameras){
				sceneGroupArray = [];
				selectedHighlight= false;
				mainCameras._destroy();
				mainCameras.destroy();
			})
		}
	}
	this.getCamera = function(){
		myScene.getNode("mainCameras",function(mainCameras){
			console.log(mainCameras);
			return mainCameras;
		});
		return;
	}
	
	// hys 2019 04 09 projectTagObject
	this.createCamera = function(projectTagObject,boolean){
		console.log("createCamera!");
		myScene.getNode(cuurentCanvasUUID,function(mainCanvas){
			// 들어온게 스트링 타입이라면 JSON 형태로 변환시켜준다.
			
			// console.log(projectTagObject)
			// 0. default 설정.
			var defaultXZPlane = null;
			var defaultCameraSet = {cameraType : cameraType, zoom:110};
			var defaultColorSet = {floor_rgb : {r:166, g:166, b:166}, // 바닥에
																		// 들어갈 색
									wall_rgb : {r:166, g:166, b:166}, // 벽과
																		// 기둥에
																		// 들어갈 색
									plane_rgb : {r: 221, g: 221, b: 187}, // 전체
																			// 평면의
																			// 색
			 						rack_rgb : {r:132, g:132, b:112}, // 랙의 색
			 						box_rgb : {r:153, g:77, b:0} // 짐 색
									};
			var defaultSkyBox = {texture : "skybox/grimmNight"};
			
			
			if(projectTagObject==null || projectTagObject==undefined){ // projectTagObject
																		// 자체가
																		// 없을 때
				// alert("default Setiing!!");
				projectTagObject = {xzPlane:defaultXZPlane, cameraSet:defaultCameraSet, colorSet:defaultColorSet,skyBox:defaultSkyBox };
			}else{// projectTagObject 는 있는데, 하위 object 중에 없는 것이 있을 때, default로
					// 셋팅.
				
				if(typeof(projectTagObject)=="string"){
					projectTagObject = JSON.parse(projectTagObject);
				}
				
				if(projectTagObject.xzPlane==null || projectTagObject.xzPlane==undefined){projectTagObject.xzPlane = defaultXZPlane;}
				if(projectTagObject.cameraSet==null || projectTagObject.cameraSet==undefined){projectTagObject.cameraSet = defaultCameraSet;}
				if(projectTagObject.colorSet==null || projectTagObject.colorSet==undefined){projectTagObject.colorSet = defaultColorSet;}
			}
			
			
			
			
			
			// 1. Camera 및 기본 translate node 추가.
			var cameraSet = projectTagObject.cameraSet;
			// var cameraType = cameraSet.cameraType;
			
			var zoom = cameraSet.zoom;
			zoom = zoom?zoom:110;
			
	        camera ={type:cameraType, id:"mainCameras", nodes:[]};
	        if(camera.type=="cameras/orbit"||camera.type=="cameras/pickFlyOrbit"){
	            camera.pitch= -15,
	            camera.maxPitch= 89,
	            camera.minPitch= -89,
	            camera.yaw= camera.type=="cameras/orbit"?0:180,
	            camera.zoom= zoom,
	            camera.zoomSensitivity= -11.0,
	            camera.eye= {"x": 0,"y": 0,"z": 50},
	            camera.look= {"x": 0,"y": 0,"z": 0},
	            camera.up = {"x": 0,"y": 1,"z": 0},
	            camera.showCursor = false
	        }
	        
	        // 시간에 따라 배경 바뀌는 것 수정. -> 일단 없앴음.
// var d = new Date();
// var skybox = "";
// if(d.getHours()>7 && d.getHours()<18){
// skybox = "skybox/cloudySea";
// }else if(d.getHours()>=18 && d.getHours()<20){
// skybox = "skybox/violentDays";
// }else{
// skybox = "skybox/grimmNight";
// }
	        var skybox = null;
	        if(projectTagObject==null || projectTagObject.skyBox == null || projectTagObject.skyBox.src == null){
	        	skybox = null;
	        }
	        else{
	        	skybox = projectTagObject.skyBox.src;
	        }
	        
	        var rotate = {type:"rotate", id:"myRotate", y:1.0, angle:0};
	        rotate.nodes=[];
	        rotate.nodes.push({type:"translate",x:0,y:0,z:0, nodes:[{type:skybox, size : 2000}]});
	        rotate.nodes.push({id:"centerLayer",type:"translate",x:0,y:0,z:0});
	        rotate.nodes.push({id:"baseLayer",type:"translate",x:0,y:0,z:0});
	        var planeLayer = {id:"planeLayer",type:"translate",x:0,y:0,z:0};
	        
	        if(getXZImagePlane(projectTagObject)!=null || getXYImagePlane(projectTagObject)!=null){
	        	planeLayer.nodes = [];
	        }
	        if(getXZImagePlane(projectTagObject)!=null){
	        	planeLayer.nodes.push(getXZImagePlane(projectTagObject));
	        }
	        if(getXYImagePlane(projectTagObject)!=null){
	        	planeLayer.nodes.push(getXYImagePlane(projectTagObject));
	        }
	        rotate.nodes.push(planeLayer);
	        camera.nodes.push(rotate);
	        //console.log(camera);
	        mainCanvas.addNode(camera);
	        
	        
	        
// var rotate = {type:"rotate", id:"myRotate", y:1.0, angle:0, multOrder:"pre"};
// rotate.nodes=[];
// camera.nodes.push({type:skybox, size : 2000});
// camera.nodes.push({id:"centerLayer",type:"translate",x:0,y:0,z:0});
// camera.nodes.push({id:"baseLayer",type:"translate",x:0,y:0,z:0});
// var planeLayer = {id:"planeLayer",type:"translate",x:0,y:0,z:0};
// if(getImagePlane(projectTagObject)!=null){
// planeLayer.nodes = [];
// planeLayer.nodes.push(getImagePlane(projectTagObject));
// }
// camera.nodes.push(planeLayer);
// rotate.nodes.push(camera);
// mainCanvas.addNode(rotate);
	        
	        
	        
	        if(projectTagObject.modelInfo!=null && projectTagObject.modelInfo!=undefined){
	        	modelCenterPosition.x = projectTagObject.modelInfo.centerPosition.x;
	        	modelCenterPosition.z = projectTagObject.modelInfo.centerPosition.z;
	        	modelCenterPosition.y = projectTagObject.modelInfo.centerPosition.y;
	        	modelTotalXwidth  = projectTagObject.modelInfo.width;
	        	modelTotalZwidth = projectTagObject.modelInfo.height;
	        	// console.log(modelCenterPosition.x+"/"+modelCenterPosition.y+"/"+modelCenterPosition.x+"//"+modelTotalXwidth+"/"+modelTotalZwidth);
	        }
	        function getXZImagePlane(projectTagObject){
		        // 2. 기본평면 있으면 추가. 없으면 놔둔다.
		        if(projectTagObject.xzPlane!=null && projectTagObject.xzPlane!=undefined){
		        	var xzPlane = projectTagObject.xzPlane;
		        		var object_translate = {type:"translate", x:xzPlane.centerPosition.x, z:xzPlane.centerPosition.z , y:xzPlane.centerPosition.y, nodes:[]};
			    			var object_material = {type:"material", color:{r:160/256,g:160/256,b:160/256},alpha:1, nodes:[]};
			    				if(projectTagObject.xzPlane.color!=undefined){
			    					object_material.color={r:projectTagObject.xzPlane.color.r/256
			    							, g:projectTagObject.xzPlane.color.g/256
			    							, b:projectTagObject.xzPlane.color.b/256
			    					};
			    				}
		    					var object_rotate = {type:"rotate",x:1,angle:-90,nodes:[]};
		    						var object_texture = {type:"texture", applyTo:"color", nodes:[]};
		    						if(xzPlane.src!=undefined) object_texture.src = xzPlane.src;
		    							var object_geometry = {type:"geometry/plane"};
		    							object_geometry.width= xzPlane.width;
		    							object_geometry.height= xzPlane.height;
		    							object_geometry.wire= false;
		    							object_geometry.widthSegments= 100;
										object_geometry.heightSegments= 100;
			    						object_texture.nodes.push(object_geometry);
			    					object_rotate.nodes.push(object_texture);
			    				object_material.nodes.push(object_rotate);
			    				// object_material.nodes.push(object_texture);
			    			object_translate.nodes.push(object_material);
			    			// console.log(object_translate);
			    	return object_translate;
		        }
		        return null;
			}
	        function getXYImagePlane(projectTagObject){
		        // 2. 기본평면 있으면 추가. 없으면 놔둔다.
		        if(projectTagObject.xyPlane!=null && projectTagObject.xyPlane!=undefined){
		        	var xyPlane = projectTagObject.xyPlane;
		        		var object_translate = {type:"translate", x:xyPlane.centerPosition.x, z:xyPlane.centerPosition.z , y:xyPlane.centerPosition.y, nodes:[]};
			    			var object_material = {type:"material", color:{r:160/256,g:160/256,b:160/256},alpha:1, nodes:[]};
			    				if(projectTagObject.xyPlane.color!=undefined){
			    					object_material.color={r:projectTagObject.xzPlane.color.r/256
			    							, g:projectTagObject.xzPlane.color.g/256
			    							, b:projectTagObject.xzPlane.color.b/256
			    					};
			    				}
		    					var object_rotate = {type:"rotate",x:1,angle:0,nodes:[]};
		    						var object_texture = {type:"texture", applyTo:"color", nodes:[]};
		    						if(xyPlane.src!=undefined) object_texture.src = xyPlane.src;
		    							var object_geometry = {type:"geometry/plane"};
		    							object_geometry.width= xyPlane.width;
		    							object_geometry.height= xyPlane.height;
		    							object_geometry.wire= false;
		    							object_geometry.widthSegments= 100;
										object_geometry.heightSegments= 100;
			    						object_texture.nodes.push(object_geometry);
			    					object_rotate.nodes.push(object_texture);
			    				object_material.nodes.push(object_rotate);
			    				// object_material.nodes.push(object_texture);
			    			object_translate.nodes.push(object_material);
			    	return object_translate;
		        }
		        return null;
			}
	        // 3. color 셋팅을 바꾼다.
	        // console.log(JSON.stringify(projectTagObject));
	        if(projectTagObject.colorSet){
	        	if(projectTagObject.colorSet.floor_rgb!=undefined){
	        		var rgb = projectTagObject.colorSet.floor_rgb;
	        		if(rgb.r>1) rgb.r = rgb.r/256;
	        		if(rgb.g>1) rgb.g = rgb.g/256;
	        		if(rgb.b>1) rgb.b = rgb.b/256;
	        		floor_rgb = rgb; 
	        	}
	        	if(projectTagObject.colorSet.wall_rgb!=null && projectTagObject.colorSet.wall_rgb!=undefined){
	        		var rgb = projectTagObject.colorSet.wall_rgb;
	        		if(rgb.r>1) rgb.r = rgb.r/256;
	        		if(rgb.g>1) rgb.g = rgb.g/256;
	        		if(rgb.b>1) rgb.b = rgb.b/256;
	        		wall_rgb = rgb; 
	        	}
	        	if(projectTagObject.colorSet.plane_rgb!=null && projectTagObject.colorSet.plane_rgb!=undefined){
	        		var rgb = projectTagObject.colorSet.plane_rgb;
	        		if(rgb.r>1) rgb.r = rgb.r/256;
	        		if(rgb.g>1) rgb.g = rgb.g/256;
	        		if(rgb.b>1) rgb.b = rgb.b/256;
	        		plane_rgb = rgb; 
	        	}
	        	if(projectTagObject.colorSet.rack_rgb!=null &&  projectTagObject.colorSet.rack_rgb!=undefined){
	        		var rgb = projectTagObject.colorSet.rack_rgb;
	        		if(rgb.r>1) rgb.r = rgb.r/256;
	        		if(rgb.g>1) rgb.g = rgb.g/256;
	        		if(rgb.b>1) rgb.b = rgb.b/256;
	        		rack_rgb = rgb; 
	        	}
	        	if(projectTagObject.colorSet.box_rgb!=null && projectTagObject.colorSet.box_rgb!=undefined){
	        		var rgb = projectTagObject.colorSet.box_rgb;
	        		if(rgb.r>1) rgb.r = rgb.r/256;
	        		if(rgb.g>1) rgb.g = rgb.g/256;
	        		if(rgb.b>1) rgb.b = rgb.b/256;
	        		box_rgb = rgb; 
	        	}
	        }
		
		
		})
		
		return true;
	}// end of createCamera
	
	
	
	/**
	 * parameter : {} json 형태 취급 가능한 property : yaw, pitch, zoom,
	 * zoomSensitivity, eye, look, up scenejs.js 참고하여 추가 가능. (zoom의 max, min 값 등
	 * 추가 가능함) 기능 : parameter 의 값으로 현재 카메라의 옵션 컨트롤 리턴 : 없음.
	 * 
	 *  ( 사용 예시 ) yaw= 0, pitch= -20, zoom= 110, zoomSensitivity= -7.0, eye=
	 * {"x": 0,"y": 0,"z": 50}, look= {"x": 0,"y": 0,"z": 0}, up = {"x": 0,"y":
	 * 1,"z": 0}
	 * 
	 */
// this.setCameraOptions = function(params){
// myScene.getNode("lookAt",function(mainCameras){
// // mainCameras.yaw= params.yaw && params.yaw!="default"? params.yaw :0;
// // mainCameras.pitch= params.pitch && params.pitch!="default"? params.pitch
// :-20;
// // mainCameras.zoom= params.zoom && params.zoom!="default"? params.zoom :110;
// // mainCameras.zoomSensitivity= params.zoomSensitivity &&
// params.zoomSensitivity!="default"? params.zoomSensitivity :-7.0;
// // mainCameras.eye = params.eye && params.eye!="default"? params.eye :{"x":
// 0,"y": 0,"z": 50};
// mainCameras.setLook(params.look && params.look!="default"? params.look :{"x":
// 0,"y": 0,"z": 0});
// // mainCameras.up = params.up && params.up!="default"? params.up :{"x":
// 0,"y": 1,"z": 0};
// // alert("카메라 바꾸나ㅣ?");
// })
//		
// }
	
	this.makeTextBox = function(jsonArray,textBoxDivId,centerFlag){
		var textBoxDivId = textBoxDivId || "textBoxDiv";
		var centerFlag = centerFlag || false;
		for(var i =0; i<jsonArray.length; i++){
			var tempJson = convertToFullArray(jsonArray[i]);
// console.log(tempJson);
			if(tempJson.message==null) return;
			if ( $("#positions_"+tempJson.id).length > 0 ) { 
				$("#positions_"+tempJson.id).remove();
			}	
			if(centerFlag==true){
				$("#"+textBoxDivId).append("<div style='height:20px;'data-group-id='positions_"+tempJson.id+"' class='layer"+tempJson.layer_group_id+" "+tempJson.style+" transparent-ui'  id='positions_"+tempJson.id+"'></div>");
			}else{
				$("#"+textBoxDivId).append("<div style='height:20px;'data-group-id='positions_"+tempJson.id+"' class='layer"+tempJson.layer_group_id+" "+tempJson.style+" transparent-ui'  id='positions_"+tempJson.id+"'></div>");
			}
			var element;
		
			myScene.getNode("positions_"+tempJson.id,function(textboxAnchor){
				textboxAnchor.data = tempJson.message;
				element = $("#"+textboxAnchor.id);
				element.html(textboxAnchor.data);
				textboxAnchor.on("rendered",function(event){
					updateLabelPos(
							this.id,
							event.getCanvasPos(),
							event.getProjPos(),
							event.getCameraPos(),
							event.getViewPos(),
							event.getWorldPos(),
							element);
				});
			})
		}
		
	}
	
	this.textAnchor_position = function(position_id,divEle,callBack,notFound){
		myScene.getNode("position_"+position_id,function(textboxAnchor){
			//console.log(textboxAnchor);
//			if(textboxAnchor.parent._core.enabled==false){
//				notFound();
//			}else{
				callBack(divEle);
				textboxAnchor.on("rendered",function(event){
					var id = textboxAnchor.id;
					element = $("#"+id);
					
					/*
					 * var canvas = myScene.getCanvas(); var canvasPos =
					 * event.getCanvasPos(); console.log("left"+
					 * (canvas.offsetLeft + canvasPos.x)); console.log("top"+
					 * (canvas.offsetTop + canvasPos.y));
					 */
					updateLabelPos(
							id,
							event.getCanvasPos(),
							event.getProjPos(),
							event.getCameraPos(),
							event.getViewPos(),
							event.getWorldPos(),
							element);
				});
//			}
		})// end of getNode();
		
	}// end of text anchor
	this.textAnchor_issue = function(position_id,divEle,callBack,notFound){
		myScene.getNode("issue_"+position_id,function(textboxAnchor){
			
//			if(textboxAnchor.parent._core.enabled==false){
//				notFound();
//			}else{
				callBack(divEle);
				textboxAnchor.on("rendered",function(event){
					var id = textboxAnchor.id;
					element = $("#"+id);
					
					/*
					 * var canvas = myScene.getCanvas(); var canvasPos =
					 * event.getCanvasPos(); console.log("left"+
					 * (canvas.offsetLeft + canvasPos.x)); console.log("top"+
					 * (canvas.offsetTop + canvasPos.y));
					 */
					updateLabelPos(
							id,
							event.getCanvasPos(),
							event.getProjPos(),
							event.getCameraPos(),
							event.getViewPos(),
							event.getWorldPos(),
							element);
				});
//			}
		})// end of getNode();
		
	}// end of text anchor
	this.textAnchor_area = function(position_id,divEle,callBack,notFound){
		myScene.getNode("area_"+position_id,function(textboxAnchor){
			
//			if(textboxAnchor.parent._core.enabled==false){
//				notFound();
//			}else{
			callBack(divEle);
			textboxAnchor.on("rendered",function(event){
				var id = textboxAnchor.id;
				element = $("#"+id);
				
				/*
				 * var canvas = myScene.getCanvas(); var canvasPos =
				 * event.getCanvasPos(); console.log("left"+
				 * (canvas.offsetLeft + canvasPos.x)); console.log("top"+
				 * (canvas.offsetTop + canvasPos.y));
				 */
				updateLabelPos(
						id,
						event.getCanvasPos(),
						event.getProjPos(),
						event.getCameraPos(),
						event.getViewPos(),
						event.getWorldPos(),
						element);
			});
//			}
		})// end of getNode();
		
	}// end of text anchor
	this.updateSensorSts = function(position_id,sts){
		myScene.getNode("position_"+position_id+"_material",function(material){
			var color = {};
			if(sts =='in'){
	        	color ={r:0.2,g:0.6,b:0.2};
	        }
	        if(sts =='outBattery'){
	        	color ={r:0.6,g:0.6,b:0.2};
	        }
	        if(sts =='outTemp'){
	        	color ={r:0.6,g:0.2,b:0.2};
	        }
	        if(sts =='outHumi'){
	        	color ={r:0.2,g:0.2,b:0.6};
	        }
	        if(sts =='error'){
	        	color ={r:0.2,g:0.2,b:0.2};
	        }
			
			material.setColor(color);
		})
	}
	this.updateBeaconSts = function(position_id,sts){
		myScene.getNode("position_"+position_id+"_material",function(material){
			var color = {};
			if(sts =='in'){
	        	color ={r:0.2,g:0.6,b:0.2};
	        }
	        if(sts =='emergency'){
	        	color ={r:0.6,g:0.2,b:0.2};
	        }
			material.setColor(color);
		})
	}
	
	
	
	
	
	this.moveTo= function(x,y,z){
		
		if(cameraType =='cameras/orbit'){			
			myScene.getNode("baseLayer",function(baseLayer){
				myScene.getNode("centerLayer",function(centerLayer){
					myScene.getNode("planeLayer",function(planeLayer){
						var xyz = planeLayer.getXYZ();
						planeLayer.setXYZ({x:-x, y:-y, z:-z})
						centerLayer.setXYZ({x:-x, y:-y, z:-z})
						baseLayer.setXYZ({x:-x, y:-y, z:-z})
					})
				})
			});
		}
		else if(cameraType=="cameras/pickFlyOrbit"){
			myScene.getNode("mainCameras",function(mainCameras){
				mainCameras.moveTo(
						{
							worldPos : [x,y,z]
						}
				)
			})
			
		}
		//me.clipMove();
		
	}
//	
//	this.clipMove = function(){
//		myScene.getNode("moving_clip",function(clip){
//			clip._setClip(0,
//	            // Left
//	            {
//	                x: 0.0,
//	                y: 0.0,
//	                z: 1.0,
//	                dist: 10.0-Number(currentXYZ.z),
//	                mode: "inside"
//	            }
//	        )
//		})
//	}
//	
	
	
	
	
	this.addJsonData = function(jsonArray, callBack){
		isConverted = true;
		sceneJsonArray = JSON.parse(JSON.stringify(jsonArray)); // deep copy;
		if(jsonArray==null || jsonArray==undefined || jsonArray.length==0 ) return;
		
		

		myScene.getNode("centerLayer",function(layer){
//			console.log(new Date() + "  centerLayer에 추가  시작  json:" + JSON.stringify(jsonArray));
			for(var i =0; i<jsonArray.length; i++){				
//				console.log(new Date() + "  centerLayer에 추가  시작 index:" + i);
				
				if(jsonArray[i].type!="group"){
					// try{
						if(jsonArray[i].type=="position"){
							var convertedArray = convertToFullArray(jsonArray[i]);
							myScene.getNode(convertedArray.group_id,function(groupObject){
								var jsonWithId = {
										type:"translate",
										id:"position_"+convertedArray.id, 
										data:convertedArray.message,
										nodes:[
											{
												type:"name", 
												name:"name_position_"+convertedArray.id,
												nodes : []
											}
										] 
								}
				    			if(convertedArray.device_type=="sensor"){
				    				jsonWithId.nodes[0].nodes.push(getTempSensor(convertedArray,convertedArray.xarray,convertedArray.yarray,convertedArray.zarray))
				    			}
								if(convertedArray.device_type=="beacon"){
									jsonWithId.nodes[0].nodes.push(getBeacon(convertedArray,convertedArray.xarray,convertedArray.yarray,convertedArray.zarray))
								}
								//console.log(jsonWithId);
								groupObject.addNode(jsonWithId);
							});
								
						}else if(jsonArray[i].type=="issue"){
							var convertedArray = convertToFullArray(jsonArray[i]);
							myScene.getNode(convertedArray.group_id,function(groupObject){
								var jsonWithId = {
										type:"translate",
										id:"issue_"+convertedArray.id, 
										data:convertedArray.message,
										nodes:[
											{
												type:"name", 
												name:"name_issue_"+convertedArray.id,
												nodes : []
											}
										] 
								}
								jsonWithId.nodes[0].nodes.push(getIssue(convertedArray,convertedArray.xarray,convertedArray.yarray,convertedArray.zarray))
								groupObject.addNode(jsonWithId);
								//console.log(jsonWithId);
							});
						}else if(jsonArray[i].type=="area"){
							var convertedArray = convertToFullArray(jsonArray[i]);
							myScene.getNode(convertedArray.group_id,function(groupObject){
								var jsonWithId = {
										type:"translate",
										id:"area_"+convertedArray.id, 
										data:convertedArray.message,
										nodes:[
											{
												type:"name", 
												name:"name_area_"+convertedArray.id,
												nodes : []
											}
											] 
								}
								jsonWithId.nodes[0].nodes.push(getBeacon(convertedArray,convertedArray.xarray,convertedArray.yarray,convertedArray.zarray))
								groupObject.addNode(jsonWithId);
								//console.log(jsonWithId);
							});
						}
						else{
							layer.addNodes(getObjectArray(jsonArray));
						}
				}// end of if
				else {
					var sensor_id_array = [];
					var nodev = getObjectArray(jsonArray[i].items,sensor_id_array);
					/*console.log(new Date() + "  groupId : " + jsonArray[i].id+ " , name : "+jsonArray[i].name + "추가");
					console.log(nodev);*/
					layer.addNode(
							{
								"type":"name",
								"name" :jsonArray[i].id,
								"nodes" :[
									{"type":"enable", "id":jsonArray[i].id ,"nodes" : nodev.length>0?nodev:null }
								]
							}
							// {"type":"enable", "id":jsonArray[i].id}
					);
//					for(var j = 0; j<nodev.length; j++){
//						myScene.getNode(jsonArray[i].id,function(groupNode){
//								try{
//									groupNode.addNode(nodev[j]);
//								}catch(error){
//									console.log(error.message);
//								}
//							}
//						);
//					}
//					
					
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
					
				/*	for(var j = 0; j<jsonArray[i].items.length;j++){
						if(jsonArray[i].items[j].type=="textbox"){
							var element;
							myScene.getNode(jsonArray[i].items[j].id,function(textbox){
								
								element = $("#" + textbox.id);
						        element.html(textbox.data);
						        // console.log(element.html());
						        textbox.on("rendered",function(event){
						        	updateLabelPos(
											this.id,
											event.getCanvasPos(),
											event.getProjPos(),
											event.getCameraPos(),
											event.getViewPos(),
											event.getWorldPos(),
											element);
								});
							})
							
						}
					}// end of for
*/					
				}// end of else
				
				
				
//				console.log(new Date() + "  centerLayer에 추가  끝 index:" + i);
			}// end of for
			
		});
	}
	
	this.removeJsonData = function(jsonArray,callBack){ //[{id:'position_33'},{},{}] 
		//console.log(jsonArray);
		var k = 0;
		var len = jsonArray.length;
		var compareLen = jsonArray.length-1;
		
		for(var i = 0; i<len;i++ ){
			myScene.getNode(jsonArray[i].id,function(nodeToRemove){
				nodeToRemove.destroy();
				
				if(i==compareLen){
					callBack();
				}
			})
		}
	} 
	
	
// this.createXZBasePlane = function(width,height){
// myScene.getNode("planeLayer",function(centerLayer){
// //centerLayer.addNode(getXZPlane());
// var object_material = {};
// object_material.type = "material";
// object_material.color= {r:160/256,g:160/256,b:160/256};
// object_material.alpha = 1;
// // object_material.emit = 0.2;
// object_material.nodes=[];
// var object_scale = {};
// object_scale.type= "scale";
// object_scale.x= 1;
// object_scale.z= 1;
// object_scale.nodes = [];
// var object_rotate = {};
// object_rotate.type= "rotate";
// object_rotate.x= 1;
// object_rotate.angle= 90;
// object_rotate.nodes= [];
// var object_texture = {};
// object_texture.type="texture";
// object_texture.src =
// "http://localhost:8080/repository/texture/floor_outdoor.png";
// object_texture.applyTo = "color";
// object_texture.nodes = [];
// var object_geometry = {};
// object_geometry.type= "geometry/plane";
// object_geometry.width= 120;
// object_geometry.height= 90;
// object_geometry.wire= false;
// object_geometry.widthSegments= 100;
// object_geometry.heightSegments= 100;
// object_texture.nodes.push(object_geometry);
// object_rotate.nodes.push(object_texture);
// // object_rotate.nodes.push(object_geometry);
// object_scale.nodes.push(object_rotate);
// object_material.nodes.push(object_scale);
// centerLayer.addNode({
// "type":"translate",
// "x":-5,
// "z":5,
// nodes :[object_material]
// });
// })
// };

	
	
	this.showHeightMap = function(point_type,filePath,colorFilePath){

		myScene.getNode("centerLayer",function(centerLayer){
			centerLayer.addNode(getColorHeightMap(point_type,filePath,colorFilePath));
		})

		
	}
	this.hideHeightMap = function(point_type){
		if(myScene.getNode(point_type)) {
			myScene.getNode(point_type,function(pointMap){
				pointMap.destroy();
			});
		}
	}
	
	
	
// function createPointMap(groupData,point_type){
// var positions = groupData.positions;
// //console.log(groupData.yarray);
// var yarray = groupData.yarray;
// var groupId = groupData.id;
// if(positions==null || yarray==null) return;
// myScene.getNode(groupData.id, function(groupNode){
// //groupData.addNodes(getRandomPoints(groupId,sensor_type,positions,yarray,num,heatValue));
// // console.log("group 에 잘 들어가나.");
// //console.log(JSON.stringify(groupData));
//			
// for(var i =0; i<groupData.items.length;i++){
// myScene.getNode(groupData.items[i],function(sensor){
// var center_point = {"x":sensor.data.x, "y":sensor.data.y, "z":sensor.data.z};
// var temperature = sensor.data.temperature;
// var humidity = sensor.data.humidity;
// // console.log("cetnerPoint 찍히나");
// // console.log(JSON.stringify(center_point));
// // console.log("temperautre : " + temperature);
// // console.log(humidity);
// // console.log(point_type);
//
// myScene.getNode("pointMapLayer",function(pointMapLayer){
// var max_radius = 20; // 반경을 몇까지 할지는 추후에 정해야함.
// var point_count = 100000;// 점 갯수를 몇까지 할지도 추후에 정해줘야함.
// pointMapLayer.addNode(
// getRandomPointArroundSensor(groupId,center_point,point_type,temperature,humidity
// ,max_radius,positions,yarray,point_count));
//						
// })
// })
// }// end of for
// });
//		
// }
	
	
	
	this.renderClear = function(){
		myScene.getNode("centerLayer",function(centerLayer){
			centerLayer.removeNodes();
		})
		myScene.getNode("planeLayer",function(planeLayer){
			planeLayer.removeNodes();
		})
	};
	
	this.allClear = function(){
		myScene.getNode("centerLayer",function(centerLayer){
			centerLayer.removeNodes();
		})
		myScene.getNode("planeLayer",function(planeLayer){
			planeLayer.removeNodes();
		})
		SceneJS.reset();
	}
	
	this.zoomOut = function(){
		myScene.getNode("mainCameras",function(orbit){
			var zoom = orbit.canvas_getZoom();
			orbit.canvas_setZoom(zoom+15);
		})
	}
	this.zoomIn = function(){
		// webView 를 안 통하고 직접 모바일에서 실행하는 것은 문제 없음.
		myScene.getNode("mainCameras",function(orbit){
			var zoom = orbit.canvas_getZoom();
			orbit.canvas_setZoom(zoom-15);
		})
	}
	
	
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
									{
										type:"material", color :{"r":0.6, "g":0.1,"b":0},
										nodes:[											
											{type:"geometry/box" ,size : [0.5,0.5,0.5]}
										]
									}
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
					var xyz = planeLayer.getXYZ();
					currentXYZ.x = (-xyz.x);
					currentXYZ.y = (-xyz.y);
					currentXYZ.z = (-xyz.z);
					//me.clipMove();
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
		
		// alert("highLight!!"+ groupId)
		if(selectedHighlight ==true){
			myScene.getNode("highlightWall",function(highlightWall){
				highlightWall.destroy();
				selectedHighlight = false;
			})
		}
		// var count = 0;
		for(var i =0; i<sceneGroupArray.length ; i++){
			// console.log(sceneGroupArray[i]);
			var group = convertToFullArray(sceneGroupArray[i]);
			if(groupId ==group.id){
				selectedHighlight = true;
				myScene.getNode("centerLayer",function(centerLayer){
					centerLayer.addNode(getHighlightWall(group));
				});
				return;
			}else{
				// count++;
			}
		}
		// if(count==sceneGroupArray.length) alert(groupId + " 아무것도 못찾음");
		
	}
	
	
	
	function update_point_size(){
		
		// console.log("pointsCount" + pointsCount);
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
	
	function createCanvas(id, projectTagObject){

		
		
    }// end of createCanvas
	
	
    
    function updateLabelPos(elementId, canvasPos, projPos, cameraPos, viewPos, worldPos,element) {
        
                
// var distance = Math.sqrt(roundFloat(viewPos.x)*roundFloat(viewPos.x)
// +roundFloat(viewPos.y)*roundFloat(viewPos.y)
// + roundFloat(viewPos.z)*roundFloat(viewPos.z));

        var canvas = myScene.getCanvas();

        var zIndex = 100000 + roundFloat(viewPos.z);
        
        var elementWidth = element.css("width");
        var elementHeight = element.css("height");
        if(elementWidth!=undefined && elementWidth.indexOf("px")!=-1){
        	elementWidth = Number(elementWidth.split("px")[0]);
        	elementHeight = Number(elementHeight.split("px")[0]);
        }
        
        
        element.css("left", canvas.offsetLeft + canvasPos.x -elementWidth/2);
        element.css("top", canvas.offsetTop + canvasPos.y - elementHeight*2);
// element.css("width",7000/distance);
// element.css("height",5000/distance);
// element.css("font-size",1000/distance)
        element.css("z-index", zIndex);
// if(distance>200){
// element.css("display","none");
// }
// else{
// element.css("display","inline-block");
// }
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
    
    
    
    this.renderToggle = function(groupId,bool){
    	if(bool==null){    		
    		myScene.getNode(groupId,function(group){
    			//console.log(group);
    			group.setEnabled(!group.getEnabled());
    		})
    	}
    	else{
    		if(bool==true){
    			myScene.getNode(groupId,function(group){
    				//console.log(group);
        			group.setEnabled(true);
        		})
    		}
    		else if(bool==false){
    			myScene.getNode(groupId,function(group){
    				//console.log(group);
        			group.setEnabled(false);
        		})
    		}
    	}
    };
    
    this.selectToggle = function(groupId,bool){
    	var me = this;
    	myScene.getNode(groupId,function(group){
    		var floorList = group.findNodesByType("geometry/floor",true);
    		var count = 0;
    		for(var i =0; i<floorList.length; i++){
    			if(bool==true) {
    				var material_node = floorList[i].parent;
					material_node.setColor({"r":0.4,"g":0.53,"b":0.67});
					textureList.push(material_node);
    			}else{
					var material_node = floorList[i].parent;
					material_node.setColor(material_node.data);
					for(var j =0; j<textureList.length; j++){
						if(textureList[j].id==material_node.id){
							textureList[j].setColor(textureList[j].data.color);
							textureList[j].setAlpha(textureList[j].data.alpha);
							textureList.splice(j,1);
						}
					}
    			}// end of else
    		}// end of for
    		// for문이 끝나고 난후, textureList 에 있는 바닥들에 대해 깜빡이는 효과를 준다.
    		if(bool ==true){
    			myScene.off(textureList_tick);
				textureList_tick = myScene.on("tick",function () {
					var finish = false;
					for(var j = 0 ; j<textureList.length; j++){
						var origin = textureList[j].getColor();
						
						origin.r += 0.14 * (count%2==0?1:-1);
						origin.g += 0.1 * (count%2==0?1:-1);
						origin.b += 0.15 * (count%2==0?1:-1);
						if( origin.r>=1 || origin.g>=1 || origin.b>=1){
							count++;
							var myCount = 0;
							if((textureList.length*textureList.length)>200){
								myCount = 10;
							}else if((textureList.length*textureList.length)>100){
								myCount = 5;
							}else{
								myCount = 3;
							}
							
							if(count>myCount){
								finish = true;
							}
						}else if(origin.r<=0 || origin.g<=0 || origin.b<=0){
							count++;
						}else{
							textureList[j].setColor({
								r:origin.r,
								g:origin.g,
								b:origin.b
							});
							textureList[j].setAlpha(1);
						}
					}
					if(finish){
						for(var j= 0; j<textureList.length; j++){
//							textureList[j].setColor({
//								r:0.3,
//								g:0.43,
//								b:0.56
//							});
							textureList[j].setColor(textureList[j].data.color);
							textureList[j].setAlpha(textureList[j].data.alpha);
						}
						myScene.off(textureList_tick);
						textureList_tick = null;
					}
				});// end of textureList_tick;);
    		}
    	})// end of getNode
    }// end of selectToggle
    
    
    this.changeViewMode = function(type){
    	var angleValue = type=="rotate"?0.3:0;
    	rotating = type==null?false:true;
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
    		// alert("여기오니? getObjectArray $each 시작 !");
    		json = convertToFullArray(json); // ex) "0,2,4:7" 를[0,2,4,5,6,7]
												// 로 바꾸어줌.
// sceneJsonArray.push(json);
    		if(json.tag=="invisible") return;
    		
    		if(json.type=="box" || json.type =="boxclipQ" || json.type =="boxclipO"){
    			jsonWithId = {type:"translate", id:json.id, nodes:[]};
    			for(var i = 0; i<json.yarray.length; i++){
    				for(var j =0; j<json.xarray.length;j++){
    					for(var k=0; k<json.zarray.length; k++){
    						jsonWithId.nodes.push(getBox(json,json.xarray[j],json.yarray[i],json.zarray[k]));
    					}
    				}
    			}
    			resultArray.push(jsonWithId);
    		}// end of boxclipO , boxclipQ
    		
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
    		
    		else if(json.type=="sensor" ||  json.type=="gateway" || json.type=="beacon"){
    			jsonWithId = {type:"translate", id:json.id, nodes:[], data:{x:json.xarray[0], y:json.yarray[0], z: json.zarray[0]} };
    			if(json.type=="sensor"){
    				jsonWithId.data.temperature = json.temperature; 
    				jsonWithId.data.humidity = json.humidity;
    			}
    			if(json.type="beacon"){
    				jsonWithId.data.count = json.count;
    			}
    			
    			sensor_id_array.push(json.id);
    			for(var i = 0; i<json.yarray.length; i++){
    				for(var j =0; j<json.xarray.length;j++){
    					for(var k=0; k<json.zarray.length; k++){
    						if(json.type="sensor"){
    							jsonWithId.nodes.push(getTempSensor(json,json.xarray[j],json.yarray[i],json.zarray[k]));
    						}
    						if(json.type="beacon"){
    							jsonWithId.nodes.push(getBeacon(json,json.xarray[j],json.yarray[i],json.zarray[k]));
    						}
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
    }; // end of getObjectArray()
    
    this.pushObjects = function(val, callBack){
    	if(val.substring(0,1)=="["){
    		this.addJsonData(JSON.parse(val), callBack);	
    	}
    	else{
    		var groupList = (JSON.parse(val)).items;
    		for(var i=0; i<groupList.length; i++){
    			var subList = groupList[i].items;
    			
    			for(var j=0; j<subList.length; j++){
    				subList[j].id = UT.generateUUID();
    			}
    		}
    		this.addJsonData(groupList, callBack);
    	}
    }; // end of pushObject
    
    
    
    
    
    function getColorHeightMap(point_type,filePath,colorFilePath){
    	var heightMap_translate = {};
    	heightMap_translate.type = "translate";
    	heightMap_translate.x = modelCenterPosition.x;
    	heightMap_translate.y = modelCenterPosition.y+11;
    	heightMap_translate.z = modelCenterPosition.z;
    	heightMap_translate.nodes = [];
    	heightMap_translate.id = point_type;
    		var heightMap_rotate = {};
    		// heightMap_rotate.type = "rotate";
    		// heightMap_rotate.x = 1;
    		// heightMap_rotate.angle = 180;
    		heightMap_rotate.nodes = [];
	    		var heightMap_material = {};
	    		heightMap_material.type = "material";
	    		heightMap_material.alpha = 0.8;
	    		heightMap_material.nodes = [];
	    			var heightMap_texture = {};
	    			heightMap_texture.type= "texture";
	// heightMap_texture.src =
	// "/lifetip-admin/libs/scenejs-master/examples/textures/100test_full_color.png";
	    			heightMap_texture.src = colorFilePath;
	    			heightMap_texture.nodes = [];
	    				var heightMap_flags = {};
	    				heightMap_flags.type = "flags";
	    				heightMap_flags.flags = {"transparent":true};
	    				heightMap_flags.nodes = [];
	    					var heightMap_geometry = {};
	    					heightMap_geometry.type = "geometry/heightmap";
	// heightMap_geometry.src =
	// "/lifetip-admin/libs/scenejs-master/examples/textures/100test.png";
	// heightMap_geometry.src =
	// "http://localhost:8081/lifetip-admin/libs/scenejs-master/examples/textures/100test.png";
	    					heightMap_geometry.src = filePath;
	    					heightMap_geometry.wire= false;
	    					heightMap_geometry.xSize= modelTotalXwidth;
	    					heightMap_geometry.zSize= modelTotalZwidth;
	    					heightMap_geometry.ySize= 50;
	    					heightMap_geometry.xSegments= 150;
	    					heightMap_geometry.zSegments= 150;
	    				heightMap_flags.nodes.push(heightMap_geometry);
	    			heightMap_texture.nodes.push(heightMap_flags);
	    		heightMap_material.nodes.push(heightMap_texture);
	    	heightMap_rotate.nodes.push(heightMap_material);
    	heightMap_translate.nodes.push(heightMap_rotate);
    	
    	return heightMap_translate;

    }
    
    this.reloadEffect = function(){
    	myScene.getNode("centerLayer",function(centerLayer){
    		try{
    			centerLayer.addNode(getReloadBox());
    			addReloadTickEvent();
    		}catch(exception){
    			myScene.getNode("reloadBox",function(reloadBox){
    				reloadBox.setXYZ({x:-200});
    			})
    		}
    	})
    }
    function getReloadBox(){
		return {
			type:"translate",
			id : "reloadBox",
			x:-200,
			y:25,
			nodes : [{
				type:"flags",
				flags:{transparent : true},
				nodes : [{
					type:"material",
					color : {r:0.3, g:0.3 , b:0.6},
					alpha : 0.4,
					nodes : [{
						type:"geometry/box",
						xSize : 10,
						ySize : 60,
						zSize : 80
					}]
				}]
			}]
		};
	}
    function addReloadTickEvent(){
		myScene.getNode("reloadBox",function(reloadBox){
			myScene.on("tick",function(){
				x = reloadBox.getX();
				if(x>=200){
					reloadBox.destroy();
				}else{
					x+= 4;
					reloadBox.setXYZ({x:x});
				}
			})
		})
    }
    
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
				// var object_texture = {};
				// object_texture.type="texture";
				// object_texture.src = "../../textures/grass.jpg";
				// object_texture.applyTo = "color";
				// object_texture.nodes = [];
					var object_geometry = {};
					object_geometry.type= "geometry/plane";
					object_geometry.width= 1;
					object_geometry.height= 1;
					object_geometry.wire= true;
					object_geometry.widthSegments= 100;
					object_geometry.heightSegments= 100;
				// object_texture.nodes.push(object_geometry);
			// object_rotate.nodes.push(object_texture);
			object_rotate.nodes.push(object_geometry);
		object_scale.nodes.push(object_rotate);
	object_material.nodes.push(object_scale);
	return object_material;
}





function convertToFullArray(json){
	
	function fullArray(firstArray){
		
		var secondArray = [];
		var resultArray = [];
		
// secondArray = firstArray[0].split(",");
// if(firstArray.indexOf(',')!=-1){
		try{
			secondArray = firstArray.split(",");
			
		}catch(error){
			return firstArray;
		}
		
// }
// else{
// secondArray[0] = firstArray;
// alert("일로오냐?"+ firstArray[0]);
// }
// alert("여기오니? converToFullArray!!");
		
		for(var i = 0; i<secondArray.length;i++){
			if(secondArray[i].indexOf(":")!=-1){
				var colonIndex = secondArray[i].indexOf(":");
				for( var j = parseInt(secondArray[i].slice(0,colonIndex)) ; 
					j <= parseInt(secondArray[i].slice(colonIndex+1)); 
					j++ ){
					resultArray.push(j);
				}
			}else{
				resultArray.push(parseInt(secondArray[i]));
			}
		}
		
		return resultArray;
	}
	if(json.yarray!=null && json.yarray!=undefined && json.yarray!="") json.yarray = fullArray(json.yarray);
	if(json.xarray!=null && json.xarray!=undefined && json.xarray!="") json.xarray = fullArray(json.xarray);
	if(json.zarray!=null && json.zarray!=undefined && json.zarray!="") json.zarray = fullArray(json.zarray);
	
	return json;
}

// This function makes a node that looks like a box on a shelf.
// It needs parameters, a json data and y(height) value.
function getBox(jsonData,x,y,z){
	var type= jsonData.type;    // here, type : box
	var direction = jsonData.direction; // Actually, this value at here is not
										// needed.
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
		// box_translate.id = id;
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
		// box_translate.id = id;
		box_translate.nodes = [];
		
		var box_material = {}
		box_material.type = "material";
		box_material.color = box_rgb;
		if(jsonData.tag!=null && (jsonData.tag).indexOf("#")!=-1){
			var colorArray = color_HexToDeci(jsonData.tag)
			box_material.color = {"r":colorArray[0]/256 , "g":colorArray[1]/256, "b":colorArray[2]/256};
		}
		box_material.alpha = 0.6;
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
	
	// console.log(JSON.stringify(box_translate));
	return box_translate;
}

function getIssue(jsonData,x,y,z){
	var type= jsonData.type;    // here, type : box
	var direction = jsonData.direction; // Actually, this value at here is not
										// needed.
	var id = jsonData.id;
	var posx = x;
	var posy = y;
	var posz = z;
	
	if(jsonData.type=="issue"){
		
		var box_translate = {};
		box_translate.type = "translate";
		box_translate.x = getX__(type,direction,posx);
		box_translate.y = getY__(type,direction,posy+0.5);
		box_translate.z = getZ__(type,direction,posz);
		// box_translate.id = id;
		box_translate.nodes = [];
		
		var box_material = {}
		box_material.type = "material";
		box_material.color = {"r":0.2 ,"g":0.2, "b":0.6};
		box_material.alpha = 0.9;
		box_material.nodes = [];
		
		var box_geometry = {};
		box_geometry.type="geometry/boxclipO";
		box_geometry.xSize=2;
		box_geometry.ySize=2;
		box_geometry.zSize=2;
		
		box_material.nodes.push(box_geometry);
		
		box_translate.nodes.push(box_material);
	// console.log(JSON.stringify(box_translate));
		return box_translate;
	}
	return null;
}




// This function makes a node that looks like a wall or floor.
// It needs parameters, a json data and y(height) value.
function getWallOrFloor(jsonData,y){
 var type= jsonData.type;    // here, type : wall or floor
 var direction = jsonData.direction; 
 var positionsArr = []; 
 var id = jsonData.id;
 var tag = jsonData.tag;
 for(var j= 0; j<jsonData.positions.length; j++){
	 positionsArr.push(jsonData.positions[j].x); // {x:20, z:20}, {x:-20,
													// z:20} 이렇게 들어옴.
	 positionsArr.push(jsonData.positions[j].z); // {x:20, z:20}, {x:-20,
													// z:20} 이렇게 들어옴.
 }
 var wall_flags = {};
 wall_flags.type = "flags"
 wall_flags.flags = {"transparent":true};
 // wall_flags.id= id;
 wall_flags.nodes = [];
 	
     var wall_material = {};
     wall_material.type = "material";
     wall_material.color = type=="floor"?floor_rgb:wall_rgb;
     if(type=="floor" && jsonData.tag=="black"){
    	 wall_material.color = {"r":40/256, "g":40/256, "b":40/256};
     }
     wall_material.alpha = type=="floor"||type=="wall"?0.9:0.9;
     if(jsonData.tag =="transparent"){
    	 wall_material.alpha = 0;
     }
     wall_material.data = {
    		 color : wall_material.color,
    		 alpha : wall_material.alpha
     }
     wall_material.nodes = [];
         
     	
//     	if(jsonData.tag =='texture'){
//     		var plane_center = {};
//     		var point_count = 0;
//    		var x = 0;
//    		var z = 0;
//    		var minX = jsonData.positions[0].x;
//    		var maxX = jsonData.positions[0].x;
//    		var minZ = jsonData.positions[0].z;
//    		var maxZ = jsonData.positions[0].z;
//    		for(var i =0; i<jsonData.positions.length-1 ; i++){
//    			point_count++;
//    			x += parseInt(jsonData.positions[i].x);
//    			z += parseInt(jsonData.positions[i].z);
//    			if(minX>parseInt(jsonData.positions[i].x)) minX = jsonData.positions[i].x;
//    			if(maxX<parseInt(jsonData.positions[i].x)) maxX = jsonData.positions[i].x;
//    			if(minZ>parseInt(jsonData.positions[i].z)) minZ = jsonData.positions[i].z;
//    			if(maxZ<parseInt(jsonData.positions[i].z)) maxZ = jsonData.positions[i].z;
//    		}
//    		x = x/point_count;
//    		z = z/point_count;
//    		plane_center.x = x;
//    		plane_center.z = z;
//    		var width = maxX-minX;
//    		var height = maxZ-minZ;
//    		var object_translate = {};
//    		object_translate.type = "translate";
//    		object_translate.x = plane_center.x;
//    		object_translate.z = plane_center.z;
//    		object_translate.y = y+0.1;
//    		object_translate.nodes = [];
//    			var object_texture = {};
//    			object_texture.type="texture";
//    			object_texture.src = "/repository/texture/tile.jpg";
//    			object_texture.applyTo = "color";
//    			object_texture.nodes = [];
//		    		var object_scale = {};
//		    		object_scale.type= "scale";
//		    		object_scale.x= width;
//		    		object_scale.z= height;
//		    		object_scale.nodes = [];
//		    			var object_rotate = {};
//		    			object_rotate.type= "rotate";
//		    			object_rotate.x= 1;
//		    			object_rotate.angle= 270;
//		    			object_rotate.nodes= [];
//							var object_geometry = {};
//							object_geometry.type= "geometry/plane";
//							object_geometry.width= 1;
//							object_geometry.height= 1;
//							object_geometry.wire= false;
//							object_geometry.widthSegments= width/5;
//							object_geometry.heightSegments= height/5;
//		    			object_rotate.nodes.push(object_geometry);
//		    		object_scale.nodes.push(object_rotate);
//		    	object_texture.nodes.push(object_scale);
//    		object_translate.nodes.push(object_texture);
//     		wall_material.nodes.push(object_translate);
//     	}else{
     		var wall_geometry = {};
            if(type=="wall"){
            	if(tag!=null && tag.trim()!="" && tag != "transparent" && tag!="black"){
            		wall_geometry.type="texture";
            		wall_geometry.src = "http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/texture/"+tag;
            		wall_geometry.nodes = [
            			{
            				type : "geometry/wall",
            				positionsArr : positionsArr,
                    		minHeight : jsonData.minHeight,
                    		maxHeight : jsonData.maxHeight
            			}
            		];
            	}else{
            		
            		wall_geometry.type="geometry/wall";
            		wall_geometry.positionsArr = positionsArr;
            		wall_geometry.minHeight = jsonData.minHeight;
            		wall_geometry.maxHeight = jsonData.maxHeight;
            	}
            }
            
            if(type=="floor"){
            	if(tag!=null && tag.trim()!="" && tag != "transparent"){
		        	 wall_geometry.type = "texture";
		        	 wall_geometry.src = "http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/texture/"+tag;
	        		 wall_geometry.nodes = [
	        			 {
	        				 type:"geometry/floor",
	        				 positionsArr : positionsArr,
	        				 yarray : [y]
	        			 }
	        	     ];
	        	 }else{
	        		 wall_geometry = {
				        				 type:"geometry/floor",
				        				 positionsArr : positionsArr,
				        				 yarray : [y]
				        			 };
	        	 }
            }
            wall_material.nodes.push(wall_geometry);
	
//     	}
     
 wall_flags.nodes.push(wall_material);


 // console.log(JSON.stringify(wall_translate));
 return wall_flags;
}

// This function makes a node that looks like a wall or floor.
// It needs parameters, a json data and y(height) value.
function getHighlightWall(jsonData){
	var type= jsonData.type;    // here, type : wall or floor
	var direction = jsonData.direction; 
	var positionsArr = []; 
	var minHeight = jsonData.yarray[0];
	var maxHeight = jsonData.yarray[0];
	for(var i =1; i<jsonData.yarray.length; i++){
		if(jsonData.yarray[i]<minHeight) minHeight = jsonData.yarray[i];
		if(jsonData.yarray[i]>maxHeight) maxHeight = jsonData.yarray[i];
	}
	
	
	
	
	
	for(var j= 0; j<jsonData.positions.length; j++){
		 positionsArr.push(jsonData.positions[j].x); // {x:20, z:20}, {x:-20,
														// z:20} 이렇게 들어옴.
		 positionsArr.push(jsonData.positions[j].z); // {x:20, z:20}, {x:-20,
														// z:20} 이렇게 들어옴.
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
	

// console.log(JSON.stringify(wall_flags));
return wall_flags;
}



// This function makes a node that looks like a shelf rack.
// It needs parameters, a json data and y(height) value.
function getRack(jsonData,x,y,z){
    var type= jsonData.type;    // here, type : rack
    var posx = x;
    var posy = y;
    var posz = z;
    var id = jsonData.id;
    var rack_translate = {};
    rack_translate.type = "translate";
    rack_translate.x = getX__(type,'',posx);
    rack_translate.y = getY__(type,'',posy);
    rack_translate.z = getZ__(type,'',posz);
    // rack_translate.id= id;
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

    // console.log(JSON.stringify(rack_translate));
    return rack_translate;
}


// This function makes a node that looks like a shelf pillar.
// It needs parameters, a json data and y(height) value.
function getPillar(jsonData,x,y,z){
    var type= jsonData.type;    // here, type : pillar
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
    // pillar_translate.id=id;
    pillar_translate.nodes = [];
        
	    var pillar_flags = {};
	    pillar_flags.type = "flags";
	    pillar_flags.flags = {"transparent" : true};
	    pillar_flags.nodes = [];
	        var pillar_material = {};
	        pillar_material.type = "material";
	        pillar_material.color = direction=="center"?wall_rgb:rack_rgb;
	        pillar_material.alpha = direction=="center"?0.4:0.9;
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
	
	// console.log(JSON.stringify(pillar_translate));
	return pillar_translate;
}




// This function makes a node that looks like a road.
// It needs parameters, a json data and y(height) value.
function getRoad(jsonData,x,y,z){
    var type= jsonData.type;    // here, type : road
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
    // road_translate.id = id;
    road_translate.nodes = [];

        var road_geometry = {};
        road_geometry.type="geometry/road_"+direction;
    
    road_translate.nodes.push(road_geometry);

    // console.log(JSON.stringify(road_translate));
    return road_translate;
}


// This function makes a node that looks like a sphere.
// It needs parameters, a json data and y(height) value.
function getBeacon(jsonData,x,y,z){
    var type= jsonData.device_type;    // here, type : sphere
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
  
    sphere_translate.nodes = [];
        
        var sphere_material = {}
        sphere_material.id = "position_"+id+"_material";
        sphere_material.type = "material";
        sphere_material.color = {r:0.2, g:0.8, b:0.2};
        if(jsonData.sts!=null && jsonData.sts=='emergency'){
        	sphere_material.color = {r:0.9, g:0.3, b:0.3};	
        }
        sphere_material.alpha = 0.9;
        sphere_material.nodes = [];
            
            var sphere_geometry = {};
            sphere_geometry.type="geometry/sphere";
            sphere_geometry.radius = 2.5;
            if(jsonData.sts!=null && jsonData.sts=='emergency'){
            	sphere_geometry.radius = 4;
            }

        sphere_material.nodes.push(sphere_geometry);
    sphere_translate.nodes.push(sphere_material);

// console.log(JSON.stringify(sphere_translate));
    return sphere_translate;
}


function getTempSensor(jsonData,x,y,z){
    var type= jsonData.device_type;    // here, type : sphere
    var direction = jsonData.direction; // direction is not needed
    var posx = x;
    var posy = y;
    var posz = z;
    var id = jsonData.id;
    var sphere_translate = {};
    sphere_translate.type = "translate";
    sphere_translate.x = getX__(type,direction,posx);
    sphere_translate.y = getY__(type,direction,posy)+0.6;
    sphere_translate.z = getZ__(type,direction,posz);
  
    sphere_translate.nodes = [];
        var sphere_rotate = {};
        sphere_rotate.type = "rotate";
        sphere_rotate.z = 1;
        sphere_rotate.angle = 0;
        sphere_rotate.nodes = [];
	        var sphere_material1 = {}
	        sphere_material1.type = "material";
	        sphere_material1.color = {r:0.7, g:0.7, b:0.7};
	        sphere_material1.alpha = 0.9;
	        sphere_material1.nodes = [
	        	{
	                type:"translate",
	                y:0.7,
	                nodes : [{type:"geometry/cylinder",radiusTop :0.3,radiusBottom :0.3,height :0.3,}]
	            },{
	                type:"translate",
	                y:1.3,
	                nodes : [{type:"geometry/cylinder",radiusTop :0.3,radiusBottom :0.3,height :0.3,}]
	            },{
	                type:"translate",
	                y:1.9,
	                nodes : [{type:"geometry/cylinder",radiusTop :0.3,radiusBottom :0.3,height :0.3,}]
	            },
	        ];
	        var sphere_material2= {}
	        sphere_material2.id = "position_"+id+"_material";
	        sphere_material2.type = "material";
	        sphere_material2.color ={r:0.2,g:0.6,b:0.2};
	        if(jsonData.sts =='in'){
	        	sphere_material2.color ={r:0.2,g:0.6,b:0.2};
	        }
	        if(jsonData.sts =='outBattery'){
	        	sphere_material2.color ={r:0.6,g:0.6,b:0.2};
	        }
	        if(jsonData.sts =='outTemp'){
	        	sphere_material2.color ={r:0.6,g:0.2,b:0.2};
	        }
	        if(jsonData.sts =='outHumi'){
	        	sphere_material2.color ={r:0.2,g:0.2,b:0.6};
	        }
	        if(jsonData.sts =='error'){
	        	sphere_material2.color ={r:0.2,g:0.2,b:0.2};
	        }
	        
	        sphere_material2.alpha = 0.9;
	        sphere_material2.nodes = [
	        	{
	                type:"translate",
	                y:"0",
	                nodes: [{type:"geometry/sphere", radius:0.8 }]
	            },
	            {
	                type:"translate",
	                y:1,
	                nodes : [{type:"geometry/cylinder",radiusTop :0.3,radiusBottom :0.3,height :0.3,}]
	            },{
	                type:"translate",
	                y:1.6,
	                nodes : [{type:"geometry/cylinder",radiusTop :0.3,radiusBottom :0.3,height :0.3,}]
	            } 
	        ];

        sphere_rotate.nodes.push(sphere_material1);
        sphere_rotate.nodes.push(sphere_material2);
    sphere_translate.nodes.push(sphere_rotate);

// console.log(JSON.stringify(sphere_translate));
    return sphere_translate;
}


function getImportObj(jsonData,x,y,z){
	var type = jsonData.type;
	var tag = jsonData.tag;
	var id = jsonData.id;
    var import_translate = {};
    import_translate.type = "translate"
    import_translate.x = x;
    import_translate.y = y;
    import_translate.z = z;
    import_translate.nodes = [];
    	
    	var import_rotate = {};
    	import_rotate.type = "rotate";
    	import_rotate.x=1;
    	if(jsonData.direction=="left")import_rotate.angle = -90;
    	if(jsonData.direction=="right")import_rotate.angle = 90;
    	if(jsonData.direction=="back")import_rotate.angle = 180;
    	//import_rotate.angle = 180;
    	import_rotate.nodes = [];
    	
	    	var import_scale = {};
	    	import_scale.type = "scale";
	    	import_scale.x=jsonData.xsize!=0?jsonData.xsize:1;
	    	import_scale.y=jsonData.ysize!=0?jsonData.ysize:1;
	    	import_scale.z=jsonData.zsize!=0?jsonData.zsize:1;
	    	import_scale.nodes = [];
	    	
	    		var import_flags = {};
	    		import_flags.type = "flags";
	    		import_flags.flags = {"transparent": true};
	    		import_flags.nodes = [];
	    	
			    	var import_material = {};
			    	import_material.type = "material";
			    	import_material.color = jsonData.color==null?{"r":0.6,"g":0.6,"b":0.6}:JSON.parse(jsonData.color);
			    	import_material.alpha = jsonData.alpha==null?1:jsonData.alpha;
			    	import_material.nodes = [];
			    	
		    		if(jsonData.texture!=null){
		    			import_texture = {};
		    			import_texture.type = "texture";
		    			import_texture.src = "/img/model/"+jsonData.texture;
		    			import_texture.nodes = [];
			    			var import_node = {};
					    	if(tag=='obj') import_node.type="import/obj"
					    	import_node.src = "http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/obj/"+jsonData.file_name;
					    	import_texture.nodes.push(import_node)
				    	import_material.nodes.push(import_texture);
		    			
		    		}else{
		    			var import_node = {};
				    	if(tag=='obj') import_node.type="import/obj"
				    	import_node.src = "http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/obj/"+jsonData.file_name;
				    	import_material.nodes.push(import_node);
		    		}
		    	import_flags.nodes.push(import_material);
		    import_scale.nodes.push(import_flags);
    	import_rotate.nodes.push(import_scale);
	import_translate.nodes.push(import_rotate);
	//console.log(JSON.stringify(import_translate));
	return import_translate;
}




function getTextBox(jsonData,x,y,z){
    var type= jsonData.type;    // here, type : textBox
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
    else if(type =="box" || type=="box2" || type=="boxclipQ" || type=="boxclipO"){
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

// function
// getRandomPointArroundSensor(groupId,center_point,point_type,temperature,humidity
// ,max_radius,positions,yarray,point_count){
// var arroundPoints = [];
// arroundPoints.first = [];
// arroundPoints.second = [];
// arroundPoints.third = [];
// arroundPoints.fourth = [];
//	
// // console.log(groupId);
// // console.log(JSON.stringify(center_point));
// // console.log(JSON.stringify(positions));
// // console.log(point_type);
// // console.log(point_count);
// // console.log(temperature);
// // console.log(humidity);
// // console.log(max_radius);
// // console.log(yarray);
// var minY = yarray[0];
// var maxY = yarray[0];
// for(var j = 1; j<yarray.length;j++){
// if(yarray[j]<minY) minY = yarray[j];
// if(yarray[j]>maxY) maxY = yarray[j];
// }
// var y_range = maxY-minY;
//	
// for(var i =0; i<point_count ; i++){
// var point = {};
// point.x = (Math.random()-0.5)*2*max_radius+center_point.x;
// point.z = (Math.random()-0.5)*2*max_radius+center_point.z;
// if(isInside(point, positions)){
// var distance = getXZDistance(point,center_point);
// // console.log("distance : "+distance );
// // console.log(JSON.stringify(point));
// if(distance <1) arroundPoints.first.push(point.x,
// Math.random()*y_range+minY+0.01, point.z );
// else if(distance>=1 && distance<4) arroundPoints.second.push(point.x,
// Math.random()*y_range+minY+0.01, point.z );
// else if(distance>=4 && distance<9) arroundPoints.third.push(point.x,
// Math.random()*y_range+minY+0.01, point.z );
// else if(distance>=9 && distance<20) arroundPoints.fourth.push(point.x,
// Math.random()*y_range+minY+0.01, point.z );
//    		
// }
// }
// // console.log(arroundPoints.first.length);
// // console.log(arroundPoints.second.length);
// // console.log(arroundPoints.third.length);
// // console.log(arroundPoints.fourth.length);
//	
// var rand_point_layer={};
// if(point_type=="temperature"){
// // rand_point_layer.id = "temp_";
// var rand_point_material1 =
// getMaterial_temp(temperature,1,arroundPoints.first);
// var rand_point_material2 =
// getMaterial_temp(temperature,2,arroundPoints.second);
// var rand_point_material3 =
// getMaterial_temp(temperature,3,arroundPoints.third);
// var rand_point_material4 =
// getMaterial_temp(temperature,4,arroundPoints.fourth);
// }else if(point_type=="humidity"){
// // rand_point_layer.id = "humi_";
// var rand_point_material1 = getMaterial_humi(humidity,1,arroundPoints.first);
// var rand_point_material2 = getMaterial_humi(humidity,2,arroundPoints.second);
// var rand_point_material3 = getMaterial_humi(humidity,3,arroundPoints.third);
// var rand_point_material4 = getMaterial_humi(humidity,4,arroundPoints.fourth);
// }
// // rand_point_layer.id+=groupId;
// rand_point_layer.nodes=[];
// 
//    
//    	
// // var rand_point_material = {};
// // rand_point_material.type="material";
// // rand_point_material.color={r:0.7,g:0,b:0.3};// 온도 반영해서 색깔 넣는 것 필요함.
// // rand_point_material.alpha = 0.6;
// // rand_point_material.nodes = [];
// // var rand_point_geometry = {};
// // rand_point_geometry.type="geometry";
// // rand_point_geometry.primitive="points";
// // rand_point_geometry.positions=totalRandArr;
// // rand_point_geometry.pointSize=1;
// // rand_point_material.nodes.push(rand_point_geometry);
// rand_point_layer.nodes.push(rand_point_material1);
// rand_point_layer.nodes.push(rand_point_material2);
// rand_point_layer.nodes.push(rand_point_material3);
// rand_point_layer.nodes.push(rand_point_material4);
//
// // console.log(JSON.stringify(rand_point_layer));
// return rand_point_layer;
//
//	
// }
// function getXZDistance(point1, point2){
// var distance = Math.sqrt((point1.x-point2.x)*(point1.x-point2.x)+
// (point1.z-point2.z)*(point1.z-point2.z));
// return distance;
// }
// function getMaterial_temp(temperature,index,randArr){
//	
// var positions = [];
// var maxTemp = 35;
// var minTemp = -15;
// var colorIndex = index;
//
// if(temperature>maxTemp) temperature = maxTemp;
// if(temperature<minTemp) temperature = minTemp;
// if(temperature<0) colorIndex =-3*index;
//	
// var ratioTemp = (temperature-colorIndex-minTemp)*2;
// var colorObject = {};
//	
// console.log(ratioTemp);
//	
// if(ratioTemp >60){// temperature 가 15 도이상일때 그라데이션 값
// colorObject = {r:(200+(ratioTemp-60)*2)/256, g:(250-(ratioTemp-60)*6)/256 ,
// b:(130-(ratioTemp-60)*5)/256};
// }else{//15도 미만 일때 그라데이션 값
// colorObject = {r:(80+(ratioTemp-60)*1)/256, g:(40+(ratioTemp)*1.3)/256 ,
// b:(60+(ratioTemp)*2.3)/256};
// }
//	
// console.log(JSON.stringify(colorObject));
// // colorObject = {r:1,g:0,b:0};
//	
// var rand_point_material = {};
// rand_point_material.alpha = 1-(index/10);
// rand_point_material.type="material";
// rand_point_material.color = colorObject;// 온도 반영해서 색깔 넣는 것 필요함.
// // rand_point_material.alpha = 1-;
// rand_point_material.nodes = [];
// for(var i =0; i<randArr.length/6; i++){
// if(i%index==0){
// positions.push(randArr[i*3]);
// positions.push(randArr[i*3+1]);
// positions.push(randArr[i*3+2]);
// }
// }
// var rand_point_flags = {};
// rand_point_flags.type = "flags"
// rand_point_flags.transparent = true;
// rand_point_flags.nodes = [];
// var rand_point_geometry = {};
// rand_point_geometry.type="geometry";
// rand_point_geometry.id = "points"+pointsCount;
// rand_point_geometry.primitive="points";
// rand_point_geometry.positions=positions;
// rand_point_geometry.pointSize=5;
// rand_point_flags.nodes.push(rand_point_geometry);
// rand_point_material.nodes.push(rand_point_flags);
// pointsCount++;
// return rand_point_material;
// }
//
//
//
// function getRandomPoints(groupId,positions,yarray,temperature){
// var totalRandArr =[];
//    
//    
// var minX = positions[0].x;
// var minY = yarray[0];
// var minZ = positions[0].z;
// var maxX = positions[0].x;
// var maxY = yarray[0];
// var maxZ = positions[0].z;
// var heatPoints = [];
// for(var j = 1;j<positions.length;j++){
// if(positions[j].x<minX) minX = positions[j].x;
// if(positions[j].z<minZ) minZ = positions[j].z;
// if(positions[j].x>maxX) maxX = positions[j].x;
// if(positions[j].z>maxZ) maxZ = positions[j].z;
// }
// for(var j = 1; j<yarray.length;j++){
// if(yarray[j]<minY) minY = yarray[j];
// if(yarray[j]>maxY) maxY = yarray[j];
// }
//  
// var x_range = maxX-minX;
// var y_range = maxY-minY;
// var z_range = maxZ-minZ;
//    
//    
// var num = polygonArea(positions)*10;
//    
// for(var i = 0; i<num ; i++){
// var point = {};
// point.x = Math.random()*x_range+minX;
// point.z = Math.random()*z_range+minZ;
// if(isInside(point, positions)){
// totalRandArr.push(point.x, Math.random()*y_range+minY+0.01, point.z );
//    		
// }
// }
//    
//
// var totalLength = totalRandArr.length;
// var rand_point_layer={};
// rand_point_layer.id="temp_"+groupId;
// rand_point_layer.nodes=[];
// 
// var rand_point_material = {};
// rand_point_material.type="material";
// rand_point_material.color=
// groupId=="4e0c1bd7-4380-4c0a-879f-c595065e2945"?{r:0.3,g:0.3,b:0.5}:{r:0.7,g:0,b:0.3};//
// 온도 반영해서 색깔 넣는 것 필요함.
// rand_point_material.alpha = 0.6;
// rand_point_material.nodes = [];
// var rand_point_geometry = {};
// rand_point_geometry.type="geometry";
// rand_point_geometry.primitive="points";
// rand_point_geometry.positions=totalRandArr;
// rand_point_geometry.pointSize=1;
// rand_point_material.nodes.push(rand_point_geometry);
// rand_point_layer.nodes.push(rand_point_material);
//
//
// console.log(JSON.stringify(rand_point_layer));
// return rand_point_layer;
// }
//
// function isInside(point, poly){ //point 는 {x:"",z:""} 이고, poly 는
// [{x:"",z:""},{x:"",z:""},{x:"",z:""}] 꼴임.
// //crosses는 점q와 오른쪽 반직선과 다각형과의 교점의 개수
// var crosses = 0;
// for(var i = 0 ; i < poly.length ; i++){
// var j = (i+1)%poly.length;
// //점 point가 선분 (p[i], p[j])의 y좌표 사이에 있음
// if((poly[i].z > point.z) != (poly[j].z > point.z) ){
// //atX는 점 point를 지나는 수평선과 선분 (p[i], p[j])의 교점
// var atX = (poly[j].x-
// poly[i].x)*(point.z-poly[i].z)/(poly[j].z-poly[i].z)+poly[i].x;
// //atX가 오른쪽 반직선과의 교점이 맞으면 교점의 개수를 증가시킨다.
// if(point.x < atX)
// crosses++;
// }
// }
// return crosses % 2 > 0;
// }
//
//
// function polygonArea(positions){
// var area = 0; // Accumulates area in the loop
// var j = positions.length-1; // The last vertex is the 'previous' one to the
// first
// for (var i=0; i<positions.length; i++)
// { area = area + (positions[j].x+positions[i].x) *
// (positions[j].z-positions[i].z);
// j = i; //j is previous vertex to i
// }
// return Math.abs(area/2);
// }
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



