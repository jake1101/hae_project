package smartsuite.mybatis;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import org.springframework.context.i18n.LocaleContextHolder;

import com.google.common.base.Strings;

import smartsuite.mybatis.plugin.parameter.ParameterInjector;
import smartsuite.security.authentication.Auth;

public class DefaultParameterInjector implements ParameterInjector {
	
	private static long ONE_DAY_MILLISECOND = 1000 * 60 * 60 * 24;
	
	private static char ESCAPE_CHARACTER = '\\';
	
	@Override
	public String getName() {
		return "g";
	}

	@Override
	public Object getValue() {
		return new g(getUsername(), getLocale(), getTenant(), getCompcd(), getDeptcd(), getUsercls(), getVdsn(), getVdcd(), getRoles());
	}

	protected String getUsername() {
		return Auth.getCurrentUserName();
	}
	
	protected String getCompcd() {
		if(Auth.getCurrentUserInfo() == null)
			return null;
		else
			return (String)Auth.getCurrentUserInfo().get("comp_cd");
	}
	
	protected String getDeptcd() {
		if(Auth.getCurrentUserInfo() == null)		
			return null;
		else
			return (String)Auth.getCurrentUserInfo().get("dept_cd");
	}
	
	protected String getUsercls() {
		if(Auth.getCurrentUserInfo() == null)
			return null;
		else 
			return (String)Auth.getCurrentUserInfo().get("usr_cls");
	}
	
	protected String getVdsn() {
		if(Auth.getCurrentUserInfo() == null)		
			return null;
		else 
			return String.valueOf(Auth.getCurrentUserInfo().get("vd_sn"));
	}				

	protected String getVdcd(){
		if(Auth.getCurrentUserInfo() == null)		
			return null;
		else 
			return String.valueOf(Auth.getCurrentUserInfo().get("vd_cd"));
	}
	protected Locale getLocale() {
		Locale targetLocale = LocaleContextHolder.getLocale();
		if(targetLocale == null)
			targetLocale = new Locale("ko","KR");
		
		return targetLocale;
	}
	
	protected String getTenant() {
		return Auth.getCurrentTenantId();
	}
	
	protected List<String> getRoles() {
		return Auth.getCurrentUserAuthorities();
	}
	
	@SuppressWarnings("unused")
	private class g {

		String username;
		
		Locale locale;

		String tenant;
		
		String comp_cd;		
		
		String dept_cd;		
		
		String usr_cls;		
		
		String vd_sn;		
		
		String vd_cd;
		
		List<String> roles;
		
		public g(String username, Locale locale, String tenant, String compcd, String deptcd, String usercls, String vdsn, String vdcd, List<String> roles) {
			this.username = username;
			this.locale = locale;
			this.tenant = tenant;
			this.comp_cd = compcd;
			this.dept_cd = deptcd;
			this.usr_cls = usercls;
			this.vd_sn = vdsn;
			this.vd_cd = vdcd;
			this.roles = roles;
		}

		public String getUsername() {
			return username;
		}

		public String getTenant() {
			return tenant;
		}

		public String getComp_cd() {
			return comp_cd;
		}

		public String getDept_cd() {
			return dept_cd;
		}

		public String getUsr_cls() {
			return usr_cls;
		}

		public String getVd_sn() {
			return vd_sn;
		}

		public String getVd_cd() {
			return vd_cd;
		}
		
		public List<String> getRoles() {
			return this.roles;
		}

		public String getLocale(){
			return locale.getLanguage() + "_" + locale.getCountry();
		}

		public Date getNow() {
			return new Date();
		}
		
		public Date getDateWithNoTime(Date date) {
			SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
			String dt = formatter.format(date);
			Calendar cal = Calendar.getInstance();
			
			try {
				cal.setTime(formatter.parse(dt));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			return cal.getTime();
		}
		
		public String getUuid(){
			return UUID.randomUUID().toString();
		}
		
		public Date getPlusDays(Date date, int days){
			return new Date(date.getTime() + (ONE_DAY_MILLISECOND * days));
		}
		
		public Date increaseDate(Date date, String type, Integer increase) {
			if(!Strings.isNullOrEmpty(type)) type = type.toUpperCase();
			if(increase == null) increase = 1;
			
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			
			if("Y".equals(type)) {
				cal.add(Calendar.YEAR, increase);
			} else if("M".equals(type)) {
				cal.add(Calendar.MONTH, increase);
			} else if("D".equals(type)) {
				cal.add(Calendar.DATE, increase);
			}
			return cal.getTime();
		}
		
		public String escape(String value){
			String escaped = value.replace("%", ESCAPE_CHARACTER + "%");
			escaped = escaped.replace("_", ESCAPE_CHARACTER + "_");
			return value;
		}
		
		public String trim(String value){
			String trimVal = value;
				if(value !=null){
					trimVal = value.trim();
				}
			return trimVal;
		}
		
		public String getFormatNow(Date date,String format){
			SimpleDateFormat sd = new SimpleDateFormat(Strings.isNullOrEmpty(format) ? "yyyyMMdd" : format);
			return sd.format(date);
		}
		
		public boolean contains(List<?> list, Object val) {
			return list.contains(val);
		}
		
		public boolean contains(String str, String val) {
			return str.contains(val);
		}
		
		public String[] split(String str, String regex) {
			return str.split(regex);
		}
	}

}
