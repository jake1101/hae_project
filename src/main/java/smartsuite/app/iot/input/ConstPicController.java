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
public class ConstPicController {
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	/**
	 * 접근 가능 현장을 조회한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @return list
	 * @Date : 2021-09-09
	 * @Method Name : findSiteList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findSiteList.do")
	public @ResponseBody List findSiteList(@RequestBody Map param) {
		return  (List) restFulUtilService.callRaycomApi("/site/list", param).get("body");
	}
	
	/**
	 * 시공 목록 or 공종 목록을 조회한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @return list
	 * @Date : 2021-09-09
	 * @Method Name : findSiteList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findConstList.do")
	public @ResponseBody List findConstPicList(@RequestBody Map param) {
		return  (List) restFulUtilService.callRaycomApi("/site/const/list", param).get("body");
	}
	
	/**
	 * 시공 사진 목록을 조회한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @return list
	 * @Date : 2021-09-09
	 * @Method Name : findConstPicDtlList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findConstPicDtlList.do")
	public @ResponseBody List findConstPicDtlList(@RequestBody Map param) {
		return  (List) restFulUtilService.callRaycomApi("/site/const/dtl/list", param).get("body");
	}
	
	/**
	 * 시공 사진 정보를 저장한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @return list
	 * @Date : 2021-09-016
	 * @Method Name : saveConstPicDtl
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveConstPicDtl.do")
	public @ResponseBody Map saveConstPicDtl(@RequestBody Map param) {
		List<Map<String, Object>> data = (List<Map<String, Object>>)param.get("data");
		return  restFulUtilService.callRaycomApi("/site/const/pic/upsert", data);
	}
	
	/**
	 * 시공 사진 정보를 삭제한다.
	 *
	 * @author : jh.Park
	 * @param param the param
	 * @Date : 2021-09-16
	 * @Method Name : saveConstType
	 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "deleteConstPicDtl.do")
	public @ResponseBody Map deleteConstPicDtl(@RequestBody Map param) {
		return restFulUtilService.callRaycomApi("/site/const/pic/delete", (List<Map<String, Object>>)param.get("deleteConst"));
	}

}
