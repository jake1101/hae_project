package smartsuite.app.bp.admin.approval;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

/**
 * ApprovalTemplate 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @see 
 * @since 2017. 2. 20
 * @FileName ApprovalTemplateController.java
 * @package smartsuite.app.bp.admin.approval
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping(value="**/bp/**/")
public class ApprovalTemplateController {

	/** The approval service. */
	@Inject
	ApprovalTemplateService approvalService;
	
	/**
	 * list approval tmp 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2017. 2. 20
	 * @Method Name : findListApprovalTmp
	 */
	/* 결재 템플릿 목록 조회 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value="findListApprovalTmp.do")
	public @ResponseBody List findListApprovalTmp(@RequestBody Map param){
		return approvalService.findListApprovalTmp(param);
	}
	
	/**
	 * approval tmp by cd 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2017. 2. 20
	 * @Method Name : findApprovalTmpByCd
	 */
	/* 결재 템플릿 상세 조회(단건조회) */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value="findApprovalTmpByCd.do")
	public @ResponseBody Map findApprovalTmpByCd(@RequestBody Map param){
		return approvalService.findApprovalTmpByCd(param);
	}
	
	/**
	 * approval tmp 저장을 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2017. 2. 20
	 * @Method Name : saveApprovalTmp
	 */
	/* 결재 템플릿 저장 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value="saveApprovalTmp.do")
	public @ResponseBody Map saveApprovalTmp(@RequestBody Map param){
		return approvalService.saveApprovalTmp(param);
	}
	
	/**
	 * approval tmp bas id list 조회를 요청한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @return the approval tmp bas id list
	 * @Date : 2017. 2. 20
	 * @Method Name : getApprovalTmpBasIdList
	 */
	/* combobox 목록조회 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value="getApprovalTmpBasIdList.do")
	public @ResponseBody List getApprovalTmpBasIdList(@RequestBody Map param){
		return approvalService.getApprovalTmpBasIdList(param);
	}
}
