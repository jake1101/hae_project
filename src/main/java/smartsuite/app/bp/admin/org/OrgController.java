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
 * 조직유형/조직/부서 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author JongKyu Kim
 * @see
 * @since 2016. 2. 2
 * @FileName OrgController.java
 * @package smartsuite.app.bp.admin.org
 * @변경이력 : [2016. 2. 2] JongKyu Kim 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping (value = "**/org/")
public class OrgController {

	/** The org service. */
	@Inject
	OrgService orgService;

	/**
	 * 조직유형 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the org type list
	 * @Date : 2016. 2. 2
	 * @Method Name : findListOrgType
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "org/findListOrgType.do")
	public @ResponseBody List findListOrgType(@RequestBody Map param) {
		return orgService.findListOrgType(param);
	}

	/**
	 * 조직유형 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the org type list
	 * @Date : 2016. 2. 2
	 * @Method Name : getAllListOrgType
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "org/getAllListOrgType.do")
	public @ResponseBody List getAllListOrgType(@RequestBody Map param) {
		return orgService.findListOrgType(param);
	}

	/**
	 * 조직 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the org list
	 * @Date : 2016. 2. 2
	 * @Method Name : findListOrg
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "org/findListOrg.do")
	public @ResponseBody List findListOrg(@RequestBody Map param) {
		return orgService.findListOrg(param);
	}

	/**
	 * 조직 상세정보 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the org
	 * @Date : 2016. 2. 2
	 * @Method Name : findOrg
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "org/findOrg.do")
	public @ResponseBody Map findOrg(@RequestBody Map param) {
		return orgService.findOrg(param);
	}

	/**
	 * 조직유형 목록 저장을 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListOrgType
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "org/saveListOrgType.do")
	public @ResponseBody Map saveListOrgType(@RequestBody Map param) {
		return orgService.saveListOrgType(param);
	}

	/**
	 * 운영조직 상세정보 저장을 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : saveOrg
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "org/saveOrg.do")
	public @ResponseBody Map saveOrg(@RequestBody Map param) {
		return orgService.saveOrg(param);
	}

	/**
	 * 조직유형 목록 삭제를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteOrgType
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "org/deleteListOrgType.do")
	public @ResponseBody Map deleteListOrgType(@RequestBody Map param) {
		return orgService.deleteListOrgType(param);
	}

	/**
	 * 조직 목록 삭제를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteListOrg
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "org/deleteListOrg.do")
	public @ResponseBody Map deleteListOrg(@RequestBody Map param) {
		return orgService.deleteListOrg(param);
	}

	/**
	 * 부서 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the dept list
	 * @Date : 2016. 2. 2
	 * @Method Name : findListDept
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "dept/findListDept.do")
	public @ResponseBody List findListDept(@RequestBody Map param) {
		return orgService.findListDept(param);
	}

	/**
	 * 부서 목록 저장을 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListDept
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "dept/saveListDept.do")
	public @ResponseBody Map saveListDept(@RequestBody Map param) {
		return orgService.saveListDept(param);
	}

	/**
	 * 부서 목록 삭제를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteListDept
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "dept/deleteListDept.do")
	public @ResponseBody Map deleteListDept(@RequestBody Map param) {
		return orgService.deleteListDept(param);
	}

}
