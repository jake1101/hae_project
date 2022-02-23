package smartsuite.app.bp.admin.account;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.beans.factory.InitializingBean;

import com.google.common.base.Function;
import com.google.common.collect.Lists;

public class AccountInitializer implements InitializingBean {
	
	@Inject
	AccountService accountService;
	
	@Override
	public void afterPropertiesSet() throws Exception {
		AccountSettings accountSettings = accountService.load();
		if(accountSettings == null) {
			accountSettings = accountService.create();
		}
		accountService.setAccountSettings(accountSettings);
		if(accountSettings.isDisableOnSpecifiedDate() && accountSettings.getAccountDisableForSpecifiedDate().after(new Date())) {
			accountService.registAccountDisableSchedule();
		}
		List<String> allowIps = Lists.transform(accountService.ipAddressLoad(), new Function<Map<String,String>, String>() {
			@Override
			public String apply(Map<String, String> input) {
				return input.get("ip_address");
			}
		});
		accountService.setAllowIps(allowIps);
	}

}
