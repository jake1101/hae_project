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
			   //??????????????? ??????
		 	}
			
		 }
		function checkMobile(){
			 
		    var varUA = navigator.userAgent.toLowerCase(); //userAgent ??? ??????
		 
		    if ( varUA.indexOf('android') > -1) {
		        //???????????????
		        return "android";
		    } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
		        //IOS
		        return "ios";
		    } else {
		        //?????????, ??????????????? ???
		        return "other";
		    }
		    
		}
	
		$(document).ready(function(){
			// ?????? ????????? ?????? 	
			var checkIos = checkMobile();
			var key = '<%=request.getParameter("key")%>';	
			if(key && key !='null'){
				try{
					key=atob(key);
					var userToken = JSON.parse(key).token;
					var workerId = JSON.parse(key).workerId;
					//api??????
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
	// 			        			 window.LexaApp.showToast("??????????????? ???????????????. ????????? ???????????? ???????????? ????????????");
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
	// 							window.LexaApp.showToast("??????????????? ???????????????. ????????? ????????? ?????? ???????????? ??? ?????? ????????? ????????? ????????????. ");
					       	     $afterLoginFrm.submit();
					        }
			        	}
					});// end of ajax
					
				}catch(e){
					
				}
			}
			
			
			
			var userInputId = getCookie("userInputId");
		    $("#username").val(userInputId.toUpperCase()); 
		     
		    if(getCookie("userInputId")!=""){ // ??? ?????? ID??? ???????????? ?????? ????????? ?????? ???, ?????? ?????? ????????? ID??? ????????? ????????????,
		        $("#idSaveCheck").attr("checked", true); // ID ??????????????? ?????? ????????? ??????.
		    }
		     
		    $("#idSaveCheck").change(function(){ // ??????????????? ????????? ?????????,
		        if($("#idSaveCheck").is(":checked")){ // ID ???????????? ???????????? ???,
		            var userInputId = $("#username").val();
		            setCookie("userInputId", userInputId.toUpperCase(), 7); // 7??? ?????? ?????? ??????
		        }else{ // ID ???????????? ?????? ?????? ???,
		            deleteCookie("userInputId");
		        }
		    });
		     
		    // ID ??????????????? ????????? ???????????? ID??? ???????????? ??????, ?????? ?????? ?????? ??????.
		    $("#username").keyup(function(){ // ID ?????? ?????? ID??? ????????? ???,
		        if($("#idSaveCheck").is(":checked")){ // ID ??????????????? ????????? ????????????,
		            var userInputId = $("#username").val();
		            setCookie("userInputId", userInputId.toUpperCase(), 7); // 7??? ?????? ?????? ??????
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
									//?????? ?????????.
									// ???????????? ????????? siteArray ??? ???????????? ???????????? ??????????????????.
									// ???????????? ????????????
									// data.body ??? id, siteId??? ?????????????????? ??????????????????.
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
									
			        				var message2 ={message : "????????? ???????????????."};
			        				
	        						window.webkit.messageHandlers.showToast.postMessage(message2);
			    				}else{
									 window.LexaApp.setLoginInfo('worker',  data.body.id  , data.body.userToken , autoLogin);
				        			 window.LexaApp.showToast("????????? ???????????????.");
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
									var message ={message : "????????? ?????????????????????. ??????????????? ??????????????? ?????? ?????????."};
			        				
	        						window.webkit.messageHandlers.showToast.postMessage(message);
			        			}else{
			        				window.LexaApp.showToast("????????? ?????????????????????. ??????????????? ??????????????? ?????? ?????????.");
			        			}
			        		}catch(e) {
				        		alert("????????? ?????????????????????. ??????????????? ??????????????? ?????? ?????????.");
			        		}
			        	}
			        	
			        }
				});
				
			})// end of click
			
			$("#btn_sign_self").click(function(){
				var key = '<%=request.getParameter("key")%>';
				if(key == 'null'){
					try{
	        			 window.LexaApp.showToast("???????????? ????????? ????????????.");
	        		}catch(e) {
	        			alert("???????????? ????????? ????????????.")
	        		}
	        		return;
				}
				var $afterLoginFrm = $("#loginSuccess");
				try{
        			 window.LexaApp.showToast("???????????? ???????????? ???????????????.");
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
				// IOS ??? android ??? ????????? ????????? return ?????? ??? ????????? ??????.
				// OS 14.2 ?????? ??????????????? ???????????? ????????? ?????? ????????? ????????????  native ??????????????? javascript:runningService() ????????? ???????????? ????????? ?????????.  
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
			
			
			//usertoken ???????????? api
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
		            			// data.body ??? id, siteId??? ?????????????????? ??????????????????.
		            			if(checkIos == "ios"){
		            				var message = { type: 'worker', userId: event.target.getAttribute("value2") , userToken: usertoken ,autoLogin: autoLogin };

		            				window.webkit.messageHandlers.setLoginInfo.postMessage(message);
		        					
		            				
		            				var message2 ={message : "????????? ???????????????."};
		            				
		        					window.webkit.messageHandlers.showToast.postMessage(message2);
		        				}else{
		        					 window.LexaApp.setLoginInfo('worker',  event.target.getAttribute("value2")  , usertoken , autoLogin);
		                			 window.LexaApp.showToast("????????? ???????????????.");
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
			<img src="../img/logo_worker.png" alt="??????">
			<div class="work-login-title">????????? ?????????</div>
		</div>
		<!-- /.login-logo -->
		
		<div class="login-box-body">
			<form name="loginForm" action="mcheckUser.do" method="POST">
				<div class="form-group has-feedback">
					<input id="workerName" class="form-control-login" name="workerName"  modifier="underbar" placeholder="??????"></input>
				</div>
			
				<div class="form-group has-feedback">
					<input id="tag" type="tel" class="form-control-login" name="tag"  modifier="underbar" placeholder="????????????"></input>
				</div>
				
				<div class="form-group has-feedback">
					<input id="phoneNumber" type="tel" class="form-control-login" name="phoneNumber"  modifier="underbar" placeholder="????????????"></input>
				</div>
				
				<div class="form-group has-feedback" hidden="true">
					<input  type="checkbox" name="autoLoginCheck" id="autoLoginCheck" checked="checked"/> <label for="autoLoginCheck">???????????? ?????? ?????????</label>
				</div>
			</form>
			
			<p></p>
			<button class="btn btn-primary-blue btn-block btn-flat-login" id="btn_sign">?????????</button>
			<p></p>
			<button class="btn btn-login-w btn-block btn-flat-login" id="btn_back">??????</button>
			
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
  			<span style="color:red; width:100%;">Hi Smart?????? ??????????????? ???????????? ????????????.</span>
  		</div>
	</div>
	
	
	<div class="modal fade" id="modal-default">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">?????? ??????</h4>
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
