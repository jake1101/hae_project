//blueSky1	
// 한라건설 - 2020.01.15 pjsuny

var blueSkySkin = {
	/*  모든 영역 스타일의 부모 스타일  */	
	"default": {
		/* 모든 영역의 font가 적용된다. header나 cell에 각각의 폰트를 적용할려면  header-head, body-cell 등 각각의 영역에서 지정한다.*/
		"fontSize" : "12",
		"fontName" : "Malgun Gothic"
	},
	/* 그리드 보더나 트리뷰 라인 등 그리드 자체를 그릴 때 사용. */
	"grid" : {
		"border" : null,
		"paddingRight" : null,
		"paddingTop" : null,
		"paddingBottom" : "10",
	},
	/*각각의 영역에 세부 스타일을 적용한다. 기본스타일 셋이 되지 않는다.(데이터셀들이 표시되는 body 영역의 바탕색 지정 가능)*/
	"body" : {/*2020.01.10 pjsuny*/
		
		"background" : "#ffffffff",
		
		/*그리드행들의 바탕색 및 아래쪽 경계선 스타일. */
		"rowRange":{
			 "rows" : [{
//				"range": "row % 2 == 1",
//	            "styles": {
//	                "background": "#08000000"
//	            }
			}]
		},
		
		/* 데이터셀들을 그릴 때 사용되는 기본 스타일셋. */
		"cell": {/*2020.01.10 pjsuny*/
			"borderBottom" : "#ffbbbbbb,1",
		},
		"merged": {
			"background" : "#ffbf8895"
		}
	},
	/*GridHeader(컬럼)들을 그릴 때 사용되는 기본 스타일셋.*/
	"header" : {/*2020.01.15 pjsuny*/
		"fontSize" : "12",
		"color": "#111",
		"paddingTop" : "5",
		"hoveredColor": "#ffffff",
		"selectedColor":"#ffffff",
		"borderRight" : "#ffbbbbbb,1",
		"borderBottom" : "#ffbbbbbb,1",
		"borderTop": "#ffbbbbbb,0",
		"background" : "#fff8f8f8",
		"selectedBackground" : "#ff8f8f8f",
		"hoveredBackground" : "#ff8f8f8f",
		"group" : {
			"fontSize" : "12",
			"color": "#111",
			"paddingTop" : "5",
			"hoveredColor": "#ffffff",
			"selectedColor":"#ffffff",
			"borderRight" : "#ffbbbbbb,1",
			"borderBottom" : "#ffbbbbbb,1",
			"borderTop": "#ffbbbbbb,0",
			"background" : "#fff8f8f8",
			"selectedBackground" : "#ff8f8f8f",
			"hoveredBackground" : "#ff8f8f8f",
		}
	},
	/* GridFooter 셀을 그릴 때 사용되는 스타일셋.*/
	"footer" : {
		"borderRight" : "#ffc4cbd4,1",
		"borderTop" : "#ffaeb8c4,1",
		"background" : "#ffeeeeee",
		"textAlignment" : "near"
	},
	"rowGroup" : {
		/* 그룹행을 그릴 때 사용되는 기본 스타일셋. */
		"header" : {
			"borderRight" : "#ff097ac1,1",
			"borderBottom" : "#ff097ac1,1",
			"borderTop" : "#ffffffff,0",
			"background" : "#ff349cde",
		},
		/* 그룹 footer행(소계)을 그릴 때 사용되는 기본 스타일셋. */
		"footer" : {
			"borderRight" : "#ffc7c4b0,1",
			"borderBottom" : "#ffc7c4b0,1",
			"borderTop" : "#ffffffff,0",
			"background" : "#fffff9d4"
		}
	},
	/*RowIndicator(그리드 왼쪽의 숫자를 나타내는 영역) 셀들을 그릴 때 사용되는 기본 스타일셋.*/
	"rowIndicator" : {/*2020.01.15 pjsuny*/
		"borderTop" : "#ffbbbbbb,0",
		"borderRight" : "#ffbbbbbb,1",
		"borderLeft" : "#ffbbbbbb,0",
		"borderBottom" : "#ffbbbbbb,1",
		"background" : "#fff8f8f8",
		"selectedBackground" : "#ffe72e17",
		"hoveredBackground" : "#ffe72e17",
		"color" : "#ff111111",
		"hoveredColor":"#ffffff",
		"shapeColor": "#ffffffff",
		"shapeInactiveColor" : "#ffffffff",		
		"shapeSelectedColor" : "#ffffffff",		
		"shapeHoveredColor"  : "#ffffffff",
		
	},
	/* CheckBar 셀들을 그릴 때 사용되는 기본 스타일셋. */
	"checkBar" : {/*2020.01.15 pjsuny*/
		"borderRight" : "#ffbbbbbb,1",
		"borderBottom" : "#ffbbbbbb,1",
		"background" : "#ffffffff",
		"head" : {
			"color" : "#111111",
			"background" : "#f8f8f8"
		}
	
	    //"shapeColor" : "#ffffff",  //체크모양 색
		/**	sc-grid 2.2.7 부터 적용가능
	    "boxBackground" :"#1f91ff",  //박스 배경색 
	    "boxBorder" : "#1f91ff",  //박스 테두리색
	    "boxInactiveBackground" : "#c2c2c2",  //박스 비활성화시 배경색
	    "boxInactiveBorder" : "#c2c2c2"   //박스  비활성화시 테두리색 
		**/
	
	},
	/*트리의 속성을 변경할때 사용한다.*/
	"tree":{
		
		/** +,- 상자 색상변경	sc-grid 2.2.7 부터 적용가능 **/
		"expander" : {
			  "borderBottom" : null,
//            shapeExpandedColor: '#3b73af',  //+ 
//            shapeCollapsedColor: '#016600'  //-
        }
	    
	},
	
	
	"dynamicStyles" : {
		//column의 editable 속성이 true일 경우 아래 style이 설정된다.
		"editable" : {
			"styles" : {
				"background" : "#cbe2f7"
			}
		},
		//column의 required 속성이 true일 경우 아래 style이 설정된다.
		"required" : {
            "renderer" : {
                "type" : "icon" 
            },
            "styles" : {
            	"celltipLocation": "leftTop"
            	// "celltipColor":"#ff7800"   
            }
		},
		"icons" : {
			"basicIcons":{
                "name" : "__icons__",
                "root":"bower_components/sc-grid/resources/img/",
                "items" : [
                    "icon_attach.png",
                    "icon_link.png",
                    "icon_search.png",
                    "icon_error.png"
                ]
            },
			"stateIcons": {
            	"name": 'stateIcons',
            	"root":"bower_components/sc-grid/resources/smartdatagrid/assets/",
        		"items": [
        			"data_created.png",
        			"data_updated.png",
        			"data_deleted.png"
        		]
            },
		},
		//image column의 imageCls로 사용되는 image 목록
		"imageCls":{
            "link"   : "bower_components/sc-grid/resources/img/icon_link.png",
            "search" : "bower_components/sc-grid/resources/img/icon_search.png",
            "attach" : "bower_components/sc-grid/resources/img/icon_attach.png"
        },
        //column에서 styleName속성으로 아래 등록된 style을 사용할 수 있다.
        "columnStyles" : {
        	"link" :{
                "cursor": "pointer",
                "styles" : {/*2020.01.10 pjsuny*/
                    "fontBold": true,
                    "color": "#0c4da2"
                } 
            }
        }
        /**
         *  checkbar 이미지 표현 sc-grid 2.2.8 부터 적용가능
        "selectionBarIcons": [
        	{defaultIcon: "gridicons/default-checkbox.png"},
        	{checkedIcon: "gridicons/check-checkbox.png"},
        	{defaultInactiveIcon: "gridicons/default-inactive-checkbox.png"},
        	{checkedInactiveIcon: "gridicons/check-inactive-checkbox.png"},
        	{radioDefaultIcon: "gridicons/default-radio.png"},
        	{radioCheckedIcon: "gridicons/checked-radio.png"},
        	{radioDefaultInactiveIcon: "gridicons/default-inactive-radio.png"},
        	{radioCheckedInactiveIcon: "gridicons/checked-inactive-radio.png"}
        ]
        */

	}
};