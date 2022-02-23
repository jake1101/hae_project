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
public class TempWorkerController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	
	
	/**
	 * 사전 등록 작업자 조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 15
	 * @Method Name : findListTempWorker
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListTempWorker.do")
	public @ResponseBody List findListTempWorker(@RequestBody Map param) {
		return  (List) restFulUtilService.callRaycomApi("worker/temp/list", param).get("body");
	}
	
	
	/**
	 * 개별 사전 등록 작업자 등록을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 15
	 * @Method Name : saveTempWorker
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveTempWorker.do")
	public @ResponseBody Map saveTempWorker(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
		//데이터 가공을 여기서 한다.
		for(Map<String, Object> update : updateList){
			update.put("siteId", param.get("siteId"));
			saveData.add(update);
		}
		return restFulUtilService.callRaycomApi("worker/temp/upsert/array", saveData);
	}
	/**
	 * 개별 사전 등록 작업자 등록을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 15
	 * @Method Name : saveJoinTempWorker
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveJoinTempWorker.do")
	public @ResponseBody Map saveJoinTempWorker(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> selectList = (List<Map<String, Object>>)param.get("selectList");
		
		return  restFulUtilService.callRaycomApi("/worker/temp/raise/array", selectList);
	}
	
	
	/**
	 * 사전 등록 작업자 삭제를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 15
	 * @Method Name : deleteTempWorker
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteTempWorker.do")
	public @ResponseBody Map deleteTempWorker(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		return restFulUtilService.callRaycomApi("worker/temp/remove/array", deleteList);
	}
}
