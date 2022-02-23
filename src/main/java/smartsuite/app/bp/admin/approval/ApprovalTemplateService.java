package smartsuite.app.bp.admin.approval;

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
 * ApprovalTemplate 관련 처리하는 서비스 Class입니다.
 *
 * @see 
 * @FileName ApprovalTemplateService.java
 * @package smartsuite.app.bp.admin.approval
 * @Since 2017. 2. 20
 */
@Service
@Transactional
@SuppressWarnings ({ "rawtypes" })
public class ApprovalTemplateService {

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;
	
	/** The namespace. */
	/*NAMESPACE*/
	private static final String NAMESPACE = "approvalTmp.";
	
	/**
	 * list approval tmp 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2017. 2. 20
	 * @Method Name : findListApprovalTmp
	 */
	/* 결재 템플릿 목록 조회 */
	public List<Map<String, Object>> findListApprovalTmp(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListApprovalTmp", param);
	}
	
	/**
	 * approval tmp by cd 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map< string, object>
	 * @Date : 2017. 2. 20
	 * @Method Name : findApprovalTmpByCd
	 */
	/* 결재 템플릿 상세 조회(단건조회) */
	public Map<String, Object> findApprovalTmpByCd(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "findApprovalTmpByCd", param);
	}
	
	/**
	 * approval tmp 저장한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map< string, object>
	 * @Date : 2017. 2. 20
	 * @Method Name : saveApprovalTmp
	 */
	/* 결재 템플릿 저장 */
	public Map<String, Object> saveApprovalTmp(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		int cnt = 0;
		
		cnt = sqlSession.selectOne(NAMESPACE + "getCountApproval", param);
		
		if(cnt > 0) { //수정
			sqlSession.update(NAMESPACE + "updateApprovalTmp", param);
			sqlSession.update(NAMESPACE + "updateContent", param);
			
		} else { //신규
			param.put("tmp_id", UUID.randomUUID().toString());
			sqlSession.insert(NAMESPACE + "insertApprovalTmp", param);
			sqlSession.insert(NAMESPACE + "insertContent", param);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * approval tmp bas id list의 값을 반환한다.
	 *
	 * @param param the param
	 * @return approval tmp bas id list
	 */
	public List getApprovalTmpBasIdList(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE+"getApprovalTmpBasIdList", param);
	} 
	

}
