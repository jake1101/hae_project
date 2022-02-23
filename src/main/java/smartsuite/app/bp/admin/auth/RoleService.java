package smartsuite.app.bp.admin.auth;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;

import smartsuite.app.common.shared.Const;

/**
 * Role 관련 처리하는 서비스 Class입니다.
 *
 * @author Yeon-u Kim
 * @see
 * @FileName RoleService.java
 * @package smartsuite.app.bp.admin.auth
 * @Since 2016. 2. 3
 * @변경이력 : [2016. 2. 3] Yeon-u Kim 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Service
@Transactional
public class RoleService {

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	/**
	 * list role 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 4
	 * @Method Name : findListRole
	 */
	public List findListRole(Map param) {
		return sqlSession.selectList("role.findListRole", param);
	}

	/**
	 * list role 저장한다.
	 *
	 * @author : Yeon-u Kim
	 * @param saveParam the save param
	 * @Date : 2016. 2. 4
	 * @Method Name : saveListRole
	 */
	public void saveListRole(Map saveParam) {
		List<Map> insertRoles = (List<Map>)saveParam.get("insertRoles");
		List<Map> updateRoles = (List<Map>)saveParam.get("updateRoles");
		List<Map> deleteRoles = (List<Map>)saveParam.get("deleteRoles");

		if (insertRoles != null && !insertRoles.isEmpty()) {
			for (Map insertRole : insertRoles) {
				if (this.findRoleByCode((String)insertRole.get("role_cd")) == null)
					sqlSession.insert("role.insertRole", insertRole);
				else
					sqlSession.update("role.updateRole", insertRole);
			}
		}
		if (updateRoles != null && !updateRoles.isEmpty()) {
			for (Map updateRole : updateRoles) {
				// updateRole.put("sts", "U");
				sqlSession.update("role.updateRole", updateRole);
			}
		}
		if (deleteRoles != null && !deleteRoles.isEmpty()) {
			for (Map deleteRole : deleteRoles) {
				// ESAAURM 삭제 (롤 메뉴, 사용자, 롤부서)
				sqlSession.delete("role.deleteRoleMenu", deleteRole);
				sqlSession.delete("role.deleteRoleUser", deleteRole);
				sqlSession.delete("role.deleteRoleDept", deleteRole);

				sqlSession.delete("role.deleteRole", deleteRole);
			}
		}
	}

	/**
	 * list role menu 저장한다.
	 *
	 * @author : Yeon-u Kim
	 * @param saveParam the save param
	 * @param roleId the role id
	 * @Date : 2016. 2. 11
	 * @Method Name : saveListRoleMenu
	 */
	public void saveListRoleMenu(Map saveParam) {
		List<Map> insertRoleMenus = (List<Map>)saveParam.get("insertRoleMenus");
		List<Map> deleteRoleMenus = (List<Map>)saveParam.get("deleteRoleMenus");

		if (insertRoleMenus != null && !insertRoleMenus.isEmpty()) {
			for (Map insertRoleMenu : insertRoleMenus) {
				sqlSession.insert("role.insertRoleMenu", insertRoleMenu);
			}
		}

		if (deleteRoleMenus != null && !deleteRoleMenus.isEmpty()) {
			for (Map deleteRoleMenu : deleteRoleMenus) {
				sqlSession.delete("role.deleteRoleMenu", deleteRoleMenu);
			}
		}
	}

	/**
	 * Validate.
	 *
	 * @param saveParam the save param
	 * @return the binding result
	 */
	public BindingResult validate(Map saveParam) {
		BindingResult result = new BeanPropertyBindingResult(saveParam, "");
		List<Map> insertRoles = (List<Map>)saveParam.get("insertRoles");

		if (insertRoles != null && !insertRoles.isEmpty()) {
			for (Map insertRole : insertRoles) {
				if (this.findRoleByCode((String)insertRole.get("role_cd")) != null) {
					result.reject("Duplicate roleCode");
					break;
				}
			}
		}
		return result;
	}

	/**
	 * role by code 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param code the code
	 * @return the map
	 * @Date : 2016. 2. 4
	 * @Method Name : findRoleByCode
	 */
	private Map findRoleByCode(String code) {
		return sqlSession.selectOne("role.findRoleByCode", code);
	}

	/**
	 * list role menu 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param role the role
	 * @return the list
	 * @Date : 2016. 2. 11
	 * @Method Name : findListRoleMenu
	 */
	public List findListRoleMenu(Map role) {
		return sqlSession.selectList("role.findListRoleMenu", role);
	}

	/**
	 * list role menu 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param role the role
	 * @return the list
	 * @Date : 2016. 2. 11
	 * @Method Name : findListRoleMenuWithMenuFunc
	 */
	public List findListRoleMenuWithMenuFunc(Map role) {
		return sqlSession.selectList("role.findListRoleMenuWithMenuFunc", role);
	}

	/**
	 * list role 삭제한다.
	 *
	 * @author : Yeon-u Kim
	 * @param saveParam the save param
	 * @Date : 2016. 2. 11
	 * @Method Name : deleteListRole
	 */
	public Map deleteListRole(Map saveParam) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		List<Map> deleteRoles = (List<Map>)saveParam.get("deleteRoles");

		if (deleteRoles != null && !deleteRoles.isEmpty()) {
			for (Map deleteRole : deleteRoles) {
				// ESAAURM 삭제 (롤 메뉴 삭제)
				sqlSession.delete("role.deleteRoleMenu", deleteRole);
				// ESAAURP (롤 사용자 삭제)
				sqlSession.delete("role.deleteRoleUser", deleteRole);
				// ESAAURD (롤 부서 삭제)
				sqlSession.delete("role.deleteRoleDept", deleteRole);
				// ESAAURH 삭제 ( 롤 삭제)
				sqlSession.update("role.deleteRole", deleteRole);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * list role user 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 11
	 * @Method Name : findListRoleUser
	 */
	public List findListRoleUser(Map param) {
		return sqlSession.selectList("role.findListRoleUser", param);
	}

	/**
	 * list role user 저장한다.
	 *
	 * @author : Yeon-u Kim
	 * @param saveParam the save param
	 * @Date : 2016. 2. 11
	 * @Method Name : saveListRoleUser
	 */
	public void saveListRoleUser(Map saveParam) {
		List<Map> insertRoleUsers = (List<Map>)saveParam.get("insertRoleUsers");
		List<Map> deleteRoleUsers = (List<Map>)saveParam.get("deleteRoleUsers");

		if (insertRoleUsers != null && !insertRoleUsers.isEmpty()) {
			for (Map insertRoleUser : insertRoleUsers) {
				sqlSession.insert("role.insertRoleUser", insertRoleUser);
			}
		}

		if (deleteRoleUsers != null && !deleteRoleUsers.isEmpty()) {
			for (Map deleteRoleUser : deleteRoleUsers) {
				sqlSession.insert("role.deleteRoleUser", deleteRoleUser);
			}
		}
	}

	/**
	 * list role dept 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 11
	 * @Method Name : findListRoleDept
	 */
	public List findListRoleDept(Map param) {
		return sqlSession.selectList("role.findListRoleDept", param);
	}

	/**
	 * list role dept 저장한다.
	 *
	 * @author : Yeon-u Kim
	 * @param saveParam the save param
	 * @Date : 2016. 2. 11
	 * @Method Name : saveListRoleDept
	 */
	public void saveListRoleDept(Map saveParam) {
		List<Map> insertRoleDepts = (List<Map>)saveParam.get("insertRoleDepts");
		List<Map> deleteRoleDepts = (List<Map>)saveParam.get("deleteRoleDepts");

		if (insertRoleDepts != null && !insertRoleDepts.isEmpty()) {
			for (Map insertRoleDept : insertRoleDepts) {
				sqlSession.insert("role.insertRoleDept", insertRoleDept);
			}
		}

		if (deleteRoleDepts != null && !deleteRoleDepts.isEmpty()) {
			for (Map deleteRoleDept : deleteRoleDepts) {
				sqlSession.delete("role.deleteRoleDept", deleteRoleDept);
			}
		}
	}
	
	/**
	 * call pattern 저장한다.
	 *
	 * @author : seonghun kim
	 * @param pattern the pattern
	 * @Date : 2017. 2. 14
	 * @Method Name : saveCallPattern
	 */
	public void saveCallPattern(Map pattern) {
		sqlSession.insert("role.insertCallPattern", pattern);
	}

	/**
	 * call pattern 이 존재하는지 확인한다.
	 *
	 * @author : seonghun kim
	 * @param pattern the pattern
	 * @Date : 2017. 2. 15
	 * @Method Name : hasCallPattern
	 */
	public boolean hasCallPattern(Map pattern) {
		return sqlSession.selectOne("role.selectCallPattern", pattern) != null;
	}
	
	/**
	 * 롤/현장 권한목록을 조회한다.
	 * @param param
	 * @return
	 */
	public List findListRoleSite(Map param) {
		return sqlSession.selectList("role.findListRoleSite", param);
	}
	
	/**
	 * 롤/현장권한을 저장한다.
	 * @param saveParam
	 * @return
	 */
	public void saveListRoleSite(Map saveParam) {
		List<Map> insertRoleSites = (List<Map>)saveParam.get("insertRoleSites");
		List<Map> deleteRoleSites = (List<Map>)saveParam.get("deleteRoleSites");

		if (insertRoleSites != null && !insertRoleSites.isEmpty()) {
			for (Map insertRoleSite : insertRoleSites) {
				sqlSession.insert("role.insertRoleSite", insertRoleSite);
			}
		}

		if (deleteRoleSites != null && !deleteRoleSites.isEmpty()) {
			for (Map deleteRoleSite : deleteRoleSites) {
				sqlSession.insert("role.deleteRoleSite", deleteRoleSite);
			}
		}
	}
	
}
