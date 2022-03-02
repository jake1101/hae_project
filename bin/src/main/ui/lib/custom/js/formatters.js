//숫자관련 기본 포매터
var numberFormat = function(value,isRound) {
	//올림옵션 default round true
	var isRound = (typeof isRound === "boolean") ? isRound : true;
	if(isNaN(value) || SCUtil.isEmpty(value)) {
		return '';
	}
	if(isRound){
		return numeral(value).format(this.defaultFormat);
	}else{
		return numeral(value).format(this.defaultFormat,Math['floor']);
	}
};
//포매터 설정
var customFormatters = [{
    name : 'number',
    format : function(value) {
        return numberFormat.call(this, value);
    },
    defaultFormat : '0'
},{
    name : 'amt',
    format : function(value) {
    	//var bigNumber = new BigNumber(value || 0); //Uncaught Error: new BigNumber() number type has more than 15 significant digits
    	var bigNumber = new BigNumber((value) ? value.toString() : 0);
    	value = bigNumber.toFixed(2);
    	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    defaultFormat : '0,00.00'
}, {
    name : 'rate',
    format : function(value) {
    	return numberFormat.call(this, value);
    },
    defaultFormat : '0.00'
}, {
    name : 'qty',
    format : function(value) {
    	return numberFormat.call(this, value);
    },
    defaultFormat : '0,0.000'
},{
    name : 'score',
    format : function(value){
    	return numberFormat.call(this, value);
    },
    defalutFormat : '0'
},{
	name : 'scoreDecimal',
    format : function(value){
        return numberFormat.call(this, value);
    },
    defalutFormat : '0.0000'
},{
    name: 'decimal',
    format: function(value){
    	return numberFormat.call(this, value);
    },
    defaultFormat : '0,0.00'
},{
    name : 'locate',
    format : function(value) {
        return numberFormat.call(this, value);
    },
    defaultFormat : '0.000000'
},{
    name: 'percent',
    format: function(value){
    	var val = numberFormat.call(this, value);
    	val += val ? ' %' : ''
    	return val;
    },
    defaultFormat: '0'
},{
    name: 'percentDecimal',
    format: function(value){
    	var val = numberFormat.call(this, value);
    	val += val ? ' %' : ''
    	return val;
    },
    defaultFormat: '0,0.00'
},{
    name : 'integer',
    format : function(value) {
    	return numberFormat.call(this, value);
    },
    defaultFormat : '0,0'
},{
	name : 'date',
	format : function(value){
		return typeof value !== 'undefined' ? moment(value).format(this.defaultFormat) : "";
	},
	defaultFormat : 'YYYY/MM/DD'
},{
	name : 'datetime',
	format : function(value){
		return typeof value !== 'undefined' ? moment(value).format(this.defaultFormat) : "";
	},
	defaultFormat : 'YYYY/MM/DD HH:mm:ss'
},{
    name : 'usd_rate',
    format : function(value) {
    	return numberFormat.call(this, value);
    },
    defaultFormat : '0.0000'
},{
    name : 'KRW',
    format : function(value){
        return "₩"+numeral(value).format(this.defaultFormat);
    },
    defaultFormat : '0,0.00'
},{
    name : 'USD',
    format : function(value){
        return "$"+numeral(value).format(this.defaultFormat);
    },
    defaultFormat : '0,0.00'
},{
    name : 'AMD',
    format : function(value){
        return "€"+numeral(value).format(this.defaultFormat);
    },
    defaultFormat : '0,0.00'
},{
    name : 'CNY',
    format : function(value){
        return "¥"+numeral(value).format(this.defaultFormat);
    },
    defaultFormat : '0,0.00'
},{
    name : 'JPY',
    format : function(value){
        return "¥"+numeral(value).format(this.defaultFormat);
    },
    defaultFormat : '0,0.00'
},{
	name : 'hour',
	format : function(value){
		if(UT.isNumber(value) && value < 10) {
			return '0' + value;
		} else {
			return value;
		}
	}
}];
for(var i=0, item; item = customFormatters[i]; i++){
    SCFormatter.factory(item);
}
