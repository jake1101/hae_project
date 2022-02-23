package smartsuite.app.bp.calendar.core;

public class RepeatInfo {
	public String repeatType;
	public long repeatDuration;
	
	/**
	 * 
	 * @param repeatType
	 * @param repeatDuration
	 */
	public RepeatInfo(String repeatType, long repeatDuration) {
		this.repeatType = repeatType;
		this.repeatDuration = repeatDuration;
	}
}
