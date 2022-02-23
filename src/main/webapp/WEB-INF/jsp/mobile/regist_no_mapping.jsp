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
	
	<sec:csrfMetaTags/>
<!-- 	<script type="text/javascript" src="/js/main/mobile.js"></script> -->
	
	
	<title>Home</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--   	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"> -->
	

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

	<script src="/ui/lib/custom/js/serverConfig.js"></script>
<!--  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script> -->
	<script src="/resources/crypt/sha.js"></script>
		<link rel="stylesheet" href="../../css/tablet.css">
	<style>
	@media only screen and (max-width: 760px){				
	td:nth-of-type(1):before { content: "No."; color:#f9836d; background-color: #fdf0ed; width: 90px;}
	td:nth-of-type(2):before { content: "작업자 이름"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
	td:nth-of-type(3):before { content: "협력사"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
    td:nth-of-type(4):before { content: "직종"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
    td:nth-of-type(5):before { content: "생년월일"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
    td:nth-of-type(6):before { content: "휴대폰번호"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
    td:nth-of-type(7):before { content: "신청일자"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
    td:nth-of-type(8):before { content: "추가입력"; color:#f9836d; background-color: #fdf0ed;width: 90px;}	
		.selectedRow {
		   background-color: #58c6e8;
		}
	</style>
	<script type="text/javascript">
	</script>
</head>

<body class="hold-transition skin-blue sidebar-collapse sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper" style="max-height:100%">

  <header class="main-header">
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      </a>
      <a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 3px;
   			 font-family: fontAwesome; color:white">
        	 작업자정보 추가 입력
      </a>
      
<!-- 	  <a class="sidebar-toggle"></a> -->
	  
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
<!--           <li> -->
<!--             <a onclick="checkConfirm()" data-toggle="control-sidebar"><i class="fa fa-sign-out"></i></a> -->
<!--           </li> -->
          <form id="logoutFormMobile" action="<c:url value="/logoutProcess.do" />" method="POST" hidden>
			<sec:csrfInput/>
		  </form>
        </ul>
      </div>
    </nav>
  </header>

  <!-- =============================================== -->

<%@ include file="/WEB-INF/jsp/mobile/sidebar.jsp" %>

  <!-- =============================================== -->

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">

    <!-- Main content -->
    <section class="content">
     	<!-- Default box -->
        <div class="box-body" >
         <div class="box box-info">
         	<h2 class="tt_8">사전 등록 작업자 검색</h2>
        	<div id="worker_area" class="form-group">
				<div class="input_frame">
                 <div class="container-1">
                    <button type="submit" name="search" id="search-btn" class="icon"><i class="fa fa-search" onclick="start()"></i></button>
                    <input type="search" id="search" placeholder="검색" />
                 </div>
                </div>
				<div style="height: 80px;"></div>
		        <table class="table table-bordered" id="temp_worker_table" style="width : 100%;">
                    <colgroup>

                    <col width="4%"/>
                    <col width="10%"/>
                    <col width="16%"/>
                    <col width="16%"/>
                    <col width="14%"/>
                    <col width="16%"/>
                    <col width="14%"/>
					<col width="*"/>
                    </colgroup>
		        <thead>
		        <tr>
                  <th>No.</th>
                  <th>작업자 이름</th>
                  <th>협력사</th>
                  <th>직종</th>
                  <th>생년월일</th>
                  <th>휴대폰 번호</th>
                  <th>신청일자</th>
                  <th></th>
		        </tr>
		        </thead>
		        <tbody id="temp_worker_tbody">
		        
		        </tbody>
		        </table>
			</div>
			
        	
         </div>
         
		</div>
		<!-- /.box-body -->
		
		<div style="text-align:center">
                <button type="button" class="btn btn-back w130 mr5" id="back" onclick="onBack()">뒤로</button>
                <button type="button" id="new" class="btn btn-new w130">신규등록</button>
        </div>
		
<!--        	 <button type="button" id="next" class="btn btn-default btn-info">추가입력</button> -->
       	</div>
	   </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <div class="control-sidebar-bg"></div>
  
  
   <form name="loginSuccess" id="loginSuccess">
  	  <input type="hidden"  name="siteId" id="f_siteId">
	  <sec:csrfInput/>
  </form>	
   <form name="selectedSuccess" id="selectedSuccess">
  	  <input type="hidden"  name="worker_id" id="f_worker_id">
  	  <input type="hidden"  name="worker_name" id="f_worker_name">
  	  <input type="hidden"  name="birth_dt" id="f_birth_dt">
  	  <input type="hidden"  name="phone_number" id="f_phone_number">
  	  <input type="hidden"  name="vendor_id" id="f_vendor_id">
  	  <input type="hidden"  name="jobtype_id" id="f_jobtype_id">
	  <sec:csrfInput/>
  </form>	
</div>

<footer class="footer_wrap">
  Copyright &copy; (주)한라.All rights reserved.
</footer>
<!-- ./wrapper -->

<script>

// $(document).ajaxStart(function () {
//    Pace.restart()
//  })




function getDisplayInfo() {

	var size = {

	  width: window.innerWidth || document.body.clientWidth,

	  height: window.innerHeight || document.body.clientHeight

	}
	
	if(size.width < 768 || size.height <500){
		try{
			
			if(checkMobile()=="ios"){
				var message = {  message: "해당 메뉴는 태블릿 가로모드에서 확인 가능합니다." };
				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
				window.LexaApp.showToast("해당 메뉴는 태블릿 가로모드에서 확인 가능합니다.");   
			}
			
			changeTo('smartTagLocationState.do');
		}catch(e){
			console.log(e);
		}
	}
	
	return size;
}
  
$(document).ready(function(){
	getDisplayInfo();
	
	start();
	
	$("#new").click(function(){
		var $selectedSuccessFrm = $("#selectedSuccess");
	    $selectedSuccessFrm.attr('action', '/mobile/registNoEnroll.do');
	    $selectedSuccessFrm.attr('method', 'get');
	    $("#f_worker_id").val();
    	$("#f_worker_name").val();	
    	$("#f_birth_dt").val();	
    	$("#f_phone_number").val();
	    $selectedSuccessFrm.submit();
	})// end of click
	
	
	$("#next").click(function(){
			console.log($(".selectedRow"));
		if($(".selectedRow").length != 0){	
	    var tdArray = $(".selectedRow")[0].children;
	    $("#f_worker_id").val($(".selectedRow")[0].getAttribute("data"));	
		    for (var i =0; i<tdArray.length; i++){
		    	if(i==1) $("#f_worker_name").val(tdArray[i].innerText);	
		    	if(i==2) $("#f_birth_dt").val(tdArray[i].innerText);	
		    	if(i==3) $("#f_phone_number").val(tdArray[i].innerText);	
		    }
		}else{
			try{
				
				if(checkMobile()=="ios"){
					var message = {  message: "작업자를 선택해주세요." };
					window.webkit.messageHandlers.showToast.postMessage(message);
				}else{
					window.LexaApp.showToast("작업자를 선택해주세요.");
				}
			}catch(e){
				alert("작업자를 선택해주세요.");
			}
			return;
		}
	    
	    var $selectedSuccessFrm = $("#selectedSuccess");
	    $selectedSuccessFrm.attr('action', '/mobile/registNoEnroll.do');
	    $selectedSuccessFrm.attr('method', 'get');
	    $selectedSuccessFrm.submit();
	})// end of click
	
	
});

function onNext(param){
	    $("#f_worker_id").val(param.id);	
    	$("#f_worker_name").val(param.name);	
    	$("#f_birth_dt").val(param.birthDt);	
    	$("#f_phone_number").val(param.phoneNumber);	
    	$("#f_vendor_id").val(param.vendorId);	
    	$("#f_jobtype_id").val(param.jobTypeId);	
	    	    
	    var $selectedSuccessFrm = $("#selectedSuccess");
	    $selectedSuccessFrm.attr('action', '/mobile/registNoEnroll.do');
	    $selectedSuccessFrm.attr('method', 'get');
	    $selectedSuccessFrm.submit();
}


function onBack(){
	window.location.href="/mobile/smartTagSiteMapping.do";
}

function onTableWorkerClick(event){
	$('.tempWorker').removeClass("selectedRow");
	$('#temp_worker_'+event).addClass("selectedRow");
}
  
function start(){
	var site_id = null;
	
	var param = {};
	param.siteId=localStorage.siteId;
	findTempWorkerList(param);
}

function findTempWorkerList(param){
	var successCallback = function(data){
		var resultList = data.body;
		var html = '';
		$('.tempworker').remove();
		for(var i = 0 ; i< resultList.length ; i++){
			var birthDt;
			var createdDt;
			var vendorName =resultList[i].vendorName ? resultList[i].vendorName : '' ;
			var jobTypeName = resultList[i].jobTypeName ? resultList[i].jobTypeName : '' ;
			if(resultList[i].birthDt != undefined){
				 birthDt = getFormatDate(new Date(resultList[i].birthDt));
			}else{
				 birthDt = "";
			}
			if(resultList[i].createdDt != undefined){
				 createdDt = getFormatDate(new Date(resultList[i].createdDt));
			}else{
				 createdDt = "";
			}
			var html = 
				"<tr onclick = 'onTableWorkerClick("+resultList[i].id+");' style=' text-align:center;' id=temp_worker_"+resultList[i].id+" data="+resultList[i].id+" class='tempWorker'>"
				+"<td style=' text-align:center; vertical-align:middle'>"+(i+1)+"</td>"
				+"<td style=' text-align:center; vertical-align:middle'>"+ resultList[i].name+"</td>"
				+"<td style=' text-align:center; vertical-align:middle'>"+ vendorName +"</td>"
				+"<td style=' text-align:center; vertical-align:middle'>"+ jobTypeName+"</td>"
				+"<td style=' text-align:center; vertical-align:middle'>"+birthDt+"</td>"
				+"<td style=' text-align:center; vertical-align:middle'>"+resultList[i].phoneNumber+"</td>"
				+"<td style=' text-align:center; vertical-align:middle'>"+createdDt+"</td>"
				+"<td style=' text-align:center; vertical-align:middle'> <button type='button' onclick='onNext("+JSON.stringify(resultList[i])+")' class='btn btn-default'>추가입력</button></td></tr>";
			$('#temp_worker_tbody').append(html);
		}        
    }
	param.type='tag';
	param.allSearch=$('#searchParam').val();
	param.vehicleName=null;
	mobileUtil.callApi(conf.raycomApiUrl+"worker/temp/list",param,'post', successCallback);
	
}

function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '/' + month + '/' + day;
}

function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



</script>
</body>
</html>
