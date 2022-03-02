/**
 * Util, Grid
 * 9.0에서 사용하던 UT, GRID 메소드 중 9.1에서 사용하지 않는 메소드
 *
 * @class UT, GRID
 */
var UT = {

    /**
     * 권한에 따른 element 노드 삭제
     *
     * @method checkAuth
     * @param  {object} element     element
     * @param  {string} selector     삭제할 css selector
     * @param  {string} funcCd        기능 코드
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         UT.cehckAuth(me, "auth-r', DEF.READ);
     *     }
     */
   checkAuth : function (element, selector, funcCd) {
       var menuId = UT.getMenuId(element);
       var authList = [];
       if (menuId) {
           authList = SCRoleManager.getUserFuncs(menuId);
       }
       if(authList.indexOf(funcCd) == -1) {
           var nodes = Polymer.dom(element.root).querySelectorAll('.' + selector);
           var parentNode;
           if(nodes != null) {
               for (var i = 0, len = nodes.length; i < len; i++) {
                   parentNode = Polymer.dom(nodes[i]).parentNode;
                   Polymer.dom(parentNode).removeChild(nodes[i]);
               }
           }
       }
   },

    /**
     * 화면 생성 및 상위노드에 추가
     *
     * @method createModule
     * @param  {object} parentNode    상위 노드
     * @param  {string} moduleTagName 모듈 태그 명
     * @param  {string} [cssName]     css class 명
     * @param  {array}  [authList]    권한
     * @return {object}
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         var detail = UT.createModule(me.$.pages, "es-module", "vbox");
     *         detail.addEventListener("attached", function() {
     *             ...
     *         });
     *     }
     */
   createModule: function(parentNode, moduleTagName, cssName, authList) {
       var module = document.createElement(moduleTagName);
       // To-Do : authList properties 시점 문제 없는지 확인
       module.authList = authList;

       Polymer.dom(parentNode).appendChild(module);
       if (UT.isString(cssName)) {
           module.classList.add(cssName);
       }

       //To-DO : 인덱스 방식 수정 필요, 2016.05.16수정 : 현재노드를 선택하도록 수정.
       //appendChild한 내용을 flush처리한다.
       Polymer.dom.flush();
       //해당 module을 선택한다.
       parentNode.selectItem(module);
       return module;
   },

    /**
     * save 요청 - "저장하시겠습니까?" 메시지 출력
     *
     * @method save
     * @param {object}  ajax                        sc-ajax 객체
     * @param {object}  [options]
     * @param {string}  [options.message]           "저장하시겠습니까?" 와 다른 메시지를 출력하는 경우.
     * @param {function}[options.onResponse(res)]   저장 완료 후 콜백 함수
     * @param {object}  options.onResponse(res).res 결과 정보
     * <pre>
     * &lt;sc-ajax url="url" on-response="func">&lt;/sc_ajax>
     * on-response 에 함수를 지정한 경우        : 해당 함수에서 UT.completeSave를 호출해줘야 한다.
     * on-response 에 함수를 지정하지 않은 경우 : options.onResponse 을 정의하여 response를 받을 수 있다
     * </pre>
     * @param {boolean} [options.confirm=true]         UT.confirm 수행 여부
     * @param {function}[options.cancelCallback]       confrim 에서 취소 했을 때 콜백 함수
     * @param {string|array}[options.attachGrpCdNames] 첨부파일 처리시. ajax.body 내에 저장될 grp_cd 필드
     * @param {string|array}[options.attachUploadIds]  첨부파일 처리시. 업로드 Id
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         me.$.saveInfo.body = {
     *             attachGrpCdNames: attNo,                // 첨부파일
     *             attachUploadIds: me.$.upload.getId(),   // 첨부파일
     *             message: message,
     *             cancelCallback: function() {
     *                 ...
     *             }
     *         };
     *         UT.save(me.$.saveInfo);
     *     }
     */
//    save: function(ajax, options) {
//        options = options || {};
//        var fn = function() {
//
//            var uploads = [];
//            var responseCallback = function(e, res) {
//                for (var i = 0, len = uploads.length; i < len; i++) {
//                    UPLOAD.onLoadFiles(uploads[i].uploadId, uploads[i].grpCd);
//                }
//                if (UT.isFunction(options.onResponse)) {
//                    options.onResponse.call(this, e, res);
//                }
//            };
//
//            var attachUploadIds = options.attachUploadIds || "";
//            var attachGrpCdNames = options.attachGrpCdNames || "";
//            if (attachUploadIds && attachGrpCdNames) {
//                attachUploadIds = [].concat(attachUploadIds);
//                attachGrpCdNames = [].concat(attachGrpCdNames);
//
//                UPLOAD.onUpload(attachUploadIds, function(files) {
//                    var param = {
//                        insertAttachs: [],
//                        deleteAttachs: []
//                    };
//
//                    for (var uploadId in files) {
//                        var object = files[uploadId];
//                        var index = _getIndex(uploadId);
//                        var grpCd = _getGrpCd(attachGrpCdNames[index]);
//                        for (var i = 0, len = object.inserts.length; i < len; i++) {
//                            param.insertAttachs.push({
//                                grp_cd: grpCd,
//                                orgn_file_nm: object.inserts[i].originalName,
//                                att_file_nm: object.inserts[i].uploadName,
//                                att_file_path: object.inserts[i].uploadPath,
//                                att_file_siz: object.inserts[i].size,
//                                sort_ord: object.inserts[i].order,
//                                store_type: object.storeType
//                            });
//                        }
//                        for (var i = 0, len = object.deletes.length; i < len; i++) {
//                            param.deleteAttachs.push({
//                                att_id: object.deletes[i].uniqKey
//                            });
//                        }
//                        _setGrpCd(attachGrpCdNames[index], object.uploadedCount > 0 ? grpCd : ""); // 첨부파일이 없으면 grpCd를 지운다
//                        uploads.push({
//                            uploadId: uploadId,
//                            grpCd: grpCd
//                        });
//                    }
//                    if (param.insertAttachs.length > 0 || param.deleteAttachs.length > 0) {
//                        UT.ajax("saveListAttach.do", param, function() { // 첨부파일 정보 저장
//                            UT.request(ajax, responseCallback);
//                        });
//                    } else {
//                        UT.request(ajax, responseCallback);
//                    }
//                });
//            } else {
//                UT.request(ajax, responseCallback);
//            }
//        };
//        if (options.confirm === false) {
//            fn();
//        } else {
//            UT.confirm(options.message || I18N.translate(MSG.N1200), fn, options.cancelCallback); // 저장하시겠습니까?
//        }
//    },
//
//    _getIndex : function(uploadId) { // uploadId의 index를 구한다
//        var index = 0;
//        for (var i = 0, len = attachUploadIds.length; i < len; i++) {
//            if (uploadId === attachUploadIds[i]) {
//                index = i;
//                break;
//            }
//        }
//        return index;
//    },
//
//    _getGrpCd : function(propertyNames) { // 첨부파일 그룹코드를 구한다
//        var value = "";
//        var object = ajax.body;
//        var names = propertyNames.split(".");
//        for (var i = 0, len = names.length; i < len; i++) {
//            if (i === len - 1) {
//                value = object[names[i]];
//            } else {
//                object = object[names[i]];
//            }
//        }
//        return value ? value : UT.generateUUID();
//    },
//
//    _setGrpCd : function(propertyNames, value) { // 첨부파일 그룹코드를 설정한다
//        var object = ajax.body;
//        var names = propertyNames.split(".");
//        for (var i = 0, len = names.length; i < len; i++) {
//            if (i === len - 1) {
//                object[names[i]] = value;
//            } else {
//                object = object[names[i]];
//            }
//        }
//    },

    /**
     * 삭제 요청 - "삭제하시겠습니까?" 메시지 출력
     *
     * @method onDelete
     * @param {object}  ajax                        sc-ajax 객체
     * @param {object}  [options]
     * @param {string}  [options.message]           "삭제하시겠습니까?" 와 다른 메시지를 출력하는 경우.
     * @param {function}[options.onResponse(res)]   삭제 완료 후 콜백 함수
     * @param {object}  options.onResponse(res).res 처리 결과 정보
     * <pre>
     * &lt;sc-ajax url="url" on-response="func">&lt;/sc_ajax>
     * on-response 에 함수를 지정한 경우        : 해당 함수에서 UT.completeDelete를 호출해줘야 한다.
     * on-response 에 함수를 지정하지 않은 경우 : options.onResponse 을 정의하여 response를 받을 수 있다
     * </pre>
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         UT.onDelete(me.$.deleteInfo);
     *     }
     */
   onDelete: function(ajax, options) {
       options = options || {};
       UT.confirm(options.message || I18N.translate(MSG.N1300), function() { // 삭제하시겠습니까?
           UT.request(ajax, options.onResponse);
       });
   },

    /**
     * UT.request 에 대한 요청 완료
     *
     * @method completeRequest
     * @param {object}   options                    옵션
     * @param {object}   options.result             서버에서의 처리 결과 result.result_status 가 S 이면 성공, 나머지는 실패
     * @param {object}   [options.success]          성공시 처리
     * @param {string}   [options.success.message]  성공시 메시지
     * @param {function} [options.success.callback] 성공시 호출될 콜백 함수
     * @param {object}   [options.failure]          실패시 처리
     * @param {string}   [options.failure.message]  실패시 메시지
     * @param {function} [options.failure.callback] 실패시 호출될 콜백 함수
     * @async
     * @example
     *     someFunction: function(result) {
     *         var me = this;
     *         UT.completeRequest({
     *             result: result,
     *             success: {
     *                 message: I18N.translate(MSG.N1500),
     *                 callback: function() {
     *                     ...
     *                 }
     *             },
     *             failure: {
     *                 message: UT.failureMessage(result),
     *                 callback: function() {
     *                     ...
     *                 }
     *             }
     *         });
     *     }
     */
   completeRequest: function(options) {
   	options = options || {};
       if (UT.isObject(options.result) && options.result.result_status === DEF.SUCCESS) {
           var success = options.success || {};
           var callback = function() {
               if (UT.isFunction(success.callback)) {
                   success.callback.call(this);
               }
           };
           if (UT.isString(success.message)) {
               UT.alert(success.message, callback);
           } else {
               callback();
           }
       } else {
           var failure = options.failure || {};
           var callback = function() {
               if (UT.isFunction(failure.callback)) {
                   failure.callback.call(this);
               }
           };
           if (UT.isString(failure.message)) {
               UT.alert(failure.message, callback);
           } else {
               callback();
           }
       }
   },

    /**
     * UT.save 에 대한 요청 완료
     *
     * @method completeSave
     * @param {object}   result            서버에서의 처리 결과
     * @param {function} [successCallback] 처리결과가 성공이었을 때 콜백 함수
     * @param {function} [failureCallback] 처리결과가 실패였을 때 콜백 함수
     * @async
     * @example
     *     someFunction: function(e, res) {
     *         var me = this;
     *         UT.completeSave(res.response, function() {
     *             ...
     *         });
     *     }
     */
   completeSave: function(result, successCallback, failureCallback) {
       UT.completeRequest({
           result: result,
           success: {
               message: I18N.translate(MSG.N1500), // 요청을 완료 하였습니다
               callback: successCallback
           },
           failure: {
               message: UT.failureMessage(result),
               callback: failureCallback
           }
       });
   },

    /**
     * UT.onDelete 에 대한 요청 완료
     *
     * @method completeDelete
     * @param {object}   result            서버에서의 처리 결과
     * @param {function} [successCallback] 처리결과가 성공이었을 때 콜백 함수
     * @param {function} [failureCallback] 처리결과가 실패였을 때 콜백 함수
     * @async
     * @example
     *     someFunction: function(e, res) {
     *         var me = this;
     *         UT.completeDelete(res.response, function() {
     *             ...
     *         });
     *     }
     */
   completeDelete: function(result, successCallback, failureCallback) {
       UT.completeRequest({
           result: result,
           success: {
               message: I18N.translate(MSG.N1500), // 요청을 완료 하였습니다
               callback: successCallback
           },
           failure: {
               message: UT.failureMessage(result),
               callback: failureCallback
           }
       });
   },

    /**
     * 서버로의 요청 결과에 대한 실패 메시지
     *
     * @method failureMessage
     * @param  {object} result 서버에서의 처리 결과
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         UT.completeRequest({
     *             result: result,
     *             ...
     *             failure: {
     *                 message: UT.failureMessage(result)
     *             }
     *         });
     *     }
     */
    failureMessage: function(result) {
        var message = I18N.translate(MSG.E9999); // 오류가 발생하였습니다.\n관리자에게 문의하세요
        if(UT.isNotEmpty(result)){
            if (result.result_status === DEF.DUPLICATED) {
                message += " - " + I18N.translate(MSG.E9100); // 중복 데이터
            } else if (result.result_status === DEF.USED) {
                message += " - " + I18N.translate(MSG.E9200); // 사용중 데이터
            } else if (result.result_status === DEF.RFX_ERR){
                message = I18N.translate(MSG.RFX1022);        //RFX 마감됨
            } else if (result.result_status === DEF.RFX_REJECT){
                message = I18N.translate(MSG.QTA1018);        //RFX 포기건이 존재함
            } else if (result.result_status === DEF.QTA_SUBMIT){
                message = I18N.translate(MSG.QTA1022);        //RFX 견적 제출건이 존재함(견적 임시저장 불가)
            } else if (result.result_status === DEF.RFX_CLOSE_BYPASS_ERR){ //RFX CLOSE BYPASS ERR
                message = I18N.translate("RFX 강제 마감시 오류가 발생하였습니다.");
            }
            //해당 error에 대한 사유
            if(UT.isNotEmpty(result.result_reject_message)){
                message += "\n" + I18N.translate(result.result_reject_message);
            }
            //error 메세지 전체 처리
            if(UT.isNotEmpty(result.result_message)){
                message = "\n" + I18N.translate(result.result_message);
            }
        }
        return message;
    },

    // 불필요 하다고 판단되어 삭제
   popupZipcode: function(element, selectedCallback) {
   	SCLoadMask.show();

       Polymer.Base.importHref("../../../../../ui/bp/shared/ep-zipcode.html", function(e) {
       	SCLoadMask.hide();

           UT.popup("ep-zipcode", element, 800, 600, {
               "selected-zipcode": function(popup, e) {
                   if (UT.isFunction(selectedCallback)) {
                       selectedCallback.call(this, e.detail, popup);
                   }
               }
           });
       }, function(e){
       	SCLoadMask.hide();
       });
   },


    /**
     * 첨부파일 업로드 팝업
     * <br>
     * 콜백함수로부터 첨부파일 그룹코드와 파일 개수가 전달된다.
     *
     * @method popupAttach
     * @param {object}   element                                 element
     * @param {string}   grpCd                                   첨부파일 그룹코드
     * @param {function} [savedCallback(result)]                 파일 저장 후 콜백 함수
     * @param {object}   savedCallback(result).result            콜백함수로부터 전달 되는 파라미터 - (예) {grp_cd: "xxx", file_count: 2}
     * @param {string}   savedCallback(result).result.grp_cd     첨부파일 그룹코드
     * @param {number}   savedCallback(result).result.file_count 업로드된 파일 총 수
     * @param {object}   [options]                               업로더 설정 옵션
     * @param {number}   [options.maxTotalFileCount=0]           객최대 파일 개수, 0 : 제한없음.
     * @param {string}   [options.maxTotalFileSize=0]            업로드 될 파일의 총 용량. 단위 - B(byte), KB(kilobyte), MB(megabyte), GB(gigabyte)
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         me.gridView.onDataCellClicked = function(grid, cell) {
     *             var fieldName = cell.fieldName;
     *             if(fieldName == "field1"){
     *                 UT.popupAttach(me, me.data.field2, function(result) {
     *                     grid.setValues(cell.itemIndex, {
     *                         field2: result.grp_cd,
     *                         field1: result.file_count
     *                     }, true);
     *                 });
     *             }
     *         };
     *     }
     */
    popupAttach: function(element, grpCd, savedCallback, options) {
        SCLoadMask.show();

        Polymer.Base.importHref("../../../../../ui/bp/shared/ep-attach.html", function(e) {
            SCLoadMask.hide();

            UT.popup("ep-attach", element, 800, 400, {
                "attached": function(popup, e) {
                    popup.getContent().setParam({
                        grp_cd: grpCd || ""
                    });
                    popup.getContent().setUploadOptions(options);
                },
                "saved-attach": function(popup, e) {
                    if (UT.isFunction(savedCallback)) {
                        savedCallback.call(this, e.detail);
                    }
                }
            });
        }, function(e){
            SCLoadMask.hide();
        });
    },

    /**
     * 객체 선택 팝업
     *
     * @method popupSelectObject
     * @param {string}   popupTagName                        팝업으로 사용할 tag name
     * @param {object}   element                             element
     * @param {function} selectedCallback(selected)          선택된 데이터를 리턴하는 콜백 함수
     * @param {object}   selectedCallback(selected).selected 선택된 데이터
     * @param {object}   [options]
     * @param {boolean}  [options.singleSelect=false]        객체의 단일 선택 여부
     * @param {boolean}  [options.selectAfterClose=true]     검색 결과가 복수 일 경우 팝업에서 선택 후 창 닫기
     * @param {number}   [options.width=650]                 팝업 가로 크기
     * @param {boolean}  [options.height=500]                팝업 세로 크기
     * @param {array}    [options.dataRows=rows]             팝업의 그리드에 전달할 row 데이터
     * @param {object}   [options.defaultParam=param]        팝업 검색 파라미터
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         UT.popupSelectObject("ep-module", me, function(selected) {
     *             ...
     *             me.onAdd(selected);
     *         });
     *     }
     */
   popupSelectObject: function(popupTagName, element, selectedCallback, options) {
       options = options || {};
       options.singleSelect = UT.isBoolean(options.singleSelect) ? options.singleSelect : false;
       options.selectAfterClose = UT.isBoolean(options.selectAfterClose) ? options.selectAfterClose : true;
       options.width = UT.isNumber(options.width) ? options.width : 650;
       options.height = UT.isNumber(options.height) ? options.height : 500;
       options.title = UT.isString(options.title) ? options.title : "";

       return UT.popup(popupTagName, element, options.width, options.height, {
           "attached": function(popup, e) {
               popup.getContent().setOptions(options);
               if (!options.dataRows) {
                   popup.getContent().onFindList();
               }
           },
           "selected-items": function(popup, e) {
               selectedCallback.call(this, e.detail);
               if (options.selectAfterClose) {
                   popup.close();
               }
           }
       },options);
   },

    /**
     * 자동완성 검색 팝업
     * 1. 팝업의 getAjaxUrl 메소드로 부터 ajax url을 전달받아 ajax 요청
     * 2. 결과 값이 하나일 경우 팝업 생성 없이 조회 결과 전달
     * **ep-user-list**: 사용자 검색, **ep-job-list**:구매그룹검색, **ep-dept-list**: 부서 검색
     *
     * @method autoCompletePopup
     * @param {string}   popupTagName                        팝업으로 사용할 tag name
     * @param {object}   element                             element
     * @param {object}   param                               데이터 검색 파라미터
     * @param {function} selectedCallback(selected)          검색된(선택된) 데이터를 리턴하는 콜백 함수
     * @param {object}   selectedCallback(selected).selected 검색된(선택된) 데이터
     * @param {object}   [options]
     * @param {number}   [options.width=650]                 팝업 가로 크기
     * @param {boolean}  [options.height=500]                팝업 세로 크기
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         UT.autoCompletePopup("ep-module", me, {"usr_nm": me.value}, function(result) {
     *             ...
     *         });
     *     }
     */
    autoCompletePopup: function(popupTagName, element, width, height, param, events, options) {
        var popup;
        options = options || {};
        //TODO : 변경필요
        popup = UT.popup(popupTagName, element, width, height, events, options);
        popup.show();

        UT.$ajax(popup.getWindowContent().getAjaxUrl(), param, function(result) {
            if (UT.isArray(result)) { // 배열
                if (result.length > 1) {
                }
                else if(result.length === 1){
                    popup.close();
                }
                else{
                    popup.getWindowContent().load();
                }
            }
        }, element);
        /*var createElement = document.createElement(popupTagName);
         UT.$ajax(createElement.getAjaxUrl(), param, function(result) {
         if (UT.isArray(result)) { // 배열
         if (result.length > 1) {
         popup = UT.popup(popupTagName, element, width, height, events, options);
         }
         else{
         this.fire('selected-items', result);
         }
         }
         }, element);*/
        return popup;
    },

    /**
     * 코드 로드
     * sc-service-group 요청 및 요청완료를 promise로 반환한다.
     *
     * @method promiseCodes
     * @param {object}   codes             sc-service-group
     * @param {function} [loadedCallback]  sc-service-group이 모두 load 된 후 콜백 함수
     * @async
     * @deprecated Use 'UT.promise' instead.
     */
   promiseCodes: function(codes, loadedCallback) {
       return new Promise(function(resolve, reject) {
           codes.addEventListener("result", function() {
               resolve("codes-loaded");
               if (UT.isFunction(loadedCallback)) {
                   loadedCallback.call(this);
               }
           });
           codes.service();
       });
   },

    /**
     * promise 처리
     *
     * @method promise
     * @param  {array}    elements          sc-service-group 과 같이 service() 함수를 가지는 element 이거나, Promise 를 리턴하는 함수
     * @param  {function} [loadedCallback]  elements 가 모두 load 된 후 콜백 함수
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         UT.promise([me.$.codes, me.$.editor, me.$.upload], function() {
     *             me.setupGrid();
     *             ...
     *         });
     *     }
     */
   promise: function(elements, loadedCallback) {
       var fn = function(element) {
           return new Promise(function(resolve, reject) {
               element.addEventListener("result", function(e) {
                   resolve("promised-" + e.detail);
               });
               element.service();
           });
       };
       var promise = [];
       for (var i = 0, len = elements.length; i < len; i++) {
           if (elements[i] instanceof Promise) {
               promise.push(elements[i]);
           } else {
               promise.push(fn(elements[i]));
           }
       }
       Promise.all(promise).then(function(values) {
           if (UT.isFunction(loadedCallback)) {
               loadedCallback.call(this);
           }
       });
   }
};

/**
 * 그리드에서 자주 사용하는 method를 정의한다
 *
 * @class GRID
 */
var ACTIVE_GRID;
(function() {
    document.addEventListener('click', function(event) {
        var containerElement;
        if(ACTIVE_GRID && (containerElement = ACTIVE_GRID._gv._container.containerElement())) {
            if(!(containerElement && containerElement.contains(event.target))) {
                if(event.target.tagName !== 'SPAN'){
                    ACTIVE_GRID.commit();
                }
            }
        }
    })

    document.addEventListener('mousedown', function(event) {
        var containerElement;
        if(ACTIVE_GRID && (containerElement = ACTIVE_GRID._gv._container.containerElement())) {
            if(containerElement && containerElement.contains(event.target)) {
                if(event.target.tagName !== 'INPUT'){
                    var dt = ACTIVE_GRID._gv._container._activeTool._dragTracker;
                    if(!(dt && dt._canAccept(event.mouseX, event.mouseY))) {
                        ACTIVE_GRID.commit();
                    }
                }
            }
        }
    })
}())
var GRID = {

    /**
     * 그리드 생성
     *
     * @method createGridView
     * @param {object} container container
     * @param {array}  fields    그리드 fields 정보
     * @param {array}  columns   그리드 columns 정보
     * @param {object} [configOptions] - GRID.setConfig 참조
     * @return {object} grid
     * @example
     *     initGrid: function() {
     *         var me = this;
     *         var fields = [
     *             "field1",
     *             "field2 | datetime",
     *             "field3 | number"
     *         ];
     *         var columns = [
     *             "field1 | 필드1 | 150 | near",
     *             "field2 | 필드2 | 150",
     *             "field3 | 필드3 | 150"
     *         ];
     *         var validator = [];
     *         validator.push({
     *             fieldName: "field1",
     *             check: ["required", "!space", "unique"],
     *             maxLength: 18
     *         });
     *
     *         me.gridView = GRID.createGridView(me.$.gridPanel, fields, columns, {
     *             actionFields: ["field1"],
     *             editableFields: ["field2"],
     *             editableCheckFields: ["field3"],
     *             insertedAfterEditableFields: ["field1"],
     *             checkableExpression: "value['field3'] = 0",
     *             itemCountPropertyBinding: function(itemCount) {
     *                 me.set("gridItemCount", itemCount);
     *             },
     *             validator: validator
     *         });
     *     }
     */
    /*createGridView: function(container, fields, columns, configOptions) {
     var gridId = container.contentId;
     var gridView = new RealGridJS.GridView(gridId);
     gridView.setDataSource(new RealGridJS.LocalDataProvider());
     GRID.setConfig(gridView, fields, columns, configOptions);
     GRID.onCellEditorChange(gridView);
     GRID.addResizeEvent(gridView, container);
     gridView.setStyles(blueSkySkin);
     return gridView;
     },*/

    /**
     * 트리 그리드 생성
     *
     * @method createTreeView
     * @param {object} container container
     * @param {array}  fields    그리드 fields 정보
     * @param {array}  columns   그리드 columns 정보
     * @param {object} [configOptions] - GRID.setConfig 참조
     * @return {object} grid
     * @example
     *     initGrid: function() {
     *         var me = this;
     *         var fields = [
     *             "field1",
     *             "field2 | datetime",
     *             "field3 | number"
     *         ];
     *         var columns = [
     *             "field1 | 필드1 | 150 | near",
     *             "field2 | 필드2 | 150",
     *             "field3 | 필드3 | 150"
     *         ];
     *         me.gridView = GRID.createTreeView(me.$.gridPanel, fields, columns, {
     *             editableCheckFields: ["field1"],
     *             treeItemCheckedMode: "children",
     *             itemCountPropertyBinding: function(itemCount) {
     *                 me.set("gridItemCount", itemCount);
     *             }
     *         });
     *     }
     */
    /*createTreeView: function(container, fields, columns, configOptions) {
     var gridId = container.contentId;
     var gridView = new RealGridJS.TreeView(gridId);
     gridView.setDataSource(new RealGridJS.LocalTreeDataProvider());
     GRID.setConfig(gridView, fields, columns, configOptions);
     GRID.onCellEditorChange(gridView);
     GRID.addResizeEvent(gridView, container);
     gridView.setStyles(blueSkySkin);
     return gridView;
     },*/

    /**
     * 그리드 리사이즈 event 리스너 추가
     *
     * @private
     * @method addResizeEvent
     * @param {object} gridView  grid
     * @param {object} container
     * @example
     *     createGridView: function(container, fields, columns, configOptions) {
     *         ...
     *         GRID.addResizeEvent(gridView, container);
     *         ...
     *     }
     */
    addResizeEvent: function(gridView, container){
        if (container) {
            container.addEventListener("content-resize", function() {
                gridView.resetSize();
            });
        }
    },

    /**
     * 편집 가능한 셀 클릭으로 editor 가 보여지는 경우, ACTIVE_GRID 에 현재 그리드 세팅
     *
     * @private
     * @method onCellEditorChange
     * @param {object} gridView  grid
     * @example
     *     createGridView: function(container, fields, columns, configOptions) {
     *         ...
     *         GRID.onCellEditorChange(gridView);
     *         ...
     *     }
     */
    onCellEditorChange : function(gridView) {
        gridView.onShowEditor = function(id, index) {
            ACTIVE_GRID = gridView;
        };

        gridView.onHideEditor = function(id, index) {
            ACTIVE_GRID = null;
        };
    },

    /**
     * 그리드 설정
     *
     * @method setConfig
     * @param {object}  gridView  grid
     * @param {array}   fields    그리드 fields 정보
     * @param {array}   columns   그리드 columns 정보
     * @param {object}  [options]
     * @param {array}   [options.actionFields]                action 컬럼
     * @param {array}   [options.editableFields]              편집가능 컬럼
     * @param {array}   [options.editableCheckFields]         checkbox 컬럼
     * @param {array}   [options.insertedAfterEditableFields] 신규 row 추가 후 편집 가능 컬럼
     * @param {array}   [options.validator]                   유효성 검사 설정
     * @param {string}  [options.checkableExpression]         checkBar의 체크 가능 설정. (예)"value['use_count_org'] = 0"
     * @param {string}  [options.treeItemCheckedMode]         leaf: 하위 노드가 없는 것만 체크 가능, children: 하위 노드 모두 체크, ancestor: 상위 노드 모두 체크
     * @param {boolean} [options.enableContextMenu=true]      context menu 활성 여부
     * @param {function}[options.itemCountPropertyBinding]    grid item count property bind  - 그리드의 데이터 수 표시값 바인드 함수
     * @param {function}[options.onRowInsertedHandler]        onRowInserted handler
     * @param {function}[options.onRowAddedHandler]           onRowAdded handler
     * @param {function}[options.onItemCheckedHandler]        onItemChecked handler
     * @param {function}[options.onCellEditedHandler]         onCellEdited handler
     * @param {function}[options.onFilteringChangedHandler]   onFilteringChanged handler
     * @async
     * @example
     *     createGridView: function(container, fields, columns, configOptions) {
     *         ...
     *         GRID.setConfig(gridView, fields, columns, configOptions);
     *         ...
     *     }
     */
    setConfig: function(gridView, fields, columns, options) {
        var isTreeView = UT.isFunction(gridView.setTreeOptions); // tree 인지.
        var provider = gridView.getDataProvider();

        gridView.$$Custom$$ = {}; // 커스텀 설정.

        GRID.setDefaultOptions(gridView);
        GRID.setFields(gridView, fields);
        GRID.setColumns(gridView, columns);

        options = options || {};
        if (UT.isArray(options.actionFields)) { // 배열
            GRID.setActionColumn(gridView, options.actionFields); // action 컬럼
        }
        if (UT.isArray(options.editableFields)) { // 배열
            GRID.setEditableColumn(gridView, options.editableFields); // editable 컬럼
        }
        if (UT.isArray(options.editableCheckFields)) { // 배열
            GRID.setCheckboxColumn(gridView, options.editableCheckFields); // 체크박스 컬럼
        }
        if (UT.isString(options.checkableExpression)) {
            gridView.setCheckableExpression(options.checkableExpression, true); // checkBar의 checkable 조건식
        }
        if (UT.isFunction(options.itemCountPropertyBinding)) {
            gridView.$$Custom$$.itemCountPropertyBinding = options.itemCountPropertyBinding; // 그리드의 커스텀 함수로 만듬.
        }
        if (UT.isArray(options.validator)) { // 배열
            GRID.setValidator(gridView, options.validator); // validator 설정
        }
        if (options.visibleDummyColumn !== false) { //
            GRID.setFlexibleColumn(gridView, DEF.DUMMY); //
        }

        if (isTreeView) { // 트리인 경우에만.
            if (UT.isString(options.treeItemCheckedMode)) { // 트리의 check 모드 설정
                if (options.treeItemCheckedMode === "leaf") {
                    gridView.setCheckableExpression("count = 0", true); // 하위 노드가 없는 것만 체크 가능
                }
            }
            // checkBar의 체크박스 클릭 이벤트 함수
            gridView.onItemChecked = function(grid, index, checked) {
                if (UT.isString(options.treeItemCheckedMode)) { // 트리의 check 모드 설정
                    if (options.treeItemCheckedMode.indexOf("children") > -1) { // 하위 노드 모두 체크
                        if (checked) {
                            grid.checkChildren(index, checked, true, false);
                            grid.expand(index, true);
                        }
                    }
                    if (options.treeItemCheckedMode.indexOf("ancestor") > -1) { // 상위 노드 모두 체크
                        if (checked) {
                            grid.checkItems(grid.getAncestors(index));
                        }
                    }
                }
                if (UT.isFunction(options.onItemCheckedHandler)) {
                    options.onItemCheckedHandler.call(this, grid, index, checked);
                }
            };
        }

        // 데이터 행 추가 후 이벤트 함수
        if (UT.isFunction(provider.insertRow)) { // grid 인 경우
            provider.onRowInserted = function(prov, row) {
                if (UT.isArray(options.insertedAfterEditableFields)) { // 배열
                    gridView.setCellStyles(row, options.insertedAfterEditableFields, DEF.styles.editable.id);
                }
                if (UT.isFunction(options.onRowInsertedHandler)) {
                    options.onRowInsertedHandler.call(this, prov, row);
                }
            };
        }
        if (UT.isFunction(provider.addChildRow)) { // tree 인 경우
            provider.onRowAdded = function(prov, rowId) {
                if (UT.isArray(options.insertedAfterEditableFields)) { // 배열
                    setTimeout(function() {
                        gridView.setCellStyles(prov.getStateRows("created"), options.insertedAfterEditableFields, DEF.styles.editable.id);
                    }, 10);
                }
                if (UT.isFunction(options.onRowAddedHandler)) {
                    options.onRowAddedHandler.call(this, prov, rowId);
                }
            };
        }

        // 셀 수정 완료 후 이벤트 함수
        gridView.onCellEdited = function(grid, itemIndex, dataRow, field) { // cell 의 편집이 완료 되었을 때 호출된다.
            GRID.commit(grid);

            // 소수점 자리 체크 로직 추가
            if(UT.isArray(grid.$$Custom$$.precisionFields) && UT.isNumber(grid.getValue(itemIndex, field)) ){
                var arrFields = grid.$$Custom$$.precisionFields;

                for(var i = 0, len = arrFields.length; i < len; i++){
                    var provider  = grid.getDataProvider();
                    var fieldName = provider.getFieldName(field);

                    // 필드
                    if( (arrFields[i].fieldName).toUpperCase() == fieldName ){
                        if(UT.isNumber(arrFields[i].precision) ){
                            var value    = grid.getValue(itemIndex, field); 		// 현재 row의 값
                            var fixValue = value.toFixed(arrFields[i].precision);	// 소수점 자리수

                            grid.setValue(itemIndex, fieldName, fixValue);
                        }
                    }
                }
            }

            if (UT.isFunction(options.onCellEditedHandler)) {
                options.onCellEditedHandler.call(this, grid, itemIndex, dataRow, field);
            }

        };

        // 필터 상태 변경 이벤트 함수
        gridView.onFilteringChanged = function(grid) {
            GRID.itemCountPropertyBinding(grid);
            if (UT.isFunction(options.onFilteringChangedHandler)) {
                options.onFilteringChangedHandler.call(this, grid);
            }
        };

        if (options.enableContextMenu !== false) {
            // context menu 설정
            gridView.setContextMenu([
                {label: I18N.translate(MSG.G_FILTER), tag: "filter", enabled: !isTreeView}, // 필터
                {label: I18N.translate(MSG.G_FILTER_CLEAR), tag: "filter-clear", enabled: !isTreeView}, // 필터 해제
                {label: "-"},
                {label: I18N.translate(MSG.G_FIXCOL), tag: "fixcol"}, // 세로 틀고정
                {label: I18N.translate(MSG.G_FIXCOL_CLEAR), tag: "fixcol-clear"}, // 세로 틀고정 해제
                {label: "-"},
                {label: I18N.translate(MSG.G_FIXROW), tag: "fixrow", enabled: !isTreeView}, // 가로 틀고정
                {label: I18N.translate(MSG.G_FIXROW_CLEAR), tag: "fixrow-clear", enabled: !isTreeView}, // 가로 틀고정 해제
                {label: "-"},
                {label: I18N.translate(MSG.G_EXCEL_DOWNLOAD), tag: "excel"} // 엑셀 다운로드
            ]);
            // context menu item 클릭 이벤트
            gridView.onContextMenuItemClicked = function(grid, label, index) {
                switch (label.tag) {
                    case "filter":
                        var column = grid.columnByField(index.fieldName);
                        if (column === null) {
                            return;
                        }
                        var filters = grid.getColumnFilters(index.fieldName) || [];
                        if (filters.length === 0) {
                            if (column.lookupDisplay && column.labels.length > 0 && column.values.length > 0 && column.labels.length === column.values.length) {
                                for (var i = 0, len = column.values.length; i < len; i++) {
                                    filters.push({
                                        name: column.labels[i],
                                        criteria: "value='" + column.values[i] + "'"
                                    });
                                }
                            } else {
                                var values = grid.getDataProvider().getDistinctValues(index.fieldName);
                                for (var i = 0, len = values.length; i < len; i++) {
                                    filters.push({
                                        name: values[i],
                                        criteria: "value='" + values[i] + "'"
                                    });
                                }
                            }
                            if (column.parent == null) {
                                grid.setColumnFilters(index.fieldName, filters);
                            } else {
                                column.filters = filters;
                                grid.setColumn(column);
                            }
                        }
                        break;
                    case "filter-clear":
                        var column = grid.columnByField(index.fieldName);
                        if (column === null) {
                            return;
                        }
                        if (column.parent == null) {
                            grid.setColumnFilters(index.fieldName, []);
                        } else {
                            column.filters = [];
                            grid.setColumn(column);
                        }
                        break;
                    case "fixcol":
                        var displayIndex = grid.getColumnProperty(index.fieldName, "displayIndex");
                        if (UT.isNumber(displayIndex)) {
                            grid.setFixedOptions({
                                colCount: displayIndex + 1
                            });
                        }
                        break;
                    case "fixcol-clear":
                        grid.setFixedOptions({
                            colCount: 0
                        });
                        break;
                    case "fixrow":
                        if (index.itemIndex < 0) {
                            return;
                        }
                        grid.setFixedOptions({
                            rowCount: index.itemIndex + 1
                        });
                        break;
                    case "fixrow-clear":
                        grid.setFixedOptions({
                            rowCount: 0
                        });
                        break;
                    case "excel":
                        grid.exportGrid({
                            type: "excel",
                            target: "local",
                            showConfirm: false,
                            linear: true    // Expand all columns and Export
                        });
                        break;
                }
            };
        }
    },

    /**
     * 그리드의 디폴트 옵션 설정
     *
     * @private
     * @method setDefaultOptions
     * @param {object}  gridView  grid
     * @example
     *     createGridView: function(container, fields, columns, configOptions) {
     *         ...
     *         GRID.setDefaultOptions(gridView);
     *         ...
     *     }
     */
    setDefaultOptions: function(gridView) {
        var provider = gridView.getDataProvider();

        provider.setOptions({
            restoreMode: "auto", // Cell 편집 중 원복 했을 경우 수정상태 취소 기능,
            softDeleting: true,
            commitBeforeDataEdit: true // true인 경우 그리드가 편집중일때 grid.setValue, dataProvider.setValue를 하는 경우 편집 중인 행을 commit시킨다.
        });
        gridView.setDisplayOptions({
            //rowHeight: 25,
            fitStyle: "none", // fillWidth 사용하기 위함.
            focusVisible: true, // cell 선택된 것 보이게.
            showInnerFocus: false // merge된 셀안에 포커스 박스를 숨김.
        });
        gridView.setIndicator({
            selectable: true
        });
        gridView.setSelectOptions({
            style: "block"
        });
        gridView.setPasteOptions({
            enabled: true,
            singleMode: false,  // true면 클립보드의 내용과 상관없이 포커스된 셀 하나에만 값을 붙여 넣는다
            noEditEvent: false, //
            startEdit: true, // 붙여넣게 될 값이 복수 행이 아니고, 붙여넣을 행이 아직 편집 중이 아니면 편집을 시작한다. false면 이 행에 연결된 데이터행을 업데이트한다
            checkReadOnly: true, // true이면 readOnly이거나 editable이 false인 Column은 paste대상에서 제외된다.
            eventEachRow: true, // 여러 행 붙여넣기시 그 행만큼 onEditRowPasted 이벤트의 발생 여부를 지정한다.
            numberChars : ","	// 엑셀에서 copy 해서 붙여넣기 할 때 값에 ',' 가 들어가 있는 경우 무시하도록 한다.
        });
        gridView.setEditOptions({
            enterToNextRow: true,        // Enter키 입력 시 다음 행으로 이동합니다.
            crossWhenExitLast: true      // tab/enter 키로 마지막 셀을 벗어날 때 다음 행으로 이동합니다
        });
        if (UT.isFunction(gridView.setTreeOptions)) { // tree 인 경우
            GRID.setOptions(gridView, {
                hideDeletedRows: true,
                showCheckBox: false,
                footer: { visible: false },
                stateBar: { visible: true },
                checkBar: { visible: true }
            });
        } else { // grid 인 경우
            GRID.setOptions(gridView, {
                hideDeletedRows: true,
                footer: { visible: false },
                panel: { visible: false },
                checkBar: { visible: true },
                stateBar: { visible: true }
            });
        }

        gridView.addCellStyle(DEF.styles.editable.id, DEF.styles.editable, true);
        gridView.addCellStyle(DEF.styles.readonly.id, DEF.styles.readonly, true);
        gridView.addCellStyle(DEF.styles.actionable.id, DEF.styles.actionable, true);
        gridView.addCellRenderers([DEF.renderer.checkboxYn, DEF.renderer.disabledCheckboxYn]);
        var images = new RealGridJS.ImageList(DEF.icons.id, DEF.icons.path);
        images.addUrls(DEF.icons.images);
        gridView.registerImageList(images);
    },

    /**
     * 그리드 옵션 설정
     *
     * @method setOptions
     * @param {object} gridView grid
     * @param {object} options  그리드의 옵션
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setOptions(me.gridView, {
     *             stateBar: {
     *                 visible: false
     *             },
     *             checkBar: {
     *                 visible: false
     *             }
     *         });
     *     }
     */
    setOptions: function(gridView, options) {
        if (UT.isFunction(gridView.setTreeOptions)) { // tree 인 경우
            gridView.setTreeOptions(options);
        } else {
            gridView.setOptions(options);
        }
    },

    /**
     * 그리드의 아이템수 바인딩
     *
     * @private
     * @method itemCountPropertyBinding
     * @param {object} gridView grid
     * @example
     *     gridView.onFilteringChanged = function(grid) {
     *         GRID.itemCountPropertyBinding(grid);
     *     }
     */
    itemCountPropertyBinding: function(gridView) {
        if (UT.isFunction(gridView.$$Custom$$.itemCountPropertyBinding)) {
            var count = UT.isFunction(gridView.setTreeOptions) ? gridView.getDataProvider().getRowCount() : gridView.getItemCount();
            gridView.$$Custom$$.itemCountPropertyBinding(count);
        }
    },

    /**
     * 그리드의 필드 정보를 설정한다.
     *
     * @method setFields
     * @param {object}  gridView grid
     * @param {array}   fields   그리드의 필드 정보
     * <pre>
     * fields : array (object or string)
     *        : string 형식 - fieldName:dataType(text, bool, number, datetime) - dataType이 text 인 경우는 생략가능
     *        : object - string 형식의 fieldName, dataType 이외에 추가 설정이 필요한 경우는 object 형태를 이용한다.
     * </pre>
     * @example
     *     setupGrid: function(gridView) {
     *         var fields = [
     *             "field1",
     *             "field2 | datetime",
     *             "field3 | number"
     *         ];
     *         GRID.setFields(gridView, fields);
     *     }
     */
    setFields: function(gridView, fields) {
        var provider = gridView.getDataProvider();
        var values = [];
        fields.push(DEF.DUMMY);
        for (var i = 0, len = fields.length; i < len; i++) {
            var field = fields[i];
            var value = {};
            if (UT.isString(field)) {
                var token = field.split("|");
                value = {
                    fieldName: token[0].trim(),
                    dataType: UT.isString(token[1]) ? token[1].trim() : "text"
                };
            } else if (UT.isObject(field)) {
                value = field;
            }
            //if (value.dataType === "datetime" && typeof value.datetimeFormat === "undefined") {
            //value.datetimeFormat = DEF.styles.formatDate.datetimeFormat;
            //}
            if (value.dataType === "datetime" && typeof value.datetimeFormat === "undefined") {
                value.datetimeFormat = "yyyy/MM/dd"; // ie에서 인식하는 포맷 - yyyy/MM/dd, yyyy-MM-dd, yyyy.MM.dd
            }
            values.push(value);
        }
        provider.setFields(values);
    },

    //sc-data-Columns 자동생성
    //삭제예정 - 김연우 9.2conversion 용
    getScDataColumnHtml: function(columns){
        var html = "";
        for (var i = 0, len = columns.length; i < len; i++) {
            var column = columns[i];
            var value = {};
            if (UT.isString(column)) {
                var token = column.split("|");
                html +="<sc-data-column	";
                html += "data-field";
                html +='="'+token[0].trim()+'"	';
                html +='header-text';
                html +='="'+token[1].trim()+'"	';
                html +='width';
                html +='="'+parseInt(token[2], 10)+'"	';
                if(UT.isNotEmpty(token[3])){
                    var align = "";
                    if(token[3].trim() === "near"){
                        align = "left";
                    }else if(token[3].trim() === "far"){
                        align = "right";
                    }
                    if(UT.isNotEmpty(align)){
                        html +='text-align="'+align+'"	';
                    }
                }
                html +='></sc-data-column>\n';
            }
        }
        return html;
    },
    getScGridFieldHtml: function(fields){
        var html = "";
        for (var i = 0, len = fields.length; i < len; i++) {
            var field = fields[i];
            var value = {};
            if (UT.isString(field)) {
                var token = field.split("|");
                html +="<sc-grid-field	";
                html += "data-field";
                html +='="'+token[0].trim()+'"	';
                if(UT.isString(token[1])){
                    html +='data-type';
                    html +='="'+token[1].trim()+'"';
                }
                html +='></sc-grid-field>\n';
            }
        }
        return html;
    },
    /**
     * 그리드의 컬럼 정보를 설정한다.
     *
     * @method setColumns
     * @param {object}  gridView grid
     * @param {array}   columns  그리드의 컬럼 정보
     * <pre>
     * columns : array (object or string)
     *         : string 형식 - fieldName|text|width|align(center, near, far) - align이 center 인 경우는 생략가능
     *         : object - string 형식의 fieldName, text, width, align 이외에 추가 설정이 필요한 경우는 object 형태를 이용한다.
     * </pre>
     * @example
     *     setupGrid: function(gridView) {
     *         var columns = [
     *             "field1 | 필드1 | 150 | near",
     *             "field2 | 필드2 | 150",
     *             "field3 | 필드3 | 150"
     *         ];
     *         GRID.setColumns(gridView, columns);
     *     }
     */
    setColumns: function(gridView, columns) {
        var fn = function(array) {
            var values = [];
            for (var i = 0, len = array.length; i < len; i++) {
                var column = array[i];
                var value = {};
                if (UT.isString(column)) {
                    var token = column.split("|");
                    value = {
                        fieldName: token[0].trim(),
                        header: {
                            text: token[1].trim()
                        },
                        width: parseInt(token[2], 10),
                        styles: {
                            textAlignment: UT.isString(token[3]) ? token[3].trim() : "center"
                        }
                    };
                } else if (UT.isObject(column)) {
                    value = column;
                }
                if (UT.isObject(value.header) && !UT.isEmpty(value.header.text)) {
                    value.header.text = I18N.translate(value.header.text);
                }
                if (UT.isString(value.type) && value.type.toLowerCase() === "group" && UT.isString(value.name)) {
                    value.name = I18N.translate(value.name);
                }
                value.editable = false;
                if (value.fieldName) {
                    value.name = value.fieldName;
                }
                if (value.columns) {
                    value.columns = fn(value.columns);
                }
                values.push(value);
            }
            return values;
        };
        columns.push({
            fieldName: DEF.DUMMY,
            header: { text: " " }, // styles: {background: "#ffffff"}
            width: 0,
            visible: false,
            readOnly: true,
            editable: false,
            resizable: false,
            movable: false,
            sortable: false,
            groupable: false
        });
        gridView.setColumns(fn(columns));
    },

    /**
     * 그리드 액션 컬럼으로 설정한다.
     *
     * @method setActionColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @example
     *     setupGrid: function(gridView) {
     *         GRID.setActionColumn(gridView, ["field1"]);
     *     }
     */
    setActionColumn: function(gridView, fieldName) {
        GRID.setColumnStyle(gridView, fieldName, DEF.styles.actionable);
    },

    /**
     * 그리드 컬럼 visible 를 설정한다.
     *
     * @method setVisibleColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @example
     *     setupGrid: function(gridView) {
     *         GRID.setVisibleColumn(gridView, ["field1"], false);
     *     }
     */
    setVisibleColumn: function(gridView, fieldName, visibleOption) {
        gridView.setVisible({
            visible: true
        });
        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            column.visible = visibleOption;
            gridView.setColumn(column);
        }
        GRID.setColumnStyle(gridView, fieldName, DEF.styles.visible);
    },

    /**
     * 그리드 편집가능 컬럼으로 설정한다.
     *
     * @method setEditableColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @example
     *     setupGrid: function(gridView) {
     *         GRID.setEditableColumn(gridView, ["field1"]);
     *     }
     */
    setEditableColumn: function(gridView, fieldName) {
        gridView.setEditOptions({
            editable: true
        });
        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            column.editable = true;
            column.tag = UT.isString(column.tag) ? column.tag + "[editable]" : "[editable]";
            gridView.setColumn(column);
        }
        GRID.setColumnStyle(gridView, fieldName, DEF.styles.editable);
    },

    /**
     * 그리드 flexible 컬럼으로 설정한다.
     *
     * @method setFlexibleColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setFlexibleColumn(me.gridView, ["field1"]);
     *     }
     */
    setFlexibleColumn: function(gridView, fieldName) {
        gridView.setDisplayOptions({
            fitStyle: "fill"
        });
        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            gridView.setColumnProperty(column, "fillWidth", 1);
            gridView.setColumnProperty(column, "visible", true);
        }
    },

    /**
     * 그리드 코드 컬럼으로 설정한다
     *
     * @method setCodeColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @param {array}        codes     코드 목록
     * @param {object}       [options]
     * @param {string}       [options.valueKey="data"]  코드 목록에서 value를 가르키는 key값
     * @param {string}       [options.labelKey="label"] 코드 목록에서 label을 가르키는 key값
     * @param {string}       [options.defaultLabel]     코드 목록에서 defaultLabel 설정
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setCodeColumn(me.gridView, "field1", me.codes.code1);
     *     }
     */
    setCodeColumn: function(gridView, fieldName, codes, options) {
        var values = [], labels = [];

        options = options || {};
        // default 값
        var sValue = options.valueKey || "data";
        var sLabel = options.labelKey || "label";

        if (UT.isString(options.defaultLabel)) {
            values.push("");
            labels.push(options.defaultLabel);
        }
        // value, label 값을 추출한다.
        for (var i in codes) {
            values.push(codes[i][sValue]);
            labels.push(codes[i][sLabel]);
        }

        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);

            // 컬럼에 values, labels 배열을 설정한다.
            column.values = values;
            column.labels = labels;
            column.lookupDisplay = true; // 컬럼셀에 values 목록 중 셀의 값에 해당하는 위치에 있는 labels 항목의 값의 표시 여부를 지정한다.

            // 그리드에 설정되어 있는 컬럼의 정보를 변경한다.
            gridView.setColumn(column);
        }
    },

    /**
     * 그리드 콤보 컬럼으로 설정한다
     *
     * @method setComboColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @param {array}        codes     코드 목록
     * @param {object}       [options]
     * @param {string}       [options.valueKey="data"]  코드 목록에서 value를 가르키는 key값
     * @param {string}       [options.labelKey="label"] 코드 목록에서 label을 가르키는 key값
     * @param {string}       [options.defaultLabel]     코드 목록에서 defaultLabel 설정
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setComboColumn(me.gridView, "field1", me.codes.code1);
     *     }
     */
    setComboColumn: function(gridView, fieldName, codes, options) {
        GRID.setCodeColumn(gridView, fieldName, codes, options);

        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            column.editor = DEF.editor.combobox;
            gridView.setColumn(column);
        }
    },

    /**
     * 그리드의 주콤보 컬럼에 대한 부콤보 컬럼으로 설정한다.
     *
     * @method setSubComboColumn
     * @param {object} gridView  grid
     * @param {string} masterFieldName                  주콤보 필드명
     * @param {string} subFieldName                     부콤보 필드명
     * @param {array}  codes                            코드 목록
     * @param {object} [options]
     * @param {string} [options.valueKey="data"]        코드 목록에서 value를 가르키는 key값
     * @param {string} [options.labelKey="label"]       코드 목록에서 label을 가르키는 key값
     * @param {string} [options.relationKey="relation"] 코드 목록에서 주콤보 컬럼의 값을 가르키는 key값
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setComboColumn(me.gridView, "field1", me.codes.code1);
     *         GRID.setSubComboColumn(me.gridView, "field1", "field2", me.codes.code2);
     *     }
     */
    setSubComboColumn: function(gridView, masterFieldName, subFieldName, codes, options) {
        GRID.setComboColumn(gridView, subFieldName, codes, options);

        options = options || {};
        // default 값
        var sValue = options.valueKey || "data";
        var sLabel = options.labelKey || "label";
        var sRelation = options.relationKey || "relation";

        var keys = [], values = [];
        var masterColumn = gridView.columnByField(masterFieldName);
        for (var i = 0, len = masterColumn.values.length; i < len; i++) {
            for (var j in codes) {
                if (masterColumn.values[i] === codes[j][sRelation]) {
                    keys.push([masterColumn.values[i], codes[j][sValue]]);
                    values.push([codes[j][sLabel]]);
                }
            }
        }
        var sourceId = "lookup-" + subFieldName;
        gridView.addLookupSource({
            id: sourceId,
            levels: 2,
            keys: keys,
            values: values
        });
        var column = gridView.columnByField(subFieldName);
        column.lookupSourceId = sourceId;
        column.lookupKeyFields = [masterFieldName, subFieldName];
        gridView.setColumn(column);
    },

    /**
     * 그리드의 체크박스 컬럼으로 설정한다.
     *
     * @method setCheckboxColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @param {object}       [options]
     * @param {object}       [options.styles=DEF.styles.formatYn]       Y/N으로 구분되는 컬럼의 format 스타일
     * @param {object}       [options.renderer=DEF.renderer.checkboxYn] Y/N으로 구분되는 컬럼의 checkbox renderer
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setCheckboxColumn(me.gridView, ["field1"]);
     *     }
     */
    setCheckboxColumn: function(gridView, fieldName, options) {
        options = options || {};
        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            column.styles =  options.styles || DEF.styles.formatYn;
            column.renderer = options.renderer || DEF.renderer.checkboxYn;
            column.tag = UT.isString(column.tag) ? column.tag + "[editable]" : "[editable]";
            gridView.setColumn(column);

            column.styles = DEF.styles.editable;
            gridView.setColumn(column);
        }
    },

    /**
     * 그리드의 정수 숫자 컬럼으로 설정한다.
     *
     * @method setIntegerColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @param {object}       [options]
     * @param {number}       [options.maxLength=DEF.editor.integer.maxLength]               입력할 수 있는 문자의 최대 개수. 0 이면 제한이 없다
     * @param {boolean}      [options.positiveOnly=DEF.editor.integer.positiveOnly]         true: 양수값만 입력할수 있다
     * @param {string}       [options.numberFormat=DEF.styles.formatInteger.numberFormat]   "#,000" : comma
     * @param {string}       [options.textAlignment=DEF.styles.formatInteger.textAlignment] "far": 오른쪽 정렬
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setIntegerColumn(me.gridView, ["field1"]);
     *     }
     */
    setIntegerColumn: function(gridView, fieldName, options) {
        options = options || {};
        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            column.editor = {
                type: DEF.editor.integer.type,
                integerOnly: DEF.editor.integer.integerOnly,
                maxLength: options.maxLength || DEF.editor.integer.maxLength,
                positiveOnly: UT.isBoolean(options.positiveOnly) ? options.positiveOnly : DEF.editor.integer.positiveOnly
            };
            column.styles = {
                numberFormat: options.numberFormat || DEF.styles.formatInteger.numberFormat,
                textAlignment: options.textAlignment || DEF.styles.formatInteger.textAlignment
            };
            gridView.setColumn(column);
        }
    },

    /**
     * 그리드의 소수점 숫자 컬럼으로 설정한다.
     *
     * @method setDecimalColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @param {object}       [options]
     * @param {number}       [options.maxLength=DEF.editor.decimal.maxLength]               입력할 수 있는 문자의 최대 개수. 0 이면 제한이 없다
     * @param {boolean}      [options.positiveOnly=DEF.editor.decimal.positiveOnly]         true: 양수값만 입력할수 있다
     * @param {string}       [options.numberFormat=DEF.styles.formatDecimal.numberFormat]   "#,000.00" : comma, 소수점 2자리
     * @param {string}       [options.textAlignment=DEF.styles.formatDecimal.textAlignment] "far": 오른쪽 정렬
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setDecimalColumn(me.gridView, ["field1"]);
     *     }
     */
    setDecimalColumn: function(gridView, fieldName, options) {
        options = options || {};
        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            column.editor = {
                type: DEF.editor.decimal.type,
                integerOnly: DEF.editor.decimal.integerOnly,
                maxLength: options.maxLength || DEF.editor.decimal.maxLength,
                positiveOnly: UT.isBoolean(options.positiveOnly) ? options.positiveOnly : DEF.editor.decimal.positiveOnly
            };
            column.styles = {
                numberFormat: options.numberFormat || DEF.styles.formatDecimal.numberFormat,
                textAlignment: options.textAlignment || DEF.styles.formatDecimal.textAlignment
            };
            gridView.setColumn(column);
        }
    },

    /**
     * 그리드의 금액 컬럼으로 설정한다.
     *
     * @method setAmtColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @param {object}       [options]
     * @param {number}       [options.maxLength=DEF.editor.amt.maxLength]               입력할 수 있는 문자의 최대 개수. 0 이면 제한이 없다
     * @param {boolean}      [options.positiveOnly=DEF.editor.amt.positiveOnly]         true: 양수값만 입력할수 있다
     * @param {string}       [options.numberFormat=DEF.styles.amt.numberFormat]   "#,000.00" : comma, 소수점 2자리
     * @param {string}       [options.textAlignment=DEF.styles.formatDecimal.textAlignment] "far": 오른쪽 정렬
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setAmtColumn(me.gridView, ["field1"]);
     *     }
     */
    setAmtColumn: function(gridView, fieldName, options) {
        options = options || {};
        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            column.editor = {
                type: DEF.editor.amt.type,
                integerOnly: DEF.editor.amt.integerOnly,
                maxLength: options.maxLength || DEF.editor.amt.maxLength,
                positiveOnly: UT.isBoolean(options.positiveOnly) ? options.positiveOnly : DEF.editor.amt.positiveOnly,
                textAlignment: options.textAlignment || DEF.editor.amt.textAlignment,
                editFormat: options.editFormat || DEF.editor.amt.editFormat,
            };

            column.styles = {
                numberFormat: options.numberFormat || DEF.editor.amt.editFormat,
                textAlignment: options.textAlignment || DEF.editor.amt.textAlignment
            };
            gridView.setColumn(column);
        }
    },

    /**
     * 그리드의 단가 컬럼으로 설정한다.
     *
     * @method setPriceColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @param {object}       [options]
     * @param {number}       [options.maxLength=DEF.editor.amt.maxLength]               입력할 수 있는 문자의 최대 개수. 0 이면 제한이 없다
     * @param {boolean}      [options.positiveOnly=DEF.editor.amt.positiveOnly]         true: 양수값만 입력할수 있다
     * @param {string}       [options.numberFormat=DEF.styles.amt.numberFormat]   "#,000.00" : comma, 소수점 2자리
     * @param {string}       [options.textAlignment=DEF.styles.formatDecimal.textAlignment] "far": 오른쪽 정렬
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setAmtColumn(me.gridView, ["field1"]);
     *     }
     */
    setPriceColumn: function(gridView, fieldName, options) {
        options = options || {};
        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            column.editor = {
                type: DEF.editor.price.type,
                integerOnly: DEF.editor.price.integerOnly,
                maxLength: options.maxLength || DEF.editor.price.maxLength,
                positiveOnly: UT.isBoolean(options.positiveOnly) ? options.positiveOnly : DEF.editor.price.positiveOnly,
                textAlignment: options.textAlignment || DEF.editor.price.textAlignment,
                editFormat: options.editFormat || DEF.editor.price.editFormat,
            };

            column.styles = {
                numberFormat: options.numberFormat || DEF.editor.price.editFormat,
                textAlignment: options.textAlignment || DEF.editor.price.textAlignment
            };
            gridView.setColumn(column);
        }
    },

    /**
     * 그리드의 수량 컬럼으로 설정한다.
     *
     * @method setQtyColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @param {object}       [options]
     * @param {number}       [options.maxLength=DEF.editor.qty.maxLength]               입력할 수 있는 문자의 최대 개수. 0 이면 제한이 없다
     * @param {boolean}      [options.positiveOnly=DEF.editor.qty.positiveOnly]         true: 양수값만 입력할수 있다
     * @param {string}       [options.numberFormat=DEF.styles.qty.numberFormat]   "#,000.00" : comma, 소수점 2자리
     * @param {string}       [options.textAlignment=DEF.styles.formatDecimal.textAlignment] "far": 오른쪽 정렬
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setAmtColumn(me.gridView, ["field1"]);
     *     }
     */
    setQtyColumn: function(gridView, fieldName, options) {
        options = options || {};
        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            column.editor = {
                type: DEF.editor.qty.type,
                integerOnly: DEF.editor.qty.integerOnly,
                maxLength: options.maxLength || DEF.editor.qty.maxLength,
                positiveOnly: UT.isBoolean(options.positiveOnly) ? options.positiveOnly : DEF.editor.qty.positiveOnly,
                textAlignment: options.textAlignment || DEF.editor.qty.textAlignment,
                editFormat: options.editFormat || DEF.editor.qty.editFormat
            };
            column.styles = {
                numberFormat: options.numberFormat || DEF.editor.qty.editFormat,
                textAlignment: options.textAlignment || DEF.editor.qty.textAlignment
            };
            gridView.setColumn(column);
        }
    },

    /**
     * 그리드의 DatePicker 컬럼으로 설정한다.
     *
     * @method setDatePickerColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @param {object}       [options]
     * @param {object}       [options.editor=DEF.editor.datePicker]  DateCellEditor
     * @param {object}       [options.styles=DEF.styles.formatDate]  날짜 format 스타일
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setDatePickerColumn(me.gridView, ["field1"]);
     *     }
     */
    setDatePickerColumn: function(gridView, fieldName, options) {
        options = options || {};
        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);

            column.editor = options.editor || DEF.editor.datePicker;
            column.styles = options.styles || DEF.styles.formatDate;
            gridView.setColumn(column);
        }
    },

    /**
     * 그리드의 icon 컬럼으로 설정한다.
     *
     * @method setIconColumn
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @param {object}       [options]
     * @param {object}       [options.styles=DEF.styles.icons.search] 검색 icon 스타일 // DEF.styles.icons 참조.
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setIconColumn(me.gridView, ["field1"]);
     *     }
     */
    setIconColumn: function(gridView, fieldName, styles) {
        var fieldNames = [].concat(fieldName);

        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            column.renderer = {
                type: "icon"
            };
            column.imageList = DEF.icons.id;
            if (styles === DEF.styles.icons.required) {
                column.tag = UT.isString(column.tag) ? column.tag + "[required-icon]" : "[required-icon]";
            } else if (styles === DEF.styles.icons.attach) {
                column.tag = UT.isString(column.tag) ? column.tag + "[attach-icon]" : "[attach-icon]";
            } else {
                column.tag = UT.isString(column.tag) ? column.tag + "[icon]" : "[icon]";
            }
            column.styles = styles || DEF.styles.icons.search;
            gridView.setColumn(column);
        }
    },

    /**
     * 그리드의 dynamic style을 지정한다.
     *
     * @method setColumnDynamicStyle
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @param {string}       criteria  조건식 (예)"values['field2'] <> 'Y'"
     * @param {object}       styles    적용할 스타일
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setColumnDynamicStyle(me.gridView, ["field1"], "values['field2'] <> 'Y'", {background: "#fafafa"});
     *     }
     */
    setColumnDynamicStyle: function(gridView, fieldName, criteria, styles) {
        var fieldNames = [].concat(fieldName);

        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            column.dynamicStyles = [{
                criteria: criteria,
                styles: styles
            }];
            gridView.setColumn(column);
        }
    },

    /**
     * 그리드의 컬럼 스타일 지정
     *
     * @method setColumnStyle
     * @param {object}       gridView  grid
     * @param {array|string} fieldName 필드명
     * @param {object}       styles    적용할 스타일
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setColumnStyle(me.gridView, ["field1"], {background: "#fafafa"});
     *     }
     */
    setColumnStyle: function(gridView, fieldName, styles) {
        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            column.styles = styles;
            gridView.setColumn(column);
        }
    },

    /**
     * 그리드의 컬럼 프로퍼티 값 지정
     *
     * @method setColumnProperty
     * @param {object}       gridView      grid
     * @param {array|string} fieldName     필드명
     * @param {string}       propertyName  프로퍼티 명
     * @param {object}       propertyValue 프로퍼티 값
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setColumnProperty(me.gridView, "field1", "textInputCase", "upper");
     *     }
     */
    setColumnProperty: function(gridView, fieldName, propertyName, propertyValue) {
        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]) || gridView.columnByName(fieldNames[i]);
            gridView.setColumnProperty(column, propertyName, propertyValue);
        }
    },

    /**
     * 그리드의 action button 컬럼으로 설정한다.
     *
     * @method setActionButtonColumn
     * @param {object}       gridView      grid
     * @param {array|string} fieldName     필드명
     * @param {function}     [clickedCallback()]         버튼 클릭 후 콜백함수
     * @param {object}       clickedCallback().grid      grid
     * @param {object}       clickedCallback().itemIndex itemIndex
     * @param {object}       clickedCallback().column    column
     * @async
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setActionButtonColumn(me.gridView, "field1", function(grid, itemIndex, column) {
     *             ...
     *         });
     *     }
     */
    setActionButtonColumn: function(gridView, fieldName, clickedCallback) {
        var fieldNames = [].concat(fieldName);
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            column.tag = UT.isString(column.tag) ? column.tag + "[button]" : "[button]";
            column.button = "action";
            column.alwaysShowButton = true; //셀 버튼을 항상 표시합니다.
            gridView.setColumn(column);
        }
        if (UT.isFunction(clickedCallback)) {
            gridView.onCellButtonClicked = function(grid, itemIndex, column) {
                clickedCallback.call(this, grid, itemIndex, column);
            };
        }
    },

    /**
     * 그리드의 row를 그룹화 한다
     *
     * @method setColumnRowGroupBy
     * @param {object}       gridView      grid
     * @param {array|string} fieldName     필드명
     * @param {object}       [options]     옵션
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setColumnRowGroupBy(me.gridView, "field1", {mergeMode: false});
     *     }
     */
    setColumnRowGroupBy: function(gridView, fieldName, options) {
        var fieldNames = [].concat(fieldName);
        options = options || {};
        options.headerStatement = UT.isString(options.headerStatement) ? options.headerStatement : "${columnHeader}: ${groupValue}";
        gridView.groupBy(fieldNames);
        gridView.setRowGroup(options);
    },

    /**
     * 그리드의 row를 merge 한다.
     *
     * @method setColumnRowMerge
     * @param {object}       gridView      grid
     * @param {array|string} fieldName     필드명
     * @param {object}       [options.criteria]     옵션
     * @param {object}       [options.dependent]    옵션 : criteria="value" 일때 merge 대상 field의 criteria 의존 여부
     *             criteria 옵션은 해당 사이트 참고
     *             참조 사이트
     *                column cell merge
     http://demo.realgrid.com/Demo/ColumnCellMerging
     criteria 조건들
     http://demo.realgrid.com/Demo/ExpressionConcept
     merge시 데이타내용상단으로
     http://demo.realgrid.com/Demo/ColumnBlanking#
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         GRID.setColumnRowMerge(me.gridView, "field1", {criteria: "value"});
     *     }
     */
    setColumnRowMerge: function(gridView, fieldName, options) {
        options = options || {};
        options.criteria = options.criteria || "value";
        var fieldNames = [].concat(fieldName);
        var criteria = options.criteria;
        var depStr = "";
        for (var i = 0, len = fieldNames.length; i < len; i++) {
            var column = gridView.columnByField(fieldNames[i]);
            if (UT.isBoolean(options.dependent) && options.dependent == true && options.criteria == "value") {
                if (i > 0) {
                    depStr += "values['" + fieldNames[i-1] + "'] + ";
                }
                criteria = depStr + options.criteria;
            }
            column.mergeRule = {
                criteria : criteria
            };
            gridView.setColumn(column);
        }
    },

    /**
     * 그리드의 validator를 설정한다.
     * <br>
     * 설정 한 후에 필요한 곳에서 GRID.invalidData()를 호출하여 유효성 검사를 할 수 있다
     *
     * @method setValidator
     * @param {object} gridView  grid
     * @param {array}  validator 유효성 검사 설정
     * @example
     *     setupGrid: function() {
     *         var me = this;
     *         var validator = [];
     *         validator.push({
     *             fieldName: "field1",
     *             check: ["required", "!space", "unique"],
     *             maxLength: 18
     *         });
     *         GRID.setValidator(me.gridView, validator);
     *     }
     */
    setValidator: function(gridView, validator) {
        var required = [];
        var precisionFields = [];

        for (var i = 0, len = validator.length; i < len; i++) {
            var column = gridView.columnByField(validator[i].fieldName);
            if (column) {
                if (UT.isArray(validator[i].check) && validator[i].check.indexOf("required") > -1) {
                    required.push(validator[i].fieldName);
                }
                if (UT.isNumber(validator[i].maxLength)) {
                    GRID.setColumnProperty(gridView, validator[i].fieldName, "editor", {maxLength: validator[i].maxLength});
                }

                // 소수점 자리 체크 로직 추가
                if(UT.isNumber(validator[i].precision)){
                    precisionFields.push(validator[i]);
                }
            }
        }

        // 커스텀 소수점 자리 체크
        gridView.$$Custom$$.precisionFields = precisionFields;

        GRID.setIconColumn(gridView, required, DEF.styles.icons.required);
        gridView.$$Custom$$.validator = function() { // 그리드의 커스텀 함수로 만듬.
            return VALID.isValidGridData(gridView, validator);
        };
    },

    /**
     * 편집 중인 행의 편집을 완료하고 DataProvider에 저장한다.
     *
     * @method commit
     * @param  {object}   gridView grid
     * @example
     *     onSaveList: function() {
     *         var me = this;
     *         GRID.commit(me.gridView);
     *         if (GRID.invalidData(me.gridView)) {
     *             return;
     *         }
     *     }
     */
    commit: function(gridView) {
        if (gridView.isItemEditing()) {
            gridView.commit();
        }
    },

    /**
     * 그리드의 데이터 유효성 검사
     *
     * @method invalidData
     * @param  {object}   gridView grid
     * @return {boolean}  true is invalid
     * @example
     *     onSaveList: function() {
     *         var me = this;
     *         if (GRID.invalidData(me.gridView)) {
     *             return;
     *         }
     *     }
     */
    invalidData: function(gridView) {
        GRID.commit(gridView);

        if (UT.isFunction(gridView.$$Custom$$.validator)) {
            return !gridView.$$Custom$$.validator();
        }
        return false;
    },

    /**
     * 그리드 목록에서 신규/수정/삭제/체크 row의 목록을 반환한다
     *
     * @method allStateRows
     * @param  {object} gridView grid
     * @param  {object} [outputFormat=DEF.styles.outputFormat]  서버로 전송할 포맷 지정
     * @return {object}
     * <pre>
     * {
     *     created: [], // 신규
     *     updated: [], // 수정
     *     deleted: [], // 삭제
     *     checked: []  // 체크
     * }
     * </pre>
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         var rows = GRID.allStateRows(me.gridView);
     *         me.$.saveInfo.body = {
     *             insertData: rows.created,
     *             updateData: rows.updated,
     *             deleteData: rows.deleted
     *         };
     *         UT.save(me.$.saveInfo);
     *     }
     */
    allStateRows: function(gridView, outputFormat) {
        return {
            created: GRID.createdStateRows(gridView, outputFormat),
            updated: GRID.updatedStateRows(gridView, outputFormat),
            deleted: GRID.deletedStateRows(gridView, outputFormat),
            checked: GRID.checkedStateRows(gridView, outputFormat)
        };
    },

    /**
     * 그리드 목록에서 신규로 추가된 row의 목록을 반환한다
     *
     * @method createdStateRows
     * @param  {object}  gridView grid
     * @param  {object}  [outputFormat=DEF.styles.outputFormat]  서버로 전송할 포맷 지정
     * @return {array}
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         var created = GRID.createdStateRows(me.gridView);
     *         me.$.saveInfo.body = {
     *             insertData: created
     *         };
     *         UT.save(me.$.saveInfo);
     *     }
     */
    createdStateRows: function(gridView, outputFormat) {
        GRID.commit(gridView);

        outputFormat = outputFormat || DEF.styles.outputFormat;
        var rows = [];
        var provider = gridView.getDataProvider();
        var created = provider.getStateRows("created");
        for (var i = 0, len = created.length; i < len; i++) {
            // rows.push(provider.getJsonRow(created[i]));
            rows.push(provider.getOutputRow(outputFormat, created[i]));
        }
        return rows;
    },

    /**
     * 그리드 목록에서 수정된 row의 목록을 반환한다
     *
     * @method updatedStateRows
     * @param  {object}  gridView grid
     * @param  {object}  [outputFormat=DEF.styles.outputFormat]  서버로 전송할 포맷 지정
     * @return {array}
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         var updated = GRID.updatedStateRows(me.gridView);
     *         me.$.saveInfo.body = {
     *             updateData: updated
     *         };
     *         UT.save(me.$.saveInfo);
     *     }
     */
    updatedStateRows: function(gridView, outputFormat) {
        GRID.commit(gridView);

        outputFormat = outputFormat || DEF.styles.outputFormat;
        var rows = [];
        var provider = gridView.getDataProvider();
        var updated = provider.getStateRows("updated");
        for (var i = 0, len = updated.length; i < len; i++) {
            // rows.push(provider.getJsonRow(updated[i]));
            rows.push(provider.getOutputRow(outputFormat, updated[i]));
        }
        return rows;
    },

    /**
     * 그리드 목록에서 삭제된 row의 목록을 반환한다
     *
     * @method deletedStateRows
     * @param  {object}  gridView grid
     * @param  {object}  [outputFormat=DEF.styles.outputFormat]  서버로 전송할 포맷 지정
     * @return {array}
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         var deleted = GRID.deletedStateRows(me.gridView);
     *         me.$.saveInfo.body = {
     *             deleteData: deleted
     *         };
     *         UT.save(me.$.saveInfo);
     *     }
     */
    deletedStateRows: function(gridView, outputFormat) {
        GRID.commit(gridView);

        outputFormat = outputFormat || DEF.styles.outputFormat;
        var rows = [];
        var provider = gridView.getDataProvider();
        var deleted = provider.getStateRows("deleted");
        for (var i = 0, len = deleted.length; i < len; i++) {
            // rows.push(provider.getJsonRow(deleted[i]));
            rows.push(provider.getOutputRow(outputFormat, deleted[i]));
        }
        return rows;
    },

    /**
     * 그리드 목록의 checkbox에서 체크된 row의 목록을 반환한다
     *
     * @method checkedStateRows
     * @param  {object}  gridView grid
     * @param  {object}  [outputFormat=DEF.styles.outputFormat]  서버로 전송할 포맷 지정
     * @return {array}
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         var checked = GRID.checkedStateRows(me.treeGridView);
     *         for(var i=0, len = created.length; i < len; i++) {
     *             ...
     *         }
     *     }
     */
    checkedStateRows: function(gridView, outputFormat) {
        GRID.commit(gridView);

        outputFormat = outputFormat || DEF.styles.outputFormat;
        var rows = [];
        var provider = gridView.getDataProvider();
        var checked = gridView.getCheckedRows();
        for (var i = 0, len = checked.length; i < len; i++) {
            //rows.push(provider.getJsonRow(checked[i]));
            rows.push(provider.getOutputRow(outputFormat, checked[i]));
        };
        return rows;
    },

    /**
     * JSON checkedState Rows
     */
    checkedStateJsonRows: function(gridView) {
        GRID.commit(gridView);

        var rows = [];
        var provider = gridView.getDataProvider();
        var checked = gridView.getCheckedRows();
        for (var i = 0, len = checked.length; i < len; i++) {
            rows.push(provider.getJsonRow(checked[i]));
        };
        return rows;
    },

    /**
     * 팝업에서 선택된 목록 반환
     * <br>
     * 선택된 데이터가 없을 시 "선택된 항목이 없습니다" 메시지 출력됨
     *
     * @method selectedList
     * @param  {object}   gridView grid
     * @param  {function} selectedCallback(selected, itemIndex)          체크박스에에 의해 선택된 정보를 반환할 콜백 함수
     * @param  {object}   selectedCallback(selected, itemIndex).selected 선택된 정보
     * @param  {object}   selectedCallback(selected, itemIndex).index    선택된 dataRow와 연결된 itemIndex
     * @param  {object}  [options]
     * @param  {boolean} [options.checkable=true]             선택된 정보를 반환한 후에 해당 데이터의 check 가능 여부 설정
     * @param  {boolean} [options.clearChecked=false]         선택된 정보를 반환한 후에 해당 데이터의 check를 해제할 지 여부 설정
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.selectedList(me.gridView, function(selected, itemIndex) {
     *             me.fire("addto-operorg", selected);
     *         });
     *     }
     */
    selectedList: function(gridView, selectedCallback, options) {
        GRID.commit(gridView);

        options = options || {};
        var selected = [], itemIndex = [];
        var checked = gridView.getCheckedRows();
        for (var i = 0, len = checked.length; i < len; i++) {
            if (UT.isBoolean(options.checkable) && options.checkable === false) {
                gridView.setCheckable(checked[i], false);
            }
            selected.push(gridView.getDataProvider().getJsonRow(checked[i]));
            itemIndex.push(gridView.getItemIndex(checked[i]));
        };
        if (selected.length > 0) {
            if (UT.isBoolean(options.clearChecked) && options.clearChecked === true) {
                gridView.checkAll(false, true);
                gridView.setAllCheck(false);
            }
            selectedCallback.call(this, selected, itemIndex);
        } else {
            UT.alert(MSG.N1600); // 선택된 항목이 없습니다
        }
    },

    /**
     * 그리드의 모든 데이터행을 리턴한다.
     * <br>
     *
     * @method allRows
     * @param  {object}   gridView grid
     * @param  {object}  [options]
     * @param  {boolean} [options.exceptDeleted=false] 삭제된 row 제외.
     * @param  {string} [options.datetimeFormat]
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         var all = GRID.allRows(me.gridView);
     *         for (var i = 0, len = all.length; i < len; i++) {
     *             ...
     *         }
     *     }
     */
    allRows: function(gridView, options) {
        GRID.commit(gridView);

        options = options || {};
        var provider = gridView.getDataProvider();
        var rows = [];

        var dataRows = [];
        dataRows = dataRows.concat(provider.getStateRows("created"));
        dataRows = dataRows.concat(provider.getStateRows("updated"));
        dataRows = dataRows.concat(provider.getStateRows("none"));
        if (options.exceptDeleted !== true) {
            dataRows = dataRows.concat(provider.getStateRows("deleted"));
        }
        dataRows.sort();
        for (var i = 0, len = dataRows.length; i < len; i++) {
            var data = {};
            if (UT.isString(options.datetimeFormat)) {
                data = provider.getOutputRow({datetimeFormat: options.datetimeFormat}, dataRows[i]);
            } else {
                data = provider.getJsonRow(dataRows[i]);
            }
            data["_dataRow"] = dataRows[i];
            data["_itemIndex"] = gridView.getItemIndex(dataRows[i]);
            rows.push(data);
        }
        return rows;
    },

    /**
     * 그리드 row 추가
     *
     * @method addRow
     * @param  {object}       gridView         grid
     * @param  {array|object} rowData          행 데이터 - rowData가 배열이이면 복수의 행, object이면 단일행 추가.
     * @param  {string}       [position="top"] 추가할 위치(top, bottom, before(현재row기준), after(현재row기준))
     * @param  {function}     [addedCallback]  row가 추가된 후에 호출될 콜백 함수
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.addRow(me.gridView, {
     *             field1: "value1",
     *             field2: "value2"
     *         });
     *     }
     */
    addRow: function(gridView, rowData, position, addedCallback) {
        GRID.commit(gridView);

        position = UT.isString(position) ? position.toLowerCase() : "top";
        var provider = gridView.getDataProvider();
        switch(position) {
            case "before":
                var index = gridView.getCurrent().itemIndex;
                if (index < 0) {
                    index = 0;
                }
                if (UT.isArray(rowData)) { // 배열
                    provider.insertRows(index, rowData);
                } else {
                    provider.insertRow(index, rowData);
                }
                gridView.setCurrent({itemIndex: index});
                break;
            case "after":
                var index = gridView.getCurrent().itemIndex;
                if (index < 0) {
                    index = 0;
                    if (UT.isArray(rowData)) { // 배열
                        provider.insertRows(index, rowData);
                    } else {
                        provider.insertRow(index, rowData);
                    }
                } else {
                    if (UT.isArray(rowData)) { // 배열
                        provider.insertRows(index + 1, rowData);
                    } else {
                        provider.insertRow(index + 1, rowData);
                    }
                }
                gridView.setCurrent({itemIndex: index + 1});
                break;
            case "bottom":
                if (UT.isArray(rowData)) { // 배열
                    provider.addRows(rowData);
                } else {
                    provider.addRow(rowData);
                }
                gridView.setCurrent({itemIndex: provider.getRowCount() - 1});
                break;
            case "top":
            default:
                if (UT.isArray(rowData)) { // 배열
                    provider.insertRows(0, rowData);
                } else {
                    provider.insertRow(0, rowData);
                }
                gridView.setCurrent({itemIndex: 0});
                break;
        }
        GRID.itemCountPropertyBinding(gridView);
        if (UT.isFunction(addedCallback)) {
            addedCallback.call(this);
        }
    },

    /**
     * 트리 그리드의 현재 노드 추가
     *
     * @method addCurrentRow
     * @param  {object}       gridView grid
     * @param  {function}     addedCallback()                        row가 추가된 후에 호출될 콜백 함수
     * @param  {object}       addedCallback().parentRow              상위 row의 값. null 이면 root를 뜻함.
     * @param  {function}     addedCallback().setValue(value)        추가된 row에 저장할 value를 할당하는 함수
     * @param  {array|object} addedCallback().setValue(value).value  추가된 row에 저장할 value. value가 배열이면 복수의 행, object이면 단일행 추가.
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.addCurrentRow(me.gridView, function(parentRow, setValue) {
     *             setValue({
     *                 field1: parentRow.field1,
     *                 field2: "value2"
     *             });
     *         });
     *     }
     */
    addCurrentRow: function(gridView, addedCallback) {
        if (UT.isFunction(gridView.setTreeOptions)) {// 트리인 경우에만.
            GRID.commit(gridView);

            var provider = gridView.getDataProvider();
            var current = gridView.getCurrent();
            var parentId = provider.getParent(current.dataRow);

            addedCallback.call(this, provider.getJsonRow(parentId), function(value) {
                if (UT.isArray(value)) { // 배열
                    for (var i = 0, len = value.length; i < len; i++) {
                        var childId = provider.addChildRow(parentId, value[i]);
                        gridView.setCurrent({itemIndex: gridView.getItemIndex(childId)});
                    }
                } else {
                    var childId = provider.addChildRow(parentId, value);
                    gridView.setCurrent({itemIndex: gridView.getItemIndex(childId)});
                }
                GRID.itemCountPropertyBinding(gridView);
            });
        }
    },

    /**
     * 트리 그리드의 하위 노드 추가
     *
     * @method addChildRow
     * @param {object}       gridView grid
     * @param {function}     addedCallback()                        row가 추가된 후에 호출될 콜백 함수
     * @param {object}       addedCallback().parentRow              상위 row의 값
     * @param {function}     addedCallback().setValue(value)        추가된 row에 저장할 value를 할당하는 함수.
     * @param {array|object} addedCallback().setValue(value).value  추가된 row에 저장할 value. value가 배열이면 복수의 행, object이면 단일행 추가.
     * @param {object}       [options]
     * @param {string}       [options.addableMode="strict"] 추가 옵션
     * <pre>
     * "strict" - 신규행의 하위 노드는 추가하지 못한다. "신규 노드에는 하위노드를 추가할 수 없습니다" 메시지 출력됨.
     * "always" - 제한 없이 항상 추가 가능
     * </pre>
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.addChildRow(me.gridView, function(parentRow, setValue) {
     *             setValue({
     *                 field1: parentRow.field1,
     *                 field2: "value2"
     *             });
     *         });
     *     }
     */
    addChildRow: function(gridView, addedCallback, options) {
        if (UT.isFunction(gridView.setTreeOptions)) {// 트리인 경우에만.
            GRID.commit(gridView);

            options = options || {};
            var provider = gridView.getDataProvider();
            var current = gridView.getCurrent();
            var parentId = current.dataRow;
            if (parentId < 0) { // 현재 노드가 없으면 하위 노드 추가를 할 수 없다.
                return;
            }
            var addableMode = options.addableMode || "";
            addableMode = addableMode.toLowerCase() === "always" ? addableMode : "strict";
            if (addableMode === "strict" && provider.getRowState(parentId) === "created") {
                UT.alert(MSG.N1800); // 신규 노드에는 하위노드를 추가할 수 없습니다
                return;
            } else {
                addedCallback.call(this, provider.getJsonRow(parentId), function(value) {
                    if (UT.isArray(value)) { // 배열
                        for (var i = 0, len = value.length; i < len; i++) {
                            var childId = provider.addChildRow(parentId, value[i]);
                            gridView.expand(current.itemIndex);
                            gridView.setCurrent({itemIndex: gridView.getItemIndex(childId)});
                        }
                    } else {
                        var childId = provider.addChildRow(parentId, value);
                        gridView.expand(current.itemIndex);
                        gridView.setCurrent({itemIndex: gridView.getItemIndex(childId)});
                    }
                    GRID.itemCountPropertyBinding(gridView);
                });
            }
        }
    },

    /**
     * 그리드의 목록데이터 지우기
     *
     * @method clearRows
     * @param {object} gridView grid
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.clearRows(me.gridView);
     *     }
     */
    clearRows: function(gridView) {
        gridView.getDataProvider().clearRows();
        GRID.itemCountPropertyBinding(gridView);
    },

    /**
     * 그리드의 목록데이터 지우기
     *
     * @method clearRows
     * @param {object} gridView grid
     * @param {array}  rows     목록데이터
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.appendRows(me.gridView, rows, {fillMode: "append"});
     *     }
     */
    appendRows: function(gridView, rows, options) {
        gridView.getDataProvider().fillJsonData(rows, options);
        GRID.itemCountPropertyBinding(gridView);
    },

    /**
     * 그리드의 목록 로드 - 그리드에 목록데이터 셋팅
     *
     * @method setRows
     * @param {object}   gridView   grid
     * @param {array}    rows       목록데이터
     * @param {function} [callback] 데이터 셋팅 완료 후 호출될 콜백 함수
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         GRID.setRows(me.gridView, rows);
     *     }
     */
    setRows: function(gridView, rows, callback) {
        var provider = gridView.getDataProvider();
        provider.setRows(rows);
        GRID.itemCountPropertyBinding(gridView);
        if (UT.isFunction(callback)) {
            callback.call(this);
        }
    },

    /**
     * 트리 그리드의 목록 로드 - 그리드에 목록데이터 셋팅
     *
     * @method setTreeRows
     * @param {object}   gridView      grid
     * @param {array}    rows          목록데이터
     * @param {string}   treeFieldName 트리가 적용될 필드명
     * @param {function} [callback]    데이터 셋팅 완료 후 호출될 콜백 함수
     * @async
     * @example
     *     someFunction: function(e, res) {
     *         var me = this;
     *         ...
     *         GRID.setTreeRows(me.gridView, rows, "tree", function() {
     *             ...
     *         });
     *     }
     */
    setTreeRows: function(gridView, rows, treeFieldName, callback) {
        var provider = gridView.getDataProvider();
        provider.setRows(rows, treeFieldName, false);
        GRID.itemCountPropertyBinding(gridView);
        if (UT.isFunction(callback)) {
            callback.call(this);
        }
    },

    /**
     * 그리드의 목록 조회 요청
     *
     * @method findList
     * @param {object} gridView grid
     * @param {object} ajax     sc-ajax 객체
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.findList(me.gridView, me.$.findList);
     *     }
     */
    findList: function(gridView, ajax) {
        UT.request(ajax);
    },

    /**
     * 그리드의 목록 조회 요청(페이징 처리용)
     * @param gridView
     * @param ajax
     * @param {object}   [options]
     * @param {string}   [options.total_field_nm: 데이터 전체건수 field 명]
     */
    findListPaging: function(gridView, ajax, options){

        options = options || {};

        // 현재 그리드에 조회된 데이터 개수
        var itemCount = gridView.getItemCount() || 0;

        // 데이터 전체 건수
        var rowCnt = gridView.getValue(0, options.total_field_nm);

        // 현재 그리드에 조회된 건수가, 데이터 전체 건수를 초과하면 return
        if(rowCnt && rowCnt <= itemCount ){
            return;
        }


        // 페이지당 가져올 데이터 개수
        var limit = 200;

        // 현재 페이지
        var page = (itemCount/limit)+1;

        // 데이터를 가져올 범위값(시작, 끝)
        ajax.body.start_row = itemCount + 1;
        ajax.body.end_row   = limit * page;

        UT.request(ajax);
    },

    /**
     * 그리드의 목록 데이터 저장
     * <br>
     * "저장 하시겠습니까?" 또는 "변경된 내용이 없습니다" 메시지 출력
     *
     * @method saveList
     * @param {object}   gridView grid
     * @param {function} callback()                     "저장 하시겠습니까?" confirm 에서 ok 가 클릭된 후 호출될 콜백 함수
     * @param {array}    callback().created             신규 추가된 데이터
     * @param {array}    callback().updated             수정된 데이터
     * @param {function} callback().request(ajax)       서버로 저장을 요청할 콜백 함수
     * @param {object}   callback().request(ajax).ajax  sc-ajax 객체
     * @param {object}   [optons]
     * @param {boolean}  [optons.force=false]           true 이면 변경된 내용이 없어도 confirm 으로 수행된다.
     * @param {object}   [optons.outputFormat=DEF.styles.outputFormat]  서버로 전송할 포맷 지정
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.saveList(me.gridView, function(created, updated, request) {
     *             me.$.saveList.body = {
     *                 insertData: created,
     *                 updateData: updated
     *             };
     *             request(me.$.saveList);
     *         });
     *     }
     */
    saveList: function(gridView, callback, options) {
        options = options || {};
        var force = UT.isBoolean(options.force) ? options.force : false;
        var outputFormat = options.outputFormat || DEF.styles.outputFormat;
        var rows = GRID.allStateRows(gridView, outputFormat);
        if (rows.created.length > 0 || rows.updated.length > 0 || force) {
            UT.confirm(MSG.N1200, function() { // 저장 하시겠습니까?
                callback.call(this, rows.created, rows.updated, function(ajax) {
                    UT.request(ajax);
                });
            });
        } else {
            UT.alert(MSG.N1700); // 변경된 내용이 없습니다
        }
    },

    /**
     * 그리드의 row 삭제
     * <br>
     * "삭제 하시겠습니까?" 또는 "수정중인 데이터가 있습니다. 삭제 하시겠습니까?" 또는 "선택된 항목이 없습니다" 메시지 출력
     *
     * @method deleteList
     * @param {object}   gridView grid
     * @param {function} callback()                     "삭제 하시겠습니까?" confirm 에서 ok 가 클릭된 후 호출될 콜백 함수
     * @param {array}    callback().deleted             삭제된 데이터
     * @param {function} callback().request(ajax)       서버로 삭제를 요청할 콜백 함수
     * @param {object}   callback().request(ajax).ajax  sc-ajax 객체
     * @param {object}   [optons]
     * @param {string}   [optons.message]               "삭제 하시겠습니까?" 와 다른 메시지를 출력할 경우 지정
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.deleteList(me.gridView, function(deleted, request) {
     *             if (deleted.length > 0) {
     *                 me.$.deleteList.body = {
     *                    deleteMenus: deleted
     *                 }
     *                 request(me.$.deleteList);
     *             }
     *         });
     *     }
     */
    deleteList: function(gridView, callback, options) {
        GRID.commit(gridView);

        options = options || {};
        var checked = gridView.getCheckedRows();
        if (checked.length > 0) {
            var provider = gridView.getDataProvider();
            var updated = provider.getStateRows("updated");

            var deletes = []; // 기존 & checked
            var creates = []; // 신규 & checked
            var updates = []; // 수정중

            for (var i = 0, len = updated.length; i < len; i++) {
                if (gridView.isCheckedItem(updated[i]) === false) {
                    updates.push(updated[i]);
                }
            }
            for (var i = 0, len = checked.length; i < len; i++) {
                var state = provider.getRowState(checked[i]);
                if (state === "none" || state === "updated") {
                    deletes.push(provider.getJsonRow(checked[i]));
                } else if (state === "created") {
                    creates.push(checked[i]);
                }
            };

            var message = options.message || I18N.translate(MSG.N1300); // 삭제 하시겠습니까?
            if (updates.length > 0) {
                message = I18N.translate(MSG.N1400); // 수정중인 데이터가 있습니다. 삭제 하시겠습니까?
            }
            UT.confirm(message, function(btn) {
                provider.removeRows(checked); // grid에서 row 제거.
                GRID.itemCountPropertyBinding(gridView);

                callback.call(this, deletes, function(ajax) {
                    UT.request(ajax);
                });
            });
        } else {
            UT.alert(MSG.N1600); // 선택된 항목이 없습니다
        }
    },

    /**
     * 그리드의 목록 로드 완료 - 그리드에 목록데이터 셋팅
     *
     * @method completeFindList
     * @param {object}   gridView   grid
     * @param {array}    rows       목록데이터
     * @param {function} [callback] 데이터 셋팅 완료 후 호출될 콜백 함수
     * @async
     * @example
     *     someFunction: function(e, res) {
     *         var me = this;
     *         GRID.completeFindList(me.gridView, res.response);
     *     }
     */
    completeFindList: function(gridView, rows, callback) {
        GRID.setRows(gridView, rows, callback);
    },

    /**
     * 트리 그리드의 목록 로드 완료 - 그리드에 목록데이터 셋팅
     *
     * @method completeTreeFindList
     * @param {object}   gridView      grid
     * @param {array}    rows          목록데이터
     * @param {string}   treeFieldName 트리가 적용될 필드명
     * @param {function} [callback]    데이터 셋팅 완료 후 호출될 콜백 함수
     * @async
     * @example
     *     someFunction: function(e, res) {
     *         var me = this;
     *         GRID.completeTreeFindList(me.gridView, res.response, "tree", function() {
     *             ...
     *         });
     *     }
     */
    completeTreeFindList: function(gridView, rows, treeFieldName, callback) {
        GRID.setTreeRows(gridView, rows, treeFieldName, callback);
    },

    /**
     * 그리드의 목록 데이터 저장 완료
     * <br>
     * "요청을 완료 하였습니다" 또는 "오류가 발생하였습니다.\n관리자에게 문의하세요" 메시지 출력
     *
     * @method completeSaveList
     * @param {object}   gridView          grid
     * @param {object}   result            서버에서의 처리 결과
     * @param {function} [successCallback] 성공시 호출될 콜백 함수
     * @param {function} [failureCallback] 실패시 호출될 콜백 함수
     * @async
     * @example
     *     someFunction: function(e, res) {
     *         var me = this;
     *         GRID.completeSaveList(me.gridView, res.response, function() {
     *             ...
     *         });
     *     }
     */
    completeSaveList: function(gridView, result, successCallback, failureCallback) {
        if (UT.isObject(result) && result.result_status === DEF.SUCCESS) {
            var callback = function() {
                if (UT.isFunction(successCallback)) {
                    successCallback.call(this);
                }
            };
            // 요청을 완료 하였습니다
            UT.alert(MSG.N1500, successCallback);
        } else {
            var callback = function() {
                if (UT.isFunction(failureCallback)) {
                    failureCallback.call(this);
                }
            };
            UT.alert(UT.failureMessage(result), callback);// 오류가 발생하였습니다.\n관리자에게 문의하세요
        }
    },

    /**
     * 그리드의 목록 데이터 삭제 완료
     * <br>
     * "요청을 완료 하였습니다" 또는 "오류가 발생하였습니다.\n관리자에게 문의하세요" 메시지 출력
     *
     * @method completeDeleteList
     * @param {object}   gridView          grid
     * @param {object}   result            서버에서의 처리 결과
     * @param {function} [successCallback] 성공시 호출될 콜백 함수
     * @param {function} [failureCallback] 실패시 호출될 콜백 함수
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.completeDeleteList(me.gridView, res.response, function() {
     *             ...
     *         });
     *     }
     */
    completeDeleteList: function(gridView, result, successCallback, failureCallback) {
        if (UT.isObject(result) && result.result_status === DEF.SUCCESS) {
            var callback = function() {
                if (UT.isFunction(successCallback)) {
                    successCallback.call(this);
                }
            };
            // 요청을 완료 하였습니다
            UT.alert(MSG.N1500, successCallback);
        } else {
            var callback = function() {
                if (UT.isFunction(failureCallback)) {
                    failureCallback.call(this);
                }
            };
            UT.alert(UT.failureMessage(result), callback);// 오류가 발생하였습니다.\n관리자에게 문의하세요
        }
    },

    /**
     * 트리 그리드의 체크 cell 이 클릭 되었을때 이벤트
     *
     * @method onCheckCellClicked
     * @param {object} gridView          grid
     * @param {object} cell              셀 정보
     * @param {object} [options]
     * @param {boolean}[options.children=true] true: 자식 노드들도 동일한 check 값을 적용
     * @param {boolean}[options.ancestor=true] true: 조상 노드들도 동일한 check 값을 적용. uncheck시에는 클릭된 cell 과 동일한 레벨에 check 된 것이 없어야 부모 노드가 uncheck 된다
     * @param {object} [options.values] true 값, false 값 정의
     * @param {string} [options.values.trueValue="Y"] true 값
     * @param {string} [options.values.falseValue="N"] false 값
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         me.gridView.onDataCellClicked = function(grid, cell) {
     *             if(cell.fieldName == "field1") {
     *                 GRID.onCheckCellClicked(grid, cell, {children: true, ancestor: true});
     *             }
     *         }
     *
     *     }
     */
    onCheckCellClicked: function(gridView, cell, options) {
        options = options || {};
        var children = UT.isBoolean(options.children) ? options.children : true;
        var ancestor = UT.isBoolean(options.ancestor) ? options.ancestor : true;
        var values = options.values || { trueValue: "Y", falseValue: "N" };

        var fieldName = cell.fieldName;
        var provider = gridView.getDataProvider();

        setTimeout(function() { // 이벤트가 끝나기 전까지 값이 바뀌지 않기 때문에.
            var data = provider.getJsonRow(cell.dataRow);
            var checkedValue = data[fieldName];
            if (children) {
                var checker1 = function(dataRow, value) {
                    provider.setValue(dataRow, fieldName, value);
                    var children = provider.getChildren(dataRow);
                    if (children != null) {
                        for (var i = 0, len = children.length; i < len; i++) {
                            checker1(children[i], value);
                        }
                    }
                };
                checker1(cell.dataRow, checkedValue);
                gridView.expand(cell.itemIndex, true);
            }

            if (ancestor) {
                if (checkedValue === values.trueValue) {
                    var ancestors = provider.getAncestors(cell.dataRow);
                    for (var i = 0, len = ancestors.length; i < len; i++) {
                        provider.setValue(ancestors[i], fieldName, checkedValue);
                    }
                } else {
                    var checker2 = function(dataRow, value) {
                        provider.setValue(dataRow, fieldName, value);
                        var parent = provider.getParent(dataRow);
                        if (parent != null && parent > -1) {
                            var children = provider.getChildren(parent);
                            var existTrueValue = false;
                            for (var i = 0, len = children.length; i < len; i++) {
                                var dataChild = provider.getJsonRow(children[i]);
                                if (dataChild[fieldName] === values.trueValue) {
                                    existTrueValue = true;
                                    break;
                                }
                            }
                            if (existTrueValue === false) {
                                checker2(parent, checkedValue);
                                gridView.expand(parent, true);
                            }
                        }
                    };
                    checker2(cell.dataRow, checkedValue);
                }
            }

        }, 10);

    },

    /**
     * 그리드의 주어진 row의 하위 모든 leaf 노드의 rowId 만 리턴한다.
     *
     * @method getTreeLeafRowIds
     * @param {object} gridView grid
     * @param {number} rowId    데이터행 index
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         var leafs = GRID.getTreeLeafRowIds(me.gridView, -1); // -1 이면 전체
     *         me.gridView.setCellStyles(leafs, "field1", DEF.styles.actionable.id); // leaf 노드만 actionable
     *     }
     */
    getTreeLeafRowIds: function(gridView, rowId) {
        var provider = gridView.getDataProvider();
        var all = provider.getDescendants(rowId);
        var leafs = [];
        for (var i = 0, len = all.length; i < len; i++) {
            if (provider.getChildCount(all[i]) === 0) {
                leafs.push(all[i]);
            }
        }
        return leafs;
    },

    /**
     * 그리드의 체크된 row를 위로 이동시킨다
     *
     * @method moveUp
     * @param {object}   gridView   grid
     * @param {function} [callback] 이동 후 호출될 콜백함수
     * @param {number}   [minItemIndex=0] 위로 이동할 수 있는 제한 index
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.moveUp(me.gridView, function() {
     *             ...
     *         });
     *     }
     */
    moveUp: function(gridView, callback, minItemIndex) {
        var checked = gridView.getCheckedItems();
        if (checked.length > 0) {
            minItemIndex = UT.isNumber(minItemIndex) ? Math.max(minItemIndex, 0) : 0;
            for (var i = 0, len = checked.length; i < len; i++) {
                if (checked[i] > minItemIndex) {
                    var upIndex = checked[i] - 1;
                    if (gridView.isCheckedItem(upIndex) === false) {
                        gridView.getDataProvider().moveRow(gridView.getDataRow(checked[i]), gridView.getDataRow(upIndex));
                        gridView.checkItem(upIndex, true, false);
                        gridView.checkItem(checked[i], false, false);
                    }
                }
            }
        }
        if (UT.isFunction(callback)) {
            callback.call(this);
        }
    },

    /**
     * 그리드의 체크된 row를 아래로 이동시킨다
     *
     * @method moveDown
     * @param {object}   gridView   grid
     * @param {function} [callback] 이동 후 호출될 콜백함수
     * @param {number}   [maxItemIndex=(itemCount-1)] 아래로 이동할 수 있는 제한 index
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.moveDown(me.gridView, function() {
     *             ...
     *         });
     *     }
     */
    moveDown: function(gridView, callback, maxItemIndex) {
        var checked = gridView.getCheckedItems();
        if (checked.length > 0) {
            var itemCount = gridView.getItemCount();
            maxItemIndex = UT.isNumber(maxItemIndex) ? Math.min(maxItemIndex, itemCount - 1) : itemCount - 1;
            for (var len = checked.length, i = len - 1; i >= 0; i--) { // 아래부터 이동
                if (checked[i] < maxItemIndex) {
                    var downIndex = checked[i] + 1;
                    if (gridView.isCheckedItem(downIndex) === false) {
                        gridView.getDataProvider().moveRow(gridView.getDataRow(checked[i]), gridView.getDataRow(downIndex));
                        gridView.checkItem(checked[i], false, false);
                        gridView.checkItem(downIndex, true, false);
                    }
                }
            }
        }
        if (UT.isFunction(callback)) {
            callback.call(this);
        }
    },

    /**
     * 그리드의 checkBar 헤더 visible 설정
     *
     * @method visibleCheckBarHeader
     * @param {object}  gridView grid
     * @param {boolean} visible  true is visible
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.visibleCheckBarHeader(me.gridView, false);
     *     }
     */
    visibleCheckBarHeader: function(gridView, visible) {
        gridView.setCheckBar({ // header의 전체 선택/해제 기능
            showAll: visible
        });
    },

    /**
     * 그리드의 소팅 기능 여부 설정
     *
     * @method sortable
     * @param {object}  gridView grid
     * @param {boolean} sortable true is sortable
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         GRID.sortable(me.gridView, false); // 소팅기능 없음
     *     }
     */
    sortable: function(gridView, sortable) {
        gridView.setSortingOptions({
            enabled: sortable
        });
    },

    /**
     * 그리드의 읽기 전용 설정
     *
     * @method readOnly
     * @param {object}  gridView grid
     * @param {boolean} readonly true is readonly
     * @param {array|string} exFieldName 제외 필드명
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         if (...) {
     *             GRID.readOnly(me.gridView, true);
     *         } else {
     *             GRID.readOnly(me.gridView, false);
     *         }
     *     }
     */
    readOnly: function(gridView, readonly, exFieldName){
        if (readonly) {
            if (typeof gridView.$$Custom$$.editables === "undefined") {
                gridView.$$Custom$$.editables = [];
            }
            if (typeof gridView.$$Custom$$.visibles === "undefined") {
                gridView.$$Custom$$.visibles = {
                    checkBar: gridView.getCheckBar().visible,
                    stateBar: gridView.getStateBar().visible,
                    icons: [],
                    requiredIcons: [],
                    buttons: []
                };
            }
            var columnNames = gridView.getColumnNames(false);
            for (var i in columnNames) {
                var columnName = columnNames[i];
                var column = gridView.columnByName(columnName);

                if(!!exFieldName && exFieldName.indexOf(columnName) > -1) {
                    continue;
                }

                if (UT.isString(column.tag) && column.tag.indexOf("[editable]") > -1) {
                    if (gridView.$$Custom$$.editables.indexOf(columnName) === -1) {
                        gridView.$$Custom$$.editables.push(columnName);
                    }
                }
                if (UT.isString(column.tag) && column.tag.indexOf("[required-icon]") > -1) {
                    if (gridView.$$Custom$$.visibles.requiredIcons.indexOf(columnName) === -1) {
                        gridView.$$Custom$$.visibles.requiredIcons.push(columnName);
                    }
                }
                if (UT.isString(column.tag) && column.tag.indexOf("[icon]") > -1 && column.visible === true) {
                    if (gridView.$$Custom$$.visibles.icons.indexOf(columnName) === -1) {
                        gridView.$$Custom$$.visibles.icons.push(columnName);
                    }
                }
                if (UT.isString(column.tag) && column.tag.indexOf("[button]") > -1 && column.buttonVisibility !== "hidden") {
                    gridView.setColumnProperty(column, "buttonVisibility", "hidden");
                    gridView.$$Custom$$.visibles.buttons.push({columnName: columnName, visibility: column.buttonVisibility});
                }
            }
            GRID.setColumnStyle(gridView, gridView.$$Custom$$.editables, DEF.styles.readonly);
            GRID.setColumnStyle(gridView, gridView.$$Custom$$.visibles.requiredIcons, DEF.styles.icons.empty);
            GRID.setColumnProperty(gridView, gridView.$$Custom$$.visibles.icons, "visible", false);
            gridView.setOptions({
                checkBar: { visible: false },
                stateBar: { visible: false }
            });
            gridView.setEditOptions({
                editable: false
            });

        } else {
            if (UT.isArray(gridView.$$Custom$$.editables)) {
                GRID.setColumnStyle(gridView, gridView.$$Custom$$.editables, DEF.styles.editable);
            }
            if (typeof gridView.$$Custom$$.visibles === "object") {
                if (UT.isArray(gridView.$$Custom$$.visibles.requiredIcons)) {
                    GRID.setColumnStyle(gridView, gridView.$$Custom$$.visibles.requiredIcons, DEF.styles.icons.required);
                }
                if (UT.isArray(gridView.$$Custom$$.visibles.icons)) {
                    GRID.setColumnProperty(gridView, gridView.$$Custom$$.visibles.icons, "visible", true);
                }
                for (var i = 0, len = gridView.$$Custom$$.visibles.buttons.length; i < len; i++) {
                    var button = gridView.$$Custom$$.visibles.buttons[i];
                    gridView.setColumnProperty(button.columnName, "buttonVisibility", button.visibility);
                }
                gridView.setOptions({
                    checkBar: { visible: gridView.$$Custom$$.visibles.checkBar },
                    stateBar: { visible: gridView.$$Custom$$.visibles.stateBar }
                });
            }
            gridView.setEditOptions({
                editable: true
            });
            delete gridView.$$Custom$$.editables;
            delete gridView.$$Custom$$.visibles;
        }
    },

    /**
     * 그리드 메모리 관련 함수
     * @param gridView
     */
    clearMemoryLeak: function(gridView){
        if(UT.isNotEmpty(gridView)){
            gridView.clearWindowEventListeners();
        }
    }
};