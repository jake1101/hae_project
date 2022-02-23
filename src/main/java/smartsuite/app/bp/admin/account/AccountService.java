package smartsuite.app.bp.admin.account;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.scheduler.core.ScheduleService;

@Service
@Transactional
public class AccountService  {
	
	@Inject
	SqlSession sqlSession;
	
	static final String NAMESPACE = "account.";

	AccountSettings accountSettings;
	
	private List<String> allowIps;
	
	@Inject
	ScheduleService scheduleService;
	
	public List<String> getAllowIps() {
		return allowIps;
	}

	public void setAllowIps(List<String> allowIps) {
		this.allowIps = allowIps;
	}
	
	public AccountSettings getAccountSettings() {
		return accountSettings;
	}

	public void setAccountSettings(AccountSettings accountSettings) {
		this.accountSettings = accountSettings;
	}
	
	public AccountSettings load() {
		return sqlSession.selectOne(NAMESPACE + "load");
	}
	
	public void update(AccountSettings accountSettings) {
		sqlSession.update(NAMESPACE + "update", accountSettings);
	}
	
	public AccountSettings create() {
		AccountSettings defaultAccountSettings = new AccountSettings();
		sqlSession.insert(NAMESPACE + "create", defaultAccountSettings);
		return defaultAccountSettings;
	}

	public void registAccountDisableSchedule() {
		scheduleService.removeSchedule("accountDisable", "account");
		try {
			scheduleService.registSchedule(
				Class.forName(this.getClass().getName()),
				"accountDisable", 
				null, 
				accountSettings.getAccountDisableForSpecifiedDate(), 
				"account", 
				"accountDisable", 
				"accountDisable");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void accountDisable() {
		sqlSession.update(NAMESPACE + "accountDisable", accountSettings.getAccountDisableByLastLoginDate());
	}

	public List<Map<String,String>> ipAddressLoad() {
		return sqlSession.selectList(NAMESPACE + "ipAddressLoad");
	}

	public void ipAddressSave(List<Map<String, String>> newItems) {
		for(Map<String,String> item : newItems) {
			sqlSession.insert(NAMESPACE + "ipAddressSave", item);
		}
	}

	public void ipAddressDelete(List<Map<String, String>> deleteItems) {
		for(Map<String,String> item : deleteItems) {
			sqlSession.delete(NAMESPACE + "ipAddressDelete", item);
		}
	}
	
	public boolean isCredentialsNonExpired(Date lastModifyDate) {
		int passwordExpiredPeriod = accountSettings.getPasswordExpiredPeriod();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.add(Calendar.MONTH, -passwordExpiredPeriod);
		return lastModifyDate.after(calendar.getTime());
	}
	
}
