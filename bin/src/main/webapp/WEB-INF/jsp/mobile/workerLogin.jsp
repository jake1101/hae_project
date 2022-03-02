<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<!-- Bootstrap 3.3.7 -->
	<link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css">
	<!-- Font Awesome -->
	<link rel="stylesheet" href="../../bower_components/font-awesome/css/font-awesome.min.css">
	<!-- Ionicons -->
	<link rel="stylesheet" href="../../bower_components/Ionicons/css/ionicons.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="../../dist/css/AdminLTE.min.css">
	
	<!-- jQuery 3 -->
	<script src="../../bower_components/jquery/dist/jquery.min.js"></script>
	<script src="/ui/lib/custom/js/serverConfig.js"></script>
	<script src="/resources/crypt/sha.js"></script>
	<script src="../../dist/js/adminlte.min.js"></script>
	<script src="../../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	
	<style>
	.siteStyle {
		width: 100%;
	    text-align: center;
	    margin: 5px auto;
	    color: white;
	    background-color: #b4b4b5;
	    font-size: 20px;
	    padding-top: 5px;
	    padding-bottom: 5px;
	    cursor: pointer;
   		border-radius: 6px 6px 6px 6px;
	}
 </style>
	<script type="text/javascript">

		function runningService(bool){
			if(bool=='Y'){
				$("#runningService").show();
			}else{
				$("#runningService").hide();
			}
		}
	
		function landingPage(targetPageAlias,siteId,userId,token,key) {
		  if(targetPageAlias == "messageList"){
			   var $afterLoginFrm = $("#loginSuccess");
			     $afterLoginFrm.attr('action', '/mobile/registMappingmin.do');
			     $afterLoginFrm.attr('method', 'get');
			     $("#todo").val("openMessageList"); 
			     $afterLoginFrm.submit();
		   }else if(targetPageAlias == "ptwResponse"){
			   var $afterLoginFrm = $("#loginSuccess");
			     $afterLoginFrm.attr('action', '/mobile/movePtwDetail.do');
			     $afterLoginFrm.attr('method', 'POST');
				 $("#side_bar_type").val("min");
			     $("#ptwReqId").val(key);
			     $afterLoginFrm.submit();
			   //작업허가제 이동
		 	}
			
		 }
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
	
		$(document).ready(function(){
			// 자동 로그인 처리 	
			var checkIos = checkMobile();
			var key = '<%=request.getParameter("key")%>';	
			if(key && key !='null'){
				try{
					key=atob(key);
					var userToken = JSON.parse(key).token;
					var workerId = JSON.parse(key).workerId;
					//api호출
					$.ajax({
						type:'get',
						url : conf.raycomApiUrl+"users/loginbytoken",
				        data : null,
				        dataType: "json",
				        timeout: 3000,
				        beforeSend : function(xhr){
				            xhr.setRequestHeader("userToken",userToken);
				        },
				        success: function(data) {  
				        	if(data.header.code ==1){
				        		try{
					        		if(checkIos == "ios"){
				        				var message = { type: 'worker', userId: workerId, userToken: userToken ,autoLogin: true };
	
				        				window.webkit.messageHandlers.setLoginInfo.postMessage(message);
				    				}else{
					        		
				        			window.LexaApp.setLoginInfo('worker', workerId, userToken, true);
	// 			        			 window.LexaApp.showToast("자동로그인 되었습니다. 해제를 원하시면 로그아웃 해주세요");
				    				}
				        		}catch(e) {
				        			//console.log(e)
				        		}
					        	var $afterLoginFrm = $("#loginSuccess");
					       	     $afterLoginFrm.attr('action', '/mobile/registMappingmin.do');
					       	     $afterLoginFrm.attr('method', 'get');
	// 				       	     $("#mLoginUser").val(workerId);
	// 				       	     $("#mUserToken").val(userToken);
	// 			        	     localStorage.userToken=userToken;
				        	     localStorage.loginUser=workerId;
	// 							window.LexaApp.showToast("자동로그인 되었습니다. 해제를 원하실 경우 로그아웃 후 다시 로그인 하시기 바랍니다. ");
					       	     $afterLoginFrm.submit();
					        }
			        	}
					});// end of ajax
					
				}catch(e){
					
				}
			}
			
			
			
			var userInputId = getCookie("userInputId");
		    $("#username").val(userInputId.toUpperCase()); 
		     
		    if(getCookie("userInputId")!=""){ // 그 전에 ID를 저장해서 처음 페이지 로딩 시, 입력 칸에 저장된 ID가 표시된 상태라면,
		        $("#idSaveCheck").attr("checked", true); // ID 저장하기를 체크 상태로 두기.
		    }
		     
		    $("#idSaveCheck").change(function(){ // 체크박스에 변화가 있다면,
		        if($("#idSaveCheck").is(":checked")){ // ID 저장하기 체크했을 때,
		            var userInputId = $("#username").val();
		            setCookie("userInputId", userInputId.toUpperCase(), 7); // 7일 동안 쿠키 보관
		        }else{ // ID 저장하기 체크 해제 시,
		            deleteCookie("userInputId");
		        }
		    });
		     
		    // ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
		    $("#username").keyup(function(){ // ID 입력 칸에 ID를 입력할 때,
		        if($("#idSaveCheck").is(":checked")){ // ID 저장하기를 체크한 상태라면,
		            var userInputId = $("#username").val();
		            setCookie("userInputId", userInputId.toUpperCase(), 7); // 7일 동안 쿠키 보관
		        }
		    });
			
			
			$("#btn_sign").click(function(){
				var loginForm = document.loginForm;
				
				var autoLogin = $("#autoLoginCheck").is(":checked");
				 
        		
        		var $afterLoginFrm = $("#loginSuccess");
	       	    
				var param = { "name" : loginForm.workerName.value ,"tag" : loginForm.tag.value , "phoneNumber" : loginForm.phoneNumber.value};
				var checkIos = checkMobile();
				$.ajax({
					type:'post',
					url : conf.raycomApiUrl+"users/worker/login",
			        data : JSON.stringify(param),
			        dataType: "json",
			        
			        beforeSend : function(xhr){
			            xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
			        },
			        success: function(data) {  
			        	if(data.header.code == 1){
			        		var autoLogin = $("#autoLoginCheck").is(":checked");
			        		try{
			        			console.log(data.body);
			        			
			        			if(data.body&& data.body.siteArray && data.body.siteArray.length>1){
									//모달 만든다.
									// 모달안에 내용은 siteArray 의 현장들을 리스트로 뿌려주면된다.
									// 모달에서 선택하면
									// data.body 의 id, siteId를 선택한것으로 바꿔주면된다.
									var html= '';
			        				for(var i = 0 ; i < data.body.siteArray.length ; i++){
			        					html += "<div class='siteStyle' value1="+data.body.siteArray[i].siteId+" value2="+data.body.siteArray[i].workerId +" data='"+JSON.stringify(data.body)+"' onclick='changeSite(event)' data-dismiss='modal'>";
			        					html += data.body.siteArray[i].siteName+ "</div>"
			        					}
			        					
			        				$("#siteArea").html(html);
			        				
			        				$('#modal-default').modal();	
			        				return;
			        			}
			        			
			        			
			        			
			        			if(checkIos == "ios"){
			        				var message = { type: 'worker', userId: data.body.id , userToken: data.body.userToken ,autoLogin: autoLogin };

			        				window.webkit.messageHandlers.setLoginInfo.postMessage(message);
									
			        				var message2 ={message : "로그인 되었습니다."};
			        				
	        						window.webkit.messageHandlers.showToast.postMessage(message2);
			    				}else{
									 window.LexaApp.setLoginInfo('worker',  data.body.id  , data.body.userToken , autoLogin);
				        			 window.LexaApp.showToast("로그인 되었습니다.");
			    				}
			        			 
			        			 $afterLoginFrm.attr('action', '/mobile/registMappingmin.do');
			    	       	     $afterLoginFrm.attr('method', 'get');
				        	     localStorage.tag=loginForm.tag.value;
				        	     localStorage.leaderYn=data.body.leaderYn;
				        	     localStorage.userToken=data.body.userToken;
				        	     localStorage.loginUser=data.body.id;
				        	     localStorage.siteId=data.body.siteId;
			    	       	     $afterLoginFrm.submit();
			        		}catch(e) {
 			        			 $afterLoginFrm.attr('action', '/mobile/registMappingmin.do');
			    	       	     $afterLoginFrm.attr('method', 'get');
// 			    	       	     $("#mLoginUser").val(data.body.id);
// 			    	       	     var key = {"siteId" : data.body.siteId, "vendorId":data.body.vendorId};
// 			    	       	     $("#key").val(btoa(JSON.stringify(key)));
// 			    	       	     $("#type").val("worker_regist");
								 localStorage.tag=loginForm.tag.value;
				        	     localStorage.leaderYn=data.body.leaderYn;
			    	       	 	 localStorage.userToken=data.body.userToken;
				        	     localStorage.loginUser=data.body.id;
				        	     localStorage.siteId=data.body.siteId;
			    	       	    $afterLoginFrm.submit();
			        			console.log(e)
			        		}
		        			
							
			        	}else{
			        		try{
			        			if(checkIos == "ios"){
									var message ={message : "로그인 실패하였습니다. 인증번호는 관리자에게 문의 하세요."};
			        				
	        						window.webkit.messageHandlers.showToast.postMessage(message);
			        			}else{
			        				window.LexaApp.showToast("로그인 실패하였습니다. 인증번호는 관리자에게 문의 하세요.");
			        			}
			        		}catch(e) {
				        		alert("로그인 실패하였습니다. 인증번호는 관리자에게 문의 하세요.");
			        		}
			        	}
			        	
			        }
				});
				
			})// end of click
			
			$("#btn_sign_self").click(function(){
				var key = '<%=request.getParameter("key")%>';
				if(key == 'null'){
					try{
	        			 window.LexaApp.showToast("정상적인 방법이 아닙니다.");
	        		}catch(e) {
	        			alert("정상적인 방법이 아닙니다.")
	        		}
	        		return;
				}
				var $afterLoginFrm = $("#loginSuccess");
				try{
        			 window.LexaApp.showToast("자가등록 화면으로 이동합니다.");
        		}catch(e) {
        			
        		}
        			 $afterLoginFrm.attr('action', '/mobile/registration.do');
    	       	     $afterLoginFrm.attr('method', 'get');
    	       	  	 $("#type").val("worker_regist");
    	       	  	 $("#key").val(key);
    	       	     $afterLoginFrm.submit();
			})// end of click
			
			
			$("#btn_back").click(function(){
				window.location.href="/mobile/home.do";
				
			})// end of click
			
			if(checkIos == "android"){
				var running = window.LexaApp.runningService();
				if(running){
					runningService('Y');
				}else{
					runningService('N');
				}
			}
			else if (checkIos == "ios"){
				// 2021-04-11 YSHONG
				// IOS 는 android 와 다르게 위처럼 return 받을 수 없다고 한다.
				// OS 14.2 버전 이후부터만 가능하며 따라서 아래 함수를 호출하면  native 소스안에서 javascript:runningService() 함수를 호출하는 방식을 택했다.  
				window.webkit.messageHandlers.runningService.postMessage();
			}
			
		})// end of ready
		
		function hexToBase64(str) {
		  return btoa(String.fromCharCode.apply(null,
		    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
		  );
		}
		
		function base64ToHex(str) {
		  for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
		    var tmp = bin.charCodeAt(i).toString(16);
		    if (tmp.length === 1) tmp = "0" + tmp;
		    hex[hex.length] = tmp;
		  }
		  return hex.join(" ");
		}
		
		function setCookie(cookieName, value, exdays){
		    var exdate = new Date();
		    exdate.setDate(exdate.getDate() + exdays);
		    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
		    document.cookie = cookieName + "=" + cookieValue;
		}
		 
		function deleteCookie(cookieName){
		    var expireDate = new Date();
		    expireDate.setDate(expireDate.getDate() - 1);
		    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
		}
		 
		function getCookie(cookieName) {
		    cookieName = cookieName + '=';
		    var cookieData = document.cookie;
		    var start = cookieData.indexOf(cookieName);
		    var cookieValue = '';
		    if(start != -1){
		        start += cookieName.length;
		        var end = cookieData.indexOf(';', start);
		        if(end == -1)end = cookieData.length;
		        cookieValue = cookieData.substring(start, end);
		    }
		    return unescape(cookieValue);
		}
		

		function changeSite(event){
			console.log(event);
			var data = {};
			data.body = JSON.parse(event.target.getAttribute("data"));

			var autoLogin = $("#autoLoginCheck").is(":checked");
			var $afterLoginFrm = $("#loginSuccess");
			var checkIos = checkMobile();
			
   	     	var siteId=event.target.getAttribute("value1");
			var workerId=event.target.getAttribute("value2");
			
			
			//usertoken 받아오는 api
			$.ajax({
				type:'post',
				url : conf.raycomApiUrl+"users/loginbytoken/parallel",
		        data : JSON.stringify({"siteId" : siteId ,"workerId" : workerId}),
		        dataType: "json",
		        timeout: 3000,
		        beforeSend : function(xhr){
		            xhr.setRequestHeader("userToken",data.body.userToken);
		            xhr.setRequestHeader("Content-Type","application/json");
		        },
		        success: function(data) {  
		        	if(data.header.code ==1){
		        		try{
		        			var usertoken = data.body.userToken;
		        			try{
		            			// data.body 의 id, siteId를 선택한것으로 바꿔주면된다.
		            			if(checkIos == "ios"){
		            				var message = { type: 'worker', userId: event.target.getAttribute("value2") , userToken: usertoken ,autoLogin: autoLogin };

		            				window.webkit.messageHandlers.setLoginInfo.postMessage(message);
		        					
		            				
		            				var message2 ={message : "로그인 되었습니다."};
		            				
		        					window.webkit.messageHandlers.showToast.postMessage(message2);
		        				}else{
		        					 window.LexaApp.setLoginInfo('worker',  event.target.getAttribute("value2")  , usertoken , autoLogin);
		                			 window.LexaApp.showToast("로그인 되었습니다.");
		        				}
		            			 
		            			 $afterLoginFrm.attr('action', '/mobile/registMappingmin.do');
		        	       	     $afterLoginFrm.attr('method', 'get');
		                	     localStorage.tag=loginForm.tag.value;
		                	     localStorage.leaderYn=data.body.leaderYn;
		                	     localStorage.userToken=usertoken;
		                	     localStorage.loginUser=event.target.getAttribute("value2");
		                	     localStorage.siteId=event.target.getAttribute("value1");
		        	       	     $afterLoginFrm.submit();
		            		}catch(e) {
		             			 $afterLoginFrm.attr('action', '/mobile/registMappingmin.do');
		        	       	     $afterLoginFrm.attr('method', 'get');
//		         	       	     var key = {"siteId" : event.target.getAttribute("value1") , "vendorId":data.body.vendorId};
//		         	       	     $("#key").val(btoa(JSON.stringify(key)));
//		         	       	     $("#type").val("worker_regist");
		        				 localStorage.tag=loginForm.tag.value;
		                	     localStorage.leaderYn=data.body.leaderYn;
		        	       	 	localStorage.userToken=usertoken;
		                	     localStorage.loginUser=event.target.getAttribute("value2");
		                	     localStorage.siteId=event.target.getAttribute("value1");
		        	       	    $afterLoginFrm.submit();
		            			console.log(e)
		            		}
		        		}catch(e) {
		        			console.log(e)
		        		}
			        }
	        	}
			});// end of ajax
			
		}
		
		
	</script>
</head>

<body class="hold-transition login-page">
	<div class="login-box">
		<div class="login-worker">
			<img src="../img/logo_worker.png" alt="로고">
			<div class="work-login-title">작업자 로그인</div>
		</div>
		<!-- /.login-logo -->
		
		<div class="login-box-body">
			<form name="loginForm" action="mcheckUser.do" method="POST">
				<div class="form-group has-feedback">
					<input id="workerName" class="form-control-login" name="workerName"  modifier="underbar" placeholder="이름"></input>
				</div>
			
				<div class="form-group has-feedback">
					<input id="tag" type="tel" class="form-control-login" name="tag"  modifier="underbar" placeholder="고유번호"></input>
				</div>
				
				<div class="form-group has-feedback">
					<input id="phoneNumber" type="tel" class="form-control-login" name="phoneNumber"  modifier="underbar" placeholder="전화번호"></input>
				</div>
				
				<div class="form-group has-feedback" hidden="true">
					<input  type="checkbox" name="autoLoginCheck" id="autoLoginCheck" checked="checked"/> <label for="autoLoginCheck">다음부터 자동 로그인</label>
				</div>
			</form>
			
			<p></p>
			<button class="btn btn-primary-blue btn-block btn-flat-login" id="btn_sign">로그인</button>
			<p></p>
			<button class="btn btn-login-w btn-block btn-flat-login" id="btn_back">뒤로</button>
			
			<form name="loginSuccess" id="loginSuccess">
				<input type="hidden"  name="mLoginUser" id="mLoginUser">
				<input type="hidden"  name="siteId" id="siteId">
				<input type="hidden"  name="mUserToken" id="mUserToken">
				<input type="hidden"  name="type" id="type">
				<input type="hidden"  name="key" id="key">
				<input type="hidden"  name="tag" id="f_tag">
				<input type="hidden"  name="leaderYn" id="leaderYn">
				<input type="hidden"  name="todo" id="todo">
				<input type="hidden"  name="ptwReqId" id="ptwReqId">
				<input type="hidden"  name="side_bar_type" id="side_bar_type">
				<sec:csrfInput/>
			</form>
		</div>
		<div id="runningService" style="display:none; margin:auto; margin-top:20px; text-align: center;">
  			<span style="color:red; width:100%;">Hi Smart에서 위치정보를 수집하는 중입니다.</span>
  		</div>
	</div>
	
	
	<div class="modal fade" id="modal-default">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">현장 목록</h4>
              <br>
            <div class="modal-body">
           	<div id="siteArea" style="text-align: center;">
           	
           	</div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->  
</body>

</html>
