<%
 
    response.setHeader("Pragma","no-cache"); 
    response.setDateHeader("Expires",0); 
    response.setHeader("Cache-Control","no-store"); 
%>  
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.net.*,java.io.*" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv='X-UA-Compatible' content='IE=edge' />
    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <style>
    	.centerDiv{
    		text-align:center;
    		vertical-align:middle;
    		width : 590;
    		height : 580;
    		display : table-cell;
    	}
    </style>

    <!-- KICA SecuKit NXS -->
    <link rel="stylesheet" type="text/css" href="/resources/econtract/kica_home/WebUI/css/base.css" />
    <script type="text/javascript" src="/resources/econtract/kica_home/WebUI/js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="/resources/econtract/kica_home/KICA/config/nx_config.js"></script>
    <script type="text/javascript" src="/resources/econtract/kica_home/KICA/config/LoadSecukitnx.js"></script>
    <script type="text/javascript">
        window.onload = function () {
            // KICA WebUI append
            $('#KICA_SECUKITNXDIV_ID').append(KICA_SECUKITNXDIV);
	        secunx_Loading();
        };

        function SecuKitNX_Ready(res) {
            if (res) {
				// 인증서창이 로딩이 되면
				// processLogin 셋팅
				processLogic.init();
				processLogic.setProcessLogic("KICA_USE_P7Sign");
				
				// 인증서 선택창 호출
                NX_ShowDialog();
            }
        }
		
		// 함수 호출 결과값 리턴
		function SecuKitNXS_RESULT(cmd, res){
			// Error 체크
			var Err = 999;
			try{
				Err = res.ERROR_CODE;
			}catch(e){
				console.log(e);
			}
			
			if(Err === undefined){
				var val = null;
				switch(cmd){
					// 전자서명				
					case 'KICA_USE_P7Sign' :
						var certType ='signCert';
						var sourceString = $("#sign_source").val();
						var certID = certListInfo.getCertID();
						var cmd = 'KICA_USE_P7Sign_Result.generatePKCS7SignedData';
						var Data = {
							'certType' : certType,
							'sourceString' : sourceString,
							'certID' : certID
						}
						
						var param = JSON.stringify(Data);
						secukitnxInterface.SecuKitNXS(cmd, param);
                    break;
                    
					// 전자서명 콜백
					case 'KICA_USE_P7Sign_Result':
                        val = res.generatePKCS7SignedData;      // PKCS#7 Signed Data
                        $("#sign_value").val(val);
						
						// 신원검증 확인(VID)
						var cmd = 'Check_SSN_Result.verifyVID';
						var Data = {
							'ssn' : $("#ssn").val(),
							'certID' : certListInfo.getCertID()
						};
						var param = JSON.stringify(Data);
						secukitnxInterface.SecuKitNXS(cmd, param);
                    break;
                    
					// 신원검증 콜백
					case 'Check_SSN_Result':
						var val = res. verifyVID;
						if(val){
							document.signForm.method = "post";
							document.signForm.action = "/sp/edoc/contract/saveVdSignValue.do";
							document.signForm.target = "work";
							document.signForm.submit();
						}else{
							alert("신원 검증에 실패하였습니다.\nVID를 확인해주세요.")
						}
					break;
				}
			}
		}
		
		// callback 함수 (S : 성공, E : 실패)
		function callback(result_status){
			this.fire("close", result_status);
		}
    </script>
</head>
<body>
	<!-- WEBUI DIV 영역 -->
	<div id="KICA_SECUKITNXDIV_ID"></div>
	<div class="centerDiv">
		<img width="150" height="150" src="/resources/econtract/kica_home/WebUI/images/loading_icon.gif" />
		<h4>시스템에서 전자서명을 진행하고 있습니다.<br> 잠시만 기다려주세요.</h4>
	</div>
	<form name="signForm">
	 	<input type="hidden"  name="ssn"          id="ssn"          value="1234567890">
	    <input type="hidden"  name="cntr_no"      id="cntr_no"      value="${signContentInfo.cntr_no}">
	    <input type="hidden"  name="cntr_rev"     id="cntr_rev"     value="${signContentInfo.cntr_rev}"> 
	    <input type="hidden"  name="ref_cd"       id="ref_cd"       value="${signContentInfo.ref_cd}">
	    <input type="hidden"  name="ref_cntr_rev" id="ref_cntr_rev" value="${signContentInfo.ref_cntr_rev}">
	    <input type="hidden"  name="usr_id"       id="usr_id"       value="${usr_id}">
	    <input type="hidden"  name="biz_reg_no"   id="biz_reg_no"   value="${biz_reg_no}">
	    <input type="hidden"  name="cntr_type"    id="cntr_type"    value="${signContentInfo.cntr_type}">
	    <input type="hidden"  name="sign_source"  id="sign_source"  value="${signContentInfo.hash_value}">
	    <input type="hidden"  name="filePath"     id="filePath"     value="${signContentInfo.filePath}">
	    
	    <textarea id="sign_value" name="sign_value" style="display:none; word-wrap: normal; overflow:auto;"></textarea>
	    <sec:csrfInput/>
	</form>
	<iframe name="work" src="about:blank" width="0" height="0"></iframe>
</body>
</html>