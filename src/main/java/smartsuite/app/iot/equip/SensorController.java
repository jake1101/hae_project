package smartsuite.app.iot.equip;

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
 * SmartTag 관련 처리를 하는 컨트롤러 Class입니다.
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/equip/**/")
public class SensorController {
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/**
	 * SmartTag 조회
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSensorList.do")
	public @ResponseBody List findSensorList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("sensor/list", param).get("body");
	}	
	/**
	 * SmartTagLog 조회
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListSensorLog.do")
	public @ResponseBody List findListSensorLog(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("sensor/mapping/log/sensor", param).get("body");
	}	
	
	
	/**
	 * SmartTag 저장
	 * @param param
	 * @return
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListSensor.do")
	public @ResponseBody Map saveListSensor(@RequestBody Map param) {
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
		//데이터 가공을 여기서 한다.
		for(Map<String, Object> insert : insertList){
			insert.put("id", null);
			insert.put("siteId", param.get("siteId") );
			saveData.add(insert);
		}
		for(Map<String, Object> update : updateList){
			saveData.add(update);
		}
		
		return restFulUtilService.callRaycomApi("sensor/upsert/array", saveData);
	}
	/**
	 * SmartTag 삭제
	 * @param param
	 * @return
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteSensor.do")
	public @ResponseBody Map deleteSensor(@RequestBody Map param) {
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		return restFulUtilService.callRaycomApi("sensor/remove/array", deleteList);
	}
	
	
	
}