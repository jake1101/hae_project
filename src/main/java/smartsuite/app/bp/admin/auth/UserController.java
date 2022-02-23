package smartsuite.app.bp.admin.auth;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

/**
 * User 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author Yeon-u Kim
 * @see
 * @since 2016. 2. 3
 * @FileName UserController.java
 * @package smartsuite.app.bp.admin.auth
 * @변경이력 : [2016. 2. 3] Yeon-u Kim 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping (value = "**/bp/**/")
public class UserController {

	/** The user service. */
	@Inject
	UserService userService;

	/**
	 * user list 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 3
	 * @Method Name : findUserList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListUser.do")
	public @ResponseBody List findListUser(@RequestBody Map param) {
		return userService.findListUser(param);
	}

	/**
	 * user by user id 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 11
	 * @Method Name : findUserByUserId
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findUserByUserId.do")
	public @ResponseBody Map findUserByUserId(@RequestBody Map param) {
		return userService.findUserByUserId(param);
	}

	/**
	 * user list 삭제를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @Date : 2016. 2. 3
	 * @Method Name : deleteUserList
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "deleteListUser.do")
	public @ResponseBody Map deleteListUser(@RequestBody Map param) {
		return userService.deleteListUser(param);
	}

	/**
	 * user 저장을 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the int
	 * @Date : 2016. 2. 3
	 * @Method Name : saveUser
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveUser.do")
	public @ResponseBody Map saveUser(@RequestBody Map param) {
		return userService.saveUser(param);
	}
	
	/**
	 * 사용자별 롤 적용 현황을 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 11
	 * @Method Name : findListUserRole
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListUserRole.do")
	public @ResponseBody List findListUserRole(@RequestBody Map param) {
		return userService.findListUserRole(param);
	}

	/**
	 * list user role 저장을 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @Date : 2016. 2. 11
	 * @Method Name : saveUserRole
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveUserRole.do")
	public @ResponseBody void saveUserRole(@RequestBody Map param) {
		userService.saveUserRole(param);
	}

	/**
	 * 사용자별 운영조직 현황을 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 11
	 * @Method Name : findListUserOperorg
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListUserOperorg.do")
	public @ResponseBody List findListUserOperorg(@RequestBody Map param) {
		return userService.findListUserOperorg(param);
	}

	/**
	 * 내부사용자 비밀번호를 초기화 한다.
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @Date : 2016. 8. 16
	 * @Method Name : initPaswordByUserInfo
	 */
	@RequestMapping (value = "initPassword.do", method = RequestMethod.POST)
	public ModelAndView initPaswordByUserInfo(@RequestParam Map param) throws Exception {

		ModelAndView model = new ModelAndView();

		String resultPage = "portal/bp/result/";

		param.put("usr_id", param.get("username"));

		Map result = userService.initPassword(param);

		if (Const.FAIL.equals(result.get(Const.RESULT_STATUS))) {

			if (Const.UNAUTHORIZED.equals(result.get(Const.RESULT_DATA))) {

				resultPage += "contactAdmin"; // 이메일 수신 거부 사용자
			} else if (Const.NOT_EXIST.equals(result.get(Const.RESULT_DATA))) {

				resultPage += "noUser"; // 회원 정보 불일치 페이지
			}

		} else {
			resultPage += "successMailSend"; // 성공 페이지
		}

		model.setViewName(resultPage);

		return model;
	}

	/**
	 * 내부사용자 비밀번호를 초기화 한다.
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @Date : 2016. 8. 16
	 * @Method Name : initPaswordByUserInfo
	 */
	@RequestMapping (value = "findPassword.do", method = RequestMethod.GET)
	public ModelAndView findPassword(@RequestParam Map param) throws Exception {
		ModelAndView model = new ModelAndView();
		model.setViewName("portal/bp/login/findPassword");
		return model;
	}
	
	/**
	 * 비밀번호를 갱신한다
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @Date : 2017. 2. 27
	 * @Method Name : updatePassword
	 */
	@RequestMapping (value = "updatePassword.do")
	public @ResponseBody Map updatePassword(@RequestBody Map param) {
		return userService.updatePassword(param);
	}
	
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListUserSiteRole.do")
	public @ResponseBody List findListUserSiteRole(@RequestBody Map param) {
		return userService.findListUserSiteRole(param);
	}
	
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "saveUserSiteRole.do")
	public @ResponseBody Map saveUserSiteRole(@RequestBody Map param) {
		return userService.saveUserSiteRole(param);
	}
	
	/**
	 * 비밀번호 주기를 오늘날짜로 초기화
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 7. 20
	 * @Method Name : initPwTerm
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping (value = "initPwTerm.do")
	public @ResponseBody Map initPwTerm(@RequestBody Map param) {
		return userService.initPwTerm(param);
	}
}
