<%
    response.setHeader("Pragma","no-cache"); 
    response.setDateHeader("Expires",0); 
    response.setHeader("Cache-Control","no-store"); 
%>  
<%@ page contentType="text/html;charset=utf-8"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.net.*,java.io.*" %>
<%
    Map result = (Map)request.getAttribute("result");
	List appList = (List)request.getAttribute("appList");
	String cntr_no = (String)result.get("cntr_no");
	String cntr_rev = (String)result.get("cntr_rev");
    String cntr_prog_sts = (String)result.get("cntr_prog_sts");
    String content = (String)result.get("content");
    String vd_nm = (String)result.get("vd_nm");
    String print_yn = (String)result.get("print_yn");
%>

<HTML>

<HEAD>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<TITLE>계약번호 : <%=cntr_no%> 차수 : <%=cntr_rev%></TITLE>

	<link rel="stylesheet" type="text/css" href="/resources/econtract/common/css/print.css" >
	<style type="text/css" media="print">
  	table.breakpoint{
    	page-break-after: always;
    	page-break-inside: avoid;
  	}
	</style>

	<script language="javascript"> 
    	function printWindow(){
			<% if(print_yn.equals("Y")){ %>    	
				if(navigator.userAgent.indexOf("Chrome") != -1) {	
					this.print();
				} else {
					window.parent.frames['poupJspIFrame'].focus();
					window.parent.frames['poupJspIFrame'].print();
				}
			<% } %>        
    	}
	</script>
	</HEAD>

	<body topmargin="40" leftmargin="40" rightmargin="40" bottommargin="40" bgcolor="#FFFFFF" text="#000000" onload="printWindow();">
		<div id="printArea">
			<table width="100%" align=center class="breakpoint">
				<tr>
					<td>
						<%=content%>
					</td>
				</tr>
				<tr><td>&nbsp;</td></tr>
	
	<%if(cntr_prog_sts.equals("CP")) { %>
				<tr><td>
				<b> &nbsp;&nbsp;본 계약서는 전자서명법 제3조 및 전자거래기본법 제5조,제6조에 근거하여 (주)엠로와  <%=vd_nm%>에서 
				 	&nbsp;&nbsp;전자서명으로 체결된 전자계약서 입니다. 
					&nbsp;&nbsp;본 계약서에 대한 문의는 (주)엠로 담당부서에 문의하시기 바랍니다.</b>
				</td></tr>
	<%}else{%>
				<tr><td>
				<b> &nbsp;&nbsp;본 계약서는 (주)엠로 전자계약 시스템에서 작성된 전자문서입니다.
					&nbsp;&nbsp;전자서명이 이루어지지 않은 상태로 적법한 문서로써 유효하지 않습니다.
					&nbsp;&nbsp;본 계약서에 대한 문의는 (주)엠로 담당부서에 문의하시기 바랍니다.</b>
				</td></tr>
	<% } %>
			</table> 
	<%if(appList.size() > 0){
		for(int i = 0 ; i < appList.size() ; i++){
			Map app = (Map)appList.get(i);
			if(appList.size() -1 == i){%>
   			<table width="100%" align="center">
   			<% }else{ %>
   			<table width="100%" align="center" class="breakpoint">
  			<% } %>
			<tr><td align=center>								
			<tr><td align=left>
				<%=(String)app.get("app_content")%> 
			</td></tr>
			<tr><td>&nbsp;</td></tr>
	
			<%if(cntr_prog_sts.equals("CP")) { %>
			<tr><td>
			<b> &nbsp;&nbsp;본 문서는 전자서명법 제3조 및 전자거래기본법 제5조,제6조에 근거하여 (주)엠로와  <%=vd_nm%>에서 
			 	&nbsp;&nbsp;전자서명으로 체결된 전자계약서의 첨부문서입니다. 
				&nbsp;&nbsp;본 계약 첨부서류에 대한 문의는 (주)엠로 담당부서에 문의하시기 바랍니다.</b>
			</td></tr>
			<%}else{%>
			<tr><td>
			<b> &nbsp;&nbsp;본 문서는 (주)엠로 전자계약 시스템에서 작성된 전자문서입니다.
				&nbsp;&nbsp;전자서명이 이루어지지 않은 상태로 적법한 문서로써 유효하지 않습니다.
				&nbsp;&nbsp;본 계약 첨부서류에 대한 문의는 (주)엠로 담당부서에 문의하시기 바랍니다.</b>
			</td></tr>
			<% } %>
		</table>
		<%} 
	}%>
		</div>
	</body>
</html>