package smartsuite.exception;

import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.util.matcher.ELRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;


@ControllerAdvice
public class SpringWebExceptionHandler {
	private static final Log LOG = LogFactory.getLog(SpringWebExceptionHandler.class);
	private RequestMatcher requestMatcher = new ELRequestMatcher("hasHeader('X-Requested-With', 'XMLHttpRequest')");
	ExceptionManager exceptionManager; 
	
	public void setExceptionManager(ExceptionManager exceptionManager){
		this.exceptionManager = exceptionManager;
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(
			HttpServletRequest request, HttpServletResponse response, Exception exception) {
		
		LOG.error(exception.getMessage(), exception);		
		if(requestMatcher.matches(request)) {
			return new ResponseEntity<Map<String,Object>>(exceptionManager.handle(request, exception), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		ModelAndView model = new ModelAndView();
        model.setViewName("error/" + HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		return new ResponseEntity<ModelAndView>(model, HttpStatus.INTERNAL_SERVER_ERROR);
	}	
	
	@ExceptionHandler(ServletException.class)
	public ModelAndView handleServletException(
			HttpServletRequest request, HttpServletResponse response, Exception exception) {
		
		LOG.error(exception.getMessage(), exception);		
		ModelAndView model = new ModelAndView();
        model.setViewName("error/" + HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        
        return model;
	}
}
