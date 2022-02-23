package smartsuite.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Handles requests for the application home page.
 */
@Controller
public class MobileHomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(MobileHomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
//	@RequestMapping(value = "/m", method = RequestMethod.GET)
//	public ModelAndView mobile(HttpServletRequest req) {
//		return new ModelAndView("index2");
//	}
	
	@RequestMapping(value = "/mobile/home.do", method = RequestMethod.GET)
	public ModelAndView home(HttpServletRequest req,HttpServletResponse res) {
		if(req.getParameter("type") == null ||  req.getParameter("type").equals("system")) {
			return new ModelAndView("mobile/home");
		}else if(req.getParameter("type").equals("worker")){
			return new ModelAndView("mobile/workerLogin");
		}else {
			req.setAttribute("msg", "잘못된 접근 방식입니다.");
			req.setAttribute("loc", "/login.do");
			return new ModelAndView("msg");
		}
		
	}
	
	@RequestMapping(value = "/mobile/mLoginSuccess.do", method = RequestMethod.POST)
	public ModelAndView mcheckUser(HttpServletRequest req,HttpServletResponse res) {
		System.out.println("mCheckUser start!!!!!!");
			return afterCheckLogin(req,"mobile/smartTag_location_state");
	}
	@RequestMapping(value = "/mobile/homeMenu.do", method = RequestMethod.GET)
	public ModelAndView homeMenu(HttpServletRequest req,HttpServletResponse res) {
			return  afterCheckLogin(req,"mobile/nativeTest");
	}
	
	@RequestMapping(value = "/mobile/nativeTest.do", method = RequestMethod.GET)
	public ModelAndView nativeTest(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"mobile/nativeTest");
	}
	@RequestMapping(value = "/mobile/nativeTest2.do", method = RequestMethod.GET)
	public ModelAndView nativeTest2(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"mobile/nativeTest2");
	}
	
	@RequestMapping(value = "/mobile/smarttagLocation.do", method = RequestMethod.GET)
	public ModelAndView smarttagLocation(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"mobile/smarttagLocation");
	}
	@RequestMapping(value = "/mobile/sensorScan.do", method = RequestMethod.GET)
	public ModelAndView sensorScan(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"sensorScan");
	}
	@RequestMapping(value = "/mobile/iotDevice.do", method = RequestMethod.GET)
	public ModelAndView iotDevice(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"iotDevice");
	}
	@RequestMapping(value = "/mobile/setting.do", method = RequestMethod.GET)
	public ModelAndView setting(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"setting");
	}
	@RequestMapping(value = "/mobile/logout.do", method = RequestMethod.GET)
	public ModelAndView logout(HttpServletRequest req,HttpServletResponse res) {
		req.setAttribute("msg", "로그아웃 되었습니다.");
		req.setAttribute("loc", "/mobile/home.do");
		return new ModelAndView("msg");
	}
	
	private ModelAndView afterCheckLogin(HttpServletRequest request, String view) {
			return new ModelAndView(view);
	}
	
	private ModelAndView noCheckLogin(HttpServletRequest request, String view) {
			return new ModelAndView(view);
	}
	
	
	@RequestMapping(value = "/mobile/registration.do", method = RequestMethod.GET)
	public ModelAndView registration(HttpServletRequest req,HttpServletResponse res) {
		String typeStr = req.getParameter("type");
		if("vendor".equals(typeStr)) {
			return noCheckLogin(req,"/mobile/vendorLogin");
		}else if("worker".equals(typeStr)){
			return  noCheckLogin(req,"/mobile/workerLogin");
		}else if("worker_regist".equals(typeStr)){
			return noCheckLogin(req,"/mobile/worker_regist_no");
		}else if("worker_regist_eng".equals(typeStr)){
			return noCheckLogin(req,"/mobile/worker_regist_no_eng");
		}else {
			req.setAttribute("msg", "잘못된 접근 방식입니다.");
			req.setAttribute("loc", "/login.do");
			return new ModelAndView("msg");
		}
	}
	
	@RequestMapping(value = "/mobile/registrationmax.do", method = RequestMethod.GET)
	public ModelAndView registrationmax(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/worker_regist_max");
	}
	@RequestMapping(value = "/mobile/registrationmin.do", method = RequestMethod.GET)
	public ModelAndView registrationmin(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/worker_regist_min");
	}
	
	@RequestMapping(value = "/mobile/smartTagLocationState.do", method = RequestMethod.GET)
	public ModelAndView smartTagLocationState(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/smartTag_location_state");
	}
	
	
	@RequestMapping(value = "/mobile/workerSearch.do", method = RequestMethod.GET)
	public ModelAndView workerSearch(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/worker_search");
	}
	@RequestMapping(value = "/mobile/vehicleSearch.do", method = RequestMethod.GET)
	public ModelAndView vehicleSearch(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/vehicle_search");
	}
	
	@RequestMapping(value = "/mobile/targetDetail.do", method = RequestMethod.GET)
	public ModelAndView targetDetail(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/target_detail");
	}
	@RequestMapping(value = "/mobile/beaconDetail.do", method = RequestMethod.GET)
	public ModelAndView beaconDetail(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/beacon_detail");
	}
	
	@RequestMapping(value = "/mobile/weatherInfo.do", method = RequestMethod.GET)
	public ModelAndView weatherInfo(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/weather_info");
	}
	@RequestMapping(value = "/mobile/evnSensor.do", method = RequestMethod.GET)
	public ModelAndView evnSensor(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/evn_sensor");
	}
	@RequestMapping(value = "/mobile/alarmHistory.do", method = RequestMethod.GET)
	public ModelAndView alarmHistory(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/alarm_history");
	}
	@RequestMapping(value = "/mobile/smartTagSiteMapping.do", method = RequestMethod.GET)
	public ModelAndView smartTagSiteMapping(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/smartTag_site_mapping");
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	@RequestMapping(value = "/mobile/mappingMobile.do", method = RequestMethod.GET)
	public ModelAndView mappingMobile(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/regist_mapping_adm");
	}
	@RequestMapping(value = "/mobile/returnMobile.do", method = RequestMethod.GET)
	public ModelAndView returnMobile(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/return_tag_adm");
	}
	
	
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////
	@RequestMapping(value = "/mobile/registMapping.do", method = RequestMethod.GET)
	public ModelAndView registMapping(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/regist_mapping");
	}
	@RequestMapping(value = "/mobile/registMappingmin.do", method = RequestMethod.GET)
	public ModelAndView registMappingmin(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/regist_mapping_min");
	}
	@RequestMapping(value = "/mobile/registNoMapping.do", method = RequestMethod.GET)
	public ModelAndView registNoMapping(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/regist_no_mapping");
	}
	@RequestMapping(value = "/mobile/returnTag.do", method = RequestMethod.GET)
	public ModelAndView returnTag(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/return_tag");
	}
	@RequestMapping(value = "/mobile/registNoEnroll.do", method = RequestMethod.GET)
	public ModelAndView registNoEnroll(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/regist_no_enroll");
	}
	@RequestMapping(value = "/mobile/enterSuccess.do", method = RequestMethod.GET)
	public ModelAndView enterSuccess(HttpServletRequest req,HttpServletResponse res) {
		
		req.setAttribute("side_bar_type", req.getParameter("side_bar_type"));
		return noCheckLogin(req,"/mobile/enter_success");
	}
	
	@RequestMapping(value = "/mobile/registComplete.do", method = RequestMethod.GET)
	public ModelAndView registComplete(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/regist_complete");
	}
	@RequestMapping(value = "/mobile/alarmDetail.do", method = RequestMethod.GET)
	public ModelAndView alarmDetail(HttpServletRequest req,HttpServletResponse res) {
		return afterCheckLogin(req,"/mobile/alarm_detail");
	}
	
	/**
	    * 작업허가제 : 목록/신청(시스템 사용자)
	    */
	   @RequestMapping(value = "/mobile/ptwReqList.do", method = RequestMethod.GET)
	   public ModelAndView ptwReqList(HttpServletRequest req,HttpServletResponse res) {
	      req.setAttribute("side_bar_type", "max");
	      return afterCheckLogin(req,"/mobile/ptw-request-list-test");
	   }
	   
	   /**
	    * 작업허가제 : 목록/신청(작업자)
	    */
	   @RequestMapping(value = "/mobile/workerPtwReqList.do", method = RequestMethod.GET)
	   public ModelAndView workerPtwReqList(HttpServletRequest req,HttpServletResponse res) {
	      req.setAttribute("side_bar_type", "min");
	      return afterCheckLogin(req,"/mobile/ptw-request-list");
	   }
	   
	   /**
	    * 작업허가제 : 승인 목록(시스템 사용자)
	    */
	   @RequestMapping(value = "/mobile/ptwApprList.do", method = RequestMethod.GET)
	   public ModelAndView ptwApprList(HttpServletRequest req,HttpServletResponse res) {
	      req.setAttribute("side_bar_type", "max");
	      return afterCheckLogin(req,"/mobile/ptw-approval-list");
	   }
	   
	   /**
	    * 작업허가제 : 상세 화면 이동
	    */
	   @RequestMapping(value = "/mobile/movePtwDetail.do", method = RequestMethod.POST)
	   public ModelAndView movePtwDetail(HttpServletRequest req,HttpServletResponse res) {
	      req.setAttribute("side_bar_type", req.getParameter("side_bar_type"));
//	      return afterCheckLogin(req,"/mobile/ptw-detail");
	      return afterCheckLogin(req,"/mobile/ptw-detail-upgrade");
	   }
	   
	   /**
	    * 작업허가제 : 목록/신청 화면 이동
	    */
	   @RequestMapping(value = "/mobile/movePtwList.do", method = RequestMethod.POST)
	   public ModelAndView movePtwList(HttpServletRequest req,HttpServletResponse res) {
	      req.setAttribute("side_bar_type", req.getParameter("side_bar_type"));
	      return afterCheckLogin(req,"/mobile/ptw-request-list");
	   }
	   
	   /**
	    * 작업허가제 : 승인 화면 이동
	    */
	   @RequestMapping(value = "/mobile/movePtwApprList.do", method = RequestMethod.POST)
	   public ModelAndView movePtwApprList(HttpServletRequest req,HttpServletResponse res) {
	      req.setAttribute("side_bar_type", req.getParameter("side_bar_type"));
	      return afterCheckLogin(req,"/mobile/ptw-approval-list");
	   }
	   
	   /**
	    * 작업 중지 알림 화면
	    */
	   @RequestMapping(value = "/mobile/workStop.do", method = RequestMethod.GET)
		public ModelAndView workStop(HttpServletRequest req,HttpServletResponse res) {
			return afterCheckLogin(req,"/mobile/work_stop");
		}
	
	   /**
	    * 식별기 관리 화면
	    */
	   @RequestMapping(value = "/mobile/beaconMgnt.do", method = RequestMethod.GET)
		public ModelAndView beaconMgnt(HttpServletRequest req,HttpServletResponse res) {
			return afterCheckLogin(req,"/mobile/beacon_mgnt");
		}
	   
	   /**
	    * 미교부 단말 찾기
	    */
	   @RequestMapping(value = "/mobile/findTag.do", method = RequestMethod.GET)
		public ModelAndView findTag(HttpServletRequest req,HttpServletResponse res) {
			return afterCheckLogin(req,"/mobile/find_tag");
		}
	   
	   /**
	    * cctv
	    */
	   @RequestMapping(value = "/mobile/cctv.do", method = RequestMethod.GET)
	   public ModelAndView cctv(HttpServletRequest req,HttpServletResponse res) {
		   return noCheckLogin(req,"/mobile/cctv");
	   }
	   
	   @RequestMapping(value = "/mobile/moveSiteOrgList.do", method = RequestMethod.GET)
	   public ModelAndView moveSiteOrgList(HttpServletRequest req,HttpServletResponse res) {
		   req.setAttribute("side_bar_type", "max");
		   return noCheckLogin(req,"/mobile/site-org-list");
	   }
	   
	   @RequestMapping(value = "/mobile/preparing.do", method = RequestMethod.GET)
		public ModelAndView preparing(HttpServletRequest req,HttpServletResponse res) {
			return noCheckLogin(req,"/mobile/preparing");
		}
	   
	   /**
	    *  동의서
	    */
	   @RequestMapping(value = "/mobile/agreementDoc.do", method = RequestMethod.GET)
		public ModelAndView agreementDoc(HttpServletRequest req,HttpServletResponse res) {
			return noCheckLogin(req,"/mobile/agreementDoc");
		}
	   /**
	    *  echart
	    */
	   @RequestMapping(value = "/mobile/chartGraph.do", method = RequestMethod.GET)
	   public ModelAndView chartGraph(HttpServletRequest req,HttpServletResponse res) {
		   return noCheckLogin(req,"/mobile/chartGraph");
	   }
	   /**
	    *  echart2
	    */
	   @RequestMapping(value = "/mobile/chartGraph2.do", method = RequestMethod.GET)
	   public ModelAndView chartGraph2(HttpServletRequest req,HttpServletResponse res) {
		   return noCheckLogin(req,"/mobile/chartGraph2");
	   }
	   
	   
//////////////////////////////////////////////////// 고도화 
	   /**
	    * 작업허가제 신청 
	    */
	   @RequestMapping(value = "/mobile/ptwReqList2.do", method = RequestMethod.GET)
	   public ModelAndView ptwReqList2(HttpServletRequest req,HttpServletResponse res) {
	      return afterCheckLogin(req,"/mobile/ptw-request-list-upgrade");
	   }
	   
	   /**
	    * 작업허가제 : 상세 화면 이동
	    */
	   @RequestMapping(value = "/mobile/movePtwDetail2.do", method = RequestMethod.POST)
	   public ModelAndView movePtwDetail2(HttpServletRequest req,HttpServletResponse res) {
	      return afterCheckLogin(req,"/mobile/ptw-detail-upgrade");
	   }
	   
	   /**
	    * 작업허가제 : 목록/신청 화면 이동
	    */
	   @RequestMapping(value = "/mobile/movePtwList2.do", method = RequestMethod.POST)
	   public ModelAndView movePtwList2(HttpServletRequest req,HttpServletResponse res) {
	      return afterCheckLogin(req,"/mobile/ptw-request-list-upgrade");
	   }
	   /**
	    * 시공사진관리 : 시공사진등록 - 제목입력
	    */
	   @RequestMapping(value = "/mobile/pictureRegistTitle.do", method = RequestMethod.GET)
	   public ModelAndView pictureRegist(HttpServletRequest req,HttpServletResponse res) {
		   return afterCheckLogin(req,"/mobile/construction-picture-regist-title");
	   }
	   /**
	    * 시공사진관리 : 시공사진등록 - 상세
	    */
	   @RequestMapping(value = "/mobile/pictureRegistDetail.do", method = RequestMethod.GET)
	   public ModelAndView pictureRegistDetail(HttpServletRequest req,HttpServletResponse res) {
		   return afterCheckLogin(req,"/mobile/construction-picture-regist");
	   }
	   /**
	    * 시공사진관리 : 시공사진목록
	    */
	   @RequestMapping(value = "/mobile/pictureList.do", method = RequestMethod.GET)
	   public ModelAndView pictureList(HttpServletRequest req,HttpServletResponse res) {
		   return afterCheckLogin(req,"/mobile/construction-picture-list");
	   }
	   /**
	    * 시공사진관리 : 시공사진 상세목록
	    */
	   @RequestMapping(value = "/mobile/pictureDetail.do", method = RequestMethod.GET)
	   public ModelAndView pictureDetail(HttpServletRequest req,HttpServletResponse res) {
		   return afterCheckLogin(req,"/mobile/construction-picture-detail");
	   }
	   /**
	    * 공지사항 : 목룍 
	    */
	   @RequestMapping(value = "/mobile/noticeList.do", method = RequestMethod.GET)
	   public ModelAndView noticeList(HttpServletRequest req,HttpServletResponse res) {
		   return afterCheckLogin(req,"/mobile/notice-management");
	   }
	   /**
	    * 공지사항 : 상세 
	    */
	   @RequestMapping(value = "/mobile/noticeDetail.do", method = RequestMethod.GET)
	   public ModelAndView noticeDetail(HttpServletRequest req,HttpServletResponse res) {
		   return afterCheckLogin(req,"/mobile/notice-detail");
	   }
	   /**
	    * 이동장비 등록
	    */
	   @RequestMapping(value = "/mobile/vehicleRegistration.do", method = RequestMethod.GET)
	   public ModelAndView vehicleRegistration(HttpServletRequest req,HttpServletResponse res) {
		   return afterCheckLogin(req,"/mobile/vehicle-registration");
	   }
	   /**
	    * 개인정보 처리 방침
	    */
	   @RequestMapping(value = "/mobile/policy.do", method = RequestMethod.GET)
	   public ModelAndView policy(HttpServletRequest req,HttpServletResponse res) {
		   return afterCheckLogin(req,"/mobile/policy");
	   }
	   
}
