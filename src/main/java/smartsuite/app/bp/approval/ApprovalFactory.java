package smartsuite.app.bp.approval;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

@Service
public class ApprovalFactory implements ApplicationContextAware {
	ApplicationContext actx;

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		actx = applicationContext;
	}

	/**
	 * approval strategy의 값을 반환한다.
	 *
	 * @param approvalType the approval type
	 * @return ApprovalStrategy
	 */
	public ApprovalStrategy getApprovalStrategy(String approvalType) {
		ApprovalStrategy strategy;
		if ("PR".equals(approvalType)) { // 구매요청
			strategy = (ApprovalStrategy)actx.getBean("prApprovalService");

		} else if ("PC".equals(approvalType)) { // 구매요청변경
			strategy = (ApprovalStrategy)actx.getBean("prModApprovalService");

		} else if ("GR".equals(approvalType)) { // 검수
			strategy = (ApprovalStrategy)actx.getBean("grApprovalService");

		} else if ("SGR".equals(approvalType)) { // 기성승인
			strategy = (ApprovalStrategy)actx.getBean("paymentBillApprovalService");

		} else if ("POC".equals(approvalType)) { // 발주
			strategy = (ApprovalStrategy)actx.getBean("poApprovalService");

		} else if ("CACP".equals(approvalType)) { // 발주변경
			strategy = (ApprovalStrategy)actx.getBean("modifyPoApprovalService");

		} else if ("ACP".equals(approvalType)) { // 발주변경요청
			strategy = (ApprovalStrategy)actx.getBean("modifyReqPoApprovalService");

		} else if ("PCP".equals(approvalType)) { // 단가계약
			strategy = (ApprovalStrategy)actx.getBean("priceContractApprovalService");

		} else if ("APCP".equals(approvalType)) { // 단가계약변경(구매부서)
			strategy = (ApprovalStrategy)actx.getBean("modifyPriceContractApprovalService");

		} else if ("CPCP".equals(approvalType)) { // 단가계약변경요청(요청부서)
			strategy = (ApprovalStrategy)actx.getBean("modifyReqPriceContractApprovalService");

		} else if ("SVD".equals(approvalType)) {
			strategy = (ApprovalStrategy)actx.getBean("rfxApprovalService");

		} else if ("CSV".equals(approvalType)) {
			strategy = (ApprovalStrategy)actx.getBean("rfxResultApprovalService");

		} else if ("AUP".equals(approvalType)) { // 역경매진행품의
			strategy = (ApprovalStrategy)actx.getBean("auctionProgressApprovalService");

		} else if ("AUR".equals(approvalType)) { // 역경매결과품의
			strategy = (ApprovalStrategy)actx.getBean("auctionResultApprovalService");

		} else if ("EREG".equals(approvalType)) { // 협력사등록요청
			strategy = (ApprovalStrategy)actx.getBean("vendorRegisterApprovalService");

		} else if ("EMOD".equals(approvalType)) { // 협력사주요정보변경
			strategy = (ApprovalStrategy)actx.getBean("vendorModifyApprovalService");

		} else if ("ESTP".equals(approvalType)) { // 협력사거래정지
			strategy = (ApprovalStrategy)actx.getBean("vendorStopApprovalService");

		} else if ("EEVE".equals(approvalType)) { // 협력사 평가결과 거래요청
			strategy = (ApprovalStrategy)actx.getBean("vendorEeveApprovalService");

		} else if ("ERE".equals(approvalType)) { // 협력사 평가결과갱신
			strategy = (ApprovalStrategy)actx.getBean("vendorEreApprovalService");

		} else if ("EVAL".equals(approvalType) || "SCT".equals(approvalType)) { // 정기평가 확정, 전략특성평가 확정
			strategy = (ApprovalStrategy)actx.getBean("srmEvalApprovalService");

		} else if("PPRI".equals(approvalType)) { // 공공입찰 - 사전공고
			strategy = (ApprovalStrategy)actx.getBean("priNotiApprovalService");

		} else if("PPRICN".equals(approvalType)) { // 공공입찰 - 사전공고취소
			strategy = (ApprovalStrategy)actx.getBean("priNotiApprovalService");

		} else if ("PBID".equals(approvalType)) { // 공공입찰 - 입찰공고
			strategy = (ApprovalStrategy)actx.getBean("bidApprovalService");

		} else if ("PBDM".equals(approvalType)) { // 공공입찰 - 입찰일시변경
			strategy = (ApprovalStrategy)actx.getBean("bidApprovalService");

		} else if ("PBCN".equals(approvalType)) { // 공공입찰 - 공고취소
			strategy = (ApprovalStrategy)actx.getBean("bidApprovalService");

		} else if ("PBCR".equals(approvalType)) { // 공공입찰 - 정정공고
			strategy = (ApprovalStrategy)actx.getBean("bidApprovalService");

		} else if ("PIJ".equals(approvalType)) { // 공공입찰 - 부정당업자
			strategy = (ApprovalStrategy)actx.getBean("vendorApprovalService");

		} else if ("PBRP".equals(approvalType)) { // 공공입찰 - 기초조서
			strategy = (ApprovalStrategy)actx.getBean("priceMgtApprovalService");

		} else if ("QEVAL".equals(approvalType)) { // 공공입찰 - 적격심사
			strategy = (ApprovalStrategy)actx.getBean("bidQualApprovalService");

		} else if ("NEGOREQ".equals(approvalType)) { // 공공입찰 - 협상의뢰
			strategy = (ApprovalStrategy)actx.getBean("bidNegoApprovalService");

		} else if ("NEGORES".equals(approvalType)) { // 공공입찰 - 협상결과
			strategy = (ApprovalStrategy)actx.getBean("bidNegoApprovalService");

		} else if("STLC".equals(approvalType)) { // 공공입찰 - 낙찰취소
			strategy = (ApprovalStrategy)actx.getBean("bidOpenResultApprovalService");
		} else if("CMPL".equals(approvalType)){	//이의제기
			strategy = (ApprovalStrategy)actx.getBean("srmEvalCmplApprovalService");
		} else if("DIFF".equals(approvalType)){ //차별화전략수행
			strategy = (ApprovalStrategy)actx.getBean("elevApprovalService");
		} else {
			strategy = null;
		}
		return strategy;
	}

}
