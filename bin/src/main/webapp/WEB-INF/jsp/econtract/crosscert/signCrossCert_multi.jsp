<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ page import="java.util.*,java.net.*,java.io.*" %>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
		<script src="/bower_components/jquery/dist/jquery.min.js"></script>
		<title></title>
		<!-- 전자인증 모듈 설정 //-->
		<link rel="stylesheet" type="text/css" href="/resources/econtract/crosscert_home/unisignweb/rsrc/css/certcommon.css?v=1" />
		<script type="text/javascript" src="/resources/econtract/crosscert_home/unisignweb/js/unisignwebclient.js?v=1"></script>
		<script type="text/javascript" src="/resources/econtract/crosscert_home/UniSignWeb_Multi_Init_Nim.js?v=1"></script>
		<!-- 전자인증 모듈 설정 //-->
		<script type="text/javascript">							
			function signDataNVerifyVID() 
			{
				//debugger;
 				//window.resizeTo(610, 652);
				/*** Hash값 검증 및 신원확인 ***/
				
				var signSource = document.getElementsByName("sign_source");
				var ssn = document.signForm.ssn.value;
				var jsonSrcText = {};
				
				for(var i=0 ; i < signSource.length ; i++){
					if(signSource[i] == null || signSource[i] == "") {
						alert("[전자서명 실패]\n서명 원본이 없습니다.");
	 	                this.close();
	 	                return;
	 				} else {
	 					jsonSrcText[i] = signSource[i].value;
	 				}
				}
				
				unisign.SignMultiDataNVerifyVID( jsonSrcText, null, ssn,
						function(rv, jsonSignedText, certAttrs)
						{ 
							if ( rv != 0 )
							{
								unisign.GetLastError(
									function(errCode, errMsg) 
									{ 
										console.log('인증서 신원확인 검증에 실패' + 'Error code : ' + errCode + '\n\nError Msg : ' + errMsg);
										alert("[전자서명 실패]\n인증서 신원확인 검증에 실패했습니다.");
										this.close();
										callback("E");
										return; 
									}
								);
							}
							else {
								if(document.signForm.sign_value.length > 1){
									for(var j=0 ; j < document.signForm.sign_value.length ; j++){
										document.signForm.sign_value[j].value = jsonSignedText[j];
									}
								} else {
									document.signForm.sign_value.value = jsonSignedText;
								}
								
								console.log("DN:"+certAttrs.subjectName +'인증서의 신원확인 검증에 성공하였습니다.');
								send(); 							
							}
						} 
					);
			}
			
			function send()
			{
				if(document.signForm.sign_value.length > 1){
					for(var k=0 ; k < document.signForm.sign_value.length ; k++){
						if(document.signForm.sign_value[k].value == ""){
							alert("[전자서명 실패]\n전자서명값이 없습니다.");
		 					this.close();
		 					callback("E");
							return;
						}
					}
				} else {
					if (document.signForm.sign_value.value == "") {
	 					alert("[전자서명 실패]\n전자서명값이 없습니다.");
	 					this.close();
	 					callback("E");
						return;
	 				}
				}
				
				document.signForm.method = "post";
				document.signForm.action = "/sp/edoc/contract/saveVdMultiSignValue.do";
				document.signForm.target = "work";
				document.signForm.submit();
			}
			
			// callback 함수 (S : 성공, E : 실패)
			function callback(result_status) {
				this.fire("close", result_status);
			}
		</script>
	</head>
	<body onload="javascript:signDataNVerifyVID();">
	
		<form name="signForm" onsubmit="return false">
			<sec:csrfInput/>
		 	<input type="hidden"  name="ssn"			value="1234567890"><!-- 테스트인증서용 -->
<%-- 			<input type="hidden"  name="ssn"			value="${biz_reg_no}"> --%><!-- 운영시사용 -->
		    <input type="hidden"  name="cntr_no"		value="${signContentInfo.cntr_no}">
		    <input type="hidden"  name="cntr_rev"		value="${signContentInfo.cntr_rev}"> 
		    <input type="hidden"  name="ref_cd"			value="${signContentInfo.ref_cd}">
		    <input type="hidden"  name="ref_cntr_rev"	value="${signContentInfo.ref_cntr_rev}">
		    <input type="hidden"  name="usr_id"			value="${usr_id}">
		    <input type="hidden"  name="biz_reg_no"		value="${biz_reg_no}">
		    <input type="hidden"  name="cntr_type"		value="${signContentInfo.cntr_type}">
		    <input type="hidden"  name="comp_cd"		value="${signContentInfo.comp_cd}">
		    <input type="hidden"  name="sign_target"	value="${signContentInfo.sign_target}">
		    <input type="hidden"  name="sign_source"	value="${signContentInfo.hash_value}">
		    <input type="hidden"  name="file_path"		value="${signContentInfo.file_path}">
		    <textarea name="sign_value" style="display:none; word-wrap: normal; overflow:auto;"></textarea>
<%
	List signAppFileList = (List) request.getAttribute("signAppFileList");
	String baseDir = (String) request.getAttribute("baseDir");
	
	if(signAppFileList != null){
		for(int i = 0 ; i < signAppFileList.size() ; i++){
			Map fileMap = (Map) signAppFileList.get(i);
%>
		    <input type="hidden"  name="sign_target"	value="<%=fileMap.get("sign_target") %>">
		    <input type="hidden"  name="sign_source"	value="<%=fileMap.get("file_path") %>">
		    <input type="hidden"  name="file_path"		value="<%=baseDir + fileMap.get("file_path") %>">
		    <textarea name="sign_value" style="display:none; word-wrap: normal; overflow:auto;"></textarea>
<%
		}
	}
%>
		</form>
		<iframe name="work" src="about:blank" width="0" height="0"></iframe>
	</body>
</html>