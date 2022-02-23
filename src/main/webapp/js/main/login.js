/**
 * 협렧업체 페잉지의 Login 관련 
 * 2016.08.09, Choi JongHyeok
 * 
 * 의존성 : (emro)util.js
 */

var loginDir = "/portal/sp/login/";

/* 
 * 2016.08.09, Choi JongHyeok
 * ID 찾기 팝업창  
 */
function popupFindId() {
	UT.popupJsp(loginDir + "findId.do", null, 665, 350, "", {
		title: "아이디 찾기"
	});	
}

/* 
 * 2016.08.09, Choi JongHyeok
 * PW 찾기 팝업창  
 */
function popupFindPw() {
	UT.popupJsp(loginDir + "findPassword.do", null, 665, 350, "", {
		title: "비밀번호 찾기"
	});	
}

/* 
 * 2016.08.09, Choi JongHyeok
 * PW 창 리다이렉트  
 */
function redirectFindPw() {
	location.href= loginDir + "findPassword.do";
}

/* 
 * 2016.08.09, Choi JongHyeok
 * PW 창 닫기  
 */
function popupClose(popup) {
	if(popup && popup.fire) {
		popup.fire("close");
	}
}

