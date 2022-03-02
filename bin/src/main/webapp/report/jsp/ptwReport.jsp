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
		
		console.log(param);
		
		
		var Rdviewer     = document.Rdviewer;  
		
		var tempStr = "";
		var tempStr2 = "";
		
		var ptwName = param.ptwName ?  param.ptwName : "";
		var title = param.title ?  param.title : "";
		var reqUserName = param.reqUserName ?  param.reqUserName : "";
		var reqDt = param.reqDt ?  param.reqDt : "";
		var startDt = param.startDt ?  param.startDt : "";
		var endDt = param.endDt ?  param.endDt : "";
		var ptwTerm = startDt + " ~ " + endDt;
		var apprUserName = param.apprUserName ?  param.apprUserName : "";
		var apprDt = param.apprDt ?  param.apprDt : "";
		var status = param.status ?  param.status : "";
		var opinion = param.opinion ?  param.opinion : "";
		tempStr += title+"@"+reqUserName+"@"+reqDt+"@"+ptwTerm+"@"+apprUserName+"@"+apprDt+"@"+status+"@"+opinion+"@"+ptwName+"\n" ;
		
		for(var i = 0 ; i <param.ptwDataList.length; i++){
			var ptwFormName = param.ptwDataList[i].ptwFormName ?   param.ptwDataList[i].ptwFormName : "";
			var checkYn =param.ptwDataList[i].checkYn ?   param.ptwDataList[i].checkYn : "";
			var check = param.ptwDataList[i].check ?   param.ptwDataList[i].check : "";
			var textYn = param.ptwDataList[i].textYn ?   param.ptwDataList[i].textYn : "";
// 			var text = param.ptwDataList[i].text ?   param.ptwDataList[i].text : "";
			var text;
			if(param.ptwDataList[i].text){
				text = (param.ptwDataList[i].text).replace(/\n/g, "$");
				text = text.replace("@", "#");
			}else{
				text = "";
			}
			var pictureYn = param.ptwDataList[i].pictureYn ?   param.ptwDataList[i].pictureYn : "";
			var picture = param.ptwDataList[i].picture  ?  param.Imgpath+param.ptwDataList[i].imageArray[0].attFilePath : "";
			console.log(text);
			tempStr2 += ptwFormName+"@"+checkYn+"@"+check+"@"+textYn+"@"+text+"@"+pictureYn+"@"+picture+"\n";
		}
		
		tempStr2 +="//EOR//";
		
		
		console.log(tempStr);
		console.log(tempStr2);
		
	  	// Auto-Adjust 설정을 해제
	     Rdviewer.AutoAdjust = false;
	     // 출력 화면의 배율을 작성된 용지 사이즈로 설정
	     Rdviewer.ZoomRatio = 100;
		     // RD OCX 하단의 상태바를 화면에서 숨기기
// 		     Rdviewer.HideStatusbar();
//		     // RD OCX 의 툴바 표시 여부
// 		     Rdviewer.HideToolBar();

		     // 보고서 파일 Open
  		  Rdviewer.FileOpen(window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/report/ptwRDServer.mrd", "/rdata ["+tempStr+tempStr2+"]");
// 		  Rdviewer.FileOpen(window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/report/ptwDB.mrd", " /rf [http://rd.halla.co.kr/RDServer/rdagent.jsp] /rsn [HISMART] /rp ["+param.id+"] " + "["+param.Imgpath+"]" );
// 		  Rdviewer.FileOpen(window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/report/ptwRDServer.mrd", " /rf [http://rd.halla.co.kr/RDServer/rdagent.jsp] /rsn [HISMART]  /rui [halla_raycom] /rpw [raycom] /rdn [smarttag2]  /rp ["+param.id+"] " + "["+param.Imgpath+"]" );
// 		  Rdviewer.FileOpen(window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/report/ptwDB.mrd", "/rp ["+param.id+"]" + "["+param.Imgpath+"]");
		
	}
	$(document).ready(function(){
		var object = window.opener.f_ptw_detail_object.value ;
		load(JSON.parse(object));
	});
	</script>
</head>

<body class="hold-transition login-page" style="height:950px;width:840px" >
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
