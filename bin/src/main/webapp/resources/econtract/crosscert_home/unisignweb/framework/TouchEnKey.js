var USING_CUSTOM_IMAGE = 0;
var CUSTOM_IMAGE_URL = "";
var USING_TouchEnKey = "1";
var USING_JQUERY = 0;


var TouchEnKey_CLSID		= "clsid:6CE20149-ABE3-462E-A1B4-5B549971AA38";

var TouchEnKey_CODEBASE_x64 = "/TouchEnKey/TouchEnkey3.1.0.34_64k.cab";
var TouchEnKey_CODEBASE_x86 = "/TouchEnKey/TouchEnkey3.1.0.34_32k.cab";
var TouchEnKey_VERSION 		= "3,1,0,34";

var Multi_InstallBinary 	= "/TouchEnKey/TouchEnKey_Installer.exe";
var Multi_Version 			= "3.1.0.32";

var TouchEnKey_Installpage	= "";
var TouchEnKey_baseType = "";

var TouchEnKeyCert = "-----BEGIN CERTIFICATE-----MIIDLTCCAhWgAwIBAgIJAOYjCX4wgWKbMA0GCSqGSIb3DQEBCwUAMGcxCzAJBgNVBAYTAktSMR0wGwYDVQQKExRSYW9uU2VjdXJlIENvLiwgTHRkLjEaMBgGA1UECxMRUXVhbGl0eSBBc3N1cmFuY2UxHTAbBgNVBAMTFFJhb25TZWN1cmUgQ28uLCBMdGQuMB4XDTE1MDExMjAyMzUzMloXDTI1MDEwOTAyMzUzMlowKTELMAkGA1UEBhMCS1IxDDAKBgNVBAoTA2liazEMMAoGA1UEAxMDaWJrMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0rlxe1dRLRqbg1ytkskXDcaSluzCFp0AkJxWrZJ2eZ6gjwQabZ1ZV/Y1aP0RVsFgdxAGbwYDzkXap7fK8Rrnv8hF+FAZV+vyocrCQJLpB1pDwo/LDj+Wg2MuSYQDkaWLpG0qTLy2UMqiYphjrQO/J82f+dM+OlDFKkPuVOEN0ttk8s1yOPHz7WTYiognDZp08S967oaFPz+8neSQswXGGbuOAfGXyC1DqMSeWHkcOBlNkQ8Ze6t2SazT3tUdFyp1kp4q7uZ4qr5sQ5KXu0D1WEOXju9NYZgcYp/Rq1RFL+qe4Gdxr06wMvs4ySE6RCcmNDPGxZCEdWhrSd3OHJ2HywIDAQABoxowGDAJBgNVHRMEAjAAMAsGA1UdDwQEAwIF4DANBgkqhkiG9w0BAQsFAAOCAQEAEz/GS5uHNwO0+97CJimiN/AQMx+D+BYww6DOihNQ0kSMKLAyasmPM6NsqvVpeM23UcR8Gz04J+m46SYnAyB7ayw55WdYZFxn8p/ClUxDsT6YIuF8/xO/GuTB3YEInC8YHouNByr9TSCko+mdcmo36/2uxcFu5DRqnSF8TFCWkOln7xN+bgqjM05lLcR7gSldlg2m/c0CFOs/obkYUK4fSKwtFhiDWKw+DAL1Pe3+kMEnBQOKfRDlL1VZwRB1WSuW0pyFRFdHAMI20Q01X60w6Txia5PpcD9Kcf4kIXAAj5fTHteFK5vdI+FhGpqCu5Os2/UTtuHJESy4uhNmnkn8GA==-----END CERTIFICATE-----";
var ServKeyForSending = null;

var TouchEn_BaseBRW = {
    ua      : navigator.userAgent.toLowerCase(),
    ie      : navigator.appName == 'Microsoft Internet Explorer',
    ie_		: navigator.userAgent.match('MSIE') == 'MSIE',
    ns      : navigator.appName == 'Netscape',
    ff      : navigator.userAgent.match('Firefox') == 'Firefox',
    sf      : navigator.userAgent.match('Safari') == 'Safari',
    op      : navigator.userAgent.match('Opera') == 'Opera',
    cr      : navigator.userAgent.match('Chrome') == 'Chrome',
    win     : navigator.platform.match('Win') == 'Win',
    mac     : navigator.userAgent.match('Mac') == 'Mac',
    linux   : navigator.userAgent.match('Linux') == 'Linux',
    ie11	: navigator.userAgent.match('Trident/7.0') == 'Trident/7.0'
};

var getPluginType = {
    TouchEn_FFMIME      : ((TouchEn_BaseBRW.win) && (TouchEn_BaseBRW.ff ||TouchEn_BaseBRW.op)),
    TouchEn_SFMIME      : ((TouchEn_BaseBRW.win) && (TouchEn_BaseBRW.sf ||TouchEn_BaseBRW.cr)),
  	TouchEn_ACTIVEX   	: (TouchEn_BaseBRW.win && ( TouchEn_BaseBRW.ie || TouchEn_BaseBRW.ie11 || TouchEn_BaseBRW.ie_)),
    TouchEn_NPRUNTIME   : (TouchEn_BaseBRW.win && ((TouchEn_BaseBRW.ff || TouchEn_BaseBRW.sf || TouchEn_BaseBRW.cr) || TouchEn_BaseBRW.op)),
    TouchEn_OtherNP     : (TouchEn_BaseBRW.win && (TouchEn_BaseBRW.cr || TouchEn_BaseBRW.op)),
    TouchEn_OtherOS     : (TouchEn_BaseBRW.mac || TouchEn_BaseBRW.linux)
};

function checkTouchEnKeyMime() {
	if (getPluginType.TouchEn_NPRUNTIME) {
		var CKmType = navigator.plugins["TouchEn Key for Multi-Browser"];
		if (CKmType == undefined) {
			return false;
		} else {
			return true;
		}
	} 
}

function PrintTouchEnKeyActiveXTag() {
    if(USING_TouchEnKey == "1") {
        var Str="";

        Str+= '<object classid="' + TouchEnKey_CLSID + '"';
        if(navigator.cpuClass.toLowerCase() == "x64") {
        	Str+= '\n\t codebase="' + TouchEnKey_CODEBASE_x64 + '#version=' + TouchEnKey_VERSION + '"';
        } else {
        	Str+= '\n\t codebase="' + TouchEnKey_CODEBASE_x86 + '#version=' + TouchEnKey_VERSION + '"';
        }
        Str+= '\n\tvspace="0" hspace="0" width="0" id="TouchEnKey" style="display:none;">';
        Str+= '\n\t <PARAM name="PKI" value="TouchEnKeyEx">';
        Str+= '\n\t <PARAM name="IgnoreProgress" value="on">';
        Str+= '\n\t <PARAM name="IDBase" value="off">';
		Str+= '\n\t <PARAM name="GenerateEvent" value="on">';
		Str+= '\n\t <PARAM name="useTobe" value="off">';
        if(USING_CUSTOM_IMAGE) {
            Str+= '\n\t <PARAM name="ImageURL" value="' + CUSTOM_IMAGE_URL + '">';
        }

        Str+= '</object>';
        document.write(Str);
    }
}

function PrintTouchEnKeyEmbedTag() {

    if(USING_TouchEnKey == "1") {
        var Str="";
        Str+= '<EMBED id="TouchEnKey" type="application/ClientKeeperKeyPro" width=0 height=0 ';
        if(USING_CUSTOM_IMAGE) {
            Str+= 'ImageURL="' + CUSTOM_IMAGE_URL + '" ';
        }
        Str+= 'PKI="TouchEnKeyEx"';
        Str+= 'RefreshSession="true"';
        Str+= 'IDBase="off"';
		Str+= 'useTobe="off"';
        Str+= '>';
        Str+= '</EMBED>';
        Str+= '<NOEMBED>no TouchEn Key</NOEMBED>';

        document.write(Str);
    }
}

function PrintTouchEnKeyTag() {
    if(getPluginType.TouchEn_ACTIVEX) {
        PrintTouchEnKeyActiveXTag();
    } else if(getPluginType.TouchEn_NPRUNTIME) {
        var mTypeRet = checkTouchEnKeyMime();
        if(mTypeRet) {
            PrintTouchEnKeyEmbedTag();
        } else {
            //location.href = TouchEnKey_Installpage;
        }
    }
}

function XecureCK_UIEevents(frm,ele,event,keycode) {
	TouchEnKey_UIEevents(frm,ele,event,keycode);

}
function triggerEvent(el,eventName,keycode){

	var htmlEvents = {
		onkeydown:1,
		onkeypress:1,
		onkeyup:1
	}
    var event;
    if(document.createEvent){
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName,true,true);
    }else if(document.createEventObject){// IE < 9
        event = document.createEventObject();
        event.eventType = eventName;
    }
    event.eventName = eventName;
	event.keyCode = keycode;
	event.which = keycode;
	
    if(el.dispatchEvent){
        el.dispatchEvent(event);
    }else if(el.fireEvent && htmlEvents['on'+eventName]){
        el.fireEvent('on'+event.eventType,event);
    }else if(el[eventName]){
        el[eventName]();
    }else if(el['on'+eventName]){
        el['on'+eventName]();
    }
}


function TouchEnKey_UIEevents(frm,ele,event,keycode) {
 var obj;
    var e;

	if (navigator.userAgent.match('Trident/7.0') == 'Trident/7.0')
	{
		obj = document.activeElement;
		e = event.replace("on", "");		
			
		triggerEvent(obj, e, keycode);
	}	
	else 
	{
		obj = document.activeElement;
		try {
			if( document.createEventObject )
			{
				eventObj = document.createEventObject();
				eventObj.keyCode=keycode;
				if(obj)
				{
					obj.fireEvent(event,eventObj);
				}
			}
			else if(document.createEvent) {
				if(window.KeyEvent) {
					e = document.createEvent('KeyEvents');
					e.initKeyEvent(event, true, true, window, false, false, false, false, keycode, 0);
				} else {
					e = document.createEvent('UIEvents');
					e.initUIEvent(event, true, true, window, 1);
					e.keyCode = keycode;
				}
				obj.dispatchEvent(e);
			} 
		} catch(e) {
		}	
	}
}

var TNK_SR = "";

function TouchEnkey_GetVariable(name) {
    if(name == "SR") {
     return TNK_SR;
    }
}

function DrawHiddenElements(frm) {
	if (frm.hid_key_data == null && frm.hid_enc_data == null) {
		var newEle = document.createElement("input");
	    newEle.type = "hidden";
	    newEle.name = "hid_key_data";
	    newEle.id = "hid_key_data";
	    newEle.value = "";
	    frm.appendChild(newEle);
	
	    var newEle = document.createElement("input");
	    newEle.type = "hidden";
	    newEle.name = "hid_enc_data";
	    newEle.id = "hid_enc_data";
	    newEle.value = "";
	    frm.appendChild(newEle);
	  }
}

function GetEncDataFun(keyData, frm, ele) {
    return document.getElementById('TouchEnKey').GetEncData(keyData, frm, ele);
}

function findElementByName(form, eleName) {
    if(eleName == null) {
        return null;
    }

    var findEle = null;
    var len = form.elements.length;
    for(var i=0; i<len; i++) {
        if(eleName == form.elements[i].name) {
            return form.elements[i];
        }
    }
}

function makeEncData(frm) {
	if(navigator.platform.match('Win') != 'Win'){
		return true;
	}
	if (navigator.userAgent.indexOf("Opera") > -1 && navigator.userAgent.indexOf("Version/12.") > -1 ){
		return true;
	} 
	try{
		var encFieldCnt = 0;
		var fieldCnt = 0;
		var cipherEncText = "";
		var checkE2E = false;
		var elelength = frm.elements.length;
		
		var name = new Array(elelength);
		var value = new Array(elelength);
		
	  for (var j=0;j < elelength;j++)
	  {    	
	      if(frm.elements[j].tagName == "INPUT" && (frm.elements[j].type == "text" || frm.elements[j].type == "password") && frm.elements[j].getAttribute("enc")=="on")
	      {	
	    	checkE2E = true;
	      	name[encFieldCnt] = "E2E_" + frm.elements[j].name;
	      	value[encFieldCnt] = GetEncDataFun("", frm.name, frm.elements[j].name);
	      	
	      	e2eEle = findElementByName(frm, name[encFieldCnt]);
	      			if( e2eEle == null ) {
							var newEle = document.createElement("input");
							newEle.type = "hidden";
							newEle.name = name[encFieldCnt];
							newEle.value = value[encFieldCnt];
							frm.appendChild(newEle);
					}
					else {
							e2eEle.value = value[encFieldCnt];
					}
					encFieldCnt++;
	      }
	  }
	  	if(checkE2E){
			for (i = 0; i < encFieldCnt; i++) {
				if (value[i] != "undefined") {
					cipherEncText += name[i];
					cipherEncText += "=";	
					cipherEncText += value[i];
					cipherEncText += "%TK%";
				}
			}
		
			DrawHiddenElements(frm); 
			frm.hid_key_data.value = GetEncDataFun(TouchEnKeyCert, "", "");
			alert("cipher = " + cipherEncText);
			frm.hid_enc_data.value = cipherEncText;
		}
		return true;
	} 
	catch(e) 
	{
		return false;
	}
}

var CK_objFocused;
function CK_Start(nsEvent) {
    if(!getPluginType.TouchEn_NPRUNTIME) return;

    var theEvent;
    var inputObj;

    if(nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }

    try {
        document.getElementById('TouchEnKey').StartCK(inputObj);
        CK_objFocused = inputObj;
        CK_OP_IsStart = true;  
    } catch(e) {
    }
}

function CK_Stop() {
    if(!getPluginType.TouchEn_NPRUNTIME) return;

    try {
        document.getElementById('TouchEnKey').StopCK();
        CK_OP_IsStart = false;
    } catch(e) {
    }
}

function CK_PatchKey() {
    if(!getPluginType.TouchEn_NPRUNTIME) return;

    try {
        document.getElementById('TouchEnKey').PatchKey(CK_objFocused);
    } catch(e) {
    }
}

function CK_Blur() {
    if(!getPluginType.TouchEn_NPRUNTIME) return;

    try {
        CK_objFocused.blur();
    } catch(e) {
    }
}

function CK_Click(nsEvent) {
    var theEvent;
    var inputObj;

    if(nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }

}
function CK_KeyDown(nsEvent) {
    var theEvent;
    var inputObj;

    if(nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }

    if((typeof(inputObj.getAttribute("enc")) == "undefined") || (inputObj.getAttribute("enc") != "on")) return;

    if((theEvent.keyCode >= 35 && theEvent.keyCode <= 40)||(theEvent.keyCode == 46)) {
        if(theEvent.preventDefault) theEvent.preventDefault();
        if(theEvent.stopPropagation) theEvent.stopPropagation();

        theEvent.returnValue = false;
        theEvent.cancelBubble = true;

        return;
    }
}


function TouchEnKey_ApplySecurity() {
    if(!getPluginType.TouchEn_NPRUNTIME) return;
    
    if (TouchEnKey_baseType == "id") {
    	try {            
            var x=document.getElementsByTagName("input");
                      for(var i=0;i<x.length;i++) {
                         if(x[i].tagName == "INPUT" && (x[i].type == "text" || x[i].type == "password")) {
                             if(x[i].addEventListener){
                                 x[i].addEventListener("focus", CK_Start, false);       //w3c
                                 x[i].addEventListener("blur", CK_Stop, false);     //w3c
                                 x[i].addEventListener("click", CK_Click, false);       //w3c
                                 x[i].addEventListener("mouseup", CK_Click, false);     //w3c
                                 x[i].addEventListener("keydown", CK_KeyDown, false); //w3c ff/safari/chrome
                                 x[i].addEventListener("keypress", CK_KeyDown, false);      //w3c opera
               
                             } else if(x[i].attachEvent) {
                                 x[i].attachEvent("onfocus", CK_Start);                 //msdom
                                 x[i].attachEvent("onblur", CK_Stop);                   //msdom
                             }
                        }
                 }
        } catch(e) {
        }

    } else {
    
	    try {
	        for(var i=0;i<document.forms.length;i++) {
	            for(var j=0;j < document.forms[i].elements.length;j++) {
	                if(document.forms[i].elements[j].tagName == "INPUT" && (document.forms[i].elements[j].type == "text" || document.forms[i].elements[j].type == "password")) {
	                    if(document.forms[i].elements[j].addEventListener){
	                        document.forms[i].elements[j].addEventListener("focus", CK_Start, false);       //w3c
	                        document.forms[i].elements[j].addEventListener("blur", CK_Stop, false);     //w3c
	                        document.forms[i].elements[j].addEventListener("click", CK_Click, false);       //w3c
	                        document.forms[i].elements[j].addEventListener("mouseup", CK_Click, false);     //w3c
	                        document.forms[i].elements[j].addEventListener("keydown", CK_KeyDown, false);       //w3c ff/safari/chrome
	                        document.forms[i].elements[j].addEventListener("keypress", CK_KeyDown, false);      //w3c opera
	
	                    } else if(document.forms[i].elements[j].attachEvent) {
	                        document.forms[i].elements[j].attachEvent("onfocus", CK_Start);                 //msdom
	                        document.forms[i].elements[j].attachEvent("onblur", CK_Stop);                   //msdom
	                    }
	                }
	            }
	        }
	    } catch(e) {
	    }
    }
}

function TouchEnKey_ReScan() {
    if(USING_TouchEnKey == 1) {
        if(getPluginType.TouchEn_ACTIVEX) {
            var obj = document.getElementById("TouchEnKey");
            obj.ReScanDocument();
        } else {
            TouchEnKey_ApplySecurity();
        }
    }
}

/*
function TouchEnKey_EnqueueList(frmName, eleName) {
	document.TouchEnKey.EnqueueList(frmName, eleName);
}
*/


function TouchEnKey_EnqueueList(frmName, eleName) {
	if (isInstalledTouchEnKey()) {
		if (getPluginType.TouchEn_ACTIVEX){
			//document.TouchEnKey.EnqueueList(frmName, eleName);
			var obj = document.getElementById('TouchEnKey');
			obj.EnqueueList(frmName, eleName);
		} else if (getPluginType.TouchEn_NPRUNTIME) {
			TouchEnKey_ApplySecurity();
		}
	} else {
		return false;
	}
}


function TouchEnKey_InvalidateSession() {
	if (isInstalledTouchEnKey()) {
		if (getPluginType.TouchEn_ACTIVEX){
			document.getElementById('TouchEnKey').InvalidateSession();
		} else if (getPluginType.TouchEn_NPRUNTIME) {
			document.getElementById('TouchEnKey').InvalidateSession();
		}
	} else {
		return false;
	}
}

function GetKeyStateCheck(keyname){
	return document.getElementById('TouchEnKey').GetKeyState(keyname);
}

function isInstalledTouchEnKey() {
	var installed = false;
    if(!getPluginType.TouchEn_NPRUNTIME) {
        if(document.TouchEnKey==null || typeof(document.TouchEnKey) == "undefined" || document.TouchEnKey.object == null) {
            installed = false;
        } else {
            installed = true;
        }
    } else {
        if(checkTouchEnKeyMime()) {
            try {
                IsNeedUpdate = document.getElementById('TouchEnKey').NeedUpdate(Multi_Version);
                if(IsNeedUpdate==false) {
                     installed = true;
                } else {
                    installed = false;
                }
            } catch(e) {
                installed = false;
            }
        } else {
            installed = false;
        }
    }
    return installed;
}

if (!TouchEn_BaseBRW.win) {

} else {
	if(navigator.userAgent.indexOf("Opera") > -1 && navigator.userAgent.indexOf("Version/12") > -1){
	} else {
		PrintTouchEnKeyTag();
		
		if(isInstalledTouchEnKey()) {
			if (window.attachEvent) {
				window.attachEvent("onload", function() {TouchEnKey_ReScan();});
			} else {
				window.addEventListener("load", function() {TouchEnKey_ReScan();}, false);
			}
		} else {
			//location.href = TouchEnKey_Installpage;
		}
	}
}