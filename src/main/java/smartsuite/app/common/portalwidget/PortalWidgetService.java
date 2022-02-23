package smartsuite.app.common.portalwidget;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.collect.Lists;

import smartsuite.app.bp.admin.exchange.scheduler.ExchangeSchedulerService;
import smartsuite.app.common.shared.Const;

/**
 * PortalWidget 관련 처리하는 서비스 Class입니다.
 *
 * @see 
 * @FileName PortalWidgetService.java
 * @package smartsuite.app.common.portalwidget
 * @Since 2017. 12. 4
 */
@Service
@Transactional
public class PortalWidgetService {

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;
	/** The namespace. */
	private static final String namespace = "portal-widget.";
	
	@Inject
	ExchangeSchedulerService exchangeSchedulerService;
	/**
	 * list board 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2017. 12. 4
	 * @Method Name : findListBoard
	 */
	public List<Map<String,Object>> findNoticeBoardList(Map<String, Object> param) {
		return sqlSession.selectList(namespace+"findNoticeBoardList", param);
	}

	/**
	 * todo 정보를 조회한다.
	 *
	 * @param param the param
	 * @return the map<string, object>
	 * @Date : 2017. 12. 4
	 * @Method Name : findListTodo
	 */
	public Map<String, Object> findTodoInfo(Map<String, Object> param) {
		// TO-DO 항목 조회
		List<Map<String, Object>> todoList = sqlSession.selectList(namespace + "findListMyTodo", param);
		
		Integer totalCnt = 0;
		for(Map<String, Object> todo : todoList) {
			// TO-DO 항목 관리에서 설정한 쿼리 아이디, 파라미터 정보를 사용하여 TO-DO 항목별 count를 조회해온다.
			String parameters = todo.get("call_param") == null ? "" : todo.get("call_param").toString();
			parameters = parameters.substring( parameters.indexOf('?')+1 );
			String[] pArr = parameters.split("&");
			
			Map<String, Object> qryParams = new HashMap<String, Object>();
			for(int i=0; i<pArr.length; i++) {
				String qryParam = pArr[i];
				String[] keyVal = qryParam.split("=");
				
				if(keyVal.length == 2) {
					qryParams.put(keyVal[0], keyVal[1]);
				}
			}
			Integer cnt = sqlSession.selectOne(namespace + todo.get("qry_id"), qryParams);
			todo.put("cnt", cnt);
			totalCnt += cnt;
		}
		
		Map<String, Object> todoGroup = sqlSession.selectOne(namespace + "findTodoGroup", param);
		if(todoGroup != null) {
			todoGroup.put("tot_cnt", totalCnt);
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("todoGroup", todoGroup);
		result.put("todoList", todoList);
		
		return result;
	}

	/**
	 * list exchange 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @throws Exception 
	 * @Date : 2017. 12. 20
	 * @Method Name : findListExchange
	 */
	public List<Map<String, Object>> findListExchange(Map<String, Object> param) throws Exception {
		List<Map<String,Object>> resultList = sqlSession.selectList(namespace + "findListExchange",param);
		if(resultList == null || resultList.size() < 1){
			exchangeSchedulerService.updateListExchange(new HashMap<String,Object>());
			resultList = sqlSession.selectList(namespace + "findListExchange",param);
		}
		return resultList;
	}

	/**
	 * list po tot amt tree mon 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2017. 12. 20
	 * @Method Name : findListPoTotAmtTreeMon
	 */
	public List<Map<String, Object>> findListPoTotAmtTreeMon(Map<String, Object> param) {
		Calendar cal= Calendar.getInstance();
		cal.add(Calendar.MONTH,-2);
		
		if(param==null){
			param = new HashMap<String,Object>();
		}
		
		param.put("tree_date", cal.getTime());
		Integer treeMonth = cal.get(Calendar.MONTH) + 1;
		
		List<Map<String,Object>> toAmtList = sqlSession.selectList(namespace + "findListPoTotAmtTreeMon",param);
		
		//3개의 빈 리스트
		List<Map<String,Object>> resultList = Lists.newArrayList();
		for(int i = 0; i < 3 ; i++){
			Map<String,Object> map = new HashMap<String,Object>();
			Integer month = treeMonth+i;
			if(month > 12){
				month = month - 12;
			}
			String monthStr = changeMonStr(month);
			map.put("month",monthStr);
			for(Map<String,Object> toAmt: toAmtList){
				if(monthStr.equals(toAmt.get("month"))){
					map = toAmt;
				}
			}
			resultList.add(map);
		}
		
		Map<String,Object> toYearTotAmt = sqlSession.selectOne(namespace + "findListPoTotAmtToyear",param);
		resultList.add(toYearTotAmt);
		return resultList;
	}
	
	/**
	 * Change mon str.
	 *
	 * @param mon the mon
	 * @return the string
	 */
	private String changeMonStr(Integer mon){
		String monStr = "";
		if(mon < 10){
			monStr = "0" + Integer.toString(mon);
		}else{
			monStr = Integer.toString(mon);
		}
		return monStr;
	}

	/**
	 * list exchange 수정한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map< string, object>
	 * @throws Exception the excepti
	 * 
	 * on
	 * @Date : 2017. 12. 29
	 * @Method Name : updateListExchange
	 */
	public Map<String,Object> updateListExchange(Map<String, Object> param) throws Exception {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		exchangeSchedulerService.updateListExchange(new HashMap<String,Object>());
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
}
