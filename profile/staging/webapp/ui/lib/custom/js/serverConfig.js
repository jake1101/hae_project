var conf = new Object();

conf.apiUrl = 'http://192.168.2.135:8088/external';  
conf.ws = 'ws://192.168.2.27:8087/agent/event/';
conf.raycomApiUrl='http://192.168.2.135:8088/external/api/v1.4/';          

//check web,socket,api is not same Server
conf.isIsolate = true;

if(!conf.isIsolate){   //same server
     conf.apiUrl = 'http://' + window.location.hostname + ':8088/external';
     conf.ws = 'ws://' + window.location.hostname + ':8087/agent/event/';
     conf.raycomApiUrl = 'http://' + window.location.hostname + ':8088/external/api/v1.4/'; 
}

//client Updated Time 
conf.updatedDate = '';
conf.updatedNoti = false;
