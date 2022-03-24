package smartsuite.app.bp.serviceManage;

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
 * 서비스 관리 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author hjh
 * @see
 * @since 2022. 2. 24
 * @FileName ServiceManageController.java
 * @package smartsuite.app.bp.serviceManage
 * @변경이력 : [2022. 2. 24] hjh 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping (value = "**/bp/serviceManage/**/")
public class ServiceManageController {

	/** The user service. */
	@Inject
	ServiceManageService ServiceManageService;
	
	/**
	 * 등록 서비스 그룹 조회
	 *
	 * @author : hjh
	 * @param 
	 * @return 
	 * @Date : 2022. 02. 24
	 * @Method Name : regSafetyServiceGroupList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "regSafetyServiceGroupList.do")
	public @ResponseBody Map regSafetyServiceGroupList(@RequestBody Map param) {
		return ServiceManageService.regSafetyServiceGroupList(param);
	}
	
	/**
	 * 등록 서비스 조회
	 *
	 * @author : hjh
	 * @param 
	 * @return 
	 * @Date : 2022. 02. 24
	 * @Method Name : findUserList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "findRegSafetyServiceList.do")
	public @ResponseBody List<Map<String,Object>> findRegSafetyServiceList(@RequestBody Map param) {
		return ServiceManageService.findRegSafetyServiceList(param);
	}
	
	/**
	 * 사용여부(SVC_CTL.SVC_USE_YN)을 수정한다
	 *
	 * @author : hjh
	 * @param SVC_CTL_ID String
	 * @param SVC_USE_YN String
	 * @return the map<string, object>: result_status String
	 * @Date : 2022. 02. 24
	 * @Method Name : updateServiceUseYn
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "updateServiceUseYn.do")
	public @ResponseBody Map<String,Object> updateServiceUseYn(@RequestBody Map param) {
		return ServiceManageService.updateServiceUseYn(param);
	}
	
	/**
	 * 서비스 신청하기. 
	 *
	 * @author : jake
	 * @param param the param
	 * @Date : 2022. 3. 8
	 * @Method Name : applyService
	 */ 
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "applyService.do")
	public @ResponseBody Map<String,Object> applyService(@RequestBody Map param) {
		return ServiceManageService.applyService(param);
	}
	
	/**
	 * 서비스카타로그별 디바이스 목록 조회
	 *
	 * @author : hjh
	 * @param : svc_ctl_id 서비스 카타로그 아이디
	 * @param : mdt_yn 필수 여부
	 * @return the map<string, object>: result_status String, result_data List
	 * @Date : 2022. 02. 24
	 * @Method Name : getDevicesByCatalogId
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "getDevicesByCatalogId.do")
	public @ResponseBody Map<String,Object> getDevicesByCatalogId(@RequestBody Map param) {
		return ServiceManageService.getDevicesByCatalogId(param);
	}	
	
	/**
	 * 예상월구독룍조회
	 *
	 * @author : hjh
	 * @param dvc_list Array device 및 수량 목록 
	 * @param sst_trm int 구독기간
	 * @return the map<string, object>: result_status String, result_data int 예상구독료
	 * @Date : 2022. 02. 24
	 * @Method Name : getDevicesByCatalogId
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "estimateMonthlyFee.do")
	public @ResponseBody Map<String,Object> estimateMonthlyFee(@RequestBody Map param) {
		return ServiceManageService.estimateMonthlyFee(param);
	}

	/**
	 * 계열사 목록 조회
	 *
	 * @author : hjh
	 * @param isSelectAll String Optional 0: 해당 회사의 사업장 목록만 조회, 1: 회사와 관계없이 전체 사업장 목록 조회
	 * @return the map<string, object>: result_status String, result_data List
	 * @Date : 2022. 02. 24
	 * @Method Name : getWPCList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "getCompanyList.do")
	public @ResponseBody Map<String,Object> getCompanyList(@RequestBody Map param) {
		return ServiceManageService.getCompanyList(param);
	}
	
	/**
	 * 사업장 목록 조회
	 *
	 * @author : hjh
	 * @param isSelectAll String Optional 0: 해당 회사의 사업장 목록만 조회, 1: 회사와 관계없이 전체 사업장 목록 조회
	 * @return the map<string, object>: result_status String, result_data List
	 * @Date : 2022. 02. 24
	 * @Method Name : getWPCList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "getWPCList.do")
	public @ResponseBody Map<String,Object> getWPCList(@RequestBody Map param) {
		return ServiceManageService.getWPCList(param);
	}
	
	/**
	 * C-서비스 이용 현황 - 사업장별 신청 서비스 그룹핑 조회
	 *
	 * @author : hjh
	 * @param 
	 * @return the map<string, object>: result_status String, result_data List
	 * @Date : 2022. 02. 24
	 * @Method Name : getWPCList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "getWpcServiceList.do")
	public @ResponseBody Map<String,Object> getWpcServiceList(@RequestBody Map param) {
		return ServiceManageService.getWpcServiceList(param);
	}
	
	/**
	 * C-서비스 이용 현황 - 사업장별 신청 서비스 전체 조회
	 *
	 * @author : hjh
	 * @param 
	 * @return the map<string, object>: result_status String, result_data List
	 * @Date : 2022. 02. 24
	 * @Method Name : getWPCList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "getWpcServiceListAll.do")
	public @ResponseBody Map<String,Object> getWpcServiceListAll(@RequestBody Map param) {
		return ServiceManageService.getWpcServiceListAll(param);
	} 
	
	/**
	 * C-서비스 이용 현황 - 조회
	 *
	 * @author : hjh
	 * @param 
	 * @return the map<string, object>: result_status String, result_data List
	 * @Date : 2022. 02. 24
	 * @Method Name : getWPCList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "getServiceUseList.do")
	public @ResponseBody Map<String,Object> getServiceUseList(@RequestBody Map param) {
		return ServiceManageService.getServiceUseList(param);
	}
	
	/**
	 * C-서비스 이용 현황 - 서비스 삭제
	 *
	 * @author : hjh
	 * @param svc_id
	 * @return delete Success ture 1 false 0
	 * @Date : 2022. 02. 24
	 * @Method Name : getWPCList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "deleteApplyService.do")
	public @ResponseBody Map<String,Object> deleteApplyService(@RequestBody Map param) {
		return ServiceManageService.changeApplyService(param);
	}
	
	/**
	 * 1:1 문의 게시판 조회
	 *
	 * @author : hjh
	 * @param 
	 * @return
	 * @Date : 2022. 03. 16
	 * @Method Name : searchHotLine
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "searchHotLine.do")
	public @ResponseBody Map<String,Object> searchHotLine(@RequestBody Map param) {
		return ServiceManageService.searchHotLine(param);
	}
	
	/**
	 * 1:1 문의 게시판 문의하기 상세 조회
	 *
	 * @author : hjh
	 * @param 
	 * @return
	 * @Date : 2022. 03. 16
	 * @Method Name : searchHotLineDetail
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "searchHotLineDetail.do")
	public @ResponseBody Map<String,Object> searchHotLineDetail(@RequestBody Map param) {
		return ServiceManageService.searchHotLineDetail(param);
	}
	
	/**
	 * 1:1 문의 게시판 문의하기
	 *
	 * @author : hjh
	 * @param 
	 * @return
	 * @Date : 2022. 03. 16
	 * @Method Name : addQNA
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "addHotLine.do")
	public @ResponseBody Map<String,Object> addHotLine(@RequestBody Map param) {
		return ServiceManageService.addHotLine(param);
	}
	
	/**
	 * 1:1 문의 게시판 문의내용 삭제
	 *
	 * @author : hjh
	 * @param 
	 * @return
	 * @Date : 2022. 03. 16
	 * @Method Name : deleteQNA
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "deleteHotLine.do")
	public @ResponseBody Map<String,Object> deleteHotLine(@RequestBody Map param) {
		return ServiceManageService.deleteHotLine(param);
	}
	
	
	
	/**
	 * 서비스 이용 현황 / 서비스 이용 상세 내역 
	 *
	 * @author : hjh
	 * @param 
	 * @return 
	 * @Date : 2022. 03. 18
	 * @Method Name : getServiceUseListDetail
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "getServiceUseListDetail.do")
	public @ResponseBody Map<String,Object> getServiceUseListDetail(@RequestBody Map param) {
		return ServiceManageService.getServiceUseListDetail(param);
	}
	
	/**
	 * 서비스 이용 현황 / 서비스 이용 상세 내역 구독료 납부 현황
	 *
	 * @author : hjh
	 * @param 
	 * @return 
	 * @Date : 2022. 03. 18
	 * @Method Name : getServiceUseListDetailPayList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "getServiceUseListDetailPayList.do")
	public @ResponseBody Map<String,Object> getServiceUseListDetailPayList(@RequestBody Map param) {
		return ServiceManageService.getServiceUseListDetailPayList(param);
	}
	
	/**
	 * 서비스 변경 신청
	 *
	 * @author : hjh
	 * @param 
	 * @return 
	 * @Date : 2022. 03. 18
	 * @Method Name : serviceUseChange
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "serviceUseChange.do")
	public @ResponseBody Map<String,Object> serviceUseChange(@RequestBody Map param) {
		return ServiceManageService.serviceUseChange(param);
	}
	
	/**
	 * 서비스 이용 승인( 신청-> 승인 -> 개시대기 -> 구독 -> 변경 )
	 *
	 * @author : hjh
	 * @param 
	 * @return 
	 * @Date : 2022. 03. 18
	 * @Method Name : serviceUseApproveProcess
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "serviceUseApproveProcess.do")
	public @ResponseBody Map<String,Object> serviceUseApproveProcess(@RequestBody Map param) {
		return ServiceManageService.serviceUseApproveProcess(param);
	}
	
	/**
	 * 서비스 신청 관리 : 조회
	 *
	 * @author : hjh
	 * @param 
	 * @return 
	 * @Date : 2022. 03. 23
	 * @Method Name : getServiceAprList
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "getServiceAprList.do")
	public @ResponseBody Map<String,Object> getServiceAprList(@RequestBody Map param) {
		return ServiceManageService.getServiceAprList(param);
	}
	
	/**
	 * 서비스 신청 관리 : 신규신청 상세조회
	 *
	 * @author : hjh
	 * @param 
	 * @return 
	 * @Date : 2022. 03. 23
	 * @Method Name : getServiceAprListDetail
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "getServiceAprListDetail.do")
	public @ResponseBody Map<String,Object> getServiceAprListDetail(@RequestBody Map param) {
		return ServiceManageService.getServiceAprListDetail(param);
	}
	
	/**
	 * 서비스 신청 관리 : 변경신청 상세조회
	 *
	 * @author : hjh
	 * @param 
	 * @return 
	 * @Date : 2022. 03. 23
	 * @Method Name : getServiceChgAprListDetail
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping (value = "getServiceChgAprListDetail.do")
	public @ResponseBody Map<String,Object> getServiceChgAprListDetail(@RequestBody Map param) {
		return ServiceManageService.getServiceAprListDetail(param);
	}
	
}
