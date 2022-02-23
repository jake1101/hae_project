package smartsuite.app.iot.site;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.collect.Lists;

import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

/**
 * 현장관리 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author jhkim
 * @see 
 * @since 2019. 12. 26
 * @FileName SiteController.java
 * @package smartsuite.app.iot.site
 * @변경이력 : [2019. 12. 26] jhkim 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/**/")
public class SiteController {
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	@Autowired
	private SiteService siteService;
	
	/**
	 * 사용자가 접근 가능한 고객사 목록을 리턴한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the company list
	 * @Date : 2020. 2. 10
	 * @Method Name : getComboCustomer
	 */
	@RequestMapping(value = "getComboCustomer.do")
	public @ResponseBody List getComboCustomer(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("company/list", param).get("body");
	}
	
	/**
	 * 현장 목록을 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the site list
	 * @Date : 2020. 1. 17
	 * @Method Name : findListSite
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListSite.do")
	public @ResponseBody List findListSite(@RequestBody Map param) {
		
		List<Map<String, Object>> resultList = (List)restFulUtilService.callRaycomApi("site/list", param).get("body");
		
		if(resultList != null && !resultList.isEmpty()){
			for(Map<String, Object> map : resultList){
				Map<String, Object> pinPoint = (Map)map.get("pinPoint");
				if(pinPoint != null){
					map.put("lon", pinPoint.get("lon"));
					map.put("lat", pinPoint.get("lat"));
				}
			}
		}
		return resultList;
	}
	
	/**
	 * 사이트 리스트 저장을 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @Date : 2020. 2. 1
	 * @Method Name : saveListSite
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListSite.do")
	public @ResponseBody Map saveListSite(@RequestBody Map param) {
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
		
		return restFulUtilService.callRaycomApi("site/upsert/array", saveData);
	}
	
	/**
	 * 사이트 리스트 삭제를 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @Date : 2020. 4. 10
	 * @Method Name : deleteListSite
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteListSite.do")
	public @ResponseBody Map deleteListSite(@RequestBody Map param) {
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		List<Map<String, Object>> saveData = Lists.newArrayList();
	
		for(Map<String, Object> delete : deleteList){
			saveData.add(delete);
		}
		
		return restFulUtilService.callRaycomApi("site/remove/array", saveData);
	}
	
	/**
	 * 현장영역정보 목록을 요청한다.
	 * site 레벨을 포함하여 조회한다.
	 *
	 * @author : jhKim
	 * @param param the param
	 * @Date : 2020. 1. 2
	 * @Method Name : findListArea
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListArea.do")
	public @ResponseBody List findListArea(@RequestBody Map param) {
		
		List<Map<String, Object>> resultList = (List)restFulUtilService.callRaycomApi("area/site/list", param).get("body");
		
		if(resultList != null && !resultList.isEmpty()){
			for(Map<String, Object> map : resultList){
				Map<String, Object> adjunction = (Map)map.get("adjunction");
				if(adjunction != null){
					map.put("backgroundColor", adjunction.get("backgroundColor"));
					map.put("lineColor", adjunction.get("lineColor"));
				}
			}
		}
		return resultList;
	}	
	
	/**
	 * 현장영역정보 목록을 요청한다.
	 *
	 * @author : yshong
	 * @param param the param
	 * @Date : 2020. 12. 22
	 * @Method Name : findListAreaWithoutSite
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListAreaWithoutSite.do")
	public @ResponseBody List findListAreaWithoutSite(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("area/list", param).get("body");
	}	
	
	/**
	 * 현장레이어 그룹 목록을 요청한다.
	 *
	 * @author : yshong
	 * @param param the param
	 * @Date : 2020. 12. 22
	 * @Method Name : findLayerGroup
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findLayerGroup.do")
	public @ResponseBody List findLayerGroup(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("three/layergroup/list", param).get("body");
	}	
	/**
	 * 현장레이어 그룹 목록을 저장한다.
	 *
	 * @author : yshong
	 * @param param the param
	 * @Date : 2020. 12. 22
	 * @Method Name : findLayerGroup
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "saveListLayerGroup.do")
	public @ResponseBody Map saveListLayerGroup(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("three/layergroup/upsert/array", param.get("upsertItems"));
	}	
	/**
	 * 현장레이어 그룹 목록을 삭제한다.
	 *
	 * @author : yshong
	 * @param param the param
	 * @Date : 2020. 12. 28
	 * @Method Name : deleteListLayerGroup
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "deleteListLayerGroup.do")
	public @ResponseBody Map deleteListLayerGroup(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("three/layergroup/remove/array", param.get("deleteItems"));
	}	
	
	
	/**
	 * 영역을 저장 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @Date : 2020. 2. 4
	 * @Method Name : saveAreaInfo
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveAreaInfo.do")
	public @ResponseBody Map saveAreaInfo(@RequestBody Map param) {
		if(param.get("id") == null){
			param.put("id", 0);
		}
		
		return restFulUtilService.callRaycomApi("area/upsert", param);
	}	
	/**
	 * 영역을 삭제를 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @Date : 2020. 2. 4
	 * @Method Name : deleteAreaInfo
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "deleteAreaList.do")
	public @ResponseBody Map deleteAreaInfo(@RequestBody Map param) {
		List<Map<String, Object>> checkedList = (List<Map<String, Object>>)param.get("checked");
		List<Map<String, Object>> deleteData = Lists.newArrayList();
		
		//데이터 가공을 여기서 한다.
		for(Map<String, Object> check : checkedList){
			deleteData.add(check);
		}
		
		return restFulUtilService.callRaycomApi("area/remove/array", deleteData);
	}	
	
	/**
	 * 작업자 동기화를 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @Date : 2020. 7. 17
	 * @Method Name : syncWorker
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "syncWorker.do")
	public @ResponseBody Map syncWorker(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("worker/if/sync/all", param);
	}	
	
	/**
	 * fitArea 정보를  저장 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @Date : 2020. 8. 20
	 * @Method Name : saveFitArea
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveFitArea.do")
	public @ResponseBody Map saveFitArea(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("site/update/fit", param);
	}
	
	/**
	 * 공종 코드 정보를 조회한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-09-06
	 * @Method Name : findConstTypeList
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "findConstTypeList.do")
	public @ResponseBody List findConstTypeList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("site/const/type/list", param).get("body");
	}
	
	/**
	 * 공종 코드 정보를 저장한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-09-07
	 * @Method Name : saveConstType
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveConstType.do")
	public @ResponseBody Map saveConstType(@RequestBody Map param) {
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
		
		return restFulUtilService.callRaycomApi("site/const/type/upsert", saveData);
	}
	
	/**
	 * 공종 코드 정보를 삭제한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-09-07
	 * @Method Name : saveConstType
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "deleteConstType.do")
	public @ResponseBody Map deleteConstType(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("site/const/type/delete", (List<Map<String, Object>>)param.get("deleteConst"));
	}
	
	/**
	 * 위험 지수 정보를 조회한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-09-08
	 * @Method Name : findRiskIdxList
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "findRiskIdxList.do")
	public @ResponseBody List findRiskIdxList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("beacon/risk/list", param).get("body");
	}
	
	/**
	 * 위험 지수 정보를 저장한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-09-08
	 * @Method Name : saveRiskIdx
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveRiskIdx.do")
	public @ResponseBody Map saveRiskIdx(@RequestBody Map param) {
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
		
		return restFulUtilService.callRaycomApi("beacon/risk/upsert/array", saveData);
	}
	
	/**
	 * 위험 지수 정보를 삭제한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-09-08
	 * @Method Name : saveRiskIdx
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "deleteRiskIdx.do")
	public @ResponseBody Map deleteRiskIdx(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("beacon/risk/delete/array", (List<Map<String, Object>>)param.get("deleteConst"));
	}	
	
	/**
	 * 현정 정보 조회
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-09-08
	 * @Method Name : findSiteInfo
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSiteInfo.do")
	public @ResponseBody Map<String, Object> findSiteInfo(@RequestBody Map<String, Object> param) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			result = siteService.findSiteInfo(param);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 현정 정보 조회
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-09-08
	 * @Method Name : getAreaTargetCount.do
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getAreaTargetCount.do")
	public @ResponseBody List<Map<String, Object>>getAreaTargetCount(@RequestBody Map<String, Object> param) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		try {
			result = siteService.getAreaTargetCount(param);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 현정 정보 조회
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-09-08
	 * @Method Name : getAreaTargetCount.do
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findWidgetGateway.do")
	public @ResponseBody List<Map<String, Object>>findWidgetGateway(@RequestBody Map<String, Object> param) {
		//todo :: 임시로 한곳에 모아 둔다 나중에 정리가 필요함 GON
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		try {
			result = siteService.findWidgetGateway(param);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return result;
	}
}
