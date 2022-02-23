package smartsuite.app.bp.admin.mail;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.common.mail.CommonMailService;
import smartsuite.app.common.shared.Const;

@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class MailService {

	@Inject
	private SqlSession sqlSession;
	
	@Inject
	private CommonMailService commonMailService;
	
	/*NAMESPACE*/
	private static final String NAMESPACE = "mail.";
	
	/* 메일 목록 조회 */
	public List<Map<String, Object>> findListMail(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListMail", param);
	}
	
	/* 메일 목록 상세 조회 */
	public Map findListMailByMailId(Map param) {
		Map<String,Object> mailInfo;
		
		mailInfo = sqlSession.selectOne(NAMESPACE + "findListMailByMailId", param);
		
		return mailInfo;
	}

	
	/* 메일 목록 삭제 */
	public Map deleteListMail(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List <Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteMail");
		
		for(Map<String, Object> row : deletes){
			this.deleteMail(row);
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		
		return resultMap;
	}
	
	/* 메일 삭제 */
	public void deleteMail(Map<String, Object> param){
		Map<String,Object> info = sqlSession.selectOne(NAMESPACE+"findContent", param);
		String tmp_id=(String) info.get("tmp_id");
		
		if(info != null){
			sqlSession.delete(NAMESPACE+"deleteMail", param);
			
			param.put("tmp_id", tmp_id);
			sqlSession.delete(NAMESPACE+"deleteContent", param);
		}

	}

	/* 저장 */
	public Map<String, Object> saveListMail(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> info = param;
		
		boolean isNew = false;
		
		if(info.get("isNew")!=null){
			isNew = (Boolean)info.get("isNew");
		}
		
		// 신규 저장
		if(isNew){
			boolean exist = false;
			
			if(info != null && !info.isEmpty() && this.getCountMail(info) > 0){
				exist = true;
			}
			if(exist){
				// 중복
				resultMap.put(Const.RESULT_STATUS, Const.FAIL);
				return resultMap;
			}
			
			if(info!= null && !info.isEmpty()){
				// 메일 정보, 템플릿 본문 insert
				info.put("tmp_id", UUID.randomUUID().toString());
				sqlSession.insert(NAMESPACE + "insertContent", info);
				sqlSession.insert(NAMESPACE + "insertMail", info);
			}
		}
		else{
			if (info != null && !info.isEmpty()) {
				// 메일 정보, 템플릿 본문 update
				sqlSession.update(NAMESPACE + "updateMail", info);
				sqlSession.update(NAMESPACE + "updateContent", info);
			}
			
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	private int getCountMail(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "getCountMail", param);
	
	}

	public List getAllTmpBasId(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE+"getAllTmpBasIdList", param);
	}

	/* 전송이력 조회 */
	public  List<Map<String, Object>> findListHistory(Map<String, Object> param) {
		return sqlSession.selectList(NAMESPACE + "findListHistory", param);
	}

	/* SMTP 연동 테스트  */
	public Map sendTestMail(Map param) {
		commonMailService.addMail((String) param.get("mailKey"), param);
		
		return param;
	}


}
