package smartsuite.app.bp.admin.auth;

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
 * User 관련 처리하는 서비스 Class입니다.
 *
 * @author Yeon-u Kim
 * @see 
 * @FileName UserService.java
 * @package smartsuite.app.bp.admin.auth
 * @Since 2016. 2. 3
 * @변경이력 : [2016. 2. 3] Yeon-u Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" , "rawtypes"})
public class UserService {
	
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
	 * user list의 값을 반환한다.
	 *
	 * @author : Yeon-u Kim
	 * @param searchParam the search param
	 * @return user list
	 * @Date : 2016. 2. 4
	 * @Method Name : findListUser
	 */
	public List<Map<String,Object>> findListUser(Map searchParam) {
		// RAYCOM 추가 : 세션 정보
		Map userInfo = Auth.getCurrentUserInfo();
		
		if("system".equals(userInfo.get("access_level")) ){
			return sqlSession.selectList("user.findListUser", searchParam);
		}else {
			searchParam.put("access_level", userInfo.get("access_level") );
			searchParam.put("user_company_id", userInfo.get("user_company_id") );
			return sqlSession.selectList("user.findListUserByLevel", searchParam);
		}
	}

	/**
	 * user info의 값을 반환한다.
	 *
	 * @author : Yeon-u Kim
	 * @param searchParam the search param
	 * @return user info
	 * @Date : 2016. 2. 4
	 * @Method Name : findUserInfo
	 */
	public Map<String,Object> findUserByUserId(Map searchParam) {
		return sqlSession.selectOne("user.findUserByUserId", searchParam);
	}

	/**
	 * user list 삭제한다.
	 *
	 * @author : Yeon-u Kim
	 * @param userIds the user ids
	 * @Date : 2016. 2. 3
	 * @Method Name : deleteUserList
	 */
	public Map<String,Object> deleteListUser(Map<String,Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteUsers");
		
		// RAYCOM 추가 : 작업허가 승인자 존재여부 체크
		for (Map<String, Object> row : deletes) {
			List<Map> ptwApprList = sqlSession.selectList("user.ptwApprList", row);
			
			if(ptwApprList.size() > 0) {
				resultMap.put(Const.RESULT_STATUS, Const.FAIL);
				resultMap.put(Const.RESULT_MSG, "아이디 '" + row.get("usr_id") + "'은(는) 작업허가 승인자로 지정되어 있어서 삭제가 불가합니다.");
				return resultMap;
			}
		}
		
		// 사용자 권한 삭제
		for (Map<String, Object> row : deletes) {
			this.deleteUserRoleByUserId(row);
		}
		
		// 사용자 운영조직 삭제
		for (Map<String, Object> row : deletes) {
			operOrgService.deleteOperOrgByUsrId(row);
		}
		
		// 사용자 직무담당자 삭제
		for (Map<String, Object> row : deletes) {
			jobService.deleteListJobByUsrId(row);
		}
		
		// 사용자 삭제
		for (Map<String, Object> row : deletes) {
			this.deleteUser(row);
			
			// RAYCOM 추가 : user log
			Map<String, Object> apiParam = new HashMap<String, Object>();
			apiParam.put("id", row.get("usr_id") );
			apiParam.put("operation" , "delete" );
			
			try {
				restfulUtilService.callRaycomApi("users/upsert/log", apiParam);
				
			}catch (Exception e) {
				LOG.info( "user modify log : " + e.getMessage() );
			}
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * 사용자를 삭제 한다.
	 *
	 * @author : Yeon-u Kim
	 * @param userIds the user ids
	 * @Date : 2016. 2. 3
	 * @Method Name : deleteUserList
	 */
	public void deleteUser(Map<String, Object> user) {
		sqlSession.delete("user.deleteUser",user);
	}	

	/**
	 * user 저장한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the int
	 * @Date : 2016. 2. 3
	 * @Method Name : saveUser
	 */
	public Map saveUser(Map<String,Object> param) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		Boolean isNew = false;
		if(param.get("isNew") != null){
			isNew = (Boolean)param.get("isNew");
		}
		int userCount = this.getUserCount(param);
		String operation = "";
		// 신규 등록인데 이미 사용자 아이디가 있는 경우
		if(isNew && userCount > 0) {
			// 중복 오류
			resultMap.put(Const.RESULT_STATUS, Const.DUPLICATED); // 중복
			return resultMap;
		}
		
		if(userCount > 0) { // 수정 (update)
			sqlSession.update("user.updateUser",param);
			
			// RAYCOM 추가 : user log
			operation = "update";
			
		}else{ // 신규 (insert)
			
			// 신규생성 시 비밀번호 발급
			// global.properties : use-default-password 가 true 일경우 default-password에 설정된 비밀번호로 발급 
			String tempPassword = useDefaultPassword ? defaultPassword : passwordGenerator.generate();
			String encryptedPassword = passwordEncryptor.encryptPw(tempPassword);
			
			param.put("tempPw", tempPassword);
			param.put("pw", encryptedPassword);
			sqlSession.insert("user.insertUser",param);
			
			// YSHONG추가. 2021-02-05
			// 기본 현장권한을 넣어주도록한다.
			sqlSession.update("user.saveDefUserSiteRole", param);
			
			// RAYCOM 추가 : user log
			operation = "create";
						
			// 메일 발송
//			addUserMailSend(param);
			// 메일 발송 : RAYCOM API
			Map<String, Object> mailParam = new HashMap<String, Object>();
			mailParam.put("subject", "사용자 생성");
			StringBuffer sb = new StringBuffer();
			sb.append("아이디 : ");
			sb.append(param.get("usr_id").toString().toUpperCase() );
			sb.append("<br/>");
			sb.append("임시비밀번호 : ");
			sb.append(tempPassword);
			sb.append("<br/>");
			mailParam.put("body", sb.toString() );
			List<String> toList = new ArrayList<String>();
			toList.add(param.get("email").toString() );
			mailParam.put("toMails", toList);
			restfulUtilService.emailRaycomApi("message/send/mail", mailParam);
		}
		
		Map<String, Object> userInfo = sqlSession.selectOne("user.findUserByUserId", param);
		userInfo.put("operation", operation);
		resultMap.put(Const.RESULT_DATA, userInfo);
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * 사용자 신규 추가 시 메일 발송
	 */
	private void addUserMailSend(Map user) {
		Map<String, Object> mailParam = new HashMap<String, Object>();
		Map<String, Object> data = new HashMap<String, Object>();

		data.put("pw"	 	, user.get("tempPw"));
		data.put("usr_id"	, user.get("usr_id"));
		data.put("usr_nm"	, user.get("usr_nm"));
		
		mailParam.put("to_addr"	, user.get("email"));
		mailParam.put("to_nm"	, user.get("usr_nm"));
		mailParam.put("data"	, data);
		
		commonMailService.addMail("NEW_USER", mailParam);
	}
	
	/**
	 * 패스워드를 변경한다.
	 *
	 * @author : choijh
	 * @param param the param
	 * @return map
	 * @Date : 2016. 11. 02
	 * @Method Name : updatePassword
	 */
	public Map updatePassword(Map<String,Object> param) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		String myPassword = Auth.getCurrentUser().getPassword();
		String currentPassword = cipherUtil.decrypt((String) param.get("currentPassword"));
		String password = cipherUtil.decrypt((String) param.get("password"));
		if(myPassword.equals(currentPassword)) {
			if(myPassword.equals(password)) {
				resultMap.put(Const.RESULT_STATUS, Const.FAIL);
				resultMap.put(Const.RESULT_MSG, "DUPLICATE_PASSWORD");
				return resultMap;
			}
		} else {
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			resultMap.put(Const.RESULT_MSG, "INVALID_CURRENT_PASSWORD");
			return resultMap;
		}
		param.put("password", password);
		sqlSession.update("user.updatePw", param);
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * user count의 값을 반환한다.
	 *
	 * @param userId the user id
	 * @return user count
	 */
	public int getUserCount(Map<String,Object> param) {
		return sqlSession.selectOne("user.getUserCount",param);
	}

	/**
	 * list user role 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 11
	 * @Method Name : findListUserRole
	 */
	public List<Map<String,Object>> findListUserRole(Map<String, Object> param) {
		return sqlSession.selectList("user.findListUserRole", param);
	}

	/**
	 * 사용자 별 롤을 한건씩 추가 또는 삭제 한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @Date : 2016. 2. 11
	 * @Method Name : saveListUserRole
	 */
	public void saveUserRole(Map<String, Object> param) {
		String granted = (String)param.get("granted");
		// 기존에 granted 가 Y 인 건은 삭제 처리, N 인 건은 신규 추가
		if("Y".equals(granted)) {
			sqlSession.delete("user.deleteUserRole",param);
		} else {
			sqlSession.insert("user.insertUserRole",param);
		}
	}
	
	public void deleteUserRoleByUserId(Map<String, Object> param){
		sqlSession.delete("user.deleteUserRoleByUserId", param);
	}

	/**
	 * 사용자별 운영조직 현황을 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 11
	 * @Method Name : findListUserOperOrg
	 */
	public List findListUserOperorg(Map param) {
		return sqlSession.selectList("user.findListUserOperorg", param);
	}
	
	public Map initPassword(Map param){
		Map<String, Object> result = new HashMap<String, Object>();
		
		// RAYCOM 추가 : 이름,email로 유저 조회
		List<Map> userList = sqlSession.selectList("user.findListUserByUserInfo", param);
		if(userList.size() == 0) {
			result.put(Const.RESULT_STATUS, Const.FAIL); 
			result.put(Const.RESULT_DATA  , Const.NOT_EXIST);
			return result;
		}
		
		StringJoiner sj = new StringJoiner(",");
		for(Map user : userList) {
			sj.add(user.get("usr_id").toString());
		}
		
		// 메일 발송 : RAYCOM API
		Map<String, Object> mailParam = new HashMap<String, Object>();
		mailParam.put("subject", "아이디 찾기");
		StringBuffer sb = new StringBuffer();
		sb.append("아이디 : ");
		sb.append(sj.toString() );
		sb.append("<br/>");
		mailParam.put("body", sb.toString() );
		List<String> toList = new ArrayList<String>();
		toList.add(param.get("email").toString() );
		mailParam.put("toMails", toList);
		restfulUtilService.emailRaycomApi("message/send/mail", mailParam);
		
		result.put(Const.RESULT_STATUS, Const.SUCCESS);
		return result;
	}
	
	/**
	 * 유저 패스워드를 초기화 후 메일을 전송한다. 
	 *
	 * @author : JongHyeok Choi
	 * @param param the param
	 * @Date : 2016. 8. 16
	 * @Method Name : saveListUserOperOrg
	 */
	public Map initPassword2(Map param){
		Map<String, Object> result = new HashMap<String, Object>(); 
		Map<String, Object> user = sqlSession.selectOne("user.findUserByUserInfo", param);
		if(user == null) {
			result.put(Const.RESULT_STATUS, Const.FAIL); 
			result.put(Const.RESULT_DATA  , Const.NOT_EXIST);
			return result;
		}
		
		//패스워드 초기화시에 이메일 수신 동의 여부는 검사하지 않음 
		/*else if("N".equals(user.get("mail_received_yn"))) {
			result.put(Const.RESULT_STATUS, Const.FAIL); 
			result.put(Const.RESULT_DATA  , Const.UNAUTHORIZED);
			
			return result;
		}*/
		
		String tempPassword = passwordGenerator.generate();
		String encryptedPassword = passwordEncryptor.encryptPw(tempPassword);
		user.put("password", encryptedPassword); 
		user.put("tempPw", tempPassword);
//			mailSend(user);
		
		// 메일 발송 : RAYCOM API
		Map<String, Object> mailParam = new HashMap<String, Object>();
		mailParam.put("subject", "비밀번호 찾기");
		StringBuffer sb = new StringBuffer();
		sb.append("아이디 : ");
		sb.append(user.get("usr_id") );
		sb.append("<br/>");
		sb.append("임시비밀번호 : ");
		sb.append(tempPassword);
		sb.append("<br/>");
		mailParam.put("body", sb.toString() );
		List<String> toList = new ArrayList<String>();
		toList.add(user.get("email").toString() );
		mailParam.put("toMails", toList);
		restfulUtilService.emailRaycomApi("message/send/mail", mailParam);
		sqlSession.update("user.initPw", user);
		
		result.put(Const.RESULT_STATUS, Const.SUCCESS);
		result.put(Const.RESULT_DATA, user.get("usr_id") );
		return result;
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
	
	public List<Map<String,Object>> findListUserSiteRole(Map<String, Object> param) {
		// 세션 정보
		Map userInfo = Auth.getCurrentUserInfo();
		
		if("system".equals(userInfo.get("access_level")) ){
			return sqlSession.selectList("user.findListUserSiteRole", param);
		}else {
			param.put("access_level", userInfo.get("access_level") );
			param.put("company_id", userInfo.get("user_company_id") );
			return sqlSession.selectList("user.findListUserSiteRoleByLevel", param);
		}
	}

	public Map saveUserSiteRole(Map<String,Object> param) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		sqlSession.update("user.saveUserSiteRole", param);
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		
		return resultMap;
	}

	// RAYCOM 추가 : user log
	public Map insertUserLog(Map<String, Object> param) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		Object operation = param.get("operation");
		
		if("create".equals(operation) || "update".equals(operation) ) {
			Map<String, Object> apiParam = new HashMap<String, Object>();
			apiParam.put("id", param.get("usr_id") );
			apiParam.put("operation" , param.get("operation") );
			
			try {
				restfulUtilService.callRaycomApi("users/upsert/log", apiParam);
				
			}catch (Exception e) {
				LOG.info( "user modify log : " + e.getMessage() );
			}
			
		}else {
			List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteUsers");
			
			for(Map item : deletes) {
				Map<String, Object> apiParam = new HashMap<String, Object>();
				apiParam.put("id", item.get("usr_id") );
				apiParam.put("operation" , operation );
				
				try {
					restfulUtilService.callRaycomApi("users/upsert/log", apiParam);
					
				}catch (Exception e) {
					LOG.info( "user modify log : " + e.getMessage() );
				}
			}
		}
		
		resultMap.put(Const.RESULT_DATA, param);
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		
		return resultMap;
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
