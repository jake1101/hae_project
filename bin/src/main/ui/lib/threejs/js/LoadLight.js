var light_sun;

var RayLight = function(scene) {
	// 전체 조명
	var light_base = new THREE.AmbientLight( 0xf0f0f0 ); // soft white light
		scene.add( light_base );

	// 태양 조명
	this.light_sun = new THREE.DirectionalLight ( 0x808080, 0.3 );
		var shadowBlur=1;
		this.light_sun.castShadow=true;
		this.light_sun.shadow.camera.left=-shadowBlur;
		this.light_sun.shadow.camera.right=shadowBlur;
		this.light_sun.shadow.camera.top=shadowBlur;
		this.light_sun.shadow.camera.bottom=-shadowBlur;
		scene.add( this.light_sun );
}
