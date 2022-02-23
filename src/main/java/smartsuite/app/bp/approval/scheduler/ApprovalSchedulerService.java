package smartsuite.app.bp.approval.scheduler;

import java.util.Date;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.scheduler.core.ScheduleService;

/**
 * 결재 스케쥴러 관련 Service
 * <pre>
 * saveApprovalLineResult : 결재선 결과 저장 스케쥴러 등록
 * </pre>
 */
@Service
@Transactional
public class ApprovalSchedulerService {

	/** The sql session. */
	@Inject
	SqlSession sqlSession;

	/** The schedule service. */
	@Inject
	ScheduleService scheduleService;
	
	public void saveApprovalLineResult(Map<String, Object> param) throws Exception {
		if(param.get("aprv_id") != null) {
			Object[] args = new Object[]{param};
			
			Date startScheduleTime = new Date();
			if(param.get("startScheduleTime") != null)
				startScheduleTime = (Date)param.get("startScheduleTime");
			
			scheduleService.registSchedule(Class.forName(ApprovalJobConst.APRV_SERVICE_CLASS_NAME),
					ApprovalJobConst.SAVE_APRV_LINE_RESULT_METHOD_NAME,
					args,
					startScheduleTime,
					ApprovalJobConst.APRV_JOB_GROUP,
					param.get("aprv_id").toString(),
					ApprovalJobConst.SAVE_APRV_LINE_RESULT_JOB_NAME,
					null);
		}
	}
}
