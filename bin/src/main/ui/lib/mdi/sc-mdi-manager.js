/**
 * SCMdiManager
 */
SCMdiManager = new(function() {
	var ADMIN_MENU_CD_PREFIX_REGEXP = new RegExp("ADM\\d+"),
		CONTEXT_PATH = (function() {
			 var pathname = location.pathname;
			 if(pathname.indexOf('.do') > -1) {
				 pathname = pathname.substring(0, pathname.lastIndexOf('/') + 1);
			 }
			 return location.host + pathname;
		}()),
		CSRF = SCPreloader.csrf(),
		AJAXSETTINGS = SCPreloader.ajaxSettings(),
		CONVERT = SCPreloader.convert();

	function MdiManagerImpl() {
		this.locale = SCI18nManager.getLocale();
		this._callbacks = [];
		
		$.when(this._locale(), this._menu(), this._favorite()).then(function() {
			this._complete();
		}.bind(this));
		
		//제거대상...
		this.mdi = document.querySelector('#mdiMain');
		this.startPage = {
			menu_id: "HOME",
            menu_nm: "HOME",
            menu_url: "ui/bp/portal/em-portal.html"	
		};
		
		// RAYCOM 추가
		this.searchParam = {};
	};
	
	MdiManagerImpl.prototype._locale = function() {
		return $.ajax('i18n/getAvailableLocalizedLocales.do', AJAXSETTINGS).done(function(availableLocales) {
			this.availableLocales = availableLocales;
		}.bind(this)).fail(function() {
			this.availableLocales = [{locale : 'ko_KR', displayName : '한국어'}];
			console.error("언어목록 조회중 오류가 발생하였습니다.");
		}.bind(this));
	};
	MdiManagerImpl.prototype._menu = function() {
		return $.ajax('findListMenu.do', $.extend(false, AJAXSETTINGS, {
			data : JSON.stringify({})
		})).done(function(menuList) {
			this.menuList = menuList;
		}.bind(this)).fail(function() {
			this.menuList = [];
			console.error("메뉴 데이터 조회중 오류가 발생하였습니다.");
		}.bind(this));
	};
	MdiManagerImpl.prototype._favorite = function() {
		return $.ajax('findListMyFavorite.do', $.extend(false, AJAXSETTINGS, {
			data : JSON.stringify({})
		})).done(function(favoritList) {
			this.favoritList = favoritList;
		}.bind(this)).fail(function() {
			this.favoritList = [];
		}.bind(this));
	};
	MdiManagerImpl.prototype._complete = function() {
		var callbacks = this._callbacks,
			fn;
		
		this._readied = true;
		//callback run
		while((fn = callbacks.shift(0))) {
			fn()
		}
	};
	
	MdiManagerImpl.prototype.onReady = function(callback) {
		if(this._readied) {
			return callback();
		}
		this._callbacks.push(callback);
	};
	MdiManagerImpl.prototype.isReady = function() {
		return !!this._readied;
	};
	
	MdiManagerImpl.prototype.setLocale = function(locale) {
		this.locale = locale;
	};
	
	MdiManagerImpl.prototype.getLocale = function() {
		return this.locale;
	};
	
	MdiManagerImpl.prototype.getMdi = function() {
		return this.mdi;
	};
	
	MdiManagerImpl.prototype.setAvaiableLocales = function(availableLocales) {
		this.availableLocales = availableLocales;
	};
	
	MdiManagerImpl.prototype.getAvaiableLocales = function(availableLocales) {
		return this.availableLocales;
	};
	
	MdiManagerImpl.prototype.getStartPage = function() {
		return this.startPage;
	}
	
	MdiManagerImpl.prototype.getMenuList = function() {
		return this.menuList;
	};
	
	MdiManagerImpl.prototype.setMenuList = function(menuList) {
		return this.menuList;
	};
	
	MdiManagerImpl.prototype.createWindow = function(menuId, menuName, menuUrl) {
		return this.mdi.$.mdiContent.createWindow(menuId, menuName, menuUrl);
	};
	
	MdiManagerImpl.prototype.removeWindow = function(menuId) {
		return this.mdi.$.mdiContent.removeWindow(menuId);
	};
	
	MdiManagerImpl.prototype.activateWindow = function(menuId) {
		return this.mdi.$.mdiContent.activateWindow(menuId);
	};
	
	MdiManagerImpl.prototype.activatedWindow = function() {
		return this.mdi.$.mdiContent.activatedWindow;
	};
	
	MdiManagerImpl.prototype.doSessionTimer = function() {
		this.mdi._doSessionTimer();
	};
	
	MdiManagerImpl.prototype.findScMdiWindow = function(element) {
		while(!Polymer.DomApi.matchesSelector.call(element, 'sc-mdi-window,sc-window') && element.parentElement) {
			element = element.parentElement;
		}
		if(!element.isMdiWindow && Polymer.DomApi.matchesSelector.call(element, 'sc-window')) {
			element = this.findScMdiWindow(element.windowParentElement);
		}
		return element;
	};
	
	MdiManagerImpl.prototype.getCurrentMenuId = function(element) {
		element = this.findScMdiWindow(element);
		if(element && element.isAttached) {
			return element.getMenuId();
		}
		else if((element = this.activatedWindow())) {
			return element.getMenuId();
		}
		else if(element && !Polymer.DomApi.matchesSelector.call(element, 'sc-code-manager,sc-i18n-provider')) {
			console.error(' 메뉴코드를 가져오지 못하였습니다.')
		}
	};

    MdiManagerImpl.prototype.getCurrentMenuNm = function(element) {
        element = this.findScMdiWindow(element);
        if(element && element.isAttached) {
            return element.getMenuNm();
        }
        else if((element = this.activatedWindow())) {
            return element.getMenuNm();
        }
        else if(element && !Polymer.DomApi.matchesSelector.call(element, 'sc-code-manager,sc-i18n-provider')) {
            console.error(' 메뉴코드를 가져오지 못하였습니다.')
        }
    };
	
	MdiManagerImpl.prototype.logout = function() {
		return this.mdi.logout();
	};
	
	MdiManagerImpl.prototype.getFavoritList = function() {
		return this.favoritList || [];
	};
	
	MdiManagerImpl.prototype.setFavoritList = function(favoritList) {
		return this.favoritList = favoritList || [];
	};
	
	MdiManagerImpl.prototype.hasMenuFavorite = function(menuCd){
		var list = SCMdiManager.getFavoritList();
		for(var i = 0,len = list.length ; i < len ; i++){
    		if(list[i].menu_cd === menuCd){
    			return true;
    		}
    	}
		return false;
	};
	
	MdiManagerImpl.prototype.toogleFavorite = function(menuCd) {
		this.mdi.toogleFavorite(menuCd);
	};
	
	MdiManagerImpl.prototype.hasRole = function(windowUrl, windowId, args) {
		var link = args[1],
			splitedWindowUrl = windowUrl.split('?')[0],
			url = link.href.split(CONTEXT_PATH)[1].split('?')[0],
			menu = this.mdi.$.mdiTopMenu.menuNodeMap[windowId] || 
				(this.startPage.menu_id === windowId && this.startPage);

		if(!menu) {
			console.warn("권한없는 메뉴호출");
			return false;
		}
		//windowUrl.indexOf("&widget=1") < 0 추가 포틀릿에서 파라미터 넘길경우 예외처리
		else if(menu.menu_url.indexOf(url) == -1 || (windowUrl.indexOf("&widget=1") < 0 && menu.menu_url != windowUrl && menu.menu_url != splitedWindowUrl)) {
			console.warn("잘못된 메뉴 url 호출");
			return false;
		}
		return true;
	};
	
	MdiManagerImpl.prototype.isAdminMenu = function(windowId) {
		return ADMIN_MENU_CD_PREFIX_REGEXP.test(windowId);
	};

    MdiManagerImpl.prototype.destroy = function() {
        this.startPage = null;
        this.locale = null;
        this._callbacks = null;
        this.menuList = null;
        this.availableLocales = null;
        this.favoritList = null;
        this.mdi = null;
    };
	
    MdiManagerImpl.prototype.setSearchParam = function(param) {
		this.searchParam = param;
	};
	
	MdiManagerImpl.prototype.getSearchParam= function() {
		return this.searchParam;
	};
	
	return MdiManagerImpl;
	
}());