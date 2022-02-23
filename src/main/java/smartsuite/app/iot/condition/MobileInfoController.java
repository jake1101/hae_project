package smartsuite.app.iot.condition;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;


@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/**/")
public class MobileInfoController {
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/**
	 * 모바일 위치정보 사용 현황 조회
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 07. 24
	 * @Method Name : findListMobileHistory
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListMobileHistory.do")
	public @ResponseBody List findLocationWorkerNow(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("sensor/mobile/node/list", param).get("body");
	}
	/**
	 * 모바일 상태 보고 이력 조회
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return list
	 * @Date : 2020. 07. 24
	 * @Method Name : findListMobileLog
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListMobileLog.do")
	public @ResponseBody List findListMobileLog(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("sensor/mobile/active/log", param).get("body");
	}
}
