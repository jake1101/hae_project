package smartsuite.security.authentication;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import smartsuite.app.common.restful.RestfulUtilService;

public class UsernameOnlyAuthenticationProcessingFilter extends
		AbstractAuthenticationProcessingFilter {

	@Inject
	RestfulUtilService restFulUtilService;
	
	private boolean postOnly;
	
	public void setPostOnly(boolean postOnly) {
		this.postOnly = postOnly;
	}

	protected UsernameOnlyAuthenticationProcessingFilter(
			String defaultFilterProcessesUrl) {
		super(defaultFilterProcessesUrl);
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
			HttpServletResponse response) throws AuthenticationException,
			IOException, ServletException {
		if (postOnly && !request.getMethod().equals("POST")) {
			throw new AuthenticationServiceException(
					"Authentication method not supported: "
							+ request.getMethod());
		}
		String username = obtainUsername(request);
		if (username == null) {
			throw new UsernameNotFoundException(username);
		}
		UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
				username, "");

		setDetails(request, authRequest);

		return this.getAuthenticationManager().authenticate(authRequest);
	}

	protected void setDetails(HttpServletRequest request,
			UsernamePasswordAuthenticationToken authRequest) {
		authRequest.setDetails(authenticationDetailsSource
				.buildDetails(request));
	}

	protected String obtainUsername(HttpServletRequest request) {
		// RAYCOM 추가
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("token", request.getParameter("token") );
		
		// 토큰에 해당하는 사용자 정보를 반환한다.
		Map<String, Object> result = restFulUtilService.callRinoOmsApi("/user/info", param);
		
		Gson gson = new Gson();
		String stringJson = gson.toJson(result.get("data"));
		
		Gson resultGson = new Gson();
		Map<String, Object> jsonObject = resultGson.fromJson(stringJson, new TypeToken<Map<String, Object>>(){}.getType());
        
		// 요청에서 로그인 username 을 추출하여 리턴
		return ((String)jsonObject.get("loginId")).toUpperCase();
		
//		if("ADMIN".equals(request.getParameter("username")) ) {
//			return request.getParameter("username");
//		}else {
//			return null;
//		}
		
		//TEST를 위해 ADMIN 셋팅
		//return "ADMIN";
	}

}
