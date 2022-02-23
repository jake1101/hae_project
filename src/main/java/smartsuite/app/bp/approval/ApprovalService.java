package smartsuite.app.bp.approval;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.base.Strings;
import com.google.common.collect.Lists;

import smartsuite.app.bp.admin.approval.ApprovalTemplateService;
import smartsuite.app.bp.admin.template.TemplateService;
import smartsuite.app.bp.admin.validator.ValidatorUtil;
import smartsuite.app.bp.approval.scheduler.ApprovalExcuteService;
import smartsuite.app.bp.approval.scheduler.ApprovalSchedulerService;
import smartsuite.app.common.AttachService;
import smartsuite.app.common.TemplateGeneratorService;
import smartsuite.app.common.shared.Const;
import smartsuite.app.common.shared.SharedService;
import smartsuite.data.FloaterStream;
import smartsuite.mybatis.QueryFloaterStream;
import smartsuite.security.authentication.Auth;

/**
 * 결재마스터 관련 처리하는 서비스 Class입니다.
 *
 * @author JongKyu Kim
 * @see
 * @FileName ApprovalService.java
 * @package smartsuite.app.bp.admin.approval
 * @Since 2016. 2. 2
 * @변경이력 : [2016. 2. 2] JongKyu Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "rawtypes", "unchecked" })
public class ApprovalService {
	
	static final Logger LOG = LoggerFactory.getLogger(ApprovalService.class);

	/** The sql session. */
	@Inject
	private SqlSession sqlSession;

	@Inject
	private SharedService sharedService;

	@Inject
	private ApprovalFactory factory;
	
	@Inject
	private ApprovalValidator approvalValidator;

	@Inject
	private TemplateGeneratorService templateGeneratorService;
	
	@Inject
	private ApprovalTemplateService approvalTemplateService;
	
	@Inject
	private AttachService attachService;
	
	@Inject
	private TemplateService templateService;

	@Inject
	ApprovalSchedulerService approvalSchedulerService;
	
	
	/**
	 * 결재마스터를 등록한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : insertApprovalMaster
	 */
	public void insertApprovalMaster(Map<String, Object> param) {
		sqlSession.insert("approvalMaster.insertApprovalMaster", param);
	}

	/**
	 * 결재본문을 등록한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : insertApprovalDoc
	 */
	public void insertApprovalDoc(Map<String, Object> param) {
		sqlSession.insert("approvalDoc.insertApprovalDoc", param);
	}

	/**
	 * 결재선을 등록한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : insertApprovalLine
	 */
	public void insertApprovalLine(Map<String, Object> param) {
		sqlSession.insert("approvalLine.insertApprovalLine", param);
	}

	/**
	 * 업무 결재 연동을 등록한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : insertApprovalLink
	 */
	public void insertApprovalLink(Map<String, Object> param) {
		sqlSession.insert("approvalLink.insertApprovalLink", param);
	}

	/**
	 * 결재마스터를 수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : updateApprovalMaster
	 */
	public void updateApprovalMaster(Map<String, Object> param) {
		sqlSession.update("approvalMaster.updateApprovalMaster", param);
	}

	/**
	 * 결재마스터 상태정보를 수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param aprvId - 결재 아이디
	 * @param aprvTypCd - 결재 유형 코드
	 * @param stsCd - 결재 상태 코드
	 * @param appId - 모듈 appId
	 * @throws Exception
	 * @Date : 2016. 2. 2
	 * @Method Name : updateApprovalMasterStatus
	 */
	public void updateApprovalMasterStatus(String aprvId, String aprvTypCd, String stsCd, String appId) throws Exception {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("aprv_id", aprvId);

		if (ApprovalConst.APRV_STS_APPROVE.equals(stsCd) || ApprovalConst.APRV_STS_ABANDON.equals(stsCd)) {	// 결재승인(C) or 결재반려(B) 
			param.put("aprv_stscd", stsCd);
			sqlSession.update("approvalMaster.updateApprovalMasterStatus", param);

		} else if (ApprovalConst.APRV_STS_CANCEL.equals(stsCd)) { // 상신취소(D)이면
			param.put("aprv_stscd", ApprovalConst.APRV_STS_DRAFT);	// 임시저장(T) 상태로 돌린다.
			sqlSession.update("approvalMaster.updateApprovalMasterStatus", param);

		}
		ApprovalStrategy strategy = factory.getApprovalStrategy(aprvTypCd);
		if (strategy != null) {
			if (ApprovalConst.APRV_STS_APPROVE.equals(stsCd)) { // 결재승인(C)
				strategy.doApprove(aprvTypCd, appId);
			} else if (ApprovalConst.APRV_STS_ABANDON.equals(stsCd)) { // 결재반려(B)
				strategy.doReject(aprvTypCd, appId);
			} else if (ApprovalConst.APRV_STS_CANCEL.equals(stsCd)) { // 상신취소(D)
				strategy.doCancel(aprvTypCd, appId);
			} else if (ApprovalConst.APRV_STS_IN_PROGRESS.equals(stsCd)) { // 결재상신(P)
				strategy.doSubmit(aprvTypCd, appId);
			} else if (ApprovalConst.APRV_STS_DRAFT.equals(stsCd)) { // 임시저장(T)
				strategy.doTemporary(aprvTypCd, appId);
			}
		}
	}

	/**
	 * 결재본문을 수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : updateApprovalDoc
	 */
	public void updateApprovalDoc(Map<String, Object> param) {
		sqlSession.update("approvalDoc.updateApprovalDoc", param);
	}

	/**
	 * 결재선을 수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : updateApprovalLine
	 */
	public void updateApprovalLine(Map<String, Object> param) {
		sqlSession.update("approvalLine.updateApprovalLine", param);
	}

	/**
	 * 결재선 현재 결재자를 수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : updateApprovalLineCurrent
	 */
	public void updateApprovalLineCurrent(Map<String, Object> param) {
		sqlSession.update("approvalLine.updateApprovalLineCurrentY", param);
		sqlSession.update("approvalLine.updateApprovalLineCurrentN", param);
	}

	/**
	 * 결재선 결재결과정보를 수정한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : updateApprovalLineResult
	 */
	public void updateApprovalLineResult(Map<String, Object> param) {
		sqlSession.update("approvalLine.updateApprovalLineResult", param);
	}

	/**
	 * 업무 결재 연동을 수정한다. - 사용안함으로 수정
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : updateApprovalLinkUnuse
	 */
	public void updateApprovalLinkUnuse(Map<String, Object> param) {
		sqlSession.update("approvalLink.updateApprovalLinkUnuse", param);
	}

	/**
	 * 결재마스터를 삭제한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteApprovalMaster
	 */
	public void deleteApprovalMaster(Map<String, Object> param) {
		sqlSession.update("approvalMaster.deleteApprovalMaster", param);
	}

	/**
	 * 결재본문을 삭제한다. - 물리적 삭제
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteApprovalDoc
	 */
	public void deleteApprovalDoc(Map<String, Object> param) {
		sqlSession.delete("approvalDoc.deleteApprovalDoc", param);
	}

	/**
	 * 결재에 대한 결재선을 모두 삭제한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : removeAllApprovalLine
	 */
	public void removeAllApprovalLine(Map<String, Object> param) {
		sqlSession.update("approvalLine.deleteAllApprovalLine", param);
	}

	/**
	 * 결재선을 삭제한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteApprovalLine
	 */
	public void deleteApprovalLine(Map<String, Object> param) {
		sqlSession.update("approvalLine.deleteApprovalLine", param);
	}

	/**
	 * 업무 결재 연동을 삭제한다. - 물리적 삭제
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteApprovalLink
	 */
	public void deleteApprovalLink(Map<String, Object> param) {
		sqlSession.delete("approvalLink.deleteApprovalLink", param);
	}

	/**
	 * 결재마스터 상세정보를 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return map
	 * @Date : 2016. 2. 2
	 * @Method Name : findApprovalMaster
	 */
	public Map<String, Object> findApprovalMaster(Map<String, Object> param) {
		return sqlSession.selectOne("approvalMaster.findApprovalMaster", param);
	}

	/**
	 * 결재본문 상세정보를 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return map
	 * @Date : 2016. 2. 2
	 * @Method Name : findApprovalDoc
	 */
	public Map<String, Object> findApprovalDoc(Map<String, Object> param) {
		return sqlSession.selectOne("approvalDoc.findApprovalDoc", param);
	}

	/**
	 * 결재 상세정보를 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return map {"approvalMaster", "approvalDoc", "approvalLines"}
	 * @Date : 2016. 2. 2
	 * @Method Name : findApproval
	 */
	public Map<String, Object> findApproval(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String aprvId = (String)param.get("aprv_id"); // 결재 아이디
		if (Strings.isNullOrEmpty(aprvId)) {
			return null;
		}
		Map<String, Object> master = this.findApprovalMaster(param);
		master.put("max_aprv_rev", this.getMaxRevisionApprovalMaster(master));
		resultMap.put("approvalMaster", master);
		
		Map<String, Object> approvalDoc = this.findApprovalDoc(param);
		//결재상태가 임시저장(T)일 경우에만 결재본문 재조회하도록
		if(ApprovalConst.APRV_STS_DRAFT.equals(master.get("aprv_stscd"))){
			Map<String, Object> template = findApprovalDocTemplate(master);
			if(template != null) {
				approvalDoc.put("app_doc_cont", template.get("appDocCont"));
			}
		}
		resultMap.put("approvalDoc", approvalDoc);
		resultMap.put("approvalLines", this.findListApprovalLine(param));
		return resultMap;
	}

	/**
	 * 결재 템플릿을 조회한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map< string, object>
	 * @Date : 2016. 9. 19
	 * @Method Name : findApprovalDocTemplate
	 */
	public Map<String, Object> findApprovalDocTemplate(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		//결재 유형 코드
		String aprvTypCd = (String)param.get("aprv_typcd");
		
		if(!Strings.isNullOrEmpty(aprvTypCd)){
			param.put("aprv_typ_cd", aprvTypCd);
			param.put("use_yn", "Y");
			
			Map<String, Object> templateData = approvalTemplateService.findApprovalTmpByCd(param);	// 결재서식(template)조회
			Map<String, Object> tmpParam = (Map<String, Object>)getFormParam(param);				// 서식에 맵팽될 param정보조회
			Map<String, Object> approvalHeader = (Map<String, Object>)getApprovalHeader(param);		// 결재 header정보 ( 임시저장 이후에는 param에 결재정보가 넘어온다 )
			
			if(tmpParam != null) {
				tmpParam.put("approvalInfo", approvalHeader);//결재 header정보 설정
			}
			
			//결재 템플릿이 존재하면 결재 문서 리턴
			if(templateData != null){
				Map<String,Object> checkData = templateGeneratorService.parameterCheck(templateData, tmpParam);
				Map<String, Object> approvalDocMap = new HashMap<String, Object>();
				try {
					// 템플릿 내용의 파라미터값 치환
					String contents = templateGeneratorService.generate(
							(String)templateData.get("aprv_typ_cd"),
							(String)templateData.get("tmp_cont"),
							checkData.get("data"));
					
					// 템플릿 기초 아이디 값으로 템플릿 내용을 조회한다.
					if(templateData.get("tmp_cls") == null || "".equals(templateData.get("tmp_cls")) ){
						templateData.put("tmp_cls", "TA"); // 결재
					}
					
					// 결재관리에서 템플릿을 사용하지 않는 경우
					if(templateData.get("tmp_bas_id") == null || "".equals(templateData.get("tmp_bas_id")) ){
						approvalDocMap.put("app_doc_cont", contents);
						
					// 결재관리에서 템플릿을 사용하는 경우
					}else{
						// 템플릿 관리의 템플릿 조회
						Map tmp = templateService.findTemplateBaseById(templateData);
						tmp.put("contents", contents);
						
						// 템플릿 관리의 템플릿과 결재 관리의 템플릿 내용을 합침.
						approvalDocMap.put("app_doc_cont"
								,templateGeneratorService.generate(
										aprvTypCd
										,(String)tmp.get("tmp_bas_cont")
										,tmp
								)
						);
					}
					
				} catch (Exception e) {
					LOG.error(e.getMessage());
					checkData.put(Const.RESULT_STATUS, Const.FAIL);
					resultMap.put("templateParamCheckResult", checkData);
				}
				resultMap.put("approvalDoc", approvalDocMap);
				resultMap.put("appDocCont", approvalDocMap.get("app_doc_cont"));
				resultMap.put("templateParamCheckResult", checkData);
			}
		}
		return resultMap;
	}
	
	/**
	 * 결재 목록을 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list approval
	 * @Date : 2016. 2. 2
	 * @Method Name : findListApproval
	 */
	public FloaterStream findListApproval(Map<String, Object> param) {
		// 대용량 처리
		return new QueryFloaterStream(sqlSession, "approvalMaster.findListApprovalMaster", param);
	}
	
	/**
	 * 결개 승인 오류내용 조회
	 * 
	 * @param param
	 * @return
	 */
	public Map<String, Object> findApprovalErrCont(Map<String, Object> param) {
		return sqlSession.selectOne("approvalMaster.findApprovalErrCont", param);
	}

	/**
	 * 결재선 목록을 조회한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the list approval
	 * @Date : 2016. 2. 2
	 * @Method Name : findListApprovalLine
	 */
	public List<Map<String, Object>> findListApprovalLine(Map<String, Object> param) {
		return sqlSession.selectList("approvalLine.findListApprovalLine", param);
	}

	/**
	 * 결재본문을 카운트 한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the count approval doc
	 * @Date : 2016. 2. 2
	 * @Method Name : getCountApprovalDoc
	 */
	public int getCountApprovalDoc(Map<String, Object> param) {
		return sqlSession.selectOne("approvalDoc.getCountApprovalDoc", param);
	}

	/**
	 * 결재마스터의 최대 차수
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return int
	 * @Date : 2016. 2. 2
	 * @Method Name : getMaxRevisionApprovalMaster
	 */
	public int getMaxRevisionApprovalMaster(Map<String, Object> param) {
		Integer rev = sqlSession.selectOne("approvalMaster.getMaxRevisionApprovalMaster", param);
		return rev == null ? 1 : rev.intValue();
	}

	/**
	 * 사용중인 결재 아이디
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return aprv_id
	 * @Date : 2016. 2. 2
	 * @Method Name : getApprovalIdByAppId
	 */
	public String getApprovalIdByAppId(Map<String, Object> param) {
		return sqlSession.selectOne("approvalLink.getApprovalIdByAppId", param);
	}

	/**
	 * 결재 정보를 등록/수정한다. - 임시저장/상신
	 *
	 * @author : JongKyu Kim
	 * @param param {"approvalMaster", "approvalDoc", "insertApprovalLines", "updateApprovalLines", "deleteApprovalLines"}
	 * @return the map<string, object>
	 * @throws Exception
	 * @Date : 2016. 2. 2
	 * @Method Name : saveApproval
	 */
	public Map<String, Object> saveApproval(Map<String, Object> param) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> master = (Map<String, Object>)param.get("approvalMaster");
		Map<String, Object> doc = (Map<String, Object>)param.get("approvalDoc");
		List<Map<String, Object>> insertLines = (List<Map<String, Object>>)param.get("insertApprovalLines");
		List<Map<String, Object>> updateLines = (List<Map<String, Object>>)param.get("updateApprovalLines");
		List<Map<String, Object>> deleteLines = (List<Map<String, Object>>)param.get("deleteApprovalLines");

		if (master == null || master.isEmpty()) {
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			return resultMap;
		}
		
		// validation 수행
		resultMap = approvalValidator.validate(master);
		if(Const.SUCCESS.equals(resultMap.get(Const.RESULT_STATUS))) {
			// 결재마스터
			String aprvId = (String)master.get("aprv_id"); // 결재 아이디
			if (Strings.isNullOrEmpty(aprvId)) { // 신규
				aprvId = UUID.randomUUID().toString();
				master.put("aprv_id", aprvId);

				// 결재마스터
				String docNo = (String)master.get("aprv_docno");
				if (Strings.isNullOrEmpty(docNo)) {
					master.put("aprv_docno", sharedService.generateDocNo("AP")); // 결재 문서번호
					master.put("aprv_rev", 1); // 차수
				}
				this.insertApprovalMaster(master);

				// 업무 결재 연동
				Map<String, Object> link = new HashMap<String, Object>();
				link.put("app_id"    , master.get("app_id"));		// app id
				link.put("aprv_typcd", master.get("aprv_typcd"));	// 결재 유형 코드
				
				this.updateApprovalLinkUnuse(link); // 기존에 등록되어 있던 연동 정보는 사용안함

				link.put("aprv_id", aprvId);
				this.insertApprovalLink(link); // 새로 등록되는 연동정보를 사용함
			} else {
				this.updateApprovalMaster(master);
			}

			// 결재본문
			if (doc != null && !doc.isEmpty()) {
				doc.put("aprv_id", aprvId);
				Map<String, Object> template = findApprovalDocTemplate(master);
				if(template != null) {
					doc.put("app_doc_cont", template.get("appDocCont"));	//저장시에도 결재서식 재생성.
				}
				
				if (this.getCountApprovalDoc(doc) > 0) { // 등록된 결재 본문이 존재하면
					this.updateApprovalDoc(doc); // 본문 수정
				} else {
					this.insertApprovalDoc(doc); // 본문 신규 등록
				}
			}

			// 결재선
			if(master.get("resetAprvLines") != null && (Boolean)master.get("resetAprvLines")){
				this.removeAllApprovalLine(master);
			}
			
			if (insertLines != null && !insertLines.isEmpty()) {
				for (Map<String, Object> row : insertLines) {
					row.put("aprv_id", aprvId); // 결재 아이디
					row.put("aprvln_id", UUID.randomUUID().toString()); // 결재선 아이디
					this.insertApprovalLine(row);
				}
			}
			if (updateLines != null && !updateLines.isEmpty()) {
				for (Map<String, Object> row : updateLines) {
					this.updateApprovalLine(row);
				}
			}
			if (deleteLines != null && !deleteLines.isEmpty()) {
				for (Map<String, Object> row : deleteLines) {
					this.deleteApprovalLine(row);
				}
			}

			this.updateApproval(aprvId); // 결재 상태 정보를 수정
			resultMap.put("aprv_id", aprvId);
		}
		
		return resultMap;
	}

	/**
	 * 결재의 상태 정보를 수정한다. - 결재마스터, 결재선(현재 결재자)
	 *
	 * @author : JongKyu Kim
	 * @param param - aprv_id
	 * @throws Exception
	 * @Date : 2016. 2. 2
	 * @Method Name : updateApproval
	 */
	public void updateApproval(String aprvId) throws Exception {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("aprv_id", aprvId);
		Map<String, Object> master = this.findApprovalMaster(param); // 결재마스터 정보
		String aprvTypCd = (String)master.get("aprv_typcd"); // 결재 유형 코드
		String stsCd = (String)master.get("aprv_stscd"); // 결재 상태 코드
		String appId = (String)master.get("app_id"); // app id

		if (ApprovalConst.APRV_STS_IN_PROGRESS.equals(stsCd)) { // 결재상신(P) - 결재가 진행중인 상태
			param.put("aprvln_clscd", ApprovalConst.APRV_LINE); // 결재선 구분: 결재선(AL)
			List<Map<String, Object>> lines = this.findListApprovalLine(param); // 결재선 목록 조회: 참조선(RL)은 제외하고 결재선(AL)만 조회한다.
			if (lines != null && !lines.isEmpty()) {
				String lineSts = ""; // 결재선 결과
				int approvalCount = 0;
				boolean updatedCurrent = false;
				for (Map<String, Object> row : lines) {
					String laprYn = (String)row.get("lapr_yn"); // 전결여부
					String resCd = (String)row.get("aprv_rescd"); // 결재 결과 코드
					String aprvlnId = (String)row.get("aprvln_id"); // 결재선 아이디

					if ("Y".equals(laprYn)) { // 전결
						lineSts = ApprovalConst.APRV_STS_APPROVE;	// 결재 진행상태: 결재승인(C)
						break;
					}
					if (ApprovalConst.APRVLN_STS_ABDN.equals(resCd)) {	// 결재선 결과상태: 반려(B)
						lineSts = ApprovalConst.APRV_STS_ABANDON;			// 결재 진행상태: 결재반려(B)
						break;
					} else if (ApprovalConst.APRVLN_STS_APRV.equals(resCd)) {	// 결재선 결과상태: 승인(C)
						approvalCount++;
					} else if (ApprovalConst.APRVLN_STS_NHDL.equals(resCd) && !updatedCurrent) {	// 결재선 결과상태: 미처리(N)
						param.put("aprvln_id", aprvlnId);
						this.updateApprovalLineCurrent(param);
						updatedCurrent = true;
					}
				}
				if (approvalCount == lines.size()) {	// 전체 승인이면.
					lineSts = ApprovalConst.APRV_STS_APPROVE;	// 결재 진행상태: 결재승인(C)
				}
				if (!Strings.isNullOrEmpty(lineSts)) {
					stsCd = lineSts;
				}
			}
		}
		this.updateApprovalMasterStatus(aprvId, aprvTypCd, stsCd, appId); // 결재마스터 상태 수정
	}
	
	
	private static Date addMinutesToDate(long minutesInMills, Date beforeTime){
	    long curTimeInMs = beforeTime.getTime();
	    Date afterAddingMins = new Date(curTimeInMs + minutesInMills);
	    return afterAddingMins;
	}

	/**
	 * 일괄결재
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> approveApprovals(Map<String, Object> param) throws Exception {
		List<Map<String, Object>> invalids = Lists.newArrayList();
		List<Map<String, Object>> notExists = Lists.newArrayList();
		List<String> aprvIds = (List<String>)param.get("aprv_ids");
		Date startScheduleTime = addMinutesToDate(20000, new Date());
		for(String aprvId : aprvIds) {
			Map<String, Object> searchParam = new HashMap<String, Object>();
			searchParam.put("aprv_id", aprvId);
			
			Map<String, Object> aprvLine = sqlSession.selectOne("approvalLine.findMyApprovalLine", searchParam);
			if(aprvLine != null) {
				// 결재진행중이고 현재결재순서인 경우
				if(ApprovalConst.APRV_STS_IN_PROGRESS.equals(aprvLine.get("aprv_stscd").toString()) && "Y".equals(aprvLine.get("crnt_aprvemp_yn").toString())) {
					Map<String, Object> aprvInfo = new HashMap<String, Object>();
					aprvInfo.put("aprv_id"   , aprvId);
					aprvInfo.put("aprv_rescd", param.get("aprv_rescd"));
					aprvInfo.put("aprv_opn"  , param.get("aprv_opn"));
					aprvInfo.put("aprvln_id" , aprvLine.get("aprvln_id"));
					aprvInfo.put("usr_id"    , aprvLine.get("usr_id"));
					startScheduleTime = addMinutesToDate(3000, startScheduleTime);
					aprvInfo.put("startScheduleTime", startScheduleTime);
					approvalSchedulerService.saveApprovalLineResult(aprvInfo);

					Map<String, Object> updateParam = new HashMap<String, Object>();
					updateParam.put("aprv_id"   , aprvId);
					updateParam.put("aprv_errcd", ApprovalConst.APRV_PROG);	// 결재 승인처리 오류상태: 결재승인 처리중
					this.updateAprvErrCd(updateParam);						// 결재 승인처리 오류상태 업데이트
				} else {
					invalids.add(aprvLine);
				}
			} else {
				notExists.add(param);
			}
		}
		return ValidatorUtil.getResultMapByInvalidDatas(aprvIds, invalids, notExists);
	}
	
	/**
	 * 결재 결과 처리 관련 error log
	 * 
	 * @param param {aprv_id, aprv_errcd, aprv_errcont}
	 * <pre>
	 * aprv_id: 결재 마스터 id
	 * aprv_errcd: (
	  	ApprovalConst.APRV_PROG="P": 결재 결과 처리중
	  	ApprovalConst.APRV_NON_ERR="N": 결재결과 처리완료
	  	ApprovalConst.APRV_ERR="E": 결재결과 처리오류
	   )
	 * aprv_errcont: exception 내용
	 * </pre>
	 */
	public void updateAprvErrCd(Map<String, Object> param) {
		sqlSession.update("approvalMaster.updateErrorMessage", param);
	}
	
	/**
	 * 결재선 결과 저장 (ApprovalExcuteService에서 호출되는 서비스)
	 * <pre>
	 * Checked Exception을 포함한 모든 Exception 발생 시 rollback 처리한다.
	 * </pre>
	 * @param param {aprv_id, aprvln_id, usr_id, aprv_rescd, aprv_opn}
	 * @throws Exception
	 * @see ApprovalExcuteService
	 */
	@Transactional(rollbackFor={Exception.class})
	public void saveApprovalLineResult(Map<String, Object> param) throws Exception {
		this.updateApprovalLineResult(param); // 결재선 결과 수정
		this.updateApproval(param.get("aprv_id").toString()); // 결재 상태 정보를 수정
	}
	
	/**
	 * 결재 승인/반려/열람
	 *
	 * @author : JongKyu Kim
	 * @param param {"approvalInfo"} - aprv_id(결재 아이디), aprvnl_id(결재선 아이디), usr_id(사용자 아이디), aprv_rescd(결재 결과코드), aprv_opn(결재 의견)
	 * @return the map<string, object>
	 * @throws Exception
	 * @Date : 2016. 2. 2
	 * @Method Name : approval
	 */
	public Map<String, Object> saveResultApproval(Map<String, Object> param) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		Map<String, Object> info = (Map<String, Object>)param.get("approvalInfo");
		String aprvId = info.get("aprv_id") == null ? "" : (String)info.get("aprv_id"); // 결재 아이디

		this.updateApprovalLineResult(info); // 결재선 결과 수정
		this.updateApproval(aprvId); // 결재 상태 정보를 수정

		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * 상신취소한다.
	 *
	 * @author : JongKyu Kim
	 * @param param {"cancelApproval"} - aprv_id, aprv_typcd, app_id
	 * @return the map< string, object>
	 * @throws Exception
	 * @Date : 2016. 2. 2
	 * @Method Name : cancelApproval
	 */
	public Map<String, Object> cancelApproval(Map<String, Object> param) throws Exception {
		Map<String, Object> delete = (Map<String, Object>)param.get("cancelApproval");

		if (delete != null && !delete.isEmpty()) {
			String aprvId = (String)delete.get("aprv_id"); // 결재 아이디
			String aprvTypCd = (String)delete.get("aprv_typcd"); // 결재 유형 코드
			String appId = (String)delete.get("app_id"); // app id
			this.updateApprovalMasterStatus(aprvId, aprvTypCd, ApprovalConst.APRV_STS_CANCEL, appId); // 결재마스터 상태 수정(상신취소)
		}
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	/**
	 * 결재마스터/결재본문/결재선/업무결재연동 목록을 삭제한다.(상신취소)
	 *
	 * @author : JongKyu Kim
	 * @param param {"deleteApproval"} - aprv_id, aprv_typcd, app_id
	 * @return the map< string, object>
	 * @throws Exception
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteApproval
	 */
	public Map<String, Object> deleteApproval(Map<String, Object> param) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> delete = (Map<String, Object>)param.get("deleteApproval");
		
		if (delete == null || delete.isEmpty()) {
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			return resultMap;
		}
		
		// validation 수행
		resultMap = approvalValidator.validate(delete);
		if(Const.SUCCESS.equals(resultMap.get(Const.RESULT_STATUS))) {
			this.deleteApprovalMaster(delete); // 결재마스터 삭제
			this.deleteApprovalDoc(delete); // 결재본문 삭제
			this.removeAllApprovalLine(delete); // 결재선 삭제
			this.deleteApprovalLink(delete); // 업무결재연동 삭제
		}
		return resultMap;
	}
	
	/**
	 * 결재 재상신
	 * 
	 * @return the map< string, object>
	 * @Method Name : resubmitApproval
	 */
	public Map<String, Object> resubmitApproval(Map<String, Object> param) throws Exception {
		Map<String, Object> approvalMaster = sqlSession.selectOne("approvalMaster.findApprovalMasterForResubmit", param);
		
		if(approvalMaster == null) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			return resultMap;
		} else {
			// 이전차수의 첨부파일 존재 시 복사
			String prevAttNo = (String)approvalMaster.get("prev_att_no");
			if(!Strings.isNullOrEmpty(prevAttNo)) {
				String copyAttNo = attachService.copyListAttach(prevAttNo);
				approvalMaster.put("att_no", copyAttNo);
			}
			
			Map<String, Object> approvalDoc = sqlSession.selectOne("approvalDoc.findApprovalDocForResubmit", param);
			List<Map<String, Object>> approvalLines = sqlSession.selectList("approvalLine.findListApprovalLineForResubmit", param);
			
			Map<String, Object> saveParam = new HashMap<String, Object>();
			saveParam.put("approvalMaster"     , approvalMaster);
			saveParam.put("approvalDoc"        , approvalDoc);
			saveParam.put("insertApprovalLines", approvalLines);
			
			return saveApproval(saveParam);
		}
	}
	
	/**
	 * 결재선을 저장한다.
	 *
	 * @author : wskim
	 * @param param
	 * @return the map
	 * @Date : 2018. 7. 16
	 * @Method Name : saveAprvLine
	 */
	public Map<String, Object> saveAprvLine(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> insertLines = (List<Map<String, Object>>)param.get("insertApprovalLines");
		List<Map<String, Object>> updateLines = (List<Map<String, Object>>)param.get("updateApprovalLines");
		List<Map<String, Object>> deleteLines = (List<Map<String, Object>>)param.get("deleteApprovalLines");
		
		
		if (insertLines != null && !insertLines.isEmpty()) {
			for (Map<String, Object> row : insertLines) {
				row.put("aprvln_id", UUID.randomUUID().toString()); // 결재선 아이디
				this.insertApprovalLine(row);
			}
		}
		if (updateLines != null && !updateLines.isEmpty()) {
			for (Map<String, Object> row : updateLines) {
				this.updateApprovalLine(row);
			}
		}
		if (deleteLines != null && !deleteLines.isEmpty()) {
			for (Map<String, Object> row : deleteLines) {
				this.deleteApprovalLine(row);
			}
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * 결재선을 조회한다.
	 *
	 * @author : wskim
	 * @param param
	 * @return the list
	 * @Date : 2018. 7. 16
	 * @Method Name : saveAprvLine
	 */
	public List<Map<String, Object>> findAprvLine(Map<String, Object> param){
		return this.findListApprovalLine(param);
	}
	
	
	
	/**
	 * 결재서식의 header 정보를 설정. 
	 * 기안일자, 기안자이름, 기안자 운영단위 정도.
	 *
	 * @author : LMS
	 * @return Map<String, Object> 
	 * @Date : 2017. 05. 23
	 * @Method Name : getApprovalMaster
	 */
	private Map<String, Object> getApprovalHeader(Map<String, Object> param){
		Map<String, Object> approvalMaster = new HashMap<String, Object>();
		
		Map<String, Object> userInfo = Auth.getCurrentUserInfo();//세션정보
		SimpleDateFormat sd = new SimpleDateFormat("yyyy/MM/dd");
		approvalMaster.put("rpt_dt", sd.format(new Date()));	//기안일자
		approvalMaster.put("reg_id", userInfo.get("usr_id"));							//기안자 id
		approvalMaster.put("reg_nm", userInfo.get("usr_nm"));							//기안자 이름	
		
		if(param.get("aprv_id") != null) {
			//결재id가 있을 경우 품의번호 설정.
			approvalMaster.put("aprv_docno", param.get("aprv_docno"));					//품의번호(결재 수정시에 넘어오는 param에는 기안일자가없음...)
		}
		
		return approvalMaster;
	}
	
	/**
	 * ApprovalFactory를 사용하여, approvalStrategy를 찾고, 해당 strategy에서 결재서식param을 가져온다.
	 *
	 * @author : LMS
	 * @param Map<String, Object> param
	 * @return Map<String, Object> resultMap
	 * @Date : 2017. 05. 23
	 * @Method Name : getFormParam
	 */
	private Map<String, Object> getFormParam(Map<String, Object> param){
		String aprv_typcd = (String)param.get("aprv_typcd");
		String app_id = (String)param.get("app_id");
		
		ApprovalStrategy strategy = factory.getApprovalStrategy(aprv_typcd);
		
		Map<String, Object> resultMap  = new HashMap<String, Object>();
		if(strategy != null) {
			resultMap = strategy.makeParam(aprv_typcd, app_id);
		}
		
		return resultMap;
	}
	
}