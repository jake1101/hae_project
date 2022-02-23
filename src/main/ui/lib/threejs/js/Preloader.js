var gloader = new GLTFLoader().setPath('/ui/lib/threejs/json/');
gloader.loaded ={};

var workerObj; 
var beaconObj;

var Preload = function(){
	
	var dracoLoader = new THREE.DRACOLoader();
	dracoLoader.setDecoderPath( '/ui/lib/threejs/js/' );
	gloader.setDRACOLoader(dracoLoader);
	
	gloader.load('worker.glb', function(glb){
		glb.scene.rotation.y=Math.PI/2;
		glb.scene.children.forEach(function(e){
			e.layers.set(1);
		})
		workerObj = glb;
	});
	
	gloader.load('beacon2.glb', function(glb){
		glb.scene.rotation.y=Math.PI/2;
		glb.scene.children.forEach(function(e){
			e.layers.set(2);
		})
		beaconObj = glb;
	});
	
}

Preload();