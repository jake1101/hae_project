package smartsuite.security.authentication;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.util.WebUtils;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.shared.SharedService;
import smartsuite.security.userdetails.UserDetailsProxy;

public class DefaultAuthenticationSuccessHandler extends
		SavedRequestAwareAuthenticationSuccessHandler {

	@Inject
	private SharedService sharedService;
	
	@Inject
	public AuthenticationPostService authenticationPostService;	
	
	@Inject
	RestTemplate restTemplate;

	
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication authentication)
			throws ServletException, IOException {

		
		// 현재 로그인 성공한 user 객체 조회
		Object principal = authentication.getPrincipal();
		UserDetailsProxy proxy = null;
		if (principal instanceof UserDetails) {
			proxy = (UserDetailsProxy)principal;
		}
		
		//로케일 정보 저장
		String locale = request.getParameter("locale");
		if(locale != null){
			WebUtils.setSessionAttribute(request, SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME, StringUtils.parseLocaleString(locale));
		}
		
		// 사용자 권한에 따른 메뉴-기능-URL 권한정보 session 저장
		if(proxy != null){
			proxy.setUserRoles(sharedService.findListFunctionAndUrlByUserRoles());
			// 사용자 운영조직 정보 저장
			proxy.setUserOperOrgCodes(sharedService.findListOperOrgAll(null));
		}
		
		Map<String, Object> loginInfo = new HashMap<String, Object>();
		loginInfo.put("log_id", UUID.randomUUID().toString());
		loginInfo.put("usr_cls", (String)Auth.getCurrentUserInfo().get("usr_cls"));
		loginInfo.put("login_ip", request.getRemoteAddr());
		sharedService.insertLoginInfo(loginInfo);
		
		authenticationPostService.authenticationSuccess(request, response, authentication);
		
		//로그인 후 Rest API를 호출하여 userToken을 받아온다
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("userId", (String)Auth.getCurrentUserInfo().get("usr_id") );
		param.put("password", Auth.getCurrentUser().getPassword() );
		
		String loginUrl = URL+"users/loginByForm";
		restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
		String result = restTemplate.postForObject(loginUrl, param, String.class);
		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(result);
		String usertoken = element.getAsJsonObject().get("body").getAsJsonObject().get("userToken").getAsString();
		proxy.getUserInfo().put("userToken", usertoken);
		
		
		//System.out.println("현장 아이디 : "+Auth.getCurrentUserInfo().get("site_id"));
		
			 
//		  HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
//		
//		  String customerUrl =  URL+"site/"+Auth.getCurrentUserInfo().get("site_id"); 
//		  ResponseEntity<String>  result1 = restTemplate.exchange(customerUrl, HttpMethod.GET,httpEntity, String.class); 
//		  Gson gson = new Gson();
//		  Map<String, Object> jsonObject = gson.fromJson(result1.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
//		  Map<String, Object> jsonTmp = (Map<String, Object>) jsonObject.get("body");
//		
//		  System.out.println("resultList는? " + jsonTmp.get("timezoneOffset"));
//		  
//		  //proxy.getUserInfo().put("timezone_cd", "6");
//		  //proxy.getUserInfo().put("timezone_cd", resultMap.get("code")); 
//		  
//		  proxy.getUserInfo().put("timezone_cd", jsonTmp.get("timezoneOffset"));
//		  Authentication newAuth = new UsernamePasswordAuthenticationToken(proxy, authentication.getCredentials(), authentication.getAuthorities());
//		  SecurityContextHolder.getContext().setAuthentication(newAuth);
		 
		super.onAuthenticationSuccess(request, response, authentication);
	}
	
	
}
