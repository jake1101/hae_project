<%@ page contentType="text/html;charset=utf-8"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.io.*" %>
<%@ page import="org.apache.commons.io.FileUtils" %>
<%
	File pdfFile = null;
	byte[] pdfByteArray = null;
	OutputStream outputStream = null;
	Writer writer = null;
	
	try{
		Map manualInfo = (Map)request.getAttribute("manualInfo");
		String fileUploadPath = (String)manualInfo.get("file_upload_path");
		String attFilePath = (String)manualInfo.get("att_file_path");
		
		pdfFile = new File(fileUploadPath + attFilePath);
		
		if(pdfFile.exists() ){
			out.clear();
			out=pageContext.pushBody();
			
			pdfByteArray = FileUtils.readFileToByteArray(pdfFile);
			
			response.setContentType("application/pdf");
			outputStream = response.getOutputStream();
			outputStream.write(pdfByteArray);
			outputStream.flush();
		}else{
			response.setContentType("text/html");
			writer = response.getWriter();
			writer.write("게시된 매뉴얼이 존재하지 않습니다.");
			writer.flush();
		}
	}catch(Exception e){
		e.printStackTrace();
	}finally{
		if(outputStream != null){
			outputStream.close();
		}
		
		if(writer != null){
			writer.close();
		}
	}
	
%>

<HTML>

<HEAD>
	<script language="javascript"></script>
</HEAD>

<body>
</body>
</html>
