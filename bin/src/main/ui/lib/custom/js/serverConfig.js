var conf = new Object();

conf.apiUrl = 'http://localhost:8088/external';  
conf.ws = 'ws://54.180.197.63:8087/agent/event/';
//conf.raycomApiUrl='http://54.180.197.63:8088/external/api/v1.5/';          
//conf.raycomApiUrl='http://192.168.2.92:8088/external/api/v1.5/';          
//conf.apiUrl = 'http://localhost:8085/external';  
//conf.ws = 'ws://localhost:8087/agent/event/';
conf.raycomApiUrl='http://localhost:8088/external/api/v1.5/';    
//conf.raycomApiUrl='http://192.168.0.13:8088/external/api/v1.5/'; 

conf.map = {
      "daum" : {
         "url0" : "https://map0.daumcdn.net"
         ,"url1" : "https://map1.daumcdn.net"
         ,"url2" : "https://map2.daumcdn.net"
         ,"url3" : "https://map3.daumcdn.net"
      },
      "vworld" : {
          "vector" : "http://xdworld.vworld.kr:8080/2d/Base/service/${z}/${x}/${y}.png"
         ,"satellite" : "http://xdworld.vworld.kr:8080/2d/Satellite/service/${z}/${x}/${y}.jpeg"
         ,"hybrid" : "http://xdworld.vworld.kr:8080/2d/Hybrid/service/${z}/${x}/${y}.png"
      },
}

conf.ol = {
		"vworld" : {
			"vector" : "http://xdworld.vworld.kr:8080/2d/Base/service/{z}/{x}/{y}.png"
				,"satellite" : "http://xdworld.vworld.kr:8080/2d/Satellite/service/{z}/{x}/{y}.jpeg"
					,"hybrid" : "http://xdworld.vworld.kr:8080/2d/Hybrid/service/{z}/{x}/{y}.png"
		},
}



//check web,socket,api is not same Server
conf.isIsolate = true;

if(!conf.isIsolate){   //same server
     conf.apiUrl = 'http://' + window.location.hostname + ':8085/external';
     conf.ws = 'ws://' + window.location.hostname + ':8087/agent/event/';
     conf.raycomApiUrl = 'http://' + window.location.hostname + ':8085/external/api/v1.4/'; 
}

//client Updated Time 
conf.updatedDate = '';
conf.updatedNoti = false;