package smartsuite.app.bp.admin.account;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

@Controller
@RequestMapping("**/account/")
public class AccountController {
	
	@Inject
	AccountService accountService;
	
	@AuthCheck (authCode = Const.READ)
	@RequestMapping("load.do")
	public @ResponseBody AccountSettings load() {
		return accountService.load();
	}
	
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping("save.do")
	@ResponseStatus(value = HttpStatus.OK)
	public void save(@RequestBody AccountSettings accountManagement) { 
		accountService.update(accountManagement);
	}
	
	@AuthCheck (authCode = Const.READ)
	@RequestMapping("ipAddressLoad.do")
	public @ResponseBody List<Map<String,String>> ipAddressLoad() {
		return accountService.ipAddressLoad();
	}
	
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping("ipAddressDelete.do")
	@ResponseStatus(value = HttpStatus.OK)
	public void ipAddressDelete(@RequestBody Map<String,List<Map<String,String>>> param) {
		List<Map<String,String>> deleteItems = param.get("deleteItems");
		accountService.ipAddressDelete(deleteItems);
	}
	
	@AuthCheck (authCode = Const.SAVE)
	@RequestMapping("ipAddressSave.do")
	@ResponseStatus(value = HttpStatus.OK)
	public void ipAddressSave(@RequestBody Map<String,List<Map<String,String>>> param) {
		List<Map<String,String>> newItems = param.get("newItems");
		accountService.ipAddressSave(newItems);
	}
}
