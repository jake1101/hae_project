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
@RequestMapping (value = "**/bp/serviceManage/**/")
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
	
	/**
	 * 사용여부(SVC_CTL.SVC_USE_YN)을 수정한다
	 *
	 * @author : hjh
	 * @param SVC_CTL_ID String
	 * @param SVC_USE_YN String
	 * @return the map<string, object>: result_status String
	 * @Date : 2022. 02. 24
	 * @Method Name : updateServiceUseYn
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "updateServiceUseYn.do")
	public @ResponseBody Map<String,Object> updateServiceUseYn(@RequestBody Map param) {
		return ServiceManageService.updateServiceUseYn(param);
	}
	
	/**
	 * 서비스 신청하기. 
	 *
	 * @author : jake
	 * @param param the param
	 * @Date : 2022. 3. 8
	 * @Method Name : applyService
	 */ 
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "applyService.do")
	public @ResponseBody Map<String,Object> applyService(@RequestBody Map param) {
		return ServiceManageService.applyService(param);
	}	
	
	/**
	 * 서비스카타로그별 디바이스 목록 조회
	 *
	 * @author : hjh
	 * @param SVC_CTL_ID String
	 * @param SVC_USE_YN String Optional
	 * @return the map<string, object>: result_status String, result_data List
	 * @Date : 2022. 02. 24
	 * @Method Name : getDevicesByCatalogId
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "getDevicesByCatalogId.do")
	public @ResponseBody Map<String,Object> getDevicesByCatalogId(@RequestBody Map param) {
		return ServiceManageService.getDevicesByCatalogId(param);
	}	
}
