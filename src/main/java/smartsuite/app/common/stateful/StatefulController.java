package smartsuite.app.common.stateful;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;


/**
 * @author DongMyeong Won
 * @see
 * @since 2016. 11. 18
 * @FileName StatefulController.java
 * @package smartsuite.app.bp.admin.stateful
 * @변경이력 : [2016. 11. 18] DongMyeong Won 최초작성
 */
@Controller
@RequestMapping(value="**/stateful/")
public class StatefulController {

    @Inject
    StatefulService statefulService;

    /**
     * 캐시 버스트 가져오기
     *
     * @author : DongMyeong Won
     * @Date : 2016. 11. 18
     * @Method Name : getCacheBust
     */
    @RequestMapping (value = "getCacheBust.do")
    public @ResponseBody String getCacheBust() {
        return statefulService.getCacheBust();
    }
    
    /**
     * 캐시 버스트 업데이트
     *
     * @author : DongMyeong Won
     * @Date : 2016. 11. 18
     * @Method Name : updateCacheBust
     */
    @RequestMapping (value = "updateCacheBust.do")
    public @ResponseBody String updateCacheBust() {
        statefulService.updateCacheBust();
        return statefulService.getCacheBust();
    }
    
    
    /**
     * 개인화 정보 가져오기
     *
     * @author : shkim
     * @Date : 2017. 08. 02
     * @Method Name : getClientState
     */
    @RequestMapping (value = "getClientState.do")
    public @ResponseBody Map<String, Map<String,Object>> getClientState() {
    	return statefulService.getClientState();
    }

    /**
     * 개인화 정보 저장하기
     *
     * @author : shkim
     * @Date : 2017. 08. 02
     * @Method Name : saveClientState
     */
    @RequestMapping (value = "saveClientState.do")
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody Map<String, Object> saveClientState(@RequestBody List<Map<String,Object>> states) {
    	return statefulService.saveClientState(states);
    }
    
    /**
     * 개인화 정보 삭제하기
     *
     * @author : shkim
     * @Date : 2017. 08. 02
     * @Method Name : clearClientState
     */
    @RequestMapping (value = "clearClientState.do")
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody Map<String, Object> clearClientState() {
    	return statefulService.clearClientState();
    }
}