package smartsuite.app.bp.admin.job;

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
 * 직무관리 하는 컨트롤러 Class입니다.
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
@RequestMapping(value="**/bp/**/")
public class JobController {

	/** 직무관리 service. */
	@Inject
	JobService jobService;

	/**
	 * 직무 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the oper unit list
	 * @Date : 2016. 2. 2
	 * @Method Name : findOperUnitList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListJob.do")
	public @ResponseBody List findListJob(@RequestBody Map param) {
		return jobService.findListJob(param);
	}

	/**
	 * 직무 목록 저장을 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListJob
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping (value = "saveListJob.do")
	public @ResponseBody Map saveListJob(@RequestBody Map param) {
		return jobService.saveListJob(param);
	}	
	
	/**
	 * 직무 목록 삭제를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 18
	 * @Method Name : deleteListJob
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping (value = "deleteListJob.do")
	public @ResponseBody Map deleteListJob(@RequestBody Map param) {
		return jobService.deleteListJob(param);
	}
	
	
	/**
	 * 직무담당자 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 19
	 * @Method Name : findListJobUser
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListJobUser.do")
	public @ResponseBody List findListJobUser(@RequestBody Map param){
		return jobService.findListJobUser(param);
	}
	
	/**
	 * 직무담당자 저장을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 19
	 * @Method Name : saveListJobUser
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping (value = "saveListJobUser.do")
	public @ResponseBody Map saveListJobUser(@RequestBody Map param) {
		return jobService.saveListJobUser(param);
	}
	
	
	/**
	 * 직무담당자 삭제를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 19
	 * @Method Name : deleteListJobUser
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping (value = "deleteListJobUser.do")
	public @ResponseBody Map deleteListJobUser(@RequestBody Map param) {
		return jobService.deleteListJobUser(param);
	}
	
	
	/**
	 * 사용중인 직무 목록 조회를 요청한다.
	 *
	 * @author : mgPark
	 * @param param the param
	 * @return the job list
	 * @Date : 2016. 2. 2
	 * @Method Name : findListUsedJob
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "**/findListUsedJob.do")
	public @ResponseBody List findListUsedJob(@RequestBody Map param) {
		return jobService.findListUsedJob(param);
	}
	
	/**
	 * 직무별 품목목록 조회를 요청한다.
	 *
	 * @author : mgPark
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 19
	 * @Method Name : findListJobItem
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "**/jobitem/findListJobItem.do")
	public @ResponseBody List findListJobItem(@RequestBody Map param){
		return jobService.findListJobItem(param);
	}
	
	/**
	 * 직무와 연결된 품목목록 삭제를 요청한다.
	 *
	 * @author : mgPark
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 19
	 * @Method Name : deleteListItemFromJob
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping (value = "**/jobitem/deleteListItemFromJob.do")
	public @ResponseBody Map deleteListItemFromJob(@RequestBody Map param) {
		return jobService.deleteListItemFromJob(param);
	}
	
	/**
	 * 직무와 연결할 품목목록 저장을 요청한다.
	 *
	 * @author : mgPark
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 19
	 * @Method Name : saveListItemToJob
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping (value = "**/jobitem/saveListItemToJob.do")
	public @ResponseBody Map saveListItemToJob(@RequestBody Map param) {
		return jobService.saveListItemToJob(param);
	}
}