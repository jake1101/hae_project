/*LG화학용 오버라이드
Converter8ModuleResolver.convertStoreToAjax = function(storeName, store){
	if(store && store.proxy && store.proxy.type === 'direct' && store.proxy.directFn) {
		var dirFn = store.proxy.directFn;
	    
		var scAjax = this.createElementMeta('sc-ajax-provider', {
			id : storeName+'Loader',
			'direct-fn' : dirFn,
			'last-response' : ('{{'+ storeName + '}}')
		});
		
		if(store.type === 'cmmnenum' && store.enumType){
			this.setAttribute(scAjax, 'enum-type', store.enumType);
			this.addComment(scAjax,'다음에 위치한  sc-ajax-provider는 EnumStore('+storeName+') 였습니다.',true);
		}
		else if(store.type === 'cmmnoperatingunit' && store.unitType){
			this.setAttribute(scAjax, 'unit-type', store.unitType);
			this.addComment(scAjax,'다음에 위치한  sc-ajax-provider는 OperatingUnitStore('+storeName+') 였습니다.',true);
		}
	    else if(store.type === 'cmmncode' && store.groupCode){
	    	scAjax = this.createElementMeta('sc-code-provider', {
	    		id : storeName+'Loader',
	    		code : store.groupCode,
	    		value : ('{{'+ storeName + '}}')
	    	});
	    	this.addComment(scAjax,'다음에 위치한 sc-ajax-provider는 CommonCodeStore('+storeName+') 였습니다.',true);
	    }
	    else if(store.type === 'tree'){
	    	this.addComment(scAjax,'다음에 위치한 sc-ajax-provider는 TreeStore('+storeName+') 였습니다.',true);
	    	
	    	if(store.proxy.reader && this.CUT.isObject(store.proxy.reader.transform)){
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
	    return scAjax;
	}
};
*/
