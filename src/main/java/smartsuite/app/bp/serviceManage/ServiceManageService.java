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
	
	/**
	 * 서비스 그룹 리스트
	 *
	 * @author : 
	 * @param param the param
	 * @Date : 2022. 2. 24
	 * @Method Name : 
	 */
	public Map regSafetyServiceGroupList(Map<String,Object> param) {
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		sqlSession.selectList("serviceManageApi.regSafetyServiceGroupList", param);
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		
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
		
		//Map userInfo = Auth.getCurrentUserInfo();
				
		return sqlSession.selectList("serviceManageApi.findRegSafetyServiceList", searchParam);
		
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
