package smartsuite.app.iot.ptw;

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

import smartsuite.app.bp.admin.board.BoardAdminService;
import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/ptw/*")
public class PtwController {
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	@Inject
	PtwService ptwService;
	
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findPtwList.do")
	public @ResponseBody List findPtwList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("ptw/list", param).get("body");
	}
	
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findPtwInfo.do")
	public @ResponseBody Map findPtwInfo(@RequestBody Map param) {
		return (Map)restFulUtilService.callRaycomApi("ptw/list/detail", param).get("body");
	}
	
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "upsertPtw.do")
	public @ResponseBody Map upsertPtw(@RequestBody Map param) {
		List<Map<String, Object>> updateList2 = (List<Map<String, Object>>)param.get("updateList2");
		List<Map<String, Object>> insertList2 = (List<Map<String, Object>>)param.get("insertList2");
		List<Map<String, Object>> deleteList2 = (List<Map<String, Object>>)param.get("deleteList2");
		
		List<Map<String, Object>> updateList3 = (List<Map<String, Object>>)param.get("updateList3");
		List<Map<String, Object>> insertList3 = (List<Map<String, Object>>)param.get("insertList3");
		List<Map<String, Object>> deleteList3 = (List<Map<String, Object>>)param.get("deleteList3");
		
		Map<String, Object> saveData = (Map)param.get("ptwInfo");
		saveData.put("siteId", param.get("siteId") );
		List<Map<String, Object>> apprArray = Lists.newArrayList();
		List<Map<String, Object>> formArray = Lists.newArrayList();
		
		// 승인자
		for(Map<String, Object> insert : insertList2){
			insert.put("id", null);
			insert.put("siteId", param.get("siteId") );
			apprArray.add(insert);
		}
		for(Map<String, Object> update : updateList2){
			apprArray.add(update);
		}
		for(Map<String, Object> delete : deleteList2){
			delete.put("deleted", "Y");
			apprArray.add(delete);
		}
		
		// 안전조치 요구사항
		for(Map<String, Object> insert : insertList3){
			insert.put("id", null);
			insert.put("siteId", param.get("siteId") );
			formArray.add(insert);
		}
		for(Map<String, Object> update : updateList3){
			formArray.add(update);
		}
		for(Map<String, Object> delete : deleteList3){
			delete.put("deleted", "Y");
			formArray.add(delete);
		}
		
		saveData.put("apprArray", apprArray);
		saveData.put("formArray", formArray);
		
		return restFulUtilService.callRaycomApi("ptw/upsert", saveData);
	}
	
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deletePtwList.do")
	public @ResponseBody Map deletePtwList(@RequestBody Map param) {
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		List<Map<String, Object>> formArray = Lists.newArrayList();
		
		for(Map<String, Object> delete : deleteList){
			delete.put("siteId", param.get("siteId") );
			formArray.add(delete);
		}
		
		return restFulUtilService.callRaycomApi("ptw/remove/array", formArray);
	}	
		
	/**
	 * 안전조치 요구사항 내용을 조회한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the map
	 * @Date : 2020. 10. 13
	 * @Method Name : findPtwContents
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findPtwContents.do")
	public @ResponseBody Map findPtwContents(@RequestBody Map param) {
		return (Map)ptwService.findPtwContents(param);
	}
	
	
}