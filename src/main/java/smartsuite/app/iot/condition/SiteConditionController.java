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

/**
 * 현장상황정보 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author jhkim
 * @see 
 * @since 2020. 2. 10
 * @FileName SiteConditionController.java
 * @package smartsuite.app.iot.condition
 * @변경이력 : [2020. 2. 10] jhkim 최초작성
 */
@SuppressWarnings({"rawtypes","unchecked"})
@Controller
@RequestMapping(value="**/iot/**/")
public class SiteConditionController {
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/**
	 * 협력사 목록을 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the vendor list
	 * @Date : 2020. 2. 10
	 * @Method Name : findListVendor
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListVendor.do")
	public @ResponseBody List findListVendor(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("vendor/list", param).get("body");
	}
	
	/**
	 * 작업자 유형 목록을 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the job type list
	 * @Date : 2020. 2. 10
	 * @Method Name : findListJobType
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListJobType.do")
	public @ResponseBody List findListJobType(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("worker/jobtype/list", param).get("body");
	}
	
	/**
	 * 타겟 목록을 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the target list
	 * @Date : 2020. 2. 27
	 * @Method Name : findSiteTargetList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSiteTargetList.do")
	public @ResponseBody List findSiteTargetList(@RequestBody Map param) {
		return (List<Map<String,Object>>) restFulUtilService.callRaycomApi("location/target/list", param).get("body");
	}
	
	/**
	 * 타겟의 출근 일자를 조회한다.
	 *
	 * @author : yshong
	 * @param param the param
	 * @return targets signal dt
	 * @Date : 2021.07.02
	 * @Method Name : findTargetSignalDate
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findTargetSignalDate.do")
	public @ResponseBody List findTargetSignalDate(@RequestBody Map param) {
		return (List<Map<String,Object>>) restFulUtilService.callRaycomApi("location/target/signal/date", param).get("body");
	}
	
	/**
	 * 현장 현황 정보를 리턴한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the site condition
	 * @Date : 2020. 2. 10
	 * @Method Name : findSiteCondition
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSiteCondition.do")
	public @ResponseBody Map findSiteCondition(@RequestBody Map param) {
		return (Map) restFulUtilService.callRaycomApi("location/now", param).get("body");
	}
	
	/**
	 * 현장 현황 정보를 리턴한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the site condition
	 * @Date : 2020. 7. 21
	 * @Method Name : findSiteConditionWithUnmapping
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSiteConditionWithUnmapping.do")
	public @ResponseBody Map findSiteConditionWithUnmapping(@RequestBody Map param) {
		return (Map) restFulUtilService.callRaycomApi("location/now/ver2", param).get("body");
	}
	
	/**
	 * 실시간 위치 정보를 리턴한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the site real time
	 * @Date : 2020. 2. 10
	 * @Method Name : findSiteRealTime
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSiteRealTime.do")
	public @ResponseBody Map findSiteRealTime(@RequestBody Map param) {
		return (Map) restFulUtilService.callRaycomApi("location/realtime", param).get("body");
	}
	
	/**
	 * 당일 현장 이력을 리턴한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the target history
	 * @Date : 2020. 2. 28
	 * @Method Name : findSiteTargetList
	 */
	/*@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findTargetHistory.do")
	public @ResponseBody List findTargetHistory(@RequestBody Map param) {
		param.put("areaType", "site");
		param.put("areaId", 0);
		return (List) restFulUtilService.callRaycomApi("location/log", param).get("body");
	}*/
	
	/**
	 * 시간/영역별 이력을 리턴한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the spacetime history
	 * @Date : 2020. 3. 18
	 * @Method Name : findSpacetimeHistory
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSpacetimeHistory.do")
	public @ResponseBody List findSpacetimeHistory(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("location/log", param).get("body");
	}
	
	/**
	 * 센서의 시간별 이력을 리턴한다. 
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the spacetime history by sensor
	 * @Date : 2020. 6. 1
	 * @Method Name : findSensorSpacetimeHistory
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSensorSpacetimeHistory.do")
	public @ResponseBody List findSensorSpacetimeHistory(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("location/sensor/log", param).get("body");
	}
	
	/**
	 * 위험 지역 이력 목록을 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the danger history list
	 * @Date : 2020. 3. 12
	 * @Method Name : findDangerHistory
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findDangerHistory.do")
	public @ResponseBody List findDangerHistory(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("area/danger/list", param).get("body");
	}
	
	/**
	 * 위험지역 저장을 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @Date : 2020. 3. 12
	 * @Method Name : saveDangerInfo
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveDangerInfo.do")
	public @ResponseBody Map saveDangerInfo(@RequestBody Map param) {
		if(param.get("id") == null){
			param.put("id", 0);
		}
		return restFulUtilService.callRaycomApi("area/danger/upsert", param);
	}
	
	/**
	 * 핸드폰번호를 리턴한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the site real time
	 * @Date : 2020. 3. 02
	 * @Method Name : findPhoneNumber
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findPhoneNumber.do")
	public @ResponseBody Map findPhoneNumber(@RequestBody Map param) {
		return (Map) restFulUtilService.callRaycomApi("worker/"+param.get("workerId"), param).get("body");
	}
	
	/**
	 * 현장 분포도 데이터를 리턴한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the site distribution data
	 * @Date : 2020. 5. 28
	 * @Method Name : siteDistribution
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "siteDistribution.do")
	public @ResponseBody List siteDistribution(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("location/distribution", param).get("body");
	}
	
	/**
	 * 센서 목록을 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the sensor list
	 * @Date : 2020. 6. 01
	 * @Method Name : findSiteTagList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSiteTagList.do")
	public @ResponseBody List findSiteTagList(@RequestBody Map param) {
		return (List<Map<String,Object>>) restFulUtilService.callRaycomApi("sensor/list/label", param).get("body");
	}
}
