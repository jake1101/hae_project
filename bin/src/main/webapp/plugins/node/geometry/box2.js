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

    SceneJS.Types.addType("geometry/box2", {

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

        
        // Otherwise, create a new geometry
        return {
            type:"geometry",
            primitive:params.wire ? "lines" : "triangles",
            positions:new Float32Array([
                x, -0.05, z, -x, -0.05, z, -x, -y, z, x, -y, z, // v0-v1-v2-v3 front
                x, -0.05, z, x, -y, z, x, -y, -z, x, -0.05, -z, // v0-v3-v4-v5 right
                x, -0.05, z, x, -0.05, -z, -x, -0.05, -z, -x, -0.05, z, // v0-v5-v6-v1 top
                -x, -0.05, z, -x, -0.05, -z, -x, -y, -z, -x, -y, z, // v1-v6-v7-v2 left
                -x, -y, -z, x, -y, -z, x, -y, z, -x, -y, z, // v7-v4-v3-v2 bottom
                x, -y, -z, -x, -y, -z, -x, -0.05, -z, x, -0.05, -z // v4-v7-v6-v5 back


                ,x, y, z, -x, y, z, -x, 0.05, z, x, 0.05, z, // v0-v1-v2-v3 front
                x, y, z, x, 0.05, z, x, 0.05, -z, x, y, -z, // v0-v3-v4-v5 right
                x, y, z, x, y, -z, -x, y, -z, -x, y, z, // v0-v5-v6-v1 top
                -x, y, z, -x, y, -z, -x, 0.05, -z, -x, 0.05, z, // v1-v6-v7-v2 left
                -x, 0.05, -z, x, 0.05, -z, x, 0.05, z, -x, 0.05, z, // v7-v4-v3-v2 bottom
                x, 0.05, -z, -x, 0.05, -z, -x, y, -z, x, y, -z // v4-v7-v6-v5 back




            ]),
            normals:new Float32Array([
                0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, // v0-v1-v2-v3 front
                1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, // v0-v3-v4-v5 right
                0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, // v0-v5-v6-v1 top
                -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, // v1-v6-v7-v2 left
                0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, // v7-v4-v3-v2 bottom
                0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1     // v4-v7-v6-v5 back


                ,0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, // v0-v1-v2-v3 front
                1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, // v0-v3-v4-v5 right
                0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, // v0-v5-v6-v1 top
                -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, // v1-v6-v7-v2 left
                0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, // v7-v4-v3-v2 bottom
                0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1     // v4-v7-v6-v5 back

                
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
                4, 5, 6, 4, 6, 7, // right
                8, 9, 10, 8, 10, 11, // top
                12, 13, 14, 12, 14, 15, // left
                16, 17, 18, 16, 18, 19, // bottom
                20, 21, 22, 20, 22, 23   // back

                ,24+0, 24+1, 24+2, 24+0, 24+2, 24+3, // front
                24+4, 24+5, 24+6, 24+4, 24+6, 24+7, // right
                24+8, 24+9, 24+10, 24+8, 24+10, 24+11, // top
                24+12, 24+13, 24+14, 24+12, 24+14, 24+15, // left
                24+16, 24+17, 24+18,24+16, 24+18, 24+19, // bottom
                24+20, 24+21, 24+22, 24+20, 24+22, 24+23   // back
                
                
            ]
        };
    }
})();