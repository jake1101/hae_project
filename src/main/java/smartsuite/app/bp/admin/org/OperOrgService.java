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
 * 운영조직/운영조직의 사용자/운영조직의 연결정보 관련 처리하는 서비스 Class입니다.
 *
 * @author JongKyu Kim
 * @see
 * @FileName OperOrgService.java
 * @package smartsuite.app.common.org
 * @Since 2016. 2. 2
 * @변경이력 : [2016. 2. 2] JongKyu Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class OperOrgService {

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	/** The NAMESPACE. */
	private static final String NAMESPACE = "operOrg.";

	/**
	 * 운영조직을 등록한다.
	 *
	 * - 운영조직코드 Unique : getCountOperOrgByOperOrgCd 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 3
	 * @Method Name : insertOperOrg
	 */
	public void insertOperOrg(Map<String, Object> param) {
		sqlSession.insert(NAMESPACE + "insertOperOrg", param);
	}

	/**
	 * 운영조직의 사용자를 등록한다.
	 *
	 * - 운영조직 내에서 사용자아이디 Unique : getCountOperOrgUserByUserId 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 3
	 * @Method Name : insertOperOrgUser
	 */
	public void insertOperOrgUser(Map<String, Object> param) {
		sqlSession.insert(NAMESPACE + "insertOperOrgUser", param);
	}

	/**
	 * 운영조직의 연결정보를 등록한다.
	 *
	 * - 연결유형 내에서 소스운영조직코드 & 타겟운영조직코드 Unique : getCountOperOrgLinkBySrcOperOrgCdAndTargOperOrgCd 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 3
	 * @Method Name : insertOperOrgLink
	 */
	public void insertOperOrgLink(Map<String, Object> param) {
		sqlSession.insert(NAMESPACE + "insertOperOrgLink", param);
	}

	/**
	 * 운영조직을 삭제한다.
	 *
	 * - 물리적 삭제
	 *
	 * - 운영조직에 추가된 사용자가 있을 경우 삭제 불가 : getCountOperOrgUserByOperOrgCd 로 검사하고 호출할 것.
	 *
	 * - 운영조직 연결에 사용된 운영조직이 있을 경우 삭제 불가 : getCountOperOrgLinkByOperOrgCd 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the int
	 * @Date : 2016. 2. 3
	 * @Method Name : deleteOperOrg
	 */
	public void deleteOperOrg(Map<String, Object> param) {
		sqlSession.delete(NAMESPACE + "deleteOperOrg", param);
	}

	/**
	 * 운영조직의 사용자를 삭제한다.
	 *
	 * - 물리적 삭제
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the int
	 * @Date : 2016. 2. 3
	 * @Method Name : deleteOperOrgUser
	 */
	public void deleteOperOrgUser(Map<String, Object> param) {
		sqlSession.delete(NAMESPACE + "deleteOperOrgUser", param);
	}

	public void deleteOperOrgByUsrId(Map<String, Object> param) {
		sqlSession.delete(NAMESPACE + "deleteOperOrgByUsrId", param);
	}
	
	/**
	 * 운영조직의 연결정보를 삭제한다.
	 *
	 * - 물리적 삭제
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the int
	 * @Date : 2016. 2. 3
	 * @Method Name : deleteOperOrgLink
	 */
	public void deleteOperOrgLink(Map<String, Object> param) {
		sqlSession.delete(NAMESPACE + "deleteOperOrgLink", param);
	}

	/**
	 * 운영조직을 수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 3
	 * @Method Name : updateOperOrg
	 */
	public void updateOperOrg(Map<String, Object> param) {
		sqlSession.update(NAMESPACE + "updateOperOrg", param);
	}

	/**
	 * 운영조직의 상위노드의 leafYn 여부 수정
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 3
	 * @Method Name : updateOperOrgParentLeafYn
	 */
	public void updateOperOrgParentLeafYn(Map<String, Object> param) {
		sqlSession.update(NAMESPACE + "updateOperOrgParentLeafYn", param);
	}

	/**
	 * 운영조직의 사용자를 수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 4
	 * @Method Name : updateOperOrgUser
	 */
	public void updateOperOrgUser(Map<String, Object> param) {
		sqlSession.update(NAMESPACE + "updateOperOrgUser", param);
	}

	/**
	 * 운영조직 목록을 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 2. 3
	 * @Method Name : findListOperOrg
	 */
	public List<Map<String, Object>> findListOperOrg(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListOperOrg", param);
	}

	/**
	 * 운영조직의 사용자 목록을 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 2. 3
	 * @Method Name : findListOperOrgUser
	 */
	public List<Map<String, Object>> findListOperOrgUser(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListOperOrgUser", param);
	}

	/**
	 * 운영조직의 연결정보 목록을 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 2. 3
	 * @Method Name : findListOperOrgLink
	 */
	public List<Map<String, Object>> findListOperOrgLink(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListOperOrgLink", param);
	}

	/**
	 * 운영조직을 카운트한다.(by operOrgCd - 운영조직코드)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count OperOrg (by operOrgCd)
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountOperOrgByOperOrgCd
	 */
	public int getCountOperOrgByOperOrgCd(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "getCountOperOrgByOperOrgCd", param);
	}

	/**
	 * 운영조직을 카운트한다.(by orgCd - 조직코드)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count OperOrg (by orgCd)
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountOperOrgByOrgCd
	 */
	public int getCountOperOrgByOrgCd(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "getCountOperOrgByOrgCd", param);
	}

	/**
	 * 운영조직을 카운트한다.(by operUnitCd - 운영단위코드)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count OperOrg (by operUnitCd)
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountOperOrgByOperUnitCd
	 */
	public int getCountOperOrgByOperUnitCd(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "getCountOperOrgByOperUnitCd", param);
	}

	/**
	 * 운영조직의 사용자를 카운트한다.(by operOrgCd - 운영조직코드)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count OperOrgUser (by operOrgCd)
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountOperOrgUserByOperOrgCd
	 */
	public int getCountOperOrgUserByOperOrgCd(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "getCountOperOrgUserByOperOrgCd", param);
	}

	/**
	 * 운영조직의 사용자를 카운트한다.(by userId - 사용자)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count OperOrgUser (by userId)
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountOperOrgUserByUserId
	 */
	public int getCountOperOrgUserByUserId(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "getCountOperOrgUserByUserId", param);
	}

	/**
	 * 운영조직의 연결정보를 카운트한다.(by operOrgCd - 운영조직코드)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count OperOrgLink (by operOrgCd)
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountOperOrgLinkByOperOrgCd
	 */
	public int getCountOperOrgLinkByOperOrgCd(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "getCountOperOrgLinkByOperOrgCd", param);
	}

	/**
	 * 운영조직의 연결정보를 카운트한다.(by srcOperOrgCd & targOperOrgCd - 소스운영조직코드 & 타겟운영조직코드)
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count OperOrgLink (by srcOperOrgCd & targOperOrgCd)
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountOperOrgLinkBySrcOperOrgCdAndTargOperOrgCd
	 */
	public int getCountOperOrgLinkBySrcOperOrgCdAndTargOperOrgCd(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "getCountOperOrgLinkBySrcOperOrgCdAndTargOperOrgCd", param);
	}

	/**
	 * 운영조직의 목록을 등록/수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"insertOperOrgs", "updateOperOrgs"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 3
	 * @Method Name : saveListOperOrg
	 */
	public Map<String, Object> saveListOperOrg(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> inserts = (List<Map<String, Object>>)param.get("insertOperOrgs");
		List<Map<String, Object>> updates = (List<Map<String, Object>>)param.get("updateOperOrgs");

		if (inserts != null && !inserts.isEmpty()) {
			boolean exist = false;
			for (Map<String, Object> row : inserts) {
				if (this.getCountOperOrgByOperOrgCd(row) > 0) { // 운영조직코드 중복체크
					exist = true;
					break;
				}
			}
			if (exist) {
				resultMap.put(Const.RESULT_STATUS, Const.DUPLICATED); // 중복
				return resultMap;
			}

			for (Map<String, Object> row : inserts) {
				this.insertOperOrg(row);
				this.updateOperOrgParentLeafYn(row);
			}
		}
		if (updates != null && !updates.isEmpty()) {
			for (Map<String, Object> row : updates) {
				this.updateOperOrg(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * 운영조직의 사용자 목록을 등록/수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"insertUsers", "updateUsers"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 3
	 * @Method Name : saveListUserToOperOrg
	 */
	public Map<String, Object> saveListOperOrgUser(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> inserts = (List<Map<String, Object>>)param.get("insertUsers");
		List<Map<String, Object>> updates = (List<Map<String, Object>>)param.get("updateUsers");

		if (inserts != null && !inserts.isEmpty()) {
			boolean exist = false;
			for (Map<String, Object> row : inserts) {
				if (this.getCountOperOrgUserByUserId(row) > 0) { // 사용자아이디 중복체크
					exist = true;
					break;
				}
			}
			if (exist) {
				resultMap.put(Const.RESULT_STATUS, Const.DUPLICATED); // 중복
				return resultMap;
			}

			for (Map<String, Object> row : inserts) {
				this.insertOperOrgUser(row);
			}
		}
		if (updates != null && !updates.isEmpty()) {
			for (Map<String, Object> row : updates) {
				this.updateOperOrgUser(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * 운영조직의 연결정보 목록을 등록/삭제한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"insertLinks", "deleteLinks"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 3
	 * @Method Name : saveListLinkToOperOrg
	 */
	public Map<String, Object> saveListOperOrgLink(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> inserts = (List<Map<String, Object>>)param.get("insertLinks");
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteLinks");

		if (inserts != null && !inserts.isEmpty()) {
			boolean exist = false;
			for (Map<String, Object> row : inserts) {
				if (this.getCountOperOrgLinkBySrcOperOrgCdAndTargOperOrgCd(row) > 0) { // 소스운영조직코드 & 타겟운영조직코드 중복체크
					exist = true;
					break;
				}
			}
			if (exist) {
				resultMap.put(Const.RESULT_STATUS, Const.DUPLICATED); // 중복
				return resultMap;
			}

			for (Map<String, Object> row : inserts) {
				this.insertOperOrgLink(row);
			}
		}
		if (deletes != null && !deletes.isEmpty()) {
			for (Map<String, Object> row : deletes) {
				this.deleteOperOrgLink(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * 운영조직의 목록을 삭제한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"deleteOperOrgs"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 3
	 * @Method Name : deleteListOperOrg
	 */
	public Map<String, Object> deleteListOperOrg(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteOperOrgs");

		if (deletes != null && !deletes.isEmpty()) {
			boolean used = false;
			for (Map<String, Object> row : deletes) {
				if (this.getCountOperOrgUserByOperOrgCd(row) > 0 || this.getCountOperOrgLinkByOperOrgCd(row) > 0) { // 추가된 사용자가 있는지, 연결된 운영조직이 있는지 검사
					used = true;
					break;
				}
			}
			if (used) {
				resultMap.put(Const.RESULT_STATUS, Const.USED); // 사용중
				return resultMap;
			}

			for (Map<String, Object> row : deletes) {
				this.deleteOperOrg(row);
				this.updateOperOrgParentLeafYn(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * 운영조직의 사용자 목록을 삭제한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"deleteUsers"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 3
	 * @Method Name : deleteListOperOrgUser
	 */
	public Map<String, Object> deleteListOperOrgUser(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteUsers");

		if (deletes != null && !deletes.isEmpty()) {
			for (Map<String, Object> row : deletes) {
				this.deleteOperOrgUser(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

}
