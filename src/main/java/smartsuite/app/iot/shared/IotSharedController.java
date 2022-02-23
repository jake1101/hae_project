package smartsuite.app.iot.shared;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.bp.admin.auth.UserService;
import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.shared.Const;
import smartsuite.messagesource.web.MessageService;
import smartsuite.security.annotation.AuthCheck;
import smartsuite.security.authentication.Auth;

@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
public class IotSharedController {

	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	@Inject
	UserService userService;
	
	@RequestMapping(value = "/**/chkTokenAlive.do")
	public @ResponseBody Map chkTokenAlive(@RequestBody Map param) {
		param.put("token", Auth.getCurrentUser().getUserInfo().get("rinoToken") );
		
		return restFulUtilService.callRinoOmsApi("/user/chkTokenAlive", param);
	}
	
	/**
	 * 스마트태그 시스템을 사용하는 운영사를 조회합니다
	 * includeNoteUse / String / 사용중지 운영사 포함여부
	 * before : company/list/all
	 */
	@RequestMapping(value = "/**/getCompanyList.do")
	public @ResponseBody List getCompanyList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("company/list", param).get("body");
		
	}
	
	/**
	 * 유저가 접근 가능한 현장리스트를 모두 조회합니다
	 * companyId / Number / 운영사 아이디
	 * includeAreaListFlag / String / 하위 영역정보 포함여부
	 * includeNoteUse / String / 사용중지 현장 포함여부
	 * before : site/company
	 */
	@RequestMapping(value = "/**/getSiteList.do")
	public @ResponseBody Map getSiteList(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("site/list", param);
	}
	
	/**
	 * 무재해 시작일을 변경한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return 
	 * @Date : 2020. 4. 10
	 * @Method Name : saveSafeDay
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "/**/saveSafeDay.do")
	public @ResponseBody Object saveSafeDay(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("site/update/safeday", param).get("body");
	}
	
	/**
	 * wms 정보를 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return wms Info
	 * @Date : 2020. 3. 3
	 * @Method Name : findWmsInfo
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "/**/findWmsInfo.do")
	public @ResponseBody Map findWmsInfo(@RequestBody Map param) {
		return (Map)restFulUtilService.callRaycomApi("location/geofile", param).get("body");
	}
	
	/**
	 * 현장 영역 목록을 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the area list
	 * @Date : 2020. 3. 3
	 * @Method Name : findSiteArea
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "/**/findSiteArea.do")
	public @ResponseBody List findSiteArea(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("area/site/list", param).get("body");
	}
	/**
	 * 비콘 영역 목록을 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the beacon polygon list
	 * @Date : 2020. 12. 08
	 * @Method Name : findBeaconPolygon
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "/**/findBeaconPolygon.do")
	public @ResponseBody Map findBeaconPolygon(@RequestBody Map param) {
		return (Map) restFulUtilService.callRaycomApi("area/beacon/polygon", param).get("body");
	}
	
	/**
	 * 위험 지역 목록을 요청한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the danger area list
	 * @Date : 2020. 3. 12
	 * @Method Name : findDangerArea
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "/**/findDangerArea.do")
	public @ResponseBody List findDangerArea(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("area/danger/active", param).get("body");
	}
	
	/**
	 * 당일 현장 이력을 리턴한다.
	 *
	 * @author : jhkim
	 * @param param the param
	 * @return the target history
	 * @Date : 2020. 2. 28
	 * @Method Name : findSiteTargetList
	 */
	@RequestMapping(value = "/**/findTargetHistory.do")
	public @ResponseBody List findTargetHistory(@RequestBody Map param) {
		param.put("areaType", "site");
		param.put("areaId", 0);
		return (List) restFulUtilService.callRaycomApi("location/log", param).get("body");
	}

	@RequestMapping(value = "/**/getAlarmNoticeList.do")
	public @ResponseBody Map getAlarmList(@RequestBody Map param) {
//		return restFulUtilService.callRaycomApi("alarm/list", param);
		return restFulUtilService.callRaycomApi("alarm/websocket/list", param);
	}
	
	/**
	 * notice의 알림 숨김을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 12. 21
	 * @Method Name : hiddenAlarmNotice
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "/**/updateAlarmNoticeHidden.do")
	public @ResponseBody Map updateAlarmNoticeHidden(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> hiddenList = (List<Map<String, Object>>)param.get("hiddenList");
		
		return restFulUtilService.callRaycomApi("alarm/websocket/update/hidden", hiddenList);
	}
	
	/**
	 * sms정보를 받아온다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 03
	 * @Method Name : findSmsInfo
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "/**/findSmsInfo.do")
	public @ResponseBody Map findSmsInfo(@RequestBody Map param) {
		return  restFulUtilService.callRaycomApi("message/sms/uri", param);
	}
	
	/**
	 * sms 전달을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 01. 03
	 * @Method Name : sendSms
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "/**/sendSms.do")
	public @ResponseBody Map sendSms(@RequestBody Map param) {
		return  restFulUtilService.callRaycomApi("message/send/sms", param);
	}
	/**
	 * sms 전달을 일괄로 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 04. 22
	 * @Method Name : sendSmsAll
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "/**/sendSmsAll.do")
	public @ResponseBody Map sendSmsAll(@RequestBody Map param) {
		return  restFulUtilService.callRaycomApi("message/sms/array", param);
	}
	
	
	/**
	 * 직종 목록을 요청한다.
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 02. 04
	 * @Method Name : findJobName
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "/**/findJobName.do")
	public @ResponseBody List findJobName(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("worker/jobtype/list", param).get("body");
	}

	/**
	 * 사용자 정보 변경 로그를 남김
	 *
	 * @author : jekim
	 * @param param the param
	 * @return 
	 * @Date : 2020. 4. 24
	 * @Method Name : saveUserLog
	 */
	@RequestMapping (value = "/**/saveUserLog.do")
	public @ResponseBody Map saveUserLog(@RequestBody Map param) {
		return userService.insertUserLog(param);
	}
	
	
	/**
	 * 테스트 컨트롤러
	 */
	@RequestMapping (value = "/**/getSensorList.do")
	public @ResponseBody List getSensorList(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("location/dashboard/bpa/operation/grid", param).get("body");
	}
	@RequestMapping (value = "/**/getMappingList.do")
	public @ResponseBody List getMappingList(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("location/dashboard/bpa/operation/target", param).get("body");
	}
	@RequestMapping (value = "/**/getAreaMappingList.do")
	public @ResponseBody Map getAreaMappingList(@RequestBody Map param) {
		return (Map) restFulUtilService.callRaycomApi("location/dashboard/bpa/operation/area", param).get("body");
	}
	
	@RequestMapping (value = "/**/linkFindListVendor.do")
	public @ResponseBody List findListVendor(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApiWithNoSession("vendor/list", param).get("body");
	}
	
	@RequestMapping (value = "/**/linkFindListJobType.do")
	public @ResponseBody List findListJobType(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApiWithNoSession("worker/jobtype/list", param).get("body");
	}
	
	@RequestMapping(value = "/**/linkFindShipGroupList.do")
	public @ResponseBody List findGroupList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApiWithNoSession("three/layergroup/list", param).get("body");
	}
	
	@RequestMapping(value = "/**/linkFindListBeacon.do")
	public @ResponseBody List findListBeacon(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApiWithNoSession("three/beacon/list", param).get("body");
	}

	@RequestMapping(value = "/**/linkFindGridPositionList.do")
	public @ResponseBody Map findGridPositionList(@RequestBody Map param) {
		return (Map) restFulUtilService.callRaycomApiWithNoSession("three/target/grid", param).get("body");
	}
	
	@RequestMapping(value = "/**/linkFindAreaInfo.do")
	public @ResponseBody Map findAreaInfo(@RequestBody Map param) {
		return (Map) restFulUtilService.callRaycomApiWithNoSession("area/"+param.get("area_id"), param).get("body");
	}
	
	//es-worker-list-popup을 위해 추가
	
	@RequestMapping(value = "/**/linkFindSmsInfo.do")
	public @ResponseBody Map linkFindSmsInfo(@RequestBody Map param) {
		return  restFulUtilService.callRaycomApiWithNoSession("message/sms/uri", param);
	}
	
	@RequestMapping(value = "/**/linkSendSms.do")
	public @ResponseBody Map linkSendSms(@RequestBody Map param) {
		return  restFulUtilService.callRaycomApiWithNoSession("message/send/sms", param);
	}
	@RequestMapping(value = "/**/linkSendSmsAll.do")
	public @ResponseBody Map linkSendSmsAll(@RequestBody Map param) {
		return  restFulUtilService.callRaycomApiWithNoSession("message/sms/array", param);
	}
		
}
