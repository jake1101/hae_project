(function() {
	var debug = Polymer.Settings.debug === true;
	
	if(Polymer.Settings.ccModuleBehaviorReady){
		document.dispatchEvent(new Event('ccModuleBehaviorReady'));
	}
	
	/**
	* sc-pages 오버라이드
	*/
	SCPages.prototype.$$_render = SCPages.prototype._render;
	SCPages.prototype._render = function(template, callback) {
		var element = SCPages.prototype.$$_render.call(this, template, callback);
		if(!element.isInitialized && !element._isDeferred && modules.getKey(element.tagName.toLocaleLowerCase().substring(0, 2))) {
			var attrs = Array.prototype.slice.call(element.attributes);
			Polymer.CCModuleBehavior._deferred.call(element);
			for(var i=0,len=attrs.length,attr,method; i<len; i++) {
				attr = attrs[i];
				if(attr.name.slice(0,5) === 'lazy-') {
					method = attr.name.slice(5);
					element[method] = Polymer.CCModuleBehavior.deferredBind.call(element, method); 
				}
			}
			element.load = Polymer.CCModuleBehavior.deferredBind.call(element, 'load');
			element.invoke = Polymer.CCModuleBehavior.deferredInvoke.bind(element);
		}
		return element;
	};
	
	/**
	* sc-tab-navigation 오버라이드
	*/
	SCTabNavigation.prototype.$$_render = SCTabNavigation.prototype._render;
	SCTabNavigation.prototype._render = function(template, callback) {
		var element = SCTabNavigation.prototype.$$_render.call(this, template, callback);
		if(!element.isInitialized && !element._isDeferred && modules.getKey(element.tagName.toLocaleLowerCase().substring(0, 2))) {
			var attrs = Array.prototype.slice.call(element.attributes);
			Polymer.CCModuleBehavior._deferred.call(element);
			for(var i=0,len=attrs.length,attr,method; i<len; i++) {
				attr = attrs[i];
				if(attr.name.slice(0,5) === 'lazy-') {
					method = attr.name.slice(5);
					element[method] = Polymer.CCModuleBehavior.deferredBind.call(element, method); 
				}
			}
			element.load = Polymer.CCModuleBehavior.deferredBind.call(element, 'load');
			element.invoke = Polymer.CCModuleBehavior.deferredInvoke.bind(element);
		}
		return element;
	};
	
	/**
	* sc-window 오버라이드
	*/
	SCWindow.prototype.$$_windowContentChanged = SCWindow.prototype._windowContentChanged;
	SCWindow.prototype._windowContentChanged = function(content) {
		var element, initElements, useDeferredBind;
		SCWindow.prototype.$$_windowContentChanged.call(this, content);
		element = this._windowContentEl;
		if(element){
			initElements = Polymer.dom(element.root).querySelectorAll('sc-code-group,*[init]');
			initElements = (initElements.length > 0) ? initElements : Polymer.dom(element.root).querySelectorAll('sc-code');
			if(initElements.length > 0){
				useDeferredBind = true;
			}
		}
		if(this._isLazyLoading || useDeferredBind) {
			element = this._windowContentEl;
			if(!element._isDeferred) {
				Polymer.CCModuleBehavior._deferred.call(element);
				element.load = Polymer.CCModuleBehavior.deferredBind.call(element, 'load');
				element.invoke = Polymer.CCModuleBehavior.deferredInvoke.bind(element);
			}
		}
		this._reconfigure();
	};

	/**
	 * em, es, ep 모듈 lazy mode behavior
	 */
	Polymer.CCModuleBehavior = {

		_isCCModuleBehavior: true, //cc-module-behavior 여부를 확인하기 위한 프로퍼티

		_initializedCall : 0,

		//이벤트등록
		_deferred : function() {
			var me = this, handler = function(event) {
				var target = event.target, method, args, methodName;
				target.removeEventListener('initialized', handler);
				while ((args = this._deferredInvokeArgs.splice(0, 1)).length) {
					args = args[0];
					method = target.constructor.prototype[args.methodName];
					if (method) {
						method.apply(this, args.args);
						if (target[args.methodName] != method) {
							target[args.methodName] = method;
						}
						else if(!SCUtil.isFunction(target[args.methodName])) {
							console.warn(target.id + ' ' + args.methodName
									+ ' is undefined.');
						}
					}
					delete args.methodName;
					delete args.args;
				}
				while ((methodName = this._deferredFunctions.splice(0, 1)).length) {
					methodName = methodName[0];
					method = target.constructor.prototype[methodName];
					if (!method) {
						delete target[methodName];
					} else if (method && method != target[methodName]) {
						target[methodName] = method;
					}
				}
				handler = null;
				if(target["invoke"] !== Polymer.Base.invoke) {
					target["invoke"] = Polymer.Base.invoke;
				}
				delete this._deferredInvokeArgs;
				delete this._deferredFunctions;
			};

			if (this.isInitialized) {
				console.error(this.id + ' element is initialized.');
				return;
			}
			me._isDeferred = true;
			me._deferredFunctions = [];
			me._deferredInvokeArgs = [];
			me.addEventListener('initialized', handler);
		},

		deferredBind : function(methodName) {
			if (!this._isDeferred) {
				console.error(this.id + ' element is not deffered.');
				return;
			}
			this._deferredFunctions.push(methodName);
			return function() {
				this._deferredInvokeArgs.push({
					methodName : methodName,
					args : Array.prototype.slice.call(arguments, 0)
				});
			};
		},

		deferredInvoke : function(methodName) {
			var me = this, args = Array.prototype.slice.call(arguments, 1);

			if (this.isInitialized) {
				return this[methodName].apply(this, args);
			} else if (this._isDeferred) {
				this._deferredInvokeArgs.push({
					methodName : methodName,
					args : args
				});
			} else {
				console.error(this.id + ' element is not deffered.');
			}
		},

		created : function() {
			this.setAttribute('init', 'initialized');
		},

		ready : function() {
			var tagName = this.tagName.toLowerCase(), link, handler;
			if (SCLinkManager.loading && SCLinkManager.isLoading(tagName)) {
				link = SCLinkManager.get(tagName);
				handler = (function(event) {
					link.removeEventListener('load', handler);
					this._initialize();
					link = null;
					handler = null;
				}.bind(this));
				link.addEventListener('load', handler);
				return;
			}
			this._initialize();
		},

		_onInitializerCompleted : function(event) {
			var element = event.target;
			this.unlisten(element,
					(element.getAttribute('init') || 'response'),
					'_onInitializerCompleted');
			this.unlisten(element, 'error', '_onInitializerError');
			if (!(--this._notCompleted) && this._readied) {
				this._initialized();
			}
		},

		_onInitializerError : function(event) {
			var element = event.target;
			this.unlisten(element,
					(element.getAttribute('init') || 'response'),
					'_onInitializerCompleted');
			this.unlisten(element, 'error', '_onInitializerError');
			if (!(--this._notCompleted) && this._readied) {
				this._initialized();
			}
			console.log(event.target.tagName + " is initialize error.");
		},

		_initialize : function() {
			var elements = Polymer.dom(this.root).querySelectorAll(
					'sc-code-group,*[init]'), len = (this._notCompleted = elements.length);
			for (var i = 0, element, eventName; i < len; i++) {
				element = elements[i];
				if (Polymer.$Util.isFunction(element.request)
						&& element.loading === undefined) {
					this.listen(element, 'response',
							'_onInitializerCompleted');
					this.listen(element, 'error', '_onInitializerError');
					element.request();
				} else if ((eventName = element.getAttribute('init'))
						&& !SCUtil.isEmpty(eventName)) {
					this.listen(element, eventName,
							'_onInitializerCompleted');
				} else {
					this._notCompleted--;
				}
			}
			if (!this._notCompleted) {
				this._initialized();
			}
		},

		_initialized : function() {
			this._initializedCall++;
			if (this.isInitialized || this._notCompleted) {
				return;
			} else if (!this.isAttached) {
				if ((this.isWindow || this.__window)
						&& Polymer.$Util.isFunction(this.getWindow)) {
					this.listen(this.getWindow(), 'sc-window-prepared',
							function(event) {
								this.async(this._initialized, 0);
							}.bind(this), {
								single : true
							});
					return;
				}
				this.async(this._initialized, 10);
				return;
			} else if (SCLinkManager.loading) {
				if(SCLinkManager.done) {
					SCLinkManager.done(this._initialized.bind(this));
				}
				else {
					this.async(this._initialized, 10);
				}
				return;
			} else if (this._initializedCall >= 100) {
				console.warn(this.tagName.toLowerCase() + ' 초기화 호출이 100 회 이상 호출되었습니다. 네트워크 속도 또는 요청 리소스가 많은지 확인이 필요합니다.');
			}
			this.isInitialized = true;
			this.resetOriginalValue();
			this._preinitialized().then(function() {
				this.initialized();
				this.fire('initialized', this, {
					bubbles : false
				});
			}.bind(this)).catch(function(err) {
				console.error(this.tagName.toLowerCase() + ' 초기화 오류.', err);
			}.bind(this));
		},
		
		_preinitialized : function() {
			var cmps = Polymer.dom(this.root).querySelectorAll('sc-grid,sc-editor'), promises = [];
			this.preinitialized();
			for(var i=0,len=cmps.length,cmp; i<len; i++) {
				cmp = cmps[i];
				if(!cmp._isInitialized) {
					promises.push(new Promise(function(resolve, reject) {
						this.__resolve__ = resolve;
						this.__reject__ = reject;
					}.bind(cmp)));
					this.listen(cmp, cmp.tagName == 'SC-GRID' ? 'creation-complete' : 'editor-initialized', function() {
						this.__resolve__();
						this.__resolve__ = null;
						this.__reject__ = null;
					}.bind(cmp), {single : true});
				}
			}
			return Promise.all(promises);
		},
		
		attached : function() {
			//cc-module-behavior 라이프 사이클 initialize -> preinitialized -> initialized
			this.initialize();
			if (!this.isInitialized) {
				this.async(this._initialized, 0);
			}
		},
		
		//초기화
		initialize : function() {
			if(debug) {
				console.log(this.tagName.toLowerCase() + ' initialize 호출');
			}
		},
		
		//데이터 조회, 리소스 다운로드 완료
		preinitialized : function() {
			if(debug) {
				console.log(this.tagName.toLowerCase() + ' preinitialized 완료');
			}
		},

		//초기화완료
		initialized : function() {
			if(debug) {
				console.log(this.tagName.toLowerCase() + ' initialized 완료');
			}
		},

		//소멸완료
		destroyed : function() {
			if(SCUtil.isFunction(this.destroyProperties)) {
				this.destroyProperties();
			}
			if(debug) {
				console.log(this.tagName.toLowerCase() + ' 소멸 완료.');
			}
		},

		validate : function(vGroupName) {
			var targetEl = this;
			if (SCUtil.isElement(vGroupName)) {
				targetEl = [vGroupName];
			} else if (vGroupName) {
				targetEl = targetEl.querySelectorAll('[validation-group="'
						+ vGroupName + '"]');
			} else{
				targetEl = targetEl.querySelectorAll('[field],sc-grid');
			} 

			if (!targetEl || UT.isEmpty(targetEl)) {
				console.warn("there is no target element to validate");
				return true;
			}
			
			var result = this.validateElements(targetEl); 

			if(this.firstFailedEl != null){
				this.firstFailedEl.scrollIntoView();
				if(document.querySelector("#containerWrap") != null){
					document.querySelector("#containerWrap").scrollTop = 0;
				}
				this.firstFailedEl = null;
			}
			
			return result; 
		},
		
		firstFailedEl: null,

		validateElements : function(elements) {
			var validCnt = 0;
			for (var i = 0, len = elements.length, field, element; i < len; i++) {
				element = elements[i];
				//                    if (field.isField || element.isGrid()) {
				if (!UT.closest(element, "[hidden]") && (element.isField || element._gridContainer) && (element.getClientRects().length > 0)) {
					if (!element.validate()){
						this.firstFailedEl = this.firstFailedEl == null ? element : this.firstFailedEl; 
						validCnt++;
					}
				} else if (!this.validateElements(element
						.querySelectorAll('[field],sc-grid'))) {
					validCnt++;
				}
			}
			return !(validCnt > 0);
		},

		resetOriginalValue : function() {
			//sc-form-panel 사용여부에 따라 달라질 수 있음
			var fields = this.querySelectorAll('[field]:not([reset="false"])');
			for (var i = 0, len = fields.length, field; i < len; i++) {
				field = fields[i];
				if (field.resetOriginalValue) {
					field.resetOriginalValue();
				}
			}
		},

		//데이터 초기화
		reset : function(targetEle) {
			var targetEle = targetEle || this;
			//sc-form-panel 사용여부에 따라 달라질 수 있음
			var containers = Polymer.dom(targetEle.root || targetEle)
					.querySelectorAll('sc-tab-navigation,sc-pages');
			var fields = targetEle.querySelectorAll('[field]:not([reset="false"])');
			var grids = targetEle.querySelectorAll('sc-grid:not([reset="false"])');
			var editors = targetEle.querySelectorAll('sc-editor:not([reset="false"])');
			var uploaders = targetEle.querySelectorAll('sc-upload');
			var boxes = targetEle.querySelectorAll('.flex,.vbox,.hbox,.page,.fit');
			
			if (targetEle.resetProperties) {
				targetEle.resetProperties();
			}
			for (var j = 0, len = containers.length, container; j < len; j++) {
				container = containers[j];
				for(var j2=0, len2=container.items.length; j2<len2; j2++) {
					var item = container.items[j2];
					if (item.resetProperties) {
						item.resetProperties();
					}
				}
				var selected = container.getAttribute("selected-index") != null ? Number(container
						.getAttribute("selected-index"))
						: 0;
				container.selectedIndex = selected;
			}
			for (var i = 0, len = fields.length, field; i < len; i++) {
				field = fields[i];
				if (SCUtil.isFunction(field.reset)) {
					field.reset();
				}
				else {
					console.error(field.tagName.toLocaleLowerCase() + '["' + field.id + '"].reset is not function')
				}
			}
			for (var z = 0, len = grids.length, grid; z < len; z++) {
				grid = grids[z];
				if (grid && UT.isNotEmpty(grid.getDataProvider())) {
					grid.getDataProvider().removeAll(false);
					if(SCUtil.isFunction(grid.getDataProvider().clearRemoveItems)){
						grid.getDataProvider().clearRemoveItems();
					}
					this.resetCheckedHeader(grid.getColumns());
				}
			}
			
			for(var f = 0,len = uploaders.length; f < len; f++){
				var uploader = uploaders[f];
				if (SCUtil.isFunction(uploader.reset)) {
					uploader.reset();
				}
			}
			
			for(var p = 0,len = boxes.length; p < len; p++){
				var box = boxes[p];
				if (box.scrollTop) {
					box.scrollTop = 0;
				}
			}
			
			for(var k = 0,len = editors.length; k < len; k++){
				var editor = editors[k];
				if (editor && SCUtil.isFunction(editor.setEditorMode)) {
					editor.syncValue();
					editor.setEditorMode("editor");
				}
			}

			if(targetEle._reset)
                targetEle._reset();
		},
		
		resetCheckedHeader : function(columns) {
			for(var i = 0; i < columns.length; i++){
				if(columns[i].isCheckBoxColumn){
					columns[i].gridColumn._checked = false;
				}
			}
        },

		_destroyed : function() {
			if (this.isDestroyed) {
				return;
			}
			this.isDestroyed = true;
			this.destroyed();
		},
		/* cc-toogle-container에서 사용하는 resizer */
        listeners: {
            "area-resize": "_onResizeListener"
        },
        /* cc-toogle-container에서 사용하는 resizer */
        _onResizeListener: function() {
            var me = this;
            var elements = this.querySelectorAll('sc-grid');
            for (var i = 0, len = elements.length, field; i < len; i++) {
				var element = elements[i];
				element.doContentElementResize();
            }
        }
	};

	var modules = new Polymer.Collection([ 'em', 'es', 'ep', 'smartsuite' ]);
	Polymer.Base._registerBeforeChainObjectProcessor(function(object,
			inherited) {
		var prefix = object.is.split('-')[0];
		if (modules.getKey(prefix)) {
			object.behaviors = (object.behaviors || []);
			object.behaviors.push(Polymer.CCModuleBehavior);
		}
	});

}());