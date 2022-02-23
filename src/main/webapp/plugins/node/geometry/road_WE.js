/**
 A cloud of randomly-scattered boxes

 @author xeolabs / http://xeolabs.com

 <p>Usage example:</p>

 <pre>
 someNode.addNode({
       type: "geometry/randomObjects",
       numBoxes: 1000 // (default)
   });
 </pre>
 */


SceneJS.Types.addType("geometry/road_WE", {

    construct: function (params) {

        var x, y, z;
        if (params.size) {
            x = params.size[0];
            y = params.size[1];
            z = params.size[2];
        } else {
            // Deprecated
            x = params.xSize || 1;
            y = params.ySize || 1;
            z = params.zSize || 1;
        }

        var node ;
        

        node = this.addNode({
            type: "scale",
            x: 1/2,
            y: 0.02/2,
            z: 0.7/2  
        });


        node= node.addNode({
            type:"material",
            color:{r:0.1,g:0.1,b:0.1},
            alpha:0.7
        })


        // Geometry
        node.addNode({
            type: "geometry/box",
            coreId: "box"
        });
        
    }
});
