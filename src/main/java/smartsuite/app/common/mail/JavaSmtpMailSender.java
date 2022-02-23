package smartsuite.app.common.mail;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Map;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.inject.Inject;
import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;
import javax.mail.util.ByteArrayDataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import smartsuite.upload.core.entity.FileItem;
import smartsuite.upload.core.entity.FileList;
import smartsuite.upload.core.service.FileService;

@Service
public class JavaSmtpMailSender {

	static final Logger LOG = LoggerFactory.getLogger(JavaSmtpMailSender.class);
	
	@Value ("#{mail['mail.smtp.encoding']}")
	String encoding;

	@Value ("#{mail['mail.smtp.port']}")
	int port;

	@Value ("#{mail['mail.smtp.host']}")
	String host;

	@Value ("#{mail['mail.smtp.username']}")
	String username;
	
	@Value ("#{mail['mail.smtp.password']}")
	String password;
	
	@Inject
	FileService fileService;

	boolean debug; //Session Debug 
	
	protected boolean requireAuthenticate() {
		return username != null && password != null;
	}

	protected Authenticator createAuthenticator() {
		return new DefaultAuthenticator(username, password);
	}

	protected Properties createProperties() {
		Properties properties = new Properties();
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", port);
		properties.put("mail.smtp.auth", requireAuthenticate());
		return properties;
	}

	private Address createAddress(String address, String name) throws UnsupportedEncodingException {
		InternetAddress ia = new InternetAddress(address, name);
		
		String personal = ia.getPersonal();
		if(personal != null){
			ia.setPersonal(personal, encoding);
		}
		return ia;
	}

	public void send(Map<String, Object> mail) throws MessagingException, UnsupportedEncodingException {
		Session session = null;
		if (requireAuthenticate()) {
			try {
				session = Session.getDefaultInstance(createProperties(), createAuthenticator());
			} catch (SecurityException exception) {
				LOG.debug("메일서버(SMTP)가 연동되어 있지 않습니다.");
			}
			 
		} else {
			session = Session.getDefaultInstance(createProperties());
		}
		session.setDebug(debug);
		MimeMessage message = new MimeMessage(session);
		Multipart multiPart = new MimeMultipart();

		Address from = createAddress((String)mail.get("from_addr"), (String)mail.get("from_nm"));
		message.setFrom(from);
		message.setSubject((String)mail.get("mail_tit"), encoding);
		
		/*
		 * 다중 전송시 
		RecipientType recipientType = null;
		for (MailReceiver receiver : mail.getReceivers()) {
			recipientType = receiver.getKind();
			
			switch (recipientType.toString()) {
			case "To":
				recipientType = RecipientType.TO;
				break;
			case "Cc":
				recipientType = RecipientType.CC;
				break;
			case "Bcc":
				recipientType = RecipientType.BCC;
				break;
			}
			message.addRecipient(recipientType,
					createAddress(receiver.getToAddress()));
		}*/
		
		message.addRecipient(RecipientType.TO, createAddress((String)mail.get("to_addr"), (String)mail.get("to_nm")));
		
		MimeBodyPart body = new MimeBodyPart();
		body.setHeader("Content-Transfer-Encoding", "base64");
		body.setContent((String)mail.get("mail_cont"), "text/html; charset=\""
				+ encoding + "\"");
		multiPart.addBodyPart(body);

		/*
		 * 첨부파일 존재시
		 * */
		FileList fileList;
		try {
			fileList = fileService.findDownloadList((String)mail.get("grp_cd"));
		
			for (FileItem fileItem : fileList.getItems()) {
				ByteArrayDataSource dataSource;
				dataSource = new ByteArrayDataSource(fileItem.toInputStream(), "application/octet-stream");
				String attachmentName = MimeUtility.encodeText(
						fileItem.getName(), encoding, "B");
				MimeBodyPart attachmentBody = new MimeBodyPart();
				attachmentBody.setHeader("Content-Transfer-Encoding", "base64");
				attachmentBody.setDataHandler(new DataHandler(dataSource));
				attachmentBody.setFileName(attachmentName);
		
				multiPart.addBodyPart(attachmentBody);
			}
		} catch (Exception e) {
			LOG.error(e.getMessage());
		}
		
		message.setContent(multiPart);
		message.setSentDate(new Date());
		
		Transport.send(message);
	}

	public static class DefaultAuthenticator extends Authenticator {

		private final PasswordAuthentication authentication;

		public DefaultAuthenticator(String username, String password) {
			super();
			this.authentication = new PasswordAuthentication(username, password);
		}

		protected PasswordAuthentication getPasswordAuthentication() {
			return this.authentication;
		}
	}
}
