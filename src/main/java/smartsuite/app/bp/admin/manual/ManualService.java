package smartsuite.app.bp.admin.manual;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.common.shared.Const;

/**
 * Manual 관련 처리하는 서비스 Class입니다.
 *
 * @author JuEung Kim
 * @see 
 * @FileName ManualService.java
 * @package smartsuite.app.bp.admin.manual
 * @Since 2016. 6. 28
 * @변경이력 : [2016. 6. 28] JuEung Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "rawtypes", "unchecked" })
public class ManualService {

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	/**
	 * 해당 메뉴의 메뉴얼을 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 6. 28
	 * @Method Name : findInfoManual
	 */
	public Map findInfoManual(Map param) {
		return sqlSession.selectOne("manual.findInfoManual", param);
	}
	
	/**
	 * 메뉴얼 차수 콤보 데이터 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 6. 29
	 * @Method Name : findListMnlRevCombo
	 */
	public List findListMnlRevCombo(Map param){
		return sqlSession.selectList("manual.findListMnlRevCombo", param);
	}
	
	/**
	 * 메뉴얼 데이터를 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map< string, object>
	 * @Date : 2016. 6. 29
	 * @Method Name : saveInfoManual
	 */
	public Map<String, Object> saveInfoManual(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		// 헤더 data
		Map<String, Object> manualInfo = (Map<String, Object>)param.get("manualInfo");
		
		Object mnlRev = manualInfo.get("mnl_rev"); // 메뉴얼 차수

		if(mnlRev == null || "".equals(mnlRev) ){
			manualInfo.put("mnl_rev", 1);
			this.insertEsaumnl(manualInfo);
		}else{
			this.updateEsaumnl(manualInfo);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);

		return resultMap;
	}
	
	/**
	 * 메뉴얼 Revision 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map< string, object>
	 * @Date : 2016. 6. 29
	 * @Method Name : saveInfoManualRev
	 */
	public Map<String, Object> saveInfoManualRev(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		// 헤더 data
		Map<String, Object> manualInfo = (Map<String, Object>)param.get("manualInfo");
		
		this.insertEsaumnl(manualInfo);
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);

		return resultMap;
	}
	
	/**
	 * ESAUMNL(메뉴얼 관리) 입력한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the int
	 * @Date : 2016. 6. 29
	 * @Method Name : insertEsaumnl
	 */
	public int insertEsaumnl(Map<String, Object> param) {
		return sqlSession.insert("manual.insertEsaumnl", param);
	}
	
	/**
	 * ESAUMNL(메뉴얼 관리) 수정한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the int
	 * @Date : 2016. 6. 29
	 * @Method Name : updateEsaumnl
	 */
	public int updateEsaumnl(Map<String, Object> param) {
		return sqlSession.update("manual.updateEsaumnl", param);
	}
}
