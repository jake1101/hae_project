package smartsuite.app.iot.site;

import java.util.ArrayList;
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
@RequestMapping(value="**/iot/**/")
public class AreaMappController {	//dispatcher-context
	
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	/**
	 * 영역정보를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 14
	 * @Method Name : findAreaInfo
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findAreaInfo.do")
	public @ResponseBody List findAreaInfo(@RequestBody Map param) {
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
		
		RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "company/list/all";
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);
		
		Gson gson = new Gson();
		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		return (List) jsonObject.get("body");
	}
		
	//필요
//	@RequestMapping(value="findAreaInfo.do")
//	public @ResponseBody List findAreaInfo(@RequestBody Map param) {
// 	   return areaMappService.findAreaInfo(param); 
//   }	
	
	
		
	/**
	 * 구역정보를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 14
	 * @Method Name : findGroupInfo
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findGroupInfo.do")
	public @ResponseBody List findGroupInfo(@RequestBody Map param) {
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
		
		RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "company/list/all";
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);
		
		Gson gson = new Gson();
		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		return (List) jsonObject.get("body");
	}
	
	//필요
//	@RequestMapping(value="findGroupInfo.do")
//	public @ResponseBody List findGroupInfo(@RequestBody Map param) {
// 	   return areaMappService.findGroupInfo(param); 
//   }
	
	
	
	
	/**
	 * 그리드정보를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 14
	 * @Method Name : findListSensor
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListSensor.do")
	public @ResponseBody List findListSensor(@RequestBody Map param) {
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
		
		RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "company/list/all";
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);
		
		Gson gson = new Gson();
		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		return (List) jsonObject.get("body");
	}
	
	
	
	//필요
//	@RequestMapping(value="findListSensor.do")
//	public @ResponseBody Map findListSensor(@RequestBody Map param) {
//		Map<String, Object> result = new HashMap<String, Object>();
//		
//		result.put("gatewayInfo", areaMappService.findListgateWay(param) );
//		result.put("beaconList", areaMappService.findListBeacon(param) );
//		return result;
//	}
	
	
	/**
	 * 게이트웨이 저장을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 03
	 * @Method Name : saveGatewayInfo
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveGatewayInfo.do")
	public @ResponseBody Map saveGatewayInfo(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
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
	
	
	//필요
//	@RequestMapping(value="saveGatewayInfo.do")
//	public @ResponseBody Map saveNodeInfo(@RequestBody Map param) {
//		return areaMappService.saveGatewayInfo(param);
//	}
	
	/**
	 * 비콘 저장을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 03
	 * @Method Name : saveBeaconInfo
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveBeaconInfo.do")
	public @ResponseBody Map saveBeaconInfo(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
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
	
	
	//필요
//	@RequestMapping(value="saveBeaconInfo.do")
//	public @ResponseBody Map saveBeaconInfo(@RequestBody Map param) {
//		return areaMappService.saveBeaconInfo(param);
//	}
	
	/**
	 * 게이트웨이 초기화을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 03
	 * @Method Name : onResetGateway
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "onResetGateway.do")
	public @ResponseBody Map onResetGateway(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
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
	
	
	//필요
//	@RequestMapping(value = "onResetGateway.do")
//	public @ResponseBody Map onResetGateway(@RequestBody Map param) {
//		return areaMappService.onResetGateway(param);
//	}
	
	
	
	
	/**
	 * 비콘 초기화을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 14
	 * @Method Name : resetMpSpPosition
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "resetMpSpPosition.do")
	public @ResponseBody Map resetMpSpPosition(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
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
	
	//필요
//	@RequestMapping(value = "resetMpSpPosition.do")
//	public @ResponseBody Map resetMpSpPosition(@RequestBody Map param) {
//		return areaMappService.resetMpSpPosition(param);
//	}
	
	
	
	
	/**
	 * 태그정보를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 14
	 * @Method Name : getProjectTagObject
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getProjectTagObject.do")
	public @ResponseBody List getProjectTagObject(@RequestBody Map param) {
		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
		
		RestTemplate restTemplate = new RestTemplate();
		String customerUrl = URL + "company/list/all";
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);
		
		Gson gson = new Gson();
		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		return (List) jsonObject.get("body");
	}
	
	//필요
//	@RequestMapping(value="getProjectTagObject.do")
//	public @ResponseBody Map getProjectTagObject(@RequestBody Map param) {
//		return areaMappService.getProjectTagObject(param);
//	}
	
}
