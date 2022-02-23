package smartsuite.app.iot.statistics;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.collect.Lists;

import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

@SuppressWarnings({"rawtypes"})
@Controller
@RequestMapping(value="**/iot/statistics/**/")
public class statisticsController {
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/**
	 * 작업자 투입 통계를 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return worker Input statistics
	 * @Date : 2020. 6. 23
	 * @Method Name : findWorkerInputStat
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findWorkerInputStat.do")
	public @ResponseBody Map findWorkerInputStat(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("statistics/date/vendor/job", param);
	}
	
	/**
	 * 이동장비 투입 통계를 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return vehicle Input statistics
	 * @Date : 2020. 7. 7
	 * @Method Name : findVehicleInputStat
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findVehicleInputStat.do")
	public @ResponseBody Map findVehicleInputStat(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("statistics/date/vehicle/distance/time", param);
	}
	
	
	/**
	 * 작업자 목록 조회를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the grp code list
	 * @Date :2020. 12. 04
	 * @Method Name : findListWorkerHeartBeat
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListWorkerHeartBeat.do")
	public @ResponseBody List findListWorkerHeartBeat(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("worker/list", param).get("body");
	}
	/**
	 * 심박수 그래프 정보 조회를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the grp code list
	 * @Date :2020. 12. 04
	 * @Method Name : findHeartBeatGraphInfo
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findHeartBeatGraphInfo.do")
	public @ResponseBody List findHeartBeatGraphInfo(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("statistics/workers/period/heartbeat", param).get("body");
	}

	/**
	 * 운행통계이력을 조회를 요청한다.
	 * 
	 * @author jh.Park
	 * @param param
	 * @return list
	 * @Date : 2021-08-17
	 * @Method Name : findListDrivingStatic
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListDrivingSum.do")
	public @ResponseBody List findListDrivingSum(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("/statistics/driving/list", param).get("body");
	}
	
	/**
	 * 개별운행이력을 조회를 요청한다.
	 * 
	 * @author jh.Park
	 * @param param
	 * @return list
	 * @Date : 2021-08-17
	 * @Method Name : findListDrivingStatic
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListDrivingSingle.do")
	public @ResponseBody List findListDrivingSingle(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("/statistics/driving/list/single", param).get("body");
	}
	
	/**
	 * 트럭 정보를 조회를 요청한다.
	 * 
	 * @author jh.Park
	 * @param param
	 * @return list
	 * @Date : 2021-08-17
	 * @Method Name : findListTruck
	 */
	@AuthCheck
	@RequestMapping(value = "findListTruck.do")
	public @ResponseBody List findListTruck(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("/vehicle/truck/list", param).get("body");
	}
	
	/**
	 * 운행 통계 이력 저장을 요청한다.
	 *
	 * @author jh.Park
	 * @param param
	 * @return map
	 * @Date : 2021-08-17
	 * @Method Name : saveDrivingHist
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveDrivingHist.do")
	public @ResponseBody Map saveDrivingHist(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
		//데이터 가공을 여기서 한다.
		for(Map<String, Object> insert : insertList){
			saveData.add(insert);
		}
		for(Map<String, Object> update : updateList){
			saveData.add(update);
		}
		
		return restFulUtilService.callRaycomApi("/statistics/driving/upsert/array", saveData);
	}
	
	/**
	 * 사토지 조회한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-10-19
	 * @Method Name : findLandfill
	 */
	@AuthCheck(authCode=Const.READ)
	@RequestMapping(value = "findLandfill.do")
	public @ResponseBody List findLandfill(@RequestBody Map param) {
		return  (List)restFulUtilService.callRaycomApi("/area/list",param).get("body");
	}

}
