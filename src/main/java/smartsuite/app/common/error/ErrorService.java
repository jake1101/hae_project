package smartsuite.app.common.error;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.InetAddress;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.common.shared.Const;

/**
 * 공통으로 사용하는 서비스 관련 Class입니다.
 *
 * @author hjhwang
 * @see
 * @FileName SharedService.java
 * @package smartsuite.app.shared
 * @Since 2016. 2. 2
 * @변경이력 : [2016. 2. 2] hjhwang 최초작성
 */
@SuppressWarnings ({ "rawtypes", "unchecked" })
@Service
@Transactional
public class ErrorService {

	static final Logger LOG = LoggerFactory.getLogger(ErrorService.class);
	
	@Inject
	private SlackService slackService;
	
	@Inject
	private SqlSession sqlSession;
	
	@Value("#{globalProperties['error.send.slack']}")
	private Boolean sendSlack = false;
	
	/**
	 * 클라이언트 에러가 발생했을 때 에러 정보를 저장 및 알림 PUSH
	 */
	public Map saveBrowserErrorInfo(HttpServletRequest request, Map<String, Object> param) {
		InetAddress local;
		try {
			local = InetAddress.getLocalHost();

			param.put("err_cls", "B");
			param.put("menu_cd", request.getHeader("menucode"));
			param.put("server_ip", local.getHostAddress());
		
			sqlSession.insert("error.insertErrorInfo", param);
			
			if(sendSlack) {
				try {
					slackService.browserSend(param);
				} catch(Exception e) {
					LOG.error(e.getMessage(), e);
				}
			}
		} catch(Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return null;
	}
	
	/**
	 * 브라우저 에러가 발생했을 때 에러 정보를 저장 및 알림 PUSH
	 */
	public void saveServerErrorInfo(HttpServletRequest request, Exception exception, String errId) {
		InetAddress local;
		Map<String, Object> param = new HashMap<String, Object>();
		try {
			local = InetAddress.getLocalHost();

			param.put("err_cls", "S");
			param.put("server_ip", local.getHostAddress());
			param.put("err_id", errId);
			param.put("sess_id", getSessionId(request));
			
			param.put("err_occur_dt", new Date());
			
			String cause = exception.getCause().toString();
			param.put("err_msg", cause);
			
			String message = exception.getMessage();
			if(message == null) {
				message = "";
			}
			
			//convert stack trace object to string
			String stackTrace = createStackTrace(exception); 
			param.put("stacktrace", message.concat(stackTrace));
		
			sqlSession.insert("error.insertErrorInfo", param);
			
			if(sendSlack) {
				try {
					slackService.serverSend(param);
				} catch(Exception e) {
					LOG.error(e.getMessage(), e);
				}
			}
		} catch(Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}
	
    protected String getSessionId( HttpServletRequest request) {
    	if(request != null) {
			return request.getRequestedSessionId();
		}else {
			return "?????";
		}
	}
    
	public String createStackTrace(Exception exception) {
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw, true);		
		exception.printStackTrace(pw);
		pw.flush();
		sw.flush();
		
		return sw.toString();
	}

	/**
	 * 에러 리스트 조회 (서버, 클라이언트 공용)
	 */
	public List findListError(Map param) {
		return sqlSession.selectList("error.findListError", param);
	}
	
	/**
	 * 에러 상세 조회 (서버, 클라이언트 공용) 
	 */
	public Map findError(Map param) {
		return sqlSession.selectOne("error.findListError", param);
	}
	
	/**
	 * 에러 상세 조회 (서버, 클라이언트 공용) 
	 */
	public Map deleteListError(Map param) {
		Map resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		
		List<Map<String, Object>> deleteErrors = (List<Map<String, Object>>)param.get("deleteErrors");
		for(Map<String, Object> deleteError : deleteErrors) {
			sqlSession.delete("error.deleteError", deleteError);
		}
		
		return resultMap;
	}

	/**
	 * 서버 에러 강제 발생 
	 */
	public Map occurError(Map param) {
		Map resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		
		sqlSession.selectOne("error.occurError", param); //에러 발생 쿼리 호출
		
		return resultMap;
	}
	
	/**
	 * 서버 에러 강제 발생 
	 */
	public Map updateError(Map param) {
		Map resultMap = new HashMap<String, Object>();
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		
		sqlSession.update("error.updateError", param); //에러 발생 쿼리 호출
		
		return resultMap;
	}
}
