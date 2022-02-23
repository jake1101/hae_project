package smartsuite.app.bp.dev.converter8;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.swing.filechooser.FileSystemView;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Contract 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author SungHyun Kang
 * @see 
 * @FileName ContractController.java
 * @package smartsuite.app.bp.edoc.contract
 * @since 2016. 3. 9
 * @변경이력 : [2016. 3. 9] SungHyun Kang 최초작성
 */

@SuppressWarnings({ "rawtypes", "unchecked" })
@Controller
//@RequestMapping(value = "**/bp/edoc/**")
@RequestMapping(value = "**/converter8/**")
public class SourceConverter8Controller {

	@RequestMapping(value = "convert.do")
	public @ResponseBody Map<String,Object> doConvert(@RequestBody Map param, HttpServletRequest request) {
		
		Map<String,Object> result = new HashMap<String, Object>();
		String source = (String)param.get("source");
		String target = (String)param.get("target");
		SourceConvert converter = new SourceConvert();
		List sourceResult = new ArrayList();
		try {
			sourceResult = converter.doConvert(request, source, target);
			result.put("error", false);
			result.put("message", "변환 성공!");
			/*resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);*/
		} catch (Exception e) {
			result.put("error", true);
			e.printStackTrace();
			result.put("message", e.getStackTrace());
			// TODO Auto-generated catch block
		}
		
		result.put("source", sourceResult);
		
		
		return result;
	}
	
	public void findFileByExtension(List<File> result, File dir, final String extension){
		
        if(dir.isDirectory()){
        	for(File file : dir.listFiles()){
        		findFileByExtension(result, file, extension);
        	}
        }else{
        	if(dir.getName().endsWith(extension)){
        		result.add(dir);
        	}
        }
	}
	
	@RequestMapping(value = "findConvertedSources.do")
	public @ResponseBody List findConvertedSources(@RequestBody Map param, HttpServletRequest request){
		List<Map> sourceList = new ArrayList<Map>();
		List<File> files = new ArrayList<File>();
		String path = (String)param.get("path");
		String uiSourcePath = (String)param.get("uipath");
		
		findFileByExtension(files, new File(path),".html");
		
		for(File file: files){
			Map<String, String> result = new HashMap<String, String>();
			String absolutePath = file.getAbsolutePath();
			result.put("path", absolutePath);
			result.put("deployPath", absolutePath.replace(uiSourcePath, ""));
			sourceList.add(result);
		}
		
		return sourceList;
	}
	
	
	@RequestMapping(value = "findSourceFolder.do")
	public @ResponseBody List findSourceFolder(@RequestBody Map param, HttpServletRequest request) {
		
		List folders = new ArrayList();
        FileSystemView fsv = FileSystemView.getFileSystemView();
        String parent = (String)param.get("root_path");//(String)convertParam.get("parent_dirs");
       
        File[] f = null;
        
        
        if(parent == null || "".equals(parent)){
        	f = File.listRoots();
        	for (int i = 0; i < f.length; i++)
            {
            	Map<String,Object> folder = new HashMap<String,Object>();
                
                if(f[i].canRead() && f[i].isDirectory()){
                	File[] childFiles = f[i].listFiles();
	                	if(childFiles != null){
	                	Boolean hasChild = false;
	                	folder.put("up_path", "ROOT");
	                	folder.put("path", f[i].getPath());
	                	folder.put("display_name", fsv.getSystemDisplayName(f[i]));
	                	folder.put("sort_ord", i);
	                	folder.put("hasChild", true);
	                	for (int j = 0; j < childFiles.length; j++) {
	                		if(childFiles[j].isDirectory()){
	                			hasChild = true;
	                			continue;
	                		}                	
						}
	                	folder.put("hasChild", hasChild);
	                	
	                	folders.add(folder);
                	}
                }   
            }
        }else{
        	File file = new File(parent);
        	f = file.listFiles();
        	for (int i = 0; i < f.length; i++)
            {
            	Map<String,Object> folder = new HashMap<String,Object>();
                
                if(f[i].canRead() && f[i].isDirectory()){
                	File[] childFiles = f[i].listFiles();
                	if(childFiles != null){
                		Boolean hasChild = false;
                    	folder.put("up_path", parent);
                    	folder.put("path", f[i].getPath());
                    	folder.put("display_name", fsv.getSystemDisplayName(f[i]));
                    	folder.put("sort_ord", i);
                    	
                    	for (int j = 0; j < childFiles.length; j++) {
                    		if(childFiles[j].isDirectory()){
                    			hasChild = true;
                    			continue;
                    		}                	
    					}
                    	folder.put("hasChild", hasChild);
                    	folders.add(folder);
                	}
                	
                }   
            }
        }
		
		return folders;
	}	
}
