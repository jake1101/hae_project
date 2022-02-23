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
 * Menu 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author Yeon-u Kim
 * @see
 * @since 2016. 2. 4
 * @FileName MenuController.java
 * @package smartsuite.app.bp.admin.auth
 * @변경이력 : [2016. 2. 4] Yeon-u Kim 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping (value = "**/auth/menu/")
public class MenuController {

	/** The menu service. */
	@Inject
	MenuService menuService;

	/** The menu-func service. */
	@Inject
	MenuFuncService menuFuncService;

	/**
	 * list menu 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 4
	 * @Method Name : findListMenu
	 */

	/**
	 * TODO 추후 일괄 적용 예정
	 * @PreAuthorize("isRoleAdmin() and isAllowIp()")
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListMenu.do")
	public @ResponseBody List findListMenu(@RequestBody Map param) {
		return menuService.findListMenu(param);
	}

	/**
	 * list menu 삭제를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param saveParam the save param
	 * @Date : 2016. 2. 11
	 * @Method Name : deleteListMenu
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "deleteListMenu.do")
	public @ResponseBody Map deleteListMenu(@RequestBody Map saveParam) {
		return menuService.deleteListMenu(saveParam);
	}

	/**
	 * list menu 저장을 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param saveParam the save param
	 * @return the binding result
	 * @Date : 2016. 2. 4
	 * @Method Name : saveListMenu
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveListMenu.do")
	public @ResponseBody Map saveListMenu(@RequestBody Map saveParam) {

		BindingResult result = menuService.validateMenu(saveParam);
		Map<String, Object> resultMap = new HashMap<String, Object>();

		if (result.hasErrors()) {
			resultMap.put(Const.RESULT_STATUS, Const.FAIL); // 중복
			resultMap.put(Const.RESULT_MSG, "STD.ADM1039"); //중복된 메뉴코드가 존재합니다.
		} else {
			menuService.saveListMenu(saveParam);
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		}

		return resultMap;
	}

	/**
	 * 메뉴기능 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the menu func list
	 * @Date : 2016. 2. 2
	 * @Method Name : findMenuFuncList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListMenuFunc.do")
	public @ResponseBody List findListMenuFunc(@RequestBody Map param) {
		return menuFuncService.findListMenuFunc(param);
	}

	/**
	 * list menu ptrn 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2018. 3. 27
	 * @Method Name : findListMenuPtrn
	 */
	@AuthCheck(authCode = Const.READ)
	@RequestMapping(value="findListMenuPtrn.do")
	public @ResponseBody List findListMenuPtrn(@RequestBody Map param){
		return menuFuncService.findListMenuPtrn(param);
	}
	
	/**
	 * list menu func ptrn 저장을 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2018. 3. 27
	 * @Method Name : saveListMenuFuncPtrn
	 */
	@AuthCheck(authCode = Const.SAVE)
	@RequestMapping(value="saveListMenuFuncPtrn.do")
	public @ResponseBody Map saveListMenuFuncPtrn(@RequestBody Map param){
		return menuFuncService.saveListMenuFuncPtrn(param);
	}
	/**
	 * 메뉴기능 목록 저장을 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListMenuFunc
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveListMenuFunc.do")
	public @ResponseBody Map saveListMenuFunc(@RequestBody Map param) {
		return menuFuncService.saveListMenuFunc(param);
	}

	/**
	 * 메뉴기능 목록 삭제를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteListMenuFunc
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "deleteListMenuFunc.do")
	public @ResponseBody Map deleteListMenuFunc(@RequestBody Map param) {
		return menuFuncService.deleteListMenuFunc(param);
	}
}
