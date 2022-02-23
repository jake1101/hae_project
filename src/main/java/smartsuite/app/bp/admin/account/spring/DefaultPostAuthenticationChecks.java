package smartsuite.app.bp.admin.account.spring;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsChecker;

import smartsuite.app.bp.admin.account.AccountService;

public class DefaultPostAuthenticationChecks implements UserDetailsChecker {
	
	static final Logger LOG = LoggerFactory.getLogger(DefaultPostAuthenticationChecks.class);
	
	@Inject
	AccountService accountService;
	
	@Inject
	MessageSource messageSource;
	
	@Override
	public void check(UserDetails user) {
		//패스워드 만료시 로그인 실패가 아닌 로그인 후 변경하도록 유도함
		if(!user.isCredentialsNonExpired() && accountService.getAccountSettings().isAccountPasswordExpiredThrowException()) {
			LOG.debug("User account credentials have expired");
			Object [] args = new Object []{
				user.getUsername(),
				accountService.getAccountSettings().getPasswordExpiredPeriod()	
			}; 
			throw new CredentialsExpiredException(messageSource.getMessage("STD.SEC1004", args, "{0}님은 {1}개월동안 비밀번호를 변경하지 않았습니다. 비밀번호를 변경해 주시길 바랍니다.", LocaleContextHolder.getLocale()));
		}
	}

}
