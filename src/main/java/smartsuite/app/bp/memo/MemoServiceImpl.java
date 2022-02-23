package smartsuite.app.bp.memo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 메모 관련 서비스 Class입니다.
 *
 * @author jhuh
 * @see
 * @since 2016. 10. 10
 * @FileName MemoServiceImpl.java
 * @package smartsuite.memo.web
 * @변경이력 : [2016. 10. 10] jhuh 최초작성
 */

@Service
@Transactional
public class MemoServiceImpl implements MemoService{
	
	/** The sql session. */
	@Inject
	private SqlSession sqlSession;
	
	/** The NAMESPACE. */
	private final String NAMESPACE = "memo.";
	
	/* 전체 메모 조회 */
	public List<Map<String, Object>> findListAllMemo() {
		return sqlSession.selectList(NAMESPACE + "findListAllMemo");
	}
	
	/* 내 메모 조회 */
	public List<Map<String, Object>> findListMyMemo() {
		return sqlSession.selectList(NAMESPACE + "findListMyMemo");
	}
	
	/* 공유 메모 조회 */
	public List<Map<String, Object>> findListSharedMemo() {
		return sqlSession.selectList(NAMESPACE + "findListSharedMemo");
	}
	
	/* 중요 메모 조회 */
	public List<Map<String, Object>> findListImptMemo() {
		return sqlSession.selectList(NAMESPACE + "findListImptMemo");
	}
	
	/* 삭제된 메모 조회 (휴지통 조회) */
	public List<Map<String, Object>> findListDeletedMemo() {
		return sqlSession.selectList(NAMESPACE + "findListDeletedMemo");
	}

	/* 대쉬보드 출력 메모 조회 */
	public List<Map<String, Object>> findDashboardMemo() {
		return sqlSession.selectList(NAMESPACE + "findListDashboardMemo");
	}
	
	/* 메모 데이터 추가 */
	public void insertMemo(Map<String, Object> param) {
		sqlSession.insert(NAMESPACE + "insertMemo", param);
	}
	
	/* 메모 데이터 수정 */
	public void updateMemo(Map<String, Object> param) {
		sqlSession.update(NAMESPACE + "updateMemo", param);
	}
	
	/* 메모 데이터 삭제 (휴지통으로 이동). 해당 메모가 공유 메모인 경우, 공유 정보 삭제 */
	public void deleteMemo(Map<String, Object> param) {
		Integer sharedYn = (Integer) param.get("shared_yn");
		Integer ownMemoYn = (Integer) param.get("ownMemo_yn");
		
		if(ownMemoYn == 0){
			sqlSession.update(NAMESPACE + "deleteSharedMemo", param);
		}
		else if(ownMemoYn == 1){
			sqlSession.update(NAMESPACE + "deleteMemo", param);
			if(sharedYn == 1){
				sqlSession.delete(NAMESPACE + "deleteSharedInfo", param);
			}
		}		
	}
	
	/* 메모 중요도 수정 */
	public void updateMemoImpt(Map<String, Object> param) {
		sqlSession.update(NAMESPACE + "updateMemoImpt", param);
	}
	
	/* 메모 중요도 수정 */
	public void updateMemoDashboard(Map<String, Object> param) {
		sqlSession.update(NAMESPACE + "updateMemoDashboard", param);
	}
	
	/* 전체 태그 데이터 조회 */
	public List<Map<String, Object>> findListTag() {
		return sqlSession.selectList(NAMESPACE +"findListTag");
	}
	
	/* 태그 데이터 검색 */
	public List<Map<String, Object>> findListTagByKeyword(Map<String, Object> searchParam) {
		return sqlSession.selectList(NAMESPACE + "findListTagByKeyword", searchParam);
	}

	/* 특정 메모  태그 데이터 조회 */
	public List<Map<String, Object>> findListMemoTag(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListMemoTag", param);
	}
	
	/* 태그 별 메모 데이터 조회 */
	public List<Map<String, Object>> findListMemoByTag(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListMemoByTag", param);
	}
	
	/* 메모 태그 데이터 추가 */
	public void insertTag(Map<String, Object> param) {
		Map<String, Object> insertParam;
		ArrayList<String> tagIdList =  (ArrayList<String>)param.get("tag_id");
		ArrayList<String> tagNameList =  (ArrayList<String>)param.get("tag_nm");
		int idx = 0;
		for(String tagId : tagIdList){
			insertParam = new HashMap<String, Object>();
			String tagName = tagNameList.get(idx++);
			insertParam.put("tag_id", tagId);
			insertParam.put("tag_nm", tagName);
			sqlSession.insert(NAMESPACE + "insertTag", insertParam);
		}
		
	}

	/* 메모 태그 자체를 삭제 */;
	public void deleteTag(Map<String, Object> param) {
		Map<String, Object> deleteParam;
		ArrayList<String> tagList =  (ArrayList<String>)param.get("tag_nm");
		for(String tagName : tagList){
			deleteParam = new HashMap<String, Object>();
			deleteParam.put("tag_nm", tagName);
			sqlSession.delete(NAMESPACE + "deleteTagInMTable", deleteParam);
			sqlSession.delete(NAMESPACE + "deleteTagInTTable", deleteParam);
		}
	}
	
	/* 메모 내 태그 데이터 삭제 */;
	public void deleteTagInMemo(Map<String, Object> param) {
		sqlSession.delete(NAMESPACE + "deleteTagInMemo", param);
	}
	
	/* 메모 태그 데이터 수정 */;
	public void updateTag(Map<String, Object> param) {
		Map<String, Object> insertTagParam = new HashMap<String, Object>();
		ArrayList<String> tagList =  (ArrayList<String>)param.get("tag_nm");
		String memoId =  (String)param.get("memo_id");
		
		sqlSession.delete(NAMESPACE + "deleteTagByMemoID", param);
		
		if(tagList.size() != 0){
			for( String tagName : tagList ){
		        insertTagParam = new HashMap<String, Object>();
		        insertTagParam.put("memo_id", memoId);
		        insertTagParam.put("tag_nm", tagName);
				sqlSession.insert(NAMESPACE + "insertTagByTagNM", insertTagParam);
			}
		}
	}
		
	/* 메모 데이터 복원*/
	public void restoreMemo(Map<String, Object> param) {
		sqlSession.update(NAMESPACE + "restoreMemo", param);
	}
	
	/* 메모 데이터 물리적 삭제 (휴지통 비우기) */
	public void emptyTrash(Map<String, Object> param) {
		ArrayList<String> memoList =  (ArrayList<String>)param.get("memo_id");
		
    	for( String memoId : memoList ){
        	Map<String, Object> memoInfo = new HashMap<String, Object>();
        	memoInfo.put("memo_id", memoId);
    		sqlSession.delete(NAMESPACE + "emptyTrash", memoInfo);
        }
	}
	
	/* 메모 공유 데이터 삭제 */
	public void deleteSharedInfo(Map<String, Object> param) {
		Map<String, Object> deleteParam = new HashMap<String, Object>();
		ArrayList<String> usrIdList =  (ArrayList<String>)param.get("usr_id");
		String memoId =  (String)param.get("memo_id");
		
		
		for(String usrId : usrIdList){
			deleteParam = new HashMap<String, Object>();
			
			deleteParam.put("usr_id", usrId);
			deleteParam.put("memo_id", memoId);
			
			sqlSession.delete(NAMESPACE + "deleteSharedInfo", deleteParam);
		}
	}
	
	/* 메모 데이터 공유 수정*/
	public void manageSharedInfo(Map<String, Object> param) {
		Map<String, Object> sharedParam = new HashMap<String, Object>();
		ArrayList<String> sharedList =  (ArrayList<String>)param.get("usr_id");
		String memoId =  (String)param.get("memo_id");

		if(sharedList.size() != 0){
	    	for( String sharedId : sharedList ){
	        	sharedParam = new HashMap<String, Object>();
	        	sharedParam.put("usr_id", sharedId);
	        	sharedParam.put("memo_id", memoId);
	        	sqlSession.insert(NAMESPACE + "insertSharedInfo", sharedParam);
	        }
	    	sqlSession.update(NAMESPACE + "addSharedYn", sharedParam);
		}
		else {
			sqlSession.update(NAMESPACE + "removeSharedYn", param);
		}
	}
		
	/* 메모 공유 정보 조회 */
	public List<Map<String, Object>> findListSharedUsers(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListSharedUsers", param);
	}
	
	/* 메모 공유 대상자 즐겨찾기 정보 조회 */
	public List<Map<String, Object>> findListFavorites(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListFavorites", param);
	}	
	
	/* 사용자  정보 조회 */
	public List<Map<String,Object>> findListUserInMemo(Map<String, Object> searchParam) {		
		return sqlSession.selectList(NAMESPACE + "findListUserInMemo", searchParam);
	}
	
	/* 즐겨찾기 목록 추가 */
	public void insertFavorites(Map<String, Object> param) {
		Map<String, Object> insertParam;
		ArrayList<String> favList =  (ArrayList<String>)param.get("usr_id");
		ArrayList<String> fvrIdList =  (ArrayList<String>)param.get("fvr_id");
		int idx = 0;
		
		for(String favUsrId : favList){
			insertParam = new HashMap<String, Object>();
			insertParam.put("fvr_id", fvrIdList.get(idx++));
			insertParam.put("usr_id", favUsrId);
			sqlSession.insert(NAMESPACE + "insertFavorites", insertParam);			
		}
	}
	
	/* 즐겨찾기 목록 삭제 */
	public void deleteFavorites(Map<String, Object> param) {
		Map<String, Object> deleteParam;
		ArrayList<String> favList =  (ArrayList<String>)param.get("usr_id");

		for(String favUsrId : favList){
			deleteParam = new HashMap<String, Object>();
			deleteParam.put("usr_id", favUsrId);
			sqlSession.delete(NAMESPACE + "deleteFavorites", deleteParam);
		}
	}
}
