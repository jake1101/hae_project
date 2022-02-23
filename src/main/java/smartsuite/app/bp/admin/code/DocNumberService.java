package smartsuite.app.bp.admin.code;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.common.shared.Const;

/**
 * DocNumber 관련 처리하는 서비스 Class입니다.
 *
 * @author JuEung Kim
 * @see 
 * @FileName DocNumberService.java
 * @package smartsuite.app.bp.admin.code
 * @Since 2016. 2. 3
 * @변경이력 : [2016. 2. 3] JuEung Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class DocNumberService {
	
	/** The sql session. */
	@Inject
	private SqlSession sqlSession;
	
	/**
	 * 문서번호 목록 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 2. 3
	 * @Method Name : findListDocNumber
	 */
	public List<Map<String,Object>> findListDocNumber(Map<String, Object> param) {
		List<Map<String,Object>> grpCodeList = sqlSession.selectList("docNumber.findListDocNumber", param);
		
		return grpCodeList;
	}
	
	/**
	 * 문서번호를 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 3
	 * @Method Name : saveListDocNumber
	 */
	public Map saveListDocNumber(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		
		// UPDATE
		for(Map row : updateList){
			sqlSession.update("docNumber.updateEsacdfm", row);
		}
		
		// INSERT
		for(Map row : insertList){
			sqlSession.insert("docNumber.insertEsacdfm", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * 문서번호를 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 3
	 * @Method Name : deleteListDocNumber
	 */
	public Map deleteListDocNumber(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		// DELETE
		for(Map row : deleteList){
			sqlSession.delete("docNumber.deleteEsacdfm", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
}
