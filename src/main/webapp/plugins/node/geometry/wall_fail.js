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

    SceneJS.Types.addType("geometry/wall_fail", {

        construct:function (params) {
            this.addNode(build.call(this, params));
        }
    });

    function build(params) {

        var positionArr = params.position || [0,0,1,1];
        var posx = [];
        var posz = [];
        
        var initVector =[]; // 주어진 두점을 시점,종점으로 하는 벡터(단위길이 처리함.)
        var normalVector =[]; // initVector 에 대해 xz축 상에서 수직인 벡터(단위길이 처리함.) 반시계방향 90도

        
        // positionArr 이 홀수개의 배열이라면, 짝수개로 만들어줘야 한다.( x1, z1 ,x2, z2, x3, z3 , ...)
        if(positionArr.length%2!=0) {
            positionArr = positionArr.slice(0,positionArr.length-1);
        }


        // positionArr = [x1, z1,  x2,z2 , x3,z3 ,...] 에서  
        // posx = [x1, x2, x3, ...]
        // posz = [z1, z2, z3, ...] 
        // 배열 두 개에 x좌표와 z좌표끼리 나눠 담는다.
        // 이 후 k번 째 점은 (posx[k],posx[k])가 된다.
        for(var i =0; i<positionArr.length;i+=2){
            posx.push(positionArr[i]);
            posz.push(positionArr[i+1]);
        }


        // 벽의 가장 하단 좌표 : minHieght  , 벽의 가장 상단 좌표 : maxHeight
        var minHeight = params.minHeight || 0;
        var maxHeight = params.maxHeight || 1;



        // 주어진 점 두개를 이용하여 두 점을 이어
        // 두께가 0.1인, 높이가 maxHeight- minHeight 인 벽 모양의 object 를 만들 예정.
        var pointNum = posx.length; // 점 개수.
        var objectNum = pointNum -1 ; // 필요한 벽면의 갯수.
        for(var i =0; i< objectNum; i++){
            createWall(posx[i],posz[i],posx[i+1],posz[i+1],minHeight,maxHeight);
        }









        // 주어진 점 두개를 양끝으로 하는 직선 방정식 구하기  (0<=t<=1) 
        // param : point1_x, point1_z , point2_x, point2_z   
        // t=0 일 때, 시점(point1)을 지나고, t=1 일 때, 종점(point2)를 지나는 직선.
        function getInitLinearEquation(point1_x,point1_z,  point2_x, point2_z,t){

            
            
            var norm = Math.sqrt((point2_x- point1_x)*(point2_x- point1_x) + (point2_z -point1_z)*(point2_z -point1_z));

            initVector = [(point2_x- point1_x)/norm,(point2_z -point1_z)/norm];
            initVector = [Math.round(initVector[0]*1000)/1000 , Math.round(initVector[1]*1000)/1000];
            
            normalVector = [(point2_z -point1_z)/norm,-(point2_x- point1_x)/norm];
            normalVector = [Math.round(normalVector[0]*1000)/1000 , Math.round(normalVector[1]*1000)/1000];

            return [(point2_x- point1_x)*t + point1_x , (point2_z -point1_z)*t + point1_z];
        }

        
        // 점과 거리를 대입하여, 주어진 점에서 부터 normalVector 의 방향으로 거리만큼 떨어진 점을 구해내기. 
        // (벽의 두께로써,t=0.05 값으로 쓰일 예정)
        function getNormalLinearEquation(point_x, point_z,t){
            return [normalVector[0]*t + point_x, normalVector[1]*t+ point_z];
        }






        // Otherwise, create a new geometry
        return {
            type:"geometry",
            primitive:params.wire ? "lines" : "triangles",
            coreId:coreId,
            positions:new Float32Array([
                x, y, z, -x, y, z, -x, -y, z, x, -y, z, // v0-v1-v2-v3 front
                x, y, z, x, -y, z, x, -y, -z, x, y, -z, // v0-v3-v4-v5 right
                x, y, z, x, y, -z, -x, y, -z, -x, y, z, // v0-v5-v6-v1 top
                -x, y, z, -x, y, -z, -x, -y, -z, -x, -y, z, // v1-v6-v7-v2 left
                -x, -y, -z, x, -y, -z, x, -y, z, -x, -y, z, // v7-v4-v3-v2 bottom
                x, -y, -z, -x, -y, -z, -x, y, -z, x, y, -z // v4-v7-v6-v5 back
            ]),
            normals:new Float32Array([
                0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, // v0-v1-v2-v3 front
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
            ]
        };
    }
})();







        