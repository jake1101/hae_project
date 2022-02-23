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
 * 조직유형/조직/부서 관련 처리하는 서비스 Class입니다.
 *
 * @author JongKyu Kim
 * @see
 * @FileName OrgService.java
 * @package smartsuite.app.bg.common.org
 * @Since 2016. 2. 2
 * @변경이력 : [2016. 2. 2] JongKyu Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class OrgService {

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	@Inject
	private OperOrgService operOrgService;

	/** The NAMESPACE. */
	private static final String NAMESPACE = "org.";

	/**
	 * 조직유형을 등록한다.
	 *
	 * - 조직유형코드는 Unique : getCountOrgTypeByOrgTypeCd 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : insertOrgType
	 */
	public void insertOrgType(Map<String, Object> param) {
		sqlSession.insert(NAMESPACE + "insertOrgType", param);
	}

	/**
	 * 조직을 등록한다.
	 *
	 * - 동일한 조직유형 내에서 조직코드는 Unique : getCountOrgByOrgCd 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : insertOrg
	 */
	public void insertOrg(Map<String, Object> param) {
		sqlSession.insert(NAMESPACE + "insertOrg", param);
	}

	/**
	 * 부서를 등록한다.
	 *
	 * - 동일한 조직유형과 조직 내에서 부서코드는 Unique : getCountDeptByDeptCd 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : insertDept
	 */
	public void insertDept(Map<String, Object> param) {
		sqlSession.insert(NAMESPACE + "insertDept", param);
	}

	/**
	 * 조직유형을 삭제한다.
	 *
	 * - 물리적 삭제
	 *
	 * - 조직에서 사용중인 조직유형은 삭제 불가 : getCountOrgByOrgTypCd 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteOrgType
	 */
	public void deleteOrgType(Map<String, Object> param) {
		sqlSession.delete(NAMESPACE + "deleteOrgType", param);
	}

	/**
	 * 조직을 삭제한다.
	 *
	 * - 물리적 삭제
	 *
	 * - 운영단위에서 사용중인 조직은 삭제 불가 : operOrgService.getCountOperOrgByOrgCd 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteOrg
	 */
	public void deleteOrg(Map<String, Object> param) {
		sqlSession.delete(NAMESPACE + "deleteOrg", param);
	}

	/**
	 * 부서를 삭제한다.
	 *
	 * - 물리적 삭제
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteDept
	 */
	public void deleteDept(Map<String, Object> param) {
		sqlSession.delete(NAMESPACE + "deleteDept", param);
	}

	/**
	 * 조직유형을 수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : updateOrgType
	 */
	public void updateOrgType(Map<String, Object> param) {
		sqlSession.update(NAMESPACE + "updateOrgType", param);
	}

	/**
	 * 조직을 수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : updateOrg
	 */
	public void updateOrg(Map<String, Object> param) {
		sqlSession.update(NAMESPACE + "updateOrg", param);
	}

	/**
	 * 부서를 수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : updateDept
	 */
	public void updateDept(Map<String, Object> param) {
		sqlSession.update(NAMESPACE + "updateDept", param);
	}

	/**
	 * 조직유형 목록을 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list org type
	 * @Date : 2016. 2. 2
	 * @Method Name : findListOrgType
	 */
	public List<Map<String, Object>> findListOrgType(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListOrgType", param);
	}

	/**
	 * 조직 목록을 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list org
	 * @Date : 2016. 2. 2
	 * @Method Name : findListOrg
	 */
	public List<Map<String, Object>> findListOrg(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListOrg", param);
	}

	/**
	 * 부서 목록을 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list dept
	 * @Date : 2016. 2. 2
	 * @Method Name : findListDept
	 */
	public List<Map<String, Object>> findListDept(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListDept", param);
	}

	/**
	 * 조직 상세정보를 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the org
	 * @Date : 2016. 2. 2
	 * @Method Name : findOrg
	 */
	public Map<String, Object> findOrg(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "findOrg", param);
	}

	/**
	 * 조직유형을 카운트한다.(by orgTypeCd - 조직유형코드)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count OrgType
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountOrgTypeByOrgTypeCd
	 */
	public int getCountOrgTypeByOrgTypeCd(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "getCountOrgTypeByOrgTypeCd", param);
	}

	/**
	 * 조직을 카운트한다.(by orgCd - 동일한 조직유형 내에서 조직코드)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count Org
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountOrgByOrgCd
	 */
	public int getCountOrgByOrgCd(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "getCountOrgByOrgCd", param);
	}

	/**
	 * 조직을 카운트한다.(by orgTypCd - 조직유형코드)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count Org
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountOrgByOrgTypCd
	 */
	public int getCountOrgByOrgTypCd(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "getCountOrgByOrgTypCd", param);
	}

	/**
	 * 부서를 카운트한다.(by deptCd - 동일한 조직유형과 조직 내에서 부서코드)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count Depts
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountDeptByDeptCd
	 */
	public int getCountDeptByDeptCd(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "getCountDeptByDeptCd", param);
	}

	/**
	 * 조직유형 목록을 등록/수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"insertOrgTypes", "updateOrgTypes"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListOrgType
	 */
	public Map<String, Object> saveListOrgType(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> inserts = (List<Map<String, Object>>)param.get("insertOrgTypes");
		List<Map<String, Object>> updates = (List<Map<String, Object>>)param.get("updateOrgTypes");

		if (inserts != null && !inserts.isEmpty()) {
			boolean exist = false;
			for (Map<String, Object> row : inserts) {
				if (this.getCountOrgTypeByOrgTypeCd(row) > 0) { // 조직유형코드 중복체크
					exist = true;
					break;
				}
			}
			if (exist) {
				resultMap.put(Const.RESULT_STATUS, Const.DUPLICATED); // 중복
				return resultMap;
			}

			int i = 0;
			for (Map<String, Object> row : inserts) {
				if (i == 1) {
					row.put("org_typ_cd", "");
				}
				this.insertOrgType(row);
				i++;
			}
		}
		if (updates != null && !updates.isEmpty()) {
			for (Map<String, Object> row : updates) {
				this.updateOrgType(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * 조직 상세정보를 등록/수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"orgInfo"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 2
	 * @Method Name : saveOrg
	 */
	public Map<String, Object> saveOrg(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> info = (Map<String, Object>)param.get("orgInfo");

		boolean isNew = false;
		if(info.get("is_new") != null){
			isNew = (Boolean)info.get("is_new");
		}
		
		if (isNew) {
			boolean exist = false;
			if (info != null && !info.isEmpty() && this.getCountOrgByOrgCd(info) > 0) {
				exist = true;
			}
			if (exist) {
				resultMap.put(Const.RESULT_STATUS, Const.DUPLICATED); // 중복
				return resultMap;
			}

			if (info != null && !info.isEmpty()) {
				this.insertOrg(info);
			}
		} else {
			if (info != null && !info.isEmpty()) {
				this.updateOrg(info);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * 부서 목록을 등록/수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"insertDepts", "updateDepts"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListDept
	 */
	public Map<String, Object> saveListDept(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> inserts = (List<Map<String, Object>>)param.get("insertDepts");
		List<Map<String, Object>> updates = (List<Map<String, Object>>)param.get("updateDepts");

		if (inserts != null && !inserts.isEmpty()) {
			boolean exist = false;
			for (Map<String, Object> row : inserts) {
				if (this.getCountDeptByDeptCd(row) > 0) { // 부서코드 중복체크
					exist = true;
					break;
				}
			}
			if (exist) {
				resultMap.put(Const.RESULT_STATUS, Const.DUPLICATED); // 중복
				return resultMap;
			}

			for (Map<String, Object> row : inserts) {
				this.insertDept(row);
			}
		}
		if (updates != null && !updates.isEmpty()) {
			for (Map<String, Object> row : updates) {
				this.updateDept(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * 조직유형 목록을 삭제한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"deleteOrgTypes"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteListOrgType
	 */
	public Map<String, Object> deleteListOrgType(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteOrgTypes");

		if (deletes != null && !deletes.isEmpty()) {
			boolean used = false;
			for (Map<String, Object> row : deletes) {
				if (this.getCountOrgByOrgTypCd(row) > 0) { // 조직에서 사용중인 조직유형인지 검사
					used = true;
					break;
				}
			}
			if (used) {
				resultMap.put(Const.RESULT_STATUS, Const.USED); // 사용중
				return resultMap;
			}

			for (Map<String, Object> row : deletes) {
				this.deleteOrgType(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * 조직 목록을 삭제한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"deleteOrgs"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteListOrg
	 */
	public Map<String, Object> deleteListOrg(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteOrgs");

		if (deletes != null && !deletes.isEmpty()) {
			boolean used = false;
			for (Map<String, Object> row : deletes) {
				if (operOrgService.getCountOperOrgByOrgCd(row) > 0) { // 운영단위에서 사용중인 조직인지 검사
					used = true;
					break;
				}
			}
			if (used) {
				resultMap.put(Const.RESULT_STATUS, Const.USED); // 사용중
				return resultMap;
			}

			for (Map<String, Object> row : deletes) {
				this.deleteOrg(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * 부서 목록을 삭제한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"deleteDepts"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteListDept
	 */
	public Map<String, Object> deleteListDept(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteDepts");

		if (deletes != null && !deletes.isEmpty()) {
			for (Map<String, Object> row : deletes) {
				this.deleteDept(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

}
