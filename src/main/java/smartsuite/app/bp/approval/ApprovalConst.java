package smartsuite.app.bp.approval;

public class ApprovalConst {
	
	/** 결재 진행상태: 임시저장(T) */
	public static final String APRV_STS_DRAFT = "T";
	
	/** 결재 진행상태: 결재상신(P) */
	public static final String APRV_STS_IN_PROGRESS = "P";
	
	/** 결재 진행상태: 상신취소(D) */
	public static final String APRV_STS_CANCEL = "D";
	
	/** 결재 진행상태: 결재반려(B) */
	public static final String APRV_STS_ABANDON = "B";
	
	/** 결재 진행상태: 결재승인(C) */
	public static final String APRV_STS_APPROVE = "C";
	
	/** 결재선 구분: 결재선(AL) */
	public static final String APRV_LINE = "AL";
	
	/** 결재선 구분: 참조선(RL) */
	public static final String REF_LINE = "RL";
	
	/** 결재선 결과상태: 미처리(N) */
	public static final String APRVLN_STS_NHDL = "N";
	
	/** 결재선 결과상태: 반려(B) */
	public static final String APRVLN_STS_ABDN = "B";
	
	/** 결재선 결과상태: 승인(C) */
	public static final String APRVLN_STS_APRV = "C";
	
	/** 결재선 결과상태: 열람(R) - 참조자(RL)인 경우 */
	public static final String APRVLN_STS_READ = "R";
	
	/** 결재 승인처리 오류상태: 결재승인 오류(E) */
	public static final String APRV_ERR = "E";
	
	/** 결재 승인처리 오류상태: 결재승인 오류없음(N) */
	public static final String APRV_NON_ERR = "N";
	
	/** 결재 승인처리 오류상태: 결재승인 처리중(P) */
	public static final String APRV_PROG = "P";
}
