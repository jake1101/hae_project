package smartsuite.app.iot.alarm;

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
@RequestMapping(value="**/alarm/**")
public class AlarmListController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	
	/**
	 * 알림 발생 이력 조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 03. 02
	 * @Method Name : findListAlarm
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListAlarmByTerm.do")
	public @ResponseBody List findListAlarm(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("alarm/list", param).get("body");
	}
	/**
	 * 알림이력 탭 정보 조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 03. 02
	 * @Method Name : findAlarmTabInfo
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findAlarmTabInfo.do")
	public @ResponseBody Map findAlarmTabInfo(@RequestBody Map param) {
		return (Map) restFulUtilService.callRaycomApi("alarm/send/list", param).get("body");
	}
	/**
	 * 알림 상세 내용 조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 03. 02
	 * @Method Name : findAlarmDetails
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findAlarmDetails.do")
	public @ResponseBody Map findAlarmDetails(@RequestBody Map param) {
		return (Map) restFulUtilService.callRaycomApi("alarm/detail", param).get("body");
	}
	
	
	/**
	 * 알림이력 저장을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 03. 24
	 * @Method Name : saveListAlarm
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListAlarm.do")
	public @ResponseBody Map saveListAlarm(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
		//데이터 가공을 여기서 한다.
		if(insertList!=null) {
			for(Map<String, Object> insert : insertList){
				insert.put("siteId", param.get("siteId"));
				saveData.add(insert);
			}
		}
		if(updateList!=null) {
			for(Map<String, Object> update : updateList){
				saveData.add(update);
			}
		}

		return  restFulUtilService.callRaycomApi("alarm/upsert/array", saveData);
	}
	
	/**
	 * 알림 삭제를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 03. 24
	 * @Method Name : deleteAlarm
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteAlarm.do")
	public @ResponseBody Map deleteAlarm(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		return restFulUtilService.callRaycomApi("alarm/remove/array", deleteList);
	}
	/**
	 * 알림 열람을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 03. 24
	 * @Method Name : openAlarm
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "openAlarm.do")
	public @ResponseBody Map openAlarm(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> openList = (List<Map<String, Object>>)param.get("openList");
		
		return restFulUtilService.callRaycomApi("alarm/check/array", openList);
	}
	/**
	 * 알림 숨김을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 03. 24
	 * @Method Name : hiddenAlarm
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "hiddenAlarm.do")
	public @ResponseBody Map hiddenAlarm(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> hiddenList = (List<Map<String, Object>>)param.get("hiddenList");
		
		return restFulUtilService.callRaycomApi("alarm/check/array", hiddenList);
	}
	
}
