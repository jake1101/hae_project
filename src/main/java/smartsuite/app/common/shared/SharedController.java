package smartsuite.app.common.shared;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.XML;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.common.base.Strings;
import com.google.common.collect.Maps;

import freemarker.template.TemplateException;
import smartsuite.app.bp.admin.account.AccountService;
import smartsuite.app.bp.admin.auth.UserService;
import smartsuite.app.bp.admin.board.BoardAdminService;
import smartsuite.app.bp.admin.org.OperOrgService;
import smartsuite.app.bp.admin.org.OrgService;
import smartsuite.app.bp.admin.template.TemplateService;
import smartsuite.app.bp.approval.ApprovalService;
import smartsuite.app.common.TemplateGeneratorService;
import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.data.FloaterStream;
import smartsuite.excel.core.exporter.CustomDataExportUtil;
import smartsuite.excel.core.importer.manager.XLSXLargeImporter;
import smartsuite.excel.spring.largeexporter.LargeExportUtil;
import smartsuite.security.annotation.AuthCheck;
import smartsuite.security.authentication.Auth;
import smartsuite.security.userdetails.User;

/**
 * 공통으로 사용하는 서비스 관련 컨트롤러 Class입니다.
 *
 * @author hjhwang
 * @see
 * @since 2016. 2. 2
 * @FileName SharedController.java
 * @package smartsuite.app.shared
 * @변경이력 : [2016. 2. 2] hjhwang 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
public class SharedController {

	/** The shared service. */
	@Inject
	SharedService sharedService;

	/** The user service. */
	@Inject
	UserService userService;

	/** The approval service. */
	@Inject
	ApprovalService approvalService;

	/** The org service. */
	@Inject
	OrgService orgService;

	/** The oper org service. */
	@Inject
	OperOrgService operOrgService;
	
	/** The pro shared service. */
	//@Inject
	//ProSharedService proSharedService;

	/** The file upload path. */
	@Value ("#{file['file.upload.path']}")
	String FILE_UPLOAD_PATH;

	@Inject
	LargeExportUtil largeExportManager;
	
	@Inject
	CustomDataExportUtil customDataExportManager;
	
	/** 템플릿 관리 Service */
	@Inject
	TemplateService tmpService;
	
	/** FreeMarker 템플릿 생성 Service */
	@Inject
	TemplateGeneratorService templateGeneratorService;
	
	@Inject
	AccountService accountService;
	
	@Inject
	BoardAdminService boardAdminService;
	
	@Inject
	RestfulUtilService restFulUtilService;
	
	private static final String charset = "UTF-8";
	private static final String serviceKey = "saGCGL7cAgKe6hSW6g4rCbxoEGJlJfPDrByWVogQ5YqjU5eW2Ki7jR5vUfnlYrvm5WHl2UGDev6VsKe7Mx%2Fx6w%3D%3D";
	private static final String serviceUrl = "http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdSearchAllService/retrieveNewAdressAreaCdSearchAllService/getNewAddressListAreaCdSearchAll";
	
	/**
	 * common code 조회를 요청한다.
	 *
	 * @author : shkim
	 * @param param the codes
	 * @return the common codes
	 * @Date : 2016. 11. 01
	 * @Method Name : getCommonCodes
	 */
	@RequestMapping (value = "/**/getCommonCodes.do")
	public @ResponseBody Map<String,List> getCommonCodes(@RequestBody List<String> params) {
		Map<String,List> codes = Maps.newHashMap();
		for(String param : params) {
			codes.put(param, this.getCommonCodeList(param));
		}
		return codes;
	}

	/**
	 * common code list 조회를 요청한다.
	 *
	 * @author : hjhwang
	 * @param code the code
	 * @return the common code list
	 * @Date : 2016. 2. 2
	 * @Method Name : getCommonCodeList
	 */
	@RequestMapping (value = "/**/getCommonCodeList.do")
	//@Cacheable(value="cmmn-code", key="#code + '_' + T(org.springframework.context.i18n.LocaleContextHolder).getLocale().toString()")
	public @ResponseBody List getCommonCodeList(@RequestParam String code) {
		return sharedService.doGetCommonCodeList(code);
	}

	/**
	 * 공통코드와 특정 속성 list 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 19
	 * @Method Name : findCommonCodeAttrCdList
	 */
	@RequestMapping (value = "/**/findCommonCodeAttrCdList.do")
	public @ResponseBody List findCommonCodeAttrCdList(@RequestBody Map param) {
		return sharedService.findCommonCodeAttrCdList(param);
	}

	/**
	 * common codes 조회를 요청한다.
	 *
	 * @author : hjhwang
	 * @param lastUpdated the last updated
	 * @return the common codes
	 * @Date : 2016. 2. 2
	 * @Method Name : getCommonCodes
	 */
	@RequestMapping (value = "getModifiedCodes.do")
	public @ResponseBody List getModifiedCodes(@RequestParam (value = "lastUpdated") @DateTimeFormat (pattern = "yyyy-MM-ddHH:mm:ss") Date lastUpdated) {
		return sharedService.doGetModifiedCodes(lastUpdated);
	}

	/**
	 * 전체 company list 조회를 요청한다. Combobox 용
	 *
	 * @author : hjhwang
	 * @return the common code list
	 * @Date : 2016. 2. 2
	 * @Method Name : getCommonCodeList
	 */
	@RequestMapping (value = "/**/getAllCompanyList.do")
	public @ResponseBody List getAllCompanyList() {
		return sharedService.getAllCompanyList();
	}

	/**
	 * user list 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 3
	 * @Method Name : findUserList
	 */
	@RequestMapping (value = "/**/findListUser.do")
	public @ResponseBody List findListUser(@RequestBody Map param) {
		return userService.findListUser(param);
	}

	/**
	 * session user 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @return the session user
	 * @Date : 2016. 4. 14
	 * @Method Name : getSessionUser
	 */
	@RequestMapping (value = "/**/getSessionUser.do")
	public @ResponseBody Map<String,Object> getSessionUser() {
		User user = Auth.getCurrentUser();
		Map<String,Object> sessionUser = Maps.newHashMap();
		sessionUser.put("credentialsNonExpired", user.isCredentialsNonExpired());
		sessionUser.put("credentialsNonInitialized", user.isCredentialsNonInitialized());
		sessionUser.put("userInfo", user.getUserInfo());
		sessionUser.put("accountSettings", accountService.getAccountSettings());
		sessionUser.put("authorities", user.getAuthorities());
		return sessionUser;
	}

	/**
	 * session 사용자 권한 조회.
	 *
	 * @author : Yeon-u Kim
	 * @return the session user
	 * @Date : 2016. 4. 14
	 * @Method Name : getSessionUser
	 */
	@RequestMapping (value = "/**/getUserRoles.do")
	public @ResponseBody List<Map<String,Object>> getUserRoles() {
		return Auth.getCurrentUserRoles();
	}

	/**
	 * list dept 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 4. 14
	 * @Method Name : findListDept
	 */
	@RequestMapping (value = "/**/findListDept.do")
	public @ResponseBody List findListDept(@RequestBody Map param) {
		return orgService.findListDept(param);
	}

	/**
	 * 로그인 사용자 운영단위별 운영조직 조회.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return 운영조직 목록
	 * @Date : 2016. 2. 3
	 * @Method Name : findListOperOrgByUser
	 */
	@RequestMapping (value = "/**/findListOperOrgByUser.do")
	public @ResponseBody List findListOperOrgByUser(@RequestBody String param) {
		return sharedService.findListOperOrgByUser(param);
	}

	/**
	 * 운영단위 조직 연결정보 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 3. 11
	 * @Method Name : findListOperOrgByLink
	 */
	@RequestMapping (value = "/**/findListOperOrgByLink.do")
	public @ResponseBody List findListOperOrgByLink(@RequestBody Map param) {
		Object operUnitCd = param.get("oper_unit_cd");

		if ("IO".equals(operUnitCd)) {
			return sharedService.findListOperOrgByIO(param);
		} else {
			return sharedService.findListOperOrgByLink(param);
		}
	}

	/**
	 * 운영조직 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 4
	 * @Method Name : findListOperOrg
	 */
	@RequestMapping (value = "/**/findListOperOrg.do")
	public @ResponseBody List findListOperOrg(@RequestBody Map param) {
		return operOrgService.findListOperOrg(param);
	}

	/**
	 * 결재 상세정보 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the approval
	 * @throws Exception 
	 * @Date : 2016. 2. 2
	 * @Method Name : findApproval
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "/**/findApproval.do")
	public @ResponseBody Map findApproval(@RequestBody Map param) throws Exception {
		String aprvId = (String)param.get("aprv_id");
		String appId = (String)param.get("app_id");
		if (Strings.isNullOrEmpty(aprvId)) {
			if (Strings.isNullOrEmpty(appId)) {
				//결재 템플릿 조회
				return approvalService.findApprovalDocTemplate(param);
			}
			param.put("aprv_id", approvalService.getApprovalIdByAppId(param));
			if (Strings.isNullOrEmpty((String)param.get("aprv_id"))) {
				//결재 템플릿 조회
				return approvalService.findApprovalDocTemplate(param);
			}
		}
		return approvalService.findApproval(param);
	}

	/**
	 * 결재 요약정보를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the approval
	 * @Date : 2016. 2. 2
	 * @Method Name : findApprovalSummary
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "/**/findApprovalSummary.do")
	public @ResponseBody Map findApprovalSummary(@RequestBody Map param) {
		String appId = (String)param.get("app_id");
		if (Strings.isNullOrEmpty(appId)) {
			return null;
		}
		String aprvId = approvalService.getApprovalIdByAppId(param);
		if (Strings.isNullOrEmpty(aprvId)) {
			return null;
		}
		param.put("aprv_id", aprvId);
		return approvalService.findApprovalMaster(param);
	}

	/**
	 * 결재 임시저장을 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @throws Exception the exception
	 * @Date : 2016. 2. 2
	 * @Method Name : saveDraftApproval
	 */
	@AuthCheck (authCode = Const.APPROVAL)
	@RequestMapping (value = "/**/saveDraftApproval.do")
	public @ResponseBody Map saveDraftApproval(@RequestBody Map param) throws Exception {
		return approvalService.saveApproval(param);
	}

	/**
	 * 결재 상신을 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @throws Exception the exception
	 * @Date : 2016. 2. 2
	 * @Method Name : saveSubmitApproval
	 */
	@AuthCheck (authCode = Const.APPROVAL)
	@RequestMapping (value = "/**/saveSubmitApproval.do")
	public @ResponseBody Map saveSubmitApproval(@RequestBody Map param) throws Exception {
		return approvalService.saveApproval(param);
	}

	/**
	 * 결재 상신취소를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @throws Exception the exception
	 * @Date : 2016. 2. 2
	 * @Method Name : saveCancelApproval
	 */
	@AuthCheck (authCode = Const.APPROVAL)
	@RequestMapping (value = "/**/saveCancelApproval.do")
	public @ResponseBody Map saveCancelApproval(@RequestBody Map param) throws Exception {
		return approvalService.cancelApproval(param);
	}

	/**
	 * 결재 처리(승인, 반려)를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @throws Exception the exception
	 * @Date : 2016. 2. 2
	 * @Method Name : saveResultApproval
	 */
	@AuthCheck (authCode = Const.APPROVAL)
	@RequestMapping (value = "/**/saveResultApproval.do")
	public @ResponseBody Map saveResultApproval(@RequestBody Map param) throws Exception {
		return approvalService.saveResultApproval(param);
	}

	/**
	 * 결재 삭제를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @throws Exception the exception
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteApproval
	 */
	@AuthCheck (authCode = Const.APPROVAL)
	@RequestMapping (value = "/**/deleteApproval.do")
	public @ResponseBody Map deleteApproval(@RequestBody Map param) throws Exception {
		return approvalService.deleteApproval(param);
	}
	
	/**
	 * 결재 재상신을 요청한다.
	 *
	 * @author : kh_lee
	 * @param param
	 * @return resultMap
	 * @throws Exception
	 * @Date : 2017. 4. 12
	 * @Method Name : resubmitApproval
	 */
	@AuthCheck (authCode = Const.APPROVAL)
	@RequestMapping (value = "/**/resubmitApproval.do")
	public @ResponseBody Map resubmitApproval(@RequestBody Map param) throws Exception {
		return approvalService.resubmitApproval(param);
	}
	
	/**
	 * 결재선 저장을 요청한다.
	 * 결재선 변경 기능 추가 [SMARTNINE-2289]
	 *
	 * @author : wskim
	 * @param param
	 * @return the Map
	 * @Date : 2018. 7. 16
	 * @Method Name : saveAprvLine
	 */
	@AuthCheck (authCode = Const.APPROVAL)
	@RequestMapping (value = "/**/saveAprvLine.do")
	public @ResponseBody Map saveAprvLine(@RequestBody Map param){
		return approvalService.saveAprvLine(param);
	}
	
	/**
	 * 결재선을 조회한다.
	 * 결재선 변경 기능 추가 [SMARTNINE-2289]
	 *
	 * @author : wskim
	 * @param param
	 * @return the List
	 * @Date : 2018. 7. 16
	 * @Method Name : findAprvLine
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "/**/findAprvLine.do")
	public @ResponseBody List findAprvLine(@RequestBody Map param){
		return approvalService.findAprvLine(param);
	}
	
	

	/**
	 * 로그인 사용자 메뉴 목록 조회.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListAttach
	 */
	@RequestMapping (value = "/**/findListUserMenu.do")
	public @ResponseBody List findListLoginUserMenu(@RequestBody Map param) {
		
		return sharedService.findListUserMenu(param);
	}
	
	@RequestMapping (value = "/**/findListMenu.do")
	public @ResponseBody List findListMenu(@RequestBody Map param) {
		
		return sharedService.findListMenu(param);
	}

	/**
	 * 품목분류의 대분류 목록 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 2
	 * @Method Name : findListSharedCate
	 */
	@RequestMapping (value = "/**/findListSharedCate.do")
	public @ResponseBody List findListSharedCate(@RequestBody Map param) {
		return sharedService.findListSharedCate(param);
	}

	/**
	 * 상위분류에 대한 하위분류 목록 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 2
	 * @Method Name : findListSharedCateByUpCateCd
	 */
	@RequestMapping (value = "/**/findListSharedCateByUpCateCd.do")
	public @ResponseBody List findListSharedCateByUpCateCd(@RequestBody Map param) {
		return sharedService.findListSharedCateByUpCateCd(param);
	}

	/**
	 * 수량 단위 공통코드 목록 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 4
	 * @Method Name : findListAmtUnit
	 */
	@RequestMapping (value = "/**/findListAmtUnit.do")
	public @ResponseBody List findListAmtUnit(@RequestBody Map param) {
		return sharedService.findListAmtUnit(param);
	}


	
	/**
	 * list vendor master 조회를 요청한다.
	 *
	 * @author : mgPark
	 * @param param the param
	 * @return the list
	 * @Date : 2018. 7. 9
	 * @Method Name : findListVendorMaster
	 */
	@RequestMapping (value = "/**/findListVendorMaster.do")
	public @ResponseBody List findListVendorMaster(@RequestBody Map param) {
		return sharedService.findListVendorMaster(param);
	}

	/**
	 * 운영조직에 연결된 vendor 목록을 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 10
	 * @Method Name : findListLinkedVendor
	 */
	@RequestMapping (value = "/**/findListLinkedVendor.do")
	public @ResponseBody List findListLinkedVendor(@RequestBody Map param) {
		return sharedService.findListLinkedVendor(param);
	}

	/**
	 * list pro status 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 27
	 * @Method Name : findListProStatus
	 */
	@RequestMapping (value = "**/shared/findListProStatus.do")
	public @ResponseBody List findListProStatus(@RequestBody Map param) {
		return sharedService.findListProStatus(param);
	}

	/**
	 * SP 운영단위 목록 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 27
	 * @Method Name : findListOperOrgOfSp
	 */
	@RequestMapping (value = "/**/findListOperOrgOfSp.do")
	public @ResponseBody List findListOperOrgOfSp(@RequestBody String param) {
		return sharedService.findListOperOrgOfSp(param);
	}

	/**
	 * help 버튼 클릭시 메뉴얼 정보를 조회하여 메뉴얼을 보여줄 화면을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param menuCd the menu cd
	 * @return the model and view
	 * @Date : 2016. 7. 1
	 * @Method Name : findInfoManual
	 */
	@RequestMapping (value = "/**/findInfoHelpManual.do")
	public ModelAndView findInfoManual(String menuCd) {
		ModelAndView mav = new ModelAndView();

		Map param = new HashMap<String, Object>();
		param.put("menu_cd", menuCd);

		Map manualInfo = sharedService.findInfoHelpManual(param);

		if (manualInfo == null) {
			mav.setViewName("manual/manualHtmlView");
		} else {
			manualInfo.put("file_upload_path", FILE_UPLOAD_PATH);
			mav.addObject("manualInfo", manualInfo);

			// 매뉴얼 유형
			if ("PDF".equals(manualInfo.get("mnl_typ"))) {
				mav.setViewName("manual/manualPdfView");
			} else {
				mav.setViewName("manual/manualHtmlView");
			}
		}

		return mav;
	}

	/**
	 * 엑셀파일을 업로드해 데이터를 JSON 형식으로 파싱, response outputstream에 써준다.
	 *
	 * @author : SungWuk Ahn
	 * @param request the request
	 * @param response the response
	 * @param name the name
	 * @param parentIdProperty the parent id property
	 * @param idProperty the id property
	 * @param file the file
	 * @return void
	 * @throws IOException Signals that an I/O exception has occurred.
	 * @Date : 2016. 7. 15
	 * @Method Name : importExcel
	 */
	@RequestMapping (value = { "/**/importexcel.do" })
	public void importExcel(HttpServletRequest request, HttpServletResponse response, @RequestParam (value = "name", required = false) String name,
			@RequestParam (value = "parentIdProperty", required = false) String parentIdProperty,
			@RequestParam (value = "excludeEmptyRow", required = false, defaultValue = "true") boolean excludeEmptyRow,
			@RequestParam (value = "idProperty", required = false) String idProperty, @RequestParam (value = "file", required = false) MultipartFile file)
			throws IOException {
		XLSXLargeImporter im = new XLSXLargeImporter(excludeEmptyRow);
		response.setContentType("text/plain;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		im.doImport(file.getInputStream(), response.getOutputStream());
	}

	/**
	 * 대용량 엑셀파일을 다운로드 한다.
	 *
	 * @author : SungWuk Ahn
	 * @param request the request
	 * @param response the response
	 * @param fileName the fileName
	 * @return void
	 * @throws IOException Signals that an I/O exception has occurred.
	 * @Date : 2016. 7. 29
	 * @Method Name : largeexportExcel
	 */
	@RequestMapping (value = { "/**/largeexport.do" })
	public void largeexportExcel(@RequestParam ("fileName") String fileName, HttpServletRequest request, HttpServletResponse response) throws Exception {
		largeExportManager.doExport(request, response, URLEncoder.encode(fileName, "UTF-8").replace('+', ' '));
	}
	
	// 엑셀 지정형식 다운로드
	@RequestMapping (value = { "/**/customexport.do" })
	public void customexportExcel(@RequestParam ("fileName") String fileName, HttpServletRequest request, HttpServletResponse response) throws Exception {
		customDataExportManager.doExport(request, response, fileName);
	}
	
	/**
	 * 협력사 목록 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 7. 19
	 * @Method Name : findListVendorBasic
	 */
	@RequestMapping (value = "/**/findListVendorBasic.do")
	public @ResponseBody List findListVendorBasic(@RequestBody Map param) {
		return sharedService.findListVendorBasic(param);
	}
	
	/**
	 * zip code by DB 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the floater stream
	 * @Date : 2017. 8. 18
	 * @Method Name : findZipCodeByDB
	 */
	@RequestMapping(value="/**/findZipCodeByDB.do")
	public @ResponseBody FloaterStream findZipCodeByDB(@RequestBody Map param) {
		// 대용량 처리
		return sharedService.findZipCodeByDB(param);
	}
	/**
	 * 우편번호 검색을 요청한다.
	 *
	 * @author : 
	 * @param request the request
	 * @param response the response
	 * @param param the param
	 * @return void
	 * @throws Exception the exception
	 * @Date : 2016. 7. 19
	 * @Method Name : findZipcode
	 */
	@RequestMapping (value = "/**/findZipcode.do")
	public void findZipcode(HttpServletRequest request, HttpServletResponse response, @RequestBody Map param) throws Exception {

		String srchWord = (String)param.get("srch_word");
		Integer srchPage = (Integer)param.get("srch_page");
		if (srchPage == null) {
			srchPage = 1;
		}

		StringBuffer sendUrl = new StringBuffer();
		sendUrl.append(serviceUrl)
				.append("?ServiceKey=").append(serviceKey)
				.append("&srchwrd=").append(URLEncoder.encode(srchWord, charset))
				.append("&countPerPage=50&currentPage=")
				.append(srchPage);

		URL url = new URL(sendUrl.toString());
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		if (conn.getResponseCode() != 200) {
			throw new IOException(conn.getResponseMessage());
		}
		
		InputStream is = null;
		BufferedReader reader = null;
		StringBuffer buffer = new StringBuffer();
		PrintWriter out = null;
		
		try{
			is = conn.getInputStream();
			reader = new BufferedReader(new InputStreamReader(is));
			
			response.setCharacterEncoding(charset);
			response.setContentType("application/json; charset=" + charset);
			
			String line;
			while ((line = reader.readLine()) != null) {
				buffer.append(line);
			}
			
			out = response.getWriter();
			out.print(XML.toJSONObject(buffer.toString().toLowerCase()));
			out.flush();
			
		}finally{
			if(out != null){
				out.close();
			}
			
			if(conn != null){
				conn.disconnect();
			}
			
			if(reader != null){
				reader.close();
			}
			
			if(is != null){
				is.close();
			}
		}
		
		
		
	}
	
	/**
	 * 팝업에서 보여줄 템플릿을 가져온다. 
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @return the Map
	 * @Date : 2016. 8. 30
	 * @Method Name : getTmpByTmpId.do
	 */
	@RequestMapping(value="/**/getTmpByTmpId.do")
	public ModelAndView getTmpByTmpId(String tmpId){
		
		Map param = new HashMap<String, Object>();
		ModelAndView mav = new ModelAndView();
		param.put("tmp_bas_id", tmpId);
		
		Map tmpInfo = tmpService.findTmpByTmpId(param);
		
		if (tmpInfo == null) {
			mav.setViewName("portal/htmlView");
		} else {
			mav.addObject("tmpInfo", tmpInfo);

			// 매뉴얼 유형(TH : HTML, TX : Text, TM : Mail, TA : Approval)
			if ("TH".equals(tmpInfo.get("tmp_cls"))) {
				mav.setViewName("portal/htmlView");
			} else if("TX".equals(tmpInfo.get("tmp_cls"))) {
				mav.setViewName("portal/textView");
			}
		}
		
		return mav;
	}
	
	/**
	 * Captcha 이미지 크기 설정 및 Captcha 이미지 반환 
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @return the Map
	 * @Date : 2017. 2. 10
	 * @Method Name : getCaptcha.do
	 */
	@RequestMapping(value="/getCaptcha.do")
	public @ResponseBody Map getCaptcha(@RequestBody Map param){
		int imgWidth = (Integer) param.get("imgWidth");
		int imgHeight =(Integer) param.get("imgHeight");
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("captchaImage", sharedService.getCaptcha(imgWidth, imgHeight));
		return resultMap;
	}
	
	/**
	 * 사용자가 입력값과 세션의 Captcha값 비교  
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @return Boolean
	 * @Date : 2017. 2. 10
	 * @Method Name : checkCaptcha.do
	 */
	@RequestMapping(value="/checkCaptcha.do")
	public @ResponseBody Boolean checkCaptcha(@RequestBody Map param){
		return sharedService.checkCaptcha((String) param.get("captcha"));
	}
	
	/**
	 * 사용자 자신의 정보 저장, UserController.saveUser와 다름(다른 사용자도 저장 가능)   
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @return Boolean
	 * @Date : 2017. 2. 17
	 * @Method Name : saveUser.do
	 */
	@RequestMapping (value = "/saveUser.do")
	public @ResponseBody Map saveUser(@RequestBody Map param) {
		return sharedService.saveUser(param);
	}
	
	/**
	 * 사용자 자신의 패스워드 갱신, UserController.updatePassword와 다름(다른 사용자도 저장 가능)   
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @return Boolean
	 * @Date : 2017. 2. 17
	 * @Method Name : updatePassword.do
	 */
	@RequestMapping (value = "/updatePassword.do")
	public @ResponseBody Map updatePassword(@RequestBody Map param) {
		return userService.updatePassword(param);
		//Captcha 사용시
		/*		
		if(sharedService.checkCaptcha((String)param.get("captcha"))) {
			return userService.updatePassword(param);
		} else {
			resultMap.put(Const.RESULT_STATUS, "NO_MATCH");
			return resultMap;
		}*/
	}
	
	/**
	 * 내 즐겨찾기 리스트 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @return the list< map< string, object>>
	 * @Date : 2017. 3. 30
	 * @Method Name : findListMyFavorite
	 */
	@RequestMapping(value="/findListMyFavorite.do")
	public @ResponseBody List<Map<String,Object>> findListMyFavorite(){
		return sharedService.findListMyFavorite();
	}
	
	/**
	 * 내 즐겨찾기를 저장을 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2017. 3. 30
	 * @Method Name : saveMyFavorite
	 */
	@RequestMapping(value="/saveMyFavorite.do")
	public @ResponseBody List<Map<String,Object>> saveMyFavorite(@RequestBody Map param){
		return sharedService.saveMyFavorite(param);
	}
	
	/**
	 * 내 즐겨찾기 순서를 변경한다.
	 * 
	 * @param param
	 * @return
	 */
	@RequestMapping(value="/updateMyFavoriteOrder.do")
	public @ResponseBody List<Map<String,Object>> updateMyFavoriteOrder(@RequestBody Map param){
		return sharedService.updateMyFavoriteOrder(param);
	}
	
	/**
	 * my favorite 삭제를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2017. 3. 31
	 * @Method Name : deleteMyFavorite
	 */
	@RequestMapping(value="/deleteMyFavorite.do")
	public @ResponseBody Map deleteMyFavorite(@RequestBody Map param){
		return sharedService.deleteMyFavorite(param);
	}
	
	/**
	 * 사용자 자신의 정보 검색 , UserController.findUserByUserId와 다름(다른 사용자도 검색 가능)   
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @return Boolean
	 * @Date : 2017. 2. 17
	 * @Method Name : findUserByUserId.do
	 */
	@RequestMapping (value = "/findCurrntUserInfo.do")
	public @ResponseBody Map findCurrntUserInfo() {
		return sharedService.findCurrntUserInfo();
	}
	
	@RequestMapping(value="/**/checkRoleAdminAuthenticate.do")
	public @ResponseBody Map<String,Object> checkRoleAdminAuthenticate(HttpServletRequest request, @RequestBody Map<String,String> param) {
		return sharedService.checkRoleAdminAuthenticate(request, param);
	}
	
	/**
	 * 미사용 계정 기준 정보 조회
	 *
	 * @author : Joon Huh
	 * @return the map
	 * @Date : 2017. 5. 2
	 * @Method Name : findAccountDisabledInfo
	 */
	@RequestMapping (value = "/findAccountDisabledInfo.do")
	public @ResponseBody Map findAccountDisabledInfo() {
		return sharedService.findAccountDisabledInfo();
	}
	
	/**
	 * Preview Tempalte Generator
	 * 
	 * @param param : {base_template, data}
	 * @return list
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "/**/generatePreviewTemplate.do")
	public @ResponseBody Map generatePreviewTemplate(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		
		try {
			resultMap.put("html", templateGeneratorService.generate("preview", (String) param.get("template"), param.get("templateData")));
			
		} catch (TemplateException e) {
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
		} catch (IOException e) {
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
		}
		
		return resultMap;
	}
	
	/**
     * 운영단위별 운영조직 조회.
     */
    @AuthCheck (authCode = Const.READ)
    @RequestMapping (value = "/**/findListOperOrgAll.do")
    public @ResponseBody List findListOperOrgAll(@RequestBody String param) {
        return sharedService.findListOperOrgAll(param);
    }
    
    /**
	 * 공지 팝업 목록 조회
	 *
	 * @author : 
	 * @param param the param
	 * @return the result vo
	 * @Date : 2017. 8. 24
	 * @Method Name : findListMainNotice
	 */
	@RequestMapping(value="/**/findNoticeList.do", method = RequestMethod.POST)
	public @ResponseBody List findNoticeList(@RequestBody Map<String, Object> param) throws Exception{
		return boardAdminService.findNoticeList(param);
	}
    
	/**
	 * 아이디 찾기
	 */
	@RequestMapping (value = "/**/initPassword.do", method = RequestMethod.POST)
	public ModelAndView initPaswordByUserInfo(@RequestParam Map param) throws Exception {

		ModelAndView model = new ModelAndView();

		String resultPage = "portal/bp/result/";

		param.put("usr_id", param.get("username"));

		Map result = userService.initPassword(param);

		if (Const.FAIL.equals(result.get(Const.RESULT_STATUS))) {

			if (Const.UNAUTHORIZED.equals(result.get(Const.RESULT_DATA))) {

				resultPage += "contactAdmin"; // 이메일 수신 거부 사용자
			} else if (Const.NOT_EXIST.equals(result.get(Const.RESULT_DATA))) {

				resultPage += "noUser"; // 회원 정보 불일치 페이지
			}

		} else {
			resultPage += "successMailSend"; // 성공 페이지
		}

		model.setViewName(resultPage);

		return model;
	}
	
	/**
	 * 비밀번호 초기화
	 */
	@RequestMapping (value = "/**/initPassword2.do", method = RequestMethod.POST)
	public ModelAndView initPaswordByUserInfo2(@RequestParam Map param) throws Exception {

		ModelAndView model = new ModelAndView();

		String resultPage = "portal/bp/result/";

		param.put("usr_id", param.get("username"));

		Map result = userService.initPassword2(param);

		if (Const.FAIL.equals(result.get(Const.RESULT_STATUS))) {

			if (Const.UNAUTHORIZED.equals(result.get(Const.RESULT_DATA))) {

				resultPage += "contactAdmin"; // 이메일 수신 거부 사용자
			} else if (Const.NOT_EXIST.equals(result.get(Const.RESULT_DATA))) {

				resultPage += "noUser"; // 회원 정보 불일치 페이지
			}

		} else {
			resultPage += "successMailSend"; // 성공 페이지
		}

		model.addObject("result_data", result.get(Const.RESULT_DATA) );
		model.setViewName(resultPage);

		return model;
	}
	
//	/**
//	 * Inits the pasword by user info.
//	 *
//	 * @param param the param
//	 * @return the model and view
//	 * @throws Exception the exception
//	 */
//	@RequestMapping (value = "/**/sp/**/initPassword.do", method = RequestMethod.POST)
//	public ModelAndView initPaswordByUserInfo(@RequestParam Map param) throws Exception {
//
//		ModelAndView model = new ModelAndView();
//
//		String resultPage = "portal/sp/result/";
//
//		param.put("usr_id", param.get("username"));
//
//		Map result = userService.initPassword(param);
//
//		if (Const.FAIL.equals(result.get(Const.RESULT_STATUS))) {
//
//			if (Const.UNAUTHORIZED.equals(result.get(Const.RESULT_DATA))) {
//
//				resultPage += "contactAdmin"; // 이메일 수신 거부 사용자
//			} else if (Const.NOT_EXIST.equals(result.get(Const.RESULT_DATA))) {
//
//				resultPage += "noUser"; // 회원 정보 불일치 페이지
//			}
//
//		} else {
//			resultPage += "successMailSend"; // 성공 페이지
//		}
//
//		model.setViewName(resultPage);
//
//		return model;
//	}
	
	@RequestMapping(value="/**/findListSiteCombo.do", method = RequestMethod.POST)
	public @ResponseBody List findListSiteCombo(@RequestBody Map<String, Object> param) throws Exception{
		return sharedService.findListSiteCombo(param);
	}
	
	@RequestMapping(value="/**/findListVerCombo.do", method = RequestMethod.POST)
	public @ResponseBody List findListVerCombo(@RequestBody Map<String, Object> param) throws Exception{
		return sharedService.findListVerCombo(param);
	}
	
	@RequestMapping(value="/**/findListAreaCombo.do", method = RequestMethod.POST)
	public @ResponseBody List findListAreaCombo(@RequestBody Map<String, Object> param) throws Exception{
		return sharedService.findListAreaCombo(param);
	}
	
	@RequestMapping(value="/**/findListModelGroup.do", method = RequestMethod.POST)
	public @ResponseBody List findListModelGroup(@RequestBody Map<String, Object> param) throws Exception{
		return sharedService.findListModelGroup(param);
	}
	
	@RequestMapping(value="/**/shared/findListDoor.do", method = RequestMethod.POST)
	public @ResponseBody List findListDoor(@RequestBody Map<String, Object> param) throws Exception{
		return sharedService.findListDoor(param);
	}
	
	@RequestMapping(value="/**/findListCompanyCombo.do", method = RequestMethod.POST)
	public @ResponseBody List findListCompanyCombo(@RequestBody Map<String, Object> param) throws Exception{
		return sharedService.findListCompanyCombo(param);
	}
	
	@RequestMapping(value="/**/findListSiteByCompany.do", method = RequestMethod.POST)
	public @ResponseBody List findListSiteByCompany(@RequestBody Map<String, Object> param) throws Exception{
		return sharedService.findListSiteByCompany(param);
	}
	
	@RequestMapping(value = "/**/findListUserSiteCombo.do")
	public @ResponseBody List findListUserSiteCombo(@RequestBody Map param) {
		return sharedService.findListUserSiteCombo(param);
	}
	

	/**
	 * 그리드 목록 조회를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the grp code list
	 * @Date :2020. 07. 16
	 * @Method Name : findGridList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "/**/findGridPositionList.do")
	public @ResponseBody Map findGridPositionList(@RequestBody Map param) {
		return (Map) restFulUtilService.callRaycomApi("three/target/grid", param).get("body");
	}
	/**
	 * 센서 포지션 조회를 요청한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the grp code list
	 * @Date :2020. 07. 16
	 * @Method Name : findPositionInfo
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "/**/findPositionInfo.do")
	public @ResponseBody List findPositionInfo(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("three/target/view", param).get("body");
	}
	
	
	/**
	 * Casen 정보 저장을 요청한다.
	 *
	 * @author : jh baek
	 * @param param the param
	 * @Date : 2020. 07. 14
	 * @Method Name : saveCasenInfo
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "/**/saveCasenInfo.do")
	public @ResponseBody Map saveCasenInfo(@RequestBody Map param) {
		
		return restFulUtilService.callRaycomApi("area/upsert", param.get("areaInfo"));
	}
	
	/**
	 * 그룹리스트 조회	
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "/**/findShipGroupList.do")
	public @ResponseBody List findGroupList(@RequestBody Map param) {
		return (List)restFulUtilService.callRaycomApi("three/layergroup/list", param).get("body");
	}
	
	
	/**
	 * 비콘리스트 조회	
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "/**/findListBeacon.do")
	public @ResponseBody List findListBeacon(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("three/beacon/list", param).get("body");
	}
	
	/**
	 * 3d있는 영역 조회	
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "/**/findThreeList.do")
	public @ResponseBody List findThreeList(@RequestBody Map param) {
		return (List) restFulUtilService.callRaycomApi("area/list", param).get("body");
	}
	
	
	/**
	 * Home 유형 저장
	 * @param param
	 * @return
	 */
	@RequestMapping(value="**/saveUserHomeTyp.do")
    public @ResponseBody Map saveUserHomeTyp(@RequestBody Map param) {
    	return sharedService.saveUserHomeTyp(param);
    }
}
