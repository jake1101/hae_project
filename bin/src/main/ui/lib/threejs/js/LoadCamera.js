var camera;
var controls;

var RayCamera = function(renderer) {
	// 카메라 ( 카메라 수직 시야 각도, 가로세로 종횡비율, 시야거리 시작지점, 시야거리 끝지점
	this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 1, 20000 );
	this.camera.position.set ( 30, 18, 0 );

	// 카메라 컨트롤러
	this.controls = new THREE.OrbitControls (this.camera, renderer.domElement);
	//this.controls.enablePan = false;
	this.controls.minPolarAngle = Math.PI / -2;
	this.controls.maxPolarAngle = Math.PI / 2.1;
	
	/*this.controls.enableDamping = true;
	this.controls.dampingFactor = 0.1;*/
	
	this.moveCam = function(eye_x, eye_y, eye_z, target_x, target_y, target_z) {
		this.camera.position.set ( eye_x, eye_y, eye_z );
		this.controls.target.set( target_x, target_y, target_z );
	}
}
