package smartsuite.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileTime;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import smartsuite.app.bp.admin.board.BoardAdminService;
import smartsuite.app.common.portal.PortalService;
import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.shared.Const;
import smartsuite.app.common.stateful.StatefulService;
import smartsuite.security.authentication.Auth;
import smartsuite.security.core.authentication.encryption.salt.SaltSource;
import smartsuite.security.core.crypto.AESIvParameterGenerator;
import smartsuite.security.core.crypto.AESSecretKeyGenerator;
import smartsuite.security.core.crypto.CipherUtil;
import smartsuite.security.web.authentication.encryption.salt.PasswordSalt;
import smartsuite.security.web.crypto.AESCipherKey;

@Controller
public class RootController {
	@Inject
	SaltSource saltSource;
	
	@Inject
	AESSecretKeyGenerator keyGenerator;
	
	@Inject
	AESIvParameterGenerator parameterGenerator;
	
	@Inject
	StatefulService statefulService;
	
	@Inject
	BoardAdminService boardAdminService;
	
	@Inject
	PortalService portalService;
	
	@Inject
	CipherUtil cipherUtil;
	
	@Inject
	HttpSession httpSession;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	/** The file upload path. */
	@Value ("#{raycomAPI['raycom.api.url']}")
	String URL;
	
	/** kakao map api appkey */
	@Value ("#{raycomAPI['raycom.kakao.map.app.key']}")
	String KAKAO_APPKEY;
	
	@Value("#{globalProperties['error.user.message']}")
	private Boolean useErrorUserMessage = false;

	@RequestMapping(value = "index.do", method = RequestMethod.GET)
	public ModelAndView indexPage() throws JsonGenerationException, JsonMappingException, IOException {
		if(isAuthenticated()) {
			return new ModelAndView("redirect:/afterLogin.do");
		}
		ModelAndView model = new ModelAndView();
		model.setViewName("index");
		return model;
	}

	@RequestMapping(value = "login.do", method = RequestMethod.GET)
	public ModelAndView loginPage() throws JsonGenerationException, JsonMappingException, IOException {
//		if(isAuthenticated()) {
//			return new ModelAndView("redirect:/afterLogin.do");
//		}
		ModelAndView model = new ModelAndView();
		model.setViewName("login");
		//패스워드 암호화에 사용할 솔트값 전달
		model.addObject("_passwordSaltSource", new PasswordSalt(saltSource.getSalt()));
		return model;
	}
	@RequestMapping(value = "mdownload.do", method = RequestMethod.GET)
	public ModelAndView mdownload(HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException {
	  String formatted ="";
      String formatted2 ="";
      String androidFile="";
      String iosFile="";
		try{

			String rootPath = RootController.class.getResource(".").getPath();
			
            // 프로퍼티 파일 위치
            String propFile = rootPath+"/../properties/file.properties";
             
            // 프로퍼티 객체 생성
            Properties props = new Properties();
             
            // 프로퍼티 파일 스트림에 담기
            FileInputStream fis = new FileInputStream(propFile);
             
            // 프로퍼티 파일 로딩
            props.load(new java.io.BufferedInputStream(fis));
           
            BasicFileAttributes attrs = null;
          
            // 항목 읽기
            String path = props.getProperty("file.upload.path") ;
            androidFile=props.getProperty("file.android");
            iosFile=props.getProperty("file.ios");
             
            File file = new File(path + File.separator+androidFile);
            attrs = Files.readAttributes(file.toPath(), BasicFileAttributes.class); 
            FileTime time = attrs.creationTime(); String pattern = "yyyy-MM-dd HH:mm:ss"; 
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            formatted = simpleDateFormat.format(new Date(time.toMillis()));

            request.setAttribute("androidDt", formatted);

            File file2 = new File(path + File.separator+iosFile);
            attrs = Files.readAttributes(file2.toPath(), BasicFileAttributes.class); 
            FileTime time2 = attrs.creationTime(); String pattern2 = "yyyy-MM-dd HH:mm:ss"; 
            SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat(pattern2);
            formatted2 = simpleDateFormat2.format(new Date(time.toMillis()));
            
        }catch(Exception e){
//            e.printStackTrace();
        }
		request.setAttribute("androidFile", androidFile);
		request.setAttribute("iosFile", iosFile);
	    request.setAttribute("androidDt", formatted);
        request.setAttribute("iosDt", formatted2);		
        
		ModelAndView model = new ModelAndView();
		model.setViewName("mdownload");
		//패스워드 암호화에 사용할 솔트값 전달
		model.addObject("_passwordSaltSource", new PasswordSalt(saltSource.getSalt()));
		return model;
	}

	@RequestMapping(value = "afterLogin.do", method = RequestMethod.GET)
	public ModelAndView loginAfterPage() throws JsonGenerationException, JsonMappingException, IOException {
		if(!isAuthenticated()) {
			return new ModelAndView("redirect:login.do");
		}
		ModelAndView model = new ModelAndView();
		model.setViewName("mdi");
		model.addObject("useErrorUserMessage", useErrorUserMessage);
		model.addObject("_aesCipherKey", new AESCipherKey(keyGenerator.getKey(), keyGenerator.getPassPhrase(), keyGenerator.getIterationCount(), parameterGenerator.getIv()));
		model.addObject("_cacheBust", statefulService.getCacheBust());
		model.addObject("_kakaoMapAppkey", KAKAO_APPKEY);
		
		// 포탈 타입정보를 가져옴
		String portalType = "vueGrid";
		Map configMap = portalService.findPortalCommonConfig(null);
		if(configMap != null && configMap.get("value") != null) {
			String configJsonStr = (String) configMap.get("value");
			ObjectMapper mapper = new ObjectMapper();
			Map<String, String> configJson = null; 
			int qIdx = configJsonStr.lastIndexOf("{"); 
			
			// ~ 1.0.3의 경우 (단순히 vueGrid, slider 만 값이 있는 경우)
			if(qIdx == -1) {
				portalType = configJsonStr;
			}
			// 1.0.3 ~ 1.0.5의 경우 ({layout_type: 'vueGrid', use_userlayout: 'Y'}) 처리
			else if(qIdx == 0) {
				configJson = mapper.readValue(configJsonStr, new TypeReference<Map<String, String>>(){});
				portalType = (String) configJson.get("layout_type");
			}
			
			// 1.0.5 ~ 의 경우 ({ 'B': {layout_type: 'vueGrid', use_userlayout: 'Y'}, ... }) 처리
			else if(qIdx > 0) {
				Map<String, Map<String, String>> configJsonTmp = mapper.readValue(configJsonStr, new TypeReference<Map<String, Map<String, String>>>(){});
				String currentUsrCls = (String) Auth.getCurrentUserInfo().get("usr_cls");
				configJson = configJsonTmp.get(currentUsrCls);
				portalType = (String) configJson.get("layout_type");
			}
		}
		model.addObject("_portalType", portalType);
		
		//패스워드 암호화에 사용할 솔트값 전달
		model.addObject("_passwordSaltSource", new PasswordSalt(saltSource.getSalt()));
		return model;
	}
	
	@RequestMapping(value = "afterSinglePageLogin.do", method = RequestMethod.GET)
	public ModelAndView ssoLoginAfterPage() throws JsonGenerationException, JsonMappingException, IOException {
		if(!isAuthenticated()) {
			return new ModelAndView("redirect:/login.do");
		}
		ModelAndView model = new ModelAndView();
		model.setViewName("app");
		model.addObject("_aesCipherKey", new AESCipherKey(keyGenerator.getKey(), keyGenerator.getPassPhrase(), keyGenerator.getIterationCount(), parameterGenerator.getIv()));
		model.addObject("_cacheBust", statefulService.getCacheBust());
		
		//패스워드 암호화에 사용할 솔트값 전달
		model.addObject("_passwordSaltSource", new PasswordSalt(saltSource.getSalt()));
		return model;
	}
	
	@RequestMapping(value = "loginFailure.do", method = RequestMethod.GET)
	public ModelAndView loginFailure() {
		ModelAndView model = new ModelAndView();
		model.setViewName("loginFailure");
		return model;
	}
	
	private boolean isAuthenticated() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return !(authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken);
	}
	
	
	/**
	 * 협력사 등록 페이지
	 *
	 * @return the model and view
	 */
	@RequestMapping(value = "newVendor.do", method = RequestMethod.GET)
	public ModelAndView newVendor(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView model = new ModelAndView();
		model.setViewName("/portal/sp/newVendor");
		String locale = request.getParameter("locale");
		if(locale != null){
			model.addObject("_locale",request.getParameter("locale"));
		}
		return model;
	}
	@RequestMapping("logoutSuccess.do")
	public ModelAndView logoutSuccessPage(HttpServletResponse response) {
		return new ModelAndView("logoutSuccess");
	}
	
	@RequestMapping("spLogoutSuccess.do")
	public ModelAndView spLogoutSuccessPage(HttpServletResponse response) {
		return new ModelAndView("spLogoutSuccess");
	}

	@RequestMapping("invalidSession.do")
	public ModelAndView invalidSession(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("invalidSession");
	}
	
	@RequestMapping("sessionExpired.do")
	public ModelAndView sessionExpired(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("invalidSession");
	}
	
	@RequestMapping(value = "spLogin.do", method = RequestMethod.GET)
	public ModelAndView spLoginPage() {
		if(isAuthenticated()) {
			return new ModelAndView("redirect:/afterLogin.do");
		}
		ModelAndView model = new ModelAndView();
		model.setViewName("spLogin");
		//패스워드 암호화에 사용할 솔트값 전달
		model.addObject("_passwordSaltSource", new PasswordSalt(saltSource.getSalt()));
		
		Map<String, Object> param = new HashMap<String, Object>();
		// 외부에 노출 할 게시판 board_id 를 명시합니다.
		param.put("board_id", "10025");
		List<Map<String, Object>> boardList = boardAdminService.findPortalNoticeList(param);
		// key 값을 암호화 하여 전달합니다.
		for(Map<String, Object> boardInfo : boardList) {
			boardInfo.put("board_id", cipherUtil.encrypt((String)boardInfo.get("board_id")));
			boardInfo.put("post_no", cipherUtil.encrypt((String)boardInfo.get("post_no")));
		}
		
		model.addObject("boardList",boardList);
		
		return model;
	}
	
	@RequestMapping(value = "docs.do", method = RequestMethod.GET)
	public ModelAndView docsPage() {
		ModelAndView model = new ModelAndView();
		model.setViewName("docs");
		return model;
	}
	
	@RequestMapping(value = "default.do", method = RequestMethod.GET)
	public ModelAndView defaultPage() throws JsonGenerationException, JsonMappingException, IOException {
		if(isAuthenticated()) {
			return new ModelAndView("redirect:/afterLogin.do");
		}
		ModelAndView model = new ModelAndView();
		model.setViewName("noSessionMdi");
		//패스워드 암호화에 사용할 솔트값 전달
		model.addObject("_passwordSaltSource", new PasswordSalt(saltSource.getSalt()));
		//메뉴를 조회할 usrCls 를 지정
		httpSession.setAttribute("usrCls", "T");
		
		return model;
	}
	
	/**
	 * Session Update를 수행한다. 
	 * Dummy 
	 */
	@RequestMapping(value = "/**/sessionTimeUpdate.do")
	public @ResponseBody Map sessionTimeUpdate(@RequestBody Map param){
		Map resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		
		return resultMap;
	}
	
	/**
	 *  로그인 이전에 팝업으로 게시판 모듈을 호출합니다.
	 */
	@RequestMapping(value = "noticeLink.do", method = RequestMethod.POST)
	public ModelAndView noticeLink(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView model = new ModelAndView();
		String board_id = request.getParameter("board_id");
		String post_no = request.getParameter("post_no");
		
		model.addObject("board_id",board_id);
		if(post_no != null){
			model.addObject("post_no",post_no);
		}
		model.setViewName("noticePopup");
		return model;
	}
	/**
	 *   팝업으로 3d모델을 호출합니다.
	 */
	@RequestMapping(value = "threePopup.do", method = RequestMethod.GET)
	public ModelAndView threePopup(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView model = new ModelAndView();
		int site_id = 1;
		int area_id = 107;
		
		model.addObject("siteId", request.getParameter("siteId") );
		model.addObject("areaId", request.getParameter("areaId") );
		
		model.setViewName("threePopup");
		return model;
	}
	
	/**
	 *   팝업으로 작업자 리스트를 호출합니다.
	 */
	@RequestMapping(value = "workerListPopup.do", method = RequestMethod.GET)
	public ModelAndView workerListPopup(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView model = new ModelAndView();		
		model.addObject("siteId", request.getParameter("siteId") );
//		model.addObject("userId", request.getParameter("userId") );
		
		model.setViewName("workerListPopup");
		return model;
	}
	
	/**
	 * password 조회를 요청한다.
	 *
	 * @param param the param
	 * @return the model and view
	 * @throws Exception the exception
	 * @Date : 2017. 12. 12
	 * @Method Name : findPassword
	 */
	@RequestMapping (value = "/**/portal/sp/login/findPassword.do", method = RequestMethod.GET)
	public ModelAndView findPassword(@RequestParam Map param) throws Exception {
		ModelAndView model = new ModelAndView();
		model.setViewName("portal/sp/login/findPassword");
		return model;
	}
	
	/**
	 * id 조회를 요청한다.
	 *
	 * @param param the param
	 * @return the model and view
	 * @throws Exception the exception
	 * @Date : 2017. 12. 12
	 * @Method Name : findId
	 */
	@RequestMapping (value = "/**/portal/sp/login/findId.do", method = RequestMethod.GET)
	public ModelAndView findId(@RequestParam Map param) throws Exception {
		ModelAndView model = new ModelAndView();
		model.setViewName("portal/sp/login/findId");
		return model;
	}
	
	
	/**
	 * Alarm 목록 얻기
	 *
	 * @param param the param
	 * @return 
	 * @throws 
	 * @Date : 2017. 12. 12
	 * @Method Name : findAlarmList
	 */
	@RequestMapping (value = "/**/findAlarmList.do")
	public @ResponseBody Map findAlarmList(@RequestBody Map param) {
//		return restFulUtilService.callRaycomApi("alarm/list", param);
		return restFulUtilService.callRaycomApi("alarm/websocket/list", param);
	}
//	public @ResponseBody List findAlarmList(@RequestBody Map param) {
//		Map<String, Object> temp = new HashMap<String, Object>();
//		temp.put("userId", (String)Auth.getCurrentUserInfo().get("usr_id"));
//		temp.put("date", null);
//		
//		HttpEntity<String> httpEntity = restFulUtilService.createHttpEntity(temp);
//		
//	    RestTemplate restTemplate = new RestTemplate();
//		String customerUrl = URL + "alarm/websocket/list";
//		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, httpEntity, String.class);
//
//		Gson gson = new Gson();
//		Map<String, Object> jsonObject = gson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
//		List<Map<String, Object>> resultList = (List) jsonObject.get("body");
//		
//		return resultList;
//	}
	
}
