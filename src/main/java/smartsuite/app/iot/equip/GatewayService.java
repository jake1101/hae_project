package smartsuite.app.iot.equip;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 공통으로 사용하는 서비스 관련 Class입니다.
 *
 * @author hjhwang
 * @see
 * @FileName SharedService.java
 * @package smartsuite.app.shared
 * @Since 2016. 2. 2
 * @변경이력 : [2016. 2. 2] hjhwang 최초작성
 */
@SuppressWarnings ({ "rawtypes"})
@Service
@Transactional
public class GatewayService {

	static final Logger LOG = LoggerFactory.getLogger(GatewayService.class);
	
	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	/**
	 * 공통코드와 특정 속성 list 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 5. 19
	 * @Method Name : findCommonCodeAttrCdList
	 */
	public List findListLoraGateway(Map<String, Object> param) {
		return sqlSession.selectList("gateway.findListLoraGateway", param);
	}
	
	
	
	
	
}
