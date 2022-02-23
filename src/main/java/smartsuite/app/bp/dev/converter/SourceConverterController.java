package smartsuite.app.bp.dev.converter;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.swing.filechooser.FileSystemView;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.shared.Const;

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
@RequestMapping(value = "**/converter/**")
public class SourceConverterController {

	@RequestMapping(value = "convert.do")
	public @ResponseBody List doConvert(@RequestBody Map param, HttpServletRequest request) {
		
				
		ServletContext context = request.getSession().getServletContext();
		
		String path = context.getRealPath("/");
		String [] a = path.split(".metadata");
		String [] b = path.split("wtpwebapps");
		
		path = a[0].substring(0, a[0].length()-1) + b[1];
		
		String source = (String)param.get("source");
		String target = (String)param.get("target");
		String type = (String)param.get("type");
		String serviceType = (String)param.get("serviceType");
		SourceConvert converter = new SourceConvert();
		List result = new ArrayList();
		
		try {
			result = converter.doConvert(source, target, path, type, serviceType);
			/*resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);*/
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return result;
	}
	
	@RequestMapping(value = "editorToHtml.do")
	public @ResponseBody Map editorToHtml(@RequestBody Map param, HttpServletRequest request) {
		
				
		ServletContext context = request.getSession().getServletContext();
		
		String path = context.getRealPath("/");
		System.out.println(path);
		String [] a = path.split(".metadata");
		String [] b = path.split("wtpwebapps");
		
		String rootPath = a[0].substring(0, a[0].length()-1) + b[1];
		
		String fileName = (String)param.get("fileName");
		String value = (String)param.get("value");
		SourceConvert converter = new SourceConvert();
		Map<String,Object> resultMap = new HashMap<String,Object>();
		
		try {
			converter.editorToHtml(path, rootPath, fileName, value);
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return resultMap;
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
	
/*	@RequestMapping(value = "convert.do")
	public @ResponseBody Map getSubs(@RequestBody Map param, HttpServletRequest request) {
		
		System.out.println("File system roots returned by FileSystemView.getFileSystemView():");
        FileSystemView fsv = FileSystemView.getFileSystemView();
        File[] roots = fsv.getRoots();
        for (int i = 0; i < roots.length; i++)
        {
            System.out.println("Root: " + roots[i]);
        }

        System.out.println("Home directory: " + fsv.getHomeDirectory());

        System.out.println("File system roots returned by File.listRoots():");
        File[] f = File.listRoots();
        for (int i = 0; i < f.length; i++)
        {
            System.out.println("Drive: " + f[i]);
            System.out.println("Display name: " + fsv.getSystemDisplayName(f[i]));
            System.out.println("Is drive: " + fsv.isDrive(f[i]));
            System.out.println("Is floppy: " + fsv.isFloppyDrive(f[i]));
            System.out.println("Readable: " + f[i].canRead());
            System.out.println("Writable: " + f[i].canWrite());
            System.out.println("Total space: " + f[i].getTotalSpace());
            System.out.println("Usable space: " + f[i].getUsableSpace());
        }
		
		ServletContext context = request.getSession().getServletContext();
		
		String path = context.getRealPath("/");
		String [] a = path.split(".metadata");
		String [] b = path.split("wtpwebapps");
		
		path = a[0].substring(0, a[0].length()-1) + b[1];
		
		String source = (String)param.get("source");
		String target = (String)param.get("target");
		SourceConvert converter = new SourceConvert();
		Map<String,Object> resultMap = new HashMap<String,Object>();
		
		try {
			converter.doConvert(source, target, path);
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return resultMap;
	}	*/
	
}
