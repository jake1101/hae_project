var workerObj;
var worker2Obj;
var helmetObj;
var helmet2Obj;



var loader = new THREE.OBJLoader();

var texture1 = new THREE.TextureLoader().load( '/ui/lib/threejs/json/10_skin.jpg' );
var texture2 = new THREE.TextureLoader().load( '/ui/lib/threejs/json/09_helmet.jpg' );
var material1 = new THREE.MeshLambertMaterial( { map: texture1 , transparent: true} );
var material2 = new THREE.MeshPhongMaterial( { map: texture2 , transparent: true} );



//var material = new THREE.MeshLambertMaterial( {color: 0x00FF00} );
var url;
var url2;
var url3;
var url4;
url = '/ui/lib/threejs/json/model.obj';
url2 = '/ui/lib/threejs/json/model2.obj';
url3 = '/ui/lib/threejs/json/helmet.obj';
url4 = '/ui/lib/threejs/json/helmet2.obj';

var reloadObj = function(){
	loader.load(
			// resource URL
			url,
			// called when resource is loaded
			function ( object ) {
				object.traverse( function ( node ) {

					if ( node.isMesh ) node.material = material1;

			    } );
				workerObj = object;
			},
			// called when loading is in progresses
			function ( xhr ) {
				//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			// called when loading has errors
			function ( error ) {
				//console.log( 'An error happened' );
			}
	);


	loader.load(
			// resource URL
			url2,
			// called when resource is loaded
			function ( object ) {
				object.traverse( function ( node ) {

					if ( node.isMesh ) node.material = material1;

			    } );
				worker2Obj = object;
			},
			// called when loading is in progresses
			function ( xhr ) {
				//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			// called when loading has errors
			function ( error ) {
				//console.log( 'An error happened' );
			}
	);
	loader.load(
			// resource URL
			url3,
			// called when resource is loaded
			function ( object ) {
				object.traverse( function ( node ) {
					
					if ( node.isMesh ) node.material = material2;
					
				} );
				helmetObj = object;
			},
			// called when loading is in progresses
			function ( xhr ) {
				//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			// called when loading has errors
			function ( error ) {
				//console.log( 'An error happened' );
			}
	);
	loader.load(
			// resource URL
			url4,
			// called when resource is loaded
			function ( object ) {
				object.traverse( function ( node ) {
					
					if ( node.isMesh ) node.material = material2;
					
				} );
				helmet2Obj = object;
			},
			// called when loading is in progresses
			function ( xhr ) {
				//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			// called when loading has errors
			function ( error ) {
				//console.log( 'An error happened' );
			}
	);
}


reloadObj();

