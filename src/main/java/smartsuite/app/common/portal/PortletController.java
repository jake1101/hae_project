package smartsuite.app.common.portal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Portlet 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author JuEung Kim
 * @see 
 * @since 2016. 10. 12
 * @FileName PortletController.java
 * @package smartsuite.app.bp.common.portlet
 * @변경이력 : [2016. 10. 12] JuEung Kim 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping(value="**/portlet/**/")
@PreAuthorize("isRoleAdmin() and isAllowIp()")
public class PortletController {
	/** The portlet service. */
	@Inject
	PortletService portletService;
	
	private static final String SLIDER_PAGE_ID = "slider";


	/**
	 * 포틀릿 현황 목록 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 10. 12
	 * @Method Name : findListPortlet
	 */
	@RequestMapping (value = "findListPortlet.do")
	public @ResponseBody List findListPortlet(@RequestBody Map param) {
		return portletService.findListPortlet(param);
	}
	
	/**
	 * 포틀릿 정보 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 10. 13
	 * @Method Name : findInfoPortlet
	 */
	@RequestMapping (value = "findInfoPortlet.do")
	public @ResponseBody Map findInfoPortlet(@RequestBody Map param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap.put("portletInfo", portletService.findInfoPortlet(param) );
		resultMap.put("portletRoleList", portletService.findListPortletRoles(param) );
		
		return resultMap;
	}
	
	/**
	 * 포틀릿 정보 저장을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 10. 13
	 * @Method Name : saveInfoPortlet
	 */
	@RequestMapping(value = "saveInfoPortlet.do")
	public @ResponseBody Map saveInfoPortlet(@RequestBody Map param) {
		return portletService.saveInfoPortlet(param);
	}
	
	/**
	 * 포틀릿 현황 삭제를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 10. 13
	 * @Method Name : deleteListPortlet
	 */
	@RequestMapping(value = "deleteListPortlet.do")
	public @ResponseBody Map deleteListPortlet(@RequestBody Map param) {
		return portletService.deleteListPortlet(param);
	}
	
	/**
	 * 포틀릿 사용자 롤 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 10. 13
	 * @Method Name : findListPortletRole
	 */
	@RequestMapping (value = "findListPortletRole.do")
	public @ResponseBody List findListPortletRole(@RequestBody Map param) {
		return portletService.findListPortletRoles(param);
	}
    
    @RequestMapping(value = "findDefaultLayout.do", method = {RequestMethod.POST, RequestMethod.GET})
    public @ResponseBody Map findDefaultLayout(@RequestBody Map param){

		Map<String,Object> getParam = new HashMap<String, Object>();

		if(param != null){
			getParam.putAll(param);
		}
        
        Map defaultLayout = portletService.findDefaultLayout(getParam);
        
        if (defaultLayout == null){
        	String pageId = (String) getParam.get("page_id");
        	if(pageId.contains(SLIDER_PAGE_ID)){
        		/** 구버전 포탈 */
				Map page =  new HashMap();
				page.put("page_id", pageId);
				page.put("layt_src", "[[],[\"50%\",\"50%\"]]");
				portletService.saveDefaultLayout(page);
				defaultLayout = portletService.findDefaultLayout(getParam);
        	}
		}
        
        return defaultLayout;
    }
    
    @RequestMapping(value = "saveDefaultLayout.do", method = {RequestMethod.POST, RequestMethod.GET})
    public @ResponseBody Map saveDefaultLayout(@RequestBody Map param){

		Map<String,Object> getParam = new HashMap<String, Object>();

		if(param != null){
			getParam.putAll(param);
		}
        
        Map defaultLayout = portletService.saveDefaultLayout(getParam);
        return defaultLayout;
    }
}
