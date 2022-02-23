package smartsuite.app.iot.input;

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
 *  작업자 SmartTag교부를 관리 하는 컨트롤러 Class입니다.
 *
 * @author jhbaek
 * @see 
 * @since 2020. 01. 23
 * @FileName VehicleController.java
 * @package smartsuite.app.iot.input
 * @변경이력 : [2020. 01. 21] jhbaek 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/input/**/")
public class VehicleSensorController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	
	/**
	 * 작업자 태그교부 리스트 조회를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the grp code list
	 * @Date :2020. 01. 23
	 * @Method Name : findListVehicleOperation
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListVehicleOperation.do")
	public @ResponseBody List findListVehicleOperation(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("sensor/list", param).get("body");
	}
	
	/**
	 * 작업자 태그교부 리스트 저장을 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @Date : 2020. 01. 23
	 * @Method Name : saveListVehicleOperation
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListVehicleOperation.do")
	public @ResponseBody Map saveListVehicleOperation(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
		//데이터 가공을 여기서 한다.
		for(Map<String, Object> insert : insertList){
			insert.put("id", null);
			insert.put("siteId", param.get("siteId"));
			saveData.add(insert);
		}
		for(Map<String, Object> update : updateList){
			saveData.add(update);
		}
		return restFulUtilService.callRaycomApi("sensor/mapping/target", saveData);
	}
	
	
	
	/**
	 * 팝업 작업자 리스트조회를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the grp code list
	 * @Date :2020. 01. 23
	 * @Method Name : findVehicleList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findVehicleList.do")
	public @ResponseBody List findVehicleList(@RequestBody Map param) {
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
	    RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "vehicle/list";
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);

		Gson gson = new Gson();
		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		List<Map<String, Object>> resultList = (List) jsonObject.get("body");
		return resultList;
	}
	
	
	
	
	
}