var floor;

var RayModelFloor = function(threejs, name, imgT, x, y, z) {
	var img = imgT;
	
	// 바닥
	threejs.loader.load(
			img,
		function ( texture ) {
			this.floor = new THREE.Mesh(
				new THREE.BoxGeometry(x, y, z)
			);
			this.floor.name = name;
			this.floor.material = new THREE.MeshStandardMaterial({map: texture});
			this.floor.material.map.repeat.x=70;
			this.floor.material.map.repeat.y=70;
			this.floor.material.map.wrapS=THREE.RepeatWrapping;
			this.floor.material.map.wrapT=THREE.RepeatWrapping;
			this.floor.position.set(0, -3, 0);
			this.floor.receiveShadow=true;
			threejs.scene.add(this.floor);
		}
	);
}