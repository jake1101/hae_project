var __certview = function( SANDBOX ) {
	var ConstructScreen = function( Param ) {	
		var __UIElement = {
			__Layout: function() {
				var req;
	
				if ( window.XMLHttpRequest ) {
					req = new window.XMLHttpRequest;
				} else {
					req = new ActiveXObject('MSXML2.XMLHTTP.3.0');
				}
				
				req.open('GET', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/layout/certview.html?version=' + SANDBOX.ver, false);
				req.send(null);
				
				return req.responseText;
			},
			__Lang: function() {
				var req; 
				
				if ( window.XMLHttpRequest ) { 
					req = new window.XMLHttpRequest; 
				} else { 
					req = new ActiveXObject('MSXML2.XMLHTTP.3.0'); 
				}
				
				req.open('GET', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/lang/certview_' + SANDBOX.ESVS.Language + '.js?version=' + SANDBOX.ver, false);
				req.send(null);
				
				return req.responseText;
			}
		};
		
		var __ListUI = null;
		var __DetailList = null;
		var __ViewList = null;
		var __Valid = true;
		var __TabIndex = SANDBOX.ESVS.TabIndex;

		var console = window.console || { log: function() {} };  // for debug
		
		function UILoad( form ) {
			if ( !form ) {
				alert('UI load error.');
				return false;
			}
			
			var topElement = document.createElement('div');
			document.body.insertBefore( topElement, document.body.firstChild );
			topElement.innerHTML = form;
			return true;
		}
		
		function WindowConfirm() {
			// 2013.11.18
			__DetailList.restoreOnMouseEvent();
			// 2013.11.18
			
			Param.onConfirm();
		}
		
		function WindowExit() {
			// 2013.11.18
			__DetailList.restoreOnMouseEvent();
			// 2013.11.18
			
			Param.onCancel();
		}
		
		function ViewContent( index ) {
			var _index = parseInt(index);
			var simpleView = document.getElementById('us-view-simple');
			var detailView = document.getElementById('us-view-detail');
			var certpathView = document.getElementById('us-view-certpath');
			
			var cpsBtn = document.getElementById('us-view-cert-cps-btn');
			var confirmBtn = document.getElementById('us-view-cert-confirm-btn');
			var closeBtn = document.getElementById('us-view-cls-img-btn');
			
			
			if ( 0 === _index ) {  // simple view
				simpleView.style.display = 'block';
				detailView.style.display = 'none';
				certpathView.style.display = 'none';
				cpsBtn.style.display = 'inline';
				
				__DetailList.clearList();
				
				cpsBtn.setAttribute('tabindex', __TabIndex + 3, 0);
				confirmBtn.setAttribute('tabindex', __TabIndex + 4, 0);
				closeBtn.setAttribute('tabindex', __TabIndex + 5, 0);
			} else if ( 1 === _index ) {  // detail view
				simpleView.style.display = 'none';
				detailView.style.display = 'block';
				certpathView.style.display = 'none';
				cpsBtn.style.display = 'none';
				
				__DetailList.redrawList(__ViewList.list, __ViewList.list.length);
				
				cpsBtn.removeAttribute('tabindex');
				confirmBtn.setAttribute('tabindex', __TabIndex + 4, 0);
				closeBtn.setAttribute('tabindex', __TabIndex + 5, 0);
			}else if ( 2 === _index ) {  // certpathView
				simpleView.style.display = 'none';
				detailView.style.display = 'none';
				certpathView.style.display = 'block';
				cpsBtn.style.display = 'none';
				
				confirmBtn.setAttribute('tabindex', __TabIndex + 5, 0);
				closeBtn.setAttribute('tabindex', __TabIndex + 6, 0);
			}
		}
		
		function RollOver( els, obj ) {
			if( 0 == els.length || !obj ) {
				return;
			}
			
			var _els = els;
			var _obj = obj;
			
			for( n in _els ) {
				if( typeof _els[n] == "object" ) {
					if( _els[n] == _obj ) {
						var ocss = _els[n].className;
						_els[n].className = ocss + " " + _els[n].getAttribute("overcss");
					} else {
						_els[n].className = _els[n].getAttribute("outcss");
					}
				}
			}
		}
		
		function TabController( e, obj ) {
			var evt = e || window.event;
			var target = evt.target || evt.srcElement;
			//var outer = obj.getElementsByTagName('li');
			//var tabs = obj.getElementsByTagName('div');
			var tabs = obj.getElementsByTagName('a');
			var simpleViewTab = document.getElementById('us-view-tab-simple');
			var detailViewTab = document.getElementById('us-view-tab-detail');
			var certpathTab = document.getElementById('us-view-tab-certpath');
			
			for( nTab in tabs ) {
				if( target == tabs[nTab] ) {
					if ( isNaN(nTab) ) {  // for IE
						if ( nTab == 'us-view-tab-simple' ) {
							nTab = 0;
						} else if( nTab == 'us-view-tab-detail' ) {  //us-view-tab-detail
							nTab = 1;
						} else if( nTab == 'us-view-tab-certpath' ) {  //us-view-tab-certpath
							nTab = 2;
						}
					}

					if ( nTab == 0 ) {
						simpleViewTab.className = 'us-view-tab-tag active';
						detailViewTab.className = 'us-view-tab-tag';
						certpathTab.className = 'us-view-tab-tag';
					} else if ( nTab == 1 ) {
						simpleViewTab.className = 'us-view-tab-tag';
						detailViewTab.className = 'us-view-tab-tag active';
						certpathTab.className = 'us-view-tab-tag';
					} else if ( nTab == 2 ) {
						simpleViewTab.className = 'us-view-tab-tag';
						detailViewTab.className = 'us-view-tab-tag';
						certpathTab.className = 'us-view-tab-tag active';
					}
					
					ViewContent( nTab );
					//RollOver( outer, outer[n] );
					break;
				}
			}
		}
		
		function PressEnterOnTab( e, obj ) {
			if ( !e || !obj ) {
				return false;
			}
			
			var evt = e || window.event;
			var keyCode = evt.which || evt.keyCode;
			
			if ( 13 == keyCode ) {
				TabController(e, obj);
			}
			
			return true;
		}
		
		function MakeDetailViewList( fieldList, certType, userCert ) {
			
			var viewList = null;
			
			var _fieldList = fieldList;
			var _fieldListCnt = fieldList.length;
			
			SANDBOX.usWebToolkit.x509Certificate.parser( userCert, certType );
			
			var certVer = SANDBOX.usWebToolkit.x509Certificate.getVersion();
			var certSerialNumber = SANDBOX.usWebToolkit.x509Certificate.getSerialNumber();
			var certSignAlgo = SANDBOX.usWebToolkit.x509Certificate.getSignAlgo();
			var certIssuer = SANDBOX.usWebToolkit.x509Certificate.getIssuerName();
			var certValidateFrom = SANDBOX.certUtil().getLocalDateNTime(SANDBOX.usWebToolkit.x509Certificate.getNotBefore());
			var certValidateTo = SANDBOX.certUtil().getLocalDateNTime(SANDBOX.usWebToolkit.x509Certificate.getNotAfter());
			var certSubject = SANDBOX.usWebToolkit.x509Certificate.getSubjectName();
			var certPublicKey = SANDBOX.usWebToolkit.x509Certificate.getPublickey();
			var certAuthorityKeyIndentifier = SANDBOX.usWebToolkit.x509Certificate.getAuthorityKeyIndentifier();
			var certSubjectKeyIndentifier = SANDBOX.usWebToolkit.x509Certificate.getSubjectKeyIdentifier();
			var certKeyUsage = SANDBOX.usWebToolkit.x509Certificate.getKeyUsage();
			var certPolicy = SANDBOX.usWebToolkit.x509Certificate.getCertificatePoliciesOid();
			var certSubjectAltName = SANDBOX.usWebToolkit.x509Certificate.getSubjectAltName();
			var certAuthorityInfoAccess = SANDBOX.usWebToolkit.x509Certificate.getAuthorityInfoAccess();
			var certCRLDistributionPoints = SANDBOX.usWebToolkit.x509Certificate.getcRLDistributionPoints();
			//var certCPS = SANDBOX.usWebToolkit.x509Certificate.getCertificatePoliciesCPS();
			//var certPurpose = SANDBOX.usWebToolkit.x509Certificate.getCertificatePoliciesUserNotice();
			var certCPS = "";
			try {
				certCPS = SANDBOX.usWebToolkit.x509Certificate.getCertificatePoliciesCPS();
			} catch(e) { }
			
			var certPurpose = "";
			try {
				certPurpose = SANDBOX.usWebToolkit.x509Certificate.getCertificatePoliciesUserNotice();
			} catch(e) { }
			var certSignature = SANDBOX.usWebToolkit.x509Certificate.getSignature();
			
			var valueListArr = new Array();
			valueListArr[ 0 ] = certVer;
			valueListArr[ 1 ] = certSerialNumber;
			valueListArr[ 2 ] = certSignAlgo;
			valueListArr[ 3 ] = certIssuer;
			valueListArr[ 4 ] = certValidateFrom;
			valueListArr[ 5 ] = certValidateTo;
			valueListArr[ 6 ] = certSubject;
			valueListArr[ 7 ] = certPublicKey;
			valueListArr[ 8 ] = certAuthorityKeyIndentifier;
			valueListArr[ 9 ] = certSubjectKeyIndentifier;
			valueListArr[ 10 ] = certKeyUsage;
			valueListArr[ 11 ] = certPolicy;
			valueListArr[ 12 ] = certSubjectAltName;
			valueListArr[ 13 ] = certAuthorityInfoAccess;
			valueListArr[ 14 ] = certCRLDistributionPoints;
			valueListArr[ 15 ] = certCPS;
			valueListArr[ 16 ] = certPurpose;
			valueListArr[ 17 ] = certSignature;
			
			var listArr = new Array();
			for(var i = 0; i < valueListArr.length; i++) {
				//var struct = new Object();
				var struct = new Array();
				struct[0/*field*/] = _fieldList[ i ].field;  // cert type
				struct[1/*value*/] = valueListArr[ i ];  // cert value
				listArr[i] = struct;
			}
			
			viewList = {list:listArr};
			return viewList;
		}
		
		function DrawDetailListTitle( titleList, fieldList, certType, userCert ) {
			
			__ViewList = MakeDetailViewList( fieldList, certType, userCert );
			
			__ListUI = SANDBOX.loadUI('gridlist');
			__DetailList = __ListUI({
				type: 			'detailslist',
				tblid: 			'us-view-tbl-list',
				tbltitleid: 	'us-view-tbl-list-th',
				titlelistid: 	'us-view-grid-head-div',
				titlerowid: 	'us-view-list-title-row',
				titleelementid: 'us-view-list-title-element',
				titledividerid: null,
				titlelistcn: 	'us-layout-view-grid-head-div',
				titlerowcn: 	'us-layout-view-grid-head-row',
				titleelementcn: 'us-layout-view-grid-row-title-element',
				titledividercn: null,
				tblbodyid: 		'us-view-tbl-list-td',
				datalistid: 	'us-view-grid-body-div',
				datarowid: 		'us-view-list-body-row',
				dataelementid: 	'us-view-list-data-element',
				datalistcn: 	'us-layout-view-grid-body-div',
				datarowcn: 		'us-layout-view-grid-body-row',
				dataelementcn: 	'us-layout-view-grid-row-data-element',
				dataselectcn: 	'us-layout-view-grid-row-data-selected-element',
				
				textboxid: 		'us-view-detail-text-box'
			});
			
			__DetailList.drawTitle( titleList, titleList.length, __TabIndex + 3, false );
		}
		
		function DrawDetailListView( titleList, fieldList ) {
			
			var viewList = MakeDetailViewList( fieldList );
			
			__ListUI = SANDBOX.loadUI('gridlist');
			__DetailList = __ListUI({
				type:           'detailslist',
				tblid:          'us-view-tbl-list',
				tbltitleid:     'us-view-tbl-list-th',
				titlelistid:    'us-view-grid-head-div',
				titlerowid:     'us-view-list-title-row',
				titleelementid: 'us-view-list-title-element',
				titlelistcn:    'us-layout-view-grid-head-div',
				titlerowcn:     'us-layout-view-grid-head-row',
				titleelementcn: 'us-layout-view-grid-row-title-element',
				tblbodyid:      'us-view-tbl-list-td',
				datalistid:     'us-view-grid-body-div',
				datarowid:      'us-view-list-body-row',
				dataelementid:  'us-view-list-data-element',
				datalistcn:     'us-layout-view-grid-body-div',
				datarowcn:      'us-layout-view-grid-body-row',
				dataelementcn:  'us-layout-view-grid-row-data-element',
				dataselectcn:   'us-layout-view-grid-row-data-selected-element',
				
				textboxid:      'us-view-detail-text-box'
			});
			
			__DetailList.drawList( titleList, titleList.length, viewList.list, viewList.list.length, __TabIndex + 3 );
		}
		
		function PutUserCertInfo( certType, certIdx, userCert, textobj, rvCallback ) {
			if ( !certType || 0 >= certIdx || !userCert || !textobj ) {
				return false;  // error code
			}
			
			var certStatusImg = document.getElementById('us-view-cert-status-img');
			var certStatusMsg = document.getElementById('us-view-cert-status-msg');
			
			var result = -1;
			var errCode = 0;
			var errMsg = null;
			
			function DrawSimpleView() {
				SANDBOX.usWebToolkit.x509Certificate.parser( userCert, certType );
				
				var subjectCN = document.getElementById('us-view-cert-subject-name-data');
				subjectCN.appendChild(document.createTextNode(SANDBOX.certUtil().getCN(SANDBOX.usWebToolkit.x509Certificate.getSubjectName())));
				
				var issuerCN = document.getElementById('us-view-cert-issuer-name-data');
				var cnData = SANDBOX.certUtil().getCN(SANDBOX.usWebToolkit.x509Certificate.getIssuerName());
				if (cnData == '' || cnData == 'undefined')
					cnData = SANDBOX.certUtil().getO(SANDBOX.usWebToolkit.x509Certificate.getIssuerName());
				issuerCN.appendChild(document.createTextNode(cnData));
				//issuerCN.appendChild(document.createTextNode(SANDBOX.certUtil().getCN(SANDBOX.usWebToolkit.x509Certificate.getIssuerName())));
				
				var from = document.getElementById('us-view-cert-validity-date-from');
				from.appendChild(document.createTextNode(SANDBOX.certUtil().getLocalDate(SANDBOX.usWebToolkit.x509Certificate.getNotBefore())));
				
				var to = document.getElementById('us-view-cert-validity-date-to');
				to.appendChild(document.createTextNode(SANDBOX.certUtil().getLocalDate(SANDBOX.usWebToolkit.x509Certificate.getNotAfter())));
				
				var certPurpose = document.getElementById('us-view-cert-purpose');
				var certPurposeText = null;
				try { 
					certPurposeText = SANDBOX.usWebToolkit.x509Certificate.getCertificatePoliciesUserNotice();
				} catch(e) { }
				if ( null != certPurposeText ) {
					certPurpose.appendChild(document.createTextNode(certPurposeText));
				}
				
				var cpsBtn = document.getElementById('us-view-cert-cps-btn');
				cpsBtn.onclick = function(){ 
					var url = SANDBOX.usWebToolkit.x509Certificate.getCertificatePoliciesCPS();
					
					if ( 'firefox' == SANDBOX.browserName ) {
						window.open( url, 'cps_url', 'scrollbars=1' );
					} else {
						window.open( url );
					}
					
					this.focus();
				};				
			}
			
			//if (0x02 & (0xFF & SANDBOX.ESVS.Mode)) {
			if ( (0x02 == SANDBOX.ESVS.Mode) ) {
                var caCerts = null;
                try {
                	// verify certificate
                	var caStore = SANDBOX.usWebToolkit.pki.createCaStore();
                	
                	caCerts = SANDBOX.PFSH.GetCACerts();
                	for (var key in caCerts){
						caCert = caCerts[key];
                		caStore.addCertificate(SANDBOX.usWebToolkit.pki.certificateFromBase64(caCert)); 
                	}

//					console.log('userCert : ', userCert);  // for debug
                	var certificate = SANDBOX.usWebToolkit.pki.certificateFromBase64(userCert);
            		SANDBOX.usWebToolkit.pki.verifyCertificateChain(caStore, certificate,
            				function(vfd, depth, chain) {
            					if(certStatusImg == null || certStatusMsg == null) return;
		            			if(vfd === true) {
			            			result = 0;
									certStatusImg.setAttribute('src', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/img/cert_valid.png', 0);
									certStatusMsg.appendChild(document.createTextNode(textobj.IDS_CERT_STATUS_VALID));
									//console.log('*** [Plugin] Call VerifyCertBasicAndChain Func :success***');  // for debug
									__Valid = true;			            			
		            			}else{
			            			result = -1;
			            			certStatusImg.setAttribute('src', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/img/cert_invalid.png', 0);
									if (chain != null && chain != undefined && chain.indexOf("Certificate is not valid yet or has expired") >= 0){
										certStatusMsg.appendChild(document.createTextNode(textobj.IDS_CERT_STATUS_EXPIRED));
									}
									else if (chain != null && chain != undefined && chain.indexOf("no parent issuer, so certificate not trusted") >= 0){
										certStatusMsg.appendChild(document.createTextNode(textobj.IDS_CERT_STATUS_ISSUER_FAIL));
									}
									else{
										certStatusMsg.appendChild(document.createTextNode(chain));
									}
									
									//console.log('*** [Plugin] Call VerifyCertBasicAndChain Func :fail***', chain);  // for debug
									__Valid = false;	
		            			}
		            		
		            			rvCallback(result);		 
            			  });
                	
                } catch( e ) {
    				console.log('***** [Plugin Free] VerifyCertBasicAndChain exception *****');  // for debug
					errCode = e.code;
					errMsg = e.message;
    				console.log('e.code : ', e.code , 'e.message : ', e.message, 'e.detail : ', e.detail);  // for debug
					SANDBOX.uiUtil().errMsgBox(e.message, e.code);
                    // return error
                }
			} else if ( (0x04 & SANDBOX.ESVS.Mode) ) {
				if ( SANDBOX.nimservice() ) {	
					var verifytype = 1;
					if ( 'MPKI' != SANDBOX.ESVS.PKI )
					 	verifytype = 0;
					 	
					// 유효기간 체크
					SANDBOX.nimservice().VerifyCertificate( certIdx, verifytype,
							function( rv, rvMsg ) {
								if ( 0 === rv ) {  // valid status
									__Valid = true;
									certStatusImg.setAttribute('src', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/img/cert_valid.png', 0);
									certStatusMsg.appendChild(document.createTextNode(textobj.IDS_CERT_STATUS_VALID));
								} else {  // invalid status - need detail error codes 		
									__Valid = false;						
									certStatusImg.setAttribute('src', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/img/cert_invalid.png', 0);
									switch ( rv ) {
									    case 3005 :
									        certStatusMsg.appendChild(document.createTextNode(textobj.IDS_CERT_STATUS_EXPIRED));
									        break;
					
									    // jwkim 150410 - by requirements
									    case 3016:
					                    case 3017:
					                    case 3900:  // REVOKED(UNSPECIFIED)
					                    case 3901:  // REVOKED(KEYCOMPROMISE)
					                    case 3902:  // REVOKED(CACOMPROMISE)
					                    case 3903:  // REVOKED(AFFILIATIONCHANGED)
					                    case 3904:  // REVOKED(SUPERSEDED)
					                    case 3905:  // REVOKED(CESSATIONOFOPERATION)
					                    case 3906:  // REVOKED(CERTIFICATIONHOLD)
					                    case 3907:  // REVOKED(REMOVEFROMCRL)
					                    case 3908:  // REVOKED(PRIVILEGEWITHDRAWN)  
					                    case 3909:  // REVOKED(AACOMPROMISE)
					                    case 3999:  // REVOKED(UNKNOWN)                          
					                        certStatusMsg.appendChild(document.createTextNode(textobj.IDS_CERT_STATUS_REVOKED));
					                        __RevokedStatus = true;
					                        break;    
					                    // jwkim 150410 - by requirements
			                            case 42120000:      
											certStatusMsg.appendChild(document.createTextNode(textobj.IDS_CERT_STATUS_EXPIRED));
					                        __RevokedStatus = true;				                        			                                                    
			                                break; 	
			                                					                        
									    default:
									        certStatusMsg.appendChild(document.createTextNode(textobj.IDS_CERT_STATUS_INVALID));
									        break;
									}
								}

								//DrawSimpleView();
								rvCallback(0);
							});
				} else {
					SANDBOX.uiUtil().msgBox(__lang.IDS_MSGBOX_NIM_ERROR_UNLOAD);
					rv = -1;		
					rvCallback(-1);		
				}
			} 
			
			DrawSimpleView();	
			return true;		
		}
		
		function InsertSpace( str )
		{
			if (str == null || str.length == 0)
				return "";
				
			var len = str.length;
			var rtnStr = "";
			
			for ( var i = 0, j = len; i < len ; i++, j-- )
			{
				if ( j % 4 == 0 && j != len )
					rtnStr += " ";
				
				rtnStr += str.charAt(i);
			}
				
			return rtnStr.toUpperCase();
		}
		
		// nhkim 20160627  		   		
		function MakeCertPathView( certType, certindex, userCert, __lang, rvCallback ) {
			if ( 0x04 & SANDBOX.ESVS.Mode ) {
				if ( !SANDBOX.nimservice() ){
					SANDBOX.uiUtil().msgBox( __lang.IDS_MSGBOX_NIM_ERROR_UNLOAD );
					return;
				}
			}
			
			function addTxt(id, str){
				var o = document.getElementById(id);
				if(o) o.appendChild(document.createTextNode(str));
			}
			
			function createli(cls, txt){
				var li = document.createElement('li');
				if(cls == true) li.setAttribute('class', 'valid');
				else if(cls == false) li.setAttribute('class', 'invalid');
				else if(cls != null)  li.setAttribute('class', cls);
				else li.appendChild(document.createTextNode(txt));
				return li;
			}
			
			function getIssuerCert( cert, certType ){
				var cacert = null;
				
				if ( cert == null || cert.length <= 0)
					return null;
				
				var x509Cert = SANDBOX.usWebToolkit.x509Certificate.parser( cert, certType );
				var aki = SANDBOX.usWebToolkit.asn1.fromDer(x509Cert.getExtension('authorityKeyIdentifier').value);
				var cakey = SANDBOX.usWebToolkit.util.bytesToHex(aki.value[0].value);

				if ( aki.value[2] )
					cakey += '_' + parseInt(SANDBOX.usWebToolkit.util.bytesToHex(aki.value[2].value), 16);
							
            	caCerts = SANDBOX.PFSH.GetCACerts();
            	for (var key in caCerts){
            		if ( key.toUpperCase() == cakey.toUpperCase() )
						cacert = caCerts[key];
            	}		
            	
            	return cacert;		
			}			
			
			function makecertView( cacert, rootcacert, rootHexStr ){
				try {					
					SANDBOX.usWebToolkit.x509Certificate.parser( rootcacert, certType );
					treeul.appendChild(createli(true));
					treeul.appendChild(createli(null, SANDBOX.usWebToolkit.x509Certificate.getSubjectName()));
					
					addTxt('us-view-certpath-version', __lang.IDS_CERT_PATH_ROOTCA_VERSION);
					addTxt('us-view-certpath-version-data', SANDBOX.usWebToolkit.x509Certificate.getVersion());
					
					addTxt('us-view-certpath-date', __lang.IDS_CERT_PATH_ROOTCA_VALIDDATE);
					addTxt('us-view-certpath-date-from', SANDBOX.certUtil().getLocalDateNTime(SANDBOX.usWebToolkit.x509Certificate.getNotBefore()));
					addTxt('us-view-certpath-date-to', SANDBOX.certUtil().getLocalDateNTime(SANDBOX.usWebToolkit.x509Certificate.getNotAfter()));
					
					SANDBOX.usWebToolkit.x509Certificate.parser( cacert, certType );
					treeul.appendChild(createli('dot'));
					treeul.appendChild(createli(true));
					treeul.appendChild(createli(null, SANDBOX.usWebToolkit.x509Certificate.getSubjectName()));
					
					SANDBOX.usWebToolkit.x509Certificate.parser( userCert, certType );
					treeul.appendChild(createli('dot2'));
					treeul.appendChild(createli(__Valid));
					treeul.appendChild(createli(null, SANDBOX.usWebToolkit.x509Certificate.getSubjectName()));
					
					var rootHashHexStr = InsertSpace(rootHexStr);
					if (rootHashHexStr == null || rootHashHexStr.length == 0) rootHashHexStr = '  ';
					addTxt('us-view-certpath-hash', __lang.IDS_CERT_PATH_NOTICE);
					addTxt('us-view-certpath-hash-data', rootHashHexStr);
					
					addTxt('us-view-certpath-tail', __lang.IDS_CERT_PATH_ROOTHASH_URL);
					addTxt('us-view-certpath-tail', __lang.IDS_CERT_PATH_ROOTHASH_URL2);
					addTxt('us-view-certpath-tail', __lang.IDS_CERT_PATH_ROOTHASH_URL3);
					document.getElementById('us-view-certpath-tail').onclick = function(){ window.open( __lang.IDS_CERT_PATH_ROOTHASH_LINK, 'ca_hash', 'scrollbars=1;width=650;height=460;' );};
					
				} catch(e) {
					SANDBOX.usWebToolkit.x509Certificate.parser( userCert, certType );
					if(treeul) treeul.appendChild(createli(__Valid));
					if(treeul) treeul.appendChild(createli(null, SANDBOX.usWebToolkit.x509Certificate.getSubjectName()));
				}
			}			
			
			var treeul = document.getElementById("us-view-certpath-info-tree");
			var rootcertversion = ' ';
			var rootcertvalid = ' ';
			
			if ( 0x02 & SANDBOX.ESVS.Mode ) {
				var cacert = null;
				var rootcert = null;
				
				cacert = getIssuerCert( userCert, certType);
				rootcert = getIssuerCert( cacert, certType);		
	            	
            	if ( cacert != null && rootcert != null )
            		makecertView( cacert, rootcert );
            	else {
					SANDBOX.usWebToolkit.x509Certificate.parser( userCert, certType );
					if(treeul) treeul.appendChild(createli(__Valid));
					if(treeul) treeul.appendChild(createli(null, SANDBOX.usWebToolkit.x509Certificate.getSubjectName()));            		
            	}		
            			
				rvCallback();
			}
			else if ( 0x04 & SANDBOX.ESVS.Mode ) {
				SANDBOX.nimservice().GetCACertificates( certindex, function ( rv,  rvMsg, cacert, rootcacert, rootHex ){
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");	
					if(treeul == null) 
						return; 
						
					if (rv == 0)  {
						makecertView( cacert, rootcacert, rootHex );
					} else {
						SANDBOX.usWebToolkit.x509Certificate.parser( userCert, certType );
						if(treeul) treeul.appendChild(createli(__Valid));
						if(treeul) treeul.appendChild(createli(null, SANDBOX.usWebToolkit.x509Certificate.getSubjectName()));
					}
					
					rvCallback();
				});
			}
		}		
		
		function WindowGenerate() {
			var __form = eval(__UIElement.__Layout);
			var __lang = eval((eval(__UIElement.__Lang))());
			
			var certType = Param.args.type;
			var certIdx = Param.args.idx;
			var userCert = Param.args.cert;
			
			// should be changed asap
			UILoad( __form() );
			// should be changed asap
			
			var titleLbl = document.getElementById('us-view-lbl-title');
			titleLbl.appendChild(document.createTextNode(__lang.IDS_CERT_VIEW));
// for sense reader
            titleLbl.setAttribute('tabindex', __TabIndex, 0);
// for sense reader
			
			var tab = document.getElementById('us-view-tab');
			tab.onclick = function(e){ TabController(e?e:event, this); };
			tab.onkeydown = function(e){ PressEnterOnTab(e?e:event, this); };
			
			var simpleViewTab = document.getElementById('us-view-tab-simple');
			simpleViewTab.setAttribute('tabindex', __TabIndex + 1, 0);
			simpleViewTab.appendChild(document.createTextNode(__lang.IDS_CERT_SIMPLE_VIEW));
			
			var simpleView = document.getElementById('us-view-simple');
			simpleView.setAttribute('tabindex', __TabIndex + 2, 0);
			
			var detailViewTab = document.getElementById('us-view-tab-detail');
			detailViewTab.appendChild(document.createTextNode(__lang.IDS_CERT_DETAIL_VIEW));
			detailViewTab.setAttribute('tabindex', __TabIndex + 3, 0);
			
			var certpathViewTab = document.getElementById('us-view-tab-certpath');
			certpathViewTab.appendChild(document.createTextNode(__lang.IDS_CERT_PATH_VIEW));
			certpathViewTab.setAttribute('tabindex', __TabIndex + 4, 0);
				
			var certInfoMenu = document.getElementById('us-view-cert-info');
			certInfoMenu.appendChild(document.createTextNode(__lang.IDS_CERT_INFO));
			
			var subjectNameMenu = document.getElementById('us-view-cert-subject-name');
			subjectNameMenu.appendChild(document.createTextNode(__lang.IDS_CERT_SUBJECT_NAME));
			
			var issuerNameMenu = document.getElementById('us-view-cert-issuer-name');
			issuerNameMenu.appendChild(document.createTextNode(__lang.IDS_CERT_ISSUER_NAME));
			
			var validityDateMenu = document.getElementById('us-view-cert-validity-date');
			validityDateMenu.appendChild(document.createTextNode(__lang.IDS_CERT_VALIDITY_DATE));
/*			
			var fromMenu = document.getElementById('us-view-cert-from');
			fromMenu.appendChild(document.createTextNode(__lang.IDS_CERT_FROM));
*/			
			var cpsBtn = document.getElementById('us-view-cert-cps-btn');
			cpsBtn.setAttribute('value', __lang.IDS_CERT_SUPPLEMENT_INFO, 0);
			cpsBtn.setAttribute('title', __lang.IDS_CERT_SUPPLEMENT_INFO + __lang.IDS_BUTTON, 0);
			cpsBtn.style.display = 'none';
			
			var confirmBtn = document.getElementById('us-view-cert-confirm-btn');
			confirmBtn.setAttribute('value', __lang.IDS_CERT_CONFIRM, 0);
			confirmBtn.setAttribute('title', __lang.IDS_CERT_CONFIRM + __lang.IDS_BUTTON, 0);
			confirmBtn.onclick = function(){ WindowExit(); };
			
			var closeBtn = document.getElementById('us-view-cls-img-btn');
			closeBtn.setAttribute('title', __lang.IDS_CERT_VIEW_CLOSE, 0);
			closeBtn.onclick = function(){ WindowExit(); };
			closeBtn.onfocus = function(){ titleLbl.focus(); }; // tab focus cycle :: yjyoon
			
			var closeImg = document.getElementById('us-view-cls-btn-img');
// for sense reader
//			closeImg.setAttribute('alt', __lang.IDS_CERT_VIEW_CLOSE, 0);
// for sense reader
			closeImg.setAttribute('src', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/img/x-btn.png', 0);
	
			var titleList = [{title:__lang.IDS_CERT_FIELD}, {title:__lang.IDS_CERT_VALUE}];
			var fieldList = [{field:__lang.IDS_CERT_VERSION}, 
							{field:__lang.IDS_CERT_SERIAL_NUMBER}, 
							{field:__lang.IDS_CERT_SIGN_ALGOLISM}, 
							{field:__lang.IDS_CERT_ISSUER}, 
							{field:__lang.IDS_CERT_VALIDATE_FROM},
							{field:__lang.IDS_CERT_VALIDATE_TO}, 
							{field:__lang.IDS_CERT_SUBJECT}, 
							{field:__lang.IDS_CERT_PUBLIC_KEY}, 
							{field:__lang.IDS_CERT_AUTHORITY_KEY_IDENTIFIER}, 
							{field:__lang.IDS_CERT_SUBJECT_KEY_IDENTIFIER},
							{field:__lang.IDS_CERT_KEY_USAGE}, 
							{field:__lang.IDS_CERT_POLICY}, 
							{field:__lang.IDS_CERT_SUBJECT_ALT_NAME}, 
							{field:__lang.IDS_CERT_AUTHORITY_INFO_ACCESS}, 
							{field:__lang.IDS_CERT_CRL_DISTRIBUTE_POINTS},
							{field:__lang.IDS_CERT_CPS},
							{field:__lang.IDS_CERT_PURPOSE},
							{field:__lang.IDS_CERT_SIGNATURE}];
							
			//DrawDetailListView( titleList, fieldList );
			DrawDetailListTitle( titleList, fieldList, certType, userCert );	
										
			// nimservice 때문에 PutUserCertInfo callback 호출된 다음에 처리하기				
			if ( 0x04 & SANDBOX.ESVS.Mode ) {
				PutUserCertInfo(certType, certIdx, userCert, __lang, function ( rv ) {
												 	MakeCertPathView(certType, certIdx, userCert, __lang, function (rv) {});												 	
												});
				
			}
			else if ( 0x02 & SANDBOX.ESVS.Mode ) {
				PutUserCertInfo(certType, certIdx, userCert, __lang, function ( rv ) {
													// nhkim 20160627
													MakeCertPathView(certType, certIdx, userCert, __lang, function (rv) {});
												 	//document.getElementById('us-view-tab3').style.display = 'none';							 	
												});
																				
			}
			else {
				PutUserCertInfo(certType, certIdx, userCert, __lang);
		 		document.getElementById('us-view-tab3').style.display = 'none';
			 }
			
			ViewContent(0);			
			return document.getElementById('us-div-cert-view');		
		}
		
		return WindowGenerate();
	};
	
	return function( Param ) {
		var layerLevel = SANDBOX.uiLayerLevel;
		var overlay = SANDBOX.uiUtil().getOverlay(layerLevel/*, SANDBOX.browserName, SANDBOX.browserVersion*/);
		var win = ConstructScreen({
			type: Param.type,
			args: Param.args,
			onConfirm: Param.onConfirm,
			onCancel: Param.onCancel
		});
		win.style.zIndex = layerLevel + 1;
		SANDBOX.ESVS.TargetObj.insertBefore( overlay, SANDBOX.ESVS.TargetObj.firstChild);  //for test
		
		/* for resize */
        var preEv = window.onresize;
        /* for resize */

// for sense reader
/*
		function fisrtFocus() {
			//var divs = win.getElementsByTagName("div");
			var as = win.getElementsByTagName("a");
			
			if ( 0 < as.length ) {
				for ( var i = 0; i < as.length; i++ ) {
					if ( 'us-view-tab-simple' == as[ i ].id ) {
						as[ i ].focus();
					}
				}
			}
		}
*/
        function firstFocus() {
            var ps = win.getElementsByTagName("p");
            
            if ( 0 < ps.length ) {
                for ( var i = 0; i < ps.length; i++ ) {
                    if ( 'us-view-lbl-title' == ps[ i ].id ) {
                        ps[ i ].focus();
                    }
                }
            }
        }
// for sense reader
		
		return {
			show: function() {
				SANDBOX.ActiveUI = this;
				
				draggable(win, document.getElementById('us-div-view-title'));
				overlay.style.display = 'block';
				
				/*var winHeight = SANDBOX.uiUtil().getNumSize(SANDBOX.uiUtil().getStyle(win, 'height', 'height'));
				if ( -1 === winHeight ) {
					win.style.top = SANDBOX.uiUtil().getScrollTop() + (SANDBOX.uiUtil().getViewportHeight() / 6) + 'px';
				} else {
					win.style.top = SANDBOX.uiUtil().getScrollTop() + ((SANDBOX.uiUtil().getViewportHeight() - winHeight) / 3) + 'px';
				}
				win.style.left = SANDBOX.uiUtil().getScrollLeft() + ((SANDBOX.uiUtil().getViewportWidth() - SANDBOX.uiUtil().getNumSize(SANDBOX.uiUtil().getStyle(win, 'width', 'width'))) / 2) + 'px';
				win.style.display = 'block';*/
				
				SANDBOX.uiUtil().offsetResize(win);
				
				/* for resize */
                window.onresize = function() {
                    /*if ( win) {
                        var winHeight = SANDBOX.uiUtil().getNumSize(SANDBOX.uiUtil().getStyle(win, 'height', 'height'));
                        if ( -1 === winHeight ) {
                            win.style.top = SANDBOX.uiUtil().getScrollTop() + (SANDBOX.uiUtil().getViewportHeight() / 6) + 'px';
                        } else {
                            win.style.top = SANDBOX.uiUtil().getScrollTop() + ((SANDBOX.uiUtil().getViewportHeight() - winHeight) / 3) + 'px';
                        }
                        win.style.left = SANDBOX.uiUtil().getScrollLeft() + ((SANDBOX.uiUtil().getViewportWidth() - SANDBOX.uiUtil().getNumSize(SANDBOX.uiUtil().getStyle(win, 'width', 'width'))) / 2) + 'px';
                    }*/
                	
                	SANDBOX.uiUtil().offsetResize(win);
                    
                    if ( preEv ) {
                        preEv();
                    }
                }
                /* for resize */
				
				SANDBOX.uiLayerLevel += 10;
				SANDBOX.ESVS.TabIndex += 30;
				setTimeout( function(){ firstFocus(); }, 10 );
			},
			
			hide: function() {
				overlay.style.display = 'none';
				win.style.display = 'none';
			},
			
			dispose: function() {
			    /* for resize */
                window.onresize = function() {
                    if ( preEv ) {
                        preEv();
                    }
                }
                /* for resize */
               
				var body = win.parentNode.parentNode;
				body.removeChild(win.parentNode);  //parent.removeChild(win);
				overlay.parentNode.removeChild(overlay);
				SANDBOX.uiLayerLevel -= 10;
				SANDBOX.ESVS.TabIndex -= 30;
			}
		};
	}
};
