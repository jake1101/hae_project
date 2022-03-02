/**
 * WaveFront OBJ mesh importer
 *
 * @author xeolabs / http://xeolabs.com
 *
 * Uses the K3D library to parse OBJ
 * © 2012 Ivan Kuckir
 * http://k3d.ivank.net/
 *
 */
require([

    // This prefix routes to the 3rd-party libs directory containing resources used by plugins
    "scenejsPluginDeps/k3d"
],
    function () {

        SceneJS.Types.addType("import/obj", {

            construct:function (params) {

                if (!params.src) {
                    this.log("error", "Attribute expected: src");
                }

                // Notify SceneJS so it can support loading/busy indicators etc
                

                var self = this;

                var coreId = params.src;
                if (this.getScene().hasCore("geometry", coreId)) {
                    self.addNode({
                        type:"geometry",
                        coreId:coreId
                    });
                    return;
                }
                self._taskId = self.taskStarted("Loading .OBJ " + params.src);
                
                // load 안하고, preload 되있는 결과물로 만들어내기.
                if(params.src =="http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/obj/cargo.obj"){
                	 var pre_data = predata_cargo;
                	 addPreNode(pre_data);
                	 //makeNode(pre_data,params.src);
                }else if(params.src =="http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/obj/ship_handrail1.obj"){
                	var pre_data = predata_handrail1;
                	//makeNode(pre_data,params.src);
                	addPreNode(pre_data);
		        }else if(params.src =="http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/obj/ship_left.obj"){
		        	var pre_data = predata_ship_left;
		        	//makeNode(pre_data,params.src);
		        	addPreNode(pre_data);
		        }else if(params.src =="http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/obj/assethole.obj"){
		        	var pre_data = predata_assethole;
		        	//makeNode(pre_data,params.src);
		        	addPreNode(pre_data);
		        }else if(params.src =="http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/obj/05_engine.obj"){
		        	var pre_data = predata_05_engine;
		        	//makeNode(pre_data,params.src);
		        	addPreNode(pre_data);
		        }else if(params.src =="http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/obj/ship_etc.obj"){
		        	var pre_data = predata_ship_etc;
		        	//makeNode(pre_data,params.src);
		        	addPreNode(pre_data);
		        }else if(params.src =="http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/obj/accom.obj"){
		        	var pre_data = predata_accom;
		        	//makeNode(pre_data,params.src);
		        	addPreNode(pre_data);
		        }else if(params.src =="http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/obj/ship_handrail2.obj"){
		        	var pre_data = predata_handrail2;
		        	//makeNode(pre_data,params.src);
		        	addPreNode(pre_data);
		        }else if(params.src =="http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/obj/ship_right.obj"){
		        	var pre_data = predata_ship_right;
		        	//makeNode(pre_data,params.src);
		        	addPreNode(pre_data);
		        }else if(params.src =="http://"+window.location.hostname+":"+window.location.port+"/ui/lib/scene/models/obj/ship_life_boat.obj"){
		        	var pre_data = predata_ship_life_boat;
		        	//makeNode(pre_data,params.src);
		        	addPreNode(pre_data);
		        }
                else{
                	load(params.src,
                			makeNode,
                	
                	function (err) {
                		self.log("error", "Failed to load file: " + err);
                		self._taskId = self.taskFailed(self._taskId);
                	});
                	
                }
                
                
                function makeNode(data,src) {
            		
            		var m = K3D.parse.fromOBJ(data);	// done !
            		
            		// unwrap simply duplicates some values, so they can be indexed with indices [0,1,2,3 ... ]
            		// In some rendering engines, you can have only one index value for vertices, UVs, normals ...,
            		// so "unwrapping" is a simple solution.
            		
            		var positions = K3D.edit.unwrap(m.i_verts, m.c_verts, 3);
            		var normals = K3D.edit.unwrap(m.i_norms, m.c_norms, 3);
            		var uv = K3D.edit.unwrap(m.i_uvt, m.c_uvt, 2);
            		
            		var indices = [];
            		for (var i = 0; i < m.i_verts.length; i++) {
            			indices.push(i);
            		}
            		
            		// Need to flip the UV coordinates on Y-axis for SceneJS geometry
            		for (var i = 1, len = uv.length; i < len; i += 2) {
            			uv[i] *= -1.0;
            		}
            		self.addNode({
            			type:"geometry",
            			coreId : src,
            			primitive:"triangles",
            			positions:positions,
            			uv:uv.length > 0 ? uv : undefined,
            					normals:normals.length > 0 ? normals : undefined,
            							indices:indices
            		});
            		
            		self._taskId = self.taskFinished(self._taskId);
            	};
            	function addPreNode(pre_data){
            		
            		self.addNode(pre_data);
            		self._taskId = self.taskFinished(self._taskId);
            	}
                
                

            },

            destruct:function () {
                this._taskId = this.taskFinished(this._taskId);
            }
        });


        function load(url, ok, error) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "arraybuffer";
//            xhr.addEventListener('progress',
//                function (event) {
//                    // TODO: Update the task? { type:'progress', loaded:event.loaded, total:event.total }
//                }, false);
            xhr.addEventListener('load',
                function (event) {
                    if (event.target.response) {
                        ok(event.target.response);
                    } else {
                        error('Invalid file [' + url + ']');
                    }
                }, false);
            xhr.addEventListener('error',
                function () {
                    error('Couldn\'t load URL [' + url + ']');
                }, false);
            xhr.open('GET', url, true);
            xhr.send(null);
        }
        
        

    })();