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
 * 운영단위 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author JongKyu Kim
 * @see
 * @since 2016. 2. 2
 * @FileName OperUnitController.java
 * @package smartsuite.app.bp.admin.org
 * @변경이력 : [2016. 2. 2] JongKyu Kim 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping (value = "**/org/operunit/")
public class OperUnitController {

	/** The oper unit service. */
	@Inject
	OperUnitService operUnitService;

	/**
	 * 운영단위 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the oper unit list
	 * @Date : 2016. 2. 2
	 * @Method Name : findOperUnitList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListOperUnit.do")
	public @ResponseBody List findListOperUnit(@RequestBody Map param) {
		return operUnitService.findListOperUnit(param);
	}

	/**
	 * 운영단위 목록 조회를 요청한다. (코드성 조회)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the oper unit list
	 * @Date : 2016. 2. 2
	 * @Method Name : getAllListOperUnit
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "getAllListOperUnit.do")
	public @ResponseBody List getAllListOperUnit(@RequestBody Map param) {
		return operUnitService.findListOperUnitCode(param);
	}

	/**
	 * 운영단위 목록 저장을 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListOperUnit
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveListOperUnit.do")
	public @ResponseBody Map saveListOperUnit(@RequestBody Map param) {
		return operUnitService.saveListOperUnit(param);
	}

	/**
	 * 운영단위 목록 삭제를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteListOperUnit
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "deleteListOperUnit.do")
	public @ResponseBody Map deleteListOperUnit(@RequestBody Map param) {
		return operUnitService.deleteListOperUnit(param);
	}

}