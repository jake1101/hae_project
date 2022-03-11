package smartsuite.app.common.restful;

import java.nio.charset.Charset;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import smartsuite.app.common.shared.Const;
import smartsuite.security.authentication.Auth;

@Service
public class RestfulUtilServiceToCorners {
	
	@Value ("#{cornersAPI['corners.api.url']}")
	String CORNERSURL;
	
	public HttpEntity<String> createHttpEntity(Map<String, Object> param){
		Gson gson = new GsonBuilder().serializeNulls().create();
		String userToken = (String)Auth.getCurrentUser().getUserInfo().get("userToken");
	    HttpHeaders headers = new HttpHeaders();
	    Charset utf8 = Charset.forName("UTF-8"); 
	    MediaType mediaType = new MediaType("application", "json", utf8);
	    headers.setContentType(mediaType);
	    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
	    headers.set("userToken", userToken);
	    //headers.set("userToken", "zzzZ");
	    HttpEntity<String> request;
	    if(param == null){
	    	request = new HttpEntity<String>("{}", headers);
	    }else{
	    	request = new HttpEntity<String>(gson.toJson(param), headers);
	    }
	    
	    return request;
		
	}
	
	public HttpEntity<String> createHttpEntity(List<Map<String, Object>> param){
		Gson gson = new GsonBuilder().serializeNulls().create();
		String userToken = (String)Auth.getCurrentUser().getUserInfo().get("userToken");
	    HttpHeaders headers = new HttpHeaders();
	    Charset utf8 = Charset.forName("UTF-8"); 
	    MediaType mediaType = new MediaType("application", "json", utf8);
	    headers.setContentType(mediaType);
	    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
	    headers.set("userToken", userToken);
	    //headers.set("userToken", "zzzZ");
	    HttpEntity<String> request;
	    if(param == null){
	    	request = new HttpEntity<String>("{}", headers);
	    }else{
	    	request = new HttpEntity<String>(gson.toJson(param), headers);
	    }
	    
	    return request;
		
	}
		
	/**
	 * Raycom API 호출
	 * @param url
	 * @param param
	 * @return
	 */
	public Map<String, Object> callCornersApi(String uri, Object param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		Gson gson = new GsonBuilder().serializeNulls().create();
		
		Charset utf8 = Charset.forName("UTF-8"); 
	    MediaType mediaType = new MediaType("application", "json", utf8);
	    String userToken = (String)Auth.getCurrentUser().getUserInfo().get("userToken");
	    
	    /**
		 * Header 세팅
		 */
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(mediaType);
	    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
	    headers.set("userToken", userToken);
	    
	    HttpEntity<String> request;
	    if(param == null){
	    	request = new HttpEntity<String>("{}", headers);
	    }else{
	    	request = new HttpEntity<String>(gson.toJson(param), headers);
	    }
		
	    RestTemplate restTemplate = new RestTemplate();
	    
		String customerUrl = CORNERSURL + uri;
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, request, String.class);
		
		Gson resultGson = new Gson();
		Map<String, Object> jsonObject = resultGson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
	
		String checked =  (String) jsonObject.get("code");

		if( checked.equals("1")){
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
			resultMap.put("result_message", jsonObject.get("message").toString() );
			resultMap.put(Const.RESULT_DATA, jsonObject.get("data") );
		}else{
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			resultMap.put("result_message", jsonObject.get("message").toString() );
		}

		return resultMap;
	}
}
