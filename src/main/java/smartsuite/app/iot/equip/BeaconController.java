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
 * Beacon 관련 처리를 하는 컨트롤러 Class입니다. 
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/equip/**/")
public class BeaconController {
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/**
	 * 현장 조회
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSiteInfoForBeacon.do")
	public @ResponseBody List findSiteInfo(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("area/site/list", param).get("body");
	}
	
	/**
	 * 위치식별기관리 조회	
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findBeaconList.do")
	public @ResponseBody List findBeaconList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("beacon/list", param).get("body");
	}	
	
	/**
	 * 위치식별기 저장
	 * @param param
	 * @return
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "upsertBeaconArray.do")
	public @ResponseBody Map upsertBeaconArray(@RequestBody Map param) {
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
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
		
		return restFulUtilService.callRaycomApi("beacon/upsert/array", saveData);
	}
	
	/**
	 * 위치식별기 삭제
	 * @param param
	 * @return
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteBeaconArray.do")
	public @ResponseBody Map deleteBeaconArray(@RequestBody Map param) {
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
		for(Map<String, Object> delete : deleteList){
			saveData.add(delete);
		}
		
		return restFulUtilService.callRaycomApi("beacon/remove/array", saveData);
	}
	
	/**
	 * wms 정보를 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return wms Info
	 * @Date : 2020. 2. 24
	 * @Method Name : findWmsInfo
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findWmsInfo.do")
	public @ResponseBody Map findWmsInfo(@RequestBody Map param) {
		return (Map)restFulUtilService.callRaycomApi("location/geofile", param).get("body");
	}
	
//	@AuthCheck (authCode = Const.READ)
//	@RequestMapping(value = "findListBeaconCell.do")
//	public @ResponseBody List findListBeaconCell(@RequestBody Map param) {
//		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(param);
//		
//	    RestTemplate restTemplate = new RestTemplate();
//		String customerUrl = URL + "site/"+param.get("siteId")+"/beacon/display/cell";
//		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);
//
//		Gson gson = new Gson();
//		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
//		List<Map<String, Object>> resultList = (List) jsonObject.get("body");
//		return resultList;
//	}
	
	/**
	 * 비콘 위험도 리스트를 조회한다.
	 *
	 * @author : jh.Park
	 * @Date : 2021-08-11
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListRiskIdx.do")
	public @ResponseBody List findListRiskIdx(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("beacon/risk/list", param).get("body");
	}
}