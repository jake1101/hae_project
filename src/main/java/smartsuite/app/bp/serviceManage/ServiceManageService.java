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

import smartsuite.app.bp.admin.job.JobService;
import smartsuite.app.bp.admin.org.OperOrgService;
import smartsuite.app.common.mail.CommonMailService;
import smartsuite.app.common.restful.RestfulUtilService;
import smartsuite.app.common.restful.RestfulUtilServiceToCorners;
import smartsuite.app.common.shared.Const;
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
	*/
	public List<Map<String,Object>> findRegSafetyServiceList(Map searchParam) {
		
		List<Map<String, Object>> resultMap = new ArrayList<Map<String, Object>>();
		//Map userInfo = Auth.getCurrentUserInfo();
		Map<String, Object> gridResultMap = new HashMap<String, Object>();
		
		gridResultMap = restfulUtilServiceToCorners.callCornersApi("findRegSafetyServiceList", searchParam);
		
		resultMap = (List<Map<String, Object>>) gridResultMap.get("result_data");
		
		return resultMap;
		
	}
	
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
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("getDevicesByCatalogId", param);
		
		return resultMap;
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
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("estimateMonthlyFee", param);
		
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
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("getServiceUseList", param);
		
		return resultMap;
	}
	
	/**
	 * C-서비스 이용 현황 - 서비스 삭제
	 *
	 * @author : 
	 * @param 
	 * @return 
	 * @Date : 2022. 3. 15
	 * @Method Name : updateServiceUseYn
	 */
	public Map<String,Object> delteApplyService(Map param) {
		
//		List<Map<String, Object>> resultMap = new ArrayList<Map<String, Object>>();
		//Map userInfo = Auth.getCurrentUserInfo();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap = restfulUtilServiceToCorners.callCornersApi("delteApplyService", param);
		
		return resultMap;
		
	}
	
}
