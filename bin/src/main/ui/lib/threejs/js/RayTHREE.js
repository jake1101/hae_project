class RayThree {
	constructor(container) {
		this.container = container;
		this.width = container.clientWidth;
		this.height = container.clientHeight;
		
		this.raycaster = new THREE.Raycaster();
		this.raycaster.layers.disableAll();	
		this.raycaster.layers.enable(1);	//비콘레이어
		this.raycaster.layers.enable(2);	//작업자레이어
//		this.raycaster.layers.set(3); // 기타
		
		this.pointer = new THREE.Vector2();
		
		this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha :true } );
		const renderer = this.renderer;
		renderer.setSize(this.width - 1, this.height - 1);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		container.appendChild(this.renderer.domElement);
		
		this.labelRenderer = new CSS2DRenderer();
		const labelRenderer = this.labelRenderer;
		labelRenderer.setSize(this.width, this.height);
		labelRenderer.domElement.style.position = 'absolute';
		labelRenderer.domElement.style.top = '0px';
		container.appendChild(labelRenderer.domElement);

		this.scene = new THREE.Scene();
		const scene = this.scene;
		
		this.camera = new THREE.PerspectiveCamera( 50, this.width/this.height, 1, 20000 );
		const camera = this.camera;
		camera.layers.enableAll();
		camera.position.set( 30, 30, 100 );
		
		var labelControls = new THREE.OrbitControls(this.camera, this.labelRenderer.domElement);
		labelControls.maxDistance = 300;
		labelControls.minDistance = 2;
		this.labelControls = labelControls;
		
		const pmremGenerator = new THREE.PMREMGenerator(this.renderer);

		const sky = new THREE.Sky();
		sky.scale.setScalar(10000);
		scene.add(sky);

		const skyUniforms = sky.material.uniforms;
		skyUniforms[ 'turbidity' ].value = 1;
		skyUniforms[ 'rayleigh' ].value = 0.7;
		skyUniforms[ 'mieCoefficient' ].value = 0.002;
		skyUniforms[ 'mieDirectionalG' ].value = 0.8;

		const sun = new THREE.Vector3();

		const parameters = {
				elevation: 75, 
				azimuth: 80
		};
		
		const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
		const theta = THREE.MathUtils.degToRad( parameters.azimuth );

		sun.setFromSphericalCoords( 1, phi, theta );

		sky.material.uniforms[ 'sunPosition' ].value.copy(sun);

		scene.environment = pmremGenerator.fromScene(sky).texture;
		
		// 자연광을 넣는다.
		const ambientLight = new THREE.AmbientLight(0xFFFFFF, 2);
		scene.add(ambientLight);

		var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
		directionalLight.position.set(90, 80, 90);
		directionalLight.target.position.set(0, 0, 0);
		scene.add(directionalLight);
		
		var directionalLight2 = directionalLight.clone();
		directionalLight2.position.set(90, 80, -90);
		scene.add(directionalLight2);
		
		this.modelGroup = new THREE.Group();
		scene.add(this.modelGroup);
		
		this.workerGroup = new THREE.Group();
		scene.add(this.workerGroup);
		
		this.beaconGroup = new THREE.Group();
		scene.add(this.beaconGroup);
		
		this.resize = function(){
			camera.aspect = container.clientWidth/container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.clientWidth,container.clientHeight);
			labelRenderer.setSize(container.clientWidth,container.clientHeight);
		}
		
		var me = this;
		
		this.animate = function animate() {
			me.request = requestAnimationFrame(me.animate);
			me.render();
		}
		
		var tooltip = document.createElement('div');
		tooltip.className = 'threeTooltip';
		container.appendChild(tooltip);
		this.tooltip = tooltip;
		
		this.container.parentElement.addEventListener('click', 
			function(event){
				var x = event.clientX - $(me.container).offset().left;
				var y = event.clientY - $(me.container).offset().top;
				
				me.pointer.x = (x / me.container.clientWidth) * 2 - 1;
				me.pointer.y = - (y / me.container.clientHeight) * 2 + 1;

				me.raycaster.setFromCamera(me.pointer, me.camera);

				const intersects = me.raycaster.intersectObjects(me.scene.children, true);
				
				if ( intersects.length > 0 ) {
					var object = intersects[0].object.parent;
					if(object.type == 'workergroup'){
						me.clickWorker(object);
					}
				}
				
			}
		);
		
		this.container.parentElement.addEventListener('mousemove', 
				function(event){
					var x = event.clientX - $(me.container).offset().left;
					var y = event.clientY - $(me.container).offset().top;
					
					me.pointer.x = (x / me.container.clientWidth) * 2 - 1;
					me.pointer.y = - (y / me.container.clientHeight) * 2 + 1;
					
					me.raycaster.setFromCamera(me.pointer, me.camera);

					const intersects = me.raycaster.intersectObjects(me.scene.children, true);
					
					this.style.cursor = "";
					var selected = me.container.querySelector('.countLabel.active');
					if(selected){
						if(!selected.parentElement.classList.contains('active')){
							me.container.querySelector('.countLabel.active').classList.remove('active');
						}
					}
					me.tooltip.style.display = 'none';
					
					if ( intersects.length > 0 ) {
						var object = intersects[0].object.parent;
						if(object.type == 'workergroup'){
							this.style.cursor = "pointer";
							var id = '#countTooltip_'+object.userData.positionId;
							me.container.querySelector(id).querySelector('.countLabel').classList.add('active');
							
						}else if(object.type == 'beacon'){
							this.style.cursor = "pointer";
							me.tooltip.innerText=object.userData.minor+' ('+object.userData.displayName+')';
							me.tooltip.style.left = x+"px";
							me.tooltip.style.top = y+"px";
							me.tooltip.style.display = 'block';
						}
					}
					
				}
			);
	}
	
	clickWorker(worker){
		var id = '#countLabel_'+worker.userData.positionId;
		this.container.querySelector(id).click();
	}
	
	render(){
		this.renderer.render(this.scene, this.camera);
		this.labelRenderer.render(this.scene, this.camera);
	}
	
	stopAnimate(){
		cancelAnimationFrame(this.request);
	}
	
	setBeacon(positions){
		for(var i in positions){
			var beacon = beaconObj.scene.clone();
			beacon.position.x = positions[i].x;
			beacon.position.y = positions[i].y - 1.24;
			beacon.position.z = positions[i].z;
			beacon.name = positions[i].positionId;
			beacon.userData = positions[i];
			beacon.type = 'beacon';
			
			this.beaconGroup.add(beacon);
		}
	}

	setWorker(positions, clickCallback){
		var me = this;
		me.workerGroup.clear();
		for(var i in positions){
			if(UT.isNotEmpty(positions[i].workerCnt)){
				var worker = workerObj.scene.clone();
				
		     	worker.position.x = positions[i].x;
		     	worker.position.y = positions[i].y - 1.24;
		     	worker.position.z = positions[i].z;
		     	worker.name = 'workergroup_'+positions[i].positionId;
		     	worker.userData = positions[i];
		     	worker.type = 'workergroup';
		     	
		     	var tooltipDiv = document.createElement('div');
				tooltipDiv.id = 'countTooltip_'+ positions[i].positionId;
				tooltipDiv.className = 'countTooltip';
	
				var LabelDiv = document.createElement('div');
				LabelDiv.className = 'countLabel';
				LabelDiv.id = 'countLabel_'+ positions[i].positionId;
				LabelDiv.setAttribute("position", positions[i].workerCnt+" ("+positions[i].displayName+")");
				LabelDiv.setAttribute("positionId", positions[i].positionId);
				LabelDiv.innerHTML = "<span>"+positions[i].workerCnt+"</span>";
				tooltipDiv.appendChild(LabelDiv);
				
				LabelDiv.onclick = function(e){
					$(this.parentElement.parentElement).find('.active').removeClass('active');
					
					this.classList.add('active');
					this.parentElement.classList.add('active');
					
					if(clickCallback) clickCallback(this);
				}
				
				if(positions[i].emergency){
					var emergencyDiv = document.createElement( 'div' );
					emergencyDiv.innerHTML = "<i class='ri-error-warning-fill'>";
					emergencyDiv.className ='emergency';
					tooltipDiv.appendChild(emergencyDiv);
				}
					
				var Label = new CSS2DObject(tooltipDiv);
				Label.position.copy(worker.position);
				Label.position.y = Label.position.y + 2;
				
				me.workerGroup.add(Label);
				me.workerGroup.add(worker);
			}
		}
	}	
	
	focusObject(obj, cameraOffset){
		this.labelControls.target.copy(obj.position);
		this.camera.position.set(obj.position.x+cameraOffset, obj.position.y+cameraOffset, obj.position.z);
		this.labelControls.update();
	}
	
	setCameraPosition(position){
		this.labelControls.target.copy(position.target);
		this.camera.position.copy(position.camera);
		this.labelControls.update();
	}
	
	getCameraPosition(){
		var position = {};
		position.camera = this.camera.position.clone();
		position.target = this.labelControls.target.clone();

		return position;
	}
	
	addModel(model){
		if(model.type == 'Mesh'){
			model.layers.set(1);	
		} else {
			model.children.forEach(function(e){
				e.layers.set(1);
			})
		}
		this.modelGroup.add(model);
	}
} 