if (NXLOCALE === 'KR') {

    // WEBUI
    //<!-- 인증서 리스트 초기화 -->
    var NX_WEBUI_LIST_INIT_TEXT_1 = '구분',
        NX_WEBUI_LIST_INIT_TEXT_2 = '사용자',
        NX_WEBUI_LIST_INIT_TEXT_3 = '만료일',
        NX_WEBUI_LIST_INIT_TEXT_4 = '발급자',

    //<!-- 인증서 선택창 -->
        NX_WEBUI_SELECT_TEXT_1 = '설정',
        NX_WEBUI_SELECT_TEXT_2 = '인증서 선택',
        NX_WEBUI_SELECT_TEXT_3 = '인증서 저장 위치를 선택해 주세요',
        NX_WEBUI_SELECT_TEXT_4 = '갱신 안내',
        NX_WEBUI_SELECT_TEXT_5 = '인증서를 선택해 주세요',
        NX_WEBUI_SELECT_TEXT_6 = '인증서 삭제',
        NX_WEBUI_SELECT_TEXT_7 = '인증서 보기',
        NX_WEBUI_SELECT_TEXT_8 = '인증서 비밀번호를 입력해 주세요',
        NX_WEBUI_SELECT_TEXT_9 = '인증서 비밀번호는 대소문자를 구분합니다.',
        NX_WEBUI_SELECT_TEXT_10 = '보안토큰(PIN) 비밀번호를 입력해 주세요',
        NX_WEBUI_SELECT_TEXT_11 = '보안토큰(PIN) 비밀번호는 대소문자를 구분합니다.',
        NX_WEBUI_SELECT_TEXT_12 = '스마트인증 서비스 설치 후 다시 시도해주시기 바랍니다.',

        NX_WEBUI_SELECT_TEXT_13 = 'PIN 번호 입력',
        NX_WEBUI_SELECT_TEXT_14 = '보안토큰 비밀번호를 입력하십시오.',
        NX_WEBUI_SELECT_TEXT_15 = '확인',

    //<!-- 인증서 정보창 -->
        NX_WEBUI_DETAIL_INFO_TEXT_1 = '확인',
        NX_WEBUI_DETAIL_INFO_TEXT_2 = '취소',
        NX_WEBUI_DETAIL_INFO_TEXT_3 = '인증서 정보',
        NX_WEBUI_DETAIL_INFO_TEXT_4 = '인증서 세부 정보',
        NX_WEBUI_DETAIL_INFO_TEXT_5 = '닫기',

    //<!-- 인증서 관리창 -->
        NX_WEBUI_MANAGEMENT_TEXT_1 = '인증서 관리',
        NX_WEBUI_MANAGEMENT_TEXT_2 = '최상위 인증기관',
        NX_WEBUI_MANAGEMENT_TEXT_3 = '관리',
        NX_WEBUI_MANAGEMENT_TEXT_4 = '최상위인증기관의 인증서를 확인합니다.',
        NX_WEBUI_MANAGEMENT_TEXT_5 = '최상위 인증기관의 전자서명 검증키 해쉬값(SHA-256)은 다음과 같습니다.',
        NX_WEBUI_MANAGEMENT_TEXT_6 = '최상위인증기관의 인증서를 확인합니다.',
        NX_WEBUI_MANAGEMENT_TEXT_7 = '최상위인증기관 신인증서 해쉬값을 아래에 입력하세요.',
        NX_WEBUI_MANAGEMENT_TEXT_8 = '확인',
        NX_WEBUI_MANAGEMENT_TEXT_9 = '최상위 인증기관 홈페이지',
        NX_WEBUI_MANAGEMENT_TEXT_10 = '인증서 내보내기 (PKCS#12 표준형식)',
        NX_WEBUI_MANAGEMENT_TEXT_11 = '내보내기',
        NX_WEBUI_MANAGEMENT_TEXT_12 = '인증서 가져오기 (PKCS#12 표준형식)',
        NX_WEBUI_MANAGEMENT_TEXT_13 = '가져오기',
        NX_WEBUI_MANAGEMENT_TEXT_14 = '프로그램 버전 정보',
        NX_WEBUI_MANAGEMENT_TEXT_15 = '닫기',

    //<!-- 인증서 내보내기-1 -->
        NX_WEBUI_EX_PFX_FILE_TEXT_1 = '인증서 내보내기',
        NX_WEBUI_EX_PFX_FILE_TEXT_2 = '내보낼 파일 이름을 지정하십시오.(확장자 미포함)',
        NX_WEBUI_EX_PFX_FILE_TEXT_3 = '인증서 내보내기 결과는 선택한 인증서 경로에 .pfx (PKCS#12)형태로 저장됩니다.',
        NX_WEBUI_EX_PFX_FILE_TEXT_4 = '확인',
        NX_WEBUI_EX_PFX_FILE_TEXT_5 = '취소',
        NX_WEBUI_EX_PFX_FILE_TEXT_6 = '내보내기할 파일 이름을 입력하십시오.',
        NX_WEBUI_EX_PFX_FILE_TEXT_7 = '내보내기할 인증서 선택 및 인증서 비밀번호를 입력 후 진행하십시오',
        NX_WEBUI_EX_PFX_FILE_TEXT_8 = '선택한 인증서 경로에 .pfx (PKCS#12)형태로 저장 되었습니다.',

    //<!-- 인증서 내보내기-2 -->
        NX_WEBUI_EX_PFX_KM_TEXT_1 = '인증서 내보내기',
        NX_WEBUI_EX_PFX_KM_TEXT_2 = '키분배용 인증서 내보내기',
        NX_WEBUI_EX_PFX_KM_TEXT_3 = '전자서명 인증서와 키분배용 인증서를 함께 내보낼 수 있습니다.',
        NX_WEBUI_EX_PFX_KM_TEXT_4 = '고객님께서 선택하신 인증서는 키분배용 인증서를 포함하고 있습니다.',
        NX_WEBUI_EX_PFX_KM_TEXT_5 = '이에, 전자서명 인증서와 키분배용 인증서를 함께 내보내기 할 수 있습니다.',
        NX_WEBUI_EX_PFX_KM_TEXT_6 = '키분배용 인증서와 개인키를 함께 내보내기 하시겠습니까?',
        NX_WEBUI_EX_PFX_KM_TEXT_7 = '예, 키분배용 인증서와 개인키를 함께 내보내기 합니다.',
        NX_WEBUI_EX_PFX_KM_TEXT_8 = '아니오, 전자서명용 인증서와 개인키만 내보내기 합니다.',
        NX_WEBUI_EX_PFX_KM_TEXT_9 = '키분배용 키를 함께 내보내기 할 경우 타공인인증기관의 가져오기에서 오류가 발생할 수도 있습니다.',
        NX_WEBUI_EX_PFX_KM_TEXT_10 = '이에 정보인증서비스를 받을 경우에 키분배용 인증서를 함께 내보내기 할 것을 권유합니다.',
        NX_WEBUI_EX_PFX_KM_TEXT_11 = '확인',
        NX_WEBUI_EX_PFX_KM_TEXT_12 = '취소',
        NX_WEBUI_EX_PFX_KM_TEXT_13 = '알림',

    //<!-- 인증서 가져오기-1 -->
        NX_WEBUI_IMP_PFX_TEXT_1 = '인증서 가져오기',
        NX_WEBUI_IMP_PFX_TEXT_2 = '가져올 인증서 파일을 선택해 주세요. (pfx형식)',
        NX_WEBUI_IMP_PFX_TEXT_3 = '파일명',
        NX_WEBUI_IMP_PFX_TEXT_4 = '파일찾기',
        NX_WEBUI_IMP_PFX_TEXT_5 = '찾아보기',
        NX_WEBUI_IMP_PFX_TEXT_6 = '가져올 인증서 비밀번호를 입력하세요.',
        NX_WEBUI_IMP_PFX_TEXT_7 = '확인',
        NX_WEBUI_IMP_PFX_TEXT_8 = '취소',

    //<!-- 인증서 폐지-1 -->
        NX_WEBUI_ABOLISH1_TEXT_1 = '인증서 폐지',
        NX_WEBUI_ABOLISH1_TEXT_2 = '선택하신 인증서를 폐지하시겠습니까?',
        NX_WEBUI_ABOLISH1_TEXT_3 = '예',
        NX_WEBUI_ABOLISH1_TEXT_4 = '아니오',

    //<!-- 인증서 페지-2 -->
        NX_WEBUI_ABOLISH2_TEXT_1 = '인증서 폐지',
        NX_WEBUI_ABOLISH2_TEXT_2 = '인증서',
        NX_WEBUI_ABOLISH2_TEXT_3 = '폐지',
        NX_WEBUI_ABOLISH2_TEXT_4 = '사유를 선택하십시오.',
        NX_WEBUI_ABOLISH2_TEXT_5 = '개인키의 신뢰손상',
        NX_WEBUI_ABOLISH2_TEXT_6 = '소속이나 이름의 변경',
        NX_WEBUI_ABOLISH2_TEXT_7 = '인증서를 더 이상 사용하지 않음',
        NX_WEBUI_ABOLISH2_TEXT_8 = '확인',
        NX_WEBUI_ABOLISH2_TEXT_9 = '취소',

    //<!-- 인증서 비밀번호 변경 -->
        NX_WEBUI_CHANGE_PWD_TEXT_1 = '인증서 비밀번호 변경',
        NX_WEBUI_CHANGE_PWD_TEXT_2 = '인증서 비밀번호는 10자 이상의 길이로 하나 이상의 영문자, 숫자 및 특수문자를 포함해야 합니다.',
        NX_WEBUI_CHANGE_PWD_TEXT_3 = '인증서 비밀번호는 연속된 3개의 문자 또는 숫자가 포함될 수 없고, 같은 3개의 문자는 사용 불가능 합니다.',
        NX_WEBUI_CHANGE_PWD_TEXT_4 = '새로운 인증서 비밀번호 입력',
        NX_WEBUI_CHANGE_PWD_TEXT_5 = '새로운 인증서 비밀번호 확인',
        NX_WEBUI_CHANGE_PWD_TEXT_6 = '인증서 비밀번호 입력시 주의사항',
        NX_WEBUI_CHANGE_PWD_TEXT_7 = '인증서 비밀번호는 적어도 6개월마다 변경하고 저장된 매체별로 모두 변경 권고 (예:하드디스크, 이동식디스크, 저장토큰 등 변경)',
        NX_WEBUI_CHANGE_PWD_TEXT_8 = '일부 특수문자는 인증서 비밀번호로 사용 불가능',
        NX_WEBUI_CHANGE_PWD_TEXT_9 = '(예 : ’,”,\\ ,| 는 사용 불가능)',
        NX_WEBUI_CHANGE_PWD_TEXT_10 = '연속된 3개의 문자 및 3개의 같은 문자는 사용 불가능',
        NX_WEBUI_CHANGE_PWD_TEXT_11 = '(예 : 123, abc, 321, cba 등 사용 불가능)',
        NX_WEBUI_CHANGE_PWD_TEXT_12 = '(예 : 111, aaa 등 사용 불가능)',
        NX_WEBUI_CHANGE_PWD_TEXT_13 = '확인',
        NX_WEBUI_CHANGE_PWD_TEXT_14 = '취소',

    //<!-- 신원확인 식별번호 입력 -->
        NX_WEBUI_INPUT_IDN_TEXT_1 = '신원확인 식별번호 입력',
        NX_WEBUI_INPUT_IDN_TEXT_2 = '개인의 경우 주민등록번호를 입력하십시오.',
        NX_WEBUI_INPUT_IDN_TEXT_3 = '법인의 경우 사업자등록번호를 입력하십시오. (" -" 제외)',
        NX_WEBUI_INPUT_IDN_TEXT_4 = '신원확인 식별번호',
        NX_WEBUI_INPUT_IDN_TEXT_5 = '확인',
        NX_WEBUI_INPUT_IDN_TEXT_6 = '취소',

    //<!-- 인증서 복사 -->
        NX_WEBUI_COPY_TEXT_1 = '인증서 보기',
        NX_WEBUI_COPY_TEXT_2 = '동일한',
        NX_WEBUI_COPY_TEXT_3 = '인증서',
        NX_WEBUI_COPY_TEXT_4 = '가 해당 저장매체에 있습니다. 바꾸시겠습니까?',
        NX_WEBUI_COPY_TEXT_5 = '예, 새로운 인증서로 바꾸겠습니다.',
        NX_WEBUI_COPY_TEXT_6 = '아니오, 바꾸지 않고 그대로 두겠습니다.',
        NX_WEBUI_COPY_TEXT_7 = '확인',
        NX_WEBUI_COPY_TEXT_8 = '취소',
        NX_WEBUI_COPY_TEXT_9 = '인증서 복사를 취소하였습니다.',

    //<!-- 인증서 비밀번호 확인 -->
        NX_WEBUI_CHK_PW_1 = '인증서 비밀번호 확인',
        NX_WEBUI_CHK_PW_2 = '인증서 비밀번호 확인 성공',
        NX_WEBUI_CHK_PW_3 = '확인',

    //<!-- 매체 선택 -->
        NX_MEDIA_SELECT_TEXT_1 = '매체 선택',
        NX_MEDIA_SELECT_TEXT_2 = '인증서를 어디에 저장하시겠습니까?',
        NX_MEDIA_SELECT_TEXT_3 = '인증서 저장 위치를 선택해 주세요',
        NX_MEDIA_SELECT_TEXT_4 = '선택된 저장매체 :  ',
        NX_MEDIA_SELECT_TEXT_5 = '확인',
        NX_MEDIA_SELECT_TEXT_6 = '취소',

    //<!-- 인증서 발급 -->
        NX_RETCODE_INSERT_TEXT_1 = '인증서 발급',
        NX_RETCODE_INSERT_TEXT_2 = '등록번호를 입력하세요',
        NX_RETCODE_INSERT_TEXT_3 = '인가코드',
        NX_RETCODE_INSERT_TEXT_4 = '2345AB (영문, 숫자 19자리)',
        NX_RETCODE_INSERT_TEXT_5 = '참조번호',
        NX_RETCODE_INSERT_TEXT_6 = '2345 (숫자 8자리)',
        NX_RETCODE_INSERT_TEXT_7 = '확인',
        NX_RETCODE_INSERT_TEXT_8 = '취소',

    //<!-- 인증서 비밀번호입력 -->
        NX_PWD_INSERT_TEXT_1 = '인증서 비밀번호입력',
        NX_PWD_INSERT_TEXT_2 = '인증서 비밀번호는 10자 이상의 길이로 하나 이상의 영문자, 숫자 및 특수문자를 포함해야 합니다.',
        NX_PWD_INSERT_TEXT_3 = '인증서 비밀번호는 연속된 3개의 문자 또는 숫자가 포함될 수 없고, 같은 3개의 문자는 사용 불가능 합니다.',
        NX_PWD_INSERT_TEXT_4 = '인증서 비밀번호 확인',
        NX_PWD_INSERT_TEXT_5 = '인증서 비밀번호 입력시 주의사항',
        NX_PWD_INSERT_TEXT_6 = '인증서 비밀번호는 적어도 6개월마다 변경하고 저장된 매체별로 모두 변경 권고 (예:하드디스크, 이동식디스크, 저장토큰 등 변경)',
        NX_PWD_INSERT_TEXT_7 = '일부 특수문자는 인증서 비밀번호로 사용 불가능',
        NX_PWD_INSERT_TEXT_8 = '(예 : ’,”,\\ ,| 는 사용 불가능)',
        NX_PWD_INSERT_TEXT_9 = '연속된 3개의 문자 및 3개의 같은 문자는 사용 불가능',
        NX_PWD_INSERT_TEXT_10 = '(예 : 123, abc, 321, cba 등 사용 불가능)',
        NX_PWD_INSERT_TEXT_11 = '(예 : 111, aaa 등 사용 불가능)',
        NX_PWD_INSERT_TEXT_12 = '확인',
        NX_PWD_INSERT_TEXT_13 = '취소',

    //<!-- 보안토큰 비밀번호 -->
        NX_SECUTOKEN_PWD_TEXT_1 = '보안토큰 비밀번호(PIN)',
        NX_SECUTOKEN_PWD_TEXT_2 = '보안토큰 비밀번호(PIN)를 입력하세요.',
        NX_SECUTOKEN_PWD_TEXT_3 = '확인',
        NX_SECUTOKEN_PWD_TEXT_4 = '취소',

    //<!-- 인증서 발급&재발급&갱신 중 알림 -->
    //<!-- 인증서 발급&재발급&갱신 성공 알림 -->
        NX_ISSUE_SUCCESS_ALERT_1 = '확인',

    //<!-- 인증서 발급&재발급&갱신 실패 알림 -->
        NX_ISSUE_FAIL_ALERT_1 = '확인',

    //<!-- 인증서 삭제 -->
        NX_WEBUI_DELETE_1 = '인증서 삭제',
        NX_WEBUI_DELETE_2 = '선택하신 인증서를',
        NX_WEBUI_DELETE_3 = '삭제',
        NX_WEBUI_DELETE_4 = '하시겠습니까?',
        NX_WEBUI_DELETE_5 = '예',
        NX_WEBUI_DELETE_6 = '아니오',

     //<!-- 인증서 폐지 -->
        NX_WEBUI_REVOKE_1 = '인증서 폐지',
        NX_WEBUI_REVOKE_2 = '선택하신 인증서를',
        NX_WEBUI_REVOKE_3 = '폐지',
        NX_WEBUI_REVOKE_4 = '하시겠습니까?',
        NX_WEBUI_REVOKE_5 = '예',
        NX_WEBUI_REVOKE_6 = '아니오',

    // <!-- ETC -->
        NX_WEBUI_ALERT_MESSAGE_1 = '인증서 삭제를 취소하셨습니다.',
        NX_WEBUI_ALERT_MESSAGE_2 = '인증서 발급이 중단되었습니다. \n[비밀번호 또는 PIN번호 미입력]',
        NX_WEBUI_ALERT_MESSAGE_3 = '인증서 재발급이 중단되었습니다. \n[비밀번호 또는 PIN번호 미입력]',
        NX_WEBUI_ALERT_MESSAGE_4 = '인증서 갱신이 중단되었습니다. \n[비밀번호 또는 PIN번호 미입력]',
        NX_WEBUI_ALERT_MESSAGE_5 = '인증서 비밀번호 변경을 취소하였습니다.';


    // targetDialog.js
    var NX_TARGET_DIALOG_TEXT_1 = '확장매체',
    NX_TARGET_DIALOG_TEXT_2 = '하드디스크',
    NX_TARGET_DIALOG_TEXT_3 = '이동식디스크',
    NX_TARGET_DIALOG_TEXT_4 = '스마트인증',
    NX_TARGET_DIALOG_TEXT_5 = '보안토큰',
    NX_TARGET_DIALOG_TEXT_6 = '지문보안토큰',
    NX_TARGET_DIALOG_TEXT_7 = '닫기',
    NX_TARGET_DIALOG_TEXT_8 = '정보',
    NX_TARGET_DIALOG_TEXT_9 = '취소',
    NX_TARGET_DIALOG_TEXT_10 = '선택',
    NX_TARGET_DIALOG_TEXT_11 = '을 선택하십시오',
    NX_TARGET_DIALOG_TEXT_12 = '확인',
    NX_TARGET_DIALOG_TEXT_13 = '선택된 저장매체';

    // dialog.js
    var NX_MEMBER_OF_DIALOG_TEXT_1 = '해당 저장소에 인증서가 없습니다.',
        NX_MEMBER_OF_DIALOG_TEXT_2 = '제품 설치';

    // makeCertList.js
    var NX_MAKE_CERT_LIST_TEXT_1 = '구분',
        NX_MAKE_CERT_LIST_TEXT_2 = '사용자',
        NX_MAKE_CERT_LIST_TEXT_3 = '만료일',
        NX_MAKE_CERT_LIST_TEXT_4 = '발급자',
        NX_MAKE_CERT_LIST_TEXT_5 = '하드디스크',
        NX_MAKE_CERT_LIST_TEXT_6 = '이동식 디스크',
        NX_MAKE_CERT_LIST_TEXT_7 = '보안토큰',
        NX_MAKE_CERT_LIST_TEXT_8 = '지문보안토큰',
        NX_MAKE_CERT_LIST_TEXT_9 = '인증서',
        NX_MAKE_CERT_LIST_TEXT_10 = '이 인증서는 공인인증서입니다.',
        NX_MAKE_CERT_LIST_TEXT_11 = '고유명(DN)',
        NX_MAKE_CERT_LIST_TEXT_12 = '저장매체',
        NX_MAKE_CERT_LIST_TEXT_13 = '유효기간',
        NX_MAKE_CERT_LIST_TEXT_14 = '인증기관',
        NX_MAKE_CERT_LIST_TEXT_15 = '인증기관(DN)',
        NX_MAKE_CERT_LIST_TEXT_16 = '인증정책',
        NX_MAKE_CERT_LIST_TEXT_17 = '인증정책명',
        NX_MAKE_CERT_LIST_TEXT_18 = '서명 알고리즘',
        NX_MAKE_CERT_LIST_TEXT_19 = '인증서 버전',
        NX_MAKE_CERT_LIST_TEXT_20 = '이 인증서는 유효한 인증서입니다.';

    // configSet.js
    var NX_CONFIG_SET_TEXT_1 = '제품 설치';

    // secukitnx.js
    var NX_SECUKIT_NX_TEXT_1 = '제품 설치',
        NX_SECUKIT_NX_TEXT_2 = '초기화에 실패하였습니다.',
        NX_SECUKIT_NX_TEXT_3 = '체크완료',
        NX_SECUKIT_NX_TEXT_4 = '프로그램 설치가 필요합니다.';

    // exinterface.js
    var NX_EX_INTERFACE_TEXT_1 = '지원하지 않는 운영체제입니다.',
        NX_EX_INTERFACE_TEXT_2 = '이상',
        NX_EX_INTERFACE_TEXT_3 = '지원하지 않는 브라우저입니다.',
        NX_EX_INTERFACE_TEXT_4 = '처리중 오류가 발생하였습니다.',
        NX_EX_INTERFACE_TEXT_5 = 'params값은 JSON 타입이어야합니다.',
        NX_EX_INTERFACE_TEXT_6 = 'cmd를 입력하세요.';

    // exinstall
    var NX_EX_INSTALL_TEXT_1 = '팝업차단을 확인해주세요.',
        NX_EX_INSTALL_TEXT_2 = '현재 브라우저는 demon 설치를 지원하지 않습니다.',
        NX_EX_INSTALL_TEXT_3 = '현재 브라우저는 extension 설치를 지원하지 않습니다.';

    //적용한 파일 nx.issue.pub.ui.js_bak임
    // nx.issue.pub.ui.js
    var NX_ISSUE_PUB_TEXT_1 = 'NX_Issue_pubUi 변수가 중복사용되고 있습니다.',
        NX_ISSUE_PUB_TEXT_2 = '선택된 저장매체',
        NX_ISSUE_PUB_TEXT_3 = '안녕하십니까? 한국정보인증입니다.',
        NX_ISSUE_PUB_TEXT_4 = '고객님께서 사용하시는 인증서는',
        NX_ISSUE_PUB_TEXT_5 = '년',
        NX_ISSUE_PUB_TEXT_6 = '월',
        NX_ISSUE_PUB_TEXT_7 = '일 23:59:59',
        NX_ISSUE_PUB_TEXT_8 = '까지 유효합니다. ',
        NX_ISSUE_PUB_TEXT_9 = '오늘',
        NX_ISSUE_PUB_TEXT_10 = '부터 유효기간이',
        NX_ISSUE_PUB_TEXT_11 = '일',
        NX_ISSUE_PUB_TEXT_12 = '남았습니다.',
        NX_ISSUE_PUB_TEXT_13 = '에서 인증서 갱신을 받을 수 있습니다.',
        NX_ISSUE_PUB_TEXT_14 = '자세한 문의사항은 1577-8787로 연락주시기 바랍니다.',
        NX_ISSUE_PUB_TEXT_15 = '확인',
        NX_ISSUE_PUB_TEXT_16 = '[알림] 미디어 선택 후 확인을 클릭하세요.',
        NX_ISSUE_PUB_TEXT_17 = '인증서 비밀번호 입력 후 또는 인증서를 선택 후 진행해 주세요.',
        NX_ISSUE_PUB_TEXT_18 = '선택된 저장매체',
        NX_ISSUE_PUB_TEXT_19 = '이동식 디스크',
        NX_ISSUE_PUB_TEXT_20 = '보안토큰',
        NX_ISSUE_PUB_TEXT_21 = '지문보안토큰',
        NX_ISSUE_PUB_TEXT_22 = '스마트인증',
        NX_ISSUE_PUB_TEXT_23 = '인증서를 저장 할 매체를 선택하세요.',
        NX_ISSUE_PUB_TEXT_24 = '인증서 발급',
        NX_ISSUE_PUB_TEXT_25 = '인증서를 발급 중입니다.',
        NX_ISSUE_PUB_TEXT_26 = '인증서 재발급',
        NX_ISSUE_PUB_TEXT_27 = '인증서를 재발급 중입니다.',
        NX_ISSUE_PUB_TEXT_28 = '인증서 갱신',
        NX_ISSUE_PUB_TEXT_29 = '인증서를 갱신 중입니다.',
        NX_ISSUE_PUB_TEXT_30 = '[알림] 토큰 비밀번호를 입력 후 진행해 주세요.',
        NX_ISSUE_PUB_TEXT_31 = '인증서 내보내기 대상 인증서를 선택 후 비밀번호를 입력하세요.',
        //16.01.12추가
        NX_ISSUE_PUB_TEXT_32 = '[알림] 선택하신 보안토큰은 KISA의 안전성 검토를 거치지 않은 제품입니다.',
        NX_ISSUE_PUB_TEXT_33 = '인증서 복사가 취소 되었습니다.',
        NX_ISSUE_PUB_TEXT_34 = '인증서를 선택 후 진행해 주세요.',
        NX_ISSUE_PUB_TEXT_35 = '사용자 환경에 따라 1분~5분까지 소요될 수 있습니다.',
        NX_ISSUE_PUB_TEXT_36 = '발급이 완료 될 때 까지 브라우저를 닫지 마십시오.',
        NX_ISSUE_PUB_TEXT_37 = '인증서 발급을 취소 하시겠습니까?',
        NX_ISSUE_PUB_TEXT_38 = '인증서 발급이 취소되었습니다.',
        NX_ISSUE_PUB_TEXT_39 = '인증서 저장 매체를 선택해 주십시오.',
        NX_ISSUE_PUB_TEXT_40 = '발급 초기화면으로 돌아갑니다.',
        NX_ISSUE_PUB_TEXT_41 = '매체 선택을 취소하셨습니다.';

    // CertManagement.js
    var NX_CERT_MANAGEMENT_TEXT_1 = '인증서 복사 실패',
        NX_CERT_MANAGEMENT_TEXT_2 = '인증서 복사에 실패하였습니다.',
        NX_CERT_MANAGEMENT_TEXT_3 = '인증서 삭제 성공',
        NX_CERT_MANAGEMENT_TEXT_4 = '인증서 삭제 실패',
        NX_CERT_MANAGEMENT_TEXT_5 = '인증서 삭제에 실패하였습니다.',
        NX_CERT_MANAGEMENT_TEXT_6 = '인증서 비밀번호 확인 실패',
        NX_CERT_MANAGEMENT_TEXT_7 = '인증서 비밀번호 확인에 실패하였습니다.',
        NX_CERT_MANAGEMENT_TEXT_8 = '인증서 비밀번호 변경 실패',
        NX_CERT_MANAGEMENT_TEXT_9 = '인증서 비밀번호 변경에 실패하였습니다.',
        NX_CERT_MANAGEMENT_TEXT_10 = '인증서 신원확인 실패',
        NX_CERT_MANAGEMENT_TEXT_11 = '인증서 신원확인에 실패하였습니다.',
        NX_CERT_MANAGEMENT_TEXT_12 = '인증서 정보 획득 실패',
        NX_CERT_MANAGEMENT_TEXT_13 = '인증서 정보를 가져오는데 실패하였습니다.',
        NX_CERT_MANAGEMENT_TEXT_14 = '인증서 신원변환 실패',
        NX_CERT_MANAGEMENT_TEXT_15 = '인증서 신원변환(복원)에 실패하였습니다.',
        NX_CERT_MANAGEMENT_TEXT_16 = '인증서 내보내기 성공',
        NX_CERT_MANAGEMENT_TEXT_17 = '인증서 내보내기 실패',
        NX_CERT_MANAGEMENT_TEXT_18 = '인증서 내보내기에 실패하였습니다.',
        NX_CERT_MANAGEMENT_TEXT_19 = '인증서 가져오기 성공',
        NX_CERT_MANAGEMENT_TEXT_20 = '인증서 가져오기 실패',
        NX_CERT_MANAGEMENT_TEXT_21 = '인증서 가져오기에 실패하였습니다.',
        NX_CERT_MANAGEMENT_TEXT_22 = '인증서 복사 성공',
        NX_CERT_MANAGEMENT_TEXT_23 = '인증서 비밀번호 확인 성공',
        NX_CERT_MANAGEMENT_TEXT_24 = '인증서 비밀번호 변경 성공',
        NX_CERT_MANAGEMENT_TEXT_25 = '인증서 신원확인 성공',
        NX_CERT_MANAGEMENT_TEXT_26 = '인증서 정보 보기 성공',
        NX_CERT_MANAGEMENT_TEXT_27 = '인증서 정보 보기 실패',
        NX_CERT_MANAGEMENT_TEXT_28 = '인증서 신원변환 성공',
        //signgate renewal 하면서 추가 - printCert,userInfoUpd
        NX_CERT_MANAGEMENT_TEXT_29 = '인증서 가입자정보수정 성공',
        NX_CERT_MANAGEMENT_TEXT_30 = '인증서 가입자정보수정 실패',
        NX_CERT_MANAGEMENT_TEXT_31 = '인증서 신원확인을 취소하였습니다.'
    NX_CERT_MANAGEMENT_TEXT_32 = '인증서 가져오기를 취소하였습니다.';

    // issue.js
    var NX_ISSUE_TEXT_1 = '인증서 발급 성공',
        NX_ISSUE_TEXT_2 = '인증서 발급 실패',
        NX_ISSUE_TEXT_3 = '인증서 발급에 실패하였습니다.',
        NX_ISSUE_TEXT_4 = '인증서 재발급 성공',
        NX_ISSUE_TEXT_5 = '인증서 재발급 실패',
        NX_ISSUE_TEXT_6 = '인증서 재발급에 실패하였습니다.',
        NX_ISSUE_TEXT_7 = '인증서 갱신 성공',
        NX_ISSUE_TEXT_8 = '인증서 갱신 실패',
        NX_ISSUE_TEXT_9 = '인증서 갱신에 실패하였습니다.',
        NX_ISSUE_TEXT_10 = '암호화용 인증서 발급 성공',
        NX_ISSUE_TEXT_11 = '암호화용 인증서 발급 실패',
        NX_ISSUE_TEXT_12 = '암호화용 인증서 발급에 실패하였습니다.',
        NX_ISSUE_TEXT_13 = '인증서 효력정지 성공',
        NX_ISSUE_TEXT_14 = '인증서 효력정지 실패',
        NX_ISSUE_TEXT_15 = '인증서 효력정지에 실패하였습니다.',
        NX_ISSUE_TEXT_16 = '인증서 폐지 성공',
        NX_ISSUE_TEXT_17 = '인증서 폐지 실패',
        NX_ISSUE_TEXT_18 = '인증서 폐지에 실패하였습니다.',
        NX_ISSUE_TEXT_19 = '삭제된 인증서는 복구할 수 없습니다.',
        NX_ISSUE_TEXT_20 = '"예"를 누르시면 선택하신 저장장치(',
        NX_ISSUE_TEXT_21 = ')에',
        NX_ISSUE_TEXT_22 = '저장된 인증서(',
        NX_ISSUE_TEXT_23 = ')가 삭제됩니다.',
        NX_ISSUE_TEXT_24 = '폐지된 인증서는 복구할 수 없습니다.',
        NX_ISSUE_TEXT_25 = ')가 폐지됩니다.';

    // exproto_ext_daemon.js
    var NX_EXPROTO_EXT_TEXT_1 = ' 라이센스를 확인하세요.',
        NX_EXPROTO_EXT_TEXT_2 = ' 프로그램이 변조되었습니다.(EX)',
        NX_EXPROTO_EXT_TEXT_3 = ' 프로그램이 변조되었습니다.(client)',
        NX_EXPROTO_EXT_TEXT_4 = '재설치가 필요합니다.',
        NX_EXPROTO_EXT_TEXT_5 = ' 프로그램에 오류가 발생하였습니다.(daemon)',
        NX_EXPROTO_EXT_TEXT_6 = '페이지를 새로고침 하세요.',
        NX_EXPROTO_EXT_TEXT_7 = ' 실행중 오류가 발생하였습니다.(EX)',
        NX_EXPROTO_EXT_TEXT_8 = ' 파라미터 생성중 오류가 발생하였습니다.';

    // exproto.js
    var NX_EXPROTO_TEXT_1 = "플러그인 체크를 실행하십시오.",
        NX_EXPROTO_TEXT_2 = "플러그인이 모두 설치되지 않았습니다.",
        NX_EXPROTO_TEXT_3 = "플러그인 정보가 필요합니다.",
        NX_EXPROTO_TEXT_4 = "콜백이 필요합니다.",
        NX_EXPROTO_TEXT_5 = "embed 태그 생성 실패",
        NX_EXPROTO_TEXT_6 = " 확장 기능 설치를 완료 하였습니다.",
        NX_EXPROTO_TEXT_7 = "Extension의 설치를 확인해주세요.",
        NX_EXPROTO_TEXT_8 = " 라이센스를 확인하세요.",
        NX_EXPROTO_TEXT_9 = " 프로그램이 변조되었습니다.(EX)",
        NX_EXPROTO_TEXT_10 = " 프로그램이 변조되었습니다.(client)",
        NX_EXPROTO_TEXT_11 = "재설치가 필요합니다.",
        NX_EXPROTO_TEXT_12 = " 프로그램이 중단되었습니다.(client)",
        NX_EXPROTO_TEXT_13 = "페이지를 새로고침하세요.",
        NX_EXPROTO_TEXT_14 = "실행중 오류가 발생하였습니다.(EX)",
        NX_EXPROTO_TEXT_15 = "initEXInfoArr는 존재하지 않습니다.",
        NX_EXPROTO_TEXT_16 = "입력값이 올바르지 않습니다.",
        NX_EXPROTO_TEXT_17 = "IE 브라우저에서는 동작하지 않는 펑션입니다.",
        NX_EXPROTO_TEXT_18 = "body 태그를 생성해 주십시오";

    // common.js
    var NX_COMMON_TEXT_1 = "인증서 정보 초기화에 성공하였습니다.",
        NX_COMMON_TEXT_2 = "인증서 정보 초기화에 실패하였습니다.";

}
else {
    // WEBUI
    //<!-- 인증서 리스트 초기화-->
    var NX_WEBUI_LIST_INIT_TEXT_1 = 'Category',
        NX_WEBUI_LIST_INIT_TEXT_2 = 'User',
        NX_WEBUI_LIST_INIT_TEXT_3 = 'Expiry Date',
        NX_WEBUI_LIST_INIT_TEXT_4 = 'Issuer',

        //<!-- 인증서 선택창 -->
        NX_WEBUI_SELECT_TEXT_1 = 'Setting',
        NX_WEBUI_SELECT_TEXT_2 = 'Select Certificate',
        NX_WEBUI_SELECT_TEXT_3 = 'Select certificate storage media',
        NX_WEBUI_SELECT_TEXT_4 = 'Announcement of Certificate Renewal',
        NX_WEBUI_SELECT_TEXT_5 = 'Select Certificate',
        NX_WEBUI_SELECT_TEXT_6 = 'Delete',
        NX_WEBUI_SELECT_TEXT_7 = 'Show Cert',
        NX_WEBUI_SELECT_TEXT_8 = 'Enter Certificate Password',
        NX_WEBUI_SELECT_TEXT_9 = 'Certificate password are case-sensitive',

        //<!-- 인증서 정보창 -->
        NX_WEBUI_DETAIL_INFO_TEXT_1 = 'Confirm',
        NX_WEBUI_DETAIL_INFO_TEXT_2 = 'Cancel',
        NX_WEBUI_DETAIL_INFO_TEXT_3 = 'Certificate Information',
        NX_WEBUI_DETAIL_INFO_TEXT_4 = 'Certificate Information in Details',
        NX_WEBUI_DETAIL_INFO_TEXT_5 = 'Close',

        //<!-- 인증서 관리창 -->
        NX_WEBUI_MANAGEMENT_TEXT_1 = 'Certificate Management',
        NX_WEBUI_MANAGEMENT_TEXT_2 = 'Root CA',
        NX_WEBUI_MANAGEMENT_TEXT_3 = 'Certificate Management',
        NX_WEBUI_MANAGEMENT_TEXT_4 = 'Verify Root CA Certificate',
        NX_WEBUI_MANAGEMENT_TEXT_5 = 'Hash value of Root CA\'s signature verification key is as follow. (SHA-256)',
        NX_WEBUI_MANAGEMENT_TEXT_6 = 'Verify Root CA Certificate',
        NX_WEBUI_MANAGEMENT_TEXT_7 = 'Enter hash value of Root CA Certificate',
        NX_WEBUI_MANAGEMENT_TEXT_8 = 'Confirm',
        NX_WEBUI_MANAGEMENT_TEXT_9 = 'Root CA Website',
        NX_WEBUI_MANAGEMENT_TEXT_10 = 'Export Certificate(PKCS#12 format)',
        NX_WEBUI_MANAGEMENT_TEXT_11 = 'Export',
        NX_WEBUI_MANAGEMENT_TEXT_12 = 'Import Certificate(PKCS#12 format)',
        NX_WEBUI_MANAGEMENT_TEXT_13 = 'Import',
        NX_WEBUI_MANAGEMENT_TEXT_14 = 'Program Version Info.',
        NX_WEBUI_MANAGEMENT_TEXT_15 = 'Close',

        //<!-- 인증서 내보내기-1 -->
        NX_WEBUI_EX_PFX_FILE_TEXT_1 = 'Export Certificate',
        NX_WEBUI_EX_PFX_FILE_TEXT_2 = 'Make file name to export certificate(not include extension)',
        NX_WEBUI_EX_PFX_FILE_TEXT_3 = 'The exporting certificate will be stored in selected certificate path in the form of .pfx (PKCS#12)',
        NX_WEBUI_EX_PFX_FILE_TEXT_4 = 'Confirm',
        NX_WEBUI_EX_PFX_FILE_TEXT_5 = 'Cancel',
        NX_WEBUI_EX_PFX_FILE_TEXT_6 = 'Make file name to export certificate',
        NX_WEBUI_EX_PFX_FILE_TEXT_7 = 'Select certificate and enter certificate password to export certificate',

        //<!-- 인증서 내보내기-2 -->
        NX_WEBUI_EX_PFX_KM_TEXT_1 = 'Export Certificate',
        NX_WEBUI_EX_PFX_KM_TEXT_2 = 'Export Certificate for Key Distribution',
        NX_WEBUI_EX_PFX_KM_TEXT_3 = 'You can export both signature certificate and key distribution certificate together',
        NX_WEBUI_EX_PFX_KM_TEXT_4 = 'Chosen certificate include key distribution certificate',
        NX_WEBUI_EX_PFX_KM_TEXT_5 = 'So, you can export signature certificate and key distribution certificate together',
        NX_WEBUI_EX_PFX_KM_TEXT_6 = 'Do you want to export key distribution certificate and private key together?',
        NX_WEBUI_EX_PFX_KM_TEXT_7 = 'Yes, I will export key distribution certificate and private key together',
        NX_WEBUI_EX_PFX_KM_TEXT_8 = 'No, I will export only signature certificate and private key',
        NX_WEBUI_EX_PFX_KM_TEXT_9 = 'When you export key distribution certificate together, an error may occur during importing process by other Certificate Authority(CA)',
        NX_WEBUI_EX_PFX_KM_TEXT_10 = 'So, recommend you to export key distribution certificate together when you will import certificate by same Certificate Authority(CA).',
        NX_WEBUI_EX_PFX_KM_TEXT_11 = 'Confirm',
        NX_WEBUI_EX_PFX_KM_TEXT_12 = 'Cancel',
        NX_WEBUI_EX_PFX_KM_TEXT_13 = 'Notification',

        //<!-- 인증서 가져오기-1 -->
        NX_WEBUI_IMP_PFX_TEXT_1 = 'Import Certificate',
        NX_WEBUI_IMP_PFX_TEXT_2 = 'Select file to import certificate (pfx format)',
        NX_WEBUI_IMP_PFX_TEXT_3 = 'File Name',
        NX_WEBUI_IMP_PFX_TEXT_4 = 'Search File',
        NX_WEBUI_IMP_PFX_TEXT_5 = 'Search',
        NX_WEBUI_IMP_PFX_TEXT_6 = 'Enter certificate password to import certificate',
        NX_WEBUI_IMP_PFX_TEXT_7 = 'Confirm',
        NX_WEBUI_IMP_PFX_TEXT_8 = 'Cancel',

        //<!-- 인증서 폐지-1 -->
        NX_WEBUI_ABOLISH1_TEXT_1 = 'Revoke Certificate',
        NX_WEBUI_ABOLISH1_TEXT_2 = 'Do you want to revoke chosen certificate?',
        NX_WEBUI_ABOLISH1_TEXT_3 = 'Yes',
        NX_WEBUI_ABOLISH1_TEXT_4 = 'No',

        //<!-- 인증서 페지-2 -->
        NX_WEBUI_ABOLISH2_TEXT_1 = 'Revoke Certificate',
        NX_WEBUI_ABOLISH2_TEXT_2 = 'Certificate',
        NX_WEBUI_ABOLISH2_TEXT_3 = 'Revoke',
        NX_WEBUI_ABOLISH2_TEXT_4 = 'Choose revocation reason',
        NX_WEBUI_ABOLISH2_TEXT_5 = 'KeyCompromise',
        NX_WEBUI_ABOLISH2_TEXT_6 = 'AffiliationChanged',
        NX_WEBUI_ABOLISH2_TEXT_7 = 'CessationOfOperation',
        NX_WEBUI_ABOLISH2_TEXT_8 = 'Confirm',
        NX_WEBUI_ABOLISH2_TEXT_9 = 'Cancel',

        //<!-- 인증서 비밀번호 변경 -->
        NX_WEBUI_CHANGE_PWD_TEXT_1 = 'Change Certificate Password',
        NX_WEBUI_CHANGE_PWD_TEXT_2 = 'The certificate password must contain one or more letters, numbers and special characters of more than 10 characters long',
        NX_WEBUI_CHANGE_PWD_TEXT_3 = 'The certificate password must not contain consecutive three letters or numbers. And also same three letters or numbers are not available for certificate password',
        NX_WEBUI_CHANGE_PWD_TEXT_4 = 'Enter New Certificate Password',
        NX_WEBUI_CHANGE_PWD_TEXT_5 = 'Confirm New Certificate Password',
        NX_WEBUI_CHANGE_PWD_TEXT_6 = 'Precaution to enter certificate password',
        NX_WEBUI_CHANGE_PWD_TEXT_7 = 'Certificate password should be changed at least every six months',
        NX_WEBUI_CHANGE_PWD_TEXT_8 = 'Some special characters are not available to the certificate password',
        NX_WEBUI_CHANGE_PWD_TEXT_9 = '(e.g. : ’,”,\\ ,| are not available)',
        NX_WEBUI_CHANGE_PWD_TEXT_10 = 'Consecutive three letters or numbers and same three letters or numbers are not available for certificate password',
        NX_WEBUI_CHANGE_PWD_TEXT_11 = '(e.g. : 123, abc, 321, cba are not available)',
        NX_WEBUI_CHANGE_PWD_TEXT_12 = '(e.g. : 111, aaa are not available)',
        NX_WEBUI_CHANGE_PWD_TEXT_13 = 'Confirm',
        NX_WEBUI_CHANGE_PWD_TEXT_14 = 'Cancel',

        //<!-- 신원확인 식별번호 입력 -->
        NX_WEBUI_INPUT_IDN_TEXT_1 = 'Enter Subscriber Identification Number',
        NX_WEBUI_INPUT_IDN_TEXT_2 = 'In case of citizens, enter resident registration number',
        NX_WEBUI_INPUT_IDN_TEXT_3 = 'In case of corporation, enter business registration number (without "-")',
        NX_WEBUI_INPUT_IDN_TEXT_4 = 'Identification Number',
        NX_WEBUI_INPUT_IDN_TEXT_5 = 'Confirm',
        NX_WEBUI_INPUT_IDN_TEXT_6 = 'Cancel',

        //<!-- 인증서 복사 -->
        NX_WEBUI_COPY_TEXT_1 = 'View Certificate',
        NX_WEBUI_COPY_TEXT_2 = 'Same',
        NX_WEBUI_COPY_TEXT_3 = 'Certificate',
        NX_WEBUI_COPY_TEXT_4 = 'is already exist at selected storage media. Do you want to overwrite it ?',
        NX_WEBUI_COPY_TEXT_5 = 'Yes, will overwrite with new certificate',
        NX_WEBUI_COPY_TEXT_6 = 'No, won\'t overwrite certificate',
        NX_WEBUI_COPY_TEXT_7 = 'Confirm',
        NX_WEBUI_COPY_TEXT_8 = 'Cancel',

        //<!-- 인증서 비밀번호 확인 -->
        NX_WEBUI_CHK_PW_1 = 'Confirm Certificate Password',
        NX_WEBUI_CHK_PW_2 = 'Succeed in Confirmation of Certificate Password',
        NX_WEBUI_CHK_PW_3 = 'Confirm',

        //<!-- 매체 선택 -->
        NX_MEDIA_SELECT_TEXT_1 = 'Select Storage Media',
        NX_MEDIA_SELECT_TEXT_2 = ' ',
        NX_MEDIA_SELECT_TEXT_3 = 'Please select the certificate store location',
        NX_MEDIA_SELECT_TEXT_4 = 'Selected Storage Media :  ',
        NX_MEDIA_SELECT_TEXT_5 = 'Confirm',
        NX_MEDIA_SELECT_TEXT_6 = 'Cancel',

        //<!-- 인증서 발급 -->
        NX_RETCODE_INSERT_TEXT_1 = 'Issue Certificate',
        NX_RETCODE_INSERT_TEXT_2 = 'Enter Registration Number',
        NX_RETCODE_INSERT_TEXT_3 = 'Authentication Code',
        NX_RETCODE_INSERT_TEXT_4 = '2345AB (19 digits, alphanumeric)',
        NX_RETCODE_INSERT_TEXT_5 = 'Reference Number',
        NX_RETCODE_INSERT_TEXT_6 = '2345 (8 digits, number)',
        NX_RETCODE_INSERT_TEXT_7 = 'Confirm',
        NX_RETCODE_INSERT_TEXT_8 = 'Cancel',

        //<!-- 인증서 비밀번호입력 -->
        NX_PWD_INSERT_TEXT_1 = 'Enter Certificate Password',
        NX_PWD_INSERT_TEXT_2 = 'The certificate password must contain one or more letters, numbers and special characters of more than 10 characters long',
        NX_PWD_INSERT_TEXT_3 = 'The certificate password must not contain consecutive three letters or numbers. And also same three letters or numbers are not available for certificate password',
        NX_PWD_INSERT_TEXT_4 = 'Confirm Certificate Password',
        NX_PWD_INSERT_TEXT_5 = 'Precaution to enter certificate password',
        NX_PWD_INSERT_TEXT_6 = 'Certificate password should be changed at least every six months',
        NX_PWD_INSERT_TEXT_7 = 'Some special characters are not available to the certificate password',
        NX_PWD_INSERT_TEXT_8 = '(e.g. : ’,”,\\ ,| are not available)',
        NX_PWD_INSERT_TEXT_9 = 'Consecutive three letters or numbers and same three letters or numbers are not available for certificate password',
        NX_PWD_INSERT_TEXT_10 = '(e.g. : 123, abc, 321, cba are not available)',
        NX_PWD_INSERT_TEXT_11 = '(e.g. : 111, aaa are not available)',
        NX_PWD_INSERT_TEXT_12 = 'Confirm',
        NX_PWD_INSERT_TEXT_13 = 'Cancel',

        //<!-- 보안토큰 비밀번호 -->
        NX_SECUTOKEN_PWD_TEXT_1 = 'Security Token Password',
        NX_SECUTOKEN_PWD_TEXT_2 = 'Enter security token password',
        NX_SECUTOKEN_PWD_TEXT_3 = 'Confirm',
        NX_SECUTOKEN_PWD_TEXT_4 = 'Cancel',

        //<!-- 인증서 발급&재발급&갱신 중 알림 -->
        //<!-- 인증서 발급&재발급&갱신 성공 알림 -->
        NX_ISSUE_SUCCESS_ALERT_1 = 'Confirm',

        //<!-- 인증서 발급&재발급&갱신 실패 알림 -->
        NX_ISSUE_FAIL_ALERT_1 = 'Confirm',

        //<!-- 인증서 삭제 -->
        NX_WEBUI_DELETE_1 = 'Delete Certificate',
        NX_WEBUI_DELETE_2 = 'Do you want to',
        NX_WEBUI_DELETE_3 = 'delete',
        NX_WEBUI_DELETE_4 = 'chosen certificate?',
        NX_WEBUI_DELETE_5 = 'Yes',
        NX_WEBUI_DELETE_6 = 'No';

    // targetDialog.js
    var NX_TARGET_DIALOG_TEXT_1 = 'Extension Media',
        NX_TARGET_DIALOG_TEXT_2 = 'Hard-disk',
        NX_TARGET_DIALOG_TEXT_3 = 'Removable-disk',
        NX_TARGET_DIALOG_TEXT_4 = 'Smart Authentication',
        NX_TARGET_DIALOG_TEXT_5 = 'Security Token',
        NX_TARGET_DIALOG_TEXT_6 = 'Bio Security Token',
        NX_TARGET_DIALOG_TEXT_7 = 'Close',
        NX_TARGET_DIALOG_TEXT_8 = 'Information',
        NX_TARGET_DIALOG_TEXT_9 = 'Cancel',
        NX_TARGET_DIALOG_TEXT_10 = 'Select',
        NX_TARGET_DIALOG_TEXT_11 = 'Please select certificate',
        NX_TARGET_DIALOG_TEXT_12 = 'Confirm',
        NX_TARGET_DIALOG_TEXT_13 = 'Chosen Storage Media';

    // dialog.js
    var NX_MEMBER_OF_DIALOG_TEXT_1 = 'There is no certificate at chosen storage media',
        NX_MEMBER_OF_DIALOG_TEXT_2 = 'Product Installation';

    // makeCertList.js
    var NX_MAKE_CERT_LIST_TEXT_1 = 'Category',
        NX_MAKE_CERT_LIST_TEXT_2 = 'User',
        NX_MAKE_CERT_LIST_TEXT_3 = 'Expiry Date',
        NX_MAKE_CERT_LIST_TEXT_4 = 'Issuer',
        NX_MAKE_CERT_LIST_TEXT_5 = 'Hard-disk',
        NX_MAKE_CERT_LIST_TEXT_6 = 'Removable-disk',
        NX_MAKE_CERT_LIST_TEXT_7 = 'Security Token',
        NX_MAKE_CERT_LIST_TEXT_8 = 'Bio Security Token',
        NX_MAKE_CERT_LIST_TEXT_9 = 'Certificate',
        NX_MAKE_CERT_LIST_TEXT_10 = 'This certificate is an accredited certificate',
        NX_MAKE_CERT_LIST_TEXT_11 = 'Subject Name(DN)',
        NX_MAKE_CERT_LIST_TEXT_12 = 'Storage Media',
        NX_MAKE_CERT_LIST_TEXT_13 = 'Expiry Date',
        NX_MAKE_CERT_LIST_TEXT_14 = 'Certificate Authority',
        NX_MAKE_CERT_LIST_TEXT_15 = 'Certificate Authority(DN)',
        NX_MAKE_CERT_LIST_TEXT_16 = 'Certificate Policy',
        NX_MAKE_CERT_LIST_TEXT_17 = 'Certificate Policy Name',
        NX_MAKE_CERT_LIST_TEXT_18 = 'Signature Algorithm',
        NX_MAKE_CERT_LIST_TEXT_19 = 'Certificate Version',
        NX_MAKE_CERT_LIST_TEXT_20 = 'This certificate is valid certificate';

    // configSet.js
    var NX_CONFIG_SET_TEXT_1 = 'Product Installation';

    // secukitnx.js
    var NX_SECUKIT_NX_TEXT_1 = 'Product Installation',
        NX_SECUKIT_NX_TEXT_2 = 'Failure to initialize',
        NX_SECUKIT_NX_TEXT_3 = 'Complete Checking',
        NX_SECUKIT_NX_TEXT_4 = 'Needs software installation';

    // exinterface.js
    var NX_EX_INTERFACE_TEXT_1 = 'Not supported operation system',
        NX_EX_INTERFACE_TEXT_2 = 'Over',
        NX_EX_INTERFACE_TEXT_3 = 'Not supported browser',
        NX_EX_INTERFACE_TEXT_4 = 'An error occurred during processing',
        NX_EX_INTERFACE_TEXT_5 = 'The parameter value should be JSON type',
        NX_EX_INTERFACE_TEXT_6 = 'Please enter cmd';

    // exinstall
    var NX_EX_INSTALL_TEXT_1 = 'Please check browser\'s pop-up blocker',
        NX_EX_INSTALL_TEXT_2 = 'Current browser does not support installing demon software',
        NX_EX_INSTALL_TEXT_3 = 'Current browser does not support installing extension software';

    //적용한 파일 nx.issue.pub.ui.js_bak임
    // nx.issue.pub.ui.js
    var NX_ISSUE_PUB_TEXT_1 = 'The variable (NX_Issue_pubUi) is duplicated',
        NX_ISSUE_PUB_TEXT_2 = 'Chosen Storage Media',
        NX_ISSUE_PUB_TEXT_3 = 'Hello? This is Certification Authority(CA)',
        NX_ISSUE_PUB_TEXT_4 = 'Your certificate is valid until',
        NX_ISSUE_PUB_TEXT_5 = 'Year',
        NX_ISSUE_PUB_TEXT_6 = 'Month',
        NX_ISSUE_PUB_TEXT_7 = 'Day 23:59:59',
        NX_ISSUE_PUB_TEXT_8 = '',
        NX_ISSUE_PUB_TEXT_9 = 'The certificate is still valid',
        NX_ISSUE_PUB_TEXT_10 = 'for',
        NX_ISSUE_PUB_TEXT_11 = 'days',
        NX_ISSUE_PUB_TEXT_12 = 'before expired',
        NX_ISSUE_PUB_TEXT_13 = 'You can renew certificate at Certificate Authority(CA) website',
        NX_ISSUE_PUB_TEXT_14 = 'Please contact Certificate Authority(CA) for further inquiry',
        NX_ISSUE_PUB_TEXT_15 = 'Confirm',
        NX_ISSUE_PUB_TEXT_16 = '[Notification] Select certificate and click confirm button',
        NX_ISSUE_PUB_TEXT_17 = 'Please select certificate and enter certificate password to proceed',
        NX_ISSUE_PUB_TEXT_18 = 'Chosen Storage Media',
        NX_ISSUE_PUB_TEXT_19 = 'Removable-disk',
        NX_ISSUE_PUB_TEXT_20 = 'Security Token',
        NX_ISSUE_PUB_TEXT_21 = 'Bio Security Token',
        NX_ISSUE_PUB_TEXT_22 = 'Smart Authentication',
        NX_ISSUE_PUB_TEXT_23 = 'Please select certificate storage media',
        NX_ISSUE_PUB_TEXT_24 = 'Certificate Issuance',
        NX_ISSUE_PUB_TEXT_25 = 'CA is issuing certificate',
        NX_ISSUE_PUB_TEXT_26 = 'Certificate Re-issuance',
        NX_ISSUE_PUB_TEXT_27 = 'CA is re-issuing certificate',
        NX_ISSUE_PUB_TEXT_28 = 'Certificate Renewal',
        NX_ISSUE_PUB_TEXT_29 = 'CA is renewing certificate',
        NX_ISSUE_PUB_TEXT_30 = '[Notification] Please enter token password to proceed',
        NX_ISSUE_PUB_TEXT_31 = 'Please select certificate and enter certificate password to export certificate',
        NX_ISSUE_PUB_TEXT_32 = '[Notification] The safety of chosen security token has not been validated from Root CA',
        NX_ISSUE_PUB_TEXT_33 = 'Copy certificate has been canceled',
        NX_ISSUE_PUB_TEXT_34 = 'Please select certificate.';

    // CertManagement.js
    var NX_CERT_MANAGEMENT_TEXT_1 = 'Failure in Certificate Copy',
        NX_CERT_MANAGEMENT_TEXT_2 = 'Failure to copy certificate',
        NX_CERT_MANAGEMENT_TEXT_3 = 'Succeed in Certificate Deletion',
        NX_CERT_MANAGEMENT_TEXT_4 = 'Failure in Certificate Deletion',
        NX_CERT_MANAGEMENT_TEXT_5 = 'Failure to delete certificate',
        NX_CERT_MANAGEMENT_TEXT_6 = 'Failure in Checking Certificate Password',
        NX_CERT_MANAGEMENT_TEXT_7 = 'Failure to check certificate password',
        NX_CERT_MANAGEMENT_TEXT_8 = 'Failure in Changing Certificate Password',
        NX_CERT_MANAGEMENT_TEXT_9 = 'Failure to change certificate password',
        NX_CERT_MANAGEMENT_TEXT_10 = 'Failure in Checking Certificate Owner',
        NX_CERT_MANAGEMENT_TEXT_11 = 'Failure to check certificate owner\'s identification',
        NX_CERT_MANAGEMENT_TEXT_12 = 'Failure in Getting Certificate Information',
        NX_CERT_MANAGEMENT_TEXT_13 = 'Failure to get certificate information',
        NX_CERT_MANAGEMENT_TEXT_14 = 'Failure in Converting Certificate Owner\'s Identification',
        NX_CERT_MANAGEMENT_TEXT_15 = 'Failure to convert certificate owner\'s identification',
        NX_CERT_MANAGEMENT_TEXT_16 = 'Succeed in Certificate Exporting',
        NX_CERT_MANAGEMENT_TEXT_17 = 'Failure in Certificate Exporting',
        NX_CERT_MANAGEMENT_TEXT_18 = 'Failure to export certificate',
        NX_CERT_MANAGEMENT_TEXT_19 = 'Succeed in Certificate Importing',
        NX_CERT_MANAGEMENT_TEXT_20 = 'Succeed to import Certificate',
        NX_CERT_MANAGEMENT_TEXT_21 = 'Failure to import certificate',
        NX_CERT_MANAGEMENT_TEXT_22 = 'Succeed in Coping Certificate',
        NX_CERT_MANAGEMENT_TEXT_23 = 'Succeed in Checking Certificate Password',
        NX_CERT_MANAGEMENT_TEXT_24 = 'Succeed in Changing Certificate Password',
        NX_CERT_MANAGEMENT_TEXT_25 = 'Succeed in Checking Certificate Owner\'s Identification',
        NX_CERT_MANAGEMENT_TEXT_26 = 'Succeed in Viewing Certificate Information',
        NX_CERT_MANAGEMENT_TEXT_27 = 'Failure in Viewing Certificate Information',
        NX_CERT_MANAGEMENT_TEXT_28 = 'Succeed in Converting Certificate Owner\'s Identification';

    // issue.js
    var NX_ISSUE_TEXT_1 = 'Succeed in Certificate Issuance',
        NX_ISSUE_TEXT_2 = 'Failure in Certificate Issuance',
        NX_ISSUE_TEXT_3 = 'Failure in Certificate Issuance',
        NX_ISSUE_TEXT_4 = 'Succeed in Certificate Re-issuance',
        NX_ISSUE_TEXT_5 = 'Failure in Certificate Re-issuance',
        NX_ISSUE_TEXT_6 = 'Failure in Certificate Re-issuance',
        NX_ISSUE_TEXT_7 = 'Succeed in Certificate Renewal',
        NX_ISSUE_TEXT_8 = 'Failure in Certificate Renewal',
        NX_ISSUE_TEXT_9 = 'Failure in Certificate Renewal',
        NX_ISSUE_TEXT_10 = 'Succeed in Certificate Issuance for Encryption',
        NX_ISSUE_TEXT_11 = 'Failure in Certificate Issuance for Encryption',
        NX_ISSUE_TEXT_12 = 'Failure in Certificate Issuance for Encryption',
        NX_ISSUE_TEXT_13 = 'Succeed in Certificate Suspension',
        NX_ISSUE_TEXT_14 = 'Failure in Certificate Suspension',
        NX_ISSUE_TEXT_15 = 'Failure in Certificate Suspension',
        NX_ISSUE_TEXT_16 = 'Succeed in Certificate Revocation',
        NX_ISSUE_TEXT_17 = 'Failure in Certificate Revocation',
        NX_ISSUE_TEXT_18 = 'Failure in Certificate Revocation',
        NX_ISSUE_TEXT_19 = 'The certificate is deleted can not be recovered.',
        NX_ISSUE_TEXT_20 = 'Pressing the "Yes" (',
        NX_ISSUE_TEXT_21 = ')',
        NX_ISSUE_TEXT_22 = 'Certificates(',
        NX_ISSUE_TEXT_23 = ') will be deleted.';

    //영문 번역 다시
    // exproto_ext_daemon.js
    var NX_EXPROTO_EXT_TEXT_1 = ' Please check the lisence',
        NX_EXPROTO_EXT_TEXT_2 = ' The program was altered(EX)',
        NX_EXPROTO_EXT_TEXT_3 = ' The Program was altered.(client)',
        NX_EXPROTO_EXT_TEXT_4 = 'Please re-Install.',
        NX_EXPROTO_EXT_TEXT_5 = ' Error is occered(daemon)',
        NX_EXPROTO_EXT_TEXT_6 = 'Please refresh the web page.',
        NX_EXPROTO_EXT_TEXT_7 = ' Runtime Error(EX)',
        NX_EXPROTO_EXT_TEXT_8 = ' Error is occered on parameter generation';


    // exproto.js
    var NX_EXPROTO_TEXT_1 = "Please Do the Plug-in check.",
        NX_EXPROTO_TEXT_2 = "The Plug-in is not installed completely",
        NX_EXPROTO_TEXT_3 = "Need more Plug-in information",
        NX_EXPROTO_TEXT_4 = "Need Callback",
        NX_EXPROTO_TEXT_5 = "embed-tag generation failed",
        NX_EXPROTO_TEXT_6 = " Extenstion installation is complete!",
        NX_EXPROTO_TEXT_7 = "Please check the intallation of Extension",
        NX_EXPROTO_TEXT_8 = " Please check the lisence",
        NX_EXPROTO_TEXT_9 = " The Program was altered.(EX)",
        NX_EXPROTO_TEXT_10 = " The Program was altered.(client)",
        NX_EXPROTO_TEXT_11 = "Please re-Install",
        NX_EXPROTO_TEXT_12 = " Program is canceled(client)",
        NX_EXPROTO_TEXT_13 = "Please refresh the web page",
        NX_EXPROTO_TEXT_14 = "Runtime Error(EX)",
        NX_EXPROTO_TEXT_15 = "initEXInfoArr is not exist.",
        NX_EXPROTO_TEXT_16 = "Input value is not correct",
        NX_EXPROTO_TEXT_17 = "This Function is not working on IE",
        NX_EXPROTO_TEXT_18 = "Please generate a body tag";

    // common.js
    var NX_COMMON_TEXT_1 = "Initiate Cert Information Success.",
        NX_COMMON_TEXT_2 = "Initiate Cert Information Fail.";

}