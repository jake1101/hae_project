package smartsuite.app.common.portal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * Portal 관련 처리하는 서비스 Class입니다.
 *
 * @author JuEung Kim
 * @see 
 * @FileName PortletService.java
 * @package smartsuite.app.bp.common.portlet
 * @Since 2016. 10. 13
 * @변경이력 : [2016. 10. 13] JuEung Kim 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Service
@Transactional
public class PortalService {
	
	@Inject
	private SqlSession sqlSession;
	
	/*
	 * 고정부 위젯 레이아웃 조회
	 */
	public Map findAdminLayout(Map param){
		return sqlSession.selectOne("portal.findAdminLayout", param);
	}

	public Map findUserLayout(Map param){
		return sqlSession.selectOne("portal.findUserLayout", param);
	}
	
	public Map findDefaultUserLayout(Map param){
		return sqlSession.selectOne("portal.findDefaultUserLayout", param);
	}
	
	public Integer saveUserLayout(Map param){
		Map userLayout = sqlSession.selectOne("portal.findUserLayout", param);
        Integer success = null;
        if (userLayout == null){
            success = insertUserLayout(param);
        }else{
            success = updateUserLayout(param);
        }
        return success;
	}
	
	public Integer insertUserLayout(Map param){
		return sqlSession.insert("portal.saveUserLayout", param);
	}

	public Integer updateUserLayout(Map param){
		return sqlSession.insert("portal.updateUserLayout", param);
	}
	
	public Integer deleteUserLayout(Map param){
		return sqlSession.insert("portal.deleteUserLayout", param);
	}
	
	public Map findWidgetProperty(Map param){
		return sqlSession.selectOne("portal.findWidgetProperty", param);
	}

	public Integer insertWidgetProperty(Map param){
		return sqlSession.insert("portal.saveWidgetProperty", param);
	}

	public Integer updateWidgetProperty(Map param){
		return sqlSession.insert("portal.updateWidgetProperty", param);
	}

	public List<Map> findComposableWidgetList(Map param){
		return sqlSession.selectList("portal.findComposableWidgetList", param);
	}
	
	public Map findPortalCommonConfig(Map param) {
		return sqlSession.selectOne("portal.findPortalCommonConfig", param);
	}
	
	public Integer savePortalCommonConfig(Map param) {
		return sqlSession.insert("portal.savePortalCommonConfig", param);	
	}
	
	public Integer updatePortalCommonConfig(Map param) {
		return sqlSession.update("portal.updatePortalCommonConfig", param);
	}
	
	public Map saveUserHomeTyp(Map param){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		sqlSession.update("portal.saveUserHomeTyp",param);
		return resultMap;
	}

}
