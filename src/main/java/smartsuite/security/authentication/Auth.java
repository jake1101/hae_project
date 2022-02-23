package smartsuite.security.authentication;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import smartsuite.security.userdetails.User;
import smartsuite.security.userdetails.UserDetailsProxy;
import smartsuite.spring.tenancy.context.TenancyContext;
import smartsuite.spring.tenancy.context.TenancyContextHolder;
import smartsuite.spring.tenancy.core.Tenant;

public final class Auth {
	
	private Auth(){}
	
	public static User getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}
		Object principal = authentication.getPrincipal();
		if (principal instanceof User) {
			return (User) principal;
		}
		return null;
	}

	public static Map<String,Object> getCurrentUserInfo() {
		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}
		Object principal = authentication.getPrincipal();
		if (principal instanceof UserDetails) {
			UserDetailsProxy proxy = (UserDetailsProxy)principal;
			return proxy.getUserInfo();
		}
		return null;
	}
	
	public static List<String> getCurrentUserAuthorities() {
		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}
		List<String> roles = new ArrayList<String>();
		for (GrantedAuthority role : authentication.getAuthorities()) {
			roles.add(role.getAuthority());
		}
		return roles;
	}
	
	public static List<Map<String,Object>> getCurrentUserRoles() {
		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}
		Object principal = authentication.getPrincipal();
		if (principal instanceof UserDetails) {
			UserDetailsProxy proxy = (UserDetailsProxy)principal;
			return proxy.getUserRoles();
		}
		return null;
	}	
	
	public static boolean hasRole(String menuCode, String authCode) {
		List<Map<String,Object>> roles = getCurrentUserRoles();
		if(roles == null)
			return false;
		// To-Do : 메뉴코드, 기능코드 기준으로 권한 체크 추가
		for (Map item : roles) {
			if(menuCode.equals(item.get("menu_cd")) && authCode.equals(item.get("func_cd"))) {
				return true;
			}
		}
		return false;
	}	
	
	public static String getCurrentUserName() {
		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}
		Object principal = authentication.getPrincipal();
		if (principal instanceof UserDetails) {
			UserDetailsProxy proxy = (UserDetailsProxy)principal;
			return proxy.getUsername();
		}
		return null;
	}

	public static String getCurrentTenantId(){
		TenancyContext tenancyContext = TenancyContextHolder.getContext();
		if (tenancyContext == null) {
			return TenancyContextHolder.getDefaultTenant().getId();
		}
		Tenant tenant = tenancyContext.getTenant();
		if (tenant == null) {
			return TenancyContextHolder.getDefaultTenant().getId();
		}
		return tenant.getId();
	}
	
	public static List<Map<String,Object>> getCurrentUserOperOrgCodes() {
		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}
		Object principal = authentication.getPrincipal();
		if (principal instanceof UserDetails) {
			UserDetailsProxy proxy = (UserDetailsProxy)principal;
			return proxy.getUserOperOrgCodes();
		}
		return null;
	}	
}
