function ColorPic(target, targetColor, anchor, placement){
	if(placement == undefined ){
		placement = "bottom";
	}
	var colorPicker = new ColorPicker.Default(target+' > div > input', {
		color : targetColor,
		hexOnly: true,
		placement:placement,
    	format : 'hex',
    	anchor : {hidden : false, cssProperty: 'color'},
    	history : {hidden: true}
	});
	
	$(anchor).css('background-color', colorPicker.getColor()); 

	$(anchor).click(function(){
		$(target+' > div > input').trigger('focus');
		return false;
	});
	
	var anchor = $(anchor+' >div');
	
	colorPicker.on('change', function() {
		anchor.css('background-color', this.getColor());
    });
	
	return colorPicker;
}
