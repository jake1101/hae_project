package smartsuite.app.bp.admin.code;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.common.shared.Const;
import smartsuite.messagesource.web.MessageService;

// TODO: Auto-generated Javadoc
/**
 * MultiLangMgt 관련 처리하는 서비스 Class입니다.
 *
 * @author JuEung Kim
 * @see
 * @FileName MultiLangMgtService.java
 * @package smartsuite.app.bp.admin.code
 * @Since 2016. 6. 15
 * @변경이력 : [2016. 6. 15] JuEung Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class MultiLangMgtService {

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	@Inject
	private MessageService messgeService;

	/**
	 * 다국어관리 목록을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list< map< string, object>>
	 * @Date : 2016. 6. 15
	 * @Method Name : findListMultiLang
	 */
	public List<Map<String,Object>> findListMultiLang(Map<String, Object> param) {
		return sqlSession.selectList("multiLang.findListMultiLang", param);
	}

	/**
	 * 다국어관리 목록을 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 6. 15
	 * @Method Name : saveListMultiLang
	 */
	public Map saveListMultiLang(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();

		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");

		// UPDATE
		for(Map row : updateList){
			sqlSession.update("multiLang.updateMultiLang", row);
		}

		// INSERT
		for(Map row : insertList){
			sqlSession.insert("multiLang.insertMultiLang", row);
		}

		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		messgeService.refreshByLastUpdated();
		return resultMap;
	}

	/**
	 * 다국어관리 목록을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 6. 15
	 * @Method Name : deleteListMultiLang
	 */
	public Map deleteListMultiLang(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();

		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");

		// DELETE
		for(Map row : deleteList){
			sqlSession.delete("multiLang.deleteMultiLang", row);
		}

		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		messgeService.refreshByLastUpdated();
		return resultMap;
	}
	
	/**
	 * 다국어관리 message 목록을 조회한다.
	 */
	public List<Map<String,Object>> findMessageList(Map<String, Object> param) {
		return sqlSession.selectList("multiLang.findMessageList", param);
	}
	
	/**
	 * 다국어관리 message 목록을 저장한다.
	 */
	public Map saveMessageList(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		List<Map<String, Object>> messageList = (List<Map<String, Object>>)param.get("messageList");

		for(Map message : messageList){
			if(null == sqlSession.selectOne("multiLang.isExistMessage", message)){
				sqlSession.insert("multiLang.insertMultiLang", message);
			}
			else{
				sqlSession.update("multiLang.updateMultiLang", message);
			}			
		}

		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		messgeService.refreshByLastUpdated();
		return resultMap;
	}
}
