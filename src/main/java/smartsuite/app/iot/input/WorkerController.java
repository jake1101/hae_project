package smartsuite.app.iot.input;

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
 *  작업자 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author jhbaek
 * @see 
 * @since 2020. 01. 21
 * @FileName WorkerController.java
 * @package smartsuite.app.iot.input
 * @변경이력 : [2020. 01. 21] jhbaek 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/input/*")
public class WorkerController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	
	/**
	 * 작업자 목록 조회를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the grp code list
	 * @Date :2020. 01. 21
	 * @Method Name : findListWorker
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListWorker.do")
	public @ResponseBody List findListWorker(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("worker/list", param).get("body");
	}
	
	/**
	 * 작업자 리스트 저장을 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @Date : 2020. 01. 21
	 * @Method Name : saveListWorker
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListWorker.do")
	public @ResponseBody Map saveListWorker(@RequestBody Map param) {
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
		
		return restFulUtilService.callRaycomApi("worker/upsert/array", saveData);
	}
	
	
	/**
	 * 작업자 삭제를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 02. 06
	 * @Method Name : deleteWorker
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteWorker.do")
	public @ResponseBody Map deleteWorker(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		return restFulUtilService.callRaycomApi("worker/remove/array", deleteList);
	}
	
	
	/**
	 * 스마트태그 교부 이력 조회를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the grp code list
	 * @Date :2020. 01. 21
	 * @Method Name : findListSensorTarget
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListSensorTarget.do")
	public @ResponseBody List findListSensorTarget(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("sensor/mapping/log/target", param).get("body");
	}
	
	/**
	 * 보건 이력 조회를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the grp code list
	 * @Date :2020. 01. 21
	 * @Method Name : findMedicalLog
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findMedicalLog.do")
	public @ResponseBody List findMedicalLog(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("worker/medical/log", param).get("body");
	}
	
	
	/**
	 * 보건이력 저장을 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @Date : 2020. 01. 21
	 * @Method Name : saveListMedical
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListMedical.do")
	public @ResponseBody Map saveListMedical(@RequestBody Map param) {
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
		
		return restFulUtilService.callRaycomApi("worker/medical/upsert/array", saveData);
	}
	
	
	/**
	 * 보건이력 삭제를 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 21
	 * @Method Name : deleteMedical
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteMedical.do")
	public @ResponseBody Map deleteMedical(@RequestBody Map param) {
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");		
		
		return restFulUtilService.callRaycomApi("worker/medical/remove/array", deleteList);
	}
	
	/**
	 * 차단 이력 조회를 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return worker blockLog list
	 * @Date :2020. 06. 30
	 * @Method Name : findBlockLog
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findBlockLog.do")
	public @ResponseBody List findBlockLog(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("worker/block/log", param).get("body");
	}
	
	/**
	 * 작업자 상세정보 조회를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the grp code list
	 * @Date :2020. 02. 26
	 * @Method Name : findWorkerDetail
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findWorkerDetail.do")
	public @ResponseBody Map findWorkerDetail(@RequestBody Map param) {
		return (Map)restFulUtilService.callRaycomApi("worker/detail", param).get("body");
	}
	
	/**
	 * 작업자 이미지 주소 조회를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the grp code list
	 * @Date :2020. 03. 11
	 * @Method Name : findImgFile
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findImgFile.do")
	public @ResponseBody List findImgFile(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("file/list", param).get("body");
	}
	
	/**
	 * 작업자 그룹 목록 저장
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return msg
	 * @Date :2020. 06. 04
	 * @Method Name : saveWorkerGroupList
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveWorkerGroupList.do")
	public @ResponseBody Map saveWorkerGroupList(@RequestBody Map param) {
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
		return restFulUtilService.callRaycomApi("worker/group/upsert/array", saveData);
	}
	
	/**
	 * 작업자 그룹 삭제.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @Date : 2020. 06. 04
	 * @Method Name : deleteWorkerGroup
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteWorkerGroupList.do")
	public @ResponseBody Map deleteWorkerGroup(@RequestBody Map param) {
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		return restFulUtilService.callRaycomApi("worker/group/remove/array", deleteList);
	}
	
	/**
	 * 작업자 그룹 목록 조회
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the worker group list
	 * @Date :2020. 06. 04
	 * @Method Name : getWorkerGroupList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getWorkerGroupList.do")
	public @ResponseBody List getWorkerGroupList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("worker/group/list", param).get("body");
	}
	
	/**
	 * 작업자 그룹 목록 상세 조회
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the worker group data
	 * @Date :2020. 06. 04
	 * @Method Name : getWorkerGroupDetails
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getWorkerGroupData.do")
	public @ResponseBody List getWorkerGroupData(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("worker/group/detail", param).get("body");
	}
	
	/**
	 * 작업자 목록 조회
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the worker list
	 * @Date :2020. 06. 04
	 * @Method Name : getWorkerGroupWorkerList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getWorkerGroupWorkerList.do")
	public @ResponseBody List getWorkerGroupWorkerList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("worker/group/worker/search", param).get("body");
	}
	
	/**
	 * 센서 목록 조회
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the worker list
	 * @Date :2020. 06. 04
	 * @Method Name : getWorkerGroupSensorList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "getWorkerGroupSensorList.do")
	public @ResponseBody List getWorkerGroupSensorList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("worker/group/sensor/search", param).get("body");
	}
	
	/**
	 * 그룹 목록 정보 저장
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the worker list
	 * @Date :2020. 06. 05
	 * @Method Name : saveWorkerGroup
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "saveWorkerGroup.do")
	public @ResponseBody Map saveWorkerGroup(@RequestBody Map param) {
		List<Map<String, Object>> array = (List<Map<String, Object>>)param.get("array");
		return restFulUtilService.callRaycomApi("worker/group/detail/insert/array", array);
	}
	
	/**
	 * 그룹 목록 정보 삭제
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the worker list
	 * @Date :2020. 06. 05
	 * @Method Name : deleteWorkerGroupDetail
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "deleteWorkerGroupDetail.do")
	public @ResponseBody Map deleteWorkerGroupDetail(@RequestBody Map param) {
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		return restFulUtilService.callRaycomApi("worker/group/detail/remove/array", deleteList);
	}
	
	
	/**
	 * 작업자그룹 일괄 교부 또는 회수
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return message
	 * @Date :2020. 06. 05
	 * @Method Name : setWorkerGroupMapping
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "setWorkerGroupMapping.do")
	public @ResponseBody Map setWorkerGroupMapping(@RequestBody Map param) {
		List<Map<String, Object>> array = (List<Map<String, Object>>)param.get("array");
		return restFulUtilService.callRaycomApi("sensor/mapping/target/group/"+param.get("mappingYN"), array);
	}
	
	//es-worker-list-popup을 위해 추가
	@RequestMapping (value = "/**/linkFindListVendor.do")
	public @ResponseBody List findListVendor(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApiWithNoSession("vendor/list", param).get("body");
	}
	@RequestMapping (value = "/**/linkFindJobTypeList.do")
	public @ResponseBody List findListJobType(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApiWithNoSession("worker/jobtype/list", param).get("body");
	}
	@RequestMapping(value = "linkFindListWorker.do")
	public @ResponseBody List linkFindListWorker(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApiWithNoSession("worker/list", param).get("body");
	}
	@RequestMapping(value = "linkSaveListWorker.do")
	public @ResponseBody Map linkSaveListWorker(@RequestBody Map param) {
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
		
		return restFulUtilService.callRaycomApiWithNoSession("worker/upsert/array", saveData);
	}
	@RequestMapping(value = "linkDeleteWorker.do")
	public @ResponseBody Map linkDeleteWorker(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		return restFulUtilService.callRaycomApiWithNoSession("worker/remove/array", deleteList);
	}
	@RequestMapping(value = "linkFindListSensorTarget.do")
	public @ResponseBody List linkFindListSensorTarget(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApiWithNoSession("sensor/mapping/log/target", param).get("body");
	}
	@RequestMapping(value = "linkFindMedicalLog.do")
	public @ResponseBody List linkFindMedicalLog(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApiWithNoSession("worker/medical/log", param).get("body");
	}
	@RequestMapping(value = "linkSaveListMedical.do")
	public @ResponseBody Map linkSaveListMedical(@RequestBody Map param) {
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
		
		return restFulUtilService.callRaycomApiWithNoSession("worker/medical/upsert/array", saveData);
	}
	@RequestMapping(value = "linkDeleteMedical.do")
	public @ResponseBody Map linkDeleteMedical(@RequestBody Map param) {
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");		
		
		return restFulUtilService.callRaycomApiWithNoSession("worker/medical/remove/array", deleteList);
	}
	@RequestMapping(value = "linkFindBlockLog.do")
	public @ResponseBody List linkFindBlockLog(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApiWithNoSession("worker/block/log", param).get("body");
	}
}