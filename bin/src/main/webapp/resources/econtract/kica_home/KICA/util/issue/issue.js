/**
 * @public
 * @class
 * @description 인증서 발급을 위한 class
 */
var issueCertificate = (function () {
    var refCode = '',
        authCode = '',
        password = '',
        confirmPassword = '';


    var issueCertInit = function () {
        refCode = '';
        authCode = '';
        password = '';
        confirmPassword = '';
    };

    var setRefCode = function (ref) {
        refCode = ref;
    };

    var setAuthCode = function (auth) {
        authCode = auth;
    };

    var setPw = function (pw) {
        password = pw;
    };

    var setConfirmPw = function (copw) {
        confirmPassword = copw;
    };

    //인증서 발급
    var issueCert = function () {
        var cmd = 'issueCertificate.issueCert';
        var mediaType = TargetMediaInfo.getMediaType();
        var extraValue = TargetMediaInfo.getExtraValue();

        var Data = {
            'refCode': refCode,
            'authCode': authCode,
            'password': password,
            'confirmPassword': confirmPassword,
            'mediaType': mediaType,
            'extraValue': extraValue
        };
        issueCertInit();
        var param = JSON.stringify(Data);
        secukitnxInterface.SecuKitNX(cmd, param);
    };

    //인증서 발급 콜백
    var issueCertCallback = function (reply) {
        var errorCheck = -1;
        try {
            errorCheck = reply.ERROR_CODE;
        } catch (err) {
            //console.log(err);
        }

        //issueCertificate data init
        issueCertificate.issueCertInit();

        if (errorCheck === undefined) {
            if (reply.issueCert === 'true') {

                // 결과 저장
                NX_ISSUE_Result.init();
                NX_ISSUE_Result.setResult(reply.issueCert);
                NX_ISSUE_Result.setIssueUserName(reply.username);
                NX_ISSUE_Result.setIssueCertDN(reply.userDN);
                NX_ISSUE_Result.setIssueCertVaildateFrom(reply.validateFrom);
                NX_ISSUE_Result.setIssueCertVaildateTo(reply.validateTo);

                // 발급중 창 제거
                $('#nx-issue-ing-alert').hide();

                // 발급 성공 창 표시
                $('.nx-issue-success-alert-head-msg').remove();
                $('#nx-issue-success-alert-msg').remove();


                var headMessage = '<div class=\"nx-issue-success-alert-head-msg\">';
                headMessage += '<h1>' + NX_ISSUE_TEXT_1 + '</h1>';
                headMessage += '</div>';
                $('#nx-issue-success-alert-head').append(headMessage);


                var alertMessage = '<div class=\"nx-issue-success-alert-msg\" id=\"nx-issue-success-alert-msg\">';
                alertMessage += '<div class=\"bg-img-area\"><img src=\"' + NX_DEFAULT_IMG_URL + 'img_issue_success.png" alt=\"\" /></div>';
                alertMessage += '<div class=\"gray-box2\"><p class=\"txt-c\"><span class=\"inline-tit\">' + NX_ISSUE_TEXT_1 + '</span></p></div>';
                alertMessage += '</div>';
                $('#nx-issue-succes-alert-box').append(alertMessage);

                setTimeout(function () {
                    $('#nx-pki-ui-wrapper').show();
                    $('#nx-issue-success-alert').show();
                }, 200);

                //결과 함수 호출
                SecuKitNX_Result('issueCert');
            }

        } else {
            // 결과 저장
            NX_ISSUE_Result.init();
            NX_ISSUE_Result.setResult('false');

            // 발급중 창 제거
            $('#nx-issue-ing-alert').hide();

            // 발급 실패 창 표시
            $('.nx-issue-fail-alert-head-msg').remove();
            var headMessage = '<div class=\"nx-issue-fail-alert-head-msg\">';
            headMessage += '<h1>' + NX_ISSUE_TEXT_2 + '</h1>';
            headMessage += '</div>';
            $('#nx-issue-fail-alert-head').append(headMessage);

            // 발급 실패 알림창 호출
            $('.nx-issue-fail-alert-msg').remove();
            var alertMessage = '<div class=\"nx-issue-fail-alert-msg\">';
            alertMessage += '<div class=\"bg-img-area\"><img src=\"' + NX_DEFAULT_IMG_URL + 'img_issue_fail.png" alt=\"\" /></div>';
            alertMessage += '<div class=\"gray-box2\"><p class=\"txt-l\"><span class=\"inline-tit2\">' + NX_ISSUE_TEXT_3;
            alertMessage += '<br />';
            alertMessage += '<br />';
            alertMessage += '[ ErrorCode ] : ' + reply.ERROR_CODE;
            alertMessage += '<br />';
            alertMessage += '[ ErrorMessage ] : ' + reply.ERROR_MESSAGE;
            alertMessage += '</span></p></div>';
            alertMessage += '</div>';

            $('#nx-issue-fail-alert-box').append(alertMessage);

            setTimeout(function () {
                $('#nx-pki-ui-wrapper').show();
                $('#nx-issue-fail-alert').show();
            }, 200);

            //결과 함수 호출
            SecuKitNX_Result('issueCert');
        }
    };

    //인증서 재발급
    var reIssueCert = function () {
        var cmd = 'issueCertificate.reIssueCert';
        var mediaType = TargetMediaInfo.getMediaType();
        var extraValue = TargetMediaInfo.getExtraValue();
        var Data = {
            'refCode': refCode,
            'authCode': authCode,
            'password': password,
            'confirmPassword': confirmPassword,
            'mediaType': mediaType,
            'extraValue': extraValue
        };
        issueCertInit();
        var param = JSON.stringify(Data);
        secukitnxInterface.SecuKitNX(cmd, param);
    };

    var reIssueCertCallback = function (reply) {
        var errorCheck = -1;
        try {
            errorCheck = reply.ERROR_CODE;
        } catch (err) {
            //console.log(err);
        }

        //issueCertificate data init
        issueCertificate.issueCertInit();

        if (errorCheck === undefined) {
            if (reply.reIssueCert === 'true') {

                // 결과 저장
                NX_ISSUE_Result.init();
                NX_ISSUE_Result.setResult(reply.reIssueCert);
                NX_ISSUE_Result.setIssueUserName(reply.username);
                NX_ISSUE_Result.setIssueCertDN(reply.userDN);
                NX_ISSUE_Result.setIssueCertVaildateFrom(reply.validateFrom);
                NX_ISSUE_Result.setIssueCertVaildateTo(reply.validateTo);

                // 발급중 창 제거
                $('#nx-issue-ing-alert').hide();

                // 발급 성공 창 표시
                $('.nx-issue-success-alert-head-msg').remove();
                var headMessage = '<div class=\"nx-issue-success-alert-head-msg\">';
                headMessage += '<h1>' + NX_ISSUE_TEXT_4 + '</h1>';
                headMessage += '</div>';
                $('#nx-issue-success-alert-head').append(headMessage);

                $('.nx-issue-success-alert-msg').remove();
                var alertMessage = '<div class=\"nx-issue-success-alert-msg\">';
                alertMessage += '<div class=\"bg-img-area\"><img src=\"' + NX_DEFAULT_IMG_URL + 'img_issue_success.png" alt=\"\" /></div>';
                alertMessage += '<div class=\"gray-box2\"><p class=\"txt-c\"><span class=\"inline-tit\">' + NX_ISSUE_TEXT_4 + '</span></p></div>';
                alertMessage += '</div>';
                $('#nx-issue-succes-alert-box').append(alertMessage);

                setTimeout(function () {
                    $('#nx-pki-ui-wrapper').show();
                    $('#nx-issue-success-alert').show();
                }, 200);

                //결과 함수 호출
                SecuKitNX_Result('reIssueCert');
            }
        } else {
            // 결과 저장
            NX_ISSUE_Result.init();
            NX_ISSUE_Result.setResult('false');

            // 발급중 창 제거
            $('#nx-issue-ing-alert').hide();

            // 발급 실패 창 표시
            $('.nx-issue-fail-alert-head-msg').remove();
            var headMessage = '<div class=\"nx-issue-fail-alert-head-msg\">';
            headMessage += '<h1>' + NX_ISSUE_TEXT_5 + '</h1>';
            headMessage += '</div>';
            $('#nx-issue-fail-alert-head').append(headMessage);

            // 발급 실패 알림창 호출
            $('.nx-issue-fail-alert-msg').remove();
            var alertMessage = '<div class=\"nx-issue-fail-alert-msg\">';
            alertMessage += '<div class=\"bg-img-area\"><img src=\"' + NX_DEFAULT_IMG_URL + 'img_issue_fail.png" alt=\"\" /></div>';
            alertMessage += '<div class=\"gray-box2\"><p class=\"txt-l\"><span class=\"inline-tit2\">' + NX_ISSUE_TEXT_6;
            alertMessage += '<br />';
            alertMessage += '<br />';
            alertMessage += '[ ErrorCode ] : ' + reply.ERROR_CODE;
            alertMessage += '<br />';
            alertMessage += '[ ErrorMessage ] : ' + reply.ERROR_MESSAGE;
            alertMessage += '</span></p></div>';
            alertMessage += '</div>';

            $('#nx-issue-fail-alert-box').append(alertMessage);

            setTimeout(function () {
                $('#nx-pki-ui-wrapper').show();
                $('#nx-issue-fail-alert').show();
            }, 200);

            //결과 함수 호출
            SecuKitNX_Result('reIssueCert');
        }
    };

    //인증서 갱신
    //갱신시 실제로는 CertID만 사용
    var updateCert = function () {
        var cmd = 'issueCertificate.updateCert';
        var certID = certListInfo.getCertID();
        var Data = {
            'password': '',
            'confirmPassword': '',
            'mediaType': '',
            'extraValue': '',
            'certID': certID
        };
        issueCertInit();
        var param = JSON.stringify(Data);
        secukitnxInterface.SecuKitNX(cmd, param);
    };

    var updateCertCallback = function (reply) {
        var errorCheck = -1;
        try {
            errorCheck = reply.ERROR_CODE;
        } catch (err) {
            //console.log(err);
        }

        //issueCertificate data init
        issueCertificate.issueCertInit();

        if (errorCheck === undefined) {
            if (reply.updateCert === 'true') {

                // 결과 저장
                NX_ISSUE_Result.init();
                NX_ISSUE_Result.setResult(reply.updateCert);
                NX_ISSUE_Result.setIssueUserName(reply.username);
                NX_ISSUE_Result.setIssueCertDN(reply.userDN);
                NX_ISSUE_Result.setIssueCertVaildateFrom(reply.validateFrom);
                NX_ISSUE_Result.setIssueCertVaildateTo(reply.validateTo);

                // 발급중 창 제거
                $('#nx-issue-ing-alert').hide();

                // 발급 성공 창 표시
                $('.nx-issue-success-alert-head-msg').remove();
                var headMessage = '<div class=\"nx-issue-success-alert-head-msg\">';
                headMessage += '<h1>' + NX_ISSUE_TEXT_7 + '</h1>';
                headMessage += '</div>';
                $('#nx-issue-success-alert-head').append(headMessage);

                $('.nx-issue-success-alert-msg').remove();
                var alertMessage = '<div class=\"nx-issue-success-alert-msg\">';
                alertMessage += '<div class=\"bg-img-area\"><img src=\"' + NX_DEFAULT_IMG_URL + 'img_issue_success.png" alt=\"\" /></div>';
                alertMessage += '<div class=\"gray-box2\"><p class=\"txt-c\"><span class=\"inline-tit\">' + NX_ISSUE_TEXT_7 + '</span></p></div>';
                alertMessage += '</div>';
                $('#nx-issue-succes-alert-box').append(alertMessage);

                setTimeout(function () {
                    $('#nx-pki-ui-wrapper').show();
                    $('#nx-issue-success-alert').show();
                }, 200);

                //결과 함수 호출
                SecuKitNX_Result('updateCert');
            }
        } else {
            // 결과 저장
            NX_ISSUE_Result.init();
            NX_ISSUE_Result.setResult('false');

            // 발급중 창 제거
            $('#nx-issue-ing-alert').hide();

            // 발급 실패 창 표시
            $('.nx-issue-fail-alert-head-msg').remove();
            var headMessage = '<div class=\"nx-issue-fail-alert-head-msg\">';
            headMessage += '<h1>' + NX_ISSUE_TEXT_8 + '</h1>';
            headMessage += '</div>';
            $('#nx-issue-fail-alert-head').append(headMessage);

            // 발급 실패 알림창 호출
            $('.nx-issue-fail-alert-msg').remove();
            var alertMessage = '<div class=\"nx-issue-fail-alert-msg\">';
            alertMessage += '<div class=\"bg-img-area\"><img src=\"' + NX_DEFAULT_IMG_URL + 'img_issue_fail.png" alt=\"\" /></div>';
            alertMessage += '<div class=\"gray-box2\"><p class=\"txt-l\"><span class=\"inline-tit2\">' + NX_ISSUE_TEXT_9;
            alertMessage += '<br />';
            alertMessage += '<br />';
            alertMessage += '[ ErrorCode ] : ' + reply.ERROR_CODE;
            alertMessage += '<br />';
            alertMessage += '[ ErrorMessage ] : ' + reply.ERROR_MESSAGE;
            alertMessage += '</span></p></div>';
            alertMessage += '</div>';

            $('#nx-issue-fail-alert-box').append(alertMessage);

            setTimeout(function () {
                $('#nx-pki-ui-wrapper').show();
                $('#nx-issue-fail-alert').show();
            }, 200);

            //결과 함수 호출
            SecuKitNX_Result('updateCert');
        }
    };

    //암호화용 인증서 발급
    var issueKmCert = function () {
        var cmd = 'issueCertificate.issueKmCert';
        var certID = certListInfo.getCertID();
        var Data = {
            'certID': certID
        };
        var param = JSON.stringify(Data);
        secukitnxInterface.SecuKitNX(cmd, param);
    };

    var issueKmCertCallback = function (reply) {
        var errorCheck = -1;
        try {
            errorCheck = reply.ERROR_CODE;
        } catch (err) {
            //console.log(err);
        }

        //issueCertificate data init
        issueCertificate.issueCertInit();

        if (errorCheck === undefined) {
            if (reply.issueKmCert === 'true') {
                //암호화용 인증서 발급 완료
                // 발급 성공 창 표시
                $('.nx-issue-success-alert-head-msg').remove();
                var headMessage = '<div class=\"nx-issue-success-alert-head-msg\">';
                headMessage += '<h1>' + NX_ISSUE_TEXT_10 + '</h1>';
                headMessage += '</div>';
                $('#nx-issue-success-alert-head').append(headMessage);

                $('.nx-issue-success-alert-msg').remove();
                var alertMessage = '<div class=\"nx-issue-success-alert-msg\">';
                alertMessage += '<div class=\"bg-img-area\"><img src=\"' + NX_DEFAULT_IMG_URL + 'img_issue_success.png" alt=\"\" /></div>';
                alertMessage += '<div class=\"gray-box2\"><p class=\"txt-c\"><span class=\"inline-tit\">' + NX_ISSUE_TEXT_10 + '</span></p></div>';
                alertMessage += '</div>';
                $('#nx-issue-succes-alert-box').append(alertMessage);

                setTimeout(function () {
                    $('#nx-pki-ui-wrapper').show();
                    $('#nx-issue-success-alert').show();
                }, 200);
            }
        } else {
            // 발급 실패 창 표시
            $('.nx-issue-fail-alert-head-msg').remove();
            var headMessage = '<div class=\"nx-issue-fail-alert-head-msg\">';
            headMessage += '<h1>' + NX_ISSUE_TEXT_11 + '</h1>';
            headMessage += '</div>';
            $('#nx-issue-fail-alert-head').append(headMessage);

            // 발급 실패 알림창 호출
            $('.nx-issue-fail-alert-msg').remove();
            var alertMessage = '<div class=\"nx-issue-fail-alert-msg\">';
            alertMessage += '<div class=\"bg-img-area\"><img src=\"' + NX_DEFAULT_IMG_URL + 'img_issue_fail.png" alt=\"\" /></div>';
            alertMessage += '<div class=\"gray-box2\"><p class=\"txt-l\"><span class=\"inline-tit2\">' + NX_ISSUE_TEXT_12;
            alertMessage += '<br />';
            alertMessage += '<br />';
            alertMessage += '[ ErrorCode ] : ' + reply.ERROR_CODE;
            alertMessage += '<br />';
            alertMessage += '[ ErrorMessage ] : ' + reply.ERROR_MESSAGE;
            alertMessage += '</span></p></div>';
            alertMessage += '</div>';

            $('#nx-issue-fail-alert-box').append(alertMessage);

            setTimeout(function () {
                $('#nx-pki-ui-wrapper').show();
                $('#nx-issue-fail-alert').show();
            }, 200);
        }
    };

    //인증서 효력정지
    var holdCert = function () {
        var cmd = 'issueCertificate.holdCert';
        var certID = certListInfo.getCertID();
        var Data = {
            'certID': certID
        };
        var param = JSON.stringify(Data);
        secukitnxInterface.SecuKitNX(cmd, param);
    };

    var holdCertCallback = function (reply) {
        var errorCheck = -1;
        try {
            errorCheck = reply.ERROR_CODE;
        } catch (err) {
            //console.log(err);
        }

        //issueCertificate data init
        issueCertificate.issueCertInit();

        if (errorCheck === undefined) {
            if (reply.holdCert === 'true') {
                //효력정지 완료
                //성공 창 표시
                $('.nx-issue-success-alert-head-msg').remove();
                var headMessage = '<div class=\"nx-issue-success-alert-head-msg\">';
                headMessage += '<h1>' + NX_ISSUE_TEXT_13 + '</h1>';
                headMessage += '</div>';
                $('#nx-issue-success-alert-head').append(headMessage);

                $('.nx-issue-success-alert-msg').remove();
                var alertMessage = '<div class=\"nx-issue-success-alert-msg\">';
                alertMessage += '<div class=\"bg-img-area\"><img src=\"' + NX_DEFAULT_IMG_URL + 'img_issue_success.png" alt=\"\" /></div>';
                alertMessage += '<div class=\"gray-box2\"><p class=\"txt-c\"><span class=\"inline-tit\">' + NX_ISSUE_TEXT_13 + '</span></p></div>';
                alertMessage += '</div>';
                $('#nx-issue-succes-alert-box').append(alertMessage);

                setTimeout(function () {
                    $('#nx-pki-ui-wrapper').show();
                    $('#nx-issue-success-alert').show();
                }, 200);
            }
        } else {
            // 실패 창 표시
            $('.nx-issue-fail-alert-head-msg').remove();
            var headMessage = '<div class=\"nx-issue-fail-alert-head-msg\">';
            headMessage += '<h1>' + NX_ISSUE_TEXT_14 + '</h1>';
            headMessage += '</div>';
            $('#nx-issue-fail-alert-head').append(headMessage);

            // 실패 알림창 호출
            $('.nx-issue-fail-alert-msg').remove();
            var alertMessage = '<div class=\"nx-issue-fail-alert-msg\">';
            alertMessage += '<div class=\"bg-img-area\"><img src=\"' + NX_DEFAULT_IMG_URL + 'img_issue_fail.png" alt=\"\" /></div>';
            alertMessage += '<div class=\"gray-box2\"><p class=\"txt-l\"><span class=\"inline-tit2\">' + NX_ISSUE_TEXT_15 + '';
            alertMessage += '<br />';
            alertMessage += '<br />';
            alertMessage += '[ ErrorCode ] : ' + reply.ERROR_CODE;
            alertMessage += '<br />';
            alertMessage += '[ ErrorMessage ] : ' + reply.ERROR_MESSAGE;
            alertMessage += '</span></p></div>';
            alertMessage += '</div>';

            $('#nx-issue-fail-alert-box').append(alertMessage);

            setTimeout(function () {
                $('#nx-pki-ui-wrapper').show();
                $('#nx-issue-fail-alert').show();
            }, 200);
        }
    };

    //폐지
    var revokeCert = function () {
        var cmd = 'issueCertificate.revokeCert';
        var certID = certListInfo.getCertID();
        var Data = {
            'certID': certID
        };
        var param = JSON.stringify(Data);
        secukitnxInterface.SecuKitNX(cmd, param);
    };

    var revokeCertCallback = function (reply) {
        var errorCheck = -1;
        try {
            errorCheck = reply.ERROR_CODE;
        } catch (err) {
            //console.log(err);
        }

        //issueCertificate data init
        issueCertificate.issueCertInit();

        if (errorCheck === undefined) {
            if (reply.revokeCert === 'true') {

                // 결과 저장
                NX_ISSUE_Result.init();
                NX_ISSUE_Result.setResult('true');

                //폐지 완료
                $('.nx-issue-success-alert-head-msg').remove();
                var headMessage = '<div class=\"nx-issue-success-alert-head-msg\">';
                headMessage += '<h1>' + NX_ISSUE_TEXT_16 + '</h1>';
                headMessage += '</div>';
                $('#nx-issue-success-alert-head').append(headMessage);

                $('.nx-issue-success-alert-msg').remove();
                var alertMessage = '<div class=\"nx-issue-success-alert-msg\">';
                alertMessage += '<div class=\"bg-img-area\"><img src=\"' + NX_DEFAULT_IMG_URL + 'img_issue_success.png" alt=\"\" /></div>';
                alertMessage += '<div class=\"gray-box2\"><p class=\"txt-c\"><span class=\"inline-tit\">' + NX_ISSUE_TEXT_16 + '</span></p></div>';
                alertMessage += '</div>';
                $('#nx-issue-succes-alert-box').append(alertMessage);

                setTimeout(function () {
                    $('#nx-pki-ui-wrapper').show();
                    $('#nx-issue-success-alert').show();
                }, 200);

                //결과 함수 호출
                SecuKitNX_Result('revokeCert');
            }
        } else {

            // 결과 저장
            NX_ISSUE_Result.init();
            NX_ISSUE_Result.setResult('false');

            // 실패 창 표시
            $('.nx-issue-fail-alert-head-msg').remove();
            var headMessage = '<div class=\"nx-issue-fail-alert-head-msg\">';
            headMessage += '<h1>' + NX_ISSUE_TEXT_17 + '</h1>';
            headMessage += '</div>';
            $('#nx-issue-fail-alert-head').append(headMessage);

            // 실패 알림창 호출
            $('.nx-issue-fail-alert-msg').remove();
            var alertMessage = '<div class=\"nx-issue-fail-alert-msg\">';
            alertMessage += '<div class=\"bg-img-area\"><img src=\"' + NX_DEFAULT_IMG_URL + 'img_issue_fail.png" alt=\"\" /></div>';
            alertMessage += '<div class=\"gray-box2\"><p class=\"txt-l\"><span class=\"inline-tit2\">' + NX_ISSUE_TEXT_18 + '';
            alertMessage += '<br />';
            alertMessage += '<br />';
            alertMessage += '[ ErrorCode ] : ' + reply.ERROR_CODE;
            alertMessage += '<br />';
            alertMessage += '[ ErrorMessage ] : ' + reply.ERROR_MESSAGE;
            alertMessage += '</span></p></div>';
            alertMessage += '</div>';

            $('#nx-issue-fail-alert-box').append(alertMessage);

            setTimeout(function () {
                $('#nx-pki-ui-wrapper').show();
                $('#nx-issue-fail-alert').show();
            }, 200);

            //결과 함수 호출
            SecuKitNX_Result('revokeCert');
        }
    };

    return {
        issueCertInit: issueCertInit,
        setRefCode: setRefCode,
        setAuthCode: setAuthCode,
        setPw: setPw,
        setConfirmPw: setConfirmPw,

        issueCert: issueCert,
        issueCertCallback: issueCertCallback,

        reIssueCert: reIssueCert,
        reIssueCertCallback: reIssueCertCallback,

        updateCert: updateCert,
        updateCertCallback: updateCertCallback,

        issueKmCert: issueKmCert,
        issueKmCertCallback: issueKmCertCallback,

        holdCert: holdCert,
        holdCertCallback: holdCertCallback,

        revokeCert: revokeCert,
        revokeCertCallback: revokeCertCallback
    };
})();