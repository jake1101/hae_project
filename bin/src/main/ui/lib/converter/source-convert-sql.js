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
function convertSql(content, domName) {
	// jsxml
	var Namespace = jsxml.Namespace, QName = jsxml.QName, XML = jsxml.XML, XMLList = jsxml.XMLList;
	var me = this;

	String.prototype.startsWith = function(str) {
       return (this.indexOf(str) === 0);
    }
	
	var packageName = domName, 			// xml parsing
		requestMapValue="", 		// tag convert
		controllerMethods="",		// script convert
		serviceMethods="",
		resultText="",		// template result
		className,
		resultMap = {};

	var tobe = {
		
	
		"sql-descriptor" : {
			__name: "mapper",
			extraFunc: function getSqlName(element){
				var namespace = element.attribute("id").getValue();
				if(namespace.indexOf("/") > -1){
					namespace = namespace.split("/")[1];
				}
				var addAttr = new XML();
				addAttr._nodeKind = "attribute";
				addAttr._qname = QName._format("namespace", namespace);
				addAttr._text = namespace;
				element._attributes = [];
				element._attributes.push(addAttr);
			}
		},

		"sql" :{
			extraFunc: function getSqlName(element){
				var value = element.getValue(),
					mappers = Object.keys(this.mappers),
					name = "update";
				//주석제거
				//var pattern = /\/*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//;
				//value = value.replace(pattern, "");


				for(key in mappers){
					if(value.startsWith(mappers[key])){
						name = this.mappers[mappers[key]];
						
						break;
					}
				}
				if(value.startsWith("call") || value.startsWith("CALL")){
					var attr = element.attribute("callable");
					if(attr.setName && attr.setValue){
						attr.setName("statementType");
						attr.setValue("CALLABLE");
					}
					
				}
				var attr = element.attribute("id");

				if(attr.getValue && attr.getValue().indexOf(".") > -1){
					attr.setValue(dotToCamelCase(attr.getValue()));
				}
				var commentAttr = element.attribute("comment");
				var comment = "";
				if(commentAttr.getValue){
					comment = commentAttr.getValue();
					commentAttr.remove();
				}
				if(comment){
					comment = "/*"+comment+"*/"+"\r\n\t\t";
				}

				element.setName(name);

				var matchs = value.match(/\[.*\]/ig);
				for(i in matchs){
					var parmas = matchs[i].match(/#[\w]+.#/g);
					if(parmas === null){
						continue;
					}
					var content = matchs[i];
					var param = matchs[i].match(/#[\w]+.#/g)[0];
					param = param.match(/[\w]+/g)[0];

					content = content.replace("[", "");
					content = content.replace("]", "");
					var ifString  = "<if test=\"p."+param+ " != null\">"
					+"\r\n\t\t\t"+content
					+"\r\n\t\t\t"+"</if>"
					if(ifString){
						value = value.replace(matchs[i], ifString);
					}
				}

				matchs = value.match(/#[\w:]+.#/g);
				for(i in matchs){
					var param = matchs[i].match(/[\w:]+/g)[0];
					if(param){
						param = param.split(":")[0];
						param = "#{"+"p."+param+"}";
						value = value.replace(matchs[i], param);
					}
				}

				element.setValue("\r\n\t\t"+comment+value+"\r\n\t");
				

				if(name === "select"){
					var addAttr = new XML();
					addAttr._nodeKind = "attribute";
					addAttr._qname = QName._format("resultType", "map");
					addAttr._text = "map";
					element._attributes.push(addAttr);
				}
				if(element.children() && element.children()._useCDATA){
					element.children()._useCDATA = false;
				}
			},
			mappers : {
				"INSERT" : "insert",
				"DELETE" : "delete",
				"UPDATE" : "update",
				"SELECT" : "select",
				"BEGIN" : "update",
				"MERGE" : "update",
				"CALL" : "select",
				"insert" : "insert",
				"delete" : "delete",
				"update" : "update",
				"select" : "select",
				"begin" : "update",
				"merge" : "update",
				"call" : "select"
					
			}
		}
	}
	/**
	 * convert 대상 component 정의
	 * - container 계열 : 삭제대상을 none으로 지정. 해당 컴포넌트를 삭제하고 하위 컴포넌트를 상위 컴포넌트로 이관.
	 * - control 계열 : 삭제대상을 remove로 지정. 해당 컴포넌트는 주석으로 처리.
	 * - property : 삭제대상을 remove로 지정. 추가대상은 addProperties에 추가.
	 * - 특이사항(extraFunc) : <vc:SCTD label=""/>의 경우 smartsutie9 에서는 <th><sc-label></sc-label><th> 형태로 변환.  
	 *   GRID의 체크 및 선택 용도로 사용되는 체크박스컬럼이나 라디오컬럼은 smartsuite9에서는 selection컬럼이 제공되므로 삭제. 
	 */
	
	var sqlToMybatis = function(xml){
		var element = xml;

		if(element){
			var component = element.localName();
			if(component){
				component = component.toLowerCase();	
			}
			var to_element = tobe[component];
			if(to_element){
				element._qname._ns.prefix = "";
				if(to_element["__name"]){
					element.setName(to_element["__name"]);
				}
				to_element.extraFunc(element);
			}
			
		}

		var children = element.children();					
			if(children) {
				children.each(function(item, idx) {
					item = sqlToMybatis(item);
			});
		}
		return element;
	};


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
	 * 실제 function 실행 부분
	 */	
	// xml parsing
	xml = new XML(content);
	
	// tag convert
	resultText = sqlToMybatis(xml).toXMLString();
	
	var reg = /&lt;if.*?&gt;/g;
	result = resultText.match(reg);


	// The matches are in elements 0 through n.
	for (var index = 0; index < result.length; index++)
	{
		var replaceText = result[index].replace("&lt;", "<").replace("&gt;", ">");
		resultText = resultText.replace(result[index], replaceText);
	}
	resultText = resultText.replace(/&lt;\/if&gt;/gi, "</if>");
	
	resultText = resultText.replace(/&lt;&gt;/gi, "<![CDATA[<>]]>");
	resultText = resultText.replace(/&lt;/gi, "<![CDATA[<]]>");
	resultText = resultText.replace(/&gt;/gi, "<![CDATA[>]]>");
	
	
	
	
	/*resultText = resultText.replace(/&lt;if/gi, "<if");
	resultText = resultText.replace(/&lt;\/if&gt;/gi, "</if>");*/
	
	resultText = "\"http://mybatis.org/dtd/mybatis-3-mapper.dtd\">\r\n\r\n\r\n" + resultText;
	resultText = "<!DOCTYPE mapper PUBLIC \"-//mybatis.org//DTD Mapper 3.0//EN\"\r\n" + resultText;
	resultText = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n" + resultText;
	
	return resultText;
}