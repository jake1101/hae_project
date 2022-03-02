<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<head>
	<!-- jQuery 3 -->
	<script language="javascript" src="../chrome/jquery-1.11.0.min.js"></script>
	<script src="/ui/lib/custom/js/serverConfig.js"></script>
	<script src="/resources/crypt/sha.js"></script>
	<link rel="stylesheet" type="text/css" href="../chrome/crownix-viewer.min.css">
  	<script language="javascript" src="../chrome/crownix-viewer.min.js"></script>
	
	<style>
	</style>
	
	<script type="text/javascript">
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

       return year + "-" + month + "-" + date ;

   }
	function load(param){
		var me = this;
		var viewer = new m2soft.crownix.Viewer("https://rds.halla.co.kr/ReportingServer/service", "crownix-viewer");
		
		var docNumber = param.docNumber ? param.docNumber : " " ;
		var name = param.name  ? param.name : " ";
		var birthDt = param.birthDt  ? param.birthDt : " ";
		birthDt= new Date(birthDt);
		var nation = param.nationName  ? param.nationName : " ";
		var phoneNumber = param.phoneNumber  ? param.phoneNumber : " ";
		var bloodType = param.bloodTypeName  ? param.bloodTypeName : " ";
		var emergencyNumber = param.emergencyNumber  ? param.emergencyNumber : " ";
		var vendor = param.vendorName  ? param.vendorName : " ";
		var jobType = param.jobTypeName  ? param.jobTypeName : " ";
		var career = param.career  ? param.career : " ";
		var beforeWorkPlace = param.beforeWorkPlace  ? param.beforeWorkPlace : " ";
		var address1 = param.address1  ? param.address1 : " ";
		var address2 = param.address2  ? param.address2 : " ";
		var address3 = param.address3  ? param.address3 : " ";
		var fatherYn = param.fatherYn  ? param.fatherYn : " ";
		var motherYn = param.motherYn  ? param.motherYn : " ";
		var marryYn = param.marryYn  ? param.marryYn : " ";
		var protectList = param.protectNameStr  ? param.protectNameStr : " ";
		var personnelYn = param.personnelYn  ? param.personnelYn : " ";
		var identificationYn = param.identificationYn  ? param.identificationYn : " ";
		var safeEducationYn = param.safeEducationYn  ? param.safeEducationYn : " ";
		var safeEducationDt = param.safeEducationDt  ? param.safeEducationDt : " ";
		var createdDt = param.createdDt  ? param.createdDt : " ";
		var educatorCompanyName = param.educatorCompanyName  ? param.educatorCompanyName : " ";
		var workerName = param.workerName  ? param.workerName : " ";
// 		var workerFaceImg =window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/report/한라 라벨";
// 		var workerFaceImg =window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/repository/2020/05/13/aa";
		var workerFaceImg = param.workerFaceImg  ? param.workerFaceImg : " ";
		var etcFileName = param.etcFileName  ? param.etcFileName : " ";
		var protectSignImg = param.protectSignImg  ? param.protectSignImg : " ";
		var sensitiveYn = param.sensitiveYn  ? param.sensitiveYn : " ";
		
		var tempStr = "";
		tempStr += name+"@"
				+date_to_str(birthDt)+"@"
				+nation+"@"
				+phoneNumber+"@"
				+bloodType+"@"
				+emergencyNumber+"@"
				+vendor+"@"
				+jobType+"@"
				+career+"@"
				+beforeWorkPlace+"@"
				+address1+"@"
				+address2+"@"
				+address3+"@"
				+fatherYn+"@"
				+motherYn+"@"
				+marryYn+"@"
				+protectList+"@"
				+safeEducationYn+"@"
				+safeEducationDt+"@"
				+createdDt+"@"
				+educatorCompanyName+"@"
				+workerName+"@"
				+personnelYn+"@"
				+identificationYn+"@"
				+workerFaceImg+"@"
				+etcFileName+"@"
				+protectSignImg+"@"
				+sensitiveYn+"@"
				+docNumber+"\n";
// 				+"\n";
		
		     // 보고서 파일 Open
		  viewer.openFile("https://sc.hismart.co.kr/report/workerDetail.mrd", "/rdata ["+tempStr+"]");

	}
	$(document).ready(function(){
		var object = window.opener.f_worker_detail_object.value ;
		load(JSON.parse(object));
	});
	</script>
</head>

<body class="hold-transition login-page" style="height:950px;width:840px;margin:0px;" >
            <div id="crownix-viewer" style="position:absolute;width:100%;height:100%"></div>
</body>
</html>
