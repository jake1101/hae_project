var isBrowser = true;



/**
 * EMRO SMARTsuite8 to SMARTsuite9 CONVERTER
 * @author 
 * @version:0.1.0
 * 
 * use library
 * 1. jsxml : javascript 기반 xml parser (https://github.com/colorhook/jsxml)
 * 2. ejs : javascript template 엔진 (http://www.embeddedjs.com/)
 * 3. js-beautify : js, html, css beautifier (https://github.com/beautify-web/js-beautify)
 */

Converter8To9 = (function(){
	
	var logging = function(){
		if(isBrowser){
			console.log(arguments[0]);
		}else{
			print(arguments[0]);
		}
	}
	
	var XML = jsxml.XML, QName = jsxml.QName;
	
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
	
	String.prototype.startsWith = function(str) {
       return (this.indexOf(str) === 0);
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
	
	XML.prototype.removeComment = function() {
		//최상위 element인 경우
		if(this.parent()){
			var children = this.children();
		}
		if(this.nodeKind() == 'comment') {
			this._nodeKind = "text";
		}
		if(children) {
			children.each(function(item, idx) {
				item.removeComment();
			});							
		}
	};
	
	XML.prototype.convertElementToComment = function(){
		this.removeComment();
		this._text = this.toXMLString();
		this._nodeKind = "comment";
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
	
	XML.prototype.querySelectorAll = function(selector, includeOwner){
		var result = [];
		
		if(selector.indexOf(',') >= 0){
			var selectors = selector.split(',');
			for(var i =0; i < selectors.length; i++){
				result = result.concat(arguments.callee.call(this, selectors[i].trim(), false));
			}
			return result;
		}
		
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
					if(classInfo && classInfo.getValue && classInfo.getValue() === className){
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
	
	var converter = function(){
		
		this.collector = new ExtJsCollector();
	};
	converter.prototype.addResource = function(scripts){
		this.collector.collectResource(scripts);
	};
	var baseBehaviors = {
		base : {
			propertyToAttributeMap : {
				reference : 'id',
				itemId : 'item-id',
				id : 'component-id',
				hidden : 'hidden',
				padding : 'REMOVE',
				margin : 'REMOVE',
				bodyPadding : 'REMOVE',
				columnWidth : 'REMOVE',
				border : 'REMOVE',
				layout : 'REMOVE',
				width : 'REMOVE',
				height : 'REMOVE',
				minHeight : 'REMOVE',
				minWidth : 'REMOVE',
				flex : 'REMOVE',
				autoScroll : 'REMOVE',
				ui : 'REMOVE',
				manageHeight : 'REMOVE',
				bodyBorder: 'REMOVE',
				lazy: 'REMOVE',
				dock: 'REMOVE',
				displayInfo: 'REMOVE'
			},
			handler : function(item, view){
				if(item.cls){
					var cls = item.cls;
					delete item.cls;
					this.removeAttribute(item, item.html);
					this.addClass(item, cls);
					this.removeAttribute(item, 'cls');
				}
				if(item.html){
					item.__$tagName = 'div';
					this.setAttribute(item, 'innerHTML','<div>'+item.html+'</div>');
					delete item.html;
					this.removeAttribute(item, 'html');
				}
				if(item.bind && item.bind.html){
					item.__$tagName = 'div';
					this.setAttribute(item, 'innerHTML','<div>'+item.bind.html+'</div>');
					delete item.bind.html;
					this.removeAttribute(item, 'html');
				}
				
				if(item.hasOwnProperty("width")){
					var widthStr = item.width+'';
					if(widthStr.trim() !== ''){
						this.addStyle(item, "width", widthStr.indexOf('%') >= 0 ? widthStr : widthStr+'px');
					}
				}
				
				if(item.hasOwnProperty("height")){
					var heightStr = item.height+'';
					if(heightStr.trim() !== ''){
						this.addStyle(item, "height", heightStr.indexOf('%') >= 0 ? heightStr : heightStr+'px');
					}
				}
				
				if(item.hasOwnProperty("minHeight")){
					var minHeightStr = item.minHeight+'';
					if(minHeightStr.trim() !== ''){
						this.addStyle(item, "min-height", minHeightStr.indexOf('%') >= 0 ? minHeightStr : minHeightStr+'px');
					}
				}
				
				if(item.hasOwnProperty("minWidth")){
					var minWidthStr = item.minWidth+'';
					if(minWidthStr.trim() !== ''){
						this.addStyle(item, "width", minWidthStr.indexOf('%') >= 0 ? minWidthStr : minWidthStr+'px');
					}
				}
			}
		},
		
		bind : {
			handler : function(item, view){
				if(CUT.isObject(item.bind)){
					for(var key in item.bind){
						if(item.hasOwnProperty(key)){
							continue;
						}
						var vm = view.viewmodel;
						var bindFullStr = '{'+item.bind[key]+'}';
						var bindTarget = bindFullStr;
						bindTarget = CUT.replaceAll(bindTarget,'{','');
						bindTarget = CUT.replaceAll(bindTarget,'}','');
						var isOpposite = bindTarget.startsWith('!');
						bindTarget = CUT.replaceAll(bindTarget,'!','');
						
						// formula 인지 확인
						if(vm && vm.config && vm.config.formulas && vm.config.formulas[CUT.replaceAll(bindTarget, '!','')]){
							bindFullStr = "[["+(isOpposite ? '!' : '')+"formula('"+bindTarget+"')]]"
						}
						
						var newName = this.upperCaseToDecimal(key);
						if(newName.charAt(0) === '-'){
							newName = newName.substr(1);
						}
						
						if(newName !== key){
							this.addComment(item, '바인딩 되어있는 '+key+ '가 '+newName+'로 변경 되었습니다.', true)
						}
						
						item['__$'+newName] = bindFullStr;
					}
				}
			}
		},
		listener : {
			handler : function(item, view){
				if(CUT.isObject(item.listeners)){
					for(var key in item.listeners){
						var newName = this.upperCaseToDecimal(key);
						if(newName.charAt(0) === '-'){
							newName = newName.substr(1);
						}
						if(newName !==key){
							this.addComment(item, '이벤트리스너 '+key+ '가 '+newName+'로 변경 되었습니다.', true)
						}
						item['__$on-'+newName] = item.listeners[key];
					}
				}
			}
		},
		column : {
			ignoreBase : true,
			defaultAttributes : {
				'text-align':'left'
			},
			propertyToAttributeMap : {
				reference : 'id',
				itemId : 'item-id',
				id : 'component-id',
				hidden : '!visible',
				text : 'header-text',
				dataIndex : 'data-field',
				width : 'width',
				align : 'text-align',
				tdCls : 'REMOVE'
			},
			handler : function(item, view){
				if(item.tdCls){
					if(item.tdCls === 'link'){
						this.setAttribute(item, 'style-name','link');
					}
				}
				
				if(CUT.isString(item.width) && item.width.indexOf('%') >= 0){
					var width = item.width;
					this.removeAttribute(item, 'width', true);
					this.addComment(item, 'width('+width+')에 퍼센테이지(%)가 들어가 있어 제거 하였습니다. 고정사이즈를 지정해주세요', true);
				}
				
				if(CUT.isFunction(item.renderer)){
					this.addComment(item, 'renderer가 존재 합니다 아래의 renderer를 직접 구현해주세요.', true);
					this.addComment(item, 'renderer : '+item.renderer, true);
				}
				
				if(CUT.isFunction(item.isDisabled)){
					this.addComment(item, 'isDisabled 존재 합니다 아래의 isDisabled 직접 구현해주세요.', true);
					this.addComment(item, 'isDisabled : '+item.isDisabled, true);
				}
				
				//todo
				if(CUT.isObject(item.editor)){
					item.__$editable = true;
				}
				
				if(CUT.isArray(item.columns)){
					this.addComment(item, '다음에 위치한'+item.xtype +'은 자식이 존재해 sc-group-column으로 변경 되었습니다.', true);
					item.__$tagName = 'sc-group-column';
					var childCols = item.columns;
					for(var i =0; i < childCols.length; i++){
						this._configurateItemByXtype(childCols[i], view);
					}
					item.items = childCols;
				}else if(item.dataIndex == null && !item.items){
					this.addComment(item, '다음 컬럼은  dataIndex가 존재하지 않아 data-field가 UUID로 임의로 생성되엇습니다.', true);
					item['__$data-field'] = CUT.generateId(true);
				}
			},
			behaviors : ['bind', 'listener']
		},
		docked : {
			handler : function(item, view){
				if(!CUT.isArray(item.dockedItems)){
					return;
				}
				var topDockedItems = [];
				
				var bottomDockedItems = [];
				
				//left right dockeditems의 경우 현재 8.0 개발패턴에 존재하지 않아 별도로 로직 추가하지 않음
				
				var toolbarItems = [];
				for(var i =0;item.dockedItems && i < item.dockedItems.length ; i++){
					var docked = item.dockedItems[i];
					
					if(docked.dock === 'top'){
						topDockedItems.push(docked);
					}else if(docked.dock === 'bottom'){
						bottomDockedItems.push(docked);
					}
					
					this._configurateItemByXtype(docked, view);
				}
				
				var topContainer = this.createElementMeta('div', {}, topDockedItems);
				this.addClass(topContainer, 'top-docked');
				
				var contentsContainer = this.createElementMeta('div', {}, item.items);
				if(item.layout === 'hbox' || item.layout === 'vbox' || (item.layout && (item.layout.type === 'vbox' || item.layout.type === 'hbox'))){
					this.addFlexToItem(contentsContainer, 1, true);
				}
				this.addClass(contentsContainer, 'contents-container');
				contentsContainer.layout = item.layout;
				contentsContainer.column = item.column;
				delete item.column;
				delete item.layout;

				var bottomContainer = this.createElementMeta('div', {}, bottomDockedItems);
				this.addClass(bottomContainer, 'bottom-docked');
				
				
				
				
				
				item.items = [];
				
				if(CUT.isArray(contentsContainer.items) && contentsContainer.items.length > 0 ){
					item.items = [contentsContainer];
					
					this.addElementHandler(contentsContainer,function(el){
						var directParent = el.parent();
						var directParentTagName = directParent.localName();
						
						if(directParentTagName === 'cc-search-container'){
							directParent.removeClass('vbox');
							el.remove();
							var contents = el.getChildElements();
							for(var i = 0; i< contents.length; i++){
								contents[i].remove();
								directParent.appendChild(contents[i]);
							}
							
						}
					});
					
				}
				
				if(topDockedItems.length > 0){
					item.items.unshift(topContainer);
					topContainer.isDockItem = true;
					this.addElementHandler(topContainer,function(el){
						var directParent = el.parent();
						var directParentTagName = directParent.localName();
						var parentTop = directParent.parent();
						var parentTopTagName = parentTop.localName();
						
						if(directParentTagName === 'cc-search-container'){
							el.remove();
							parentTop.insertChildBefore(directParent, el);
							
							
							
							/* 만약 cc-search-container의 docked top으로 버튼들이 있고 상위 컨테이너가 모듈 일 경우 버튼들을 모듈의 cc-page-title-bar로 옮긴다.
							 * 
							 */
							
							if(parentTop.classContains('contents-container') === true){
								parentTop = parentTop.parent();
							}
							if(parentTop.localName() === 'template' && parentTop.querySelectorAll('cc-page-title-bar').length > 0){
								var pageTitleBar = parentTop.querySelectorAll('cc-page-title-bar')[0];
								var childs = el.getChildElements();
								
								for(var i =0; i < childs.length; i++){
									if(childs[i].localName() === 'sc-toolbar'){
										var toolbar = childs[i];
										var toolbarChilds = toolbar.getChildElements();
										var toolbarElCounts = 0;
										for(var j = 0; j < toolbarChilds.length; j++){
											var toolbarChildTagName = toolbarChilds[j].localName();
											if(toolbarChildTagName === 'sc-button'){
												var button = toolbarChilds[j];
												button.remove();
												pageTitleBar.appendChild(button);
											}else if(toolbarChildTagName !== 'sc-spacer'){
												toolbarElCounts++;
											}
										}
										
										if(toolbarElCounts === 0){
											toolbar.remove();
										}
									}
								}
								
							}
							
						}
						
						
					});
					
				}
				
				if(bottomDockedItems.length > 0){
					item.items.push(bottomContainer);
					topContainer.isDockItem = true;
					this.addElementHandler(bottomContainer,function(el){
						var directParent = el.parent();
						var directParentTagName = directParent.localName();
						var parentTop = directParent.parent();
						var parentTopTagName = parentTop.localName();
						
						if(directParentTagName === 'cc-search-container'){
							el.remove();
							parentTop.insertChildAfter(directParent, el);
						}
					});
					
				}
				
			}
		},
		dataActionColumn : {
			handler : function(item, view){
				this.addComment(item, '다음에 위치한 컬럼은 변환전 '+item.xtype+' 이었습니다.', true);
				item.__$tagName = 'sc-group-column';
				item['__$hide-child-headers'] = true;
				var dataCol = {
					__$tagName : 'sc-data-column',
				};
				if(item.dataIndex == null){
					this.addComment(dataCol, '다음 컬럼은  dataIndex가 존재하지 않아 data-field가 UUID로 임의로 생성되엇습니다.', true);
					dataCol['__$data-field'] = CUT.generateId(true);
				}else{
					dataCol['__$data-field'] = item.dataIndex;
				}
				
				var imageCol = {
					__$tagName : 'sc-image-column',
					'__$image-cls' : 'link',
					'__$text-align' : 'center',
					'__$data-field' : CUT.generateId(true),
					__$width : 30
				};
				
				item.items = [dataCol, imageCol];
				if(item.hasOwnProperty('width')){
					var width = Number(item.width);
					dataCol['__$width'] = width - 30;
				}
				
				if(item.hasOwnProperty('align')){
					dataCol['__$text-align'] = item.align;
				}
				
				if(CUT.isFunction(item.handler)){
					this.addComment(item, 'handler가 존재 합니다 아래의 handler를 직접 구현해주세요.', true);
					this.addComment(item, 'handler : '+item.handler, true);
				}
			}
		},
		actionColumn : {
			handler : function(item, view){
				
				this.addComment(item, '다음에 위치한 컬럼은 변환전 '+item.xtype+' 이었습니다.', true);
				if(CUT.isFunction(item.handler)){
					this.addComment(item, 'handler가 존재 합니다 아래의 handler를 직접 구현해주세요.', true);
					this.addComment(item, 'handler : '+item.handler, true);
				}
			}
		},
		
		checkbox : {
			propertyToAttributeMap : {
				boxLabel : 'label'	
			}
		},
		
		field : {
			propertyToAttributeMap : {
				name : 'name',
				allowBlank : '!required',
				readOnly : 'readonly',
				maxLength : 'maxlength',
				maxValue : 'max-value',
				minValue : 'min-value',
				regex : 'mask-re',
				disabledBubbleEvent : 'REMOVE',
				enableKeyEvents : 'REMOVE',
				labelWidth : 'REMOVE',
				
			},
			handler : function(item, view){
				
				
				if(item.validator){
					this.addComment(item, 'field에 커스텀한 validator가 존재 합니다. ',true);
					this.addComment(item, ' validator : '+item.validator, true);
					
				}
				
				if(item.triggers){
					this.addComment(item, 'field에 커스텀한 트리거가 존재 합니다. 트리거를 확인해 주세요',true);
				}
				if(item.fieldLabel && item.hideLabel !== true){
					var parent = this.findParent(view,item);
					if(!(parent.layout && parent.layout.type === 'table') && !(parent.layout === 'table')){
						var index = parent.items.indexOf(item);
						var label = this.createElementMeta('sc-label',{ text : item.fieldLabel, hidden : this.getAttribute(item,'hidden')});;
						if(item.labelWidth){
							this.addStyle(label, 'width', item.labelWidth+'px');
						}else{
							this.addStyle(label, 'width', '100px');
						}
						parent.items.splice(index, 0,  label);
						delete item.fieldLabel;
					}
				}
				
				
			},
			behaviors : ['bind', 'listener']
		},
		external : {
			behaviors : ['bind', 'listener'],
			propertyToAttributeMap : {
			}
		},
		grid : {
			behaviors : ['bind', 'listener'],
			propertyToAttributeMap : {
				store : 'data-provider',
				sortableColumns : 'sortable',
				stateId : 'REMOVE',
				ui : 'REMOVE',
				stateful : 'REMOVE',
				header : 'REMOVE',
				enableColumnResize : 'REMOVE',
				scroll : 'REMOVE'
				
			},
			handler : function(item, view){
				
				var toolbarItems = [];
				//toolbar 컨버팅
				for(var i =0;item.dockedItems && i < item.dockedItems.length ; i++){
					var docked = item.dockedItems[i];
					if(docked.xtype === 'toolbar' && CUT.isArray(docked.items)){
						for(var j =0; j< docked.items.length;j++){
							this._configurateItemByXtype(docked.items[j], view);
							if(docked.items[j]['__$tagName'] === 'sc-spacer'){
								docked.items.splice(j--,1);
							}
						}
						toolbarItems = toolbarItems.concat(docked.items);
					}
				}
				
				var toolbar = {
					__$tagName : 'cc-grid-toolbar',
					items : toolbarItems
				};
				
				this.addElementHandler(toolbar,function(el, item){
					var directParent = el.parent();
					var directParentTagName = directParent.localName();
					var parentTop = directParent.parent();
					var parentTopTagName = parentTop.localName();
					var parentTopChilds = parentTop.getChildElements();
					
					var isAlone = parentTopChilds.length === 1 || (parentTopChilds.length === 2 && parentTopChilds[0].localName() === 'cc-page-title-bar');
					
					if(parentTop.classContains('contents-container') === true){
						parentTop = parentTop.parent();
					}
					
					if(isAlone === true && parentTop.localName() === 'template' && parentTop.querySelectorAll('cc-page-title-bar').length > 0){
						var pageTitleBar = parentTop.querySelectorAll('cc-page-title-bar')[0];
						var childs = el.getChildElements();
						for(var j = 0; j < childs.length; j++){
							if(childs[j].localName() === 'sc-button'){
								var button = childs[j];
								button.remove();
								pageTitleBar.appendChild(button);
							}
						}
					}
				});
				
				if(item.title && item.header !== false){
					toolbar['title-text'] = item.title;
				}
				
				
				//pagingtoolbar 컨버팅
				var pagingToolbar;
				for(var i =0;item.dockedItems && i < item.dockedItems.length ; i++){
					var docked = item.dockedItems[i];
					if(docked.xtype === 'pagingtoolbar' || docked.xtype === 'etnascrollpagingtoolbar'){
						pagingToolbar = {
							__$tagName : 'sc-grid-paging'
						};
						if(docked.xtype === 'etnascrollpagingtoolbar'){
							pagingToolbar.__$scroll = true;
						}
						
						if(!view.viewmodel || !(docked.bind && docked.bind.store)){
							this.addComment(pagingToolbar,'viewmodel 소스가 없거나 store가 연결되어 있지 않다면 sc-grid-paging에 url이 자동으로 입력되지 않습니다. 요청할 url을 기입해주세요.',true);
						}else{
							var vmconfig = view.viewmodel.config;
							var storeName = docked.bind.store;
							storeName = CUT.replaceAll(storeName, '{' , '');
							storeName = CUT.replaceAll(storeName, '}' , '');
							if(vmconfig && vmconfig.stores && vmconfig.stores[storeName]){
								var ajax = this.convertStoreToAjax(storeName, vmconfig.stores[storeName]);
								if(ajax){
									pagingToolbar.__$url = ajax.__$url;
									pagingToolbar.__$id = ajax.__$id + 'paging';
								}
							}
						}
					}
				}
				
				
				var columnContainer = {
					__$tagName : 'sc-grid-columns',
					items :[]
				};
				
				var fieldContainer = {
					__$tagName : 'sc-grid-fields',
					items :[]	
				};
				
				if(item.bind && item.bind['data-provider']){
					var provider = item.bind['data-provider'];
					provider = CUT.replaceAll(provider, '{', '');
					provider = CUT.replaceAll(provider, '}', '');
					var vm = view.viewmodel 
					if(vm && vm.config && vm.config.stores && vm.config.stores[provider]){
						var store = vm.config.stores[provider];
						if(store.model){
							var modelInfo = vm.config.models[store.model];
							if(modelInfo && modelInfo.config && CUT.isArray(modelInfo.config.fields)){
								this.addComment(fieldContainer, '다음 sc-grid-field 들은 "'+store.model+'"모델을 기준으로 생성 되었습니다.',true);
								fieldContainer.items = this.convertModelToFields(modelInfo.config.fields);
							}else{
								this.addComment(fieldContainer, 'sc-grid-field가 자동으로 생성되길 원하신 다면 "'+store.model+'"모델 클래스 소스도 컨버팅 소스에 포함시켜주세요', true);
								
							}
						}else if(CUT.isArray(store.fields)){
							this.addComment(fieldContainer, '다음 sc-grid-field 들은 "'+provider+'"스토어를 기준으로 생성 되었습니다.',true);
							fieldContainer.items = this.convertModelToFields(store.fields);
						}
						
					}
				}
				
				
				
				item.items = [toolbar, columnContainer, fieldContainer];
				if(pagingToolbar){
					item.items.push(pagingToolbar);
				}
				
				if(CUT.isArray(item.columns)){
					var cols = item.columns;
					var statusExist = false;
					for(var i = 0; i< cols.length; i++){
						if (cols[i].xtype === "etnastatuscolumn") {
							this.addComment(cols[i], 'etnastatuscolumn은 삭제되고 sc-grid의 use-status(default: true) 옵션으로 대체 됩니다', true);
							statusExist = true;
                        }
						if(item.enableColumnResize === false){
							cols[i].resizable = false;
						}
						this._configurateItemByXtype(cols[i],view);	 
					}
					if(!statusExist){
						item['__$use-status'] =  false;
					}
					columnContainer.items = cols;
					delete item.columns;
				}
				if(CUT.isObject(item.selModel)){
					var selModel = item.selModel;
					if(selModel.mode === "single"){
						item["__$selection-mode"] = 'radio';
					}
					
					if(selModel.listeners){
						if(selModel.listeners.select){
							item['__$on-selection-checked'] = selModel.listeners.select;
						}
						
						if(selModel.listeners.deselect){
							item['__$on-selection-checked-deselect'] = selModel.listeners.deselect;
						}
					}
				}else{
					item['__$use-selection'] = false;
				}
			}
		}
	};
	
	/*
	 * xtypeToComponentMap 생성 예제
	 *{
	 *	//수행할 behavior들
	 *	behaviors : [baseBehaviors.fieldHandler],
	 *
	 *	// 기본 속성 들
	 *	defaultAttributes : {
	 *		test : 'true'
	 *	},
	 *	propertyToAttributeMap : {
	 *		hidden : '!visible'
	 *	},
	 *
	 *	handler : function(item, view){
	 *		item.__$tagName = "field";
	 *	},
	 *	
	 *	ignoreBase : false
	 *
	 *}
	 * 
	 *
	 */
	
	var xtypeToComponentMap = {
		"component": "component",
		"box": "box",
		"container": {
			behaviors : ['bind'],
			tagName : 'div',
			handler : function(item, view){
				this.addComment(item, '다음 div는 변환전 container 였습니다.',true);
			}
		},
		"field": {
			behaviors : ['field'],
			tagName : 'field',
			handler : function(item, view){
			}
		},
		"splitter": {
			tagName : "sc-splitter",
			defaultAttributes : {"split-type":"horizontal"},
			handler : function(item, view){
				
			}
		},
		"gridcolumn": {
			behaviors : ['column'],
			tagName : 'sc-data-column',
			handler : function(item, view){
			}
		},
		"pagingtoolbar": {
			tagName : 'sc-grid-paging',
			handler : function(item, view){
				
				if(item.width){
					this.removeStyle(item, 'width');
					delete item.width;
				}
				
				if(item.height){
					this.removeStyle(item, 'height');
					delete item.height;
				}
				
			}
		},
		"headercontainer": "headercontainer",
		"image": "image",
		"imagecomponent": "imagecomponent",
		"loadmask": "sc-loadmask",
		"progressbar": "sc-progressbar",
		"progressbarwidget": "progressbarwidget",
		"tbfill": "sc-spacer",
		"tbitem": "tbitem",
		"tbseparator": "sc-spacer",
		"button": {
			tagName : "sc-button",
			behaviors : ['field'],
			propertyToAttributeMap :{
				text : 'text',
				iconCls : 'REMOVE'
			},
			handler : function(item, view){
			}
		},
		"toolbar": "sc-toolbar",
		"panel": {
			tagName : "sc-panel",
			behaviors : ['docked'],
			propertyToAttributeMap :{
				collapsible : 'collapsible',
				collapsed : 'collapsed',
				title : 'title-text'
			},
			handler : function(item, view){
				this._processGrowContainer(item, view);
				if(item.layout && (item.layout ==='fit'|| item.layout.type ==='fit')){
					this.addClass(item, 'fit');
				}
			}
		},
		"tip": "tip",
		"tooltip": "tooltip",
		"quicktip": "quicktip",
		"displayfield": {
			behaviors : ['field'],
			propertyToAttributeMap : {
				'value' : 'REMOVE'
			},
			tagName : "div",
			handler : function(item, view){
				this.addClass(item, 'display-field');
				if(CUT.isString(item.value)){
					//jsxml에서 /문자가 단독으로 들어갈 경우 입력되지 않음
					item.value = CUT.replaceAll(item.value, '/', '_%slash_%');
					item.value = CUT.replaceAll(item.value, '(', '_%left_parenthesis%_');
					item.value = CUT.replaceAll(item.value, ')', '_%right_parenthesis%_');
					this.setAttribute(item, 'innerHTML','<div>'+item.value+'</div>');
				}
				
				if(CUT.isObject(item.bind) && item.bind.value){
					var bindValue = item.bind.value;
					bindValue = CUT.replaceAll(bindValue,'{','');
					bindValue = CUT.replaceAll(bindValue,'}','');
					this.setAttribute(item, 'innerHTML','<div>[['+bindValue+']]</div>');
					this.addComment(item, '다음에 바인딩된 value는 단방향 바인딩으로 변경 되었습니다.',true);
					this.removeAttribute(item, 'value');
				}
				
				
				this.addComment(item, '다음에 위치한 div는 displayfield였었습니다.',true);
			}
		},
		"tablepanel": "tablepanel",
		"dataview": "dataview",
		"tableview": "tableview",
		"gridview": "gridview",
		"gridpanel": {
			tagName : 'sc-grid',
			behaviors : ['grid'],
			handler : function(item, view){
			}
		},
		"grid": {
			tagName : 'sc-grid',
			behaviors : ['grid'],
			handler : function(item, view){
				
			}
		},
		"checkboxfield": {
			behaviors : ['field', 'checkbox'],
			tagName : "sc-checkbox-field",
			handler : function(item, view){
			}
		},
		"checkbox": {
			behaviors : ['field', 'checkbox'],
			tagName : "sc-checkbox-field",
			handler : function(item, view){
			}
		},
		"bindinspector-componentdetail": "bindinspector-componentdetail",
		"treeview": "treeview",
		"treecolumn": {
			behaviors : ['column'],
			tagName : "sc-data-column",
			handler : function(item, view){
				this.addComment(item, '다음에 위치한 컬럼은 treecolumn 이었습니다.',true);
			}
		},
		"treepanel": {
			defaultAttributes : {
				'is-tree' : true
			},
			tagName : "sc-grid",
			behaviors : ['grid'],
			handler : function(item, view){
				this.addComment(item, '다음에 위치한 그리드는 treegrid 입니다.', true);
			}
		},
		"textfield": {
			behaviors : ['field'],
			tagName : "sc-text-field",
			handler : function(item, view){
			}
		},
		"bindinspector-componentlist": "bindinspector-componentlist",
		"bordersplitter": "bordersplitter",
		"tab": "sc-tab",
		"tabpanel": {
			tagName : "sc-tab-navigation",
			propertyToAttributeMap : {
				beforeRenderChildren : 'REMOVE',
				activeTab : 'selected-index'
			},
			behaviors : [],
			handler : function(item, view){
				
				var parent = this.findParent(view, item);
				
				this._processGrowContainer(item, view);
				
				this.addElementHandler(item, function(el, item){
					var childs = el.getChildElements();
					
					for(var i = 0; i < childs.length; i++){
						if(childs[i].localName() === 'sc-panel'){
							childs[i].setLocalName('div');
						}
						
						var childLayout = CUT.isObject(item.items[i].layout) ? item.items[i].layout.type : item.items[i].layout; 
						if((item.flex || el.classContains('fit')) && (childs[i].classContains('vbox') || childs[i].classContains('hbox') || childs[i].classContains('fit'))){
							childs[i].removeClass('grow');
							childs[i].addClass('fit');
						}
						
						
						if(!childs[i].classContains('grow')){
							childs[i].addClass('fit');
						}
					}
				});
				this.addElementHandler(item, this.__generateTemplateHandler);
			}
		},
		"bindinspector-viewmodeldetail": "bindinspector-viewmodeldetail",
		"bindinspector-container": "bindinspector-container",
		"window": "sc-window",
		"splitbutton": "splitbutton",
		"cycle": "cycle",
		"buttongroup": "buttongroup",
		"viewport": "viewport",
		"flash": "flash",
		"textareafield": {
			behaviors : ['field'],
			tagName : "sc-textarea-field",
			handler : function(item, view){
				
			}
		},
		"textarea": {
			behaviors : ['field'],
			tagName : "sc-textarea-field",
			handler : function(item, view){
				
			}
		},
		"messagebox": "sc-messagebox",
		"fieldcontainer": {
			tagName : "div",
			handler : function(item, view){
				this.addComment(item, '다음 div는 변환 전 fieldcontainer 였습니다.',true);
				if(item.layout && (item.layout.type ==='table' || item.layout ==='table') && item.layout.columns === 3){
					if(item.items && item.items.length === 3){
						var items = item.items;
						if(items[0].xtype === 'datefield' && items[2].xtype === 'datefield'){
							
							items[0].__$$addElToComment = true;
							items[1].__$$addElToComment = true;
							items[2].__$$addElToComment = true;
							delete item.layout.type;
							
							var periodDateField = {
								__$tagName : 'sc-period-date-field'
							};
							var fromDate = items[0];
							var toDate = items[2];
							

							if(fromDate.__$value){
								periodDateField['__$from-value'] = fromDate.__$value;
							}
							if(toDate.__$value){
								periodDateField['__$to-value'] = toDate.__$value;
							}
							
							this.addComment(periodDateField, '상단의 datefield 들이 sc-period-date-field로 변경 되었습니다.',true);
							this.addComment(periodDateField, '혹시라도 id나 reference로 datefield에 직접 접근하는 로직이 있거나',true);
							this.addComment(periodDateField, '이벤트 리스너로 처리하는 로직이 있다면 변경해주세요.',true);
							items.push(periodDateField);
							
						}
					}
				}
			}
		},
		"checkboxgroup": "checkboxgroup",
		"fieldset": {
			tagName : "div",
			handler : function(item, view){
				this.addComment(item, '다음 div는 변환 전 fieldset이였었습니다.',true);
			}
		},
		"label": {
			tagName : "sc-label",
			propertyToAttributeMap : {
				'text' : 'text'
			},
			handler : function(item, view){
				/*
				if(item.html){
					item.__$tagName = 'div';
					this.setAttribute(item, 'innerHTML',item.html);
					delete item.html;
					this.removeAttribute(item, item.html);
				}
				*/
			}
		},
		"form": {
			behaviors : ['docked', 'listener'],
			propertyToAttributeMap : {
				title : 'title-text'
			},
			handler : function(item, view){
				var tagName = '';
				if(item.ui === 'search'){
					tagName = item.__$tagName = 'cc-search-container';
					this.addComment(item, '다음 cc-search-container에서 Search 버튼 클릭 시 수행 될 on-search에 들어갈 함수를 추가해 주세요 on-search=""',true);
					if(item._origItems == null || (CUT.isArray(item._origItems) && item._origItems.length === 0)){
						item.__$$addElToComment = true;
					}
					
				}else{
					if(item.header === false){
						this.removeAttribute(item, 'title');
					}
					
					if(item.hasOwnProperty("collapsible")){
						item.__$collapsible = item.collapsible;
					}
					if(item.hasOwnProperty("collapsed")){
						item.__$collapsed = item.collapsed;
					}
					tagName = item.__$tagName = "sc-panel";
					this._processGrowContainer(item, view);
					
					if(item.layout && (item.layout ==='fit'|| item.layout.type ==='fit')){
						this.addClass(item, 'fit');
					}
				}
				this.addComment(item, '다음에 위치한 '+tagName+'는 변환전 form panel 이었습니다.',true);
				
				if(CUT.isArray(item.plugins)){
					var isAutoClearExist = false;
					for(var i =0; i< item.plugins.length; i++){
						if(item.plugins[i].ptype === 'autoClearButton'){
							isAutoClearExist = true;
							break;
						}
					}
					if(isAutoClearExist === true){
						var targets = 'sc-text-field, sc-combobox-field, sc-number-field';
						this.addComment(item, 'autoClearButton 플러그인이 감지되어 '+targets+'에 input-clear="true"를 추가하였습니다.',true);
						this.addElementHandler(item,function(el, item){
							var fields = el.querySelectorAll(targets);
							for(var i = 0; i < fields.length; i++){
								var field = fields[i];
								field.setAttribute('input-clear', true);
							}
						});
					}
				}
			}
		},
		"radiofield": {
			behaviors : ['field'],
			propertyToAttributeMap : {
				inputValue : 'input-value',
				boxLabel : 'label'
			},
			tagName : "sc-radio-field",
			handler : function(item, view){
			}
		},
		"radio": {
			behaviors : ['field'],
			tagName : "sc-radio-field",
			handler : function(item, view){
			}
		},
		"radiogroup": {
			behaviors : ['field'],
			tagName : "sc-radio-group-field",
			handler : function(item, view){
			}
		},
		"pickerfield": "sc-picker-field",
		"tbtext": {
			behaviors : [],
			propertyToAttributeMap : {
			},
			tagName : "sc-label",
			handler : function(item, view){
				this.addComment(item, '다음에 위치한 sc-label은 tbtext였었습니다.',true);
			}
		},
		"spinnerfield": {
			behaviors : ['field'],
			tagName : "spinnerfield",
			handler : function(item, view){
			}
		},
		"numberfield": {
			behaviors : ['field'],
			tagName : "sc-number-field",
			handler : function(item, view){
			}
		},
		"boundlist": "boundlist",
		"combobox": {
			behaviors : ['field'],
			tagName : "sc-combobox-field",
			propertyToAttributeMap : {
				emptyText : 'placeholder',
				store : 'items'
			},
			handler : function(item, view){
				if(item.multiSelect === true){
					item.__$tagName = 'sc-multi-combobox-field';
				}
				
				if(item.listConfig){
					if(item.listConfig.getInnerTpl){
						this.addComment(item, 'listConfig.getInnerTpl 존재 합니다 아래의 listConfig.getInnerTpl를 직접 구현해주세요.', true);
						this.addComment(item, 'listConfig.getInnerTpl : '+item.listConfig.getInnerTpl, true);
					}
				}
			}
		},
		"combo": {
			behaviors : ['field'],
			tagName : "sc-combobox-field",
			propertyToAttributeMap : {
				emptyText : 'placeholder',
				store : 'items'
			},
			handler : function(item, view){
			}
		},
		"monthpicker": "sc-monthpicker",
		"datepicker": "sc-date-chooser",
		"datefield": {
			behaviors : ['field'],
			tagName : "sc-date-field",
			handler : function(item, view){
			}
		},
		"filebutton": "filebutton",
		"filefield": "filefield",
		"fileuploadfield": {
			behaviors : ['field'],
			tagName : "sc-upload",
			handler : function(item, view){
				this.addComment(item, '다음에 위치한 sc-upload는 변환전 fileuploadfield 이었습니다.',true);
			}
		},
		"hiddenfield": {
			defaultAttributes : {
				'hidden' : true
			},
			behaviors : ['field'],
			tagName : "sc-text-field",
			handler : function(item, view){
			}
		},
		"hidden": "hidden",
		"colorpicker": "sc-colorpicker",
		"htmleditor": {
			behaviors : ['field'],
			tagName : "cc-editor",
			handler : function(item, view){
				this.addComment(item, '다음에 위치한 cc-editor는 변환전 htmleditor 이었습니다.',true);
			}
		},
		"namowebeditor" : {
			behaviors : ['field'],
			tagName : "cc-editor",
			handler : function(item, view){
				this.addComment(item, '다음에 위치한 cc-editor는 변환전 namowebeditor 이었습니다.',true);
			}
		},
		"timepicker": "sc-time-picker",
		"timefield": "sc-time-field",
		"triggerfield": {
			behaviors : ['field'],
			tagName : "sc-trigger-field",
			handler : function(item, view){
			}
		},
		"trigger": "sc-trigger",
		"roweditorbuttons": "roweditorbuttons",
		"roweditor": "roweditor",
		"actioncolumn": {
			behaviors : ['actionColumn', 'column'],
			tagName : "sc-image-column",
			handler : function(item, view){
			}
		},
		"booleancolumn": {
			behaviors : ['column'],
			tagName : "sc-data-column",
			handler : function(item, view){
				this.addComment(item, '다음에 위치한 sc-data-column은 변환전 booleancolumn 이었습니다.',true);
			}
		},
		"checkcolumn": {
			behaviors : ['column'],
			tagName : "sc-checkbox-column",
			handler :function(item, view){
			}
		},
		"datecolumn": {
			behaviors : ['column'],
			tagName : "sc-date-column",
			handler : function(item, view){
			}
		},
		"numbercolumn": {
			behaviors : ['column'],
			defaultAttributes : {
				'data-type' : 'number'
			},
			tagName : "sc-data-column",
			handler : function(item, view){
			}
		},
		"rownumberer": "rownumberer",
		"templatecolumn": {
			behaviors : ['column'],
			tagName : "templatecolumn",
			handler : function(item, view){
			}
		},
		"widgetcolumn": {
			behaviors : ['column'],
			tagName : "widgetcolumn",
			handler : function(item, view){
			}
		},
		"menuitem": "menuitem",
		"menucheckitem": "menucheckitem",
		"menuseparator": "menuseparator",
		"menu": "menu",
		"propertygrid": "propertygrid",
		"colormenu": "colormenu",
		"datemenu": "datemenu",
		"slidertip": "slidertip",
		"multislider": "multislider",
		"slider": "slider",
		"sliderfield": "sliderfield",
		"sliderwidget": "sliderwidget",
		"sparklinebar": "sparklinebar",
		"sparklinebox": "sparklinebox",
		"sparklinebullet": "sparklinebullet",
		"sparklinediscrete": "sparklinediscrete",
		"sparklineline": "sparklineline",
		"sparklinepie": "sparklinepie",
		"sparklinetristate": "sparklinetristate",
		"tbspacer": "sc-spacer",
		"etnaattachmentfield": {
			tagName : "sc-upload",
			behaviors : [],
			handler :function(item, view){
				if(!this.getStyle(item,'height')){
					this.addStyle(item, 'height', '200px');
				}
			}
		},
		"etnacurrencyfield": {
			behaviors : ['field'],
			tagName : "sc-number-field",
			handler :function(item, view){
				var currencyComment;
				this.addComment(item,'다음에 위치한 필드는 currencyfield 입니다 currency에 맞게 field format을 지정해 주시길 바랍니다.', true);
				if(item.currency){
					currencyComment =  'currency값은 "'+item.currency+'" 입니다.';
				}else if(item.bind && item.bind.currency){
					var currencyVal = item.bind.currency;
					currencyVal = CUT.replaceAll(currencyVal,'{','');
					currencyVal = CUT.replaceAll(currencyVal,'}','');
					currencyComment =  'currency에 바인딩된 프로퍼티는 "'+currencyVal+'" 입니다.';
				}
				
				if(currencyComment){
					this.addComment(item, currencyComment,true);
				}
			} 
		},
		"etnamonthfield": {
			behaviors : ['field'],
			tagName : "sc-month-field",
			handler : function(item, view){
			}
		},
		"etnamultilinefield": "etnamultilinefield",
		"etnatogglefield": "etnatogglefield",
		"etnaattachmentcolumn": {
			behaviors : ['column'],
			tagName : "sc-attachment-column",
			handler : function(item, view){
			}
		},
		"etnacurrencycolumn": {
			behaviors : ['column'],
			propertyToAttributeMap : {
				currency : 'currency'
			},
			tagName : "sc-data-column",
			defaultAttributes : {
				'data-type' : 'number'
			},
			handler : function(item, view){
				this.addComment(item,'다음에 위치한 컬럼은 currencycolumn 입니다 currency에 맞게 컬럼을 구성해 주시길 바랍니다.');
			}
		},
		"etnadataactioncolumn": {
			behaviors : ['dataActionColumn', 'column'],
			handler : function(item, view){
			}
		},
		"etnaeliminatecolumn": {
			behaviors : ['column'],
			tagName : "sc-eliminate-column",
			handler : function(item, view){
				this.addComment(item, 'elminated 컬럼에 대한 로직을 구성해 주시길 바랍니다.',true);
				item.__$$addElToComment = true;
			}
		},
		"etnastatuscolumn": {
			behaviors : ['column'],
			tagName : "sc-status-column",
			handler : function(item, view){
				item.__$$addElToComment = true;
			}
		},
		"etnastorecolumn": {
			behaviors : ['column'],
			tagName : "sc-combobox-column",
			propertyToAttributeMap : {
				store : 'items',
				valueField : 'value-field',
				displayField : 'display-field'
			},
			handler : function(item, view){
				
			}
		},
		"etnafilter": "etnafilter",
		"etnagridstatefului": "etnagridstatefului",
		"etnauploader": "etnauploader",
		"importui": "importui",
		"broaddatepicker": "broaddatepicker",
		"etnatreefindertoolbar": "etnatreefindertoolbar",
		"etnatreeactioncolumn": {
			behaviors : ['dataActionColumn', 'column'],
			handler : function(item, view){
			}
		},
		"etnadataviewuploader": "etnadataviewuploader",
		"etnagriduploader": "etnagriduploader",
		"etnastorebaseduploader": "etnastorebaseduploader",
		"etnasearchfield": "etnasearchfield",
		"etnathumbnail": "etnathumbnail"
	};
	
	var xtypeToClassNameMap = {
		"component": "Ext.view.AbstractView",
		"box": "Ext.view.AbstractView",
		"container": "Ext.container.Container",
		"widget": "Ext.sparkline.BarBase",
		"field": "Ext.form.field.Base",
		"splitter": "Ext.resizer.Splitter",
		"gridcolumn": "Ext.grid.column.Column",
		"headercontainer": "Ext.grid.header.Container",
		"image": "Ext.Img",
		"imagecomponent": "Ext.Img",
		"loadmask": "Ext.LoadMask",
		"progressbar": "Ext.ProgressBar",
		"progressbarwidget": "Ext.ProgressBarWidget",
		"tbfill": "Ext.toolbar.Fill",
		"tbitem": "Ext.toolbar.Item",
		"tbseparator": "Ext.toolbar.Separator",
		"button": "Ext.button.Button",
		"toolbar": "Ext.toolbar.Toolbar",
		"panel": "Ext.panel.Panel",
		"tip": "Ext.tip.Tip",
		"tooltip": "Ext.tip.ToolTip",
		"quicktip": "Ext.tip.QuickTip",
		"displayfield": "Ext.form.field.Display",
		"tablepanel": "Ext.panel.Table",
		"dataview": "Ext.view.View",
		"tableview": "Ext.view.Table",
		"gridview": "Ext.grid.View",
		"gridpanel": "Ext.grid.Panel",
		"grid": "Ext.grid.Panel",
		"checkboxfield": "Ext.form.field.Checkbox",
		"checkbox": "Ext.form.field.Checkbox",
		"bindinspector-componentdetail": "Ext.app.bindinspector.ComponentDetail",
		"treeview": "Ext.tree.View",
		"treecolumn": "Ext.tree.Column",
		"treepanel": "Ext.tree.Panel",
		"textfield": "Ext.form.field.Text",
		"bindinspector-componentlist": "Ext.app.bindinspector.ComponentList",
		"bordersplitter": "Ext.resizer.BorderSplitter",
		"tab": "Ext.tab.Tab",
		"tabpanel": "Ext.tab.Panel",
		"bindinspector-viewmodeldetail": "Ext.app.bindinspector.ViewModelDetail",
		"bindinspector-container": "Ext.app.bindinspector.Container",
		"window": "Ext.window.Window",
		"splitbutton": "Ext.button.Split",
		"cycle": "Ext.button.Cycle",
		"buttongroup": "Ext.container.ButtonGroup",
		"viewport": "Ext.container.Viewport",
		"flash": "Ext.flash.Component",
		"textareafield": "Ext.form.field.TextArea",
		"textarea": "Ext.form.field.TextArea",
		"messagebox": "Ext.window.MessageBox",
		"fieldcontainer": "Ext.form.FieldContainer",
		"checkboxgroup": "Ext.form.CheckboxGroup",
		"fieldset": "Ext.form.FieldSet",
		"label": "Ext.form.Label",
		"form": "Ext.form.Panel",
		"radiofield": "Ext.form.field.Radio",
		"radio": "Ext.form.field.Radio",
		"radiogroup": "Ext.form.RadioGroup",
		"pickerfield": "Ext.form.field.Picker",
		"tbtext": "Ext.toolbar.TextItem",
		"spinnerfield": "Ext.form.field.Spinner",
		"numberfield": "Ext.form.field.Number",
		"boundlist": "Ext.view.BoundList",
		"combobox": "Ext.form.field.ComboBox",
		"combo": "Ext.form.field.ComboBox",
		"monthpicker": "Ext.picker.Month",
		"datepicker": "Ext.picker.Date",
		"datefield": "Ext.form.field.Date",
		"filebutton": "Ext.form.field.FileButton",
		"filefield": "Ext.form.field.File",
		"fileuploadfield": "Ext.form.field.File",
		"hiddenfield": "Ext.form.field.Hidden",
		"hidden": "Ext.form.field.Hidden",
		"colorpicker": "Ext.picker.Color",
		"htmleditor": "Ext.form.field.HtmlEditor",
		"timepicker": "Ext.picker.Time",
		"timefield": "Ext.form.field.Time",
		"triggerfield": "Ext.form.field.Trigger",
		"trigger": "Ext.form.field.Trigger",
		"roweditorbuttons": "Ext.grid.RowEditorButtons",
		"roweditor": "Ext.grid.RowEditor",
		"actioncolumn": "Ext.grid.column.Action",
		"booleancolumn": "Ext.grid.column.Boolean",
		"checkcolumn": "Ext.grid.column.Check",
		"datecolumn": "Ext.grid.column.Date",
		"numbercolumn": "Ext.grid.column.Number",
		"rownumberer": "Ext.grid.column.RowNumberer",
		"templatecolumn": "Ext.grid.column.Template",
		"widgetcolumn": "Ext.grid.column.Widget",
		"menuitem": "Ext.menu.Item",
		"menucheckitem": "Ext.menu.CheckItem",
		"menuseparator": "Ext.menu.Separator",
		"menu": "Ext.menu.Menu",
		"propertygrid": "Ext.grid.property.Grid",
		"colormenu": "Ext.menu.ColorPicker",
		"datemenu": "Ext.menu.DatePicker",
		"slidertip": "Ext.slider.Tip",
		"multislider": "Ext.slider.Multi",
		"slider": "Ext.slider.Single",
		"sliderfield": "Ext.slider.Single",
		"sliderwidget": "Ext.slider.Widget",
		"sparklinebar": "Ext.sparkline.Bar",
		"sparklinebox": "Ext.sparkline.Box",
		"sparklinebullet": "Ext.sparkline.Bullet",
		"sparklinediscrete": "Ext.sparkline.Discrete",
		"sparklineline": "Ext.sparkline.Line",
		"sparklinepie": "Ext.sparkline.Pie",
		"sparklinetristate": "Ext.sparkline.TriState",
		"tbspacer": "Ext.toolbar.Spacer",
		"etnaattachmentfield": "Etna.form.field.Attachment",
		"etnacurrencyfield": "Etna.form.field.Currency",
		"etnamonthfield": "Etna.form.field.Month",
		"etnamultilinefield": "Etna.form.field.MultiLine",
		"etnatogglefield": "Etna.form.field.Toggle",
		"etnaattachmentcolumn": "Etna.grid.column.Attachment",
		"etnacurrencycolumn": "Etna.grid.column.Currency",
		"etnadataactioncolumn": "Etna.grid.column.DataActionColumn",
		"etnaeliminatecolumn": "Etna.grid.column.Eliminate",
		"etnastatuscolumn": "Etna.grid.column.Status",
		"etnastorecolumn": "Etna.grid.column.Store",
		"etnafilter": "Etna.grid.plugin.ui.Filter",
		"etnagridstatefului": "Etna.grid.plugin.ui.Stateful",
		"etnauploader": "Etna.upload.Uploader",
		"importui": "Etna.grid.plugin.ui.Import",
		"broaddatepicker": "Etna.picker.BroadDate",
		"etnatreefindertoolbar": "Etna.toolbar.TreeFinder",
		"etnatreeactioncolumn": "Etna.tree.TreeActionColumn",
		"etnadataviewuploader": "Etna.upload.ui.DataView",
		"etnagriduploader": "Etna.upload.ui.Grid",
		"etnastorebaseduploader": "Etna.upload.StoreBasedUploader",
		"etnasearchfield": "Etna.ux.form.SearchField",
		"etnathumbnail": "Etna.view.Thumbnail"
	};
	
		/**
		 * template 정의 (ejs)
		 */ 
		var template = "<%= link %>"
			+"\n"
			+"\n<!--"
			+"\n <%= moduleComments %>"
			+"\n-->"
			+"\n<dom-module id=\"<%= domName %>\">"
			+"\n	"
			+"\n	<style>" 
			+"\n		:host {"
			+"\n			@apply(<%= layout %>);"
			+"\n		}"
			+"\n	</style>"
			+"\n	"
			+"\n	"
			+"\n<%= htmlText %>"
			+"\n	"
			+"\n	"
			+"\n	<script>"
			+"\n		Polymer({"
			+"\n			is: \"<%= domName %>\","
			+"\n			// 8.0 -> 9.1 솔루션 컨버팅 시 properties에 들어가는 요소들은 viewmodel의 store, data 입니다 data에 Date 타입이 존재할 경우 값이 비정상적으로 변환 될 수 있으니 원본소스를 확인 바랍니다."
			+"\n			properties: { <%= propertyText %> },"
			+"\n			// 8.0 솔루션 소스에서 모듈 자체에 달려있는 이벤트 리스너 입니다. 적절한 시점에 해당 로직을 호출 하도록 변경해 주시길 바랍니다."
			+"\n			listeners: <%= listenersText %>,"
			+"\n			// 9.1 솔루션의 formula는 꼭 applyFormula 함수를 호출해야지만 formula 바인딩이 적용됩니다. (8.0은 자동으로 formula 적용)"
			+"\n			formulas: { <%= formulasText %> },"
			+"\n			<%= scriptText %>"
			+"\n		});"
			+"\n	</script>"
			+"\n	"
			+"\n</dom-module>";
		

		var ModuleResolver = {
			__moduleUppercasePatterns : {
				'PR' : 'Pr',
				'PO' : 'po',
				'GR' : 'Gr',
				'RFQ' : 'Rfq',
				'RFX' : 'Rfx'
			},
			__isUpperCase : function(word){
				return !!word.match(new RegExp(/[A-Z]/));
			},
			upperCaseToDecimal : function(name){
				var result = '';
				for(var i=0; i < name.length; i++){
					var ch = name.charAt(i);
					result += (this.__isUpperCase(ch) ? ('-' + ch.toLowerCase()) : ch);
				}
				return result;
			},
			_generateModuleNameByClassName : function(className){
				var paths = className.split('.');
				var lastName = paths[paths.length-1];
				for(var pKey in this.__moduleUppercasePatterns){
					lastName = CUT.replaceAll(lastName, pKey, this.__moduleUppercasePatterns[pKey]);
				}
				
				var result = this.upperCaseToDecimal(lastName); 
				if(!result.startsWith('-')){
					result = '-' + result;
				}
				return result;
			},
			
			_backUpOrigItems : function(target){
				
				
				if(CUT.isArray(target.items)){
					for(var i= 0;i < target.items.length; i++){
						arguments.callee.call(this, target.items[i]);
					}

					target._origItems = target.items.slice(); 
				}
				
			},
			
			_removeTranslateTexts : function(target){
				var startWith = '#{',
					endWith = '}';
				
				
				if(CUT.isString(target) && CUT.startsWith(target,startWith) && CUT.endsWith(target,endWith)){
					target = target.substr(startWith.length);
			        return target.substr(0, target.length - endWith.length);
				}else if(CUT.isArray(target)){
					for(var i =0; i < target.length;i++){
						target[i] = arguments.callee.call(this,target[i]);
					}
					
				}else if(CUT.isObject(target)){
					//재귀 호출 방지
					if(target.___translating === true){
						return target;
					}
					target.___translating = true;
					for(var key in target){
						target[key] = arguments.callee.call(this,target[key]);
					}
					delete target.___translating;
				}
				
				return target;
			},
			
			_resolveModuleHTML : function(item, view){
				if(item.html){
					var htmlDiv = this.createElementMeta('div');
					item.items = [htmlDiv];
					this.setAttribute(htmlDiv, 'innerHTML','<div class="module-html">'+item.html+'</div>');
				}
			},
			
			_resolveModuleDockedItems : function(item, view){
				if(!CUT.isArray(item.dockedItems)){
					return;
				}
				var topDockedItems = [];
				
				var bottomDockedItems = [];
				
				//left right dockeditems의 경우 현재 8.0 개발패턴에 존재하지 않아 별도로 로직 추가하지 않음
				
				var toolbarItems = [];
				for(var i =0;item.dockedItems && i < item.dockedItems.length ; i++){
					var docked = item.dockedItems[i];
					
					if(docked.dock === 'top'){
						topDockedItems.push(docked);
					}else if(docked.dock === 'bottom'){
						bottomDockedItems.push(docked);
					}
					
					this._configurateItemByXtype(docked, view);
				}
				
				var topContainer = this.createElementMeta('div', {}, topDockedItems);
				this.addClass(topContainer, 'top-docked');
				
				
				this.addElementHandler(topContainer,function(el, item){
					var moduleEl = el.parent();
					var pageTitleBar = moduleEl.querySelectorAll('cc-page-title-bar')[0];
					if(pageTitleBar){
						var childs = el.getChildElements();
						
						for(var i =0 ; i< childs.length; i++){
							var child = childs[i];
							if(child.localName() === 'sc-toolbar'){
								var toolbar = childs[i];
								var toolbarChilds = toolbar.getChildElements();
								var toolbarElCounts = 0;
								for(var j = 0; j < toolbarChilds.length; j++){
									var toolbarChildTagName = toolbarChilds[j].localName();
									if(toolbarChildTagName === 'sc-button'){
										var button = toolbarChilds[j];
										button.remove();
										pageTitleBar.appendChild(button);
									}else if(toolbarChildTagName !== 'sc-spacer'){
										toolbarElCounts++;
									}
								}
								
								if(toolbarElCounts === 0){
									toolbar.remove();
								}
							}
						}
					}
				});
				
				var contentsContainer = this.createElementMeta('div', {}, item.items);
				if(item.layout === 'hbox' || item.layout === 'vbox' || item.layout === 'border' || (item.layout && (item.layout.type === 'vbox' || item.layout.type === 'hbox' || item.layout.type === 'border'))){
					this.addFlexToItem(contentsContainer, 1, true);
				}
				this.addClass(contentsContainer, 'contents-container');
				contentsContainer.layout = item.layout;
				contentsContainer.column = item.column;
				if(item.layout && (item.layout === 'fit' || item.layout.type === 'fit' || item.layout === 'card' || item.layout.type === 'card')){
					this.addClass(contentsContainer, 'fit');
				}
				
				delete item.column;
				delete item.layout;
				

				var bottomContainer = this.createElementMeta('div', {}, bottomDockedItems);
				this.addClass(bottomContainer, 'bottom-docked');
				
				
				item.items = [];
				
				if(CUT.isArray(contentsContainer.items) && contentsContainer.items.length > 0 ){
					item.items = [contentsContainer];
					
				}
				
				if(topDockedItems.length > 0){
					item.items.unshift(topContainer);
					
				}
				
				if(bottomDockedItems.length > 0){
					item.items.push(bottomContainer);
					
				}
				
				/*
				if(CUT.isArray(item.dockedItems)){
					var toolbarItems = [];
					for(var i =0;item.dockedItems && i < item.dockedItems.length ; i++){
						var docked = item.dockedItems[i];
						if(docked.xtype === 'toolbar' && CUT.isArray(docked.items)){
							toolbarItems = toolbarItems.concat(docked.items);
						}
					}
					var toolbar = {
							__$tagName : 'sc-toolbar',
						items : toolbarItems
					};
					
					if(CUT.isArray(item.items)){
						item.items.unshift(toolbar);
					}else{
						item.items = [toolbar]; 
					}
					
				}
				*/
			},
			
			_resolveModuleTitle : function(config, view){
				if(CUT.isString(config.title)){
					var pagetitleBar = {
						__$tagName : 'cc-page-title-bar',
						'__$page-title' : config.title
					};
					if(CUT.isArray(config.items)){
						config.items.unshift(pagetitleBar);
						
					}else{
						config.items = [pagetitleBar];
					}
					
				}
			},
			
			__resolveClassPathes : function(classPath){
				
				if(!CUT.isString(classPath)){
					return;
				}
				
				var names = classPath.split('.view.');
				var rootModuleName = names[0];
				var modulePath = names[1];
				var viewClassPathes = modulePath.split('.');
				var className = viewClassPathes.pop();
				
				return {
					path : viewClassPathes,
					root : rootModuleName,
					className : className
				};
			},
			
			__makeLinkStr : function(path){
				var link = docs.createElement('sc-link');
				link.setAttribute('rel', 'import');
				link.setAttribute('href', path);
				return link.toXMLString();
			},
			
			
			_isPopupClass : function(className){
				if(CUT.isString(className) && className.indexOf('Popup') >= 0 ){
					return true;
				}else{
					return false;
				}
			},
			
			_isPopupXtype : function(xtype){
				if(CUT.isString(xtype) && xtype.indexOf('popup') >= 0 ){
					return true;
				}else{
					return false;
				}
			},
			
			_resolveExternalResources : function(view){
				var linkStr = '';
				var requiredInfos = [];
				
				var moduleInfo = this.__resolveClassPathes(view.className);
				
				if(!moduleInfo){
					return '';
				}
				
				var required = CUT.isArray(view.config.fixedRequires) ? view.config.fixedRequires.slice() : [];
				
				for(var i = 0; i < required.length; i++){
					var requiredInfo = this.__resolveClassPathes(required[i]);
					
					if(requiredInfo && requiredInfo.root === moduleInfo.root){
						
						var modulePath = moduleInfo.path;
						var requiredPath = requiredInfo.path;
						var moduleLevel = modulePath.length;
						var requiredLevel = requiredPath.length;
						var matchCount = 0;
						
						for(var j = 0; j < moduleLevel && j < requiredLevel; j++){
							if(modulePath[j] === requiredPath[j]){
								matchCount++;
							}else{
								break;
							}
						}
						
						var modulePreFix = (this._isPopupClass(requiredInfo.className) ? 'ep' : 'es'); 
						
						if(matchCount === moduleLevel){
							var additionalPathes = requiredPath.slice(matchCount);
							var additionalPathesStr = additionalPathes.join('/');
							if(additionalPathes.length > 0){
								additionalPathesStr = additionalPathesStr+'/';
							}
							linkStr += this.__makeLinkStr('./'+ additionalPathesStr + modulePreFix + this._generateModuleNameByClassName(requiredInfo.className)+'.html');
						}else{
							var additionalPathes = requiredPath.slice(matchCount);
							var resultPath = '';
							
							for(var mi = matchCount; mi < moduleLevel; mi++){
								resultPath += '../';
							}
							linkStr += this.__makeLinkStr(resultPath + additionalPathes.join('/') + '/' + modulePreFix + this._generateModuleNameByClassName(requiredInfo.className)+'.html');
						}
						
						
					}
				}
				
				return linkStr;
			},
			
			_processHTMLStr : function(htmlText){
				htmlText = CUT.replaceAll(htmlText, '_%slash_%', '/');
				htmlText = CUT.replaceAll(htmlText, '_%left_parenthesis%_', '(');
				htmlText = CUT.replaceAll(htmlText, '_%right_parenthesis%_', ')');
				
				return htmlText;
			},
			
			resolve : function(view, moduleName){
				
				moduleName = moduleName ? moduleName : (this._isPopupClass(view.className) ? 'ep' : 'es')+this._generateModuleNameByClassName(view.className);
				var config = view.config;
				var co = view.controller;
				var vm = view.viewmodel;
				var htmlText = '';
				var link = '';
				var scriptText = '';
				var layout = '';
				var propertyText = '';
				var listenersText = '';
				var formulasText = '';
				
				//view의 설정 초기화 함수를 수행한다.(initConfig 같은 config를 Process 하는 함수)
				this._handleConfigFns(view);
				
				//view에서 참조하고 있는 다른 view에대한 정보를 가져와 sc-link태그 문자열로 생성한다.
				link = this._resolveExternalResources(view);
				view.isModuleRoot = true;
				
				//#{로 시작하고 }로 끝나는 번역 형태의 문자열을 모두 제거한다.
				this._removeTranslateTexts(view);
				
				
				this._backUpOrigItems(view.config);

				this._resolveModuleHTML(view.config, view);
				
				// view의 DockItem들에 대한 메타데이터를 생성한다.
				this._resolveModuleDockedItems(view.config, view);
				
				// view의 item에 대한 메타데이터를 생성한다.
				this._configurateItemByXtype(view.config, view);
				
				// view하위의 item을 탐색하며 Layout에대한 메타데이터를 생성한다.
				this._configurateItemByLayout(view.config);
				
				// viewmodel에 있는 store를 기준으로 sc-ajax들을 생성한다.
				var storeEls = this._configurateStores(view, vm);
				if(view.config && view.config.items){
					view.config.items = storeEls.concat(view.config.items);
				}
				
				// viewmodel에 있는 data와 store를 기준으로 properties문자열을 생성한다.
				propertyText = this._generateProperties(vm);
				// 현재 module에 달려있는 이벤트 리스너에 대해 문자열을 생성한다.
				listenersText = this._generateModuleListener(view.config.listeners);
				
				this._resolveModuleTitle(view.config, view);
				
				
				// 생성된 json형태의 메타데이터를 xml형태(html)로 변환한다.
				var rootEl = docs.createElement('template');
				this._JSONToXML(rootEl, view.config.items, view);
				
				// 현재 module에 layout을 기준으로 적용할 스타일 문자열을 생성한다.
				layout = this._generateLayout(view.config, rootEl);
				
				
				htmlText = rootEl.toXMLString();
				htmlText = this._processHTMLStr(htmlText);
				
				// view, viewmodel, viewcontroller에 설정된 모든 함수들을 문자열로 생성한다.
				scriptText = this._generateFunctions(view);
				
				// viewmodel에 있는 formulas를 기준으로 formulas 문자열을 생성한다.
				formulasText = this._generateFormula(vm);
				
				var moduleComments = '"'+view.className +'"가 "'+moduleName+'" 으로 컨버팅 되었습니다.';
				resultText = new EJS({file:template}).render({
					moduleComments : moduleComments,
					domName: moduleName,
					link: link,
					htmlText: htmlText, 
					scriptText: scriptText,
					propertyText : propertyText,
					listenersText : listenersText,
					formulasText : formulasText,
					layout : layout
				});
				
				resultText = html_beautify(resultText);
				
				/*
				 * 결과 정보를 리턴한다.
				 * className : view의 원본 클래스명
				 * moduleName : view의 클래스 명에 따라 생성된 모듈 명
				 * path : view가 위치해야하는 경로
				 * html : 변환 결과
				 */
				var result = {
					className : view.className,
					moduleName : moduleName,
					path : this._getModulePath(view.className),
					html : resultText,
					rootName : view.className.split('.')[0]
				};
				
				
				return result;
				
			},
			
			_getModulePath : function(className){
				var classNames = className.split(".view.");
				var lastName = classNames[1];
				
				var paths = lastName.split(".");
				paths.pop();
				
				return (paths.join("\\")+"\\");
			},
			_processGrowContainer : function(item, view){
				if(!item.hasOwnProperty('height') && !item.hasOwnProperty('minHeight') && !item.hasOwnProperty('flex')){
					var parentItem = this.findParent(view, item);
					if(!(parentItem && parentItem.layout && (parentItem.layout === 'fit' || parentItem.layout.type === 'fit' || parentItem.layout ==='card' || parentItem.layout.type ==='card'))){
						this.addElementHandler(item,function(el, item, view){
							el.addClass('grow');
							el.removeClass('fit');
						});
					}
					
				}
			},
			
			getStyle : function(item, styleName){
				if(!item.__$style){
					return;
				}else{
					return item.__$style[styleName];
				}
				
			},
			
			createElementMeta : function(tagName, attributes, items){
				var tag = {
					__$tagName : tagName	
				};
				if(CUT.isObject(attributes)){
					for(var key in attributes){
						this.setAttribute(tag, key, attributes[key]);
					}
				}
				if(CUT.isArray(items)){
					tag.items = items;
				}
				return tag;
			},
			
			setAttribute : function(item, attrName, value){
				if(CUT.isObject(item)){
					item['__$'+attrName] = value;
				}
			},
			
			getAttribute : function(item, attrName){
				if(CUT.isObject(item)){
					return item['__$'+attrName];
				}
			},
			
			removeAttribute : function(item, attrName, removeWithProperty){
				if(CUT.isObject(item)){
					delete item['__$'+attrName];
					if(removeWithProperty === true){
						delete item[attrName];
					}
					
				}
			},
			
			addStyle : function(item, styleName, value){
				if(!item.__$style){
					item.__$style = {};
				}
				item.__$style[styleName] = value;
			},
			
			removeStyle : function(item, styleName){
				if(!item.__$style){
					return;
				}else{
					delete item.__$style[styleName];
				}
			},
			
			addClass : function(item, className){
				if(!item.__$class){
					item.__$class = [];
				}
				item.__$class.push(className);
			},
			
			removeClass : function(item, className){
				if(!item.__$class){
					return
				}else if (CUT.isArray(item.__$class)){
					for(var i = 0;i < item.__$class.length; i++){
						if(item.__$class[i] === className){
							item.__$class.splice(i,1);
						}
					}
					
					if(item.__$class.length === 0){
						delete item.__$class;
					}
				}
				
			},
			
			addElementHandler : function(item, handler){
				if(!CUT.isFunction(handler)){
					return ;
				}
				
				if(!item.__$elementHandlers){
					item.__$elementHandlers = [];
				}
				
				
				item.__$elementHandlers.push(handler);
			},
			
			addComment : function(item, comment, newLine){
				if(!item.__$$comment){
					item.__$$comment = '';
				}else{
					if(newLine === true){
						item.__$$comment += '\n';
					}
				}
				
				item.__$$comment += comment;
			},
			
			configFnNames : ['initConfig'],
			
			_isConfigFnName : function(name){
				for(var i =0; i < this.configFnNames.length; i++){
					if(this.configFnNames[i] === name){
						return true;
					}
				}
				return false;
			},
			
			_handleConfigFns : function(view){
				var fakeConfigurator = {
					getConfigurator : function(){
						return {
							merge : function(me, config, instanceConfig){
								view.config = CUT.mixin(config, instanceConfig);
							}
						};
					},
					callParent : function(){
						
					}
				};
				for(var key in view.config){
					fakeConfigurator[key] = view.config[key];
				}
				
				for(var key in view.config){
					if(CUT.isFunction(view.config[key]) && this._isConfigFnName(key)){
						view.config[key].call(fakeConfigurator,view.config);
						
						delete view.config[key];
					}
				}
				
			},
			
			_generateModuleListener : function(listners){
				if(listners){
					return JSON.stringify(listners);
				}else{
					return '{}';
				}
			},
			
			__generateFunctionStr : function(prop, fn, throwError, comment){
				var functionStr = '';
				var fnStr = fn.toString();
				fnStr = CUT.replaceAll(fnStr, '/*','');
				fnStr = CUT.replaceAll(fnStr, '*/','');
				fnStr = CUT.replaceAll(fnStr, '//','');
				var splitArr = fnStr.split('{');
				if(comment){
					functionStr +=('\n/*'+comment+'*/'+'\n');
				}
				
				functionStr += prop + ": ";
                functionStr += splitArr[0] + "{/*" + '\n';
                //functionStr += 'console.warn("['+prop+'] 함수는 변환작업이 필요 합니다.");' + '\n';
                if(throwError === true){
                	functionStr += 'throw new Error("['+prop+'] 함수가 변환작업이 되지 않은 상태로 실행 되었습니다.");' + '\n';
                }else{
                	//functionStr += 'return false;' + '\n';
                }
                
                functionStr += splitArr.slice(1).join('{');
                var splitArr2 = functionStr.split('}');
                functionStr = splitArr2.slice(0, splitArr2.length-1).join('}')+'*/}';
                functionStr += ',\n';
                
                return functionStr;
			},
			
			
			_configuratePlugins : function(item, view){
				
			},
			
			__resolveComponent : function(item, view, componentInfo){
				if(item.__resolved__ === true){
					return;
				}
				
				if(!componentInfo){
					return;
				}
				
				
				if(CUT.isString(componentInfo)){
					item.__$tagName = componentInfo;
					//console.warn(item,'은 매핑정보가 상세히 기재 되지 않았습니다.(문자열)');
				}else if(CUT.isObject(componentInfo)){
					if(componentInfo.ignoreBase !== true){
						componentInfo = CUT.clone(componentInfo);
						if(!CUT.isArray(componentInfo.behaviors)){
							componentInfo.behaviors = [];
							
						}
						componentInfo.behaviors.unshift('base');
					}
					
					if(CUT.isArray(componentInfo.behaviors)){
						this.__resolveComponentByBehaviorChain.apply(this,arguments);
					}else{
						if(CUT.isString(componentInfo.tagName)){
							item.__$tagName = componentInfo.tagName;
						}
						
						if(CUT.isObject(componentInfo.defaultAttributes)){
							for(var key in componentInfo.defaultAttributes){
								item['__$'+key] = componentInfo.defaultAttributes[key];
							}
						}
						
						if(CUT.isObject(componentInfo.propertyToAttributeMap)){
							
							for(var key in item){
								var attrName;
								var value = item[key];
								if(CUT.isArray(value) || CUT.isDate(value) || CUT.isObject(value) || CUT.startsWith(key, '__$') || key === 'xtype' || key === 'xclass' || key === 'bind'){
									continue;
								}
								
								if(componentInfo.propertyToAttributeMap.hasOwnProperty(key)){
									attrName = componentInfo.propertyToAttributeMap[key];
									if(CUT.startsWith(attrName,'!')){
										attrName = attrName.replace('!',''); 
										value = !value;
									}
								}else{
									attrName = key;
								}
								
								if(attrName !== 'REMOVE' && attrName !== 'class' && attrName !== 'style' && attrName !== '__resolved__'){
									var attrName = this.upperCaseToDecimal(attrName);
									if(attrName.charAt(0) === '-'){
										attrName = attrName.substr(1);
									}
									item['__$'+attrName] = value;
								}
								
							}
							if(CUT.isObject(item.bind)){
								for(var key in item.bind){
									var attrName;
									var value = item.bind[key];
									if(componentInfo.propertyToAttributeMap.hasOwnProperty(key)){
										attrName = componentInfo.propertyToAttributeMap[key];
										if(attrName === 'REMOVE'){
											continue;
										}
										var value = item.bind[key];
										delete item.bind[key];
										if(CUT.startsWith(attrName,'!')){
											attrName = attrName.replace('!',''); 
											value = value.replace('{','{!');
										}
										item.bind[attrName] = value;
									}else{
										attrName = key;
									}
									
									if(attrName !== 'REMOVE'){
										attrName = this.upperCaseToDecimal(attrName);
										if(attrName.charAt(0) === '-'){
											attrName = attrName.substr(1);
										}
										item.bind[attrName] = value;
									}
								}
							}
							/*
							for(var key in componentInfo.propertyToAttributeMap){
								if(item.hasOwnProperty(key)){
									var attrName = componentInfo.propertyToAttributeMap[key];
									var value = item[key];
									if(CUT.startsWith(attrName,'!')){
										attrName = attrName.replace('!',''); 
										value = !value;
									}
									item['__$'+attrName] = value;
								}
								
								if(CUT.isObject(item.bind) && item.bind.hasOwnProperty(key)){
									var attrName = componentInfo.propertyToAttributeMap[key];
									var value = item.bind[key];
									delete item.bind[key];
									if(CUT.startsWith(attrName,'!')){
										attrName = attrName.replace('!',''); 
										value = value.replace('{','{!');
									}
									item.bind[attrName] = value;
								}
							}
							*/
						}
						
						if(CUT.isArray(componentInfo.handlers)){
							for(var i =0; i < componentInfo.handlers.length; i++){
								if(CUT.isFunction(componentInfo.handlers[i])){
									componentInfo.handlers[i].call(this, item, view, componentInfo);
								}
							}
							
						}
						
						if(CUT.isFunction(componentInfo.handler)){
							componentInfo.handler.call(this, item, view, componentInfo);
						}
					}
					
				}
				
				item.__resolved__ = true;
			},
			
			__gatherAllBehaviorsByNames : function(behaviors, results, duplicateChecker){
				results = results ? results : []; 
				duplicateChecker = duplicateChecker ? duplicateChecker : {};
				for(var i =0; i < behaviors.length; i++){
					var behaviorName = behaviors[i];
					if(CUT.isString(behaviorName) && baseBehaviors[behaviorName]){
						if(CUT.isArray(baseBehaviors[behaviorName].behaviors)){
							arguments.callee.call(this, baseBehaviors[behaviorName].behaviors, results, duplicateChecker);
						}
						if(!duplicateChecker[behaviorName]){
							results.push(behaviorName);
							duplicateChecker[behaviorName] = true;
						}	
					}
					
				}
				return results;
			},
			
			__resolveComponentByBehaviorChain : function(item, view, componentInfo){
				var behaviors = [];
				var isIgnoreBase = componentInfo.ignoreBase === true;
				
				
				
				behaviors = behaviors.concat(componentInfo.behaviors);
				for(var i = 0; i < componentInfo.behaviors.length && isIgnoreBase !== true; i++){
					isIgnoreBase = baseBehaviors[componentInfo.behaviors[i]].ignoreBase === true;
				}
					
				
				if(isIgnoreBase === true && behaviors[0] === 'base'){
					behaviors.shift();
				}
				
				var behaviors = this.__gatherAllBehaviorsByNames(behaviors);
				
				var defaultAttributes = CUT.isObject(componentInfo.defaultAttributes) ? CUT.mixin({},componentInfo.defaultAttributes) : {},
					propertyToAttributeMap = CUT.isObject(componentInfo.propertyToAttributeMap) ? CUT.mixin({},componentInfo.propertyToAttributeMap) : {},
					handlerChain = [];
				
				for(var i =0; i < behaviors.length; i++){
					var behaviorName = behaviors[i];
					if(CUT.isString(behaviorName)){
						var behavior = baseBehaviors[behaviorName];
						if(CUT.isObject(behavior.defaultAttributes)){
							CUT.mixin(defaultAttributes, behavior.defaultAttributes);
						}
						
						if(CUT.isObject(behavior.propertyToAttributeMap)){
							CUT.mixin(propertyToAttributeMap, behavior.propertyToAttributeMap);
						}
						
						if(CUT.isFunction(behavior.handler)){
							handlerChain.push(behavior.handler);
						}
					}
				}
				
				this.__resolveComponent(item, view, {
					defaultAttributes : defaultAttributes,
					propertyToAttributeMap : propertyToAttributeMap,
					handlers : handlerChain,
					ignoreBase : true,
					handler : componentInfo.handler,
					tagName : componentInfo.tagName
				});
			},
			
			_generatePopupComment : function(item, tagName){
				if(!item.reference){
					return '';
				}
				
				var popupOptionConvertMap = {
					resizable : 'resizable',
				};
				
				var result = '';
				var popupValiable = 'me.'+item.reference;
				var width = item.width ? item.width : 600;
				var height = item.height ? item.height : 500;
				
				result += 'var me = this;\n';
				result += 'if(!'+popupValiable+'){\n';
				result += '\t'+popupValiable+' = UT.popup('+tagName+', me, '+width+', '+height+', {\n';
				if(CUT.isObject(item.listeners)){
					var listenersWord = '';
					for(var key in item.listeners){
						listenersWord+= '\t\t\''+key+'\' : function(popup, e){\n';
						listenersWord+= '\t\t\tme.'+item.listeners[key]+'(e.detail);\n';
						listenersWord+= '\t\t},\n';
					}
					
					var listenersArr = listenersWord.split(',');
					listenersArr.pop();
					listenersWord = listenersArr.join(',')+'\n';
					result += listenersWord;
				}
				result += '\t},{\n';
				var optionsWord = '';
				for(var key in popupOptionConvertMap){
					if(item[key]){
						optionsWord+= '\t\t'+popupOptionConvertMap[key]+' : '+item[key]+',\n';
					}
				}
				if(optionsWord !== ''){
					var optionsArr = optionsWord.split(',');
					optionsArr.pop();
					optionsWord = optionsArr.join(',')+'\n';
					result += optionsWord;
				}
				result += '\t});\n';
				result += '}\n';
				result += popupValiable+'.show();\n';
				result += '//'+popupValiable+'.getWindowContent().load(param);\n';
				
				return result;
			},
			
			_configurateItemByXtype : function(item, view){
				for(var i = 0; item.items && i < item.items.length; i++){
					arguments.callee.call(this, item.items[i], view);
				}
				
				if(item.xtype){
					if(xtypeToComponentMap[item.xtype]){
						var componentInfo = xtypeToComponentMap[item.xtype];
						this.__resolveComponent(item,view, componentInfo);
						
					}else if(view.config.requiresXtypeToClassNameMap[item.xtype]){
						var moduleClass = view.config.requiresXtypeToClassNameMap[item.xtype];
						var classInfo = view.config.requiredClassInfos[moduleClass];
						if(classInfo && classInfo.config && classInfo.config.floating === true){
							item.floating = true;
						}
						var moduleTagName = (this._isPopupClass(moduleClass) ? 'ep' : 'es')+this._generateModuleNameByClassName(moduleClass);
						
						this.addComment(item, '다음에 위치한 "'+moduleTagName+'"태그는 "'+ moduleClass+'(xtype : '+item.xtype+')" 클래스 입니다.',true);
						if(item.floating === true){
							this.addComment(item, '또한 해당 "'+moduleTagName+'"태그는 팝업이라 주석처리 되었습니다. 스크립트로 팝업 호출 로직을 구현해주세요.',true);
							this.addComment(item, this._generatePopupComment(item, moduleTagName), true);
							item.__$$addElToComment = true;
						}
						item.__$tagName = moduleTagName;
						
						this.__resolveComponent(item, view,{
							behaviors : ['external']
						} , true);
					}else{
						//console.warn(item,'은 정의된 매핑 정보가 없습니다.');
						this.addComment(item, item.xtype+'은 컨버팅 시 정의된 매핑 정보가 없습니다.(유사한 컴포넌트가 9.1에 존재하지 않거나 컨버팅 개발 누락)',true);
						if(item.floating === true){
							this.addComment(item, '또한 해당 "'+moduleTagName+'"태그는 팝업이라 주석처리 되었습니다. 스크립트로 팝업 호출 로직을 구현해주세요.',true);
							item.__$$addElToComment = true;
						}
						
						item.__$tagName = item.xtype;
					}
				}else if(item.xclass){
					var moduleTagName = (this._isPopupClass(item.xclass) ? 'ep' : 'es')+this._generateModuleNameByClassName(item.xclass);
					var classInfo = view.config.requiredClassInfos[item.xclass];
					if(classInfo && classInfo.config && classInfo.config.floating === true){
						item.floating = true;
					}
					this.addComment(item, '다음에 위치한 "'+moduleTagName+'"태그는 "'+ item.xclass+'" 클래스 입니다.',true);
					if(item.floating === true){
						this.addComment(item, '또한 해당 "'+moduleTagName+'"태그는 팝업이라 주석처리 되었습니다. 스크립트로 팝업 호출 로직을 구현해주세요.',true);
						this.addComment(item, this._generatePopupComment(item, moduleTagName), true);
						item.__$$addElToComment = true;
					}
					item.__$tagName = moduleTagName;
					this.__resolveComponent(item, view,{
						behaviors : ['external']
					} , true);
				}
			},
			_generateProperties: function(viewmodel){
				if(!viewmodel){
					return;
				}
				
				var vm = viewmodel.config;
				
				var codeStoreMap = {};
				
				if(!vm.data) {
					vm.data = {};
	            }
				
				if(vm.stores) {
	                for(var storeName in vm.stores){

	                    var store = vm.stores[storeName];
	                    if(vm.data[storeName]){
	                        logging('data에 중복되는 store 명이 있음');
	                        continue;
	                    	//throw new Error('data에 중복되는 store 명이 있음');
	                    }
	                    
	                    if(store.type === 'cmmncode' && store.groupCode){
	                    	codeStoreMap[storeName] = true;;
	                    }
	                    if(store.data){
	                    	vm.data[storeName] = store.data;
	                    }else{
	                    	vm.data[storeName] = [];
	                    }
	                }
	            }
				
				var propertiesStr = '';
	        	var fnPreFix = 'function(){ ';
	        	var fnPosFix = '}';
	        	var isFirstProp = true;
	        	
				for(var prop in vm.data){
	        		if(vm.data.hasOwnProperty(prop)){
	        			var value = vm.data[prop];
	        			var valueStr = ('\nvalue : ' + fnPreFix + 'return '+JSON.stringify(value)+';'+fnPosFix+'  ');
	        			var typStr = 'type : ';
	        			
	        			
	        			var firstWord = (isFirstProp ? '' : ',\n')+prop + ' : ';
	        			var comment = '';
	        			/*
	        			if(CUT.isBoolean(value)){
	        				typStr += 'Boolean'; 
	        			}else if(CUT.isString(value)){
	        				typStr += 'String';
	        			}else if(CUT.isArray(value)){
	        				typStr += 'Array';
	        			}else if(CUT.isNumber(value)){
	                        typStr += 'Number';
	                    }else if(CUT.isDate(value)){
	                    	comment = 'value'
	                    	typStr += 'Date';
	                    }
	                    else {
	        			    typStr += 'Object';
	                    }
	                    */
	        			
	        			typStr += 'Object';
	        			
	        			propertiesStr += firstWord+ '{ '+typStr+' , '+valueStr+ (codeStoreMap[prop] ? ', reset : false' : '')+'}';
	        			
	        			isFirstProp = false; 
	        		}
	        	}
				
				return propertiesStr;
			},
			
			
			convertModelToFields : function(modelFields){
				var fields = [];
				if(CUT.isArray(modelFields)){
					for(var i =0; i < modelFields.length; i++){
						var modelField = modelFields[i];
						var field = this.createElementMeta('sc-grid-field', {
							'data-field' : modelField.name
						});
						
						if(modelField.type){
							var type = modelField.type;
							if(type === 'boolean'){
								this.setAttribute(field, 'data-type', 'boolean');
							}
							else if(type === 'date'){
								this.setAttribute(field, 'data-type', 'datetime');
							}
							else if(type === 'float' && type === 'int'){
								this.setAttribute(field, 'data-type', 'number');
							}
							else if(type === 'string'){
								this.setAttribute(field, 'data-type', 'text');
							}
						}
						fields.push(field);
					}
				}
				return fields;
			},
			
			convertStoreToAjax : function(storeName, store){
				if(store && store.proxy && store.proxy.type === 'direct' && store.proxy.directFn) {
					 var dirFn = store.proxy.directFn;

                     var dirFns = dirFn.split(".");
                     var len = dirFns.length;
                     
                     var scAjax = this.createElementMeta('sc-ajax', {
                    	 id : storeName+'Loader',
                    	 url : dirFn,
                    	 'last-response' : ('{{'+ storeName + '}}')
                     });
                     
                     if(store.type === 'cmmnenum' && store.enumType){
                    	 this.setAttribute(scAjax, 'enum-type', store.enumType);
                    	 this.addComment(scAjax,'다음에 위치한 sc-ajax는 EnumStore('+storeName+') 였습니다.',true);
                     }
                     else if(store.type === 'cmmnoperatingunit' && store.unitType){
                    	 this.setAttribute(scAjax, 'unit-type', store.unitType);
                    	 this.addComment(scAjax,'다음에 위치한 sc-ajax는 OperatingUnitStore('+storeName+') 였습니다.',true);
                     }
                     else if(store.type === 'cmmncode' && store.groupCode){
                    	 
                    	 scAjax = this.createElementMeta('sc-code', {
                        	 id : storeName+'Loader',
                        	 code : store.groupCode,
                        	 'last-response' : ('{{'+ storeName + '}}')
                         });
                    	 this.addComment(scAjax,'다음에 위치한 sc-ajax는 CommonCodeStore('+storeName+') 였습니다.',true);
                     }
                     else if(store.type === 'tree'){
                    	 this.addComment(scAjax,'다음에 위치한 sc-ajax는 TreeStore('+storeName+') 였습니다.',true);
                    	 
                    	 if(store.proxy.reader && CUT.isObject(store.proxy.reader.transform)){
                    		 var transOptions = store.proxy.reader.transform;
                    		 if(transOptions.hasOwnProperty('idProperty') && transOptions.hasOwnProperty('parentProperty') && transOptions.hasOwnProperty('rootId')){
                    			 var key = transOptions.idProperty,
                    			 	superKey = transOptions.parentProperty,
                    			 	rootKeyValue = transOptions.rootId; 
                    			 this.addComment(scAjax,'tree 구조 생성 주요 프로퍼티 key : '+key+', superKey : '+superKey+', rootId : '+rootKeyValue, true);
                    			 this.addComment(scAjax,'cc-hierachicaldata를 사용해서 응답 데이터의 로직을 다음과같이 구성해 주세요', true);
                    			 this.addComment(scAjax,'var hier = new CCHierachicalData();', true);
                    			 this.addComment(scAjax,'this.'+storeName+' = hier.HierachyTransformByKey([응답데이터], "'+key+'", "'+superKey+'", "children", "'+rootKeyValue+'", [정렬기준 데이터]);', true);
                    			 
                    		 }
                    		  
                    	 }
                     }

                     
                     //scAjax.setAttribute('url', [dirFns[len-3], dirFns[len-2], dirFns[len-1]].join('/') + '.do');
                    
                     return scAjax;
				}
			},
			
			_configurateStores : function(view, viewmodel){
				if(!viewmodel){
					//console.warn(view.className, ' has no viewmodel');
					return [];
				}
				
				var ajaxes = [];
				var autoLoadAjaxes = [];
				
				if(viewmodel.config && viewmodel.config && viewmodel.config.stores){	
					var stores = viewmodel.config.stores;
					for(var storeName in stores){
						var store = stores[storeName];
						
						var scAjax = this.convertStoreToAjax(storeName, store);
						
						if(scAjax) {
	                        if(store.autoLoad) {
	                        	this.addComment(scAjax, '다음에 위치한 sc-ajax는 autoLoad(초기 자동 로딩)가 true 였었습니다.',true)
	                        	autoLoadAjaxes.push(scAjax);
	                        } else {
	                        	ajaxes.push(scAjax);
	                        }
	                    }
						
						
					}
					
					//todo
					if(autoLoadAjaxes.length > 0){
						var requestGroup = this.createElementMeta('sc-request-group', {
							init : true
						},autoLoadAjaxes);
					}
					ajaxes = ajaxes.concat(autoLoadAjaxes);
					
				}
				return ajaxes;
				
			},
			__generateTemplateHandler : function(el, item){

				var elements = el.getChildElements();
				
				for(var i= 1 ; i < elements.length; i++){
					var element = elements[i];
					var elementIndex = el._children.indexOf(element);
					
					var template = docs.createElement('template');
					el.appendChildAt(elementIndex, template, true);
					template.appendChild(element);
				}
				
			},
			
			_configurateItemByLayout : function(item, parent){
				for(var i = 0; item.items && i < item.items.length; i++){
					arguments.callee.call(this, item.items[i], item);
				}
				
				if(item.layout && CUT.isArray(item.items)){
					if(item.layout === 'table' || item.layout.type === 'table'){
						if(parent && parent.layout && (parent.layout === 'table' || parent.layout.type === 'table') && CUT.isArray(item.items) && item.layout.columns >= item.items.length){
							
							var origItems = item.items;
							delete item.items;
							var topContainer = this.createElementMeta('div', {}, origItems);
							item.items = [topContainer];
							this.addClass(topContainer,'table-inner-container');
							this.addClass(topContainer,'hbox');
							this.addStyle(topContainer, 'width', '100%');
							this.addStyle(topContainer, 'overflow', 'hidden');
							
							
							for(var i = 0; i < origItems.length; i++){
								
								if(origItems[i].fieldLabel && origItems[i].hideLabel !== true){
									var index = origItems.indexOf(origItems[i]);
									var label = this.createElementMeta('sc-label',{ text : origItems[i].fieldLabel, hidden : this.getAttribute(origItems[i],'hidden')});
									if(origItems[i].labelWidth){
										this.addStyle(label, 'width', origItems[i].labelWidth+'px');
									}else{
										this.addStyle(label, 'width', '100px');
									}
									origItems.splice(index, 0,  label);
									i++;
									delete origItems[i].fieldLabel;
								}else if(origItems[i].__$tagName === 'sc-spacer'){
									origItems[i].__$tagName = 'div';
									this.addStyle(origItems[i], 'width', '10px');
								}
							}
							
							
							
							return;
						}
						
						//table 구조의 기본 labelWidth
						var labelWidth = 100;
						
						if(item.fieldDefaults){
							if(item.fieldDefaults.labelWidth){
								labelWidth = item.fieldDefaults.labelWidth;
							}
						}
						
						
						
						var origItems = item.items,
							maxLabelWidth = labelWidth;
						
						
						for(var i =0 ; i < origItems.length; i++){
							// 기본 labelWidth 보다 큰 labelWidth를 가진 컴포넌트가 있을 경우 해당 컴포넌트 labelWidth를 따라간다.
							if(origItems[i].fieldLabel && origItems[i].hideLabel !== true && origItems[i].labelWidth && origItems[i].labelWidth > labelWidth){
								maxLabelWidth = origItems[i].labelWidth;
							}
							
							// 컴포넌트에서 width가 퍼센테이지로 들어가 있지 않고 고정 픽셀로 지정 시 제거한다.
							if(origItems[i].width && (origItems[i].width+'').indexOf('%') === -1){
								this.removeStyle(origItems[i],'width');
							}
							
							if(origItems[i].layout && (origItems[i].layout ==='table' || origItems[i].layout.type ==='table' )){
								var width = origItems[i].width;
								if(!origItems[i].width || (origItems[i].width && (origItems[i].width+'').indexOf('%') === -1)){
									this.addStyle(origItems[i], 'width', '100%');
									for(var j =0 ; j < origItems[i].items.length; j++){
										if(origItems[i].items[j].__$tagName === 'table'){
											this.addStyle(origItems[i].items[j], 'width', '100%');
											break;
										}
										
									}
								}
							}
						}
						
						labelWidth = maxLabelWidth;
						
						var toolbar;
						for(var i =0 ; i < origItems.length; i++){
							if(origItems[i].__$tagName === 'sc-toolbar'){
								toolbar = origItems[i];
								origItems.splice(i,1);
								break;
							}
						}
						var tableTop = this.createElementMeta('table');
						var config = item.layout,
							columns = config.columns > 1 ? config.columns : 1,
							colStyleStr;
						
						if(origItems.length === 1){
							origItems[0].colspan = columns;
						}	
						
						var colsizes = [];
						for(var i = 0; i < columns;i++){
							colsizes.push(2);
						}
						/*
						for(var i = 0; i < origItems.length; i = i+columns){
							for(var j = 0; j < columns; j++){
								if(origItems[i].fieldLabel){
									colsizes[j] = 2;
								}
							}
						}
						*/
						
						if(item.ui === 'table'){
							this.addClass(tableTop, 'tb-form');
						}
						
						
						var newItems = [];
						if(config.tdAttrs && config.tdAttrs.style){
							colStyleStr = '';
							for(var key in config.tdAttrs.style){
								colStyleStr += key + ' : ' +config.tdAttrs.style[key] + ';'
							}
						}
						var colGroup = this.createElementMeta('colgroup',null, []);
						newItems.push(colGroup);
						for(var i = 0; i < colsizes.length; i++){
							
							for(var j =0; j < colsizes[i]; j++){
								var col = {
									__$tagName : 'col'
								};
								if(colsizes[i] > 1 && j === 0 && labelWidth){
									labelWidth += '';
									this.addStyle(col, 'width' , labelWidth +'px');
								}
								colGroup.items.push(col);
							}
						}
						
						var colspanOffset = 0;
						
						var rowSpanCell = [];
						rowSpanCell.length = colsizes.length;
						
						for(var i = 0; i < origItems.length; i++){
							var trTag;
							var colIndex = (i+colspanOffset) % colsizes.length;
							if(rowSpanCell[colIndex] > 0){
								rowSpanCell[colIndex]--;
								colspanOffset++;
								colIndex = (i+colspanOffset) % colsizes.length;
							}
							if(colIndex === 0){
								trTag = this.createElementMeta('tr',null, []);
								newItems.push(trTag);
							}
							var tdTag;
							
							if(origItems[i].rowspan > 1){
								rowSpanCell[colIndex] = origItems[i].rowspan-1;
							}
							
							if(CUT.isString(origItems[i].fieldLabel) && origItems[i].hideLabel !== true){
								
								var itemLabel = this.createElementMeta('sc-label',{ 
									text : origItems[i].fieldLabel, 
									hidden : this.getAttribute(origItems[i],'hidden'),
									rowspan : origItems[i].rowspan > 1 ? origItems[i].rowspan : undefined
								});
								
								if(origItems[i].labelWidth){
									this.addStyle(itemLabel, 'width', origItems[i].labelWidth+'px');
								}
								trTag.items.push(this.createElementMeta('th',{
									hidden : this.getAttribute(origItems[i],'hidden'),
									rowspan : origItems[i].rowspan > 1 ? origItems[i].rowspan : undefined 
								}, 
								[itemLabel]));
								tdTag = this.createElementMeta('td',{
									hidden : this.getAttribute(origItems[i],'hidden'),
									rowspan : origItems[i].rowspan > 1 ? origItems[i].rowspan : undefined
								}, [origItems[i]]);
								trTag.items.push(tdTag);
							}else{
								var tdTag = this.createElementMeta('td',{
									hidden : this.getAttribute(origItems[i],'hidden'),
									rowspan : origItems[i].rowspan > 1 ? origItems[i].rowspan : undefined
									}, [origItems[i]]);
								if(colsizes[colIndex] > 1){
									this.setAttribute(tdTag, 'colspan', colsizes[colIndex]);
								}
								trTag.items.push(tdTag);
							}
							
							if(origItems[i].colspan){
								var currentColIndex = colIndex+1;
								var colSpanSize = origItems[i].colspan;
								this.removeAttribute(origItems[i], 'colspan', true);
								var colspan = this.getAttribute(tdTag, 'colspan') ? this.getAttribute(tdTag, 'colspan') : 1;
								while(currentColIndex < colsizes.length && (currentColIndex - colIndex) < colSpanSize){
									colspan += colsizes[currentColIndex++];
									if(origItems[i].rowspan > 1){
										rowSpanCell[currentColIndex] = origItems[i].rowspan-1;
									}
									colspanOffset++;
								}
								this.setAttribute(tdTag, 'colspan', colspan);
							}
						}
						tableTop.items = newItems;
						item.items = [tableTop];
						if(toolbar){
							item.items.unshift(toolbar);
						}
					}
					else if(item.layout.type === 'vbox' || item.layout.type === 'hbox'){
						this.addClass(item, item.layout.type);
						
						this.addElementHandler(item,function(el, item){
							var childs = el.getChildElements();
							for(var i =0; i < childs.length; i++){
								if(childs[i].localName() === 'sc-splitter'){
									if(item.layout.type === 'hbox'){
										childs[i].setAttribute("split-type","vertical");
									}
								}
								
							}
							
						});
						
						var childs = item.items;
						for(var i = 0; i < childs.length; i++){
							var child = childs[i];
							if(child.hasOwnProperty('flex')){
								//flex가 있으면 width와 height 속성을 무효화 시킴
								
								
								if(child.height){
									if((child.height+'').indexOf('%') === -1){
										this.addStyle(child,'min-height', this.getStyle(child, 'height'));
									}
									delete child.height;
									this.removeStyle(child,'height');
								}
								
								if(child.width){
									if((child.width+'').indexOf('%') === -1){
										this.addStyle(child,'min-width', this.getStyle(child, 'width'))
									}
									delete child.width;
									this.removeStyle(child,'width');
								}
								
								
								this.addFlexToItem(child, child.flex, true);
							}
						}
					}
					else if(item.layout.type === 'card'){
						var origItems = item.items;
						
						var pages = {
							__$tagName : 'sc-pages',
							items : origItems
						};
						this.addElementHandler(pages, this.__generateTemplateHandler);
						
						this.addClass(pages, 'fit');
						
						
						for(var i =0; origItems && i < origItems.length; i++){
							this.addClass(origItems[i], 'fit');
							this.removeStyle(origItems[i], 'width');
							this.removeStyle(origItems[i], 'height');
						}
						
						if(item.activeItem != null){
							pages['__$selected-index'] = item.activeItem;
						}
						
						item.items = [pages];
					}
					else if(item.layout === 'fit' || item.layout.type === 'fit'){
						var origItems = item.items;
						
						for(var i =0; origItems && i < origItems.length; i++){
							if(origItems[i].__$tagName.indexOf('-toolbar') < 0 ){
								this.addClass(origItems[i], 'fit');
							}
						}
					}
					else if(item.layout === 'column' || item.layout.type === 'column'){
						
						var childItems = item.items;
						//columnWidth에 따라 개행처리
						this.addClass(item, 'vbox');
						var rows = [], row;
						
						var previousItemColumnWidth = 1;
						
						for(var i = 0; i < childItems.length; i++){
							var childItem = childItems[i];
							if(childItem.columnWidth >= 1){
								
								if(childItem.width){
									this.removeStyle(childItem,'width');
								}
								rows.push(childItem);
								continue;
							}
							
							if(previousItemColumnWidth + childItem.columnWidth >= 1){
								row = this.createElementMeta('div', null, []);
								this.addClass(row, 'hbox');
								this.addClass(row, 'column-layout-row');
								rows.push(row);
								previousItemColumnWidth = 0;
							}
							
							if(!row){
								row = this.createElementMeta('div', null, []);
								this.addClass(row, 'hbox');
								this.addClass(row, 'column-layout-trash-row');
								rows.push(row);
							}
							if(childItem.floating !== true && !childItem.columnWidth){
								this.addComment(childItem, 'column layout에서 columnwidth가 지정되지 않은 컴포넌트는 비정상적으로 표현될 수 있습니다.',true);
							}else{
								this.addFlexToItem(childItem, childItem.columnWidth, true);
							}
							
							row.items.push(childItem);
						}
						
						if(rows.length > 0){
							item.items = rows;
						}
					}
					else if(item.layout === 'border' || item.layout.type === 'border'){
						var childItems = item.items;
						delete item.items;
						
						var northItems = [];
						var southItems = [];
						var centerItems = [];
						var westItems = [];
						var eastItems = [];
						
						for(var i = 0; i < childItems.length; i++){
							var childItem = childItems[i];
							var region = childItem.region;
							if(region === 'north'){
								northItems.push(childItem);
							}
							else if(region === 'center'){
								centerItems.push(childItem);
								this.addFlexToItem(childItem, 1, true);
							}
							else if(region === 'south'){
								southItems.push(childItem);
							}
							else if(region === 'west'){
								westItems.push(childItem);
							}
							else if(region === 'east'){
								eastItems.push(childItem);
							}
						}
						
						this.addClass(item, 'vbox');
						this.addClass(item, 'border-container');
						
						
						var centerTop = this.createElementMeta('div', null, []);
						this.addClass(centerTop, 'border-root');
						this.addClass(centerTop, 'hbox');
						this.addFlexToItem(centerTop, 1, true);
						item.items = [centerTop];
						
						if(northItems.length > 0){
							var north = this.createElementMeta('div', null, northItems);
							this.addClass(north, 'border-north');
							item.items.unshift(north);
						}
						
						if(southItems.length > 0){
							var south = this.createElementMeta('div', null, southItems);
							this.addClass(south, 'border-south');
							item.items.push(south);
						}
						
						
						var center = this.createElementMeta('div', null, centerItems);
						this.addClass(center, 'border-center');
						this.addClass(center, 'vbox');
						this.addFlexToItem(center, 1, true);
						centerTop.items.push(center);
						
						if(westItems.length > 0){
							var west = this.createElementMeta('div', null, westItems);
							this.addClass(west, 'border-west');
							this.addClass(west, 'hbox');
							centerTop.items.unshift(west);
							
							if(westItems.length === 1){
								this.addFlexToItem(westItems[0],1, true);
							}else{
								for(var i =0; i < westItems.length; i++){
									var westItem = westItems[i];
									if(westItem.flex){
										this.addFlexToItem(westItem,westItem.flex, true);
									}
								}
							}
						}
						
						
						if(eastItems.length > 0){
							var east = this.createElementMeta('div', null, eastItems);
							this.addClass(east, 'border-east');
							this.addClass(east, 'hbox');
							centerTop.items.push(east);
							
							if(eastItems.length === 1){
								this.addFlexToItem(eastItems[0],1, true);
							}else{
								for(var i =0; i < eastItems.length; i++){
									var eastItem = eastItems[i];
									if(eastItem.flex){
										this.addFlexToItem(eastItem,eastItem.flex, true);
									}
								}
							}
						}
						
						
					}
				}
				
			},
			
			addFlexToItem: function(item, flexValue, addToStyle){
				if(addToStyle === true){
					this.addStyle(item, 'flex', flexValue);
				}else{
					if(flexValue === 1){
						this.addClass(item, 'flex');
					}else{
						this.addClass(item, 'flex-'+flexValue);
					}
					
				}
				
			},
			
			__viewModelFnPrefix : 'vm_',
			
			__viewFnPrefix : 'v_',
			
			_generateFormula : function(viewmodel){
				var formulaStr = '';
				
				if(viewmodel && viewmodel.config && viewmodel.config.formulas){
					var formulas = viewmodel.config.formulas;
					for(var key in formulas){
						var formula = formulas[key];
						if(CUT.isObject(formula) && CUT.isFunction(formula.get)){
							if(formula.bind){
								var comment = '바인딩이 존재 합니다. 8.0 솔루션에서의 Formula 함수 에서 인자값으로 넘어가는 데이터는 다음과 같습니다. 다음과같이 데이터를 구성해 주세요';
								//getter funcion을 생성하는 함수
								var generateGetterFunction = function(target){
									var isOpposite = (CUT.isString(target) && target.indexOf('!') >= 0);
									var replacedTarget = target;
									replacedTarget = CUT.replaceAll(replacedTarget,'!','');
									replacedTarget = CUT.replaceAll(replacedTarget,'{','');
									replacedTarget = CUT.replaceAll(replacedTarget,'}','');
									
									var result = 'this.get("'+replacedTarget+'")';
									if(isOpposite === true){
										result = '!' + result;
									}
									return result;
								};
								
								if(CUT.isObject(formula.bind)){
									for(var bindkey in formula.bind){
										comment += '\ndata.'+bindkey +' = '+generateGetterFunction(formula.bind[bindkey]);
									}
									
								}else if(CUT.isString(formula.bind)){
									var bindTarget = formula.bind;
									bindTarget = CUT.replaceAll(bindTarget,'{', '');
									bindTarget = CUT.replaceAll(bindTarget,'}', '');
									comment += '\ndata = '+generateGetterFunction(formula.bind);
								}
								formulaStr +=this.__generateFunctionStr(key, formula.get, true, comment);
								
							}else{
								formulaStr +=this.__generateFunctionStr(key, formula.get, true);
							}
							
						}else if(CUT.isFunction(formula)){
							formulaStr +=this.__generateFunctionStr(key, formula, true);
						}
						
					}
				}
				return formulaStr;
				
				
			},
			
			_generateFunctions : function(view){
				var co = view.controller;
				var vm = view.viewmodel;
				var functionStr = '';
				
				
				if(view.config){
					for(var key in view.config){
						if(view.config.hasOwnProperty(key) && CUT.isFunction(view.config[key])){
							functionStr += this.__generateFunctionStr(this.__viewFnPrefix + key, view.config[key], null, 'view에 존재하던 함수 이며 함수 중복이 발생할 수 있어 함수앞에 "'+this.__viewFnPrefix+'"가 붙어서 추가되었습니다.');
						}
					}
				}
				
				if(vm && vm.config){
					for(var key in vm.config){
						if(vm.config.hasOwnProperty(key) && CUT.isFunction(vm.config[key])){
							functionStr += this.__generateFunctionStr(this.__viewModelFnPrefix + key, vm.config[key], null, 'viewmodel에 존재하던 함수 이며 함수 중복이 발생할 수 있어 함수앞에 "'+this.__viewModelFnPrefix+'"이 붙어서 추가되었습니다.');
						}
					}
				}
				
				if(co){
					for(var key in co.config){
						if(co.config.hasOwnProperty(key) && CUT.isFunction(co.config[key])){
							functionStr += this.__generateFunctionStr(key, co.config[key]);
						}
					}
				}
				
				return functionStr;
			},
			
			
			_generateLayout : function(config, rootEl){
				var layoutObj = config.layout;
				
				
				var rootChilds = rootEl.getChildElements();
				var rootChildelements = [];
				for(var i =0; i < rootChilds.length; i++){
					var rootChild = rootChilds[i];
					if(!(rootChild.localName() === 'cc-page-title-bar') && !(rootChild.localName().indexOf('-toolbar') >= 0)){
						rootChildelements.push(rootChild);
					}
				}
				
				var layoutPreFix = "--",
					layoutPostFix = "-layout";
				
				var layoutType = CUT.isObject(layoutObj) ? layoutObj.type : layoutObj;
				var layoutStr = 'vbox';
				
				if(layoutType === 'hbox'){
					if(rootChildelements.length === 1){
						layoutStr = 'vbox';
					}else{
						layoutStr = 'hbox';
					}
				}else if(layoutType === 'fit'){
					layoutStr = 'fit';
				}
				
				if(rootChildelements.length === 1){
					if(layoutStr === 'vbox' || layoutStr === 'hbox'){
						rootChildelements[0].addClass('flex');
					}else if(layoutType === 'fit'){
						rootChildelements[0].addClass('fit');
					}
				}
				
				
				var layout = layoutPreFix + layoutStr + layoutPostFix;
				
				return layout;
			},
			
			__configurateElementFromItem: function(el, item){
				
				for(var key in item){
					if(key === '__$style' && CUT.isObject(item[key])){
						var styleStr;
						for(var styleKey in item[key]){
							styleStr = styleStr ? styleStr : '';
							styleStr += (styleKey+':'+item[key][styleKey]+';');
						}
						
						if(styleStr){
							el.setAttribute(key.replace('__$',''), styleStr);
						}
					}else if(key === '__$class' && CUT.isArray(item[key])){
						var classStr;
						for(var ci =0; ci < item[key].length; ci++){
							classStr = classStr ? classStr : '';
							classStr += (item[key][ci]+' ');
						}
						if(classStr){
							classStr = classStr.trim();
							el.setAttribute(key.replace('__$',''), classStr);
						}
					}else if(key === '__$innerHTML' && CUT.isString(item[key])){
						var content;
						try{
							content = new XML(item[key]);
						}catch(e){
							content = docs.createComment('오류! html 문법확인 할 것!'+item[key]);
						}
						
						el.appendChild(content);
					}else if(CUT.startsWith(key,'__$') && !CUT.isFunction(item[key]) && !CUT.isObject(item[key]) && !CUT.isArray(item[key]) && item[key] !== undefined){
						el.setAttribute(key.replace('__$',''), item[key]);
					}
				}
			},
			
			_JSONToXML: function(parentEl, items, view){
				
				
				for(var i =0; items && i < items.length; i++){
					var item = items[i];
					
					var addElToComment = item.__$$addElToComment;
					delete item.__$$addElToComment;
					
					if(item.__$$onlyComment && item.__$$comment){
						var comment = docs.createComment(item.__$$comment);
						parentEl.appendChild(comment);
						delete item.__$$comment;
						delete item.__$$onlyComment;
					}else{
						var child = docs.createElement(item.__$tagName);
						delete item.__$tagName;
						if(item.__$$comment){
							var comment = docs.createComment(item.__$$comment);
							parentEl.appendChild(comment);
							delete item.__$$comment;
						}
						
						
						this.__configurateElementFromItem(child, item);
						
						if(addElToComment === true){
							child.convertElementToComment();
							
						}
						
						parentEl.appendChild(child);
					}
					
					arguments.callee.call(this, child, item.items, view);
					if(CUT.isArray(item.__$elementHandlers)){
						for(var ei =0; ei < item.__$elementHandlers.length; ei++){
							var handler = item.__$elementHandlers[ei];
							handler.call(this, child, item, view);
						}
					}
				}
			},
			
			// xtype을 기준으로 resolve 함
			
			findParent: function(view, item){
				var rootItems = [];
				
				if(CUT.isArray(view.config.items)){
					rootItems = rootItems.concat(view.config.items); 
				}
				
				if(CUT.isArray(view.config.dockedItems)){
					rootItems = rootItems.concat(view.config.dockedItems);
				}
				
				var findParent = function(topItem, targetItem){
					if(CUT.isArray(topItem.items) || CUT.isArray(topItem.dockedItems)){
						var topItemItems = CUT.isArray(topItem.items) ? topItem.items : [];
						var topItemDockItems = CUT.isArray(topItem.dockedItems) ? topItem.dockedItems : [];
						
						var allItems = topItemDockItems.concat(topItemItems);
						if(allItems.indexOf(targetItem) >= 0){
							return topItem;
						}else{
							for(var i =0; i < allItems.length; i++){
								var childItem = allItems[i];
								var finded = arguments.callee.call(this, childItem, targetItem);
								if(finded){
									return finded;
								}
							}
						}
					}else{
						return false;
					}
				};
				
				for(var ri =0; rootItems && ri < rootItems.length; ri++){
					var parent = findParent(rootItems[ri],item);
					if(rootItems[ri] === item){
						return view.config;
					}
					if(parent){
						return parent;
					}
				}
				
			}
		};
		
		converter.prototype._resolveRequires = function(view, collector){
			
			if(view.config){
				if(view.config.controller != null){
					view.controller = collector.getControllerMap()[view.config.controller];
				}
				
				if(view.config.viewModel != null && view.config.viewModel.type != null){
					view.viewmodel = collector.getViewModelMap()[view.config.viewModel.type];
				}
				
				
			}
			
			view.config.requiresXtypeToClassNameMap = {};
			view.config.requiredClassInfos = {};
			//view에서 require 하고있는 다른 View에 대한 className들을 찾는다.
			var requires = view.config.requires ? view.config.requires.slice() : [];
			
			view.config.fixedRequires = requires;
			var viewMap = collector.getViewClassMap();
			if(CUT.isArray(requires)){
				for(var i = 0; i < requires.length; i++){
					var require = requires[i];
					if(require.indexOf('.view.') === -1 || CUT.startsWith(require,'Ext.') || CUT.startsWith(require,'Etna.') || (require === (view.className + 'ViewModel')) || (require === (view.className + 'ViewController'))){
						requires.splice(i--, 1);
					}else{
						if(viewMap[requires[i]]){
							view.config.requiredClassInfos[require] = viewMap[require];
						}
					}
				}
			}
			
			for(var i = 0; i < requires.length; i++){
				var require = requires[i];
				var splitByView = require.split('.view.');
				var fullPackage = splitByView[splitByView.length-1];
				var moduleName = CUT.replaceAll(fullPackage,'.','').toLowerCase();
				view.config.requiresXtypeToClassNameMap[moduleName] = require;
			}
			
			//viewmodel에서 require하고있는 다른 model들을 viewmodel에 연결 한다.
			
			if(view.viewmodel && view.viewmodel.config && CUT.isArray(view.viewmodel.config.requires)){
				var vmconfig = view.viewmodel.config;
				vmconfig.models = {};
				var vmrequires = vmconfig.requires.slice();
				vmconfig.fixedRequires = vmrequires;
				var modelClassMap = collector.getModelClassMap();
				for(var i =0; i < vmrequires.length; i++){
					var vmrequire = vmrequires[i];
					if(CUT.startsWith(vmrequire,'Ext.') || CUT.startsWith(vmrequire,'Etna.')){
						vmrequires.splice(i--, 1);
					}else if(vmrequire.indexOf('.model.') >= 0){
						if(modelClassMap[vmrequire]){
							vmrequires[i] = modelClassMap[vmrequire];
							vmconfig.models[vmrequire] = modelClassMap[vmrequire];
						}
					}
				}
			}
			
		};
		converter.prototype.resolveViews = function(moduleName){
			var modulues = [];
			
			if(this.collector == null){
				throw new Error('변환할 소스가 없습니다.');
			}
			
			var views = this.collector.getViews();
			
			for(var i = 0; i < views.length; i++){
				var view = views[i];
				this._resolveRequires(view , this.collector);
			}
			
			if(views.length === 0){
				throw new Error('변환할 View가 없습니다.');
			}
			
			var results = [];
			
			if(!CUT.isString(moduleName)){
				moduleName = null;
			}else if(moduleName.trim() === ''){
				moduleName = null;
			}
			
			
			
			for(var i =0; i< views.length; i++){
				try{
					logging(views[i].className+'변환 중 \n');
					var result = ModuleResolver.resolve(views[i], moduleName, this.collector);
					result.error = false;
					result.message = result.className + '이 ' + result.moduleName+'로 변경 되었습니다.';
					results.push(result);
				}catch(e){
					logging(e.stack);
					var className = views[i].className;
					results.push({
						error: true,
						className : className,
						html : className+'변환 오류 !!',
						message : className+'변환 오류 !!\n'+e.stack
					});
					logging(className+'\n변환 중 오류 발생\n');
				}
				
			}
			return results;
			
		};
		
		
		ModuleResolver.CUT = CUT;
		Converter8ModuleResolver = ModuleResolver;
		
		return converter;
})();
