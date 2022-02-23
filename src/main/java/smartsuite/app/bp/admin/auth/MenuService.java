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
 * Menu 관련 처리하는 서비스 Class입니다.
 *
 * @author Yeon-u Kim
 * @see
 * @FileName MenuService.java
 * @package smartsuite.app.bp.admin.auth
 * @Since 2016. 2. 4
 * @변경이력 : [2016. 2. 4] Yeon-u Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "rawtypes", "unchecked" })
public class MenuService {

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	/**
	 * list menu 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 4
	 * @Method Name : findListMenu
	 */
	public List findListMenu(Map param) {
		return sqlSession.selectList("menu.findListMenu", param);
	}

	/**
	 * list menu 삭제한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @Date : 2016. 2. 11
	 * @Method Name : deleteListMenu
	 */
	public Map deleteListMenu(Map param) {
		List<Map> deleteMenus = (List<Map>)param.get("deleteMenus");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		for (Map deleteMenu : deleteMenus) {
			// esaauml 삭제 (메뉴명 삭제)
			sqlSession.delete("menu.deleteMenuName", deleteMenu);
			// RAYCOM 추가 : 메뉴삭제시, 기본메뉴기능도 같이 삭제
			sqlSession.delete("menu.deleteMenuFuncs", deleteMenu);
			// esaaumm 삭제
			sqlSession.delete("menu.deleteMenu", deleteMenu);
			// 매핑된 롤메뉴 삭제
			sqlSession.delete("menu.deleteRoleMenuByMenu", deleteMenu);
		}

		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * menu by code 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param code the code
	 * @return the map
	 * @Date : 2016. 2. 4
	 * @Method Name : findMenuByCode
	 */
	public Map findMenuByCode(String code) {
		return sqlSession.selectOne("menu.findMenuByCode", code);
	}

	/**
	 * Validate menu.
	 *
	 * @param saveParam the save param
	 * @return the binding result
	 */
	public BindingResult validateMenu(Map saveParam) {
		BindingResult result = new BeanPropertyBindingResult(saveParam, "");
		List<Map> insertList = (List<Map>)saveParam.get("insertMenus");

		if (!insertList.isEmpty()) {
			for (Map createMenu : insertList) {
				if (this.findMenuByCode((String)createMenu.get("menu_cd")) != null) {
					result.reject("Duplicate menuCode");
					break;
				}
			}
		}

		return result;
	}

	/**
	 * list menu 저장한다.
	 *
	 * @author : Yeon-u Kim
	 * @param saveParam the save param
	 * @Date : 2016. 2. 4
	 * @Method Name : saveListMenu
	 */
	public void saveListMenu(Map<String, Object> saveParam) {
		List<Map<String, Object>> insertMenus = (List<Map<String, Object>>)saveParam.get("insertMenus");
		List<Map<String, Object>> updateMenus = (List<Map<String, Object>>)saveParam.get("updateMenus");
		List<Map<String, Object>> deleteMenus = (List<Map<String, Object>>)saveParam.get("deleteMenus");

		if (insertMenus != null && !insertMenus.isEmpty()) {
			for (Map insertMenu : insertMenus) {
//				int sort_ord = Integer.parseInt((String)insertMenu.get("sort_ord"));
//				insertMenu.put("sort_ord", sort_ord);
				sqlSession.insert("menu.insertMenu", insertMenu);
				sqlSession.insert("menu.insertMenuName", insertMenu);
				if (insertMenu.get("lang_cd2") != null && !insertMenu.get("lang_cd2").equals("") && !insertMenu.get("lang_cd2").equals("ko_KR")) {
					insertMenu.put("lang_cd", insertMenu.get("lang_cd2"));
					insertMenu.put("menu_nm", insertMenu.get("menu_nm2"));
					sqlSession.insert("menu.insertMenuName", insertMenu);
				}
				
				// RAYCOM 추가 : 기본메뉴기능 추가(조회, 추가, 수정, 삭제, 엑셀다운로드, 프린트)
				sqlSession.insert("menu.insertMenuFuncs", insertMenu);
			}
		}
		if (updateMenus != null && !updateMenus.isEmpty()) {
			for (Map updateMenu : updateMenus) {
//				int sort_ord = Integer.parseInt((String)updateMenu.get("sort_ord"));
//				updateMenu.put("sort_ord", sort_ord);
				sqlSession.update("menu.updateMenu", updateMenu);
				if (updateMenu.containsKey("ml_menu_cd") && updateMenu.get("ml_menu_cd") != null && !updateMenu.get("ml_menu_cd").equals(""))
					sqlSession.update("menu.updateMenuName", updateMenu);
				else
					sqlSession.insert("menu.insertMenuName", updateMenu);

				if (updateMenu.get("lang_cd2") != null && !updateMenu.get("lang_cd2").equals("") && !updateMenu.get("lang_cd2").equals("ko_KR")) {
					updateMenu.put("lang_cd", updateMenu.get("lang_cd2"));
					updateMenu.put("menu_nm", updateMenu.get("menu_nm2"));
					if (updateMenu.containsKey("ml_menu_cd2") && updateMenu.get("ml_menu_cd2") != null && !updateMenu.get("ml_menu_cd2").equals(""))
						sqlSession.update("menu.updateMenuNameLang", updateMenu);
					else
						sqlSession.insert("menu.insertMenuName", updateMenu);
				}
			}
		}
		if (deleteMenus != null && !deleteMenus.isEmpty()) {
			for (Map deleteMenu : deleteMenus) {
				// esaauml삭제 (메뉴명 삭제)
				sqlSession.delete("menu.deleteMenuName", deleteMenu);
				// esaaumm sts D로 업데이트 (메뉴상태업데이트)
				deleteMenu.put("sts", "D");
				sqlSession.update("menu.updateMenu", deleteMenu);
			}
		}
	}

}
