package smartsuite.app.bp.admin.validator;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.common.collect.Lists;

import smartsuite.app.common.shared.Const;

@SuppressWarnings ({"rawtypes", "unchecked"})
public final class ValidatorUtil {

	private ValidatorUtil() {}
	
	/**
	 * validate 수행 후 리턴된 결과로 resultMap을 생성한다.
	 * 
	 * @param checkParam : validate 수행 시 파라미터
	 * @param checkResult : validate 수행 결과
	 * @return resultMap
	 */
	public static Map<String, Object> getResultMapByCheckResult(Map<String, Object> param, Map<String, Object> checkResult) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		if(checkResult == null) {
			resultMap.put(Const.RESULT_STATUS, Const.NOT_EXIST);
			resultMap.put(Const.RESULT_DATA  , param);
		} else if("Y".equals(checkResult.get(ValidatorConst.VALID_YN))) {
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		} else {
			resultMap.put(Const.RESULT_STATUS, Const.INVALID_STATUS_ERR);
			resultMap.put(Const.RESULT_DATA  , checkResult);
		}
		return resultMap;
	}

	/**
	 * validator 복수 건 수행 후 resultMap 생성
	 * 
	 * @param params : validator 수행 시 파라미터 리스트
	 * @param invalidDatas : validator 수행 후 유효하지 않는 데이터 리스트
	 * @param notExistDatas : validator 수행 후 존재하지 않는 데이터 리스트
	 * @return
	 */
	public static Map<String, Object> getResultMapByInvalidDatas(List<?> params, List<Map<String, Object>> invalidDatas, List<Map<String, Object>> notExistDatas) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		int nonExcutedCnt = invalidDatas.size() + notExistDatas.size();
		if(nonExcutedCnt == 0) {
			resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		} else {
			Map<String, Object> resultDataMap = new HashMap<String, Object>();
			resultDataMap.put(ValidatorConst.INVALID_DATAS  , invalidDatas);
			resultDataMap.put(ValidatorConst.NOT_EXIST_DATAS, notExistDatas);
			resultDataMap.put(ValidatorConst.VALID_CNT      , params.size() - nonExcutedCnt);
			
			resultMap.put(Const.RESULT_STATUS, Const.INVALID_STATUS_ERR);
			resultMap.put(Const.RESULT_DATA  , resultDataMap);
		}
		return resultMap;
	}
	
	/**
	 * 유효여부에 따라 그룹핑한 validate 결과 리스트로 resultMap 생성
	 * 
	 * @param paramIds : validate 수행 시 파라미터 ids
	 * @param checkValidYnList : valid_yn 으로 그룹핑한 validate 결과 리스트 {valid_yn, itemList}
	 * @param key : 데이터 id column
	 * @param errCode : 유효하지 않은 데이터 포함 시 리턴할 오류코드
	 * @return resultMap {result_status, result_data{invalid_datas, not_exist_ids}
	 */
	public static Map<String, Object> getResultMapByCheckValidYnList(List<String> paramIds, List<Map<String, Object>> checkValidYnList, String key, String errCode) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> resultDataMap = new HashMap<String, Object>();
		
		List<String> validIds = Lists.newArrayList();
		List<String> notExistIds = Lists.newArrayList();
		List<Map<String, Object>> invalidDatas = Lists.newArrayList();
		
		if(checkValidYnList.isEmpty()) {
			resultMap.put(Const.RESULT_STATUS, errCode);				// 오류
			
			notExistIds.addAll(paramIds);								// 삭제되거나 존재하지 않는 id 리스트
		} else {
			for(Map<String, Object> checkResult : checkValidYnList) {
				List<Map<String, Object>> checkedList = (List<Map<String, Object>>)checkResult.get("itemList");
				
				if("Y".equals(checkResult.get(ValidatorConst.VALID_YN))) {
					validIds.addAll(getValuesByKey(checkedList, key));
				} else {
					invalidDatas.addAll(checkedList);
				}
			}
			
			if(validIds.size() == paramIds.size()) {
				resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);		// 유효
			} else {
				resultMap.put(Const.RESULT_STATUS, errCode);			// 오류
				
				if(validIds.size() + invalidDatas.size() < paramIds.size()) {
					notExistIds = new ArrayList<String>(paramIds);
					notExistIds.removeAll(validIds);
					notExistIds.removeAll(getValuesByKey(invalidDatas, key));
				}
			}
		}
		
		resultDataMap.put(ValidatorConst.VALID_IDS, validIds);					// 유효 id 리스트
		resultDataMap.put(ValidatorConst.VALID_CNT, validIds.size());			// 유효 count
		
		if(!Const.SUCCESS.equals(resultMap.get(Const.RESULT_STATUS))) {
			resultDataMap.put(ValidatorConst.NOT_EXIST_IDS, notExistIds);			// 삭제되거나 존재하지 않는 id 리스트
			resultDataMap.put(ValidatorConst.INVALID_DATAS, invalidDatas);			// 유효하지 않은 데이터 리스트
		}
		
		resultMap.put(Const.RESULT_DATA, resultDataMap);
		return resultMap;
	}
	
	/**
	 * 
	 * @param list
	 * @param key
	 * @return
	 */
	private static List getValuesByKey(List<Map<String, Object>> list, String key) {
		List result = Lists.newArrayList();
		for(Map<String, Object> data : list) {
			Object value = data.get(key);
			if(value != null) {
				result.add(value);
			}
		}
		return result;
	}
}
