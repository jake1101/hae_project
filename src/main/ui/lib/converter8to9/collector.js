
ExtJsCollector = (function(){
	
	
	
	var collector = function(){
		var me = this;
		me.init();
	};
	
	
	collector.prototype.collectResource = function(sources){
		var me = this;
		
		var Big = (function(){
			var big = function(config){
				if(config){
					this.config = config;
				}
			};
			big.prototype.toJSON = function(){
				if(this.config){
					return this.config;
				}else{
					return 0;
				}
			};
			
			return big;
		})();
		
		var Ext = {
			ns : function(){
				
			},
			defer : function(){
				
			},
			each : function(){
				
			},
			clone : function(target){
				return JSON.parse(JSON.stringify(target));
			},
			define : function(className, config){
				me.extDefineCollections.push({
					className : className,
					config : config
				});
			},
			create : function(className, config){
				//console.warn('Ext.creat Fn is Called With', arguments);
				if(!config){
					config = {};
				}
				
				config.xclass = className;
				return config;
			},
			String : {
				format : function(data){
					return data;
				}
			},
			util : {
				HashMap : (function(){
					var map = function(config){
						if(config){
							this.config = config;
						}
					};
					map.prototype.toJSON = function(){
						if(this.config){
							return this.config;
						}else{
							return {};
						}
					};
					
					return map;
				})()
			},
			data : {
				ArrayStore : (function(){
					var store = function(config){
						if(config){
							this.config = config;
						}
					};
					store.prototype.toJSON = function(){
						if(this.config){
							return this.config;
						}else{
							return [];
						}
					};
					
					return store;
				})()
			},
			Date : {
				patterns : {
					
				},
				getFirstDateOfMonth : function(){
					
				}
			}
		};
		
		var Etna = {
			onDone : function(){
				
			}
		};
		
		this.sourcesStr += sources;
		eval(sources);		
	};
	
	
	collector.prototype.init = function(){
		this.extDefineCollections = [];
		this.sourcesStr = '';
	};
	
	
	collector.prototype._getStartsWithAliasName = function(name){
		var result = [];
		for(var i =0; i < this.extDefineCollections.length ; i++){
			if(this.extDefineCollections[i].config && this.extDefineCollections[i].config.alias && (this.extDefineCollections[i].config.alias.indexOf(name) === 0)){
				result.push(this.extDefineCollections[i]);
			}
		}
		return result;
	};
	
	collector.prototype.getModelClassMap = function(){
		var result = {};
		for(var i =0; i < this.extDefineCollections.length ; i++){
			if(this.extDefineCollections[i].config.extend === 'Ext.data.Model'){
				result[this.extDefineCollections[i].className] = this.extDefineCollections[i];
			}
		}
		return result;
	};
	
	collector.prototype.getViewClassMap = function(){
		var views = this._getStartsWithAliasName('widget.')
		var viewMap = {};
		for(var i =0;i<views.length; i++){
			viewMap[views[i].className] = views[i];
		}
		return viewMap;
	};
	
	collector.prototype.getViews = function(){
		return this._getStartsWithAliasName('widget.');
	};
	
	collector.prototype.getControllerMap = function(){
		var result = {};
		
		var controllers = this.getControllers();
		for(var i =0; i < controllers.length ; i++){
			result[controllers[i].config.alias.replace('controller.','')] = controllers[i];
		}
		return result;
	};
	
	collector.prototype.getControllers = function(){
		return this._getStartsWithAliasName('controller.');
	};
	
	
	collector.prototype.getViewModelMap = function(){
		var result = {};
		
		var viewmodels = this.getViewModels();
		for(var i =0; i < viewmodels.length ; i++){
			result[viewmodels[i].config.alias.replace('viewmodel.','')] = viewmodels[i];
		}
		return result;
	};
	
	collector.prototype.getViewModels = function(){
		return this._getStartsWithAliasName('viewmodel.');
	};
	
	return collector;
})();

