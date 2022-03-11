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
				
		try {
			resultMap = restfulUtilServiceToCorners.callCornersApi("searchAllSvcGrpList", param);
			//apiToResultMap.put(Const.RESULT_DATA, resultMap.get("body"));
			//apiToResultMap.remove("body");
			
			//returnlistMap.add(apiToResultMap);
			
		}catch (Exception e) {
			LOG.info( "regSafetyServiceGroupList : " + e.getMessage() );
		}
		
//		return returnlistMap;
		
		return resultMap;
	}
	
	/**
	 * 등록 서비스 리스트
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 2. 24
	 * @Method Name : findRegSafetyServiceList
	 
	public List<Map<String,Object>> findRegSafetyServiceList(Map searchParam) {
		
		//Map userInfo = Auth.getCurrentUserInfo();

		return sqlSession.selectList("serviceManageApi.findRegSafetyServiceList", searchParam);
		
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
	public List<Map<String,Object>> findRegSafetyServiceList(Map searchParam) {
		
		List<Map<String, Object>> resultMap = new ArrayList<Map<String, Object>>();
		//Map userInfo = Auth.getCurrentUserInfo();
		Map<String, Object> gridResultMap = new HashMap<String, Object>();
		
		try {
			gridResultMap = restfulUtilServiceToCorners.callCornersApi("findRegSafetyServiceList", searchParam);
			resultMap = (List<Map<String, Object>>) gridResultMap.get("result_data");
			
		}catch (Exception e) {
			LOG.info( "findRegSafetyServiceList log : " + e.getMessage() );
		}
		
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
		
		try {
			resultMap = restfulUtilServiceToCorners.callCornersApi("updateServiceUseYn", param);
			
		}catch (Exception e) {
			LOG.info( "updateServiceUseYn log : " + e.getMessage() );
		}
		
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

		sqlSession.insert("serviceManageApi.applyService", param);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
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
		
		try {
			resultMap = restfulUtilServiceToCorners.callCornersApi("getDevicesByCatalogId", param);
			
		}catch (Exception e) {
			LOG.info( "updateServiceUseYn log : " + e.getMessage() );
		}
		
		return resultMap;
	}

	/**
	 * 서비스카타로그별 디바이스 목록 조회
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 2. 24
	 * @Method Name : 
	 
	public Map getDevicesByCatalogId(Map<String,Object> param) {
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		List list =  sqlSession.selectList("serviceManageApi.getDevicesByCatalogId", param);
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		resultMap.put(Const.RESULT_DATA, list);
		
		return resultMap;
	}
	*/
	
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

		try {
			resultMap = restfulUtilServiceToCorners.callCornersApi("getWPCList", param);
			
		}catch (Exception e) {
			LOG.info( "updateServiceUseYn log : " + e.getMessage() );
		}
		
		return resultMap;
	}
	
	
	/**
	 * 예상월구독룍조회
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 2. 24
	 * @Method Name : 
	 */
	public Map estimateMonthlyFee(Map<String,Object> param) {
		
		
		int estimatedMonthlyFee = 0;
		
		ArrayList devices = (ArrayList)param.get("dvc_list");
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String,Object>> list =  sqlSession.selectList("serviceManageApi.getDeviceMonthlyFee", param);
		
		if (list != null && !list.isEmpty()) {
			
			for (int i = 0; i < devices.size(); i++) {
				
				HashMap<String, Object> device = (HashMap<String, Object>)devices.get(i);
				
				for (Map<String, Object> row : list) {
					
					if((Integer)device.get("dvc_id") == ((Long)row.get("dvc_id")).intValue()) {
						
						estimatedMonthlyFee += (Integer)device.get("qtt") * (Integer)row.get("mon_fee") * (Integer)param.get("sst_trm");
						break;
					}
				}
			}
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		resultMap.put(Const.RESULT_DATA, estimatedMonthlyFee);
		
		return resultMap;
	}	
	
	/**
	 * 메일을 전송한다. 
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @Date : 2016. 8. 16
	 * @Method Name : mailSend
	 */
	private void mailSend(Map user) {
		Map<String, Object> mailParam = new HashMap<String, Object>();
		Map<String, Object> data = new HashMap<String, Object>();

		//필수 데이터 
		data.put("pw"	 	, user.get("tempPw"));
		data.put("usr_nm"	, user.get("usr_nm"));
		data.put("url"		, spUrl); 
		
		mailParam.put("to_addr"	, user.get("email"));
		mailParam.put("to_nm"	, user.get("usr_nm"));
		mailParam.put("data"	, data);
		
		commonMailService.addMail("INIT_PW_ML", mailParam);
	}
	
	/**
	 * 비밀번호 주기를 오늘날짜로 초기화
	 *
	 * @author : JongHoon Baek
	 * @param param the param
	 * @Date : 2020. 7. 20
	 * @Method Name : initPwTerm
	 */
	public Map initPwTerm(Map<String,Object> param) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		sqlSession.update("user.initPwTerm", param);
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
}
