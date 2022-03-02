var _copyMedia = null;

function NX_branchLogic_ISSUE() {
    var Logic_flag = processLogic.getProcessLogic();
    if (Logic_flag.indexOf('ISSUE') !== -1) {
        //issueCertificate.branchLogic(Logic_flag);

        if (Logic_flag === 'KICA.ISSUE.RenewCertificateInfo') {
            $('#nx-pki-ui-wrapper').hide();
            SecuKitNX_Result('updateCertInfo');
            // 인증서 갱신 전 인증서 정보 추출인 경우
        }

        if (Logic_flag === 'KICA.ISSUE.RenewCertificate') {
            // 인증서 갱신 인 경우

            // 진행중 창 표시
            $('.nx-issue-ing-alert-head-msg').remove();
            var headMessage = '';
            var alertMessage = '';
            headMessage += '<div class=\"nx-issue-ing-alert-head-msg\">';
            headMessage += '<h1>' + NX_ISSUE_PUB_TEXT_28 + '</h>';
            alertMessage = '<div id=\"issue-ing-alert-message\" class=\"gray-box2\"><p class=\"txt-c\"><span class=\"inline-tit\">' + NX_ISSUE_PUB_TEXT_29 + '</span></p></div>';
            headMessage += '</div>';
            $('#nx-issue-ing-alert-head').append(headMessage);
            $('#issue-ing-alert-message').remove();
            $('#nx-issue-ing-alert-box').append(alertMessage);

            setTimeout(function () {
                $('#nx-issue-ing-alert').show();
            }, 100);

            setTimeout(function () { issueCertificate.updateCert(); }, 200);

        }

        // 인증서 폐지
        if (Logic_flag === 'KICA.ISSUE.RevokeCert') {
            //인증서 폐지 실행
            issueCertificate.revokeCert();
        }

        // 인증서 효력정지
        if (Logic_flag === 'KICA.ISSUE.HoldCert') {
            issueCertificate.holdCert();
        }

        // 암호화용 인증서 발급
        if (Logic_flag === 'KICA.ISSUE.IssueKmCert') {
            issueCertificate.issueKmCert();
        }
    }

    if (Logic_flag.indexOf('MANAGEMENT') !== -1) {
        //인증서 삭제
        if ((Logic_flag === 'KICA.MANAGEMENT.DeleteCertificate')) {
            var mediaType = SelectMediaInfo.getMediaType();
            var mediaTypeString = '';

            if (mediaType === 'HDD') {
                mediaTypeString = NX_TARGET_DIALOG_TEXT_2;
            }
            if (mediaType === 'USB') {
                mediaTypeString = NX_TARGET_DIALOG_TEXT_3;
            }
            if (mediaType === 'HSM') {
                mediaTypeString = NX_TARGET_DIALOG_TEXT_5;
            }
            if (mediaType === 'BIOHSM') {
                mediaTypeString = NX_TARGET_DIALOG_TEXT_6;
            }

            //인증서 cn 
            var selectCertIndex = certListInfo.getCertListIndex();
            var certListObj = certListInfo.getCertListInfo();
            var certName = certListObj[selectCertIndex].cn;

            $('#nx-cert-delete-box-msg').remove();

            var deleteMsg = '<div id=\"nx-cert-delete-box-msg\">';
            deleteMsg += '<p>' + NX_ISSUE_TEXT_20 + mediaType + NX_ISSUE_TEXT_21 + '<br />';
            deleteMsg += NX_ISSUE_TEXT_22 + certName + NX_ISSUE_TEXT_23 + '<br />';
            deleteMsg += '<strong>' + NX_ISSUE_TEXT_19 + '</strong></p>';
            deleteMsg += '</div>';

            $('#nx-cert-delete-box').append(deleteMsg);
            $('#nx-cert-select').hide();
            $('#nx-cert-delete').show();
        }// 인증서 삭제

        // 인증서 내보내기
        if (Logic_flag === 'KICA.MANAGEMENT.EXPORT_PFX') {
            var certType = '',  //서명용 인증서만 저장할지 암호화용과 함께 저장할지 여부 (SignCert, EncryptCert)
                filePath = '',  //빈 문자일 경우 읽어온 인증서 경로에 저장
                fileName = '',  //PFX 파일 이름
                certID = '';    //내보내기 할 인증서 CertID

            // 내보내기 파일명 
            fileName = $('#exportP12Name').val();
            $('#exportP12Name').val('');

            // km 포함 여부
            var flag_WithKm = document.getElementById('exportWithKm');
            var flag_WithOutKm = document.getElementById('exportWithoutKm');

            if (flag_WithKm.checked) {
                // KmCert 포함인 경우
                certType = 'EncryptCert';
            }

            if (flag_WithOutKm.checked) {
                // KmCert 포함하지 않는 경우
                certType = 'SignCert';
            }

            // certID
            certID = certListInfo.getCertID();
            //alert(certType + '  :  ' + filePath + '  :  ' + fileName + '  :  ' + certID);

            // 내보내기 수행
            CertManagement.exportP12(certType, filePath, fileName, certID);
        }

        // 인증서 가져오기
        if (Logic_flag === 'KICA.MANAGEMENT.IMPORT_PFX') {
            var fullfilePath = '',  // 가져오기 할 인증서 경로
                fileName = '',  // 가져오기 할 인증서 이름
                pfxpwd = '',  // pfx 암호
                certID = '';    // 가져온 pfx파일이 인증서로 저장된 이후의 인증서의 certID

            fullfilePath = $('#importPFXFileName').val();
            fileName = fullfilePath.replace(/^.*(\\|\/|\:)/, '');
            pfxpwd = $('#importPFXPwd').val();
            $('#importPFXPwd').val('');

            var tmp = fullfilePath.indexOf(fileName);
            var filePath = fullfilePath.substring(0, tmp);

            // @Todo 테스트용 삭제해야함
            filePath = 'C://Users//gdkim//Desktop//';

            // 가져오기 수행
            CertManagement.importP12(filePath, fileName, pfxpwd, certID);
        }

        // 인증서 복사
        if (Logic_flag === 'KICA.MANAGEMENT.CopyCert') {
            // 동일한 저장매체 선택 시 처리 로직 추가
            var media = SelectMediaInfo.getMediaType();
            _copyMedia = document.getElementById(media);
            _copyMedia.disabled = true;

            // 저장매체 선택 창 호출
            $('#nx-targetMedia-select').show();
        }

        // 인증서 암호확인
        if (Logic_flag === 'KICA.MANAGEMENT.CheckPassword') {
            var certListIndex = certListInfo.getCertListIndex();
            var certID = certListInfo.getCertID();
            CertManagement.checkPassword(certListIndex, certID);
        }

        // 인증서 보기
        if (Logic_flag === 'KICA.MANAGEMENT.ShowCert') {
            var certType = 'SignCert';
            var sourceString = '한국정보인증1234567890!@#$%^&*()Test';
            var algorithm = 'SHA256';
            var certID = certListInfo.getCertID();
            CertManagement.showCert(certType, sourceString, algorithm, certID);
        }

        // 인증서 신원변환
        if (Logic_flag === 'KICA.MANAGEMENT.AuthIdentify') {
            CertManagement.recoverIdentity();
        }

        // 인증서 신원확인
        if (Logic_flag === 'KICA.MANAGEMENT.VerifyIdentify') {
            // ssn 입력 화면 출력
            $('#nx-cert-VerifyIdentify').show();
        }

        // 인증서 암호변경
        if (Logic_flag === 'KICA.MANAGEMENT.ChangePassword') {
            // 암호 입력 화면 출력
            $('#nx-pwd-insert').show();
        }

        // 인증서 유효성 검증
        //if (Logic_flag === 'KICA.MANAGEMENT.CertValidation') {
        //}
    }

    if (Logic_flag === '') {
        $('#nx-pki-ui-wrapper').hide();
    }
}


//****************************
// 인증서 발급&재발급&갱신&폐지 관련 결과
//****************************
var NX_ISSUE_Result = (function () {
    var ISSUE_RES = 'false',            // 인증서 발급 정상 발급 유무
        ISSUE_USERNAME = '',            // 발급된 인증서 NAME
        ISSUE_DN = '',                  // 발급된 인증서 DN
        ISSUE_Vaildate_From = '',       // 발급된 인증서 시작 날짜
        ISSUE_Vaildate_To = '';         // 발급된 인증서 만료 날짜


    var init = function () {
        ISSUE_RES = 'false';
        ISSUE_USERNAME = '';
        ISSUE_DN = '';
        ISSUE_Vaildate_From = '';
        ISSUE_Vaildate_To = '';
    };

    var setResult = function (res) {
        ISSUE_RES = res;
    };

    var getResult = function () {
        return ISSUE_RES;
    };

    var setIssueUserName = function (name) {
        ISSUE_USERNAME = name;
    };

    var getIssueUserName = function () {
        return ISSUE_USERNAME;
    };

    var setIssueCertDN = function (dn) {
        ISSUE_DN = dn;
    };

    var getIssueCertDN = function () {
        return ISSUE_DN;
    };

    var setIssueCertVaildateFrom = function (f) {
        ISSUE_Vaildate_From = f;
    };

    var getIssueCertVaildateFrom = function () {
        return ISSUE_Vaildate_From;
    };

    var setIssueCertVaildateTo = function (t) {
        ISSUE_Vaildate_To = t;
    };

    var getIssueCertVaildateTo = function () {
        return ISSUE_Vaildate_To;
    };

    return {
        init: init,
        setResult: setResult,
        getResult: getResult,

        setIssueUserName: setIssueUserName,
        getIssueUserName: getIssueUserName,

        setIssueCertDN: setIssueCertDN,
        getIssueCertDN: getIssueCertDN,

        setIssueCertVaildateFrom: setIssueCertVaildateFrom,
        getIssueCertVaildateFrom: getIssueCertVaildateFrom,

        setIssueCertVaildateTo: setIssueCertVaildateTo,
        getIssueCertVaildateTo: getIssueCertVaildateTo
    };
})();

//****************************
// 인증서 보기 관련 결과
//****************************
var NX_CertINFO_Result = (function () {
    var USERDN = '',
        SIGNCERT = '',
        SINGED_DATA = '';

    var init = function () {
        USERDN = '';
        SIGNCERT = '';
        SINGED_DATA = '';
    };

    var setUserDN = function (dn) {
        USERDN = dn;
    };

    var getUserDN = function () {
        return USERDN;
    };

    var setSignCert = function (sign) {
        SIGNCERT = sign;
    };

    var getSignCert = function () {
        return SIGNCERT;
    };

    var setSigendData = function (data) {
        SINGED_DATA = data;
    };

    var getSignedData = function () {
        return SINGED_DATA;
    };

    return {
        init: init,
        setUserDN: setUserDN,
        getUserDN: getUserDN,
        setSignCert: setSignCert,
        getSignCert: getSignCert,
        setSigendData: setSigendData,
        getSignedData: getSignedData
    };
})();