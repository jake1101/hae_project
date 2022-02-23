package smartsuite.app.bp.admin.template;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;


@SuppressWarnings ({ "rawtypes", "unchecked" })
@Controller
@RequestMapping(value="**/bp/**/")
public class TemplateController {
	
	
	@Inject
	TemplateService tmpService;
	/*
	 * 템플릿 목록 조회
	 * */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value="findListTmp.do")
	public @ResponseBody List findListTmp(@RequestBody Map param){
		return tmpService.findListTmp(param);
	}
	
	
	/*
	 * 템플릿 내용 상세 조회
	 * */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListTmpById.do")
	public @ResponseBody Map findListTmpById(@RequestBody Map param) {
		return tmpService.findTemplateBaseById(param);
	}
	
	
	/*
	 * 템플릿 목록 삭제
	 * */ 
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value="deleteListTmp.do")
	public @ResponseBody Map deleteListTmp(@RequestBody Map param){
		return tmpService.deleteListTmp(param);
	}

	/*
	 * 템플릿 저장
	 * */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value="saveTmp.do")
	public @ResponseBody Map saveTmp(@RequestBody Map param){
		return tmpService.saveTmp(param);
	}
	
	/*
	 * 템플릿 미리보기
	 * */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findTemplatePreview.do")
	public @ResponseBody Map findTemplatePreview(@RequestBody Map param) {
		return tmpService.findTemplatePreview(param);
	}	
	
	/* 템플릿 조회 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value="findTmpByTmpId.do")
	public @ResponseBody Map findTmpByTmpId(@RequestBody Map param){
		return tmpService.findTmpByTmpId(param);
	}
}
