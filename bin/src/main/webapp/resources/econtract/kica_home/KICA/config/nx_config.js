/***********************************************
    Console log 사용 유무
************************************************/
var ConsoleLogFlag = true;

/***********************************************
    모듈 로딩 전 화면 블락 처리
************************************************/
var NXSBlockWrapLayer = true;

/***********************************************
    라이센스 정보
************************************************/
// 개발용 라이센스 : 2017/11/26 08:09:00 까지 사용가능
 // 개발자 라이센스 만료일 : 2018/01/19

var NXS_LICENSE = '';
if (document.location.hostname.indexOf('domain') >= 0) {
    // 도메인 라이센스 :
    NXS_LICENSE = '';
}
else {
    // 개발자 라이센스 만료일 : 2018/01/19
    NXS_LICENSE = 'WHVhRHJjamZZdHIxT1B4SjNIRjhFU0w0emFLRlQ5ZVcwdDMyNXpMQlk4VEJDZzM3U3N6MTBPZDdIczd5K3dUNittdTZxUUw0UjRrOVMyTGdzaDAwa1E9PVwvT1hYelhaQmdBUT1cUEVXVnJENitsbHhlaUNIUVdVdHZyV0NBM3A4PQ==';
}

/*
if (document.location.origin.indexOf('wwww.www.com') >= 0) {
    // 도메인 라이센스 :
    NXS_LICENSE = 'dXJrSTFNZGtsU3hhbGE0WlRmUmY0WEJ0RFNXUDFuY1NJbkRVZWJtNmdFL0dwOVE1R3hwZ05Bb0J6VS9UMS9QN1lxaWhnZ2t0Tm4wPVxYQ3JWb1BHR0duZz1cLzB0eXFheXErdW9QWWdNN3FsekRoMXBwWHZJPQ==';
}
else if (document.location.origin.indexOf('www.test.com') >= 0) {
    // 도메인 라이센스 :
    NXS_LICENSE = 'Z1hNSmpBSWk2RlM1LzVjQXBSa29Wa3NCL05sbE5Jc2NCWnA4MnR3RnB4aFBPaXRMbm1FeWpwaGtqdm85M01zTzRwMDVyWWNrVG84PVxvbFdYeC83OWZoRT1cbDRwTkhTMXZ4bldEejhHK0xBcjY2WkZEWEJVPQ==';
}
else {
    // 개발자 라이센스 : 2016-12-04 (90일 제한) ~ 2017-03-02
    NXS_LICENSE = 'TDdONmtnWUZJUnU0KzNEdUVLOUJTQ1BXUlBnZTNtREdhbUJmWTV6SURRVlZqZFk3TGNlSlJ6WDkyK0Rhd3FvUWM0RHpuallvVVAwK2U0Tk4rSU00dXc9PVx1RjVDbW9WWjJyRT1cblpCWHpwbndadVM5ZXlUanBMMDFRZERlaUlJPQ==';
}
*
/***********************************************
   내부 참조 JavaScript 경로 설정 : SecuKitNXS/KICA/config/LoadSecuKitNX.js
************************************************/
var secukitnxBaseDir = "/resources/econtract/kica_home/";

/***********************************************
    이미지 상대경로 설정
************************************************/
var NX_MEDIA_IMG_URL = '/resources/econtract/kica_home/WebUI/images/media/';
var NX_DEFAULT_IMG_URL = '/resources/econtract/kica_home/WebUI/images/';

/***********************************************
    로케일 설정  ex: KR, EN
************************************************/
var NXLOCALE = 'KR';

/***********************************************
    배너 이미지 URL : 가로 : 410px 세로 : 93px
************************************************/
var NX_Banner_IMG_URL = NX_DEFAULT_IMG_URL + 'banner/default_banner.png';

/***********************************************
    SecuKit NX 다운로드 경로
************************************************/
var NXClient_DownLoad_URL = secukitnxBaseDir + 'Install/SecuKitNXS.exe'; /** Client 설치파일**/
// 다운로드 URL로 구성시
//var NXClient_DownLoad_URL = '';                                 

/***********************************************
    SecuKit NX 설치페이지 URL 경로
************************************************/
var NX_INSTALL_FLAG = false;                                 // 설치페이지를 별도로 운영할지 여부 : FALSE 인 경우 업무페이지에서 설치파일 다운로드 실행
var NX_INSTALL_PAGENAME = 'install';                        // 설치페이지 명 : 설치페이지 명으로 내부에서 분기처리하기 때문에 NX_INSTALL_PAGE 경로의 페이지 명을 넣어주면 된다.
var NX_INSTALL_PAGE = './install.html';                     // 설치페이지 URL


/***********************************************
    Client 버전 정보
************************************************/
var Module_KPMCNT = 'Y';
var Module_KPMCNT_Ver = '1.0.0.45';

var Module_KPMSVC = 'Y';
var Module_KPMSVC_Ver = '1.0.0.30';

var Module_NX = 'Y';
var Module_NX_Ver = '1.0.4.9';


//===============================================
var Module_XML = 'N';
var Module_XML_Ver = '';

var Module_KMS = 'N';
var Module_KMS_Ver = '';
//===============================================

/***********************************************
    인증서 선택창 이동 활성화
************************************************/
var NX_DIALOG_MOVE = true;

/***********************************************
    SecuKitNX NX CharSet 설정 : 내부 통신시 인코딩 set
************************************************/
var inCharset = 'UTF-8';
var outCharset = 'UTF-8';

/***********************************************
    바이오보안토큰 PKCS#7 
************************************************/
var BioTokenP7Message = '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';

/***********************************************
    발급 관련 환경 변수
************************************************/
var NX_CA_IP = 'catest.signgate.com',   //'catest.signgate.com',   // 외부
    NX_CA_PORT = '4502';

/***********************************************
    정책 설정 환경 변수
************************************************/
var NX_AnyPolicy = 'Y';
var NX_POLICIES = '1.2.410.200004.5.2.1.2';

/***********************************************
    인증서 선택창 미디어 세팅
************************************************/
var NX_SELECT_CERT_MEDIA = [
{
    MEDIA: 'HDD',
    ORDER: 2,           // 표시 순서
    ABLE: 'able',       // 선택창 활성화 유무 (able / disable)
    DEFAULT: 'able'  // 하드디스크를 기본으로 먼저 표시하려고 할때 (able / disable)
},
{
    MEDIA: 'USB',
    ORDER: 1,
    ABLE: 'able'
},
{
    MEDIA: 'SECURE_TOKEN',
    ORDER: 3,
    ABLE: 'able'
},
{
    MEDIA: 'BIO_TOKEN',
    ORDER: 4,
    ABLE: 'able'
},
{
    MEDIA: 'USIM',
    ORDER: 5,
    ABLE: 'able'
},
{
    MEDIA: 'EXTENSION',
    ORDER: 6,           // 수정 금지
    ABLE: 'able'
}
];

/***********************************************
    타켓 미디어 세팅 : 발급&재발급 등에서 사용되는 미디어 선택창
************************************************/
var NX_TARGET_MEDIA = [
{
    MEDIA: 'HDD',
    ORDER: 2, // 표시 순서
    ABLE: 'able'   // 선택창 활성화 유무 (able / disable)
},
{
    MEDIA: 'USB',
    ORDER: 1,
    ABLE: 'able'
},
{
    MEDIA: 'SECURE_TOKEN',
    ORDER: 3,
    ABLE: 'able'
},
{
    MEDIA: 'BIO_TOKEN',
    ORDER: 4,
    ABLE: 'able'
},
{
    MEDIA: 'USIM',
    ORDER: 5,
    ABLE: 'able'
},
{
    MEDIA: 'EXTENSION',
    ORDER: 6,           // 수정 금지
    ABLE: 'able'
}
];

/***********************************************
     인증서 선택창 관리창 활성화
************************************************/
var CERTMGR_F = false;

/***********************************************
     USIM 관련
************************************************/
//USIM 스마트 인증 DLL명
var USIMDRIVE_NAME = {
    RAON: "USIMCert.dll",         // 라온시큐리티
    DREAM: "USIMDream.dll"        // 드림시큐리티
};

//USIM 다운로드 기본 URL
var USIM_DOWNLOAD_URL = "http://center.smartcert.co.kr/";   //드림시큐리티 쪽
var USIM_OPEN_SIZE_W = '';
var USIM_OPEN_SIZE_H = '';

var USIM_DOWNLOAD_EXE = "http://ids.smartcert.kr/";

//USIM 사이트 코드
var USIM_SITECODE = "000000000";

/***********************************************
     키보드보안 관련
************************************************/
var NOS_F = false;	// 잉카 키보드 보안 모듈 동작시 
var RAON_F = false; // 라온시큐어 키보드 보안 모듈 동작시