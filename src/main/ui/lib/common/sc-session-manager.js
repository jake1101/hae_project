/**
* SCSessionManager
*/
SCSessionManager = new(function() {
	
	var AJAXSETTINGS = SCPreloader.ajaxSettings(),
		CONVERT = SCPreloader.convert();
	
  	function SessionManagerImpl() {
  		this.userDetails = {
			userInfo : {}
  		};
  		this._callbacks = [];
  		this._session();
  	}
  	
  	SessionManagerImpl.prototype._session = function() { 
  		return $.ajax('getSessionUser.do', AJAXSETTINGS).then(function(response) {
			return CONVERT(response);
		}).done(function(userDetails) {
			this.userDetails = userDetails;
			if(!UT.isEmpty(sessionStorage.site_id)){
				userDetails.userInfo.company_id = sessionStorage.company_id*1;
				userDetails.userInfo.company_name = sessionStorage.company_name;
				userDetails.userInfo.site_id = sessionStorage.site_id*1;
				userDetails.userInfo.site_name = sessionStorage.site_name;
				userDetails.userInfo.att_grp_code = sessionStorage.att_grp_code;
			}
			//타임존 설정
			var currentUser = userDetails.userInfo;
  			var timezone_cd = currentUser.timezone_cd;
  			if("string" === typeof timezone_cd){
  				window.Date = TimeShift.Date;   // 전체 타임존을 사용할경우 적용
  				SCSessionManager.currentUser.last_login_dt = new Date(SCSessionManager.currentUser.last_login_dt);
  				SCSessionManager.currentUser.pw_mod_dt = new Date(SCSessionManager.currentUser.last_login_dt);
  				// 분단위 전환
  				var timezoneOffset = timezone_cd * 60;
  				TimeShift.setTimezoneOffset(-timezoneOffset);
  			}
			this._complete();
		}.bind(this)).fail(function() {
			console.error("사용자 정보 조회중 오류가 발생하였습니다.");
		});
  	};
  	
  	SessionManagerImpl.prototype._complete = function(callback) {
		var callbacks = this._callbacks,
			fn;
		
		this._readied = true;
		//callback run
		while((fn = callbacks.shift(0))) {
			fn()
		}
	};
	
	SessionManagerImpl.prototype.loadSession = SessionManagerImpl.prototype._session; 
	
	SessionManagerImpl.prototype.onReady = function(callback) {
		if(this._readied) {
			return callback();
		}
		this._callbacks.push(callback);
	};
	
	SessionManagerImpl.prototype.isReady = function() {
		return !!this._readied;
	};
	
  	/**
   	* 'SCSessionManager' 의 내부 변수인 user에 입력된 데이터를 조회 합니다. 
   	* @return {Object} user
   	*/
  	SessionManagerImpl.prototype.getCurrentUser = function() {
	  	return this.userDetails.userInfo;
  	};
  	/**
   	* 'SCSessionManager' 의 내부 변수인 user에 입력된 데이터를 삭제 합니다. 
   	*/
  	SessionManagerImpl.prototype.destroy = function() {
  		this.userDetails = null;
  	};
  	/**
   	* 사용자의 패스워드 만료상태를 반환합니다. 
   	*/
  	SessionManagerImpl.prototype.isCredentialsNonExpired = function() {
  		return this.userDetails.credentialsNonExpired;
  	};
  	/**
  	* 사용자의 패스워드 초기화상태를 반환합니다.
  	*/
  	SessionManagerImpl.prototype.isCredentialsNonInitialized = function() {
  		return this.userDetails.credentialsNonInitialized;
  	};
  	/**
  	* 사용자의 패스워드 변경주기를 반환합니다.
  	*/
  	SessionManagerImpl.prototype.getPasswordExpiredPeriod = function() {
  		return this.userDetails.accountSettings.passwordExpiredPeriod;
  	};
  	/**
  	* 패스워드 규칙을 반환합니다.
  	*/
  	SessionManagerImpl.prototype.getPasswordRules = function() {
  		var accountSettings = this.userDetails.accountSettings;
  		
  		return {
  			minLengthRule : accountSettings.passwordMinLengthRule,
  			maxLengthRule : accountSettings.passwordMaxLengthRule,
  			alphabetCharacterRule : accountSettings.passwordAlphabetCharacterRule,
  			digitCharacterRule : accountSettings.passwordDigitCharacterRule,
  			sequenceCharacterRule : accountSettings.passwordSequenceCharacterRule,
  			specialCharacterRule : accountSettings.passwordSepecialCharacterRule,
  			repeatCharacterRule : accountSettings.passwordRepeatCharacterRule,
  		}
  	};
  	
  	SessionManagerImpl.prototype.isRoleAdmin = function() {
  		return (this.userDetails.authorities && Polymer.$Array.find(this.userDetails.authorities, function(role) {
  			return role.authority == 'ROLE_ADMIN';
  		}) != null);
  	};
  	
  	SessionManagerImpl.prototype.isAdminAdditionalAuthentication = function() {
  		return this.userDetails.accountSettings.adminAdditionalAuthentication;
  	};
  	
  	SessionManagerImpl.prototype.isDisableOnSpecifiedDate = function() {
  		return this.userDetails.accountSettings.disableOnSpecifiedDate;
  	};
  	
  	SessionManagerImpl.prototype.getAccountDisableUserNotifyDate = function() {
  		return this.userDetails.accountSettings.accountDisableUserNotifyDate;
  	};
  	
  	SessionManagerImpl.prototype.getAccountDisableForSpecifiedDate = function() {
  		return this.userDetails.accountSettings.accountDisableForSpecifiedDate;
  	};
  	
  	SessionManagerImpl.prototype.getAccountSettings = function() {
  		return this.userDetails.accountSettings;
  	};
  	
  	/**
   	* 'SCSessionManager' 의 내부 변수인 user에 입력된 데이터의 입력 및 조회를 합니다.
   	*/
  	Object.defineProperty(SessionManagerImpl.prototype, "currentUser", {
    	get: function() {
	     	return this.userDetails.userInfo;
    	}
  	});
  	return SessionManagerImpl;
}());