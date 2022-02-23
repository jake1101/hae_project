<!--
	Filename : signgate_common.jsp
-->

<%@ page import="signgate.crypto.util.*" %>

<%!

	//public static final String CRLCacheDirectory = "http://localhost:8080/demotest/cert/crl/";
	public static final String CRLCacheDirectory = "C:/Program Files/Apache Software Foundation/Tomcat 7.0/webapps/ROOT/WebUI/html/cert/crl/";
	//public static final String ServerCertPath = "D:\\SG_ToolKit\\cert\\pem\\";
	//public static final String ServerCertPath = "D:\\SG_ToolKit\\cert\\";
	//public static final String ServerCertPath = "http://localhost:8080/demotest/cert/";
	public static final String ServerCertPath = "C:/Program Files/NPKI/CrossCert/USER/cn=엠로테스트(법인),ou=테스트,ou=외부업체용,ou=AccreditedCA,o=CrossCert,c=KR/";
	public static final String ServerSignCertFile = ServerCertPath + "signCert.der";	// ???? ???????? ?????? ?????
	public static final String ServerSignKeyFile = ServerCertPath + "signPri.key";		// ???? ???????? ????? ?????
	public static final String ServerKmCertFile = ServerCertPath + "kmCert.der";		// ???? ?????? ?????? ?????
	public static final String ServerKmKeyFile = ServerCertPath + "kmPri.key";			// ???? ?????? ????? ?????
	//public static final String ServerKeyPassword = "a123456A"; // ???? ??????(?????) ??Ð¹??
	public static final String ServerKeyEncPasswordPath = ServerCertPath + "encPasswd";	// ?????? ???? ??????(?????) ??Ð¹??
	// ???? ???? ?????? ???? ????
	public static final String ServerEncryptAlg = "SEED/CBC";		// SEED/CBC or ARIA/CBC


	// ????? ?????? ??a OID ????? (???? ?????? OID ?????)
	public static final String[] AllowedPolicyOIDs = {
		  "1.2.410.200004.5.2.1.2",   //한국정보인증(개인)
	        "1.2.410.200004.5.2.1.1",   //한국정보인증(법인)
	        "1.2.410.200004.5.1.1.5",   //증권전산(개인)
	        "1.2.410.200004.5.1.1.7",   //증권전산(법인)
	        "1.2.410.200005.1.1.1",     //금융결제원(개인)
	        "1.2.410.200005.1.1.5",     //금융결제원(법인)
	        "1.2.410.200004.5.3.1.9",   //한국전산원(개인)
	        "1.2.410.200004.5.3.1.2",   //한국전산원(법인)
	        "1.2.410.200004.5.3.1.1",   //한국전산원(기관)
	        "1.2.410.200004.5.4.1.1",   //전자인증(개인)
	        "1.2.410.200004.5.4.1.2",   //전자인증(법인)
	        "1.2.410.200012.1.1.1",     //한국무역정보통신(개인)
	        "1.2.410.200012.1.1.3",     //한국무역정보통신(법인)
	};

	byte[] ServerSignCert = null;
	byte[] ServerSignKey = null;
	byte[] ServerKmCert = null;
	byte[] ServerKmKey = null;
	String ServerSignCertPem = "";
	String ServerKmCertPem = "";
	String ServerKeyEncPassword = "";
	


%>

<%
	response.setHeader("Cache-Control","no-cache,no-store");
	response.setHeader("Pragma","no-cache,no-store");

	try
		{
			
			ServerSignCert = FileUtil.readBytesFromFileName(ServerSignCertFile);
			ServerSignKey = FileUtil.readBytesFromFileName(ServerSignKeyFile);
			ServerKmCert = FileUtil.readBytesFromFileName(ServerKmCertFile);
			ServerKmKey = FileUtil.readBytesFromFileName(ServerKmKeyFile);
			
			
			ServerSignCertPem = CertUtil.derToPem( ServerSignCert );
			ServerKmCertPem = CertUtil.derToPem( ServerKmCert );

			
			ServerKeyEncPassword = FileUtil.readStringFromFileName(ServerKeyEncPasswordPath);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
%>

<script language='javascript' src='./sg_scripts/sg_basic.js'></script>
<script language='javascript' src='./sg_scripts/sg_error.js'></script>
<script language='javascript' src='./sg_scripts/sg_util.js'></script>
<script language='javascript' src='./sg_scripts/sg_cert.js'></script>
<script language='javascript' src='./sg_scripts/sg_sign.js'></script>
<script language='javascript' src='./sg_scripts/sg_encrypt.js'></script>
<script language='javascript' src='./sg_scripts/sg_pkcs7.js'></script>
<script language='javascript' src='./sg_scripts/sg_hash.js'></script>
<script language='javascript' src='./sg_scripts/sg_base64.js'></script>

