package smartsuite.app.bp.admin.auth;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.common.shared.Const;

/**
 * 롤기능 관련 처리하는 서비스 Class입니다.
 *
 * @author JongKyu Kim
 * @see
 * @FileName RoleFuncService.java
 * @package smartsuite.app.bp.admin.auth
 * @Since 2016. 2. 2
 * @변경이력 : [2016. 2. 2] JongKyu Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class RoleFuncService {

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	/**
	 * 롤기능을 등록한다.
	 *
	 * - 롤기능코드는 Unique : getCountRoleFunc 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : insertRoleFunc
	 */
	public void insertRoleFunc(Map<String, Object> param) {
		sqlSession.insert("roleFunc.insertRoleFunc", param);
	}

	/**
	 * 롤기능을 삭제한다.
	 *
	 * - 물리적 삭제
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteRoleFunc
	 */
	public void deleteRoleFunc(Map<String, Object> param) {
		sqlSession.delete("roleFunc.deleteRoleFunc", param);
	}

	/**
	 * 롤기능을 카운트한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count RoleFunc
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountRoleFunc
	 */
	public int getCountRoleFunc(Map<String, Object> param) {
		return sqlSession.selectOne("roleFunc.getCountRoleFunc", param);
	}

	/**
	 * 롤기능 목록을 등록/삭제한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"insertRoleFuncs", "deleteRoleFuncs"}
	 * @return the map<string, object>
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListRoleFunc
	 */
	public Map<String, Object> saveListRoleFunc(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> inserts = (List<Map<String, Object>>)param.get("insertRoleFuncs");
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteRoleFuncs");

		if (inserts != null && !inserts.isEmpty()) {
//			boolean exist = false;
			for (Map<String, Object> row : inserts) {
				if (this.getCountRoleFunc(row) > 0) { // 롤기능 중복 체크
//					exist = true;
//					break;
				}else {
					this.insertRoleFunc(row);
				}
			}
//			if (exist) {
//				resultMap.put(Const.RESULT_STATUS, Const.FAIL); // 중복
//				return resultMap;
//			}
//
//			for (Map<String, Object> row : inserts) {
//				this.insertRoleFunc(row);
//			}
		}
		if (deletes != null && !deletes.isEmpty()) {
			for (Map<String, Object> row : deletes) {
				this.deleteRoleFunc(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
}
