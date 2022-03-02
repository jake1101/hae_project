var __newpassword=function(a){var q=function(h){function n(){var b=document.getElementById("us-new-password-first-textbox").value,c=document.getElementById("us-password-check-rule1"),e=document.getElementById("us-password-check-rule2"),l=document.getElementById("us-password-check-rule3"),f=document.getElementById("us-password-check-rule4"),p=document.getElementById("us-password-check-rule5"),d=!0;a.ESVS.LimitMinNewPWLen<=b.length?c.className="check":(c.className="",d=!1);if(a.bsUtil().isKeyProtected())return d;"NPKI"===a.ESVS.PKI||2===a.ESVS.LimitNewPWPattern?(c=/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/g,c.exec(b)?e.className="check":(e.className="",d=!1)):1===a.ESVS.LimitNewPWPattern&&(c=/^(?=.*[a-zA-Z])(?=.*[0-9])/g,c.exec(b)?e.className="check":(e.className="",d=!1));if("NPKI"===a.ESVS.PKI&&a.ESVS.ChangePWByNPKINewPattern)if(c=/['"\\|]/g,c.exec(b)?(p.className="",d=!1):p.className="check",2<b.length){for(e=0;e<b.length-2;e++)if(b.charAt(e)===b.charAt(e+1)&&b.charAt(e)===b.charAt(e+2)){l.className="";d=!1;break}else l.className="check";for(e=0;e<b.length-2;e++)if(b.charCodeAt(e)===b.charCodeAt(e+1)-1&&b.charCodeAt(e)===b.charCodeAt(e+2)-2){f.className="";d=!1;break}else f.className="check"}else l.className="check",f.className="check";return d}function k(b){var c=document.getElementById("us-new-password-first-textbox"),e=document.getElementById("us-new-password-second-textbox"),d=c.value,f=e.value;d&&4&a.ESVS.Mode&&("touchen"==a.ESVS.SecureKeyboardType&&a.bsUtil().isTouchEnKeyUsable()?(d=a.bsUtil().GetEncryptPwd("us-keyboard-secure-frm","us-new-password-first-textbox"),f=a.bsUtil().GetEncryptPwd("us-keyboard-secure-frm2","us-new-password-second-textbox")):"ahnlab"==a.ESVS.SecureKeyboardType&&a.bsUtil().isAhnlabProtectorUsable()&&(d=a.bsUtil().GetAhnlabEncInputInfo("us-new-password-first-textbox"),f=a.bsUtil().GetAhnlabEncInputInfo("us-new-password-second-textbox")));if(a.bsUtil().isKeyProtected())4&a.ESVS.Mode&&a.nimservice()&&a.nimservice().CheckNewPasswdCombination(d,f,a.ESVS.LimitMinNewPWLen,a.ESVS.LimitMaxNewPWLen,a.ESVS.LimitNewPWPattern,function(b,g){if(0!=b)return a.ERROR.Code=b,a.ERROR.Message=g,a.uiUtil().errMsgBox(g,b),c.value="",e.value="",a.bsUtil().AhnlabClearText("us-new-password-first-textbox"),a.bsUtil().AhnlabClearText("us-new-password-second-textbox"),!1;h.onConfirm(d,f);c.value="";e.value=""});else{if(!d)return a.uiUtil().msgBox(b.IDS_MSGBOX_ERROR_PLEASE_INPUT_NEW_PASSWORD),c.focus(),!1;if(a.ESVS.LimitMaxNewPWLen<d.length)return a.uiUtil().msgBox(a.ESVS.LimitMaxNewPWLen+b.IDS_MSGBOX_ERROR_LONGER_THAN_LIMIT_MAX_LENGTH),c.focus(),!1;if(!n())return a.uiUtil().msgBox(b.IDS_MSGBOX_ERROR_CANT_PASS_RULES),c.focus(),!1;if(d!=f)return a.uiUtil().msgBox(b.IDS_MSGBOX_ERROR_PLEASE_RETRY_TO_INPUT_CORRECTLY),c.focus(),!1;h.onConfirm(d,f);c.value="";e.value=""}return!0}var g=function(){var b;b=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");b.open("GET",a.ESVS.SRCPath+"unisignweb/rsrc/layout/newpassword.html?version="+a.ver,!1);b.send(null);return b.responseText},m=function(){var b;b=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");b.open("GET",a.ESVS.SRCPath+"unisignweb/rsrc/lang/"+a.ESVS.Language+"/newpassword_"+a.ESVS.Language+".js?version="+a.ver,!1);b.send(null);return b.responseText},d=a.ESVS.TabIndex;return function(){var b=eval(g),c=eval(eval(m)());a.ESVS.TargetObj.innerHTML=b();b=document.getElementById("us-new-password-lbl-title");b.appendChild(document.createTextNode(c.IDS_NEW_PASSWORD));b.setAttribute("tabindex",d,0);document.getElementById("us-new-password-cls-btn-img").setAttribute("src",a.ESVS.SRCPath+"unisignweb/rsrc/img/x-btn.png",0);document.getElementById("us-new-password-lock-img").setAttribute("src",a.ESVS.SRCPath+"unisignweb/rsrc/img/password-lock-img.png",0);document.getElementById("us-new-password-notice-text").innerHTML=c.IDS_NEW_PASSWORD_NOTICE+"<br>("+a.ESVS.LimitMinNewPWLen+c.IDS_NEW_PASSWORD_LIMIT+")";document.getElementById("us-new-password-first-lbl").appendChild(document.createTextNode(c.IDS_NEW_PASSWORD_FIRST));a.uiUtil().addCapsLockEvent("us-new-password-first-textbox","us-new-password-err-msg-capslock",c.IDS_MSGBOX_CAPSLOCK_ON,null);b=document.getElementById("us-new-password-first-textbox");b.setAttribute("tabindex",d+1,0);b.onkeyup=function(a){n()};document.getElementById("us-new-password-second-lbl").appendChild(document.createTextNode(c.IDS_NEW_PASSWORD_SECOND));b=document.getElementById("us-new-password-second-textbox");b.setAttribute("tabindex",d+2,0);b.onkeydown=function(a){if(a=a?a:event)a=a||window.event,13==(a.which||a.keyCode)&&document.getElementById("us-new-password-confirm-btn").click()};document.getElementById("us-password-check-rule1").appendChild(document.createTextNode(a.ESVS.LimitMinNewPWLen+""+c.IDS_PASSWORD_RULE1));if("NPKI"===a.ESVS.PKI){b=document.getElementById("us-password-check-rule2");b.appendChild(document.createTextNode(c.IDS_PASSWORD_RULE2_ALL));var e=document.getElementById("us-password-check-rule3");e.appendChild(document.createTextNode(c.IDS_PASSWORD_RULE3));var l=document.getElementById("us-password-check-rule4");l.appendChild(document.createTextNode(c.IDS_PASSWORD_RULE4));var f=document.getElementById("us-password-check-rule5");f.appendChild(document.createTextNode(c.IDS_PASSWORD_RULE5));a.bsUtil().isKeyProtected()&&(b.className="disable",e.className="disable",l.className="disable",f.className="disable")}else b=document.getElementById("us-password-check-rule2"),1===a.ESVS.LimitNewPWPattern?b.appendChild(document.createTextNode(c.IDS_PASSWORD_RULE2_ENGNUM)):2===a.ESVS.LimitNewPWPattern&&b.appendChild(document.createTextNode(c.IDS_PASSWORD_RULE2_ALL)),a.bsUtil().isKeyProtected()&&(b.className="disable");document.getElementById("us-new-password-warning-text").appendChild(document.createTextNode(c.IDS_NEW_PASSWORD_WARNING));b=document.getElementById("us-new-password-confirm-btn");b.setAttribute("value",c.IDS_CONFIRM,0);b.setAttribute("title",c.IDS_CONFIRM+c.IDS_BUTTON,0);b.setAttribute("tabindex",d+3,0);b.onclick=function(){k(c)};b=document.getElementById("us-new-password-cancel-btn");b.setAttribute("value",c.IDS_CANCEL,0);b.setAttribute("title",c.IDS_CANCEL+c.IDS_BUTTON,0);b.setAttribute("tabindex",d+4,0);b.onclick=function(){h.onCancel()};b=document.getElementById("us-new-password-cls-img-btn");b.setAttribute("title",c.IDS_NEW_PASSWORD_CLOSE,0);b.setAttribute("tabindex",d+5,0);b.onclick=function(){h.onCancel()};return document.getElementById("us-div-new-password")}()};return function(h){var n=a.uiLayerLevel,k=a.uiUtil().getOverlay(n),g=q({type:h.type,args:h.args,onConfirm:h.onConfirm,onCancel:h.onCancel});g.style.zIndex=n+1;a.ESVS.TargetObj.insertBefore(k,a.ESVS.TargetObj.firstChild);var m=window.onresize;return{show:function(){a.ActiveUI=this;draggable(g,document.getElementById("us-div-new-password-title"));k.style.display="block";a.uiUtil().offsetResize(g);window.onresize=function(){a.uiUtil().offsetResize(g);m&&m()};a.uiLayerLevel+=10;a.ESVS.TabIndex+=30;a.bsUtil().ahnlabInit();setTimeout(function(){var d=g.getElementsByTagName("p");if(0<d.length)for(var b=0;b<d.length;b++)"us-new-password-lbl-title"==d[b].id&&d[b].focus();a.bsUtil().SetSecurityStatus("us-new-password-first-textbox");a.bsUtil().SetSecurityStatus("us-new-password-second-textbox");a.bsUtil().SetReScan()},10)},hide:function(){k.style.display="none";g.style.display="none"},dispose:function(){window.onresize=function(){m&&m()};g.parentNode.removeChild(g);k.parentNode.removeChild(k);a.uiLayerLevel-=10;a.ESVS.TabIndex-=30}}}};