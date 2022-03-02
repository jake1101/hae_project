var __certmanage = function(SANDBOX) {
	var ConstructScreen = function(Param) {
		var __UIElement = {
			__Layout : function() {
				var req;

				if (window.XMLHttpRequest) {
					req = new window.XMLHttpRequest;
				} else {
					req = new ActiveXObject('MSXML2.XMLHTTP.3.0');
				}

				req.open('GET', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/layout/certmanage.html?version=' + SANDBOX.ver, false);
				req.send(null);

				return req.responseText;
			},
			__Lang : function() {
				var req;

				if (window.XMLHttpRequest) {
					req = new window.XMLHttpRequest;
				} else {
					req = new ActiveXObject('MSXML2.XMLHTTP.3.0');
				}

				req.open('GET', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/lang/certmanage_' + SANDBOX.ESVS.Language + '.js?version=' + SANDBOX.ver, false);
				req.send(null);

				return req.responseText;
			}
		};

		var __lang = eval((eval(__UIElement.__Lang))());
		var __ListUI = null;
		var __CertsList = null;
		var __TabIndex = SANDBOX.ESVS.TabIndex;

		var __CurrentTabIndex = 0;
		var __CurrentDevice = SANDBOX.CONST.__USFB_M_HDD.device;
		// for deleting certificate
		var __CurrentDrive = 0;
		// for deleting certificate

		if (SANDBOX.ESVS.Media != null && SANDBOX.ESVS.Media.defaultdevice != null) {
			__CurrentDevice = SANDBOX.uiUtil().getMediaDevice(SANDBOX.ESVS.Media.defaultdevice);
		} else {
			//if ( (0x02 & (0xFF & SANDBOX.ESVS.Mode)) ) {    /* plugin free mode */
			if ((0x02 == SANDBOX.ESVS.Mode)) {/* plugin free mode */
				__CurrentDevice = SANDBOX.CONST.__PF_M_LS.device;
			}
		}

		var console = window.console || {
			log : function() {
			}
		};
		// for debug

		function MakeCertViewList() {
			if (!SANDBOX.certsList) {
				return null;
			}

			var viewList = null;
			var certsList = SANDBOX.certsList;
			var certsCnt = certsList.list.length;
			var listArr = new Array();

			for (var i = 0; i < certsCnt; i++) {
				//if(certsList.list[i] == null) continue;
				SANDBOX.usWebToolkit.x509Certificate.parser(certsList.list[i].cert, 'Base64');

				var oid = SANDBOX.usWebToolkit.x509Certificate.getCertificatePoliciesOid();
				var subject = SANDBOX.usWebToolkit.x509Certificate.getSubjectName();
				var expDate = SANDBOX.usWebToolkit.x509Certificate.getNotAfter();
				var expState = SANDBOX.usWebToolkit.x509Certificate.getNotAfter();
				var realIndex = certsList.list[i].index;

				var issuer = SANDBOX.certUtil().getIssuerName(oid);
				if ('undefined' == issuer) {
					issuer = SANDBOX.certUtil().getO(subject);
				}

				//var struct = new Object();
				var struct = new Array();

				// by new design
				//struct[0/*type*/] = SANDBOX.certUtil().getCertType(oid);  							// cert type
				//struct[1/*subject*/] = SANDBOX.certUtil().getCN(subject);  							// cert subject
				//struct[2/*issuer*/] = issuer;  														// cert issuer
				//struct[3/*expDate*/] = SANDBOX.certUtil().getLocalDate(expDate);  					// cert expiration date
				//struct[4/*expState*/] = SANDBOX.certUtil().getExpirationState(expState);  			// cert validity state
				//struct[5/*realIndex*/] = realIndex;  												// cert index in list
				//struct[6/*expStateValue*/] = SANDBOX.certUtil().getExpirationStateValue(expState);  // cert validity state value

				struct[0/*null*/] = '';
				// null
				struct[1/*type*/] = SANDBOX.certUtil().getCertType(oid);
				// cert type
				struct[2/*subject*/] = SANDBOX.certUtil().getCN(subject);
				// cert subject
				struct[3/*issuer*/] = issuer;
				// cert issuer
				struct[4/*expDate*/] = SANDBOX.certUtil().getLocalDate(expDate);
				// cert expiration date
				struct[5/*realIndex*/] = realIndex;
				// cert index in list
				struct[6/*expStateValue*/] = SANDBOX.certUtil().getExpirationStateValue(expState);
				// cert validity state value
				// by new design

				listArr.push(struct);
				//listArr[i] = struct;
			}

			viewList = {
				list : listArr
			};
			return viewList;
		}


		function GetCerts(device, drive, textObj, pin, callback) {
			if (SANDBOX.CONST.__USFB_M_DISK.device > device || 0 > drive || !textObj) {
				return -1;
			}

			var __device = device;
			var __drive = drive;
			var __text = textObj;

			var nCertsCnt = 0;
			var rv = 0;

			__CurrentDrive = __drive;
			// for deleting certificate

			if (SANDBOX.certsList) {
				SANDBOX.certsList = null;
			}

			//if ( (SANDBOX.CONST.__PF_M_LS.device === __device) && (0x02 == SANDBOX.ESVS.Mode) ) {
			if ((SANDBOX.CONST.__PF_M_LS.device === __device)) {/* Local Storage */
				if (!SANDBOX.PFSH) {
					// unsupport html5 storage
					// display error popup
					return -1;
				}

				try {
					SANDBOX.PFSH.SelectStorage(/*Local Storage*/1);
				} catch( e ) {
					// initialize storage error
					console.log('***** Plugin Free SelectStorage error *****');
					// for debug
					console.log('e.code : ', e.code, 'e.message : ', e.message, 'e.detail : ', e.detail);
					// for debug
				}

				try {
					SANDBOX.PFSH.LoadAllCerts(/*pw*/
					document.domain);
				} catch( e ) {
					if (30100000 === e.code) {
						SANDBOX.PFSH.InstallCACerts(/*pw*/
						document.domain);
						SANDBOX.PFSH.LoadAllCerts(/*pw*/
						document.domain);
					} else {
						console.log('***** Plugin Free LoadAllCerts error *****');
						// for debug
						console.log('e.code : ', e.code, 'e.message : ', e.message, 'e.detail : ', e.detail);
						// for debug
					}
				}

				var userCerts = null;
				try {
					userCerts = SANDBOX.PFSH.GetUserCerts(/*pw*/
					document.domain);
					SANDBOX.PFUC = userCerts;
				} catch( e ) {
					console.log('***** Plugin Free GetCerts error *****');
					// for debug
					console.log('e.code : ', e.code, 'e.message : ', e.message, 'e.detail : ', e.detail);
					// for debug
					SANDBOX.uiUtil().errMsgBox(e.message, e.code);
					// return error
				}

				if (userCerts != null && userCerts != undefined && userCerts.length != undefined) {
					nCertsCnt = userCerts.length - 1;
				}
				console.log('***** Plugin Free *****');
				// for debug
				console.log('user certificate counts : ', nCertsCnt);
				// for debug

				if (0 < nCertsCnt) {
					var listArr = new Array();
					for (var i = 0; i < nCertsCnt; i++) {
						var index = i + 1;
						var struct = new Object();
						struct['index'] = index;
						struct['cert'] = userCerts[index].signcert;
						listArr[i] = struct;
					}

					SANDBOX.certsList = {
						list : listArr
					};
				} else {
					SANDBOX.certsList = null;
					rv = 0;
				}
			} else if ((SANDBOX.CONST.__PF_M_LS.device !== __device) && (0x04 & (0xFF & SANDBOX.ESVS.Mode)) ) {
				if ( SANDBOX.nimservice() ) {
					SANDBOX.nimservice().GetAllUserCertListNum( device, drive, pin, function (rv, rvMsg, certsCnt) {
																						console.log('rv:', rv,  'rvMsg:' , rvMsg, 'cnt :', certsCnt);  // for debug
																						nCertsCnt = certsCnt;
																						if ( rv == 0 ) {
																							if ( nCertsCnt > 0) {
																								SANDBOX.nimservice().GetAllUserCert( certsCnt,  function( rv, listArr ){
																									console.log('rv:', rv,  'listArr:' , listArr.length);  // for debug
																																					if (rv == 0) {
																																						SANDBOX.certsList = {list:listArr};
																																						SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");	
																																					}
																																					else {																						
																																						SANDBOX.uiUtil().errMsgBox(SANDBOX.nimservice().GetLastErrorMessage(), rv);
																																						SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");	
																																					}	
																																					callback(rv);																					
																																				});
																							}
																							else {		
																								SANDBOX.certsList = null;	
																								SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
																								callback(0);
																							}																						
																							
																						} else {
																							if ( (device == SANDBOX.CONST.__USFB_M_MOBILE.device) && (rv == 11003 || rv == 11004) ) {
																								SANDBOX.ERROR.Code = 11003;
																								SANDBOX.ERROR.Message = __lang.IDS_MSGBOX_NOT_INSTALL_VESTCERT;
																																		
																								 var closeBtn = document.getElementById('us-cls-btn');
																								 closeBtn.click();	
																								 
																								 // driver 리스트에서 목록이 획득되지 않으면 설치 되지 않은걸로 처리 .설치 페이지 띄우자
																								 if ( 'firefox' == SANDBOX.browserName ) {
																									window.open( SANDBOX.ubiKeyEnv.downloadURL, 'ubikey_url', 'scrollbars=1, op=100px, left=100px, height=500px, width=500px' );
																								 } else {
																									window.open( SANDBOX.ubiKeyEnv.downloadURL, 'ubikey_url', 'top=100px, left=100px, height=500px, width=500px' );
																								 }	
																								 
																								 SANDBOX.certsList = null;
																								 callback(-1);
																								 return false;												
																							}
																																	
																							if ( -1 === nCertsCnt) {
																								// nhkim 20151028
																								// alert(__lang.IDS_MSGBOX_NOT_INSTALL_VESTCERT);
																								// window.open( SANDBOX.ESVS.SRCPath + "install/VestCert_Obj_check.html" );
																								
																							} else {
																								var err = SANDBOX.nimservice().GetLastErrorCode();
																								var msg = SANDBOX.nimservice().GetLastErrorMessage();
																								console.log('***** GetCerts *****');  // for debug
																								console.log('Err Code : ', err, '\nErr Msg : ', msg);  // for debug
																							}
																							callback(-1);
																							SANDBOX.certsList = null;
																							SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
																						}	
					});			
				}
				else {
					SANDBOX.uiUtil().msgBox(textObj.IDS_MSGBOX_NIM_ERROR_UNLOAD);
					callback(-1);			
				}			
			} 	
			else {
				callback(rv);
			}
		}

		function ViewCert(obj, textObj) {
			if (!obj || !textObj) {
				return false;
			}

			var __this = obj;
			var __text = textObj;

			if (!SANDBOX.certsList) {
				SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_COMMON_ERROR_NO_SELECTED_CERT);
				return false;
			}

			var UI = SANDBOX.loadUI('certview');
			var Dialog = UI({
				type : null,
				args : {
					type : 'Base64',
					idx : parseInt(__CertsList.selectedIndex()),
					cert : SANDBOX.certsList.list[parseInt(__CertsList.selectedIndex()) - 1].cert
				},
				onConfirm : function() {
					Dialog.dispose();
					__this.focus();
				},
				onCancel : function() {
					Dialog.dispose();
					__this.focus();
				}
			});
			Dialog.show();
			SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");

			return true;
		}
		
		function RecoverFromUSB(obj, textObj){
			var __this = obj;
			var __text = textObj;

			var driveList = null;
			
			function SelectDriveNRecover( driveList, __this, __text )	{
					var UI = SANDBOX.loadUI('driveselect');
					var Dialog = UI({
						type : 'DEVICE_REMOVABLE_DISK',
						args : driveList,
						onConfirm : function( SelectedDriveIndex ) {			
							Dialog.dispose();
		
							// BackupedSlot 획득
							SANDBOX.nimservice().GetBackupedSlot(SelectedDriveIndex, function(rv, rvMsg, slot) {			
											if ( 0 === rv ) {
												if ( slot <= 0 ) {
													SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");														
													SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_CERT_RECOVER_ERROR);	
													return false;													
												}
												
												// 인증서 비밀번호 비밀번호
												var PWUI = SANDBOX.loadUI('password');
												PWDialog = PWUI({
													type: null,
													args: null,
													onConfirm: function( pw ) {
														PWDialog.dispose();
					
														// 나중에 드라이브 선택창 띄우기 - 현재는 드라이브를 1로 하드코딩.  저장할 드라이브 획득																						
														// recover
														SANDBOX.nimservice().RecoverFromUSB(slot, 1, pw, function( rv, rvMsg, disklist ){
															 		if (rv == 0)	{
															 			
															 			// 현재는 저장하는 드라이브가 화면에 나오는 드라이브랑 같으니 다시 그리기..
															 			GetCerts( __CurrentDevice, 1, __text, '', function( rv ) {									
																			var viewList = MakeCertViewList();
																			if ( viewList ) {
																				__CertsList.redrawList( viewList.list, viewList.list.length );
																			} else {
																				__CertsList.redrawList( null, 0 );
																			}			
																			
																			pw = '';	
																																			
																			SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
																			SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_CERT_RECOVER_SUCCESS);	
																		});																										 			
															 		}
															 		else {
																		SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
																		SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_CERT_RECOVER_ERROR);																											 			
															 		} 	
														});
													}, // password OnConfirm
													onCancel: function() {
														PWDialog.dispose();
														SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
														setTimeout(function(){ __this.focus(); }, 10);
													}
												}); // PWDialog
												PWDialog.show();	 // password 입력창									
											} else {
												pw = '';
												SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");														
												SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_BACKUP_ERROR, rv);	
											}	// rv != 0						
							});	 // GetBackupedSlot
						}, // driveselect OnConfirm
						onCancel: function() {
							SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
							Dialog.dispose(); 
							__this.focus();
						}
					});
					Dialog.show();					
			}
						
						
			if ( 0x04 & SANDBOX.ESVS.Mode ) {
				if ( SANDBOX.nimservice() ) {
					SANDBOX.nimservice().GetBackupedDriveList(function( rv, rvMsg, disklist ){ 
												var len = disklist.length;										
												if ( rv == 0 ) {
													if ( 0 < len ){
														var listArr = new Array();
														for (var i = 0 ; i < len ; i++)
														{
															var index = i + 1;
															var struct = new Object();
															struct['index'] = index;
															struct['name'] = disklist[i];
															listArr[i] = struct;
														}
									
														driveList = {list:listArr};	  	
													}
													else {
														SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
														SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NO_BACKDRIVE);													
														SANDBOX.certsList = null;
														return false;															
													}
												} else {											
													SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
													SANDBOX.uiUtil().errMsgBox(rvMsg, rv);													
													SANDBOX.certsList = null;
													return false;
												}	
																				
												SelectDriveNRecover( driveList, __this, __text );											
										});				
				} else {
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
					SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD);
					return false;
				}	// if ( SANDBOX.nimservice() ) {
			}			// if ( 0x04 & SANDBOX.ESVS.Mode ) {		
						
		}
		
		function BackupToUSB(obj, textObj) {
			var __this = obj;
			var __text = textObj;

			var driveList = null;
			
			if (!SANDBOX.certsList) {
				SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_COMMON_ERROR_NO_SELECTED_CERT);
				return false;
			}	
			
			var selectedCertIdx = parseInt(__CertsList.selectedIndex());
			if (selectedCertIdx <= 0) {
				SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_COMMON_ERROR_NO_SELECTED_CERT);
				return false;
			}	
			
			
			function BackupTo( selectedCertIdx, drive, pw )	{
				SANDBOX.nimservice().BackupToUSB(selectedCertIdx, drive, pw, function(rv, rvMsg) {	
						
											if ( 0 === rv ) {
												SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_CERT_BACKUP_SUCCESS);
											} else {
												SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_BACKUP_ERROR, rv);	
											}	// rv != 0
													
											pw = '';
											SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");																			
									});				
			}
			
			
			function SelectDriveNBackup( driveList, __this, __text )	{
					var UI = SANDBOX.loadUI('driveselect');
					var Dialog = UI({
						type : 'DEVICE_REMOVABLE_DISK',
						args : driveList,
						onConfirm : function( SelectedDriveIndex ) {			
							Dialog.dispose();
		
							var PWUI = SANDBOX.loadUI('password');
							PWDialog = PWUI({
								type: null,
								args: null,
								onConfirm: function( pw ) {
									PWDialog.dispose();
									
									var selectedCertIdx = parseInt(__CertsList.selectedIndex());
									SANDBOX.nimservice().CheckPassword(__CurrentDevice, __CurrentDrive, selectedCertIdx, pw, function(rv, rvMsg) {								
											if (rv == 0)
												BackupTo(selectedCertIdx, SelectedDriveIndex, pw);
											else {
												pw = '';
												
												SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_PASSWORD);
												SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
												setTimeout(function(){ __this.focus(); }, 10);
											}																				
									});

								}, // password OnConfirm
								onCancel: function() {
									PWDialog.dispose();
									SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
									setTimeout(function(){ __this.focus(); }, 10);
								}
							});
							PWDialog.show();
							
						}, // driveselect OnConfirm
						onCancel: function() {
							SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
							Dialog.dispose(); 
							__this.focus();
						}
					});
					Dialog.show();					
			}
						
						
			if ( 0x04 & SANDBOX.ESVS.Mode ) {
				if ( SANDBOX.nimservice() ) {
					SANDBOX.nimservice().GetBackupedDriveList(function( rv, rvMsg, disklist ){ 
												var len = disklist.length;										
												if ( rv == 0 ) {
													if ( 0 < len ){
														var listArr = new Array();
														for (var i = 0 ; i < len ; i++)
														{
															var index = i + 1;
															var struct = new Object();
															struct['index'] = index;
															struct['name'] = disklist[i];
															listArr[i] = struct;
														}
									
														driveList = {list:listArr};	  	
													}
													else {
														SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
														SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NO_BACKDRIVE);													
														SANDBOX.certsList = null;
														return false;															
													}
												} else {											
													SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
													SANDBOX.uiUtil().errMsgBox(rvMsg, rv);													
													SANDBOX.certsList = null;
													return false;
												}	
																				
												SelectDriveNBackup( driveList, __this, __text );			
																					
										});				
				} else {
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
					SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD);
					return false;
				}	// if ( SANDBOX.nimservice() ) {
			}			// if ( 0x04 & SANDBOX.ESVS.Mode ) {			
		}

		function CopyCert(obj, textObj) {
			if (!obj || !textObj) {
				return false;
			}
			
			// test
			// 안전디스크의 경우 "인증서 복사" 가 아닌 "USB로 백업" 기능임
			if ( __CurrentDevice == SANDBOX.CONST.__USFB_M_SECUREDISK.device ) {
				return BackupToUSB(obj, textObj);
			}
			

			var __this = obj;
			var __text = textObj;

			var driveList = null;

			if (!SANDBOX.certsList) {
				SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_COMMON_ERROR_NO_SELECTED_CERT);
				return false;
			}
			
			function Copy(selectedCertIdx, device, drive, pw)
			{
				if ( SANDBOX.CONST.__USFB_M_DISK.device === device || SANDBOX.CONST.__USFB_M_HDD.device === device || SANDBOX.CONST.__USFB_M_MOBILE.device === device || SANDBOX.CONST.__USFB_M_SECUREDISK.device === device) {
					CopyToDevice( selectedCertIdx, pw, device, drive, 0 );
					pw = '';
					
					setTimeout(function(){ __this.focus(); }, 10);
				} else if ( SANDBOX.CONST.__USFB_M_HSMKEY.device === device || SANDBOX.CONST.__USFB_M_SMARTCARD.device === device ) {
					var PINUIType = null;
					if ( SANDBOX.CONST.__USFB_M_SMARTCARD.device === device ) {
						PINUIType = 'PIN_SAVE_TOKEN';
					} else {  // __USFB_M_HSMKEY === device
						PINUIType = 'PIN_SECURITY_TOKEN';
					}
					
					var PINUI = SANDBOX.loadUI('pin');
					PINDialog = PINUI({
						type: PINUIType,
						args: null,
						onConfirm: function( pin ) {
							CopyToDevice( selectedCertIdx, pw, device, drive, pin );
			
							
							pw = pin = '';
							
							PINDialog.dispose();
							setTimeout(function(){ __this.focus(); }, 10);
						},
						onCancel: function() {
							pw = '';
							
							PINDialog.dispose();
							SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
							setTimeout(function(){ __this.focus(); }, 10);
						}
					});
					PINDialog.show();
				} else { // __USFB_M_HSMKEY === device || __USFB_M_SMARTCARD === device
					// etc...
					pw = '';
					
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
					setTimeout(function(){ __this.focus(); }, 10);
				}
			}	
			
			function CopyToDevice( certIndex, pw, targetDevice, targetDrive, pin ) {
				if ( 1 > certIndex || SANDBOX.CONST.__USFB_M_DISK.device > targetDevice || 0 > targetDrive || null == pw || 0 >= pw.length ) {
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
					return;
				}
										
				SANDBOX.nimservice().CopyCert( certIndex, pw, targetDevice, targetDrive, pin, function(rv, rvMsg) {
					if ( 0 === rv ) {
						SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_CERT_COPY_SUCCESS);
					} else {
						switch ( rv ) {
							case 48230000 :
								SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_SEC_TOKEN_PIN);
								break;
	
							case 48250000 :
								SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_SEC_TOKEN_PIN_LOCKED);
								break;
							
							case 40130000 :
	                            SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_HSM_ERROR_UNSUPPORT_LOW_PERFORM_MEDIA);
	                            break;
	                            	
							case 48430000 :
								SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_HSM_ERROR_CERT_ALREADY_EXISTS);
								break;
	
							case 48440000 :
								SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_HSM_ERROR_MEMORY_TOO_SMALL);
								break;
								
							case 48460000 :
							    SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_HSM_ERROR_UNSUPPORT_KEY_LENGTH);
							    break;
	
							case 49040000 :
								SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_SAVE_TOKEN_PIN);
								break;
	
							case 49050000 :
								SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_SAVE_TOKEN_PIN_LOCKED);
								break;
								
							case 41230000 :
	                            var latestCertExpDate = SANDBOX.nimservice().GetLastErrorMessage();
	                            
	                            var slctedCert = SANDBOX.certsList.list[ (certIndex - 1) ].cert;
								SANDBOX.usWebToolkit.x509Certificate.parser(slctedCert, 'Base64');
								var slctedCertExpDate = SANDBOX.usWebToolkit.x509Certificate.getNotAfter();
								var slctedCertExpLocalDate = SANDBOX.certUtil().getLocalDateNTime(slctedCertExpDate)
								//console.log('slctedCertExpLocalDate : ', slctedCertExpLocalDate);  // for debug
	                            
	                            var errMsg = __text.IDS_MSGBOX_CERT_COPY_ERROR_NEWEST_CERT + '\n\n' 
	                                        + __text.IDS_NEWEST_CERT_EXPIRATION_DATE + latestCertExpDate + '\n\n'
	                                        + __text.IDS_SCLTED_CERT_EXPIRATION_DATE + slctedCertExpLocalDate;
	                                         
							    SANDBOX.uiUtil().msgBox(errMsg);	
							    break;
	
							default :
								var errCode = SANDBOX.nimservice().GetLastErrorCode();
								SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_COPY_ERROR, errCode);
								break;
						}		
					}	// rv != 0
							
					pw = '';
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
				});
			}			

			SANDBOX.uiUtil().loadingBox(true, "us-div-list-load", 5);
			var UI = SANDBOX.loadUI('storageselect');
			Dialog = UI({
				type : 'CERT_COPY',
				args : {
					sourceDevice : __CurrentDevice,
					sourceDrive : __CurrentDrive
				},
				onConfirm : function(device, drive) {
					Dialog.dispose();

					var PWUI = SANDBOX.loadUI('password');
					PWDialog = PWUI({
						type: null,
						args: null,
						onConfirm: function( pw ) {
							PWDialog.dispose();
							
							if ( SANDBOX.nimservice() ) {
								var selectedCertIdx = parseInt(__CertsList.selectedIndex());
								if (SANDBOX.CONST.__USFB_M_SMARTCARD.device != __CurrentDevice) {
									SANDBOX.nimservice().CheckPassword(__CurrentDevice, __CurrentDrive, selectedCertIdx, pw, function(rv, rvMsg) {								
										if (rv == 0)
											Copy(selectedCertIdx, device, drive, pw);
										else {
											pw = '';
											
											SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_PASSWORD);
											SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
											setTimeout(function(){ __this.focus(); }, 10);
										}																				
									});
								}
								else {
									Copy(selectedCertIdx, device, drive, pw);
								}
							} else { // SANDBOX.nimservice()
								pw = '';
								
								SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD);
								PWDialog.dispose();
								SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
								setTimeout(function(){ __this.focus(); }, 10);
							}
						}, // password OnConfirm
						onCancel: function() {
							PWDialog.dispose();
							SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
							setTimeout(function(){ __this.focus(); }, 10);
						}
					});
					PWDialog.show();
					
				}, // storageselect OnConfirm
				onCancel : function() {
					Dialog.dispose();
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
					__this.focus();
				}
			});
			Dialog.show();

			return true;
		}

		function ChangePW(obj, textObj) {
			if (!obj || !textObj) {
				return false;
			}

			var __this = obj;
			var __text = textObj;

			if (!SANDBOX.certsList) {
				SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_COMMON_ERROR_NO_SELECTED_CERT);
				return false;
			}

			var UI = SANDBOX.loadUI('changepassword');
			Dialog = UI({
				type : null,
				args : null,
				onConfirm : function(pw, newPW) {
					Dialog.dispose();
										
					if (null == pw || 0 >= pw.length || null == newPW || 0 >= newPW.length) {
						SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_PLEASE_INPUT_PASSWORD);
						//SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_CERT_CHANGE_PW_ERROR);
						return false;
					}

					var selectedCertIdx = parseInt(__CertsList.selectedIndex());
					if (1 > selectedCertIdx) {
						SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_COMMON_ERROR_NO_SELECTED_CERT);
						return false;
					}

					if (SANDBOX.CONST.__PF_M_LS.device === __CurrentDevice) {
						try {
							var jsonUserCert = SANDBOX.PFUC[selectedCertIdx];

							var new_signPriB64, new_kmPriB64;
							new_signPriB64 = new_kmPriB64 = null;

							var priKeyBin = SANDBOX.usWebToolkit.pkcs8.encryptedPrivateKeyFromBase64(jsonUserCert.signpri);
							var bRv = SANDBOX.usWebToolkit.pkcs8.checkUserCertPassword(priKeyBin, pw);
							if (false === bRv) {
								priKeyBin = null;
								var err = {
									code : -1,
									message : __text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_PASSWORD
								};
								throw err;
							} else {
								new_signPriB64 = SANDBOX.usWebToolkit.pkcs8.changePassword(priKeyBin, pw, newPW, 'Base64');
							}
							priKeyBin = null;

							if ('undefined' !== typeof (jsonUserCert.kmcert)) {
								priKeyBin = SANDBOX.usWebToolkit.pkcs8.encryptedPrivateKeyFromBase64(jsonUserCert.kmpri);
								var bRv = SANDBOX.usWebToolkit.pkcs8.checkUserCertPassword(priKeyBin, pw);
								if (false === bRv) {
									priKeyBin = null;
									var err = {
										code : -1,
										message : __text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_PASSWORD
									};
									throw err;
								} else {
									new_kmPriB64 = SANDBOX.usWebToolkit.pkcs8.changePassword(priKeyBin, pw, newPW, 'Base64');
								}
							}
							priKeyBin = null;

							try {
								var new_JsonUserCert = {};
								new_JsonUserCert['signcert'] = jsonUserCert.signcert;
								new_JsonUserCert['signpri'] = new_signPriB64;
								if (null !== new_kmPriB64) {
									new_JsonUserCert['kmcert'] = jsonUserCert.kmcert;
									new_JsonUserCert['kmpri'] = new_kmPriB64;
								}

								SANDBOX.PFSH.SaveUserCert(jsonUserCert.ca, new_JsonUserCert, /*pw*/
								document.domain, false);
								jsonUserCert = new_JsonUserCert = null;

								GetCerts(__CurrentDevice, __CurrentDrive, __text, '');

								var viewList = MakeCertViewList();
								if (viewList) {
									__CertsList.redrawList(viewList.list, viewList.list.length);
								} else {
									__CertsList.redrawList(null, 0);
								}

								SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_CERT_CHANGE_PW_SUCCESS);
							} catch (e) {
								console.log('***** SANDBOX.PFSH.SaveUserCert *****');
								// for debug
								console.log('e.code : ', e.code, 'e.message : ', e.message, 'e.detail : ', e.detail);
								// for debug

								switch (e.code) {
									//case '115010' :	// SetP12OnMemory error code
									case 10000000 :
										if (0 <= (e.detail).indexOf('115010')) {
											SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_PASSWORD_IS_NOT_MATCHED);
										} else {
											SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_CHANGE_PW_ERROR, e.detail);
										}
										break;
									//case 31080000 :	// SaveUserCert error code // original certificate is latest
									//	SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_CHANGE_PW_ERROR, e.code);
									//	break;
									default :
										SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_CHANGE_PW_ERROR, e.code);
										break;
								}
							} finally {
							}
						} catch (e) {
							console.log('***** ChangePW error *****');
							// for debug
							console.log('Err Code : ', e.code, '\nErr Msg : ', e.message);
							// for debug
							SANDBOX.uiUtil().errMsgBox(e.message, e.code);
						} finally {
						}
						
						setTimeout(function() {	__this.focus();	}, 10);
					} 
					else {
						if ( SANDBOX.nimservice() ) {
							var selectedCertIdx = parseInt(__CertsList.selectedIndex());
							SANDBOX.nimservice().CheckPassword(__CurrentDevice, __CurrentDrive, selectedCertIdx, pw, function(rv, rvMsg) {
								if ( 0 === rv ) {									
									SANDBOX.nimservice().ChangePassword(selectedCertIdx, pw, newPW, function (rv, rvMsg) {
										if ( 0 === rv ) {
											SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_CERT_CHANGE_PW_SUCCESS);
										} else {
											var errCode = SANDBOX.nimservice().GetLastErrorCode();
											SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_CHANGE_PW_ERROR, errCode);
										}			
										SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");				
									});
								} else {
									SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
									SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_PASSWORD);
								}		
								
								setTimeout(function() {	__this.focus();	}, 10);							
							});
						} else {
							SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
							SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD);
							setTimeout(function() {	__this.focus();	}, 10);			
						}				
					}
				},
				onCancel : function() {
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
					Dialog.dispose();
					setTimeout(function() {
						__this.focus();
					}, 10);
				}
			});
			Dialog.show();
		}

		function DeleteCert(obj, textObj) {
			if (!obj || !textObj) {
				return false;
			}

			var __this = obj;
			var __text = textObj;

			if (!SANDBOX.certsList) {
				SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_COMMON_ERROR_NO_SELECTED_CERT);
				return false;
			}
			
			function DeleteSuccess(pw) {
				// list refresh!!!
				if ( SANDBOX.certsList ) {
					SANDBOX.certsList = null;
				}

				GetCerts( __CurrentDevice, __CurrentDrive, __text, '', function( rv ) {									
					var viewList = MakeCertViewList();
					if ( viewList ) {
						__CertsList.redrawList( viewList.list, viewList.list.length );
					} else {
						__CertsList.redrawList( null, 0 );
					}			
					
					pw = '';			
				});
				SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_CERT_DELETE_SUCCESS);			
			}

			function DeleteFromDevice(certIndex, pw) {
				if (1 > certIndex || null == pw || 0 >= pw.length) {
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
					return false;
				}

				if (SANDBOX.CONST.__PF_M_LS.device === __CurrentDevice) {
					try {
						SANDBOX.PFSH.DeleteUserCertByIndex(certIndex, document.domain/* pw */);
						DeleteSuccess(pw);
						pw = '';						
					} catch (e) {
						console.log('***** Plugin Free DeleteToDevice error *****');
						// for debug
						console.log('e.code : ', e.code, 'e.message : ', e.message, 'e.detail : ', e.detail);
						// for debug

						SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_DELETE_ERROR, e.code);
						pw = '';

						return false;
					} finally {
						
					}
					
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");

				} else {
					SANDBOX.nimservice().DeleteCert(certIndex, pw, function(rv, rvMsg) {
							SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
							
							if (0 === rv) {
								DeleteSuccess(pw);	
							} else {
								pw = '';								
								switch ( rv ) {
									case 48230000 :
										SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_SEC_TOKEN_PIN);
										break;
		
									case 48250000 :
										SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_SEC_TOKEN_PIN_LOCKED);
										break;
		
									case 49040000 :
										SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_SAVE_TOKEN_PIN);
										break;
		
									case 49050000 :
										SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_SAVE_TOKEN_PIN_LOCKED);
										break;
		
									default :
										var errCode = SANDBOX.nimservice().GetLastErrorCode();
										SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_DELETE_ERROR, errCode);
										break;
								}
		
								return false;
							}						
					});

				}

				return true;
			}

			if (confirm(__text.IDS_CONFIRMBOX_WARNING_DELETE_CERT)) {

				var UI = null;
				if (SANDBOX.CONST.__USFB_M_HSMKEY.device === __CurrentDevice) {
					UI = SANDBOX.loadUI('pin');
				} else {
					UI = SANDBOX.loadUI('password');
				}

				Dialog = UI({
					type : null,
					args : null,
					onConfirm : function(pw) {
						var selectedCertIdx = parseInt(__CertsList.selectedIndex());

						if ((0x04 & (0xFF & SANDBOX.ESVS.Mode)) && SANDBOX.CONST.__PF_M_LS.device !== __CurrentDevice) {
							if ( SANDBOX.nimservice() ) {
								if (SANDBOX.CONST.__USFB_M_HSMKEY.device != __CurrentDevice) {
									var rv = SANDBOX.nimservice().CheckPassword( __CurrentDevice, __CurrentDrive, selectedCertIdx, pw, function(rv, rvMsg) {
										if (0 === rv) {
											DeleteFromDevice(selectedCertIdx, pw);
										} else {
											SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
											SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_PW_ERROR_PASSWORD_IS_NOT_MATCHED, rv);
										}										
									});
								}
								else
									DeleteFromDevice(selectedCertIdx, pw);
							} else {
								SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
								SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD);
							}
						} 
						else/*if ( 0x02 & (0xFF & SANDBOX.ESVS.Mode) )*/ 		{
							if (!SANDBOX.PFUC) {
								pw = '';
								console.log('[error] SANDBOX.PFUC is null');
								// for debug
								return false;
							}

							try {
								var pri = SANDBOX.usWebToolkit.pkcs8.encryptedPrivateKeyFromBase64(SANDBOX.PFUC[selectedCertIdx].signpri);
								var bRv = SANDBOX.usWebToolkit.pkcs8.checkUserCertPassword(pri, pw);
								pri = '';

								if (false === bRv) {
									SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_PASSWORD);
								} else {
									DeleteFromDevice(selectedCertIdx, pw);
								}
							} catch (e) {
								console.log('***** CheckUserCertPassword error *****');
								// for debug
								console.log('Err Code : ', e.code, '\nErr Msg : ', e.message);
								// for debug
								SANDBOX.uiUtil().errMsgBox(e.message, e.code);
							} finally {
							}
							
							SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");							
						}

						Dialog.dispose();
						setTimeout(function() {
							__this.focus();
						}, 10);
					},
					onCancel : function() {
						Dialog.dispose();
						SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
						setTimeout(function() {
							__this.focus();
						}, 10);
					}
				});
				Dialog.show();
			}  // confirm(__text.IDS_CONFIRMBOX_WARNING_DELETE_CERT)
			else {
				setTimeout(function() {	__this.focus();	}, 10);
			}

			return true;
		}

		function IsPFX(fileName, textObj) {
			if (null == fileName || 0 >= fileName.length || null == textObj) {
				return false;
			}

			var __text = textObj;

			if (0 < fileName.length && -1 < fileName.indexOf('.')) {
				var strArr = fileName.split('.');
				var fileExt = strArr[strArr.length - 1].toLowerCase();

				if ('pfx' != fileExt && 'p12' != fileExt) {
					SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_FILE_ERROR_NOT_PFX);
					return false;
				}
			} else {
				SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_FILE_ERROR_READ);
				return false;
			}

			return true;
		}

		function CallPFXImportFunc(textObj) {
			if (null == textObj) {
				return false;
			}
			var __text = textObj;

			if (SANDBOX.uiUtil().isItPortableDevice()) {
				SANDBOX.uiUtil().ImportFromBackupStore();
			} else {
				var fileSearchHidden = document.getElementById('us-cert-manage-file-search-hidden');

				if ('safari' == SANDBOX.browserName && 6.0 > parseFloat(SANDBOX.browserVersion)) {
					SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_SEARCH_CERT_GUIDE_FOR_SAFARI);
					return false;
				}

				if (('opera' == SANDBOX.browserName) || ('safari' == SANDBOX.browserName/* && 6.0 <= parseFloat(SANDBOX.browserVersion)*/) || ('msie' == SANDBOX.browserName && 8 === parseInt(SANDBOX.browserVersion))) {// IE 8.0
					fileSearchHidden.style.display = 'block';
				}

				fileSearchHidden.value = '';
				
				if ('' != fileSearchHidden.value) {// for IE
					var onchangeFunc = fileSearchHidden.onchange;
					var parent = fileSearchHidden.parentNode;
					parent.removeChild(fileSearchHidden);

					fileSearchHidden = document.createElement('input');
					fileSearchHidden.setAttribute('type', 'file', 0);
					fileSearchHidden.setAttribute('accept', 'application/x-pkcs12', 0);
					fileSearchHidden.setAttribute('id', 'us-cert-manage-file-search-hidden', 0);
					fileSearchHidden.className = 'us-layout-cert-manage-file-search-hidden';
					fileSearchHidden.onchange = onchangeFunc;

					parent.appendChild(fileSearchHidden);
				}
				fileSearchHidden.click();
			}

			return true;
		}

		function ImportPFX(obj, textObj) {

			if (!obj || !textObj) {
				return false;
			}

			var __this = obj;
			var __text = textObj;

			var fileFullPath = null;
			var fileB64Bin = null;

			var certGetBtn = document.getElementById('us-cert-manage-get-cert-btn');

			if ('opera' == SANDBOX.browserName || 'safari' == SANDBOX.browserName) {
				__this.style.display = 'none';
			}
				
			if (window.FileReader) {// IE 10.0 ~, FireFox 3.6 ~, Chrome 6.0 ~, Opera 11.1 ~, Safari 6.0 ~

				var files = __this.files;

				if (0 < files.length) {
					var file = files[0];

					if (true == IsPFX(file.name, __text)) {
						var reader = new FileReader();

						if (reader.readAsBinaryString) {
							reader.readAsBinaryString(file);
							reader.addEventListener('load', function() {
								var buf = reader.result;
								var bufLen = buf.length;

								if (file.size === bufLen) {
									fileB64Bin = SANDBOX.usWebToolkit.util.encode64(buf, bufLen);
								} else {
									SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_FILE_ERROR_READ);
									return false;
								}
							});
						} else {
							reader.readAsArrayBuffer(file);
							reader.addEventListener('load', function() {
								var arrBuf = reader.result;
								var arrBufLen = arrBuf.byteLength;

								function ArrayBufferToString(buffer) {
									return BinaryToString(String.fromCharCode.apply(null, Array.prototype.slice.apply(new Uint8Array(buffer))));
								}

								function BinaryToString(binary) {
									var error;

									try {
										return decodeURIComponent(escape(binary));
									} catch (_error) {
										error = _error;
										if ( error instanceof URIError) {
											return binary;
										} else {
											throw error;
										}
									}
								}

								var buf = null;
								try {
									buf = ArrayBufferToString(arrBuf);
								} catch (e) {
									SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_FILE_ERROR_READ);
									return false;
								}

								var bufLen = buf.length;

								if (file.size === bufLen) {
									fileB64Bin = SANDBOX.usWebToolkit.util.encode64(buf, bufLen);
								} else {
									SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_FILE_ERROR_READ);
									return false;
								}
							});
						}
					} else {
						setTimeout(function() {
							certGetBtn.focus();
						}, 10);
						return false;
					}
				} else {
					//SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_FILE_ERROR_READ);
					setTimeout(function() {
						certGetBtn.focus();
					}, 10);
					return false;
				}
			} else {
				if ('msie' == SANDBOX.browserName && (8 === parseInt(SANDBOX.browserVersion))) {// IE 8.0
					var mainwin = document.getElementById('us-div-cert-manage');
					mainwin.onselectstart = function() {
						return true;
					}; 
					
					{
						__this.select();
						//fileFullPath = document.selection.createRange().text.toString();
						fileFullPath = __this.value;
						__this.style.display = 'none';
					}
					mainwin.onselectstart = function() {
						return false;
					};
				} else if ('msie' == SANDBOX.browserName && (9 === parseInt(SANDBOX.browserVersion))) {// IE 9.0
					fileFullPath = __this.value;
					if (-1 < fileFullPath.indexOf('fakepath')) {

						SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_SEARCH_CERT_GUIDE_FOR_IE9);
						setTimeout(function() {
							certGetBtn.focus();
						}, 10);
						return false;
					}
				} else {
					fileFullPath = __this.value;
					console.log('file full path : ', fileFullPath);
					// for debug
				}

				if (false == IsPFX(fileFullPath, __text)) {
					setTimeout(function() {
						certGetBtn.focus();
					}, 10);
					return false;
				}
			}

			function RedrawListByResult(result, device, drive, pin) {
				if (0 === result) {
					SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_CERT_IMPORT_SUCCESS);

					if (__CurrentDevice === device && __CurrentDrive === drive) {
						if (SANDBOX.CONST.__USFB_M_SMARTCARD.device === __CurrentDevice && 0 === __CurrentDrive) {
							GetCerts(__CurrentDevice, __CurrentDrive, __text, pin, function(rv) {
									var viewList = MakeCertViewList();
									if (viewList) {
										__CertsList.redrawList(viewList.list, viewList.list.length);
									} else {
										__CertsList.redrawList(null, 0);
									}								
							});
						} else {
							GetCerts(__CurrentDevice, __CurrentDrive, __text, '', function(rv) {
									var viewList = MakeCertViewList();
									if (viewList) {
										__CertsList.redrawList(viewList.list, viewList.list.length);
									} else {
										__CertsList.redrawList(null, 0);
									}								
							});
						}


					}
				} else {
					switch ( result ) {
						case 48230000 :
							SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_SEC_TOKEN_PIN);
							break;

						case 48250000 :
							SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_SEC_TOKEN_PIN_LOCKED);
							break;

						case 48430000 :
							SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_HSM_ERROR_CERT_ALREADY_EXISTS);
							break;

						case 48440000 :
							SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_HSM_ERROR_MEMORY_TOO_SMALL);
							break;

						case 48460000 :
							SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_HSM_ERROR_UNSUPPORT_KEY_LENGTH);
							break;

						case 49040000 :
							SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_SAVE_TOKEN_PIN);
							break;

						case 49050000 :
							SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_SAVE_TOKEN_PIN_LOCKED);
							break;

						case 41230000 :
							var latestCertExpDate = SANDBOX.nimservice().GetLastErrorMessage();
							var latestCertExpLocalDate = SANDBOX.certUtil().getLocalDate(latestCertExpDate);
							console.log('latestCertExpLocalDate : ', latestCertExpLocalDate);
							// for debug

							var errMsg = __text.IDS_MSGBOX_CERT_COPY_ERROR_NEWEST_CERT + '\n\n' + __text.IDS_NEWEST_CERT_EXPIRATION_DATE + latestCertExpLocalDate;

							SANDBOX.uiUtil().msgBox(errMsg);
							break;

						default :
							var errCode = 0;
							if (SANDBOX.CONST.__PF_M_LS.device === device) {
								errCode = result;
							} else {
								errCode = SANDBOX.nimservice().GetLastErrorCode();
							}

							switch ( errCode ) {
								case 3509 :
									SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_PASSWORD);
									break;

								default :
									SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_IMPORT_ERROR, errCode);
									break;
							}
							break;
					}
				}
			}
			
			function DrawList() {
				var viewList = MakeCertViewList();			
				if ( viewList ) {
					__CertsList.redrawList( viewList.list, viewList.list.length );
				} else {
					__CertsList.redrawList( null, 0 );
				}	
			}				
			
			function ImportCert( device, drive,  filefullPath, pw, SSDialog ) {
				function ImportCert_NIM( pin ) {
					var type = 0;
					var data = fileB64Bin;
					if ( null != fileFullPath ) {
						type = 1;
						data = fileFullPath;
					}

					SANDBOX.nimservice().ImportCert(type, data, pw, device, drive, pin, function(rv, rvMsg) {
									if (rv == 0)	{
										if ((__CurrentDevice == device) && (__CurrentDrive == drive))
											RedrawListByResult(rv, device, drive, pin);
										else	{
											// 달라진게 없기 때문에 원래 있던 인증서 리스트 그대로 그린다.	
											DrawList();
											SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_CERT_IMPORT_SUCCESS);
										}
											
										pw = pin = '';
									}
									else {
										SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
										SANDBOX.uiUtil().errMsgBox(rvMsg, rv);
									}	
								});
				}
				
				var certGetBtn = document.getElementById('us-cert-manage-get-cert-btn');
				
				if( 0x04 <= SANDBOX.ESVS.Mode ){		
					if ( !SANDBOX.nimservice() ) {
						SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD);
						return;
					} 
							
					if ( SANDBOX.CONST.__USFB_M_HSMKEY.device === device || SANDBOX.CONST.__USFB_M_SMARTCARD.device === device ) {
						SSDialog.dispose();
	
						var PINUIType = null;
						if ( SANDBOX.CONST.__USFB_M_SMARTCARD.device === device ) {
							PINUIType = 'PIN_SAVE_TOKEN';
						} else {  // __USFB_M_HSMKEY === device
							PINUIType = 'PIN_SECURITY_TOKEN';
						}
						
						var PINUI = SANDBOX.loadUI('pin');
						PINDialog = PINUI({
							type: PINUIType,
							args: null,
							onConfirm: function( pin ) {
								ImportCert_NIM( pin );
			
								PINDialog.dispose();
								setTimeout(function(){ certGetBtn.focus(); }, 10);
							},
							onCancel: function() {
								pw = '';
								PINDialog.dispose();
								setTimeout(function(){ certGetBtn.focus(); }, 10);
							}
						});
						PINDialog.show();
					} // __USFB_M_HSMKEY === device || __USFB_M_SMARTCARD === device
					else {
						ImportCert_NIM( '' );
					}
				} // 0x04 <= SANDBOX.ESVS.Mode
				else if (SANDBOX.CONST.__PF_M_LS.device === device) {
					if (!SANDBOX.PFSH) {
						// unsupport html5 storage
						// display error popup
						SANDBOX.uiUtil().msgBox('unsupport html5 storage');
						return false;
					}

					var rv = 0;
					try {
						var rJson = SANDBOX.PFSH.SetP12OnMemory(fileB64Bin, pw);
						var index = rJson.index;
						var jsonUserCert = rJson.aluc[index];

						SANDBOX.usWebToolkit.x509Certificate.parser(jsonUserCert.signcert, 'Base64');
						var oid = SANDBOX.usWebToolkit.x509Certificate.getCertificatePoliciesOid();
						var ca = SANDBOX.certUtil().getIssuerEnName(oid);

						SANDBOX.PFSH.SaveUserCert(ca, jsonUserCert, /*pw*/
						document.domain, true);
					} catch (e) {
						console.log('***** SANDBOX.PFSH.SaveUserCert *****');
						// for debug
						console.log('e.code : ', e.code, 'e.message : ', e.message, 'e.detail : ', e.detail);
						// for debug

						rv = e.code;
						switch (e.code) {
							//case '115010' :	// SetP12OnMemory error code
							case 10000000 :
								if (0 <= (e.detail).indexOf('115010')) {
									SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_PASSWORD_IS_NOT_MATCHED);
								} else {
									SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_IMPORT_ERROR, e.detail);
								}
								break;
							//case 31080000 :	// SaveUserCert error code // original certificate is latest
							//SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_IMPORT_ERROR, e.code);
							//	break;
							default :
								SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_IMPORT_ERROR, e.code);
								break;
						}
					}

					RedrawListByResult(rv, device, drive, '');

					pw = '';
					SSDialog.dispose();
					setTimeout(function() {	certGetBtn.focus();	}, 10);
				} // SANDBOX.CONST.__PF_M_LS.device === device 				 						
			}						

			var UI = SANDBOX.loadUI('password');
			Dialog = UI({
				type : null,
				args : null,
				onConfirm : function(pw) {
					Dialog.dispose();
					
					if ( 'MPKI' == SANDBOX.ESVS.PKI ) {
						// hard disk
						ImportCert( SANDBOX.CONST.__USFB_M_HDD.device, 0, fileFullPath, pw );
					}
					else {
						var SSUI = SANDBOX.loadUI('storageselect');
						SSDialog = SSUI({
							type : 'CERT_IMPORT',
							args : null,
							onConfirm : function(device, drive) {
								ImportCert( device, drive, fileFullPath, pw, SSDialog );
								SSDialog.dispose();			
							},
							onCancel : function() {
								pw = '';
								SSDialog.dispose();
								setTimeout(function() {
									certGetBtn.focus();
								}, 10);
							}
						});
						SSDialog.show();
					}
				},
				onCancel : function() {
					Dialog.dispose();
					setTimeout(function() {
						certGetBtn.focus();
					}, 10);
				}
			});
			Dialog.show();

			return true;
		}

		function ExportPFX(obj, textObj) {
			if (!obj || !textObj) {
				return false;
			}

			// 안전디스크의 경우 "인증서 복사" 가 아닌 "USB로 백업" 기능임
			if ( __CurrentDevice == SANDBOX.CONST.__USFB_M_SECUREDISK.device ) {
				return RecoverFromUSB(obj, textObj);
			}	
			
			var __this = obj;
			var __text = textObj;
			
			if (!SANDBOX.certsList) {
				SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_COMMON_ERROR_NO_SELECTED_CERT);
				return false;
			}

			var savedPath = null;
			var certPutOutBtn = document.getElementById('us-cert-manage-put-cert-out-btn');
			
			function Export (index, pw)
			{
				SANDBOX.nimservice().ExportCert(index, pw, function(rv, msg, savedPath) {

					if (rv == 0 && savedPath && 0 < savedPath.length) {
						SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_CERT_EXPORT_SUCCESS + '\n\n' + savedPath);
					} else {
						var errCode = SANDBOX.nimservice().GetLastErrorCode();
						var errMsg = SANDBOX.nimservice().GetLastErrorMessage();
						console.log('Err Code : ', errCode, '\nErr Msg : ', errMsg);  // for debug
						switch ( errCode ) {
							case 43010000 :
							case 43020000 :
							case 43030000 :
								SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_PASSWORD);
                                break;							
						    case 40130000 :
                                SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_HSM_ERROR_UNSUPPORT_LOW_PERFORM_MEDIA);
                                break;
                                
						    default :
						        SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_CERT_EXPORT_ERROR, errCode);
						        break;
						}
					}

					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
				});						
			}

			//yjyoon NIM :: 2015.09.22
			if (SANDBOX.ESVS.Mode == 4 || SANDBOX.ESVS.Mode == 6) {
				if (SANDBOX.nimservice() && SANDBOX.nimservice() != null) {
						var index = parseInt(__CertsList.selectedIndex());
						
						var UI = SANDBOX.loadUI('password');
						Dialog = UI({
							type: null,
							args: null,
							onConfirm: function( pw ) {
								if (SANDBOX.CONST.__USFB_M_SMARTCARD.device != __CurrentDevice) {
									Export(index, pw);
									Dialog.dispose();
								}
								else {
									SANDBOX.nimservice().CheckPassword( __CurrentDevice, __CurrentDrive, index, pw, function ( rv, rvMsg ) {
											if (rv == 0) {
												Export(index, pw);
											}
											else
												SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_PASSWORD);
										
											pw = '';
											Dialog.dispose();
											setTimeout(function(){ certPutOutBtn.focus(); }, 10);									
									});		
								}			
							},
							onCancel: function() {
								Dialog.dispose();
								setTimeout(function(){ certPutOutBtn.focus(); }, 10);
							}
						});
						Dialog.show();				
				} else {
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
					SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD);
				}
			} else if (0x02 & (0xFF & SANDBOX.ESVS.Mode)) {
				var UI = SANDBOX.loadUI('password');
				Dialog = UI({
					type : null,
					args : null,
					onConfirm : function(pw) {
						var selectedCertIdx = parseInt(__CertsList.selectedIndex());

						if (!SANDBOX.PFUC) {
							pw = '';
							console.log('[error] SANDBOX.PFUC is null');
							// for debug
							return false;
						}

						try {
							var pri = SANDBOX.usWebToolkit.pkcs8.encryptedPrivateKeyFromBase64(SANDBOX.PFUC[selectedCertIdx].signpri);
							var bRv = SANDBOX.usWebToolkit.pkcs8.checkUserCertPassword(pri, pw);
							pri = '';
							console.log('ExportPFX : bRv=', bRv);
							// for debug

							if (false === bRv) {
								SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_PASSWORD);
							} else {
								if (SANDBOX.uiUtil().isItPortableDevice()) {
									var jsonRv = SANDBOX.PFSH.GetP12ForBuToMo(selectedCertIdx, 'hex');
									console.log('ExportPFX To Mobile : jsonRv.key=', jsonRv.key);
									// for debug
									console.log('ExportPFX To Mobile : jsonRv.p12=', jsonRv.p12);
									// for debug

									SANDBOX.uiUtil().ExportToBackupStore(jsonRv.p12, jsonRv.key);
									jsonRv = null;
								} else {
									var jsonRv = SANDBOX.PFSH.GetP12ForBuToPc(selectedCertIdx, pw);
									var p12bin = jsonRv.p12;
									var dn = jsonRv.dn;
									var fileName = SANDBOX.certUtil().getCN(dn) + '.p12';
									console.log('ExportPFX : fileName=', fileName);
									// for debug

									SANDBOX.fileUtil().save(fileName/*string type*/, p12bin/*binary type*/ );
									p12bin = dn = jsonRv = null;
								}
							}
						} catch (e) {
							console.log('***** CheckUserCertPassword error *****');
							// for debug
							console.log('Err Code : ', e.code, '\nErr Msg : ', e.message);
							// for debug
							SANDBOX.uiUtil().errMsgBox(e.message, e.code);
						} finally {
							
						}

						pw = '';
						Dialog.dispose();
						SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
						setTimeout(function() {
							certPutOutBtn.focus();
						}, 10);
					},
					onCancel : function() {
						Dialog.dispose();
						SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
						setTimeout(function() {
							certPutOutBtn.focus();
						}, 10);
					}
				});
				Dialog.show();
			} 

			return true;
		}

		function ShowSoftwareVersion(obj) {
			if (!obj) {
				return false;
			}

			var __this = obj;

			var UI = SANDBOX.loadUI('swinfo');
			var Dialog = UI({
				type : null,
				args : null,
				onConfirm : function() {
					Dialog.dispose();
					setTimeout(function() {
						__this.focus();
					}, 10);
				},
				onCancel : function() {
					Dialog.dispose();
					setTimeout(function() {
						__this.focus();
					}, 10);
				}
			});
			Dialog.show();

			return true;
		}

		function CopyBtnEnable() {
			var certCopyBtn = document.getElementById('us-cert-manage-cert-copy-btn');
			//			certCopyBtn.className = 'us-layout-normal-btn';
			certCopyBtn.readOnly = false;
			certCopyBtn.disabled = false;
			
			if ( __CurrentDevice == SANDBOX.CONST.__USFB_M_SECUREDISK.device )
				certCopyBtn.setAttribute('value', __lang.IDS_PW_BACKUP, 0);
			else
				certCopyBtn.setAttribute('value', __lang.IDS_CERT_COPY, 0);	
		}

		function CopyBtnDisable() {
			var certCopyBtn = document.getElementById('us-cert-manage-cert-copy-btn');
			//			certCopyBtn.className = 'us-layout-normal-btn';
			certCopyBtn.readOnly = true;
			certCopyBtn.disabled = true;
		}
		

		function PWChangeBtnEnable() {
			var pwChangeBtn = document.getElementById('us-cert-manage-pw-change-btn');
			//			pwChangeBtn.className = 'us-layout-normal-btn';
			pwChangeBtn.readOnly = false;
			pwChangeBtn.disabled = false;
		}

		function PWChangeBtnDisable() {
			var pwChangeBtn = document.getElementById('us-cert-manage-pw-change-btn');
			//			pwChangeBtn.className = 'us-layout-normal-btn';
			pwChangeBtn.readOnly = true;
			pwChangeBtn.disabled = true;
		}

		function ExportBtnEnable() {
			var certPutOutBtn = document.getElementById('us-cert-manage-put-cert-out-btn');
			//			certPutOutBtn.className = 'us-layout-normal-btn';
			certPutOutBtn.readOnly = false;
			certPutOutBtn.disabled = false;
			
			if ( __CurrentDevice == SANDBOX.CONST.__USFB_M_SECUREDISK.device )
				certPutOutBtn.setAttribute('value', __lang.IDS_PW_RECOVER, 0);
			else
				certPutOutBtn.setAttribute('value', __lang.IDS_CERT_PUT_OUT, 0);			
		}

		function ExportBtnDisable() {
			var certPutOutBtn = document.getElementById('us-cert-manage-put-cert-out-btn');
			//			certPutOutBtn.className = 'us-layout-normal-btn';
			certPutOutBtn.readOnly = true;
			certPutOutBtn.disabled = true;
		}

		// nhkim 20151105
		function DeleteBtnEnable() {
			var deleteBtn = document.getElementById('us-cert-manage-cert-delete-btn');
			deleteBtn.readOnly = false;
			deleteBtn.disabled = false;
		}

		function DeleteBtnDisable() {
			var deleteBtn = document.getElementById('us-cert-manage-cert-delete-btn');
			deleteBtn.readOnly = true;
			deleteBtn.disabled = true;
		}

		//

		function displayFunctionButton(device) {
			if (device == SANDBOX.CONST.__PF_M_LS.device) {
				CopyBtnDisable();
				//CopyBtnEnable();
				PWChangeBtnEnable();

				if (SANDBOX.uiUtil().isItSupportingPFCertBackUp()) {
					ExportBtnEnable();
				} else {
					ExportBtnDisable();
				}
			} else if (device == SANDBOX.CONST.__USFB_M_HDD.device) {
				CopyBtnEnable();
				PWChangeBtnEnable();
				ExportBtnEnable();
				DeleteBtnEnable();
			} else if (device == SANDBOX.CONST.__USFB_M_DISK.device) {
				CopyBtnEnable();
				PWChangeBtnEnable();
				ExportBtnEnable();
				DeleteBtnEnable();
			} else if (device == SANDBOX.CONST.__USFB_M_HSMKEY.device) {
				CopyBtnDisable();
				PWChangeBtnDisable();
				ExportBtnDisable();
				DeleteBtnEnable();
			} else if (device == SANDBOX.CONST.__USFB_M_SMARTCARD.device) {
				CopyBtnEnable();
				PWChangeBtnEnable();
				ExportBtnEnable();
				DeleteBtnEnable();
			} else if (device == SANDBOX.CONST.__USFB_M_MOBILE.device) {
				CopyBtnEnable();
				PWChangeBtnDisable();
				ExportBtnEnable();
				DeleteBtnDisable();
			} else if (device == SANDBOX.CONST.__USFB_M_SECUREDISK.device)	{
				CopyBtnEnable();
				PWChangeBtnEnable();
				ExportBtnEnable();
				DeleteBtnEnable();				
			}			 
			else {
				CopyBtnEnable();
				PWChangeBtnEnable();
				ExportBtnEnable();
				DeleteBtnEnable();
			}
		}

		function SelectDrive(device, driveList, obj, textObj) {
			if (SANDBOX.CONST.__USFB_M_DISK.device > device || !driveList || !obj || !textObj) {
				return false;
			}

			var __device = device;
			var __list = driveList;
			var __this = obj;
			var __text = textObj;

			var UI = SANDBOX.loadUI('driveselect');
			var Dialog = UI({
				type : 'DEVICE_REMOVABLE_DISK',
				args : __list,
				onConfirm : function(SelectedDriveIndex) {
					var index = SelectedDriveIndex;
					if ( 0 < index ) {
						GetCerts( __device, index, __text, '', function (rv) {
								if ( 0 != rv ) {
									SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_COMMON_ERROR_GET_CERT, rv);
									__CertsList.redrawList( null, 0 );
								}
								else {
									var viewList = MakeCertViewList();	
									// title은 위에서 그렸으니까
									if ( viewList ) {
										__CertsList.redrawList( viewList.list, viewList.list.length );
									} else {
										__CertsList.redrawList( null, 0 );
									}	
								}	
								
								if ( !SANDBOX.ESVS.Embedded ) {  // window
									Dialog.dispose();	
								} else {  // embedded
									setTimeout(function() { Dialog.dispose(); }, 10);	
								}
								__this.focus();
								SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");													
							});
					}
				},
				onCancel: function() {
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
					Dialog.dispose(); 
					__this.focus();
				}
			});
			Dialog.show();
		}

		function SelectSecToken(device, driverList, obj, textObj) {
			if (SANDBOX.CONST.__USFB_M_DISK.device > device || !driverList || !obj || !textObj) {
				return false;
			}

			var __device = device;
			var __list = driverList;
			var __this = obj;
			var __text = textObj;

			var UI = SANDBOX.loadUI('sectokenselect');
			var Dialog = UI({
				type : __device,
				args : __list,
				onConfirm : function(SelectedDriverIndex) {
					var index = SelectedDriverIndex;
					if ( 0 < index ) {
							GetCerts( __device, index, __text, '', function (rv) {
									if ( 0 != rv ) {
										switch ( rv ) {
											case 48120000 :
											case 48130000 :
												SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_HSM_ERROR_CONNECTION);
												break;
												
											default :
												SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_COMMON_ERROR_GET_CERT, rv);
												break;
										}
										
										__CertsList.redrawList( null, 0 );
									} else {
										var viewList = MakeCertViewList();
										
										if ( viewList ) {
											__CertsList.redrawList( viewList.list, viewList.list.length );
										} else {
											__CertsList.redrawList( null, 0 );
										}
									}		
									
									if ( !SANDBOX.ESVS.Embedded ) {  // window
										Dialog.dispose();	
									} else {  // embedded
										setTimeout(function() { Dialog.dispose(); }, 10);	
									}
									
									__this.focus();		
							});
					}
				},
				onCancel: function() { 
					Dialog.dispose(); 
					__this.focus();
				}
			});
			Dialog.show();
		}

		function SelectSaveToken(device, saveTokenList, obj, textObj) {
			if (SANDBOX.CONST.__USFB_M_DISK.device > device || !saveTokenList || !obj || !textObj) {
				return false;
			}
			SANDBOX.uiUtil().loadingBox(true, "us-div-list-load", 0);
			var __device = device;
			var __list = saveTokenList;
			var __this = obj;
			var __text = textObj;

			var UI = SANDBOX.loadUI('driveselect');
			var Dialog = UI({
				type : 'DEVICE_SAVE_TOKEN',
				args : __list,
				onConfirm : function(SelectedDriveIndex) {
					Dialog.dispose();

					//var index = SelectedDriveIndex;
					//if ( 0 < index ) {
						if ( SANDBOX.nimservice() ) {
						    SANDBOX.nimservice().CheckSCardConnected(function(rv, rvMsg) {
									    if ( 0 === rv ) {
			        						var PINUI = SANDBOX.loadUI('pin');
			        						PINDialog = PINUI({
			        							type: 'PIN_SAVE_TOKEN',
			        							args: null,
			        							onConfirm: function( pin ) {
						        								if ( !SANDBOX.ESVS.Embedded ) {  // window
						                                            PINDialog.dispose();   
						                                        } else {  // embedded
						                                            setTimeout(function() { PINDialog.dispose(); }, 10);   
						                                        }
									                                        			        								
			    												SANDBOX.nimservice().CheckSCardPin( pin, function(rv, rvMsg) {
								    									if ( 0 != rv ) {
								    									    switch ( rv ) {
								    									        case 49040000 :
								                                                   SANDBOX.uiUtil().msgBox( __text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_SAVE_TOKEN_PIN );
								                                                   break;
								                                                   
								                                                case 49050000 :
								                                                   SANDBOX.uiUtil().msgBox( __text.IDS_MSGBOX_PW_ERROR_SAVE_TOKEN_PIN_LOCKED );
								                                                   break;
								                                                   
								                                                default :
								                                                   SANDBOX.uiUtil().errMsgBox( __text.IDS_MSGBOX_PW_ERROR_INPUT_WRONG_SAVE_TOKEN_PIN, rv );
								                                                   break;
								                                            }
								    										
								    										__CertsList.redrawList( null, 0 );
								    										
									        								setTimeout(function(){ __this.focus(); }, 10);	    										
								    									} else { 					
								    										GetCerts( __device, 0, __text, pin, function (rv) {
																						if ( 0 != rv ) {
																							//SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_COMMON_ERROR_GET_CERT, rv);
																							__CertsList.redrawList( null, 0 );
																						}
																						else {
																							var viewList = MakeCertViewList();	
																							// title은 위에서 그렸으니까
																							if ( viewList ) {
																								__CertsList.redrawList( viewList.list, viewList.list.length );
																							} else {
																								__CertsList.redrawList( null, 0 );
																							}	
																						}	
																						
												        								setTimeout(function(){ __this.focus(); }, 10);																			
																					});		
								
								    									}
								    							}); // CheckSCardPin
						        							}, 
						        							onCancel: function() {
						        								PINDialog.dispose();
						        								SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
						        								setTimeout(function(){ __this.focus(); }, 10);
						        							}
						        						});
						        						PINDialog.show();			    										
			    									
			        					} else {  // if ( 0 === rv ) {
			        					    SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_SMART_CARD_UNCONNECTED);
			        					    SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
			        					    setTimeout(function(){ __this.focus(); }, 10);
			        					}						    	
						    });  // SANDBOX.nimservice().CheckSCardConnected


        				} else {  // if ( SANDBOX.nimservice() ) {
        				    SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD);
        				    SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
        				    setTimeout(function(){ __this.focus(); }, 10);
        				}
					//}
				},
				onCancel : function() {
					Dialog.dispose();
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
					setTimeout(function() {
						__this.focus();
					}, 10);
				}
			});
			Dialog.show();
		}

		/*****   plugin free   *****/
		function GetCertsFromLS(obj, textObj) {
			if (!obj || !textObj) {
				return false;
			}

			var __this = obj;
			var __text = textObj;

			__CurrentDevice = SANDBOX.CONST.__PF_M_LS.device;
			__CurrentDrive = 0;

			displayFunctionButton(__CurrentDevice);

			if (SANDBOX.certsList) {
				SANDBOX.certsList = null;
			}

			__CertsList.redrawList(null, -1);

			var errCode = GetCerts(SANDBOX.CONST.__PF_M_LS.device, 0, __text, '');
			if (0 != errCode) {
				SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_COMMON_ERROR_GET_CERT, errCode);
				__CertsList.redrawList(null, 0);
				return false;
			}

			var viewList = MakeCertViewList();
			if (viewList) {
				__CertsList.redrawList(viewList.list, viewList.list.length);
			} else {
				__CertsList.redrawList(null, 0);
			}

			return true;
		}

		/*****   plugin free   *****/

		function GetCertsFromHdd(obj, textObj) {
			if (!obj || !textObj) {
				return false;
			}

			var __this = obj;
			var __text = textObj;

			__CurrentDevice = SANDBOX.CONST.__USFB_M_HDD.device;
			// for deleting certificate
			__CurrentDrive = 0;
			// for deleting certificate

			displayFunctionButton(__CurrentDevice);

			if (SANDBOX.certsList) {
				SANDBOX.certsList = null;
			}

			// get cert from plugin
			__CertsList.redrawList(null, -1);

			GetCerts( SANDBOX.CONST.__USFB_M_HDD.device, 0, __text, '', function (rv) {
						if ( 0 != rv ) {
							SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_COMMON_ERROR_GET_CERT, rv);
							__CertsList.redrawList( null, 0 );
							return false;
						}
						else {
							var viewList = MakeCertViewList();	
							// title은 위에서 그렸으니까
							if ( viewList ) {
								__CertsList.redrawList( viewList.list, viewList.list.length );
							} else {
								__CertsList.redrawList( null, 0 );
							}
							return true;	
						}					
					});		
		}

		function GetCertsFromRemovable(obj, textObj) {
			if (!obj || !textObj) {
				return false;
			}

			var __this = obj;
			var __text = textObj;

			var driveList = null;

			__CurrentDevice = SANDBOX.CONST.__USFB_M_DISK.device;
			__CurrentDrive = 0;

			if (SANDBOX.certsList) {
				SANDBOX.certsList = null;
			}

			__CertsList.redrawList(null, -1);

			if ( (0x04 & (0xFF & SANDBOX.ESVS.Mode)) && SANDBOX.CONST.__PF_M_LS.device !== __CurrentDevice ) {
				if ( SANDBOX.nimservice() ) {
					SANDBOX.nimservice().GetDiskList(function( rv, rvMsg, disklist ){ 
												var len = 0;
												if ( disklist )
													len = disklist.length;	
																							
												if ( rv == 0 && (0 < len) ) {
													var listArr = new Array();
													for (var i = 0 ; i < len ; i++)
													{
														var index = i + 1;
														var struct = new Object();
														struct['index'] = index;
														struct['name'] = disklist[i];
														listArr[i] = struct;
													}
								
													driveList = {list:listArr};	  			
												} else {
													console.log('***** GetCertsFromRemovable *****');  // for debug
													console.log('Err Code : ', rv, '\nErr Msg : ', rvMsg);  // for debug
												
													SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
													SANDBOX.certsList = null;
													return false;
												}	
																				
												SelectDrive( SANDBOX.CONST.__USFB_M_DISK.device, driveList, __this, __text );			
																					
										});				
				} else {
					SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
					SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD);
					return false;
				}
			}			
			
			return true;				
		}

		function GetCertsFromSecToken(obj, textObj) {
			if (!obj || !textObj) {
				return false;
			}

			var __this = obj;
			var __text = textObj;

			var driverList = null;

			__CurrentDevice = SANDBOX.CONST.__USFB_M_HSMKEY.device;
			// for deleting certificate
			__CurrentDrive = 0;
			// for deleting certificate

			displayFunctionButton(__CurrentDevice);

			if (SANDBOX.certsList) {
				SANDBOX.certsList = null;
			}

			__CertsList.redrawList(null, -1);

			if ( 0x04 & SANDBOX.ESVS.Mode )  {		
				if ( SANDBOX.nimservice() ) {
					SANDBOX.nimservice().GetHSMList(function( rv, rvMsg, hsmlist ){ 
												var len = 0;
												if ( hsmlist )
													len = hsmlist.length;							

												if ( rv == 0 && (0 < len) ) {
													
													var listArr = new Array();
													for (var i = 0 ; i < len ; i++)
													{
														var index = i + 1;
														var struct = new Object();												
														var str = hsmlist[i];
														var arr = str.split('|');
						
														struct['index'] 	= index;
														struct['name'] 		= arr[0];
														struct['driver'] 	= arr[1];
														struct['passage'] 	= arr[2];
														struct['validity'] 	= arr[3];
														listArr[i] = struct;														
													}
								
													driveList = {list:listArr};	  			
												} 
												else {
													SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
													SANDBOX.nimservice().GetLastErrorCode();
												}	
												
												SelectSecToken( SANDBOX.CONST.__USFB_M_HSMKEY.device, driveList, __this, __text );				
						});				
				} else {
					SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD);
					return false;
				}	
			}		
										
			return true;
		}

		function GetCertsFromSaveToken(obj, textObj) {
			if (!obj || !textObj) {
				return false;
			}

			var __this = obj;
			var __text = textObj;

			var driverList = null;

			__CurrentDevice = SANDBOX.CONST.__USFB_M_SMARTCARD.device;
			// for deleting certificate
			__CurrentDrive = 0;
			// for deleting certificate

			displayFunctionButton(__CurrentDevice);

			if (SANDBOX.certsList) {
				SANDBOX.certsList = null;
			}

			__CertsList.redrawList(null, -1);

			var listArr = new Array();
			var struct = new Object();
			struct['index'] = SANDBOX.CONST.__USFB_M_SMARTCARD.device;
			struct['name'] = __text.IDS_SAVETOKEN_SMART_CARD;
			listArr[0] = struct;

			driveList = {list:listArr};
			SelectSaveToken( SANDBOX.CONST.__USFB_M_SMARTCARD.device, driveList, __this, __text );

			return true;
		}

		function GetCertsFromSecureDisk( obj, textObj ) {
			if (!obj || !textObj) {
				return false;
			}

			var __this = obj;
			var __text = textObj;

			__CurrentDevice = SANDBOX.CONST.__USFB_M_SECUREDISK.device;
			// for deleting certificate
			__CurrentDrive = 1;
			// for deleting certificate

			displayFunctionButton(__CurrentDevice);

			if (SANDBOX.certsList) {
				SANDBOX.certsList = null;
			}

			// get cert from plugin
			__CertsList.redrawList(null, -1);
			
            SANDBOX.nimservice().IsSDInstalled(function(rv, rvMsg) {
            	SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
				if (rv != 0) {
					if ( confirm( __text.IDS_MSGBOX_NOT_INSTALL_SD ) ) {
						 var closeBtn = document.getElementById('us-cert-manage-cls-btn');
						 closeBtn.click();	
						 
						 // driver 리스트에서 목록이 획득되지 않으면 설치 되지 않은걸로 처리 .설치 페이지 띄우자
						 if ( 'firefox' == SANDBOX.browserName ) {
							window.open( SANDBOX.ESVS.SDInstallURL, 'securedisk_url', 'scrollbars=1, op=100px, left=100px, height=500px, width=380px' );
						 } else {
							window.open( SANDBOX.ESVS.SDInstallURL, 'securedisk_url', 'top=100px, left=100px, height=500px, width=380px' );
						 }	
					}					
				}   
				else {			
					GetCerts( SANDBOX.CONST.__USFB_M_SECUREDISK.device, 1, __text, '', function (rv) {
								if ( 0 != rv ) {
									SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_COMMON_ERROR_GET_CERT, rv);
									__CertsList.redrawList( null, 0 );
									return false;
								}
								else {
									var viewList = MakeCertViewList();	
									// title은 위에서 그렸으니까
									if ( viewList ) {
										__CertsList.redrawList( viewList.list, viewList.list.length );
									} else {
										__CertsList.redrawList( null, 0 );
									}
									return true;	
								}					
							});	
				}         	
            });					
		}
		
		// nhkim 20151015
		function GetCertsFromMobileToken(obj, textObj) {
			if (!obj || !textObj) {
				return false;
			}

			var __this = obj;
			var __text = textObj;

			var saveTokenList = null;

			__CurrentDevice = SANDBOX.CONST.__USFB_M_MOBILEOTKEN.device;
			__CurrentDrive = 0;

			if (SANDBOX.certsList) {
				SANDBOX.certsList = null;
			}

			__CertsList.redrawList(null, -1);

			// 스마트 인증 리스트 획득 하고 드림시큐리티, USIM_0002 을 default로 confirm 을 자동으로 클릭한것처럼 처리
			if ( 0x04 & SANDBOX.ESVS.Mode )  {		
				if ( SANDBOX.nimservice() ) {
					SANDBOX.nimservice().IsInstalledUSIMModule( 2, function( rv, rvMsg )  { 
													SANDBOX.uiUtil().loadingBox(false, "us-div-list-load");
														
 													if ( rv == 0 ) { 		
 														SANDBOX.nimservice().SetUSIMOptions( SANDBOX.usimEnv.sitecode, SANDBOX.usimEnv.modecode, SANDBOX.usimEnv.siteURL, 
 																								SANDBOX.usimEnv.serviceIP, SANDBOX.usimEnv.servicePort, function (rv) { 																
																								 		var confirmBtn = document.getElementById('us-confirm-btn');						 
																								 		confirmBtn.click();	
																								 });		
				 										
													}
													else {
														if (rv == 48470000) {
															SANDBOX.ERROR.Code = 21002;
															SANDBOX.ERROR.Message = __lang.IDS_MSGBOX_NOT_INSTALL_SMARTCERT;
																							
															 var closeBtn = document.getElementById('us-cls-btn');
															 closeBtn.click();	
															 
															 // driver 리스트에서 목록이 획득되지 않으면 설치 되지 않은걸로 처리 .설치 페이지 띄우자
															 if ( 'firefox' == SANDBOX.browserName ) {
																window.open( "http://ids.smartcert.kr", 'usim_url', 'scrollbars=1, op=100px, left=100px, height=500px, width=380px' );
															 } else {
																window.open( "http://ids.smartcert.kr", 'usim_url', 'top=100px, left=100px, height=500px, width=380px' );
															 }	
														}  // RV == 48470000
														else {
															SANDBOX.ERROR.Code = SANDBOX.nimservice().GetLastErrorCode();
															SANDBOX.ERROR.Message = SANDBOX.nimservice().GetLastErrorMessage();
															
															SANDBOX.uiUtil().msgBox(_SANDBOX.ERROR.Message);											
															var closeBtn = document.getElementById('us-cls-btn');
															closeBtn.click();																
														}														
													} // rv == 0			
						});				
	
				} else {
					SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD);
					return false;
				}
			}	
			
			return true;
		}

		//

		function GetCertsFromMobilePhone(obj, textObj) {
			if (!obj || !textObj) {
				return false;
			}

			var __this = obj;
			var __text = textObj;

			__CurrentDevice = SANDBOX.CONST.__USFB_M_MOBILE.device;
			// for deleting certificate
			__CurrentDrive = 0;
			// for deleting certificate

			displayFunctionButton(__CurrentDevice);

			if (SANDBOX.certsList) {
				SANDBOX.certsList = null;
			}

			// nhkim 20151023
			__CertsList.redrawList(null, -1);

			if ( (0x04 & (0xFF & SANDBOX.ESVS.Mode)) && SANDBOX.CONST.__PF_M_LS.device !== __CurrentDevice ) {
				if ( SANDBOX.nimservice() ) {
							GetCerts( __CurrentDevice, __CurrentDrive, __text, '', function (rv) {
									if ( 0 != rv ) {
										switch ( rv ) {
											case 61000000 :
												// no install or lower version
												// SANDBOX.uiUtil().errMsgBox( __text.IDS_MSGBOX_UBIKEY_NOT_INSTALL, errCode );
												break;
						
											case 61010000 :		// load fail
												SANDBOX.ERROR.Code = 11003;						
												
												 var closeBtn = document.getElementById('us-cls-btn');
												 closeBtn.click();	
												 
												 // driver 리스트에서 목록이 획득되지 않으면 설치 되지 않은걸로 처리 .설치 페이지 띄우자
												 if ( 'firefox' == SANDBOX.browserName ) {
													window.open( SANDBOX.ubiKeyEnv.downloadURL, 'ubikey_url', 'scrollbars=1, op=100px, left=100px, height=500px, width=500px' );
												 } else {
													window.open( SANDBOX.ubiKeyEnv.downloadURL, 'ubikey_url', 'top=100px, left=100px, height=500px, width=500px' );
												 }	
												 break;											
											case 61020000 :
												// unload fail
												SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_UBIKEY_LOAD_LIBRARY, rv);
												break;
						
											case 61030000 :
												// unmatch version
												// SANDBOX.uiUtil().errMsgBox( __text.IDS_MSGBOX_UBIKEY_UNMATCH_LIB_VERSION, errCode );
												break;
						
											case 60040000 :
												// getprocaddress fail.
												// SANDBOX.uiUtil().errMsgBox( __text.IDS_MSGBOX_UBIKEY_OPEN_FUNCTION, errCode );
												break;
						
											case 61070000 :
												// no environment
												SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_UBIKEY_SET_ENV, rv);
												break;
						
											default :
												//SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_COMMON_ERROR_GET_CERT, errCode);
												break;
										}
										
										__CertsList.redrawList( null, 0 );
									} else {
										var viewList = MakeCertViewList();
										
										if ( viewList ) {
											__CertsList.redrawList( viewList.list, viewList.list.length );
										} else {
											__CertsList.redrawList( null, 0 );
										}
									}		
							});
			
				} else {
					SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NIM_ERROR_UNLOAD);
					return false;
				}  // if ( SANDBOX.nimservice() )
			} // (0x04 & (0xFF & SANDBOX.ESVS.Mode)
			//
			
			return true;
		}

		function GetCertsFromETC(obj, textObj) {
			if (!obj || !textObj) {
				return false;
			}

			var __this = obj;
			var __text = textObj;

			SANDBOX.uiUtil().MsgBox(__text.IDS_MSGBOX_NOT_SUPPORTED_MEDIA);

			return true;
		}

		function DrawCertsListView(titleList, textObj) {
			if (!titleList || !textObj) {
				return false;
			}

			displayFunctionButton(__CurrentDevice);

			var __titleList = titleList;
			var __text = textObj;

			/*var errCode = GetCerts( __CurrentDevice, 0, __text, '' );
			 if ( 0 != errCode ) {
			 SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_COMMON_ERROR_GET_CERT, errCode);
			 //return false;
			 }*/

			__ListUI = SANDBOX.loadUI('gridlist');
			__CertsList = __ListUI({
				type : 'certslist',
				tblid : 'us-cert-manage-tbl-list',
				tbltitleid : 'us-cert-manage-tbl-list-th',
				titlelistid : 'us-cert-manage-grid-head-div',
				titlerowid : 'us-cert-manage-list-title-row',
				titleelementid : 'us-cert-manage-list-title-element',
				titledividerid : 'us-cert-manage-list-title-divider',
				titlelistcn : 'us-layout-grid-head-div',
				titlerowcn : 'us-layout-grid-head-row',
				titleelementcn : 'us-layout-grid-row-title-element',
				titledividercn : 'us-layout-grid-row-title-divider',
				tblbodyid : 'us-cert-manage-tbl-list-td',
				datalistid : 'us-cert-manage-grid-body-div',
				datarowid : 'us-cert-manage-list-body-row',
				dataelementid : 'us-cert-manage-list-data-element',
				datalistcn : 'us-layout-grid-body-div',
				datarowcn : 'us-layout-grid-body-row',
				dataelementcn : 'us-layout-grid-row-data-element',
				dataselectcn : 'us-layout-grid-row-data-selected-element'
			});

			var resizeOption = true;
			if ('opera' == SANDBOX.browserName) {// cannnot block drag func on opera
				resizeOption = false;
			}

			// nhkim 20151022 - 하드디스크 목록 가져오면서 중간에 사용자의 action으로 멈추면 타이틀이 그려지지 않기 때문에 인증서 리스트 획득하기 전에 타이틀을 먼저 생성
			__CertsList.drawList(__titleList, __titleList.length, null, 0, __CurrentTabIndex, resizeOption);
			//

			GetCerts( __CurrentDevice, 0, __text, '', function (rv) {
				if ( 0 != rv ) {
					SANDBOX.uiUtil().errMsgBox(__text.IDS_MSGBOX_COMMON_ERROR_GET_CERT, rv);
					//return false;
				}
				else {
					var viewList = MakeCertViewList();	
					// title은 위에서 그렸으니까
					if ( viewList ) {
						__CertsList.redrawList( viewList.list, viewList.list.length );
					} else {
						__CertsList.redrawList( null, 0 );
					}	
				}					
			});
		}

		function ChangeButtonStyle(obj) {
			if (!obj) {
				return false;
			}

			displayMediaAllStorage(obj, __lang, 'close');

			var __this = obj;
			var mediaList = SANDBOX.ESVS.Media.list.split('|');
			for (var i = 0; i < mediaList.length; i++) {
				var mediaName = mediaList[i];
				var mediaInfo = SANDBOX.CONST.medias[mediaName];
				if (mediaInfo == undefined || mediaInfo == null) {
					continue;
				}

				var button = document.getElementById('us-cert-manage-btn-' + mediaInfo.name);
				if (button != undefined && button != null) {
					if (button.className != 'us-layout-storage-btn-none') {
						if (__this === button) {
							button.className = 'us-layout-storage-btn-on';
							setTimeout(function() {
								button.focus();
							}, 10);
						} else {
							button.className = 'us-layout-storage-btn-off';
						}
						//button.className = 'us-layout-storage-btn-none';
					}
				}
			}

			return true;
		}

		function displayMediaButton(deviceBtnInfo) {
			if (deviceBtnInfo == null || deviceBtnInfo == undefined) {
				return false;
			}

			var isHidden = !SANDBOX.uiUtil().isItSupportingThisStorage(deviceBtnInfo);
			if (isHidden == false && SANDBOX.ESVS.Media != null && SANDBOX.ESVS.Media.list != null) {
				if (SANDBOX.ESVS.Media.list.indexOf(deviceBtnInfo.name) < 0) {
					isHidden = true;
				}
			}

			if (isHidden) {
				return false;
			} else {
				//                <li id="us-cert-manage-storage-btn-li-removable">
				//	                <button id="us-cert-manage-btn-removable" class="us-layout-storage-btn-off" type="button">
				//	                    <span class="us-drive-select"><img id="us-cert-manage-img-drive" /></span>
				//	                    <span class="us-img-storage"><img id="us-cert-manage-img-removable" /></span>
				//	                    <span id="us-cert-manage-lbl-removable" class="us-layout-lbl-storage"></span>
				//	                </button>
				//	            </li>
				var ul = document.getElementById('us-cert-manage-storage-btn-list');
				var li = document.createElement('li');
				li.setAttribute('id', "us-cert-manage-storage-btn-li-" + deviceBtnInfo.name, 0);
				li.setAttribute('mediaIndex', deviceBtnInfo.mediaIndex, 0);
				if (deviceBtnInfo.mediaIndex == 7) {
					li.className = 'line-first';
				}
				if ('hidden' === deviceBtnInfo.visibility) {
					li.style.display = 'none';
					li.style.visibility = 'hidden';
				} else {
					li.style.display = 'block';
					li.style.visibility = 'visible';
				}

				var button = document.createElement('button');
				button.setAttribute('type', 'button', 0);
				button.setAttribute('id', 'us-cert-manage-btn-' + deviceBtnInfo.name, 0);
				button.setAttribute('title', deviceBtnInfo.label, 0);
				button.setAttribute('tabindex', deviceBtnInfo.tabIndex, 0);
				if (deviceBtnInfo.disabled) {/* plugin free mode */
					button.onclick = function() {
						SANDBOX.uiUtil().msgBox(__lang.IDS_MSGBOX_NOT_SUPPORTED_MEDIA);
					};
					//button.setAttribute('disabled', 'disabled', 0);
					button.className = 'us-layout-storage-btn-none';
				} else {
					button.onclick = deviceBtnInfo.onclick;
					if (deviceBtnInfo.device === __CurrentDevice) {
						button.className = 'us-layout-storage-btn-on';
						setTimeout(function() {
							button.focus();
						}, 10);
					} else {
						button.className = 'us-layout-storage-btn-off';
					}
				}
				li.appendChild(button);

				if ('harddisk' !== deviceBtnInfo.name && 'webstorage' !== deviceBtnInfo.name) {
					var plusImgSpan = document.createElement('span');
					plusImgSpan.className = 'us-drive-select';
					//					var plusImg = document.createElement('img');
					//					plusImg.setAttribute('id', 'us-cert-manage-img-drive', 0);
					//					plusImgSpan.appendChild(plusImg);
					button.appendChild(plusImgSpan);
				}

				var imgSpan = document.createElement('span');
				imgSpan.className = 'us-img-storage';
				var btnImg = document.createElement('img');
				btnImg.setAttribute('id', 'us-cert-manage-img-' + deviceBtnInfo.name, 0);
				btnImg.setAttribute('alt', deviceBtnInfo.label, 0);
				if (deviceBtnInfo.disabled) {/* plugin free mode */
					btnImg.setAttribute('src', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/img/media_' + deviceBtnInfo.name + '_d.png', 0);
				} else {
					btnImg.setAttribute('src', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/img/media_' + deviceBtnInfo.name + '.png', 0);
				}
				imgSpan.appendChild(btnImg);
				button.appendChild(imgSpan);

				var lblSpan = document.createElement('span');
				lblSpan.setAttribute('id', 'us-cert-manage-lbl-' + deviceBtnInfo.name, 0);
				lblSpan.className = 'us-layout-lbl-storage';
				lblSpan.appendChild(document.createTextNode(deviceBtnInfo.label));
				button.appendChild(lblSpan);

				li.appendChild(button);

				ul.appendChild(li);
			}

			return true;
		}

		function displayMediaAllStorage(obj, textObj, showType) {
			var __text = textObj;

			if (showType == 'no_more') {
				SANDBOX.uiUtil().msgBox(__text.IDS_MSGBOX_NOT_MORE_MEDIA);
			} else {
				var div = document.getElementById('us-cert-manage-storage-wrap');
				if (showType == 'open') {
					div.className = "us-layout-storage-more-wrap";

					var moreBtn = document.getElementById('us-cert-manage-storage-more-btn');
					moreBtn.setAttribute('title', (__text.IDS_STORAGE_MORE_VIEW + __text.IDS_STORAGE_MORE_VIEW_HIDDEN + __text.IDS_BUTTON), 0);
					moreBtn.onclick = function() {
						displayMediaAllStorage(this, __text, 'close');
						/* ChangeButtonStyle(this); */
					};

					var moreBtnImg = document.getElementById('us-cert-manage-storage-more-btn-img');
					moreBtnImg.setAttribute('alt', (__text.IDS_STORAGE_MORE_VIEW + __text.IDS_STORAGE_MORE_VIEW_HIDDEN), 0);
					moreBtnImg.setAttribute('src', SANDBOX.ESVS.SRCPath + "unisignweb/rsrc/img/media_more_btn_close.png", 0);
				} else {
					div.className = "us-layout-storage-wrap";

					var moreBtn = document.getElementById('us-cert-manage-storage-more-btn');
					moreBtn.setAttribute('title', (__text.IDS_STORAGE_MORE_VIEW + __text.IDS_STORAGE_MORE_VIEW_SHOW + __text.IDS_BUTTON), 0);
					moreBtn.onclick = function() {
						displayMediaAllStorage(this, __text, 'open');
						/* ChangeButtonStyle(this); */
					};

					var moreBtnImg = document.getElementById('us-cert-manage-storage-more-btn-img');
					moreBtnImg.setAttribute('alt', (__text.IDS_STORAGE_MORE_VIEW + __text.IDS_STORAGE_MORE_VIEW_SHOW), 0);
					moreBtnImg.setAttribute('src', SANDBOX.ESVS.SRCPath + "unisignweb/rsrc/img/media_more_btn_open.png", 0);
				}

				var mediaList = SANDBOX.ESVS.Media.list.split('|');
				for (var i = 0; i < mediaList.length; i++) {
					var mediaName = mediaList[i];
					var mediaInfo = SANDBOX.CONST.medias[mediaName];
					if (mediaInfo == undefined || mediaInfo == null) {
						continue;
					}

					var li = document.getElementById("us-cert-manage-storage-btn-li-" + mediaInfo.name);
					if (li != undefined && li != null) {
						var mediaIndex = li.getAttribute('mediaIndex');
						if (showType == 'open') {
							li.style.display = 'block';
							li.style.visibility = 'visible';
						} else {
							if (mediaIndex > 6) {
								li.style.display = 'none';
								li.style.visibility = 'hidden';
							} else {
								li.style.display = 'block';
								li.style.visibility = 'visible';
							}
						}

						if (mediaIndex == 1) {
							var button = document.getElementById('us-cert-manage-btn-' + mediaInfo.name);
							// test
							//setTimeout(function() {
							//	button.focus();
							//}, 10);
							//break;
						}
					}
				}
			}

			return true;
		}

		function WindowExit() {
			// 2013.11.18
			__CertsList.restoreOnMouseEvent();
			// 2013.11.18
			
			Param.onCancel();
		}

		function getCurrDevice(__lang) {
			var obj = {
				alt : document.querySelector('.us-layout-storage-btn-on span img').alt,
				src : document.querySelector('.us-layout-storage-btn-on span img').src
			};
			var detailImg = document.getElementById('us-cert-manage-img-current-storage');
			detailImg.setAttribute('alt', obj.alt, 0);
			detailImg.setAttribute('src', obj.src, 0);

			var detailImg = document.getElementById('us-cert-manage-lbl-current-storage');
			detailImg.innerHTML = obj.alt;

			if (__CertsList.selectedIndex() < 0) {
				var detailBoxSubject = document.getElementById('us-layout-cert-manage-detail-box-subject');
				detailBoxSubject.innerHTML = "<b style='color: red;'>" + __lang.IDS_DETAIL_BOX_NOT_SELECTED + "</b>";

				document.getElementById('us-layout-cert-manage-detail-box-expire-data').innerHTML = "";
			}
		}

		function CertManageAction(obj, __lang) {
			switch (Param.args.type) {
				case 1:
					// 인증서 복사
					CopyCert(obj, __lang);
					break;
				case 2:
					// 비밀번호 변경
					ChangePW(obj, __lang);
					break;
				case 3:
					// 가져오기
					CallPFXImportFunc(__lang);
					break;
				case 4:
					// 내보내기
					ExportPFX(obj, __lang);
					break;
				case 5:
					// 삭제
					DeleteCert(obj, __lang);
					break;
				default:
					break;
			}
		}

		function WindowGenerate() {
			var __form = eval(__UIElement.__Layout);
			var __lang = eval((eval(__UIElement.__Lang))());

			var UITarget = SANDBOX.ESVS.TargetObj;
			// for test
			UITarget.innerHTML = __form();

			var titleLbl = document.getElementById('us-cert-manage-lbl-title');
			titleLbl.appendChild(document.createTextNode(__lang.IDS_CERT_MANAGEMENT));
			// for sense reader
			titleLbl.setAttribute('tabindex', __TabIndex++, 0);
			// for sense reader

			var closeImgBtn = document.getElementById('us-cert-manage-cls-img-btn');
			closeImgBtn.setAttribute('title', __lang.IDS_CLOSE_CERT_MANAGEMENT_CLOSE, 0);
			//closeImgBtn.setAttribute('tabindex', __TabIndex++, 0);
			closeImgBtn.onclick = function() {
				WindowExit();
			};

			var closeImg = document.getElementById('us-cert-manage-cls-btn-img');
			closeImg.setAttribute('src', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/img/cert_close_btn.png', 0);

			// for sense reader
			var cursorDis = document.getElementById('us-cursor-disabled');
			cursorDis.setAttribute('title', __lang.IDS_SENSE_READER_INTRO, 0);
			//cursorDis.setAttribute('tabindex', __TabIndex++, 0);
			// for sense reader

			var logoImg = document.getElementById('us-cert-manage-logo-img');
			logoImg.setAttribute('alt', __lang.IDS_LOGO, 0);
			logoImg.setAttribute('src', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/img/main_cert_logo.png', 0);
			// for sense reader
			logoImg.setAttribute('tabindex', __TabIndex++, 0);
			// for sense reader

			var storageLegend = document.getElementById('us-cert-manage-legend-storage');
			storageLegend.appendChild(document.createTextNode(__lang.IDS_STORAGE_SELECT));

			var mediaCnt = 0;
			var mediaList = SANDBOX.ESVS.Media.list.split('|');
			var firstMedia = null;
			for (var i = 0; i < mediaList.length; i++) {
				var mediaName = mediaList[i];
				var mediaInfo = SANDBOX.CONST.medias[mediaName];

				if (mediaInfo != undefined && mediaInfo != null) {
					switch ( mediaInfo.device ) {
						case SANDBOX.CONST.__USFB_M_DISK.device :
							//mediaInfo.name = SANDBOX.CONST.__USFB_M_DISK.name;
							//mediaInfo.device = SANDBOX.CONST.__USFB_M_DISK.device;
							mediaInfo.label = __lang.IDS_STORAGE_REMOVABLE;
							mediaInfo.disabled = (0x02 == SANDBOX.ESVS.Mode);
							/* if plugin free mode is diasbled */
							mediaInfo.onclick = function() {
								GetCertsFromRemovable(this, __lang);
								ChangeButtonStyle(this);
								getCurrDevice(__lang);
							};
							break;
						case SANDBOX.CONST.__USFB_M_HSMKEY.device :
							//mediaInfo.name = SANDBOX.CONST.__USFB_M_HSMKEY.name;
							//mediaInfo.device = SANDBOX.CONST.__USFB_M_HSMKEY.device;
							mediaInfo.label = __lang.IDS_STORAGE_SECTOKEN;
							// nhkim 20151023
							if (Param.args && ((Param.args.type == 1) || (Param.args.type == 2) || (Param.args.type == 4)))
								mediaInfo.disabled = true;
							else
								mediaInfo.disabled = !('win' == SANDBOX.osName && 0x02 != SANDBOX.ESVS.Mode);
							/* if plugin free mode is diasbled */
							//
							mediaInfo.onclick = function() {
								GetCertsFromSecToken(this, __lang);
								ChangeButtonStyle(this);
								getCurrDevice(__lang);
							};
							break;
						case SANDBOX.CONST.__USFB_M_SMARTCARD.device :
							//mediaInfo.name = SANDBOX.CONST.__USFB_M_SMARTCARD.name;
							//mediaInfo.device = SANDBOX.CONST.__USFB_M_SMARTCARD.device;
							mediaInfo.label = __lang.IDS_STORAGE_SAVETOKEN;
							mediaInfo.disabled = !('win' == SANDBOX.osName && 0x02 != SANDBOX.ESVS.Mode);
							/* if plugin free mode is diasbled */
							mediaInfo.onclick = function() {
								GetCertsFromSaveToken(this, __lang);
								ChangeButtonStyle(this);
								getCurrDevice(__lang);
							};
							break;
						case SANDBOX.CONST.__USFB_M_MOBILE.device :
							//mediaInfo.name = SANDBOX.CONST.__USFB_M_MOBILE.name;
							//mediaInfo.device = SANDBOX.CONST.__USFB_M_MOBILE.device;
							mediaInfo.label = __lang.IDS_STORAGE_MOBILEPHONE;
							// nhkim 20151023
							if (Param.args && ((Param.args.type == 2) || (Param.args.type == 5)))
								mediaInfo.disabled = true;
							else
								mediaInfo.disabled = (0x02 == SANDBOX.ESVS.Mode);
							mediaInfo.onclick = function() {
								GetCertsFromMobilePhone(this, __lang);
								ChangeButtonStyle(this);
								getCurrDevice(__lang);
							};
							break;
						case SANDBOX.CONST.__USFB_M_HDD.device :
							//mediaInfo.name = SANDBOX.CONST.__USFB_M_HDD.name;
							//mediaInfo.device = SANDBOX.CONST.__USFB_M_HDD.device;
							mediaInfo.label = __lang.IDS_STORAGE_HARDDISK;
							mediaInfo.disabled = (0x02 == SANDBOX.ESVS.Mode);
							/* if plugin free mode is diasbled */
							mediaInfo.onclick = function() {
								GetCertsFromHdd(this, __lang);
								ChangeButtonStyle(this);
								getCurrDevice(__lang);
							};
							break;
						// nhkim 20151015
						case SANDBOX.CONST.__USFB_M_MOBILETOKEN.device :
							//mediaInfo.name = SANDBOX.CONST.__USFB_M_HDD.name;
							//mediaInfo.device = SANDBOX.CONST.__USFB_M_HDD.device;
							mediaInfo.label = __lang.IDS_STORAGE_MOBILETOKEN;
							mediaInfo.disabled = true;
							/* if plugin free mode is diasbled */ // 스마트인증은 인증서 관리창에서 지원하지 않음
							mediaInfo.readOnly = true;
							mediaInfo.onclick = function() {
								GetCertsFromMobileToken(this, __lang);
								ChangeButtonStyle(this);
								getCurrDevice(__lang);
							};
							break;
							
						case SANDBOX.CONST.__USFB_M_SECUREDISK.device :
							mediaInfo.label = __lang.IDS_STORAGE_SECUREDISK;
							// 인증서 복사, 인증서 내보내기
							if (Param.args && ((Param.args.type == 1) || (Param.args.type == 4)))
								mediaInfo.disabled = true;
							else
								mediaInfo.disabled = !('win' == SANDBOX.osName && 0x02 != SANDBOX.ESVS.Mode);							
							/* if plugin free mode is diasbled */ // 스마트인증은 인증서 관리창에서 지원하지 않음
							mediaInfo.readOnly = true;
							mediaInfo.onclick = function() {
								GetCertsFromSecureDisk(this, __lang);
								ChangeButtonStyle(this);
								getCurrDevice(__lang);
							};
							break;							
						//
						case SANDBOX.CONST.__PF_M_LS.device :
							//mediaInfo.name = SANDBOX.CONST.__PF_M_LS.name;
							//mediaInfo.device = SANDBOX.CONST.__PF_M_LS.device;
							mediaInfo.label = __lang.IDS_STORAGE_LS;
							mediaInfo.disabled = (0x01 == SANDBOX.ESVS.Mode);
							/* if plugin free mode is diasbled */
							mediaInfo.onclick = function() {
								GetCertsFromLS(this, __lang);
								ChangeButtonStyle(this);
								getCurrDevice(__lang);
							};
							break;
						case SANDBOX.CONST.__PF_M_TOUCHSIGN.device :
							//mediaInfo.name = SANDBOX.CONST.__PF_M_TOUCHSIGN.name;
							//mediaInfo.device = SANDBOX.CONST.__PF_M_TOUCHSIGN.device;
							mediaInfo.label = __lang.IDS_STORAGE_TOUCHSIGN;
							mediaInfo.disabled = true;
							/* if plugin free mode is diasbled */
							mediaInfo.onclick = function() {
								GetCertsFromETC(this, __lang);
								/* ChangeButtonStyle(this); */
								getCurrDevice(__lang);
							};
							break;
						case SANDBOX.CONST.__PF_M_SMARTSIGN.device :
							//mediaInfo.name = SANDBOX.CONST.__PF_M_SMARTSIGN.name;
							//mediaInfo.device = SANDBOX.CONST.__PF_M_SMARTSIGN.device;
							mediaInfo.label = __lang.IDS_STORAGE_SMARTSIGN;
							mediaInfo.disabled = true;
							/* if plugin free mode is diasbled */
							mediaInfo.onclick = function() {
								GetCertsFromETC(this, __lang);
								/* ChangeButtonStyle(this); */
								getCurrDevice(__lang);
							};
							break;
						case SANDBOX.CONST.__PF_M_WEBSECTOKEN.device :
							//mediaInfo.name = SANDBOX.CONST.__PF_M_WEBSECTOKEN.name;
							//mediaInfo.device = SANDBOX.CONST.__PF_M_WEBSECTOKEN.device;
							mediaInfo.label = __lang.IDS_STORAGE_WEBSECTOKEN;
							mediaInfo.disabled = true;
							/* if plugin free mode is diasbled */
							mediaInfo.onclick = function() {
								GetCertsFromETC(this, __lang);
								/* ChangeButtonStyle(this); */
								getCurrDevice(__lang);
							};
							break;
						case SANDBOX.CONST.__PF_M_WEBSOFTTOKEN.device :
							//mediaInfo.name = SANDBOX.CONST.__PF_M_WEBSOFTTOKEN.name;
							//mediaInfo.device = SANDBOX.CONST.__PF_M_WEBSOFTTOKEN.device;
							mediaInfo.label = __lang.IDS_STORAGE_WEBSOFTTOKEN;
							mediaInfo.disabled = true;
							/* if plugin free mode is diasbled */
							mediaInfo.onclick = function() {
								GetCertsFromETC(this, __lang);
								/* ChangeButtonStyle(this); */
								getCurrDevice(__lang);
							};
							break;
						default :
							mediaInfo.label = __lang.IDS_STORAGE_ETC;
							mediaInfo.disabled = true;
							/* if plugin free mode is diasbled */
							mediaInfo.onclick = function() {
								GetCertsFromETC(this, __lang);
								/* ChangeButtonStyle(this); */
								getCurrDevice(__lang);
							};
							break;
					}

					mediaInfo.tabIndex = __TabIndex;
					mediaInfo.mediaIndex = (mediaCnt + 1);
					if (mediaInfo.mediaIndex > 6) {
						mediaInfo.visibility = 'hidden';
					} else {
						mediaInfo.visibility = 'visible';
					}

					if (displayMediaButton(mediaInfo)) {
						__TabIndex++;
						mediaCnt++;
					};

					if (firstMedia == null) {
						firstMedia = mediaInfo;
					}
				}
			}

			//			var moreBtnDiv = document.getElementById('us-cert-manage-storage-more');
			//			if (mediaCnt > 6){
			//				moreBtnDiv.style.display = 'block';
			//				moreBtnDiv.style.visibility = 'visible';
			//			}else{
			//				moreBtnDiv.style.display = 'none';
			//				moreBtnDiv.style.visibility = 'hidden';
			//			}

			var moreBtn = document.getElementById('us-cert-manage-storage-more-btn');
			if (moreBtn != null && moreBtn != undefined) {
				moreBtn.setAttribute('title', (__lang.IDS_STORAGE_MORE_VIEW + __lang.IDS_STORAGE_MORE_VIEW_SHOW + __lang.IDS_BUTTON), 0);
				if (mediaCnt > 6) {
					moreBtn.style.display = 'block';
					moreBtn.style.visibility = 'visible';
					moreBtn.setAttribute('tabindex', __TabIndex++, 0);
					moreBtn.onclick = function() {
						displayMediaAllStorage(this, __lang, 'open');
						/* ChangeButtonStyle(this); */
					};
				} else {
					moreBtn.setAttribute('disabled', 'disabled', 0);
					moreBtn.style.display = 'none';
					moreBtn.style.visibility = 'hidden';
					//moreBtn.setAttribute('tabindex', __TabIndex++, 0);
					moreBtn.onclick = function() {
						displayMediaAllStorage(this, __lang, 'no_more');
						/* ChangeButtonStyle(this); */
					};
				}

				var moreBtnImg = document.getElementById('us-cert-manage-storage-more-btn-img');
				moreBtnImg.setAttribute('alt', (__lang.IDS_STORAGE_MORE_VIEW + __lang.IDS_STORAGE_MORE_VIEW_SHOW), 0);
				moreBtnImg.setAttribute('src', SANDBOX.ESVS.SRCPath + 'unisignweb/rsrc/img/media_more_btn_open.png', 0);
			}

			var certListTbl = document.getElementById('us-cert-manage-tbl-list');
			certListTbl.style.summary = __lang.IDS_CERT_LIST_TABLE_SUMMARY;

			var certListCap = document.getElementById('us-cert-manage-tbl-list-caption');
			certListCap.appendChild(document.createTextNode(__lang.IDS_CERT_LIST_CAPTION));

			if (SANDBOX.ESVS.Mode & 0x02)
				SANDBOX.uiUtil().loadingBox(true, "us-div-list-load", 0);

			//var titleList = [{title:__lang.IDS_CERT_TYPE}, {title:__lang.IDS_CERT_SUBJECT}, {title:__lang.IDS_CERT_ISSUER}, {title:__lang.IDS_CERT_EXPIRATION_DATE}, {title:__lang.IDS_CERT_EXPIRATION_STATE}];
			var titleList = [{
				title : __lang.IDS_CERT_STATUS
			}, {
				title : __lang.IDS_CERT_CLASSIFY
			}, {
				title : __lang.IDS_CERT_USER
			}, {
				title : __lang.IDS_CERT_ISSUER
			}, {
				title : __lang.IDS_CERT_EXPIRATION_DAY
			}];
			__CurrentTabIndex = __TabIndex++;
			DrawCertsListView(titleList, __lang);

			var fileSearchHidden = document.getElementById('us-cert-manage-file-search-hidden');
			fileSearchHidden.onchange = function() {
				ImportPFX(this, __lang);
			};

			if (Param.args != null) {
				document.getElementById('us-div-cert-manage-btns').style.display = 'none';
				/**
				 * Param.args.type
				 * case 1 : copy
				 * case 2 : encrypt issue
				 * case 3 : check keyset
				 * case 4 : test sign :: nochange
				 * case 5 : valid cert
				 * case 6 : check password
				 * case 7 : change password (private key)
				 * case 8 : manage pfx import
				 * case 9 : manage pfx export
				 * case 10 : remove cert
				 * case 11 : hold cert
				 * case 12 : revoke cert
				 */

				var detailFieldSetLegend = document.getElementById('us-fieldset-cert-manage-title');
				detailFieldSetLegend.appendChild(document.createTextNode(__lang.IDS_DETAIL_BOX_TITLE));

				if (__CertsList.selectedIndex() > -1) {
					var _index = parseInt(__CertsList.selectedIndex());
					var bid = "us-layout-cert-manage-detail-box-";
					var userCert = SANDBOX.certsList.list[_index - 1].cert;
					SANDBOX.usWebToolkit.x509Certificate.parser(userCert, 'Base64');

					document.getElementById(bid + 'subject').innerHTML = "<b>" + SANDBOX.certUtil().getCN(SANDBOX.usWebToolkit.x509Certificate.getSubjectName()) + "</b>";

					document.getElementById(bid + 'expire-data').innerHTML = SANDBOX.certUtil().getLocalDate(SANDBOX.usWebToolkit.x509Certificate.getNotBefore()) + " ~ " + SANDBOX.certUtil().getLocalDate(SANDBOX.usWebToolkit.x509Certificate.getNotAfter());
				} else {
					var detailBoxSubject = document.getElementById('us-layout-cert-manage-detail-box-subject');
					detailBoxSubject.innerHTML = "<b style='color: red;'>" + __lang.IDS_DETAIL_BOX_NOT_SELECTED + "</b>";
				}

				var detailBoxExpire = document.getElementById('us-layout-cert-manage-detail-box-expire-lbl');
				detailBoxExpire.innerHTML = __lang.IDS_DETAIL_BOX_EXPIRE_DATE + ' : ';

				/*
				 var detailBoxSavePath = document.getElementById('us-layout-cert-manage-detail-box-savepath-lbl');
				 detailBoxSavePath.innerHTML = __lang.IDS_DETAIL_BOX_SAVE_PATH + ' : ';
				 */

				var detailBoxBtnView = document.getElementById('us-cert-manage-detail-view-btn');
				detailBoxBtnView.setAttribute('tabindex', __TabIndex++, 0);
				detailBoxBtnView.value = __lang.IDS_DETAIL_BOX_BTN_VIEW;
				detailBoxBtnView.title = __lang.IDS_DETAIL_BOX_BTN_VIEW;
				detailBoxBtnView.onclick = function() {
					ViewCert(this, __lang);
				};

				var detailBoxBtnAction = document.getElementById('us-cert-manage-sw-info-btn');
				detailBoxBtnAction.setAttribute('tabindex', __TabIndex++, 0);
				detailBoxBtnAction.setAttribute('class', 'btn-action');

				detailBoxBtnAction.value = __lang.IDS_DETAIL_BOX_BTN_ACTIONS[Param.args.type];
				//eval('__lang.IDS_DETAIL_BOX_BTN_ACTION' + Param.args.type);
				detailBoxBtnAction.title = __lang.IDS_DETAIL_BOX_BTN_ACTIONS[Param.args.type];
				//eval('__lang.IDS_DETAIL_BOX_BTN_ACTION' + Param.args.type);
				detailBoxBtnAction.onclick = function() {
					CertManageAction(this, __lang);
				};

				getCurrDevice(__lang);
			} else {
				document.getElementById('us-div-cert-manage-detail').style.display = 'none';

				var certViewBtn = document.getElementById('us-cert-manage-cert-view-btn');
				certViewBtn.setAttribute('value', __lang.IDS_CERT_VIEW, 0);
				certViewBtn.setAttribute('title', __lang.IDS_CERT_VIEW + __lang.IDS_BUTTON, 0);
				certViewBtn.setAttribute('tabindex', __TabIndex++, 0);
				certViewBtn.onclick = function() {
					ViewCert(this, __lang);
				};

				var pwChangeBtn = document.getElementById('us-cert-manage-pw-change-btn');
				pwChangeBtn.setAttribute('value', __lang.IDS_PW_CHANGE, 0);
				pwChangeBtn.setAttribute('title', __lang.IDS_PW_CHANGE + __lang.IDS_BUTTON, 0);
				pwChangeBtn.setAttribute('tabindex', __TabIndex++, 0);
				pwChangeBtn.onclick = function() {
					ChangePW(this, __lang);
				};

				var certCopyBtn = document.getElementById('us-cert-manage-cert-copy-btn');
				certCopyBtn.setAttribute('value', __lang.IDS_CERT_COPY, 0);
				certCopyBtn.setAttribute('title', __lang.IDS_CERT_COPY + __lang.IDS_BUTTON, 0);
				certCopyBtn.setAttribute('tabindex', __TabIndex++, 0);
				certCopyBtn.onclick = function() {
					CopyCert(this, __lang);
				};

				var certDeleteBtn = document.getElementById('us-cert-manage-cert-delete-btn');
				certDeleteBtn.setAttribute('value', __lang.IDS_CERT_DELETE, 0);
				certDeleteBtn.setAttribute('title', __lang.IDS_CERT_DELETE + __lang.IDS_BUTTON, 0);
				certDeleteBtn.setAttribute('tabindex', __TabIndex++, 0);
				certDeleteBtn.onclick = function() {
					DeleteCert(this, __lang);
				};

				var certGetBtn = document.getElementById('us-cert-manage-get-cert-btn');
				certGetBtn.setAttribute('value', __lang.IDS_CERT_GET, 0);
				certGetBtn.setAttribute('title', __lang.IDS_CERT_GET + __lang.IDS_BUTTON, 0);
				certGetBtn.setAttribute('tabindex', __TabIndex++, 0);
				certGetBtn.onclick = function() {
					CallPFXImportFunc(__lang);
				};

				var certPutOutBtn = document.getElementById('us-cert-manage-put-cert-out-btn');
				certPutOutBtn.setAttribute('value', __lang.IDS_CERT_PUT_OUT, 0);
				certPutOutBtn.setAttribute('title', __lang.IDS_CERT_PUT_OUT + __lang.IDS_BUTTON, 0);
				certPutOutBtn.setAttribute('tabindex', __TabIndex++, 0);
				certPutOutBtn.onclick = function() {
					ExportPFX(this, __lang);
				};

				var swInfoBtn = document.getElementById('us-cert-manage-sw-info-btn');
				swInfoBtn.setAttribute('value', __lang.IDS_SW_INFO, 0);
				swInfoBtn.setAttribute('title', __lang.IDS_SW_INFO + __lang.IDS_BUTTON, 0);
				swInfoBtn.setAttribute('tabindex', __TabIndex++, 0);
				swInfoBtn.onclick = function() {
					ShowSoftwareVersion(this);
				};
			}

			var noticeLbl = document.getElementById('us-cert-manage-lbl-notice');
			noticeLbl.appendChild(document.createTextNode(__lang.IDS_NOTICE));

			var cancelBtn = document.getElementById('us-cert-manage-cls-btn');
			cancelBtn.setAttribute('value', __lang.IDS_CANCEL, 0);
			cancelBtn.setAttribute('title', __lang.IDS_CANCEL + __lang.IDS_BUTTON, 0);
			cancelBtn.setAttribute('tabindex', __TabIndex++, 0);
			cancelBtn.onclick = function() {
				WindowExit();
			};
			//cancelBtn.onfocusout = function(){ titleLbl.focus(); }; // tab focus cycle :: yjyoon

			cancelBtn.onkeydown = function(e) {
				var evt = e || window.event;
				var keyCode = evt.which || evt.keyCode;
				if (9 == keyCode && evt.shiftKey) {
					cancelBtn.onblur = function() {
						setTimeout(function() {
							document.getElementById('us-cert-manage-sw-info-btn').focus();
						}, 10);
					};
				}
				if (9 == keyCode && !evt.shiftKey) {
					cancelBtn.onblur = function() {
						setTimeout(function() {
							titleLbl.focus();
						}, 10);
					};
				}
			};

			titleLbl.onkeydown = function(e) {
				var evt = e || window.event;
				var keyCode = evt.which || evt.keyCode;
				if (9 == keyCode && evt.shiftKey) {
					titleLbl.onblur = function() {
						setTimeout(function() {
							cancelBtn.focus();
						}, 10);
					};
				}
				if (9 == keyCode && !evt.shiftKey) {
					//					titleLbl.onblur = function() { setTimeout( function(){ firstMedia.focus(); }, 10 ); };
				}
			};

			return document.getElementById('us-div-cert-manage');
		}

		return WindowGenerate();
	};

	return function(Param) {
		var layerLevel = SANDBOX.uiLayerLevel;
		var overlay = SANDBOX.uiUtil().getOverlay(layerLevel/*, SANDBOX.browserName, SANDBOX.browserVersion*/);
		var win = ConstructScreen({
			type : Param.type,
			args : Param.args,
			onConfirm : Param.onConfirm,
			onCancel : Param.onCancel
		});
		win.style.zIndex = layerLevel + 1;
		document.body.insertBefore(overlay, document.body.firstChild);
		// for test

		/* for resize */
		var preEv = window.onresize;
		/* for resize */

		// for sense reader
		/*
		 function firstFocus() {
		 var mediaList = SANDBOX.ESVS.Media.list.split('|');
		 for (var i=0; i < mediaList.length; i++){
		 var mediaName = mediaList[i];
		 var mediaInfo = SANDBOX.CONST.medias[mediaName];
		 if (mediaInfo == undefined || mediaInfo == null){
		 continue;
		 }

		 var button = document.getElementById('us-cert-manage-btn-'+mediaInfo.name);
		 if (button != undefined && button != null){
		 button.focus();
		 break;
		 }
		 }
		 }
		 */
		function firstFocus() {
			var mediaList = SANDBOX.ESVS.Media.list.split('|');
			for (var i = 0; i < mediaList.length; i++) {
				var mediaName = mediaList[i];
				var mediaInfo = SANDBOX.CONST.medias[mediaName];
				if (mediaInfo == undefined || mediaInfo == null) {
					continue;
				}

				var button = document.getElementById('us-cert-manage-btn-' + mediaInfo.name);
				if (button.className == 'us-layout-storage-btn-on') {
					//button.focus();	// IE 8
					return;
				}
			}
		}

		// for sense reader

		return {
			show : function() {
				draggable(win, document.getElementById('us-div-cert-manage-title'));
				overlay.style.display = 'block';
				//overlay show

				SANDBOX.uiUtil().offsetResize(win);

				/*
				 var winHeight = SANDBOX.uiUtil().getNumSize(SANDBOX.uiUtil().getStyle(win, 'height', 'height'));
				 if ( -1 === winHeight ) {
				 win.style.top = SANDBOX.uiUtil().getScrollTop() + (SANDBOX.uiUtil().getViewportHeight() / 6) + 'px';
				 } else {
				 win.style.top = SANDBOX.uiUtil().getScrollTop() + ((SANDBOX.uiUtil().getViewportHeight() - winHeight) / 3) + 'px';
				 }
				 win.style.left = SANDBOX.uiUtil().getScrollLeft() + ((SANDBOX.uiUtil().getViewportWidth() - SANDBOX.uiUtil().getNumSize(SANDBOX.uiUtil().getStyle(win, 'width', 'width'))) / 2) + 'px';
				 win.style.display = 'block';
				 */

				/* for resize */
				window.onresize = function() {
					SANDBOX.uiUtil().offsetResize(win);
					/*if ( win) {
					 var winHeight = SANDBOX.uiUtil().getNumSize(SANDBOX.uiUtil().getStyle(win, 'height', 'height'));
					 if ( -1 === winHeight ) {
					 win.style.top = SANDBOX.uiUtil().getScrollTop() + (SANDBOX.uiUtil().getViewportHeight() / 6) + 'px';
					 } else {
					 win.style.top = SANDBOX.uiUtil().getScrollTop() + ((SANDBOX.uiUtil().getViewportHeight() - winHeight) / 3) + 'px';
					 }
					 win.style.left = SANDBOX.uiUtil().getScrollLeft() + ((SANDBOX.uiUtil().getViewportWidth() - SANDBOX.uiUtil().getNumSize(SANDBOX.uiUtil().getStyle(win, 'width', 'width'))) / 2) + 'px';
					 }

					 if ( preEv ) {
					 preEv();
					 }*/
				}
				/* for resize */

				SANDBOX.uiLayerLevel += 10;
				SANDBOX.ESVS.TabIndex += 30;
				setTimeout(function() {
					firstFocus();
				}, 10);
			},

			hide : function() {
				overlay.style.display = 'none';
				win.style.display = 'none';
			},

			dispose : function( clear ) {		
				
				if ( clear == true ) {
					// 인증서 리스트 삭제			
					if ( (0x04 & SANDBOX.ESVS.Mode) && SANDBOX.nimservice() ) {
						SANDBOX.nimservice().ClearAllUserCertList( function (rv, rvMsg) {
						});
					}
				}
					
				/* for resize */
				window.onresize = function() {
					if (preEv) {
						preEv();
					}
				}
				/* for resize */

				var parent = win.parentNode;
				parent.removeChild(win);
				overlay.parentNode.removeChild(overlay);
				SANDBOX.uiLayerLevel -= 10;
				SANDBOX.ESVS.TabIndex -= 30;
			}
		};
	};
};
