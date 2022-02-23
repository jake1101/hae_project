package smartsuite.app.bp.admin.code;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.inject.Inject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import smartsuite.app.common.shared.Const;
import smartsuite.messagesource.web.MessageService;

/**
 * CommonCode 관련 처리하는 서비스 Class입니다.
 *
 * @author JuEung Kim
 * @see 
 * @FileName CommonCodeService.java
 * @package smartsuite.app.common.code
 * @Since 2016. 2. 2
 * @변경이력 : [2016. 2. 2] JuEung Kim 최초작성
 */
@Service
@Transactional
@SuppressWarnings ({ "unchecked" })
public class CommonCodeService {
	
	private static final Log LOG = LogFactory.getLog(CommonCodeService.class);
	
	/** The sql session. */
	@Inject
	private SqlSession sqlSession;
	
	/** The message service. */
	@Inject
	MessageService messageService;
	
	/**
	 * 그룹코드(ESACDGP) 목록의 값을 반환한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return grp code list
	 * @Date : 2016. 2. 3
	 * @Method Name : findListGrpCode
	 */
	public List<Map<String,Object>> findListGrpCode(Map<String, Object> param) {
		List<Map<String,Object>> grpCodeList = sqlSession.selectList("commonCode.findListGrpCode", param);
		
		return grpCodeList;
	}
	
	/**
	 * 그룹코드(ESACDGP) 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : saveListGrpCode
	 */
	public Map saveListGrpCode(Map<String, Object> param){		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		
		// UPDATE
		for(Map row : updateList){
			sqlSession.update("commonCode.updateEsacdgp", row);
		}
		
		// INSERT
		for(Map row : insertList){
			sqlSession.insert("commonCode.insertEsacdgp", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
		
	}
	
	/**
	 * 그룹코드(ESACDGP) 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteListGrpCode
	 */
	public Map deleteListGrpCode(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		// 삭제 시 그룹코드(ESACDGP)와 연관된 ESACDAT, ESACDDT, ESACDDL, ESADTAT 테이블 데이터도 함께 삭제
		
		// DELETE
		for(Map row : deleteList){
			// 상세 코드 속성 값(ESADTAT) 삭제
			this.deleteEsadtatByGrpCd(row);
			
			// 상세 코드 명(ESACDDL) 삭제
			this.deleteEsacddlByGrpCd(row);
			
			// 상세 코드(ESACDDT) 삭제
			this.deleteEsacddtByGrpCd(row);
			
			// 그룹 코드 속성(ESACDAT) 삭제
			this.deleteEsacdatByGrpCd(row);
			
			// 그룹 코드(ESACDGP) 삭제
			sqlSession.delete("commonCode.deleteEsacdgp", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * 그룹코드 속성(ESACDAT) 목록 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 2
	 * @Method Name : getGrpAttrCodeList
	 */
	public List findListGrpAttrCode(Map<String, Object> param){
		// ESACDAT 그룹코드 속성 목록 조회
		List<Map<String,Object>> grpAttrCodeList = sqlSession.selectList("commonCode.findListGrpAttrCode", param);
		
		return grpAttrCodeList;
	}
	
	/**
	 * 그룹코드 속성(ESACDAT) 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 3
	 * @Method Name : saveListGrpAttrCode
	 */
	public Map saveListGrpAttrCode(Map<String, Object> param){		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		
		// UPDATE
		for(Map row : updateList){
			sqlSession.update("commonCode.updateEsacdat", row);
		}
		
		// INSERT
		for(Map row : insertList){
			sqlSession.insert("commonCode.insertEsacdat", row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	
	/**
	 * 그룹코드 속성(ESACDAT) 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : deleteGrpAttrCodeList
	 */
	public Map deleteListGrpAttrCode(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> deleteList = (List<Map<String, Object>>)param.get("deleteList");
		
		// ESACDAT 테이블에서 선택한 그룹코드 속성 삭제
		// 삭제 시 상세코드와 연관된 ESADTAT 테이블 데이터도 함께 삭제
		
		// DELETE
		for(Map row : deleteList){
			// 상세 코드 속성 값(ESADTAT) 삭제
			this.deleteEsadtatByAttrCd(row);
			
			// 그룹 코드 속성(ESACDAT) 삭제
			this.deleteEsacdat(row);
		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * 그룹코드 속성(ESACDAT)을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 4
	 * @Method Name : deleteEsacdat
	 */
	public void deleteEsacdat(Map param){
		sqlSession.delete("commonCode.deleteEsacdat", param);
	}
	
	/**
	 * 그룹코드 속성(ESACDAT)을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 23
	 * @Method Name : deleteEsacdatByGrpCd
	 */
	public void deleteEsacdatByGrpCd(Map param){
		sqlSession.delete("commonCode.deleteEsacdatByGrpCd", param);
	}
	
	/**
	 * 상세코드(ESACDDT) 목록 조회한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the list
	 * @Date : 2016. 2. 2
	 * @Method Name : getDtlCodeList
	 */
	public List findListDtlCode(Map<String, Object> param){
		// 상세코드 목록(ESACDDT) 조회
		List<Map<String,Object>> grpDtlCodeList = sqlSession.selectList("commonCode.findListDtlCode", param);
		
		// 상세코드 목록(ESACDDT)에 매핑되어 있는 상세 코드 속성 값(ESADTAT)을 세팅해 준다.
		for(Map row : grpDtlCodeList){
			// 그룹코드 속성(ESACDAT,ESADTAT) 조회
			List<Map<String,Object>> grpDtlCodeValueList = sqlSession.selectList("commonCode.findListGrpAttrCodeAndAttrVal", row);
			
			int i = 0;
			
			for(Map rowDtl : grpDtlCodeValueList){
				row.put("attr_cd"+i			, rowDtl.get("attr_cd") );			// 속성 코드
				row.put("attr_cd_nm"+i		, rowDtl.get("attr_cd_nm") );		// 속성코드명
				row.put("dtl_cd_attr_val"+i	, rowDtl.get("dtl_cd_attr_val") ); 	// 상세 코드 속성 값
				i++;
			}
		}
		
		return grpDtlCodeList;
	}
	
	/**
	 * 상세코드(ESACDDT)를 저장한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 2
	 * @Method Name : saveGrpAttrCodeList
	 */
	public Map saveListDtlCode(Map<String, Object> param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String, Object>> updateList = (List<Map<String, Object>>)param.get("updateList");
		List<Map<String, Object>> insertList = (List<Map<String, Object>>)param.get("insertList");
		
		// 신규 추가, 수정된 상세코드 정보를 ESACDDT, ESACDDL 테이블에 저장
		// 속성컬럼에 값 입력 시 ESADTAT 테이블에 상세코드 속성값 저장
		
		Map esadtat = null;
		
		// UPDATE
		for(Map row : updateList){
			// 상세코드(ESACDDT) 저장
			sqlSession.update("commonCode.updateEsacddt", row);
			
			// 상세코드명(ESACDDL) 저장
			sqlSession.update("commonCode.updateEsacddl", row);
			
			// 그룹코드속성(ESACDAT) 조회
			List<Map<String,Object>> grpAttrCodeList = sqlSession.selectList("commonCode.findListGrpAttrCode", row);
			
			// 그룹코드 속성 개수 만큼 체크
			for(int i=0; i<grpAttrCodeList.size(); i++){
				
				// 상세코드속성값(ESADTAT) 조회
				row.put("attr_cd", row.get("attr_cd"+i) );
				esadtat = null;
				esadtat = sqlSession.selectOne("commonCode.findDtlCodeAttrVal", row);
				
				/**
				 * 상세코드속성값(ESADTAT) 저장
				 */
				// 상세코드속성값 테이블에 데이터가 존재하고, 속성컬럼에 값 입력시 UPDATE
				if(esadtat != null && row.get("dtl_cd_attr_val"+i) != null){
					row.put("dtl_cd_attr_val", row.get("dtl_cd_attr_val"+i) ); // 상세 코드 속성 값
					sqlSession.update("commonCode.updateEsadtat", row);
					
				// 상세코드속성값 테이블에 데이터가 존재하고, 속성컬럼에 값 입력이 null일경우 DELETE
				}else if(esadtat != null && row.get("dtl_cd_attr_val"+i) == null){
					this.deleteEsadtat(row); 
					
				// 상세코드속성값 테이블에 데이터가 존재하지 않고, 속성컬럼에 값 입력시 INSERT
				}else if(esadtat == null && row.get("dtl_cd_attr_val"+i) != null){
					row.put("dtl_cd_attr_val", row.get("dtl_cd_attr_val"+i) );
					this.insertEsadtat(row);
					
				}
				
			}
			
		}
		
		// INSERT
		for(Map row : insertList){
			// 상세코드(ESACDDT) 저장 - 다른 언어에서 추가하는 경우도 있으므로 merge
			sqlSession.insert("commonCode.mergeEsacddt", row);
			
			// 상세코드명(ESACDDL) 저장
			sqlSession.insert("commonCode.insertEsacddl", row);
			
			// 다국어 별 기본 라벨 생성
			this.insertDefaultLabelByAvailableLocale(row);
			
			// 그룹코드속성(ESACDAT) 조회
			List<Map<String,Object>> grpAttrCodeList = sqlSession.selectList("commonCode.findListGrpAttrCode", row);
			
			// 그룹코드 속성 개수 만큼 체크
			for(int i=0; i<grpAttrCodeList.size(); i++){
				/**
				 * 상세코드속성값(ESADTAT) 저장
				 */
				// 속성컬럼에 값 입력시 INSERT
				if(row.get("dtl_cd_attr_val"+i) != null){
					row.put("attr_cd", grpAttrCodeList.get(i).get("attr_cd") );
					row.put("dtl_cd_attr_val", row.get("dtl_cd_attr_val"+i) );
					
					this.insertEsadtat(row);
				}
				
			}

		}
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * 상세 코드(ESACDDT)를 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @return the map
	 * @Date : 2016. 2. 3
	 * @Method Name : deleteListDtlCode
	 */
	public Map deleteListDtlCode(Map param){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<Map> deleteList = (List<Map>)param.get("deleteList");
		
		// 상세코드 속성 값 삭제
		this.deleteEsadtatByDtlCd(deleteList);
		
		// 상세코드 명 삭제
		this.deleteEsacddl(deleteList);
		
		// 상세코드 삭제
		this.deleteEsacddt(deleteList);
		
		resultMap.put(Const.RESULT_STATUS, Const.SUCCESS);
		return resultMap;
	}
	
	/**
	 * 상세코드속성값(ESADTAT)을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 23
	 * @Method Name : deleteEsadtatByDtlCd
	 */
	public void deleteEsadtatByDtlCd(List<Map> deleteList){
		
		for(Map row : deleteList){
			sqlSession.delete("commonCode.deleteEsadtatByDtlCd", row);
		}
		
	}
	
	/**
	 * 상세코드명(ESACDDL)을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 16
	 * @Method Name : deleteEsacddl
	 */
	public void deleteEsacddl(List<Map> deleteList){
		
		for(Map row : deleteList){
			sqlSession.delete("commonCode.deleteEsacddl", row);
		}
	}
	
	/**
	 * 상세코드(ESACDDT)를 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 16
	 * @Method Name : deleteEsacddt
	 */
	public void deleteEsacddt(List<Map> deleteList){
		
		for(Map row : deleteList){
			sqlSession.delete("commonCode.deleteEsacddt", row);
		}
	}
	
	/**
	 * 상세코드명(ESACDDL)을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 23
	 * @Method Name : deleteEsacddlByGrpCd
	 */
	public void deleteEsacddlByGrpCd(Map param){
		sqlSession.delete("commonCode.deleteEsacddlByGrpCd", param);
	}
	
	/**
	 * 상세코드속성값(ESADTAT)을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 4
	 * @Method Name : deleteEsadtat
	 */
	public void deleteEsadtat(Map param){
		sqlSession.delete("commonCode.deleteEsadtat", param);
	}
	
	/**
	 * 상세코드속성값(ESADTAT)을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 23
	 * @Method Name : deleteEsadtatByGrpCd
	 */
	public void deleteEsadtatByGrpCd(Map param){
		sqlSession.delete("commonCode.deleteEsadtatByGrpCd", param);
	}
	
	/**
	 * 상세코드속성값(ESADTAT)을 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 23
	 * @Method Name : deleteEsadtatByAttrCd
	 */
	public void deleteEsadtatByAttrCd(Map param){
		sqlSession.delete("commonCode.deleteEsadtatByAttrCd", param);
	}
	
	/**
	 * 상세코드(ESACDDT)를 삭제한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 23
	 * @Method Name : deleteEsacddtByGrpCd
	 */
	public void deleteEsacddtByGrpCd(Map param){
		sqlSession.delete("commonCode.deleteEsacddtByGrpCd", param);
	}
	
	/**
	 * 상세코드속성값(ESADTAT)을 입력한다.
	 *
	 * @author : JuEung Kim
	 * @param param the param
	 * @Date : 2016. 2. 4
	 * @Method Name : insertDtlCode
	 */
	public void insertEsadtat(Map param){
		sqlSession.insert("commonCode.insertEsadtat", param);
	}
	
	private void insertDefaultLabelByAvailableLocale(Map row){
		Locale defaultLocale = new Locale("ko","KR");
		// 서버에 관리하는 다국어 목록 가져와서 다국어 별로 insert
		Collection<Locale> availableLocales = messageService.getAvailableLocales();
		for(Locale availableLocale : availableLocales){
			row.put("locale", availableLocale);
			row.put("defaultLocale", defaultLocale);
			try{
				sqlSession.insert("commonCode.insertDefaultEsacddl", row);
			}
			catch(Exception e){
				LOG.error(e.getMessage(), e);
			}
		}
	}
}
