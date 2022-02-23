package smartsuite.app.common.error;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;

/**
 * 공통으로 사용하는 서비스 관련 Class입니다.
 *
 * @author hjhwang
 * @see
 * @FileName SharedService.java
 * @package smartsuite.app.shared
 * @Since 2016. 2. 2
 * @변경이력 : [2016. 2. 2] hjhwang 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Service
@Transactional
public class SlackService {

	static final Logger LOG = LoggerFactory.getLogger(SlackService.class);

	@Inject
	private RestTemplate restTemplate;
	
	@Inject
	private Gson gson;
	
	@Value("#{globalProperties['error.slack.url']}")
	private String URL;
	
	@Value("#{globalProperties['error.slack.channel']}")
	private String channel = "";
	
	@Value("#{globalProperties['error.send.serverName']}")
	private String serverName = "";
	
	@Value("#{globalProperties['error.link']}")
	private String link = "";

	/**
	 * Slack Message 전송
	 */
	public void browserSend(Map<String, Object> param) throws Exception {
		Map sendBody = new HashMap<String, Object>();
		setChannel(sendBody); //Channel 설정
		addText(sendBody, "*[" + serverName + " 브라우저 에러 발생!]*" + " - " + link); //Title
		
		//Error 정보
		List sendAttachmentsBody = new ArrayList();
		Map sendAttachmentBody = new HashMap<String, Object>();
		sendAttachmentsBody.add(sendAttachmentBody);
		sendBody.put("attachments", sendAttachmentsBody);
		
		
		changeErrorColor(sendAttachmentBody);
		addText(sendAttachmentBody, "*Error Message*: " + param.get("err_msg"));
		addText(sendAttachmentBody, "*Server IP*: " + param.get("server_ip"));
		addText(sendAttachmentBody, "*Error ID*: " + param.get("err_id"));
		addText(sendAttachmentBody, "*MENU CD*: " + param.get("menu_cd"));
		addText(sendAttachmentBody, "*User-Agent*: " + param.get("usr_agent"));
		addText(sendAttachmentBody, "*Occured Date*: " + param.get("err_occur_dt"));
		this.send(sendBody);
	}
	
	/**
	 * Slack Message 전송
	 */
	public void serverSend(Map<String, Object> param) throws Exception {
		Map sendBody = new HashMap<String, String>();
		setChannel(sendBody); //Channel 설정
		addText(sendBody, "*[" + serverName + " 서버 에러 발생!]*"); //Title
		
		//Error 정보
		List sendAttachmentsBody = new ArrayList();
		Map sendAttachmentBody = new HashMap<String, Object>();
		sendAttachmentsBody.add(sendAttachmentBody);
		sendBody.put("attachments", sendAttachmentsBody);
		
		
		changeErrorColor(sendAttachmentBody);
		addText(sendAttachmentBody, "*Error Message*: " + param.get("err_msg"));
		addText(sendAttachmentBody, "*Server IP*: " + param.get("server_ip"));
		addText(sendAttachmentBody, "*Error ID*: " + param.get("err_id"));
		addText(sendAttachmentBody, "*Session ID*: " + param.get("session_id"));
		addText(sendAttachmentBody, "*Occured Date*: " + param.get("err_occur_dt"));
		
		this.send(sendBody);
	}
	
	/**
	 * REST호출 
	 */
	public void send(Map<String, Object> param) {
		restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
		restTemplate.exchange(URL, HttpMethod.PUT, makeJsonHttpEntity(makeMapToJson(param)), String.class);
	}
	
	/**
	 * Text 추가
	 */
	public Map addText(Map<String, String> param, String text) {
		String originText = param.get("text");
		if(originText == null) {
			originText = "";
		}
		param.put("text", originText + "\n" + text);
		return param;
	}
	
	/**
	 * Text 추가
	 */
	public Map setChannel(Map<String, String> param) {
		if(this.channel == null) {
			return param;
		}
		
		param.put("channel", this.channel);
		return param;
	}
	
	/**
	 * color 설정
	 */
	public Map changeErrorColor(Map<String, String> param) {
		param.put("color", "#F35A00");
		return param;
	}
	
	/**
	 * httpEntity 생성
	 */
	public HttpEntity<String> makeJsonHttpEntity(String jsonStr){
		HttpHeaders header = new HttpHeaders();
		header.setContentType(MediaType.APPLICATION_JSON);
		return new HttpEntity<String>(jsonStr, header);
	}
	
	/**
	 * Map -> Json 문자열 변환
	 */
	public String makeMapToJson(Map<String,Object> data){
		return gson.toJson(data);
	}
}
