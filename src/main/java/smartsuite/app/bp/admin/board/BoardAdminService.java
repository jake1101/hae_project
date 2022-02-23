package smartsuite.app.bp.admin.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.common.shared.Const;
import smartsuite.security.authentication.Auth;
import smartsuite.security.core.crypto.CipherUtil;

/**
 * BoardAdmin 관련 처리하는 서비스 Class입니다.
 *
 * @author JuEung Kim
 * @see 
 * @FileName BoardAdminService.java
 * @package smartsuite.app.bp.admin.board
 * @Since 2016. 3. 16
 * @변경이력 : [2016. 3. 16] JuEung Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class BoardAdminService {
	
	/** The sql session. */
	@Inject
	private SqlSession sqlSession;
	
	@Inject
	CipherUtil cipherUtil;
	
	
	/**
	 * 게시판 관리 목록을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 3. 16
	 * @Method Name : findListBoardAdmin
	 */
	public List<Map<String,Object>> findListBoardAdmin(Map<String, Object> param) {
		List<Map<String,Object>> grpCodeList = sqlSession.selectList("boardAdmin.findListBoardAdmin", param);
		
		return grpCodeList;
	}
	
	
	/**
	 * 게시판 관리 단건을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 17
	 * @Method Name : findInfoBoardAdmin
	 */
	public Map findInfoBoardAdmin(Map<String, Object> param) {
		return sqlSession.selectOne("boardAdmin.findInfoBoardAdmin", param);
	}
	
	
	/**
	 * 게시판 어드민 여부를 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 24
	 * @Method Name : findInfoBoardAdminYn
	 */
	public Map findInfoBoardAdminYn(Map<String, Object> param){
		return sqlSession.selectOne("boardAdmin.findInfoBoardAdminYn", param);
	}
	
	/**
	 * 게시판 롤을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 24
	 * @Method Name : findInfoBoardRole
	 */
	public Map findInfoBoardRole(Map<String, Object> param){
		return sqlSession.selectOne("boardAdmin.findInfoBoardRole", param);
	}	
	
	/**
	 * 게시판 관리 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 17
	 * @Method Name : saveInfoBoardAdmin
	 */
	public Map saveInfoBoardAdmin(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> info = (Map<String, Object>)param.get("boardAdminInfo");

		boolean isNew = false;
		if(info.get("is_new") != null){
			isNew = (Boolean)info.get("is_new");
		}
		
		if (isNew) {
			String boardId = sqlSession.selectOne("boardAdmin.findBoardId");
			
			info.put("board_id", boardId);
			sqlSession.insert("boardAdmin.insertBoardAdmin", info);
		}else{
			sqlSession.update("boardAdmin.updateBoardAdmin", info);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	
	/**
	 * 게시판 관리를 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 17
	 * @Method Name : deleteInfoBoardAdmin
	 */
	public Map deleteInfoBoardAdmin(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		Map<String, Object> info = (Map<String, Object>)param.get("boardAdminInfo");
		
		// 게시판의 등록된 게시물 조회(ESCBDMA)
		List boardList = sqlSession.selectList("boardAdmin.findListBoardByBoardId", info);
		
		if(boardList.isEmpty()){
			// 게시판 롤 삭제(ESCBDBR)
			sqlSession.delete("boardAdmin.deleteBoardAuthById", info);
			
			// 게시판 Admin 삭제(ESCBDBA)
			sqlSession.delete("boardAdmin.deleteAdminUserById", info);
			
			// 게시판 유형 삭제(ESCBDMT)
			sqlSession.delete("boardAdmin.deleteBoardAdmin", info);
			
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		}else{
			resultMap.put(Const.RESULT_STATUS, Const.FAIL); // 중복
			resultMap.put(Const.RESULT_MSG, "등록된 게시물이 있습니다.");
		}
		
		return resultMap;
	}
	
	/**
	 * Admin 계정을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 3. 17
	 * @Method Name : findListAdminUser
	 */
	public List<Map<String,Object>> findListAdminUser(Map<String, Object> param) {
		List<Map<String,Object>> adminUserList = sqlSession.selectList("boardAdmin.findListAdminUser", param);
		
		return adminUserList;
	}
	
	/**
	 * Admin 계정을 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 17
	 * @Method Name : saveListAdminUser
	 */
	public Map saveListAdminUser(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		
		// UPDATE
		for(Map row : updateList){
			sqlSession.update("boardAdmin.updateAdminUser", row);
		}
		
		// INSERT
		for(Map row : insertList){
			sqlSession.insert("boardAdmin.insertAdminUser", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * Admin 계정을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 17
	 * @Method Name : deleteListAdminUser
	 */
	public Map deleteListAdminUser(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		// DELETE
		for(Map row : deleteList){
			sqlSession.delete("boardAdmin.deleteAdminUser", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	
	/**
	 * 게시판 권한 목록을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 3. 17
	 * @Method Name : findListBoardAuth
	 */
	public List<Map<String,Object>> findListBoardAuth(Map<String, Object> param) {
		List<Map<String,Object>> adminUserList = sqlSession.selectList("boardAdmin.findListBoardAuth", param);
		
		return adminUserList;
	}
	
	
	/**
	 * 게시판 권한을 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 17
	 * @Method Name : saveListBoardAuth
	 */
	public Map saveListBoardAuth(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		
		// INSERT
		for(Map row : insertList){
			sqlSession.delete("boardAdmin.deleteBoardAuth", row);
			sqlSession.insert("boardAdmin.insertBoardAuth", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	
	/**
	 * 게시판을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 3. 18
	 * @Method Name : findListBoard
	 */
	public List<Map<String,Object>> findListBoard(Map<String, Object> param) {
		List<Map<String,Object>> boardList = sqlSession.selectList("boardAdmin.findListBoard", param);
		
		return boardList;
	}
	
	/**
	 * 게시판을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 18
	 * @Method Name : deleteListBoard
	 */
	public Map deleteListBoard(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		// DELETE
		for(Map row : deleteList){
			this.updateDeleteBoard(row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * 게시물 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 18
	 * @Method Name : saveInfoBoard
	 */
	public Map saveInfoBoard(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		// 세션 정보
		Map userInfo = Auth.getCurrentUserInfo();
		// 게시물
		Map<String, Object> info = (Map<String, Object>)param.get("boardInfo");
		
		boolean isNew = false;
		if(info.get("is_new") != null){
			isNew = (Boolean)info.get("is_new");
		}		
		if (isNew) {
			
			if(this.hasBoardInsertRole(info)){
				String postNo = sqlSession.selectOne("boardAdmin.findPostNo", info);
				
				info.put("reg_email", userInfo.get("email") );	// 이메일
				info.put("post_no", postNo);
				if(info.get("post_grp_no") == null){
					info.put("post_grp_no", "NULL");
				}
				
				sqlSession.update("boardAdmin.updateBoardForPostGrpSn", info);
				sqlSession.insert("boardAdmin.insertBoard", info);
			} else {
				resultMap.put(Const.RESULT_STATUS, Const.FAIL);
				resultMap.put(Const.RESULT_MSG, "STD.COM1000");
				return resultMap;
			}
			
		}else{
			//게시판 작성자 또는 게시판 관리자만 가능  
			if(this.hasBoardUpdateRole(info)){
				info.put("mod_nm", userInfo.get("usr_nm") );	// 수정자명
				info.put("mod_email", userInfo.get("email") );	// 이메일
				sqlSession.update("boardAdmin.updateBoard", info);
			} else{
				resultMap.put(Const.RESULT_STATUS, Const.FAIL);
				resultMap.put(Const.RESULT_MSG, "STD.COM1000");
				return resultMap;
			}
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	
	/**
	 * 게시물을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 21
	 * @Method Name : deleteInfoBoard
	 */
	public Map deleteInfoBoard(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> info = (Map<String, Object>)param.get("boardInfo");
		
		//게시판 작성자 또는 게시판 관리자만 삭제 가능
		if(this.hasBoardDeleteRole(info)) {
			this.updateDeleteBoard(info);
			
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
			return resultMap;
		} else {
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			resultMap.put(Const.RESULT_MSG, "STD.COM1000");
			return resultMap;
		}
	}
	
	
	/**
	 * 게시물 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param info the info
	 * @Date : 2016. 3. 21
	 * @Method Name : updateDeleteBoard
	 */
	public void updateDeleteBoard(Map info){
		sqlSession.update("boardAdmin.updateDeleteBoard", info);
	}
	
	/**
	 * 게시판 조회 권한
	 *
	 * @author : WanSeob Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2018. 12. 04
	 * @Method Name : hasBoardRole
	 */
	public Boolean hasBoardRole(Map boardInfo){
		// 1. 해당 사용자가 해당 게시판의 관리자 권한을 가졌을 경우
		// 2. 해당 게시판이 권한 체크를 안하는 게시판일 경우
		// 3. 해당 사용자가 해당 게시판에 조회 권한을 가졌을 경우
		int cnt = sqlSession.selectOne("boardAdmin.hasBoardRole", boardInfo);
		return cnt > 0;
	}
	
	/**
	 * 게시물 작성 권한
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @return the map
	 * @Date : 2018. 5. 03
	 * @Method Name : hasBoardInsertRole
	 */
	public Boolean hasBoardInsertRole(Map boardInfo){
		// 1. 해당 사용자가 해당 게시판의 관리자 권한을 가졌을 경우
		// 2. 해당 게시판이 권한 체크를 안하는 게시판일 경우
		// 3. 해당 사용자가 해당 게시판에 쓰기 권한을 가졌을 경우
		int cnt = sqlSession.selectOne("boardAdmin.hasBoardInsertRole", boardInfo);
		return cnt > 0;
	}
	
	/**
	 * 게시물 수정 권한
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @return the map
	 * @Date : 2018. 3. 08
	 * @Method Name : hasBoardUpdateRole
	 */
	public Boolean hasBoardUpdateRole(Map boardInfo){
		int cnt = sqlSession.selectOne("boardAdmin.hasBoardUpdateRole", boardInfo);
		return cnt > 0;
	}
	
	/**
	 * 게시물 코멘트 수정 권한
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @return the map
	 * @Date : 2018. 3. 08
	 * @Method Name : hasBoardUpdateRole
	 */
	public Boolean hasComntUpdateRole(Map boardInfo){
		int cnt = sqlSession.selectOne("boardAdmin.hasComntUpdateRole", boardInfo);
		return cnt > 0;
	}
	
	/**
	 * 게시물 삭제 권한
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @return the map
	 * @Date : 2018. 3. 08
	 * @Method Name : hasBoardDeleteRole
	 */
	public Boolean hasBoardDeleteRole(Map boardInfo){
		int cnt = sqlSession.selectOne("boardAdmin.hasBoardDeleteRole", boardInfo);
		return cnt > 0;
	}
	
	/**
	 * 게시물 코멘트 삭제 권한
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @return the map
	 * @Date : 2018. 3. 08
	 * @Method Name : hasComntDeleteRole
	 */
	public Boolean hasComntDeleteRole(Map boardInfo){
		int cnt = sqlSession.selectOne("boardAdmin.hasComntDeleteRole", boardInfo);
		return cnt > 0;
	}
	
	/**
	 * 게시물을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 18
	 * @Method Name : findInfoBoard
	 */
	public Map findInfoBoard(Map<String, Object> param) {
		sqlSession.update("boardAdmin.updateBoardOfViewCnt", param);
		
		return sqlSession.selectOne("boardAdmin.findInfoBoard", param);
	}
	
	/**
	 * 게시물 댓글을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 25
	 * @Method Name : findListBoardComnt
	 */
	public List findListBoardComnt(Map<String, Object> param) {
		return sqlSession.selectList("boardAdmin.findInfoBoardComnt", param);
	}
	
	
	/**
	 * 게시물 댓글을 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 25
	 * @Method Name : saveInfoBoardComnt
	 */
	public Map saveInfoBoardComnt(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		// 댓글
		Map<String, Object> info = (Map<String, Object>)param.get("boardComntInfo");
		boolean isNew = false;
		if(info.get("is_new") != null){
			isNew = (Boolean)info.get("is_new");
		}
		
		if (isNew) {
			sqlSession.insert("boardAdmin.insertBoardComnt", info);
			// 댓글수 update
			sqlSession.update("boardAdmin.updateBoardOfComntCnt", info);
		} else {
			//작성자 또는 게시판 관리자만 가능
			if(this.hasComntUpdateRole(info)) {
				sqlSession.update("boardAdmin.updateBoardComnt", info);
			} else {
				resultMap.put(Const.RESULT_STATUS, Const.FAIL);
				resultMap.put(Const.RESULT_MSG, "STD.COM1000");
				return resultMap;
			}
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap; 
	}
	
	
	/**
	 * 게시물 댓글을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 3. 25
	 * @Method Name : deleteInfoBoardComnt
	 */
	public Map deleteInfoBoardComnt(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> info = (Map<String, Object>)param.get("boardComntInfo");
		
		if(this.hasComntDeleteRole(info)){
			sqlSession.insert("boardAdmin.deleteBoardComnt", info);
			
			// 댓글수 update
			sqlSession.update("boardAdmin.updateBoardOfComntCnt", info);
			
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
			return resultMap;
		} else {
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			resultMap.put(Const.RESULT_MSG, "STD.COM1000");
			return resultMap;
		}
	}
	
	/**
	 * 공지 팝업 목록 조회
	 *
	 * @author :
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2017. 8. 24
	 * @Method Name : findListMainNotice
	 */
	public List<Map<String, Object>> findNoticeList(Map<String, Object> param) {
		return sqlSession.selectList("boardAdmin.findNoticeList", param);
	}
	
	/**
	 * 협력사포탈 공지사항 목록 조회
	 *
	 * @author :
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2017. 11. 27
	 * @Method Name : findPortalNoticeList
	 */
	public List<Map<String, Object>> findPortalNoticeList(Map<String, Object> param) {
		return sqlSession.selectList("boardAdmin.findPortalNoticeList", param);
	}
	
	
	/**
	 * 게시목록 조회 
	 * parameter 암/복호화 로직이 추가 되었습니다.
	 *
	 * @param param the param
	 * @return the list
	 * @Date : 2017. 11. 30
	 * @Method Name : findBoardListPopup
	 */
	public List<Map<String,Object>> findListBoardPopup(Map<String, Object> param) {
		
		// board_id 복호화
		String decBoarId = cipherUtil.decrypt((String) param.get("board_id"));
		param.put("board_id", decBoarId);
		
		// 게시목록 조회
		List<Map<String,Object>> boardList = sqlSession.selectList("boardAdmin.findListBoard", param);
		
		// 조회 결과 암호화
		for(Map<String, Object> boardInfo : boardList) {
			boardInfo.put("board_id", cipherUtil.encrypt((String)boardInfo.get("board_id")));
			boardInfo.put("post_no", cipherUtil.encrypt((String)boardInfo.get("post_no")));
		}
		
		return boardList;
	}
	
	/**
	 * 게시글 조회 
	 * parameter 암/복호화 로직이 추가 되었습니다.
	 *
	 * @param param the param
	 * @return the map
	 * @Date : 2017. 11. 30
	 * @Method Name : findInfoBoardPopup
	 */
	public Map<String, Object> findInfoBoardPopup(Map<String, Object> param) {
		
		// post_no 복호화
		String decPostNo = cipherUtil.decrypt((String) param.get("post_no"));
		param.put("post_no", decPostNo);
		
		// 조회 수 update
		sqlSession.update("boardAdmin.updateBoardOfViewCnt", param);
		
		// 게시글 조회
		Map<String,Object> boardInfo = sqlSession.selectOne("boardAdmin.findInfoBoard", param);
		
		// 조회 결과 암호화
		boardInfo.put("board_id", cipherUtil.encrypt((String)boardInfo.get("board_id")));
		boardInfo.put("post_no", cipherUtil.encrypt((String)boardInfo.get("post_no")));
		
		return boardInfo;
	}
	
	/**
	 * 게시글 댓글 조회 
	 * parameter 암/복호화 로직이 추가 되었습니다.
	 *
	 * @param param the param
	 * @return the list
	 * @Date : 2017. 11. 30
	 * @Method Name : findListBoardComntPopup
	 */
	public List<Map<String, Object>> findListBoardComntPopup(Map<String, Object> param) {
		
		// post_no 복호화
		String decPostNo = cipherUtil.decrypt((String) param.get("post_no"));
		param.put("post_no", decPostNo);
		
		// 게시글 댓글 조회
		List<Map<String,Object>> boardComntList = sqlSession.selectList("boardAdmin.findInfoBoardComnt", param);
		
		// 조회 결과 암호화
		for(Map<String, Object> boardComntInfo : boardComntList) {
			boardComntInfo.put("board_id", cipherUtil.encrypt((String)boardComntInfo.get("board_id")));
			boardComntInfo.put("post_no", cipherUtil.encrypt((String)boardComntInfo.get("post_no")));
		}
		return boardComntList;
	}
	
	
	
}
