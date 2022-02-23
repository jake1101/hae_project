package smartsuite.app.bp.dev.converter;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.swing.filechooser.FileSystemView;

import org.apache.commons.lang.WordUtils;
import org.springframework.jdbc.support.JdbcUtils;

public class SourceConvert {
	public static void main(String[] args) throws Exception{
		// 변환 대상 디렉토리 지정
/*		String targetPath = "D:/source";
      	
		File target = new File(targetPath);
		SourceConvert sc = new SourceConvert();
		sc.recurse(target);*/
		
		String filename = "EMCAMANU_P01.mxml";
		
		StringBuffer sb = new StringBuffer();
		
		sb.append(filename.substring(0, 2).toLowerCase());		
		
		String reFilename = filename.substring(2);
		
		Pattern p = Pattern.compile("[A-Z]+");
		Matcher m = p.matcher(reFilename);
		
		while(m.find()) {
			String oldChar = m.group(0);
			
			char a = reFilename.charAt(oldChar.length()+reFilename.indexOf(oldChar));
			String aa = String.valueOf(a);
			if(aa.equals("_") || aa.equals("-") ){
				String newChar = oldChar.toLowerCase();
				reFilename = reFilename.replace(oldChar, newChar);
				continue;
			}
			if(reFilename.indexOf(oldChar) > 0){
				char b = reFilename.charAt(reFilename.indexOf(oldChar) - 1);
				String bb = String.valueOf(b);
				if(bb.equals("_") || bb.equals("-") ){
					String newChar = oldChar.toLowerCase();
					reFilename = reFilename.replace(oldChar, newChar);
					continue;
				}
			}
			
			if(oldChar.length() > 1){
				oldChar = oldChar.substring(0, oldChar.length()-1);	
			}
			
			String newChar = "-" + oldChar.toLowerCase();
			reFilename = reFilename.replace(oldChar, newChar);
			p.matcher(reFilename);
			m = p.matcher(reFilename);
		}
		if(!reFilename.startsWith("-")){
			reFilename = "-" +reFilename;
		}
		reFilename = reFilename.replace(".mxml", ".html");
		sb.append(reFilename);
		
		System.out.println(sb);
		
		/*return sb.toString();*/

		
	}
	
	public List doConvert(String sourcePath, String targetPath, String root, String type,String serviceType) throws Exception{
		/*String targetPath = "c:/test";*/
	      	
		File target = new File(sourcePath);
		SourceConvert sc = new SourceConvert();
		
		return sc.recurse(target, targetPath, root, type, serviceType);
	}
	
	/**
	 * converting 수행
	 * @param content
	 * @param newFilename
	 * @return
	 * @throws Exception
	 */
	/*
	private String convert(String content, String newFilename) throws Exception {
		String path = new File("").getAbsolutePath();
		
        ScriptEngineManager factory = new ScriptEngineManager();        
        ScriptEngine engine = factory.getEngineByName("JavaScript");
        // 사용 lib 로딩
        engine.eval(new FileReader(path + "/src/main/ui/lib/converter/jsxml/lib/jsxml.js"));
        engine.eval(new FileReader(path + "/src/main/ui/lib/converter/ejs/ejs.js"));
        engine.eval(new FileReader(path + "/src/main/ui/lib/converter/js-beautify/js/lib/beautify-html.js"));
        engine.eval(new FileReader(path + "/src/main/ui/lib/converter/js-beautify/js/lib/beautify.js"));
        engine.eval(new FileReader(path + "/src/main/ui/lib/converter/as3js/lib/as3.js"));
        engine.eval(new FileReader(path + "/src/main/ui/lib/converter/as3js/runtime.js"));
        engine.eval(new FileReader(path + "/src/main/ui/lib/converter/source-convert.js"));
		
        // source-convert.js 의 convert 실행
        Invocable inv = (Invocable) engine;
        String str = (String) inv.invokeFunction("convert", content, newFilename);        
        
        return str;
	}
    */
	
	/**
	 * converting 수행
	 * @param content
	 * @param newFilename
	 * @return
	 * @throws Exception
	 */
	private Map convert(String content, String newFilename, String rootPath, String type, String serverType) throws Exception {
		/*String path = System.getProperty("user.dir");*/
		
		
        ScriptEngineManager factory = new ScriptEngineManager();        
        ScriptEngine engine = factory.getEngineByName("JavaScript");
        // 사용 lib 로딩
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/jsxml/lib/jsxml.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/ejs/ejs.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/js-beautify/js/lib/beautify-html.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/js-beautify/js/lib/beautify.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/as3js/lib/as3.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/as3js/runtime.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/source-convert-config.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/source-convert.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/source-convert-override.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/source-convert-server.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/source-convert-server-able.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/source-convert-sql.js"));
		
        // source-convert.js 의 convert 실행
        Invocable inv = (Invocable) engine;
        String methodName = "convert";
        if("html".equals(type)){
        	methodName = "convert";
        }else if ("server".equals(type)) {
        	if("able".equals(serverType)){
        		methodName = "convertServerAble";
        	}else{
        		methodName = "convertServer";
        	}
		}else if ("sql".equals(type)) {
			methodName = "convertSql";
		}
        String str = "";
        Map result = new HashMap<String,Object>();
        try {
        	if("server".equals(type)){
            	result = (Map) inv.invokeFunction(methodName, content, newFilename);
            }else{
            	str = (String) inv.invokeFunction(methodName, content, newFilename);
            	result.put("result", str);
            	result.put("error", "N");
            }
		} catch (Exception e) {
			// TODO: handle exception
			result.put("error", "Y");
			result.put("error_msg", e.toString());
		}

        return result;
	}
	
	/**
	 * 디렉토리 내 파일을 읽어 변환
	 * @param dirFile
	 * @param depth
	 * @throws Exception
	 */
	/*private void recurse(File dirFile) throws Exception{
		String contents[] = dirFile.list();

		for(int i = 0; i < contents.length; i++){
			File child = new File(dirFile, contents[i]);
			
			if(child.isDirectory()){
				// 디렉토리
				recurse(child);
			} else {
				// 파일 
				if (contents[i].indexOf(".mxml") >= 0 && contents[i].indexOf(".svn-base") == -1){
					this.replaceFileContentsWrite(dirFile.getPath(),contents[i]);
				}
			}
		}
	}
	*/
	
	private List recurse(File dirFile, String targetPath, String root, String type, String serviceType) throws Exception{
		String contents[] = dirFile.list();
		FileSystemView fsv = FileSystemView.getFileSystemView();
		File desti = new File(targetPath);
		List result = new ArrayList();
		//Map<String,Object> resultMap = new HashMap<String,Object>();
		if(!desti.exists()){
			desti.mkdirs(); 
		}

		for(int i = 0; i < contents.length; i++){
			File child = new File(dirFile, contents[i]);
			
			if(child.isDirectory()){
				// 디렉토리
				File targetDesti = new File(targetPath+"/"+fsv.getSystemDisplayName(child));
				if(!targetDesti.exists()){
					targetDesti.mkdirs(); 
				}
				result.addAll(recurse(child, targetDesti.getPath(), root, type, serviceType));
			} else {	
				// 파일
				String extension = "mxml";
				if("html".equals(type)){
					extension = ".mxml";
				}else if ("server".equals(type) || "sql".equals(type)) {
					extension = ".xml";
				}
				if (contents[i].indexOf(extension) >= 0 && contents[i].indexOf(".svn-base") == -1){
					
					result.addAll(this.replaceFileContentsWrite(dirFile.getPath(),contents[i], targetPath, root, type, serviceType));
				}
			}
		}
		return result;
	}	
	
	/**
	 * 변환된 부분을 파일에 기록한다	
	 * @param filePath
	 * @param fileName
	 * @throws ScriptException 
	 * @throws NoSuchMethodException 
	 * @throws Exception
	 */
	/*
	private void replaceFileContentsWrite(String filePath, String fileName) throws Exception{
		
		File file = new File(filePath+"/"+fileName);
        
		String content = readContent(file.getAbsolutePath());
		
		String newFilename = filenameConvert(file.getName());
		
		String result = convert(content, newFilename.replace(".html", ""));
		
        FileStreamWriter fw = new FileStreamWriter(filePath+"/"+newFilename, "UTF-8");
        
        fw.writeLine(result);
        
        fw.close(fileName);
	}
	*/
	
	public void editorToHtml(String path,String rootPath, String fileName, String value) throws ScriptException, NoSuchMethodException {
		
        ScriptEngineManager factory = new ScriptEngineManager();        
        ScriptEngine engine = factory.getEngineByName("JavaScript");
        // 사용 lib 로딩
        
        
		try {
			engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/jsxml/lib/jsxml.js"));
	        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/ejs/ejs.js"));
	        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/js-beautify/js/lib/beautify-html.js"));
	        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/js-beautify/js/lib/beautify.js"));
	        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/as3js/lib/as3.js"));
	        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/as3js/runtime.js"));
	        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/source-convert-config.js"));
	        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/source-convert.js"));
	        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter/source-convert-override.js"));
	        
	        Invocable inv = (Invocable) engine;
	        String methodName = "convert";
	        
	        String result = (String) inv.invokeFunction(methodName, value, fileName);
	        
			FileStreamWriter fw = new FileStreamWriter(path + "/ui/lib/converter/"+fileName+".html", "UTF-8");
			fw.writeLine(result);
	        
	        fw.close(fileName);
	        
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	/**
	 * 변환된 부분을 파일에 기록한다	
	 * @param filePath
	 * @param fileName
	 * @return 
	 * @throws Exception
	 */
	private List replaceFileContentsWrite(String filePath, String fileName, String path, String root, String type, String serviceType) throws Exception{
		List resultList = new ArrayList();
		File file = new File(filePath+"/"+fileName);
        
		String content = readContent(file.getAbsolutePath());
		
		String newFilename = filenameConvert(file.getName());
		
		Map result = convert(content, newFilename.replace(".html", ""), root, type, serviceType);
		String error = "N";
		if(result.get("error") != null){
			error = (String)result.get("error");
		}
		if("Y".equals(error)){
			Map<String,Object> resultMap = new HashMap<String,Object>();
			resultMap.put("result", "N");
	        resultMap.put("originFile", fileName);
	        resultMap.put("convertFile", "");
	        resultMap.put("originPath", filePath);
	        resultMap.put("convertPath", "");
	        resultMap.put("error", result.get("error_msg"));
	        System.out.println(resultMap);
	        resultList.add(resultMap);
		}else{
			if("server".equals(type)){
				if("smart9".equals(serviceType)){
					String serverfileName = file.getName();
					serverfileName = serverfileName.replace(".xml", "");
					serverfileName = serverfileName.replace("service_", "");
					String controllerFileName = filenameConvert(serverfileName, "Controller");
					String serviceFileName = filenameConvert(serverfileName, "Service");
					
					FileStreamWriter fw1 = new FileStreamWriter(path+"/"+controllerFileName, "UTF-8");
					FileStreamWriter fw2 = new FileStreamWriter(path+"/"+serviceFileName, "UTF-8");
		        	
			        fw1.writeLine((String)result.get("controller"));
			        fw2.writeLine((String)result.get("service"));
			        
			        fw1.close(fileName);
			        fw2.close(fileName);
			        Map<String,Object> resultMap = new HashMap<String,Object>();
			        resultMap.put("result", "Y");
			        resultMap.put("originFile", fileName);
			        resultMap.put("convertFile", controllerFileName);
			        resultMap.put("originPath", filePath);
			        resultMap.put("convertPath", path);
			        resultList.add(resultMap);
			        resultMap = new HashMap<String,Object>();
			        resultMap.put("result", "Y");
			        resultMap.put("originFile", fileName);
			        resultMap.put("convertFile", serviceFileName);
			        resultMap.put("originPath", filePath);
			        resultMap.put("convertPath", path);
			        resultList.add(resultMap);
				}else if("able".equals(serviceType)){
					String serverfileName = file.getName();
					serverfileName = serverfileName.replace(".xml", "");
					serverfileName = serverfileName.replace("service_", "");
					String controllerFileName = filenameConvert(serverfileName, "Controller");
					String serviceFileName = filenameConvert(serverfileName, "Service");
					String serviceImplFileName = filenameConvert(serverfileName, "ServiceImpl");
					String daoFileName = filenameConvert(serverfileName, "MDAO");
					
					
					File webDesti = new File(path+"/"+serverfileName);
					if(!webDesti.exists()){
						webDesti.mkdirs(); 
					}
					
					webDesti = new File(path+"/"+serverfileName+"/web");
					if(!webDesti.exists()){
						webDesti.mkdirs(); 
					}
					webDesti = new File(path+"/"+serverfileName+"/service");
					if(!webDesti.exists()){
						webDesti.mkdirs(); 
					}
					webDesti = new File(path+"/"+serverfileName+"/service/dao");
					if(!webDesti.exists()){
						webDesti.mkdirs(); 
					}
					webDesti = new File(path+"/"+serverfileName+"/service/impl");
					if(!webDesti.exists()){
						webDesti.mkdirs(); 
					}
					
					
					FileStreamWriter fw1 = new FileStreamWriter(path+"/"+serverfileName+"/web/"+controllerFileName, "UTF-8");
					FileStreamWriter fw2 = new FileStreamWriter(path+"/"+serverfileName+"/service/"+serviceFileName, "UTF-8");
					FileStreamWriter fw3 = new FileStreamWriter(path+"/"+serverfileName+"/service/impl/"+serviceImplFileName, "UTF-8");
					FileStreamWriter fw4 = new FileStreamWriter(path+"/"+serverfileName+"/service/dao/"+daoFileName, "UTF-8");
		        	
			        fw1.writeLine((String)result.get("controller"));
			        fw2.writeLine((String)result.get("service"));
			        fw3.writeLine((String)result.get("serviceImpl"));
			        fw4.writeLine((String)result.get("dao"));
			        
			        fw1.close(fileName);
			        fw2.close(fileName);
			        fw3.close(fileName);
			        fw4.close(fileName);
			        Map<String,Object> resultMap = new HashMap<String,Object>();
			        resultMap.put("result", "Y");
			        resultMap.put("originFile", fileName);
			        resultMap.put("convertFile", controllerFileName);
			        resultMap.put("originPath", filePath);
			        resultMap.put("convertPath", path);
			        resultList.add(resultMap);
			        
			        resultMap = new HashMap<String,Object>();
			        resultMap.put("result", "Y");
			        resultMap.put("originFile", fileName);
			        resultMap.put("convertFile", serviceFileName);
			        resultMap.put("originPath", filePath);
			        resultMap.put("convertPath", path);
			        resultList.add(resultMap);
			        
			        resultMap = new HashMap<String,Object>();
			        resultMap.put("result", "Y");
			        resultMap.put("originFile", fileName);
			        resultMap.put("convertFile", serviceImplFileName);
			        resultMap.put("originPath", filePath);
			        resultMap.put("convertPath", path);
			        resultList.add(resultMap);
			        
			        resultMap = new HashMap<String,Object>();
			        resultMap.put("result", "Y");
			        resultMap.put("originFile", fileName);
			        resultMap.put("convertFile", daoFileName);
			        resultMap.put("originPath", filePath);
			        resultMap.put("convertPath", path);
			        resultList.add(resultMap);
				}
				
			}else if("sql".equals(type)){
				
				
				newFilename = newFilename.replaceAll("-", "_");
				newFilename = newFilename.replaceAll("sql_", "");
				newFilename = JdbcUtils.convertUnderscoreNameToPropertyName(newFilename);
				
				
				FileStreamWriter fw = new FileStreamWriter(path+"/"+newFilename, "UTF-8");
	        	
		        fw.writeLine((String)result.get("result"));
		        
		        fw.close(fileName);
		        Map<String,Object> resultMap = new HashMap<String,Object>();
		        resultMap.put("result", "Y");
		        resultMap.put("originFile", fileName);
		        resultMap.put("convertFile", newFilename);
		        resultMap.put("originPath", filePath);
		        resultMap.put("convertPath", path);
		        resultList.add(resultMap);
			}else{
				FileStreamWriter fw = new FileStreamWriter(path+"/"+newFilename, "UTF-8");
	        	
		        fw.writeLine((String)result.get("result"));
		        
		        fw.close(fileName);
		        Map<String,Object> resultMap = new HashMap<String,Object>();
		        resultMap.put("result", "Y");
		        resultMap.put("originFile", fileName);
		        resultMap.put("convertFile", newFilename);
		        resultMap.put("originPath", filePath);
		        resultMap.put("convertPath", path);
		        resultList.add(resultMap);
			}
		}
		
		
		return resultList;
		
        
	}		
	
	/**
	 * 변환된 부분을 파일에 기록한다	
	 * @param filePath
	 * @param fileName
	 * @throws Exception
	 */
	/*
	private void replaceFileContentsWrite(String filePath, String fileName, String path) throws Exception{
		
		File file = new File(filePath+"/"+fileName);
        
		String content = readContent(file.getAbsolutePath());
		
		String newFilename = filenameConvert(file.getName());
		
		String result = convert(content, newFilename.replace(".html", ""));
		
        FileStreamWriter fw = new FileStreamWriter(path+"/"+newFilename, "UTF-8");
        	
        fw.writeLine(result);
        
        fw.close(fileName);
	}
	*/	
	
	/**
	 * 변환 대상 파일을 읽는다
	 * @param fileName
	 * @return
	 * @throws IOException
	 */
	private String readContent(String fileName) throws IOException {
        BufferedReader br = new BufferedReader(new FileReader(fileName));
        StringBuilder sb = new StringBuilder();
        char[] buf = new char[1024];  
        
        while (br.read(buf) > 0) {
            sb.append(buf);
            buf = new char[1024];
        }
        
        return sb.toString();
    } 

	
	/**
	 * mxml파일명을 html파일명으로 변경한다
	 * @param filename
	 * @return
	 */
	private String filenameConvert(String filename) {
		StringBuffer sb = new StringBuffer();
		
		sb.append(filename.substring(0, 2).toLowerCase());
		String reFilename = filename.substring(2);
		
		Pattern p = Pattern.compile("[A-Z]+");
		Matcher m = p.matcher(reFilename);
		
		while(m.find()) {
			String oldChar = m.group(0);
			
			char a = reFilename.charAt(oldChar.length()+reFilename.indexOf(oldChar));
			String aa = String.valueOf(a);
			if(aa.equals("_") || aa.equals("-") ){
				String newChar = oldChar.toLowerCase();
				reFilename = reFilename.replace(oldChar, newChar);
				continue;
			}
			if(reFilename.indexOf(oldChar) > 0){
				char b = reFilename.charAt(reFilename.indexOf(oldChar) - 1);
				String bb = String.valueOf(b);
				if(bb.equals("_") || bb.equals("-") ){
					String newChar = oldChar.toLowerCase();
					reFilename = reFilename.replace(oldChar, newChar);
					continue;
				}
			}
			
			if(oldChar.length() > 1){
				if(reFilename.indexOf(oldChar)+oldChar.length() == reFilename.indexOf(".mxml")){
					oldChar = oldChar.substring(0, oldChar.length());
				}else{
					oldChar = oldChar.substring(0, oldChar.length()-1);
				}
			}
			
			String newChar = "-" + oldChar.toLowerCase();
			reFilename = reFilename.replace(oldChar, newChar);
			p.matcher(reFilename);
			m = p.matcher(reFilename);
		}
		if(!reFilename.startsWith("-")){
			reFilename = "-" +reFilename;
		}
		reFilename = reFilename.replace(".mxml", ".html");
		sb.append(reFilename);
		
		/*
		
		sb.append(filename.substring(0, 2).toLowerCase());		
		
		String reFilename = filename.substring(2);
		
		Pattern p = Pattern.compile("[A-Z]+");
		Matcher m = p.matcher(reFilename);
		
		while(m.find()) {
			String oldChar = m.group(0);
			if(oldChar.length() > 1){
				oldChar = oldChar.substring(0, oldChar.length()-1);	
			}
			
			String newChar = "-" + oldChar.toLowerCase();
			reFilename = reFilename.replace(oldChar, newChar);
			p.matcher(reFilename);
			m = p.matcher(reFilename);
		}
		reFilename = reFilename.replace(".mxml", ".html");
		sb.append(reFilename);*/
		
		return sb.toString();
	}
	
	private String filenameConvert(String filename, String type) {
		String replacedFilename = filename.replaceAll("-", "_");
		String result = JdbcUtils.convertUnderscoreNameToPropertyName(replacedFilename);
		result = WordUtils.capitalize(result);
		result = result+type+".java";
		
		return result;
	}	
	
	/**
	 * 파일 기록
	 */
	public class FileStreamWriter
	{
		private BufferedWriter m_bWriter;
		
		// Create BufferedReader : System encode
		public FileStreamWriter(String strFilename) throws Exception
		{
			this.m_bWriter = new BufferedWriter( new FileWriter(strFilename) );
		}
		
		// Create BufferedReader : user encode
		public FileStreamWriter(String strFilename, String strCharset) throws FileNotFoundException, UnsupportedEncodingException,IOException
		{
			this.m_bWriter = new BufferedWriter(
								new OutputStreamWriter(
									new FileOutputStream( new File(strFilename) ),
									strCharset
								)
							);
			writeBOM(strCharset);
		}
		
		// write BOM
		private void writeBOM(String strCharset) throws IOException
		{
			if( strCharset.compareTo("UTF-8"   ) == 0 ||
				strCharset.compareTo("UTF-16LE") == 0 ||
				strCharset.compareTo("UTF-16BE") == 0 )
			{
				// write BOM (EF BB BF : UTF-16BE -> "65279")
				this.m_bWriter.write(65279);
			}
		}

		// write file
		public void writeLine(String strLine) throws IOException
		{
			this.m_bWriter.write(strLine);
			this.m_bWriter.newLine();
		}
		
		// close file
		public void close(String name) throws IOException
		{
			if( this.m_bWriter != null )
			{
				this.m_bWriter.close();
				this.m_bWriter = null;
			}
		}
	}

	
}
