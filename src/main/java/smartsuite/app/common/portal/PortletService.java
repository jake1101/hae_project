package smartsuite.app.common.portal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.exception.CommonException;
import smartsuite.exception.ErrorCode;

/**
 * Portlet 관련 처리하는 서비스 Class입니다.
 *
 * @author JuEung Kim
 * @see 
 * @FileName PortletService.java
 * @package smartsuite.app.bp.common.portlet
 * @Since 2016. 10. 13
 * @변경이력 : [2016. 10. 13] JuEung Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class PortletService {
	
	/** The sql session. */
	@Inject
	private SqlSession sqlSession;
	
	/**
	 * 포틀릿 현황 목록을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 10. 13
	 * @Method Name : findListPortlet
	 */
	public List<Map<String, Object>> findListPortlet(Map<String, Object> param) {
		return sqlSession.selectList("portlet.findListPortlet", param);
	}
	
	/**
	 * 포틀릿 정보를 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map< string, object>
	 * @Date : 2016. 10. 13
	 * @Method Name : findInfoPortlet
	 */
	public Map<String, Object> findInfoPortlet(Map<String, Object> param) {
		return sqlSession.selectOne("portlet.findInfoPortlet", param);
	}
	
	/**
	 * 포틀릿 사용자 롤을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 10. 13
	 * @Method Name : findListPortletRoles
	 */
	public List<Map<String, Object>> findListPortletRoles(Map<String, Object> param) {
		return sqlSession.selectList("portlet.findListPortletRoles", param);
	}
	
	/**
	 * 포틀릿 정보 및 사용자 롤을 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 10. 13
	 * @Method Name : saveInfoPortlet
	 */
	public Map saveInfoPortlet(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		// 포틀릿 정보
		Map<String, Object> portletInfo = (Map<String, Object>)param.get("portletInfo");

		boolean isNew = portletInfo.get("is_new") == null ? false : (Boolean)portletInfo.get("is_new");
		
		if(isNew){
			// 중복체크
			Map existPortlet = this.findInfoPortlet(portletInfo);
			
			if(existPortlet != null){
				throw new CommonException(ErrorCode.DUPLICATED);
			}
			
			sqlSession.insert("portlet.insertPortlet", portletInfo);
			
		}else{
			sqlSession.update("portlet.updatePortlet", portletInfo);
		}
		
		// 포틀릿 사용자 롤 리스트
		List<Map<String, Object>> portletRoleList = (List<Map<String, Object>>)param.get("portletRoleList"); 
		
		if(isNew){
			for(Map item: portletRoleList){
				if("Y".equals(item.get("use_yn")) ){
					item.put("portal_cls", portletInfo.get("portal_cls") ); 
					item.put("cls_nm", portletInfo.get("cls_nm") );
					sqlSession.insert("portlet.insertPortletRole", item);
				}
			}
		}else{
			for(Map item: portletRoleList){
				item.put("portal_cls", portletInfo.get("portal_cls") ); 
				item.put("cls_nm", portletInfo.get("cls_nm") );
				if("Y".equals(item.get("use_yn")) ){
					sqlSession.insert("portlet.insertPortletRole", item);
				}else{
					item.put("portal_cls", portletInfo.get("portal_cls") ); 
					item.put("cls_nm", portletInfo.get("cls_nm") );					
					sqlSession.delete("portlet.deletePortletRoleByClsNm", item);
				}
			}
		}
		
		return resultMap;
	}
	
	/**
	 * 포틀릿 현황을 삭제한다.(포틀릿 사용자 롤도 삭제한다.)
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 10. 13
	 * @Method Name : deleteListPortlet
	 */
	public Map deleteListPortlet(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		// DELETE
		for(Map row : deleteList){
			sqlSession.delete("portlet.deletePortletRoleByClsNm", row);
			sqlSession.delete("portlet.deletePortlet", row);
		}
		
		return resultMap;
	}
	
	/**
	 * 포틀릿 기본 레이아웃을 조회한다.
	 *
	 * @author : dmwon
	 * @param param the param
	 * @return the map
	 * @Date : 2017. 07. 05
	 * @Method Name : findDefaultLayout
	 */
	public Map findDefaultLayout(Map param) {
//		if(param.get("portal_cls") == null) param.put("portal_cls", "ALL");
		if(param.get("portal_cls") == null) param.put("portal_cls", "B");
		return sqlSession.selectOne("portlet.findDefaultLayout", param);
	}
	
	/**
	 * 포틀릿 기본 레이아웃을 저장한다.
	 *
	 * @author : dmwon
	 * @param param the param
	 * @return the map
	 * @Date : 2017. 07. 05
	 * @Method Name : saveDefaultLayout
	 */
	public Map saveDefaultLayout(Map param){
		Map userLayout = findDefaultLayout(param);
        if (userLayout == null){
        	sqlSession.insert("portlet.insertDefaultLayout", param);
        }else{
        	sqlSession.update("portlet.updateDefaultLayout", param);
        }
        Map resultMap = new HashMap();
        return resultMap;
	}

}
