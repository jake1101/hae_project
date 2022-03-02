/**
 * Plane geometry node type
 *
 * @author xeolabs / http://xeolabs.com
 *
 * <p>Usage example:</p>
 *
 * <pre>
 * someNode.addNode({
 *      type: "geometry/plane",
 *      width: 10,
 *      height: 20,
 *      wire: false // Default
 *  });
 *  </pre>
 */
(function () {
    
    SceneJS.Types.addType("geometry/wall", {
        
        construct:function (params) {
            this.addNode(build.call(this, params));
        }
    });
    
    function build(params) {
        
        
        var positionsArr = params.positionsArr ;
        var posx = [];
        var posz = [];
        
        
        // positionsArr 이 홀수개의 배열이라면, 짝수개로 만들어줘야 한다.( x1, z1 ,x2, z2, x3, z3 , ...)
        if(positionsArr.length%2!=0) {
            positionsArr = positionsArr.slice(0,positionsArr.length-1);
        }
        

        // positionsArr = [x1, z1,  x2,z2 , x3,z3 ,...] 에서  
        // posx = [x1, x2, x3, ...]
        // posz = [z1, z2, z3, ...] 
        // 배열 두 개에 x좌표와 z좌표끼리 나눠 담는다.
        // 이 후 k번 째 점은 (posx[k],posx[k])가 된다.
        for(var i =0; i<positionsArr.length;i+=2){
            posx.push(positionsArr[i]);
            posz.push(positionsArr[i+1]);
        }
        
        
        // 벽의 가장 하단 좌표 : minHieght  , 벽의 가장 상단 좌표 : maxHeight
        var minHeight = params.minHeight || 0;
        var maxHeight = params.maxHeight || 1;
        
        
        var count = 0;
        var positions = [];
        var normals =[];
        var uvs = [];
        var indices = [];

        // 주어진 점 두개를 이용하여 두 점을 이어
        // 두께가 0.1인, 높이가 maxHeight- minHeight 인 벽 모양의 object 를 만들 예정.
        var pointNum = posx.length; // 점 개수.
        var objectNum = pointNum -1 ; // 필요한 벽면의 갯수.
        for(var i =0; i< objectNum; i++){
            createWall(posx[i],posz[i],posx[i+1],posz[i+1],minHeight,maxHeight);
        }


        
        
        
        function createWall(point1_x, point1_z, point2_x, point2_z, minHeight, maxHeight){
            // 시점 하단 0
            positions.push(point1_x);
            positions.push(minHeight);
            positions.push(point1_z);
            // 종점 하단 1
            positions.push(point2_x);
            positions.push(minHeight);
            positions.push(point2_z);
            // 시점 상단 2
            positions.push(point1_x);
            positions.push(maxHeight);
            positions.push(point1_z);
            // 종점 상단 3
            positions.push(point2_x);
            positions.push(maxHeight);
            positions.push(point2_z);
            
            var norm = Math.sqrt((point2_x- point1_x)*(point2_x- point1_x) + (point2_z -point1_z)*(point2_z -point1_z));
            var normalVector = [-(point2_z -point1_z)/norm,(point2_x- point1_x)/norm];
            normalVector = [Math.round(normalVector[0]*1000)/1000 , Math.round(normalVector[1]*1000)/1000];

            normals.push(-normalVector[0]);
            normals.push(0);
            normals.push(-normalVector[1]);

            normals.push(-normalVector[0]);
            normals.push(0);
            normals.push(-normalVector[1]);

            normals.push(-normalVector[0]);
            normals.push(0);
            normals.push(-normalVector[1]);

            normals.push(-normalVector[0]);
            normals.push(0);
            normals.push(-normalVector[1]);

            uvs.push(1);
            uvs.push(1);

            uvs.push(0);
            uvs.push(1);

            uvs.push(1);
            uvs.push(0);
            
            uvs.push(0);
            uvs.push(0);
            
            indices.push(count*4+0);
            indices.push(count*4+1);
            indices.push(count*4+2);

            indices.push(count*4+1);
            indices.push(count*4+2);
            indices.push(count*4+3);
            
            count++;
        }




        return {
            type: "geometry",
            primitive:params.wire ? "lines" : "triangles",
            positions:new Float32Array(positions),
            normals:new Float32Array(normals),
            uv:new Float32Array(uvs),
            indices:indices
        };
    }
})();
