package smartsuite.app.iot.equip;

import java.util.ArrayList;
import java.util.Date;
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
import smartsuite.security.authentication.Auth;

/**
 *  Beacon 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author mskim
 * @see 
 * @since 2019. 4. 11
 * @FileName BeaconController.java
 * @package smartsuite.app.bp.manager.shipmanagemant
 * @변경이력 : [2019. 4. 11] msKim 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/**/")
public class SensorCommandController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	
	/**
	 * smartTag 목록 조회를 요청한다.
	 *
	 * @author : msKim
	 * @param param the param
	 * @return the grp code list
	 * @Date : 2020. 02. 06
	 * @Method Name : findListSensorCommand
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListSensorCommand.do")
	public @ResponseBody List findListSensorCommand(@RequestBody Map param) {
		List<Map<String, Object>> resultList =(List) restFulUtilService.callRaycomApi("sensor/list", param).get("body");
		
		if(resultList != null && !resultList.isEmpty()){
			for(Map<String, Object> map : resultList){
				Map<String, Object> version = (Map)map.get("setupInfo");
				if(version != null){
					map.put("gyroOnOff", version.get("gyroOnOff"));
				}
			}
		}
		return resultList;
	}	
	/**
	 * 센서 원격명령을 저장한다.
	 *
	 * @author : ms Kim
	 * @param param the param
	 * @Date : 2019. 4. 15
	 * @Method Name : sensorCommand
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveSensorCommand.do")
	public @ResponseBody List saveSensorCommand(@RequestBody Map param) {
		
		ArrayList<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		String commandType = "";
		String value = "";
		Map<String, Object> data = (Map)param.get("datas");
		if(((String)param.get("command")).equals("transTerm")){
			commandType = "data_trans_term";
			value = (String)data.get("transTerm");
		}else if(((String)param.get("command")).equals("cmdReceiveTerm")){
			commandType = "command_check_term";
			value = (String)data.get("cmdReceiveTerm");
		}else if(((String)param.get("command")).equals("beaconUUID")){
			commandType = "beacon_uuid";
			value = (String)data.get("beaconUUID");
		}else if(((String)param.get("command")).equals("receiveBeaconCount")){
			commandType = "receive_beacon_count";
			value = (String)data.get("receiveBeaconCount");
		}else if(((String)param.get("command")).equals("gyroOnOff")){
			commandType = "gyro_on_off";
			value = (String)data.get("gyroOnOff");
		}else if(((String)param.get("command")).equals("gpsLevel")){
			commandType = "location_level";
			value = (String)data.get("gpsLevel");
		}else if(((String)param.get("command")).equals("dangerZoneBeaconRSSI")){
			commandType = "dangerzone_beacon_rssi";
			value = (String)data.get("dangerZoneBeaconRSSI");
		}else if(((String)param.get("command")).equals("dangerZoneBeaconUUID")){
			commandType = "dangerzone_beacon_uuid";
			value = (String)data.get("dangerZoneBeaconUUID");
		}else if(((String)param.get("command")).equals("buzzerStep")){
			commandType = "buzzer_step";
			value = (String)data.get("buzzerStep");
		}/*else if(((String)param.get("command")).equals("")){
			commandType = "hot_standby";
		}*/else if(((String)param.get("command")).equals("beaconRSSI")){
			commandType = "beacon_rssi";
			value = (String)data.get("beaconRSSI");
		}else if(((String)param.get("command")).equals("settingReq")){
			commandType = "request_setup_info";
		}
		ArrayList  a = (ArrayList)param.get("sensorId");
		
	    for(int i = 0 ; i < a.size() ; i ++ ) {
	    	param.put("sensorId", a.get(i));
	    	param.put("commandType", commandType);
	    	param.put("cmdContent", value);
			resultList.add( restFulUtilService.callRaycomApi("sensor/command", param));
	    }
		
		return resultList;
	}

	/**
	 * 현장 단말기 공통 설정 정보 조회.
	 *
	 * @author : ms Kim
	 * @param param the param
	 * @Date : 2019. 4. 15
	 * @Method Name : sensorCommand
	 */
	@AuthCheck(authCode=Const.READ)
	@RequestMapping(value = "findSensorEnvironment.do")
	public @ResponseBody Map findSensorEnvironment(@RequestBody Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> resultData = (Map<String, Object>) restFulUtilService.callRaycomApi("sensor/environment", param).get("body");
		System.out.println("확인하자" + resultData);
		if(resultData != null) {
			resultData.put("transTerm", String.valueOf(((Double)resultData.get("transTerm")).intValue()));
//			resultData.put("cmdReceiveTerm", String.valueOf(((Double)resultData.get("cmdReceiveTerm")).intValue()));
			resultData.put("receiveBeaconCount", String.valueOf(((Double)resultData.get("receiveBeaconCount")).intValue()));
			resultMap.put("resultData", resultData);
		}
		return resultMap;
	}
	
	/**
	 * 현장 단말기 공통 설정 정보 조회.
	 *
	 * @author : ms Kim
	 * @param param the param
	 * @Date : 2019. 4. 15
	 * @Method Name : sensorCommand
	 */
	@AuthCheck(authCode=Const.READ)
	@RequestMapping(value = "saveSensorEnvironment.do")
	public @ResponseBody Map saveSensorEnvironment(@RequestBody Map param) {
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
	    RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "/sensor/environment/upsert";
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);

		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Gson gson = new Gson();
		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		if(((Double)((Map)jsonObject.get("header")).get("code")) == 1){
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		}else{
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			resultMap.put(Const.RESULT_MSG, (String)((Map)jsonObject.get("header")).get("message"));
		}
		return resultMap;
	}
	
	/**
	 * 4.34.	현장 단말기 원격명령 내역 조회
	 *
	 * @author : msKim
	 * @param param the param
	 * @return the grp code list
	 * @Date : 2019. 4. 15
	 * @Method Name : findListCustomer
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListSensorSettingHistory.do")
	public @ResponseBody List findListSensorSettingHistory(@RequestBody Map param) {
		
		return (List) restFulUtilService.callRaycomApi("/sensor/command/list", param).get("body");
	}		

	
}