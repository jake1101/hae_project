 <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <!-- Left side column. contains the sidebar -->
 
<script src="../../js/mobileUtil/mobile_util.js"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-9BTXTWWWPG"></script>
<script>
	if("https://sc.hismart.co.kr"==window.location.origin){
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-9BTXTWWWPG');
	}
</script>
 	
 	
 <% String todo = request.getParameter("todo"); %>
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
	
	html, body {
       overflow-x:hidden;
       width:100%;
       margin: 0;
       padding: 0;
   }
	
 </style>
  <aside class="main-sidebar" style="   padding-top: 50px;">
    <!-- sidebar: style can be found in sidebar.less -->
     <section class="sidebar">
     <div class="user-panel">
        <div class="pull-left sidebar-form" style="width: 100% ;     margin: 8% 0px 0px 0px;">
		        <div style="width:100%" 
		        id="siteName" type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default">
	        	</div>
        </div>
        
      </div>
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree" style="overflow:scroll; ">
<!-- 		<li> -->
<!--           <a  href = "http://54.180.197.63/mobile/home.do"> -->
<!--             <div class="side_menu_00"></div><span>HOME</span> -->
<!--           </a> -->
<!--         </li> -->
        <li class="treeview">
          <a>
            <div  onclick="changeTo('registrationmax.do')" class="side_menu_01"></div><span>작업자 등록</span>
          </a>
          <ul class="treeview-menu">
            <li><a onclick="changeTo('registrationmax.do')"><i class="fa fa-circle-o"></i> 사전 작업자 등록</a></li>
            <li><a onclick="changeTo('registNoMapping.do')"><i class="fa fa-circle-o"></i> 작업자정보 추가 입력(T)</a></li>
          </ul>
        </li>
<!--         <li> -->
<!--           <a onclick="changeTo('vehicleRegistration.do')"> -->
<!--             <div class="side_menu_05"></div><span>이동장비 등록</span> -->
<!--           </a> -->
<!--         </li> -->
        <li>
          <a onclick="changeTo('smartTagSiteMapping.do')">
            <div class="side_menu_02"></div><span>태그 교부/회수(T)</span>
          </a>
        </li>
<!-- 		<li class="treeview"> -->
<!--           <a> -->
<!--             <div onclick="changeTo('pictureRegistTitle.do')" class="side_menu_03"></div><span>시공사진관리</span> -->
<!--           </a> -->
<!--           <ul class="treeview-menu"> -->
<!--             <li><a onclick="changeTo('pictureRegistTitle.do')"><i class="fa fa-circle-o"></i> 시공사진등록</a></li> -->
<!--             <li><a onclick="changeTo('pictureList.do')"><i class="fa fa-circle-o"></i> 시공사진목록</a></li> -->
<!--           </ul> -->
<!--         </li> -->
        <li class="treeview">
          <a>
            <div onclick="changeTo('mappingMobile.do')" class="side_menu_04"></div><span>태그 교부/회수(M)</span>
          </a>
          <ul class="treeview-menu">
            <li><a onclick="changeTo('mappingMobile.do')"><i class="fa fa-circle-o"></i> 태그 교부(M)</a></li>
            <li><a onclick="changeTo('returnMobile.do')"><i class="fa fa-circle-o"></i> 태그 회수(M)</a></li>
          </ul>
        </li>
        <li>
          <a onclick="changeTo('smartTagLocationState.do')">
            <div class="side_menu_05"></div><span>태그 위치 정보</span>
          </a>
        </li>
        <li class="treeview">
          <a >
            <div onclick="changeTo('workerSearch.do')" class="side_menu_06"></div><span>검색</span>
          </a>
          <ul class="treeview-menu">
            <li><a onclick="changeTo('workerSearch.do')"><i class="fa fa-circle-o"></i>작업자 검색 </a></li>
            <li><a onclick="changeTo('vehicleSearch.do')"><i class="fa fa-circle-o"></i>장비 검색 </a></li>
<!--             <li><a onclick="changeTo('findTag.do')"><i class="fa fa-circle-o"></i>교부 현황 </a></li> -->
          </ul>
        </li>
        <li>
          <a onclick="changeTo('ptwApprList.do')">
            <div class="side_menu_07"></div><span>작업허가제 승인</span>
          </a>
        </li>
         <li>
          <a onclick="changeTo('alarmHistory.do')">
            <div class="side_menu_08"></div><span>알림 현황</span>
          </a>
        </li>
        <li>
          <a onclick="changeTo('workStop.do')">
            <div class="side_menu_09"></div><span>메시지 전송</span>
          </a>
        </li>
        <li class="treeview">
          <a >
            <div onclick="changeTo('weatherInfo.do')" class="side_menu_10"></div><span>정보</span>
          </a>
          <ul class="treeview-menu">
            <li><a onclick="changeTo('weatherInfo.do')"><i class="fa fa-circle-o"></i> 기상정보</a></li>
            <li><a onclick="changeTo('evnSensor.do')"><i class="fa fa-circle-o"></i> 환경센서 정보</a></li>
            <li><a onclick="changeTo('noticeList.do')"><i class="fa fa-circle-o"></i> 공지사항</a></li>	 
			<li><a onclick="changeTo('policy.do')"><i class="fa fa-circle-o"></i> 개인정보처리방침</a></li>
          </ul>
        </li>
         <li>
          <a onclick="changeTo('cctv.do')">
            <div class="side_menu_11"></div><span>CCTV</span>
          </a>
        </li>
        <li>
          <a onclick="changeTo('moveSiteOrgList.do')">
            <div class="side_menu_12"></div><span>조직도</span>
          </a>
        </li>
         <li>
          <a onclick="changeTo('beaconMgnt.do')">
            <div class="side_menu_13"></div><span>비콘 관리</span>
          </a>
        </li>
        <li>
          <a onclick="logout()">
            <div class="side_menu_14"></div><span>로그아웃</span>
          </a>
        </li>
      </ul>
      <form id="current_form" name="current_form">
		<input type="hidden" id="type" name="type"/>
		<input type="hidden" id=f_siteId name="siteId"/>
	  </form>
	  
  	<form name="loginSuccess" id="loginSuccess">
  			<input type="hidden"  name="siteId" id="siteId">
  			<input type="hidden"  name="mLoginUser" id="mLoginUser">
  			<input type="hidden"  name="mUserToken" id="mUserToken">
  			<input type="hidden"  name="todo" id="todo">
  			<input type="hidden"  name="ptwReqId" id="ptwReqId">
  			<input type="hidden"  name="ptwMode" id="ptwMode">
  			<input type="hidden"  name="side_bar_type" id="side_bar_type">
				<sec:csrfInput/>
		</form>
    </section>
    <!-- /.sidebar -->
  </aside>
	<div class="modal fade" id="modal-default">
         <div class="modal-dialog">
           <div class="modal-content">
             <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span></button>
               <h4 class="modal-title">현장 목록</h4>
               <br>
               
				
				<div class="input-group">
		           	<span class="input-group-addon">운영사</span>
		          	<select id="companyId" class="form-control"  style="width: 100%;" onchange= "changeCompany()">
					</select>
		        </div>
             </div>
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
	<div class="modal fade" id="modal-message">
         <div class="modal-dialog">
           <div class="modal-content" style="height:97%;">
             <div class="modal-header" style="height:8%;">
               <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="width: 10%;">
                 <span aria-hidden="true">&times;</span></button>
               <h4 class="modal-title">Message List &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <button  onclick='messageAllDelete()' class='btn btn-default'>일괄 삭제</button></h4>
                
               <br>
             </div>
             <div class="modal-body" style="height:92%; overflow: scroll;">
            	<div id="messageArea" style="text-align: center;">
            	
            	</div>
             </div>
           </div>
           <!-- /.modal-content -->
         </div>
         <!-- /.modal-dialog -->
       </div>
       <!-- /.modal -->  
  
  <script>

    function checkMobile(){
	  	var result = mobileUtil.checkMobile();
	    return result;
	}
  
  
   function logout()
   {
	   try{
			if(checkMobile()=="ios"){
				var message = {  message: "로그아웃 하시겠습니까?" , tag : "logout" };
				window.webkit.messageHandlers.confirmMessage.postMessage(message);
			}else{
				window.LexaApp.confirmMessage("로그아웃 하시겠습니까?" , "logout");
			}
		}catch(e){
			var result = confirm("로그아웃 하시겠습니까?");
			if(result){
				returnConfirm(true , "logout");
			}else{
				return;
			}
		}
		
   } // checkConfirm  

   function changeTo(addr){
   	var frm = document.current_form;
   	frm.action = addr;
//    	$("#type").val('worker_regist');
   	frm.method = "get";
    	frm.submit();
   }
   
   function returnConfirm(result , tag){
	   if(result){
		   if(tag == "logout"){
			   logoutConfirm();
		   }else if (tag == "alarmDetailSave"){
			   alarmDetailSaveConfirm();
		   }else if(tag == "alarmHistoryDelete"){
			   var seq = 	selectedSeq;	
			   alarmHistoryDeleteConfirm(seq);
		   }else if(tag == "ptwDetailDelete"){
			   ptwDetailDeleteConfirm();
		   }else if(tag == "registMapping"){
			   registMappingConfirm();
		   }else if(tag == "registNoEnroll"){
			   registNoEnrollConfirm();
		   }else if(tag == "onEnter"){
			   onEnterConfirm();
		   }else if(tag == "ApiEnroll"){
			   ApiEnrollConfirm();
		   }else if(tag == "onSend"){
			   onSendConfirm();
		   }else if(tag == "onSaveBeacon"){
			   onSaveBeaconConfirm();
		   }else if(tag == "temp"){
			   doSave(true);
		   }else if(tag == "request"){
			   doSave(true);
		   }else if(tag == "approval"){
			   doSave(true);
		   }else if(tag == "return"){
			   doSave(true);
		   }else if(tag == "messageAllDelete"){
			   messageAllDeleteConfirm();
		   }else if(tag == "pictureResgist"){
			   window.location.href="/mobile/pictureRegistTitle.do";
		   }else if(tag == "pictureResgistReset"){
			   resetContent();
		   }
	   }else{
		   if(tag == "pictureResgistReset"){
			   window.location.href="/mobile/pictureRegistTitle.do";
		   }else{
			   return;
		   }
	   }
	   
   }
   
   function logoutConfirm(){
	   var loginForm = document.loginForm;
		
		var id = localStorage.loginUser;
		var userToken = localStorage.userToken;
		
		try{
			if(checkMobile()=="ios"){
				var message = {  userId: id, userToken: userToken};
				window.webkit.messageHandlers.setLogout.postMessage(message);
			}else{
				window.LexaApp.setLogout(id, userToken);
				localStorage.clear();
			}
		}catch(e) {
			$.ajax({
				type:'get',
				url : conf.raycomApiUrl+"users/logout",
		        dataType: "json",
		        timeout: 3000,
		        beforeSend : function(xhr){
		            xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		            xhr.setRequestHeader("userToken",userToken);
		        },
		        success: function(data) {  
		        	location.href="/mobile/logout.do";
		        }
			});// end of ajax
		}
		
	   
   }
   	
   $(document).ready(function () {
     $('.sidebar-menu').tree();
     
     var param={};
     var siteId = localStorage.siteId;
     findSiteName(siteId);
     
     
     findCompanyList(param);
     
     makeMessage();
	 
     getMessageCnt();
     setInterval(function(){
	     getMessageCnt();
     },60000);
     
     if("<%=todo%>" == "openMessageList"){
    	 openMsgModal();// 
    	 $('#modal-message').modal();
     }
     
   });
   
   
   function makeMessage(){
	   var html = "<li><a onclick='openMsgModal()'  data-toggle='modal' data-target='#modal-message'  ><i class='fa fa-envelope'></i>"
	   				+"<span id='messageCnt' class='label label-warning'></span></a><li>";
       $('.navbar-nav').prepend(html);
   };
   
   function getMessageCnt(){
	   var successCallback = function(data){
		   if(data.body == 0){
				$('#messageCnt').html("");
			}else{
				$('#messageCnt').html(data.body);
			}
	    }
		var param = {};
	    param.siteId= localStorage.siteId;
		mobileUtil.callApi(conf.raycomApiUrl+"alarm/push/count",param,'post', successCallback);
   }
   
   var siteName;
   function findSiteName(param){
	   var successCallback = function(data){
		  localStorage.sitePinPoint = JSON.stringify(data.body.pinPoint);
		   $("#siteName").html(data.body.name);
			siteName=data.body.name;
	   }
		mobileUtil.callApi(conf.raycomApiUrl+"site/"+param,{},'post', successCallback);
   };
   function findCompanyList(param){
	   var successCallback = function(data){
		   var resultList = data.body;
				for(var i = 0 ; i < resultList.length ; i++){
		             $('#companyId').append( $("<option>"+resultList[i].name+"</option>"));
	          		 $("#companyId option:eq(0)").attr("selected", "selected");
		             $("#companyId option:eq("+(i)+")").attr("company_name",resultList[i].name);
		             $("#companyId option:eq("+(i)+")").attr("value",resultList[i].id);
				}
				changeCompany();
	   }
		mobileUtil.callApi(conf.raycomApiUrl+"company/list",param,'post', successCallback);
	}
   
   function changeCompany(){
	   var param={};
	   param.companyId = $("#companyId").val();
	   findSiteList(param);
   }
   
   
   function findSiteList(param){
	   var successCallback = function(data){
		   var resultList = data.body;
			var html= '';
			for(var i = 0 ; i < resultList.length ; i++){
				html += "<div class='siteStyle' id="+resultList[i].id+" onclick='changeSite(event)' data-dismiss='modal'>";
				html += resultList[i].name+ "</div>"
				}
				
			$("#siteArea").html(html);
	   }
	   mobileUtil.callApi(conf.raycomApiUrl+"site/list",param,'post', successCallback);
	}
   
   function changeSite(e){
	   
	   var companyName = $("#companyId option:selected").attr("company_name");
	   $("#companyName").val(companyName);
	   $("#siteName").val(e.target.innerText);
	   
	    localStorage.siteId=e.target.id;
	    
		var $afterLoginFrm = $("#current_form");
	    $afterLoginFrm.attr('action', '/mobile/mLoginSuccess.do');
// 	    $afterLoginFrm.attr('action', window.location.pathname);
	    $afterLoginFrm.attr('method', 'post');
	    $afterLoginFrm.submit();
   }
   var messageList;
   function openMsgModal(){
	   var successCallback = function(data){
		   var resultList = data.body;
		   messageList = resultList;
		   
			var html= '';
			if(resultList){
				for(var i = 0 ; i < resultList.length ; i++){
					var sendDt = resultList[i].sendDt; 
					var dt = new Date(sendDt);
					html +=
					"<div onclick='openYn("+i+")' style='width:100%; font-size:16px; padding:3px; font-weight:bold; color:black; text-align:left;'>"
					+"<table class='table table-bordered' style='border-spacing: 3px; width : 100%;'>"
					+"<colgroup>"
					+"<col width='30%'/>"
					+"<col width='70%'/>"
					+"</colgroup>"
					+"<tr style='margin-bottom:-2px;'><th style='text-align:center; background:#f9e9e6; padding-left:0;'>제목</th><td style='text-align:center; background:#fff; padding-left:0;'>"+ resultList[i].title+"</td></tr>"
					+"<tr style='margin-bottom:-2px;'><th style='text-align:center; background:#f9e9e6; padding-left:0;'>수신시간</th><td style='text-align:center; background:#fff; padding-left:0;'>"+date_to_str(dt)+"</td></tr>"
					+"<tr style='display:none; margin-bottom:-2px;' class='openYN"+i+"'><th style='text-align:center; vertical-align:middle; background:#f9e9e6; padding-left:0;'>내용</th><td style='text-align:center; background:#fff; padding-left:0;'>"+(resultList[i].content ?  resultList[i].content : '')+"</td></tr>"
					+"<tr style='display:none; margin-bottom:-2px;' class='openYN"+i+"'><td colspan='2' style='text-align:center; background:#fff; padding-left:0;'><button onclick='onRead("+resultList[i].seq+")' class='btn btn-default'>읽음</button></td></tr>"
					+"</table></div>";
					
				}
			}
			$("#messageArea").html(html);
	   }
	   var param={};
	   param.siteId = localStorage.siteId;
	   mobileUtil.callApi(conf.raycomApiUrl+"alarm/push/list",param,'post', successCallback);
   }
   
   function messageAllDelete(){
	   try{
			if(checkMobile()=="ios"){
				var message = {  message: "최근 30개 메세지를 일괄 삭제 하시겠습니까?" , tag : "messageAllDelete" };
				window.webkit.messageHandlers.confirmMessage.postMessage(message);
			}else{
				window.LexaApp.confirmMessage("최근 30개 메세지를 일괄 삭제 하시겠습니까?" , "messageAllDelete");
			}
		}catch(e){
			var result = confirm("최근 30개 메세지를 일괄 삭제 하시겠습니까?");
			if(result){
				returnConfirm(true , "messageAllDelete");
			}else{
				return;
			}
		}
   }
   
   function messageAllDeleteConfirm(){
	   var successCallback = function(data){
		   openMsgModal();
  		   getMessageCnt();
	   }
	   var paramArr=[];
	   if(messageList){
		   for(var i = 0 ; i< messageList.length; i ++){
			   var param = {};
			   param.siteId = messageList[i].siteId;
			   param.seq =  messageList[i].seq;
			   param.property={};
			   param.property.hiddenFlag="Y";
			   
			   paramArr.push(param);
		   }
		   mobileUtil.callApi(conf.raycomApiUrl+"alarm/push/read/array",paramArr,'post', successCallback);
	   }
   }
   
   function date_to_str(format)
   {

       var year = format.getFullYear();

       var month = format.getMonth() + 1;

       if(month<10) month = '0' + month;

       var date = format.getDate();

       if(date<10) date = '0' + date;

       var hour = format.getHours();

       if(hour<10) hour = '0' + hour;

       var min = format.getMinutes();

       if(min<10) min = '0' + min;

       var sec = format.getSeconds();

       if(sec<10) sec = '0' + sec;

       return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;

   }

   function openYn(param){
	   if($('.openYN'+param).is(":hidden")){
	   	 	$('.openYN'+param).show(400);
	   }else{
		    $('.openYN'+param).hide(400);
	   }
   }
   function onRead(seq){
	   var successCallback = function(data){
		   openMsgModal();
  		   getMessageCnt();
	   }
	   var param={};
	   param.siteId = localStorage.siteId;
	   param.seq = seq;
	   param.property={};
	   param.property.hiddenFlag="Y";
	   mobileUtil.callApi(conf.raycomApiUrl+"alarm/push/read",param,'post', successCallback);
	  
   }
   
   
   function nativeBack() {
		if($("#modal-message").hasClass("in") === true) {
			 $('#modal-message').modal("hide");	
			 return;
		}
		if($("#modal-button").hasClass("in") === true) {
			 $('#modal-button').modal("hide");	
			 return;
		}
		if(onBack){
			onBack();
		}
	}
   
   
   function landingPage(targetPageAlias,siteId,userId,token,key) {
	   if(targetPageAlias == "alarmList"){
		   var $afterLoginFrm = $("#loginSuccess");
	 	     $afterLoginFrm.attr('action', '/mobile/alarmHistory.do');
	 	     $afterLoginFrm.attr('method', 'get');
	 	     $afterLoginFrm.submit();
	   }else if(targetPageAlias == "messageList"){
		   var $afterLoginFrm = $("#loginSuccess");
		     $afterLoginFrm.attr('action', '/mobile/alarmHistory.do');
		     $afterLoginFrm.attr('method', 'get');
		     $("#todo").val("openMessageList");
		     $afterLoginFrm.submit();
	   }else if(targetPageAlias == "ptwRequest"){
		   var $afterLoginFrm = $("#loginSuccess");
		     $afterLoginFrm.attr('action', '/mobile/movePtwDetail.do');
		     $afterLoginFrm.attr('method', 'POST');
				 $("#side_bar_type").val("max");
		     $("#ptwReqId").val(key);
		     $("#ptwMode").val("approval");
		     $afterLoginFrm.submit();
		   //작업허가제 이동
	   }
	 }
	     
  </script>