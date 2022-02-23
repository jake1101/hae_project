package smartsuite.security;

public class ThreadLocalObjectHolder {
	private static final ThreadLocal<Object> threadLocal = new ThreadLocal<Object>();
	   
	   
	   private ThreadLocalObjectHolder() {
	   }
	   
	   public static void set(Object value) {
		   threadLocal.set(value);
	   }
	      
	   public static Object get() {
	       return threadLocal.get();
	   }
	   
	   public static void clear() {
		   threadLocal.remove();
	   }
}
