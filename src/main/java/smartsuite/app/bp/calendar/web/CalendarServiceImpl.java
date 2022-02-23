package smartsuite.app.bp.calendar.web;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.bp.calendar.core.CalendarData;
import smartsuite.app.bp.calendar.core.Const;
import smartsuite.app.bp.calendar.core.NoticeInfo;
import smartsuite.app.bp.calendar.core.RepeatInfo;


/**
 * Calendar manager 관련 처리하는 서비스 Class 입니다.
 * 
 * @see
 * @FileName CalendarMgtService.java
 * @package smartsuit.calendar.web
 * @Since 2016.10.27
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class CalendarServiceImpl implements CalendarService {
	
	/** The sql session. */
	@Inject
	private SqlSession sqlSession;
	
	@Override
	public Map<String, Object> getCommonData() {
		Map<String, Object> data = new HashMap<String, Object>();
		
		// 알람 정보
		List<Map<String, Object>> noticeItemList = new ArrayList<Map<String, Object>>();
		for(NoticeInfo noticeInfo : CalendarData.noticeInfoList) {
			Map<String, Object> noticeItem = new HashMap<String, Object>();
			noticeItem.put("label", noticeInfo.noticeType);
			noticeItem.put("data", noticeInfo.noticeTerm);
			noticeItemList.add(noticeItem);
		}
		data.put("noticeData", noticeItemList);
		
		
		// 반복 정보
		List<Map<String, Object>> repeatLabelList = new ArrayList<Map<String, Object>>();
		for(RepeatInfo repeatInfo : CalendarData.repeatInfoList) {
			Map<String, Object> repeatData = new HashMap<String,Object>();
			repeatData.put("label", repeatInfo.repeatType);
			repeatData.put("data", repeatInfo.repeatDuration);
			repeatLabelList.add(repeatData);
		}
		data.put("repeatData", repeatLabelList);
		
		// 색상 정보
		List<Map<String, Object>> colorList = new ArrayList<Map<String, Object>>();
		for(String color : CalendarData.colorList) {
			Map<String, Object> colorInfo = new HashMap<String, Object>();
			colorInfo.put("eventColor", color);
			colorList.add(colorInfo);
		}
		data.put("colorData", colorList);
		
		return data;
	}
	
	private void generateDefaultGroup() {
		Map<String, Object> privateGroup = new HashMap<String, Object>();
		privateGroup.put("grp_nm", "개인 일정");
		privateGroup.put("grp_desc", "개인이 소유한 일정");
		privateGroup.put("grp_color", CalendarData.DARK_GRAY);
		privateGroup.put("is_default", true);
		this.saveGroup(privateGroup);
	}
	
	@Override
	public List<Map<String, Object>> getScheduleInfo(Map<String, Object> param) {
		// 기본 그룹 정보를 가져옴
		List<Map<String, Object>> ownGroupInfo = sqlSession.selectList("calendar.getDefaultScheduleGroup");
		
		// 현재 사용자가 볼 수 있는 그룹 목록 가져오기 (일부만 가져오지 않음)
		List<Map<String,Object>> totalInfoList = sqlSession.selectList("calendar.getCalendarScheduleGroupList", param);
		
		// 어떤 아이템도 없을 경우 - 기본 값 신규 추가
		if(ownGroupInfo.size() == 0) {
			this.generateDefaultGroup();
			totalInfoList = sqlSession.selectList("calendar.getCalendarScheduleGroupList", param);
		}
		
		// 스케줄 정보 가져오기
		Map<String, Object> searchParam = new HashMap<String, Object>();
		searchParam.put("start_limit", param.get("start_limit"));
		searchParam.put("end_limit", param.get("end_limit"));
		searchParam.put("target_group", totalInfoList);
		List<Map<String, Object>> scheduleInfoList = sqlSession.selectList("calendar.getCalendarScheduleList", searchParam);
		
		// 모든 그룹에 대하여 scheduleList 필드 추가
		for(Map<String, Object> groupInfo : totalInfoList) {
			groupInfo.put("scheduleList", new ArrayList<Map<String, Object>>());
		}
		
		// 각 그룹에 적합한 스케줄을 넣는다. 
		if(scheduleInfoList != null) {
			for(Map<String, Object> scheduleInfo : scheduleInfoList) {
				for(Map<String, Object> groupInfo : totalInfoList) {
					if(groupInfo.get("grp_id").equals(scheduleInfo.get("grp_id"))) {
						List<Map<String, Object>> scheduleList = (List<Map<String, Object>>) groupInfo.get("scheduleList");
						scheduleList.add(scheduleInfo);
						break;
					}
				}
			}
		}
		
		// 전체 리스트 리턴
		return totalInfoList;
	}
	
	public List<Map<String, Object>> getScheduleUsingParam(Map<String, Object> param) {
		return sqlSession.selectList("calendar.getCalendarScheduleListUsingParam", param);
	}

	@Override
	public Map<String, Object> saveGroup(Map<String, Object> param) {
		// 신규 저장일 경우
		if(param.get("grp_id") == null) {
			param.put("grp_id", UUID.randomUUID().toString());
			sqlSession.insert("calendar.saveScheduleGroup", param);
		} 
		
		// 업데이트일 경우
		else {
			sqlSession.delete("calendar.deleteCalendarGroupUserMappingInfo", param);
			sqlSession.delete("calendar.deleteCalendarGroupDeptMappingInfo", param);
			sqlSession.update("calendar.updateScheduleGroup", param);
		}
		
		// 공유 사용자 추가
		List<Map<String, Object>> sharedUserList = (List<Map<String, Object>>) param.get("target_users");
		if(sharedUserList != null) {
			for(Map<String, Object> sharedUserInfo : sharedUserList) {
				sharedUserInfo.put("grp_id", param.get("grp_id"));
				sqlSession.insert("calendar.saveCalendarGroupUserMappingInfo", sharedUserInfo);
			}
		}
		
		// 공유 부서 추가
		List<Map<String, Object>> sharedDeptList = (List<Map<String, Object>>) param.get("target_depts");
		if(sharedDeptList != null) {
			for(Map<String, Object> sharedDeptInfo : sharedDeptList) {
				sharedDeptInfo.put("grp_id", param.get("grp_id"));
				sqlSession.insert("calendar.saveCalendarGroupDeptMappingInfo", sharedDeptInfo);
			}
		}
		
		// 결과물 리턴
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		resultMap.put("group_info", param);
		return resultMap;
	}
	
	@Override
	public Map<String, Object> delGroup(Map<String, Object> param) {
		sqlSession.delete("calendar.deleteScheduleGroup", param);
		
		// 결과물 리턴
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		resultMap.put("grp_id", (String) param.get("grp_id"));
		return resultMap;
	}
	
	@Override
	public Map<String, Object> getGroupMappingInfo(Map<String, Object> param) {
		List sharedUserGroupList = sqlSession.selectList("calendar.findGroupUserInfo", param);
		List sharedDeptGroupList = sqlSession.selectList("calendar.findGroupDeptInfo", param);
		
		// 결과물 리턴
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap.put("target_users", sharedUserGroupList);
		resultMap.put("target_depts", sharedDeptGroupList);
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		resultMap.put("grp_id", (String) param.get("grp_id"));
		return resultMap;
	}
	
	private void saveRepeatSchedule(Map<String, Object> param, String root_id) {
		Long repeatValue = ((Integer)param.get("repeat")).longValue();
		Calendar repeatEndDate = Calendar.getInstance();
		repeatEndDate.setTime((Date) param.get("repeat_end"));
		repeatEndDate.set(Calendar.HOUR, 23);
		repeatEndDate.set(Calendar.MINUTE, 59);
		repeatEndDate.set(Calendar.SECOND, 59);
		Calendar repeatCounter = Calendar.getInstance();
		repeatCounter.setTime((Date) param.get("start_date"));
		Calendar repeatNoticeCounter = Calendar.getInstance();
		if(param.get("notice_date") != null) {
			repeatNoticeCounter.setTime((Date) param.get("notice_date"));
		}
		long duration = ((Date) param.get("end_date")).getTime() - ((Date) param.get("start_date")).getTime();
		
		param.put("repeat", repeatValue.toString());
		param.put("repeat_root", root_id);
		
		// 반복 회수에 맞게 일정을 생성한다.
		while(true) {
			if(repeatValue == CalendarData.DAILY_REPEAT.repeatDuration) {
				repeatCounter.add(Calendar.DATE, 1);
				repeatNoticeCounter.add(Calendar.DATE, 1);
			} else if(repeatValue == CalendarData.WEEKLY_REPEAT.repeatDuration) {
				repeatCounter.add(Calendar.HOUR, 24 * 7);
				repeatNoticeCounter.add(Calendar.HOUR, 24 * 7);
			} else if(repeatValue == CalendarData.MONTHLY_REPEAT.repeatDuration) {
				repeatCounter.add(Calendar.MONDAY, 1);
				repeatNoticeCounter.add(Calendar.MONDAY, 1);
			} else if(repeatValue == CalendarData.YEARLY_REPEAT.repeatDuration) {
				repeatCounter.add(Calendar.YEAR, 1);
				repeatNoticeCounter.add(Calendar.YEAR, 1);
			}
			
			// 종료일자에 맞거나 넘어가면 반복 중지
			if(repeatEndDate.getTimeInMillis() <= repeatCounter.getTimeInMillis()) {
				break;
			}
			
			param.put("sched_id", UUID.randomUUID().toString());
			param.put("start_date", repeatCounter.getTime());
			if(param.get("notice_date") != null) {
				param.put("notice_date", repeatNoticeCounter.getTime());
			} else {
				param.put("notice_date", null);
			}
			Date sched_end = new Date(repeatCounter.getTimeInMillis() + duration);
			param.put("end_date", sched_end);
			sqlSession.insert("calendar.saveSchedule", param);
		}
	}

	@Override
	public Map<String, Object> saveSchedule(Map<String, Object> param) {
		String root_id = UUID.randomUUID().toString();
		param.put("sched_id", root_id);
		if(param.get("repeat") != null) param.put("repeat_root", root_id);
		sqlSession.insert("calendar.saveSchedule", param);
		
		// 만약 반복 정보가 존재한다면 반복 일정을 생성함
		if(param.get("repeat") != null) {
			this.saveRepeatSchedule(param, root_id);
		}
		
		// 결과물 리턴
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	@Override
	public Map<String, Object> deleteSchedule(Map<String, Object> param) {
		sqlSession.delete("calendar.deleteSchedule", param);
		
		// 결과물 리턴
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	@Override
	public Map<String, Object> updateSchedule(Map<String, Object> param) {
		Map<String, Object> prevData = sqlSession.selectOne("calendar.getScheduleDetail", param);
		boolean isRoot = true;
		if(param.get("repeat_root") != null) {
			isRoot = param.get("repeat_root").equals(param.get("sched_id"));
		} else {
			param.put("repeat_root", (String) param.get("sched_id"));
		}
		
		Map<String, Object> rootData = null;
		if(!isRoot) {
			Map<String, Object> rootParam = new HashMap<String, Object>();
			rootParam.put("sched_id", param.get("repeat_root"));
			rootData = sqlSession.selectOne("calendar.getScheduleDetail", rootParam);
		}
		
		// 반복일 경우 - 연결 일정에 대한 수정이 수행
		if(param.get("repeat") != null) {
			Date newRepeatEnd = (Date) param.get("repeat_end");
			Long newRepeat = ((Integer)param.get("repeat")).longValue();
			Date prevRepeatEnd = (prevData.get("repeat_end") != null) ? (Date) prevData.get("repeat_end") : null;
			Long prevRepeat = (prevData.get("repeat") != null) ? Long.parseLong((String)prevData.get("repeat")) : null;
			
			Date newschedStart = (Date) param.get("start_date");
			Date newschedEnd = (Date) param.get("end_date");
			Date prevSchedStart = (Date) param.get("start_date");
			Date prevSchedEnd = (Date) prevData.get("end_date");
			
			
			// 반복 종료일이 다를 경우 - 반복일정을 재 설정함
			if((prevRepeatEnd == null && newRepeatEnd != null)
					|| newRepeatEnd.getTime() != prevRepeatEnd.getTime()
					|| newRepeat != prevRepeat
					|| (isRoot && (newschedStart.getTime() != prevSchedStart.getTime() || newschedEnd.getTime() != prevSchedEnd.getTime()))) {
				sqlSession.delete("calendar.deleteConnectedScheulde", param);
				
				// 루트 일정을 수정할 경우 - 현재 전달된 값을 기준으로 반복정보도 수정
				if(!isRoot) {
					param.put("sched_id", param.get("repeat_root"));
					param.put("start_date", rootData.get("start_date"));
					param.put("end_date", rootData.get("end_date"));
				}
				
				this.saveRepeatSchedule(new HashMap<String, Object>(param), (String) param.get("sched_id"));
			}
			
			// 반복 종료일이 같은 경우 - 연결된 정보만 수정
			else {
				sqlSession.update("calendar.updateConnectedSchedule", param);
			}
		} 
		
		// 이전에는 반복이였으나, 수정 후에는 반복이 아닐 경우
		else if(prevData.get("repeat") != null) {
			sqlSession.delete("calendar.deleteConnectedScheulde", prevData);
			param.put("sched_id", (String) param.get("repeat_root"));
			param.put("repeat", null);
			param.put("repeat_root", null);
			param.put("repeat_end", null);
			
			if(!isRoot) {
				param.put("start_date", rootData.get("start_date"));
				param.put("end_date", rootData.get("end_date"));
			}
		}
		
		// 최종 본 정보 수정
		sqlSession.update("calendar.updateSchedule", param);
		
		// 결과물 리턴
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}

	@Override
	public List<Map<String, Object>> getNoticeSchedule(Map<String, Object> param) {
		List<Map<String, Object>> groupList = sqlSession.selectList("calendar.getCalendarScheduleGroupList", param);
		param.put("target_group", groupList);
		
		Calendar noticestart = Calendar.getInstance();
		noticestart.setTime((Date) param.get("current_date"));
		
		Calendar noticeend = Calendar.getInstance();
		noticeend.setTime((Date) param.get("current_date"));
		noticeend.add(Calendar.MINUTE, 1);
		noticeend.add(Calendar.SECOND, -1);
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		param.put("noticestart", format.format(noticestart.getTime()));
		param.put("noticeend", format.format(noticeend.getTime()));
		return sqlSession.selectList("calendar.getCalendarScheduleList", param);
	}

	@Override
	public Map<String, Object> getNoticeState() {
		List<Map<String, Object>> groupList = sqlSession.selectList("calendar.getDefaultScheduleGroup");
		Map<String, Object> myNoticeState = null;
		if(groupList.size() == 0) {
			this.generateDefaultGroup();
		} else {
			myNoticeState = sqlSession.selectOne("calendar.getNoticeState");
		}
		
		if(myNoticeState == null) {
			myNoticeState = new HashMap<String, Object>();
			myNoticeState.put("notice_state", false);
		}
		return myNoticeState;
	}
	
	@Override
	public Map<String, Object> saveNoticeState(Map<String, Object> param) {
		Map<String, Object> myNoticeState = sqlSession.selectOne("calendar.getNoticeState");
		if(myNoticeState == null){
			sqlSession.insert("calendar.saveNoticeState",param);
		}else{
			sqlSession.update("calendar.updateNoticeState",param);
		}
		
		// 결과물 리턴
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	@Override
	public Map<String, Object> removeNoticeState(Map<String, Object> param) {
		if(param.get("repeat_root") != null) {
			sqlSession.delete("calendar.deleteConnectedScheulde", param);
		}
		sqlSession.delete("calendar.removeNoticeState",param);
		
		// 결과물 리턴
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	@Override
	public List<Map<String, Object>> getUserList(Map<String, Object> param) {
		return sqlSession.selectList("calendar.findListUserInCalendar", param);
	}

	@Override
	public List<Map<String, Object>> getDeptList(Map<String, Object> param) {
		return sqlSession.selectList("calendar.findListDeptInCalendar", param);
	}

	@Override
	public void delCalendarUser(String userId) {
		// 오류 검사
		if(userId == null || userId.equals("")) return;
		
		// 기본 그룹 아이디 가져오기
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("userId", userId);
		Map<String, Object> result = sqlSession.selectOne("calendar.getDefaultScheduleGroupUsingId", param);
		if(result == null) return;
		
		// 그룹에 연결된 스케줄 모두 삭제
		param.put("grp_id", (String) result.get("grp_id"));
		sqlSession.delete("calendar.delScheduleConnectedGroup", param);
		
		// 그룹에 연결된 일정 삭제
		sqlSession.delete("calendar.deleteCalendarGroupUserMappingInfo", param);
		
		// id를 사용하여 그룹 - user 정보 삭제
		sqlSession.delete("deleteCalendarGroupUserMappingInfoUsingUserId", param);
		
		// 기타 정보 삭제
		sqlSession.delete("deleteCalendarGroupJobMappingInfo", param);
		sqlSession.delete("deleteCalendarGroupUserMappingInfo", param);
		sqlSession.delete("deleteCalendarGroupDeptMappingInfo", param);
		sqlSession.delete("removeNoticeStateUsingUserId", param);
		
		// 그룹 삭제
		sqlSession.delete("deleteScheduleGroup", param);
	}
}
