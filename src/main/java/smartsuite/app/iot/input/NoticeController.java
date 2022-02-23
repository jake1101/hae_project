package smartsuite.app.iot.input;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.shared.Const;
import smartsuite.messagesource.web.MessageService;
import smartsuite.security.annotation.AuthCheck;

/**
 * 2021-08-19 jh.Park NoticeController
 */

@Controller
@RequestMapping(value="**/iot/input/*")
public class NoticeController {
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	/**
	 * 공지사항 목록 조회를 요청한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @return list
	 * @Date : 2021-08-19
	 * @Method Name : findListNotice
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListNotice.do")
	public @ResponseBody List findListNotice(@RequestBody Map param) {
		return  (List) restFulUtilService.callRaycomApi("/notice/list", param).get("body");
	}
	
	/**
	 * 단일 공지사항 정보를 조회한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @return Map
	 * @Date : 2021-10-19
	 * @Method Name : findListNotice
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findOneNotice.do")
	public @ResponseBody Map findOneNotice(@RequestBody Map param) {
		return  (Map) restFulUtilService.callRaycomApi("/notice/one", param).get("body");
	}
	
	/**
	 * 공지사항 정보를 저장한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-08-19
	 * @Method Name : saveInfoNotice
	 */
	@AuthCheck(authCode=Const.READ)
	@RequestMapping(value = "saveInfoNotice.do")
	public @ResponseBody Map saveInfoNotice(@RequestBody Map param) {
		
		return restFulUtilService.callRaycomApi("/notice/upsert",param.get("noticeInfo"));
	}
	
	/**
	 * 공지사항 정보를 삭제한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-08-19
	 * @Method Name : deleteNotice
	 */
	@AuthCheck(authCode=Const.READ)
	@RequestMapping(value = "deleteNotice.do")
	public @ResponseBody Map deleteNotice(@RequestBody Map param) {
		
		return restFulUtilService.callRaycomApi("/notice/delete",param);
	}
}
