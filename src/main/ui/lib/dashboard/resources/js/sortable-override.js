


Sortable.prototype.$_onDragOver = Sortable.prototype._onDragOver;
Sortable.prototype._onDragOver = function(evt){
    var me = this,
    	options = me.options,
    	sort = options.sort;

    me.onDragOverBefore && me.onDragOverBefore(evt);
    me.$_onDragOver(evt);
    me.onDragOverAfter && me.onDragOverAfter(evt);
};

Sortable.prototype.$_onDrop = Sortable.prototype._onDrop;
Sortable.prototype._onDrop = function(evt){
    var me = this,
    	options = me.options,
    	sort = options.sort;
    
    me.onDropBefore && me.onDropBefore(evt);
    me.$_onDrop(evt);
    me.onDropAfter && me.onDropAfter(evt);
};

