package smartsuite.app.iot.site;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.common.shared.Const;

@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class SiteService {

	@Inject
	private SqlSession sqlSession;
	
	private static final String NAMESPACE = "siteVerMgt.";

	public List findListlayerGroup(Map<String, Object> param){
		return sqlSession.selectList(NAMESPACE + "findListlayerGroup", param);
	}
	
	public Map saveLayerGroup(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		
		// UPDATE
		for(Map row : updateList){
			sqlSession.update(NAMESPACE + "updateLayerGroup", row);
		}
		
		// INSERT
		for(Map row : insertList){
			sqlSession.insert(NAMESPACE + "insertLayerGroup", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	public Map deleteLayerGroup(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		// DELETE
		for(Map row : deleteList){
			sqlSession.update(NAMESPACE + "deleteLayerGroup", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	public Map findSiteId(){
		return sqlSession.selectOne(NAMESPACE + "findSiteId");
	}
	
	// site별 비계 조회
	public List findListSiteScaffold(Map<String, Object> param){
		return sqlSession.selectList(NAMESPACE + "findListSiteScaffold", param);
	}
	
	// 비계 위치정보 조회(by scaffold_id)
	public Map findScaffoldLocationById(Map<String, Object> param){
		return sqlSession.selectOne(NAMESPACE + "findScaffoldLocationById", param);
	}

	/**
	 * 현장 정보 조회
	 * @param param
	 * @return
	 */
	public Map<String, Object> findSiteInfo(Map<String, Object> param) throws Exception{
		return sqlSession.selectOne(NAMESPACE + "findSiteInfo", param);
	}
	
	/**
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getAreaTargetCount(Map<String, Object> param) throws Exception{
		return sqlSession.selectList(NAMESPACE + "getAreaTargetCount", param);//
		
	}

	/**
	 * 게이트 웨이 상태 조회
	 * @param param
	 * @return
	 */
	public List<Map<String, Object>> findWidgetGateway(Map<String, Object> param) throws Exception{
		return sqlSession.selectList(NAMESPACE + "findWidgetGateway", param);
	}
	
}
