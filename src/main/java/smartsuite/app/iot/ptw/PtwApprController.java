package smartsuite.app.iot.ptw;

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

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/ptw/*")
public class PtwApprController {
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findPtwReqList.do")
	public @ResponseBody List findPtwReqList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("ptw/req/list", param).get("body");
		
//		String uri = "ptw/req/list";
//		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
//		
//	    RestTemplate restTemplate = new RestTemplate();
//		String customerUrl = URL + uri;
//		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);
//
//		Gson gson = new Gson();
//		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
//		List<Map<String, Object>> resultList = (List)jsonObject.get("body");
//		return resultList;
	}
	
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findPtwReqDetail.do")
	public @ResponseBody Map findPtwReqDetail(@RequestBody Map param) {
		return (Map)restFulUtilService.callRaycomApi("ptw/req/list/detail", param).get("body");
		
//		String uri = "ptw/req/list/detail";
//		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
//		
//	    RestTemplate restTemplate = new RestTemplate();
//		String customerUrl = URL + uri;
//		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);
//
//		Gson gson = new Gson();
//		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
//		Map<String, Object> resultMap = (Map)jsonObject.get("body");
//		return resultMap;
	}
	
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "upsertPtwReq.do")
	public @ResponseBody Map upsertPtwReq(@RequestBody Map param) {
		Map<String, Object> saveData = (Map)param.get("ptwReqInfo");
		saveData.put("siteId", param.get("siteId") );
		List<Map<String, Object>> ptwDataList = (List<Map<String, Object>>)param.get("ptwDataList");
		saveData.put("dataArray", ptwDataList);
		//2021-09-01 jh.Park
		saveData.put("dangerInfo", (Map)param.get("dangerInfo"));
		
		return restFulUtilService.callRaycomApi("ptw/req/upsert", saveData);
	}
	
	//2021-08-31 jh.Park
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findIdBeaconList.do")
	public @ResponseBody List findIdBeaconList(@RequestBody Map param) {
		param.put("type", "I");
		return (List)restFulUtilService.callRaycomApi("/beacon/list/id", param).get("body");
	}
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findBeaconList.do")
	public @ResponseBody List findBeaconList(@RequestBody Map param) {
		param.put("type", "I");
		return (List)restFulUtilService.callRaycomApi("/beacon/list/", param).get("body");
	}
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findDangerBeaconList.do")
	public @ResponseBody List findDangerBeaconList(@RequestBody Map param) {
		param.put("isDanger", true);
		return (List)restFulUtilService.callRaycomApi("/beacon/list", param).get("body");
	}
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findDangerZoneList.do")
	public @ResponseBody List findDangerZoneList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("/area/danger/list", param).get("body");
	}
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListVendor.do")
	public @ResponseBody List findListVendor(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("vendor/list", param).get("body");
	}
}