package smartsuite.app.iot.admin;

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

/**
 * Customer 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author mskim
 * @see 
 * @since 2019. 4. 3
 * @FileName CustomerController.java
 * @package smartsuite.app.bp.manager.customer
 * @변경이력 : [2019. 4. 3] msKim 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/admin/**/")
public class CustomerController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	
	/**
	 * 스마트태그 시스템을 사용하는 운영사를 조회합니다.
	 * Header의 userToken정보에 따라, 접근가능한 운영사만 리스트로 리턴됩니다.
	 * includeNoteUse / String / 사용중지 운영사 포함여부
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListCustomer.do")
	public @ResponseBody List findListCustomer(@RequestBody Map param) {
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
		
	    RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "company/list";
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);

		Gson gson = new Gson();
		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		return (List) jsonObject.get("body");
	}
	
	/**
	 * 그룹코드 목록 조회를 요청한다.
	 *
	 * @author : msKim
	 * @param param the param
	 * @return the grp code list
	 * @Date : 2019. 4. 3
	 * @Method Name : findListCustomer
	 */
	//@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getComboCustomer.do")
	public @ResponseBody List getComboCustomer(@RequestBody Map param) {
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
		
	    RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "company/list";
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);

		Gson gson = new Gson();
		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		return (List) jsonObject.get("body");
	}	
	
	/**
	 * 그룹코드 저장을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListGrpCode
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListCustomer.do")
	public @ResponseBody Map saveListCustomer(@RequestBody Map param) {
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
		String customerUrl = URL + "company/upsert/array";
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
	
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteListCompany.do")
	public @ResponseBody Map deleteListCompany(@RequestBody Map param) {
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		return restFulUtilService.callRaycomApi("company/remove/array", deleteList);
	}
	
}