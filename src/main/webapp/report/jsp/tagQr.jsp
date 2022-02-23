<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<head>
	<!-- jQuery 3 -->
	<script src="../../bower_components/jquery/dist/jquery.min.js"></script>
	<script src="/ui/lib/custom/js/serverConfig.js"></script>
	<script src="/resources/crypt/sha.js"></script>
	
	<style>
	</style>
	
	<script type="text/javascript">
	function load(param){
		var me = this;
		var Rdviewer     = document.Rdviewer;  
		
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
		
	  	// Auto-Adjust 설정을 해제
	     Rdviewer.AutoAdjust = false;
	     // 출력 화면의 배율을 작성된 용지 사이즈로 설정
	     Rdviewer.ZoomRatio = 100;
		     // RD OCX 하단의 상태바를 화면에서 숨기기
// 		     Rdviewer.HideStatusbar();
//		     // RD OCX 의 툴바 표시 여부
// 		     Rdviewer.HideToolBar();

		     // 보고서 파일 Open
		  Rdviewer.FileOpen(window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/report/tagQR.mrd", "/rdata ["+tempStr+"]");
		
	}
	$(document).ready(function(){
		var object = window.opener.f_tag_object.value ;
	
		load(JSON.parse(object));
	});
	</script>
</head>

<body class="hold-transition login-page" style="height:570px;width:680px" >
	   <object style="height:0%;width:0%"
         id=rdbarcode5
         classid="clsid:AA30E61C-DBC4-4DF6-B2CC-FAE39282CF56"
         codebase="http://54.180.197.63/report/rdbarcode5.cab#version=5,0,0,314">
      </object>
	   <object style="height:100%;width:100%"
         id=Rdviewer
         name=Rdviewer
         classid="clsid:5A7B56B3-603D-4953-9909-1247D41967F8"
         codebase="http://54.180.197.63/report/rdviewer50u.cab#version=5,0,0,314">
      </object>
</body>
</html>
