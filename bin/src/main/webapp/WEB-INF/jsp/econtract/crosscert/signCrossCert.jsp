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
				var sign_source = document.signForm.sign_source.value;
				if(sign_source == null || sign_source == "") {
					alert("[전자서명 실패]\n서명 원본이 없습니다.");
	                this.close();
	                return;
				} else {
					/*unisign.SignDataNVerifyVID(sign_source, null, document.signForm.ssn.value,
							function(rv, signedText, certAttrs)
							{ 
								if ( null === signedText || '' === signedText || false === rv )
								{
									unisign.GetLastError(
										function(errCode, errMsg) 
										{ 
											errCode = 999, errMsg = "사용자가 실행을 취소했습니다."
											
 											//console.log('인증서 신원확인 검증에 실패' + 'Error code : ' + errCode + '\n\nError Msg : ' + errMsg);
											//alert("[전자서명 실패]\n인증서 신원확인 검증에 실패했습니다.");
											
											console.log('error code : ' + errCode + '\n\nError Msg : ' + errMsg);
											alert(errMsg);
											this.close();
											var resultStatus = "E";
											if(errCode == 999){ //사용자 취소
												resultStatus = "CANCEL";
											}
											callback(resultStatus);
											return;
										}
									);
								} else {
 									console.log("DN:"+certAttrs.subjectName +'인증서의 신원확인 검증에 성공하였습니다.');
									document.signForm.sign_value.value = signedText;
									send();
								}
							} 
						);*/
						
					//개발용
					unisign.SignData(sign_source, null, function(signedText, curdevice, certAttrs){
						if ( null == signedText || '' == signedText ){
							unisign.GetLastError(
									function(errCode, errMsg){ 
										if (errCode != 21002 && errCode != 11003)
											alert(errMsg); 
											this.close();
											var resultStatus = "E";
											if(errCode == 999){ //사용자 취소
												resultStatus = "CANCEL";
											}
											callback(resultStatus);
											return;
									});
						}else{
							console.log("DN:"+certAttrs.subjectName +'인증서의 신원확인 검증에 성공하였습니다.');
							document.signForm.sign_value.value = signedText;
							send();
						}
					});
						
				}
				//툴킷 검은색 배경화면을 흰색으로 변경
				var div = $("body > div").get(0);
				div.setAttribute('style','z-index: 10000; background-image: none; margin: 0px; cursor: auto; display: block; position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgb(255, 255, 255); opacity: 0.5;');
				var usDivCertSelect = document.getElementById('us-div-cert-select');
				usDivCertSelect.setAttribute('style','z-index: 10001; position: fixed; top: -10px; left: 0px;');
			}
			
			function send()
			{
				if (document.signForm.sign_value.value == "")
				{
					alert("[전자서명 실패]\n전자서명값이 없습니다.");
					this.close();
				}
				document.signForm.method = "post";
				document.signForm.action = "/sp/edoc/contract/saveVdSignValue.do";
				document.signForm.target = "work";
				document.signForm.submit();
			}
			
			// callback 함수 (S : 성공, E : 실패)
			function callback(result_status) {
				this.fire("close", result_status);
			}
		</script>
	</head>
	<body onload="signDataNVerifyVID();">
	
		<form name="signForm">
			<input type="hidden"  name="ssn"          id="ssn"          value="1234567890"><!-- 테스트인증서용 -->
<%-- 		 	<input type="hidden"  name="ssn"          id="ssn"          value="${biz_reg_no}"> --%><!-- 운영시사용 -->
		    <input type="hidden"  name="cntr_no"      id="cntr_no"      value="${signContentInfo.cntr_no}">
		    <input type="hidden"  name="cntr_rev"     id="cntr_rev"     value="${signContentInfo.cntr_rev}"> 
		    <input type="hidden"  name="ref_cd"       id="ref_cd"       value="${signContentInfo.ref_cd}">
		    <input type="hidden"  name="ref_cntr_rev" id="ref_cntr_rev" value="${signContentInfo.ref_cntr_rev}">
		    <input type="hidden"  name="usr_id"       id="usr_id"       value="${usr_id}">
		    <input type="hidden"  name="biz_reg_no"   id="biz_reg_no"   value="${biz_reg_no}">
		    <input type="hidden"  name="cntr_type"    id="cntr_type"    value="${signContentInfo.cntr_type}">
		    <input type="hidden"  name="comp_cd"	  id="comp_cd"		value="${signContentInfo.comp_cd}">
		    <input type="hidden"  name="sign_source"  id="sign_source"  value="${signContentInfo.hash_value}">
		    <input type="hidden"  name="filePath"     id="filePath"     value="${signContentInfo.filePath}">
		    <sec:csrfInput/>
		    <textarea id="sign_value" name="sign_value" style="display:none; word-wrap: normal; overflow:auto;"></textarea>
		</form>
		<iframe name="work" src="about:blank" width="0" height="0"></iframe>
	</body>
</html>