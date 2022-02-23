<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<% String siteId = (String)request.getParameter("siteId"); %>
<% String userToken = (String)request.getParameter("userToken"); %>
<% String vendorId = (String)request.getParameter("vendorId"); %>

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
	
	<script src="../../dist/js/moment.js"></script>
	
	<script src="../../js/mobileUtil/mobile_util.js"></script>
	
	<style>
			@media only screen and (max-width: 760px){
			._ptwlist td:nth-of-type(1):before { content: "No."; color:#f9836d; background-color: #fdf0ed; width: 90px;}
			._ptwlist td:nth-of-type(2):before { content: "제목"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
			._ptwlist td:nth-of-type(3):before { content: "협력사"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
			._ptwlist td:nth-of-type(4):before { content: "상태"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
			}
		/* Disables pull-to-refresh but allows overscroll glow effects. */
/* 		body { */
/* 			overscroll-behavior-y: contain; */
/* 		} */
		
/* 		._ptwList > tbody > tr > th{
			vertical-align: middle;
			text-align: center;
			font-weight:bold;
			background-color:#F8F8F8;
		}
		
		._ptwList > tbody > tr > td:not(:nth-child(2)){
			vertical-align: middle;
			text-align: center;
		}
		*/		
		.ptw-title{font-size:17px;font-weight:bold}
		
		._reqBtn{
			position: fixed; 
			bottom:25px; 
			left:calc(50% - 48px); 
			width: 96px; 
			height: 50px; 
			z-index:1;
			box-shadow : 1px 1px 1px 1px; 
		}

		.siteStyle {
			width: 100%;
		    text-align: center;
		    margin: 5px auto;
		    color: white;
		    background-color: #b4b4b5;
		    font-size: 20px;
		    cursor: pointer;
	   		border-radius: 6px 6px 6px 6px;
		}
		
		/* 고도화 : 디자인 추가
		.content-wrapper, .main-footer {
			margin-left: 0px;
		} */
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
	  			
		<form id="movePtwDetail2" action="<c:url value="movePtwDetail2.do" />" method="POST" hidden>
			<input type="hidden" name="siteId" id="siteId"/>
			<input type="hidden" name="ptwMode"/>
			<input type="hidden" name="ptwId"/>
			<input type="hidden" name="ptwReqId"/>
			<input type="hidden" name="side_bar_type" value="${side_bar_type}"/>
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
								<label class="col-sm-2" style="width: 80px; align-self: center;">작업</label>
	                  			
	                  			<div class="col-sm-8" style="width:100%">
	                  				<!-- 작업허가 콤보 -->
	                  				<select class="_ptwCombo form-control"></select>
		                  		</div>
							</div>
							
							<div class="form-group" style="display:flex; margin-bottom:5px;">
	                  			<label class="col-sm-2" style="width: 80px; align-self: center;">상태</label>
	                  			
	                  			<div class="col-sm-8" style="width:100%">
		                  			<!-- 상태 콤보 -->
	                  				<select class="_statusCombo form-control">
		                  			</select>
		                  		</div>
		                  	</div>
		                  	
							<div style="float: right;">
	                    		<button type="submit" class="btn btn-default" onclick="onSearch()">
	                    			<i class="fa fa-search"></i>
	                    		</button>
	                  		</div>
	                  		<!-- 버튼 : 신규 신청 -->
	    					<button type="button" class="_reqBtn btn btn-default" onclick="onNewReq()"><i class="fa fa-pencil"></i>&nbsp;신규신청</button>
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
	  	
  		<!-- <div class="control-sidebar-bg"></div> -->
	</div>
	<!-- ./wrapper -->
	
	
	<div class="modal fade" id="modal-button">
   		<div class="modal-dialog">
     		<div class="modal-content" style="background:none;">
       			<div class="modal-body" >
      				<div id="buttonArea" style="text-align:right">
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
		var gComboPtwList = [];
		var gComboStatusList = [{data:'', label:'전체'}];
		var gPtwList = [];
		
		function checkMobile(){
		  	var result = mobileUtil.checkMobile();
		    return result;
		}
		
		$(document).ready(function(){
			localStorage.userToken = "<%=userToken%>";
			localStorage.vendorId = "<%=vendorId%>";
			
			var siteId = "<%=siteId%>";
			
			if(siteId){
				localStorage.siteId = siteId;
				$("#siteId").val(localStorage.siteId);
			}
			
			getStatusComboList();
		});
		
		function getStatusComboList(){
			var param = {
				grpCd : 'IOT006'
			};
			
			var successCallback = function(data){
				var statusList = data.body || [];
				
				gComboStatusList = gComboStatusList.concat(statusList);
				
				var statusComboEle = $('._statusCombo')[0];
				
				for(var idx in gComboStatusList){
					var item = gComboStatusList[idx];
					
					var optionEle = document.createElement("option");
					optionEle.setAttribute("value", item.data);
					optionEle.innerHTML = item.label;
					
					statusComboEle.appendChild(optionEle);
				}
				// 안전작업 콤보 조회
				getPtwComboList();
		    }
		    param.siteId= localStorage.siteId;
			mobileUtil.callApi(conf.raycomApiUrl+"common/code/list",param,'post', successCallback);
		}
		
		// 안전작업 콤보 목록 조회
		function getPtwComboList(){
			var successCallback = function(data){
				gComboPtwList = data.body || [];
				
				completePtwComboList();
		    }
			var param = {};
		    param.siteId= localStorage.siteId;
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
			<%-- 
			var backYN = "<%=backYN%>";
			
			if(backYN == "Y"){
				var ptwReqCond = JSON.parse(localStorage.ptwReqCond || "{}");
				
				if(ptwReqCond.ptwId){
					$('._ptwCombo')[0].value = ptwReqCond.ptwId;
					$('._statusCombo')[0].value = ptwReqCond.statusCd;
				}
			} 
			--%>
			
			onSearch();
		}
		
		// 조회
		function onSearch(){
			var me = this;
			
			// Start the selection of tr, start and stop index (The index numbers start at 0)
			$('._ptwListTbody tr').slice(1).remove();
			
			// 작업허가 id
			var param = {};
			var ptwId = $('._ptwCombo option:selected').val();
			var status = $('._statusCombo option:selected').val();
		    param.siteId= localStorage.siteId;
		    param.ptwId= ptwId;
		    param.status= status;
			
			var successCallback = function(data){
				gPtwList = data.body || [];
				
				me.completeSelectList();
		    }
			
			mobileUtil.callApi(conf.raycomApiUrl+"ptw/req/list",param,'post', successCallback);
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
			
			if(ptwList.length == 0){
				var tr = document.createElement('tr');
				var td = document.createElement('td');
				td.setAttribute("colspan", 3);
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
				var span2 = document.createElement('span');
				span2.innerHTML = (item.reqDt ? moment(item.reqDt).format("YYYY-MM-DD HH:mm") : "")+ ", " + item.reqUserName; // 신청일, 신청자
				td1.appendChild(span1);
				td1.appendChild(br);
				td1.appendChild(span2);
				
				var td2 = document.createElement('td');
				var span3 = document.createElement('span');
				span3.classList.add("label");
				
				var status = item.status; 
				if(status == "request"){
					span3.classList.add("label-success");	// 상태
					span3.innerHTML = "신청";
				}else if(status == "approval"){
					span3.classList.add("label-primary");
					span3.innerHTML = "승인";
				}else if(status == "return"){
					span3.classList.add("label-danger");
					span3.innerHTML = "반려";
				}else{
					span3.classList.add("label-default");
					span3.innerHTML = "임시저장";
				}
				td2.appendChild(span3);
				
				var tr = document.createElement('tr');
				tr.setAttribute("data-idx", idx);
				tr.appendChild(tdIdx);
				tr.appendChild(td1);
				tr.appendChild(td2);
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
					
					var form = $("#movePtwDetail2")[0];
					form.ptwReqId.value = item.id;
					
					localStorage.ptwReqCond = JSON.stringify({
						ptwId : $('._ptwCombo option:selected').val()
						,statusCd : $('._statusCombo option:selected').val()
					});
					
					$("#movePtwDetail2").submit();
					
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
		
		// 안전작업 신청 
		function onNewReq(){
			// 초기화
			$('#buttonArea').html("");
			// 모달 호출			
			$('#modal-button').modal();
			// 모달 버튼 추가
			var html = "";
			for(var i = 0 ; i < gComboPtwList.length ; i++){
				html += "<div class='siteStyle' data-id="+ gComboPtwList[i].id +" onclick='reqPtw(event)'>";
				html += gComboPtwList[i].name+ "</div>"
			}
			
			$("#buttonArea").html(html);
			
// 			var ptwId = $('._ptwCombo option:selected').val();
			
// 			var form = $("#movePtwDetail")[0];
// 			form.ptwMode.value = "create";
// 			form.ptwId.value = Number(ptwId);
			
// 			form.submit();
		}
		
		function reqPtw(e){
			var ptwId = e.currentTarget.dataset.id || "";
			
			var form = $("#movePtwDetail2")[0];
			form.ptwMode.value = "create";
			form.ptwId.value = Number(ptwId);
			
			form.submit();
		}
		
	</script>
	
</body>
</html>
