<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<html>
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <!-- Tell the browser to be responsive to screen width -->
   <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.7 -->
   <link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css">
   <!-- Font Awesome -->
   <link rel="stylesheet" href="../../bower_components/font-awesome/css/font-awesome.min.css">
   <!-- Ionicons -->
   <link rel="stylesheet" href="../../bower_components/Ionicons/css/ionicons.min.css">
   <!-- Theme style -->
   <link rel="stylesheet" href="../../dist/css/AdminLTE.min.css">
   <!-- AdminLTE Skins. Choose a skin from the css/skins
        folder instead of downloading all of them to reduce the load. -->
   <link rel="stylesheet" href="../../dist/css/skins/_all-skins.min.css">
   <!-- Pace style -->
   <link rel="stylesheet" href="../../plugins/pace/pace.min.css">
   
   <!-- bootstrap datepicker -->
   <link rel="stylesheet" href="../../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
   <sec:csrfMetaTags/>
<!--    <script type="text/javascript" src="/js/main/mobile.js"></script> -->
   
   
   <title>Home</title>
   <meta name="viewport" content="width=device-width, initial-scale=1">
<!--      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"> -->


   <!-- jQuery 3 -->
   <script src="../../bower_components/jquery/dist/jquery.min.js"></script>
   <!-- Bootstrap 3.3.7 -->
   <script src="../../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
   <!-- PACE -->
   <script src="../../bower_components/PACE/pace.min.js"></script>
   <!-- SlimScroll -->
   <script src="../../bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
   <!-- FastClick -->
   <script src="../../bower_components/fastclick/lib/fastclick.js"></script>
   <!-- AdminLTE App -->
   <script src="../../dist/js/adminlte.min.js"></script>
   <!-- AdminLTE for demo purposes -->
   <!-- <script src="../../dist/js/demo.js"></script> -->
   <!-- bootstrap datepicker -->
   <script src="../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>

   <script src="/ui/lib/custom/js/serverConfig.js"></script>
<!--     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script> -->
   <script src="/resources/crypt/sha.js"></script>
   <style>
	table {
       width: 100%;
       border: 1px solid black;
     }
     td {
       border: 1px solid black;
       font-size:14px;
       padding : 2px;
     }
     th {
       border: 1px solid black;
       font-size:16px;
       padding : 2px;
     }
     
     .minimal {
        margin-top : 4px;
        display:inline-block;
       width:14px;
       height:14px;
        
     }
     .label-span { 
     	color : #0043ff;
     }
   </style>
   <script type="text/javascript">
    </script>
</head>

<body class="hold-transition skin-blue sidebar-mini">
<div >
	<section class="content">
		<div class="box-body">
        	<div class="form-group" style="    background-color: #bed8ff;border-radius: 20px;padding: 10px;">
         		『Hi Smart Mobile』은 산업 활동 중인 작업자의 위치정보를 이용하여 작업자의 위급상황 시 관리자에게 위험사항을 전파 조치 하기 위한 안전 관리 시스템 입니다. 이런 산업 현장의 작업자 안전 관리를 의해서 위치 정보를 수집 합니다. 
			</div>
			<div style="float:left">
				<input type="checkbox" id="checkAll" class="minimal agree" />
				<label for = "checkAll"><span class="label-span">모두 동의 (3개 항목)</span></label>
			</div>
	        <br/>
	        <br/>
			<div class="form-group">
	            <label>
					<input type="checkbox" name="personalInfoYn" class="minimal agree" data = "Y"/>
					<span class="label-span">1. 개인정보의 수집 이용 동의 [필수]</span>
                </label>
	            <table style='border-spacing: 3px; width : 100%;'>
		            <colgroup>
		            	<col width='40%'/>
		                <col width='60%'/>
					</colgroup>
					<tr>
						<td>수집하는 기본개인정보 항목</td>
						<td>-필수정보 : 성명, 직무, 차량번호, 연락처, 주민등록 번호 앞에 7자리(생년월일, 내/외국인 표시용)</td>
					</tr>
					<tr>
						<td>개인정보의 수집 및 이용목적</td>
						<td>『Hi Smart Mobile』은 개인정보를 다음의 목적을 위해서만 활용되며 수집된 개인정보는 안전관리 이외의 목적으로는 이용되지 않습니다.
							<br/>-산업 활동 중인 작업자의 위급상황 시 관리자에게 위험사항 전파 조치
						</td>
					</tr>
					<tr>
						<td>개인정보의 보유 및 이용기간</td>
						<td>『Hi Smart Mobile』은 개인정보 수집 및 이용목적이 달성된 후에는 해당정보를 지체없이 파기합니다. 단, 필수정보에 대해서는 아래의 이유로 명시한 기간동안 보존합니다.
							<br/>-사고이력 관리 차원에서 현장 준공 후 3년 간 보존
						</td>
					</tr>
					<tr>
	                	<td>개인정보 제공 동의 거부 권리 및 동의 거부 따른 불이익 내용 또는 제한사항</td>
	                	<td>작업자는 상기내용 동의를 거부할 권리가 있으며, 동의 거부에 따라서 현장출입에 제한이 있을 수 있음을 알려드립니다.</td>	
					</tr>
	            </table>
            </div>
            <br/>
            <br/>
			<div class="form-group">
				<label> 
					<input type="checkbox" name="personalLocYn" class="minimal agree" data="Y">
					<span class="label-span">2. 개인위치정보의 수집 이용 동의 [필수]</span>
				</label>
				<table style='border-spacing: 3px; width: 100%;'>
					<colgroup>
						<col width='40%' />
						<col width='60%' />
					</colgroup>
					<tr>
						<td>수집하는 개인위치정보 항목
						</td>
						<td>-휴대폰 GPS 개인위치정보, GPS태그(Beacon)를 통한 개인위치정보</td>
					</tr>
					<tr>
						<td>개인위치정보의 수집 및 이용목적</td>
						<td>『Hi Smart Mobile』은 개인위치정보를 다음의 목적을 위해서만 활용되며 수집된 개인위치정보는 안전관리 이외의 목적으로는 이용되지 않습니다.<br/> -산업 활동 중인 작업자의 위급상황 시 관리자에게 위험사항 전파 조치
						</td>
					</tr>
					<tr>
						<td>개인위치정보의 보유 및 이용기간</td>
						<td>『Hi Smart Mobile』은 개인위치정보 수집 및 이용목적이 달성된 후에는 해당정보를 지체없이 파기합니다. 단, 개인위치정보에 대해서는 아래의 이유로 명시한 기간동안 보존합니다.<br/> -사고이력 관리 차원에서 현장 준공 후 3년 간 보존
						</td>
					</tr>
					<tr>
						<td>개인위치정보 제공 동의 거부 권리 및 동의 거부 따른 불이익 내용 또는 제한사항</td>
						<td>작업자는 상기내용 동의를 거부할 권리가 있으며, 동의 거부에 따라서 현장출입에 제한이 있을 수 있음을 알려드립니다.</td>
					</tr>
				</table>
				<br/>
				<div style="border : 1px solid gray; width : fit-content; padding : 2px; 4px;" onclick="detailToggle();">
					위치정보 제공 현황 자세히 보기 >
				</div>
				<br/>
				<table id="locInfoDetail" style='border-spacing: 3px; width: 100%; display:none'> 
					<colgroup>
						<col width='33%' />
						<col width='33%' />
						<col width='34%' />
					</colgroup>
					<tr>
						<th>제공받은 자</th>
						<th>제공하는 목적</th>
						<th>제공하는 개인정보 항목</th>
					</tr>
					<tr>
						<td>주식회사 메이사</td>
						<td>현위치정보제공</td>
						<td>현위치</td>
					</tr>
				</table>
			</div>
			<br/>
            <br/>
			<div class="form-group">
				<label>
					<input type="checkbox" name="personalSensYn" class="minimal agree" data = "Y"/>
					<span class="label-span">3. 민감정보 처리 동의 [필수]</span>
				</label>
				<br/>
				『Hi Smart Mobile』은 사상•신념, 노동조합•정당의 가입•탈퇴, 정치적 견해, 건강, 성생활 등에 관한 정보, 
				그 밖에 정보주체의 사생활을 현저히 침해할 우려가 있는 개인정보를 수집•처리하지 않습니다. 
				<br/>다만 안전관리를 위해 건강사항에 대하여 수집•처리하며 안전관리 이외의 목적으로는 이용되지 않습니다.
				<br/>
				<br/>
				<table style='border-spacing: 3px; width: 100%;'>
					<colgroup>
						<col width='40%' />
						<col width='60%' />
					</colgroup>
					<tr>
						<td>수집하는 민감정보 항목</td>
						<td>필수정보 : 체온, 혈액형, 혈압 <br/> 그외 : 가족사항, 의사소견서</td>
					</tr>
					<tr>
						<td>민감정보의 수집 및 이용목적</td>
						<td>
							『Hi Smart Mobile』은 민감정보를 다음의 목적을 위해서만 활용되며 수집된 민감정보는 안전관리 이외의 목적으로는 이용되지 않습니다.<br/> -산업 활동 중인 작업자의 건강정보 관리
						</td>
					</tr>
					<tr>
						<td>민감정보의 보유 및 이용기간</td>
						<td>
							『Hi Smart Mobile』은 민감정보 수집 및 이용목적이 달성된 후에는 해당정보를 지체없이 파기합니다. 단, 필수정보에 대해서는 아래의 이유로 명시한 기간동안 보존합니다.
							<br/> -사고이력 관리 차원에서 현장 준공 후 3년 간 보존
						</td>
					</tr>
					<tr>
						<td>민감정보 제공 동의 거부 권리 및 동의 거부 따른 불이익 내용 또는 제한사항</td>
						<td>작업자는 상기내용 동의를 거부할 권리가 있으며, 동의 거부에 따라서 현장출입에 제한이 있을 수 있음을 알려드립니다.</td>
					</tr>
				</table>
			</div>
		</div>
	</section>
	<form name="loginSuccess" id="loginSuccess" style="margin-bottom:0px;">
		<input type="hidden"  name="siteId" id="f_siteId">
     	<sec:csrfInput/>
	</form>   
</div>
<script>
$(document).ready(function(){
   
   
   $("#checkAll").click(function(){
      var chk = $(this).is(":checked");
      if(chk) $(".agree").prop("checked",true);
      else $(".agree").prop("checked",false); 
   })// end of click
});

function checkMobile(){
    
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
 
    if ( varUA.indexOf('android') > -1) {
        //안드로이드
        return "android";
    } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
        //IOS
        return "ios";
    } else {
        //아이폰, 안드로이드 외
        return "other";
    }
    
}


function checkAgreement(){
   var value;
   var personalInfoYn = $("input[name=personalInfoYn]:checked").attr("data");
   var personalLocYn = $("input[name=personalLocYn]:checked").attr("data");
   var personalSensYn = $("input[name=personalSensYn]:checked").attr("data");
   
   if(personalInfoYn == "Y" && personalLocYn == "Y" && personalSensYn == "Y"){
      value = "agree";
   }else {
      value = "deny";
   }
   console.log("value : "+ value);
   try{
      if(checkMobile()=="ios"){
         var message = { value: value};
         window.webkit.messageHandlers.setAgreement.postMessage(message);
      }else{
         window.LexaAgree.setAgreement(value);
      }
      if(value == "deny"){
         var messageStr = "";
         if(personalInfoYn != "Y"){
            messageStr='[개인정보의 수집 이용]는 필수 항목으로 동의를 하셔야 사용 할 수 있습니다.';
         }
         else if(personalLocYn != "Y"){
            messageStr='[개인위치정보의 수집 이용]는 필수 항목으로 동의를 하셔야 사용 할 수 있습니다.';
         }
         else if(personalSensYn != "Y"){
            messageStr='[민감정보 처리 동의]는 필수 항목으로 동의를 하셔야 사용 할 수 있습니다.';
         }
         
         if(checkMobile()=="ios"){
            var message = {  message: messageStr};
            window.webkit.messageHandlers.showMessage.postMessage(message);
         }else{
            window.LexaAgree.showMessage(messageStr);
         }
      }
      
   }catch(e){
      console.log(e);
   }
}

function detailToggle(){
	$("#locInfoDetail").toggle();
}
</script>
</body>
</html>