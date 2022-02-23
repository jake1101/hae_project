package smartsuite.app.bp.admin.org;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.common.shared.Const;

/**
 * 운영단위 관련 처리하는 서비스 Class입니다.
 *
 * @author JongKyu Kim
 * @see
 * @FileName OperUnitService.java
 * @package smartsuite.app.bp.admin.org
 * @Since 2016. 2. 2
 * @변경이력 : [2016. 2. 2] JongKyu Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class OperUnitService {

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	@Inject
	private OperOrgService operOrgService;

	/** The NAMESPACE. */
	private static final String NAMESPACE = "operUnit.";

	/**
	 * 운영단위를 등록한다.
	 *
	 * - 운영단위코드는 Unique : getCountOperUnitByOperUnitCd 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : insertOperUnit
	 */
	public void insertOperUnit(Map<String, Object> param) {
		sqlSession.insert(NAMESPACE + "insertOperUnit", param);
	}

	/**
	 * 운영단위를 삭제한다.
	 *
	 * - 물리적 삭제
	 *
	 * - 운영조직에서 사용중인 운영단위는 삭제 불가 : getCountOperOrgByOperUnitCd 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteOperUnit
	 */
	public void deleteOperUnit(Map<String, Object> param) {
		sqlSession.delete(NAMESPACE + "deleteOperUnit", param);
	}

	/**
	 * 운영단위를 수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : updateOperUnit
	 */
	public void updateOperUnit(Map<String, Object> param) {
		sqlSession.update(NAMESPACE + "updateOperUnit", param);
	}

	/**
	 * 운영단위 목록을 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list oper unit
	 * @Date : 2016. 2. 2
	 * @Method Name : findListOperUnit
	 */
	public List<Map<String, Object>> findListOperUnit(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListOperUnit", param);
	}
	
	/**
	 * 운영단위 목록을 조회한다.(코드성 조회)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list oper unit
	 * @Date : 2016. 2. 2
	 * @Method Name : findListOperUnit
	 */
	public List<Map<String, Object>> findListOperUnitCode(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListOperUnitCode", param);
	}
	
	

	/**
	 * 운영단위를 카운트한다.(by operUnitCd - 운영단위코드)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count OperUnit (By operUnitCd)
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountOperUnitByOperUnitCd
	 */
	public int getCountOperUnitByOperUnitCd(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "getCountOperUnitByOperUnitCd", param);
	}

	/**
	 * 운영단위 목록을 등록/수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"insertOperUnits", "updateOperUnits"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListOperUnit
	 */
	public Map<String, Object> saveListOperUnit(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> inserts = (List<Map<String, Object>>)param.get("insertOperUnits");
		List<Map<String, Object>> updates = (List<Map<String, Object>>)param.get("updateOperUnits");

		if (inserts != null && !inserts.isEmpty()) {
			boolean exist = false;
			for (Map<String, Object> row : inserts) {
				if (this.getCountOperUnitByOperUnitCd(row) > 0) { // 운영단위코드 중복 체크
					exist = true;
					break;
				}
			}
			if (exist) {
				resultMap.put(Const.RESULT_STATUS, Const.DUPLICATED); // 중복
				return resultMap;
			}

			for (Map<String, Object> row : inserts) {
				this.insertOperUnit(row);
			}
		}
		if (updates != null && !updates.isEmpty()) {
			for (Map<String, Object> row : updates) {
				this.updateOperUnit(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * 운영단위 목록을 삭제한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"deleteOperUnits"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteListOperUnit
	 */
	public Map<String, Object> deleteListOperUnit(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteOperUnits");

		if (deletes != null && !deletes.isEmpty()) {
			boolean used = false;
			for (Map<String, Object> row : deletes) {
				if (operOrgService.getCountOperOrgByOperUnitCd(row) > 0) { // 운영조직에서 사용중인 운영단위인지 검사
					used = true;
					break;
				}
			}
			if (used) {
				resultMap.put(Const.RESULT_STATUS, Const.USED); // 사용중
				return resultMap;
			}

			for (Map<String, Object> row : deletes) {
				this.deleteOperUnit(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

}
