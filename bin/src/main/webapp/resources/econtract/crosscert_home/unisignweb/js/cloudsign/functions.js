/**
 * @author crosscert
 * @version 1.0.0
 * @since 2017.08.07
 * @description
 */

var _relay_server_url = "http://121.131.155.121:37001/relay";
// var _relay_server_url = "http://192.168.22.121:37001/relay";

var messageNumber;
var sessionID;
var certList;
var signature;
var certR;

function query(req, callbackFUNC) {
    var xhr;
    var target;
    var myRep = {};
    var originalReq = JSON.parse(req);
    target = _relay_server_url;
    
    if (originalReq.manager != undefined)
        target += '/Manager';
    
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    
    xhr.open('POST', target, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4) {
            if (xhr.status != 200) {
                myRep.operation = originalReq.operation;
                myRep.messageNumber = originalReq.messageNumber;
                myRep.resultCode = 33434461;
                myRep.resultMessage = 'unexpected answer from Security Server :'
                        + xhr.status;
                callbackFUNC(JSON.stringify(myRep));
            } else {
                callbackFUNC(xhr.responseText);
            }
        }
    }
    xhr.send(req);
};

function reqGetCert(userID, callbackRV) {
    // create seesion
    messageNumber = 1000;
    
    var msg = {
        "messageNumber" : messageNumber,
        "sessionID" : "",
        "client" : "PC",
        "operation" : "CREATE_SESSION_PC",
        "userID" : userID
    };
    // document.getElementById('reqData').value = JSON.stringify(msg);
    
    var res = query(JSON.stringify(msg), function(res) {
      //  document.getElementById('resData').value = res;
        
        var jResponse = JSON.parse(res);
        if (jResponse.resultCode == '0000') {
            sessionID = jResponse.sessionID;
            var cnt = jResponse.certList.length;
            // certList init.
            certList = new Array();
            // call a function(getCert)
            var res = getCert(cnt, sessionID, function(res) {
                if (res.resultCode == '0000') {
                   // document.getElementById('certData').value = res.certificate;
                    // insert certificate into certList
                    certList.push(res.certificate);
                    // callback(RV)
                    callbackRV(res.resultCode, res.resultMessage, certList, '');
                } else {
                    // callback(RV)
                    callbackRV(res.resultCode, res.resultMessage, '', '');
                }
            });
        } else {
            // callback(RV)
            callbackRV(jResponse.resultCode, jResponse.resultMessage, '', '');
        }
    });
};

function getCert(cnt, sessionID, callbackCERT) {
    // get certificate
    for (var i=1; i<(cnt+1); i++) {
        messageNumber = messageNumber + 1;
        var msg = {
            "messageNumber" : messageNumber,
            "sessionID" : sessionID,
            "client" : "PC",
            "certificateIndex" : i,
            "operation" : "GET_CERTIFICATE"
        };
        //document.getElementById('reqData').value = JSON.stringify(msg);
        
        var res = query(JSON.stringify(msg), function(res) {
            //document.getElementById('resData').value = res;
            // callback(CERT)
            callbackCERT(JSON.parse(res));
        });
    }
};


function reqGenSign(index, pinData, callbackRV) {
    // verify pin
    messageNumber = messageNumber+1;
    var msg = {
        "messageNumber" : messageNumber,
        "sessionID" : sessionID,
        "client" : "PC",
        // "encPinData" : crosscert.util.encode64(pinData),
        "encPinData" : "7JR0Bm57P98fFwMgokZWYA==",
        "operation" : "VERIFY_PIN"
    };
    //document.getElementById('reqData').value = JSON.stringify(msg);
    
    var res = query(JSON.stringify(msg), function(res) {
       // document.getElementById('resData').value = res;
        
        var jResponse = JSON.parse(res);
        if (jResponse.resultCode == '0000') {
            // generate signature
            messageNumber = messageNumber+1;
            var msg = {
                "messageNumber" : messageNumber,
                "sessionID" : sessionID,
                "client" : "PC",
                "operation" : "GENERATE_SIGNATURE",
                "certificateIndex" : index,
                "tobeSignedData" : "RW50ZXIgdGV4dCB0byBlbmNvZGUgb3IgZGVjb2RlIGhlcmUu",
                "keyLength" : 2048,
                "mechanism" : 0
            };
            //document.getElementById('reqData').value = JSON.stringify(msg);
            
            var res = query(JSON.stringify(msg), function(res) {
               // document.getElementById('resData').value = res;
                
                var jResponse = JSON.parse(res);
                if (jResponse.resultCode == '0000') {
                    signature = jResponse.signature;
                    //document.getElementById('signedData').value = signature;
                    
                    // get certificateR
                    messageNumber = messageNumber+1;
                    var msg = {
                            "messageNumber" : messageNumber,
                            "sessionID" : sessionID,
                            "client" : "PC",
                            "certificateIndex" : index,
                            "operation" : "GET_CERTIFICATE_R"
                    };
                    //document.getElementById('reqData').value = JSON.stringify(msg);
                    
                    var res = query(JSON.stringify(msg), function(res) {
                       // document.getElementById('resData').value = res;
                        
                        var jResponse = JSON.parse(res);
                        if (jResponse.resultCode == '0000') {
                            certR = jResponse.certificateR;
                            // callback(RV)
                            callbackRV(jResponse.resultCode, jResponse.resultMessage, signature, certR);
                            // close session
                            closeSession();
                        } else {
                            // callback(RV)
                            callbackRV(jResponse.resultCode, jResponse.resultMessage, '', '');
                            // close session
                            closeSession();
                        }
                    });
                } else {
                    // callback(RV)
                    callbackRV(jResponse.resultCode, jResponse.resultMessage, '', '');
                    // close session
                    closeSession();
                }
            });
        } else {
            // callback(RV)
            callbackRV(jResponse.resultCode, jResponse.resultMessage, '', '');
            // close session
            closeSession();
        }
    });
};

function closeSession() {
    // close session
    messageNumber = messageNumber+1;
    var msg = {
        "messageNumber" : messageNumber,
        "sessionID" : sessionID,
        "client" : "PC",
        "operation" : "CLOSE_SESSION"
    };
    //document.getElementById('reqData').value = JSON.stringify(msg);
    
    var res = query(JSON.stringify(msg), function(res) {
       // document.getElementById('resData').value = res;
        
        var jResponse = JSON.parse(res);
        if (jResponse.resultCode == '0000') {
            // var init.
            messageNumber = 0;
        }
    });
};
