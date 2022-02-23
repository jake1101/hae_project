package smartsuite.app.bp.calendar.web;

import java.util.List;
import java.util.Map;

public interface CalendarService {
	// 공통
	public Map<String, Object> getCommonData();
	public List<Map<String, Object>> getScheduleInfo(Map<String, Object> param);
	public void delCalendarUser(String userId);
	
	// 그룹 관련
	public Map<String, Object> saveGroup(Map<String, Object> param);
	public Map<String, Object> delGroup(Map<String, Object> param);
	public Map<String, Object> getGroupMappingInfo(Map<String, Object> param);
	
	// 일정 관련
	public Map<String, Object> saveSchedule(Map<String, Object> param);
	public Map<String, Object> deleteSchedule(Map<String, Object> param);
	public Map<String, Object> updateSchedule(Map<String, Object> param);
	public List<Map<String, Object>> getNoticeSchedule(Map<String, Object> param);
	public Map<String, Object> getNoticeState();
	public Map<String, Object> saveNoticeState(Map<String, Object> param);
	public Map<String, Object> removeNoticeState(Map<String, Object> param);
	public List<Map<String, Object>> getScheduleUsingParam(Map<String, Object> param);
	
	// 공통 정보 - 사원, 부서 정보 가져오기
	public List<Map<String, Object>> getUserList(Map<String, Object> param);
	public List<Map<String, Object>> getDeptList(Map<String, Object> param);
}
