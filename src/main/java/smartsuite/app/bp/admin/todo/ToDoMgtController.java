package smartsuite.app.bp.admin.todo;

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
 * TO-DO 관리 Controller
 */
@Controller
@RequestMapping(value="**/todo/**/")
public class ToDoMgtController {

	@Inject
	ToDoMgtService todoMgtService;
	
	/**
	 * TO-DO 그룹 목록 조회
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListTodoGroup.do")
	public @ResponseBody List<Map<String, Object>> findListTodoGroup(@RequestBody Map<String, Object> param) {
		return todoMgtService.findListTodoGroup(param);
	}
	
	/**
	 * TO-DO 그룹 목록 저장
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveListTodoGroup.do")
	public @ResponseBody Map<String, Object> saveListTodoGroup(@RequestBody Map<String, Object> param) {
		return todoMgtService.saveListTodoGroup(param);
	}
	
	/**
	 * TO-DO 그룹 목록 삭제
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "deleteListTodoGroup.do")
	public @ResponseBody Map<String, Object> deleteListTodoGroup(@RequestBody Map<String, Object> param) {
		return todoMgtService.deleteListTodoGroup(param);
	}
	
	/**
	 * TO-DO 항목 목록 조회
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListTodoFactor.do")
	public @ResponseBody List<Map<String, Object>> findListTodoFactor(@RequestBody Map<String, Object> param) {
		return todoMgtService.findListTodoFactor(param);
	}
	
	/**
	 * TO-DO 항목 목록 저장
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveListTodoFactor.do")
	public @ResponseBody Map<String, Object> saveListTodoFactor(@RequestBody Map<String, Object> param) {
		return todoMgtService.saveListTodoFactor(param);
	}
	
	/**
	 * TO-DO 항목 목록 삭제
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "deleteListTodoFactor.do")
	public @ResponseBody Map<String, Object> deleteListTodoFactor(@RequestBody Map<String, Object> param) {
		return todoMgtService.deleteListTodoFactor(param);
	}
	
	/**
	 * TO-DO 항목 별 사용자 목록 조회
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListTodoUser.do")
	public @ResponseBody List<Map<String, Object>> findListTodoUser(@RequestBody Map<String, Object> param) {
		return todoMgtService.findListTodoUser(param);
	}
	
	/**
	 * TO-DO 항목 별 사용자 목록 저장
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveListTodoUser.do")
	public @ResponseBody Map<String, Object> saveListTodoUser(@RequestBody Map<String, Object> param) {
		return todoMgtService.saveListTodoUser(param);
	}
	
	/**
	 * TO-DO 항목 별 사용자 목록 삭제
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "deleteListTodoUser.do")
	public @ResponseBody Map<String, Object> deleteListTodoUser(@RequestBody Map<String, Object> param) {
		return todoMgtService.deleteListTodoUser(param);
	}
	
	/**
	 * TO-DO 사용자 별 항목 목록 조회
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "findListTodoFactorByUser.do")
	public @ResponseBody List<Map<String, Object>> findListTodoFactorByUser(@RequestBody Map<String, Object> param) {
		return todoMgtService.findListTodoFactorByUser(param);
	}
	
	/**
	 * TO-DO 사용자 별 항목 저장/삭제
	 * @param param
	 * @return
	 */
	@RequestMapping(value = "saveListTodoFactorByUser.do")
	public @ResponseBody Map<String, Object> saveListTodoFactorByUser(@RequestBody Map<String, Object> param) {
		return todoMgtService.saveListTodoFactorByUser(param);
	}
}
