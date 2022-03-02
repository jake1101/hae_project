package smartsuite.app.bp.admin.validator;

import java.util.Map;

public interface Validator {
	
	public Map<String, Object> validate(Map<String, Object> param);
	
}