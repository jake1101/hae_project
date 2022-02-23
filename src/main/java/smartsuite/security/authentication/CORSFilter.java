package smartsuite.security.authentication;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet Filter implementation class CORSFilter
 */
public class CORSFilter implements Filter {

    /**
     * Default constructor. 
     */
    public CORSFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}
        
	String[] allowOrigins = { // Request를 보낼 Origin 주소 리스트
			"http://210.97.42.250:11910",
			"https://sc.hismart.co.kr"
	};
	
	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
//        
//		String clientOrigin = req.getHeader("origin"); // Get client's origin
//		if(clientOrigin == null || clientOrigin.isEmpty()){
//			chain.doFilter(request, response);
//		}else{
//			for (String origin : allowOrigins) {
//    				if(origin.contains(clientOrigin)){
//	    				res.setHeader("Access-Control-Allow-Origin", clientOrigin);
						res.setHeader("Access-Control-Allow-Origin", "*");
	    				res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
			        	res.setHeader("Access-Control-Max-Age", "3600");
			        	res.setHeader("Access-Control-Allow-Headers", "x-requested-with, origin, content-type, accept, authorization, x-csrf-token");
			        	res.addHeader("Access-Control-Allow-Credentials", "true");
//    					break;
//	    			}
//	    		}
			chain.doFilter(request, response);
//		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
