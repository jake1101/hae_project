package smartsuite.app.bp.admin.code;

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
 * MultiLangMgt 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author JuEung Kim
 * @see
 * @since 2016. 6. 15
 * @FileName MultiLangMgtController.java
 * @package smartsuite.app.bp.admin.code
 * @변경이력 : [2016. 6. 15] JuEung Kim 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/bp/**/")
public class MultiLangMgtController {

	/** The multi lang mgt service. */
	@Inject
	MultiLangMgtService multiLangMgtService;

	/**
	 * 다국어관리 목록 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 6. 15
	 * @Method Name : findListMultiLang
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListMultiLang.do")
	public @ResponseBody List findListMultiLang(@RequestBody Map param) {
		return multiLangMgtService.findListMultiLang(param);
	}

	/**
	 * 다국어관리 목록 저장을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 6. 15
	 * @Method Name : saveListMultiLang
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListMultiLang.do")
	public @ResponseBody Map saveListMultiLang(@RequestBody Map param) {
		return multiLangMgtService.saveListMultiLang(param);
	}

	/**
	 * 다국어관리 목록 삭제를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 6. 15
	 * @Method Name : deleteListMultiLang
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteListMultiLang.do")
	public @ResponseBody Map deleteListMultiLang(@RequestBody Map param) {
		return multiLangMgtService.deleteListMultiLang(param);
	}
	
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findMessageList.do")
	public @ResponseBody List findMessageList(@RequestBody Map param) {
		return multiLangMgtService.findMessageList(param);
	}
	
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveMessageList.do")
	public @ResponseBody Map saveMessageList(@RequestBody Map param) {
		return multiLangMgtService.saveMessageList(param);
	}

}