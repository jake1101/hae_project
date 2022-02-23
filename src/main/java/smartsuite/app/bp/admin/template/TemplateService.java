package smartsuite.app.bp.admin.template;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import freemarker.template.TemplateException;
import smartsuite.app.common.TemplateGeneratorService;
import smartsuite.app.common.shared.Const;


@Service
@Transactional
@SuppressWarnings ({ "unchecked", "rawtypes"})
public class TemplateService {
	private static final Log LOG = LogFactory.getLog(TemplateService.class);

	@Inject
	private SqlSession sqlSession;

	@Inject
	TemplateGeneratorService templateGeneratorService;
	
	/* NAMESPACE*/
	private static final String NAMESPACE = "template.";
	
	/**
	 *템플릿 목록 조회*/
	public  List<Map<String, Object>> findListTmp(Map<String, Object> param) {
		
		return sqlSession.selectList(NAMESPACE + "findListTmp", param);
	}

	/**
	 *템플릿 베이스 상세 조회*/
	public Map findTemplateBaseById(Map<String, Object> param) {
		Map<String,Object> tmpInfo;
		tmpInfo =  sqlSession.selectOne(NAMESPACE + "findTemplateBaseById", param);
		
		return tmpInfo;
	}

	/**
	 *템플릿 목록 list 삭제*/
	public Map deleteListTmp(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List <Map<String, Object>> deletes = (List<Map<String, Object>>)param.get("deleteTmps");
		
		for(Map<String, Object> row : deletes){
			this.deleteTmp(row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);

		return resultMap;
	}
	
	/**
	 *템플릿 삭제*/
	private void deleteTmp(Map<String, Object> param) {
		sqlSession.delete(NAMESPACE + "deleteMailInfo", param);
		sqlSession.delete(NAMESPACE + "deleteMailList", param);
		sqlSession.delete(NAMESPACE + "deleteTmp", param);
	}


	/**
	 *템플릿 저장*/
	public Map<String, Object> saveTmp(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> info = param;

		boolean isNew = false;
		
		if(info.get("isNew") != null){
			isNew = (Boolean)info.get("isNew");
		}

		// 신규
		if (isNew) {
			boolean exist = false;

			if (info != null && !info.isEmpty() && this.getTmpCount(info) > 0) {
				exist = true;
			}
			if (exist) {
				resultMap.put(Const.RESULT_STATUS, Const.FAIL); // 중복
				return resultMap;
			}

			if (info != null && !info.isEmpty()) {
				sqlSession.insert(NAMESPACE + "insertTmp", info);
			}
		} 
		// 수정
		else {
			if (info != null && !info.isEmpty()) {
				sqlSession.update(NAMESPACE + "updateTmp", info);
			}
		}
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	private int getTmpCount(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE+ "getTmpCount", param);
	}

	
	/**
	 * template by mail key 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map< string, object>
	 * @Date : 2016. 9. 20
	 * @Method Name : findTemplateByMailKey
	 */
	public Map<String, Object> findTemplateByMailKey(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "findTemplateByMailKey", param);
	}
	
	/**
	 * template by aprv typ cd 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map< string, object>
	 * @Date : 2016. 9. 20
	 * @Method Name : findTemplateByAprvTypCd
	 */
	public Map<String, Object> findTemplateByAprvTypCd(Map<String, Object> param) {
		return sqlSession.selectOne(NAMESPACE + "findTemplateByAprvTypCd", param);
	}
	
	/**
	 * 템플릿 미리보기 내용 조회
	 */
	public Map<String, Object> findTemplatePreview(Map<String, Object> param) {
		String previewHtml = "";
		
		try {
			// 템플릿 기초 아이디 값으로 템플릿 내용을 조회한다.
			Map tmp = this.findTemplateBaseById(param);
			
			previewHtml = templateGeneratorService.generate( 
					param.get("app_id").toString()
					,(String)tmp.get("tmp_bas_cont")
					,param
			);
		} catch (TemplateException e) {
			LOG.error(e.getMessage(), e);
		} catch (IOException e){
			LOG.error(e.getMessage(), e);
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("previewHtml", previewHtml);
		return result;
	}	
	
	/*템플릿 내용 조회 */
	public Map findTmpByTmpId(Map param) {
		return sqlSession.selectOne(NAMESPACE + "findTmpByTmpId", param);
	}
	
}
