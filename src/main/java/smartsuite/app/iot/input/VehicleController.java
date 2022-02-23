package smartsuite.app.iot.input;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.google.common.collect.Lists;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.shared.Const;
import smartsuite.messagesource.web.MessageService;
import smartsuite.security.annotation.AuthCheck;

@Controller
@RequestMapping(value="**/iot/input/*")
public class VehicleController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	
	/**
	 * 이동장비 목록 조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 03
	 * @Method Name : findListVehicle
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListVehicle.do")
	public @ResponseBody List findListVehicle(@RequestBody Map param) {
		return  (List) restFulUtilService.callRaycomApi("vehicle/list", param).get("body");
	}
	
	
	/**
	 * 운행이력 조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 03
	 * @Method Name : findLocationLog
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findLocationLog.do")
	public @ResponseBody List findLocationLog(@RequestBody Map param) {
		return  (List) restFulUtilService.callRaycomApi("company/list/all", param).get("body");
	}
	/**
	 * 운전자이력 조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 03
	 * @Method Name : findDriverLog
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findDriverLog.do")
	public @ResponseBody List findDriverLog(@RequestBody Map param) {
		
		return (List) restFulUtilService.callRaycomApi("vehicle/driver/log", param).get("body");
	}
	/**
	 * 운전자 목록 조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 03
	 * @Method Name : findWorkerList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findWorkerList.do")
	public @ResponseBody List findWorkerList(@RequestBody Map param) {
		
		return  (List) restFulUtilService.callRaycomApi("company/list/all", param).get("body");
	}
	/**
	 * 태그 목록 조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 03
	 * @Method Name : findTagList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSensorList.do")
	public @ResponseBody List findTagList(@RequestBody Map param) {
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
		
		return  (List) restFulUtilService.callRaycomApi("sensor/list", param).get("body");
	}

	
	
	/**
	 * 이동장비 저장을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 03
	 * @Method Name : saveInfoVehicle
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveInfoVehicle.do")
	public @ResponseBody Map saveInfoVehicle(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
		((Map<String, Object>) param.get("vehicleInfo")).put("siteId", param.get("siteId"));
		
		saveData.add((Map<String, Object>) param.get("vehicleInfo"));
		
		return restFulUtilService.callRaycomApi("vehicle/upsert/array", saveData);
	}
	
	/**
	 * 이동장비 삭제를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 03
	 * @Method Name : deleteVehicle
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteVehicle.do")
	public @ResponseBody Map deleteVehicle(@RequestBody Map param) {
		Map m =  restFulUtilService.callRaycomApi("vehicle/remove/array",  param.get("deleteList"));
		return m;
	}
	
	/**
	 * 부착 가능한 비콘 리스트를 요청한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-08-03
	 * @Method Name : findListBeacon
	 */
	@AuthCheck(authCode=Const.READ)
	@RequestMapping(value = "findListIdBeacon.do")
	public @ResponseBody List findListIdBeacon(@RequestBody Map param) {

		return  (List)restFulUtilService.callRaycomApi("/beacon/list/id",param).get("body");
	}
	
	/**
	 * 안전장비 목록 조회를 요청한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-08-03
	 * @Method Name : findListBeacon
	 */
	@AuthCheck(authCode=Const.READ)
	@RequestMapping(value = "findListIdSafetyEqui.do")
	public @ResponseBody List findListIdSafetyEqui(@RequestBody Map param) {

		return  (List)restFulUtilService.callRaycomApi("/safety/list",param).get("body");
	}
	
	/**
	 * 안전장비를 정보를 저장한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-08-03
	 * @Method Name : saveInfoSafetyEqui
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveInfoSafetyEqui.do")
	public @ResponseBody Map saveInfoSafetyEqui(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("/safety/upsert",param.get("safetyEuqiInfo"));
	}
	
	/**
	 * 안전장비를 삭제한다
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-08-06
	 * @Method Name : deleteSafetyEqui
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteSafetyEqui.do")
	public @ResponseBody Map deleteSafetyEqui(@RequestBody Map param) {
		
		return restFulUtilService.callRaycomApi("/safety/delete",param);
	}
	
	/**
	 * 사토지 혹은 회피지역을 조회한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-09-27
	 * @Method Name : findListDriveArea
	 */
	@AuthCheck(authCode=Const.READ)
	@RequestMapping(value = "findListDriveArea.do")
	public @ResponseBody List findListDriveArea(@RequestBody Map param) {
		return  (List)restFulUtilService.callRaycomApi("/area/danger/list",param).get("body");
	}
	
	/**
	 * 운행 지역을 삭제한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-09-27
	 * @Method Name : deleteDriveArea
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteDriveArea.do")
	public @ResponseBody Map deleteDriveArea(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("/area/danger/remove/array", (List<Map<String, Object>>)param.get("deleteList"));
	}
	
	/**
	 * 영역을 저장 요청한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-10-15
	 * @Method Name : deleteDriveArea
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveLandfill.do")
	public @ResponseBody Map saveLandfill(@RequestBody Map param) {
		if(param.get("id") == null){
			param.put("id", 0);
		}
		
		return restFulUtilService.callRaycomApi("area/upsert", param);
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
