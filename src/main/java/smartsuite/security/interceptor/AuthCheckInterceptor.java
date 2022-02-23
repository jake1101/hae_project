package smartsuite.security.interceptor;

import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.google.common.collect.Maps;

import smartsuite.app.bp.admin.auth.RoleService;
import smartsuite.security.annotation.AuthCheck;
import smartsuite.security.authentication.Auth;

public class AuthCheckInterceptor extends HandlerInterceptorAdapter {
	
	@Inject
	RoleService roleService;
	
    //주로 preHandle()에 로직을 작성할 것이다.
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		HandlerMethod handlerMethod = (HandlerMethod) handler;
        //현재 호출된 핸들러 메서드에 해당 어노테이션이 존재하는지 체크
		AuthCheck authCheckAnnotation = handlerMethod.getMethodAnnotation(AuthCheck.class);
        //현재 호출된 핸들러 클래스에 해당 어노테이션이 존재하는지 체크
		authCheckAnnotation = (authCheckAnnotation == null) ? handlerMethod.getBeanType().getAnnotation(AuthCheck.class) : authCheckAnnotation;
		
		/*
		 * 아래 조건에 해당할 경우 이 Interceptor를 실행하지 않고 SKIP한다.
		 */
		if(authCheckAnnotation == null){ /* 메서드에도, 클래스에도 어노테이션이 없을 경우 */
			return super.preHandle(request, response, handlerMethod); /* 바이패스 */
		}
		
		/*
		 * 어노테이션 사용시 괄호 안에 인수로 입력한 값을 활용하는 예시 (예: @AuthCheck(authCode = Const.READ))
		 */
		String authCode = authCheckAnnotation.authCode();
		String menuCode = request.getHeader("menucode");
		RequestMapping requestMappingAnnotation = handlerMethod.getMethodAnnotation(RequestMapping.class);
		String [] urls = requestMappingAnnotation.value(); 
		/*
		 * To-DO : 
		 * requestBody 에서 menuCode 추출 하는 법 수정
		 * menuCode 가 넘어오지 않는 경우 권한 체크 기준 필요
		 */		
		if(authCode != null && !"".equals(authCode) && menuCode != null && !"".equals(menuCode)){
			boolean isPass = Auth.hasRole(menuCode, authCode);
			if(!isPass) {
				response.setStatus(401);
				return false;
			}
			for(String url : urls) {
				boolean isUrlPass = Auth.hasRole(menuCode, url);
				if(!isUrlPass) {
					isPass = isUrlPass;
					
					/* url 수집을 중단하려면 주석처리 */
					Map<String,String> pattern = Maps.newHashMap();
					pattern.put("menu_cd", menuCode);
					pattern.put("call_ptrn", url);
					if(!roleService.hasCallPattern(pattern)) {
						roleService.saveCallPattern(pattern);
					}
					/* url 수집을 중단하려면 주석처리 */
				}
			}
			//수집시점에는 통과하도록 함
			//if(!isPass) {
			//	response.setStatus(401);
			//	return false;
			//}
			
		}
        return true; //preHandle()에서 false를 리턴하면 DispatcherServlet은 Interceptor가 알아서 response를 처리했다고 간주한다.

	}
}
