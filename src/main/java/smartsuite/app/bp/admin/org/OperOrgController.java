package smartsuite.app.bp.admin.org;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

/**
 * 운영조직/운영조직의 사용자/운영조직의 연결정보 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author JongKyu Kim
 * @see
 * @since 2016. 2. 4
 * @FileName OperOrgController.java
 * @package smartsuite.app.bp.admin.org
 * @변경이력 : [2016. 2. 4] JongKyu Kim 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping (value = "**/org/operorg/")
public class OperOrgController {

	/** The oper org service. */
	@Inject
	OperOrgService operOrgService;

	/**
	 * 운영조직 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 4
	 * @Method Name : findListOperOrg
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListOperOrg.do")
	public @ResponseBody List findListOperOrg(@RequestBody Map param) {
		return operOrgService.findListOperOrg(param);
	}
	
	/**
	 * 운영조직 연결을 위한 운영조직(source or target) 목록 조회를 요청한다.
	 * 
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListOperOrgForLinking.do")
	public @ResponseBody List findListOperOrgForLinking(@RequestBody Map param) {
		param.put("org_use_yn", "Y");	// 조직의 사용여부가 "Y"인 데이터만 조회해야 함
		return operOrgService.findListOperOrg(param);
	}

	/**
	 * 운영조직의 사용자 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 4
	 * @Method Name : findListOperOrgUser
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListOperOrgUser.do")
	public @ResponseBody List findListOperOrgUser(@RequestBody Map param) {
		return operOrgService.findListOperOrgUser(param);
	}

	/**
	 * 운영조직의 연결정보 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 4
	 * @Method Name : findListOperOrgLink
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListOperOrgLink.do")
	public @ResponseBody List findListOperOrgLink(@RequestBody Map param) {
		return operOrgService.findListOperOrgLink(param);
	}

	/**
	 * 운영조직 목록 저장을 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 4
	 * @Method Name : saveListOperOrg
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveListOperOrg.do")
	public @ResponseBody Map saveListOperOrg(@RequestBody Map param) {
		return operOrgService.saveListOperOrg(param);
	}

	/**
	 * 운영조직의 사용자 목록 저장을 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 4
	 * @Method Name : saveListOperOrgUser
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveListOperOrgUser.do")
	public @ResponseBody Map saveListOperOrgUser(@RequestBody Map param) {
		return operOrgService.saveListOperOrgUser(param);
	}

	/**
	 * 운영조직의 연결정보 목록 저장을 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 4
	 * @Method Name : saveListOperOrgLink
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveListOperOrgLink.do")
	public @ResponseBody Map saveListOperOrgLink(@RequestBody Map param) {
		return operOrgService.saveListOperOrgLink(param);
	}

	/**
	 * 운영조직 목록 삭제를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 4
	 * @Method Name : deleteListOperOrg
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "deleteListOperOrg.do")
	public @ResponseBody Map deleteListOperOrg(@RequestBody Map param) {
		return operOrgService.deleteListOperOrg(param);
	}

	/**
	 * 운영조직의 사용자 목록 삭제를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 4
	 * @Method Name : deleteListOperOrgUser
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "deleteListOperOrgUser.do")
	public @ResponseBody Map deleteListOperOrgUser(@RequestBody Map param) {
		return operOrgService.deleteListOperOrgUser(param);
	}

}
