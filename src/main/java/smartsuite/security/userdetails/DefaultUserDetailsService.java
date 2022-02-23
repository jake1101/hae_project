package smartsuite.security.userdetails;

import java.util.Collection;
import java.util.Date;
import java.util.Map;

import javax.inject.Inject;
import org.springframework.transaction.annotation.Transactional;

import org.apache.ibatis.session.SqlSession;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import smartsuite.app.bp.admin.account.AccountService;

@Transactional
@Service("defaultUserDetailsService")
public class DefaultUserDetailsService implements UserDetailsService {

	@Inject
	SqlSession sqlSession;
	
	@Inject
	AccountService accountService;
	
	String accountEnabledName = "use_yn";
	
	String accountNonLockedName = "acc_lock_yn";
	
	//smartsuite9.x 에서 계정의 expired 는 사용하지 않음
	String accountNonExpiredName = "acc_expire_yn";
	
	String accountCredentialsNonExpiredName = "pw_mod_dt";
	
	String accountCredentialsNonInitializedName = "pw_mod_require_yn";
	
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		
		User user = sqlSession.selectOne("infra-UserDetails.getUserDetails", username);
		if (user == null) {
			throw new UsernameNotFoundException(username + " id does not exist.");
		}
		//사용자 정보 조회
		Map<String,Object> userInfo = sqlSession.selectOne("infra-UserDetails.getSessionUserInfo", username);
		user.setUserInfo(userInfo);
		//사용자 롤 조회
		Collection<GrantedAuthority> authorities = sqlSession.selectList("infra-UserDetails.getSessionUserAuthorities", userInfo);
		user.setAuthorities(authorities);
		
		//사용여부
		user.setEnabled("Y".equals(userInfo.get(accountEnabledName)));
		//잠김여부
		user.setAccountNonLocked("N".equals(userInfo.get(accountNonLockedName)));
		//비밀번호 만료여부
		user.setCredentialsNonExpired(accountService.isCredentialsNonExpired((Date)userInfo.get(accountCredentialsNonExpiredName)));
		//비밀번호 초기화 여부
		user.setCredentialsNonInitialized("N".equals(userInfo.get(accountCredentialsNonInitializedName)));
		
		return new UserDetailsProxy(user);
	}
	
}