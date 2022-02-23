package smartsuite.app.common;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.collect.Lists;

import freemarker.template.TemplateException;
import smartsuite.app.bp.admin.template.TemplateService;
import smartsuite.app.common.shared.Const;

@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class TemplateGeneratorService {
	private static final Log LOG = LogFactory.getLog(TemplateGeneratorService.class);

	@Inject
	private TemplateService templateService; 	
	

	/**
	 * Mail generate.
	 *
	 * @param mailKey the mail key
	 * @param data the data
	 * @return the string
	 * @throws Exception the exception
	 */
	public String mailGenerate(String mailKey, Object data) throws TemplateException, IOException{
 
		//템플릿 아이디 값을 가지고 컨텐츠 내용 조회
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("app_id", mailKey);
		Map<String, Object> template = templateService.findTemplateByMailKey(param);
		String content = (String)template.get("tmp_cont"); 
		
		return generate(mailKey,content,data);
	}
	
	/**
	 * Parameter check.
	 * 
	 * TODO : 임시 param_class_nm에 param을 열로 나열하고, 주어진 dataParam과 실제로 선언된 param을 비교하여
	 * </br>
	 *  체크하여 값이 없는 경우 빈값으로 넣고 결과값을 알려줌.
	 *
	 * @author : Yeon-u Kim
	 * @param template the template
	 * @param data the data
	 * @return the map
	 */
	public Map<String,Object> parameterCheck(Map<String,Object> template,Map<String,Object> data){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String paramNm = (String)template.get("param_class_nm");
		if(StringUtils.isEmpty(paramNm)){
			resultMap.put("data", data);
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		}else if(StringUtils.isNotEmpty(paramNm)){
			String[] fields = paramNm.split("\\,");
			Map<String, Object> orgData = new HashMap<String, Object>();
			ArrayList<String> failFieldList = Lists.newArrayList();
			for(String field : fields){
				if(data == null || !data.containsKey(field)){
					failFieldList.add(field);
				}
				orgData.put(field, field);
			}
			if(data != null){
				orgData.putAll((Map<? extends String, ? extends Object>)data);
			}
			if(failFieldList.isEmpty()){
				resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
			}else{
				resultMap.put(Const.RESULT_STATUS, Const.FAIL);
			}
			resultMap.put("data", orgData);
			resultMap.put("failFieldList", failFieldList);
		}
		return resultMap;
	}
	/**
	 * Generate.
	 *
	 * @param appId the app id
	 * @param content the content
	 * @param data the data
	 * @return the string
	 * @throws Exception the exception
	 */
	public String generate(String appId, String content, Object data) throws TemplateException, IOException{
		StringWriter writer = new StringWriter();
		String replacedContent = replaceSpecialChars(content);
		freemarker.template.Template t = new freemarker.template.Template(appId, new StringReader(replacedContent), null);
		t.process(data, writer);

		/*
			try {
			String templateBaseId = (String)template.get("tmp_bas_id");
			if(templateBaseId != null && !templateBaseId.equals("")){
				content = writer.toString();
				writer = new StringWriter();
				
				Map<String, Object> templateBase = templateService.findTemplateBaseById(template);
				String baseContent = (String)templateBase.get("tmp_bas_cont");
				freemarker.template.Template bt = new freemarker.template.Template(templateBaseId + appId, new StringReader(baseContent), null);
				Map<String, String> map = new HashMap<String, String>();
				map.put((String)templateBase.get("cont_param_nm"), content);
				bt.process(map, writer);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		*/
		String result = writer.toString();
		if (LOG.isErrorEnabled()) LOG.error("result : " + result);
		return result;
	}
	
	private String replaceSpecialChars(String str) {
		if(str == null)
		return null;

		String returnStr = str;
		returnStr = returnStr.replaceAll("<BR>", "\n");
		returnStr = returnStr.replaceAll("&amp;", "&");
		returnStr = returnStr.replaceAll("&gt;", ">");
		returnStr = returnStr.replaceAll("&lt;", "<");
		returnStr = returnStr.replaceAll("&quot;", "\"");
		returnStr = returnStr.replaceAll("&nbsp;", " ");

		return returnStr;
	}
	
	/**
     *  Template generate.
     *  @param appId
     *  @param data
     *  @return
     *  @throws TemplateException
     *  @throws IOException
     */
    public String tmpGenerate(String tmpKey, Object data) throws TemplateException, IOException {
        
        Map<String, Object> param = new HashMap<String, Object>();
        
        param.put("tmp_bas_id", tmpKey);
        
        Map<String, Object> template = templateService.findTmpByTmpId(param);
        
        if(template != null && template.get("tmp_bas_cont") != null) {
            
            return this.generate(tmpKey, template.get("tmp_bas_cont").toString(), data);
        }
        else {
            return null;
        }
    }


/*
	@SneakyThrows
	public void generateBatch(String templateDefinitionId, List<Object> list,
			BatchHandler batchHandler) {
		TemplateDefinition templateDefinition = templateDefinitionPersister.get(templateDefinitionId);
		String templateContent = templateDefinitionPersister.getContent(templateDefinitionId);
		freemarker.template.Template t = new freemarker.template.Template(templateDefinitionId, new StringReader(templateContent), templaterPreferences.getNormalConfiguration());
		TemplateBase templateBase = null;
		freemarker.template.Template bt = null;
		if(templateDefinition.hasBase()){
			templateBase = templateBasePersister.get(templateDefinition.getBaseId());
			String baseContent = templateBasePersister.getContent(templateDefinitionId);
			bt = new freemarker.template.Template(templateDefinition.getBaseId() + templateDefinitionId, new StringReader(baseContent), templaterPreferences.getNormalConfiguration());
		}
		for(Object data : list){
			StringWriter writer = new StringWriter();
			t.process(data, writer);
			String content = writer.toString();
			if(bt != null){
				writer = new StringWriter();
				Map<String, String> map = new HashMap<String, String>();
				map.put(templateBase.getContentParameterName(), content);
				bt.process(map, writer);
				content = writer.toString();
			}
			batchHandler.onGenerated(data, content);
		}
		templateDefinition.setLastUsed(new Date());
		templateDefinitionPersister.update(templateDefinition);
		
	}	
*/	
	
}
