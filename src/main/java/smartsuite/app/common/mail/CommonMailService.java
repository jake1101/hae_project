package smartsuite.app.common.mail;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.Future;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import smartsuite.app.bp.admin.template.TemplateService;
import smartsuite.app.common.TemplateGeneratorService;

/**
 * 공통 메일 API 작성
 *
 * @author JongHyeok Choi
 * @see 
 * @FileName CommonMailService.java
 * @package smartsuite.app.common.mail
 * @Since 2016. 8. 1
 * @변경이력 : [2016. 8. 1] JongHyeok Choi 최초작성
 */
@Service
@SuppressWarnings ({ "unchecked" })
public class CommonMailService {

	static final Logger LOG = LoggerFactory.getLogger(CommonMailService.class);
	
	/** The sql session. */
	@Inject
	private SqlSession sqlSession;
	
	/** Template */
	@Inject
	private TemplateGeneratorService templateGeneratorService; 
	
	@Inject
	private TemplateService templateService;
	
	/** SMTP  */
	@Inject
	private JavaSmtpMailSender javaSmtpMailSender;
	
	/** Mail Sender Default Email Address */
	@Value ("#{mail['mail.sender.address']}")
	private String fromAddress;
	
	/** Mail Sender Default Name */
	@Value ("#{mail['mail.sender.name']}")
	private String fromName;
	
	/** Mapper Namespace */
	private static final String NAMESPACE = "mail.";
	
	/**
	 * 
	 * (비동기 방식)
	 * 메일 단일 전송
	 * 
	 *
	 * @author : JongHyeok Choi
	 * @param 메일 Key, 메일 내용
	 * @return void
	 * @Date : 2016. 8. 1
	 * @Method Name : addMail
	 */
	@Async 
	public Future<String> addMail(String mailKey, Map<String, Object> mail) {
		List<Map<String, Object>> mailList = new ArrayList<Map<String, Object>>();
		
		if(mail == null || mail.isEmpty()) {
			return new AsyncResult<String>("fail");
		}
		
		mailList.add(mail);
		addMail(mailKey, mailList);

		return new AsyncResult<String>("success");
	}
	
	/**
	 * 
	 * (비동기 방식)
	 * 보낼 메일을 ESAMAIL에 저장
	 * 실시간 전송일 경우 바로 전송
	 *
	 * @author : JongHyeok Choi
	 * @param 메일 Key, 메일 내용
	 * @return void
	 * @Date : 2016. 8. 1
	 * @Method Name : addMail
	 */
	@Async
	public Future<String> addMail(String mailKey, List<Map<String, Object>> mailList) {
		
		
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("mail_set_id", mailKey);
		Map<String, Object> mail = sqlSession.selectOne(NAMESPACE + "findListMailByMailId", param);
		
		// 템플릿 기초 아이디가 없을 경우 이메일로 셋팅
		if(mail.get("tmp_cls") == null || "".equals(mail.get("tmp_cls")) ){
			mail.put("tmp_cls", "TM"); // 이메일
		}
		
		Map<String, Object> tmp = templateService.findTemplateBaseById(mail);
		
		//useYn이 N일 경우 데이터 생성 X
		String useYn = (String) mail.get("use_yn");
		if("N".equals(useYn)) {
			return new AsyncResult<String>("not use");
		}                                                                     
		
		try {
			
			//Store Mail
			for(Map<String, Object> row : mailList){
				
				row.put("mail_id"		, UUID.randomUUID().toString());
				row.put("mail_set_id"	, mailKey);
				row.put("mail_tit"		, mail.get("mail_set_nm"));
				row.put("to_nm"			, row.get("to_nm")); 	//수신자 이름
				row.put("to_addr"		, row.get("to_addr")); 	//수신자 주소
				row.put("from_nm"		, row.get("from_nm")   == null ? fromName    : row.get("from_nm"));	//송신자 이름
				row.put("from_addr"		, row.get("from_addr") == null ? fromAddress : row.get("from_addr"));//송신자 주소
			
				//FreeMaker to HTML
				String mail_cont = templateGeneratorService.mailGenerate(mailKey, row.get("data"));
				tmp.put("contents", mail_cont);
				row.put("mail_cont",templateGeneratorService.generate(mailKey, (String)tmp.get("tmp_bas_cont"), tmp));
	
				//DB Insert
				insertEsamail(row);
			}
			
			String sendClass = (String)mail.get("snd_cls");
			
			//실시간 전송, 배치일 경우 스케쥴러에 의해 전송
			if("R".equals(sendClass)) {  
				realTimeTransfer(mailList);
			}
		
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	
		
		return new AsyncResult<String>("success");
	}
	
	
	/**
	 * 메일 실시간 전송
	 *
	 * @author : JongHyeok Choi
	 * @param 메일 내용
	 * @return void
	 * @Date : 2016. 8. 1
	 * @Method Name : realTimeTransfer
	 */
	private void realTimeTransfer(List<Map<String, Object>> mailList) {
		for(Map<String, Object> row : mailList){
			send(row);
		}
	}
	
	/**
	 * 배치 방식 메일 전송
	 *
	 * @author : JongHyeok Choi
	 * @param 메일 저장
	 * @return void
	 * @Date : 2016. 8. 1
	 * @Method Name : batchMail
	 */
	public void batchMail(HashMap<String,Object> param) {
		List<Map<String, Object>> mailList = sqlSession.selectList(NAMESPACE + "findListSendMail", param); 
		
		for(Map<String, Object> row : mailList){
			send(row);
		}
	}
	
	/**
	 * ESAMAIL에 보낼 메일을 저장
	 *
	 * @author : JongHyeok Choi
	 * @param 메일 저장
	 * @return void
	 * @Date : 2016. 8. 1
	 * @Method Name : insertEsamail
	 */
	private void insertEsamail(Map<String, Object> param) {
		sqlSession.insert(NAMESPACE + "insertEsamail", param);
	}
	
	/**
	 * 메일 전송 및 전솔 결과 업데이트 
	 *
	 * @author : JongHyeok Choi
	 * @param 메일 저장
	 * @return void
	 * @Date : 2016. 8. 1
	 * @Method Name : send
	 */
	private void send(Map<String, Object> mail) {
		
		Map<String, Object> mailParam = new HashMap<String, Object>();  
		
		mailParam = sqlSession.selectOne(NAMESPACE + "findESAMailById", mail);
		
		try{
			javaSmtpMailSender.send(mail);
			mailParam.put("snd_yn", "Y");
		} catch(Exception e) {
			mailParam.put("snd_yn", "N");
			LOG.error(e.getMessage(), e);
		} finally {
			sqlSession.update(NAMESPACE + "updateSendComplete", mailParam);
		}
		
	}
}