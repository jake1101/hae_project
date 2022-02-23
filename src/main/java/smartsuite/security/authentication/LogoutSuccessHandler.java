package smartsuite.security.authentication;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import smartsuite.security.userdetails.UserDetailsProxy;

public class LogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler{
    
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        this.setDefaultTargetUrl("/invalidSession.do");
        
        if(authentication != null){
            Object principal = authentication.getPrincipal();
            if(principal instanceof UserDetails){
                UserDetailsProxy proxy = (UserDetailsProxy)principal;
                Map userInfo = proxy.getUserInfo();
                
                if("B".equals(userInfo.get("usr_cls"))) {
                    this.setDefaultTargetUrl("/logoutSuccess.do");
                } else {
                    this.setDefaultTargetUrl("/spLogoutSuccess.do");
                }
            }
        }
        
       super.onLogoutSuccess(request, response, authentication);
    }

}
