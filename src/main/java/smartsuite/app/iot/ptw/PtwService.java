package smartsuite.app.iot.ptw;

import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class PtwService {
	
	/** The sql session. */
	@Inject
	private SqlSession sqlSession;
	
	
	/**
	 * 안전조치 요구사항 내용을 조회한다.
	 *
	 * @author : jhbaek
	 * @param param the param
	 * @return the map
	 * @Date : 2020. 10. 13
	 * @Method Name : findPtwContents
	 */
	public Map findPtwContents(Map<String, Object> param) {
		return sqlSession.selectOne("ptw.findPtwContents", param);
	}
}
