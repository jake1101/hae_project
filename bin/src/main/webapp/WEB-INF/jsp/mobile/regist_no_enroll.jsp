<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String workerId = (String)request.getParameter("worker_id"); %>
<% String workerName = (String)request.getParameter("worker_name"); %>
<% String birthDt = (String)request.getParameter("birth_dt"); %>
<% String phoneNumber = (String)request.getParameter("phone_number"); %>
<% String vendorId = (String)request.getParameter("vendor_id"); %>
<% String jobTypeId = (String)request.getParameter("jobtype_id"); %>


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
	
	<!-- bootstrap datepicker -->
	<script src="../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
	<!-- ????????? ?????? -->
	<script src="../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.ko.js"></script>
  
	
	<link rel="stylesheet" href="../../css/tablet.css">
	<style>
	.table-bordered>thead>tr>th, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>tbody>tr>td, .table-bordered>tfoot>tr>td{padding-left:10px; overflow: hidden;}
	th{background-color: #fee6e1;}
	.selectedDiv {
		   height : auto;
		}
	</style>
	<script type="text/javascript">
	</script>
</head>

<body class="hold-transition skin-blue sidebar-collapse sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">

  <header class="main-header">
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      </a>
      <a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 3px;
   			 font-family: fontAwesome; color:white">
        	 ?????? ????????? ?????? 
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
    <section class="content" id="section1">
     	<!-- Default box -->
        <div class="box-body" >
         <div class="box box-info">
        	<div class="box">
				<h2 class="tt_8" style="padding-bottom: 20px;">?????? ????????? ??????</h2>
	            <!-- /.box-header -->
	            <div >
	              <table class="table table-bordered">
	              	<colgroup>
		               <col style="width:30%">
		               <col style="width:70%">
		           </colgroup>
	                <tr>
	                   <th>?????? <span style="color:red ; font-size:12px;">*</span></th>
		                <td>
		               <input type="text" class="form-control" id="name" value="<%=workerName%>">
		                </td>
					 <tr>	
		             </tr>   								
		                <th>???????????? <span style="color:red ; font-size:12px;">*</span></th>
		                <td>
		               <div class="input-group" style="width:100%;">
							<select id="birthdayYear" class="form-control"  style="width: 39%; margin-right:1%;" onchange="changeYear()">
							</select>
				          	<select id="birthdayMonth" class="form-control" style="width: 29%; margin-right:1%;" onchange="changeMonth()">
							</select>
				          	<select id="birthdayDay" class="form-control"  style="width: 30%;">
							</select>
				       	</div>
		                </td>	
	                </tr>
	                <tr>
	                    <th>????????????<span style="color:red ; font-size:12px;">*</span></th>
		                <td>
		               	<input type="number" class="form-control" id="workerTag" placeholder="????????? ??? ????????? ????????????. ?????? 4?????? ??????">
		                </td>								
		            <tr>	
		            </tr>    								
		                <th>????????? <span style="color:red ; font-size:12px;">*</span></th>
		                <td>
<%-- 		               <input type="text" class="form-control" id="phoneNumber" value="<%=phoneNumber%>"> --%>
			            <select id="firstNum" class="form-control"  style="width: 33%; margin-right:1%; float:left">
			          		<option value="010">010</option>
			          		<option value="011">011</option>
			          		<option value="016">016</option>
			          		<option value="017">017</option>
			          		<option value="018">018</option>
			          		<option value="019">019</option>
						</select>
			            <input type="number" class="form-control" id="secNum"  maxlength="4" style="width: 32%; margin-right:1%;  float:left;"  oninput="maxLengthCheck(this)"/>
			            <input type="number" class="form-control" id="thirdNum"    maxlength="4" style="width: 33%; float:left;"  oninput="maxLengthCheck(this)"/>
		                </td>	
	                </tr>
	                <tr>
	                   <th>?????????</th>
		                <td>
<!-- 		               <input type="text" class="form-control" id="bloodType"> -->
		                <select id="bloodType" class="form-control selectBlood">
						</select>
		                </td>								
		            <tr>	
		            </tr> 								
		                <th>???????????????</th>
		                <td>
		               <input type="text" class="form-control" id="emergencyNumber">
		                </td>	
	                </tr>
	                <tr>
	                   <th>??????????????? <span style="color:red ; font-size:12px;">*</span></th>
		                <td>
<!-- 		               <input type="text" class="form-control" id="VendorName"> -->
						<select id="vendorId" class="form-control selectVendor">
						</select>
		                </td>								
		            <tr>	
		            </tr> 								
		                <th>?????? <span style="color:red ; font-size:12px;">*</span></th>
		                <td>
<!-- 		               <input type="text" class="form-control" id="jobTypeName"> -->
						<select id="jobTypeId" class="form-control selectJobType">
						</select>
		                </td>	
	                </tr>
	                <tr>
	                   <th>????????????</th>
		                <td>
		               <input type="text" class="form-control" id="career" onclick='openKeyboard(career)'>
		                </td>								
		            <tr>	
		            </tr> 								
		                <th>???????????????</th>
		                <td>
		               <input type="text" class="form-control" id="beforeWorkPlace" onclick='openKeyboard(beforeWorkPlace)'>
		                </td>	
	                </tr>
	                <tr>
        	            <th>??????</th>
		                <td>
		               	<select id="nation" class="form-control selectNation">
						</select>
		                </td>		
		                <td>
		                </td>						
		                <td>
		                </td>						
	                </tr>
	              </table>
	            </div>
	            <!-- /.box-body -->
	            <div class="box-footer clearfix">
	              <ul class="pagination pagination-sm no-margin pull-right">
	                <li><a onclick="changeNext(1)" style="font-size:18px; background:#bebfc5">1 step</a></li>
	                <li><a onclick="changeNext(2)" style="font-size:18px;">2 step</a></li>
	                <li><a onclick="changeNext(3)" style="font-size:18px;">3 step</a></li>
	                <li><a onclick="changeNext(4)" style="font-size:18px;">4 step</a></li>
	              </ul>
	            </div>
          </div>
          <!-- /.box -->
        	
         </div>
         
		</div>
		<!-- /.box-body -->
	   </section>
	   
	   <section class="content" id="section2" style="display:none">
     	<!-- Default box -->
        <div class="box-body" >
         <div class="box box-info">
        	<div class="box">
	            <div class="box-header with-border">
	             <h3 class="box-title">?????? ????????? ??????</h3>
	            </div>
	            <!-- /.box-header -->
         		<div >
	              <table class="table table-bordered">
	              	<colgroup>
		               <col style="width:200px">
		               <col>
		               <col style="width:200px">
		               <col>
		           </colgroup>
		           	<tr>
		              <th>??????????????????</th>
		               <td colspan='3'>
						 <div style=" width: 100%;  border: 1px solid gainsboro;  height: 100px;  border-radius: 8px;  background: gainsboro; text-align:center ; vertical-align:middle" 
						 id="etcFileGrpCode">
								 <image id="etcFileGrpCodeImg" style="width : 90px; height: 90px ; margin-top:5px;" src = "../../img/imgPic.png">
				        </div>
		               </td>								
	                </tr>
	                <tr>
	                   <th>??????</th>
		               <td colspan='3'>
	               		<input type="text" class="form-control" id="address1" onclick='openKeyboard(address1)'>
	               		<input type="text" class="form-control" id="address2" onclick='openKeyboard(address2)'>
	               		<input type="text" class="form-control" id="address3" onclick='openKeyboard(address3)'>
		               </td>								
	                </tr>
	                <tr>
	                   <th>????????????</th>
		               <td colspan='3'>
			                <label>
			                	???		
			                  <input type="checkbox" id="fatherYn" class="minimal" >
			                </label>
			                <label>
			                	???
			                  <input type="checkbox" id="motherYn" class="minimal">
			                </label>
			                &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
			                <label>
			                	??????
			                  <input type="radio" name="marryYn" class="minimal" data="Y" checked>
			                </label>
			                <label>
			                	??????
			                  <input type="radio" name="marryYn" class="minimal" data="N" >
			                </label>
		               </td>								
	                </tr>
	              </table>
	            </div>
	            <!-- /.box-body -->
	           <div class="box-footer clearfix">
	              <ul class="pagination pagination-sm no-margin pull-right">
	                <li><a onclick="changeNext(1)" style="font-size:18px;">1 step</a></li>
	                <li><a onclick="changeNext(2)" style="font-size:18px; background:#bebfc5;">2 step</a></li>
	                <li><a onclick="changeNext(3)" style="font-size:18px;">3 step</a></li>
	                <li><a onclick="changeNext(4)" style="font-size:18px;">4 step</a></li>
	              </ul>
	            </div>
         </div>
         
		</div>
		<!-- /.box-body -->
	   </section>
	   
	   
	   <section class="content" id="section3" style="display:none">
     	<!-- Default box -->
        <div class="box-body" >
         <div class="box box-info">
        	<div class="box">
	            <div class="box-header with-border">
	             <h3 class="box-title">?????? ????????? ??????</h3>
	            </div>
	            <!-- /.box-header -->
         		<div>
	              <table class="table table-bordered">
	              	<colgroup>
		               <col style="width:200px">
		               <col>
		               <col style="width:200px">
		               <col>
		           </colgroup>
		           <tr>
	                   <th>??????????????? ????????????</th>
		               <td colspan='3' id='protectList'>
		               </td>								
	                </tr>
	                <tr>
	                   <th>??????</th>
		               <td colspan='3'>
						<div style=" width: 100%;  border: 1px solid gainsboro; vertical-align:middle;  height: 100px;  border-radius: 8px;  background: gainsboro; text-align : center;"
							id="protectionSignatureGrpCode">
								<image id="protectSignImg" style = "width : 90px; height: 90px; margin-top:5px;"src = "../../img/imgPic.png">
				        </div>
		               </td>								
	                </tr>
	                <tr>
	                   <th>????????? ?????????</th>
		               <td colspan='3'>
		               <div class="input-group" style="width : 100%">
	               		<div type="text" class="form-control " id="pledge" style="width:80% ; text-overflow: ellipsis; overflow: hidden;">
							<table style = "margin-top:1%;">
								<tr>
								<td colspan='2'> 1.?????? ???????????? ?????????????????? ?????? ???????????? ?????? ??? ????????? ???????????? ???????????? ????????????, ???????????? ???????????? ???????????? 
  ?????? ???????????? ?????? ????????? ????????? ????????? ??????.<br>
2.?????? ??????????????? ????????? ????????? ?????????, ??????????????????????????? ?????? ????????? ????????????????????? ??????.<br>
3.?????? ??? ??????????????? ????????? ?????????, ???????????? ????????? ??????????????? ?????? ????????????. <br>
4.????????? ??????????????? ????????? ????????? ?????? ???,???,??? ???????????? ????????? ????????????.<br>
5.????????? ????????? ????????? ????????? ????????????, ???????????? ??? ????????? ?????? ?????????.<br>
6.?????????????????????????????? ???????????? ??? ?????????????????? ????????? ???????????? ?????????. <br>
7.????????? ?????????, ?????? ?????? ??????????????? ????????? ???????????? ?????????.<br>
8.?????? ????????? ?????? ???????????? ??? ??????????????? ???????????? ?????????????????? ?????? ?????????.<br>
9. ???????????? ????????? ?????????(??????, ????????? ????????????) ??? 3??? ?????????(????????????)????????? ????????????.<br>

 ??? ????????? ?????? ????????? ????????? ?????????????????????????????? ????????? ????????????????????????(?????????????????????,???????????????) ??? ????????? 
 ???????????? ?????????.</td>
								</tr>	
								<tr >
								<td style=" border:1px solid black">
 ???????????????????????? ???6??? ???????????? ??????
   ???????????? ????????? ????????? ?????? ???????????? ????????? ????????????????????? 
  ?????? ????????? ??????????????? ??????, ????????? ?????? ?????? ???????????? ??????
  ?????? ???????????????  ????????? ?????? ????????? ????????? ??????.
								</td>
								<td style=" border:1px solid black">
???????????????????????? ???25??? ???????????? ????????????
   ???????????? ??? ???23??? ??? ???24?????? ????????? ????????? ???????????? ?????? ??????
  ?????? ??????????????? ????????? ????????? ??????????????? ??????.
   ??? 300?????? ????????? ?????????
								</td>
								</tr>						
							</table>
	               		</div>
	               		<button type="submit" name="search" id="search-btn" class="btn btn-flat"  style="background-color:#3c8dbc"
	               					onclick = "openDiv(pledge)">
	               					
	               		????????????
		                </button>
		                </div>
		               </td>								
	                </tr>
	                <tr>
	                   <th>???????????? ?????? ??? ?????????</th>
		               <td colspan='3'>
	               		<div class="input-group" style="width : 100%">
	               		<div type="text" class="form-control " id="agreement" style="width:80% ; text-overflow: ellipsis; overflow: hidden;">
	               		<table style = "margin-top:1%;">
								<tr>
									<td colspan='2'> 
	????????? ????????????????????? ???25??? ??? ???24?????? ?????? ????????? ??????????????? ??????, ??????????????? ??????????????? ??????????????? ??????, ???????????? ?????? ????????? ?????? ???????????????.<br>
	??? ??????????????? ??????, ?????? ??????
	  ????????????, ??????????????? ?????? ?????? ?????? ??????, ??????????????? ??????????????? ??? ??????????????? ?????? ??? ?????? ??????, ???????????? ??????<br>
	??? ??????????????? ?????? ??? ???????????? : ?????????????????? ???????????? ??? 3??? <br>
	??? ?????? ?????? ?????? ?????? ??? ??????<br><br>
	 1. ???????????? ??????[??????, ????????????, ??????, ????????????, ?????????, ??????????????? ???]
									</td>
								</tr>
								<tr style=" border:1px solid black ; padding:5px;">
									<td  style=" padding:5px;">
	?????????????????? ?????????  <input type="radio" name= "personnelYn" class="minimal" data="Y">
									</td>
									<td>
	?????????????????? ???????????? ??????  <input type="radio" name= "personnelYn" class="minimal" data="N">
									</td>
								</tr>
								<tr>
									<td colspan='2'>
 2. ???????????? ????????????????????? ?????? [1)????????????,  2)?????????????????????]
									</td>
								</tr>	
								<tr style=" border:1px solid black">
									<td style=" padding:5px;">
	?????????????????? ?????????  <input type="radio" name= "identificationYn" class="minimal" data="Y">
									</td>
									<td>
	?????????????????? ???????????? ??????  <input type="radio" name= "identificationYn" class="minimal" data="N">
									</td>
								</tr>
								<tr>
									<td colspan='2'><br>
??? ???????????? ?????? ?????? ?????? ?????? <br>
?????? ????????? ???????????? ????????? ?????? ????????? ????????? ?????????, ????????? ??????????????? ??????????????? ????????? ???????????? ?????? ??? ????????? ??????, ????????????, ??????????????? ?????? ????????? ???????????? ?????? ?????? ????????????, ??????????????? ????????? ??? ????????? ?????? ?????? ?????? ?????? ??? ????????? ???????????????.
									</td>
								</tr>					
							</table>
	               		
	               		
	               		
	               		</div>
	               		<button type="submit" name="search" id="search-btn" class="btn btn-flat"  style="background-color:#3c8dbc"
	               			onclick = "openDiv(agreement)">
	               		????????????
		                </button>
		                </div>
		               </td>								
	                </tr>
	                <tr>
		              <th>????????? ????????????</th>
		               <td colspan='3'>
						 <div style=" width: 100%;  border: 1px solid gainsboro;  height: 100px;  border-radius: 8px;  background: gainsboro; text-align:center ; vertical-align:middle" 
						 id="workerFaceGrpCode">
								 <image id="workerFaceImg" style="width : 90px; height: 90px ; margin-top:5px;" src = "../../img/imgPic.png">
				        </div>
		               </td>								
	                </tr>
	              </table>
	            </div>
	            <!-- /.box-body -->
	            <div class="box-footer clearfix">
	              <ul class="pagination pagination-sm no-margin pull-right">
	                <li><a onclick="changeNext(1)" style="font-size:18px;">1 step</a></li>
	                <li><a onclick="changeNext(2)" style="font-size:18px;">2 step</a></li>
	                <li><a onclick="changeNext(3)" style="font-size:18px; background:#bebfc5;">3 step</a></li>
	                <li><a onclick="changeNext(4)" style="font-size:18px;">4 step</a></li>
	              </ul>
	            </div>
         </div>
         
		</div>
		<!-- /.box-body -->
	   </section>
    <!-- /.content -->
    
    
    
    <section class="content" id="section4" style="display:none">
     	<!-- Default box -->
        <div class="box-body" >
         <div class="box box-info">
        	<div class="box">
	            <div class="box-header with-border">
	             <h3 class="box-title">?????? ????????? ??????</h3>
	            </div>
	            <!-- /.box-header -->
         		<div >
	              <table class="table table-bordered">
	              	<colgroup>
		               <col style="width:50%">
		               <col style="width:50%">
		           </colgroup>
	                <tr>
		                <td colspan="2">
		                ??? ???????????? ???????????? ???????????? ???????????? ??? ??????????????? ???????????? ?????????????????????(???6??? ???????????? ??????, ???25??? ????????? 
    ????????????)??? ???????????? ??????????????? ??????????????? ???????????? ?????? ??????????????? ?????????????????? ????????? ?????? ????????? ?????????, ??????
    ????????? ????????? ???????????? ???????????????.
		                </td>
	                </tr>
	                <tr>
	                	<td>
	                	 ?????????????????? ?????? ??????  <input id="safeEducationYn" type="checkbox" class="minimal"> 
	                	 <div class="input-group date"  style="width: 100%; float: left">
						  <div class="input-group-addon">
							<i class="fa fa-calendar"></i>
						  </div>
						  <input type="text" class="form-control pull-right" id="datepicker2" readonly >
					    </div>
	                	</td>
	                	<td>
		                	????????????  
		                	<div class="input-group date"  style="width: 100%; float: left">
							  <div class="input-group-addon">
								<i class="fa fa-calendar"></i>
							  </div>
							  <input type="text" class="form-control pull-right" id="datepicker3" readonly >
						    </div>
	                	</td>
	                </tr>
	                <tr>
	                	<th>
	                	 ??? ?????? ?????? ?????????<br>
              		   <div class="input-group">
				           	<span class="input-group-addon">?????? ?????????</span>
				        	<input type="text" class="form-control" id="educatorCompanyName" onclick='openKeyboard(educatorCompanyName)'>
				        </div>
<!-- 				       <div style=" width: 100%;  border: 1px solid gainsboro;  height: 100px;  border-radius: 8px;  background: gainsboro;  -->
<!-- 				       	text-align:center ; vertical-align:middle; margin-top: 3px;"  id="educatorSignatureGrpCode"> -->
<!-- 								 <image id="educatorSignImg" style="width:90px; height : 90px; margin-top:5px;" src = "../../img/imgPic.png"> -->
<!-- 				        </div> -->
	                	</th>
	                	<th>
						 ??? ?????????<br>
						 <div class="input-group">
				           	<span class="input-group-addon">??????</span>
				        	<input type="text" class="form-control" id="workerName" value="<%=workerName%>" onclick='openKeyboard(workerName)'> 
				        </div>
<!-- 				       <div style=" width: 100%;  border: 1px solid gainsboro;  height: 100px;  border-radius: 8px;  -->
<!-- 				       		text-align:center ; vertical-align:middle; background: gainsboro; margin-top: 3px;"	id="workerSignatureGrpCode"> -->
<!-- 				       			<image id="workerSignImg" style="width:90px; height : 90px; margin-top:5px;" src = "../../img/imgPic.png"> -->
<!-- 				        </div> -->
	                	</th>
	                </tr>
	              </table>
	            </div>
	            <!-- /.box-body -->
	            <div class="box-footer clearfix">
	              <ul class="pagination pagination-sm no-margin pull-right">
	                <li><a onclick="changeNext(1)" style="font-size:18px;">1 step</a></li>
	                <li><a onclick="changeNext(2)" style="font-size:18px;">2 step</a></li>
	                <li><a onclick="changeNext(3)" style="font-size:18px;">3 step</a></li>
	                <li><a onclick="changeNext(4)" style="font-size:18px; background:#bebfc5;">4 step</a></li>
	              </ul>
	            </div>
         </div>
         	
		</div>
		<!-- /.box-body -->
	    <div	style="text-align:center">
       	 <button type="button" id="complete" onclick="ApiEnroll()" class="btn btn-default btn-info">??????</button>
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
   <form name="resgistSuccess" id="resgistSuccess">
  	  <input type="hidden"  name="code" id="f_code">
  	  <input type="hidden"  name="worker_name" id="f_worker_name">
  	  <input type="hidden"  name="phone_number" id="f_phone_number">
  	  <input type="hidden"  name="doc_number" id="f_doc_number">
	  <sec:csrfInput/>
  </form>	
</div>

<footer class="footer_wrap">
  Copyright &copy; (???)??????.All rights reserved.
</footer>

<!-- ./wrapper -->


<div class="modal fade" id="modal-button">
   <div class="modal-dialog" style="width:100%; height: 10%; position:fixed; bottom:0px;">
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
 <!-- /.modal -->  
 <div class="modal fade" id="modal-picture">
  <div class="modal-dialog">
    <div class="modal-content" style="height:80%;">
      <div class="modal-body" style="height:100%; overflow: scroll;">
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
<script>

// $(document).ajaxStart(function () {
//    Pace.restart()
//  })


$(document).ready(function(){
	start();
	
	//Date picker
	$('#datepicker').datepicker({autoclose: true, language:'ko',  todayHighlight : true})  
	
	$('#datepicker2').datepicker({autoclose: true, language:'ko',  todayHighlight : true})  
	$('#datepicker3').datepicker({autoclose: true, language:'ko', todayHighlight : true})  
<%-- 	if("<%=birthDt%>" == ""){ --%>
// 		$('#datepicker').datepicker("update",new Date(1970,0,1));
// 	}else{
<%-- 		$('#datepicker').datepicker("update",new Date("<%=birthDt%>")); --%>
// 	}
	$('#datepicker2').datepicker("update",new Date());
	$('#datepicker3').datepicker("update",new Date());
	
	$("#protectionSignatureGrpCode").click(function(){
		try{
			if(checkMobile()=="ios"){
				var message = {  tag: "protectionSignatureGrpCode"};
				window.webkit.messageHandlers.getSignature.postMessage(message);
			}else{
				window.LexaApp.getSignature("protectionSignatureGrpCode"); 
			}
		}catch(e){
			console.log(e);
		}
	})// end of click
	$("#educatorSignatureGrpCode").click(function(){
		try{
			if(checkMobile()=="ios"){
				var message = {  tag: "educatorSignatureGrpCode"};
				window.webkit.messageHandlers.getSignature.postMessage(message);
			}else{
				window.LexaApp.getSignature("educatorSignatureGrpCode");
			}
		}catch(e){
			console.log(e);
		}
	})// end of click
	$("#workerSignatureGrpCode").click(function(){
		try{
			if(checkMobile()=="ios"){
				var message = {  tag: "workerSignatureGrpCode"};
				window.webkit.messageHandlers.getSignature.postMessage(message);
			}else{
				window.LexaApp.getSignature("workerSignatureGrpCode");
			}
		}catch(e){
			console.log(e);
		}
	})// end of click
	$("#workerFaceGrpCode").click(function(){
		if(!$("#workerFaceGrpCode").attr("data") || $("#workerFaceGrpCode").attr("data")== ""){
			try{
				if(checkMobile()=="ios"){
					var message = {  grpCode : null, tag: "workerFaceGrpCode"};
					window.webkit.messageHandlers.getPhotoShoot.postMessage(message);
				}else{
					window.LexaApp.getPhotoShoot(null,"workerFaceGrpCode");
				}
			}catch(e){
				console.log(e);
			}
		}else{
			openButton("workerFaceGrpCode");
		}
	})// end of click
	$("#etcFileGrpCode").click(function(){
		
		if(!$("#etcFileGrpCode").attr("data") || $("#etcFileGrpCode").attr("data")== ""){
			try{
				if(checkMobile()=="ios"){
					var message = {  grpCode : null, tag: "etcFileGrpCode"};
					window.webkit.messageHandlers.getPhotoShoot.postMessage(message);
				}else{
					window.LexaApp.getPhotoShoot(null,"etcFileGrpCode");
				}
			}catch(e){
				console.log(e);
			}
		}else{
			openButton("etcFileGrpCode");
		}
		
	})// end of click
	
	var phoneNumber = "<%=phoneNumber%>";
	
	var firstNum = phoneNumber.substr(0,3);
	var secNum = phoneNumber.substr(3,4);
	var thirdNum = phoneNumber.substr(7,4);
	
	$("#firstNum").val(firstNum);
	$("#secNum").val(secNum);
	$("#thirdNum").val(thirdNum);
	
	var yearList = [];
	var monthList = [];
	var dayList = [];
	var year =new Date().getFullYear();
	for(var i =1930 ; i<= year ; i++){
		yearList.push(i + "???");
	}
	
	for(var i = 1 ; i<=12 ; i ++){
		monthList.push(i + "???");
	}
	for(var i = 1 ; i<=31 ; i ++){
		dayList.push(i + "???");
	}
	
	
	for(var i = 0 ; i < yearList.length ; i++){
           $('#birthdayYear').append( $("<option>"+yearList[i]+"</option>"));
           $("#birthdayYear option:eq("+(i)+")").attr("value",yearList[i]);
	}
	for(var i = 0 ; i < monthList.length ; i++){
           $('#birthdayMonth').append( $("<option>"+monthList[i]+"</option>"));
           $("#birthdayMonth option:eq("+(i)+")").attr("value",monthList[i]);
	}
	for(var i = 0 ; i < dayList.length ; i++){
           $('#birthdayDay').append( $("<option>"+dayList[i]+"</option>"));
           $("#birthdayDay option:eq("+(i)+")").attr("value",dayList[i]);
	}
	
	if("<%=birthDt%>" == ""){
		$("#birthdayYear").val("1930???");
		$("#birthdayMonth").val("1???");
		$("#birthdayDay").val("1???");
	}else{
		var year = new Date("<%=birthDt%>").getFullYear();
		var month = new Date("<%=birthDt%>").getMonth() +1;
		var day = new Date("<%=birthDt%>").getDate();
		
		$("#birthdayYear").val(year+"???");
		$("#birthdayMonth").val(month+"???");
		$("#birthdayDay").val(day+"???");
	}
	
	
});


function openButton(param){
	var htmlButton ="";
	htmlButton = "<button onclick='showPic("+param+")' class='btn btn-default'>??????</button> &nbsp" 
	 + "<button  onclick='deletePic("+param+")' class='btn btn-danger'>??????</button>";
	$('#buttonArea').html("");
	$('#modal-button').modal();	
	 
	$('#buttonArea').append(htmlButton);
}

function showPic(param){
	if(param.id == "etcFileGrpCode"){
		var callbackData=JSON.parse($("#etcFileGrpCode").attr("fileNm"));
		var resource = callbackData.body.idSetArray[0].path_file_nm;
		resource = resource.split("\\").join("/");
		$("#picture").attr("src","/repository/"+resource);
	}else if(param.id == "workerFaceGrpCode"){
		var callbackData=JSON.parse($("#workerFaceGrpCode").attr("fileNm"));
		var resource = callbackData.body.idSetArray[0].path_file_nm;
		resource = resource.split("\\").join("/");
		$("#picture").attr("src","/repository/"+resource);
	}
	
	$('#modal-picture').modal();	
}
function deletePic(param){
	var apiParam={};
	apiParam.siteId=localStorage.siteId;
	if(param.id == "etcFileGrpCode"){
		apiParam.grpCd = $("#etcFileGrpCode").attr("data");
	}else if(param.id == "workerFaceGrpCode"){
		apiParam.grpCd = $("#workerFaceGrpCode").attr("data");
	}
	var successCallback = function(data){
		$('#modal-button').modal("hide");
		if(param.id == "etcFileGrpCode"){
			$("#etcFileGrpCodeImg").attr("src","../../img/imgPic.png");
			$("#etcFileGrpCodeImg").attr("data","");
			$("#etcFileGrpCode").attr("data","");
		}else if(param.id == "workerFaceGrpCode"){
			$("#workerFaceImg").attr("src","../../img/imgPic.png");
			$("#workerFaceImg").attr("data","");
			$("#workerFaceGrpCode").attr("data","");
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"file/remove",apiParam,'post', successCallback);
}



function changeYear(){
	$("#birthdayMonth").val("1???");
	changeMonth();
}

function changeMonth(){
	var year = Number($("#birthdayYear").val().substr(0,4));
	var dayList=[];
	var monArr = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	var lastDay;
	var month;
	
	if($("#birthdayMonth").val().length == 2){
		month = Number($("#birthdayMonth").val().substr(0,1));
	}else{
		month = Number($("#birthdayMonth").val().substr(0,2));
	}
	
	if($("#birthdayMonth").val() != "2???"){
		lastDay = monArr[month-1];
	}else{
		if((year%4 == 0 && year%100 !=0) || year%400 == 0){
			lastDay=29;
		}else{
			lastDay=28;
		}
	}
	
	for(var i = 1; i <= lastDay ; i++){
		dayList.push(i+"???");
	}
	 $('#birthdayDay option').remove();
	for(var i = 0 ; i < dayList.length ; i++){
        $('#birthdayDay').append( $("<option>"+dayList[i]+"</option>"));
        $("#birthdayDay option:eq("+(i)+")").attr("value",dayList[i]);
	}
}

function setAppSignature(callback,tag){
	// 1. param??? ?????? ???????????? jsonParse ??????.
	var callbackData = null;
	if(typeof callback == "string"){
		callbackData = JSON.parse(callback);
	}else{
		callbackData = callback;
	}
	// 2. param.body ???????????? ??????, grpCd???, ????????? ??????.
	var grpCd = callbackData.body.grp_cd;
	// 3. grpCd ??? ?????? div ?????? input hidden ??? ????????? ?????? ????????????.
	
	// 4. file_nm ???????????? ????????? ?????? ??????, ????????? ???????????? image ????????? src ??? ???????????? ??????!
	
	if(tag == "protectionSignatureGrpCode"){
		
		$("#protectionSignatureGrpCode").attr("data",grpCd);
		var resource = callbackData.body.idSetArray[0].path_file_nm;
		resource = resource.split("\\").join("/");
		
		$("#protectSignImg").attr("src", "/repository/"+resource);
		$("#protectSignImg").css("width","140px");
		
	}else if(tag == "educatorSignatureGrpCode"){
		
		$("#educatorSignatureGrpCode").attr("data",grpCd);
		var resource = callbackData.body.idSetArray[0].path_file_nm;
		resource = resource.split("\\").join("/");
		$("#educatorSignImg").attr("src", "/repository/"+resource);
		$("#educatorSignImg").css("width","140px");
		
	}else if(tag == "workerSignatureGrpCode"){
		
		$("#workerSignatureGrpCode").attr("data",grpCd);
		var resource = callbackData.body.idSetArray[0].path_file_nm;
		resource = resource.split("\\").join("/");
		$("#workerSignImg").attr("src", "/repository/"+resource);
		$("#workerSignImg").css("width","140px");
	}
}
function setAppPhotoFile(callback,tag){
	var callbackData =JSON.parse(callback);
	var grpCd = callbackData.body.grp_cd;
	if(tag == "workerFaceGrpCode"){
		$("#workerFaceGrpCode").attr("data",grpCd);
		$("#workerFaceGrpCode").attr("fileNm",JSON.stringify(callbackData));
		var resource = callbackData.body.idSetArray[0].path_file_nm + "-xxhdpi";
	// 	var resource = callbackData.body.idSetArray[0].path_file_nm + "-thumb";
		resource = resource.split("\\").join("/");
		$("#workerFaceImg").attr("src", "/repository/"+resource);
		$("#workerFaceImg").css("width","140px");
	}else if(tag == "etcFileGrpCode"){
		$("#etcFileGrpCode").attr("data",grpCd);
		$("#etcFileGrpCode").attr("fileNm",JSON.stringify(callbackData));
		var resource = callbackData.body.idSetArray[0].path_file_nm + "-xxhdpi";
	// 	var resource = callbackData.body.idSetArray[0].path_file_nm + "-thumb";
		resource = resource.split("\\").join("/");
		$("#etcFileGrpCodeImg").attr("src", "/repository/"+resource);
		$("#etcFileGrpCodeImg").css("width","140px");
	}
}

function openDiv(param){
	if($('#'+param.id).hasClass("selectedDiv") === true) {
		$('#'+param.id).removeClass("selectedDiv");
	}else{
		$('#'+param.id).addClass("selectedDiv");
	}
	
}

function changeNext(param){
	if(param == 1){
		$("#section1").css("display","block");
		$("#section2").css("display","none");
		$("#section3").css("display","none");
		$("#section4").css("display","none");
	}else if(param ==2){
		$("#section1").css("display","none");
		$("#section2").css("display","block");
		$("#section3").css("display","none");
		$("#section4").css("display","none");
	}else if(param ==3){
		$("#section1").css("display","none");
		$("#section2").css("display","none");
		$("#section3").css("display","block");
		$("#section4").css("display","none");
	}else if(param ==4){
		$("#section1").css("display","none");
		$("#section2").css("display","none");
		$("#section3").css("display","none");
		$("#section4").css("display","block");
	}
	
}

function onBack(){
	
	try{
		if(checkMobile()=="ios"){
			var message = {  message: "????????? ????????? ?????? ???????????????. ????????? ?????? ???????????? ?????? ???????????????????" , tag : "registNoEnroll" };
			window.webkit.messageHandlers.confirmMessage.postMessage(message);
		}else{
			window.LexaApp.confirmMessage("????????? ????????? ?????? ???????????????. ????????? ?????? ???????????? ?????? ???????????????????","registNoEnroll");
		}
	}catch(e){
		var result = confirm("????????? ????????? ?????? ???????????????. ????????? ?????? ???????????? ?????? ???????????????????");
		if(result){
			window.location.href="/mobile/registNoMapping.do";
		}else{
			return;
		}
	}
	
}
function registNoEnrollConfirm(){
		window.location.href="/mobile/registNoMapping.do";
}

function openKeyboard(param){
	try{
		if(checkMobile()=="ios"){
			var message = { type: "TEXT", text: $("#"+param.id).val(),  tag: param.id };
			window.webkit.messageHandlers.showInputForm.postMessage(message);
		}else{
			window.LexaApp.showInputForm("TEXT",$("#"+param.id).val(),param.id);
		}
	}catch(e){
		console.log(e);
	}
}

function setInputText(text, tag){

	if(tag == "career"){
		$("#career").val(text);
	}else if(tag == "beforeWorkPlace"){
		$("#beforeWorkPlace").val(text);
	}else if(tag == "address1"){
		$("#address1").val(text);
	}else if(tag == "address2"){
		$("#address2").val(text);
	}else if(tag == "address3"){
		$("#address3").val(text);
	}else if(tag == "educatorCompanyName"){
		$("#educatorCompanyName").val(text);
	}else if(tag == "workerName"){
		$("#workerName").val(text);
	}
	
} 
  
  
  
function start(){
	var site_id = null;
	
	var param = {};
	param.siteId=localStorage.siteId;
	findNationList(param);
	findBloodList(param);
	findVendorList(param);
	findJobTypeList(param);
	findProtectList(param);
}

function findNationList(param){
	var successCallback = function(data){
		var responseData = data.body;
		for(var i = 0 ; i < responseData.length ; i++){
			 var nation_id = responseData[i].data;
			 var nation_name = responseData[i].label;
 			
			 $('#nation').append( $("<option>"+nation_name+"</option>"));
	         $("#nation option:eq(0)").attr("selected", "selected");
	         $("#nation option:eq("+i+")").attr("nation_id",nation_id);
	         $("#nation option:eq("+i+")").attr("nation_name",nation_name);
	         $("#nation option:eq("+i+")").attr("value",nation_id);
		}
    }
	param.grpCd='IOT019';
	mobileUtil.callApi(conf.raycomApiUrl+"common/code/list",param,'post', successCallback);
	
}
function findBloodList(param){
	var successCallback = function(data){
		var responseData = data.body;
		for(var i = 0 ; i < responseData.length ; i++){
			 var blood_id = responseData[i].data;
			 var blood_name = responseData[i].label;
 			
		 $('#bloodType').append( $("<option>"+blood_name+"</option>"));
         $("#bloodType option:eq(0)").attr("selected", "selected");
         $("#bloodType option:eq("+i+")").attr("blood_id",blood_id);
         $("#bloodType option:eq("+i+")").attr("blood_name",blood_name);
         $("#bloodType option:eq("+i+")").attr("value",blood_id);
		}
    }
	param.grpCd='IOT020';
	mobileUtil.callApi(conf.raycomApiUrl+"common/code/list",param,'post', successCallback);
}
function findVendorList(param){
	var successCallback = function(data){
		var resultList = data.body;
		for(var i = 0 ; i < resultList.length ; i++){
             $('#vendorId').append( $("<option>"+resultList[i].name+"</option>"));
             $("#vendorId option:eq("+(i)+")").attr("vendor_id",resultList[i].id);
             $("#vendorId option:eq("+(i)+")").attr("value",resultList[i].id);
		}
		
		var vendorId = "<%=vendorId%>";
		if(vendorId != ""){
			$('#vendorId').val(vendorId);
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"vendor/list",param,'post', successCallback);
}

function findJobTypeList(param){
	var successCallback = function(data){
		var resultList = data.body;
		for(var i = 0 ; i < resultList.length ; i++){
			
             $('#jobTypeId').append( $("<option>"+resultList[i].jobTypeName+"</option>"));
             $("#jobTypeId option:eq("+(i)+")").attr("jobtype_id",resultList[i].id);
             $("#jobTypeId option:eq("+(i)+")").attr("value",resultList[i].id);
		}
		
		var jobTypeId = "<%=jobTypeId%>";
		if(jobTypeId != ""){
			$('#jobTypeId').val(jobTypeId);
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"worker/jobtype/list",param,'post', successCallback);
}

function findProtectList(param){
	var successCallback = function(data){
		var resultList = data.body;
		var html="";
		for(var i = 0 ; i < resultList.length ; i++){
		html += "<label>" +resultList[i].label;
		html += "<input type='checkbox' class='minimal protectCheck' data="+resultList[i].data+" />";
		html += "</label> &nbsp "
		}
		
		$("#protectList").html(html);
    }
	param.grpCd="IOT017";
	mobileUtil.callApi(conf.raycomApiUrl+"common/code/list",param,'post', successCallback);
}

function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month ???????????? ??????
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day ???????????? ??????
    return  year + '/' + month + '/' + day;
}

function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}


function ApiEnroll()
{
	if($("#name").val() == ""){
		try{
			if(checkMobile()=="ios"){
				var message = {  message: "????????? ?????? ??? ?????????." };
				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
				window.LexaApp.showToast("????????? ?????? ??? ?????????.");
			}
			changeNext(1);
			$('#name').focus();
		}catch(e){
			alert("????????? ?????? ??? ?????????.");
			changeNext(1);
			$('#name').focus();
		}
		return;
	}
	if($("#workerTag").val() == ""){
		try{
			if(checkMobile()=="ios"){
				var message = {  message: "??????????????? ?????? ??? ?????????." };
				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
				window.LexaApp.showToast("??????????????? ?????? ??? ?????????.");
			}
			changeNext(1);
			$('#workerTag').focus();
		}catch(e){
			alert("??????????????? ?????? ??? ?????????.");
			changeNext(1);
			$('#workerTag').focus();
		}
		return;
	}else if($("#workerTag").val().length != 4){
		try{
			if(checkMobile()=="ios"){
				var message = {  message: "??????????????? 4????????? ?????? ?????????." };
				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
				window.LexaApp.showToast("??????????????? 4????????? ?????? ?????????.");
			}
			changeNext(1);
			$('#workerTag').focus();
		}catch(e){
			alert("??????????????? 4????????? ?????? ?????????.");
			changeNext(1);
			$('#workerTag').focus();
		}
		return;
	}
	
	
	if( $('#firstNum').val() == "" || $('#secNum').val() == "" || $('#thirdNum').val() == ""){
		try{
			if(checkMobile()=="ios"){
				var message = {  message: "???????????? ?????? ??? ?????????." };
				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
				window.LexaApp.showToast("???????????? ?????? ??? ?????????.");
			}
			changeNext(1);
			$('#secNum').focus();
		}catch(e){
			alert("???????????? ?????? ??? ?????????.");
			changeNext(1);
			$('#secNum').focus();
		}
		return;
	}

   try{
		if(checkMobile()=="ios"){
			var message = {  message: "?????? ???????????????????" , tag : "ApiEnroll" };
			window.webkit.messageHandlers.confirmMessage.postMessage(message);
		}else{
			window.LexaApp.confirmMessage("?????? ???????????????????" , "ApiEnroll");
		}
	}catch(e){
		var result = confirm("?????? ???????????????????");
		if(result){
			returnConfirm(true , "ApiEnroll");
		}else{
			return;
		}
	}
		
} // checkConfirm 

function ApiEnrollConfirm(){
	var phoneNumber = $('#firstNum').val()+$('#secNum').val()+$('#thirdNum').val();
	var birthdayYear = $("#birthdayYear").val().substr(0,4);
	var birthdayMonth;
	if($("#birthdayMonth").val().length == 2){
		birthdayMonth ="0"+ $("#birthdayMonth").val().substr(0,1);
	}else{
		birthdayMonth = $("#birthdayMonth").val().substr(0,2);
	}
	var birthdayDay;
	if($("#birthdayDay").val().length == 2){
		birthdayDay ="0"+  $("#birthdayDay").val().substr(0,1);
	}else{
		birthdayDay = $("#birthdayDay").val().substr(0,2);
	}
	
	var birthDt =birthdayYear+"-"+birthdayMonth+"-"+birthdayDay;
	

	var param={};
	param.siteId = localStorage.siteId;
	param.id = '<%=workerId%>';
	param.name = $("#name").val();
	param.tag = $("#workerTag").val();
	param.birthDt = birthDt;
	param.phoneNumber =phoneNumber;
	param.vendorId = $("#vendorId").val();
	param.jobTypeId = $("#jobTypeId").val();
	param.property = {};
	param.property.nation= $("#nation").val();
	param.property.bloodType= $("#bloodType").val();
	param.property.emergencyNumber= $("#emergencyNumber").val();
	param.property.career= $("#career").val();
	param.property.beforeWorkPlace= $("#beforeWorkPlace").val();
	param.property.address1= $("#address1").val();
	param.property.address2= $("#address2").val();
	param.property.address3= $("#address3").val();
	param.property.fatherYn= $("#fatherYn").is(":checked") ? "Y" : "N"  ;
	param.property.motherYn= $("#motherYn").is(":checked") ? "Y" : "N"  ;
	param.property.marryYn= $("input[name=marryYn]:checked").attr("data");
	param.property.protectionSignatureGrpCode= $("#protectionSignatureGrpCode").attr("data");
	param.property.personnelYn= $("input[name=personnelYn]:checked").attr("data");
	param.property.identificationYn= $("input[name=identificationYn]:checked").attr("data");
	param.property.workerFaceGrpCode= $("#workerFaceGrpCode").attr("data");
	param.property.etcFileGrpCode= $("#etcFileGrpCode").attr("data");
	param.property.safeEducationYn= $("#safeEducationYn").is(":checked") ? "Y" : "N"  ;
	param.property.safeEducationDt = $("#datepicker2").val();
	param.property.createdDt = $("#datepicker3").val();
	param.property.educatorCompanyName = $("#educatorCompanyName").val();
	param.property.workerName = $("#workerName").val();
	param.property.workerSignatureGrpCode= $("#workerSignatureGrpCode").attr("data");
	param.property.educatorSignatureGrpCode= $("#educatorSignatureGrpCode").attr("data");
	
	
	var protectList = $(".protectCheck:checked");
	param.property.privateProtectionList = [];
	protectList.each(function(i, item){
		param.property.privateProtectionList.push(item.getAttribute("data"));
	})
	
	
	var successCallback = function(data){
		$("#f_code").val( $("#workerTag").val());
// 		$("#f_code").val(data.header.message);
		$("#f_worker_name").val($("#name").val());
		$("#f_phone_number").val(phoneNumber);
		$("#f_doc_number").val(data.body[0].property.docNumber);
		var $resgistSuccessFrm = $("#resgistSuccess");
	    $resgistSuccessFrm.attr('action', '/mobile/registComplete.do');
	    $resgistSuccessFrm.attr('method', 'get');
	    $resgistSuccessFrm.submit();
    }
	mobileUtil.callApi(conf.raycomApiUrl+"worker/temp/raise/array",[param],'post', successCallback);
}

</script>
</body>
</html>
