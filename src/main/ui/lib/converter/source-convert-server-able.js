/**
 * EMRO SMARTsuite7 to SMARTsuite9 CONVERTER
 * @author 
 * @version:0.1.0
 * 
 * use library
 * 1. jsxml : javascript 기반 xml parser (https://github.com/colorhook/jsxml)
 * 2. ejs : javascript template 엔진 (http://www.embeddedjs.com/)
 * 3. as3js : actionscript3 to javascript transpiler (https://as3js.org/)
 * 4. js-beautify : js, html, css beautifier (https://github.com/beautify-web/js-beautify)
 */
function convertServerAble(content, domName) {
	// jsxml
	var Namespace = jsxml.Namespace, QName = jsxml.QName, XML = jsxml.XML, XMLList = jsxml.XMLList;
	var me = this;
	
	var packageName = domName, 			// xml parsing
		requestMapValue="", 		// tag convert
		controllerMethods="",		// script convert
		serviceMethods="",
		serviceImplMethods="",
		daoMethods="",
		resultControllerText="",		// template result
		resultServiceText="",		// template result
		resultServiceImplText="",		// template result
		resultDaoText="",		// template result
		classNameLower,
		className,
		resultMap = {};
		

	var authList = {
		"get" : "READ",
		"find" : "READ",
		"save" : "SAVE",
		"delete" : "SAVE",
		"update" : "SAVE",
		"copy" : "SAVE",
	}
		
	/**
	 * convert 대상 component 정의
	 * - container 계열 : 삭제대상을 none으로 지정. 해당 컴포넌트를 삭제하고 하위 컴포넌트를 상위 컴포넌트로 이관.
	 * - control 계열 : 삭제대상을 remove로 지정. 해당 컴포넌트는 주석으로 처리.
	 * - property : 삭제대상을 remove로 지정. 추가대상은 addProperties에 추가.
	 * - 특이사항(extraFunc) : <vc:SCTD label=""/>의 경우 smartsutie9 에서는 <th><sc-label></sc-label><th> 형태로 변환.  
	 *   GRID의 체크 및 선택 용도로 사용되는 체크박스컬럼이나 라디오컬럼은 smartsuite9에서는 selection컬럼이 제공되므로 삭제. 
	 */


	var serviceToMethods = function(xml){
		var element = xml;

		if(element){
			if(element.localName() === "declare"){
				var children = element.children();
				children.each(function(item, idx) {
					if(item.localName() === "job"){
						var methodName,
						content = "",
						attributes = item.attributes(),
						serviceSql = "";

						var methodName = item.attribute("id").getValue();
						if(methodName.indexOf(".") > -1){
							methodName = dotToCamelCase(methodName);
						}
						if(item.child("script").getValue){
							content = item.child("script").getValue();
						}else{
							if(item.child("script")._list.length > 0){
								for (var i = item.child("script")._list.length - 1; i >= 0; i--) {
									content += item.child("script")._list[i].getValue();
								}
							}
						}

						var auths = Object.keys(authList);
						var auth = "READ";
						for(key in auths){
							if(methodName.indexOf(auths[key]) > -1){
								auth = authList[auths[key]];
								break;
							}	
						}
						
						var label = "";
						if(item.attribute("label").getValue && item.attribute("label").getValue()){
							label = item.attribute("label").getValue();
						}
						
						var daoMethod =  new EJS({file:serviceDaoMethodTemplate}).render({
							label : label,
							methodName: methodName,
							returnType: "Map"
						});
						
						var serviceMethod =  new EJS({file:serviceDaoMethodTemplate}).render({
							label : label,
							methodName: methodName,
							returnType: "Map"
						});
						
						var serviceImplMethod =  new EJS({file:serviceImplMethodTemplate}).render({
							label : label,
							methodName: methodName,
							returnType: "Map",
							content : content,
							serviceSql : serviceSql
						});
						
						var controllerMethod =  new EJS({file:controllerMethodTemplate}).render({
							label : label,
							methodName: methodName,
							returnType: "Map",
							classNameLower : classNameLower,
							auth : auth
						});

						daoMethods += "\n\n"+daoMethod;
						serviceMethods += "\n\n"+serviceMethod;
						serviceImplMethods += "\n\n"+serviceImplMethod;
						controllerMethods += "\n\n"+controllerMethod;
					}
				});

			}
			if(element.localName() === "service"){
				var methodName,
					content = "",
					attributes = element.attributes(),
					serviceSql = "";

				var methodName = element.attribute("id").getValue();
				if(methodName.indexOf(".") > -1){
					methodName = dotToCamelCase(methodName);
				}
				if(element.child("script").getValue){
					content = element.child("script").getValue();
				}else{
					if(element.child("script")._list.length > 0){
						for (var i = element.child("script")._list.length - 1; i >= 0; i--) {
							content += element.child("script")._list[i].getValue();
						}
					}
				}

				var auths = Object.keys(authList);
				var auth = "READ"
				for(key in auths){
					if(methodName.indexOf(auths[key]) > -1){
						auth = authList[auths[key]];
						break;
					}	
				}
			
				content = convertComment(content);
				if(content){
					content = "\n\t\t/*" + content + "\n\t\t*/\n\t\treturn null;"; 
				}
				
				if(element.child("select").getValue){
					serviceSql += "\n\t\t/* "+element.child("select").toXMLString() +"*/";
					serviceSql += "\n\t\treturn "+classNameLower+"DAO."+element.child("select").attribute("sql-id").getValue(); 
				}else{
					if(element.child("insert").getValue){
						serviceSql += "\n\t\t/* "+element.child("insert").toXMLString() +"*/";
						serviceSql += "\n\t\t"+classNameLower+"DAO."+element.child("insert").attribute("sql-id").getValue(); 
					}
					if(element.child("update").getValue){
						serviceSql += "\n\t\t/* "+element.child("update").toXMLString() +"*/";
						serviceSql += "\n\t\t"+classNameLower+"DAO."+element.child("update").attribute("sql-id").getValue();
					}
					if(element.child("delete").getValue){
						serviceSql += "\n\t\t/* "+element.child("delete").toXMLString() +"*/";
						serviceSql += "\n\t\t"+classNameLower+"DAO."+element.child("delete").attribute("sql-id").getValue();
					}
					if(serviceSql){
						serviceSql += "\n\t\treturn null;"
					}
				}
				
				
				
				var label = "";
				if(element.attribute("label").getValue && element.attribute("label").getValue()){
					label = element.attribute("label").getValue();
				}
				
				var returnType = methodName.toLowerCase().indexOf("list") > -1 ? "List" : "Map";
				
				var daoMethod =  new EJS({file:serviceDaoMethodTemplate}).render({
					label : label,
					methodName: methodName,
					returnType: returnType
				});
				
				var serviceMethod =  new EJS({file:serviceDaoMethodTemplate}).render({
					label : label,
					methodName: methodName,
					returnType: returnType
				});
				
				var serviceImplMethod =  new EJS({file:serviceImplMethodTemplate}).render({
					label : label,
					methodName: methodName,
					returnType: returnType,
					content : content,
					serviceSql : serviceSql
				});
				
				var controllerMethod =  new EJS({file:controllerMethodTemplate}).render({
					label : label,
					methodName: methodName,
					returnType: returnType,
					classNameLower : classNameLower,
					auth : auth
				});
				
				daoMethods += "\n"+daoMethod;
				serviceMethods += "\n"+serviceMethod;
				serviceImplMethods += "\n\n"+serviceImplMethod;
				controllerMethods += "\n\n"+controllerMethod;
				
			}
			if(element.localName() === "service-descriptor"){
				var id = element.attribute("id").getValue();
				if(id.indexOf("/") > -1){
					packageName = id.split("/")[0];
					className = id.split("/")[1];
					if(className){
						className = toCapitalize(className);
						classNameLower = unCapitalize(className);
					}
				}else{
					packageName = id;
					className = id;
					if(className){
						className = toCapitalize(className);
						classNameLower = unCapitalize(className);
					}
				}
			}
		}

		
		var children = element.children();					
			if(children) {
				children.each(function(item, idx) {
					item = serviceToMethods(item);
			});
		}
	};
	



	var convertComment = function(value) {
		// 1. /**를 /*로 치환
		value = value.replace(/\/\*\*/g, '/*');
		var tryArray;

		// 2. /* 갯수 리턴
		if(value){
			tryArray = value.match(/\/\*/g);
		}

		if (tryArray) {
			var length = tryArray.length;
			var startIdx, endIdx, candidate, previousString, nextString;

			for (var i = 0; i < length; i++) {
				startIdx = value.indexOf('/*');
				endIdx = value.indexOf('*/');

				// 처음과 마지막 스트링
				previousString = value.substring(0, startIdx);
				nextString = value.substring(endIdx + 2, value.length);

				// 주석변환 대상 스트링
				candidate = value.substring(startIdx, endIdx + 2);
				candidate = candidate.replace(/\n/g, '\n//').replace(/\/\*/g, '//').replace(/\*\//g, '\n')

				value = previousString + candidate + nextString;
			}
		}
		return value;
	}


	var camelCaseToDash = function(value) {
		return value.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
	}

	var dotToCamelCase = function(value){
		return value.replace(/(\.[a-zA-Z])/g, function($1){return $1.toUpperCase().replace('.','');});	
	}

	var toCapitalize = function(text) {
	    var text = text.replace(/^./, text[0].toUpperCase());
	    return text;
	}

	var unCapitalize = function(text) {
	    var text = text.replace(/^./, text[0].toLowerCase());
	    return text;
	}
	/**
	 * file Templates
	 * controller, service, serviceImpl, dao
	 */

	var controllerTemplate = "package smartsuite.app.bp.<%= packageName %>.<%= classNameLower %>.web;"
	+"\n"
	+"\nimport java.util.HashMap;"
	+"\nimport java.util.Map;"
	+"\nimport java.util.List;"
	+"\n"
	+"\nimport org.springframework.beans.factory.annotation.Autowired;"
	+"\nimport org.springframework.stereotype.Controller;"
	+"\nimport org.springframework.web.bind.annotation.RequestBody;"
	+"\nimport org.springframework.web.bind.annotation.RequestMapping;"
	+"\nimport org.springframework.web.bind.annotation.ResponseBody;"
	+"\n"
	
	+"\nimport able.com.web.HController;"
	+"\nimport smartsuite.app.bp.<%= packageName %>.<%= classNameLower %>.service.<%= className %>Service;"
	+"\nimport smartsuite.config.annotation.AuthCheck;"
	+"\nimport smartsuite.app.shared.Const;"
	+"\n"
	+"\n"
	+"\n@SuppressWarnings({\"rawtypes\", \"unchecked\"})"
	+"\n@Controller"
	+"\n@RequestMapping(value=\"/**/<%= packageName %>/**/\")"
	+"\npublic class <%= className %>Controller extends HController {"
	+"\n"
	+"\n\t@Autowired"
	+"\n\t<%= className %>Service <%= classNameLower %>Service;"
	+"\n<%= methods %>"
	+"\n}";

	var serviceTemplate = "package smartsuite.app.bp.<%= packageName %>.<%= classNameLower %>.service;"
	+"\n"
	+"\nimport java.util.Map;"
	+"\nimport java.util.List;"
	+"\n"
	+"\nimport org.springframework.stereotype.Service;"
	+"\n"
	+"\n"
	+"\n@SuppressWarnings({\"rawtypes\"})"
	+"\n@Service"
	+"\npublic interface <%= className %>Service {"
	+"\n"
	+"\n<%= methods %>"
	+"\n}";
	
	var serviceImplTemplate = "package smartsuite.app.bp.<%= packageName %>.<%= classNameLower %>.service.impl;"
	+"\n"
	+"\nimport java.util.HashMap;"
	+"\nimport java.util.Map;"
	+"\nimport java.util.List;"
	+"\n"
	+"\nimport org.springframework.stereotype.Service;"
	+"\nimport org.springframework.beans.factory.annotation.Autowired;"
	+"\n"
	+"\nimport able.com.service.HService;"		
	+"\nimport smartsuite.app.bp.<%= packageName %>.<%= classNameLower %>.service.<%= className %>Service;"
	+"\nimport smartsuite.app.bp.<%= packageName %>.<%= classNameLower %>.service.dao.<%= className %>MDAO;"
	+"\n"
	+"\nimport smartsuite.app.shared.Const;"
	+"\nimport smartsuite.app.shared.SharedService;"
	+"\n"
	+"\n"
	+"\n@SuppressWarnings({\"rawtypes\", \"unchecked\"})"
	+"\n@Service(\"<%= classNameLower %>Service\")"
	+"\npublic class <%= className %>ServiceImpl extends HService implements <%= className %>Service {"
	+"\n"
	+"\n\t@Autowired"
	+"\n\t<%= className %>MDAO <%= classNameLower %>DAO;"
	+"\n"
	+"\n<%= methods %>"
	+"\n}";
	
	var daoTemplate = "package smartsuite.app.bp.<%= packageName %>.<%= classNameLower %>.service.dao;"
		+"\n"
		+"\nimport java.util.Map;"
		+"\nimport java.util.List;"
		+"\n"
		+"\nimport able.com.mybatis.Mapper;"
		+"\n"
		+"\n"
		+"\n@SuppressWarnings({\"rawtypes\"})"
		+"\n@Mapper(\"<%= classNameLower %>DAO\")"
		+"\npublic interface <%= className %>MDAO {"
		+"\n"
		+"\n<%= methods %>"
		+"\n}";
	
	/**
	 * MethodTemplates
	 */

	var controllerMethodTemplate = "\n\t/**"
    +"\n\t * <%= label %>"
    +"\n\t *"
    +"\n\t * @author : "
    +"\n\t * @param : param"
    +"\n\t * @return : <%= returnType %>"
    +"\n\t * @Date : "
    +"\n\t * @Method Name : <%= methodName %>"
    +"\n\t */"
	+"\n\t@AuthCheck(authCode=Const.<%= auth %>)"
	+"\n\t@RequestMapping(value = \"<%= methodName %>.do\")"
	+"\n\tpublic @ResponseBody <%= returnType %> <%= methodName %>(@RequestBody Map param){"
	+"\n\t\treturn <%= classNameLower %>Service.<%= methodName %>(param);"
	+"\n\t}";
	
	var serviceImplMethodTemplate = "\n\t/**"
	    +"\n\t * <%= label %>"
	    +"\n\t *"
	    +"\n\t * @author : "
	    +"\n\t * @param : param"
	    +"\n\t * @return : <%= returnType %>"
	    +"\n\t * @Date : "
	    +"\n\t * @Method Name : <%= methodName %>"
	    +"\n\t */"
		+"\n\tpublic <%= returnType %> <%= methodName %>(Map param){"
		+"\n\t\t<%= content %>"
		+"\n\t\t<%= serviceSql %>"
		+"\n\t}";

	var serviceDaoMethodTemplate = "\n\tpublic <%= returnType %> <%= methodName %>(Map param);";
	


	
	/**
	 * 실제 function 실행 부분
	 */	
	// xml parsing
	xml = new XML(content);
	
	// tag convert
	serviceToMethods(xml);
	
	// template result
	resultControllerText = new EJS({file:controllerTemplate}).render({
		packageName: packageName,
		className : className,
		classNameLower : classNameLower,
		methods: controllerMethods, 
	});
	
	resultDaoText = new EJS({file:daoTemplate}).render({
		packageName: packageName,
		className : className,
		classNameLower : classNameLower,
		methods: daoMethods, 
	});
	
	resultServiceText = new EJS({file:serviceTemplate}).render({
		packageName: packageName,
		className : className,
		classNameLower : classNameLower,
		methods: serviceMethods, 
	});

	resultServiceImplText = new EJS({file:serviceImplTemplate}).render({
		packageName: packageName,
		className : className,
		classNameLower : classNameLower,
		methods: serviceImplMethods, 
	});

	resultMap.controller = resultControllerText;
	resultMap.serviceImpl = resultServiceImplText ;
	resultMap.service = resultServiceText ;
	resultMap.dao = resultDaoText ;
	
	return resultMap;
}