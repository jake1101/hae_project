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


SceneJS.Types.addType("geometry/road_NSW", {

    construct: function (params) {


        var node ;
        

        
        
        node= this.addNode({
            type:"material",
            color:{r:0.1,g:0.1,b:0.1},
            alpha:0.7,
            nodes:[
                {
                    type: "scale",
                    x: 0.7/2,
                    y: 0.02/2,
                    z: 1/2,
                    nodes : [
                        {
                            type: "geometry/box",
                            coreId: "box"
                        }
                    ]
                },
                {
                    type:"translate",
                    x:-0.075,
                    
                    nodes : [
                        {
                            type: "scale",
                            x: 0.85/2,
                            y: 0.02/2,
                            z: 0.7/2,
                            nodes:[
                                {
                                    type: "geometry/box",
                                    coreId: "box"
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        

    }
});
