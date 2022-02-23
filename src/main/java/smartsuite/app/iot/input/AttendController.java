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
@RequestMapping(value="**/input/**")
public class AttendController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	
	
	/**
	 * 출역인원 조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 16
	 * @Method Name : findListAttend
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListAttend.do")
	public @ResponseBody List findListAttend(@RequestBody Map param) {
		
		return (List) restFulUtilService.callRaycomApi("worker/attend/list", param).get("body");
	}
	
	/**
	 * 출입통계 조회를 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return list
	 * @Date : 2020. 07. 08
	 * @Method Name : findEnterLogList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findEnterLogList.do")
	public @ResponseBody List findEnterLogList(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("worker/enter/log", param).get("body");
	}
	
	
	/**
	 * 출역 인원 저장을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 16
	 * @Method Name : saveAttendList
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveAttendList.do")
	public @ResponseBody Map saveAttendList(@RequestBody Map param) {
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
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(saveData);
	    RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "/worker/attend/upsert/array";
		
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);

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
	 * 출역 인원 삭제를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 16
	 * @Method Name : deleteAttendList
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteAttendList.do")
	public @ResponseBody Map deleteAttendList(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
		//데이터 가공을 여기서 한다.
		for(Map<String, Object> delete : deleteList){
			saveData.add(delete);
		}
		
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(saveData);
		RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "/worker/attend/remove/array";
		
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);
		
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
}
