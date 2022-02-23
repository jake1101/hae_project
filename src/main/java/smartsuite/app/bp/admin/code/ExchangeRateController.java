package smartsuite.app.bp.admin.code;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

/**
 * 환율 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author JuEung Kim
 * @see 
 * @since 2017.06.05
 * @FileName ExchangeRateController.java
 * @package smartsuite.app.bp.admin.code
 * @변경이력 : [2016.06.05] JuEung Kim 최초작성
 */
@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/bp/**/")
public class ExchangeRateController {
	
	@Inject
	ExchangeRateService exchangeRateService;
	
	/**
	 * 환율 관리 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findListExchangeRate.do")
	public @ResponseBody List findListExchangeRate(@RequestBody Map param) {
		return exchangeRateService.findListExchangeRate(param);
	}
	
	/**
	 * 환율 관리 데이터를 저장한다.
	 * @param param
	 * @return
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "saveListExchangeRate.do")
	public @ResponseBody Map saveListExchangeRate(@RequestBody Map param) {
		return exchangeRateService.saveListExchangeRate(param);
	}
	
	/**
	 * 환율 관리 데이터를 삭제한다.
	 * @param param
	 * @return
	 */
	@AuthCheck(authCode=Const.SAVE)
	@RequestMapping(value = "deleteListExchangeRate.do")
	public @ResponseBody Map deleteListExchangeRate(@RequestBody Map param) {
		return exchangeRateService.deleteListExchangeRate(param);
	}
	
}