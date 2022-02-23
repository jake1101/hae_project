package smartsuite.app.bp.admin.manual;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.bp.admin.auth.MenuService;
import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

/**
 * Manual 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author JuEung Kim
 * @see 
 * @since 2016. 6. 28
 * @FileName ManualController.java
 * @package smartsuite.app.bp.admin.manual
 * @변경이력 : [2016. 6. 28] JuEung Kim 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping (value = "**/bp/**")
public class ManualController {

	/** The menu service. */
	@Inject
	MenuService menuService;
	
	/** The manual service. */
	@Inject
	ManualService manualService;

	/**
	 * 메뉴목록을 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 6. 28
	 * @Method Name : findListMenu
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListManualMenu.do")
	public @ResponseBody List findListMenu(@RequestBody Map param) {
		return menuService.findListMenu(param);
	}
	
	/**
	 * 해당 메뉴의 메뉴얼을 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 6. 28
	 * @Method Name : findInfoManual
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findInfoManual.do")
	public @ResponseBody Map findInfoManual(@RequestBody Map param) {
		Map result = new HashMap<String, Object>();
		
		// 메뉴얼 관리 데이터 조회
		result.put("manualInfo", manualService.findInfoManual(param) );
		
		// 메뉴얼 차수 콤보 데이터 조회
		result.put("mnlRevCombo", manualService.findListMnlRevCombo(param) );
		
		return result;
	}
	
	/**
	 * 메뉴얼 데이터를 저장을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 6. 29
	 * @Method Name : saveInfoManual
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping (value = "saveInfoManual.do")
	public @ResponseBody Map saveInfoManual(@RequestBody Map param) {
		return manualService.saveInfoManual(param);
	}
	
	/**
	 * 메뉴얼 Revision 저장을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 6. 29
	 * @Method Name : saveInfoManualRev
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping (value = "saveInfoManualRev.do")
	public @ResponseBody Map saveInfoManualRev(@RequestBody Map param) {
		return manualService.saveInfoManualRev(param);
	}
	
}
