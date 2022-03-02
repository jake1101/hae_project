
var RayModelMan = function(threejs, img, eventControl, workerInfo) {
	//  모델
	eventControl.offsetUse = true;
	
	var man;
	threejs.loadDAE(
			img,
			man,
			function(obj){
				obj.workerId = workerInfo.workerId;
				obj.name = workerInfo.workerName;
				if (workerInfo.color == "blue") {
					obj.children[0].material.color = new THREE.Color().setRGB(0,0,1);	// blue
				} else if (workerInfo.color == "red") {
					obj.children[0].material.color = new THREE.Color().setRGB(1,0,0);	// red
				}
				threejs.scene.getChildByName("workers").add( obj );
				eventControl.attach(obj);
				obj.rotation.set(-90 * PI_PER_180, 0, 90 * PI_PER_180); 
				obj.position.set(workerInfo.x, workerInfo.y, workerInfo.z);
				obj.scale.set(workerInfo.scale,workerInfo.scale,workerInfo.scale);
				eventControl.attach(obj);
			}
	);
	
}
