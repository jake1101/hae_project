package smartsuite.app.iot.condition;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;


@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/**/")
public class TargetStateController {
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/**
	 * 현장 작업자 현황 전체를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the worker list
	 * @Date : 2020. 2. 18
	 * @Method Name : findLocationWorkerNow
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findLocationWorkerNow.do")
	public @ResponseBody List findLocationWorkerNow(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("location/target/now", param).get("body");
	}
	/**
	 * 현장 작업자 긴급호출 리스트를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the worker list
	 * @Date : 2020. 3. 02
	 * @Method Name : findWorkerStateEmerge
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findWorkerStateEmerge.do")
	public @ResponseBody List findWorkerStateEmerge(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("location/target/emergency", param).get("body");
	}
	/**
	 * 현장 작업자 위험지역 리스트를 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the danger sensor list
	 * @Date : 2020.06.11
	 * @Method Name : findWorkerStateDanger
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findWorkerStateDanger.do")
	public @ResponseBody List findWorkerStateDanger(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("location/target/danger", param).get("body");
	}
	/**
	 * 현장 작업자 비활동 리스트를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the worker list
	 * @Date : 2020. 3. 02
	 * @Method Name : findWorkerStateNoActivity
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findWorkerStateNoActivity.do")
	public @ResponseBody List findWorkerStateNoActivity(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("location/target/inactive", param).get("body");
	}
	/**
	 * 현장 작업자 신호없음 리스트를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the worker list
	 * @Date : 2020. 3. 02
	 * @Method Name : findWorkerStateNoSignal
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findWorkerStateNoSignal.do")
	public @ResponseBody List findWorkerStateNoSignal(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("location/target/nosignal", param).get("body");
	}
	
	/**
	 * 현장 작업자 음영지역 리스트를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the worker list
	 * @Date : 2020. 3. 02
	 * @Method Name : findWorkerStateShade
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findWorkerStateShade.do")
	public @ResponseBody List findWorkerStateShade(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("location/target/nolocation", param).get("body");
	}
	
	/**
	 * 수신상태 팝업 조회를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the grp code list
	 * @Date :2020. 03. 11
	 * @Method Name : findSenserState
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSenserState.do")
	public @ResponseBody Map findSenserState(@RequestBody Map param) {
		return (Map)restFulUtilService.callRaycomApi("sensor/monitor", param).get("body");
	}

	/**
	 * 현장 작업자 활동량 팝업창 활동량을 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the worker list
	 * @Date : 2020. 3. 11
	 * @Method Name : findWorkerActivity
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findWorkerActivity.do")
	public @ResponseBody List findWorkerActivity(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("worker/activity", param).get("body");
	}
	/**
	 * 현장 전체 평균 활동량을 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the worker list
	 * @Date : 2020. 3. 11
	 * @Method Name : findWorkerActivity
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findActivitySite.do")
	public @ResponseBody List findActivitySite(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("worker/average/activity", param).get("body");
	}
	
	
	/**
	 * 심박수를 나타내는 차트에 필요한 데이터를 요청한다
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return heartBeat Data
	 * @Date : 2020. 11. 17
	 * @Method Name : findHeartBeatInfo
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findHeartBeatInfo.do")
	public @ResponseBody Map findHeartBeatInfo(@RequestBody Map param) {
		return (Map)restFulUtilService.callRaycomApi("statistics/worker/daily/heartbeat", param).get("body");
	}
}
