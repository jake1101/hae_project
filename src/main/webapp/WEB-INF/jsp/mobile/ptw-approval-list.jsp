<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String side_bar_type = (String)request.getAttribute("side_bar_type"); %>
<% String backYN = (String)request.getParameter("backYN"); %>

<html>
<!--
   ************************************************************************************************************
   * HEAD
   ************************************************************************************************************
-->	
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
	
	<title>안전작업목록</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
  	
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

	<script src="/ui/lib/custom/js/serverConfig.js"></script>
	
	<!-- bootstrap datepicker -->
	<link rel="stylesheet" href="../../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
	<!-- bootstrap datepicker -->
	<script src="../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
	<!-- 한국어 달력 -->
	<script src="../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.ko.js"></script>
	
	<script src="../../dist/js/moment.js"></script>
	
	<style>
		/* Disables pull-to-refresh but allows overscroll glow effects. */
/* 		body { */
/* 			overscroll-behavior-y: contain; */
/* 		} */
		
		@media only screen and (max-width: 760px){
	._ptwlist td:nth-of-type(1):before { content: "No."; color:#f9836d; background-color: #fdf0ed; width: 90px;}
	._ptwlist td:nth-of-type(2):before { content: "제목"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
	._ptwlist td:nth-of-type(3):before { content: "협력사"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
	._ptwlist td:nth-of-type(4):before { content: "상태"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
			}
	</style>
</head>

<!--
   ************************************************************************************************************
   * BODY
   ************************************************************************************************************
-->	
<body class="hold-transition skin-blue sidebar-mini">
	<!-- Site wrapper -->
	<div class="wrapper">
	  	<header class="main-header">
	    	<!-- Header Navbar: style can be found in header.less -->
	    	<nav class="navbar navbar-static-top">
	    		<!-- Sidebar toggle button-->
	    		<a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button"></a>
	    		
	    		<a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 15px; font-family: fontAwesome; color:white">
	    			작업허가제 승인
	    		</a>
	    		
	<!-- 	  <a class="sidebar-toggle"></a> -->
				<div class="navbar-custom-menu">
		        	<ul class="nav navbar-nav">
<!-- 			        	<li> -->
<!-- 			            	<a onclick="checkConfirm()" data-toggle="control-sidebar"><i class="fa fa-sign-out"></i></a> -->
<!-- 			          	</li> -->
			          	
			          	<form id="logoutFormMobile" action="<c:url value="/logoutProcess.do" />" method="POST" hidden>
							<sec:csrfInput/>
					  	</form>
		        	</ul>
		      	</div>
	    	</nav>
		</header>

<!-- =============================================== -->
<%-- 	<%@ include file="/WEB-INF/jsp/mobile/sidebar.jsp" %> --%>
	<c:set var="side_bar_type" value="<%=side_bar_type%>" />
 
	<c:if test="${side_bar_type eq 'max'}">
		<%@ include file="/WEB-INF/jsp/mobile/sidebar.jsp" %>
	</c:if>
	<c:if test="${side_bar_type eq 'min'}">
		<%@ include file="/WEB-INF/jsp/mobile/sidebar_min.jsp" %>
	</c:if>
<!-- =============================================== -->

		<form id="movePtwDetail" action="<c:url value="movePtwDetail.do" />" method="POST" hidden>
			<input type="hidden" name="siteId" id ="siteId"/>
			<input type="hidden" name="ptwMode"/>
			<input type="hidden" name="ptwId"/>
			<input type="hidden" name="ptwReqId"/>
			<input type="hidden" name="side_bar_type" value="<%=side_bar_type%>"/>
			<sec:csrfInput/>
		</form>
		
		<!-- Content Wrapper. Contains page content -->
		<div class="_contentWrapper content-wrapper">
	    	<!-- Main content -->
	    	<section class="content">
	    	
	    		<div class="box">
	    			<div class="box-header">
<!-- 	    				<h3 class="box-title">안전작업목록</h3> -->
	                  	<div class="form-horizontal">
	                  		<div class="form-group" style="display:flex; margin-bottom:5px;">
	                  			<label class="col-sm-2" style="width: 100px; align-self: center;">작업</label>
	                  			
	                  			<div class="col-sm-8" style="width:100%">
	                  				<!-- 작업허가 콤보 -->
	                  				<select class="_ptwCombo form-control">
		                  			</select>
		                  		</div>
		                  	</div>
		            		
		            		<div class="form-group" style="display:flex; margin-bottom:5px;">
		            			<label class="col-sm-2" style="width: 100px; align-self: center;">협력사</label>
		            			
		            			<div class="col-sm-8" style="width:100%">
		            				<!-- 협력사 콤보 -->
	                  				<select class="_vendorCombo form-control"></select>
		            			</div>
		            		</div>
                
		            		<div class="form-group" style="display:flex; margin-bottom:5px;">
	                  			<label class="col-sm-2" style="width: 100px; align-self: center;">상태</label>
	                  			
	                  			<div class="col-sm-8" style="width:100%">
		                  			<!-- 상태 콤보 -->
	                  				<select class="_statusCombo form-control">
		                  			</select>
		                  		</div>
		                  	</div>
		                  	
<!-- 		                  	<div class="form-group" style="display:flex; margin-bottom:5px;"> -->
<!-- 		                  		<label class="col-sm-2" style="width: 80px; align-self: center;">날짜</label> -->
		                  		
<!-- 		                  		<div class="col-sm-8" style="width:100%; display: flex;"> -->
<!-- 				            			<input type="text" class="form-control pull-right" id="startDt" name="startDt" placeholder="시작일" readonly> -->
<!-- 				            			<label style="padding-left:5px; padding-right:5px; align-self: center;">~</label> -->
<!-- 				            			<input type="text" class="form-control pull-right" id="endDt" name="endDt" placeholder="종료일" readonly> -->
<!-- 		                  		</div> -->
<!-- 		            		</div> -->
		            		
	                  		<button type="submit" name="search" id="search-btn" class="btn btn-search w100" id="back" onclick="onSearch()">검색</button>
	                	</div>
	                	
		            </div>
		            <!-- /.box-header -->
		            
		            <div class="box-body no-padding">
		            	<table id="ptwlist" class="_ptwlist table" style="display: block !important;">
							<colgroup>
		            			<col width="10%">
								<col width="55%">
								<col width="20%">
								<col width="15%">
							</colgroup>
							
							<thead>
							  	<tr>
		            				<td>No</td>
		            				<td>제목</td>
		            				<td>협력사</td>
		            				<td>상태</td>
		            			</tr>
							</thead>
							<tbody class="_ptwListTbody"></tbody>
		              	</table>
		            </div>
		            <!-- /.box-body -->
		          </div>
	    	</section>
		   <!-- /.content -->
	  	</div>
	  	<!-- /.content-wrapper -->
  	

  		<div class="control-sidebar-bg"></div>
	</div>
	
	
  	<footer class="footer_wrap">
       Copyright &copy; (주)한라.All rights reserved.
    </footer>
	<!-- ./wrapper -->
	
<!--
   ************************************************************************************************************
   * Script
   ************************************************************************************************************
-->	
	<script type="text/javascript">
		var gComboStatusList = [];
		var gComboPtwList = [];
		var gComboVendorList = [];
		var gPtwList = [];
		
		$(document).ready(function(){
			$("#siteId").val(localStorage.siteId);
			getStatusComboList();
			
			
// 			$('#startDt').datepicker({autoclose: true, language:'ko', todayHighlight : true});
// 			$('#endDt').datepicker({autoclose: true, language:'ko', todayHighlight : true});
		});
		
		function getStatusComboList(){
			var param = {
				grpCd : 'IOT006'
			};
			
			var successCallback = function(data){
				var statusList = data.body || [];
				
				var list = [{data:'',label:'전체'}];
				list = list.concat(statusList);
				
				gComboStatusList = list;
				
				var statusComboEle = $('._statusCombo')[0];
				
				for(var idx in gComboStatusList){
					var item = gComboStatusList[idx];
					
					if(item.data == "temp"){
						continue;
					}
					
					var optionEle = document.createElement("option");
					optionEle.setAttribute("value", item.data);
					optionEle.innerHTML = item.label;
					
					statusComboEle.appendChild(optionEle);
				}
				
				// 협력사 콤보 조회
				findVendorList();
		    }
		    param.siteId= localStorage.siteId;
			mobileUtil.callApi(conf.raycomApiUrl+"common/code/list",param,'post', successCallback);
 			
		}
		
		// 협력사 콤보 조회
		function findVendorList(){
			var param = {};
			param.siteId = localStorage.siteId;
			
			var successCallback = function(data){
				var vendorList = data.body || [];
				
				var list = [{id:'',name:'전체'}];
				list = list.concat(vendorList);
				
				gComboVendorList = list;
				
				completeComboVendorList();
				
				// 안전작업 콤보 목록 조회
				getPtwComboList();
		    }
			mobileUtil.callApi(conf.raycomApiUrl+"vendor/list",param,'post', successCallback);
		}
		
		function completeComboVendorList(){
			var vendorComboEle = $('._vendorCombo')[0];
			
			for(var idx in gComboVendorList){
				var item = gComboVendorList[idx];
				
				var optionEle = document.createElement("option");
				optionEle.setAttribute("value", item.id);
				optionEle.innerHTML = item.name;
				
				vendorComboEle.appendChild(optionEle);
			}
		}
		
		// 안전작업 콤보 목록 조회
		function getPtwComboList(){
			var param = {};
			param.siteId = localStorage.siteId;
			
			var successCallback = function(data){
				gComboPtwList = data.body || [];
				
				completePtwComboList();
				
		    }
			mobileUtil.callApi(conf.raycomApiUrl+"ptw/list",param,'post', successCallback);
		}
		
		function completePtwComboList(){
			var ptwComboEle = $('._ptwCombo')[0];
			
			var allEle = document.createElement("option");
			allEle.setAttribute("value", 0);
			allEle.innerHTML = "전체";
			ptwComboEle.appendChild(allEle);
			for(var idx in gComboPtwList){
				var item = gComboPtwList[idx];
				
				var optionEle = document.createElement("option");
				optionEle.setAttribute("value", item.id);
				optionEle.innerHTML = item.name;
				
				ptwComboEle.appendChild(optionEle);
			}
			
			// 조회조건 유지
			var backYN = "<%=backYN%>";
			
			if(backYN == "Y"){
				var ptwApprCond = JSON.parse(localStorage.ptwApprCond || "{}");
				
				if(ptwApprCond.ptwId){
					$('._ptwCombo')[0].value = ptwApprCond.ptwId;
					$('._vendorCombo')[0].value = ptwApprCond.vendorId;
					$('._statusCombo')[0].value = ptwApprCond.statusCd;
				}
			}
			
			onSearch();
		}
		
		// 조회
		function onSearch(){
			var me = this;
			
			// Start the selection of tr, start and stop index (The index numbers start at 0)
			$('._ptwListTbody tr').slice(1).remove();
			
			var ptwId = $('._ptwCombo option:selected').val(); // 작업허가 id
			var vendorId = $('._vendorCombo option:selected').val();
			var status = $('._statusCombo option:selected').val();
			
			var param = {};
			param.siteId = localStorage.siteId;
			param.ptwId = Number(ptwId);
			param.vendorId = (vendorId == "") ? "" : Number(vendorId);
			param.status = status;
			
			
			var successCallback = function(data){
				gPtwList = data.body || [];
				
				me.completeSelectList();
		    }
			mobileUtil.callApi(conf.raycomApiUrl+"ptw/res/list",param,'post', successCallback);
		}
		
		// 조회 완료
		function completeSelectList(){
			var ptwListEle = $('._ptwListTbody')[0];
			
			var ptwList = gPtwList;
			
// 			if(ptwId == 1){
// 				ptwList = [
// 					{id:'11', title:'고소작업허가서 입니다.', reqDt:'2020-03-09 09:12', reqUserName:'홍길동', status:'request'}
// 					,{id:'12', title:'고소작업허가서 입니다.', reqDt:'2020-03-10 15:23', reqUserName:'이창조', status:'approval'}
// 					,{id:'13', title:'고소작업허가서 입니다.', reqDt:'2020-03-11 13:17', reqUserName:'오혁신', status:'return'}
// 				];
				
// 			}else if(ptwId == 2){
// 				ptwList = [
// 					{id:'14', title:'지상작업허가서 입니다.', reqDt:'2020-03-10', reqUserName:'이창조', status:'approval', statusName:'승인'}
// 					,{id:'15', title:'지상작업허가서 입니다.', reqDt:'2020-03-09', reqUserName:'홍길동', status:'request', statusName:'신청'}
// 				];
// 			}
			if(ptwList.length == 0 && $(ptwListEle).children().length == 0){
				var tr = document.createElement('tr');
				var td = document.createElement('td');
				td.setAttribute("colspan", 4);
				td.innerHTML = "데이터가 존재하지 않습니다.";
				tr.appendChild(td);
				ptwListEle.appendChild(tr);
				return;
			}
			
			for(var idx in ptwList){
				var item = ptwList[idx];
				
				var tdIdx = document.createElement('td');
				tdIdx.innerHTML = Number(idx) + 1;
				
				var td1 = document.createElement('td');
				var span1 = document.createElement('span');
				span1.classList.add("ptw-title");
				span1.innerHTML = item.title;							// 제목
				var br = document.createElement("br");
				var span2 = document.createElement('span2');
				span2.innerHTML = (item.reqDt ? moment(item.reqDt).format("YYYY-MM-DD HH:mm") : "")+ "<br>" + item.reqUserName; // 신청일, 신청자
				td1.appendChild(span1);
				td1.appendChild(br);
				td1.appendChild(span2);
				
				var td2 = document.createElement('td');
				
				var vendorName = item.vendorName; 
				td2.innerHTML = vendorName;
				
				var td3 = document.createElement('td');
				var span4 = document.createElement('span');
				span4.classList.add("label");
				
				var status = item.status; 
				if(status == "request"){
					span4.classList.add("label-success");	// 상태
					span4.innerHTML = "신청";
				}else if(status == "approval"){
					span4.classList.add("label-primary");
					span4.innerHTML = "승인";
				}else if(status == "return"){
					span4.classList.add("label-danger");
					span4.innerHTML = "반려";
				}else{
					span4.classList.add("label-default");
					span4.innerHTML = "임시저장";
				}
				td3.appendChild(span4);
				
				var tr = document.createElement('tr');
				tr.setAttribute("data-idx", idx);
				tr.appendChild(tdIdx);
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				ptwListEle.appendChild(tr);
			}
			
			this.setTableEvent();
		}
		
		// 테이블 tr : 클릭 이벤트 등록
		function setTableEvent(){
			// 테이블 row 이벤트
			$("#ptwlist tr").click(function() {
				var rowEle = $(this);
				
				// row index 값 얻어오기
				var idx = rowEle[0].dataset.idx;
				
				if(idx){
					// data 얻어오기
					var item = gPtwList[idx];
					
					var form = $("#movePtwDetail")[0];
					form.ptwMode.value = "approval";
					form.ptwReqId.value = item.id;
					
					localStorage.ptwApprCond = JSON.stringify({
						ptwId : $('._ptwCombo option:selected').val()
						,vendorId : $('._vendorCombo option:selected').val()
						,statusCd : $('._statusCombo option:selected').val()
					});
					
					$("#movePtwDetail").submit();
					
// 					alert(item.id + "," + item.reqUserName);
				}
				
			});
			
			$("#ptwlist tr").on('touchstart', function(e){
				var rowEle = $(this);
				rowEle[0].style.background = "lightgray";
			});
			
			$("#ptwlist tr").on('touchend', function(e){
				var rowEle = $(this);
				rowEle[0].style.background = "";
			});
			
		}
		
	</script>
	
</body>
</html>
