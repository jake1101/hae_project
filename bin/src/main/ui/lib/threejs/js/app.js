/**
 * @author mrdoob / http://mrdoob.com/
 */
var THREEJS_MODEL_ARR = [];
var APP = {

	Player: function () {

		var loader = new THREE.ObjectLoader();
		var camera, scene, renderer, labelRenderer;
		var controls, labelControls;
		var rayCaster, mouse = new THREE.Vector2();
		var rotationCameraFlag = false;

		//controls.enable = false;
		var events = {};

		var dom = document.createElement( 'div' );
 
		this.dom = dom;

		this.width = 500;
		this.height = 500;
		
		this.parsedCamera;

		// json 모델을 load
		this.load = function ( json ) {

			renderer = new THREE.WebGLRenderer( { antialias: true, alpha :true } );
			renderer.gammaOutput = true;
			renderer.setClearColor( 0x000000, 0 );
			renderer.setPixelRatio( window.devicePixelRatio );

			var project = json.project;

			if ( project.shadows ) renderer.shadowMap.enabled = true;
			if ( project.xr ) renderer.xr.enabled = true;

			dom.appendChild( renderer.domElement );
			
			labelRenderer = new CSS2DRenderer();
			labelRenderer.domElement.style.position = 'absolute';
			labelRenderer.domElement.style.top = 0;
			//labelRenderer.domElement.style.userSelect = 'none';
			//labelRenderer.domElement.style.pointerEvents = 'none';
			
			dom.appendChild( labelRenderer.domElement );

			this.setScene( loader.parse( json.scene ) );
			this.parsedCamera = loader.parse( json.camera );
			this.setCamera( this.parsedCamera );
			
			//scene.background = new THREE.Color( 0x9ec8fc );
			
			/*new RGBELoader()
			.setDataType(THREE.UnsignedByteType)
			.load('ui/lib/threejs/img/park.hdr', (hdrEquiRect, textureData) => {
			        hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquiRect);
			        pmremGenerator.compileCubemapShader();

			        scene.background = hdrCubeRenderTarget.texture;

			        renderer.toneMappingExposure = 0.5;
			});
			
			let pmremGenerator = new THREE.PMREMGenerator(renderer);
		    pmremGenerator.compileEquirectangularShader();*/
			
			
//			scene.fog = new THREE.Fog( 0xcce0ff, 100, 900 );
			events = {
				init: [],
				start: [],
				stop: [],
				keydown: [],
				keyup: [],
				mousedown: [],
				mouseup: [],
				mousemove: [],
				touchstart: [],
				touchend: [],
				touchmove: [],
				update: []
			};

			var scriptWrapParams = 'player,renderer,scene,camera';
			var scriptWrapResultObj = {};

			for ( var eventKey in events ) {
				scriptWrapParams += ',' + eventKey;
				scriptWrapResultObj[ eventKey ] = eventKey;
			}

			var scriptWrapResult = JSON.stringify( scriptWrapResultObj ).replace( /\"/g, '' );

			for ( var uuid in json.scripts ) {
				var object = scene.getObjectByProperty( 'uuid', uuid, true );

				if ( object === undefined ) {
					console.warn( 'APP.Player: Script without object.', uuid );
					continue;
				}

				var scripts = json.scripts[ uuid ];

				for ( var i = 0; i < scripts.length; i ++ ) {
					var script = scripts[ i ];
					var functions = ( new Function( scriptWrapParams, script.source + '\nreturn ' + scriptWrapResult + ';' ).bind( object ) )( this, renderer, scene, camera );

					for ( var name in functions ) {
						if ( functions[ name ] === undefined ) continue;

						if ( events[ name ] === undefined ) {
							console.warn( 'APP.Player: Event type not supported (', name, ')' );
							continue;
						}
						events[ name ].push( functions[ name ].bind( object ) );
					}
				}
			}
			rayCaster = new THREE.Raycaster();

			dispatch( events.init, arguments );
		};

		this.setCamera = function ( value ) {
			camera = value;
			camera.aspect = this.width / this.height;
			camera.near = 10;
			camera.far = 5000;
			
			controls = new THREE.OrbitControls (camera, renderer.domElement);
			labelControls = new THREE.OrbitControls (camera, labelRenderer.domElement);
			
//			controls.maxPolarAngle = Math.PI * 0.48;
//			controls.minDistance = 0;
			labelControls.maxDistance = 300;
			camera.updateProjectionMatrix();

			if ( renderer.xr.enabled ) {
				dom.appendChild( THREE.WEBVR.createButton( renderer ) );
			}
		};
		
		/**
		 * 구 형태와 라벨 생성
		 * 
		 * @param
		 * radius (Number): 구의 크기
		 * color (String): 구의 컬러, green or red
		 * x (Number): x좌표
		 * y (Number): y좌표
		 * z (Number): z좌표
		 * message (Number): 사람수
		 * positionId (String): 비콘 position id
		 * layerId (String): layer group id
		 */
		this.addSphere = function (param) {		
			var geometry = new THREE.IcosahedronBufferGeometry(param.radius, 3);
			var material;
			
			if (param.color == "green") {
				material = new THREE.MeshLambertMaterial( {color: 0x00FF00} );
			} else if (param.color == "red") {
				material = new THREE.MeshLambertMaterial( {color: 0xFF0033} );
			}
			var sphere = new THREE.Mesh( geometry, material );
			sphere.position.x = param.x;
			sphere.position.y = param.y;
			sphere.position.z = param.z;
			
			sphere.layerId = param.layerId;
			sphere.positionId = param.positionId;
			sphere.groupName = param.groupName;
			
			if(UT.isEmpty(scene.getObjectByName("sphereGroup"))) {
				var sphereGroup = new THREE.Group();
				sphereGroup.name = "sphereGroup";
				scene.add(sphereGroup);
			}
//			scene.getObjectByName("sphereGroup").add(sphere);
			/**
			 * param 안에 param.groupName 이 있는지 확인한다.
			 * 있으면 sphereGroup 밑에다가 해당 groupName 으로 그룹을 하나 더 만들고, 그안에다가 sphere 를 add한다.
			 * 
			 * remove할 때에는 그 groupName으로 remove해주면 beaconGroup 혹은 gatewayGroup 만 지울 수 있다.
			 */
			
			if(param.groupName){
				if(UT.isEmpty(scene.getObjectByName(param.groupName))) {
					var sphereGroup1 = new THREE.Group();
					sphereGroup1.name = param.groupName;
					scene.getObjectByName("sphereGroup").add(sphereGroup1);
				}
				scene.getObjectByName(param.groupName).add(sphere);
			}else{
				scene.getObjectByName("sphereGroup").add(sphere);
			}
			
			
			var sphereLabelDiv = document.createElement( 'div' );
			sphereLabelDiv.textContent = param.message;
			sphereLabelDiv.style.marginTop = '-1em';
			sphereLabelDiv.style.position = 'absolute';
//			sphereLabelDiv.style.width = '30px';
			sphereLabelDiv.style.fontWeight = 'bold';
			sphereLabelDiv.style.fontSize = '20px';
			sphereLabelDiv.style.textAlign = 'center';
			sphereLabelDiv.style.borderRadius = '20px';
			sphereLabelDiv.style.color = '#64FF69';
			sphereLabelDiv.style.border = '2px solid #64FF69';
			if (param.color == "green") {
				sphereLabelDiv.style.backgroundColor = '#336622';
			} else if (param.color == "red") {
				sphereLabelDiv.style.backgroundColor = '#FF0033';
			}
			
			sphereLabelDiv.style.userSelect = 'none';
			sphereLabelDiv.style.pointerEvents = 'none';
			
			var sphereLabel = new CSS2DObject( sphereLabelDiv );
			sphere.add( sphereLabel );
		}
		
		/**
		 * 구 형태와 라벨 생성 팝업
		 * 
		 * @param
		 * radius (Number): 구의 크기
		 * color (String): 구의 컬러, green or red
		 * x (Number): x좌표
		 * y (Number): y좌표
		 * z (Number): z좌표
		 * message (Number): 사람수
		 * positionId (String): 비콘 position id
		 */
		this.addSpherePop = function (param) {		
			var geometry = new THREE.IcosahedronBufferGeometry(param.radius, 3);
			var material;
			if(param.message){
				if (param.color == "green") {
					material = new THREE.MeshLambertMaterial( {color: 0x00FF00} );
				} else if (param.color == "red") {
					material = new THREE.MeshLambertMaterial( {color: 0xFF0033} );
				} else if (param.color == "blue") {
					material = new THREE.MeshLambertMaterial( {color: 0x0200f9} );
				} 
				
				var sphere = new THREE.Mesh( geometry, material );
				sphere.position.x = param.x;
				sphere.position.y = param.y;
				sphere.position.z = param.z;
				
				sphere.positionId = param.positionId;
	//			sphere.groupName = param.groupName;
				
				if(UT.isEmpty(scene.getObjectByName("sphereGroup"))) {
					var sphereGroup = new THREE.Group();
					sphereGroup.name = "sphereGroup";
					scene.add(sphereGroup);
				}
				scene.getObjectByName("sphereGroup").add(sphere);
				
					var sphereLabelDiv = document.createElement( 'div' );
					sphereLabelDiv.textContent = param.message;
					sphereLabelDiv.style.marginTop = '-1em';
					sphereLabelDiv.style.position = 'absolute';
					sphereLabelDiv.style.width = '30px';
					sphereLabelDiv.style.fontWeight = 'bold';
					sphereLabelDiv.style.fontSize = '20px';
					sphereLabelDiv.style.textAlign = 'center';
					sphereLabelDiv.style.borderRadius = '20px';
					sphereLabelDiv.style.color = '#64FF69';
					sphereLabelDiv.style.border = '2px solid #64FF69';
					if (param.color == "green") {
						sphereLabelDiv.style.backgroundColor = '#336622';
					} else if (param.color == "red") {
						sphereLabelDiv.style.backgroundColor = '#FF0033';
					}else if (param.color == "blue") {
						sphereLabelDiv.style.backgroundColor = '#0200f9';
					}
					
					sphereLabelDiv.style.userSelect = 'none';
					sphereLabelDiv.style.pointerEvents = 'none';
					
					var sphereLabel = new CSS2DObject( sphereLabelDiv );
					sphere.add( sphereLabel );
			}
		}
		
		
		/**
		 * "sphereGroup"의 children 오브젝트들의 색상(녹색)과 visible(true) 초기화
		 * 
		 * @param none
		 */
		this.initializeWorkerLabel = function() {
			if(!UT.isEmpty(scene.getObjectByName("sphereGroup"))) {
				var sphereList = scene.getObjectByName("sphereGroup").children;
				for(var idx in sphereList){
					sphereList[idx].children[0].visible = true;
					sphereList[idx].children[0].element.style.backgroundColor = '#336622';	// green
				}
			}
		}
		
		
		/**
		 * "sphereGroup"의 children 오브젝트들의 색상(녹색)과 visible(true) 초기화
		 * 
		 * @param none
		 */
		this.initializeGroupLabel = function(groupName) {
			if(!UT.isEmpty(scene.getObjectByName(groupName))) {
				var objectList = scene.getObjectByName(groupName).children;
				for(var idx in objectList){
					
					for(var j = 0 ; j< objectList[idx].children.length ; j++){
						if ((objectList[idx].children[j].type == "Object3D") && ((objectList[idx].children[j].name).indexOf("tooltip") == -1)){
							objectList[idx].children[j].visible = true;
						}
					}
				}
			}
		}
		
		/**
		 * "sphereGroup"의 children 오브젝트들의 색상(녹색) 초기화
		 * 
		 * @param none
		 */
		this.initializeWorkerLabelColor = function() {
			if(!UT.isEmpty(scene.getObjectByName("sphereGroup"))) {
				var sphereList = scene.getObjectByName("sphereGroup").children;
				for(var idx in sphereList){
					sphereList[idx].children[0].element.style.backgroundColor = '#336622';
				}
			}
		}
		
		/**
		 * 해당 positionId를 가진 구의 색상 변경
		 * 
		 * @param
		 * id (String): 비콘 position id	
		 * color (String): rgba 
		 *				ex) "rgba(192,0,0, 0.8)"
		 */
		this.changeLabelColor = function(id, color) {
			if(!UT.isEmpty(scene.getObjectByName("sphereGroup"))) {
				var sphereList = scene.getObjectByName("sphereGroup").children;
				for(var idx in sphereList){
					if (sphereList[idx].positionId == id) {
						sphereList[idx].children[0].element.style.backgroundColor = color;
						return;
					}
				}
			}
		}
		/**
		 * 해당 positionId를 가진 Object의 색상 변경
		 * 
		 * @param
		 * id (String): 비콘 position id	
		 * color (String): rgba 
		 *				ex) "rgba(192,0,0, 0.8)"
		 */
		this.changeLabelColorGroup = function(id, color) {
			if(!UT.isEmpty(scene.getObjectByName("workerGroup"))) {
				var objectList = scene.getObjectByName("workerGroup").children;
				for(var idx in objectList){
					if (objectList[idx].positionId == id) {
						for(var j = 0 ; j< objectList[idx].children.length ; j++){
							if ((objectList[idx].children[j].type == "Object3D") && 
									((objectList[idx].children[j].name).indexOf("tooltip") == -1)){
								//objectList[idx].children[j].element.style.backgroundColor = color;
								//objectList[idx].children[j].element.active = true;
								objectList[idx].children[j].element.classList.add('active');
								return;
							}
						}
					}
				}
			}
		}
		
		/**
		 * box 형태와 라벨 생성
		 * 
		 * @param
		 * x (Number): x좌표
		 * y (Number): y좌표
		 * z (Number): z좌표
		 * issueId (String): 이슈 id
		 * message (Number): 이슈 수
		 * layerId (String): layer group id
		 * layerName (String): "layer" or "detail"
		 */
		this.addBoxIssue = function (param) {		
			var material = new THREE.MeshLambertMaterial( {color: 0x3333CC} );
			var geometry = new THREE.BoxGeometry( 6, 6, 6 );
			var cube = new THREE.Mesh( geometry, material );
			
			cube.position.set(param.x, param.y, param.z);
			cube.issueId = param.issueId;
			cube.layerId = param.layerId;
			cube.layerName = param.layerName;
			//cube.positionId = param.positionId;
			//cube.scale.set(0.2, 0.1, 0.4);
			
			if(UT.isEmpty(scene.getObjectByName("boxGroup"))) {
				var boxGroup = new THREE.Group();
				boxGroup.name = "boxGroup";
				scene.add(boxGroup);
			}
			
			if(cube.layerName == "layer") {
				if(UT.isEmpty(scene.getObjectByName("layerIssueGroup"))) {
					var layerIssueGroup = new THREE.Group();
					layerIssueGroup.name = "layerIssueGroup";
					scene.getObjectByName("boxGroup").add(layerIssueGroup);
				}
				scene.getObjectByName("layerIssueGroup").add(cube);
				
			} else if(cube.layerName == "detail") {
				if(UT.isEmpty(scene.getObjectByName("detailIssueGroup"))) {
					var detailIssueGroup = new THREE.Group();
					detailIssueGroup.name = "detailIssueGroup";
					scene.getObjectByName("boxGroup").add(detailIssueGroup);
				}
				scene.getObjectByName("detailIssueGroup").add(cube);
			}
			
			var issueLabelDiv = document.createElement( 'div' );
			issueLabelDiv.textContent = param.message;
			issueLabelDiv.style.marginTop = '-1em';
			issueLabelDiv.style.position = 'absolute';
			issueLabelDiv.style.width = '30px';
			issueLabelDiv.style.fontWeight = 'bold';
			issueLabelDiv.style.fontSize = '20px';
			issueLabelDiv.style.textAlign = 'center';
			
			issueLabelDiv.style.color = '#DDDD66';
			issueLabelDiv.style.border = '2px solid #DDDD66';
			issueLabelDiv.style.backgroundColor = '#4466CC';
			issueLabelDiv.style.userSelect = 'none';
			issueLabelDiv.style.pointerEvents = 'none';
			
			var issueLabel = new CSS2DObject( issueLabelDiv );
			cube.add( issueLabel );
		}
		
		/**
		 * 이슈 라벨의 색상(파랑) 초기화
		 * 
		 * @param none
		 */
		this.initializeIssueLabelColor = function() {
			var boxList;
			
			if (!UT.isEmpty(scene.getObjectByName("layerIssueGroup"))) {
				boxList = scene.getObjectByName("layerIssueGroup").children;
				for(var idx in boxList){
					boxList[idx].children[0].element.style.backgroundColor = '#4466CC';	// 파랑색
				}
			}
			
			if (!UT.isEmpty(scene.getObjectByName("detailIssueGroup"))) {
				boxList = scene.getObjectByName("detailIssueGroup").children;
				for(var idx in boxList){
					boxList[idx].children[0].element.style.backgroundColor = '#4466CC';	// 파랑색
				}
			}
		}

		/**
		 * 해당 layer의 이슈 라벨 색상 변경
		 * 
		 * @param
		 * layer (String): "layer" or "detail"
		 * id (String): layer group id
		 * color (String): rgba 
		 *				ex) "rgba(192,0,0, 0.8)"
		 */
		this.changeIssueLabelColor = function(layer, id, color) {
			if (layer == "layer") {
				if(!UT.isEmpty(scene.getObjectByName("layerIssueGroup"))) {
					var boxList = scene.getObjectByName("layerIssueGroup").children;
					for(var idx in boxList){
						if (boxList[idx].layerId == id) {
							boxList[idx].children[0].element.style.backgroundColor = color;
							return;
						}
					}				
				}
			} else if(layer == "detail") {
				if(!UT.isEmpty(scene.getObjectByName("detailIssueGroup"))) {
					var boxList = scene.getObjectByName("detailIssueGroup").children;
					for(var idx in boxList){
						if (boxList[idx].issueId == id) {
							boxList[idx].children[0].element.style.backgroundColor = color;
							return;
						}
					}	
				}
			}
		}
		
		
		
		/**
		 * Casen 생성
		 * 
		 * @param
		 * x (Number): x좌표
		 * y (Number): y좌표
		 * z (Number): z좌표
		 */
		this.addCasen = function (param) {		
			var loader = new THREE.OBJLoader();
			var texture = new THREE.TextureLoader().load( '/ui/lib/threejs/json/08_concrete.jpg' );
			var material = new THREE.MeshBasicMaterial( { map: texture , transparent: true} );
			//케이슨 투명도 설정
			material.opacity = 0.8;
			// load a resource
			loader.load(
				// resource URL
				'/ui/lib/threejs/json/casen.obj',
				// called when resource is loaded
				function ( object ) {
					object.traverse( function ( node ) {

				    if ( node.isMesh ) node.material = material;

				  } );
					object.position.x = param.x;
					object.position.y = param.y;
					object.position.z = param.z;
					
					object.groupName = param.groupName;
					
					if(UT.isEmpty(scene.getObjectByName("casenGroup"))) {
						var casenGroup = new THREE.Group();
						casenGroup.name = "casenGroup";
//						scene.add( casenGroup );
						scene.getObjectByName("siteGroup").add( casenGroup );
					}
//					scene.getObjectByName("casenGroup").add(object);
					scene.getObjectByName("siteGroup").getObjectByName("casenGroup").add(object);
				},
				// called when loading is in progresses
				function ( xhr ) {

					console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

				},
				// called when loading has errors
				function ( error ) {

					console.log( 'An error happened' );

				}
			);
			
		}
		/**
		 * PersonObj 생성
		 * 
		 * @param
		 * x (Number): x좌표
		 * y (Number): y좌표
		 * z (Number): z좌표
		 */
		this.addTargetObj = function (param, onClickCallbackFunc) {	
			var workerObjCopy = workerObj.clone();		
			var helmetObjCopy = helmetObj.clone();		
			
			workerObjCopy.position.x = param.x;
			workerObjCopy.position.y = param.y;
			workerObjCopy.position.z = param.z;
			workerObjCopy.positionId = param.positionId;
			
			helmetObjCopy.position.x = param.x;
			helmetObjCopy.position.y = param.y;
			helmetObjCopy.position.z = param.z;
			helmetObjCopy.positionId = param.positionId;
			
			if(UT.isEmpty(scene.getObjectByName("workerGroup"))) {
				var workerGroup = new THREE.Group();
				workerGroup.name = "workerGroup";
				scene.add( workerGroup );
			}
			scene.getObjectByName("workerGroup").add(workerObjCopy);
			scene.getObjectByName("workerGroup").add(helmetObjCopy);
			
			var tooltipDiv = document.createElement( 'div' );
			tooltipDiv.id = 'countTooltip_'+ param.positionId;
			tooltipDiv.className = 'countTooltip';

			/*var closeBtn = document.createElement( 'div' );
			closeBtn.className='close';
			closeBtn.innerHTML = "x";
			closeBtn.onclick = function(e){
				$(e.target.parentElement.parentElement).find('.active').removeClass('active');
				e.target.parentElement.lastElementChild.lastElementChild.remove();
			};
			tooltipDiv.appendChild(closeBtn);*/
			
			var LabelDiv = document.createElement( 'div' );
			LabelDiv.className = 'countLabel';
			LabelDiv.setAttribute("position", param.message+" ("+param.displayName+")");
			LabelDiv.innerHTML = "<span>"+param.message+"</span>";
			tooltipDiv.appendChild(LabelDiv);
			
			if(param.emergency){
				var emergencyDiv = document.createElement( 'div' );
				emergencyDiv.innerHTML = "<i class='ri-error-warning-fill'>";
				emergencyDiv.className ='emergency';
				tooltipDiv.appendChild(emergencyDiv);
			}
				
			var Label = new CSS2DObject( tooltipDiv );
			Label.position.y = 3;
			workerObjCopy.add(Label);

			LabelDiv.onclick = function(e){
				// 기존 선택 초기화
				$(this.parentElement.parentElement).find('.active').removeClass('active');
				
				this.classList.add('active');
				this.parentElement.classList.add('active');
				
				if(onClickCallbackFunc) onClickCallbackFunc(this, param.positionId);
			}
		}
		

		/**
		 * 카메라가 360도 회전하는 효과를 on/off
		 * 
		 * @param
		 * flag (Boolean)
		 */
		this.rotateCamera = function (flag) {
			rotationCameraFlag = flag;
			
			if(!rotationCameraFlag) {
				camera.position.set(6,120,380);
				controls.target.set(0, 0, 0);
				controls.update();
			}
		};

		/**
		 * 카메라 위치를 조정한다
		 * 
		 * @param
		 * x (Number): x좌표
		 * y (Number): y좌표
		 * z (Number): z좌표
		 */
		this.setCameraPosition = function (x, y, z) {
			camera.position.set(x, y, z);
		};

		/**
		 * 카메라 target 위치를 조정한다
		 * 
		 * @param
		 * x (Number): x좌표
		 * y (Number): y좌표
		 * z (Number): z좌표
		 */
		this.setControlsTarget = function (x, y, z) {
			controls.target.set(x, y, z);
			controls.update();
			labelControls.target.set(x, y, z);
			labelControls.update();
		};
		
		this.getControls = function () {
			return controls;
		};

		/**
		 * 해당 group의 visible 설정
		 * 
		 * @param
		 * name (String): Group 명
		 * flag (Boolean)
		 */
		this.setVisibleGroup = function (name, flag) {
			if (!UT.isEmpty(scene.getObjectByName(name))) {
				scene.getObjectByName(name).visible = flag;
			
				if(name == "layerIssueGroup") {
					var boxList = scene.getObjectByName("layerIssueGroup").children;
					for(var idx in boxList){
						// box 이슈의 라벨 visible
						boxList[idx].children[0].visible = flag;
					}
				} else if(name == "detailIssueGroup") {
					var boxList = scene.getObjectByName("detailIssueGroup").children;
					for(var idx in boxList){
						// box 이슈의 라벨 visible
						boxList[idx].children[0].visible = flag;
					}
				}
			}
		};

		/**
		 * 해당 layer의 detail 이슈와 구의 visible 설정
		 * 
		 * @param
		 * layerId (String): layer group id
		 */
		this.setVisibleLayerGroup = function (layerId) {
			var boxList;
			
			if(!UT.isEmpty(scene.getObjectByName("detailIssueGroup"))) {
				boxList = scene.getObjectByName("detailIssueGroup").children;
				for(var idx in boxList){
					if(boxList[idx].layerId == layerId) {
						boxList[idx].visible = true;
						boxList[idx].children[0].visible = true;		// 이슈 라벨
					} else {
						boxList[idx].visible = false;
						boxList[idx].children[0].visible = false;		// 이슈 라벨
					}
				}
			}
			
			if(!UT.isEmpty(scene.getObjectByName("sphereGroup"))) {
				boxList = scene.getObjectByName("sphereGroup").children;
				for(var idx in boxList){
					if(boxList[idx].layerId == layerId) {
						boxList[idx].children[0].visible = true;
					} else {
						boxList[idx].children[0].visible = false;
					}
				}
			}
		};
		
		this.setScene = function ( value ) {
			scene = value;
		};
		
		this.getScene = function () {
			return scene;
		};
		
		this.getCamera = function () {
			return camera;
		};
		
		this.getLabelRenderer = function(){
			return labelRenderer; 
		};
		
		this.getMouse = function () {
			return mouse;
		};
		
		this.getRayCaster = function () {
			return rayCaster;
		};

		this.setSize = function ( width, height ) {
			this.width = width;
			this.height = height;

			if ( camera ) {
				camera.aspect = this.width / this.height;
				camera.updateProjectionMatrix();
			}

			if ( renderer ) {
				renderer.setSize( width, height );
			}
			
			if ( labelRenderer ) {
				labelRenderer.setSize( width, height );
			}

		};
		
		function dispatch( array, event ) {
			for ( var i = 0, l = array.length; i < l; i ++ ) {
				array[ i ]( event );
			}
		}

		var time, prevTime;

		function animate() {
			time = performance.now();
			
			try {
				dispatch( events.update, { time: time, delta: time - prevTime } );
				
				if (rotationCameraFlag) {
					var time = time * 0.0005;
					camera.position.x = 400 * Math.sin( time );
					camera.position.y = 100;
					camera.position.z = 400 * Math.cos( time );
					camera.lookAt( scene.position );
				}
				
			} catch ( e ) {
				console.error( ( e.message || e ), ( e.stack || "" ) );
			}

			renderer.render( scene, camera );
			labelRenderer.render( scene, camera );

			prevTime = time;
		}

		this.play = function () {
			prevTime = performance.now();

			document.addEventListener( 'keydown', onDocumentKeyDown );
			document.addEventListener( 'keyup', onDocumentKeyUp );
			document.addEventListener( 'mousedown', onDocumentMouseDown );
			document.addEventListener( 'mouseup', onDocumentMouseUp );
			document.addEventListener( 'mousemove', onDocumentMouseMove );
			document.addEventListener( 'touchstart', onDocumentTouchStart );
			document.addEventListener( 'touchend', onDocumentTouchEnd );
			document.addEventListener( 'touchmove', onDocumentTouchMove );

			dispatch( events.start, arguments );
			renderer.setAnimationLoop( animate );
		};

		this.stop = function () {
			document.removeEventListener( 'keydown', onDocumentKeyDown );
			document.removeEventListener( 'keyup', onDocumentKeyUp );
			document.removeEventListener( 'mousedown', onDocumentMouseDown );
			document.removeEventListener( 'mouseup', onDocumentMouseUp );
			document.removeEventListener( 'mousemove', onDocumentMouseMove );
			document.removeEventListener( 'touchstart', onDocumentTouchStart );
			document.removeEventListener( 'touchend', onDocumentTouchEnd );
			document.removeEventListener( 'touchmove', onDocumentTouchMove );

			dispatch( events.stop, arguments );
			renderer.setAnimationLoop( null );
		};

		this.dispose = function () {
			while ( dom.children.length ) {
				dom.removeChild( dom.firstChild );
			}

			renderer.dispose();

			camera = undefined;
			scene = undefined;
			renderer = undefined;
		};

		function onDocumentKeyDown( event ) {
			dispatch( events.keydown, event );
		}

		function onDocumentKeyUp( event ) {
			dispatch( events.keyup, event );

		}

		function onDocumentMouseDown( event ) {
			dispatch( events.mousedown, event );
		}

		function onDocumentMouseUp( event ) {
			dispatch( events.mouseup, event );

		}

		function onDocumentMouseMove( event ) {
			dispatch( events.mousemove, event );

		}

		function onDocumentTouchStart( event ) {
			dispatch( events.touchstart, event );

		}

		function onDocumentTouchEnd( event ) {
			dispatch( events.touchend, event );

		}

		function onDocumentTouchMove( event ) {
			dispatch( events.touchmove, event );

		}
	}
};