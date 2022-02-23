package smartsuite.app.iot.shared;

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
@RequestMapping(value="**/iot/**")
public class WorkerJobTypeController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	/**
	 * 직종 목록 조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 15
	 * @Method Name : findJobTypeList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findJobTypeList.do")
	public @ResponseBody List findJobTypeList(@RequestBody Map param) {
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
		
	    RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "/worker/jobtype/list";
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);

		Gson gson = new Gson();
		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		return (List) jsonObject.get("body");
	}
	
	
	/**
	 * 직종 저장을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 15
	 * @Method Name : saveJobType
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveJobType.do")
	public @ResponseBody Map saveJobType(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
		//데이터 가공을 여기서 한다.
		for(Map<String, Object> insert : insertList){
			insert.put("id", null);
			saveData.add(insert);
		}
		for(Map<String, Object> update : updateList){
			saveData.add(update);
		}
		
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(saveData);
		RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "/worker/jobtype/upsert/array";
		
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);
		
		Gson gson = new Gson();
		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		if(((Double)((Map)jsonObject.get("header")).get("code")) == 1){
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		}else{
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
		}
		return resultMap;
	}
	
}
