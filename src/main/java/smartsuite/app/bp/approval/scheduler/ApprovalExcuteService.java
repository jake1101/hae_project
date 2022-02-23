package smartsuite.app.bp.approval.scheduler;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import smartsuite.app.bp.approval.ApprovalConst;
import smartsuite.app.bp.approval.ApprovalService;

@Service
public class ApprovalExcuteService {

	@Inject
	ApprovalService approvalService;
	
	/**
	 * 결재선 결과 저장 스케쥴러 수행 service
	 * <pre>
	 * transaction 분리를 위해 이 service에는 transaction을 주지 않음
	 * 
	 * (1) approvalService.saveApprovalLineResult
	 *     : 실제 로직 수행 service (Exception 발생 시 rollback)
	 *     
	 * (2) approvalService.updateAprvErrCd
	 *     : 결재선 결과 처리 오류상태 업데이트
	 *      (1)의 service에서 Exception이 발생하여도 별도의 트랜잭션으로 수행하여
	 *      에러로그를 기록한다.
	 * </pre>
	 * @param param {aprv_id, aprvln_id, usr_id, aprv_rescd, aprv_opn}
	 * @see ApprovalSchedulerService
	 * @see ApprovalService
	 * @see ApprovalConst
	 */
	public void saveApprovalLineResult(HashMap<String, Object> param) {
		Map<String, Object> updateParam = new HashMap<String, Object>();
		updateParam.put("aprv_id", param.get("aprv_id"));
		
		try {
			approvalService.saveApprovalLineResult(param);
			
			updateParam.put("aprv_errcd", ApprovalConst.APRV_NON_ERR);	// 결재선 결과 처리 완료(오류없음)
		} catch(Exception e) {
			updateParam.put("aprv_errcd", ApprovalConst.APRV_ERR);		// 결재선 결과 처리 오류
			updateParam.put("aprv_errcont", e.getMessage());
		} finally {
			approvalService.updateAprvErrCd(updateParam);		// 결재선 결과 처리 오류상태 업데이트
		}
	}
}