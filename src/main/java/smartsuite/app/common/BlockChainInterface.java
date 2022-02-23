package smartsuite.app.common;

import java.util.Map;

public interface BlockChainInterface {

	public Map<String, Object> findCertificate(String vd_cd);

	public Map<String, Object> genKey(Map param);
}
