package smartsuite.app.bp.approval;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import com.google.common.base.Strings;

import smartsuite.app.bp.admin.validator.Validator;
import smartsuite.app.bp.admin.validator.ValidatorUtil;
import smartsuite.app.common.shared.Const;

@Service
public class ApprovalValidator implements Validator {
	@Inject
	SqlSession sqlSession;

	@Override
	public Map<String, Object> validate(Map<String, Object> param) {
		String aprvId = param.get("aprv_id") == null ? null : param.get("aprv_id").toString();
		
		if (Strings.isNullOrEmpty(aprvId)) {
			// 최초 결재 생성(상신) 시
			// appId(업무ID)로 결재상신 건이 존재하는 체크한다.
			Map<String, Object> resultMap = new HashMap<String, Object>();
			String dupCheckAppId = sqlSession.selectOne("approvalMaster.checkAppMasterDupAppId", param);
			if(!Strings.isNullOrEmpty(dupCheckAppId)){
				resultMap.put(Const.RESULT_STATUS, Const.DUPLICATED);
			} else {
				resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
			}
			return resultMap;	
			
		} else {
			// 결재 수정/상신/삭제 시
			// 결제모듈 호출 시점의 결재진행상태와 서버상의 결재진행상태가 일치하는지 체크한다.
			Map<String, Object> checkResult = sqlSession.selectOne("approvalMaster.compareAprvSts", param);
			return ValidatorUtil.getResultMapByCheckResult(param, checkResult);
		}
	}

}
