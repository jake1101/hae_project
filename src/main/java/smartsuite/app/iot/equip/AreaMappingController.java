package smartsuite.app.iot.equip;

import java.util.ArrayList;
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

/**
 * Beacon 관련 처리를 하는 컨트롤러 Class입니다. 
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/equip/**/")
public class AreaMappingController {
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/**
	 * 영역리스트 조회	
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findAreaList.do")
	public @ResponseBody List findAreaList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("area/list", param).get("body");
	}	
	
	/**
	 * 그리드(센서,비콘) 리스트 조회	
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListGrid.do")
	public @ResponseBody Map findListGrid(@RequestBody Map param) {
		Map resultMap =  new HashMap<String,Object>();
		resultMap.put("gatewayList", restFulUtilService.callRaycomApi("three/gateway/list", param).get("body"));
		param.remove("areaId");
		resultMap.put("beaconList", restFulUtilService.callRaycomApi("three/beacon/list", param).get("body"));
		
		return resultMap ;
	}
	
	/**
	 * 그룹리스트 조회	
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findGroupList.do")
	public @ResponseBody List findGroupList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("three/layergroup/list", param).get("body");
//		List result = new ArrayList();
//		Map map1 = new HashMap<String,Object>();
//		map1.put("layerGroupId", 1);
//		map1.put("groupName", "layerGroup1");
//		Map map2 = new HashMap<String,Object>();
//		map2.put("layerGroupId", 2);
//		map2.put("groupName", "Group");
//		result.add(map1);
//		result.add(map2);
//		return result;
		
	}	
	
	/**
	 * Gateway 위치정보 저장을 요청한다.
	 *
	 * @author : jh baek
	 * @param param the param
	 * @Date : 2020. 07. 07
	 * @Method Name : saveGatewayInfo
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveGatewayMappingInfo.do")
	public @ResponseBody Map saveGatewayInfo(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("arr");
		
		return restFulUtilService.callRaycomApi("three/gateway/position/upsert/array", updateList);
	}
	
	/**
	 * Gateway 위치정보 삭제를 요청한다.
	 *
	 * @author : jh baek
	 * @param param the param
	 * @Date : 2020. 07. 07
	 * @Method Name : onResetGatewayMapping
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "onResetGatewayMapping.do")
	public @ResponseBody Map onResetGatewayMapping(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> selectionItems = (List<Map<String, Object>>)param.get("selectionItems");
		
		return restFulUtilService.callRaycomApi("three/gateway/position/remove/array", selectionItems);
	}
	
	
	/**
	 * Beacon 위치정보 저장을 요청한다.
	 *
	 * @author : jh baek
	 * @param param the param
	 * @Date : 2020. 07. 07
	 * @Method Name : saveBeaconInfo
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveBeaconMappingInfo.do")
	public @ResponseBody Map saveBeaconInfo(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateItems");
		
		return restFulUtilService.callRaycomApi("three/beacon/position/upsert/array", updateList);
	}
	
	/**
	 * Beacon 위치정보 삭제를 요청한다.
	 *
	 * @author : jh baek
	 * @param param the param
	 * @Date : 2020. 07. 08
	 * @Method Name : onResetBeaconMapping
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "onResetBeaconMapping.do")
	public @ResponseBody Map onResetBeaconMapping(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> selectionItems = (List<Map<String, Object>>)param.get("selectionItems");
		
		return restFulUtilService.callRaycomApi("three/beacon/position/remove/array", selectionItems);
	}
	
	
	
	/**
	 * Beacon 을 위험 비콘으로 변경한다
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-08-31
	 * @Method Name : saveDangerBeacon
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveDangerBeacon.do")
	public @ResponseBody Map saveDangerBeacon(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateItems");
		
		return restFulUtilService.callRaycomApi("three/beacon/danger/upsert/array", updateList);
	}
	/**
	 * 위험 지정이 안된 Beacon만 조회한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-00-01
	 * @Method Name : findNoDangerBeacon
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findNoDangerBeacon.do")
	public @ResponseBody List findNoDangerBeacon(@RequestBody Map param) {
//		return (List)restFulUtilService.callRaycomApi("beacon/list", param).get("body");
		return (List)restFulUtilService.callRaycomApi("three/beacon/list", param).get("body");
	}	
}