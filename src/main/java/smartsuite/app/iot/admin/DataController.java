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
 * 데이터 관리정책 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author jhbaek
 * @see 
 * @since 2020. 2. 24
 * @FileName DataController.java
 * @package smartsuite.app.iot.admin
 * @변경이력 : [2020. 2. 24] jhbaek 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/admin/**/")
public class DataController {
	
	@Inject
	MessageService messageService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findLogTerm.do")
	public @ResponseBody Map findLogTerm(@RequestBody Map param) {
		return (Map) restFulUtilService.callRaycomApi("management/logterm", param).get("body");
	}
	
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value = "saveInfoTermData.do")
	public @ResponseBody Map saveInfoTermData(@RequestBody Map param) {
		return  restFulUtilService.callRaycomApi("management/logterm/upsert", param.get("dataInfo"));
	}
	
	
}