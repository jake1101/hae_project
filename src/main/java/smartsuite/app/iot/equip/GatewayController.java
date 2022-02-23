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
 *  통신로그 처리를 하는 컨트롤러 Class입니다.
 *
 * @author mskim
 * @see 
 * @since 2019. 4. 17
 * @FileName VendorController.java
 * @package smartsuite.app.bp.manager.shipmanagemant
 * @변경이력 : [2019. 4. 17] msKim 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/**/")

public class GatewayController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	
	/**
	 * Gateway 목록 조회를 요청한다.
	 *
	 * @author : msKim
	 * @param param the param
	 * @return the grp code list
	 * @Date : 2019. 4. 3
	 * @Method Name : findListLoraGateway
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListLoraGateway.do")
	public @ResponseBody List findListLoraGateway(@RequestBody Map param) {
		List<Map<String, Object>> resultList =(List) restFulUtilService.callRaycomApi("/gateway/list", param).get("body");
		
		if(resultList != null) {
			for(Map<String, Object> resultMap : resultList){
				Map<String, Object> location = (Map)resultMap.get("setupPoint");
				if(location != null){
					resultMap.put("lat", location.get("lat"));
					resultMap.put("lon", location.get("lon"));
				}
			}
		}
		
		return resultList;
	}
	
	//사용자가 접근 가능한 현장 목록을 리턴한다.
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findUserSiteInfo.do")
	public @ResponseBody List findUserSiteInfo(@RequestBody Map param) {
		
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
		
		RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "user/site";
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);
		
		Gson gson = new Gson();
		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		List<Map<String, Object>> resultList = (List) jsonObject.get("body");
		
		return resultList;
	}
	
	/**
	 * Gateway Log목록 조회를 요청한다.
	 *
	 * @author : msKim
	 * @param param the param
	 * @return the grp code list
	 * @Date : 2019. 4. 3
	 * @Method Name : findListCustomer
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListGatewayLog.do")
	public @ResponseBody List findListGatewayLog(@RequestBody Map param) {
		List<Map<String, Object>> resultList =(List) restFulUtilService.callRaycomApi("/gateway/position/log", param).get("body");
		
		if(resultList == null)
			return new ArrayList();
		for(Map<String, Object> resultMap : resultList){
			Map<String, Object> location = (Map)resultMap.get("setupPoint");
			if(location != null){
				resultMap.put("lat", location.get("lat"));
				resultMap.put("lon", location.get("lon"));
			}
		}
		return resultList;
	}
	/**
	 * Gateway 저장을 요청한다.
	 *
	 * @author : ms Kim
	 * @param param the param
	 * @Date : 2019. 4. 15
	 * @Method Name : saveListVendor
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListGateway.do")
	public @ResponseBody Map saveListGateway(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
		//데이터 가공을 여기서 한다.
		for(Map<String, Object> insert : insertList){
			saveData.add(insert);
		}
		for(Map<String, Object> update : updateList){
			saveData.add(update);
		}
		
		return restFulUtilService.callRaycomApi("gateway/upsert/array", saveData);
	}
	/**
	 * Gateway 삭제를 요청한다.
	 *
	 * @author : ms Kim
	 * @param param the param
	 * @Date : 2019. 4. 15
	 * @Method Name : saveListVendor
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteListGateway.do")
	public @ResponseBody Map deleteListGateway(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		
		return restFulUtilService.callRaycomApi("gateway/remove/array", deleteList);
	}
	/**
	 * OutLine생성을 요청한다.
	 *
	 * @author : ms Kim
	 * @param param the param
	 * @Date : 2019. 4. 15
	 * @Method Name : saveListVendor
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "createOutLine.do")
	public @ResponseBody Map createOutLine(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
	    RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "site/"+param.get("siteId")+"/loragateway/outline";
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
	
	/**
	 * 현장 조회
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSiteInfoForGateway.do")
	public @ResponseBody List findSiteInfo(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("area/site/list", param).get("body");
	}
}