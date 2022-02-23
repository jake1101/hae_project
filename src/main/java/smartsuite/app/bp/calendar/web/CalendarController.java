package smartsuite.app.bp.calendar.web;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * CalendarMgt 관련 처리를 하는 컨트롤러 Class입니다.
 * 
 * @see
 * @since 2016.10.27
 * @FileName CalendarMgtController.java
 * @package smartsuit.calendar.web.calendar
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/bp/common/calendar/**/")
public class CalendarController {
	@Inject
	CalendarService calendarService;
	
	/**
	 * 알람 또는 반복 정보를 가져옴
	 */
	@RequestMapping(value = "getCommonCalendarData.do")
	public @ResponseBody Map<String, Object> getCommonCalendarData(@RequestBody Map param) {	
		return calendarService.getCommonData();
	}
	
	/**
	 * 그룹 및 일정 정보를 리턴
	 */
	@RequestMapping(value="getScheduleInfo.do")
	public @ResponseBody List<Map<String, Object>> getScheduleInfo(@RequestBody Map param) {
		return calendarService.getScheduleInfo(param);
	}
	
	/**
	 * 그룹 검색
	 */
	@RequestMapping(value="findSchedule.do")
	public @ResponseBody List<Map<String, Object>> getScheduleUsinParam(@RequestBody Map param) {
		return calendarService.getScheduleUsingParam(param);
	}
	
	/**
	 * 그룹 정보 저장
	 */
	@RequestMapping(value="saveGroup.do")
	public @ResponseBody Map<String, Object> saveGroup(@RequestBody Map param) {
		return calendarService.saveGroup(param);
	}
	
	/**
	 * 그룹 정보 삭제
	 */
	@RequestMapping(value="delGroup.do")
	public @ResponseBody Map<String, Object> delGroup(@RequestBody Map param) {
		return calendarService.delGroup(param);
	}
	
	/**
	 * 그룹 공유자 정보 조회
	 */
	@RequestMapping(value="getGroupMappingInfo.do")
	public @ResponseBody Map<String, Object> getGroupMappingInfo(@RequestBody Map param) {
		return calendarService.getGroupMappingInfo(param);
	}
	
	/**
	 * 스케줄 정보 저장
	 */
	@RequestMapping(value="saveSchedule.do")
	public @ResponseBody Map<String, Object> saveSchedule(@RequestBody Map param) {
		return calendarService.saveSchedule(param);
	}
	
	/**
	 * 스케줄 정보 삭제
	 */
	@RequestMapping(value="deleteSchedule.do")
	public @ResponseBody Map<String, Object> deleteSchedule(@RequestBody Map param) {
		return calendarService.deleteSchedule(param);
	}
	
	/**
	 * 스케줄 업데이트
	 */
	@RequestMapping(value="updateSchedule.do")
	public @ResponseBody Map<String, Object> updateSchedule(@RequestBody Map param) {
		return calendarService.updateSchedule(param);
	}
	
	/**
	 * 알람
	 */
	@RequestMapping(value="readyToGetSchedule.do")
	public @ResponseBody List<Map<String, Object>> getNoticeSchedule(@RequestBody Map param) {
		return calendarService.getNoticeSchedule(param);
	}
	
	/**
	 * 알람 개인화 상태 저장
	 */
	@RequestMapping(value="getNoticeState.do")
	public @ResponseBody Map<String, Object> getNoticeState() {
		return calendarService.getNoticeState();
	}
	
	
	/**
	 * 알람 개인화 상태 저장
	 */
	@RequestMapping(value="saveNoticeState.do")
	public @ResponseBody Map<String, Object> saveNoticeState(@RequestBody Map param) {
		return calendarService.saveNoticeState(param);
	}
	
	/**
	 * 알람 개인화 상태 제거
	 */
	@RequestMapping(value="removeNoticeState.do")
	public @ResponseBody Map<String, Object> removeNoticeState(@RequestBody Map param) {
		return calendarService.removeNoticeState(param);
	}
	
	/**
	 * 공통 정보
	 */
	@RequestMapping(value="findListUserInCalendar.do")
	public @ResponseBody List<Map<String, Object>> getUserList(@RequestBody Map param) {
		return calendarService.getUserList(param);
	}
	@RequestMapping(value="findListDeptInCalendar.do")
	public @ResponseBody List<Map<String, Object>> getDeptList(@RequestBody Map param) {
		return calendarService.getDeptList(param);
	}
}
