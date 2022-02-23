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
public class RestfulUtilService {
	
	@Value ("#{raycomAPI['raycom.api.url']}")
	String RAYCOMURL;
	
	@Value ("#{raycomAPI['rino.api.url']}")
	String URL;
	
	@Value ("#{raycomAPI['rino.api.systemkey']}")
	String SYSTEMKEY;
	
	@Value ("#{raycomAPI['rino.api.secret']}")
	String SECRET;
	
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
	 * RINO API 호출
	 * @param url
	 * @param param
	 * @return
	 */
	public Map<String, Object> callRinoOmsApi(String uri, Map<String, Object> param){
		Gson gson = new GsonBuilder().serializeNulls().create();
		
		/**
		 * Header 세팅
		 */
	    HttpHeaders headers = new HttpHeaders();
	    Charset utf8 = Charset.forName("UTF-8"); 
	    MediaType mediaType = new MediaType("application", "json", utf8);
	    headers.setContentType(mediaType);
	    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
	    headers.add("systemKey", SYSTEMKEY);
	    headers.add("secret", SECRET);
	    
	    HttpEntity<String> httpEntity;
	    if(param == null){
	    	httpEntity = new HttpEntity<String>("{}", headers);
	    }else{
	    	httpEntity = new HttpEntity<String>(gson.toJson(param), headers);
	    }
	    
	    RestTemplate restTemplate = new RestTemplate();
		
		/**
		 * ADD Query parameters
		 */
		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(URL + uri);
		
		for(Map.Entry<String, Object> entry : param.entrySet() ){
			// Add query parameter
	        builder.queryParam(entry.getKey(), entry.getValue());
		}
		
		/**
		 * Call api
		 */
		ResponseEntity<String> result = restTemplate.exchange(builder.build().toUri(), HttpMethod.POST, httpEntity, String.class);

		Gson resultGson = new Gson();
		Map<String, Object> jsonObject = resultGson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		return jsonObject;
	}
	
	/**
	 * Raycom API 호출
	 * @param url
	 * @param param
	 * @return
	 */
	public Map<String, Object> callRaycomApi(String uri, Object param){
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
	    
		String customerUrl = RAYCOMURL + uri;
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, request, String.class);
		
		Gson resultGson = new Gson();
		Map<String, Object> jsonObject = resultGson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		Map<String, Object> headerMap = (Map)jsonObject.get("header");
		
		if( (Double)headerMap.get("code") == 1){
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
			resultMap.put("result_message", headerMap.get("message") );
		}else{
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			resultMap.put("result_message", headerMap.get("message") );
		}
		resultMap.put("body", jsonObject.get("body") );
		
		return resultMap;
	}
	
	public Map<String, Object> callRaycomApiWithNoSession(String uri, Object param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		Gson gson = new GsonBuilder().serializeNulls().create();
		
		Charset utf8 = Charset.forName("UTF-8"); 
	    MediaType mediaType = new MediaType("application", "json", utf8);
	    String userToken = "zzzZ";
	    
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
	    
		String customerUrl = RAYCOMURL + uri;
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, request, String.class);
		
		Gson resultGson = new Gson();
		Map<String, Object> jsonObject = resultGson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		Map<String, Object> headerMap = (Map)jsonObject.get("header");
		
		if( (Double)headerMap.get("code") == 1){
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
			resultMap.put("result_message", headerMap.get("message") );
		}else{
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			resultMap.put("result_message", headerMap.get("message") );
		}
		resultMap.put("body", jsonObject.get("body") );
		
		return resultMap;
	}
	
	public Map<String, Object> emailRaycomApi(String uri, Object param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		Gson gson = new GsonBuilder().serializeNulls().create();
		
		Charset utf8 = Charset.forName("UTF-8"); 
	    MediaType mediaType = new MediaType("application", "json", utf8);
	    String userToken = "zzzZ";
	    
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
	    
		String customerUrl = RAYCOMURL + uri;
		ResponseEntity<String> result = restTemplate.exchange(customerUrl, HttpMethod.POST, request, String.class);
		
		Gson resultGson = new Gson();
		Map<String, Object> jsonObject = resultGson.fromJson(result.getBody(), new TypeToken<Map<String, Object>>(){}.getType());
		Map<String, Object> headerMap = (Map)jsonObject.get("header");
		
		if( (Double)headerMap.get("code") == 1){
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		}else{
			resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			resultMap.put("result_message", headerMap.get("message") );
		}
		resultMap.put("body", jsonObject.get("body") );
		
		return resultMap;
	}
}
