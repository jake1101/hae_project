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
		var viewer = new m2soft.crownix.Viewer("https://rds.halla.co.kr/ReportingServer/service", "crownix-viewer");
		
		var tempStr = "";
		for(var i = 0 ; i <param.length; i++){
			var type ;
			if(param[i].type== "vehicle"){
				type = "이동장비";
			}else if(param[i].type== "tag"){
				type = "작업자";
			}
			var tagName = param[i].name;
			var tagId = param[i].nodeId;
			tempStr += "RAYCOM;TAG;"+tagId+"@"+tagName+"@"+tagId+"@"+type+"\n";
		}
		

		     // 보고서 파일 Open
		  viewer.openFile("https://sc.hismart.co.kr/report//tagQR.mrd", "/rdata ["+tempStr+"]");
		
	}
	$(document).ready(function(){
		var object = window.opener.f_tag_object.value ;
	
		load(JSON.parse(object));
	});
	</script>
</head>

<body class="hold-transition login-page" style="height:590px;width:720px;margin:0px;" >
       <div id="crownix-viewer" style="position:absolute;width:100%;height:100%"></div>
</body>
</html>
