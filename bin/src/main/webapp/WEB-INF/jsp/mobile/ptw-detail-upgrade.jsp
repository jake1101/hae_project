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
   <!-- Select2 -->
   <link rel="stylesheet" href="../../bower_components/select2/dist/css/select2.min.css">
   <!-- SELECT2 -->
   <script src="../../bower_components/select2/dist/js/select2.full.min.js"></script>
   
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
   
   <title>??????????????????</title>
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
   <!-- ????????? ?????? -->
   <script src="../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.ko.js"></script>
   
   <script src="../../dist/js/moment.js"></script>
   
   <script src="../../js/mobileUtil/mobile_util.js"></script>
   
   <style>
      .ptw-title{font-size:18px;font-weight:bold}
      .disabled{pointer-events:none; background:#EEEEEE;}
      
      .content-wrapper, .main-footer {
      	margin-left: 0px;
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
      
      <form id="movePtwList2" action="<c:url value="ptwReqList2.do" />" method="GET" hidden>
         <input type="hidden" name="siteId" id="listSiteId"/>
         <input type="hidden" name="side_bar_type" value="<%=side_bar_type%>"/>
         <input type="hidden" name="backYN" value="Y"/>
         <!-- 211026?????? : ???????????? ?????? -->
         <input type="hidden" name="vendorId" id="listVendorId"/>
         <input type="hidden" name="userToken" id="listUserToken"/>
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
<!-- ???????????? ???????????? -->
             <div class="box box-primary">
                <div class="box-header with-border">
                   <h3 class="_ptwName box-title"></h3>
                  </div>
                  <!-- /.box-header -->
                  
                  <div class="box-body">
                     <div class="form-group">
                        <label style="color:red">[??????] </label>
                        <label>??????</label>
                        <input type="text" class="form-control" name="title" placeholder="????????? ????????? ?????????.">
                     </div>
                     
					<div class="form-group">
                        <label style="color:red">[??????] </label>
                        <label>?????? ?????????</label>
						<select class="_vendorWorkerCombo form-control select2 select2-hidden-accessible"
                     		data-placeholder="???????????? ????????? ?????????" id="reqWorkerJob2" name="reqWorkerJob2" style="width: 100%;" aria-hidden="true">
		                </select>
                     </div>
                     
                     <div class="form-group">
                        <label style="color:red">[??????] </label>
                        <label>??????????????????(????????????)</label>
                        <div class="input-group date">
                           <div class="input-group-addon">
                              <i class="fa fa-calendar"></i>
                           </div>
                           <input type="text" class="form-control pull-right" id="startDt" name="startDt" placeholder="????????? ????????? ?????????." readonly>
                           
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
                        <label style="color:red">[??????] </label>
                        <label>??????????????????(????????????)</label>
                        <div class="input-group date">
                           <div class="input-group-addon">
                              <i class="fa fa-calendar"></i>
                           </div>
                           <input type="text" class="form-control pull-right" id="endDt" name="endDt" placeholder="????????? ????????? ?????????." readonly>
                           
                           <div class="input-group-addon">
                              <i class="fa fa-clock-o glyphicon glyphicon-time"></i>
                           </div>
                           
                           <select class="form-control pull-right" style="min-width:70px" name="endHr">
                              <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12" selected="selected">12</option>
                              <option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option>
                           </select>
                        </div>
                     </div>
                     
                     <!-- ????????????/????????????/??????????????????/??????????????????/?????????????????? -->
                     <div class="form-group" id="reqLocationDiv" style="display:none;">
                     	<label style="color:red">[??????] </label>
                     	<label>?????? ??????</label>
                     	<input type="text" class="form-control" name="reqLocation" placeholder="????????? ????????? ??????????????????">
                     </div>
                     
                     <div class="form-group" id="workerCntDiv" style="display:none;">
                     	<label style="color:red">[??????] </label>
                     	<label>????????? ???</label>
                     	<input type="number" class="form-control" name="workerCnt" placeholder="?????? ???????????? ??????????????????">
                     </div>
                     
                     <div class="form-group" id="workerMinCountDiv" style="display:none;">
                     	<label style="color:red">[??????] </label>
                     	<label>?????? ????????? ???</label>
                     	<input type="number" class="form-control" name="minWorkerCnt" placeholder="?????? ?????? ???????????? ??????????????????">
                     </div>
                     
<!--                      <div class="form-group"> -->
<!--                      	<label style="color:red">[??????] </label> -->
<!--                      	<label>?????? ??????</label> -->
<!--                      	<select class="form-control" multiple> -->
<!--                      		<option>option 1</option> -->
<!-- 		                    <option>option 2</option> -->
<!-- 		                    <option>option 3</option> -->
<!-- 		                    <option>option 4</option> -->
<!-- 		                    <option>option 5</option> -->
<!-- 		                </select> -->
<!--                      </div> -->
                     
                     <div class="form-group" id="reqWorkerJobDiv" style="display:none;">
                     	<label style="color:red">[??????]</label>
                     	<label>?????? ??????</label>
                     	
                     	<select class="_vendorWorkerCombo form-control select2 select2-hidden-accessible" multiple="multiple" 
                     		data-placeholder="???????????? ????????? ?????????" id="reqWorkerJob" name="reqWorkerJob" style="width: 100%;" aria-hidden="true">
		                  <!-- <option>Alabama</option>
		                  <option>Alaska</option>
		                  <option>California</option>
		                  <option>Delaware</option>
		                  <option>Tennessee</option>
		                  <option>Texas</option>
		                  <option>Washington</option> -->
		                </select>

                     </div>
                     
                                          
                     
                     <div class="form-group">
                        <label>?????????/?????????</label>
                        <input type="text" class="form-control" name="reqUserName" readonly>
                     </div>
                     
                     <div class="form-group">
                        <label>????????????</label>
                        <input type="text" class="form-control" id="reqDt" name="reqDt" readonly>
                        
<!--                         <label style="color:red">[??????] </label> -->
<!--                         <label>????????????</label> -->
<!--                         <div class="input-group date"> -->
<!--                            <div class="input-group-addon"> -->
<!--                               <i class="fa fa-calendar"></i> -->
<!--                            </div> -->
<!--                            <input type="text" class="form-control pull-right" id="reqDt" name="reqDt" readonly> -->
<!--                         </div> -->
                     </div>
                     
                     <div class="_sts-group form-group" style="display:none">
                        <label>????????????</label>
                        <input type="text" class="form-control" id="apprDt" name="apprDt" readonly>
                        
<!--                         <div class="input-group date"> -->
<!--                            <div class="input-group-addon"> -->
<!--                               <i class="fa fa-calendar"></i> -->
<!--                            </div> -->
<!--                            <input type="text" class="form-control pull-right" id="apprDt" name="apprDt" disabled> -->
<!--                         </div> -->
                     </div>
                     
                     <div class="form-group">
                        <label>??????</label>
                        <input type="text" class="form-control" name="statusName" readonly>
                     </div>
<!--                   </form> -->
                  </div>
                  <!-- /.box-body -->
              </div>
              <!-- /.box-primary -->
              
<!-- ???????????? ???????????? -->
            <div class="box box-primary">
               <div class="box-header with-border">
                  <h3 class="box-title">???????????? ????????????</h3>
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
                    <h3 class="box-title">??????</h3>
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
               <button type="button" class="_returnBtn btn btn-danger pull-right" style="display:none" data-sts="return" onclick="onSave(this)">??????</button>
               <button type="button" class="_apprBtn btn btn-primary pull-right" style="display:none; margin-right:5px;" data-sts="approval" onclick="onSave(this)">??????</button>
               <button type="button" class="_reqBtn btn btn-success pull-right" style="display:none" data-sts="request" onclick="onSave(this)">??????</button>
               <button type="button" class="_deleteBtn btn btn-danger pull-right" style="display:none; margin-right:5px;" onclick="onDelete(this)">??????</button>
               <button type="button" class="_saveBtn btn btn-primary pull-right" style="display:none; margin-right:5px;" data-sts="temp" onclick="onSave(this)">????????????</button>
               <button type="button" class="btn pull-right" style="margin-right:5px;" onclick="onBack(this)">??????</button>
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
   <!-- ./wrapper -->
   
<div class="modal fade" id="modal-button">
   <div class="modal-dialog" style="width:100%; height: 10%; position:fixed; top:40%;">
      <div class="modal-content" style="background:none;">
         <div class="modal-body" >
            <div id="buttonArea" style="text-align:center">
               <button onclick='showPic()' class='btn btn-default'>??????</button>
               <button onclick='deletePic()' class='_deletePicBtn btn btn-danger' style="display:none">??????</button>
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
      
      function checkMobile(){
    	  var result = mobileUtil.checkMobile();
    	  return result;
      }
      
      $(document).ready(function(){
         var a = "<%=side_bar_type%>";
         $("#appSiteId").val(localStorage.siteId);
         $("#listSiteId").val(localStorage.siteId);
         // 211026?????? : ???????????? ??????
         $("#listVendorId").val(localStorage.vendorId);
         $("#listUserToken").val(localStorage.userToken);
         var date = new Date();
         $("#startDt").val(date_to_str(date).substr(0,10));
         $("#endDt").val(date_to_str(date).substr(0,10)); 
         var formEle = $('#form')[0];
         formEle.startHr.value = 8;
         formEle.endHr.value = 17;
         getUserInfo();
         
         // ?????? : ????????? ?????? ??????
         getVendorWorkerList();
      });
      
      /**
       * ?????? : ??????,????????? ?????? ??????
       */
       function getVendorWorkerList(){
           var param = {siteId : localStorage.siteId, vendorId : localStorage.vendorId};

           var successCallback = function(data){
                   var statusList = data.body || [];

                   	gComboWorkerList = statusList;
					// ???????????????
                   	var vendorWorkerCombo = $('#reqWorkerJob2')[0];
                   	// ?????? ??????
					var vendorWorkerCombo2 = $('#reqWorkerJob')[0];

                   	for(var idx in gComboWorkerList){
                           var item = gComboWorkerList[idx];

                           var optionEle = document.createElement("option");
                           optionEle.setAttribute("value", item.id);
                           optionEle.innerHTML = item.jobTypeName + " - " + item.name;
                           
                           var optionEle2 = document.createElement("option");
                           optionEle2.setAttribute("value", item.id);
                           optionEle2.innerHTML = item.jobTypeName + " - " + item.name;

                           vendorWorkerCombo.appendChild(optionEle);
                           vendorWorkerCombo2.appendChild(optionEle2);
                   	}

                   	// Initialize Select2 Elements
//                 	$('.select2').select2();
                   	$('#reqWorkerJob2').val(data).select2();
                   	$('#reqWorkerJob').val(data).select2();

                   }

           // TEST : "http://192.168.0.4:8088/external/api/v1.5/"
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
         // ??????????????? ?????? : ????????? ?????? ??????/?????? ??????
         var ptwMode = "<%= ptwMode %>";
         
         if(ptwMode == "create"){
            //Date picker
//             $('#reqDt').datepicker({autoclose: true, language:'ko'});
            $('#startDt').datepicker({autoclose: true, language:'ko', startDate: '0d', todayHighlight : true});
            $('#endDt').datepicker({autoclose: true, language:'ko', startDate: '0d', todayHighlight : true});
            $('#apprDt').datepicker({autoclose: true, language:'ko'});
            
            // ???????????? : default ??????
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
               // 211026?????? : ????????????
               ,locYn: result.locYn
               ,workerCntYn: result.workerCntYn
               ,minWorkerYn: result.minWorkerYn
               ,essWorkerYn: result.essWorkerYn
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
      
      // ??????
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
      // ?????? ??????
      function completeSelectInfo(){
         var me = this;
         
         // ????????????(????????????)
         var ptwReq = gPtwReq; 
         
         // 211026?????? : ???????????? ????????? ?????? ?????? ??????
         if(ptwReq.locYn == "Y" || ptwReq.reqLocationYn == "Y"){
        	 $("#reqLocationDiv").css("display","block");
         }
         if(ptwReq.workerCntYn == "Y"){
        	 $("#workerCntDiv").css("display","block");
         }
         if(ptwReq.minWorkerYn == "Y" || ptwReq.workerMinCountYn == "Y"){
        	 $("#workerMinCountDiv").css("display","block");
         }
         if(ptwReq.essWorkerYn == "Y" || ptwReq.reqWorkerJobYn == "Y"){
        	 $("#reqWorkerJobDiv").css("display","block");
         }
         
         // ????????????(???????????? ????????????)
         var ptwDataList = gPtwDataList; 
         
//*** ???????????? ???????????? ??????
         var formEle = $('#form')[0];
         $('._ptwName')[0].innerHTML = ptwReq.ptwName;
         if(ptwReq.title){
            formEle.title.value = ptwReq.title;
         }
         if(ptwReq.reqUserName){
            formEle.reqUserName.value = ptwReq.reqUserName + (ptwReq.vendorName?"/"+ptwReq.vendorName : "");
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
         
         // 211026?????? : ??????????????? ??????
         if(ptwReq.reqLocation){
        	 formEle.reqLocation.value = ptwReq.reqLocation;
         }
         if(ptwReq.workerCnt){
        	 formEle.workerCnt.value = ptwReq.workerCnt;
         }
         if(ptwReq.minWorkerCnt){
        	 formEle.minWorkerCnt.value = ptwReq.minWorkerCnt;
         }
         if(ptwReq.essWorkerList){
        	 $('._vendorWorkerCombo').val(ptwReq.essWorkerList || []);
         }
         
         
         var statusName = "";
         if(ptwReq.status == "temp"){
            statusName = "????????????";
         }else if(ptwReq.status == "request"){
            statusName = "??????";
         }else if(ptwReq.status == "approval"){
            statusName = "??????";
         }else if(ptwReq.status == "return"){
            statusName = "??????";
         }
         formEle.statusName.value = statusName;
         
//*** ???????????? ???????????? ?????? ??????
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
            
            
            // ????????????
            var groupDiv0 = null;
            
            if(item.content){
               groupDiv0 = document.createElement("div");
               groupDiv0.classList.add("form-group");
               groupDiv0.setAttribute("id", "picture"+idx);
//                var labelDiv0 = document.createElement("label");
//                labelDiv0.innerHTML = "????????????";
               
               
               // group3 append
               groupDiv0.innerHTML = htmlDecode(item.content);
               
               var imgs = groupDiv0.getElementsByTagName("img");
               if(imgs!=null){
                  for(var i=0; i< imgs.length; i++){
                     //if(imgs??? ???????????? groupDiv ?????? ??? ???????????? width ??? ??????){
                     //   imgs[i]??? width ??? groupDiv ??? width ??? ??? ?????????
                     //  ???????????? ????????? ?????????. imgs[i].style.width /groupDiv.style.width
                     //  imgs[i].style.width = imgs[i].style.width*0.3; 
                     //  imgs[i].style.height = imgs[i].style.height*0.3; 
                     //}
                     
                     imgs[i].style.width='auto';
                     imgs[i].style.maxWidth='100%';
                     imgs[i].style.height='auto';
                  }
               }
               
            }
            
            
            
            // GROUP2(??????)
            var groupDiv2 = null;
            
            if(item.checkYn == "Y"){
               groupDiv2 = document.createElement("div");
               groupDiv2.classList.add("form-group");
               
               var labelDiv2 = document.createElement("label");
               labelDiv2.innerHTML = "??????";
               
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
            
            // GROUP3(??????)
            var groupDiv3 = null;
            
            if(item.textYn == "Y"){
               groupDiv3 = document.createElement("div");
               groupDiv3.classList.add("form-group");
               
               var labelDiv3 = document.createElement("label");
               labelDiv3.innerHTML = "??????";
               
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
            
            // GROUP4(??????)
            var groupDiv4 = null;
            
            if(item.pictureYn == "Y"){
               groupDiv4 = document.createElement("div");
               groupDiv4.classList.add("form-group");
               
               var labelDiv4 = document.createElement("label");
               labelDiv4.innerHTML = "??????";
               
               // group4 append
               groupDiv4.appendChild(labelDiv4);
               
               // ????????? ??????
               var imgList = item.imageArray || [];
               
               if(imgList.length == 0){
                  imgList.push({attFilePath:''});
               }
               
               for(var i in imgList){
                  var imgItem = imgList[i];
                  
                  // ?????? ????????? ??????
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
         
         // ????????? ?????? ?????? ????????? 
         if(ptwReq.status == "" || ptwReq.status == "temp"){
            // ??????,?????? ?????? ??????
            $('._saveBtn')[0].style.display = "";
            $('._reqBtn')[0].style.display = "";
            $('._deletePicBtn')[0].style.display = "";
            
            if(ptwReq.status == "temp"){
               $('._deleteBtn')[0].style.display = "";
            }
            
            // ????????? ????????? ????????? ????????? ??????
            $(".fa-camera").on('click', function(e){
               var targetId = e.currentTarget.id;
               
               // ??????????????????
               var listIdx = targetId.split('-')[0];
               var grpCd = gPtwDataList[listIdx].grpCd || "";
               
               var param = {
                  grpCd: ""
                  ,targetId: targetId
               };
               
               // native : ????????? or ?????? 
               me.getPhotoShoot(param);
               
//                try{
//                   window.LexaApp.getPhotoShoot(grpCd,targetId);
                  
//                }catch(e){
//                   console.log(e);
//                }
            });
            
         }else if(ptwReq.status == "request"){
            // ?????? ??????
            $('._ptw-opn-box')[0].style.display = ""; // ??????
            
            $(".box-primary input").attr("disabled", true);
            $(".box-primary textarea").attr("disabled", true);
            $(".box-primary select").attr("disabled", true);
            
            $(".photo-div").css("background-color", "#eee");
            
            // ?????????????????? & ?????? ????????? ?????????, ????????? ?????? 
            if("<%= ptwMode %>" == "approval" && gPtwReq.readableYn == "Y"){
               // ??????,?????? ?????? ??????
               $('._apprBtn')[0].style.display = "";
               $('._returnBtn')[0].style.display = "";
               
               // ?????? ?????? ???????????? ??????
               $('._ptw_opinion').attr("disabled", false);
            }
            
         }else{
            // ????????????, ?????? ??????
            $('._sts-group')[0].style.display = "";
            $('._ptw-opn-box')[0].style.display = ""; // ??????
            
            $(".box-primary input").attr("disabled", true);
            $(".box-primary textarea").attr("disabled", true);
            $(".box-primary select").attr("disabled", true);
            
            $(".photo-div").css("background-color", "#eee");
         }
         
         // ???????????? ?????????
         $('.img-responsive').on('click', function(e){
            var targetId = e.currentTarget.id;
            
            // ??????????????????
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
      
      // Native ?????? ?????? ??????(????????? or ??????)
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
      
      // ?????? ????????? ??????
      function setAppPhotoFile(callback, tag){
//          window.LexaApp.showToast(callback);
         
         var callbackData = JSON.parse(callback);
         var grpCd = callbackData.body.grp_cd;
         
         // ?????? ????????????
         var picFilePath = callbackData.body.idSetArray[0].path_file_nm + "-xxhdpi";
         var resource = picFilePath;
         resource = resource.split("\\").join("/");
         $("#img-" + tag).attr("src", "/repository/"+resource);
         
         
         // ?????????????????? ??????
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
      
      // ?????? : ?????? or ?????? ??????
      function openButton(){
         $('#modal-button').modal();
      }
      
      // ???????????? : ?????? ?????? ??????
      function showPic(){
         $("#picture").attr("src", "/repository/"+ gSelectedImg.attFilePath);
         // ????????? ????????? ????????? ?????????.
         $("#modal-button").modal("hide");
         $('#modal-picture').modal();
      }
      
      // ???????????? : ?????? ??????
      function deletePic(){
         var param={};
         param.siteId = localStorage.siteId;
         param.grpCd = gSelectedImg.grpCd;
         
         var successCallback = function(data){
            // modal ??????
            $('#modal-button').modal("hide");
            
            // ????????? src ?????????
            $("#" + gSelectedImg.targetId)[0].setAttribute("src", "");
          }
         
         // ?????? ??????
         mobileUtil.callApi(conf.raycomApiUrl + "file/remove", param, 'post', successCallback);
      }
      
      // ??????
      function onSave(e){
         var sts = e.dataset.sts;
         gSts = sts;
         
         if( !checkRequired() ){
            return;
         }
         
//          doSave(true);
         
         var confMsg = "?????? ???????????????????";
         
         // ??????
         if(sts == "temp"){
            confMsg = "???????????? ???????????????????";
         // ??????
         }else if(sts == "request"){
            confMsg = "?????? ???????????????????";
         // ??????
         }else if(sts == "approval"){
            confMsg = "?????? ???????????????????";
         // ??????
         }else if(sts == "return"){
            confMsg = "?????? ???????????????????";
         }
         
         // confirm ?????????
         
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
         // validation ?????? (????????? ??????)
         var formEle = $('#form')[0];
         
         // ????????????(????????????)
    	 var ptwReq = gPtwReq;
         
         var msgTitle = "";
         
         // ????????? ????????? ??????
         if(!formEle.title.value){
            msgTitle = "??????";
         
         }else if(!formEle.startDt.value){
            msgTitle = "??????????????????(????????????)";
            
         }else if(!formEle.startHr.value){
            msgTitle = "??????????????????(????????????)";
            
         }else if(!formEle.endDt.value){
            msgTitle = "??????????????????(????????????)";
            
         }else if(!formEle.endHr.value){
            msgTitle = "??????????????????(????????????)";
            
         // 211026?????? : ???????????? ????????? ??????
         }else if(ptwReq.locYn == "Y" && !formEle.reqLocation.value){
        	 msgTitle = "?????? ??????";
        	 
         }else if(ptwReq.workerCntYn == "Y" && !formEle.workerCnt.value){
        	 msgTitle = "????????? ???";
        	 
         }else if(ptwReq.minWorkerYn == "Y" && !formEle.minWorkerCnt.value){
        	 msgTitle = "?????? ????????? ???";
        	 
         }else if(ptwReq.essWorkerYn == "Y" && $('._vendorWorkerCombo').val().length == 0 ){
        	 msgTitle = "?????? ??????";
        	 
         }
                  
         if(msgTitle){
            try{
               if(checkMobile()=="ios"){
                  var message = {  message: msgTitle + "???(???) ?????? ???????????????." };
                  window.webkit.messageHandlers.showToast.postMessage(message);
               }else{
                  window.LexaApp.showToast(msgTitle + "???(???) ?????? ???????????????.");
               }
                }catch(e) {
                   alert(msgTitle + "???(???) ?????? ???????????????.");
                }
            
            return false;
         }
         
         return true;
      }
      
      // result : OK ????????? true, ????????? false ??????
      function doSave(bResult){
         // ok??? ??????
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
            
            // ?????? or ??????
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
                  // 211026?????? : ?????? ?????? ??????
                  ,reqLocation: formEle["reqLocation"].value
                  ,workerCnt: formEle["workerCnt"].value
                  ,minWorkerCnt: formEle["minWorkerCnt"].value
                  // 2021-12-7 jh.Park ?????? ????????? ?????? ??? ?????? ?????? ?????? ??????????????? ??????
                  ,repWorkerId : $("#reqWorkerJob2").val()
                  ,essWorkerList: $('#reqWorkerJob').val() // ?????? ?????? : ????????? ???????????? ?????????
               };
               
            // ?????? or ??????
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
                     var message = {  message: "?????? ???????????????." };
                     window.webkit.messageHandlers.showToast.postMessage(message);
                  }else{
                     window.LexaApp.showToast("?????? ???????????????.");
                  }
                   }catch(e) {
                   alert("?????? ???????????????.");
                   }
                   
                   onBack();
             }
            mobileUtil.callApi(conf.raycomApiUrl+"ptw/req/upsert",param,'post', successCallback);
         }
         
      }
      
      function onDelete(e){
         var confMsg = "?????? ???????????????????";
         
         // confirm ?????????
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
      
      // result : OK ????????? true, ????????? false ??????
      function ptwDetailDeleteConfirm(){
         // ok??? ??????
         var paramList = [
            {id: gPtwReq.id, siteId: gPtwReq.siteId}
         ];
         
         var successCallback = function(data){
            try{
               if(checkMobile()=="ios"){
                  var message = {  message: "?????? ???????????????." };
                  window.webkit.messageHandlers.showToast.postMessage(message);
               }else{
                  window.LexaApp.showToast("?????? ???????????????.");
               }
                }catch(e) {
                  alert("?????? ???????????????.");
                }
          }
         mobileUtil.callApi(conf.raycomApiUrl+"ptw/req/remove/array",paramList,'post', successCallback);
      }
      
      // ????????? ???????????? ?????? ??????
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
            
      // ?????? ???????????? ??????
      function onBack(e){
         var ptwMode = "<%=ptwMode%>";
         
         if(ptwMode == "approval"){
            $("#movePtwApprList").submit();
            
         }else{ 
            $("#movePtwList2").submit();
         }
         
      }
      
// sidebar.jsp??? ?????? ?????? ??????
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
   </script>
   
</body>
</html>