package smartsuite.app.bp.serviceManage;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

/**
 * 서비스 관리 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author hjh
 * @see
 * @since 2022. 2. 24
 * @FileName ServiceManageController.java
 * @package smartsuite.app.bp.serviceManage
 * @변경이력 : [2022. 2. 24] hjh 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping (value = "**/bp/**/")
public class ServiceManageController {

	/** The user service. */
	@Inject
	ServiceManageService ServiceManageService;
	
	/**
	 * user list 조회를 요청한다.
	 *
	 * @author : hjh
	 * @param param the param
	 * @return the list
	 * @Date : 2022. 02. 24
	 * @Method Name : findUserList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "regSafetyServiceGroupList.do")
	public @ResponseBody Map regSafetyServiceGroupList(@RequestBody Map param) {
		return ServiceManageService.regSafetyServiceGroupList(param);
	}
	
	/**
	 * user list 조회를 요청한다.
	 *
	 * @author : hjh
	 * @param param the param
	 * @return the list
	 * @Date : 2022. 02. 24
	 * @Method Name : findUserList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findRegSafetyServiceList.do")
	public @ResponseBody List findRegSafetyServiceList(@RequestBody Map param) {
		return ServiceManageService.findRegSafetyServiceList(param);
	}
	
}
