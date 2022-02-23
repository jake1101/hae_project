package smartsuite.mybatis;

import java.util.Properties;

import org.apache.ibatis.cache.CacheKey;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import smartsuite.security.ThreadLocalObjectHolder;


@Intercepts({
	@Signature(type = Executor.class, method = "query", args = {
			MappedStatement.class, Object.class, RowBounds.class,
			ResultHandler.class }),
	@Signature(type = Executor.class, method = "query", args = {
			MappedStatement.class, Object.class, RowBounds.class,
			ResultHandler.class, CacheKey.class, BoundSql.class }),
	@Signature(type = Executor.class, method = "update", args = {
			MappedStatement.class, Object.class })
			})
public class SqlIdLoggingInterceptor implements Interceptor{
	static final Logger logger = LoggerFactory.getLogger(SqlIdLoggingInterceptor.class);
	
	Boolean immdiatelyLogging;
	
	String logTemplate = "Sql id:{}";
	
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
    	MappedStatement mstmt = (MappedStatement)invocation.getArgs()[0];
    	
    	ThreadLocalObjectHolder.set(mstmt.getId());
    	if(immdiatelyLogging){
    		logger.info(logTemplate, new Object[] { 
        			mstmt.getId()});
    	}
         
        return invocation.proceed();
    }
 
    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
 
    @Override
    public void setProperties(Properties properties) {
		this.immdiatelyLogging = Boolean.getBoolean(properties.getProperty("immdiatelyLogging"));
    }
}
