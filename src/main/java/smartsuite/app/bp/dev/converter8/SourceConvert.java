package smartsuite.app.bp.dev.converter8;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.servlet.http.HttpServletRequest;


public class SourceConvert {
	
	private boolean overriteIfExist = true;
	
	private boolean generateRoot = false;
	
	public boolean isOverriteIfExist() {
		return overriteIfExist;
	}

	public void setOverriteIfExist(boolean overriteIfExist) {
		this.overriteIfExist = overriteIfExist;
	}

	public boolean isGenerateRoot() {
		return generateRoot;
	}

	public void setGenerateRoot(boolean generateRoot) {
		this.generateRoot = generateRoot;
	}

	private String readFile(String file) throws IOException {
	    BufferedReader reader = new BufferedReader(new FileReader (file));
	    String         line = null;
	    StringBuilder  stringBuilder = new StringBuilder();
	    String         ls = System.getProperty("line.separator");

	    try {
	        while((line = reader.readLine()) != null) {
	            stringBuilder.append(line);
	            stringBuilder.append(ls);
	        }

	        return stringBuilder.toString();
	    } finally {
	        reader.close();
	    }
	}
	
	public static void main(String[] args) throws Exception{
		
		String sourcePath = "C:\\dev\\etna\\eclipse-jee-kepler-SR2-win32-x86_64\\bpp9.1\\etnajs\\pro\\app\\";
		String targetPath = "C:\\dev\\etna\\eclipse-jee-kepler-SR2-win32-x86_64\\bpp9.1\\standard-common\\src\\main\\ui\\convert8\\test";
		
		SourceConvert sc = new SourceConvert();
		sc.doConvert("C:\\dev\\etna\\eclipse-jee-kepler-SR2-win32-x86_64\\bpp9.1\\standard-common\\", sourcePath, targetPath);
		
		

		
	}
	
	private static String forBiddenKeyWords[] = {"default", "class", "implements", "extends"};
	
	//scriptEngine 실행 시 오류 발생하는 키워드 들을 제거 한다.
	private String processScript(String script){
		
		for(int i = 0; i < forBiddenKeyWords.length; i++){
			String keyWord = forBiddenKeyWords[i];
			script = script.replaceAll(" "+keyWord+": ", "\""+keyWord+"-converted\": ");
		}
		
		
		
		return script;
	}
	
	public static String getBaseUrl(HttpServletRequest request) {
		String scheme = request.getScheme() + "://";
	    String serverName = request.getServerName();
	    String serverPort = (request.getServerPort() == 80) ? "" : ":" + request.getServerPort();
	    String contextPath = request.getContextPath();
	    return scheme + serverName + serverPort + contextPath;
	}
	
	public List<Map> doConvert(HttpServletRequest request, String sourcePath, String targetPath) throws Exception {
		String rootPath = getBaseUrl(request);
		ScriptEngineManager factory = new ScriptEngineManager();        
        ScriptEngine engine = factory.getEngineByName("JavaScript");
        // 사용 lib 로딩
        engine.eval(executePost(rootPath+"/ui/lib/converter8to9/libs/ejs/ejs.js", ""));
        engine.eval(executePost(rootPath+"/ui/lib/converter8to9/libs/js-beautify/js/lib/beautify-html.js", ""));
        engine.eval(executePost(rootPath+"/ui/lib/converter8to9/libs/js-beautify/js/lib/beautify.js", ""));
        engine.eval(executePost(rootPath+"/ui/lib/converter8to9/libs/jsxml/lib/jsxml.js", ""));
        engine.eval(executePost(rootPath+"/ui/lib/converter8to9/collector.js", ""));
        engine.eval(executePost(rootPath+"/ui/lib/converter8to9/converter.js", ""));
        engine.eval(executePost(rootPath+"/ui/lib/converter8to9/override.js",""));
        engine.eval(executePost(rootPath+"/ui/lib/converter8to9/folderconvertevaluator.js", ""));
        /*
		engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/libs/ejs/ejs.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/libs/js-beautify/js/lib/beautify-html.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/libs/js-beautify/js/lib/beautify.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/libs/jsxml/lib/jsxml.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/collector.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/converter.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/folderconvertevaluator.js"));
        */
        
        Invocable inv = (Invocable) engine;
        
        //String content = "";
        
        
        
        List<File> files = new ArrayList<File>();
        File sourceDir = new File(sourcePath);
        if(!sourceDir.isDirectory()){
        	throw new RuntimeException("디렉토리가 아닙니다.");
        }
        
		this.findFileByExtension(files, sourceDir, ".js");
		
		if(files.size() == 0){
			throw new RuntimeException("js파일이 없습니다.");
		}
		List<Map> resultMsgs = new ArrayList<Map>();
        
        for(File file : files){
        	try{
        		String script = readFile(file.getAbsolutePath());
        		script = processScript(script);
        		inv.invokeFunction("addResource", script);
        	}catch(Exception e){
        		Map resultMsg = new HashMap<String,Object>();
            	resultMsg.put("error", true);
        		e.printStackTrace();
        		resultMsg.put("message", file.getAbsolutePath() + "를 읽는 중 오류 발생");
        		System.out.println(file.getAbsolutePath() + "를 읽는 중 오류 발생");
        		resultMsgs.add(resultMsg);
        	}
        	
        	
        }
        
        
        Object result = inv.invokeFunction("doSourceConvert");
        
        
        Object[] array = ((List)result).toArray();
        
        
        for(int i =0; i< array.length; i++){
        	
        	Map returnMap = (Map)array[i];
        	Map resultMsg = new HashMap<String,Object>();
        	resultMsg.put("error", true);
        	if((Boolean)returnMap.get("error")){
        		resultMsg.put("message", returnMap.get("message"));
        	}else{
        		String targetFilePath = targetPath+"/"+returnMap.get("path")+"/"+returnMap.get("moduleName")+".html";
        		
        		if(new File(targetFilePath).exists() && !overriteIfExist){
        			resultMsg.put("message", targetFilePath +"에 파일이 존재해 "+returnMap.get("className")+"의 변환 소스를 덮어씌우지 않았습니다.");
        			resultMsg.put("error", false);
        		}else{
        			FileStreamWriter fw = new FileStreamWriter(targetFilePath, "UTF-8");
    	        	fw.writeLine((String)returnMap.get("html"));
    	        	resultMsg.put("message", returnMap.get("message"));
    	        	resultMsg.put("error", false);
    		        fw.close();
        		}
        	}
        	resultMsgs.add(resultMsg);
        }
        
        
        return resultMsgs;
	}
	
	public List<Map> doConvert(String rootPath, String sourcePath, String targetPath) throws Exception {
		
		
		
		ScriptEngineManager factory = new ScriptEngineManager();        
        ScriptEngine engine = factory.getEngineByName("JavaScript");
        // 사용 lib 로딩
        /*
        engine.eval(executePost(rootPath+"ui/lib/converter8to9/libs/ejs/ejs.js", ""));
        engine.eval(executePost(rootPath+"ui/lib/converter8to9/libs/js-beautify/js/lib/beautify-html.js", ""));
        engine.eval(executePost(rootPath+"ui/lib/converter8to9/libs/js-beautify/js/lib/beautify.js", ""));
        engine.eval(executePost(rootPath+"ui/lib/converter8to9/libs/jsxml/lib/jsxml.js", ""));
        engine.eval(executePost(rootPath+"ui/lib/converter8to9/collector.js", ""));
        engine.eval(executePost(rootPath+"ui/lib/converter8to9/converter.js", ""));
        engine.eval(executePost(rootPath+"ui/lib/converter8to9/folderconvertevaluator.js", ""));
        */
        
		engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/libs/ejs/ejs.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/libs/js-beautify/js/lib/beautify-html.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/libs/js-beautify/js/lib/beautify.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/libs/jsxml/lib/jsxml.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/collector.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/converter.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/override.js"));
        engine.eval(new FileReader(rootPath + "src/main/ui/lib/converter8to9/folderconvertevaluator.js"));
        
        
        Invocable inv = (Invocable) engine;
        
        //String content = "";
        
        
        
        List<File> files = new ArrayList<File>();
        File sourceDir = new File(sourcePath);
        if(!sourceDir.isDirectory()){
        	throw new RuntimeException("디렉토리가 아닙니다.");
        }
        
		this.findFileByExtension(files, sourceDir, ".js");
		
		if(files.size() == 0){
			throw new RuntimeException("js파일이 없습니다.");
		}
		List<Map> resultMsgs = new ArrayList<Map>();
        
        for(File file : files){
        	try{
        		String script = readFile(file.getAbsolutePath());
        		script = processScript(script);
        		System.out.println(file.getAbsolutePath() + "를 읽는 중");
        		inv.invokeFunction("addResource", script);
        		System.out.println(file.getAbsolutePath() + "읽기 완료");
        	}catch(Exception e){
        		Map resultMsg = new HashMap<String,Object>();
            	resultMsg.put("error", true);
        		e.printStackTrace();
        		resultMsg.put("message", file.getAbsolutePath() + "를 읽는 중 오류 발생");
        		System.out.println(file.getAbsolutePath() + "를 읽는 중 오류 발생");
        		resultMsgs.add(resultMsg);
        	}
        	
        	
        }
        
        
        Object result = inv.invokeFunction("doSourceConvert");
        
        
        Object[] array = ((List)result).toArray();
        
        
        for(int i =0; i< array.length; i++){
        	
        	Map returnMap = (Map)array[i];
        	Map resultMsg = new HashMap<String,Object>();
        	resultMsg.put("error", true);
        	if((Boolean)returnMap.get("error")){
        		resultMsg.put("message", returnMap.get("message"));
        	}else{
        		String targetFilePath = targetPath+(generateRoot ? "/"+returnMap.get("rootName") : "")+"/"+returnMap.get("path")+"/"+returnMap.get("moduleName")+".html";
        		
        		if(new File(targetFilePath).exists() && !overriteIfExist){
        			resultMsg.put("message", targetFilePath +"에 파일이 존재해 "+returnMap.get("className")+"의 변환 소스를 덮어씌우지 않았습니다.");
        			resultMsg.put("error", false);
        		}else{
        			FileStreamWriter fw = new FileStreamWriter(targetFilePath, "UTF-8");
    	        	fw.writeLine((String)returnMap.get("html"));
    	        	resultMsg.put("message", returnMap.get("message"));
    	        	resultMsg.put("error", false);
    		        fw.close();
        		}
        	}
        	resultMsgs.add(resultMsg);
        }
        
        
        return resultMsgs;
	}
	
	public static String executePost(String targetURL, String urlParameters) {
		  HttpURLConnection connection = null;

		  try {
		    //Create connection
		    URL url = new URL(targetURL);
		    connection = (HttpURLConnection) url.openConnection();
		    connection.setRequestMethod("POST");
		    connection.setRequestProperty("Content-Type", "application/javascript");

		    connection.setRequestProperty("Content-Length",Integer.toString(urlParameters.getBytes().length));  

		    connection.setUseCaches(false);
		    connection.setDoOutput(true);

		    //Send request
		    DataOutputStream wr = new DataOutputStream (
		        connection.getOutputStream());
		    wr.writeBytes(urlParameters);
		    wr.close();

		    //Get Response  
		    InputStream is = connection.getInputStream();
		    BufferedReader rd = new BufferedReader(new InputStreamReader(is));
		    StringBuilder response = new StringBuilder(); // or StringBuffer if Java version 5+
		    String line;
		    while ((line = rd.readLine()) != null) {
		      response.append(line);
		      response.append('\r');
		    }
		    rd.close();
		    return response.toString();
		  } catch (Exception e) {
		    e.printStackTrace();
		    return null;
		  } finally {
		    if (connection != null) {
		      connection.disconnect();
		    }
		  }
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
	
	public class FileStreamWriter
	{

		private void createFile(String path) {
		    try {
		        File file = new File(path);
		        if (!file.exists()) {
		        	file.getParentFile().mkdirs();
		            file.createNewFile();
		        } else {
		            FileOutputStream writer = new FileOutputStream(path);
		            writer.write("".getBytes());
		            writer.close();
		        }
		    } catch (IOException e) {
		        e.printStackTrace();
		    }
		}
		private BufferedWriter m_bWriter;
		
		// Create BufferedReader : System encode
		public FileStreamWriter(String strFilename) throws Exception
		{
			createFile(strFilename);
			
			this.m_bWriter = new BufferedWriter( new FileWriter(strFilename) );
			
			
		}
		
		// Create BufferedReader : user encode
		public FileStreamWriter(String strFilename, String strCharset) throws FileNotFoundException, UnsupportedEncodingException,IOException
		{
			createFile(strFilename);
			
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
			if( this.m_bWriter != null ){
				this.m_bWriter.write(strLine);
				this.m_bWriter.newLine();
			}
		}
		
		// close file
		public void close() throws IOException
		{
			if( this.m_bWriter != null )
			{
				this.m_bWriter.close();
				this.m_bWriter = null;
			}
		}
	}

	
}
