package smartsuite.app.bp.calendar.core;


public class CalendarData {
	// 색상
	public static String VERY_SOFT_GREEN					= "#84ace6";
	public static String SOFT_BLUE							= "#78c5e3";
	public static String MODERATE_CYAN						= "#53bdb6";
	public static String LIME_GREEN							= "#79c393";
	public static String SLIGHTLY_DESATURATED_GREEN			= "#aec471";
	public static String SLIGHTLY_DESATURATED_ORANGE		= "#c9a371";
	public static String SOFT_YELLOW						= "#f2cb50";
	public static String MORE_SOFT_RED						= "#f39a83";
	public static String SOFT_RED							= "#ea6363";
	public static String SLIGHTLY_DESATURATED_MAGENTA		= "#c584c0";
	public static String SLIGHTLY_DESATURATED_VIOLET		= "#ac93d6";
	public static String MOSTLY_DESATURATED_DARK_BLUE		= "#8983b2";
	public static String MORE_SLIGHTLY_DESATURATED_VIOLET	= "#8c97c1";
	public static String SLIGHTLY_DESATURATED_RED			= "#ba606f";
	public static String GRAY								= "#b1b1b1";
	public static String DARK_GRAY							= "#868686";
		
	// 알람
	public static NoticeInfo DO_NOT_NOTICE			= new NoticeInfo("없음",		-2);
	public static NoticeInfo AT_TIME_NOTICE			= new NoticeInfo("정각",		0);
	public static NoticeInfo BEFORE_5MIN_NOTICE		= new NoticeInfo("5분전",	300000);
	public static NoticeInfo BEFORE_15MIN_NOTICE	= new NoticeInfo("15분전",	900000);
	public static NoticeInfo BEFORE_1HOUR_NOTICE	= new NoticeInfo("1시간전",	3600000);
	public static NoticeInfo BEFORE_1DAY_NOTICE		= new NoticeInfo("1일전",	86400000);
	public static NoticeInfo BEFORE_2DAYS_NOTICE	= new NoticeInfo("2일전",	172800000);
	public static NoticeInfo BEFORE_1WEEK_NOTICE	= new NoticeInfo("1주일전",	604800000);
		
	// 반복
	public static RepeatInfo DAILY_REPEAT			= new RepeatInfo("매 일", 86400000);
	public static RepeatInfo WEEKLY_REPEAT			= new RepeatInfo("매 주", 86400000 * 7);
	public static RepeatInfo MONTHLY_REPEAT			= new RepeatInfo("매 월", 86400000 * 30);
	public static RepeatInfo YEARLY_REPEAT			= new RepeatInfo("매 년", 86400000 * 365);
	
	// 알람 정보
	public static NoticeInfo[] noticeInfoList		= {
		CalendarData.DO_NOT_NOTICE,			CalendarData.AT_TIME_NOTICE, 
		CalendarData.BEFORE_5MIN_NOTICE,	CalendarData.BEFORE_15MIN_NOTICE, 
		CalendarData.BEFORE_1HOUR_NOTICE,	CalendarData.BEFORE_1DAY_NOTICE,
		CalendarData.BEFORE_2DAYS_NOTICE,	CalendarData.BEFORE_1WEEK_NOTICE
	};
		
	// 반복 정보
	public static RepeatInfo[] repeatInfoList		= {
		CalendarData.DAILY_REPEAT,		CalendarData.WEEKLY_REPEAT,
		CalendarData.MONTHLY_REPEAT,	CalendarData.YEARLY_REPEAT
	};
		
	// 색상 정보
	public static String[] colorList				= {
		CalendarData.VERY_SOFT_GREEN, CalendarData.SOFT_BLUE,
		CalendarData.MODERATE_CYAN, CalendarData.LIME_GREEN,
		CalendarData.SLIGHTLY_DESATURATED_GREEN, CalendarData.SLIGHTLY_DESATURATED_ORANGE,
		CalendarData.SOFT_YELLOW, CalendarData.MORE_SOFT_RED,
		CalendarData.SOFT_RED, CalendarData.SLIGHTLY_DESATURATED_MAGENTA,
		CalendarData.SLIGHTLY_DESATURATED_VIOLET, CalendarData.MOSTLY_DESATURATED_DARK_BLUE,
		CalendarData.MORE_SLIGHTLY_DESATURATED_VIOLET, CalendarData.SLIGHTLY_DESATURATED_RED,
		CalendarData.GRAY, CalendarData.DARK_GRAY
	};
}