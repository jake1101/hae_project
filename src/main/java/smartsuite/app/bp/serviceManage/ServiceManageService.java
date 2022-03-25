package smartsuite.app.bp.serviceManage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.bp.admin.job.JobService;
import smartsuite.app.bp.admin.org.OperOrgService;
import smartsuite.app.common.mail.CommonMailService;
import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.restful.RestfulUtilServiceToCorners;
import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;
import smartsuite.security.authentication.Auth;
import smartsuite.security.authentication.AuthenticationPostService;
import smartsuite.security.authentication.PasswordGenerator;
import smartsuite.security.core.authentication.encryption.PasswordEncryptor;
import smartsuite.security.core.crypto.AESIvParameterGenerator;
import smartsuite.security.core.crypto.AESSecretKeyGenerator;
import smartsuite.security.core.crypto.CipherUtil;

/**
 * 서비스 관리 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author hjh
 * @see
 * @since 2022. 2. 24
 * @FileName ServiceManageController.java
 * @package smartsuite.app.bp.serviceManage
 * @변경이력 : [2022. 2. 24] hjh 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" , "rawtypes"})
public class ServiceManageService {
	
	static final Logger LOG = LoggerFactory.getLogger(AuthenticationPostService.class);
	
	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	@Inject
	private CommonMailService commonMailService;
	
	/** global.properties. */
	@Value ("#{globalProperties['bp.main.url']}")
	private String spUrl; 
	
	@Value ("#{globalProperties['use-default-password']}")
	private Boolean useDefaultPassword;
	
	@Value ("#{globalProperties['default-password']}")
	private String defaultPassword;

	/** SecretKey Generator PW 암복호화시 사용 */
	@Inject
	AESSecretKeyGenerator keyGenerator;
	
	/** Parameter Generator PW 암복호화시 사용 */
	@Inject
	AESIvParameterGenerator parameterGenerator;
	
	@Inject
	CipherUtil cipherUtil;
	
	@Inject
	PasswordGenerator passwordGenerator;
	
	@Inject
	OperOrgService operOrgService;
	
	@Inject
	JobService jobService;
	
	@Inject
	PasswordEncryptor passwordEncryptor;
	
	@Inject
	PasswordEncoder passwordEncoder;
	
	@Inject
	RestfulUtilService restfulUtilService;
	
	@Inject
	RestfulUtilServiceToCorners restfulUtilServiceToCorners;
	
	/**
	 * 서비스 그룹 리스트
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 2. 24
	 * @Method Name : 
	 */
	public Map<String,Object> regSafetyServiceGroupList(Map<String,Object> param) {
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
//		Map<String,Object> apiToResultMap = new HashMap<String, Object>();
//		
//		List<Map<String, Object>> returnlistMap = new ArrayList<Map<String, Object>>();
		
//		List list =  sqlSession.selectList("serviceManageApi.regSafetyServiceGroupList", param);
//		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
//		resultMap.put(Const.RESULT_DATA, list);
		
//		return returnlistMap;
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("searchAllSvcGrpList", param);
		
		return resultMap;
	}
	
	/**
	 * 등록 서비스 리스트
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 2. 24
	 * @Method Name : findRegSafetyServiceList
	
	public Map<String,Object> findRegSafetyServiceList(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("findRegSafetyServiceList", param);
		
//		resultMap = (List<Map<String, Object>>) gridResultMap.get("result_data");
		
		return resultMap;
		
	}
	*/
	/**
	 * 등록 서비스 리스트
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 2. 24
	 * @Method Name : findRegSafetyServiceList
	*/
	public List<Map<String,Object>> findRegSafetyServiceList(Map param) {
		
		List<Map<String, Object>> resultMap = new ArrayList<Map<String, Object>>();
		Map<String, Object> gridResultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		gridResultMap = restfulUtilServiceToCorners.callCornersApi("findRegSafetyServiceList", param);
		
		resultMap = (List<Map<String, Object>>) gridResultMap.get("result_data");
		
		return resultMap;
		
	}
	
	/**
	 * 등록 서비스 리스트
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 2. 24
	 * @Method Name : findRegSafetyServiceList
	
	public List<Map<String,Object>> findRegSafetyServiceList(Map param) {
		
		List<Map<String, Object>> resultMap = new ArrayList<Map<String, Object>>();
		Map<String, Object> gridResultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		gridResultMap = restfulUtilServiceToCorners.callCornersApi("findRegSafetyServiceList", param);
		
		resultMap = (List<Map<String, Object>>) gridResultMap.get("result_data");
		
		return resultMap;
		
	}
	
	*/
	
	/**
	 * 사용여부(SVC_CTL.SVC_USE_YN)을 수정한다
	 *
	 * @author : 
	 * @param SVC_CTL_ID String, SVC_USE_YN String
	 * @return the map<string, object>: result_status String
	 * @Date : 2022. 2. 24
	 * @Method Name : updateServiceUseYn
	 */
	public Map<String,Object> updateServiceUseYn(Map param) {
		
//		List<Map<String, Object>> resultMap = new ArrayList<Map<String, Object>>();
		//Map userInfo = Auth.getCurrentUserInfo();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("updateServiceUseYn", param);
		
		return resultMap;
		
	}
	
	/**
	 * 서비스 신청하기. 
	 *
	 * @author : jake
	 * @param param the param
	 * @Date : 2022. 3. 8
	 * @Method Name : applyService
	 */ 
	public Map<String,Object> applyService(Map param) {

		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		param.put("usr_id", userInfo.get("usr_id"));
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("applyService", param);
			
		return resultMap;
	}
	
	/**
	 * 서비스카타로그별 디바이스 목록 조회
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 2. 24
	 * @Method Name : 
	 */
	public Map getDevicesByCatalogId(Map<String,Object> param) {
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("getDevicesByCatalogId", param);
		
		return resultMap;
	}
	
	/**
	 * 계열사 목록 조회
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 2. 24
	 * @Method Name : 
	 */
	public Map getCompanyList(Map param) {
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}

		return resultMap = restfulUtilServiceToCorners.callCornersApi("getCompanyList", param);
	}

	/**
	 * 사업장 목록 조회
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 2. 24
	 * @Method Name : 
	 */
	public Map getWPCList(Map param) {
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}

		return resultMap = restfulUtilServiceToCorners.callCornersApi("getWPCList", param);
	}
	
	/**
	 * 예상월구독룍조회
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 3. 14
	 * @Method Name : 
	 */
	public Map estimateMonthlyFee(Map<String,Object> param) {
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("estimateMonthlyFee", param);
		
		return resultMap;
	}
	
	/**
	 * C-서비스 이용 현황 - 사업장별 신청 서비스 그룹핑 조회
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 3. 16
	 * @Method Name : 
	 */
	public Map getWpcServiceList(Map<String,Object> param) { 
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("getWpcServiceList", param);
		
		return resultMap;
	}
	
	/**
	 * C-서비스 이용 현황 - 사업장별 신청 서비스 전체 조회
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 3. 16
	 * @Method Name : 
	 */
	public Map getWpcServiceListAll(Map<String,Object> param) { 
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("getWpcServiceListAll", param);
		
		return resultMap;
	}
	
	/**
	 * C-서비스 이용 현황 - 조회
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 3. 14
	 * @Method Name : 
	 */
	public Map getServiceUseList(Map<String,Object> param) {
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("getServiceUseList", param);
		
		return resultMap;
	}
	
	/**
	 * C-서비스 이용 현황 - 서비스 삭제(사용여부 변경)
	 *
	 * @author :
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 15
	 * @Method Name : updateServiceUseYn
	 */
	public Map<String,Object> changeApplyService(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "system" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("changeApplyService", param);
		
		return resultMap;
		
	}
	
	/**
	 * 1:1 문의 게시판 조회
	 *
	 * @author : 
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 15
	 * @Method Name : searchHotLine
	 */
	public Map<String,Object> searchHotLine(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("searchHotLine", param);
		
		return resultMap;
		
	}
	
	/**
	 * 1:1 문의 게시판 조회
	 *
	 * @author : 
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 15
	 * @Method Name : searchHotLineDetail
	 */
	public Map<String,Object> searchHotLineDetail(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("searchHotLineDetail", param);
		
		return resultMap;
		
	}
	
	/**
	 * 1:1 문의 게시판 문의하기
	 *
	 * @author : 
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 15
	 * @Method Name : addHotLine
	 */
	public Map<String,Object> addHotLine(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("addHotLine", param);
		
		return resultMap;
		
	}
	
	/**
	 * 1:1 문의 게시판 문의하기
	 *
	 * @author : 
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 17
	 * @Method Name : deleteHotLine
	 */
	public Map<String,Object> deleteHotLine(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("deleteHotLine", param);
		
		return resultMap;
		
	}
	
	/**
	 * 서비스 이용 현황 / 서비스 이용 상세 내역 
	 *
	 * @author : 
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 18
	 * @Method Name : getServiceUseListDetail
	 */
	public Map<String,Object> getServiceUseListDetail(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("getServiceUseListDetail", param);
		
		return resultMap;
		
	}
	
	/**
	 * 서비스 이용 현황 / 서비스 이용 상세 내역 구독료 납부 현황
	 *
	 * @author : 
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 18
	 * @Method Name : getServiceUseListDetailPayList
	 */
	public Map<String,Object> getServiceUseListDetailPayList(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("getServiceUseListDetailPayList", param);
		
		return resultMap;
	}
	
	/**
	 * 서비스 변경 신청
	 *
	 * @author : 
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 18
	 * @Method Name : serviceUseChange
	 */
	public Map<String,Object> serviceUseChange(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		param.put("usr_id", userInfo.get("usr_id"));
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("serviceUseChange", param);
		
		return resultMap;
	}
	
	/**
	 * 서비스 이용 승인( 신청-> 승인 -> 개시대기 -> 구독 -> 변경 )
	 *
	 * @author : 
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 18
	 * @Method Name : serviceUseApprove
	 */
	public Map<String,Object> serviceUseApproveProcess(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("serviceUseApproveProcess", param);
		
		return resultMap;
	}
	
	/**
	 * 서비스 신청 관리 : 조회
	 *
	 * @author : 
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 18
	 * @Method Name : getServiceAprList
	 */
	public Map<String,Object> getServiceAprList(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("getServiceAprList", param);
		
		return resultMap;
	}
	
	/**
	 * 서비스 신청 관리 : 신청 상세
	 *
	 * @author : 
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 18
	 * @Method Name : getServiceAprListDetail
	 */
	public Map<String,Object> getServiceAprListDetail(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("getServiceAprListDetail", param);
		
		return resultMap;
	}
	
	/**
	 * 서비스별 상세조회_장비
	 *
	 * @author : hjh
	 * @param 
	 * @return 
	 * @Date : 2022. 03. 23
	 * @Method Name : getServiceAprListDvcDetail
	 */
	public Map<String,Object> getServiceAprListDvcDetail(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("getServiceAprListDvcDetail", param);
		
		return resultMap;
	}
		
	/**
	 * 서비스 신청 관리 : 변경 신청 상세
	 *
	 * @author : 
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 18
	 * @Method Name : getServiceChgAprListDetail
	 */
	public Map<String,Object> getServiceChgAprListDetail(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}

		resultMap = restfulUtilServiceToCorners.callCornersApi("getServiceChgAprListDetail", param);
		
		return resultMap;
	}
	
	/**
	 * 서비스 신청 관리 : 신청 승인 처리
	 *
	 * @author : 
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 24
	 * @Method Name : serviceAplAprProcess
	 */
	public Map<String,Object> serviceAplAprProcess(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		param.put("usr_id", userInfo.get("usr_id"));
		param.put("usr_nm", userInfo.get("usr_nm"));

		resultMap = restfulUtilServiceToCorners.callCornersApi("serviceAplAprProcess", param);
		
		return resultMap;
	}
	
	/**
	 * 그룹관리자 서비스 이용 현황 : 조회
	 *
	 * @author : hjh
	 * @param 
	 * @return 
	 * @Date : 2022. 03. 24
	 * @Method Name : grpAdmServiceUseList
	 */
	public Map<String,Object> grpAdmServiceUseList(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		param.put("usr_id", userInfo.get("usr_id"));
		param.put("usr_nm", userInfo.get("usr_nm"));

		resultMap = restfulUtilServiceToCorners.callCornersApi("grpAdmServiceUseList", param);
		
		return resultMap;
	}
	
	/**
	 * 구독료 납부 관리 : 구독료 관리 목록 조회
	 *
	 * @author : hjh
	 * @param 
	 * @return 
	 * @Date : 2022. 03. 24
	 * @Method Name : serviceSstList
	 */
	public Map<String,Object> serviceSstList(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		param.put("usr_id", userInfo.get("usr_id"));
		param.put("usr_nm", userInfo.get("usr_nm"));

		resultMap = restfulUtilServiceToCorners.callCornersApi("serviceSstList", param);
		
		return resultMap;
	}
	
	/**
	 * 구독료 납부 관리 : 구독료 관리 목록 상세 조회
	 *
	 * @author : hjh
	 * @param 
	 * @return 
	 * @Date : 2022. 03. 24
	 * @Method Name : serviceSstListDetail
	 */
	public Map<String,Object> serviceSstListDetail(Map param) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> userInfo = Auth.getCurrentUserInfo();
		
		if (userInfo.get("access_level").equals("system")) {
			param.put("user_company_id", "" );
		}else {
			param.put("user_company_id", userInfo.get("user_company_id"));
		}
		param.put("usr_id", userInfo.get("usr_id"));
		param.put("usr_nm", userInfo.get("usr_nm"));

		resultMap = restfulUtilServiceToCorners.callCornersApi("serviceSstListDetail", param);
		
		return resultMap;
	}
	
}
