var __certissue=function(b){var l=function(f){function h(a){if(!a)return!1;var c=document.getElementById("us-cert-issue-ref-number-textbox"),d=document.getElementById("us-cert-issue-auth-code-textbox");if(!c.value)return b.uiUtil().msgBox(a.IDS_MSGBOX_ERROR_PLEASE_INPUT_REF_NUM),c.focus(),!1;if(!d.value)return b.uiUtil().msgBox(a.IDS_MSGBOX_ERROR_PLEASE_INPUT_AUTH_CODE),d.focus(),!1;f.onConfirm(c.value,d.value);return!0}var g=function(){var a;a=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");a.open("GET",b.ESVS.SRCPath+"unisignweb/rsrc/layout/certissue.html?version="+b.ver,!1);a.send(null);return a.responseText},e=function(){var a;a=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");a.open("GET",b.ESVS.SRCPath+"unisignweb/rsrc/lang/"+b.ESVS.Language+"/certissue_"+b.ESVS.Language+".js?version="+b.ver,!1);a.send(null);return a.responseText},d=b.ESVS.TabIndex;return function(){var a=eval(g),c=eval(eval(e)());b.ESVS.TargetObj.innerHTML=a();var k=document.getElementById("us-cert-issue-lbl-title");k.appendChild(document.createTextNode(c.IDS_CERT_ISSUE));k.setAttribute("tabindex",d,0);a=document.getElementById("us-cursor-disabled");a.setAttribute("title",c.IDS_SENSE_READER_INTRO,0);a.setAttribute("tabindex",d+1,0);document.getElementById("us-cert-issue-cls-btn-img").setAttribute("src",b.ESVS.SRCPath+"unisignweb/rsrc/img/x-btn.png",0);document.getElementById("us-cert-issue-notice-lbl").appendChild(document.createTextNode(c.IDS_CERT_ISSUE_NOTICE));document.getElementById("us-cert-issue-ref-number-lbl").appendChild(document.createTextNode(c.IDS_CERT_ISSUE_REF_NUM));document.getElementById("us-cert-issue-ref-number-textbox").setAttribute("tabindex",d+2,0);document.getElementById("us-cert-issue-auth-code-lbl").appendChild(document.createTextNode(c.IDS_CERT_ISSUE_AUTH_CODE));a=document.getElementById("us-cert-issue-auth-code-textbox");a.setAttribute("tabindex",d+3,0);a.onkeydown=function(a){if(a=a?a:event)a=a||window.event,13==(a.which||a.keyCode)&&document.getElementById("us-cert-issue-confirm-btn").click()};a=document.getElementById("us-cert-issue-confirm-btn");a.setAttribute("value",c.IDS_CONFIRM,0);a.setAttribute("title",c.IDS_CONFIRM+c.IDS_BUTTON,0);a.setAttribute("tabindex",d+4,0);a.onclick=function(){h(c)};a=document.getElementById("us-cert-issue-cancel-btn");a.setAttribute("value",c.IDS_CANCEL,0);a.setAttribute("title",c.IDS_CANCEL+c.IDS_BUTTON,0);a.setAttribute("tabindex",d+5,0);a.onclick=function(){f.onCancel()};a=document.getElementById("us-cert-issue-cls-img-btn");a.setAttribute("title",c.IDS_CERT_ISSUE_CLOSE,0);a.setAttribute("tabindex",d+6,0);a.onfocus=function(){k.focus()};a.onclick=function(){f.onCancel()};return document.getElementById("us-div-cert-issue")}()};return function(f){var h=b.uiLayerLevel,g=b.uiUtil().getOverlay(h),e=l({type:f.type,args:f.args,onConfirm:f.onConfirm,onCancel:f.onCancel});e.style.zIndex=h+1;b.ESVS.TargetObj.insertBefore(g,b.ESVS.TargetObj.firstChild);var d=window.onresize;return{show:function(){b.ActiveUI=this;draggable(e,document.getElementById("us-div-cert-issue-title"));g.style.display="block";b.uiUtil().offsetResize(e);window.onresize=function(){b.uiUtil().offsetResize(e);d&&d()};b.uiLayerLevel+=10;b.ESVS.TabIndex+=30;setTimeout(function(){var a=e.getElementsByTagName("p");if(0<a.length)for(var b=0;b<a.length;b++)"us-cert-issue-lbl-title"==a[b].id&&a[b].focus()},10)},hide:function(){g.style.display="none";e.style.display="none"},dispose:function(){window.onresize=function(){d&&d()};e.parentNode.removeChild(e);g.parentNode.removeChild(g);b.uiLayerLevel-=10;b.ESVS.TabIndex-=30}}}};