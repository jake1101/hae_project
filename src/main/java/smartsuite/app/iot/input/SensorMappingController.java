package smartsuite.app.iot.input;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.shared.Const;
import smartsuite.messagesource.web.MessageService;
import smartsuite.security.annotation.AuthCheck;

/**
 *  스마트태그 교부현황 컨트롤러 Class입니다.
 *
 * @author yshong
 * @see 
 * @since 2021-05-30
 * @FileName SensorMappingController.java
 * @package smartsuite.app.iot.input
 * @변경이력 : [2021. 05. 30] yshong 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/input/*")
public class SensorMappingController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	
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
	
	/**
	 * 해당 기간 동안 스마트태그 지급 현황을 조회한다. sensorId 로
	 *
	 * @author : yshong
	 * @param param
	 * @return List
	 * @Date :2021. 05. 30
	 * @Method Name : findSensorMappingList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSensorMappingListBySensorId.do")
	public @ResponseBody List findSensorMappingListBySensorId(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("sensor/mapping/log/sensor", param).get("body");
	}	
	/**
	 * 해당 기간 동안 스마트태그 지급 현황을 조회한다. targetId 로
	 *
	 * @author : yshong
	 * @param param
	 * @return List
	 * @Date :2021. 05. 30
	 * @Method Name : findSensorMappingList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSensorMappingListByTargetId.do")
	public @ResponseBody List findSensorMappingListByTargetId(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("sensor/mapping/log/target", param).get("body");
	}	
	
	
	/**
	 * 센서 교부이력에 대한 특이사항을 입력하여 저장한다.
	 *
	 * @author : yshong
	 * @param param
	 * @return List
	 * @Date :2021. 05. 30
	 * @Method Name : saveSensorMappingLog
	 */
	@AuthCheck (authCode=Const.SAVE)
	@RequestMapping(value = "saveSensorMappingLog.do")
	public @ResponseBody Map saveSensorMappingLog(@RequestBody Map param) {
		List updateList = (List)param.get("upsertList");
		return restFulUtilService.callRaycomApi("/sensor/mapping/log/update", updateList);
	}	
	
}