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
	table {
	    width: 100%;
	    border: 1px solid black;
	  }
	  td {
	    border: 1px solid black;
	    font-size:14px;
	  }
	</style>
	<script type="text/javascript">
 	</script>
</head>

    
<!-- <button type="button" id="test" onclick="getChartData()" class="btn btn-primary" style = "">테스트</button><br> -->
<!-- <button type="button" id="test" onclick="initGraph()" class="btn btn-primary" style = "">초기화</button> -->
<div id="chartDiv" style="position:absolute; ">
	<div style=" background-color:white">
		<div id="echartGraph"></div>
	</div>
</div>

<script>

var dom = document.getElementById("echartGraph");

$(document).ready(function(){
	
// 	getChartData();
   	$(dom).css("width",window.innerHeight);
   	$(dom).css("height",window.innerWidth-40);
   	var centerRatio = (50*window.innerHeight/window.innerWidth)+"%";
   	$("#chartDiv").css("transform-origin","50% "+centerRatio);
   	$("#chartDiv").css("transform","rotate(-90deg)");
	var myChart = echarts.init(dom);

	 option = {
	     tooltip: {},
	     xAxis3D: {
	         type: 'value',
	         min : 0,
	         max :30
	     },
	     yAxis3D: {
	         type: 'value',
	         min : 0,
	         max :30
	     },
	     zAxis3D: {
	         type: 'value',
	         min : 0,
	         max :30
	     },
	     grid3D: {
	         boxWidth: 200,
	         boxDepth: 80,
	         viewControl: {
	             // projection: 'orthographic'
	         },
	         light: {
	             main: {
	                 intensity: 1.2,
	                 shadow: true
	             },
	             ambient: {
	                 intensity: 0.3
	             }
	         }
	     },
	     series: [{
	         type: 'scatter3D',
	         data: null,
	         shading: 'lambert',

	         label: {
	             textStyle: {
	                 fontSize: 16,
	                 borderWidth: 1
	             }
	         },

	         emphasis: {
	             label: {
	                 textStyle: {
	                     fontSize: 20,
	                     color: '#900'
	                 }
	             },
	             itemStyle: {
	                 color: '#900'
	             }
	         }
	     }]
	 }
	 
	  myChart.setOption(option);

});

function getChartData(data,x,y,z){
	var x = {"min" : 0, "max" : 30};
	var y = {"min" : 0, "max" : 10};
	var z = {"min" : 0, "max" : 30};
	var data = [[5,6,5], [10,8,5]];
	
	loadGraph(data,x,y,z);
}
function initGraph(){
	location.reload();
}

function loadGraph(data,x,y,z){
	var myChart = echarts.init(dom);

	 var data = data;
	 option = {
	     tooltip: {},
// 	     visualMap: {
// 	         max: 20,
// 	         inRange: {
// 	             color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
// 	         }
// 	     },
	     xAxis3D: {
	         type: 'value',
	         min : x.min ? x.min  : null,
	         max : x.max ? x.max  : null
	     },
	     yAxis3D: {
	         type: 'value',
	         min : y.min ? y.min  : null,
	         max : y.max ? y.max  : null
	     },
	     zAxis3D: {
	         type: 'value',
	         min : z.min ? z.min  : null,
	         max : z.max ? z.max  : null
	     },
	     grid3D: {
	         boxWidth: 200,
	         boxDepth: 80,
	         viewControl: {
	             // projection: 'orthographic'
	         },
	         light: {
	             main: {
	                 intensity: 1.2,
	                 shadow: true
	             },
	             ambient: {
	                 intensity: 0.3
	             }
	         }
	     },
	     series: [{
	         type: 'scatter3D',
	         data: data.map(function (item) {
	             return {
	                 value: [item[1], item[0], item[2]],
	             }
	         }),
	         shading: 'lambert',

	         label: {
	             textStyle: {
	                 fontSize: 16,
	                 borderWidth: 1
	             }
	         },

	         emphasis: {
	             label: {
	                 textStyle: {
	                     fontSize: 20,
	                     color: '#900'
	                 }
	             },
	             itemStyle: {
	                 color: '#900'
	             }
	         }
	     }]
	 }
	 
	  myChart.setOption(option);
}

</script>
</body>
</html>
