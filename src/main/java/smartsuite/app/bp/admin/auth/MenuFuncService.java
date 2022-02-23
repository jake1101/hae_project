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
 * 메뉴기능 관련 처리하는 서비스 Class입니다.
 *
 * @author JongKyu Kim
 * @see
 * @FileName MenuFuncService.java
 * @package smartsuite.app.bp.admin.auth
 * @Since 2016. 2. 2
 * @변경이력 : [2016. 2. 2] JongKyu Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class MenuFuncService {

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	@Inject
	private RoleFuncService roleFuncService;

	/**
	 * 메뉴기능을 등록한다.
	 *
	 * - 메뉴기능코드는 Unique : getCountMenuFunc 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : insertMenuFunc
	 */
	public void insertMenuFunc(Map<String, Object> param) {
		sqlSession.insert("menuFunc.insertMenuFunc", param);
	}

	/**
	 * 메뉴기능을 삭제한다.
	 *
	 * - 물리적 삭제
	 *
	 * - 롤 기능에서 사용중인 메뉴기능은 삭제 불가 : roleFuncService.getCountRoleFunc 로 검사하고 호출할 것.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteMenuFunc
	 */
	public void deleteMenuFunc(Map<String, Object> param) {
		sqlSession.delete("menuFunc.deleteMenuFunc", param);
	}

	/**
	 * 메뉴기능을 수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : updateMenuFunc
	 */
	public void updateMenuFunc(Map<String, Object> param) {
		sqlSession.update("menuFunc.updateMenuFunc", param);
	}

	/**
	 * 메뉴기능 목록을 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list menu func
	 * @Date : 2016. 2. 2
	 * @Method Name : findListMenuFunc
	 */
	public List<Map<String, Object>> findListMenuFunc(Map<String, Object> param) {
		return sqlSession.selectList("menuFunc.findListMenuFunc", param);
	}
	
	/**
	 * list menu ptrn 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2018. 3. 27
	 * @Method Name : findListMenuPtrn
	 */
	public List<Map<String, Object>> findListMenuPtrn(Map<String, Object> param) {
		return sqlSession.selectList("menuFunc.findListMenuPtrn", param);
	}

	/**
	 * list menu func ptrn 저장한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map< string, object>
	 * @Date : 2018. 3. 27
	 * @Method Name : saveListMenuFuncPtrn
	 */
	public Map<String, Object> saveListMenuFuncPtrn(Map<String, Object> param) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> saveds = (List<Map<String, Object>>) param.get("saveList");

		if (saveds != null && !saveds.isEmpty()) {
			
			for (Map<String, Object> row : saveds) {
				if (this.getCountFuncUrl(row) > 0) { // 롤기능 중복 체크
					this.updateMenuFuncPtrn(row);
				}else{
					this.insertFuncUrl(row);
				}
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * count func url의 값을 반환한다.
	 *
	 * @param param the param
	 * @return count func url
	 */
	public int getCountFuncUrl(Map<String, Object> param) {
		return sqlSession.selectOne("authUrl.getCountFuncUrl", param);
	}
	
	/**
	 * func url 입력한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @Date : 2018. 3. 28
	 * @Method Name : insertFuncUrl
	 */
	public void insertFuncUrl(Map<String, Object> param) {
		sqlSession.insert("authUrl.insertFuncUrl", param);
	}
	/**
	 * menu func ptrn 수정한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @Date : 2018. 3. 27
	 * @Method Name : updateMenuFuncPtrn
	 */
	public void updateMenuFuncPtrn(Map<String,Object> param){
		sqlSession.update("authUrl.updateMenuFuncPtrn",param);
	}
	/**
	 * 메뉴기능을 카운트한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count MenuFunc
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountMenuFunc
	 */
	public int getCountMenuFunc(Map<String, Object> param) {
		return sqlSession.selectOne("menuFunc.getCountMenuFunc", param);
	}

	/**
	 * 메뉴기능 목록을 등록/수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"insertMenuFuncs", "updateMenuFuncs"}
	 * @return the map<string, object>
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListMenuFunc
	 */
	public Map<String, Object> saveListMenuFunc(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> inserts = (List<Map<String, Object>>)param.get("insertMenuFuncs");
		List<Map<String, Object>> updates = (List<Map<String, Object>>)param.get("updateMenuFuncs");

		if (inserts != null && !inserts.isEmpty()) {
			boolean exist = false;
			for (Map<String, Object> row : inserts) {
				if (this.getCountMenuFunc(row) > 0) { // 메뉴기능 중복 체크
					exist = true;
					break;
				}
			}
			if (exist) {
				resultMap.put(Const.RESULT_STATUS, Const.FAIL); // 중복
			 	return resultMap;
			}

			for (Map<String, Object> row : inserts) {
				this.insertMenuFunc(row);
			}
		}
		if (updates != null && !updates.isEmpty()) {
			for (Map<String, Object> row : updates) {
				this.updateMenuFunc(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * 메뉴기능 목록을 삭제한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"deleteMenuFuncs"}
	 * @return the map< string, object>
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteListMenuFunc
	 */
	public Map<String, Object> deleteListMenuFunc(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteMenuFuncs");

		if (deletes != null && !deletes.isEmpty()) {
			boolean used = false;
			for (Map<String, Object> row : deletes) {
				if (roleFuncService.getCountRoleFunc(row) > 0) { // 롤기능에서 사용중인 메뉴기능인지 검사
					used = true;
					break;
				}
			}
			if (used) {
				resultMap.put(Const.RESULT_STATUS, Const.FAIL); // 사용중
				return resultMap;
			}

			for (Map<String, Object> row : deletes) {
				this.deleteMenuFunc(row);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

}
