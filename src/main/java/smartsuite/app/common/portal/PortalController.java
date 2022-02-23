package smartsuite.app.common.portal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 포틀렛 관련 컨트롤러
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/portal/**")
public class PortalController {
	private static Log mLog = LogFactory.getLog(PortalController.class);
	/** The portlet service. */
	@Autowired
	private PortletService portletService;

    @Autowired
    private PortalService portalService;
    
    private static final String SLIDER_PAGE_ID = "slider";
    
    
    @RequestMapping(value = "findUserLayout.do", method = {RequestMethod.POST, RequestMethod.GET})
    public @ResponseBody Map findUserLayout(@RequestBody Map param){
    	Map result = portalService.findUserLayout(param);
    	
    	if(result != null){
    		return result;
    	}
    	
    	Map<String,Object> getParam = new HashMap<String, Object>();
    	if(param != null){
    		getParam.putAll(param);
    	}
        
        Map defaultLayout = portletService.findDefaultLayout(param);
        
        if (defaultLayout == null){
        	String pageId = (String) param.get("page_id");
        	if(pageId.contains(SLIDER_PAGE_ID)){
        		/** 구버전 포탈 */
				Map page =  new HashMap();
				page.put("page_id", pageId);
				page.put("layt_src", "[[],[\"50%\",\"50%\"]]");
				portletService.saveDefaultLayout(page);
				defaultLayout = portletService.findDefaultLayout(param);
        	}
		}
        
        return defaultLayout;
    	
    }
    
    @RequestMapping(value = "saveUserLayout.do", method = {RequestMethod.POST, RequestMethod.GET})
    public @ResponseBody Integer saveUserLayout(@RequestBody Map param){
        return  portalService.saveUserLayout(param);
    }
    
    @RequestMapping(value = "deleteUserLayout.do", method = {RequestMethod.POST, RequestMethod.GET})
    public @ResponseBody Integer deleteUserLayout(@RequestBody Map param){
        return  portalService.deleteUserLayout(param);
    }
    
    @RequestMapping(value = "findComposableWidgetList.do", method = {RequestMethod.POST, RequestMethod.GET})
    public @ResponseBody Map findComposableWidgetList(@RequestBody Map param) {
    	mLog.info("findComposableWidgetList start~~~~~~~~");
        List<Map> widgetList = portalService.findComposableWidgetList(param);
        Map baseAttr = new HashMap();
        baseAttr.put("baseAttr", "[]");
        
        if (widgetList == null){
        	return baseAttr;
        }

        StringBuffer widgetListSrc = new StringBuffer("[");
        
        for (int i=0; i<widgetList.size(); i++){
        	Map widget = widgetList.get(i);
        	String baseAttrStr = (String)widget.get("bas_attr");
        	widgetListSrc.append(baseAttrStr);
        	if (i != widgetList.size()-1)
        		widgetListSrc.append(',');
        }
        widgetListSrc.append(']');
        baseAttr.put("baseAttr", widgetListSrc);
        baseAttr.put("baseList", widgetList);
        
        return baseAttr;
    }
    
    @RequestMapping(value="findPortalCommonConfig.do")
    public @ResponseBody Map findPortalCommonConfig(@RequestBody Map param) {
    	return portalService.findPortalCommonConfig(param);
    }
    
    @RequestMapping(value="savePortalCommonConfig.do")
    public @ResponseBody Integer savePortalCommonConfig(@RequestBody Map param) {
    	return portalService.savePortalCommonConfig(param);
    }
    
    @RequestMapping(value="updatePortalCommonConfig.do")
    public @ResponseBody Integer updatePortalCommonConfig(@RequestBody Map param) {
    	return portalService.updatePortalCommonConfig(param);
    }
    
}
