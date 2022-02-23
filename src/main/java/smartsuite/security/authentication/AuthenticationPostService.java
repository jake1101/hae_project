package smartsuite.security.authentication;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.collect.Maps;

import smartsuite.app.bp.admin.account.AccountService;
import smartsuite.security.userdetails.UserDetailsProxy;

@Service
@Transactional
public class AuthenticationPostService {
	
	static final Logger LOG = LoggerFactory.getLogger(AuthenticationPostService.class);

	@Inject
	SqlSession sqlSession;
	
	@Inject
	AccountService accountService;
	
	@Inject
	MessageSource messageSource;
	
	String passwordInvalidCountName = "pw_miss_cnt";
	
	String accountLockName = "acc_lock_yn";
	
	String accountIdName = "usr_id";
	
	@SuppressWarnings("deprecation")
	public AuthenticationException authenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) {
		//존재하지 않는 사용자
		if(exception instanceof UsernameNotFoundException) {
			LOG.debug("User not found");
			return new BadCredentialsException(messageSource.getMessage("STD.SEC1000", null, "아이디 또는 비밀번호를 다시 확인하시기 바랍니다. 등록되지 않은 아이디이거나, 비밀번호를 잘못 입력하셨습니다.", LocaleContextHolder.getLocale()));
		}
		//패스워드 오류
		else if(exception instanceof BadCredentialsException) {
			int limitLoginAttempsCountByInvalidPassword = accountService.getAccountSettings().getLimitLoginInvalidPasswordCount();
			if(limitLoginAttempsCountByInvalidPassword > 0) {
				String username = request.getParameter("username");
				Map<String,Object> authInfo = sqlSession.selectOne("infra-UserDetails.getUserAuthInfo", username);
				int passwordMissCount = 0;
				if(authInfo.get(passwordInvalidCountName) != null) {
					passwordMissCount = Integer.parseInt(authInfo.get(passwordInvalidCountName).toString());
				}
				Map<String,Object> param = Maps.newHashMap();
				param.put(accountIdName, username);
				param.put(passwordInvalidCountName, ++passwordMissCount);
				//5회가 되지 않으면 카운트 업데이트
				if(passwordMissCount < limitLoginAttempsCountByInvalidPassword) {
					param.put(accountLockName, "N");
				}
				//계정잠금
				else {
					param.put(accountLockName, "Y");
				}
				sqlSession.update("infra-UserDetails.updateAuthFail", param);
			}
			LOG.debug("User account password is wrong");
			return new BadCredentialsException(messageSource.getMessage("STD.SEC1000", null, "아이디 또는 비밀번호를 다시 확인하시기 바랍니다. 등록되지 않은 아이디이거나, 비밀번호를 잘못 입력하셨습니다.", LocaleContextHolder.getLocale()));
		}
		return exception;
	}
	
	public void authenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) {

		Map<String,String> param = new HashMap<String, String>();
		String clientIp = getClientIpAddress(request);
		param.put("last_login_ip", clientIp);
		
		// 로그인한 클라이언트 IP, 로그인 일시
		sqlSession.update("infra-UserDetails.updateExtraLoginInfo", param);
		

	}	
	
	public void authenticationUpdate() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		
		// 현재 로그인 성공한 user 객체 조회
		Object principal = authentication.getPrincipal();
		UserDetailsProxy proxy = null;
		String userToken = "";
		if (principal instanceof UserDetails) {
			proxy = (UserDetailsProxy)principal;
			userToken = (String)proxy.getUserInfo().get("userToken");
		}
		
		if(proxy != null) {
			//new Info 
			Map userInfo = sqlSession.selectOne("infra-UserDetails.getSessionUserInfo", proxy.getUserInfo().get("usr_id"));
			proxy.setUserInfo(userInfo);
			proxy.getUserInfo().put("userToken", userToken);

			//new Session Update
			Authentication newAuth = new UsernamePasswordAuthenticationToken(proxy, authentication.getCredentials(), authentication.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(newAuth);
		}
	}	
	
	/** Get Client IP Address */
	private String getClientIpAddress(HttpServletRequest request){
		String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");  
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = request.getHeader("WL-Proxy-Client-IP"); // WebLogic
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = request.getHeader("HTTP_CLIENT_IP");  
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");  
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            ip = request.getRemoteAddr();  
        }
        return ip;  
	}		

}