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
 *      y: 20,
 *      wire: false // Default
 *  });
 *  </pre>
 */
(function () {
    
    SceneJS.Types.addType("geometry/floor", {
        
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
        
        
       var yarray = params.yarray;
        
        
        var count = 0;
        var positions = [];
        var normals =[];
        var uvs = [];
        var indices = [];

        
        var pointNum = posx.length; // 점 개수.
        var objectNum = pointNum -1 ; // 필요한 바닥면의 갯수
        var floorNum = yarray.length;
        if(pointNum>=6){
        	for(var k = 0; k<floorNum; k++){
        		for(var i =1; i< objectNum-1; i++){
        			createFloor(posx[0],posz[0],posx[i],posz[i],posx[i+1],posz[i+1],yarray[k]+0.05);
        		}
        	}
        }else{
        	for(var k = 0; k<floorNum; k++){
        		for(var i =0; i< objectNum-1; i+=2){
        			createFloor(posx[i],posz[i],posx[i+1],posz[i+1],posx[i+2],posz[i+2],yarray[k]+0.05,i%4==0);
        		}
        	}
        }

        
        
        
        function createFloor(initpoint_x,initpoint_z,point1_x, point1_z, point2_x, point2_z, y,bool){
            

            

            // 시작점.
            positions.push(initpoint_x);
            positions.push(y);
            positions.push(initpoint_z);
            // i번째점.
            positions.push(point1_x);
            positions.push(y);
            positions.push(point1_z);
            // i+1 번째점.
            positions.push(point2_x);
            positions.push(y);
            positions.push(point2_z);
    
            normals.push(0);
            normals.push(1);
            normals.push(0);

            normals.push(0);
            normals.push(1);
            normals.push(0);

            normals.push(0);
            normals.push(1);
            normals.push(0);

    
            
            if(bool){
            	uvs.push(0);
            	uvs.push(1);
            	uvs.push(1);
            	uvs.push(1);
            	uvs.push(1);
            	uvs.push(0);
            }else{
            	uvs.push(1);
            	uvs.push(0);
            	uvs.push(0);
            	uvs.push(0);
            	uvs.push(0);
            	uvs.push(1);
            }

            
          


            indices.push(count*3+0);
            indices.push(count*3+1);
            indices.push(count*3+2);

      
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
