/**
 * EMRO SMARTsuite7 to SMARTsuite9 CONVERTER
 * @author 
 * @version:0.1.0
 * 
 * use library
 * 1. jsxml : javascript 기반 xml parser (https://github.com/colorhook/jsxml)
 * 2. ejs : javascript template 엔진 (http://www.embeddedjs.com/)
 * 3. as3js : actionscript3 to javascript transpiler (https://as3js.org/)
 * 4. js-beautify : js, html, css beautifier (https://github.com/beautify-web/js-beautify)
 */
 
var tobeInfo;
function convert(content, domName, type, scriptConvert) {
	// jsxml
	var Namespace = jsxml.Namespace, QName = jsxml.QName, XML = jsxml.XML, XMLList = jsxml.XMLList;
	var me = this;
	
	
	var editorPropertiesResolveFunction = function(element, to_element, attr){
		if(attr.localName() == 'editorProperties'){
			var editorInfos;
			try{
				editorInfos = eval('('+attr.getValue().replace('{','').replace('}','')+')');
			}catch(e){}
			
			if(CUT.isObject(editorInfos)){
				for(var key in editorInfos){
					if(key == 'restrict'){
						editorInfos[key] = '/['+editorInfos[key]+']/';
					}
					
					if(to_element[key]){
						element.setAttribute(to_element[key], editorInfos[key]);
					}
					
				}
			}
			
			attr.remove();
		}
	};
	
	
	var templateGenerateFunction = function(element, to_element, children) {
		//sc-page에 경우 template를 추가해 준다.
		var addTemplateChildren = [];
		children = element.children();
		if(element.name() === "sc-pages"){
			if(element.getChildElements().length === 0){
				convertElementToComment(element);
			}else{
				var index = 0;
				var isMadeFirstElement = false;
				for (var i = 0; i < children.length();  ++i) {
					
					if(children.length() === 1){
						addTemplateChildren.push(children);
						break;
					}

					if(children.item(i).nodeKind() === "element"){
						children.item(i).addClass("fit");
						
						if(!isMadeFirstElement){
							if(children.item(i).name && children.item(i).name().indexOf("script") > -1){
								isMadeFirstElement = false;
							}else{
								addTemplateChildren.push(children.item(i));
								isMadeFirstElement = true;
							}
							
						}else{
							var tmp = new XML("<template></template>");
							var copyEl = children.item(i).copy();
							if(copyEl.name().indexOf("CCModule") > -1){
								if(copyEl.attribute("url")){
									var name = copyEl.attribute("url").getValue().split("/");
									copyEl.setName(name[name.length-1].split(".")[0]);
								}
							}
							tmp.appendChild(copyEl);
							addTemplateChildren.push(tmp);

						}
						index++;
					}
				}
				element._children = addTemplateChildren;
			}
		}
	};
	
	var configurateBindingValue = function(el){
		var id = el.getAttribute("id"),
			value = el.getAttribute("value");
		if(id != null && value == null){
			var bobj = findBindingObject(el);
			if(bobj){
				el.setAttribute("value", "{{" + bobj + '.' + id +"}}");
			}
		}
	};
	
	
	var findBindingObject = function(el){
		var current = el,
			result = null;
		
		while(current != null && result == null){
			result = current.getAttribute('bindingObject');
			current = current._parent;
		}
		
		if(CUT.isString(result)){
			result = result.replaceAll('{', '');
			result = result.replaceAll('}', '');
		}
		
		return result;
	};
	
	var CUT = {
			
		clone : function(target){
	    	if (this.isArray(target))
	        {
	            var clone = [];
	            for (var i=0; i<target.length; i++)
	                clone[i] = arguments.callee.call(this,target[i]);
	
	            return clone;
	        } 
	        else if (this.isObject(target))
	        {
	            var clone = {};
	            for (var prop in target)
	                if (target.hasOwnProperty(prop))
	                    clone[prop] = arguments.callee.call(this,target[prop]);
	
	            return clone;
	        }
	        else
	            return target;
	    },
		startsWith : function(str, word){
			if(!CUT.isString(str) || !CUT.isString(word)){
				return false;
			}
			
			return str.substring( 0, word.length ) === word
		},
		endsWith : function(str, word){
			if(!CUT.isString(str) || !CUT.isString(word)){
				return false;
			}
			
			return str.substring( str.length - word.length, str.length ) === word;
		},
		generateId : function(unique, prefix){
			if(unique) {
				return (function() {
					 var pattern = 'xxxxxxxx-xxxx-4xxx-Rxxx-xMxxxxxxxxxx'.split(''),
				 	 hex = '0123456789abcdef'.split(''),
		         	 length = pattern.length,
		          	 parts = [];
				 
				 return function () {
					 for(var r, c, i = 0; i < length; ++i) {
						 c = pattern[i];
						 if(c !== '-' && c !== '4') {
							 r = Math.random() * 16;
							 r = (c === 'R') ? (r & 3 | 8) : (r | ((c === 'M') ? 1 : 0));
							 c = hex[r]; // above floors r so always 0-15
						 }
						 parts[i] = c;
					 }
					 return parts.join('');
				 }()
			 }());
			}
			return (prefix || this._idPrefix);
		},
		mixin : function (target, source) {
			for(var i in source) {
				target[i] = source[i];
			}
			
			return target;
		},
		isObject : function(o) {
	    	return Object.prototype.toString.call(o) === '[object Object]';
	    },
	    isDate : function(o) {
	    	if(!o){
	            return false;
	        }
	        if(typeof TimeShift != "undefined" && o instanceof TimeShift.Date){
	            return true;
	        }else if(Object.prototype.toString.call(o) === '[object Date]'){
	            return true;
	        }
	        return false;
		},
		isArray : function(o) {
			return Object.prototype.toString.call(o) === '[object Array]';
		},
		isNumber : function(o) {
			return Object.prototype.toString.call(o) === '[object Number]';
		},
		isBoolean : function(o) {
			return Object.prototype.toString.call(o) === '[object Boolean]';
		},
		isString : function(o) {
			return Object.prototype.toString.call(o) === '[object String]';
		},
		isFunction : function(o) {
			return Object.prototype.toString.call(o) === '[object Function]';
		},
		isEvent : function(o) {
			return Object.prototype.toString.call(o) === '[object Event]';
		},
		isElement : function(o) {
			return (!!o && (o.nodeName || o instanceof Element));
		},
		isEmpty : function(o) {
			return (o == null || o === '' || o === undefined);
		},
		isDefined : function(o) {
			return typeof o !== 'undefined';
		},
		replaceAll : function(str, searchStr, replaceStr) {
			if(!CUT.isString(str)) return;
			
		    return str.split(searchStr).join(replaceStr);
		}
	};
	
	var docs = {
		createElement : function(tagName){
			return new XML('<'+tagName+'/>');
		},
		createComment : function(text){
			var comment = new XML();
			comment._text = text;
			comment._nodeKind = "comment";
			
			return comment;
		}
	};
	
	
	XML.prototype.removeAndMoveChildsToUpper = function(){
		var parent = this._parent;
		if (!parent) {
    		return;
    	}
		var nk = this._nodeKind;
    	var list;
    	if (nk === jsxml.NodeKind.ATTRIBUTE) {
    		list = parent._attributes;
    	} else {
    		list = parent._children;
    	}
		var index = list.indexOf(this);
        if (index !== -1) {
          list.splice(index, 1);
          this._parent = null;
          var children = this._children ? this._children.slice() : [];
          for(var i = 0; i < children.length; i++){
          	var child = children[i];
          	child.remove();
          	parent.appendChildAt(index++, child);
          }
        }
	};
	
	//bug Fix _parent 참조가 지워져야함
    XML.prototype.remove = function() {
    	if (!this._parent) {
    		return;
    	}
    	var nk = this._nodeKind;
    	var list;
    	if (nk === jsxml.NodeKind.ATTRIBUTE) {
    		list = this._parent._attributes;
    	} else {
    		list = this._parent._children;
    	}
        var index = list.indexOf(this);
        if (index !== -1) {
          list.splice(index, 1);
          this._parent = null;
        }
      };
    
    XML.prototype.appendChildAt = function(index, child, isReplace){
    	var cc = child.constructor;
        if (cc === XML) {
          child._parent = this;
          this._children.splice(index, (isReplace === true ? 1 : 0),child);
        }
        
        return this;
    };
	XML.prototype.getChildElements = function(){
		var result = [];
		for(var i = 0; i < this._children.length; i++){
			if(this._children[i]._nodeKind ==='element'){
				result.push(this._children[i]);
			}
		}
		
		return result;
	};
	
	XML.prototype.getChildElementsWithOutAjax = function(){
		var result = [];
		for(var i = 0; i < this._children.length; i++){
			if(this._children[i]._nodeKind ==='element' && this._children[i].localName() != 'sc-ajax' && this._children[i].localName() != 'sc-code'){
				result.push(this._children[i]);
			}
		}
		
		return result;
	};
	
	XML.prototype.querySelectorAll = function(selector, includeOwner){
		var result = [];
		
		if(!selector.startsWith('.') && !selector.startsWith('#')){
			var finded = this.child(selector); 
			if(finded._list){
				return finded._list;
			}else{
				return [finded];
			}
		}
		
		if(this._nodeKind ==='element'){
			if(includeOwner === true){
				if(selector.startsWith('.')){
					var className = selector.substr(1);
					var classInfo = this.attribute('class');
					if(classInfo && classInfo.getValue && classInfo.getValue().split(' ').indexOf(className) >= 0){
						result.push(this);
					}
				}else if(selector.startsWith('#')){
					var id = selector.substr(1);
					var idInfo = this.attribute('id');
					if(idInfo && idInfo.getValue && idInfo.getValue() === id){
						result.push(this);
					}
				}
			}
			
			if(this._children.length > 0){
				for(var i = 0; i < this._children.length ; i++){
					result = result.concat(arguments.callee.call(this._children[i], selector, true));
				}
			}
			
		}
		
		return result;
	};
	
	XML.prototype.getAttribute = function(attrName){
		var attr = this.attribute(attrName);
		
		if(!attr.getValue){
			return null;
		}else{
			return attr.getValue(attrName);
		}
	};
	
	XML.prototype.removeAttribute = function(attrName){
		var attrs = this._attributes;
		
		for(var i = 0; i < attrs.length; i++){
			if(attrName === attrs[i].localName()){
				attrs.splice(i,1);
				break;
			}
		}
	};
	
	XML.prototype.setAttribute = function(attrName, value){
		var attr = this.attribute(attrName);
		
		if(!attr.getValue){
			var addAttr = new XML();
			addAttr._nodeKind = "attribute";
			addAttr._qname =  QName._format(attrName, value);
			addAttr._text = value;
			this._attributes.push(addAttr);
		}else{
			attr.setValue(value);
		}
	};
	
	XML.prototype.classContains = function(className){
		var attr = this.attribute('class');
		if(attr.getValue){
			var classStr = attr.getValue();
			var classList = classStr.split(' ');
			for(var i = 0; i < classList.length; i++){
				if(classList[i] === className){
					return true;
				}
			}
		}
		
		return false;
	};
	
	XML.prototype.addClass = function(className){
		var attr = this.attribute('class');
		
		if(!attr.getValue){
			this.setAttribute('class', className);
		}else{
			var classStr = attr.getValue();
			var classList = classStr.split(' ');
			
			var isExist = false;
			for(var i = 0; i< classList.length; i++){
				if(classList[i] === className){
					isExist = true;
					break;
				}
			}
			if(isExist === false){
				classStr += (' '+className);
			}
			
			attr.setValue(classStr);
		}
	};
	
	XML.prototype.removeClass = function(className){
		var attr = this.attribute('class');
		
		if(attr.getValue){
			var classStr = attr.getValue();
			if(classStr.startsWith(className+' ')){
				classStr = classStr.replace(className+' ', '');
			}else if(classStr.indexOf(' '+className) >= 0){
				classStr = classStr.replace(' '+className, '');
			}else if(classStr === className){
				this.removeAttribute('class');
				return;
			}
			
			attr.setValue(classStr);
		}
	};
	
	XML.prototype.addStyle = function(styleName, value){
		this.removeStyle(styleName);
		var styleStr = this.getAttribute('style');
		styleStr = styleStr != null ? styleStr : '';
		styleStr +=(styleName + ' : '+value+';');
		this.setAttribute('style', styleStr);
	};
	
	XML.prototype.getStyle = function(styleName){
		var styleStr = this.getAttribute('style');
		if(styleStr != null){
			var styles = styleStr.split(';');
			for(var i = 0; i < styles.length; i++){
				var style = styles[i];
				var keyValue = style.split(':');
				if(style.trim() !== '' && keyValue.length === 2 && (keyValue[0].trim() === styleName)){
					return keyValue[1].trim();
				}
			}
		}
		return null;
	};
	
	XML.prototype.removeStyle = function(styleName){
		var styleStr = this.getAttribute('style');
		if(styleStr != null){
			var styles = styleStr.split(';');
			for(var i = 0; i < styles.length; i++){
				var style = styles[i];
				var keyValue = style.split(':');
				if(style.trim() !== '' && keyValue.length === 2 && (keyValue[0].trim() === styleName)){
					styles.splice(i, 1);
					break;
				}
			}
			styleStr = styles.join(';');
			
			if(styleStr.trim() === ''){
				this.removeAttribute('style');
			}else{
				this.setAttribute('style', styleStr);
			}
			
		}
	};
	
	var xml, 			// xml parsing
		actionScript,	// actionScript		
		htmlText, 		// tag convert
		scriptText,		// script convert
		resultText,		// template result
		output,			// beautify html
		isComponent = false,
		type = type || 'all';
	var link = "";		// link
	var link2 = "";		// link

	String.prototype.startsWith = function(str) {
       return (this.indexOf(str) === 0);
    };
	
	String.prototype.endsWith = function(word){
		
		return this.substring( this.length - word.length, this.length ) === word;
	};
	
	String.prototype.replaceAll = function(searchStr, replaceStr){
		return this.split(searchStr).join(replaceStr);
	};
	
	function clone(obj) {
		  if (obj === null || typeof(obj) !== 'object')
		  return obj;
		  var copy = obj.constructor();
		  for (var attr in obj) {
		    if (obj.hasOwnProperty(attr)) {
		      copy[attr] = obj[attr];
		    }
		  }
		  return copy;
	}
	
		
	/**
	 * convert 대상 component 정의
	 * - container 계열 : 삭제대상을 none으로 지정. 해당 컴포넌트를 삭제하고 하위 컴포넌트를 상위 컴포넌트로 이관.
	 * - control 계열 : 삭제대상을 remove로 지정. 해당 컴포넌트는 주석으로 처리.
	 * - property : 삭제대상을 remove로 지정. 추가대상은 addProperties에 추가.
	 * - 특이사항(extraAttributeFunc) : <vc:SCTD label=""/>의 경우 smartsutie9 에서는 <th><sc-label></sc-label><th> 형태로 변환.  
	 *   GRID의 체크 및 선택 용도로 사용되는 체크박스컬럼이나 라디오컬럼은 smartsuite9에서는 selection컬럼이 제공되므로 삭제. 
	 */
	var tobe = {
		"Style" : "remove",
		
		"transitions" : "remove",
		
		"Transition" : "remove",
		
		"Sequence" : "remove",
		
		"Resize" : "remove",
		
		"Move" : "remove",
		
		"Iris" : "remove",
		
		"Canvas" : "remove",
		
		"SCHTMLViewer" : "remove",
		
		"CCHTMLViewer" : "remove",
		
		"Metadata": "remove",
		"styleFunction" : "remove",
		
		"filterFunction" : "remove",
		// container
		// none
		"SCDataGridBox": "none",
		"SCDividedBox" : {
			__name: "div",
			addProperties: {
				"class": "vbox"
			},
			id: "id"
		},
		"SCHDividedBox": {
			__name: "div",
			addProperties: {
				"class": "hbox"
			},
			id: "id"
		},
		"SCVDividedBox": {
			__name: "div",
			addProperties: {
				"class": "vbox"
			},
			id: "id"
		},
		"SCForm"       : {
			__name: "div",
			addProperties: {
				"class": "vbox"
			}
		},

		"SetProperty"       : "remove",
		"template" : {
			__name: "template",
		},

		"CCModulePopup" : {
			__name: "div",
			showEffect:"remove",
			hideEffect:"remove",
			url:"remove"
		},

		"customElement" : {
			initialize: "remove",
			verticalScrollPolicy: "remove",
			horizontalScrollPolicy: "remove",
			horizontalAlign: "remove",
			borderStyle: "remove",
			showEffect: "remove",
			hideEffect: "remove",
			url:  "remove",
		},
		
		"SCModule": {
			
			init: function(element, to_element){
				element.removeAndMoveChildsToUpper();
			},
			__name: "remove",
			// remove property
			menuCode: "remove",
			creationComplete: "remove",
			initialize: "remove",
			
		
			verticalScrollPolicy: "remove",
			horizontalScrollPolicy: "remove",
			layout: "remove",
			close: "remove",
			currentState: "remove"
		},
		/*"SCModule" : "remove",*/
		
		
		"CCEditor": {
			__name: "sc-editor",
			editorType: "remove",
			horizontalScrollPolicy: "remove"
		},
		"CCContentBase": {
			init: function(element, to_element){
				element.removeAndMoveChildsToUpper();
			},
			__name: "remove",
			// remove property
			menuCode: "remove",
			creationComplete: "remove",
			initialize: "remove",
			
		
			verticalScrollPolicy: "remove",
			horizontalScrollPolicy: "remove",
			horizontalAlign: "remove"
		},
		
		"SCTitleWindow": {
			init: function(element, to_element){
				element.removeAndMoveChildsToUpper();
			},
			__name: "remove",
			// remove property
			menuCode: "remove",
			creationComplete: "remove",
			initialize: "remove",
			
		
			verticalScrollPolicy: "remove",
			horizontalScrollPolicy: "remove",
			horizontalAlign: "remove"
		},
		
		"EPBase": {
			init: function(element, to_element){
				element.removeAndMoveChildsToUpper();
			},
			__name: "remove",
			// remove property
			menuCode: "remove",
			creationComplete: "remove",
			initialize: "remove",
			
		
			verticalScrollPolicy: "remove",
			horizontalScrollPolicy: "remove",
			layout: "remove",
		},
		
		"ViewStack": {
			__name: "sc-pages",
			extraChildsFunc: function(element, to_element, children) {
				templateGenerateFunction(element, to_element, children);
			},
			addProperties: {
				"selected" : "0",
				"class" : "fit"
			},
			id: "id",
			// remove
			creationPolicy: "remove",
			initialize: "remove",
			
		
		},
		"Sequence": "remove",
		
		"VBox": {
			__name: "div",
			addProperties: {
				"class": "vbox"
			},
			showEffect: "remove",
			hideEffect: "remove",
			// remove property
			
		
		},    					
		"SCBox": {
			__name: "div",
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			// remove property
			styleName: "remove",
			
		
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove",
			paddingTop: "remove",
			paddingBottom: "remove",
			paddingLeft: "remove",
			paddingRight: "remove",
			verticalScrollPolicy: "remove",
			horizontalScrollPolicy: "remove",
			showEffect: "remove",
			hideEffect: "remove",
		},
		"HBox": {
			__name: "div",
			addProperties: {
				"class": "hbox"
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			// remove property
			styleName: "remove",
			
		
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove",
			verticalScrollPolicy: "remove",
			horizontalScrollPolicy: "remove",
		},
		"SCHBox": {
			__name: "div",
			addProperties: {
				"class": "hbox"
			},
			showEffect: "remove",
			hideEffect: "remove",
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			// remove property
			styleName: "remove",
			
		
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove",
			verticalScrollPolicy: "remove",
			horizontalScrollPolicy: "remove",
		},
		"SCVBox": {
			__name: "div",
			addProperties: {
				"class": "vbox"
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			// remove property
			styleName: "remove",
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove",
			verticalScrollPolicy: "remove",
			horizontalScrollPolicy: "remove",
			horizontalAlign: "remove",
			showEffect: "remove",
			hideEffect: "remove"
		},
		"SCContentBox": {
			addProperties: {
			},
			init: function(element, to_element){
				if(element._parent == null){
					element.setName("remove");
					element.__converted = true;
				}else{
					element.setName("div");
					element.__converted = true;
				}
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			// remove property
			styleName: "remove",
			
		
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove",
			verticalScrollPolicy: "remove",
			horizontalScrollPolicy: "remove",
			creationComplete: "remove",
			initialize: "remove",
			creationPolicy: "remove"
		},    					
		"SCFHBody": {
			__name: "div",
			addProperties: {
				"class": "hbox flex"
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			// remove property
			styleName: "remove",
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove",
			verticalScrollPolicy: "remove",
			horizontalScrollPolicy: "remove",
		},
		"SCFVBody": {
			__name: "div",
			addProperties: {
				"class": "vbox flex"
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			// remove property
			styleName: "remove",
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove",
			verticalScrollPolicy: "remove",
			horizontalScrollPolicy: "remove",
		},
		/*"SCFVBody": {
			__name: "div",
			addProperties: {
				"class": "page"
			},
			id: "id",
			extraContainerFunc: function(element, to_element) {				
				return;
				var children = element.children();		
				children.each(function(item, idx) {
					if(item.name && item.name() && item.name().indexOf("SCTable") > -1) {
						var styleName = item.attribute("styleName");
						if(styleName.getValue && styleName.getValue() === "searchTable"){
							var ccSearchContanier = new XML("<cc-search-container></cc-search-container>");
							element.setName("cc-search-container");
							element._attributes = [];
							var addAttr = new XML();
							addAttr._nodeKind = "attribute";
							addAttr._qname = QName._format("on-search", "onSearch");
							addAttr._text = "onSearch";
							
							element._attributes.push(addAttr);
						}
					}
				});

			},
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			// remove property
			styleName: "remove",
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove",
			verticalScrollPolicy: "remove",
			horizontalScrollPolicy: "remove",
		},*/
		"SCFHead": {
			__name: "sc-toolbar",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			// remove property
			styleName: "remove",
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove",
			click: "remove",
		},
		    					
		"SCCollapseContainer": {
			__name: "sc-panel",
			addProperties: {
				collapsible : "true"
			},
/*			extraContainerFunc: function(element, to_element) {			
				return;
				var children = element.children();					
				if(children && children.name && children.name().indexOf("SCTable") > -1) {
					var styleName = children.attribute("styleName");
					if(styleName.getValue() === "searchTable"){
						element.setName("cc-search-container");
					}
				}

			},*/
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			// remove property
			styleName: "remove",
			
		
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove",
			
			opened: "!collapsed",
			label: "titleText"
		},
		
		"SCTable": {
			__name: "table",
			/*addProperties: {
				"class": "tb-form"
			},*/
			extraTableFunc: function(element, to_element) {				

				var children = element.children();					
				if(children) {
					var compare= 0;
					children.each(function(item, idx) {
						var length = item.children().length();
						compare = compare > length ? compare : length ;
					});
					var col = '<colgroup>';
					for(var i=0; i<Math.floor(compare/2); i++) {
						col +='<col style="width:100px"/>';
						col +='<col/>';
					}
					col += '</colgroup>';
					
					element.prependChild(new XML(col));
				}
				/*var styleName = element.attribute("styleName");
				var tempContanier = new XML("cc-search-container");
				if(styleName === "searchTable"){
					var elementClone = clone(element); 
					tempContanier.appendChild(elementClone);
					element = tempContanier;
				}*/
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			// remove property
			styleName: "class",
			customValues :{
				styleName: {
					"formTable" : "tb-form"
				}
			},
			
		
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove",
			verticalGap: "remove",
		},
		"SCTR": {
			init: function(element, to_element){
				if(element.getAttribute("height") == 0){
					convertElementToComment(element);
				}
			},
			__name: "tr",
			addProperties: {
				
			},
			customValues :{
				visible: {
					"hidden" : "true",
					"0" : "false",
					"1" : "true",
				},
				editable :{
					"disabled" : "false",
					"abled" : "true",
					"0" : "false",
					"1" : "true",
				}

			},
			id: "id",
			visible: "visible",
			enabled: "!disabled",				
			readOnly: "!editable",
			editable: "editable",
			// remove property
			styleName: "remove",
			/**/
			/*height: "remove",*/
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove",
			showEffect: "remove",
			hideEffect: "remove",
			
			rowSpan: "rowspan"
		},
		"SCTD": {
			__name: "td",
			width : "remove",
			height : "remove",
			addProperties: {
				
			},
			label: "remove",
			extraChildsFunc: function(element, to_element, children) {
				if(children.length > 1){
					
					if(children.length === 3 
						&& children[0].localName() == 'sc-date-field' && children[2].localName() == 'sc-date-field'
						&& children[1].localName() == 'sc-label' && children[1].getAttribute("text") == '~'){
						
						
						configurateBindingValue(children[0]);
						
						configurateBindingValue(children[2]);
						var fromEl = children[0];
						var fromValue = children[0].getAttribute("value");
						var toValue = children[2].getAttribute("value");
						var periodEl = docs.createElement('sc-period-date-field');
						if(fromValue != null){
							periodEl.setAttribute("from-value",fromValue);
						}
						if(toValue){
							periodEl.setAttribute("to-value", toValue);
						}
						
						var setIfExists = ["required", "editable", "disabled", "readonly"];
						for(var i = 0; i < setIfExists.length; i++){
							if(fromEl.getAttribute(setIfExists[i])){
								periodEl.setAttribute(setIfExists[i], fromEl.getAttribute(setIfExists[i]));
							}
						}
						
						
						convertElementToComment(children[0]);
						convertElementToComment(children[1]);
						convertElementToComment(children[2]);
						
						element.appendChild(periodEl);
						
					}else if(children.length >= 2 
						&& children[0].localName() == 'sc-text-field' 
						&& children[1].localName() == 'sc-button' && children[1].getAttribute('text') == null && children[1].getAttribute('on-click') != null){
						var textField = children[0];
						var scButton = children[1];
						scButton.remove();
						textField.setAttribute('on-click', scButton.getAttribute('on-click'));
						textField.setAttribute('trigger-cls', "search");
					}else{
						var fieldContainer = docs.createElement('div');
						fieldContainer.addClass("field-box");
						for(var i =0;i < children.length; i++){
							var item = children[i];
							item.remove();
							fieldContainer.appendChild(item);
						}
						element.appendChild(fieldContainer);
					}
				}
			},
			extraAttributeFunc: function(element, to_element, attr) {
				if(attr.localName() == 'label'){
					var convetString = "<sc-label text=\"" + attr.getValue() + "\"></sc-label>";
					var add = new XML(convetString);											
					element.appendChild(add);
					to_element["__name"] = "th";																							
				}
			},
			init: function(element, to_element) {
				this["__name"] = "td";
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			// remove property
			styleName: "remove",
			
		
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove",
			horizontalScrollPolicy: "remove",
			
			colSpan: "colspan",
			rowSpan: "rowspan"
		},
		
		"SCTabNavigator": {
			__name: "sc-tab-navigation",
			addProperties: {
				
			},
			extraChildsFunc: function(element, to_element, children) {
				
				for(var i =0; i < children.length; i++){
					var child = children[i],
						label = child.getAttribute("label");
					if(label){
						child.removeAttribute("label");
						child.setAttribute("title-text",label);
					}
				}
				
				templateGenerateFunction(element, to_element, children);
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			// remove property
			styleName: "remove",
			
		
			includeInLayout: "remove",
			tabIndex: "remove",
			borderStyle: "remove"
		},
		
		
		// control
		
		// remove
		"Array": "remove",
		"states": {
			__name:"sc-pages",
			extraChildsFunc: function(element, to_element, children) {
				templateGenerateFunction(element, to_element, children);
			},
			addProperties: {
				"selected" : "0",
				"class" : "fit"
			}	
		},
		"State": {
			init: function(element, to_element){
				element.removeAndMoveChildsToUpper();
			},
			__name:"remove"
		},
		"AddChild": {
			__name:"div",
			init: function(element, to_element){
			},
		},
		"HRule": "remove",		
		"VRule": "remove",
		
		"SCMutipleTextInput": "remove",    					
		"SCPopUpButton"     : "remove",
		
		
		"SCLock": "remove",
		"SCDateValidator": "remove",
		"SCValidatorGroup": "remove",
		"validators": "remove",
		
		"NumberFormatter": "remove",
		
		"CCCodeInformation": "remove",
		"CCCodeSupporter": "remove",
		"CCPopupListener": "remove",
		
		"SCServiceBinder": {
			__name: "sc-ajax",
			id: "id",	
			serviceid: "url",
			result: "on-response",
			// remove property	
			descriptor: "remove",
			monitors: "remove",
			locks: "remove"
		},
		"SCServiceProvider": {
			__name: "sc-ajax",
			id: "id",	
			serviceId: "url",
			result: "last-response",
			fault: "on-error",
			// remove property	
			descriptor: "remove",
			monitors: "remove",
			locks: "remove"
		},
		"ArrayCollection": "remove",
		"Object": "remove",
		"SCServiceInput": "remove",
		"SCServiceOutput": "remove",
		"inputs": "remove",
		"outputs": "remove",
		"result": "remove",
		"SCServiceGroup": {
			__name: "sc-code-group",
			id: "remove",
			result: "remove"
		},
		"SCCodeProvider": {
			__name: "sc-code",
			code: "code",
			target: "value"
		},
		
		"SCSpacer": {
			__name: "sc-spacer",
			addProperties: {
				
			},
			visible: "!hidden",
			// remove property
			styleName: "remove",
			
		
		},
		"Spacer": {
			__name: "sc-spacer",
			addProperties: {
				
			},
			visible: "!hidden",
			// remove property
			styleName: "remove",
			
		
		},
		"SCButton": {
			__name: "sc-button",
			customValues :{
				visible: {
					"hidden" : "true",
					"0" : "false",
					"1" : "true",
				},
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",				
			// remove property
			styleName: "remove",
			
		
			includeInLayout: "remove",
			tabIndex: "remove",
			name: "remove",
			buttonMode: "remove",
			toolTip: "remove",
			
			label: "text",
			click: "on-click",
		},
		"SCButtonBar": {
			__name: "sc-toolbar",
		},
		"SCButtonProperty": {
			__name: "sc-button",
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			toolTip: "remove",
			
			name: "text",
			click: "on-click",
			
		},
		"SCCheckBox": {
			__name: "sc-checkbox-field",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			
			
			label: "label",
			value: "input-value",
			onValue: "checked-value",
			offValue: "un-checked-value",
			click: "on-change",
			change: "on-change"
		},
		"SCGroupCheckBox": {
			__name: "sc-checkbox-group-field",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			
			dataProvider: "items",
			change: "on-change"
		},
		"SCRadioButton": {
			__name: "sc-radio-field",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			
			label: "label",
			value: "value",
			click: "on-change"
		},
		"SCGroupRadioButton": {
			__name: "sc-radio-group-field",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			
			dataProvider: "items",
			change: "on-change"
		},
		
		"SCNumericStepper" : {
			__name : 'sc-number-field',
			id: "id",
			minimum : "min-value",
			maximum : "max-value",
			bindingField: "value" 
		},
		"SCComboBox": {
			__name: 'sc-combobox-field',
			addProperties: {
			},
			requiredProperties: {
				"display-field" : "label",
				"value-field" : "data"
			},
			extraAttributeFunc: function(element, to_element, attr) {
				if(attr.localName() == 'includeDefault'){
					if(attr.getValue() === 'true'){
						var placeHolder = element.attribute("defaultLabel");
						if(!placeHolder._text){
							var addAttr = new XML();
							addAttr._nodeKind = "attribute";
							addAttr._qname = QName._format("placeholder", "전체");
							addAttr._text = "전체";
							
							element._attributes.push(addAttr);
						}
					}
					
				}
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			defaultValue: "remove",
			includeDefault: "remove",
			valueCommit: "remove",
			minWidth: "remove",
			
			dataProvider: "items",
			defaultLabel: "placeholder",
			rowCount: "visible-item-size",
			dataField: "value-field",
			labelField: "display-field",
			change: "on-change",
			defaultIndex: "selected-index",
			
		},
		"SCCodeComboBox": {
			__name: 'sc-combobox-field',
			addProperties: {
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			defaultValue: "remove",
			includeDefault: "remove",
			valueCommit: "remove",
			minWidth: "remove",
			
			dataProvider: "items",
			defaultLabel: "placeholder",
			rowCount: "visible-item-size",
			dataField: "value-field",
			labelField: "display-field",
			change: "on-change",
			defaultIndex: "selected-index",
			
		},
		"CCOrgComboBox": {
			__name: "cc-operorg-multi-combobox-field",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			defaultValue: "remove",
			includeDefault: "remove",
			valueCommit: "remove",
			minWidth: "remove",
			isMultiple: "remove",
			
			dataProvider: "items",
			defaultLabel: "placeholder",
			dataField: "value-field",
			labelField: "display-field",
			change: "on-change",
			defaultIndex: "selected-index",
			enabledCheckAll: "enable-check-all",
			selectedAll: "selected-all",
			operUnitCd: "oper-unit-cd"
		},
		"SCMultipleComboBox": {
			__name: 'sc-multi-combobox-field',
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			defaultValue: "remove",
			includeDefault: "remove",
			valueCommit: "remove",
			minWidth: "remove",
			isMultiple: "remove",
			
			dataProvider: "items",
			defaultLabel: "placeholder",
			rowCount: "visible-item-size",
			dataField: "value-field",
			labelField: "display-field",
			change: "on-change",
			defaultIndex: "selected-index",
			enabledCheckAll: "enable-check-all",
			selectedAll: "selected-all",
			
		},
		
		"SCDateChooser": {
			__name: "sc-date-chooser",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
		},
		"SCDateField": {
			__name: "sc-date-field",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			creationComplete: "remove",
			textAlign: "remove",
			
			change: "on-change",
			formatString: "format"
		},    					
		"SCPeriodDateField": {
			__name: "sc-period-date-field",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			
			formatString: "format"
		},
		"SCMonthField": {
			__name: "sc-month-field",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			
		},
		"SCFileUpDownLoader": {
			__name: "sc-upload",
			addProperties: {
				"class": "h-200"
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			
			enabledUploadCompleteAlert: "remove",
			creationComplete: "remove",
			uploadComplete: "remove",			
			updateComplete: "remove",
			fileFilterLabels: "remove",
			fileFilterStrings: "remove",
			
			sharedGroup: "value",
		},
		"CCFileUpDownLoader": {
			__name: "sc-upload",
			addProperties: {
				"class": "h-200"
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			
			enabledUploadCompleteAlert: "remove",
			creationComplete: "remove",
			uploadComplete: "remove",
			updateComplete: "remove",
			fileFilterLabels: "remove",
			fileFilterStrings: "remove",
			
			sharedGroup: "value",
		},
		
		"SCImage": {
			__name: "img",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			click: "remove",
			
			src: "src",
			source: "src"
		},
		"SCLabel": {
			__name: "sc-label",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "text",
			
			textAlign: "remove",
			toolTip: "remove",
			
			text: "text"
		},
		"SCBulletLabel": {
			__name: "sc-label",
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "text",
			
			textAlign: "remove",
			toolTip: "remove",
			
			text: "text"
		},
		"SCText": {
			__name: "sc-label",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "text",
			textAlign: "remove",
			
			text: "text"
		},
		
		"Text": {
			__name: "sc-label",
			addProperties: {
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "text",
			textAlign: "remove",
			
			
			text: "text"
		},
		
		"SCTextArea": {
			__name: "sc-textarea-field",
			addProperties: {
				"class": "h-100"
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			text: "value",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			
			textAlign: "remove",
			
			maxChars: "max-length",
		},
		"SCTextInput": {
			__name:'sc-text-field',
			addProperties: {
				
			},
			extraAttributeFunc: function(element, to_element, attr) {
				if(attr.localName() == 'restrict'){
					attr.setValue('/['+attr.getValue()+']/');
				}
				
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			text: "value",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			upper: "remove",
			textAlign: "remove",
			imeMode: "remove",
			
			dragEnter: "remove",
			dragDrop: "remove",
			
			maxChars: "max-length",
			restrict: "mask-re",
			formatType: "format-type",
			enter: "on-enter",
			change: "on-change",
			focusOut: "on-blur",
		},
		"SCMaskedTextInput" : {
			__name:'sc-text-field',
			addProperties: {
				"show-mask": "true"
			},
			extraAttributeFunc: function(element, to_element, attr) {
				if(attr.localName() == 'restrict'){
					attr.setValue('/['+attr.getValue()+']/');
				}
				
				
			},
			id: "id",
			visible: "!hidden",
			enabled: "!disabled",				
			readOnly: "editable",
			editable: "editable",
			required: "required",
			// remove property
			styleName: "remove",
		
		
			includeInLayout: "remove",
			tabIndex: "remove",
			bindingField: "value",
			upper: "remove",
			textAlign: "remove",
			imeMode: "remove",
			
			dragEnter: "remove",
			dragDrop: "remove",
			
			maxChars: "max-length",
			restrict: "mask-re",
			formatType: "format-type",
			enter: "on-enter",
			change: "on-change",
			focusOut: "on-blur",
			inputMask: "input-mask"
		},
		
		//gird
		"SCDataGrid": {
			__name: "sc-grid",
			addProperties: {
				"use-selection": "true",
				"selection-mode": "check",
				"use-state": "true",
			},
			
			visible : "!hidden",
			editable : "editable",
			id: "id",
			dataProvider: "data-provider",
			editable: "editable",
			lockedColumnCount: "locked-column-count",
			lockedRowCount :"locked-row-count",
			itemClick: "on-item-click",
			itemEditEnd: "on-item-edit-end",
			itemEditBegin: "on-item-edit-begin",
			itemDoubleClick: "on-item-double-click",
			aggregateGroupColumns: "aggregate-group-columns",
			aggregateTitle: "aggregate-title",
			//remove
			aggregate: "remove",
		
		
			sortExpertMode: "remove",
			horizontalScrollPolicy: "remove",
			useCopyAndPaste: "remove",
			useCustomSelector: "remove",
			focusEnabled: "remove",
			dragEnabled: "remove",
			dragDrop: "remove",
			dragComplete: "remove",
			dragMoveEnabled: "remove",
			draggableColumns: "remove",
			allowDragSelection: "remove",
			dropEnabled: "remove",
			allowMultipleSelection: "remove",
			dataTipFunction: "remove",
			displayItemsExpanded: "remove",
			valueCommit: "remove",
			verticalScrollPolicy: "remove",
			doubleClickEnabled: "remove",
			copyAndPasteForExl: "remove",
			mergeNextColunm: "remove",
			mergeGroupWithPreviousColumn: "remove"
		},
		"columns": {
			__name: "sc-grid-columns"
		},
		"groupedColumns": {
			__name: "sc-grid-columns"
		},
		"SCDataGridColumnGroup": {
			__name: "sc-group-column",
			headerText: "header-text",
			// remove
			id: "remove",
		},
		"SCDataGridColumn": {
			__name: "sc-data-column",
			dataField: "data-field",
			headerText: "header-text",
			width: "width",
			textAlign: "text-align",
			editable: "editable",
			visible: "visible",
			required: "required",
			sortable: "sortable",
			formatType: "format-type",
			styleName: "style-name",
			aggregateKind: "aggregate-kind",
			mergeable: "mergeable",
			useMultiLine: "use-multi-line",
			itemEditableFunction: "item-editable-function",
			labelFunction: "item-label-function",
			styleFunction: "item-style-function",
			// remove
			id: "remove",
			imeMode: "remove",
			readonly: "remove",
			sortCompareFunction: "remove",
			extraAttributeFunc: function(element, to_element, attr) {
				editorPropertiesResolveFunction.call(this, element, to_element, attr);
				if(attr.localName() == 'styleName' && attr.getValue() == 'linkColumn'){
					attr.setValue('link');
				}
			},
			maxChars: "max-length",
			restrict: "mask-re",
			//editorProperties: "remove",
			formatProperties: "remove",
			showDataTips: "remove",
			useCustomSelector: "remove",
			headerWordWrap :"remove"
		},
		"SCCheckBoxColumn": {
			__name: "sc-checkbox-column",
			extraAttributeFunc: function(element, to_element, attr) {
				if(attr.localName() == 'dataField'){
					if(attr.getValue() === 'check_select' || attr.getValue() === 'check_delete') {
						element.remove();
						return;
					}																							
				}
				
				if(attr.localName() == 'styleName' && attr.getValue() == 'linkColumn'){
					attr.setValue('link');
				}
			},
			dataField: "data-field",
			headerText: "header-text",
			width: "width",
			textAlign: "text-align",
			editable: "editable",
			visible: "visible",
			required: "required",
			sortable: "sortable",
			formatType: "format-type",
			styleName: "style-name",
			aggregateKind: "aggregate-kind",
			mergeable: "mergeable",
			useMultiLine: "use-multi-line",
			itemEditableFunction: "item-editable-function",
			labelFunction: "item-label-function",
			styleFunction: "item-style-function",
			displayCheckBox: "display-checkbox",
			onValue:"check-value",
			offValue:"un-checked-value",
			// remove
			id: "remove",
			imeMode: "remove",
			readonly: "remove",
			sortCompareFunction: "remove",
			extraAttributeFunc: function(element, to_element, attr) {
				editorPropertiesResolveFunction.call(this, element, to_element, attr);
			},
			maxChars: "max-length",
			restrict: "mask-re",
			//editorProperties: "remove",
			formatProperties: "remove",
			enabledCheckAll: "remove",
			showDataTips: "remove",
			useCustomSelector: "remove",
			headerWordWrap :"remove"
		},
		"SCRadioButtonColumn": {
			__name: "sc-checkbox-column",
			extraAttributeFunc: function(element, to_element, attr) {
				if(attr.localName() == 'dataField'){
					if(attr.getValue() === 'check' || attr.getValue() === 'check_select' || attr.getValue() === 'check_delete') {
						element.remove();
						return;
					}																							
				}
				
				
				if(attr.localName() == 'styleName' && attr.getValue() == 'linkColumn'){
					attr.setValue('link');
				}
			},
			dataField: "data-field",
			headerText: "header-text",
			width: "width",
			textAlign: "text-align",
			editable: "editable",
			visible: "visible",
			required: "required",
			sortable: "sortable",
			formatType: "format-type",
			styleName: "style-name",
			aggregateKind: "aggregate-kind",
			mergeable: "mergeable",
			useMultiLine: "use-multi-line",
			itemEditableFunction: "item-editable-function",
			labelFunction: "item-label-function",
			styleFunction: "item-style-function",
			displayCheckBox: "display-checkbox",
			onValue:"check-value",
			offValue:"un-checked-value",
			// remove
			id: "remove",
			imeMode: "remove",
			readonly: "remove",
			sortCompareFunction: "remove",
			extraAttributeFunc: function(element, to_element, attr) {
				editorPropertiesResolveFunction.call(this, element, to_element, attr);
				if(attr.localName() == 'styleName' && attr.getValue() == 'linkColumn'){
					attr.setValue('link');
				}
			},
			maxChars: "max-length",
			restrict: "mask-re",
			//editorProperties: "remove",
			formatProperties: "remove",
			enabledCheckAll: "remove",
			showDataTips: "remove",
			useCustomSelector: "remove",
			headerWordWrap :"remove"
		},
		"SCDateFieldColumn": {
			__name: "sc-date-column",
			dataField: "data-field",
			headerText: "header-text",
			width: "width",
			textAlign: "text-align",
			editable: "editable",
			visible: "visible",
			required: "required",
			sortable: "sortable",
			formatType: "format-type",
			styleName: "style-name",
			aggregateKind: "aggregate-kind",
			mergeable: "mergeable",
			useMultiLine: "use-multi-line",
			itemEditableFunction: "item-editable-function",
			labelFunction: "item-label-function",
			styleFunction: "item-style-function",
			// remove
			id: "remove",
			imeMode: "remove",
			readonly: "remove",
			sortCompareFunction: "remove",
			extraAttributeFunc: function(element, to_element, attr) {
				editorPropertiesResolveFunction.call(this, element, to_element, attr);
				if(attr.localName() == 'styleName' && attr.getValue() == 'linkColumn'){
					attr.setValue('link');
				}
			},
			maxChars: "max-length",
			restrict: "mask-re",
			//editorProperties: "remove",
			formatProperties: "remove",
			showDataTips: "remove",
			useCustomSelector: "remove",
			headerWordWrap :"remove"
		},
		"SCComboBoxColumn": {
			__name: "sc-combobox-column",
			dataField: "data-field",
			headerText: "header-text",
			width: "width",
			textAlign: "text-align",
			editable: "editable",
			visible: "visible",
			required: "required",
			sortable: "sortable",
			formatType: "format-type",
			styleName: "style-name",
			aggregateKind: "aggregate-kind",
			mergeable: "mergeable",
			useMultiLine: "remove",
			itemEditableFunction: "item-editable-function",
			labelFunction: "item-label-function",
			styleFunction: "item-style-function",
			dataProvider: "items",
			comboDataField: "value-field",
			comboLabelField: "display-field",
			defaultLabel: "placeholder",
			// remove
			id: "remove",
			imeMode: "remove",
			readonly: "remove",
			sortCompareFunction: "remove",
			extraAttributeFunc: function(element, to_element, attr) {
				editorPropertiesResolveFunction.call(this, element, to_element, attr);
				if(attr.localName() == 'styleName' && attr.getValue() == 'linkColumn'){
					attr.setValue('link');
				}
			},
			maxChars: "max-length",
			restrict: "mask-re",
			//editorProperties: "remove",
			formatProperties: "remove",
			showDataTips: "remove",
			includeDefault: "remove",			
			defaultValue: "remove",
			useCustomSelector: "remove",
			headerWordWrap :"remove"
		},
		"SCImageColumn": {
			__name: "sc-image-column",
			dataField: "data-field",
			headerText: "header-text",
			width: "width",
			textAlign: "text-align",
			editable: "editable",
			visible: "visible",
			required: "required",
			sortable: "remove",
			formatType: "format-type",
			styleName: "style-name",
			aggregateKind: "aggregate-kind",
			mergeable: "mergeable",
			useMultiLine: "remove",
			itemEditableFunction: "item-editable-function",
			labelFunction: "item-label-function",
			styleFunction: "item-style-function",
			singularSource: "singular-source",
			// remove
			id: "remove",
			imeMode: "remove",
			readonly: "remove",
			sortCompareFunction: "remove",
			extraAttributeFunc: function(element, to_element, attr) {
				editorPropertiesResolveFunction.call(this, element, to_element, attr);
				if(attr.localName() == 'styleName' && attr.getValue() == 'linkColumn'){
					attr.setValue('link');
				}
			},
			maxChars: "max-length",
			restrict: "mask-re",
			//editorProperties: "remove",
			formatProperties: "remove",
			showDataTips: "remove",
			useCustomSelector: "remove",
			headerWordWrap :"remove"
		},
		"CCAttachmentColumn": {
			__name: "sc-attachment-column",
			dataField: "data-field",
			headerText: "header-text",
			width: "width",
			textAlign: "text-align",
			editable: "editable",
			visible: "visible",
			required: "required",
			sortable: "sortable",
			formatType: "remove",
			styleName: "remove",
			aggregateKind: "aggregate-kind",
			mergeable: "mergeable",
			useMultiLine: "use-multi-line",
			itemEditableFunction: "item-editable-function",
			labelFunction: "item-label-function",
			styleFunction: "item-style-function",
			sharedGroupField: "shared-group-field",
			// remove
			id: "remove",
			imeMode: "remove",
			readonly: "remove",
			sortCompareFunction: "remove",
			extraAttributeFunc: function(element, to_element, attr) {
				editorPropertiesResolveFunction.call(this, element, to_element, attr);
				if(attr.localName() == 'styleName' && attr.getValue() == 'linkColumn'){
					attr.setValue('link');
				}
			},
			maxChars: "max-length",
			restrict: "mask-re",
			//editorProperties: "remove",
			formatProperties: "remove",
			showDataTips: "remove",
			useCustomSelector: "remove",
			headerWordWrap :"remove"
		},
		"SCStatusColumn": "remove",
		"SCDataGridDumyColumn": "remove",
		"itemRenderer": "remove",
		"itemClick" : "remove",
		"itemEditEnd" : "remove",
		"itemEditableFunction" : "remove",
		"rowColorFunction" : "remove",
		
	};
	
	var isApplyOverride = false;
	try{
		isApplyOverride = eval("APPLY_SOURCE_CONVERT_OVERRIDE");
	}catch(e){}
	
	if(isApplyOverride){
		try{
			var tobeOv = eval("tobeOverride");
			if(CUT.isObject(tobeOv)){
				for(var key in tobeOv){
					tobe[key] = tobeOv[key];
				}
			}
		}catch(e){}
	}
	

	var packageUrls = {};
	
	/**
	 * mxml to html
	 * 컴포넌트를 탐색하며 정의된 element로 변환 한다. 
	 */
	var appendTempate = function(xml){
		var tamplate = new XML("<template></template>");
		tamplate.appendChild(xml);
		return tamplate;
		
	};
	
	var removeComment = function(element) {
		//최상위 element인 경우
		if(element.parent())
		var children = element.children();
		if(element.nodeKind() == 'comment') {
			element._nodeKind = "text";
		}
		if(children) {
			children.each(function(item, idx) {
				item = removeComment(item);							
			});							
		}
	};
	
	var convertElementToComment = function(element){
		removeComment(element);
		element._text = element.toXMLString();
		element._nodeKind = "comment";
	};
	
	var mxmltohtml = function(xml){
		if(xml.__converted == true){
			return;
		}
		var element = xml;		
		
		// namespace 삭제
		var namespaces = element._namespaces;
		var length = namespaces.length;
		if(namespaces) {
			for(var i=0; i<length; i++) {
				packageUrls[namespaces[i].prefix] = namespaces[i].uri.split(".").join("/").replace("*", "");
			}
			for(var i=0; i<length; i++) {
				element.removeNamespace(namespaces[0]);
			}
		}
		
		var kind = element.nodeKind();
		var component = element.localName();
		
		if(kind === "element") {
			
			if(component == "Script") {
				// source의 script 부분은 따로 converting 하며, main 컴포넌트 내에서 삭제 한다.
				actionScript = element.getValue();
				element.remove();
				return;
				
			}
			
			if(element.children() && element.children()._useCDATA){
				element.children()._useCDATA = false;
				convertElementToComment(element);
				return;
			}
					
			var to_element = tobe[component];						
			
			if(to_element == "none") {
				// 해당 컴포넌트(layout)를 삭제하고 하위 컴포넌트를 상위컴포넌트로 이관한다.
				var parentElement = element._parent;
				var childElement  = element.children();
				var tempElement = new XML();
				if(!parentElement){
					if(tempElement) {
						childElement.each(function(item, idx) {
							tempElement.appendChild(item);
						});	
					}
					var children = element.children();					
					if(children) {
						children.each(function(item, idx) {
							item = mxmltohtml(item);
						});	
					}
					element = tempElement;
				}else{
					if(childElement) {
						childElement.each(function(item, idx) {
							parentElement.appendChild(item);
						});	
					}
					var children = element.children();					
					if(children) {
						children.each(function(item, idx) {
							item = mxmltohtml(item);
						});	
					}
					element.remove();
				}
				
				/*element = element._parent;*/
				/*element.setName("remove");*/
				
				
			} else if(to_element == "remove") {
				// 해당 컴포넌트를 주석처리하며, 컴포넌트 내 주석을 삭제한다.
								
				convertElementToComment(element);				
				
			} else if(to_element) {
			
				// prefix 제거
				element._qname._ns.prefix = "";
				
				if(element._children && element._children.length < 1){
					var copyEl = element.copy();
					
					copyEl._text = element.toXMLString();
					copyEl._nodeKind = "comment";
					if(element.parent()){
						element.parent()._children.splice(element.childIndex(element)+1, 0, copyEl);
					}
					
					
				}
				
				
				// Table의 col 정의
				var styleName = "";
				if(component == 'SCTable') {
					to_element.extraTableFunc(element, to_element);
					var style = element.attribute("styleName");
					if(style.getValue && style.getValue() === "searchTable"){
						styleName = style.getValue();
					}
				}

				var customValues = to_element["customValues"];
				if(customValues){
					for(var key in customValues){
						var attr = element.attribute(key);
						if(attr && attr.getValue){
							var originValue = attr.getValue();
							if(customValues[key][originValue]){
								attr.setValue(customValues[key][originValue]);
							}
						}
					}	
				}
				// property 변경
				var bindingField = element.getAttribute("bindingField");
				if(bindingField){
					var value = bindingField;
					var bindingObject = element.getAttribute("bindingObject");
					if(bindingObject){
						var objectString = bindingObject;
						if(objectString){
							objectString = objectString.replace("{", "");
							objectString = objectString.replace("}", "");
						}
						value = objectString +"."+value; 
					}
					value = "{"+value+"}";
					element.setAttribute("bindingField",value);
				}

				var attributes = element.attributes();
				if(attributes) {
					attributes.each(function(attr, idx) {
						
						// SCTD, SCCheckBoxColumn
						if(to_element.extraAttributeFunc){
							to_element.extraAttributeFunc(element, to_element, attr);
						}
						
						var property = to_element[attr.localName()];
						if(property == "remove" ){
							// property delete
							attr.remove();
							
						} else if(property) {
							
							if(CUT.isString(property)){
								var value = attr.getValue();
								if(property.startsWith('!')){
									property = property.replace('!','');
									if(value === 'true'){
										value = 'false';
									}else if(value === 'false'){
										value = 'true';
									}else{
										if(value.startsWith('{')){
											value = value.replace('{', '{!')
										}else{
											value = '!'+value;
										}
										
									}
									attr.setValue(value);
								}
								attr.setName(property);
								
								if(property.indexOf('on-') > -1) {
									attr.setValue(value.substr(0, value.indexOf("(")));
								}else{
									if(value.indexOf("{") > -1 && value.indexOf("}") ){
										value = "{"+value+"}";
										attr.setValue(value);
									}
								}
							}
							// EVENT 함수의 파라미터 부분을 삭제한다.
							
						} else {
							/*
							 * Not Exist property
							 * - 정의되지 않은 프러퍼티가 있는 경우 추가하여야 한다. 
							 */ 
							/* browser 실행 시 */
//							console.log("Not Exist property :: " + component + " : " + attr.localName());
							/* java 실행 시 */
//							print("\nNot Exist property :: " + component + " : " + attr.localName());
						}
					});
				}
				
				//requiredProperties 필수 attribute 추가
				var requiredProperties = to_element["requiredProperties"];
				if(requiredProperties){
					for(var key in requiredProperties){
						var currAttr = element.attribute(key)
						if(!currAttr._nodeKind || currAttr._nodeKind !== "attribute"){
							var addAttr = new XML();
							addAttr._nodeKind = "attribute";
							addAttr._qname = QName._format(key, requiredProperties[key]);
							addAttr._text = requiredProperties[key];
							
							element._attributes.push(addAttr);
						}
					}
				}
				
				
				// 추가 property 설정
				var addPorperties = to_element["addProperties"];
				if(addPorperties) {
					for(var key in addPorperties){
						var addAttr = new XML();
						addAttr._nodeKind = "attribute";
						addAttr._qname = QName._format(key, addPorperties[key]);
						addAttr._text = addPorperties[key];
						
						element._attributes.push(addAttr);
					}
				}
				
				
				
				// element명 변경
				element.setName(to_element["__name"]);
				element.__converted = true;
				if(component == 'SCCollapseContainer' || component == 'SCFVBody') {
					if(to_element.extraContainerFunc){
						to_element.extraContainerFunc(element, to_element);	
						attributes.each(function(attr, idx) {
							attr.remove();
						});
					}
					
				}
				
				// 하위 컴포넌트를 재 탐색하며 convering
				var children = element.children();	
				
				// SCTD의 element 명 초기화
				if(to_element.init) {
					to_element.init(element, to_element);
				}
				
				
				
				//children = element.children();					
				if(children) {
					children.each(function(item, idx) {
						item = mxmltohtml(item);
					});	
				}


				if(children) {
					if(to_element.extraChildsFunc){
						to_element.extraChildsFunc(element, to_element, element.getChildElements());
					}
				}
				
				if(styleName === "searchTable" && type === "all"){
					var tempContanier = new XML("<cc-search-container></cc-search-container>");
					
					tempContanier._attributes = [];
					var addAttr = new XML();
					addAttr._nodeKind = "attribute";
					addAttr._qname = QName._format("on-search", "onSearch");
					addAttr._text = "onSearch";
					
					tempContanier._attributes.push(addAttr);
					
					var elementClone = element.copy();//clone(element); 
					tempContanier.appendChild(elementClone);
					
					
					var parent = element.parent();
					if(parent){
						for(var i=0; parent._children.length > i; ++i){
							if(parent._children[i] === element){
								parent.appendChildAt(i, tempContanier, true);
							}
						}
					}
				}
				
			
			} 
			// to_element 미정의 
			else {
				
				var attributes = element.attributes();
				//html의 attribute는 소문자 이용. camelCaseToDash 사용
				/*if(attributes) {
					attributes.each(function(attr, idx) {
						var name = attr.localName();
						name = camelCaseToDash(name);
						if(attr.getValue().indexOf("event") > -1){
							name = "on-" + name;
						}
						attr.setName(name);

					});
				}*/
				var customElement = tobe["customElement"];
				if(attributes) {
					attributes.each(function(attr, idx) {
						var property = customElement[attr.localName()];
						if(property == "remove" ){
							// property delete
							attr.remove();
						}else{
							var name = attr.localName();
							name = camelCaseToDash(name);
							if(attr.getValue().indexOf("event") > -1){
								name = "on-" + name;
							}
							attr.setName(name);	
						}

					});
				}
				// 정의되지 않은 컴포넌트 
				
				var children = element.children();					
				if(children) {
					children.each(function(item, idx) {
						item = mxmltohtml(item);
					});	
				}
				
				var prefix = element._qname._ns.prefix;				
				if(component == "colgroup" || component == "sc-label" || component=="col") {
					return;
					//sc-label 및 colgroup 은 변환과정에 추가된 element로 변환 대상이 아님.
					
				} else if(prefix != "mx" && prefix != "vc" && prefix != "cc") {
					// module 등에서 mx나 vc로 정의된 컴포넌트가 아닌 sub element들의 이름을 변경하고 link 태그로 추가한다.
					element._qname._ns.prefix = "";
					
					var newname = component.substring(0,2).toLowerCase();
					var rename =  component.substring(2);
					
					while(rename.match(/([A-Z]+)/)) {
						var match = rename.match(/([A-Z]+)/);
						if(match.index > 1){
							if(rename[match.index-1].match(/([-_])/)){
								rename = rename.replace(match[0], match[0].toLowerCase());
								continue;
							}
							if(match.index+1 === rename.length){
								rename = rename.replace(match[0], match[0].toLowerCase());
								continue;
							}
							
							if(rename[match.index+1].match(/([-_])/)){
								rename = rename.replace(match[0], match[0].toLowerCase());
								continue;
							}
						}
						m = rename.match(/([A-Z]+)/)[0];
						if(m.length > 1){
							m = m.substring(0,m.length-1);	
						}
						rename = rename.replace(m, "-"+m.toLowerCase());
					}
					if(!rename.startsWith("-")){
						rename = "-" + rename;
					}
					newname = newname+rename;
					
					element.setName(newname);
					/*if(packageUrls[prefix] && prefix != "popup"){
						newname =  packageUrls[prefix] + newname;
					}*/
					var linkText = '<sc-link rel="import" href="' + newname + '.html"></sc-link>';
					
					if(newname.startsWith('cc-')){
						linkText = '<!--'+linkText + '-->';
					}
					
					link += linkText+'\n';
				} else if(prefix != null && prefix != ''){
					
					element._qname._ns.prefix = '';
					element.setName(element.localName().toLowerCase());
					
				}else{
					/*
					 * Not Exist element
					 * - 정의되지 않은 컴포넌트가 있는 경우 추가하여야 한다. 
					 */ 
					/* browser 실행 시 */
//					console.log("Not Exist element :: " + component);
					/* java 실행 시 */
//					print("\nNot Exist element :: " + component);
					
				}
				
			}	
		
		}

		if(element.name && element.name() === "sc-ajax"){
			var urlAttr = element.attribute("url");
			if(urlAttr && urlAttr.getValue){
				var url = urlAttr.getValue();
				url = dotToCamelCase(url);
				element.attribute("url").setValue(url+ ".do");
			}else{
				var idAttr = element.attribute("id");
				if(idAttr && idAttr.getValue){
					var url = idAttr.getValue();
					element.setAttribute('url', url + ".do");
				}
			}
		}

		if(element.name && element.name() === "sc-grid"){
			element._children.unshift(new XML("<cc-grid-toolbar></cc-grid-toolbar>"));
		}
		
		return element;
	};
	
	/**
	 * actionScript3 to javascript 변환
	 * - javascript 문법으로 변경한다.
	 */
	var as3tojs = function(script) {
		
		var as3js = new as3();
		script = "package{ public class Main { " + script + " } }";
		var rawPackages = script.split(/\/\*\s+AS3JS\s+File\s+\*\//);
		for (var i = 0; i < rawPackages.length; i++) {
		    if (rawPackages[i].match(/^\s*$/g)) {
		      rawPackages.splice(i--, 1);
		    }
		}
		
		var result = as3js.compile({
		  	rawPackages: rawPackages,
		  	silent: true, // --silent
			verbose: false, // --verbose
			entry: "Main", // Entry point class path
			entryMode: "instance", // "instance" or "static"
			safeRequire: false, // --safe-require
			ignoreFlash: false // --ignore-flash					
		});
		
		return result.compiledSource;
	}

	var camelCaseToDash = function(value) {
		return value.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
	}

	var dotToCamelCase = function(value){
		return value.replace(/(\.[a-zA-Z])/g, function($1){return $1.toUpperCase().replace('.','');});	
	}

	var layout = "--vbox-layout";
	if(domName.startsWith("em")){
		layout = "--fit-layout"	
	}	
	
	var resolveModuleToolbar = function(rootXML){
		var childs = rootXML.getChildElements();
		
		var toolbarIndexes = [];
		var searchContainerIndexes  = [];
		var gridIndexes = [];
		
		
		for(var i =0; i < childs.length; i++){
			var child = childs[i];
			var childName = child.localName();
			
			if(childName === 'sc-grid'){
				gridIndexes.push(i);
			}else if(childName === 'sc-toolbar'){
				toolbarIndexes.push(i);
			}else if(childName === 'cc-search-container'){
				searchContainerIndexes.push(i);
			}
		}
		
		if(toolbarIndexes.length === 1 && searchContainerIndexes.length === 1 && gridIndexes.length === 1){
			var toolbarIndex = toolbarIndexes[0];
			var toolbar = childs[toolbarIndex];
			var searchContainerIndex = searchContainerIndexes[0];
			var gridIndex = gridIndexes[0];
			var grid = childs[gridIndex];
			
			if((toolbarIndex+1) === searchContainerIndex && (searchContainerIndex+1) === gridIndex){
				var gridToolbar = grid.querySelectorAll('cc-grid-toolbar')[0];
				var buttons = toolbar.querySelectorAll('sc-button');
				for(var i = 0; i < buttons.length; i++){
					var button = buttons[i];
					button.remove();
					gridToolbar.appendChild(button);
				}
				convertElementToComment(toolbar);
			}
		}
		
	};
	var resolveBindingObject = function(xml){
		var tagName = xml.localName();
		if(tagName.startsWith('sc-') && tagName.endsWith('-field')){
			configurateBindingValue(xml);
		}
		var childEls = xml.getChildElements();
		
		for(var i = 0; i < childEls.length; i++){
			arguments.callee.call(this, childEls[i]);
		}
	};
	
	var resolveSize = function(xml){
		
		var tagName = xml.localName();
		if((tagName.startsWith('sc-') && tagName.endsWith('-field')) || tagName === 'sc-label'){
			xml.removeAttribute('width');
			xml.removeAttribute('height');
		}
		
		if(tagName === 'sc-grid-columns'){
			return;
		}
		
		var width = xml.getAttribute('width');
		var height = xml.getAttribute('height');
		
		if(width != null){
			if(width.indexOf('%') < 0){
				width += 'px';
			}
			xml.addStyle('width', width);
			xml.removeAttribute('width');
		}
		
		if(height != null){
			if(height.indexOf('%') < 0){
				height += 'px';
			}
			xml.addStyle('height', height);
			xml.removeAttribute('height');
		}
		
		var childEls = xml.getChildElements();
		
		for(var i = 0; i < childEls.length; i++){
			arguments.callee.call(this, childEls[i]);
		}
	};
	
	var resolveLayout = function(rootXML, isEmModule){
		//resolveModuleToolbar(rootXML);
		var fits = rootXML.querySelectorAll('.fit');
		// 루트가 fitLayout
		if(isEmModule === true){
			fits.push(rootXML);
		}
		
		for(var i = 0; i < fits.length; i++){
			var container = fits[i];
			var childEls = container.getChildElements();
			if(childEls.length === 1){
				childEls[0].addClass('fit');
			}
		}
		
		var hboxes = rootXML.querySelectorAll('.hbox');
		
		for(var i = 0; i < hboxes.length; i++){
			var container = hboxes[i];
			var childEls = container.getChildElements();
			for(var j = 0; j < childEls.length; j++){
				var child = childEls[j];
				var width = child.getAttribute('width');
				if(child.getAttribute('height') == '100%'){
					child.removeAttribute('height');
				}
				
				if(width != null && width.indexOf('%') >= 0){
					var widthPer = Number(width.replace('%',''));
					
					if(childEls.length === 1){
						child.addStyle('flex',1);
					}else{
						child.addStyle('flex',(widthPer / 10));
						
					}
					child.removeAttribute('width');
					
				}else if(width == null && child.localName() === 'div'){
					child.addStyle('flex',1);
				}
			}
		}
		
		var vboxes = rootXML.querySelectorAll('.vbox');
		// 루트가 vboxLayout
		if(isEmModule !== true){
			vboxes.push(rootXML);
		}
		
		for(var i = 0; i < vboxes.length; i++){
			var container = vboxes[i];
			var childEls = container.getChildElements();
			for(var j = 0; j < childEls.length; j++){
				var child = childEls[j];
				var height = child.getAttribute('height');
				if(child.getAttribute('width') == '100%'){
					child.removeAttribute('width');
				}
				
				if(height != null && height.indexOf('%') >= 0){
					var heightPer = Number(height.replace('%',''));
					if(childEls.length === 1){
						child.addStyle('flex',1);
					}else{
						child.addStyle('flex',(heightPer / 10));
					}
					child.removeAttribute('height');
				}else if(height == null && child.localName() === 'div'){
					child.addStyle('flex',1);
				}
			}
		}
	};
	
	var removeTrashElements = function(rootXML){
		var currentContainers = rootXML.getChildElementsWithOutAjax();
		while(currentContainers.length === 1 && currentContainers[0].classContains('vbox') && currentContainers[0].getStyle('flex') != null){
			var removeTarget = currentContainers[0];
			currentContainers = removeTarget.getChildElementsWithOutAjax();
			removeTarget.removeAndMoveChildsToUpper();
		}
	};
	
	var resolveToolbars = function(xml){
		var currentChilds = xml.getChildElementsWithOutAjax();
		for(var i =0; i < currentChilds.length; i++){
			var child = currentChilds[i];
			arguments.callee.call(this, child);
			if(currentChilds.length === 2 && currentChilds[0].localName() === 'sc-toolbar' && currentChilds[1].localName() === 'sc-grid'){
				var grid = currentChilds[1],
					gridToolbar = grid.querySelectorAll('cc-grid-toolbar')[0],
					toolbar = currentChilds[0],
					toolbarChilds = toolbar.getChildElements().slice();
				
				if(toolbarChilds.length == 0) return;
				
				if(toolbarChilds[0].localName() === 'sc-label'){
					var title = toolbarChilds[0].getAttribute("text"); 
					if(title != null){
						gridToolbar.setAttribute("title-text",title);
					}
					toolbarChilds[0].remove();
					toolbarChilds.splice(0,1);
				}
				
				for(var j =0; j < toolbarChilds.length; j++){
					toolbarChilds[j].remove();
					if(toolbarChilds[j].localName() != 'sc-spacer'){
						gridToolbar.appendChild(toolbarChilds[j]);
					}
					
				}
				
			}
		}
	};
	
	/**
	 * template 정의 (ejs)
	 */ 
	var template = "<%= link %>"
		+"\n"
		+"\n<dom-module id=\"<%= domName %>\">"
		+"\n	"
		+"\n	<style>" 
		+"\n		:host {"
		+"\n			@apply(<%= layout %>);"
		+"\n		}"
		+"\n	</style>"
		+"\n	"
		+"\n	<template>"
		+"\n	"
		+"\n<%= htmlText %>"
		+"\n	"
		+"\n	</template>"
		+"\n	"
		+"\n	<script>"
		+"\n		Polymer({"
		+"\n			is: \"<%= domName %>\","
		+"\n			<%= scriptText %>"
		+"\n		});"
		+"\n	</script>"
		+"\n	"
		+"\n</dom-module>";
	
	
	/**
	 * 실제 function 실행 부분
	 */	
	// xml parsing
	xml = new XML(content);
	
	// tag convert
	htmlXmlRoot = mxmltohtml(xml);
	
	resolveToolbars(htmlXmlRoot);
	resolveLayout(htmlXmlRoot, domName.startsWith("em"));
	resolveBindingObject(htmlXmlRoot);
	resolveSize(htmlXmlRoot);
	if(!domName.startsWith("em")){
		removeTrashElements(htmlXmlRoot);
	}
	
	
	htmlText = htmlXmlRoot.toXMLString();
	htmlText = htmlText.replace(/<[//]{0,1}(remove|REMOVE)[^><]*>/g, "");
	if(type === "component"){
		return htmlText; 
	}	
	if(domName.startsWith("em")){
		htmlText = "<cc-page-title-bar></cc-page-title-bar>" + htmlText;
	}
	
	
	//tabel </col> tag 제거
	/*htmlText = htmlText.replace(/<\/col>/gi,"");*/
	
	
	// script convert
	var regex = /\/\*[\s\S]*?\*\//ig;
	
	if(actionScript){
		while(actionScript.match(/\/\*[\s\S]*?\*\//)) {
			
			var match = actionScript.match(/\/\*[\s\S]*?\*\//);
			
			actionScript = actionScript.replace(match[0],match[0].replace(/\/\*+|\*+\/*/g, "").trim());
			
		}
	}
	
	
	
	scriptText = "/*\n"+actionScript+"\n*/";
	
	if(scriptConvert){
		scriptText = as3tojs(actionScript);
	}else{
		scriptText = "/*\n"+actionScript+"\n*/";//as3tojs(actionScript);
	}
	
	// template result
	resultText = new EJS({file:template}).render({
		domName: domName,
		link: link,
		htmlText: htmlText, 
		scriptText: scriptText,
		layout : layout
	});
	
	// beautify html
	/*output = html_beautify(resultText);*/

	
	return resultText;
}
