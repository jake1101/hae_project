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
		console.log(param);
		var viewer = new m2soft.crownix.Viewer("https://rds.halla.co.kr/ReportingServer/service", "crownix-viewer");
		
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
		//2021-10-05 jh.Park
		var reqLocation = param.reqLocation ?  param.reqLocation : "";
		var workerCnt = param.workerCnt ?  param.workerCnt : "";
		var reqWorkerName = param.reqWorkerName ?  param.reqWorkerName : "";
		var idBeaconName = param.idBeaconName ?  param.idBeaconName : "";
		var dangerBeaconNames = param.dangerBeaconNames ?  param.dangerBeaconNames : "";
		var dangerAreaName = param.dangerAreaName ?  param.dangerAreaName : "";
		tempStr += title+"@"+reqUserName+"@"+reqDt+"@"+ptwTerm+"@"+apprUserName+"@"+apprDt+"@"+status+"@"+opinion+"@"+ptwName+
			"@"+reqWorkerName+"@"+workerCnt+"@"+reqLocation+"@"+idBeaconName+"@"+dangerBeaconNames+"@"+dangerAreaName+"\n" ;
		
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
		

		     // 보고서 파일 Open
// 		  viewer.openFile("http://54.180.197.63/report/ptwRDServer.mrd", "/rdata ["+tempStr+tempStr2+"]");
		  viewer.openFile("https://sc.hismart.co.kr/report/ptwRDServer.mrd", "/rdata ["+tempStr+tempStr2+"]");

	}
	$(document).ready(function(){
		var object = window.opener.f_ptw_detail_object.value ;
		load(JSON.parse(object));
	});
	</script>
</head>

<body class="hold-transition login-page" style="height:950px;width:840px;margin:0px;" >
    <div id="crownix-viewer" style="position:absolute;width:100%;height:100%"></div>
</body>
</html>
