package smartsuite.app.common.shared;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import cn.apiclub.captcha.Captcha;
import smartsuite.app.bp.admin.account.AccountException;
import smartsuite.app.bp.admin.account.AccountService;
import smartsuite.data.FloaterStream;
import smartsuite.mybatis.QueryFloaterStream;
import smartsuite.security.authentication.Auth;
import smartsuite.security.authentication.AuthenticationPostService;
import smartsuite.security.authentication.ProxyPasswordEncoder;
import smartsuite.security.captcha.CaptchaGenerator;
import smartsuite.security.captcha.CaptchaUtils;
import smartsuite.security.core.crypto.CipherUtil;
import smartsuite.security.userdetails.User;

/**
 * 공통으로 사용하는 서비스 관련 Class입니다.
 *
 * @author hjhwang
 * @see
 * @FileName SharedService.java
 * @package smartsuite.app.shared
 * @Since 2016. 2. 2
 * @변경이력 : [2016. 2. 2] hjhwang 최초작성
 */
@SuppressWarnings ({ "rawtypes"})
@Service
@Transactional
public class SharedService {

	static final Logger LOG = LoggerFactory.getLogger(SharedService.class);
	
	/** The sql session. */
	@Inject
	private SqlSession sqlSession;
	
	@Inject
	CaptchaGenerator captchaGenerator;
	
	@Inject
	CipherUtil cipherUtil;
	
	@Inject 
	private HttpSession httpSession;
	
	@Inject
	public AuthenticationPostService authenticationPostService;	
	
	@Inject
	private PasswordEncoder passwordEncoder;
	
	@Inject
	private AccountService accountService;
	
	//솔루션 관리자 롤
	private final static GrantedAuthority ADMIN_ROLE_CODE = new SimpleGrantedAuthority("A100");
	
	/**
	 * 공통 코드 조회.
	 *
	 * @param code the code
	 * @return the list
	 */
	//@Cacheable(value="cmmn-code", key="#code")
	@Cacheable(value="cmmn-code", key="#code + '_' + T(org.springframework.context.i18n.LocaleContextHolder).getLocale().toString()")
	public List doGetCommonCodeList(String code) {
		return sqlSession.selectList("shared.getCommonCodeList", code);
	}

	/**
	 * 공통코드와 특정 속성 list 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 19
	 * @Method Name : findCommonCodeAttrCdList
	 */
	public List findCommonCodeAttrCdList(Map<String, Object> param) {
		return sqlSession.selectList("shared.findCommonCodeAttrCdList", param);
	}

	/**
	 * 마지막 수정일자 이후에 수정된 공통 코드 목록 조회.
	 *
	 * @param lastUpdated the last updated
	 * @return the list
	 */
	public List doGetModifiedCodes(Date lastUpdated) {
		return sqlSession.selectList("shared.getModifiedCodes", lastUpdated);
	}

	/**
	 * 마지막 수정일자 이후에 수정된 공통 코드 목록 조회.
	 *
	 * @return the list
	 */
	public List getAllCompanyList() {
		return sqlSession.selectList("shared.getAllCompanyList");
	}

	/**
	 * 문서번호 생성 독립 트랜잭션 생성 및 메소드 종료 후 바로 commit To-Do : 트랜잭션 확인.
	 *
	 * @param docNoCd the doc no cd
	 * @return doc number
	 */
	@Transactional (propagation = Propagation.REQUIRES_NEW)
	public String generateDocNo(String docNoCd) {
		Map<String, Object> docInfo = sqlSession.selectOne("shared.getDocInfo", docNoCd);

		//if (docInfo == null) {
			// 예외 처리
		//}

		String compareCurrentDate = "";
		String lastGeneratedDate = (String)docInfo.get("last_generated_date");
		String expression = (String)docInfo.get("expression");
		int currentSeq = 0;
		String tempExpression = null;
		SimpleDateFormat fm = new SimpleDateFormat("yyyyMMdd");

		try {
			String strCurrentDate = fm.format(new Date());
			lastGeneratedDate = lastGeneratedDate == null ? fm.format(new Date()) : lastGeneratedDate;
			Date dateLastGeneratedDate = fm.parse(lastGeneratedDate);

			if ("Y".equals(docInfo.get("seq_refresh_unit").toString())) {
				compareCurrentDate = strCurrentDate.substring(0, 4);
				lastGeneratedDate = lastGeneratedDate.substring(0, 4);
			} else if ("M".equals(docInfo.get("seq_refresh_unit").toString())) {
				compareCurrentDate = strCurrentDate.substring(0, 6);
				lastGeneratedDate = lastGeneratedDate.substring(0, 6);
			} else if ("W".equals(docInfo.get("seq_refresh_unit").toString())) {
				Calendar c = Calendar.getInstance();
				compareCurrentDate = String.valueOf(c.get(Calendar.WEEK_OF_YEAR));
				Calendar c2 = Calendar.getInstance();
				c2.setTime(dateLastGeneratedDate);
				lastGeneratedDate = String.valueOf(c2.get(Calendar.WEEK_OF_YEAR));
			} else if ("D".equals(docInfo.get("seq_refresh_unit").toString())) {
				compareCurrentDate = strCurrentDate;
			}
		} catch (java.text.ParseException ex) {
			LOG.error(ex.getMessage(),ex);
		}

		if (!"X".equals(docInfo.get("seq_refresh_unit"))
			// 주기가 바뀐 경우 start_seq 부터 새로 시작하기 위해 current_seq 초기화
			&& !compareCurrentDate.equals(lastGeneratedDate)) {
			currentSeq = -1;
		}

		if (currentSeq == -1) {
			// 주기가 바뀐 경우 start_seq 부터 새로 시작
			currentSeq = ((BigDecimal)docInfo.get("start_seq")).intValue();
		} else {
			// 최초 생성 이거나 주기가 바뀌지 않은 경우 current_seq + 1
			currentSeq = docInfo.get("current_seq") == null ? 0 : ((Integer)docInfo.get("current_seq")).intValue();
			currentSeq = currentSeq + 1;
		}

		// current_seq 가 end_seq 초과 시 예외 발생
		//if (currentSeq > ((BigDecimal)docInfo.get("end_seq")).intValue()) {
			// To-Do : 예외 발생 ("Number is exceed.")
		//}

		// current_seq 업데이트
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("current_seq", currentSeq);
		param.put("last_generated_date", fm.format(new Date()));
		param.put("doc_no_cd", docNoCd);
		sqlSession.update("shared.updateDocNumber", param);

		int idx1 = expression.indexOf('#', 0);
		int idx2 = expression.indexOf("#", idx1 + 1);
		
		// 표현식에서 첫번째 #의 인덱스는 0이상, 두번째 #의 인덱스는 1이상인 경우 (SMARTNINE-1594)
		if (expression != null && idx1 > -1 && idx2 > 0) {
			// 표현식에서 #~~# 부분 추출
			tempExpression = expression.substring(idx1, idx2 + 1);
		}

		if (tempExpression != null && tempExpression.length() > 0) {
			//expression = expression.replace(tempExpression, compareCurrentDate);
			String tempDateExp = tempExpression.replace("#", ""); 
			SimpleDateFormat tempFm = new SimpleDateFormat(tempDateExp); 
			String tempDate = tempFm.format(new Date()); 
			expression = expression.replace(tempExpression, tempDate);

			/*
			 * 날짜패턴 치환 버그가 있습니다. expression = PR#yyMM#@SEQ@ tempExpression = #yyMM# compareCurrentDate = '201604' expression.replace(tempExpression,
			 * compareCurrentDate); 이렇게 하면 expression = PR1604@SEQ가 되어야 하지만 PR201604@SEQ@로 됨 그래서 아래 처럼 수정을 하면 될 것 같은데 확인 후 적용 부탁 드리겠습니다. 아울러 ESACDFM에서
			 * expression의 날짜 패턴을 JAVA FORMAT에 맞게 수정되어야 할 듯 합니다. 예)YYYYMMDD -> yyyyMMdd
			 */

			/*
			 * String tempDateExp = tempExpression.replace("#", ""); SimpleDateFormat tempFm = new SimpleDateFormat(tempDateExp); String tempDate =
			 * tempFm.format(new Date()); expression = expression.replace(tempExpression, tempDate);
			 */

		}
		
		// 종료번호의 자릿수에 맞추어서 LPAD 처리한다.
		int len = new BigDecimal(docInfo.get("end_seq").toString()).toString().length();
		String seq = StringUtils.leftPad(String.valueOf(currentSeq), len, "0");

		expression = expression.replace("@SEQ@", seq);

		return expression;
	}	
	
	/**
	 * 로그인 사용자의 기록을 db에 남김
	 * @param param
	 */
	public void insertLoginInfo(Map param) {
		sqlSession.insert("shared.insertLoginInfo", param);
	}
	

	/**
	 * 로그인 사용자의 세션에 담을 정보 조회, UI에서 사용 목적.
	 *
	 * @return currentUser
	 */
	public Map getSessionUserInfo() {
		Map currentUser = sqlSession.selectOne("shared.getSessionUserInfo");

		// 추가적으로 session 에 담을 정보 조회 후 currentUser 에 추가
		// currentUser.put("other", new Object());

		return currentUser;
	}

	/**
	 * 로그인 사용자 운영조직 목록 조회.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return 운영조직 목록
	 * @Date : 2016. 5. 2
	 * @Method Name : findListOperOrgByUser
	 */
	public List findListOperOrgByUser(String param) {
		return sqlSession.selectList("shared.findListOperOrgByUser", param);
	}

	/**
	 * 운영단위 조직 연결정보 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 3. 11
	 * @Method Name : findListOperOrgByLink
	 */
	public List findListOperOrgByLink(Map param) {
		return sqlSession.selectList("shared.findListOperOrgByLink", param);
	}

	/**
	 * 운영단위 조직 연결정보 조회한다. ( 운영조직 ==IO:품목 )
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 10
	 * @Method Name : findListOperOrgByIO
	 */
	public List findListOperOrgByIO(Map param) {
		return sqlSession.selectList("shared.findListOperOrgByIO", param);
	}

	/**
	 * list userfunction 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list< map>
	 * @Date : 2016. 7. 1
	 * @Method Name : findListUserfunction
	 */
	public List<Map<String,Object>> findListUserfunction(String param) {
		return sqlSession.selectList("shared.findListUserFunc", param);
	}

	/**
	 * 로그인 사용자 메뉴 목록을 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param searchParam the search param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 2. 11
	 * @Method Name : findListUserMenu
	 */
	public List<Map<String, Object>> findListUserMenu(Map searchParam) {
		return sqlSession.selectList("shared.findListUserMenu", searchParam);
	}
	
	public List<Map<String, Object>> findListMenu(Map<String, Object> searchParam) {
		List<Map<String, Object>> menuList = new ArrayList<Map<String, Object>>();
		
		String usrCls = String.valueOf(httpSession.getAttribute("usrCls"));

		if(Auth.getCurrentUserName() != null && Auth.getCurrentUserName().length() != 0){
			// 로그인 과정을 통해 세션에 userName 이 있는 경우 유저 권한의 메뉴를 조회합니다.
			menuList = sqlSession.selectList("shared.findListUserMenu", searchParam);
			
		} else if (usrCls != null && usrCls.length() != 0){
			// httpSession 객체에 usrCls 값이 존재 할 경우 usrCls 기준으로 메뉴를 조회합니다.
			searchParam.put("usr_cls", usrCls);
			menuList = sqlSession.selectList("shared.findListDefaultMenu", searchParam);
			
		}
		return menuList;
	}

	/**
	 * 품목분류의 대분류 목록을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 2
	 * @Method Name : findListSharedCate
	 */
	public List findListSharedCate(Map param) {
		return sqlSession.selectList("shared.findListSharedCate", param);
	}

	/**
	 * 상위분류에 대한 하위분류 목록을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 2
	 * @Method Name : findListSharedCateByUpCateCd
	 */
	public List findListSharedCateByUpCateCd(Map param) {
		return sqlSession.selectList("shared.findListSharedCateByUpCateCd", param);
	}

	/**
	 * 수량 단위 공통코드 목록을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 4
	 * @Method Name : findListAmtUnit
	 */
	public List findListAmtUnit(Map param) {
		return sqlSession.selectList("shared.findListAmtUnit", param);
	}

	/**
	 * list vendor 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 10
	 * @Method Name : findListVendor
	 */
	public List findListVendor(Map param) {
		return sqlSession.selectList("shared.findListVendor", param);
	}
	
	/**
	 * list vendor master 조회한다.
	 *
	 * @author : mgPark
	 * @param param the param
	 * @return the list
	 * @Date : 2018. 7. 9
	 * @Method Name : findListVendorMaster
	 */
	public List findListVendorMaster(Map param) {
		return sqlSession.selectList("shared.findListVendorMaster", param);
	}

	/**
	 * 운영조직에 연결된 vendor 목록을 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 10
	 * @Method Name : findListLinkedVendor
	 */
	public List<Map<String, Object>> findListLinkedVendor(Map<String, Object> param) {
		return sqlSession.selectList("shared.findListLinkedVendor", param);
	}

	/**
	 * 구매 상태 Bar 정보 조회.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return state List
	 * @Date : 2016. 2. 2
	 * @Method Name : findListAttach
	 */
	public List<Map<String, Object>> findListProStatus(Map<String, Object> param) {
		return sqlSession.selectList("shared.findListProStatus", param);
	}

	/**
	 * SP 운영단위 목록 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 27
	 * @Method Name : findListOperOrgOfSp
	 */
	public List findListOperOrgOfSp(String param) {
		return sqlSession.selectList("shared.findListOperOrgOfSp", param);
	}
	
	/**
	 * 메뉴코드로 메뉴얼 정보를 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 7. 1
	 * @Method Name : findInfoHelpManual
	 */
	public Map findInfoHelpManual(Map param) {
		return sqlSession.selectOne("shared.findInfoHelpManual", param);
	}
	
	/**
	 * 협력사 목록을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 7. 19
	 * @Method Name : findListVendorBasic
	 */
	public List findListVendorBasic(Map param) {
        return sqlSession.selectList("shared.findListVendorBasic", param);
    }

	/**
	 * list all vendor 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 7. 20
	 * @Method Name : findListAllVendor
	 */
	public List findListAllVendor(Map param) {
		return sqlSession.selectList("shared.findListAllVendor",param);
	}

	/**
	 * list sg vendor 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 7. 20
	 * @Method Name : findListSGVendor
	 */
	public List findListSGVendor(Map param) {
		return sqlSession.selectList("shared.findListSGVendor",param);
	}
	
	/**
	 * Captcha 이미지 반환 및 검증 문자 세션에 저장 
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @return the list
	 * @Date : 2017. 2. 09
	 * @Method Name : getCaptcha
	 */
	public String getCaptcha(int width, int height) {
		Captcha captchaObj= captchaGenerator.createCaptcha(width, height);
		httpSession.setAttribute("captchaObj", captchaObj);
		
		return CaptchaUtils.encodeBase64(captchaObj);
	}
	
	/**
	 * 사용자가 입력값과 세션의 Captcha값 비교  
	 *
	 * @author : JongHyeok Choi
	 * @param : String 
	 * @return : Booelan
	 * @Date : 2017. 2. 09
	 * @Method Name : checkCaptcha
	 */
	public Boolean checkCaptcha(String captcha) {
		Captcha captchaObj = (Captcha) httpSession.getAttribute("captchaObj");
		//한 번 체크하면(실패시) 무조건 변경해야 함, Front에서 구현 
		httpSession.removeAttribute("captchaObj");
		
		String expect = captchaObj.getAnswer();
		return expect.equals(captcha);
	}
	
	/**
	 * 사용자 메뉴 기능 / 메뉴 URL 권한 목록을 조회한다.
	 *
	 * @author : mgPark
	 * @param roles the roles
	 * @return the list< map< string, object>>
	 * @Date : 2018. 5. 2
	 * @Method Name : findListFunctionAndUrlByUserRoles
	 */
	public List<Map<String,Object>> findListFunctionAndUrlByUserRoles() {
		return sqlSession.selectList("shared.findListFunctionAndUrlByUserRoles");
	}
	
	public Map findCurrntUserInfo() {
		return sqlSession.selectOne("infra-UserDetails.getSessionUserInfo", (String)Auth.getCurrentUserInfo().get("usr_id"));
	}
	
	/**
	 * 자신의 정보를 변경한다
	 *
	 * @author : JongHyeok
	 * @param param the param
	 * @return the int
	 * @Date : 2017. 3. 14
	 * @Method Name : saveUser
	 */
	public Map saveUser(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		String enc_pw = (String) param.get("enc_pw");
		if (enc_pw != null && !"".equals(enc_pw)) { // Password 존재여부 확인

			String decPassword = "";

			// Password Cipher Decrypt
			decPassword = cipherUtil.decrypt((String) param.get("enc_pw"));

			// Simplex Encrypt for DB Insert
			param.put("pw", new ProxyPasswordEncoder("SHA-512").encode(decPassword));
		}

		sqlSession.update("shared.updateUser", param);
		authenticationPostService.authenticationUpdate();

		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	public Map<String,Object> checkRoleAdminAuthenticate(HttpServletRequest request, Map<String,String> param) {
		User user = Auth.getCurrentUser();
		if(!passwordEncoder.matches(param.get("pw"), user.getPassword())) {
			throw new AccountException("관리자 비밀번호와 일치하지 않습니다.");
		}
//		if(!user.getAuthorities().contains(ADMIN_ROLE_CODE)) {
//			throw new AccountException("접속한 계정이 관리자 권한을 가지고 있지 않습니다.");
//		}
		String ip = this.getClientIpAddress(request);
		List<String> allowIps = accountService.getAllowIps();
		if(!allowIps.isEmpty() && !allowIps.contains(ip)) {
			throw new AccountException("관리자 페이지 접속허가를 받지 않은 IP 주소 입니다.");
		}
		
		Collection<GrantedAuthority> authorities = user.getAuthorities();
		if(authorities == null) {
			authorities = Lists.newArrayList();
			user.setAuthorities(authorities);
		}
		authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		
		Map<String,Object> result = Maps.newHashMap();
		result.put(Const.RESULT_STATUS, Const.SUCCESS);
		result.put("authenticated", true);
		return result;
	}
	
	public String getClientIpAddress(HttpServletRequest request) {
	    String ip = request.getHeader("X-Forwarded-For");  
	    if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {  
	        ip = request.getHeader("Proxy-Client-IP");  
	    }  
	    if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {  
	        ip = request.getHeader("WL-Proxy-Client-IP");   // WebLogic
	    }  
	    if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {  
	        ip = request.getHeader("HTTP_X_FORWARDED_FOR");  
	    }  
	    if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {  
	        ip = request.getHeader("HTTP_X_FORWARDED");  
	    }  
	    if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {  
	        ip = request.getHeader("HTTP_X_CLUSTER_CLIENT_IP");  
	    }  
	    if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {  
	        ip = request.getHeader("HTTP_CLIENT_IP");  
	    }  
	    if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {  
	        ip = request.getHeader("HTTP_FORWARDED_FOR");  
	    }  
	    if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {  
	        ip = request.getHeader("HTTP_FORWARDED");  
	    }  
	    if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {  
	        ip = request.getHeader("HTTP_VIA");  
	    }  
	    if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {  
	        ip = request.getHeader("REMOTE_ADDR");  
	    }  
	    if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {  
	        ip = request.getRemoteAddr();  
	    }  
	    return ip;  
	}
	
	/**
	 * list my favorite 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @return the list< map< string, object>>
	 * @Date : 2017. 3. 30
	 * @Method Name : findListMyFavorite
	 */
	public List<Map<String, Object>> findListMyFavorite() {
		return sqlSession.selectList("favorite.findListMyFavorite");
	}
	
	/**
	 * 내 즐겨찾기를 추가한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2017. 3. 30
	 * @Method Name : saveMyFavorite
	 */
	public List<Map<String,Object>> saveMyFavorite(Map<String,Object> param){
		int isFavorite = sqlSession.selectOne("favorite.findCntMyFavorite",param);
		if(isFavorite == 0){
			sqlSession.insert("favorite.insertMyFavorite",param);
		}else{
			deleteMyFavorite(param);
		}
		return findListMyFavorite();
	}
	
	/**
	 * 내 즐겨찾기 순서를 수정한다.
	 * 
	 * @param param
	 * @return
	 */
	public List<Map<String,Object>> updateMyFavoriteOrder(Map<String,Object>param){
		sqlSession.update("favorite.updateMyFavoriteOrder", param);
		return findListMyFavorite();
	}
	
	/**
	 * my favorite 삭제한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2017. 4. 4
	 * @Method Name : deleteMyFavorite
	 */
	public Map deleteMyFavorite(Map<String,Object> param){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		sqlSession.update("favorite.updateMyFavoritesByDeletingMenu",param);
		sqlSession.delete("favorite.deleteMyFavorite",param);
		return resultMap;
	}
	
	/**
	 * 미사용 계정 기준 정보 조회
	 *
	 * @author : Joon Huh
	 * @return the map
	 * @Date : 2017. 5. 2
	 * @Method Name : findAccountDisabledInfo
	 */
	public Map findAccountDisabledInfo() {
		return sqlSession.selectOne("shared.findAccountDisabledInfo");
	}
	
	/**
	 * 결재서식에서 코드값을 코드명으로 변환하기위해 사용하는 함수
	 *
	 * @author : LMS
	 * @param Object code, String groupCode
	 * @return String
	 * @Date : 2017. 05. 23
	 * @Method Name : getCodeName
	 */
	public String getCodeName(Object code, String groupCode) {
		Map<String, Object> param = new HashMap<String, Object>();
		String codeName = "";
		
		if(code != null && !Strings.isNullOrEmpty(groupCode)) {
			param.put("cd", code);
			param.put("grp_cd", groupCode);
			
			codeName = sqlSession.selectOne("shared.getCodeName", param);
		}
		
		return codeName;
	}
	
	/**
	 * 해당 운영 조직 코드를 이용해, 운영 조직 명을 조회
	 *
	 * @author : LMS
	 * @param Object oper_org_cd
	 * @return 운영 조직 명
	 * @Date : 2017. 05. 23
	 * @Method Name : findOperOrgNameByCode
	 */
	public String findOperOrgNameByCode(Object oper_org_cd) {
		if(oper_org_cd != null) {
			return sqlSession.selectOne("shared.findOperOrgNameByCode", oper_org_cd);
		}
		
		return "";
		
	}
	
	/**
     * 운영조직 목록 조회.
     */
    public List<Map<String, Object>> findListOperOrgAll(String param) {
        return sqlSession.selectList("shared.findListOperOrgAll", param);
    }

	/**
	 * zip code by DB 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the floater stream
	 * @Date : 2017. 8. 18
	 * @Method Name : findZipCodeByDB
	 */
	public FloaterStream findZipCodeByDB(Map param) {
		// 대용량 처리
		FloaterStream stream = new QueryFloaterStream(sqlSession, "shared.findListZipCodeByDB", param);
		return stream;
	}
	
	
	public List findListSiteCombo(Map param) {
		return sqlSession.selectList("shared.findListSiteCombo",param);
	}
	
	public List findListVerCombo(Map param) {
		return sqlSession.selectList("shared.findListVerCombo",param);
	}
	
	public List findListAreaCombo(Map param) {
		return sqlSession.selectList("shared.findListAreaCombo",param);
	}
	
	public List findListModelGroup(Map param) {
		return sqlSession.selectList("shared.findListModelGroup",param);
	}
	
	public List findListDoor(Map param) {
		return sqlSession.selectList("shared.findListDoor",param);
	}
	
	public List findListCompanyCombo(Map param) {
		return sqlSession.selectList("shared.findListCompanyCombo",param);
	}
	
	public List findListSiteByCompany(Map param) {
		return sqlSession.selectList("shared.findListSiteByCompany",param);
	}
	
	public List findListUserSiteCombo(Map param) {
		// RAYCOM 추가
		Map searchParam = new HashMap<String, Object>();
		
		// 세션 정보
		Map userInfo = Auth.getCurrentUserInfo();
		
		if("system".equals(userInfo.get("access_level")) ){
			return sqlSession.selectList("shared.findListUserSiteCombo",searchParam);
		}else {
			searchParam.put("access_level", userInfo.get("access_level") );
			searchParam.put("company_id", userInfo.get("user_company_id") );
			return sqlSession.selectList("shared.findListUserSiteComboByLevel",searchParam);
		}
		
	}
	
	// home 유형 저장
	public Map saveUserHomeTyp(Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		sqlSession.update("shared.saveUserHomeTyp", param);
		authenticationPostService.authenticationUpdate();
		return resultMap;
	}
}
