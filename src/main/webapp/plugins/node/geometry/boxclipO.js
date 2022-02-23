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

    SceneJS.Types.addType("geometry/boxclipO", {

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

        var coreId = "geometry/boxclipO_" + x + "_" + y + "_" + z + (params.wire ? "wire" : "_solid");

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
                x*0.2, y, z,   x, y*0.2, z,   x, -y, z,   -x, -y, z,   -x, y, z, // v0 v1 v3 v4 v5 front   0 1 2 3 4
                x, y*0.2, z,   x, y, z*0.2,   x, -y, z,   x, -y, -z,   x, y, -z, // 1,2,3,6,7 right       5 6 7 8 9
                x*0.2, y, z,   x, y, z*0.2,   -x, y, z,   x, y, -z,   -x, y, -z, // 0,2,5,7,8 top          10 11 12 13 14 
                -x, y, z,     -x, y, -z,   -x, -y, -z,   -x, -y, z,             // v5,v8,v9,v4 left                    15 16 17 18 
                -x, -y, -z,    x, -y, -z,   x, -y, z,    -x, -y, z,            // v9,v6,v3,v4 bottom                  19 20 21 22
                x, -y, -z,    -x, -y, -z,   -x, y, -z,   x, y, -z,             // v6,v9,v8,v7 back                     23 24 25 26

                x*0.2, y, z,   x, y*0.2, z,   x, y, z*0.2                     // v0 v1 v2   front-right-top          27 28 29 

            ]),
            normals:new Float32Array([
                0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, // v0 v1 v3 v4 v5 front   0 1 2 3 4
                1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, // 1,2,3,6,7 right       5 6 7 8 9
                0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, // 0,2,5,7,8 top          10 11 12 13 14 
                -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, // v5,v8,v9,v4 left                    15 16 17 18 
                0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, // v9,v6,v3,v4 bottom                  19 20 21 22
                0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,     // v6,v9,v8,v7 back                     23 24 25 26
                1, 1, 1 , 1, 1, 1, 1, 1, 1                  // v0 v1 v2   front-right-top          27 28 29 

            ]),
            uv:new Float32Array([
                // -500,-500,-500,-500,-500,-500,-500,-500,
                // -500,-500,-500,-500,-500,-500,-500,-500,
                // -500,-500,-500,-500,-500,-500,-500,-500,
                // -500,-500,-500,-500,-500,-500,-500,-500,
                // -500,-500,-500,-500,-500,-500,-500,-500,
                
                x, y, 0, y, 0, 0, x, 0, // v0-v1-v2-v3 front
                0, y, 0, 0, x, 0, x, y, // v0-v3-v4-v5 right
                x, 0, x, y, 0, y, 0, 0, // v0-v5-v6-v1 top
                x, y, 0, y, 0, 0, x, 0, // v1-v6-v7-v2 left
                0, 0, x, 0, x, y, 0, y, // v7-v4-v3-v2 bottom
                0, 0, x, 0, x, y, 0, y    // v4-v7-v6-v5 back
            ]),
            indices:[
                0,3,4, 0,3,1, 1,2,3, // front
                5,6,9, 5,8,9, 5,7,8, // right
                10,12,14, 10,11,14, 11,13,14, // top
                15,17,18, 15,17,16, // left
                19,21,22, 19,21,20, // bottom
                23,25,24, 23,25,26,   // back
                
                27,28,29           // front-right-top
            ],
        };
    }
})();