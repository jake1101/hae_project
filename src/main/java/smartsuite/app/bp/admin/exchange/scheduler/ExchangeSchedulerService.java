package smartsuite.app.bp.admin.exchange.scheduler;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;

import smartsuite.scheduler.core.ScheduleService;

/**
 * ExchangeScheduler 관련 처리하는 서비스 Class입니다.
 *
 * @author Yeon-u Kim
 * @see 
 * @FileName ExchangeSchedulerService.java
 * @package smartsuite.app.bp.admin.exchange.scheduler
 * @Since 2017. 12. 20
 * @변경이력 : [2017. 12. 20] Yeon-u Kim 최초작성
 */
@Service
@Transactional
public class ExchangeSchedulerService {
	
	/** The schedule service. */
	@Inject
	ScheduleService scheduleService;
	
	/** The sql session. */
	@Inject
	SqlSession sqlSession;

	
	/** The Constant charset. */
	//private static final String charset = "UTF-8";
	
	/** The Constant authkey. */
	private static final String authkey = "7Ghe5JKhbjR78keptyCHRgmDXl4pcq18";
	
	/** The Constant serviceUrl. */
	private static final String serviceUrl = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON";
	
	/** The Constant namespace. */
	private static final String namespace = "exchange.";
	
	/**
	 * list exchange 수정한다.
	 *
	 * @author : Yeon-u Kim
	 * @param param the param
	 * @throws Exception the exception
	 * @Date : 2017. 12. 20
	 * @Method Name : updateListExchange
	 */
	public void updateListExchange(HashMap<String,Object> param) throws Exception{
		if(param == null){
			param = new HashMap<String,Object>();
		}
		List<Map<String,Object>> resultList = this.requestListExchange(param);
		param.put("list", resultList);
		for(Map<String,Object> result : resultList){
			
			result.put("cur_unit", ((String)result.get("cur_unit")).replaceAll(",", ""));
			result.put("ttb", ((String)result.get("ttb")).replaceAll(",", ""));
			result.put("tts", ((String)result.get("tts")).replaceAll(",", ""));
			result.put("deal_bas_r", ((String)result.get("deal_bas_r")).replaceAll(",", ""));
			result.put("bkpr", ((String)result.get("bkpr")).replaceAll(",", ""));
			result.put("yy_efee_r", ((String)result.get("yy_efee_r")).replaceAll(",", ""));
			result.put("ten_dd_efee_r", ((String)result.get("ten_dd_efee_r")).replaceAll(",", ""));
			result.put("kftc_deal_bas_r", ((String)result.get("kftc_deal_bas_r")).replaceAll(",", ""));
			result.put("kftc_bkpr", ((String)result.get("kftc_bkpr")).replaceAll(",", ""));
			
			sqlSession.insert(namespace + "insertExchangeKrApi",result);
		}
	}
	
	/**
	 * ExChange List 요청 시.
	 *
	 * @param param the param
	 * @return the list
	 * @throws Exception the exception
	 */
	public List<Map<String,Object>> requestListExchange(Map<String, Object> param) throws Exception {
		
		StringBuffer sendUrl = new StringBuffer();
		sendUrl.append(serviceUrl)
				.append("?authkey=").append(authkey)	//OpenAPI 신청시 발급된 인증키
				.append("&data=AP01");		//AP01 : 환율, AP02 : 대출금리, AP03 : 국제금리

		if(param.containsKey("search_date")){
			String searchDate = (String) param.get("search_date"); 
			sendUrl.append("&searchdate="+searchDate); //String , ex) 2015-01-01, 20150101, (DEFAULT)현재일
		}
		
		URL url = new URL(sendUrl.toString());
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		if (conn.getResponseCode() != 200) {
			throw new IOException(conn.getResponseMessage());
		}
		
		InputStream is = null;
		BufferedReader reader = null;
		List<Map<String,Object>> resultList = Lists.newArrayList();
		
		try{
			is = conn.getInputStream();
			reader = new BufferedReader(new InputStreamReader(is));
			
			
			String line;
			while ((line = reader.readLine()) != null) {
				ObjectMapper om = new ObjectMapper();
				resultList = om.readValue(line, List.class);
			}
			
			return resultList;
			
		}finally{
			
			if(conn != null){
				conn.disconnect();
			}
			
			if(reader != null){
				reader.close();
			}
			
			if(is != null){
				is.close();
			}
		}
	}
}
