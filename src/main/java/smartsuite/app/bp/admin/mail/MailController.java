package smartsuite.app.bp.admin.mail;

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
public class MailController {

	@Inject
	MailService mailService;
	
	/* 메일 목록 조회 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value="findListMail.do")
	public @ResponseBody List findListMail(@RequestBody Map param){
		return mailService.findListMail(param);
	}
	
	
	/* 메일 목록 상세 조회(단건조회) */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value="findListMailByMailId.do")
	public @ResponseBody Map findListMailByMailId(@RequestBody Map param){
		return mailService.findListMailByMailId(param);
	}
	
	/* 삭제 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value="deleteListMail.do")
	public @ResponseBody Map deleteListMail(@RequestBody Map param){
		return mailService.deleteListMail(param);
	}
	
	/* 저장 */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value="saveListMail.do")
	public @ResponseBody Map saveListMail(@RequestBody Map param){
		return mailService.saveListMail(param);
	}
	
	/* combobox 목록조회 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value="getAllTmpBasIdList.do")
	public @ResponseBody List getAllTmpBasIdLis(@RequestBody Map param){
		return mailService.getAllTmpBasId(param);
	}
	
	/* 메일전송이력 조회 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value="findListHistory.do")
	public @ResponseBody List findListHistory(@RequestBody Map param){
		return mailService.findListHistory(param);
	}
	
	/* SMTP 연동 테스트  */
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping(value="sendTestMail.do")
	public @ResponseBody Map sendTestMail(@RequestBody Map param){
		return mailService.sendTestMail(param);
	}
}
