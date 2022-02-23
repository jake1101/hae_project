package smartsuite.app.bp.admin.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.shared.Const;
import smartsuite.mybatis.data.impl.PageResult;
import smartsuite.security.annotation.AuthCheck;

/**
 * BoardAdmin 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author JuEung Kim
 * @see 
 * @since 2016. 3. 16
 * @FileName BoardAdminController.java
 * @package smartsuite.app.bp.admin.board
 * @변경이력 : [2016. 3. 16] JuEung Kim 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/bp/**/")
public class BoardAdminController {
	
	/** The board admin service. */
	@Inject
	BoardAdminService boardAdminService;
	
	/**
	 * 게시판 관리 목록 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 3. 16
	 * @Method Name : findListBoardAdmin
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListBoardAdmin.do")
	public @ResponseBody List findListBoardAdmin(@RequestBody Map param) {
		return boardAdminService.findListBoardAdmin(param);
	}
	
	
	/**
	 * 게시판 관리 단건 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 3. 17
	 * @Method Name : findInfoBoardAdmin
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findInfoBoardAdmin.do")
	public @ResponseBody Map findInfoBoardAdmin(@RequestBody Map param) {
		return boardAdminService.findInfoBoardAdmin(param);
	}
	
	
	/**
	 * Admin 계정 저장을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 17
	 * @Method Name : saveInfoBoardAdmin
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveInfoBoardAdmin.do")
	public @ResponseBody Map saveInfoBoardAdmin(@RequestBody Map param) {
		return boardAdminService.saveInfoBoardAdmin(param);
	}
	
	
	/**
	 * Admin 계정 삭제를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 17
	 * @Method Name : deleteInfoBoardAdmin
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "deleteInfoBoardAdmin.do")
	public @ResponseBody Map deleteInfoBoardAdmin(@RequestBody Map param) {
		return boardAdminService.deleteInfoBoardAdmin(param);
	}
	
	/**
	 * Admin 계정 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 3. 17
	 * @Method Name : findListAdminUser
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListAdminUser.do")
	public @ResponseBody List findListAdminUser(@RequestBody Map param) {
		return boardAdminService.findListAdminUser(param);
	}
	
	
	/**
	 * Admin 계정 저장을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 17
	 * @Method Name : saveListAdminUser
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveListAdminUser.do")
	public @ResponseBody Map saveListAdminUser(@RequestBody Map param) {
		return boardAdminService.saveListAdminUser(param);
	}
	
	
	/**
	 * Admin 계정 삭제를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 17
	 * @Method Name : deleteListAdminUser
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "deleteListAdminUser.do")
	public @ResponseBody Map deleteListAdminUser(@RequestBody Map param) {
		return boardAdminService.deleteListAdminUser(param);
	}
	
	
	/**
	 * 게시판 권한 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 3. 17
	 * @Method Name : findListBoardAuth
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListBoardAuth.do")
	public @ResponseBody List findListBoardAuth(@RequestBody Map param) {
		return boardAdminService.findListBoardAuth(param);
	}
	
	
	/**
	 * 게시판 권한 저장을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 17
	 * @Method Name : saveListBoardAuth
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveListBoardAuth.do")
	public @ResponseBody Map saveListBoardAuth(@RequestBody Map param) {
		return boardAdminService.saveListBoardAuth(param);
	}
	
	
	/**
	 * 게시판 정보 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 3. 18
	 * @Method Name : findListBoard
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findBoardInfo.do")
	public @ResponseBody Map findBoardInfo(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		if(!boardAdminService.hasBoardRole(param)) {
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			resultMap.put(Const.RESULT_MSG, "STD.COM1000"); // 해당 권한이 존재하지 않습니다.
			return resultMap;
		}
		
		// 게시판 유형 조회
		Map boardAdminInfo = boardAdminService.findInfoBoardAdmin(param);
		
		// 게시판 어드민
		Map boardAdminYn = boardAdminService.findInfoBoardAdminYn(param);
		
		// 게시판 롤
		Map boardAdminRole = boardAdminService.findInfoBoardRole(param);
		
		resultMap.put("boardAdminInfo"	, boardAdminInfo);
		resultMap.put("boardAdminYn"	, boardAdminYn);
		resultMap.put("boardAdminRole"	, boardAdminRole);
		
		return resultMap; 
	}
	
	/**
	 * 게시판 게시글 목록 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 3. 18
	 * @Method Name : findListBoard
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findBoardList.do")
	public @ResponseBody PageResult findBoardList(@RequestBody Map param) {
		List result = boardAdminService.findListBoard(param);
		return new PageResult(result);
	}
	
	/**
	 * 게시판 삭제를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 18
	 * @Method Name : deleteListBoard
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "deleteListBoard.do")
	public @ResponseBody Map deleteListBoard(@RequestBody Map param) {
		return boardAdminService.deleteListBoard(param);
	}
	
	
	/**
	 * 게시물 저장을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 18
	 * @Method Name : saveInfoBoard
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveInfoBoard.do")
	public @ResponseBody Map saveInfoBoard(@RequestBody Map param) {
		return boardAdminService.saveInfoBoard(param);
	}
	
	
	/**
	 * 게시물 삭제를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 21
	 * @Method Name : deleteInfoBoard
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "deleteInfoBoard.do")
	public @ResponseBody Map deleteInfoBoard(@RequestBody Map param) {
		return boardAdminService.deleteInfoBoard(param);
	}
	
	/**
	 * 게시물 단건 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 18
	 * @Method Name : findInfoBoardAdmin
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findInfoBoard.do")
	public @ResponseBody Map findInfoBoard(@RequestBody Map param) {
		return boardAdminService.findInfoBoard(param);
	}
	
	/**
	 * 게시물 댓글 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 3. 25
	 * @Method Name : findListBoardComnt
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListBoardComnt.do")
	public @ResponseBody List findListBoardComnt(@RequestBody Map param) {
		return boardAdminService.findListBoardComnt(param);
	}
	
	/**
	 * 게시물의 댓글 저장을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 25
	 * @Method Name : saveInfoBoardComnt
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveInfoBoardComnt.do")
	public @ResponseBody Map saveInfoBoardComnt(@RequestBody Map param) {
		return boardAdminService.saveInfoBoardComnt(param);
	}
	
	
	/**
	 * 게시물의 댓글 삭제를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 25
	 * @Method Name : deleteInfoBoardComnt
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "deleteInfoBoardComnt.do")
	public @ResponseBody Map deleteInfoBoardComnt(@RequestBody Map param) {
		return boardAdminService.deleteInfoBoardComnt(param);
	}
	
	/**
	 * 게시목록 조회 
	 * 로그인 이전에 팝업으로 게시판 관련 조회 하기 위한 controller입니다.
	 * parameter 암/복호화 로직이 추가 되었습니다.
	 *
	 * @param param the param
	 * @return the list
	 * @Date : 2017. 11. 30
	 * @Method Name : findBoardListPopup
	 */
	@RequestMapping(value = "findListBoardPopup.do")
	public @ResponseBody PageResult findListBoardPopup(@RequestBody Map param) {
		List result = boardAdminService.findListBoardPopup(param);
		return new PageResult(result);
	}
	
	/**
	 * 게시글 조회 
	 * 로그인 이전에 팝업으로 게시판 관련 조회 하기 위한 controller입니다.
	 * parameter 암/복호화 로직이 추가 되었습니다.
	 *
	 * @param param the param
	 * @return the map
	 * @Date : 2017. 11. 30
	 * @Method Name : findInfoBoardPopup
	 */
	@RequestMapping(value = "findInfoBoardPopup.do")
	public @ResponseBody Map findInfoBoardPopup(@RequestBody Map param) {
		return boardAdminService.findInfoBoardPopup(param);
	}
	
	
	/**
	 * 게시글 댓글 조회 
	 * 로그인 이전에 팝업으로 게시판 관련 조회 하기 위한 controller입니다.
	 * parameter 암/복호화 로직이 추가 되었습니다.
	 *
	 * @param param the param
	 * @return the list
	 * @Date : 2017. 11. 30
	 * @Method Name : findListBoardComntPopup
	 */
	@RequestMapping(value = "findListBoardComntPopup.do")
	public @ResponseBody List findListBoardComntPopup(@RequestBody Map param) {
		return boardAdminService.findListBoardComntPopup(param);
	}
	
}