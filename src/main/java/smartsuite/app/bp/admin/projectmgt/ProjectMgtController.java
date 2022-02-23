package smartsuite.app.bp.admin.projectmgt;

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
 * 프로젝트 관리 관련 처리를 하는 컨트롤러 Class입니다.
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping (value = "**/bp/common/projectMgt/**")
public class ProjectMgtController {

	@Inject
	ProjectMgtService projectMgtService;

	/**
	 * 프로젝트 목록을 조회한다.
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findProjectList.do")
	public @ResponseBody List findProjectList(@RequestBody Map param) {
		return projectMgtService.findProjectList(param);
	}
	
	/**
	 * 프로젝트 목록을 삭제한다.
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "deleteProjectList.do")
	public @ResponseBody void deleteProjectList(@RequestBody Map param) {
		projectMgtService.deleteProjectList(param);
	}
	
	/**
	 * 프로젝트 상세 정보를 조회한다.
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findProject.do")
	public @ResponseBody Map findProject(@RequestBody Map param) {
		return projectMgtService.findProject(param);
	}
	
	/**
	 * 프로젝트 상세 정보를 저장한다.
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveProject.do")
	public @ResponseBody void saveProject(@RequestBody Map param) {
		projectMgtService.saveProject(param);
	}
	
	/**
	 * 프로젝트를 삭제한다.
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "deleteProject.do")
	public @ResponseBody void deleteProject(@RequestBody Map param) {
		projectMgtService.deleteProject(param);
	}
	
	/**
	 * 프로젝트 담당자 정보를 조회한다.
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findChrList.do")
	public @ResponseBody List findChrList(@RequestBody Map param) {
		return projectMgtService.findChrList(param);
	}
	
	/**
	 * 프로젝트 담당자 정보를 저장한다.
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "saveChrList.do")
	public @ResponseBody void saveChrList(@RequestBody Map param) {
		projectMgtService.saveChrList(param);
	}
	
	/**
	 * 프로젝트 담당자 정보를 삭제한다.
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "deleteChrList.do")
	public @ResponseBody void deleteChrList(@RequestBody Map param) {
		projectMgtService.deleteChrList(param);
	}
}
