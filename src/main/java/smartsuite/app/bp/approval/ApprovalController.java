package smartsuite.app.bp.approval;

import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.shared.Const;
import smartsuite.data.FloaterStream;
import smartsuite.security.annotation.AuthCheck;

/**
 * 결재 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author JongKyu Kim
 * @see
 * @since 2016. 2. 2
 * @FileName ApprovalController.java
 * @package smartsuite.app.bp.approval
 * @변경이력 : [2016. 2. 2] JongKyu Kim 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping (value = "**/approval/")
public class ApprovalController {

	/** The approval service. */
	@Inject
	ApprovalService approvalService;

	/**
	 * 결재 상신 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the approval list
	 * @Date : 2016. 2. 2
	 * @Method Name : findListApprovalSubmit
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListApprovalSubmit.do")
	public @ResponseBody FloaterStream findListApprovalSubmit(@RequestBody Map param) {
		param.put("list_type", "submit"); // 상신(submit) 목록
		
		// 대용량 처리
		return approvalService.findListApproval(param);
	}

	/**
	 * 결재 수신 목록 조회를 요청한다.
	 *
	 * @author : JongKyu Kim
	 * @param param the param
	 * @return the approval list
	 * @Date : 2016. 2. 2
	 * @Method Name : findListApprovalReceipt
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findListApprovalReceipt.do")
	public @ResponseBody FloaterStream findListApprovalReceipt(@RequestBody Map param) {
		param.put("list_type", "receipt"); // 수신(receipt) 목록
		
		// 대용량 처리
		return approvalService.findListApproval(param);
	}

	/**
	 * 결재 승인 오류내용 조회
	 * 
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findApprovalErrCont.do")
	public @ResponseBody Map findApprovalErrCont(@RequestBody Map param) {
		return approvalService.findApprovalErrCont(param);
	}
	
	/**
	 * 일괄결재
	 */
	@AuthCheck (authCode = Const.APPROVAL)
	@RequestMapping (value = "approveApprovals.do")
	public @ResponseBody Map approveApprovals(@RequestBody Map param) throws Exception {
		return approvalService.approveApprovals(param);
	}
}