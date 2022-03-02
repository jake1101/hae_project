/**
 * Box geometry node type
 *
 * @author xeolabs / http://xeolabs.com
 *
 * <p>Usage example:</p>
 *
 * <pre>
 * someNode.addNode({
 *      type: "geometry/box",
 *      xSize: 10,
 *      ySize: 20,
 *      zSize: 1.5,
 *      wire: false // Default
 *  });
 *  </pre>
 */
(function () {

    SceneJS.Types.addType("geometry/boxclipQ", {

        construct:function (params) {
            this.addNode(build.call(this, params));
        }
    });

    function build(params) {

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

        var coreId = "geometry/boxclipQ_" + x + "_" + y + "_" + z + (params.wire ? "wire" : "_solid");

        // If a node core already exists for a prim with the given properties,
        // then for efficiency we'll share that core rather than create another geometry
        if (this.getScene().hasCore("geometry", coreId)) {
            return {
                type:"geometry",
                coreId:coreId
            };
        }

        // Otherwise, create a new geometry
        return {
            type:"geometry",
            primitive:params.wire ? "lines" : "triangles",
            coreId:coreId,
            positions:new Float32Array([
                x, y*0.2, z, -x, y*0.2, z, -x, -y, z, x, -y, z, // v0-v1-v2-v3 front                0 1 2 3
                x, y*0.2, z, x, -y, z, x, -y, -z, x, y, -z, x, y, z*0.2, // v0-v3-v4-v5 right         4 5 6 7 8 
                x, y, z*0.2, x, y, -z, -x, y, -z, -x, y, z*0.2, // v0-v5-v6-v1 top                  9 10 11 12
                -x, y*0.2, z, -x, y, -z, -x, -y, -z, -x, -y, z, -x, y, z*0.2, // v1-v6-v7-v2 left     13 14 15 16 17
                -x, -y, -z, x, -y, -z, x, -y, z, -x, -y, z, // v7-v4-v3-v2 bottom                   18 19 20 21
                x, -y, -z, -x, -y, -z, -x, y, -z, x, y, -z, // v4-v7-v6-v5 back                     22 23 24 25

                 x, y*0.2, z, -x, y*0.2, z,x, y, z*0.2, -x, y, z*0.2  // front top       //                26 27 28 29
            ]),
            
            
            normals:new Float32Array([
                0, 0, 1, 0, 0, 1 , 0, 0, 1, 0, 0, 1, // v0-v1-v2-v3 front
                1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0 ,1,0,0, // v0-v3-v4-v5 right
                0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, // v0-v5-v6-v1 top
                -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0 ,-1,0,0, // v1-v6-v7-v2 left
                0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, // v7-v4-v3-v2 bottom
                0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1     // v4-v7-v6-v5 back
                
                ,0,1,1 ,0,1,1 ,0,1,1 ,0,1,1 // front top

            ]),
            uv:new Float32Array([
                x, y, 0, y, 0, 0, x, 0, // v0-v1-v2-v3 front
                0, y, 0, 0, x, 0, x, y, // v0-v3-v4-v5 right
                x, 0, x, y, 0, y, 0, 0, // v0-v5-v6-v1 top
                x, y, 0, y, 0, 0, x, 0, // v1-v6-v7-v2 left
                0, 0, x, 0, x, y, 0, y, // v7-v4-v3-v2 bottom
                0, 0, x, 0, x, y, 0, y    // v4-v7-v6-v5 back
            ]),
            indices:[
                0, 1, 2, 0, 2, 3, // front
                4, 5, 6, 4, 6, 7, 4,7,8, // right
                9, 10, 11, 9, 11, 12, // top
                17,16,14,14,15,16,13,17,16, // left
                18, 19, 20, 18, 20, 21, // bottom
                22, 23, 24, 22, 24, 25,   // back
                26,27,29  ,26,28,29 // front top
            ],
        };
    }
})();