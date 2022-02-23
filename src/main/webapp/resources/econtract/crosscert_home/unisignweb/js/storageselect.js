var __storageselect=function(a){var v=function(c){function u(b){if(!b)return alert("UI load error."),!1;if("CERT_STORAGE"===c.type)a.ESVS.TargetObj.innerHTML=b;else{var d=document.createElement("div");document.body.insertBefore(d,document.body.firstChild);d.innerHTML=b}return!0}function k(b,d,c){if(a.CONST.__USFB_M_DISK.device>b||!d||!c)return!1;var f=a.loadUI("driveselect")({type:"DEVICE_REMOVABLE_DISK",args:d,onConfirm:function(a){g=b;h=a;f.dispose();c.focus()},onCancel:function(){f.dispose();c.focus()}});f.show()}function m(b,d,c){var f=a.loadUI("sectokenselect")({type:b,args:d,onConfirm:function(a){g=b;h=a;r=d.list[a-1].name;f.dispose();c.focus()},onCancel:function(){f.dispose();c.focus()}});f.show()}function n(b,d,c){if(a.CONST.__USFB_M_DISK.device>b||!d||!c)return!1;var f=a.loadUI("driveselect")({type:"DEVICE_SAVE_TOKEN",args:d,onConfirm:function(a){g=b;h=a;f.dispose();c.focus()},onCancel:function(){f.dispose();c.focus()}});f.show()}function x(b,d){var p=null;h=g=0;if(4&a.ESVS.Mode)if(a.nimservice())c.args&&"BACKUP_DRIVE"==c.args.drivetype?a.nimservice().GetBackupedDriveList(function(f,e,g){if(0==f&&g)if(e=g.length,0<e){f=[];for(var s=0;s<e;s++){var h={};h.index=s+1;h.name=g[s];f[s]=h}p={list:f}}else a.uiUtil().loadingBox(!1,"us-div-list-load"),a.uiUtil().msgBox(d.IDS_MSGBOX_NOT_INSERT_BACKUPEDDISK,f),c.onCancel();else a.uiUtil().loadingBox(!1,"us-div-list-load"),a.uiUtil().msgBox(d.IDS_MSGBOX_NOT_INSERT_BACKUPEDDISK,f),c.onCancel();k(a.CONST.__USFB_M_DISK.device,p,b)}):a.nimservice().GetDiskList(function(d,e,c){e=0;c&&(e=c.length);if(0==d&&0<e){d=[];for(var g=0;g<e;g++){var h={};h.index=g+1;h.name=c[g];d[g]=h}p={list:d}}else a.uiUtil().loadingBox(!1,"us-div-list-load"),a.nimservice().GetLastErrorCode();k(a.CONST.__USFB_M_DISK.device,p,b)});else return a.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD),!1;return!0}function y(b,d){var c=null;h=g=0;if(4&a.ESVS.Mode)if(a.nimservice())a.nimservice().GetHSMList(1,function(d,e,g){e=0;g&&(e=g.length);if(0==d&&0<e){d=0;for(var h=[],l=0;l<e;l++){var k={},n=g[l].split("|");k.index=l+1;k.name=n[0];k.driver=n[1];k.passage=n[2];k.validity=n[3];h[d++]=k}c={list:h}}else a.uiUtil().loadingBox(!1,"us-div-list-load"),a.nimservice().GetLastErrorCode();m(a.CONST.__USFB_M_HSMKEY.device,c,b)});else return a.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD),!1;return!0}function t(b,d){if(!b||!d)return!1;a.uiUtil().MsgBox(d.IDS_MSGBOX_NOT_SUPPORTED_MEDIA);return!0}function v(b){if(a.CONST.__USFB_M_DISK.device>g||(a.CONST.__USFB_M_DISK.device===g||a.CONST.__USFB_M_HSMKEY.device===g)&&1>h)return a.uiUtil().msgBox(b.IDS_MSGBOX_ERROR_PLEASE_SELECT_STORAGE),!1;if("CERT_COPY"==c.type&&c.args.sourceDevice===g&&c.args.sourceDrive===h)return a.uiUtil().msgBox(b.IDS_MSGBOX_ERROR_WARNING_SAME_STORAGE),!1;if(("CERT_COPY"===c.type||"CERT_IMPORT"===c.type||"CERT_STORAGE"===c.type)&&a.CONST.__USFB_M_SMARTCARD.device===g&&0===h&&!confirm(b.IDS_CONFIRMBOX_WARNING_CHANGE_CERT))return!1;if(g==a.CONST.__USFB_M_SECUREDISK.device)a.nimservice().IsSDInstalled(function(d,p){a.uiUtil().loadingBox(!1,"us-div-list-load");if(0!=d)a.ERROR.Code=31001,a.ERROR.Message=b.IDS_MSGBOX_NOT_INSTALL_SD,confirm(b.IDS_CONFIRMBOX_NOT_INSTALL_SD)&&(document.getElementById("us-storage-select-cancel-btn").click(),null==("firefox"==a.browserName?window.open(a.ESVS.SDInstallURL,"securedisk_url","scrollbars=1, op=100px, left=100px, height=500px, width=380px"):window.open(a.ESVS.SDInstallURL,"securedisk_url","top=100px, left=100px, height=500px, width=380px"))&&a.uiUtil().msgBox(b.IDS_MSGBOX_BLOCK_POPUP_WINDOW));else return c.onConfirm(g,h,r),!0});else if(g==a.CONST.__USFB_M_MOBILETOKEN.device)a.nimservice().IsInstalledUSIMModule(2,!0,function(d,p){a.uiUtil().loadingBox(!1,"us-div-list-load");if(0==d)a.nimservice().SetUSIMOptions(a.usimEnv.sitecode,a.usimEnv.modecode,a.usimEnv.siteURL,a.usimEnv.serviceIP,a.usimEnv.servicePort,a.usimEnv.downloadURL,function(a){c.onConfirm(g,h,r)});else if(4847E4==d&&(a.ERROR.Code=21002,a.ERROR.Message=b.IDS_MSGBOX_NOT_INSTALL_SMARTCERT,confirm(b.IDS_CONFIRMBOX_NOT_INSTALL_SMARTCERT)))if(document.getElementById("us-storage-select-cancel-btn").click(),"firefox"==a.browserName){var f=window.open(a.usimEnv.downloadURL,"usim_url","scrollbars=1, op=100px, left=100px, height=500px, width=380px");null==f&&a.uiUtil().msgBox(__textObjtext.IDS_MSGBOX_BLOCK_POPUP_WINDOW)}else f=window.open(a.usimEnv.downloadURL,"usim_url","top=100px, left=100px, height=500px, width=380px"),null==f&&a.uiUtil().msgBox(b.IDS_MSGBOX_BLOCK_POPUP_WINDOW)});else if(g==a.CONST.__USFB_M_MOBILE.device)a.nimservice().IsUBIkeyInstalled(function(d,p){if(0!=d)a.ERROR.Code=11003,a.ERROR.Message=b.IDS_MSGBOX_NOT_INSTALL_MOBILE,confirm(b.IDS_CONFIRMBOX_NOT_INSTALL_MOBILE)&&(document.getElementById("us-storage-select-cancel-btn").click(),null==("firefox"==a.browserName?window.open(a.ubiKeyEnv.downloadURL,"ubikey_url","scrollbars=1, op=100px, left=100px, height=500px, width=500px"):window.open(a.ubiKeyEnv.downloadURL,"ubikey_url","top=100px, left=100px, height=500px, width=500px"))&&a.uiUtil().msgBox(b.IDS_MSGBOX_BLOCK_POPUP_WINDOW));else c.onConfirm(g,h,r)});else return c.onConfirm(g,h,r),!0}function l(b){if(!b)return!1;for(var d=a.ESVS.Media.list.split("|"),c=0;c<d.length;c++){var f=a.CONST.medias[d[c]];void 0!=f&&null!=f&&(f=document.getElementById("us-btn-storage-"+f.name),void 0!=f&&null!=f&&"us-layout-storage-btn-none"!=f.className&&(f.className=b===f?"us-layout-storage-btn-on":"us-layout-storage-btn-off"))}return!0}function z(b){if(null==b||void 0==b)return!1;var d=!a.uiUtil().isItSupportingThisStorage(b);!1==d&&null!=a.ESVS.Media&&null!=a.ESVS.Media.list&&0>a.ESVS.Media.list.indexOf(b.name)&&(d=!0);if(d)return!1;var d=document.getElementById("us-btn-storage-btn-list"),c=document.createElement("li");c.setAttribute("id","us-storage-btn-li-"+b.name,0);c.setAttribute("mediaIndex",b.mediaIndex,0);7==b.mediaIndex&&(c.className="line-first");"hidden"===b.visibility?(c.style.display="none",c.style.visibility="hidden"):(c.style.display="block",c.style.visibility="visible");var f=document.createElement("button");f.setAttribute("type","button",0);f.setAttribute("id","us-btn-storage-"+b.name,0);f.setAttribute("title",b.label,0);f.setAttribute("tabindex",b.tabIndex,0);b.disabled?(f.onclick=function(){a.uiUtil().msgBox(A.IDS_MSGBOX_NOT_SUPPORTED_MEDIA)},f.className="us-layout-storage-btn-none"):(f.onclick=b.onclick,f.className=b.device===g?"us-layout-storage-btn-on":"us-layout-storage-btn-off");c.appendChild(f);if("harddisk"!==b.name&&"webstorage"!==b.name){var e=document.createElement("span");e.className="us-drive-select";f.appendChild(e)}e=document.createElement("span");e.className="us-img-storage";var h=document.createElement("img");h.setAttribute("id","us-img-storage-"+b.name,0);h.setAttribute("alt",b.label,0);b.disabled?h.setAttribute("src",a.ESVS.SRCPath+"unisignweb/rsrc/img/media_"+b.name+"_d.png",0):h.setAttribute("src",a.ESVS.SRCPath+"unisignweb/rsrc/img/media_"+b.name+".png",0);e.appendChild(h);f.appendChild(e);e=document.createElement("span");e.setAttribute("id","us-lbl-storage-"+b.name,0);e.className="us-layout-lbl-storage";e.appendChild(document.createTextNode(b.label));f.appendChild(e);c.appendChild(f);d.appendChild(c);return!0}var B=function(){var b;b=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");b.open("GET",a.ESVS.SRCPath+"unisignweb/rsrc/layout/storageselect.html?version="+a.ver,!1);b.send(null);return b.responseText},w=function(){var b;b=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("MSXML2.XMLHTTP.3.0");b.open("GET",a.ESVS.SRCPath+"unisignweb/rsrc/lang/"+a.ESVS.Language+"/storageselect_"+a.ESVS.Language+".js?version="+a.ver,!1);b.send(null);return b.responseText},A=eval(eval(w)()),q=a.ESVS.TabIndex,g=a.CONST.__USFB_M_DISK.device,h=0,r="";null!=a.ESVS.Media&&null!=a.ESVS.Media.defaultdevice?g=a.uiUtil().getMediaDevice(a.ESVS.Media.defaultdevice):2==a.ESVS.Mode&&(g=a.CONST.__PF_M_LS.device);return function(){var b=eval(B),d=eval(eval(w)());u(b());b=document.getElementById("us-storage-select-lbl-title");b.appendChild(document.createTextNode(d.IDS_STORAGE_SELECTION));b.setAttribute("tabindex",q++,0);document.getElementById("us-storage-select-cls-btn-img").setAttribute("src",a.ESVS.SRCPath+"unisignweb/rsrc/img/x-btn.png",0);b=document.getElementById("us-storage-select-notice-lbl");"CERT_STORAGE"===c.type?b.appendChild(document.createTextNode(d.IDS_SAVE_NOTICE)):b.appendChild(document.createTextNode(d.IDS_COPY_NOTICE));for(var b=0,k=a.ESVS.Media.list.split("|"),f=0;f<k.length;f++){var e=a.CONST.medias[k[f]];if(void 0!=e&&null!=e){switch(e.device){case a.CONST.__USFB_M_DISK.device:e.label=d.IDS_STORAGE_REMOVABLE;e.disabled=2==a.ESVS.Mode||"CERT_COPY"==c.type&&c.args.sourceDevice==a.CONST.__USFB_M_SECUREDISK.device;e.onclick=function(){x(this,d);l(this)};break;case a.CONST.__USFB_M_HSMKEY.device:e.label=d.IDS_STORAGE_SECTOKEN;e.disabled="win"!=a.osName||c.args&&"BACKUP_DRIVE"==c.args.drivetype;e.onclick=function(){y(this,d);l(this)};break;case a.CONST.__USFB_M_SMARTCARD.device:e.label=d.IDS_STORAGE_SAVETOKEN;e.disabled="win"!=a.osName||c.args&&"BACKUP_DRIVE"==c.args.drivetype||"CERT_COPY"==c.type&&c.args.sourceDevice==a.CONST.__USFB_M_SECUREDISK.device;e.onclick=function(){var b=null;h=g=0;var b=[],c={};c.index=a.CONST.__USFB_M_SMARTCARD.device;c.name=d.IDS_SAVETOKEN_SMART_CARD;b[0]=c;b={list:b};n(a.CONST.__USFB_M_SMARTCARD.device,b,this);l(this)};break;case a.CONST.__USFB_M_MOBILE.device:e.label=d.IDS_STORAGE_MOBILEPHONE;e.disabled="CERT_STORAGE"==c.type?!0:"win"!=a.osName||2==a.ESVS.Mode||c.args&&"BACKUP_DRIVE"==c.args.drivetype||"CERT_COPY"==c.type&&c.args.sourceDevice==a.CONST.__USFB_M_SECUREDISK.device;e.onclick=function(){g=a.CONST.__USFB_M_MOBILE.device;this.focus();l(this)};break;case a.CONST.__USFB_M_HDD.device:e.label=d.IDS_STORAGE_HARDDISK;e.disabled=2==a.ESVS.Mode||c.args&&"BACKUP_DRIVE"==c.args.drivetype||"CERT_COPY"==c.type&&c.args.sourceDevice==a.CONST.__USFB_M_SECUREDISK.device;e.onclick=function(){g=a.CONST.__USFB_M_HDD.device;this.focus();l(this)};break;case a.CONST.__USFB_M_MOBILETOKEN.device:e.label=d.IDS_STORAGE_MOBILETOKEN;e.disabled="win"!=a.osName||2==a.ESVS.Mode||c.args&&"BACKUP_DRIVE"==c.args.drivetype||"CERT_COPY"==c.type&&c.args.sourceDevice==a.CONST.__USFB_M_SECUREDISK.device;e.onclick=function(){g=a.CONST.__USFB_M_MOBILETOKEN.device;this.focus();l(this)};break;case a.CONST.__USFB_M_SECUREDISK.device:e.label=d.IDS_STORAGE_SECUREDISK;e.disabled="win"!=a.osName||2==a.ESVS.Mode||c.args&&"BACKUP_DRIVE"==c.args.drivetype||"CERT_COPY"==c.type&&c.args.sourceDevice==a.CONST.__USFB_M_SECUREDISK.device;e.onclick=function(){g=a.CONST.__USFB_M_SECUREDISK.device;h=1;this.focus();l(this)};break;case a.CONST.__PF_M_LS.device:e.label=d.IDS_STORAGE_LS;e.disabled=1==a.ESVS.Mode||"CERT_COPY"==c.type;e.onclick=function(){g=a.CONST.__PF_M_LS.device;this.focus();l(this)};break;case a.CONST.__PF_M_SS.device:e.label=d.IDS_STORAGE_SS;e.disabled=1==a.ESVS.Mode||"CERT_COPY"==c.type;e.onclick=function(){g=a.CONST.__PF_M_SS.device;this.focus();l(this)};break;case a.CONST.__PF_M_TOUCHSIGN.device:e.label=d.IDS_STORAGE_TOUCHSIGN;e.disabled=!0;e.onclick=function(){t(this,d)};break;case a.CONST.__PF_M_SMARTSIGN.device:e.label=d.IDS_STORAGE_SMARTSIGN;e.disabled=!0;e.onclick=function(){t(this,d)};break;case a.CONST.__PF_M_WEBSECTOKEN.device:e.label=d.IDS_STORAGE_WEBSECTOKEN;e.disabled=!0;e.onclick=function(){t(this,d)};break;case a.CONST.__PF_M_WEBSOFTTOKEN.device:e.label=d.IDS_STORAGE_WEBSOFTTOKEN;e.disabled=!0;e.onclick=function(){t(this,d)};break;case a.CONST.__PF_M_CLOUDSIGN.device:e.label=d.IDS_STORAGE_CLOUDSIGN;e.disabled=1==a.ESVS.Mode;e.onclick=function(){g=a.CONST.__PF_M_CLOUDSIGN.device;this.focus();l(this)};break;default:e.label=d.IDS_STORAGE_ETC,e.disabled=!0,e.onclick=function(){t(this,d)}}e.tabIndex=q;e.mediaIndex=b+1;e.visibility="visible";z(e)&&(q++,b++,1==b&&document.getElementById("us-btn-storage-"+e.name))}}document.getElementById("us-storage-select-warning-lbl").appendChild(document.createTextNode(d.IDS_WARNING));b=document.getElementById("us-storage-select-confirm-btn");b.setAttribute("value",d.IDS_CONFIRM,0);b.setAttribute("title",d.IDS_CONFIRM+d.IDS_BUTTON,0);b.setAttribute("tabindex",q++,0);b.onclick=function(){v(d)};b=document.getElementById("us-storage-select-cancel-btn");b.setAttribute("value",d.IDS_CANCEL,0);b.setAttribute("title",d.IDS_CANCEL+d.IDS_BUTTON,0);b.setAttribute("tabindex",q++,0);b.onclick=function(){c.onCancel()};b=document.getElementById("us-storage-select-cls-img-btn");b.setAttribute("title",d.IDS_STORAGE_SELECTION_CLOSE,0);b.setAttribute("tabindex",q++,0);b.onclick=function(){c.onCancel()};return document.getElementById("us-div-storage-select")}()};return function(c){var u=a.uiLayerLevel,k=a.uiUtil().getOverlay(u),m=v({type:c.type,args:c.args,onConfirm:c.onConfirm,onCancel:c.onCancel});m.style.zIndex=u+1;a.ESVS.TargetObj.insertBefore(k,a.ESVS.TargetObj.firstChild);var n=window.onresize;return{show:function(){a.ActiveUI=this;draggable(m,document.getElementById("us-div-storage-select-title"));k.style.display="block";a.uiUtil().offsetResize(m);window.onresize=function(){a.uiUtil().offsetResize(m);n&&n()};a.uiLayerLevel+=10;a.ESVS.TabIndex+=30;setTimeout(function(){var a=m.getElementsByTagName("p");if(0<a.length)for(var c=0;c<a.length;c++)"us-storage-select-lbl-title"==a[c].id&&a[c].focus()},10)},hide:function(){k.style.display="none";m.style.display="none"},dispose:function(){window.onresize=function(){n&&n()};"CERT_STORAGE"===c.type?m.parentNode.removeChild(m):m.parentNode.parentNode.removeChild(m.parentNode);k.parentNode.removeChild(k);a.uiLayerLevel-=10;a.ESVS.TabIndex-=30}}}};