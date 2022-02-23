package smartsuite.app.common.stateful;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import smartsuite.app.common.shared.Const;

@Service
@Transactional
public class StatefulService {
	
	static final Logger LOG = LoggerFactory.getLogger(StatefulService.class);
	
	@Inject
	private SqlSession sqlSession;
	
	static final private boolean SERVER_STARTUP = false; 
	
	/* NAMESPACE*/
	private static final String NAMESPACE = "infra-stateful.";
	
	public String getCacheBust(){
		return sqlSession.selectOne(NAMESPACE+"getCacheBust");
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void updateCacheBust(){
		String cacheBust = getCacheBust();
		Map param = new HashMap();
		param.put("value", Long.toString(new Date().getTime()));
		if(cacheBust == null){
			sqlSession.insert(NAMESPACE+"insertCacheBust", param);
		}else{
			sqlSession.update(NAMESPACE+"updateCacheBust", param);
		}
	}

	@PostConstruct
	public void init() {
		if(SERVER_STARTUP){
			updateCacheBust();
		}
	}
	
	public Map<String, Map<String,Object>> getClientState() {
		List<Map<String,Object>> states = sqlSession.selectList(NAMESPACE + "getClientState");
		Map<String,Map<String,Object>> clientStates = Maps.newHashMap();
		for(Map<String,Object> state : states) {
			clientStates.put((String)state.get("id"), state);
		}
		return clientStates;
	}

	public Map<String, Object> saveClientState(List<Map<String,Object>> states) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> creates = Lists.newArrayList();
		List<Map<String,Object>> updates = Lists.newArrayList();
		List<Map<String,Object>> deletes = Lists.newArrayList();
		
		for(Map<String,Object> state : states) {
			String id = (String)state.get("id");
			Date lastUpdated = (Date)state.get("lastupdated");
			if(state.containsKey("erased")) {
				deletes.add(state);
			}
			else {
				Map<String,Object> savedState = sqlSession.selectOne(NAMESPACE + "getClientState", id);
				//modified, created 상태중 저장된 상태값이 없으면 무조건 생성
				if(savedState == null) {
					creates.add(state);
				}
				else {
					if(lastUpdated != null && lastUpdated.before((Date)savedState.get("lastupdated"))) {
						LOG.info(state.get("owner") + "[" + state.get("id") + "] exists new revision state. update current state." );
					}
					updates.add(state);
				}
			}
		}
		for(Map<String,Object> state : creates) {
			sqlSession.insert(NAMESPACE + "createClientState", state);
		}
		for(Map<String,Object> state : updates) {
			sqlSession.update(NAMESPACE + "updateClientState", state);
		}
		for(Map<String,Object> state : deletes) {
			sqlSession.delete(NAMESPACE + "deleteClientState", state);
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	public Map<String, Object> clearClientState() {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		sqlSession.delete(NAMESPACE + "clearClientState");
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
}
