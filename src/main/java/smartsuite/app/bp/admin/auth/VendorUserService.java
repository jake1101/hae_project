package smartsuite.app.bp.admin.auth;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.bp.admin.account.AccountService;
import smartsuite.app.common.shared.Const;

/**
 * 협력사 사용자 관련 처리하는 서비스 Class입니다.
 *
 * @author JuEung Kim
 * @see 
 * @FileName VendorUserService.java
 * @package smartsuite.app.bp.admin.auth
 * @Since 2016. 11. 2
 * @변경이력 : [2016. 11. 2] JuEung Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" , "rawtypes"})
public class VendorUserService {
	
	/** The sql session. */
	@Inject
	private SqlSession sqlSession;
	
	@Inject
	AccountService accountService;
	
	/**
	 * 협력사 사용자 목록을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 11. 2
	 * @Method Name : findListVendorUser
	 */
	public List<Map<String,Object>> findListVendorUser(Map param) {		
		return sqlSession.selectList("vendorUser.findListVendorUser", param);
	}
	
	/**
	 * 협력사 사용자 정보를 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 11. 2
	 * @Method Name : findInfoVendorUser
	 */
	public Map findInfoVendorUser(Map param) {
		Map result = sqlSession.selectOne("vendorUser.findInfoVendorUser", param);
		if(result != null && result.get("pw_mod_dt") != null && !"".equals(result.get("pw_mod_dt")) ){
			Date modDate = (Date)result.get("pw_mod_dt");
			if(!accountService.isCredentialsNonExpired(modDate)) {
				result.put("pw_expired_yn", "Y");
			}
		}
		return result;
	}
	
	/**
	 * 계정 잠김해제를 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 11. 2
	 * @Method Name : saveInfoAccLockYn
	 */
	public Map saveInfoAccLockYn(Map param) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		sqlSession.update("vendorUser.saveInfoAccLockYn", param);
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}	
	
}
