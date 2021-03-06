package smartsuite.security.authentication;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Enumeration;
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
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.FlashMap;
import org.springframework.web.servlet.FlashMapManager;
import org.springframework.web.servlet.support.RequestContextUtils;
import org.springframework.web.servlet.support.SessionFlashMapManager;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import smartsuite.app.common.shared.SharedService;
import smartsuite.security.userdetails.UserDetailsProxy;

public class UsernameOnlyAuthenticationSuccessHandler extends
		SavedRequestAwareAuthenticationSuccessHandler {
	@Inject
	private SharedService sharedService;
	
	@Inject
	RestTemplate restTemplate;
	
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	/*private RequestCache requestCache = new HttpSessionRequestCache();*/
	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
	
	private String singlePageTargetUrl;
	
    protected final String getSinglePageTargetUrl() {
        return singlePageTargetUrl;
    }

    public void setSinglePageTargetUrl(String targetUrl) {
        this.singlePageTargetUrl = targetUrl;
    }
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication authentication)
			throws ServletException, IOException {
		
		// ?????? ????????? ????????? user ?????? ??????
		Object principal = authentication.getPrincipal();
		UserDetailsProxy proxy = null;
		if (principal instanceof UserDetails) {
			proxy = (UserDetailsProxy)principal;
		}
		
		// ????????? ????????? ?????? ??????-??????-URL ???????????? session ??????
		if(proxy != null){
			proxy.setUserRoles(sharedService.findListFunctionAndUrlByUserRoles());
			// ????????? ???????????? ?????? ??????
			proxy.setUserOperOrgCodes(sharedService.findListOperOrgAll(null));
			
			/**
			 * RAYCOM ??????
			 * raycom token ?????? ??????
			 * ESE ??????, rino token ?????? ??????
			 */
			// ????????? ??? Rest API??? ????????????, raycom userToken??? ????????????
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
			
			// ESE token ??????
			proxy.getUserInfo().put("rinoToken", request.getParameter("token") );
			
			proxy.getUserInfo().put("ssoYn", "Y");
		}
		
		Map<String, Object> loginInfo = new HashMap<String, Object>();
		loginInfo.put("log_id", UUID.randomUUID().toString());
		loginInfo.put("usr_cls", (String)Auth.getCurrentUserInfo().get("usr_cls"));
		loginInfo.put("login_ip", request.getRemoteAddr());
		sharedService.insertLoginInfo(loginInfo);
		
		//?????? ???????????? ??????
		FlashMap flashMap = new FlashMap();
		Enumeration params = request.getParameterNames();
		while (params.hasMoreElements()){
			String name = (String)params.nextElement();
		    flashMap.put(name, request.getParameter(name));
		}
		
		/*
		 * ?????? ??? ?????? ?????? ??????
		 * redirect ??? url??? ??????????????? ???????????? ????????? flashMap??? ???????????? ????????????.
		 * 
		 * menu src ???  parameters??? flashMap??? setting
		 * test??? ??????  menuSrc setting
		 */

		
		
		
		
		
		FlashMapManager flashMapManager = RequestContextUtils.getFlashMapManager(request);
		if (flashMapManager == null) {
			flashMapManager = new SessionFlashMapManager();
		}
		flashMapManager.saveOutputFlashMap(flashMap, request, response);
		
		super.onAuthenticationSuccess(request, response, authentication);
	}
	
	protected void handle(HttpServletRequest request, 
		      HttpServletResponse response, Authentication authentication)
		      throws IOException {
		  
        String targetUrl = determineTargetUrl(request.getParameter("useSinglePage"));
 
        if (response.isCommitted()) {
            logger.debug(
              "Response has already been committed. Unable to redirect to "
              + targetUrl);
            return;
        }
 
        redirectStrategy.sendRedirect(request, response, targetUrl);
    }
	
	protected String determineTargetUrl(String useSinglePage) {
        if ("true".equals(useSinglePage)) {
            return getSinglePageTargetUrl();
        } else  {
            return getDefaultTargetUrl();
        } 
    }
}
