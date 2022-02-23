<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String ptwId = (String)request.getParameter("ptwId"); %>
<% String ptwReqId = (String)request.getParameter("ptwReqId"); %>
<% String ptwMode = (String)request.getParameter("ptwMode"); %>
<% String side_bar_type = (String)request.getAttribute("side_bar_type"); %>

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
   
   <!-- jQuery 3 -->
   <script src="../../bower_components/jquery/dist/jquery.min.js"></script>
   
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
<!--    <script type="text/javascript" src="/js/main/mobile.js"></script> -->
   
   <title>안전작업목록</title>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   
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
      .ptw-title{font-size:18px;font-weight:bold}
      .disabled{pointer-events:none; background:#EEEEEE;}
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
                작업허가제 신청 상세페이지
             </a>
             
   <!--      <a class="sidebar-toggle"></a> -->
            <div class="navbar-custom-menu">
                 <ul class="nav navbar-nav">
<!--                     <li> -->
<!--                         <a onclick="checkConfirm()" data-toggle="control-sidebar"><i class="fa fa-sign-out"></i></a> -->
<!--                       </li> -->
                      
                      <form id="logoutFormMobile" action="<c:url value="/logoutProcess.do" />" method="POST" hidden>
                     <sec:csrfInput/>
                    </form>
                 </ul>
               </div>
          </nav>
      </header>

<!-- =============================================== -->
<%--    <%@ include file="/WEB-INF/jsp/mobile/sidebar.jsp" %> --%>
   <c:set var="side_bar_type" value="<%=side_bar_type%>" />
 
   <c:if test="${side_bar_type eq 'max'}">
      <%@ include file="/WEB-INF/jsp/mobile/sidebar.jsp" %>
   </c:if>
   <c:if test="${side_bar_type eq 'min'}">
      <%@ include file="/WEB-INF/jsp/mobile/sidebar_min.jsp" %>
   </c:if>
<!-- =============================================== -->
      
      <form id="movePtwList" action="<c:url value="movePtwList.do" />" method="POST" hidden>
         <input type="hidden" name="siteId" id="listSiteId"/>
         <input type="hidden" name="side_bar_type" value="<%=side_bar_type%>"/>
         <input type="hidden" name="backYN" value="Y"/>
         <sec:csrfInput/>
      </form>
      
      <form id="movePtwApprList" action="<c:url value="movePtwApprList.do" />" method="POST" hidden>
         <input type="hidden" name="siteId" id="appSiteId"/>
         <input type="hidden" name="side_bar_type" value="<%=side_bar_type%>"/>
         <input type="hidden" name="backYN" value="Y"/>
         <sec:csrfInput/>
      </form>
      
      <!-- Content Wrapper. Contains page content -->
      <div class="_contentWrapper content-wrapper">
         <!-- Main content -->
          <section class="content">
<form id="form" onsubmit="return false">
<!-- 안전작업 기본정보 -->
             <div class="box box-primary">
                <div class="box-header with-border">
                   <h3 class="_ptwName box-title"></h3>
                  </div>
                  <!-- /.box-header -->
                  
                  <div class="box-body">
                     <div class="form-group">
                        <label style="color:red">[필수] </label>
                        <label>제목</label>
                        <input type="text" class="form-control" name="title" placeholder="제목을 입력해 주세요.">
                     </div>
                     
                     <div class="form-group">
                        <label style="color:red">[필수] </label>
                        <label>작업 책임자</label>
						<select class="_vendorWorkerCombo form-control select2 select2-hidden-accessible" 
                     		data-placeholder="작업자를 선택해 주세요" id="resWorkerJob" name="resWorkerJob" style="width: 100%;" aria-hidden="true">
		                </select>
                     </div>
                     
                     <div class="form-group">
                        <label style="color:red">[필수] </label>
                        <label>작업허가기간(시작일자)</label>
                        <div class="input-group date">
                           <div class="input-group-addon">
                              <i class="fa fa-calendar"></i>
                           </div>
                           <input type="text" class="form-control pull-right" id="startDt" name="startDt" placeholder="날짜를 선택해 주세요." readonly>
                           
                           <div class="input-group-addon">
                              <i class="fa fa-clock-o glyphicon glyphicon-time"></i>
                           </div>
                           
                           <select class="form-control pull-right" style="min-width:70px" name="startHr">
                              <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12" selected="selected">12</option>
                              <option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option>
                           </select>
                        </div>
                     </div>
                     
                     <div class="form-group">
                        <label style="color:red">[필수] </label>
                        <label>작업허가기간(종료일자)</label>
                        <div class="input-group date">
                           <div class="input-group-addon">
                              <i class="fa fa-calendar"></i>
                           </div>
                           <input type="text" class="form-control pull-right" id="endDt" name="endDt" placeholder="날짜를 선택해 주세요." readonly>
                           
                           <div class="input-group-addon">
                              <i class="fa fa-clock-o glyphicon glyphicon-time"></i>
                           </div>
                           
                           <select class="form-control pull-right" style="min-width:70px" name="endHr">
                              <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12" selected="selected">12</option>
                              <option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option>
                           </select>
                        </div>
                     </div>
                     
                     <!-- 작업위치/작업자수/최소작업자수/필수직종선택/필수인력선택 -->
                     <div class="form-group" id="reqLocationDiv">
                     	<label style="color:red">[필수] </label>
                     	<label>작업 위치</label>
                     	<input type="text" class="form-control" name="reqLocation" placeholder="자세한 위치를 입력해주세요">
                     </div>
                     
                     <div class="form-group" id="workerCntDiv">
                     	<label style="color:red">[필수] </label>
                     	<label>작업자 수</label>
                     	<input type="text" class="form-control" name="workerCnt" placeholder="작업 인원수를 입력해주세요">
                     </div>
                     
                     <div class="form-group" id="workerMinCountDiv">
                     	<label style="color:red">[필수] </label>
                     	<label>최소 작업자 수</label>
                     	<input type="text" class="form-control" name="workerMinCount" placeholder="최소 작업 인원수를 입력해주세요">
                     </div>
                     
                     <div class="form-group" id="reqWorkerJobDiv">
                     	<label style="color:red">[필수]</label>
                     	<label>필수 인력 -필수 직종</label>
                     	<select class="_vendorWorkerCombo form-control select2 select2-hidden-accessible" multiple="multiple" 
                     		data-placeholder="작업자를 선택해 주세요" id="reqWorkerJob" name="reqWorkerJob" style="width: 100%;">
<!-- 		                  <option>Alabama</option> -->
<!-- 		                  <option>Alaska</option> -->
<!-- 		                  <option>California</option> -->
<!-- 		                  <option>Delaware</option> -->
<!-- 		                  <option>Tennessee</option> -->
<!-- 		                  <option>Texas</option> -->
<!-- 		                  <option>Washington</option>  -->
		                </select>

                     </div>
                     
                     <div class="form-group">
                        <label>신청인/협력사</label>
                        <input type="text" class="form-control" name="reqUserName" readonly>
                     </div>
                     
                     <div class="form-group">
                        <label>신청일시</label>
                        <input type="text" class="form-control" id="reqDt" name="reqDt" readonly>
                        
<!--                         <label style="color:red">[필수] </label> -->
<!--                         <label>신청일자</label> -->
<!--                         <div class="input-group date"> -->
<!--                            <div class="input-group-addon"> -->
<!--                               <i class="fa fa-calendar"></i> -->
<!--                            </div> -->
<!--                            <input type="text" class="form-control pull-right" id="reqDt" name="reqDt" readonly> -->
<!--                         </div> -->
                     </div>
                     
                     <div class="_sts-group form-group" style="display:none">
                        <label>승인일시</label>
                        <input type="text" class="form-control" id="apprDt" name="apprDt" readonly>
                        
<!--                         <div class="input-group date"> -->
<!--                            <div class="input-group-addon"> -->
<!--                               <i class="fa fa-calendar"></i> -->
<!--                            </div> -->
<!--                            <input type="text" class="form-control pull-right" id="apprDt" name="apprDt" disabled> -->
<!--                         </div> -->
                     </div>
                     
                     <div class="form-group">
                        <label>상태</label>
                        <input type="text" class="form-control" name="statusName" readonly>
                     </div>
<!--                   </form> -->
                  </div>
                  <!-- /.box-body -->
              </div>
              <!-- /.box-primary -->
              
<!-- 안전조치 요구사항 -->
            <div class="box box-primary">
               <div class="box-header with-border">
                  <h3 class="box-title">안전조치 요구사항</h3>
                   </div>
                   <!-- /.box-header -->
                   
               <div class="_ptw-list-box">
                      <!-- box-body -->
                   </div>
                   <!-- /._ptw-list-box -->
            </div>
              <!-- /.box-primary -->

              <div class="_ptw-opn-box box box-primary" style="display:none">
                 <div class="box-header with-border">
                    <h3 class="box-title">의견</h3>
                 </div>
                   
                   <div class="box-body">
                      <div class="form-group">
<!--                          <textarea class="_ptw_opinion form-control" rows="5" name="opinion" id="opinion" onfocus='openKeyboard(opinion)'></textarea> -->
                         <textarea class="_ptw_opinion form-control" rows="5" name="opinion" id="opinion" ></textarea>
                     </div>
                  </div>
            </div>
              <!-- /.box-primary -->
              
            <div class="box-footer" style="margin-top: 30px;">
               <button type="button" class="_returnBtn btn btn-danger pull-right" style="display:none" data-sts="return" onclick="onSave(this)">반려</button>
               <button type="button" class="_apprBtn btn btn-primary pull-right" style="display:none; margin-right:5px;" data-sts="approval" onclick="onSave(this)">승인</button>
            
                   <button type="button" class="_reqBtn btn btn-success pull-right" style="display:none" data-sts="request" onclick="onSave(this)">신청</button>
                   <button type="button" class="_deleteBtn btn btn-danger pull-right" style="display:none; margin-right:5px;" onclick="onDelete(this)">삭제</button>
                   <button type="button" class="_saveBtn btn btn-primary pull-right" style="display:none; margin-right:5px;" data-sts="temp" onclick="onSave(this)">임시저장</button>
                   <button type="button" class="btn pull-right" style="margin-right:5px;" onclick="onBack(this)">목록</button>
                </div>
                <div style="height:400px;"></div>
                <!-- /.box-footer -->
</form>
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
   <div class="modal-dialog" style="width:100%; height: 10%; position:fixed; top:40%;">
      <div class="modal-content" style="background:none;">
         <div class="modal-body" >
            <div id="buttonArea" style="text-align:center">
               <button onclick='showPic()' class='btn btn-default'>보기</button>
               <button onclick='deletePic()' class='_deletePicBtn btn btn-danger' style="display:none">삭제</button>
            </div>
         </div>
      </div>
      <!-- /.modal-content -->
   </div>
   <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
  
<div class="modal fade" id="modal-picture">
   <div class="modal-dialog">
      <div class="modal-content" style="height:80%;">
         <div class="modal-body" style="height:100%;">
            <div id="pictureArea" style="text-align: center;">
               <img  id='picture' src='' style ='width:100%; height : 100%'></img>
            </div>
         </div>
      </div>
      <!-- /.modal-content -->
   </div>
   <!-- /.modal-dialog -->
</div>
<!-- /.modal -->  

<!--
   ************************************************************************************************************
   * Script
   ************************************************************************************************************
-->   
   <script type="text/javascript">
      var gUserInfo = {};
      var gPtwReq = {};
      var gPtwDataList = [];
      var gSts = "";
      var gSelectedImg = {};
      var gComboWorkerList = [];
      
      $(document).ready(function(){
         var a = "<%=side_bar_type%>";
         $("#appSiteId").val(localStorage.siteId);
         $("#listSiteId").val(localStorage.siteId);
         var date = new Date();
         $("#startDt").val(date_to_str(date).substr(0,10));
         $("#endDt").val(date_to_str(date).substr(0,10)); 
         var formEle = $('#form')[0];
         formEle.startHr.value = 8;
         formEle.endHr.value = 17;
         getUserInfo();
         
         // 콤보 : 작업자 목록 조회
         getVendorWorkerList();
      });
      
      
      /**
       * 콤보 : 직종,작업자 목록 조회
       */
      function getVendorWorkerList(){
    	  var param = {siteId : localStorage.siteId, vendorId : localStorage.vendorId};
    	  
    	  var successCallback = function(data){
    		  var statusList = data.body || [];
    		  
    		  gComboWorkerList = statusList;
    		  
    		  var vendorWorkerCombo = $('#resWorkerJob')[0];
			  var vendorWorkerCombo2 = $('#reqWorkerJob')[0];
    		  
    		  for(var idx in gComboWorkerList){
    			  var item = gComboWorkerList[idx];
    			  
    			  var optionEle = document.createElement("option");
    			  optionEle.setAttribute("value", item.id);
    			  optionEle.innerHTML =  item.name+ " - " + item.jobTypeName ;
    			  
   			  	  vendorWorkerCombo2.appendChild(optionEle);
    		  }
    		  
    		  for(var idx in gComboWorkerList){
    			  var item = gComboWorkerList[idx];
    			  
    			  var optionEle = document.createElement("option");
    			  optionEle.setAttribute("value", item.id);
    			  optionEle.innerHTML =  item.name+ " - " + item.jobTypeName ;
    			  
    			  vendorWorkerCombo.appendChild(optionEle);
    		  }
		  }
    	  
    	  mobileUtil.callApi(conf.raycomApiUrl + "mobile/if/vendor/worker/list", param, 'post', successCallback);
      }
      
      function getUserInfo(){
         
         var successCallback = function(data){
            var result = data.body;
            gUserInfo = result;
            
            initSearch();
          }
         mobileUtil.callApi(conf.raycomApiUrl+"users/detail",{},'post', successCallback);
      }
      
      function initSearch(){
         // 신규작성일 경우 : 조건에 따라 보임/숨김 처리
         var ptwMode = "<%= ptwMode %>";
         
         if(ptwMode == "create"){
            //Date picker
//             $('#reqDt').datepicker({autoclose: true, language:'ko'});
            $('#startDt').datepicker({autoclose: true, language:'ko', startDate: '0d', todayHighlight : true});
            $('#endDt').datepicker({autoclose: true, language:'ko', startDate: '0d', todayHighlight : true});
            $('#apprDt').datepicker({autoclose: true, language:'ko'});
            
            // 신청일자 : default 세팅
//             $('#reqDt').datepicker("update",new Date());
            $('#reqDt')[0].setAttribute("value", moment().format("YYYY-MM-DD HH:mm") );
            
            onSearchNew();
            
         }else{
            //Date picker
//             $('#reqDt').datepicker({autoclose: true, language:'ko'});
            $('#startDt').datepicker({autoclose: true, language:'ko'});
            $('#endDt').datepicker({autoclose: true, language:'ko'});
            $('#apprDt').datepicker({autoclose: true, language:'ko'});
            
            onSearch();
         }
      }
      
      function onSearchNew(){
         var me = this;
         var param = {};
          param.siteId= localStorage.siteId;
          param.ptwId= Number(<%=ptwId%>);
         var successCallback = function(data){
            var result = data.body;
            gPtwReq = {
                ptwId : result.id
               ,siteId : localStorage.siteId
               ,reqUserId : localStorage.loginUser
               ,reqUserName : gUserInfo.name
               ,ptwName: result.name
               ,status: ""
            };
            
            var formArray = result.formArray || [];
            for(var idx in formArray){
               var item = formArray[idx];
               item.ptwFormId = item.id;
               delete item.id;
            }
            gPtwDataList = formArray;
            
            me.completeSelectInfo();
            
          }
         mobileUtil.callApi(conf.raycomApiUrl+"ptw/list/detail",param,'post', successCallback);
      }
      
      // 조회
      function onSearch(){
         var me = this;
         
         
         var me = this;
         var param = {};
          param.siteId= localStorage.siteId;
          param.ptwReqId= Number(<%=ptwReqId%>);
         var successCallback = function(data){
            gPtwReq = data.body || {};
            gPtwDataList = gPtwReq.dataArray || [];
            
            for(var idx in gPtwDataList){
               var item = gPtwDataList[idx];
               item.grpCd = (item.property ? (item.property.picture || "") : "");
            }
            
            me.completeSelectInfo();
          }
         mobileUtil.callApi(conf.raycomApiUrl+"ptw/req/list/detail",param,'post', successCallback);
      }
      
      
      function htmlDecode(input){
        var e = document.createElement('textarea');
        e.innerHTML = input;
        // handle case of empty input
        return e.childNodes.length === 0 ? "" : e.childNodes[0].wholeText;
      }
      // 조회 완료
      function completeSelectInfo(){
         var me = this;
         
         // 안전작업(기본정보)
         var ptwReq = gPtwReq; 
         
         // 안전작업(안전조치 요구사항)
         var ptwDataList = gPtwDataList; 
         
//*** 안전작업 기본정보 세팅
         var formEle = $('#form')[0];
         $('._ptwName')[0].innerHTML = ptwReq.ptwName;
         if(ptwReq.title){
            formEle.title.value = ptwReq.title;
         }
         if(ptwReq.reqUserName){
            formEle.reqUserName.value = ptwReq.reqUserName + (ptwReq.vendorName?"/"+ptwReq.vendorName : "");
         }
         
         
         //양식등록 여부에 따른 화면 표시
         if(ptwReq.reqLocationYn == "N"){
        	 $("#reqLocationDiv").css("display","none");
         }
         if(ptwReq.workerCntYn == "N"){
        	 $("#workerCntDiv").css("display","none");
         }
         if(ptwReq.workerMinCountYn == "N"){
        	 $("#workerMinCountDiv").css("display","none");
         }
         if(ptwReq.reqWorkerJobYn == "N"){
        	 $("#reqWorkerJobDiv").css("display","none");
         }
       //작업허가제 추가된 항목
       //작업책임자
         if(ptwReq.repWorkerName){
            formEle.repWorkerName.value = ptwReq.repWorkerName;
         }
         //작업 위치
         if(ptwReq.reqLocation){
            formEle.reqLocation.value = ptwReq.reqLocation;
         }
         //작업자 수
         if(ptwReq.workerCnt){
            formEle.workerCnt.value = ptwReq.workerCnt;
         }
         //최소 작업자수
         if(ptwReq.workerMinCount){
            formEle.minWorkerCnt.value = ptwReq.minWorkerCnt;
         }
         //필수인력-필수직종
         if(ptwReq && ptwReq.essWorkerList && ptwReq.essWorkerList.length > 0){
        	 for (var i = gComboWorkerList.length-1 ; i >= 0; i-- ){
        		 if(!ptwReq.essWorkerList.includes(gComboWorkerList[i].id)){
        			 $("#reqWorkerJob option")[i].remove();
        		 }
        	 } 
         }
         
         if(ptwReq.reqDt){
            formEle.reqDt.value = moment(ptwReq.reqDt).format("YYYY-MM-DD HH:mm");
//             $('#reqDt').datepicker("update", moment(ptwReq.reqDt).format("YYYY-MM-DD") );
         }
         if(ptwReq.startDt){
            $('#startDt').datepicker("update", moment(ptwReq.startDt).format("YYYY-MM-DD") );
         }
         if(ptwReq.startHr){
            formEle.startHr.value = ptwReq.startHr;
         }
         if(ptwReq.endDt){
            $('#endDt').datepicker("update", moment(ptwReq.endDt).format("YYYY-MM-DD") );
         }
         if(ptwReq.endHr){
            formEle.endHr.value = ptwReq.endHr;
         }
         if(ptwReq.apprDt){
            formEle.apprDt.value = moment(ptwReq.apprDt).format("YYYY-MM-DD HH:mm");
//             $('#apprDt').datepicker("update", moment(ptwReq.apprDt).format("YYYY-MM-DD") );
         }
         if(ptwReq.opinion){
            formEle.opinion.value = ptwReq.opinion;
         }
         
         var statusName = "";
         if(ptwReq.status == "temp"){
            statusName = "임시저장";
         }else if(ptwReq.status == "request"){
            statusName = "신청";
         }else if(ptwReq.status == "approval"){
            statusName = "승인";
         }else if(ptwReq.status == "return"){
            statusName = "반려";
         }
         formEle.statusName.value = statusName;
         
//*** 안전작업 요구사항 목록 세팅
         var listBox = $('._ptw-list-box')[0];
         
         for(var idx in ptwDataList){
            var index = Number(idx)+1;
            var item = ptwDataList[idx];
            
            var boxDiv = document.createElement("div");
            boxDiv.classList.add("box-body");
            
            // GROUP1
            var groupDiv1 = document.createElement("div");
            groupDiv1.classList.add("form-group");
            
            var titleBgDiv1 = document.createElement("div");
            titleBgDiv1.classList.add("callout");
            titleBgDiv1.classList.add("callout-success");
            
            var labelDiv1 = document.createElement("label");
            labelDiv1.innerHTML = index + ". " + (item.ptwFormName || item.name);
            
            // group1 append
            titleBgDiv1.appendChild(labelDiv1);
            groupDiv1.appendChild(titleBgDiv1);
            
            
            // 추가사진
            var groupDiv0 = null;
            
            if(item.content){
               groupDiv0 = document.createElement("div");
               groupDiv0.classList.add("form-group");
               groupDiv0.setAttribute("id", "picture"+idx);
//                var labelDiv0 = document.createElement("label");
//                labelDiv0.innerHTML = "그림첨부";
               
               
               // group3 append
               groupDiv0.innerHTML = htmlDecode(item.content);
               
               var imgs = groupDiv0.getElementsByTagName("img");
               if(imgs!=null){
                  for(var i=0; i< imgs.length; i++){
                     //if(imgs의 사이즈가 groupDiv 보다 큰 경우에만 width 가 크면){
                     //   imgs[i]의 width 와 groupDiv 의 width 를 잘 살펴서
                     //  이거처럼 비율을 구한다. imgs[i].style.width /groupDiv.style.width
                     //  imgs[i].style.width = imgs[i].style.width*0.3; 
                     //  imgs[i].style.height = imgs[i].style.height*0.3; 
                     //}
                     
                     imgs[i].style.width='auto';
                     imgs[i].style.maxWidth='100%';
                     imgs[i].style.height='auto';
                  }
               }
               
            }
            
            
            
            // GROUP2(확인)
            var groupDiv2 = null;
            
            if(item.checkYn == "Y"){
               groupDiv2 = document.createElement("div");
               groupDiv2.classList.add("form-group");
               
               var labelDiv2 = document.createElement("label");
               labelDiv2.innerHTML = "확인";
               
               var inputDiv2 = document.createElement("input");
               inputDiv2.setAttribute("type", "checkbox");
               inputDiv2.style.marginLeft = "10px";
               inputDiv2.setAttribute("name", idx + "-check");
               if(item.property){
                  inputDiv2.checked = (item.property.check == "Y" ? true : false);
               }
               
               // group2 append
               groupDiv2.appendChild(labelDiv2);
               groupDiv2.appendChild(inputDiv2);
            }
            
            // GROUP3(기록)
            var groupDiv3 = null;
            
            if(item.textYn == "Y"){
               groupDiv3 = document.createElement("div");
               groupDiv3.classList.add("form-group");
               
               var labelDiv3 = document.createElement("label");
               labelDiv3.innerHTML = "기록";
               
               var inputDiv3 = document.createElement("textarea");
               inputDiv3.classList.add("form-control");
               inputDiv3.setAttribute("rows", 5);
               inputDiv3.setAttribute("name", idx + "-text");
               if(item.property){
                  inputDiv3.innerHTML = item.property.text;
               }
               
               // group3 append
               groupDiv3.appendChild(labelDiv3);
               groupDiv3.appendChild(inputDiv3);
            }
            
            // GROUP4(사진)
            var groupDiv4 = null;
            
            if(item.pictureYn == "Y"){
               groupDiv4 = document.createElement("div");
               groupDiv4.classList.add("form-group");
               
               var labelDiv4 = document.createElement("label");
               labelDiv4.innerHTML = "사진";
               
               // group4 append
               groupDiv4.appendChild(labelDiv4);
               
               // 이미지 확인
               var imgList = item.imageArray || [];
               
               if(imgList.length == 0){
                  imgList.push({attFilePath:''});
               }
               
               for(var i in imgList){
                  var imgItem = imgList[i];
                  
                  // 사진 업로드 영역
                  var uploadDiv = document.createElement("div");
                  uploadDiv.setAttribute("data-idx", idx + "-" + i);
                  uploadDiv.classList.add("photo-div");
                  uploadDiv.style.border = "1px solid #eee";
                  uploadDiv.style.marginBottom = "10px";
                  
//                   if(!imgItem.src){
                     var iEle = document.createElement("i");
//                      iEle.classList.add("mailbox-attachment-icon");
                     iEle.classList.add("fa");
                     iEle.classList.add("fa-camera");
                     iEle.style.textAlign = "center";
                     iEle.style.fontSize = "30px";
                     iEle.style.display = "block";
                     iEle.style.margin = "10px";
                     
                     iEle.setAttribute("id", idx + "-" + i);
                     
                     uploadDiv.appendChild(iEle);
//                   }

                  var imgEle = document.createElement("img");
                  imgEle.classList.add("img-responsive");
                  if(imgItem.attFilePath){
                     imgEle.setAttribute("src", "/repository/" + imgItem.attFilePath);
                  }
                  imgEle.setAttribute("id", "img" + "-" + idx + "-" + i);
                  
//                   var fDiv = document.createElement("div");
//                   fDiv.classList.add("mailbox-attachment-info");
//                   var iEle2 = document.createElement("i");
//                   iEle2.classList.add("fa");
//                   iEle2.classList.add("fa-camera");
                  
//                   fDiv.appendChild(iEle2);
//                   var fileNm = document.createTextNode(' ' + item.fileNm);
//                   fDiv.appendChild(fileNm);
                  
                  uploadDiv.appendChild(imgEle);
//                   uploadDiv.appendChild(fDiv);
                  
                  groupDiv4.appendChild(uploadDiv);
               }
               
            }

            // box 
            boxDiv.appendChild(groupDiv1);
            if(groupDiv0){
               boxDiv.appendChild(groupDiv0);
            }
            if(groupDiv2){
               boxDiv.appendChild(groupDiv2);
            }
            if(groupDiv3){
               boxDiv.appendChild(groupDiv3);
            }
            if(groupDiv4){
               boxDiv.appendChild(groupDiv4);
            }
            
            // listBox
            listBox.appendChild(boxDiv);
            if($("#picture"+idx)[0] && $("#picture"+idx)[0].lastChild  && $("#picture"+idx)[0].lastChild.style ){
//             $("#picture"+idx)[0].lastChild.style.width = "100%"; 
            }
         }
         
         // 상태에 따라 버튼 활성화 
         if(ptwReq.status == "" || ptwReq.status == "temp"){
            // 저장,요청 버튼 보임
            $('._saveBtn')[0].style.display = "";
            $('._reqBtn')[0].style.display = "";
            $('._deletePicBtn')[0].style.display = "";
            
            if(ptwReq.status == "temp"){
               $('._deleteBtn')[0].style.display = "";
            }
            
            // 카메라 이미지 클릭시 이벤트 처리
            $(".fa-camera").on('click', function(e){
               var targetId = e.currentTarget.id;
               
               // 첨부그룹코드
               var listIdx = targetId.split('-')[0];
               var grpCd = gPtwDataList[listIdx].grpCd || "";
               
               var param = {
                  grpCd: ""
                  ,targetId: targetId
               };
               
               // native : 갤러리 or 촬영 
               me.getPhotoShoot(param);
               
//                try{
//                   window.LexaApp.getPhotoShoot(grpCd,targetId);
                  
//                }catch(e){
//                   console.log(e);
//                }
            });
            
         }else if(ptwReq.status == "request"){
            // 의견 보임
            $('._ptw-opn-box')[0].style.display = ""; // 의견
            
            $(".box-primary input").attr("disabled", true);
            $(".box-primary textarea").attr("disabled", true);
            $(".box-primary select").attr("disabled", true);
            
            $(".photo-div").css("background-color", "#eee");
            
            // 승인권한목록 & 승인 권한이 있으면, 보이게 처리 
            if("<%= ptwMode %>" == "approval" && gPtwReq.readableYn == "Y"){
               // 승인,반려 버튼 보임
               $('._apprBtn')[0].style.display = "";
               $('._returnBtn')[0].style.display = "";
               
               // 의견 수정 가능하게 처리
               $('._ptw_opinion').attr("disabled", false);
            }
            
         }else{
            // 승인일자, 의견 보임
            $('._sts-group')[0].style.display = "";
            $('._ptw-opn-box')[0].style.display = ""; // 의견
            
            $(".box-primary input").attr("disabled", true);
            $(".box-primary textarea").attr("disabled", true);
            $(".box-primary select").attr("disabled", true);
            
            $(".photo-div").css("background-color", "#eee");
         }
         
         // 첨부파일 클릭시
         $('.img-responsive').on('click', function(e){
            var targetId = e.currentTarget.id;
            
            // 첨부그룹코드
            var listIdx = targetId.split('-')[1];
            var imageArray = gPtwDataList[listIdx].imageArray || "";
            var itemIdx = targetId.split('-')[2];
            var item = imageArray[itemIdx];            
            
            var selectedImg = item || {};
            selectedImg.targetId = targetId;
            
            gSelectedImg = selectedImg;
            
            me.openButton();
         });
         
      }
      
      // Native 사진 기능 선택(갤러리 or 촬영)
      function getPhotoShoot(param){
         try{
            if(checkMobile()=="ios"){
               var message = {  grpCode : param.grpCd, tag:  param.targetId};
               window.webkit.messageHandlers.getPhotoShoot.postMessage(message);
            }else{
               window.LexaApp.getPhotoShoot(param.grpCd, param.targetId);
            }
         }catch(e){
            console.log(e);
         }
      }
      
      // 사진 선택후 처리
      function setAppPhotoFile(callback, tag){
//          window.LexaApp.showToast(callback);
         
         var callbackData = JSON.parse(callback);
         var grpCd = callbackData.body.grp_cd;
         
         // 사진 미리보기
         var picFilePath = callbackData.body.idSetArray[0].path_file_nm + "-xxhdpi";
         var resource = picFilePath;
         resource = resource.split("\\").join("/");
         $("#img-" + tag).attr("src", "/repository/"+resource);
         
         
         // 첨부그룹코드 세팅
         var listIdx = tag.split('-')[0];
         gPtwDataList[listIdx].grpCd = grpCd;
//          gPtwDataList[listIdx].attFilePath = "/repository/" + resource;
         
         var imageArray = gPtwDataList[listIdx].imageArray || [];
         
         if(imageArray.length == 0){
            imageArray.push({
               grpCd: grpCd
               ,attFilePath: picFilePath
            });
         }else{
            imageArray[0].grpCd = grpCd;
            imageArray[0].attFilePath = picFilePath;
         }
         
         gPtwDataList[listIdx].imageArray = imageArray;
      }
      
      // 사진 : 보기 or 삭제 버튼
      function openButton(){
         $('#modal-button').modal();
      }
      
      // 보기버튼 : 사진 상세 보기
      function showPic(){
         $("#picture").attr("src", "/repository/"+ gSelectedImg.attFilePath);
         // 기존에 떠있던 모달은 접는다.
         $("#modal-button").modal("hide");
         $('#modal-picture').modal();
      }
      
      // 삭제버튼 : 사진 삭제
      function deletePic(){
         var param={};
         param.siteId = localStorage.siteId;
         param.grpCd = gSelectedImg.grpCd;
         
         var successCallback = function(data){
            // modal 감춤
            $('#modal-button').modal("hide");
            
            // 이미지 src 초기화
            $("#" + gSelectedImg.targetId)[0].setAttribute("src", "");
          }
         
         // 파일 삭제
         mobileUtil.callApi(conf.raycomApiUrl + "file/remove", param, 'post', successCallback);
      }
      
      // 저장
      function onSave(e){
         var sts = e.dataset.sts;
         gSts = sts;
         
         if( !checkRequired() ){
            return;
         }
         
//          doSave(true);
         
         var confMsg = "저장 하시겠습니까?";
         
         // 저장
         if(sts == "temp"){
            confMsg = "임시저장 하시겠습니까?";
         // 신청
         }else if(sts == "request"){
            confMsg = "신청 하시겠습니까?";
         // 승인
         }else if(sts == "approval"){
            confMsg = "승인 하시겠습니까?";
         // 반려
         }else if(sts == "return"){
            confMsg = "반려 하시겠습니까?";
         }
         
         // confirm 메시지
         
         try{
            if(checkMobile()=="ios"){
               var message = {  message: confMsg , tag : sts };
               window.webkit.messageHandlers.confirmMessage.postMessage(message);
            }else{
               window.LexaApp.confirmMessage(confMsg,sts);
            }
         }catch(e){
            var result = confirm(confMsg);
            if(result){
               returnConfirm(true , sts);
            }else{
               return;
            }
         }
         
      }
      
      function checkRequired(){
         // validation 체크 (필수값 체크)
         var formEle = $('#form')[0];
         
         var msgTitle = "";
         
         // 필수값 메시지 내용
         if(!formEle.title.value){
            msgTitle = "제목";
         
         }else if(!formEle.startDt.value){
            msgTitle = "작업허가기간(시작일자)";
            
         }else if(!formEle.startHr.value){
            msgTitle = "작업허가기간(시작일자)";
            
         }else if(!formEle.endDt.value){
            msgTitle = "작업허가기간(종료일자)";
            
         }else if(!formEle.endHr.value){
            msgTitle = "작업허가기간(종료일자)";
         }
         
         if(msgTitle){
            try{
               if(checkMobile()=="ios"){
                  var message = {  message: msgTitle + "은(는) 필수 정보입니다." };
                  window.webkit.messageHandlers.showToast.postMessage(message);
               }else{
                  window.LexaApp.showToast(msgTitle + "은(는) 필수 정보입니다.");
               }
                }catch(e) {
                   alert(msgTitle + "은(는) 필수 정보입니다.");
                }
            
            return false;
         }
         
         return true;
      }
      
      // result : OK 선택시 true, 그외는 false 전달
      function doSave(bResult){
         // ok인 경우
         if(bResult){
            var formEle = $('#form')[0];
            
            var upsertDataArray = gPtwDataList || [];
            
            for(var idx in upsertDataArray){
               var item = upsertDataArray[idx];
               item.apprConfirmFlag = "N";
               item.property = {
                  picture: item.grpCd || ""
                  ,check: (formEle[idx + '-check'] ? (formEle[idx + '-check'].checked ? "Y" : "N") : "")
                  ,text: (formEle[idx + '-text'] ? formEle[idx + '-text'].value : "")
               };
               
            }
            
            var param = {};
            
            // 저장 or 신청
            if(!gSts || gSts == "temp" || gSts == "request"){
               param = {
                  id: (gPtwReq.id || "")
                  ,ptwId: gPtwReq.ptwId
                  ,siteId: gPtwReq.siteId
                  ,reqUserId: gUserInfo.id
                  ,reqUserType: gUserInfo.userType // "worker", "user"
                  ,title: formEle["title"].value
                  ,reqDt : formEle["reqDt"].value
                  ,startDt : formEle["startDt"].value
                  ,startHr : formEle["startHr"].value
                  ,endDt : formEle["endDt"].value
                  ,endHr : formEle["endHr"].value
                  ,status : gSts
                  ,apprUserId: ""
                  ,apprDt: ""
                  ,opinion: formEle["opinion"].value
                  ,dataArray: upsertDataArray
               };
               
            // 승인 or 반려
            }else{
               param = gPtwReq;
               param.status = gSts;
               param.apprUserId = gUserInfo.id;
               param.apprDt = new Date();
               param.opinion = formEle["opinion"].value;
            }
            
            var successCallback = function(data){
               try{
                  if(checkMobile()=="ios"){
                     var message = {  message: "저장 되었습니다." };
                     window.webkit.messageHandlers.showToast.postMessage(message);
                  }else{
                     window.LexaApp.showToast("저장 되었습니다.");
                  }
                   }catch(e) {
                   alert("저장 되었습니다.");
                   }
                   
                   onBack();
             }
            mobileUtil.callApi(conf.raycomApiUrl+"ptw/req/upsert",param,'post', successCallback);
         }
         
      }
      
      function onDelete(e){
         var confMsg = "삭제 하시겠습니까?";
         
         // confirm 메시지
         try{
            if(checkMobile()=="ios"){
               var message = {  message: confMsg , tag :"ptwDetailDelete"};
               window.webkit.messageHandlers.confirmMessage.postMessage(message);
            }else{
               window.LexaApp.confirmMessage(confMsg , "ptwDetailDelete");
            }
            
             }catch(e) {
                var result = confirm(confMsg);
                if(result){
                   returnConfirm(result , "ptwDetailDelete");
                }else{
                   return;
                }
             }
      }
      
      // result : OK 선택시 true, 그외는 false 전달
      function ptwDetailDeleteConfirm(){
         // ok인 경우
         var paramList = [
            {id: gPtwReq.id, siteId: gPtwReq.siteId}
         ];
         
         var successCallback = function(data){
            try{
               if(checkMobile()=="ios"){
                  var message = {  message: "삭제 되었습니다." };
                  window.webkit.messageHandlers.showToast.postMessage(message);
               }else{
                  window.LexaApp.showToast("삭제 되었습니다.");
               }
                }catch(e) {
                  alert("삭제 되었습니다.");
                }
          }
         mobileUtil.callApi(conf.raycomApiUrl+"ptw/req/remove/array",paramList,'post', successCallback);
      }
      
      // 키보드 입력창을 따로 띄움
      function openKeyboard(param){
         try{
            if(checkMobile()=="ios"){
               var message = { type: "MULTI_LINE", text: $("#"+param.id).val(),  tag: param.id};
               window.webkit.messageHandlers.showInputForm.postMessage(message);
            }else{
               window.LexaApp.showInputForm("MULTI_LINE",$("#"+param.id).val(),param.id);
            }
         }catch(e){
            console.log(e);
         }
      }
      
      function setInputText(text, tag){
         if(tag == "opinion"){
            $("#opinion").html(text);
         }
      }
            
      // 목록 페이지로 이동
      function onBack(e){
         var ptwMode = "<%=ptwMode%>";
         
         if(ptwMode == "approval"){
            $("#movePtwApprList").submit();
            
         }else{
            $("#movePtwList").submit();
         }
         
      }
      
   </script>
   
</body>
</html>