package smartsuite.app.iot.site;

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
@RequestMapping(value="**/site/**")
public class SiteOrgController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	
	/**
	 * 현장조직도  조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 17
	 * @Method Name : findSiteOrg
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSiteOrg.do")
	public @ResponseBody List findSiteOrg(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("site/org/list", param).get("body");
	}
	
	
	/**
	 * 현장 조직도 저장을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 17
	 * @Method Name : saveListSiteOrg
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListSiteOrg.do")
	public @ResponseBody Map saveListSiteOrg(@RequestBody Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
		//데이터 가공을 여기서 한다.
		for(Map<String, Object> insert : insertList){
			insert.put("siteId", param.get("siteId"));
			saveData.add(insert);
		}
		for(Map<String, Object> update : updateList){
			saveData.add(update);
		}
		
		return restFulUtilService.callRaycomApi("site/org/upsert/array", saveData);
	}
	
	/**
	 * 현장 조직도 삭제를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 16
	 * @Method Name : deleteListSiteOrg
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteListSiteOrg.do")
	public @ResponseBody Map deleteListSiteOrg(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");		
		
		return restFulUtilService.callRaycomApi("site/org/remove/array", deleteList);
	}
}
