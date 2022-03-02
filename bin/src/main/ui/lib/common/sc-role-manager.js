/**
* SCRoleManager
*/
SCRoleManager = new(function() {
	
	var AJAXSETTINGS = SCPreloader.ajaxSettings(); 
		
	function RoleManagerImpl() {
		this.userRoles = [];
		this._callbacks = [];
		$.ajax('getUserRoles.do', AJAXSETTINGS).done(function(roles) {
			this.userRoles = roles;
			this._complete();
		}.bind(this)).fail(function() {
			console.error("사용자 롤정보 조회중 오류가 발생하였습니다.");
		});
	}
	RoleManagerImpl.prototype._complete = function(callback) {
		var callbacks = this._callbacks,
			fn;
		
		this._readied = true;
		//callback run
		while((fn = callbacks.shift(0))) {
			fn()
		}
	};
	RoleManagerImpl.prototype.onReady = function(callback) {
		if(this._readied) {
			return callback();
		}
		this._callbacks.push(callback);
	};
	RoleManagerImpl.prototype.isReady = function() {
		return !!this._readied;
	};
	RoleManagerImpl.prototype.getUserRoles = function() {
	  	return this.userRoles;
	};
	RoleManagerImpl.prototype.getUserFuncs = function(menuCd) {
		// userRole array 에서 menu_cd 별 func_cd 를 조회, array 에 담아서 리턴
		var funcs = [];
		var compareMenuCd = "";
     	this.userRoles.forEach(function(element, index, array){
     		if(compareMenuCd !== "" && compareMenuCd !== element.menu_cd)
     			return funcs;
      		if(element.menu_cd == menuCd){
				compareMenuCd = menuCd;
				funcs.push(element.func_cd);
       		}
		});		
		return funcs;
	};	  
	RoleManagerImpl.prototype.destroy = function() {
		this.userRoles = null;
	};
	return RoleManagerImpl;
}());