isBrowser = false;

var converter = new Converter8To9();


var addResource= function(content){
	converter.addResource(content);
};


var resolveNext = function(){
	return converter.resolveNext();
};

var doSourceConvert = function(){
	return converter.resolveViews();
};