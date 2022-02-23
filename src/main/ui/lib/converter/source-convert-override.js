var resultResolver = function(element, to_element, attr){
	if(attr.localName() == 'result'){
		var value = attr.getValue();
		value = value.split('(event)','').join('');
		value = value.split('(','').join('');
		value = value.split(')','').join('');
		attr.setValue(value);
	}
};


var tobeOverride = {
	"SCServiceProvider" : {
		__name: "sc-service-provider",
		extraAttributeFunc: function(element, to_element, attr) {
			resultResolver(element, to_element, attr);
		},
		result: "on-result",
		serviceId: "service-id",
		descriptor: "descriptor",
		monitors: "remove",
		locks: "remove"
	},
	"SCServiceInput" : {
		__name: "sc-service-output",
		extraAttributeFunc: function(element, to_element, attr) {
			resultResolver(element, to_element, attr);
		},
		target : "target",
		name : "name"
	},
	"inputs" : null,
	"outputs" : null,
	"SCServiceGroup": {
		__name: "sc-service-group",
	},
	"SCCodeProvider": {
		__name: "sc-code-provider",
		code: "code",
		target: "target"
	}
};