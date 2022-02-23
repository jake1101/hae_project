package smartsuite.app.common.error;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

/**
 * 시스템 에러 발생 시 관리를 위한 Controller
 *
 * @author jonghyeok
 * @see
 * @since 2018.07.11
 * @FileName ErrorController.java
 * @package smartsuite.app.common.error
 * @변경이력 : [2018. 7. 11] jonghyeok 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
public class ErrorController {
	
	@Inject
	ErrorService errorService;
	
	/**
	 * Browser Exception 저장, 권한없는 사용자도 저장이 필요
	 */
	@RequestMapping (value = "/**/saveBrowserErrorInfo.do", method = RequestMethod.POST)
	public @ResponseBody Map saveBrowserErrorInfo(HttpServletRequest request, @RequestBody Map param) {
		errorService.saveBrowserErrorInfo(request, param);
		return null; 
	}
	
	/**
	 * 서버 에러 리스트 조회
	 */
	@AuthCheck(authCode=Const.READ)
	@RequestMapping (value = "/**/findListServerError.do", method = RequestMethod.POST)
	public @ResponseBody List findListError(@RequestBody Map param) {
		param.put("err_cls", "S");
		return errorService.findListError(param);
	}
	
	/**
	 * 브라우저 에러 리스트 조회 
	 */
	@AuthCheck(authCode=Const.READ)
	@RequestMapping (value = "/**/findListBrowserError.do", method = RequestMethod.POST)
	public @ResponseBody List findListBrowserError(@RequestBody Map param) {
		param.put("err_cls", "B");
		return errorService.findListError(param);
	}
	
	/**
	 * Error 조회 
	 */
	@AuthCheck(authCode=Const.READ)
	@RequestMapping (value = "/**/findError.do", method = RequestMethod.POST)
	public @ResponseBody Map findError(@RequestBody Map param) {
		return errorService.findError(param);
	}
	
	/**
	 * Error 리스트 삭제
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "/**/deleteListError.do")
	public @ResponseBody Map deleteListError(@RequestBody Map saveParam){
		return errorService.deleteListError(saveParam);
	}
	
	/**
	 * Error 리스트 삭제
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "/**/occurError.do")
	public @ResponseBody Map occurError(@RequestBody Map saveParam){
		return errorService.occurError(saveParam);
	}
	
	/**
	 * Error 업데이트
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "/**/updateError.do")
	public @ResponseBody Map updateError(@RequestBody Map saveParam){
		return errorService.updateError(saveParam);
	}
}
