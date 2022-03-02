var memoUtil = {

    alert: function(message, okCallback, i18nDisabled) {
        i18nDisabled = typeof i18nDisabled !== 'undefined' ? i18nDisabled : false;
        SCAlert.show("알림", message, function(btn) {
            if (memoUtil.isFunction(okCallback)) {
                okCallback.call(this);
            }
        }, null, i18nDisabled);
    },

    confirm: function(message, yesCallback, noCallback, i18nDisabled) {
        i18nDisabled = typeof i18nDisabled !== 'undefined' ? i18nDisabled : false;
        SCAlert.confirm("알림", message, function(btn) {
            if (btn === "yes") {
                if (memoUtil.isFunction(yesCallback)) {
                    yesCallback.call(this);
                }
            } else { // no
                if (memoUtil.isFunction(noCallback)) {
                    noCallback.call(this);
                }
            }
        }, null, i18nDisabled);
    },

    request: function(ajax, responseCallback) {
        SCLoadMask.show();
        var listener = function(e) {
            SCLoadMask.hide();
            ajax.removeEventListener("response", listener);
            ajax.removeEventListener("error", listener);
            if (memoUtil.isFunction(responseCallback)) {
                var result;
                if(e.detail.error){
                    result = e.detail;
                }else{
                    result = e.detail.parseResponse();
                }
                responseCallback.call(this, e, {response: result});
            }
        };
        ajax.addEventListener("response", listener);
        ajax.addEventListener("error", listener);
        ajax.generateRequest();
    },

    copy: function(object) {
        if (!memoUtil.isObject(object)) {
            return object;
        }
        if (object instanceof Date) {
            var copy = new Date();
            copy.setTime(object.getTime());
            return copy;
        }
        if (Array.isArray(object)) {
            return object.concat();
        }
        var copy = {};
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                copy[key] = memoUtil.copy(object[key]);
            }
        }
        return copy;
    },

    generateUUID: function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            var v = (c === "x") ? r : (r & 3 | 8);
            return v.toString(16);
        });
    },

    popup: function(popupTagName, element, width, height, events, options) {
        options = options || {};
        var modal = memoUtil.isBoolean(options.modal) ? options.modal : true;
        var maximizable = memoUtil.isBoolean(options.maximizable) ? options.maximizable : false;
        var draggable = memoUtil.isBoolean(options.draggable) ? options.draggable : true;
        var resizable = memoUtil.isBoolean(options.resizable) ? options.resizable : true;
        var closable = memoUtil.isBoolean(options.closable) ? options.closable : true;
        var collapsible = memoUtil.isBoolean(options.collapsible) ? options.collapsible : false;
        var title = memoUtil.isString(options.title) ? options.title : "";

        var popup = SCPopupManager.popup(popupTagName, element, width, height, {
	            modal : modal,
	            closable : closable,
	            maximizable : maximizable,
	            draggable : draggable,
	            resizable : resizable,
	            collapsible : collapsible
				});
			
	        if(memoUtil.isNotEmpty(title)){
	        	popup.titleText = title;
	        }
			
			var content = popup.getWindowContent();
				if (memoUtil.isObject(events)) {
				for (var eventName in events) {
					if (memoUtil.isFunction(events[eventName]) && eventName !== "close") {
						content.addEventListener(eventName, events[eventName].bind(this, popup));
					}
				}
			}
			content.addEventListener("close", function(e) {
			    //content.reset();
				popup.close();
				if (memoUtil.isObject(events)) {
					if (memoUtil.isFunction(events["close"])) {
						events["close"].call(this, popup, e);
					}
				}
			});
        return popup;
    },
    
    isArray: function(object) {
        return Array.isArray(object);
    },

    isString: function(object) {
        return "string" === typeof object;
    },

    isBoolean: function(object) {
        return "boolean" === typeof object;
    },

    isNumber: function(object) {
        return "number" === typeof object;
    },

    isFunction: function(object) {
        return "function" === typeof object;
    },
    
    isObject: function(object) {
        return object !== null && "object" === typeof object;
    },
    
    isDate: function(object) {
        return memoUtil.isObject(object) && typeof object.getTime === "function";
    },

    isEmpty: function(object) {
        return object === null || "undefined" === typeof object || (memoUtil.isObject(object) && !Object.keys(object).length) || (memoUtil.isString(object) && object.trim() === "") || (memoUtil.isArray(object) && object.length === 0);
    },

    isNotEmpty: function(object) {
        return !memoUtil.isEmpty(object);
    }
};

window.memoUtil = memoUtil;