package smartsuite.app.iot.admin;

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

/**
 * 게이트웨이 통신 확인을 하는 컨트롤러 Class입니다.
 *
 * @author jhbaek
 * @see 
 * @since 2020. 09. 01
 * @FileName DataController.java
 * @package smartsuite.app.iot.admin
 * @변경이력 : [2020. 09. 01] jhbaek 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/admin/**/")
public class GatewayCommController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	/**
	 * 게이트웨이 통신 이력 조회
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findGatewayGraphInfo.do")
	public @ResponseBody Map findGatewayGraphInfo(@RequestBody Map param) {
		return (Map) restFulUtilService.callRaycomApi("statistics/gateway/comm", param).get("body");
	}
	
}