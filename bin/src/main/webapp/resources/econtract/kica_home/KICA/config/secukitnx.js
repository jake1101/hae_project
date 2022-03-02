function secunx_Check() {
    SECUKITNX_CHECK.check([secukitnxInfo], "secunx_CheckCallback");
}

function secunx_CheckCallback(check) {

    if (check.status) {
        SECUKITNX_LOADING("nxsModuleChk");
    } else {
        setTimeout(function () {
            secunx_Check();
        }, 500);
    }
}

function secunx_Loading() {
    var localPage_href = window.document.location.href;
    var localPage = localPage_href.indexOf(NX_INSTALL_PAGENAME);
    if (localPage === -1) {
        // 모듈 로딩 전 화면 블락
        if (NXSBlockWrapLayer === true)
        {
            try {
                $('.nxs_loading_block').show();
            } catch (e) { console.log(e); }
        }
    }

    SECUKITNX_CHECK.check([secukitnxInfo], "secunx_LoadingCallback");
}

function secunx_LoadingCallback(check) {
	console.log("==========================");
    console.log(check);
    console.log("==========================");
    nxlog("secunx_LoadingCallback", check);
    if (check.status) {
        SECUKITNX_LOADING("secunx_ModuleInit");
    }
    else {
        $('.nx-cert-select').hide();
        $('#nx-pki-ui-wrapper').hide(); KICA_Error.init();
        var location = NX_SECUKIT_NX_TEXT_1;
        var reason = '';
        var errorcode = '';
        if (SECUKITNX_CONST.nextVerCheck == true)
        {
            errorcode = 'ERR_CLIENT_RELEASE_VERSION';
        } else {
            errorcode = 'ERR_CLIENT_NO_INSTALL';
        }
        
        KICA_ERROR_RESOURCE.ErrorMessage(location, reason, errorcode);
        var ScriptErrorMessage = KICA_Error.getScriptError();

        var localPage_href = window.document.location.href;
        var localPage = localPage_href.indexOf(NX_INSTALL_PAGENAME);

        if (NX_INSTALL_FLAG === false) {
            // 설치페이지를 별도로 운영하지 않는 경우
            alert(ScriptErrorMessage);
            NXdownClientURL();
            secunx_Check();
        } else {
            // 설치페이지가 있는 경우
            if (localPage !== -1 && downClientFlag === false) {
                // 호출된 페이지가 설치 페이지이고, 설치파일이 다운로드 안된 경우
                NXdownClientURL();
                secunx_Check();
            } else if (localPage === -1 && downClientFlag === false) {
                // 호출된 페이지가 설치 페이지가 아닌 경우
                alert(ScriptErrorMessage);
                window.location = NX_INSTALL_PAGE;
                return;
            }
        }
        SecuKitNX_Ready(false);
    }
}

function secunx_ModuleInit(result) {
    // 화면 블락 해제
    if (NXSBlockWrapLayer === true) {
        try {
            $('.nxs_loading_block').hide();
        } catch (e) { console.log(e); }
    }

    if (result) {
        nxsModuleChk();
        
    } else {
        SecuKitNX_Ready(false);
        SECUKITNX_CONST.load = false;
    }
}