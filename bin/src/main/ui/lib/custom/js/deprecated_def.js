/**
 * 공통 속성을 정의한다
 *
 * @class DEF
 */
var DEF = {
    /**
     * 성공 - 서버에서 데이터 처리 후 결과 코드
     *
     * @property SUCCESS
     * @type String
     */
    SUCCESS: "S",

    /**
     * 실패 - 서버에서 데이터 처리 후 결과 코드
     *
     * @property FAIL
     * @type String
     */
    FAIL: "E",

    /**
     * 데이터 중복 - 서버에서 데이터 처리 후 결과 코드
     *
     * @property DUPLICATED
     * @type String
     */
    DUPLICATED: "D",

    /**
     * 데이터 사용중 - 서버에서 데이터 처리 후 결과 코드
     *
     * @property USED
     * @type String
     */
    USED: "U",
    
    /**
     * 존재하지 않음 - 서버에서 데이터 처리 후 결과 코드
     *
     * @property NOT_EXIST
     * @type String
     */
    NOT_EXIST: "N",

    /**
     * 권한코드 - 조회
     *
     * @property READ
     * @type String
     */
    READ : "R",

    /**
     * 권한코드 - 저장
     *
     * @property SAVE
     * @type String
     */
    SAVE : "S",

    /**
     * 권한코드 - 결재
     *
     * @property APPROVAL
     * @type String
     */
    APPROVAL : "A",
    
    /**
     * 권한없음 - 결재
     *
     * @property UNAUTHORIZED
     * @type String
     */
    UNAUTHORIZED : "UNAUTHORIZED",
    
    /**
     * 유효하지 않은 상태
     */
    INVALID_STATUS_ERR : "INVALID_STATUS_ERR",
    
    /**
     * PR Item 진행상태 오류
     */
    PR_ITEM_STS_ERR : "PR_ITEM_STS_ERR",
    
    /**
     * PR 변경 오류
     */
    PR_MOD_ERR : "PR_MOD_ERR",
    
    /**
     * RFX 마감
     *
     */
    RFX_END : "RFX_END",
    
    /**
     * RFX 포기
     */
    RFX_REJECT : "RFX_REJECT",
    
    /**
     * 견적 제출
     */
    QTA_SUBMIT : "QTA_SUBMIT",
    
    /**
     * RFX 강제마감 오류
     */
    RFX_CLOSE_BYPASS_ERR : "RFX_CLOSE_BYPASS_ERR",
	
    /**
     * RFP 비가격평가 설정 미완료
     */
	RFP_NON_PRI_EVAL_SET_INCOMPELETED : "RFP_NON_PRI_EVAL_SET_INCOMPELETED",
	
    /**
     * RFP 평가자 미존재
     */
    RFP_NO_EVALUATOR : "RFP_NO_EVALUATOR",
    
    /**
     * RFx Price Factor 설정 미완료
     */
    RFX_PRI_FACT_SET_INCOMPELETED : "RFX_PRI_FACT_SET_INCOMPELETED",
    
    /**
     * RFP 평가 미완료
     */
    RFP_EVAL_INCOMPELETED : "RFP_EVAL_INCOMPELETED",
    
    /**
     * RFX 개찰시간 전
     */
    RFX_BEFORE_OPEN_TIME : "RFX_BEFORE_OPEN_TIME",
    
    /**
     * 역경매 금액 체크 오류
     */
    AUCTION_AMT_CHECK_ERR : "AUCTION_AMT_CHECK_ERR",
	
    /**
     * 검수/기성 중인 품목 존재
     */
    HAS_GR_ITEM : "HAS_GR_ITEM",
    
    /**
     * 검수/기성 요청 임시저장 품목 존재
     */
    HAS_TEMP_AR_ITEM : "HAS_TEMP_AR_ITEM",
    
    /**
     * 검수/기성 요청 품목 존재
     */
    HAS_AR_ITEM : "HAS_AR_ITEM",
    
    /**
     * 선급금 등록 존재
     */
    EXIST_PRE_PAY_REG : "EXIST_PRE_PAY_REG",
    
    /**
     * 선급금 등록 미완료
     */
    PRE_PAY_REG_INCOMPLETE : "PRE_PAY_REG_INCOMPLETE",
    
    /**
     * 기성요청 상태오류
     */
    VD_GR_PROG_STS_ERR :"VD_GR_PROG_STS_ERR",
    
    /**
     * 검수등록 수량 오류
     */
    GR_QTY_ERR : "GR_QTY_ERR",
    
    /**
     * 검수요청 수량 오류
     */
    AR_QTY_ERR : "AR_QTY_ERR",
    
    /**
     * 발주 상태오류
     */
    PO_STATE_ERR : "PO_STATE_ERR",
    
    /**
     * 발주변경중
     */
    PO_CHANGE_PROGRESS : "PO_CHANGE_PROGRESS",
    
    /**
     * 발주해지
     */
    PO_TERMINATE : "PO_TERMINATE",
    
    /**
     * 발주종료
     */
    PO_COMPLETE : "PO_COMPLETE",
    
    /**
     * 발주삭제
     */
    PO_DELETED : "PO_DELETED",
    
    /**
     * 계약삭제
     */
    PRC_CNTR_DELETED : "PRC_CNTR_DELETED",
    
    /**
     * 계약 상태오류
     */
    PRC_CNTR_STATE_ERR : "PRC_CNTR_STATE_ERR",
    
    /**
     * RFx 결재진행중
     */
    RFX_APRV_PROGRESS : "RFX_APRV_PROGRESS",
    
    /**
     * RFx 품목 복수업체 선정
     */
    RFX_ITEM_MULTI_SELECTED : "RFX_ITEM_MULTI_SELECTED",
	
    // 그리드의 dummy 컬럼명
    DUMMY: "_dummy_",

    // 그리드에서 사용하는 styles 정의
    styles: {
        /**
         * 편집가능 컬럼 스타일
         *
         * @property styles.editable
         * @type Object
         */
        editable: {
            id: "editable",
            editable: true,
            background: "#f1ffff"
        },

        /**
         * 편집불가능 컬럼 스타일
         *
         * @property styles.readonly
         * @type Object
         */
        readonly: {
            id: "readonly",
            editable: false,
            background: "#ffffff"
        },

        /**
         * action 컬럼 스타일
         *
         * @property styles.actionable
         * @type Object
         */
        actionable: {
            id: "actionable",
            fontBold: true,
            foreground: "#0e006f"
        },

        /**
         * Y/N으로 구분되는 컬럼의 format 스타일
         *
         * @property styles.formatYn
         * @type Object
         */
        formatYn: {
            booleanFormat: "Y:N",
            textAlignment: "center"
        },

        /**
         * 정수 숫자 컬럼의 format (콤마) 스타일
         *
         * @property styles.formatInteger
         * @type Object
         */
        formatInteger: {
            numberFormat: "#,000",
            textAlignment: "far"
        },

        /**
         * 소수점 숫자 컬럼의 format (콤마) 스타일
         *
         * @property styles.formatDecimal
         * @type Object
         */
        formatDecimal: {
            numberFormat: "#,000.00",
            textAlignment: "far"
        },

        /**
         * 날짜 format 스타일
         *
         * @property styles.formatDate
         * @type Object
         */
        formatDate: {
            datetimeFormat: "yyyy/MM/dd",
            textAlignment: "center"
        },

        /**
         * 날짜 시간 format 스타일
         *
         * @property styles.formatDatetime
         * @type Object
         */
        formatDatetime: {
            datetimeFormat: "yyyy/MM/dd HH:mm:ss",
            textAlignment: "center"
        },

        /**
         * Y/N으로 구분되는 checkbox 컬럼의 disabled 스타일
         *
         * @property styles.disabledCheckboxYn
         * @type Object
         */
        disabledCheckboxYn: {
            background: "#fafafa",
            figureBackground: "#cdcdcd",         // checked=true 일 때, 체크표시 색
            figureInactiveBackground: "#fafafa", // checked=false 일 때, 체크표시 색
            renderer: "disabledCheckboxYn"       // renderer.disabledCheckboxYn 의 id
        },

        /**
         * 데이터 저장을 위해 서버로 전송하는 포맷 스타일
         *
         * @property styles.outputFormat
         * @type Object
         */
        outputFormat: {
            datetimeFormat: "yyyyMMdd" // 그리드 달력
        },

        // 그리드의 icon 컬럼에 사용되는 icons 스타일 정의
        icons: {
            /**
             * icons 없음
             *
             * @property styles.icons.empty
             * @type Object
             */
            empty: {
                iconIndex: -1
            },

            /**
             * 검색 icon
             *
             * @property styles.icons.search
             * @type Object
             */
            search: {
                iconIndex: 0, // icons.images의 index
                iconLocation: "center"
            },

            /**
             * 링크 icon
             *
             * @property styles.icons.link
             * @type Object
             */
            link: {
                iconIndex: 1,  // icons.images의 index
                iconLocation: "center"
            },

            /**
             * 첨부파일 icon
             *
             * @property styles.icons.attach
             * @type Object
             */
            attach: {
                iconIndex: 2,  // icons.images의 index
                iconLocation: "right"
            },

            /**
             * 필수컬럼 icon
             *
             * @property styles.icons.required
             * @type Object
             */
            required: {
                iconIndex: 3,  // icons.images의 index
                iconLocation: "left",
                iconAlignment: "near",
                iconOffset: 0,
                iconPadding: 1,
                paddingTop: 0,
                paddingLeft: 0
            }
        }
    },

    // 그리드 renderer 정의
    renderer: {
        /**
         * Y/N으로 구분되는 checkbox 컬럼 renderer
         *
         * @property renderer.checkboxYn
         * @type Object
         */
        checkboxYn: {
            id: "checkboxYn",
            type: "check",
            shape: "box",
            editable: true,
            startEditOnClick: true,
            trueValues: "Y",
            falseValues: "N",
            labelPosition: "center"
        },

        /**
         * DEF.renderer.checkboxYn 의 disabled(editable=false) renderer
         *
         * @property renderer.disabledCheckboxYn
         * @type Object
         */
        disabledCheckboxYn: {
            id: "disabledCheckboxYn",
            type: "check",
            shape: "box",
            editable: false,
            trueValues: "Y",
            falseValues: "N",
            labelPosition: "center"
        }
    },

    /**
     * 그리드에서 사용하는 icons 정보 정의
     *
     * @property icons
     * @type Object
     */
    icons: {
        id: "icons",
        path: "../../../../../ui/assets/img/grid/",
        images: [
            "icon_search.png",
            "icon_link.png",
            "icon_attach.png",
            "icon_required.png"
        ]
    },

    // 그리드에서 사용하는 editor(편집) 정보 정의
    editor: {
        /**
         * 콤보박스 컬럼 editor
         *
         * @property editor.combobox
         * @type Object
         */
        combobox: {
            type: "dropdown",
            dropDownCount: 10,  // 속성에 표시될 목록의 수
            textReadOnly: true, // 키보드로 입력이 안되고 선택만 가능하게 된다
            domainOnly: true    // 목록에 있는 값들만 지정할 수 있는지의 여부, true시 목록 이외의 값은 지정할 수 없다.
        },

        /**
         * 정수 숫자 입력 컬럼 editor
         *
         * @property editor.integer
         * @type Object
         */
        integer: {
            type: "number",
            maxLength: 0,       // 입력할 수 있는 문자의 최대 개수. 0으로 지정하면 제한이 없다
            positiveOnly: true, // 양수값만 입력할 수 있다
            integerOnly: true   // 정수만 입력할 수 있다.
        },

        /**
         * 소수점 숫자 입력 컬럼 editor
         *
         * @property editor.decimal
         * @type Object
         */
        decimal: {
            type: "number",
            maxLength: 0 ,     // 입력할 수 있는 문자의 최대 개수. 0으로 지정하면 제한이 없다
            positiveOnly: true, // 양수값만 입력할 수 있다
            integerOnly: false  // 소수점값 입력할 수 있다.
        },

        /**
         * 금액 입력 컬럼 editor
         *
         * @property editor.amt
         * @type Object
         */
        amt: {
            type: "number",
            maxLength: 25,      // 입력할 수 있는 문자의 최대 개수. 0으로 지정하면 제한이 없다
            positiveOnly: true, // 양수값만 입력할 수 있다
            integerOnly: false, // 정수만 입력할 수 있다.
            textAlignment: "far",	// 오른쪽부터 입력
            editFormat: "#,##0.00" // 금액은 기본 소수점 두자리 
        },
        
        /**
         * 단가 입력 컬럼 editor
         *
         * @property editor.price
         * @type Object
         */
        price: {
            type: "number",
            maxLength: 18,      // 입력할 수 있는 문자의 최대 개수. 0으로 지정하면 제한이 없다
            positiveOnly: true, // 양수값만 입력할 수 있다
            integerOnly: false, // 정수만 입력할 수 있다.
            textAlignment: "far",	// 오른쪽부터 입력
            editFormat: "#,##0.00" 	// 금액은 기본 소수점 두자리 
        },        

        /**
         * 수량 입력 컬럼 editor
         *
         * @property editor.qty
         * @type Object
         */
        qty: {
            type: "number",
            maxLength: 9,      // 입력할 수 있는 문자의 최대 개수. 0으로 지정하면 제한이 없다
            positiveOnly: true, // 양수값만 입력할 수 있다
            integerOnly: false, // 정수만 입력할 수 있다.
            textAlignment: "far",	// 오른쪽부터 입력
            editFormat: "#,##0.000" // 수량은 기본 소수점 세자리 
        },        
        
        /**
         * 달력선택 컬럼 editor
         *
         * @property editor.datePicker
         * @type Object
         */
        datePicker: {
            type: "date",
            datetimeFormat: "yyyy/MM/dd",
            textReadOnly: true,  // 키보드를 이용해서 날짜를 입력할 수 없다.
            yearNavigation: true // 달력 팝업에 년도 이동버튼이 표시된다
        }
    }
};