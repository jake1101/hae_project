
package smartsuite.app.bp.memo;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 메모 관련 컨트롤러 Class입니다.
 *
 * @author jhuh
 * @see
 * @since 2016. 10. 10
 * @FileName MemoController.java
 * @package smartsuite.memo.web
 * @변경이력 : [2016. 10. 10] jhuh 최초작성
 */

@Controller
@RequestMapping(value="**/bp/common/memo/**")
public class MemoController {

	@Inject
	MemoService memoService;
	
	/* 전체 메모 데이터 조회 */
	@RequestMapping(value="findListAllMemo.do")
	public @ResponseBody List findListAllMemo(){
		return memoService.findListAllMemo();
	}
	
	/* 내 메모 데이터 조회 */
	@RequestMapping(value="findListMyMemo.do")
	public @ResponseBody List findListMyMemo(){
		return memoService.findListMyMemo();
	}
	
	/* 공유 메모 데이터 조회 */
	@RequestMapping(value="findListSharedMemo.do")
	public @ResponseBody List findListSharedMemo(){
		return memoService.findListSharedMemo();
	}
	
	/* 중요 메모 데이터 조회 */
	@RequestMapping(value="findListImptMemo.do")
	public @ResponseBody List findListImptMemo(){
		return memoService.findListImptMemo();
	}
	
	/* 삭제된 메모 데이터 조회 (휴지통 조회) */
	@RequestMapping(value="findListDeletedMemo.do")
	public @ResponseBody List findListDeletedMemo(){
		return memoService.findListDeletedMemo();
	}
	
	/*  대쉬보드 출력 메모 조회 */
	@RequestMapping(value="findDashboardMemo.do")
	public @ResponseBody List findDashboardMemo(){
		return memoService.findDashboardMemo();
	}
	
	/* 메모 데이터 추가 */
	@RequestMapping(value="insertMemo.do")
	public @ResponseBody void insertMemo(@RequestBody Map param){
		memoService.insertMemo(param);
	}
	
	/* 메모 데이터 수정 */
	@RequestMapping(value="updateMemo.do")
	public @ResponseBody void updateMemo(@RequestBody Map param){
		memoService.updateMemo(param);
	}
	
	/* 메모 데이터 삭제 */
	@RequestMapping(value="deleteMemo.do")
	public @ResponseBody void deleteMemo(@RequestBody Map param){
		memoService.deleteMemo(param);
	}
	
	/* 메모 중요도 수정 */
	@RequestMapping(value="updateMemoImpt.do")
	public @ResponseBody void updateMemoImpt(@RequestBody Map param){
		memoService.updateMemoImpt(param);
	}
	/* 메모 대쉬보드 수정 */
	@RequestMapping(value="updateMemoDashboard.do")
	public @ResponseBody void updateMemoDashboard(@RequestBody Map param){
		memoService.updateMemoDashboard(param);
	}
	
	/* 사용자가 등록한 태그 데이터 조회 */
	@RequestMapping(value="findListTag.do")
	public @ResponseBody List findListTag(){
		return memoService.findListTag();
	}
	
	/* 사용자가 등록한 태그 데이터 검색 */
	@RequestMapping(value="findListTagByKeyword.do")
	public @ResponseBody List findListTagByKeyword(@RequestBody Map param){
		return memoService.findListTagByKeyword(param);
	}
	
	/* 특정 메모 태그 데이터 조회 */
	@RequestMapping(value="findListMemoTag.do")
	public @ResponseBody List findListMemoTag(@RequestBody Map param){
		return memoService.findListMemoTag(param);
	}
	
	/* 태그 별 메모 데이터 조회 */
	@RequestMapping(value="findListMemoByTag.do")
	public @ResponseBody List findListMemoByTag(@RequestBody Map param){
		return memoService.findListMemoByTag(param);
	}
	
	/* 메모 태그 데이터 추가 */
	@RequestMapping(value="insertTag.do")
	public @ResponseBody void insertTag(@RequestBody Map param){
		memoService.insertTag(param);
	}
	
	/* 메모 태그 자체를 삭제 */
	@RequestMapping(value="deleteTag.do")
	public @ResponseBody void deleteTag(@RequestBody Map param){
		memoService.deleteTag(param);
	}
	
	/* 메모 내 태그 데이터 삭제 */
	@RequestMapping(value="deleteTagInMemo.do")
	public @ResponseBody void deleteTagInMemo(@RequestBody Map param){
		memoService.deleteTagInMemo(param);
	}
	
	/* 메모 태그 데이터 수정 */
	@RequestMapping(value="updateTag.do")
	public @ResponseBody void updateTag(@RequestBody Map param){
		memoService.updateTag(param);
	}
	
	/* 메모 데이터 복원 */
	@RequestMapping(value="restoreMemo.do")
	public @ResponseBody void restoreMemo(@RequestBody Map param){
		memoService.restoreMemo(param);
	}
	
	/* 메모 데이터 물리적 삭제 (휴지통 비우기) */
	@RequestMapping(value="emptyTrash.do")
	public @ResponseBody void emptyTrash(@RequestBody Map param){
		memoService.emptyTrash(param);
	}
	
	/* 메모 공유 삭제 */
	@RequestMapping(value="deleteSharedInfo.do")
	public @ResponseBody void deleteSharedInfo(@RequestBody Map param){
		memoService.deleteSharedInfo(param);
	}
	
	/* 메모 공유 설정*/
	@RequestMapping(value="manageSharedInfo.do")
	public @ResponseBody void manageSharedInfo(@RequestBody Map param){
		memoService.manageSharedInfo(param);
	}
	
	/* 메모 공유 정보 조회*/
	@RequestMapping(value="findListSharedUsers.do")
	public @ResponseBody List findListSharedUsers(@RequestBody Map param){
		return memoService.findListSharedUsers(param);
	}
	
	/* 메모 공유 대상자 즐겨찾기 정보 조회*/
	@RequestMapping(value="findListFavorites.do")
	public @ResponseBody List findListFavorites(@RequestBody Map param){
		return memoService.findListFavorites(param);
	}
	
	/* 사용자 정보 조회*/
	@RequestMapping (value = "findListUserInMemo.do")
	public @ResponseBody List findListUserInMemo(@RequestBody Map param) {
		return memoService.findListUserInMemo(param);
	}
	
	/* 즐겨찾기 목록 추가 */
	@RequestMapping(value="insertFavorites.do")
	public @ResponseBody void insertFavorites(@RequestBody Map param){
		memoService.insertFavorites(param);
	}
	
	/* 즐겨찾기 목록 삭제 */
	@RequestMapping(value="deleteFavorites.do")
	public @ResponseBody void deleteFavorites(@RequestBody Map param){
		memoService.deleteFavorites(param);
	}
}
