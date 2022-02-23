package smartsuite.app.bp.memo;
import java.util.List;
import java.util.Map;

public interface MemoService {

	public List<Map<String, Object>> findListAllMemo();
	
	public List<Map<String, Object>> findListMyMemo();
	
	public List<Map<String, Object>> findListSharedMemo();
	
	public List<Map<String, Object>> findListImptMemo();
	
	public List<Map<String, Object>> findListDeletedMemo();
	
	public List<Map<String, Object>> findDashboardMemo();
	
	public void insertMemo(Map<String, Object> param);
	
	public void updateMemo(Map<String, Object> param);
	
	public void deleteMemo(Map<String, Object> param);
	
	public void updateMemoImpt(Map<String, Object> param);
	
	public void updateMemoDashboard(Map<String, Object> param);
	
	public List<Map<String, Object>> findListTag();
	
	public List<Map<String, Object>> findListTagByKeyword(Map<String, Object> searchParam);
	
	public List<Map<String, Object>> findListMemoTag(Map<String, Object> param);
	
	public List<Map<String, Object>> findListMemoByTag(Map<String, Object> param);
	
	public void insertTag(Map<String, Object> param);
	
	public void deleteTag(Map<String, Object> param);
	
	public void deleteTagInMemo(Map<String, Object> param);
	
	public void updateTag(Map<String, Object> param);
	
	public void restoreMemo(Map<String, Object> param);
	
	public void emptyTrash(Map<String, Object> param);
	
	public void deleteSharedInfo(Map<String, Object> param);
	
	public void manageSharedInfo(Map<String, Object> param);
	
	public List<Map<String, Object>> findListSharedUsers(Map<String, Object> param);
	
	public List<Map<String, Object>> findListFavorites(Map<String, Object> param);
	
	public List<Map<String, Object>> findListUserInMemo(Map<String, Object> searchParam);

	public void insertFavorites(Map<String, Object> param);
	
	public void deleteFavorites(Map<String, Object> param);
	
}
