package smartsuite.app.bp.admin.projectmgt;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * 프로젝트 관리 관련 처리하는 서비스 Class입니다.
 */
@Service
@Transactional
@SuppressWarnings ({ "rawtypes", "unchecked" })
public class ProjectMgtService {

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	/**
	 * 프로젝트 목록을 조회한다.
	 */
	public List findProjectList(Map param) {
		return sqlSession.selectList("projectMgt.findProjectList", param);
	}
	
	/**
	 * 프로젝트 목록을 삭제한다.
	 */
	public void deleteProjectList(Map param) {
		List<Map<String, Object>> deleteProjects = (List<Map<String, Object>>)param.get("deleteProjects");
		for (final Map<String, Object> deleteProject : deleteProjects) {
			deleteProject(deleteProject);
		}
	}
	
	/**
	 * 프로젝트를 삭제한다.
	 */
	public void deleteProject(Map param) {
		sqlSession.delete("projectMgt.deleteModuleByPjtCd", param);
		sqlSession.delete("projectMgt.deleteProject", param);
	}
	
	/**
	 * 프로젝트 상세 정보를 조회한다.
	 */
	public Map findProject(Map param) {
		Map result = new HashMap();
		
		result.put("projectInfo", sqlSession.selectOne("projectMgt.findProjectInfo", param));
		result.put("projectModules", sqlSession.selectList("projectMgt.findProjectModules", param));
		return result;
	}
	
	/**
	 * 프로젝트 정보를 저장한다.
	 */
	public void saveProject(Map param) {
		Map<String, Object> projectInfo = (Map<String, Object>)param.get("projectInfo");
		List<Map<String, Object>> updateModuleInfos = (List<Map<String, Object>>)param.get("updateModuleInfos");
		List<Map<String, Object>> deleteModuleInfos = (List<Map<String, Object>>)param.get("deleteModuleInfos");
		
		/**
		 * 1. project code로 db에 프로젝트 데이터 존재 여부 확인
		 * 2. 존재하면 update, 존재하지 않으면 insert
		 * 3. project code로 db에 모듈 데이터 존재 여부 확인
		 * 4. 존재하면 update, 존재하지 않으면 insert
		 * 5. 삭제 모듈 삭제
		*/
		
		final int projectCnt = sqlSession.selectOne("projectMgt.findProjectExists", projectInfo);
		if (projectCnt > 0) {
			sqlSession.update("projectMgt.updateProject", projectInfo);
		}
		else{
			sqlSession.insert("projectMgt.insertProject", projectInfo);
		}
		
		for (final Map<String, Object> updateModuleInfo : updateModuleInfos) {
			int existModuleCnt = sqlSession.selectOne("projectMgt.findProjectModuleExists", updateModuleInfo);
			if(existModuleCnt > 0){
				sqlSession.update("projectMgt.updateModule", updateModuleInfo);					
			}
			else{
				sqlSession.insert("projectMgt.insertModule", updateModuleInfo);
			}
		}
		
		for (final Map<String, Object> deleteModuleInfo : deleteModuleInfos) {
			sqlSession.delete("projectMgt.deleteModule", deleteModuleInfo);
		}
	}
	
	/**
	 * 프로젝트 담당자 목록을 조회한다.
	 */
	public List findChrList(Map param) {
		return sqlSession.selectList("projectMgt.findChrList", param);
	}
	
	/**
	 * 프로젝트 담당자 목록을 저장한다.
	 */
	public void saveChrList(Map param) {
		List<Map<String, Object>> insertChrs = (List<Map<String, Object>>)param.get("insertChrs");
		List<Map<String, Object>> updateChrs = (List<Map<String, Object>>)param.get("updateChrs");
		
		for(Map<String, Object> insertChr : insertChrs){
			sqlSession.insert("projectMgt.insertChr", insertChr);
		}
		
		for(Map<String, Object> updateChr : updateChrs){
			sqlSession.update("projectMgt.updateChr", updateChr);
		}
	}
	
	/**
	 * 프로젝트 담당자 목록을 삭제한다.
	 */
	public void deleteChrList(Map param) {
		List<Map<String, Object>> deleteChrs = (List<Map<String, Object>>)param.get("deleteChrs");
		
		for(Map<String, Object> deleteChr : deleteChrs){
			sqlSession.insert("projectMgt.deleteChr", deleteChr);
		}
	}
}
