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
	
	<title>조직도</title>
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
	
	<script src="../../dist/js/moment.js"></script>
	<script src="../../dist/js/bootstrap-treeview.js"></script>
	
	<style>
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
	    			조직도
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
			<input type="hidden" name="siteId" />
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
	    	
<!-- 	    		<div class="box"> -->
<!-- 	    			<div class="box-header"> -->
<!-- 	    				<h3 class="box-title">안전작업목록</h3> -->

<!-- 	                  	<div class="form-horizontal"> -->
<!-- 	                  		<div class="form-group" style="display:flex; margin-bottom:5px;"> -->
<!-- 	                  			<label class="col-sm-2" style="width: 80px; align-self: center;">작업</label> -->
	                  			
<!-- 	                  			<div class="col-sm-8" style="width:100%"> -->
<!-- 	                  				작업허가 콤보 -->
<!-- 	                  				<select class="_ptwCombo form-control"> -->
<!-- 		                  			</select> -->
<!-- 		                  		</div> -->
<!-- 		                  	</div> -->
		            		
<!-- 		            		<div class="form-group" style="display:flex; margin-bottom:5px;"> -->
<!-- 		            			<label class="col-sm-2" style="width: 80px; align-self: center;">협력사</label> -->
		            			
<!-- 		            			<div class="col-sm-8" style="width:100%"> -->
<!-- 		            				협력사 콤보 -->
<!-- 	                  				<select class="_vendorCombo form-control"></select> -->
<!-- 		            			</div> -->
<!-- 		            		</div> -->
                
<!-- 		            		<div class="form-group" style="display:flex; margin-bottom:5px;"> -->
<!-- 	                  			<label class="col-sm-2" style="width: 80px; align-self: center;">상태</label> -->
	                  			
<!-- 	                  			<div class="col-sm-8" style="width:100%"> -->
<!-- 		                  			상태 콤보 -->
<!-- 	                  				<select class="_statusCombo form-control"> -->
<!-- 		                  			</select> -->
<!-- 		                  		</div> -->
<!-- 		                  	</div> -->
		                  	
		                  	
<!-- 		                  	<div class="form-group" style="display:flex; margin-bottom:5px;"> -->
<!-- 		                  		<label class="col-sm-2" style="width: 80px; align-self: center;">날짜</label> -->
		                  		
<!-- 		                  		<div class="col-sm-8" style="width:100%; display: flex;"> -->
<!-- 				            			<input type="text" class="form-control pull-right" id="startDt" name="startDt" placeholder="시작일" readonly> -->
<!-- 				            			<label style="padding-left:5px; padding-right:5px; align-self: center;">~</label> -->
<!-- 				            			<input type="text" class="form-control pull-right" id="endDt" name="endDt" placeholder="종료일" readonly> -->
<!-- 		                  		</div> -->
<!-- 		            		</div> -->
		            		
<!-- 	                  		<div style="float: right;"> -->
<!-- 	                    		<button type="submit" class="btn btn-default" onclick="onSearch()"> -->
<!-- 	                    			<i class="fa fa-search"></i> -->
<!-- 	                    		</button> -->
<!-- 	                  		</div> -->
<!-- 	                	</div> -->
	                	
<!-- 		            </div> -->
		            <!-- /.box-header -->
		            
		            <div class="box-body no-padding">
<!-- 		            	<table id="ptwlist" class="_ptwlist table"> -->
<%-- 							<colgroup> --%>
<%-- 		            			<col width="10%"> --%>
<%-- 								<col width="75%"> --%>
<%-- 								<col width="15%"> --%>
<%-- 							</colgroup> --%>
							
<!-- 							<tbody class="_ptwListTbody"> -->
<!-- 		            			<tr> -->
<!-- 		            				<th>No</th> -->
<!-- 		            				<th>제목</th> -->
<!-- 		            				<th>상태</th> -->
<!-- 		            			</tr> -->
<!-- 		                	</tbody> -->
<!-- 		              	</table> -->
		              	
		              	<div id="tree"></div>
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
	
	<div class="modal fade" id="modal-button">
   		<div class="modal-dialog" style="background-color: white;">
     		<div class="modal-content" style="background:none;">
       			<div class="modal-body" >
       				<div class="_userInfoBox box-body box-profile">
              			<h3 class="profile-username text-center">이름</h3>

              			<ul class="list-group">
                			<li class="list-group-item">
                  				<b>전화</b> <a class="pull-right">010-XXX-XXXX</a>
                			</li>
              			</ul>
            		</div>
            		
            		<div class="btn btn-primary btn-block" onClick="onCall()">
            			<i class="glyphicon glyphicon-earphone" style="margin-right:5px;"></i>전화걸기
                   	</div>
                   		
       			</div>
     		</div>
     		<!-- /.modal-content -->
   		</div>
   		<!-- /.modal-dialog -->
 	</div>
 	
<!--
   ************************************************************************************************************
   * Script
   ************************************************************************************************************
-->	
	<script type="text/javascript">
		var gSiteOrgList = [];
		var gUserInfo = {};
		
		$(document).ready(function(){
			$("#siteId").val(localStorage.siteId);
			onSearch();
		});
		
		// 조회
		function onSearch(){
			var me = this;
			
			var param = {};
			param.siteId = localStorage.siteId;
			
			var successCallback = function(data){
				gSiteOrgList = data.body || [];
				
				$('#tree').treeview({
					data: gSiteOrgList
					,onNodeSelected: function(e, data){
						console.log("###selected");
						console.log(data);
						
						if(data.type == "user"){
							gUserInfo = data;
							
							me.showLayer(data);
						}
						
						// 접기 or 펴기
						if(data.state.expanded){
							$('#tree').treeview('collapseNode', [data.nodeId]);
						}else{
							$('#tree').treeview('expandNode', [data.nodeId]);
						}
					}
				});
				
		    }
			mobileUtil.callApi(conf.raycomApiUrl+"site/org/tree",param,'post', successCallback);
		}
		
		// layer
		function showLayer(data){
			// 초기화
			$('._userInfoBox').empty();
			
			// 모달 호출
			$('#modal-button').modal();
			
			// 모달 버튼 추가
			var userInfoBox = $('._userInfoBox')[0];
			
			var nameEle = document.createElement('h3');
			nameEle.classList.add('profile-username');
			nameEle.classList.add('text-center');
			nameEle.innerHTML = data.text;
			
			var groupEle = document.createElement('ul');
			groupEle.classList.add('list-group');
			
			var itemEle = document.createElement('li');
			itemEle.classList.add('list-group-item');
			
			var labelEle = document.createElement('b');
			labelEle.innerHTML = "전화번호";
			
			var valueEle = document.createElement('b');
			valueEle.classList.add("pull-right");
			valueEle.innerHTML = data.phone;
			
			// append
			itemEle.appendChild(labelEle);
			itemEle.appendChild(valueEle);
			groupEle.appendChild(itemEle);
			
			userInfoBox.appendChild(nameEle);
			userInfoBox.appendChild(groupEle);
		}
		
		// 전화걸기
		function onCall(){
			try{
				if(checkMobile()=="ios"){
					var message = {  tellephone_number: gUserInfo.phone };
					window.webkit.messageHandlers.callPhone.postMessage(message);
				}else{
					window.LexaApp.callPhone(gUserInfo.phone);
				}
       		}catch(e) {
       			alert("오류가 발생했습니다.");
       		}
			
		}
	</script>
	
</body>
</html>
