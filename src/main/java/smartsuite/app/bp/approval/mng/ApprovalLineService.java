package smartsuite.app.bp.approval.mng;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.common.shared.Const;
import smartsuite.data.FloaterStream;
import smartsuite.mybatis.QueryFloaterStream;

// TODO: Auto-generated Javadoc
/**
 * ApprovalLine 관련 처리하는 서비스 Class입니다.
 *
 * @author Yeon-u Kim
 * @see 
 * @FileName ApprovalLineService.java
 * @package smartsuite.app.bp.approval.mng
 * @Since 2017. 2. 1
 * @변경이력 : [2017. 2. 1] Yeon-u Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "rawtypes", "unchecked" ,
	"PMD.FinalFieldCouldBeStatic",
	"PMD.UseCollectionIsEmpty",
	"PMD.UseConcurrentHashMap",
	"PMD.LawOfDemeter",
	"PMD.BeanMembersShouldSerialize",
	"PMD.AtLeastOneConstructor"})
public class ApprovalLineService {
	
	/** The sql session. */
	@Inject
	private transient SqlSession sqlSession;
	
	/** The namespace. */
	private final String namespace = "approvalLineMng.";

	/**
	 * aprv line list 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2017. 2. 1
	 * @Method Name : findAprvLineMasterList
	 */
	public FloaterStream findAprvLineMasterList(final Map<String,Object> param) {
		// 대용량 처리
		return new QueryFloaterStream(sqlSession, namespace+"findAprvLineMasterList",param);
	}

	/**
	 * aprv line master detail list 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2017. 2. 2
	 * @Method Name : findAprvLineMasterDetailList
	 */
	public List findAprvLineMasterDetailList(final Map<String,Object> param){
		return sqlSession.selectList(namespace+"findAprvLineMasterDetailList",param);
	}
	/**
	 * aprv line master 저장한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2017. 2. 2
	 * @Method Name : saveAprvLineMaster
	 */
	public Map saveAprvLineMaster(final Map<String,Object> param){
		final Map<String,Object> resultMap = new HashMap<String,Object>();
		final List<Map<String,Object>> insertList = (List<Map<String, Object>>) param.get("insertAprvLineMasters");
		final List<Map<String,Object>> updateList = (List<Map<String, Object>>) param.get("updateAprvLineMasters");
		
		if(!insertList.isEmpty()){
			for(final Map<String,Object> inserted : insertList){
				sqlSession.insert(namespace+"insertAprvLineMaster",inserted);
			}
		}
		
		if(!updateList.isEmpty()){
			for(final Map<String,Object> updated : updateList){
				sqlSession.update(namespace+"updateAprvLineMaster",updated);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * aprv line detail 저장한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2017. 2. 2
	 * @Method Name : saveAprvLineDetail
	 */
	public Map saveAprvLineDetail(final Map<String,Object> param){
		final Map<String,Object> resultMap = new HashMap<String,Object>();
		final List<Map<String,Object>> insertDetailList = (List<Map<String, Object>>) param.get("insertAprvLineDetails");
		final List<Map<String,Object>> updateDetailList = (List<Map<String, Object>>) param.get("updateAprvLineDetails");
		
		if(!insertDetailList.isEmpty()){
			for(final Map<String,Object> inserted : insertDetailList){
				sqlSession.insert(namespace+"insertAprvLineDetail",inserted);
			}
		}
		
		if(!updateDetailList.isEmpty()){
			for(final Map<String,Object> updated : updateDetailList){
				sqlSession.update(namespace+"updateAprvLineDetail",updated);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	/**
	 * aprv line master 삭제한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2017. 2. 1
	 * @Method Name : deleteAprvLineMaster
	 */
	public Map deleteAprvLineMaster(final Map<String, Object> param) {
		final Map<String,Object> resultMap = new HashMap<String,Object>();
		final List<Map<String,Object>> deleteList = (List<Map<String, Object>>) param.get("deleteds");
		
		if(deleteList != null && deleteList.size() > 0){
			//마스터 상세 리스트 삭제
			sqlSession.delete(namespace+"deleteAprvLineMasterDetail",param);
			//마스터 삭제
			sqlSession.delete(namespace+"deleteAprvLineMasterList",param);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
		
	}
	
	/**
	 * aprv line master detail 삭제한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2017. 2. 1
	 * @Method Name : deleteAprvLineMasterDetail
	 */
	public Map deleteAprvLineMasterDetail(final Map<String,Object> param){
		final Map<String,Object> resultMap = new HashMap<String,Object>();
		final List<Map<String,Object>> deleteList = (List<Map<String, Object>>) param.get("deleteds");
		
		if(deleteList != null && deleteList.size() > 0){
			//마스터 상세 삭제
			sqlSession.delete(namespace+"deleteAprvLineMasterDetailList",param);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
}
