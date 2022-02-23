package smartsuite.app.bp.admin.job;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.common.shared.Const;

/**
 * 직무관리를 처리하는 서비스 Class입니다.
 *
 * @author JongKyu Kim
 * @see
 * @FileName OperUnitService.java
 * @package smartsuite.app.bp.admin.org
 * @Since 2016. 2. 2
 * @변경이력 : [2016. 2. 2] JongKyu Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class JobService {

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	/** The namespace. */
	private static final String NAMESPACE = "job.";

	/**
	 * 직무코드 목록을 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list job
	 * @Date : 2016. 2. 2
	 * @Method Name : findListJOb
	 */
	public List<Map<String, Object>> findListJob(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListJob", param);
	}
	
	/**
	 * 직무코드 신규추가/수정건을 저장한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list job
	 * @Date : 2016. 2. 2
	 * @Method Name : findListJOb
	 */
	public Map<String, Object> saveListJob(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> inserts = (List<Map<String, Object>>)param.get("insertList");
		List<Map<String, Object>> updates = (List<Map<String, Object>>)param.get("updateList");

		for (Map<String, Object> row : inserts) {
			sqlSession.insert(NAMESPACE + "insertJobList", row);
		}
		for (Map<String, Object> row : updates) {
			sqlSession.update(NAMESPACE + "updateJobList", row);
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}	
	
	/**
	 * 직무목록을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 18
	 * @Method Name : deleteListJob
	 */
	public Map deleteListJob(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		// DELETE
		for(Map row : deleteList){
			// 삭제전 체크
			// 1. 사용자 존재여부 체크
			List<Map<String, Object>> userList = this.findListJobUser(row);
			
			if(!userList.isEmpty()){
				resultMap.put(Const.RESULT_STATUS, Const.FAIL);
				resultMap.put(Const.RESULT_MSG, "직무에 등록된 사용자가 존재합니다.\n등록된 사용자를 먼저 삭제하여 주십시오.");
				return resultMap;
			}
			
			// 2. 세분류 데이터 존재여부 체크
			List<Map<String, Object>> dtlList = this.findListEsmjbmc(row);
			
			if(!dtlList.isEmpty()){
				resultMap.put(Const.RESULT_STATUS, Const.FAIL);
				resultMap.put(Const.RESULT_MSG, "직무에 등록된 세분류가 존재합니다.\n등록된 세분류를 먼저 삭제하여 주십시오.");
				return resultMap;
			}
			
			sqlSession.delete(NAMESPACE + "deleteJobList", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	
	/**
	 * 직무담당자를 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 2. 19
	 * @Method Name : findListJobUser
	 */
	public List<Map<String, Object>> findListJobUser(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListJobUser", param);
	}
	
	
	/**
	 * 세분류데이터를 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 2. 19
	 * @Method Name : findListEsmjbmc
	 */
	public List<Map<String, Object>> findListEsmjbmc(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListEsmjbmc", param);
	}
	
	/**
	 * 직무담당자를 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map< string, object>
	 * @Date : 2016. 2. 19
	 * @Method Name : saveListJobUser
	 */
	public Map<String, Object> saveListJobUser(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> inserts = (List<Map<String, Object>>)param.get("insertList");
		List<Map<String, Object>> updates = (List<Map<String, Object>>)param.get("updateList");

		for (Map<String, Object> row : inserts) {
			sqlSession.insert(NAMESPACE + "insertListEsmjbps", row);
		}
		
		for (Map<String, Object> row : updates) {
			sqlSession.update(NAMESPACE + "updateListEsmjbps", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	
	/**
	 * 직무담당자를 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map< string, object>
	 * @Date : 2016. 2. 19
	 * @Method Name : deleteListJobUser
	 */
	public Map<String, Object> deleteListJobUser(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		// DELETE
		for(Map row : deleteList){
			sqlSession.delete(NAMESPACE + "deleteListJobUser", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	public void deleteListJobByUsrId(Map<String, Object> param){
		sqlSession.delete(NAMESPACE + "deleteListJobByUsrId", param);
	}
	
	/**
	 * 직무코드 목록을 조회한다.
	 *
	 * @author : mgPark
	 * @param param the param
	 * @return the list job
	 * @Date :  2016. 2. 19
	 * @Method Name : findListUsedJob
	 */
	public List<Map<String, Object>> findListUsedJob(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListUsedJob", param);
	}
	
	/**
	 * 품목 분류를 조회한다.
	 *
	 * @author : mgPark
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 2. 19
	 * @Method Name : findListJobItem
	 */
	public List<Map<String, Object>> findListJobItem(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListJobItem", param);
	}
	
	/**
	 * 직무와 연결된 품목목록을 삭제한다.
	 *
	 * @author : mgPark
	 * @param param the param
	 * @return the map< string, object>
	 * @Date : 2016. 2. 19
	 * @Method Name : deleteListItemFromJob
	 */
	public Map<String, Object> deleteListItemFromJob(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteList");
		
		// DELETE
		if (deletes != null && !deletes.isEmpty()) {
			for(Map<String, Object> row : deletes){
				sqlSession.delete(NAMESPACE + "deleteListItemFromJob", row);
			}
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * 직무와 연결할 품목목록을 저장한다.
	 *
	 * @author : mgPark
	 * @param param the param
	 * @return the map< string, object>
	 * @Date : 2016. 2. 19
	 * @Method Name : saveListItemToJob
	 */
	public Map<String, Object> saveListItemToJob(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> inserts = (List<Map<String, Object>>)param.get("insertList");
		List<Map<String, Object>> updates = (List<Map<String, Object>>)param.get("updateList");
		
		if (inserts != null && !inserts.isEmpty()) {
			for (Map<String, Object> row : inserts) {
				sqlSession.insert(NAMESPACE + "insertListItemToJob", row);
			}
		}
		
		if (updates != null && !updates.isEmpty()) {
			for (Map<String, Object> row : updates) {
				sqlSession.update(NAMESPACE + "updateListItemToJob", row);
			}
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
}
