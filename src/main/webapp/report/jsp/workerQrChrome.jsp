<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<x:head moduleCode="CO">
	<!-- jQuery 3 -->
	<script language="javascript" src="../chrome/jquery-1.11.0.min.js"></script>
	<script src="/ui/lib/custom/js/serverConfig.js"></script>
	<script src="/resources/crypt/sha.js"></script>
	<link rel="stylesheet" type="text/css" href="../chrome/crownix-viewer.min.css">
  	<script language="javascript" src="../chrome/crownix-viewer.min.js"></script>
	
	<style>
	</style>
	
	<script type="text/javascript">
	function load(param){
		var me = this;
		var viewer = new m2soft.crownix.Viewer("https://rds.halla.co.kr/ReportingServer/service", "crownix-viewer");
// 		var viewer = new m2soft.crownix.Viewer("http://rd.halla.co.kr/ReportingServer/service", "crownix-viewer");

		var tempStr = "";
		for(var i = 0 ; i <param.length; i++){
			var workerId = param[i].id;
			var workerName = param[i].name;
			var vendorName = param[i].vendorName;
			tempStr += "RAYCOM;WORKER;"+workerId+"@"+workerName+"@"+vendorName+"\n";
		}
		
		
		  viewer.openFile("https://sc.hismart.co.kr/report/workerQR.mrd", "/rdata ["+tempStr+"]");
// 		  viewer.openFile(window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/report/workerQR.mrd", "/rdata ["+tempStr+"]");
		
	}
	$(document).ready(function(){
		var object = window.opener.f_worker_object.value ;
	
		load(JSON.parse(object));
	});
	</script>
</x:head>

<body class="hold-transition login-page" style="height:590px;width:720px;margin:0px" >
      <div id="crownix-viewer" style="position:absolute;width:100%;height:100%"></div>
</body>
</html>
