package smartsuite.app.bp.calendar.core;

public class NoticeInfo {
	public String noticeType;
	public long noticeTerm;
	
	/**
	 * 
	 * @param noticeType
	 * @param noticeTerm
	 */
	public NoticeInfo(String noticeType, long noticeTerm) {
		this.noticeType = noticeType;
		this.noticeTerm = noticeTerm;
	}
}
