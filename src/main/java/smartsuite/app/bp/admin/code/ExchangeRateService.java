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
 * 환율 관련 처리하는 서비스 Class입니다.
 *
 * @author JuEung Kim
 * @see 
 * @FileName ExchangeRateService.java
 * @package smartsuite.app.bp.admin.code
 * @Since 2017. 06. 05
 * @변경이력 : [2017. 06. 05] JuEung Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class ExchangeRateService {
	
	/** The sql session. */
	@Inject
	private SqlSession sqlSession;
	
	/**
	 * 환율관리 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map<String,Object>> findListExchangeRate(Map<String, Object> param) {
		return sqlSession.selectList("exchangeRate.findListExchangeRate", param);
	}
	
	/**
	 * 환율관리 데이터를 저장한다.
	 * @param param
	 * @return
	 */
	public Map saveListExchangeRate(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		
		// UPDATE
		for(Map row : updateList){
			sqlSession.update("exchangeRate.updateExchangeRate", row);
		}
		
		// INSERT
		for(Map row : insertList){
			sqlSession.insert("exchangeRate.insertExchangeRate", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * 환율관리 데이터를 삭제한다.
	 * @param param
	 * @return
	 */
	public Map deleteListExchangeRate(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		// DELETE
		for(Map row : deleteList){
			sqlSession.delete("exchangeRate.deleteExchangeRate", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
}
