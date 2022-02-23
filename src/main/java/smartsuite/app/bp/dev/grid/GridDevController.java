package smartsuite.app.bp.dev.grid;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.bp.admin.auth.MenuService;

@SuppressWarnings({ "rawtypes", "unchecked" })
@Controller
@RequestMapping(value = "**/griddev/**")
public class GridDevController {
	@Inject
	MenuService menuService;
	
	@RequestMapping(value = "gridSearch.do")
	public @ResponseBody List gridSearch(@RequestBody Map param, HttpServletRequest request) {
		List<Map> list = new ArrayList<Map>();
		
	    Map<String, String> map = new HashMap<String, String>();
	    for(int i = 0; i <10; i++){
	    	map = new HashMap<String, String>();
	    	map.put("col1", "cell("+i+",0)");
	    	map.put("col2", "cell("+i+",1)");
	    	map.put("col3", "cell("+i+",2)");
	    	map.put("col4", "cell("+i+",3)");
	    	map.put("col5", "cell("+i+",4)");
	    	list.add(map);
	    }
		return list;
	}
	
	@RequestMapping (value = "treeList.do")
	public @ResponseBody List findListMenu(@RequestBody Map param) {
		return menuService.findListMenu(param);
	}
	
	
	
}
