package smartsuite.app.bp.admin.account.spring;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsChecker;

public class DefaultPreAuthenticationChecks implements UserDetailsChecker {

	static final Logger LOG = LoggerFactory.getLogger(DefaultPreAuthenticationChecks.class);
	@Inject
	MessageSource messageSource;

	@Override
	public void check(UserDetails user) {
		if (!user.isAccountNonLocked()) {
            LOG.debug("User account is locked");
            throw new LockedException(messageSource.getMessage("STD.SEC1001", null, "계정이 잠겨 있습니다. 관리자에게 문의하시기 바랍니다.", LocaleContextHolder.getLocale()));
		}
        if (!user.isEnabled()) {
        	LOG.debug("User account is disabled");
            throw new DisabledException(messageSource.getMessage("STD.SEC1002", null, "계정이 사용정지 되었습니다. 관리자에게 문의하시기 바랍니다.", LocaleContextHolder.getLocale()));
        }
        if (!user.isAccountNonExpired()) {
        	LOG.debug("User account is expired");
            throw new AccountExpiredException(messageSource.getMessage("STD.SEC1003", null, "사용자 계정이 만료되었습니다. 관리자에게 문의하시기 바랍니다.", LocaleContextHolder.getLocale()));
        }
	}

}
