var __password=function(a){var m=function(f){function k(b){if(!b)return alert("UI load error."),!1;var a=document.createElement("div");document.body.insertBefore(a,document.body.firstChild);a.innerHTML=b;return!0}function g(a){if(!a)return!1;a=a||window.event;13==(a.which||a.keyCode)&&document.getElementById("us-password-confirm-btn").click()}var c=function(){var b;b=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");b.open("GET",a.ESVS.SRCPath+"unisignweb/rsrc/layout/password.html?version="+a.ver,!1);b.send(null);return b.responseText},h=function(){var b;b=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");b.open("GET",a.ESVS.SRCPath+"unisignweb/rsrc/lang/"+a.ESVS.Language+"/password_"+a.ESVS.Language+".js?version="+a.ver,!1);b.send(null);return b.responseText},e=a.ESVS.TabIndex;return function(){var b=eval(c),d=eval(eval(h)());k(b());var l=document.getElementById("us-password-lbl-title");l.appendChild(document.createTextNode(d.IDS_PASSWORD));l.setAttribute("tabindex",e,0);document.getElementById("us-password-cls-btn-img").setAttribute("src",a.ESVS.SRCPath+"unisignweb/rsrc/img/x-btn.png",0);document.getElementById("us-password-cert-img").setAttribute("src",a.ESVS.SRCPath+"unisignweb/rsrc/img/password-cert-img.png",0);document.getElementById("us-password-notice-text").appendChild(document.createTextNode(d.IDS_PASSWORD_NOTICE));a.uiUtil().addCapsLockEvent("us-password-input-textbox","us-pwd-err-msg-capslock",d.IDS_MSGBOX_CAPSLOCK_ON,g);document.getElementById("us-password-input-textbox").setAttribute("tabindex",e+1,0);b=document.getElementById("us-password-confirm-btn");b.setAttribute("value",d.IDS_CONFIRM,0);b.setAttribute("title",d.IDS_CONFIRM+d.IDS_BUTTON,0);b.setAttribute("tabindex",e+2,0);b.onclick=function(){if(d){var b=document.getElementById("us-password-input-textbox"),c=b.value;c&&4&a.ESVS.Mode&&("touchen"==a.ESVS.SecureKeyboardType&&a.bsUtil().isTouchEnKeyUsable()?c=a.bsUtil().GetEncryptPwd("us-keyboard-secure-frm","us-password-input-textbox"):"ahnlab"==a.ESVS.SecureKeyboardType&&a.bsUtil().isAhnlabProtectorUsable()&&(c=a.bsUtil().GetAhnlabEncInputInfo("us-password-input-textbox")));c?(f.onConfirm(c),b.value=""):(a.uiUtil().msgBox(d.IDS_MSGBOX_ERROR_PLEASE_INPUT_PASSWORD),b.focus())}};b=document.getElementById("us-password-cancel-btn");b.setAttribute("value",d.IDS_CANCEL,0);b.setAttribute("title",d.IDS_CANCEL+d.IDS_BUTTON,0);b.setAttribute("tabindex",e+3,0);b.onclick=function(){f.onCancel()};b=document.getElementById("us-password-cls-btn");b.setAttribute("title",d.IDS_PASSWORD_CLOSE,0);b.setAttribute("tabindex",e+4,0);b.onfocus=function(){l.focus()};b.onclick=function(){f.onCancel()};return document.getElementById("us-div-password")}()};return function(f){var k=a.uiLayerLevel,g=a.uiUtil().getOverlay(k),c=m({type:f.type,args:f.args,onConfirm:f.onConfirm,onCancel:f.onCancel});c.style.zIndex=k+1;a.ESVS.TargetObj.insertBefore(g,a.ESVS.TargetObj.firstChild);var h=window.onresize;return{show:function(){a.bsUtil().AhnlabClearText("us-password-input-textbox");a.ActiveUI=this;draggable(c,document.getElementById("us-div-password-title"));g.style.display="block";a.uiUtil().offsetResize(c);window.onresize=function(){a.uiUtil().offsetResize(c);h&&h()};a.uiLayerLevel+=10;a.ESVS.TabIndex+=30;a.bsUtil().ahnlabInit();setTimeout(function(){var e=c.getElementsByTagName("p");if(0<e.length)for(var b=0;b<e.length;b++)"us-password-lbl-title"==e[b].id&&e[b].focus();a.bsUtil().SetSecurityStatus("us-password-input-textbox");a.bsUtil().SetReScan()},10)},hide:function(){g.style.display="none";c.style.display="none"},dispose:function(){window.onresize=function(){h&&h()};c.parentNode.parentNode.removeChild(c.parentNode);g.parentNode.removeChild(g);a.uiLayerLevel-=10;a.ESVS.TabIndex-=30}}}};