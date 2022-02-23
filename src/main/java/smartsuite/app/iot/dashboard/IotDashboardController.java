package smartsuite.app.iot.dashboard;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.collect.Lists;

import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/dashboard/**/")
public class IotDashboardController {
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	@Inject
	SqlSession sqlSession;
	
	/**
	 * 현장 대시보드 데이터 조회(with 기상정보)
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getAllSiteDashboard.do")
	public @ResponseBody Map getAllSiteDashboard(@RequestBody Map param) {
		Map resultMap = new HashMap<String, Object>();
		
		// 현장정보
		resultMap.put("siteInfo", restFulUtilService.callRaycomApi("site/"+param.get("siteId"), param) );
		// 영역별 투입 현황 조회
		resultMap.put("data", restFulUtilService.callRaycomApi("location/dashboard/bpa/site", param) );
		// 현장 기후 정보 조회
		resultMap.put("weatherInfo", restFulUtilService.callRaycomApi("location/weather", param) );
		
		return resultMap;
	}
	
	/**
	 * 현장 대시보드 데이터 조회(투입현황)
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getSiteDashboard.do")
	public @ResponseBody Map getSiteDashboard(@RequestBody Map param) {
		Map resultMap = new HashMap<String, Object>();
		
		// 현장정보
		resultMap.put("siteInfo", restFulUtilService.callRaycomApi("site/"+param.get("siteId"), param) );
		// 영역별 투입 현황 조회
		resultMap.put("data", restFulUtilService.callRaycomApi("location/dashboard/bpa/site", param) );
		
		return resultMap;
	}
	
	/**
	 * 메인 대시보드 데이터 조회
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getMainDashboard.do")
	public @ResponseBody Map getMainDashboard(@RequestBody Map param) {
		Map resultMap = new HashMap<String, Object>();
		
		// 현장정보
		resultMap.put("siteInfo", restFulUtilService.callRaycomApi("site/"+param.get("siteId"), param) );
		
		// 조회
		resultMap.put("data", restFulUtilService.callRaycomApi("location/dashboard/bpa/main", param) );
		
		return resultMap;
	}
	
	/**
	 * 운영 대시보드 데이터 조회
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getOperateDashboard.do")
	public @ResponseBody Map getOperateDashboard(@RequestBody Map param) {
		Map resultMap = new HashMap<String, Object>();
		
		// 현장정보
		resultMap.put("siteInfo", restFulUtilService.callRaycomApi("site/"+param.get("siteId"), param) );
		
		// 조회
		resultMap.put("data", restFulUtilService.callRaycomApi("location/dashboard/bpa/operation", param) );
		
		return resultMap;
	}
	
	/**
	 * 알림 대시보드 데이터 조회
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getAlarmDashboard.do")
	public @ResponseBody Map getAlarmDashboard(@RequestBody Map param) {
		Map resultMap = new HashMap<String, Object>();
		// 조회
		resultMap.put("data", restFulUtilService.callRaycomApi("location/dashboard/bpa/alarm", param) );
		
		return resultMap;
	}
	
	/**
	 * 알림이력 저장을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 03. 24
	 * @Method Name : saveListAlarm
	 */
	//@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListAlarm.do")
	public @ResponseBody Map saveListAlarm(@RequestBody Map param) {
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
		for(Map<String, Object> update : updateList){
			saveData.add(update);
		}

		return  restFulUtilService.callRaycomApi("alarm/upsert/array", saveData);
	}
	
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getPlaceDashboard.do")
	public @ResponseBody Map getPlaceDashboard(@RequestBody Map param) {
		Map resultMap = new HashMap<String, Object>();
		
		// 현장정보
		resultMap.put("siteInfo", restFulUtilService.callRaycomApi("site/"+param.get("siteId"), param) );
		// 현장 기후 정보 조회
		resultMap.put("weatherInfo", restFulUtilService.callRaycomApi("location/weather", param) );
		resultMap.put("ptwReqList", sqlSession.selectList("dashboard.getPtwReqList", param) );
		resultMap.put("deliverTagInfo", sqlSession.selectOne("dashboard.getDeliverTagInfo", param) );
		resultMap.put("chartList1", sqlSession.selectList("dashboard.getPlaceChart1", param) );
		resultMap.put("chartList2", sqlSession.selectList("dashboard.getPlaceChart2", param) );
		resultMap.put("chartList3", sqlSession.selectList("dashboard.getPlaceChart3", param) );
		
		return resultMap;
	}
	
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "low2Dashboard.do")
	public @ResponseBody Map low2Dashboard(@RequestBody Map param) {
		Map resultMap = new HashMap<String, Object>();
		// 인원정보
		resultMap.put("chartList2", sqlSession.selectList("dashboard.getPlaceChart2", param) );
		// 장비정보
		resultMap.put("chartList3", sqlSession.selectList("dashboard.getPlaceChart3", param) );
		//협력사별 인원 정보
		resultMap.put("chartList4", sqlSession.selectList("dashboard.getPlaceChart4", param) );
		
		return resultMap;
	}
	
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "low4Dashboard.do")
	public @ResponseBody Map low4Dashboard(@RequestBody Map param) {
		Map resultMap = new HashMap<String, Object>();
		// 위험작업현황
		resultMap.put("ptwReqList", sqlSession.selectList("dashboard.getPtwReqList", param) );
		
		return resultMap;
	}
	
	
	/**
	 * 알림 대시보드 데이터 조회
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getWeatherInfo.do")
	public @ResponseBody Map getWeatherInfo(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("widget/weather/current/" + (Integer)param.get("siteId"), param);
	}
	
	/**
	 * 박정현 추가
	 * 취약근로자
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListWeakWorker.do")
	public @ResponseBody List findListWeakWorker(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("worker/list", param).get("body");
	}
	
	/**
	 * 박정현 추가
	 * 위험지역 출입이력
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "dangerLocationWorker.do")
	public @ResponseBody List dangerLocationWorker(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("location/target/danger", param).get("body");
	}
	
	/**
	 * 박정현 추가
	 * 위험지역 출입이력
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "workerAggregation.do")
	public @ResponseBody Map workerAggregation(@RequestBody Map param) {
		return (Map)restFulUtilService.callRaycomApi("statistics/worker/aggregation", param).get("body");
	}
	
	/**
	 * 해당 기간 동안 스마트태그 지급 현황을 조회한다.
	 *
	 * @author : yshong
	 * @param param
	 * @return List
	 * @Date :2021. 05. 30
	 * @Method Name : findSensorMappingList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSensorMappingList.do")
	public @ResponseBody List findListWorker(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("sensor/mapping/log", param).get("body");
	}
}
