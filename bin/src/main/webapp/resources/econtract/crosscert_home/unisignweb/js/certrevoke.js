var __certrevoke=function(b){var k=function(e){var g=function(){var a;a=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");a.open("GET",b.ESVS.SRCPath+"unisignweb/rsrc/layout/certrevoke.html?version="+b.ver,!1);a.send(null);return a.responseText},f=function(){var a;a=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");a.open("GET",b.ESVS.SRCPath+"unisignweb/rsrc/lang/"+b.ESVS.Language+"/certrevoke_"+b.ESVS.Language+".js?version="+b.ver,!1);a.send(null);return a.responseText},d=b.ESVS.TabIndex;return function(){var a=eval(g),c=eval(eval(f)());b.ESVS.TargetObj.innerHTML=a();var h=document.getElementById("us-cert-revoke-lbl-title");h.appendChild(document.createTextNode(c.IDS_CERT_REVOCATION));h.setAttribute("tabindex",d,0);document.getElementById("us-cert-revoke-cls-btn-img").setAttribute("src",b.ESVS.SRCPath+"unisignweb/rsrc/img/x-btn.png",0);document.getElementById("us-div-cert-revoke-notice-lbl").appendChild(document.createTextNode(c.IDS_CERT_REVOCATION_NOTICE));a=document.getElementById("us-cert-revoke-radio-1");a.setAttribute("tabindex",d+1,0);a.setAttribute("value",1,0);a.setAttribute("checked","checked",0);document.getElementById("us-cert-revoke-radio-title-1").appendChild(document.createTextNode(c.IDS_CERT_REVOCATION_REASON_MISTRUST));a=document.getElementById("us-cert-revoke-radio-2");a.setAttribute("tabindex",d+1,0);a.setAttribute("value",3,0);document.getElementById("us-cert-revoke-radio-title-2").appendChild(document.createTextNode(c.IDS_CERT_REVOCATION_REASON_ALTERATION));a=document.getElementById("us-cert-revoke-radio-3");a.setAttribute("tabindex",d+1,0);a.setAttribute("value",5,0);document.getElementById("us-cert-revoke-radio-title-3").appendChild(document.createTextNode(c.IDS_CERT_REVOCATION_REASON_DISUSE));a=document.getElementById("us-cert-revoke-confirm-btn");a.setAttribute("value",c.IDS_CONFIRM,0);a.setAttribute("title",c.IDS_CONFIRM+c.IDS_BUTTON,0);a.setAttribute("tabindex",d+2,0);a.onclick=function(){for(var a=5,b=document.getElementsByName("us-cert-revoke-radio"),c=0;c<b.length;c++)if(!0===b[c].checked){a=b[c].value;break}e.onConfirm(a)};a=document.getElementById("us-cert-revoke-cancel-btn");a.setAttribute("value",c.IDS_CANCEL,0);a.setAttribute("title",c.IDS_CANCEL+c.IDS_BUTTON,0);a.setAttribute("tabindex",d+3,0);a.onclick=function(){e.onCancel()};a=document.getElementById("us-cert-revoke-cls-btn");a.setAttribute("title",c.IDS_CERT_REVOCATION_CLOSE,0);a.setAttribute("tabindex",d+4,0);a.onclick=function(){e.onCancel()};a.onfocus=function(){h.focus()};return document.getElementById("us-div-cert-revoke")}()};return function(e){var g=b.uiLayerLevel,f=b.uiUtil().getOverlay(g),d=k({type:e.type,args:e.args,onConfirm:e.onConfirm,onCancel:e.onCancel});d.style.zIndex=g+1;b.ESVS.TargetObj.insertBefore(f,b.ESVS.TargetObj.firstChild);var a=window.onresize;return{show:function(){b.ActiveUI=this;draggable(d,document.getElementById("us-div-cert-revoke-title"));f.style.display="block";b.uiUtil().offsetResize(d);window.onresize=function(){b.uiUtil().offsetResize(d);a&&a()};b.uiLayerLevel+=10;b.ESVS.TabIndex+=30;setTimeout(function(){var a=d.getElementsByTagName("p");if(0<a.length)for(var b=0;b<a.length;b++)"us-cert-revoke-lbl-title"==a[b].id&&a[b].focus()},10)},hide:function(){f.style.display="none";d.style.display="none"},dispose:function(){window.onresize=function(){a&&a()};d.parentNode.removeChild(d);f.parentNode.removeChild(f);b.uiLayerLevel-=10;b.ESVS.TabIndex-=30}}}};