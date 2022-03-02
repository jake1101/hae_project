(function(){function x(c){c=window.crosscert||{};var l=c.usWebCMPXMLHttp=c.usWebCMPXMLHttp||{},b=c.usWebCMP=c.usWebCMP||{},h=c.cmp=c.cmp||{},e=c.util||{},w=c.asn1||{},t=null,f=null,B=null,C=null,s=null,y=null,z=null;b.info={version:"0a",pkiReq:"00",pkiRep:"05",flags:"00"};b.revReason=h.revReason;b.issueCert=function(a,d,u,c,e,g,m,k,n,q){try{if(null==g||"undefined"==typeof g)throw{code:"120004",message:"StorageHendler is empty."};t=g;if(null==m||"undefined"==typeof m)throw{code:"120005",message:"The CMP callback function is empty."};f=m;null!=k&&"undefined"!=typeof k&&(B=k);null!=n&&"undefined"!=typeof n&&(C=n);null!=q&&"undefined"!=typeof q&&(s=q);b.info.storageInfo=c;var r=h.createGenmMessage(a,d,u,e),A=_create(r.toAsn1());l.uniSignE2ERequest("POST",A,"http://211.180.234.216/GenmGenp.do",_issueCertGenPIR)}catch(v){f(3,"",v)}};_issueCertGenPIR=function(a){if("object"==typeof a)_showErrMSG(a);else try{var d=_parse(a);h.messageFromAsn1(d);try{var u=c.cmp.createIRMessage(B,C),b=_create(u.toAsn1());l.uniSignE2ERequest("POST",b,"http://211.180.234.216/IrIp.do",_issueCertIPConf)}catch(e){f(3,"",e)}}catch(g){null!=g.code?_errMsg(g.message):f(3,"",g)}};_issueCertIPConf=function(a){if("object"==typeof a)_showErrMSG(a);else try{var d=_parse(a);h.messageFromAsn1(d);try{if(null==s||"undefined"==typeof s?_saveCertificate():s(t,h.user)){var b=c.cmp.createConfirmMessage(),e=_create(b.toAsn1());l.uniSignE2ERequest("POST",e,"http://211.180.234.216/Confirm.do",_CMPConfirm)}else{var p=c.cmp.createErrorMessage(),g=_create(p.toAsn1());l.uniSignE2ERequest("POST",g,"http://211.180.234.216/Confirm.do")}}catch(m){f(3,"",m)}}catch(k){null!=k.code?_errMsg(k.message):f(3,"",k)}};_CMPConfirm=function(a){if("object"==typeof a)_showErrMSG(a);else try{var d=_parse(a);endtime=(new Date).getTime();"00"==e.bytesToHex(d)?f(1,""):f(2,"CMP fail!")}catch(b){null!=b.code?_errMsg(b.message):f(3,"",b)}};_errMsg=function(a){a="EncodingType=utf8&ErrMessage="+encodeURIComponent(b.messageToBase64(c.util.createBuffer(a)));l.uniSignE2ERequest("POST",a,"http://211.180.234.216/EncodingErrMsg.do",_showErrMSG,"application/x-www-form-urlencoded;charset=UTF-8")};_showErrMSG=function(a){if("object"==typeof a){var d="",d=""!=a.statusText?a.statusText:a.responseText;f(2,d+"(status :"+a.status+")")}else f(2,b.messageFromBase64(a).toString())};_create=function(a){var d=e.createBuffer();a=w.toDer(a).getBytes();d.putBuffer(x(a.length+3));d.putBytes(e.hexToBytes(b.info.version));d.putBytes(e.hexToBytes(b.info.flags));d.putBytes(e.hexToBytes(b.info.pkiReq));d.putBytes(a);return b.messageToBase64(d)};_parse=function(a){a=b.messageFromBase64(decodeURIComponent(a));var d=a.getInt32();if(d!=a.length())throw{code:"120001",message:"WebCMP Message has wrong length."};if(a.getBytes(1)!=e.hexToBytes(b.info.version))throw{code:"120002",message:"WebCMP version is not supported."};a.getBytes(1);if(a.getBytes(1)!=e.hexToBytes(b.info.pkiRep))throw{code:"120003",message:"WebCMP message type is not supported."};return a.getBytes(d-3)};_saveCertificate=function(){try{t.SaveUserCert(_getCAName(c.pki.certificateFromBase64(h.user.signcert)),h.user,b.info.storageInfo,!0)}catch(a){throw a;}return!0};_getCertName=function(a){return(new c.x509Certificate.certUtil).getDN(a.subject)};_getCAName=function(a){a=a.subject;for(var d=0;d<a.attributes.length;d++)if("o"==a.attributes[a.attributes.length-(d+1)].shortName)return c.util.createBuffer(a.attributes[a.attributes.length-(d+1)].value).toString().toLowerCase()};_deleteCertificate=function(){var a=_getCertName(h.info.signCert);return t.DeleteUserCertByDN(_getCAName(h.info.signCert),a,b.info.storageInfo)};b.revocation=function(a,d,u,e,p,g,m,k,n,q){try{if(null==m||"undefined"==typeof m)throw{code:"120006",message:"StorageHendler is empty."};t=m;if(null==k||"undefined"==typeof k)throw{code:"120007",message:"The CMP callback function is empty."};f=k;null!=n&&"undefined"!=typeof n&&(z=n);null!=q&&"undefined"!=typeof q&&(y=q);b.info.storageInfo=p;a=c.pki.certificateFromBase64(a);if(null==n||"undefined"==typeof n)d=c.pkcs8.encryptedPrivateKeyFromBase64(d);u=null!=h.info.kmCert&&"undefined"!=typeof h.info.kmCert?c.pki.certificateFromBase64(u):null;var r=h.createRRMessage(a,d,u,e,g,z),s=_create(r.toAsn1());l.uniSignE2ERequest("POST",s,"http://211.180.234.216/Rr.do",_revocation1)}catch(v){f(3,"",v)}};_revocation1=function(a){if("object"==typeof a)_showErrMSG(a);else try{var d=_parse(a);h.messageFromAsn1(d);try{null==y||"undefined"==typeof y?_deleteCertificate():y(t,h.info.signCert),f(1)}catch(b){f(3,"",b)}}catch(c){null!=c.code?_errMsg(c.message):f(3,"",c)}};b.update=function(a,d,e,w,p,g,m,k,n,q,r,A,v){try{if(null==k||"undefined"==typeof k)throw{code:"120008",message:"StorageHendler is empty."};t=k;if(null==n||"undefined"==typeof n)throw{code:"120009",message:"The CMP callback function is empty."};f=n;null!=q&&"undefined"!=typeof q&&(B=q);null!=r&&"undefined"!=typeof r&&(C=r);null!=A&&"undefined"!=typeof A&&(z=A);null!=v&&"undefined"!=typeof v&&(s=v);b.info.storageInfo=g;g={};g.signCert=c.pki.certificateFromBase64(a);if(null==r||"undefined"==typeof r)g.signKey=c.pkcs8.encryptedPrivateKeyFromBase64(d);g.pw=p;"undefined"!==typeof e&&(g.kmCert=c.pki.certificateFromBase64(e),null==r||"undefined"==typeof r)&&(g.kmKey=c.pkcs8.encryptedPrivateKeyFromBase64(w));var x=h.createGenmMessage(g.signCert.serialNumber,"",p,m,g),y=_create(x.toAsn1());l.uniSignE2ERequest("POST",y,"http://211.180.234.216/GenmGenp.do",_updateCertGenPKUR)}catch(D){f(3,"",D)}};_updateCertGenPKUR=function(a){if("object"==typeof a)_showErrMSG(a);else try{var d=_parse(a);h.messageFromAsn1(d);var b=c.cmp.createKURMessage(B,C,z),e=_create(b.toAsn1());l.uniSignE2ERequest("POST",e,"http://211.180.234.216/KurKup.do",_updateCertKUPConf)}catch(p){null!=p.code?_errMsg(p.message):f(3,"",p)}};_updateCertKUPConf=function(a){if("object"==typeof a)_showErrMSG(a);else try{var d=_parse(a);h.messageFromAsn1(d);try{if(null==s||"undefined"==typeof s?_saveCertificate():s(t,h.user)){var b=c.cmp.createConfirmMessage(z),e=_create(b.toAsn1());l.uniSignE2ERequest("POST",e,"http://211.180.234.216/Confirm.do",_CMPConfirm)}else{var p=c.cmp.createErrorMessage(),g=_create(p.toAsn1());l.uniSignE2ERequest("POST",g,"http://211.180.234.216/Confirm.do")}}catch(m){f(3,"",m)}}catch(k){null!=k.code?_errMsg(k.message):f(3,"",k)}};_updateCertConf=function(a){if("object"==typeof a)_showErrMSG(a);else try{var b=_parse(a);endtime=(new Date).getTime();"00"==e.bytesToHex(b)?f(1,""):f(2,"update fail!")}catch(c){null!=c.code?_errMsg(c.message):f(3,"",c)}};b.messageFromBase64=function(a){return e.createBuffer(e.decode64(a))};b.messageToBase64=function(a){"string"==typeof a&&(a=e.createBuffer(e.trim(a)));return e.encode64(a.getBytes())};var x=function(a){var b="";do b+=String.fromCharCode(a&255),a>>>=8;while(0<a);a=e.createBuffer();for(var c=0;c<4-b.length;c++)a.putByte(0);for(c=b.length-1;0<=c;c--)a.putByte(b.charCodeAt(c));return a}}var D=["./cmpasn1","./cmp","./usWebCMPXMLHttp"],w=null;"function"!==typeof define&&("object"===typeof module&&module.exports?w=function(c,l){l(require,module)}:(crosscert=window.crosscert=window.crosscert||{},x(crosscert)));(w||"function"===typeof define)&&(w||define)(["require","module"].concat(D),function(c,l){l.exports=function(b){var h=D.map(function(b){return c(b)}).concat(x);b=b||{};b.defined=b.defined||{};if(b.defined.asn1)return b.asn1;b.defined.asn1=!0;for(var e=0;e<h.length;++e)h[e](b);return b.asn1}})})();