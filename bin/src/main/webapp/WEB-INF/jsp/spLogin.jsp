<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="${_passwordSaltSource.name}" salt="${_passwordSaltSource.salt}" iteration="${_passwordSaltSource.iterationCount}"/>
<sec:csrfMetaTags />    
<title>SMARTsuite 9.1 | Supplier</title>
   <script src="../bower_components/jquery/dist/jquery.min.js"></script>
   <script src="../bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
<link rel="stylesheet" type="text/css" href="../bower_components/sc-component/sc-elements.build.css"/>
<link rel="stylesheet" type="text/css" href="../../css/main.css"/>
<script src="/ui/lib/custom/js/util.js"></script>
	
	<script type="text/javascript">
	
		//onload 함수
		if(window.addEventListener) {	//IE 9+
			window.addEventListener("load", init, false);
		} else if(window.attachEvent) {	//Low IE
			window.attachEvent("onload", init);
		} else {	//etc 
			window.onload = init;
		}
		
		function init () {
			
			//Browser의 호환성을 체크 
			//프로젝트별 브라우저 및 운영체제 설정은
			//browser.js에서 확인할 수 있음
			//1) BROWSER.valid : 운영체제 & 브라우저 검증 Boolean
			//2) BROWSER.OSValid : 운영체제 검증 Boolean
			//3) BROWSER.browserValid : 브라우저 검증 Boolean 
			if(!BROWSER.OSValid) {
				location.href = "/resources/portal/osbrowser.html";
			} else if(!BROWSER.browserValid && document.documentMode != 11) {
				location.href = "/resources/portal/supportbrowser.html";
			}
			
 			var id = getCookie("id");
			
			// getCookie함수로 id라는 이름의 쿠키를 불러와서 있을경우
	        if(id) { 
	            document.loginForm.id.value = id; //input 이름이 id인곳에 getCookie("id")값을 넣어줌
	            document.loginForm.id_save.checked = true; // 체크는 체크됨으로
	        }
	    }
		
		// 쿠키 불러오는 함수
		function getCookie(name) { 
	        var search = name + "=";
	        
	        if (document.cookie.length > 0) { // if there are any cookies
	            var offset = document.cookie.indexOf(search);
	        
	            if (offset != -1) { // if cookie exists
	                offset += search.length; // set index of beginning of value
	                end = document.cookie.indexOf(";", offset); // set index of end of cookie value
	                
	                if(end == -1){
	                	end = document.cookie.length;
	                }
	                
	                return unescape(document.cookie.substring(offset, end));
	            }
	        }
	    }
		
		// 쿠키 저장함수
		function setCookie(name, value, expiredays){
	        var todayDate = new Date();
	        todayDate.setDate(todayDate.getDate() + expiredays);
	        
	        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	    }
		
		// 로그인 함수
		function onLogin(){
			// 아이디 저장을 체크 하였을때
			if (document.loginForm.id_save.checked == true) { 
	            setCookie("id", document.loginForm.id.value, 7); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
	            
	        // 아이디 저장을 체크 하지 않았을때
	        } else { 
	            setCookie("id", document.loginForm.id.value, 0); //날짜를 0으로 저장하여 쿠키삭제
	        }
			document.loginForm.password.value = PasswordEncryptor.encryptpw(document.loginForm.password.value);
	    	document.loginForm.submit();
		}
		
		function onRegNewVendor(){
			//UT.popupJsp("/sp/getTmpByTmpId.do?tmpId=USR_AGR_TX", null, 900, 600, "", {maximizable: true, title: "신규업체등록"});
			var locale = document.getElementById('locale').value;
			//UT.popupJsp("/ui/sp/esourcing/vendorInfoMgt/bizguide.html?locale="+locale, null, 900, 600, "", {maximizable: true, title: "신규업체등록"});
			UT.popupJsp("/newVendor.do?locale="+locale, null, 900, 600, "", {maximizable: true, title: "신규업체등록"});
		}
		
		function viewAgreementOfUtil(){
			UT.popupJsp("/sp/getTmpByTmpId.do?tmpId=USR_AGR_TX", null, 900, 600, "", {maximizable: true, title: "신규업체등록"});
		}
		
		function viewPrivacyPolicy(){
			UT.popupJsp("/sp/getTmpByTmpId.do?tmpId=USR_AGR_TH", null, 900, 600, "", {maximizable: true, title: "신규업체등록"});
		}
		
		function noticeLink(board_id, post_no){
			var param = [
				{board_id : board_id,
				post_no : post_no}
			];
			UT.popupJspByPost("/noticeLink.do", param, null, "40%", "70%", "", {maximizable: true, title: "Notice"});
		}
	</script>
	
	<style>
		sc-window>div.content-wrap>div.content {
    		position: absolute;
    		background-color: #fff;
    		border-radius: 3px;
    		overflow: hidden;
		}
	</style>
</head>

<body onload="document.loginForm.username.focus();">
	<div id="wrap">
		<!-- //Header -->
		<header id="top_area">
			<div class="utill">
			<h1>
				<a href="" class="logo"><img src="../../img/main/logo_sp.png" alt="SMARTsuite 9.1 협력사포탈" /></a>
				<div class="gnb">
	                <ul>
	                <li><a href="#">Sitemap</a></li>
	                <li class="lan">
	                    <a href="#">Korean</a>
	                    <div class="box_over">
	                    <ul>
	                        <li><a href="">Korean</a></li>
							<li><a href="">English</a></li>
							<li><a href="">Chinese</a></li>
	                    </ul>
	                    </div>
	                </li>
	                </ul>
	            </div>
			</h1>
			</div>
			<nav>
				<ul class="depth">
	            <li class=""><a class="dir">구매업무안내</a>
	            	<div>
	                <ul>
	                <li><h3>구매업무안내</h3>
	                	<p>Sharing the future, <br />win-win together</p>
	                </li>
	                <li><a href="#">구매절차</a>
	                <a href="#">거래품목 및 거래담당자</a>
	                <a href="#">대금지급 조건</a></li>
	                </ul>
	                </div>
	            </li>
	            <li class=""><a class="dir">구매규정/정책</a>
	            </li>
	            <li class=""><a class="dir">동반성장정책</a>
	            </li>
	            <li class=""><a class="dir">지원프로그램</a>
				</li>
				<li class=""><a class="dir">고객지원</a>
	                <div>
	                <ul>
	                <li><h3>고객지원</h3>
	                    <p>Sharing the future, <br />win-win together</p>
	                </li>
	                <li><a href="#">공지사항</a>
	                <a href="#">자료실</a>
	                <a href="#">FAQ</a></li>
	                </ul>
	                </div>
				</li>
				</ul>
			</nav>
		</header>
		<!-- //Header -->
		<div class="container">
			<!-- Concept&Login -->
			<section class="concept">
				<!-- Login -->
				<section class="box_login">
					<form name="loginForm" action="<c:url value="/loginProcess.do" />" method="post">
		                <ul class="login_input">
		                	<li>
		                    <input type="text" class="inputBox_sp" id="id" name="username" value="" placeholder="ID" 
		                    	onchange="this.value=this.value.toUpperCase();"
		                    	onkeypress="if(event.keyCode==13){ onLogin(); return false;}"
		                    	/>
		                    </li>
		                    <li>
		                    <!-- 초기값 PASSWORD LABEL값 표시를 위한 inputBox -->
							<input type="password" class="inputBox_sp" id="pw" name="password" placeholder="Password"
								onkeypress="if(event.keyCode==13){ onLogin(); return false;}"/>
							</li>
							<li>
							<select id="locale">
		                          <option value="ko_KR">한국어</option>
		                          <option value="en_US">영어</option>                                
		                          <option value="zh_CN">중국어</option>                                
							</select>
							</li>
							<li>
							<a href="#" onclick="onLogin()">Login</a>
							</li>
						</ul>
						<div class="idpw_find">
							<label for="id_save"><input type="checkbox" id="id_save"/>ID 저장</label>
							<a href="javascript:popupFindId()">ID</a>/<a href="javascript:popupFindPw()">Password</a> 찾기
						</div>
						<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
		                <sec:csrfInput/>
		                
		            </form>
					<form name="vendorForm" class="buttons">
						<a class="btn_cert_login">공인인증서 Login</a>
						<div class="btn_new_vd">
							<ul>
							<li><a href="javascript:onRegNewVendor()">협력사신규등록</a></li>
							<li><a href="">협력사등록안내</a></li>
							</ul>
						</div>
					</form>
				</section>
				<!-- //Login -->
			</section>
			<!-- //Concept&Login -->
			
			<!-- Contents -->
			<div class="contents">
				<section class="q_link">
					<ul>
					<li><a>구매절차</a></li>
					<li><a>거래품목 및<br />거래담당자</a></li>
					<li><a>신규업체등록안내</a></li>
					<li><a>방문예약</a></li>
					<li><a>VOC</a></li>
					</ul>
				</section>
				<div class="col3">
					<section class="board">
					<h3>Notice<a href="javascript:noticeLink('${boardList[0].board_id}', '')"></a></h3>
					<ul class="notice_list">
						<c:forEach var="row" items="${boardList}" begin="0" end="4">
							<li><a href="javascript:noticeLink('${row.board_id}','${row.post_no}')">${row.post_tit}</a><span>${row.post_reg_dt}</span></li>
						</c:forEach>
					</ul>
					</section>
					<section class="board">
					<h3>Reference Library<a></a></h3>
					<ul class="notice_list">
						<li class="new"><a href="">전자계약 매뉴얼</a><span>2017-10-30</span></li>
						<li><a href="">전략구매 사용설명서</a><span>2017-10-30</span></li>
						<li><a href="">계약 서식모음</a><span>2017-10-30</span></li>
						<li><a href="">시스템 사용자 매뉴얼</a><span>2017-10-30</span></li>
						<li><a href="">신규업체 가입 사용 매뉴얼</a><span>2017-10-30</span></li>
					</ul>
					</section>
					<section class="info">
						<div class="fair_trade">
							<h4>공정거래 4대 원칙</h4>
							<ul>
							<li><a herf="">계약체결 가이드라인</a></li>
							<li><a herf="">협력사관리 가이드라인</a></li>
							<li><a herf="">내부심의위원회 가이드라인</a></li>
							<li><a herf="">서면발급및보존 가이드라인</a></li>
							</ul>
						</div>
						<div class="contact">
							<h4>고객센터</h4>
							<span>1588-1234</span>
						</div>
					</section>
				</div>
				<section class="related_links">
				<ul>
					<li class="prev"><a href="" title="Previous"></a></li>
					<li><a href="#"><img src="../../img/main/logo_kica.png" title="KICA 한국정보인증" /></a></li>
					<li><a href="http://www.ecredible.co.kr/echome/index.jsp"><img src="../../img/main/logo_ecredible.png" title="이크레더블" /></a></li>
					<li><a href="http://www.nicednb.com/"><img src="../../img/main/logo_nice_dnb.png" title="나이스디앤비" /></a></li>
					<li class="next"><a href="" title="Next"></a></li>
				</ul>
				</section>
			</div>
			<footer>
				<section> 
					<div class="lt">
						&copy;&nbsp;emro All Rights Reserved<br/>
						<b>(주)엠로</b>서울특별시 영등포구 당산로 41길 11, 당산 SK V1센터 E동 5층<br/>
						대표전화번호 <b>02-785-9848</b>  대표팩스번호  <b>02-785-6990</b>
					</div>
					<div class="rt">
						<ul>
							<li><a><img src="../../img/main/ico_twitter.png" title="Twitter" alt="Twitter" /></a></li>
							<li><a><img src="../../img/main/ico_facebook.png" title="Facebook" alt="Facebook" /></li>
							<li><a><img src="../../img/main/ico_youtube.png" title="Youtube" alt="Youtube" /></a></li>
							<li><a><img src="../../img/main/ico_instagram.png" title="Instagram" alt="Instagram" /></a></li>
							<li><a href="javascript:viewPrivacyPolicy()">개인정보취급방침</a></li>
							<li>|</li>
							<li><a href="javascript:viewAgreementOfUtil()">이용약관</a></li>
						</ul>
					</div>
				</section>
			</footer>
		</div>
	</div>
	<link rel="import" href="../bower_components/sc-component/sc-elements.build.html"/>
	<script type="text/javascript" src="../../js/main/login.js"></script>
	<script type="text/javascript" src="../../js/main/browser.js"></script>
	<script type="text/javascript" src="bower_components/crypto-js/crypto-js.js"></script>
    <script type="text/javascript" src="bower_components/password-encryptor/password-encryptor.min.js"></script>
</body>
</html>