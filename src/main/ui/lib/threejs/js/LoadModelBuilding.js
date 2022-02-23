
var RayModelBuilding = function(threejs, img, name) {
	//  모델
	
	var home_mesh;
	threejs.loadDAE(
		img,
		home_mesh,
		function(obj){
			obj.name = name;
			threejs.scene.add( obj );
			obj.rotation.set(-90 * PI_PER_180, 0, 90 * PI_PER_180); 
			obj.position.set(0,2,0);
		}
	);
	
}
