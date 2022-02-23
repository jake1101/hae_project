/**
데이터 유효성 검사
1. 그리드 데이터의 유효성 검사:

<pre>
    // 그리드 생성
    initGrid: function() {
        var me = this;
        ... 생략 ...
        var validator = [];
        validator.push({
            fieldName: "target_fieldname",
            check: ["required", "!space", "unique"],
            maxLength: 18
        });
        ... 생략 ...
        // 설정방법 1.
        me.gridView = GRID.createGridView(me.$.gridPanel, fields, columns, {
            validator: validator                    // 검사항목을 설정한다.
        });

        // 설정방법 2.
        GRID.setValidator(me.gridView, validator);
    }

    // 저장
    onSaveList: function() {
        var me = this;
        if (GRID.invalidData(me.gridView)) {        // GRID.invalidData 을 이용한다.
            return;
        }
        GRID.saveList(me.gridView, function(created, updated, request) {
            me.$.saveList.body = {
                insertOrgTypes: created,
                updateOrgTypes: updated
            };
            request(me.$.saveList);
        });
    }
</pre>

2. 일반 데이터 유효성 검사
<pre>
    // 방법 1.
    // 데이터 유효성 설정
    initValidator: function() {
        var me = this;
        me.set("detailInfo.$validator", [{           // 데이터 객체의 $validator 에 검사 항목을 추가 한다.
            text: "조직유형",
            fieldName: "target_fieldname",
            check: ["selected"]
        }]);
    }

    // 저장
    onSaveInfo: function() {
        var me = this;
        if (UT.invalidData(me.get("detailInfo"))) {  // UT.invalidData 를 이용한다.
            return;
        }
        ... 생략 ...
        UT.save(me.$.saveInfo);
    }

    // 방법 2.
    // 저장
    onSaveInfo: function() {
        var me = this;
        var validator = [{ text: "조직유형", fieldName: "target_fieldname", check: ["selected"] }];
        validator.push();
        if (UT.invalidData(me.get("detailInfo"), validator)) {  // UT.invalidData 를 이용한다.
            return;
        }
        ... 생략 ...
        UT.save(me.$.saveInfo);
    }

</pre>
@class VALID
*/
/*var VALID = {
    *//**
     * 그리드 데이터의 유효성 검사
     *
     * @method VALID.isValidGridData
     * @param  {object}  gridView 그리드 instance
     * @param  {array}   validator 유효성 검사 항목
     * @return {boolean} true - 유효함
     * @example
     * <pre>
     * </pre>
     *//*
    isValidGridData: function(gridView, validator) {
        var message = "";
        for (var i in validator) {
            var fieldName = validator[i].fieldName;
            var rows = GRID.allRows(gridView, {exceptDeleted: true}); // 삭제된 행은 제외.

            var check = validator[i].check;
            for (var j in check) {
                if (!UT.isFunction(VALID.checker[check[j]])) {
                    continue;
                }
                message = VALID.checker[check[j]](rows, fieldName);
                if (message !== "") {
                    break;
                }
            }
            if (message === "" && UT.isNumber(validator[i].maxLength)) {
                message = VALID.checker["maxLength"](rows, fieldName, validator[i].maxLength);
            }
            if (message === "" && UT.isNumber(validator[i].minLength)) {
                message = VALID.checker["minLength"](rows, fieldName, validator[i].minLength);
            }
            if (message === "" && UT.isNumber(validator[i].fixLength)) {
                message = VALID.checker["fixLength"](rows, fieldName, validator[i].fixLength);
            }
            if (message === "" && typeof validator[i].gtValue !== "undefined") {
                message = VALID.checker["gtValue"](rows, fieldName, validator[i].gtValue);
            }
            if (message === "" && typeof validator[i].geValue !== "undefined") {
                message = VALID.checker["geValue"](rows, fieldName, validator[i].geValue);
            }
            if (message === "" && typeof validator[i].ltValue !== "undefined") {
                message = VALID.checker["ltValue"](rows, fieldName, validator[i].ltValue);
            }
            if (message === "" && typeof validator[i].leValue !== "undefined") {
                message = VALID.checker["leValue"](rows, fieldName, validator[i].leValue);
            }
            if (message === "" && typeof validator[i].gtDate !== "undefined") {
                message = VALID.checker["gtDate"](rows, fieldName, validator[i].gtDate);
            }
            if (message === "" && typeof validator[i].geDate !== "undefined") {
                message = VALID.checker["geDate"](rows, fieldName, validator[i].geDate);
            }
            if (message === "" && typeof validator[i].ltDate !== "undefined") {
                message = VALID.checker["ltDate"](rows, fieldName, validator[i].ltDate);
            }
            if (message === "" && typeof validator[i].leDate !== "undefined") {
                message = VALID.checker["leDate"](rows, fieldName, validator[i].leDate);
            }
            if (message === "" && typeof validator[i].regexType !== "undefined") {
                message = VALID.checker["regexType"](rows, fieldName, validator[i].regexType);
            }

            if (message !== "") {
                message = UT.formatString(message, gridView.getColumnProperty(fieldName, "header").text); // 컬럼명
                break;
            }
        }
        if (message !== "") {
            UT.alert(message);
            return false;
        } else {
            return true;
        }
    },

    *//**
     * 일반 데이터의 유효성 검사
     *
     * @method VALID.isValidData
     * @param  {Object}  data 검사할 변수들이 포함된 객체
     * @param  {array}   validator 유효성 검사 항목
     * @return {boolean} true - 유효함
     * @example
     * <pre>
     * </pre>
     *//*
    isValidData: function(data, validator) {
        var message = "";
        for (var i in validator) {
            data = [].concat(data);
            var fieldName = validator[i].fieldName;
            var text = validator[i].text;

            var check = validator[i].check;
            for (var j in check) {
                if (!UT.isFunction(VALID.checker[check[j]])) {
                    continue;
                }
                message = VALID.checker[check[j]](data, fieldName);
                if (message !== "") {
                    break;
                }
            }
            if (message === "" && UT.isNumber(validator[i].maxLength)) {
                message = VALID.checker["maxLength"](data, fieldName, validator[i].maxLength);
            }
            if (message === "" && UT.isNumber(validator[i].minLength)) {
                message = VALID.checker["minLength"](data, fieldName, validator[i].minLength);
            }
            if (message === "" && UT.isNumber(validator[i].fixLength)) {
                message = VALID.checker["fixLength"](data, fieldName, validator[i].fixLength);
            }
            if (message === "" && typeof validator[i].gtValue !== "undefined") {
                message = VALID.checker["gtValue"](data, fieldName, validator[i].gtValue);
            }
            if (message === "" && typeof validator[i].geValue !== "undefined") {
                message = VALID.checker["geValue"](data, fieldName, validator[i].geValue);
            }
            if (message === "" && typeof validator[i].ltValue !== "undefined") {
                message = VALID.checker["ltValue"](data, fieldName, validator[i].ltValue);
            }
            if (message === "" && typeof validator[i].leValue !== "undefined") {
                message = VALID.checker["leValue"](data, fieldName, validator[i].leValue);
            }
            if (message === "" && typeof validator[i].gtDate !== "undefined") {
                message = VALID.checker["gtDate"](data, fieldName, validator[i].gtDate);
            }
            if (message === "" && typeof validator[i].geDate !== "undefined") {
                message = VALID.checker["geDate"](data, fieldName, validator[i].geDate);
            }
            if (message === "" && typeof validator[i].ltDate !== "undefined") {
                message = VALID.checker["ltDate"](data, fieldName, validator[i].ltDate);
            }
            if (message === "" && typeof validator[i].leDate !== "undefined") {
                message = VALID.checker["leDate"](data, fieldName, validator[i].leDate);
            }
            if (message === "" && typeof validator[i].regexType !== "undefined") {
                message = VALID.checker["regexType"](data, fieldName, validator[i].regexType);
            }

            if (message !== "") {
                message = UT.formatString(message, text); // 필드명
                break;
            }
        }
        if (message !== "") {
            UT.alert(message);
            return false;
        } else {
            return true;
        }
    },

    *//**
     * validator 항목
     *
     * @property validator
     * @type object
     * @example
     * <pre>
     * {
     *     text: "대상 필드명", - 그리드에서는 컬럼 header text를 이용하므로 생략한다.
     *     fieldName: "target_fieldname",
     *     check: [
     *         "unique",    - unique. 그리드에서만 가능. 출력 메시지 - {0}에 동일한 값이 존재합니다
     *         "required",  - 필수입력. 출력 메시지 - {0}은(는) 필수값입니다
     *         "selected",  - 필수선택. 출력 메시지 - {0}을(를) 선택하십시오
     *         "!space",    - 문자열 중에 공백문자 허용안함. 출력 메시지 - {0}은(는) 공백문자를 허용하지 않습니다
     *         "alphabet",  - 영문자만 입력 가능. 출력 메시지 - {0}은(는) 영문자만 입력할 수 있습니다
     *         "number"     - 숫자 형식만 입력 가능. 출력 메시지 - {0}은(는) 숫자형식만 입력할 수 있습니다
     *     ],
     *     maxLength: 10,   - 최대 입력 길이. 출력 메시지 - {0}은(는) {1}자 이하로 입력하십시오
     *     minLength: 10,   - 최소 입력 길이. 출력 메시지 - {0}은(는) {1}자 이상 입력하십시오
     *     fixLength: 10,   - 고정 입력 길이. 출력 메시지 - {0}은(는) {1}자로 입력하십시오
     *     gtValue: 10,     - 값 비교 ( > ). 출력 메시지 - {0}은(는) {1} 보다 큰값으로 입력하십시오
     *     geValue: 10,     - 값 비교 ( >= ). 출력 메시지 - {0}은(는) {1}이상 값으로 입력하십시오
     *     ltValue: 10,     - 값 비교 ( < ). 출력 메시지 - {0}은(는) {1} 보다 작은값으로 입력하십시오
     *     leValue: 10,     - 값 비교 ( <= ). 출력 메시지 - {0}은(는) {1}이하 값으로 입력하십시오
     *     gtDate: today,   - 날짜 비교 ( > ). 출력 메시지 - {0}은(는) {1}이후 날짜로 입력하십시오
     *     geDate: today,   - 날짜 비교 ( >= ). 출력 메시지 - {0}은(는) {1}이후 날짜로 입력하십시오
     *     ltDate: today,   - 날짜 비교 ( < ). 출력 메시지 - {0}은(는) {1}이전 날짜로 입력하십시오
     *     leDate: today    - 날짜 비교 ( <= ). 출력 메시지 - {0}은(는) {1}이전 날짜로 입력하십시오
     *     gtValue: {
     *         fieldName: "compare_fieldname"  // 다른 필드값과 비교시
     *     }
     *     geValue: {
     *         fieldName: "compare_fieldname"  // 다른 필드값과 비교시
     *     }
     *     ltValue: {
     *         fieldName: "compare_fieldname"  // 다른 필드값과 비교시
     *     }
     *     leValue: {
     *         fieldName: "compare_fieldname"  // 다른 필드값과 비교시
     *     }
     *     gtDate: {
     *         fieldName: "compare_fieldname"  // 다른 필드값과 비교시
     *     }
     *     gtDate: {
     *         fieldName: "compare_fieldname"  // 다른 필드값과 비교시
     *     }
     *     ltDate: {
     *         fieldName: "compare_fieldname"  // 다른 필드값과 비교시
     *     }
     *     leDate: {
     *         fieldName: "compare_fieldname"  // 다른 필드값과 비교시
     *     }
     * }
     * </pre>
     *//*

    checker: {
        "unique": function(rows, fieldName) { //
            var exist = {};
            for (var index in rows) {
                if (rows[index][fieldName]) {
                    if (exist[rows[index][fieldName]] === true) {
                        return I18N.translate("STD.E1000");  // {0}에 동일한 값이 존재합니다
                    } else {
                        exist[rows[index][fieldName]] = true;
                    }
                }
            }
            return "";
        },
        "required": function(rows, fieldName) {
            for (var index in rows) {
                if (VALID.isEmpty(rows[index][fieldName])) {
                    return I18N.translate("STD.E1001");  // {0}은(는) 필수값입니다
                }
            }
            return "";
        },
        "selected": function(rows, fieldName) {
            for (var index in rows) {
                if (VALID.isEmpty(rows[index][fieldName])) {
                    return I18N.translate("STD.E1012");  // {0}을(를) 선택하십시오
                }
            }
            return "";
        },
        "!space": function(rows, fieldName) {
            var pattern = /[\s\t\r\n\v\f]/;
            for (var index in rows) {
                if (rows[index][fieldName] && pattern.test(rows[index][fieldName])) {
                    return I18N.translate("STD.E1002"); // {0}은(는) 공백문자를 허용하지 않습니다
                }
            }
            return "";
        },
        "alphabet": function(rows, fieldName) {
            var pattern = /[^A-Za-z]/;
            for (var index in rows) {
                if (rows[index][fieldName] && pattern.test(rows[index][fieldName])) {
                    return I18N.translate("STD.E1003"); // {0}은(는) 영문자만 입력할 수 있습니다
                }
            }
            return "";
        },
        "number": function(rows, fieldName) {
            var pattern = /[^0-9]/;
            for (var index in rows) {
                var v = VALID.toString(rows[index][fieldName]);
                var value = v ? v.replace(/[\.\,\-\+]/g, "") : ""; // . , - + 제거하고 비교
                if (pattern.test(value)) {
                    return I18N.translate("STD.E1004"); // {0}은(는) 숫자형식만 입력할 수 있습니다
                }
            }
            return "";
        },
        "uppercaseandnumber": function(rows, fieldName) {
            var pattern = /[^A-Z0-9]/;
            for (var index in rows) {
                if (rows[index][fieldName] && pattern.test(rows[index][fieldName])) {
                    return I18N.translate("STD.E1015"); // {0}은(는) 영문자, 숫자형식만 입력할 수 있습니다
                }
            }
            return "";
        },
        "minLength": function(rows, fieldName, length) {
            if (typeof length === "undefined") {
                return "";
            }
            for (var index in rows) {
                var v = VALID.toString(rows[index][fieldName]);
                if (v && v.length < length) {
                    return UT.formatString(I18N.translate("STD.E1005"), {"1": length}); // {0}은(는) {1}자 이상 입력하십시오
                }
            }
            return "";
        },
        "maxLength": function(rows, fieldName, length) {
            if (typeof length === "undefined") {
                return "";
            }
            for (var index in rows) {
                var v = VALID.toString(rows[index][fieldName]);
                if (v && v.length > length) {
                    return UT.formatString(I18N.translate("STD.E1006"), {"1": length}); // {0}은(는) {1}자 이하로 입력하십시오
                }
            }
            return "";
        },
        "fixLength": function(rows, fieldName, length) {
            if (typeof length === "undefined") {
                return "";
            }
            for (var index in rows) {
                var v = VALID.toString(rows[index][fieldName]);
                if (v && v.length !== length) {
                    return UT.formatString(I18N.translate("STD.E1007"), {"1": length}); // {0}은(는) {1}자로 입력하십시오
                }
            }
            return "";
        },
        "gtValue": function(rows, fieldName, compare) {
            if (typeof compare === "undefined") {
                return "";
            }
            for (var index in rows) {
                var value = VALID.toNumber(rows[index][fieldName]);
                var compareValue = VALID.toNumber(UT.isObject(compare) ? rows[index][compare.fieldName] : compare);
                if (value === null || compareValue === null) {
                    continue;
                }
                if (value <= compareValue) {
                    // {0}은(는) {1} 보다 큰값으로 입력하십시오
                    return UT.formatString(compare.message || I18N.translate("STD.E1008"), {"1": UT.isString(compare.text) ? compare.text : compareValue});
                }
            }
            return "";
        },
        "geValue": function(rows, fieldName, compare) {
            if (typeof compare === "undefined") {
                return "";
            }
            for (var index in rows) {
                var value = VALID.toNumber(rows[index][fieldName]);
                var compareValue = VALID.toNumber(UT.isObject(compare) ? rows[index][compare.fieldName] : compare);
                if (value === null || compareValue === null) {
                    continue;
                }
                if (value < compareValue) {
                    // {0}은(는) {1}이상 값으로 입력하십시오
                    return UT.formatString(compare.message || I18N.translate("STD.E1009"), {"1": UT.isString(compare.text) ? compare.text : compareValue});
                }
            }
            return "";
        },
        "ltValue": function(rows, fieldName, compare) {
            if (typeof compare === "undefined") {
                return "";
            }
            for (var index in rows) {
                var value = VALID.toNumber(rows[index][fieldName]);
                var compareValue = VALID.toNumber(UT.isObject(compare) ? rows[index][compare.fieldName] : compare);
                if (value === null || compareValue === null) {
                    continue;
                }
                if (value >= compareValue) {
                    // {0}은(는) {1} 보다 작은값으로 입력하십시오
                    return UT.formatString(compare.message || I18N.translate("STD.E1010"), {"1": UT.isString(compare.text) ? compare.text : compareValue});
                }
            }
            return "";
        },
        "leValue": function(rows, fieldName, compare) {
            if (typeof compare === "undefined") {
                return "";
            }
            for (var index in rows) {
                var value = VALID.toNumber(rows[index][fieldName]);
                var compareValue = VALID.toNumber(UT.isObject(compare) ? rows[index][compare.fieldName] : compare);
                if (value === null || compareValue === null) {
                    continue;
                }
                if (value > compareValue) {
                    // {0}은(는) {1}이하 값으로 입력하십시오
                    return UT.formatString(compare.message || I18N.translate("STD.E1011"), {"1": UT.isString(compare.text) ? compare.text : compareValue});
                }
            }
            return "";
        },
        "gtDate": function(rows, fieldName, compare) {
            if (typeof compare === "undefined") {
                return "";
            }
            for (var index in rows) {
                var value = VALID.toTime(rows[index][fieldName]);
                var compareValue = VALID.toTime(UT.isObject(compare) ? rows[index][compare.fieldName] : compare);
                if (value === null || compareValue === null) {
                    continue;
                }
                if (value <= compareValue) {
                    // {0}은(는) {1}이후 날짜로 입력하십시오
                    return UT.formatString(compare.message || I18N.translate("STD.E1013"), {"1": UT.isString(compare.text) ? compare.text : UT.formatDate(compareValue)});
                }
            }
            return "";
        },
        "geDate": function(rows, fieldName, compare) {
            if (typeof compare === "undefined") {
                return "";
            }
            for (var index in rows) {
                var value = VALID.toTime(rows[index][fieldName]);
                var compareValue = VALID.toTime(UT.isString(compare.fieldName) ? rows[index][compare.fieldName] : compare);
                if (value === null || compareValue === null) {
                    continue;
                }
                if (value < compareValue) {
                    // {0}은(는) {1}이후 날짜로 입력하십시오
                    return UT.formatString(compare.message || I18N.translate("STD.E1013"), {"1": UT.isString(compare.text) ? compare.text : UT.formatDate(compareValue)});
                }
            }
            return "";
        },
        "ltDate": function(rows, fieldName, compare) {
            if (typeof compare === "undefined") {
                return "";
            }
            for (var index in rows) {
                var value = VALID.toTime(rows[index][fieldName]);
                var compareValue = VALID.toTime(UT.isString(compare.fieldName) ? rows[index][compare.fieldName] : compare);
                if (value === null || compareValue === null) {
                    continue;
                }
                if (value >= compareValue) {
                    // {0}은(는) {1}이전 날짜로 입력하십시오
                    return UT.formatString(compare.message || I18N.translate("STD.E1014"), {"1": UT.isString(compare.text) ? compare.text : UT.formatDate(compareValue)});
                }
            }
            return "";
        },
        "leDate": function(rows, fieldName, compare) {
            if (typeof compare === "undefined") {
                return "";
            }
            for (var index in rows) {
                var value = VALID.toTime(rows[index][fieldName]);
                var compareValue = VALID.toTime(UT.isString(compare.fieldName) ? rows[index][compare.fieldName] : compare);
                if (value === null || compareValue === null) {
                    continue;
                }
                if (value > compareValue) {
                    // {0}은(는) {1}이전 날짜로 입력하십시오
                    return UT.formatString(compare.message || I18N.translate("STD.E1014"), {"1": UT.isString(compare.text) ? compare.text : UT.formatDate(compareValue)});
                }
            }
            return "";
        },
        "regexType": function(rows, fieldName, compare){
        	if (typeof compare === "undefined") {
                return "";
            }
        	for(var index in rows){
        		var value = VALID.toString(rows[index][fieldName]);
        		
        		if (!value){
                    continue;
                }
        		
        		if(compare == "email"){
        			var regExp = VALID.emailRegExp();
        			
        			if(!regExp.allRe.test(value)){
        				return I18N.translate("STD.E1017");
        			}
        		}else if(compare == "mobile"){
        			var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
        			
        			if(!regExp.test(value)){
        				return I18N.translate("STD.E1017");
        			}
        		}else if(compare == "phone"){
        			var regExp =  /^\d{2,3}-\d{3,4}-\d{4}$/;
        			
        			if(!regExp.test(value)){
        				return I18N.translate("STD.E1017");
        			}
        		}else if(compare == "password"){
        			var regExp = VALID.passwordRegExp();
        			
        			//반복문자 조건
        			if(regExp.repeatRe.test(value)) {
        				return UT.formatString(I18N.translate("STD.E1020"), {"1": 4});
        			}
        			
        			//영문,숫자, 특수문자 포함 조건
        			if(!regExp.letterRe.test(value)) {
        				return I18N.translate("STD.E1018");
        			}
        			
        			//길이 조건
        			if(!regExp.lengthRe.test(value)) {
        				return UT.formatString(I18N.translate("STD.E1019"), {"1": 8, "2": 20});
        			}
        		}
        		
        	}
        	
        	return "";
        }

    },

    *//**
     * value가 empty 인지 검사
     * <pre>
     * string일 경우 trim 후 empty 검사한다
     * array일 경우 크기가 0 이면 empty
     * number일 경우 숫자 형식이 아니면 empty 로 간주한다
     * </pre>
     *
     * @private
     * @method isEmpty
     * @param  {string|number|array} value
     * @return {boolean} true is empty
     *//*
    isEmpty: function(value) {
        if (value === null || "undefined" === typeof value) {
            return true;
        }
        if (UT.isString(value) && value.trim() === "") {
            return true;
        }
        if (UT.isNumber(value) && isNaN(value)) {
            return true;
        }
        if (UT.isArray(value) && value.length === 0) {
            return true;
        }
        return false;
    },

    *//**
     * 숫자인 경우 문자열로 변환
     *
     * @private
     * @method toString
     * @param  {object} v
     * @return {string}
     *//*
    toString: function(v) {
        if (UT.isNumber(v)) {
            return v.toString();
        }
        return v;
    },

    *//**
     * 숫자형식으로 변환
     *
     * @private
     * @method toNumber
     * @param  {string} v
     * @return {number}
     *//*
    toNumber: function(v) {
        if (UT.isString(v)) {
            if (v.trim().length === 0) {
                return null;
            }
            return Number(v.replace(/[\,]/g, ""));
        }
        if (UT.isNumber(v)) {
            return v;
        }
        return null;
    },

    *//**
     * 날짜의 time 값으로 변환
     *
     * @private
     * @method toTime
     * @param  {object} v
     * @return {number}
     *//*
    toTime: function(v) {
        if (UT.isDate(v)) {
            return v.getTime();
        }
        return null;
    },
    
    *//**
     * 패스워드 정규표현식 반환
     *
     * @private
     * @method passwordRegExp
     * @return {object}
     *//*
    passwordRegExp: function() {
    	var regExp = {};

        regExp.lengthRe = new RegExp("^.{8,20}$");	//길이 8~20자
        regExp.letterRe = new RegExp("^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])","i"); //영문, 특수문자, 숫자 포함 여부
        regExp.repeatRe = new RegExp("(.)\\1{3,}");	// 4번 이상연속된 문자

        return regExp;
    },
    
    *//**
     * 이메일 정규표현식 반환
     *
     * @private
     * @method emailRegExp
     * @return {object}
     *//*
    emailRegExp: function() {
    	var regExp = {};
    	
    	regExp.allRe = new RegExp("^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$", "i");	//길이 8~20자
    	
    	return regExp; 
    }

};*/