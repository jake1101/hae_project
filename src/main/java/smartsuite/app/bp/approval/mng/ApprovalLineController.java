package smartsuite.app.bp.approval.mng;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.data.FloaterStream;

/**
 * ApprovalLine 관련 처리를 하는 컨트롤러 Class입니다.
 *
 * @author Yeon-u Kim
 * @see 
 * @since 2017. 2. 1
 * @FileName ApprovalLineController.java
 * @package smartsuite.app.bp.approval.mng
 * @변경이력 : [2017. 2. 1] Yeon-u Kim 최초작성
 */
@SuppressWarnings ({ "rawtypes",
	"PMD.AtLeastOneConstructor"})
@Controller
@RequestMapping (value = "**/approval/mng/")
public class ApprovalLineController {
	
	/** The approval line service. */
	@Inject
	private transient ApprovalLineService aprvLineService;
	
    /**
     * aprv line list 조회를 요청한다.
     *
     * @author : Yeon-u Kim
     * @param param the param
     * @return the list
     * @Date : 2017. 2. 1
     * @Method Name : findAprvLineMasterList
     */
    @RequestMapping(value = "findAprvLineMasterList.do")
    public @ResponseBody FloaterStream findAprvLineList(@RequestBody final Map<String,Object> param) {
    	// 대용량 처리
        return aprvLineService.findAprvLineMasterList(param);
    }
	
    /**
     * aprv line master detail list 조회를 요청한다.
     *
     * @author : Yeon-u Kim
     * @param param the param
     * @return the list
     * @Date : 2017. 2. 2
     * @Method Name : findAprvLineMasterDetailList
     */
    @RequestMapping(value = "findAprvLineMasterDetailList.do")
    public @ResponseBody List findAprvLineMasterDetailList(@RequestBody final Map<String,Object> param) {
        return aprvLineService.findAprvLineMasterDetailList(param);
    }
    
    /**
     * aprv line master 저장을 요청한다.
     *
     * @author : Yeon-u Kim
     * @param param the param
     * @return the map
     * @Date : 2017. 2. 2
     * @Method Name : saveAprvLineMaster
     */
    @RequestMapping(value = "saveAprvLineMaster.do")
    public @ResponseBody Map saveAprvLineMaster(@RequestBody final Map<String,Object> param) {
        return aprvLineService.saveAprvLineMaster(param);
    }
    
    /**
     * aprv line master detail 저장을 요청한다.
     *
     * @author : Yeon-u Kim
     * @param param the param
     * @return the map
     * @Date : 2017. 2. 2
     * @Method Name : saveAprvLineMasterDetail
     */
    @RequestMapping(value = "saveAprvLineMasterDetail.do")
    public @ResponseBody Map saveAprvLineMasterDetail(@RequestBody final Map<String,Object> param) {
        return aprvLineService.saveAprvLineDetail(param);
    }
    
    /**
     * aprv line master 삭제를 요청한다.
     *
     * @author : Yeon-u Kim
     * @param param the param
     * @return the map
     * @Date : 2017. 2. 1
     * @Method Name : deleteAprvLineMaster
     */
    @RequestMapping(value = "deleteAprvLineMaster.do")
    public @ResponseBody Map deleteAprvLineMaster(@RequestBody final Map<String,Object> param) {
        return aprvLineService.deleteAprvLineMaster(param);
    }
    
    /**
     * aprv line master detail 삭제를 요청한다.
     *
     * @author : Yeon-u Kim
     * @param param the param
     * @return the map
     * @Date : 2017. 2. 2
     * @Method Name : deleteAprvLineMasterDetail
     */
    @RequestMapping(value = "deleteAprvLineMasterDetail.do")
    public @ResponseBody Map deleteAprvLineMasterDetail(@RequestBody final Map<String,Object> param) {
        return aprvLineService.deleteAprvLineMasterDetail(param);
    }
}
