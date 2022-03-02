const PI_PER_180 = Math.PI / 180;

var scene;
var renderer;
var labelRenderer;
var loader;

var RayTHREE = function(divId, scale){
	// 3차원 세계
	this.scene = new THREE.Scene();

	this.loader = new THREE.TextureLoader();
	var loaderMesh = new THREE.ColladaLoader();	// 3차원 모델파일을 불러오는 기능

	this.loadDAE = function (file, obj, callback)
	{
		loaderMesh.load(
			file,
			function ( collada ){
				obj = collada.scene;
				var i;
				for(i=0;i<obj.children.length;++i)
					obj.children[i].castShadow=true;
				callback(obj);
		});
	}

	// 렌더러 정의 및 크기 지정, 문서에 추가하기
	this.renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true } );
	//this.renderer.setSize(window.innerWidth * scale, window.innerHeight * scale);
	this.renderer.setSize(1870, 820);
	document.getElementById(divId).appendChild( this.renderer.domElement );
	this.renderer.shadowMap.enabled = true;
	this.renderer.shadowMap.type = THREE.PCFShadowMap;		// <-- 속도가 빠르다
	this.renderer.gammaInput =  true;
	this.renderer.gammaOutput = true;
	
	// group 제거
	this.removeGroup = function(name){
		this.scene.remove(this.scene.getObjectByName(name));
	}
	
	// get 모델
	this.getModel = function(name){
		for(i=0; i<this.scene.children.length; i++) {
			if (this.scene.children[i].name == name && this.scene.children[i].type != "Sprite") {
				return this.scene.children[i];
			}
		}
	}
	
	// get 라벨
	this.getLabel = function(name){
		for(i=0; i<this.scene.children.length; i++) {
			if (this.scene.children[i].name == name && this.scene.children[i].type == "Sprite") {
				return this.scene.children[i];
			}
		}
	}
	
	this.removeLabel = function(){
		var arr = [];
		
		for(i=0; i<this.scene.children.length; i++) {
			if (this.scene.children[i].type == "Sprite") {
				arr.push(i);
			}
		}
		
		if(arr.length > 0) {
			var idx = 0;
			for(i=arr.length-1; i>=0; i--) {
				idx = arr[i];
				this.scene.remove(this.scene.children[idx]);
			}
		}
	}
	
	this.getRGB = function(inputR, inputG, inputB) {
		return new THREE.Color().setRGB(inputR/255, inputG/255, inputB/255);
	}
	
	// 라벨 생성
    this.makeTextLabel = function( message, parameters ) {
		if ( parameters === undefined ) parameters = {};
		
		var fontface = parameters.hasOwnProperty("fontface") ? 
			parameters["fontface"] : "Arial";
		
		var fontsize = parameters.hasOwnProperty("fontsize") ? 
			parameters["fontsize"] : 18;
		
		var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
			parameters["borderThickness"] : 4;
		
		var borderColor = parameters.hasOwnProperty("borderColor") ?
			parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
		
		var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
			parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

		//var spriteAlignment = THREE.SpriteAlignment.topLeft;
			
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		context.font = "Bold " + fontsize + "px " + fontface;
	    
		// get size data (height depends only on font size)
		var metrics = context.measureText( message );
		var textWidth = metrics.width;
		
		// background color
		context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
									  + backgroundColor.b + "," + backgroundColor.a + ")";
		// border color
		context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
									  + borderColor.b + "," + borderColor.a + ")";

		context.lineWidth = borderThickness;
		this.roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
		// 1.4 is extra height factor for text below baseline: g,j,p,q.
		
		// text color
		context.fillStyle = "rgba(0, 0, 0, 1.0)";

		context.fillText( message, borderThickness, fontsize + borderThickness);
		
		// canvas contents will be used for a texture
		var texture = new THREE.Texture(canvas) 
		texture.needsUpdate = true;

		var spriteMaterial = new THREE.SpriteMaterial( 
			{ map: texture} );		// , useScreenCoordinates: false, alignment: spriteAlignment 
		var sprite = new THREE.Sprite( spriteMaterial );
		sprite.scale.set(2.1, 1.6, 1.0);
		return sprite;	
	},
	
	// function for drawing rounded rectangles
	this.roundRect = function (ctx, x, y, w, h, r) {
	    ctx.beginPath();
	    ctx.moveTo(x+r, y);
	    ctx.lineTo(x+w-r, y);
	    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
	    ctx.lineTo(x+w, y+h-r);
	    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
	    ctx.lineTo(x+r, y+h);
	    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
	    ctx.lineTo(x, y+r);
	    ctx.quadraticCurveTo(x, y, x+r, y);
	    ctx.closePath();
	    ctx.fill();
		ctx.stroke();   
	}
	
}