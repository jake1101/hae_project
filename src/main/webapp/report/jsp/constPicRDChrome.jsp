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
	function load(param){
		var me = this;
		console.log(param);
		var viewer = new m2soft.crownix.Viewer("https://rds.halla.co.kr/ReportingServer/service", "crownix-viewer");
		
		var tempStr = "";
		
		var constPic = param.constPic  ?  param.constPic : "";
		var constPicTitle = param.constPicTitle ?  param.constPicTitle : "";
		var constTypeName = param.constTypeName ?  param.constTypeName : "";
		var constLocation = param.constLocation ?  param.constLocation : "미정";
		var description = param.description ?  param.description : "";
		var constDate = param.constDate ?  param.constDate : "";
		console.log(constPic);
		tempStr += constPic+"@"+constPicTitle+"@"+constTypeName+"@"+constLocation+"@"+description+"@"+constDate+"\n";

		// 보고서 파일 Open
// 		viewer.openFile("http://54.180.197.63/report/constPicRD.mrd", "/rdata ["+tempStr+"]");
		viewer.openFile("https://sc.hismart.co.kr/report/constPicRD.mrd", "/rdata ["+tempStr+"]");

	}
	$(document).ready(function(){
		var object = window.opener.const_rd_report.value ;
		load(JSON.parse(object));
	});
	</script>
</head>

<body class="hold-transition login-page" style="height:950px;width:840px;margin:0px;" >
    <div id="crownix-viewer" style="position:absolute;width:100%;height:100%"></div>
</body>
</html>
