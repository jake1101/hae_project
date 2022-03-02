
var RaySky = function(scene, light_sun, renderer) {
	// 하늘
	var sky = new THREE.Sky();
		sky.material.uniforms['turbidity'].value=10;
		sky.material.uniforms['rayleigh'].value=2;
		sky.material.uniforms['luminance'].value=1;
		sky.material.uniforms['mieCoefficient'].value=0.005;
		sky.material.uniforms['mieDirectionalG'].value=0.8;

		var parameters = {
			distance: 400,
			inclination: 0.1,
			azimuth: 0.05
		};

		var cubeCamera = new THREE.CubeCamera( 0.1, 1, 512 );
		scene.background = cubeCamera.renderTarget;

		var theta = Math.PI * ( parameters.inclination - 0.5 );
		var phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );

		light_sun.position.x = parameters.distance * Math.cos( phi );
		light_sun.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
		light_sun.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );

		sky.material.uniforms['sunPosition'].value = light_sun.position.copy( light_sun.position );

		cubeCamera.update( renderer, sky );
}
