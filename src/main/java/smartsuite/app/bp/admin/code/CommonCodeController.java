package smartsuite.app.bp.admin.code;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.shared.Const;
import smartsuite.messagesource.web.MessageService;
import smartsuite.security.annotation.AuthCheck;

/**
 * CommonCode 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author JuEung Kim
 * @see 
 * @since 2016. 2. 2
 * @FileName CommonCodeController.java
 * @package smartsuite.app.common.code
 * @변경이력 : [2016. 2. 2] JuEung Kim 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/bp/**/")
public class CommonCodeController {
	
	/** The common code service. */
	@Inject
	CommonCodeService commonCodeService;
	
	@Inject
	CacheManager cacheManager;
	
	@Inject
	MessageService messageService;
	
	/**
	 * 그룹코드 목록 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the grp code list
	 * @Date : 2016. 2. 2
	 * @Method Name : findListGrpCode
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListGrpCode.do")
	public @ResponseBody List findListGrpCode(@RequestBody Map param) {
		return commonCodeService.findListGrpCode(param);
	}
	
	/**
	 * 그룹코드 저장을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListGrpCode
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListGrpCode.do")
//	@CacheEvict(value="cmmn-code", key="#param['grp_cd'] + '_' + T(org.springframework.context.i18n.LocaleContextHolder).getLocale().toString()")
	public @ResponseBody Map saveListGrpCode(@RequestBody Map param) {
		List<Map<String,Object>> insertList = (List<Map<String,Object>>) param.get("insertList");
		if(!insertList.isEmpty()) {
			commonCodeCacheEvict(insertList);
		}
		return commonCodeService.saveListGrpCode(param);
	}
	
	/**
	 * 그룹코드 삭제를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteListGrpCode
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteListGrpCode.do")
	public @ResponseBody Map deleteListGrpCode(@RequestBody Map param) {
		List<Map<String,Object>> deleteList = (List<Map<String,Object>>) param.get("deleteList");
		if(!deleteList.isEmpty()) {
			commonCodeCacheEvict(deleteList);
		}
		return commonCodeService.deleteListGrpCode(param);
	}
	
	protected void commonCodeCacheEvict(List<Map<String,Object>> codes) {
		Cache cache = cacheManager.getCache("cmmn-code");
		Collection<Locale> locales = messageService.getAvailableLocales();
		for(Locale locale : locales) {
			String localeStr = "_" + locale.toString();
			for(Map<String,Object> group : codes) {
				cache.evict(group.get("grp_cd") + localeStr);
			}
		}
	}
	
	/**
	 * 그룹코드 속성 목록 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the grp attr code list
	 * @Date : 2016. 2. 2
	 * @Method Name : findListGrpAttrCode
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListGrpAttrCode.do")
	public @ResponseBody Map findListGrpAttrCode(@RequestBody Map param) {
		Map result = new HashMap<String, Object>();
		
		result.put("grpAttrCodeList", commonCodeService.findListGrpAttrCode(param) );
		result.put("dtlCodeList",  commonCodeService.findListDtlCode(param) );
		
		return result;
	}
	
	/**
	 * 그룹코드 속성 저장을 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListGrpAttrCode
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListGrpAttrCode.do")
	public @ResponseBody Map saveListGrpAttrCode(@RequestBody Map param) {
		return commonCodeService.saveListGrpAttrCode(param);
	}
	
	/**
	 * 그룹코드 속성 삭제를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteListGrpAttrCode
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteListGrpAttrCode.do")
	public @ResponseBody Map deleteListGrpAttrCode(@RequestBody Map param) {
		return commonCodeService.deleteListGrpAttrCode(param);
	}
	
	/**
	 * 상세코드 목록 조회를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the dtl code list
	 * @Date : 2016. 2. 2
	 * @Method Name : findListDtlCode
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListDtlCode.do")
	public @ResponseBody List findListDtlCode(@RequestBody Map param) {
		return commonCodeService.findListDtlCode(param);
	}
	
	/**
	 * 상세코드 저장을 요청한다.
	 *
	 * @param param the param
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListDtlCode.do")
	@CacheEvict(value="cmmn-code", key="#param['grp_cd'] + '_' + T(org.springframework.context.i18n.LocaleContextHolder).getLocale().toString()")
	public @ResponseBody Map saveListDtlCode(@RequestBody Map param) {
		return commonCodeService.saveListDtlCode(param);
	}
	
	/**
	 * 상세코드 삭제를 요청한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 3
	 * @Method Name : deleteListDtlCode
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteListDtlCode.do")
	@CacheEvict(value="cmmn-code", key="#param['grp_cd'] + '_' + T(org.springframework.context.i18n.LocaleContextHolder).getLocale().toString()")
	public @ResponseBody Map deleteListDtlCode(@RequestBody Map param) {
		return commonCodeService.deleteListDtlCode(param);
	}
}