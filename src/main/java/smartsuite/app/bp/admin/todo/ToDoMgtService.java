package smartsuite.app.bp.admin.todo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.common.shared.Const;

/**
 * TO-DO 관리 Service
 */
@SuppressWarnings("unchecked")
@Service
@Transactional
public class ToDoMgtService {
	
	@Inject
	SqlSession sqlSession;
	
	private static final String namespace = "todo-mgt.";
	
	/**
	 * TO-DO 그룹 목록 조회
	 * @param param
	 * @return
	 */
	public List<Map<String, Object>> findListTodoGroup(Map<String, Object> param) {
		return sqlSession.selectList(namespace + "findListTodoGroup", param);
	}
	
	/**
	 * TO-DO 그룹 목록 저장
	 * @param param
	 * @return
	 */
	public Map<String, Object> saveListTodoGroup(Map<String, Object> param) {
		// 신규
		List<Map<String, Object>> creates = (List<Map<String, Object>>)param.get("insertList");
		for(Map<String, Object> create : creates) {
			sqlSession.insert(namespace+"insertTodoGroup", create);
		}
		
		// 수정
		List<Map<String, Object>> updates = (List<Map<String, Object>>)param.get("updateList");
		for(Map<String, Object> update : updates) {
			sqlSession.update(namespace+"updateTodoGroup", update);
		}
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * TO-DO 그룹 목록 삭제
	 * @param param
	 * @return
	 */
	public Map<String, Object> deleteListTodoGroup(Map<String, Object> param) {
		// 삭제
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteList");
		for(Map<String, Object> delete : deletes) {
			sqlSession.delete(namespace+"deleteTodoUser", delete);
			sqlSession.delete(namespace+"deleteTodoFactor", delete);
			sqlSession.delete(namespace+"deleteTodoGroup", delete);
		}
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * TO-DO 항목 목록 조회
	 * @param param
	 * @return
	 */
	public List<Map<String, Object>> findListTodoFactor(Map<String, Object> param) {
		return sqlSession.selectList(namespace + "findListTodoFactor", param);
	}
	
	/**
	 * TO-DO 항목 목록 저장
	 * @param param
	 * @return
	 */
	public Map<String, Object> saveListTodoFactor(Map<String, Object> param) {
		// 신규
		List<Map<String, Object>> creates = (List<Map<String, Object>>)param.get("insertList");
		for(Map<String, Object> create : creates) {
			create.put("fact_id", UUID.randomUUID().toString());
			sqlSession.insert(namespace+"insertTodoFactor", create);
		}
		
		// 수정
		List<Map<String, Object>> updates = (List<Map<String, Object>>)param.get("updateList");
		for(Map<String, Object> update : updates) {
			sqlSession.update(namespace+"updateTodoFactor", update);
		}
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * TO-DO 항목 목록 삭제
	 * @param param
	 * @return
	 */
	public Map<String, Object> deleteListTodoFactor(Map<String, Object> param) {
		// 삭제
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteList");
		for(Map<String, Object> delete : deletes) {
			sqlSession.delete(namespace+"deleteTodoUser", delete);
			sqlSession.delete(namespace+"deleteTodoFactor", delete);
		}
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * TO-DO 항목 별 사용자 목록 조회
	 * @param param
	 * @return
	 */
	public List<Map<String, Object>> findListTodoUser(Map<String, Object> param) {
		return sqlSession.selectList(namespace + "findListTodoUser", param);
	}
	
	/**
	 * TO-DO 항목 별 사용자 목록 저장
	 * @param param
	 * @return
	 */
	public Map<String, Object> saveListTodoUser(Map<String, Object> param) {
		// 신규
		List<Map<String, Object>> creates = (List<Map<String, Object>>)param.get("insertList");
		for(Map<String, Object> create : creates) {
			sqlSession.insert(namespace+"insertTodoUser", create);
		}
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * TO-DO 항목 별 사용자 목록 삭제
	 * @param param
	 * @return
	 */
	public Map<String, Object> deleteListTodoUser(Map<String, Object> param) {
		// 삭제
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteList");
		for(Map<String, Object> delete : deletes) {
			sqlSession.delete(namespace+"deleteTodoUser", delete);
		}
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * TO-DO 사용자 별 항목 목록 조회
	 * @param param
	 * @return
	 */
	public List<Map<String, Object>> findListTodoFactorByUser(Map<String, Object> param) {
		return sqlSession.selectList(namespace + "findListTodoFactorByCurrentUser", param);
	}
	
	/**
	 * TO-DO 사용자 별 항목 저장/삭제
	 * @param param
	 * @return
	 */
	public Map<String, Object> saveListTodoFactorByUser(Map<String, Object> param) {
		// 보이기 여부
		String usingYn = param.get("show_yn") == null ? "N" : param.get("show_yn").toString();
		if("Y".equals(usingYn)) {
			sqlSession.update(namespace + "insertTodoUserByCurrentUser", param);
		} else {
			sqlSession.delete(namespace + "deleteTodoUserByCurrentUser", param);
		}
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
}
