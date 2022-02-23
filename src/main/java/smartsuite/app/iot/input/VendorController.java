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
@RequestMapping(value="**/iot/input/*")
public class VendorController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	
	/**
	 * 협력사 목록 조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 09
	 * @Method Name : findListVendor
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListVendor.do")
	public @ResponseBody List findListVendor(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("vendor/list", param).get("body");
	}
	
	
	
	/**
	 * 협력사 관리 목록 조회를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 01. 03
	 * @Method Name : findVendorMgntList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findVendorMgntList.do")
	public @ResponseBody List findVendorMgntList(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("vendor/attr/list", param).get("body");
	}
	
	   
	
	/**
	 * 협력사 목록 저장을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 03
	 * @Method Name : saveVendor
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveVendor.do")
	public @ResponseBody Map saveVendor(@RequestBody Map param) {
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

		return  restFulUtilService.callRaycomApi("vendor/upsert/array", saveData);
	}
	
	
	//여기부터 수정 해야함
	/**
	 * 협력사 관리 속성 저장을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 03
	 * @Method Name : saveInfoVendorAttr
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveInfoVendorAttr.do")
	public @ResponseBody Map saveInfoVendorAttr(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> saveData = Lists.newArrayList();
		
		((Map<String, Object>) param.get("vendorAttrInfo")).put("siteId", param.get("siteId"));
		saveData.add((Map<String, Object>) param.get("vendorAttrInfo"));
		
		return restFulUtilService.callRaycomApi("vendor/attr/upsert/array", saveData);
	}
	
	/**
	 * 협력사 삭제를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 03
	 * @Method Name : deleteVendor
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteVendor.do")
	public @ResponseBody Map deleteVendor(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		return restFulUtilService.callRaycomApi("vendor/remove/array", deleteList);
	}
	
	/**
	 * 협력사 관리 목록 삭제를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 03
	 * @Method Name : deleteVendorMgnt
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteVendorMgnt.do")
	public @ResponseBody Map deleteVendorMgnt(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		return restFulUtilService.callRaycomApi("vendor/attr/remove/array", deleteList);
	}
	
}
