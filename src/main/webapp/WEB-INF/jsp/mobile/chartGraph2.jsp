<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!-- Tell the browser to be responsive to screen width -->
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<!-- Theme style -->
	<link rel="stylesheet" href="../../dist/css/AdminLTE.min.css">
	<sec:csrfMetaTags/>
<!-- 	<script type="text/javascript" src="/js/main/mobile.js"></script> -->
	<title>Home</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--   	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"> -->


	<!-- jQuery 3 -->
	<script src="../../bower_components/jquery/dist/jquery.min.js"></script>
	<!-- SlimScroll -->
	<script src="../../bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
	<!-- FastClick -->
	<script src="../../bower_components/fastclick/lib/fastclick.js"></script>

	<script src="/ui/lib/custom/js/serverConfig.js"></script>
	<script src="/resources/crypt/sha.js"></script>
	<script src="../ui/lib/echart/echarts.min.js"></script>
	<script src="../ui/lib/echart/echarts-gl.min.js"></script>
	
	<style>
	</style>
	<script type="text/javascript">
 	</script>
</head>

    
<div id="chartDiv" style="position:absolute; width: 100% ; height: 400px; ">
	<div style=" background-color:white">
		<div id="echartGraph" style =" width: 100% ; height: 400px;"></div>
	</div>
</div>

<script>


var dom = document.getElementById("echartGraph");
$(document).ready(function(){

//    	$(dom).css("width",window.innerHeight);
//    	$(dom).css("height",window.innerWidth-40);
//    	var centerRatio = (50*window.innerHeight/window.innerWidth)+"%";
//    	$("#chartDiv").css("transform-origin","50% "+centerRatio);
//    	$("#chartDiv").css("transform","rotate(-90deg)");
	var myChart = echarts.init(dom);

	option = {
			tooltip: {
		        trigger: 'axis'
		    },
		    xAxis: {
		        type: 'category',
		        data: null
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: [{
		        data: [],
		        type: 'scatter',
		        smooth: true
		    }]
		};
	
	 
	  myChart.setOption(option);
});

var xArr = [];
var yArr = [];
function getChartData2(xData, yData){
	
	xArr.push(xData);
	yArr.push(yData);
	
	loadGraph(xArr,yArr);
}
function initGraph(){
	location.reload();
}
function loadGraph(xData,yData){
	var myChart = echarts.init(dom);

	option = {
			tooltip: {
		        trigger: 'axis'
		    },
		    xAxis: {
		        type: 'category',
		        data: xData
		    },
		    yAxis: {
		        type: 'value',
		        min : -100,
		        max : -40
		    },
		    series: [{
		        data: yArr,
		        type: 'scatter',
		        smooth: true
		    }]
		};
	
	 
	  myChart.setOption(option);
}

</script>
</body>
</html>
