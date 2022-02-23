package smartsuite.app.bp.admin.auth;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

/**
 * Role 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author Yeon-u Kim
 * @see
 * @since 2016. 2. 3
 * @FileName RoleController.java
 * @package smartsuite.app.bp.admin.auth
 * @변경이력 : [2016. 2. 3] Yeon-u Kim 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping (value = "**/bp/**/")
public class RoleController {

	/** The role service. */
	@Inject
	RoleService roleService;

	/** The role func service. */
	@Inject
	RoleFuncService roleFuncService;

	/**
	 * list role 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 4
	 * @Method Name : findListRole
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListRole.do")
	public @ResponseBody List findListRole(@RequestBody Map param) {
		return roleService.findListRole(param);
	}

	/**
	 * role 삭제를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param saveParam the save param
	 * @Date : 2016. 2. 11
	 * @Method Name : deleteRole
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "deleteListRole.do")
	public @ResponseBody Map deleteListRole(@RequestBody Map saveParam) {
		return roleService.deleteListRole(saveParam);
	}

	/**
	 * list role 저장을 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 4
	 * @Method Name : saveListRole
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveListRole.do")
	public @ResponseBody Map<String, Object> saveListRole(@RequestBody Map param) {
		BindingResult result = roleService.validate(param);
		Map<String, Object> resultMap = new HashMap<String, Object>();

		if (result.hasErrors()) {
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			resultMap.put(Const.RESULT_MSG, "STD.ADM1040"); //중복된 롤코드가 존재합니다.
		} else {
			roleService.saveListRole(param);
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		}

		return resultMap;
	}

	/**
	 * list role menu 저장을 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param roleMenuDatas the role menu datas
	 * @param roleId the role id
	 * @Date : 2016. 2. 11
	 * @Method Name : saveListRoleMenu
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveListRoleMenu.do")
	public @ResponseBody Map<String, Object> saveListRoleMenu(@RequestBody Map saveParam) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		roleService.saveListRoleMenu(saveParam);
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * list role user 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 11
	 * @Method Name : findListRoleUser
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListRoleUser.do")
	public @ResponseBody List findListRoleUser(@RequestBody Map param) {
		return roleService.findListRoleUser(param);
	}

	/**
	 * list role user 저장을 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @Date : 2016. 2. 11
	 * @Method Name : saveListRoleUser
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveListRoleUser.do")
	public @ResponseBody Map<String, Object> saveListRoleUser(@RequestBody Map saveParam) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		roleService.saveListRoleUser(saveParam);
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * list role dept 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 11
	 * @Method Name : findListRoleDept
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListRoleDept.do")
	public @ResponseBody List findListRoleDept(@RequestBody Map param) {
		return roleService.findListRoleDept(param);
	}

	/**
	 * list role dept 저장을 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param params the params
	 * @Date : 2016. 2. 11
	 * @Method Name : saveListRoleDept
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveListRoleDept.do")
	public @ResponseBody Map<String, Object> saveListRoleDept(@RequestBody Map saveParam) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		roleService.saveListRoleDept(saveParam);
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListRoleMenu.do")
	public @ResponseBody List findListRoleMenu(@RequestBody Map param) {
		return roleService.findListRoleMenu(param);
	}

	/**
	 * 롤 메뉴기능 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 3. 10
	 * @Method Name : findListRoleMenuWithMenuFunc
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListRoleMenuWithMenuFunc.do")
	public @ResponseBody List findListRoleMenuWithMenuFunc(@RequestBody Map param) {
		return roleService.findListRoleMenuWithMenuFunc(param);
	}

	/**
	 * 롤 메뉴기능 목록 저장을 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 10
	 * @Method Name : saveListRoleMenuFunc
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveListRoleMenuFunc.do")
	public @ResponseBody Map saveListRoleMenuFunc(@RequestBody Map param) {
		return roleFuncService.saveListRoleFunc(param);
	}
	
	/**
	 * 롤/현장 권한목록을 조회한다.
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListRoleSite.do")
	public @ResponseBody List findListRoleSite(@RequestBody Map param) {
		return roleService.findListRoleSite(param);
	}
	
	/**
	 * 롤/현장권한을 저장한다.
	 * @param saveParam
	 * @return
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveListRoleSite.do")
	public @ResponseBody Map<String, Object> saveListRoleSite(@RequestBody Map saveParam) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		roleService.saveListRoleSite(saveParam);
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
}
