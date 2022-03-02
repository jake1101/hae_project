"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if(typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

var threeJsCommonFunc = {};

threeJsCommonFunc.onSearch = function() {
    var me = this;
    me.set("searchCondition.areaId", me.searchParam.areaId);
    UT.request(me.$.findGridPositionList);

    if(me.player) {
        if(UT.isNotEmpty(me.player.getScene().getObjectByName("workerGroup"))) {
            var workerList = me.player.getScene().getObjectByName("workerGroup").children;

            for(var i = 0; i < workerList.length; i++) {
                var len = workerList[i].children.length;

                for(var k = len - 1; k >= 0; k--) {
                    workerList[i].remove(workerList[i].children[k]);
                }
            }
        }
        me.player.getScene().remove(me.player.getScene().getObjectByName("workerGroup"));
    }
};

threeJsCommonFunc.completefindGridPositionList = function(e, res) {
    var me = this;
    var resultInfo = res.response;

    var callbackFunc = function callbackFunc() {
        //긴급신호 온 곳으로 시점이동
        var item = me.emergencyInfo;

        if(UT.isNotEmpty(item)) {
            var count = 0;
            var interval = setInterval(function() {
                count++;

                if(count > 10) {
                    clearInterval(interval);
                }

                if(me.player.getScene().getObjectByName("workerGroup") &&
                    me.player.getScene().getObjectByName("workerGroup").children.some(function(param) {
                        return param.children.some(function(param2) {
                            return param2.element != undefined;
                        });
                    })
                ) {
                    me.player.changeLabelColorGroup(item.positionId, "rgba(192,0,0, 0.8)");
                    var xPos = 0;
                    var yPos = 0;
                    var zPos = 0;

                    for(var j = 0; j < resultInfo.positions.length; j++) {
                        if(resultInfo.positions[j].positionId == item.positionId) {
                            xPos = resultInfo.positions[j].x;
                            yPos = resultInfo.positions[j].y;
                            zPos = resultInfo.positions[j].z;
                            break;
                        }
                    }

                    me.player.setCameraPosition(me.player.getCamera().position.x + (Number(xPos) - me.player.getControls().target.x), me.player.getCamera().position.y + (Number(yPos) - me.player.getControls().target.y), me.player.getCamera().position.z + (Number(zPos) - me.player.getControls().target.z));
                    me.player.setControlsTarget(Number(xPos), Number(yPos), Number(zPos));
                    clearInterval(interval);
                }
            }, 300);
        }
    };

    if(UT.isNotEmpty(resultInfo)) {
        me.set("gridWorkerList", resultInfo.gridData.workerList ? resultInfo.gridData.workerList : []); //최근 긴급신호로 시점이동하기위한 emergencyInfo에 positionId 세팅

        var positionId;

        if(me.get("gridWorkerList").filter(function(w) {
                return w.emergency == 1;
            }).length == 0) {
            positionId = null;
        } else {
            positionId = me.get("gridWorkerList").filter(function(w) {
                return w.emergency == 1;
            })[0].positionId;
        }

        me.set("emergencyInfo", {
            positionId: positionId
        });
        me.set("positionInfoList", resultInfo.positions ? resultInfo.positions : []);

        if(me.player && resultInfo.positions && resultInfo.positions.length > 0) {
            me.createSensorModel(resultInfo.positions, "worker", callbackFunc);
        }
    }
};

threeJsCommonFunc.initMouseEvent = function() {
    var me = this;
    
    me.$.ship_canvas.addEventListener('mouseup', function(e) {
        var mouse = {};
        mouse.x = (e.clientX - $("#ship_canvas").offset().left) / me.player.dom.clientWidth * 2 - 1;
        mouse.y = -((e.clientY - $("#ship_canvas").offset().top) / me.player.dom.clientHeight * 2 - 1);
        me.player.getRayCaster().setFromCamera(mouse, me.player.getCamera());

        //if(!UT.isEmpty(me.player.getScene().getObjectByName("workerGroup"))) {
            var intersects = me.player.getRayCaster().intersectObjects(me.player.getScene().getObjectByName("workerGroup").children, true);
            var position;

            if(intersects.length > 0) {
                position = intersects[0].object.parent;
            }
        //}
    }, false);
};

function getTooltipList(me, id){
	var div = me.$.listTooltip;
	div.hidden = false;

	div.addEventListener("wheel", function(event){
		event.stopPropagation();
	})
	
	var tooltip = me.$.tooltip;
	tooltip.innerHTML = '';	// 초기화
	
	me.$.tooltipClose.data = 'countTooltip_'+id;

	var list = me.$.gridWorkerPanel.getDataProvider().filterItems({positionId:id});
	
	for(var i in list){
		var item = list[i];
		
		var li = document.createElement("li");
		if(item.emergency == "1") li.className = 'emergency';
		li.innerHTML = item.vendorName +" [" + item.targetJobName + "] "+item.targetName;
		li.data = item.sensorId;
		
		li.onclick = function(e){
			$(e.target.parentElement).find('li.selected').removeClass('selected');
			e.target.classList.add('selected');
			me.$.gridWorkerPanel.searchItem("sensorId", e.target.data, 0);
			e.stopPropagation();
		}
		
		tooltip.appendChild(li);
	}
	
	return div;
}

threeJsCommonFunc.spanClick = function(e) {
    var me = this;
    var grid = me.$.gridWorkerPanel;
    var item = JSON.parse(e.currentTarget.getAttribute("data-item"));
    grid.searchItem("sensorId", item.sensorId, 0);
    $(".spanCls").css("color", "black");
    $(".spanCls").css("background", "rgba(234, 245, 253, 0.7)");
    $("#" + e.currentTarget.id).css("background", "#385a8c");
    $("#" + e.currentTarget.id).css("color", "white");
    var value = item.positionId;
    var workerId = item.targetId;

    for(var i = 0; i < me.positionInfoList.length; i++) {
        if(me.positionInfoList[i].positionId == value) {
            item.x = me.positionInfoList[i].x;
            item.y = me.positionInfoList[i].y;
            item.z = me.positionInfoList[i].z;
        }
    }

    me.player.initializeGroupLabel("workerGroup");

    if(value == "null") {
        var workerTextBox = $('#tooltip_' + value);
        workerTextBox.css("background-color", "rgba(192,0,0, 0.8)");
    } else {
        me.player.changeLabelColorGroup(value, "rgba(192,0,0, 0.8)");
    }
};

threeJsCommonFunc.initKeyEvent = function() {
    var me = this;
    me.$.ship_canvas.addEventListener('keydown', function(e) {}, false);
};

threeJsCommonFunc.completeFind = function(e, res) {
    var me = this;
    var data = res.response;
    SCLoadMask.show();

    for(var i = 0; i < data.length; i++) {
        data[i].layerGroupId = data[i].layerGroupId + "";
    }

    if(data == null) {
        UT.request(me.$.findGroupInfo);
    }


    //2021-03-30 yshong 수정. 기본 선택 구역 관련
    var selectedId = 0;
    data.filter(function (e) {
	  return e.property && e.property.selected == "Y";
	}).forEach(function (e) {
	  return selectedId = e.id;
	});
    me.groupInfoList = null;
    me.set("groupInfoList", data);
    var hier = new CCHierachicalData();
    var hierachiDatas = hier.HierachyTransformByKey(data, "id", "parentId", "children", 0, null, true);
    hierachiDatas.name = "전체";
    me.set("hierachGroupInfoList", [hierachiDatas]);
    //2021-03-30 yshong 수정. 기본 선택 구역 관련
    me.set("searchCondition.layerGroupIds", [selectedId]);
    $("#groupCombo").val([selectedId]).trigger("change");

    while(this.$.textBoxDivforMapping.hasChildNodes()) {
        this.$.textBoxDivforMapping.removeChild(this.$.textBoxDivforMapping.firstChild);
    }

    if(!UT.isEmpty(me.player)) {
        me.player.stop();
        me.player.dispose();
        clearInterval(me.voxelInterval);
        me.player = null;
    }

    var jsonFile = "";

    if(me.areaInfo) {
        jsonFile = me.areaInfo.modelName;
    }

    if(UT.isEmpty(jsonFile)) {
        UT.alert("3D 모델링 파일이 없습니다.");
        return;
    }

    try {
        var threejs_json = {}; // 전역변수 THREEJS_MODEL_ARR에서 해당 json 모델 존재 여부 확인 

        for(var idx in THREEJS_MODEL_ARR) {
            if(THREEJS_MODEL_ARR[idx].name == jsonFile) {
                threejs_json = THREEJS_MODEL_ARR[idx].json;
                break;
            }
        } // 해당 json 모델 미존재시 json압축파일 압축해제 및 전역변수에 push

        if(UT.isEmpty(threejs_json)) {
            ZipLoader.install({
                THREE: THREE
            });
            var loader = new ZipLoader('/ui/lib/threejs/json/' + jsonFile + '.zip');
            loader.on('progress', function(e) {
                console.log('loading', e.loaded / e.total * 100 + '%');
            });
            loader.on('load', function(e) {
                var threejs_json = loader.loadThreeJSON(jsonFile + '.json');
                THREEJS_MODEL_ARR.push({
                    name: jsonFile,
                    json: threejs_json
                });
                me.loadThreeJs(threejs_json, jsonFile); // json에 대한 threeJs 생성
            });
            loader.load();
        } else {
            me.loadThreeJs(threejs_json, jsonFile); // json에 대한 threeJs 생성
        }
    } catch (e) {
        console.log(e);
    }
};

threeJsCommonFunc.loadThreeJs = function(threejs_json, model_name) {
    var me = this;
    me.player = new APP.Player();
    me.player.load(threejs_json);
    me.player.setSize(document.querySelector(me.pageName).querySelector(".flex-7").offsetWidth, document.querySelector(me.pageName).querySelector(".flex-7").offsetHeight); //		me.player.setSize( document.getElementById("canvasPopDiv").offsetWidth, document.getElementById("canvasPopDiv").offsetHeight );

    me.player.play();
    me.player.getLabelRenderer().domElement.style.userSelcet = 'none';
    
    document.getElementById("ship_canvas").appendChild(me.player.dom);
    me.initMouseEvent(); // 마우스 이벤트 설정

    window.addEventListener('resize', function() {
        me.player.setSize(document.querySelector(me.pageName).querySelector(".flex-7").offsetWidth, document.querySelector(me.pageName).querySelector(".flex-7").offsetHeight); //			me.player.setSize( document.getElementById("canvasPopDiv").offsetWidth, document.getElementById("canvasPopDiv").offsetHeight );
    });

    if(model_name == "fd") {
        me.onSetting();
        me.player.setControlsTarget(0, 15, 10);
    }

    SCLoadMask.hide();
    me.onSearch();
};

threeJsCommonFunc.onItemClick = function(e, res) {
    var me = this;
    var rowData = res.data,
        data = event.detail.data,
        item = event.detail.item;
    var value = data.positionId;
    var workerId = data.targetId;
    //me.player.initializeGroupLabel("workerGroup");

    for(var i = 0; i < me.positionInfoList.length; i++) {
        if(me.positionInfoList[i].positionId == value) {
            data.x = me.positionInfoList[i].x;
            data.y = me.positionInfoList[i].y;
            data.z = me.positionInfoList[i].z;
        }
    }

    if(value == "null") {
        var xPos = 0;
        var yPos = 0;
        var zPos = 0;

        if(workerId == "null") {
            var workerTextBox = $('#tooltip_' + value);
            workerTextBox.css("background-color", "rgba(192,0,0, 0.8)");
            xPos = data.x || 0;
            yPos = data.y || 0;
            zPos = data.z || 0; //hys
        } else {
            var workerTextBox = $('#tooltip_' + value);
            workerTextBox.css("background-color", "rgba(192,0,0, 0.8)");
            xPos = data.x || 0;
            yPos = data.y || 0;
            zPos = data.z || 0;
            me.player.setCameraPosition(me.player.getCamera().position.x + (Number(xPos) - me.player.getControls().target.x), me.player.getCamera().position.y + (Number(yPos) - me.player.getControls().target.y), me.player.getCamera().position.z + (Number(zPos) - me.player.getControls().target.z));
            me.player.setControlsTarget(Number(xPos), Number(yPos), Number(zPos)); //me.monitor1.moveTo(xPos,yPos,zPos);
        }
    } else {
    	var label = me.querySelector(".countTooltip.active");
    	if(UT.isNotEmpty(label)){
    		label.firstElementChild.classList.remove('active');
    		label.classList.remove('active');
    		me.querySelector(".listTooltip").hidden = true;
    	}
    	
    	me.querySelector("#countTooltip_"+value).classList.add('active');
    	var selectedLabel = me.querySelector("#countTooltip_"+value).firstElementChild;
    	selectedLabel.classList.remove('blink');
    	selectedLabel.offsetWidth;
    	selectedLabel.classList.add('blink');
    	
        me.player.changeLabelColorGroup(value, "rgba(192,0,0, 0.8)");
        xPos = data.x || 0;
        yPos = data.y || 0;
        zPos = data.z || 0;
        me.player.setCameraPosition(me.player.getCamera().position.x + (Number(xPos) - me.player.getControls().target.x), me.player.getCamera().position.y + (Number(yPos) - me.player.getControls().target.y), me.player.getCamera().position.z + (Number(zPos) - me.player.getControls().target.z)); // layer center issue로 이동

        me.player.setControlsTarget(Number(xPos), Number(yPos), Number(zPos)); 
        
    }
};

threeJsCommonFunc.dangerAlarm = function(workerX, workerY, workerZ) {
    var me = this;
    var sphereGeom = new THREE.SphereGeometry(3, 20, 16);
    var customMaterial = new THREE.ShaderMaterial({
        uniforms: {
            "c": {
                type: "f",
                value: 1.0
            },
            "p": {
                type: "f",
                value: 0
            },
            glowColor: {
                type: "c",
                value: new THREE.Color(0xff0000)
            },
            viewVector: {
                type: "v3",
                value: me.player.getCamera().position
            }
        },
        vertexShader: me.vertexShader(),
        fragmentShader: me.fragmentShader(),
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    var moonGlow = new THREE.Mesh(sphereGeom.clone(), customMaterial.clone());
    moonGlow.name = "dangerGroup";
    moonGlow.position.x = workerX;
    moonGlow.position.y = workerY + 1.3;
    moonGlow.position.z = workerZ;
    me.player.getScene().getObjectByName("workerGroup").add(moonGlow);
    me.isdangerAlarm = true;
};

threeJsCommonFunc.vertexShader = function() {
    return "uniform vec3 viewVector;" + "uniform float c;" + "uniform float p;" + "varying float intensity;" + "void main() {" + "vec3 vNormal = normalize( normalMatrix * normal );" + "vec3 vNormel = normalize( normalMatrix * viewVector );" + "intensity = pow( c - dot(vNormal, vNormel), p );" + "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );" + "}";
};

threeJsCommonFunc.fragmentShader = function() {
    return "uniform vec3 glowColor;" + "varying float intensity;" + "void main() {" + "vec3 glow = glowColor * intensity;" + "gl_FragColor = vec4( glow, 1.0 );" + "}";
};

threeJsCommonFunc.onImageChange = function(data, item) {
    var path = data.iconImage;

    if(this.colorTone == 'black') {
        return '/ui/assets/img/marker/' + path.split('.png')[0] + '_b.png';
    } else {
        return '/ui/assets/img/marker/' + path.split('.png')[0] + '.png';
    }
};

threeJsCommonFunc.createSensorModel = function(targetList, tag, callback) {
    var me = this;
    var targetList = targetList;
    var color;

    for(var idx in targetList) {
        var item = targetList[idx];
        if(UT.isEmpty(item.workerCnt)) continue;
        
        var targetCnt = item.workerCnt;
        
        var param = {
            displayName: item.displayName, 
            x: item.x,
            y: item.y,
            z: item.z,
            message: targetCnt,
            positionId: item.positionId 	//layerId : item.layerGroupId,
            ,emergency:(item.emergency && item.emergency == 1)
        }; // sensor 모델 생성

        me.player.addTargetObj(param, function(div, positionId){
        	div.appendChild(getTooltipList(me, positionId));
        }); //긴급신호가 있는 위치에 여러군데라도 다 표시되도록

        if(item.emergency && item.emergency == 1) {
            me.dangerAlarm(Number(item.x), Number(item.y), Number(item.z));
        }
    }

    callback();
};

threeJsCommonFunc.selectTab = function(e) {
    var me = this;

    if(me.player) {
        if(e.detail.item.id == "gridWorkerPanel") {
            if(!UT.isEmpty(me.player.getScene().getObjectByName("sphereGroup"))) {
                var sphereList = me.player.getScene().getObjectByName("sphereGroup").children;

                for(var i = 0; i < sphereList.length; i++) {
                    var len = sphereList[i].children.length;

                    for(var k = len - 1; k >= 0; k--) {
                        sphereList[i].remove(sphereList[i].children[k]);
                    }
                }
            }

            me.player.getScene().remove(me.player.getScene().getObjectByName("sphereGroup"));
            me.createSensorModel(me.positionInfoList, "worker");
        } else if(e.detail.item.id == "gridVehiclePanel") {
            if(!UT.isEmpty(me.player.getScene().getObjectByName("sphereGroup"))) {
                var sphereList = me.player.getScene().getObjectByName("sphereGroup").children;

                for(var i = 0; i < sphereList.length; i++) {
                    var len = sphereList[i].children.length;

                    for(var k = len - 1; k >= 0; k--) {
                        sphereList[i].remove(sphereList[i].children[k]);
                    }
                }
            }

            me.player.getScene().remove(me.player.getScene().getObjectByName("sphereGroup"));
            me.createSensorModel(me.positionInfoList, "vehicle");
        }
    }
};

threeJsCommonFunc.gridBtnClick = function(e) {
    var me = this;
    e.target.active ? e.target.classList.add('ItemActive') : e.target.classList.remove('ItemActive');
    e.target.title = e.target.active ? "목록 숨기기" : "목록 보이기";
    me.$.tabNavi.hidden = !e.target.active; //		me.player.setSize( document.getElementsByClassName("flex-7")[0].offsetWidth, document.getElementsByClassName("flex-7")[0].offsetHeight );

    me.player.setSize(document.getElementById("canvasPopDiv").offsetWidth, document.getElementById("canvasPopDiv").offsetHeight);

    if(e.target.active) {
        me.$.gridVehiclePanel.reSize();
        me.$.gridVehiclePanel.refresh();
        me.$.gridWorkerPanel.reSize();
        me.$.gridWorkerPanel.refresh();
        me.$.tabNavi.doContentElementResize();
    }
};

threeJsCommonFunc.filterBtnClick = function(e) {
    var me = this;
    e.target.active ? e.target.classList.add('ItemActive') : e.target.classList.remove('ItemActive');
    e.target.title = e.target.active ? "검색조건 숨기기" : "검색조건 보이기";
    me.$.filterDiv.hidden = !e.target.active; //		me.player.setSize( document.getElementsByClassName("flex-7")[0].offsetWidth, document.getElementsByClassName("flex-7")[0].offsetHeight );

    me.player.setSize(document.getElementById("canvasPopDiv").offsetWidth, document.getElementById("canvasPopDiv").offsetHeight);
    me.$.gridVehiclePanel.reSize();
    me.$.gridVehiclePanel.refresh();
    me.$.gridWorkerPanel.reSize();
    me.$.gridWorkerPanel.refresh();
    me.$.tabNavi.doContentElementResize();
};

threeJsCommonFunc.casenBtn = function() {
    var me = this;

    for(var i = 0; i < $(".casenTd").length; i++) {
        if($(".casenTd")[i].hasAttribute("hidden")) {
            $(".casenTd")[i].removeAttribute("hidden");
        } else {
            $(".casenTd")[i].setAttribute("hidden", true);
        }
    }
};

threeJsCommonFunc.onSetting = function() {
    var me = this;

    if(me.player.getScene().getObjectByName("siteGroup").getObjectByName("casenGroup")) {
        me.player.getScene().getObjectByName("siteGroup").remove(me.player.getScene().getObjectByName("casenGroup"));
    }

    var casenList = [];
    var xInit = -40;
    var xVar = 25.951;

    for(var i = 0; i < me.casenInfo.casen4; i++) {
        var temp = {};
        temp.x = xInit;
        temp.y = i * 0.9;
        temp.z = 0;
        casenList.push(temp);
    }

    for(var i = 0; i < me.casenInfo.casen3; i++) {
        var temp = {};
        temp.x = xInit + xVar;
        temp.y = i * 0.9;
        temp.z = 0;
        casenList.push(temp);
    }

    for(var i = 0; i < me.casenInfo.casen2; i++) {
        var temp = {};
        temp.x = xInit + xVar * 2;
        temp.y = i * 0.9;
        temp.z = 0;
        casenList.push(temp);
    }

    for(var i = 0; i < me.casenInfo.casen1; i++) {
        var temp = {};
        temp.x = xInit + xVar * 3;
        temp.y = i * 0.9;
        temp.z = 0;
        casenList.push(temp);
    }

    me.createCasenModel(casenList);
};

threeJsCommonFunc.onCheck = function() {
    var me = this;

    if(me.casenInfo.casen1 > 9 || me.casenInfo.casen2 > 9 || me.casenInfo.casen3 > 9 || me.casenInfo.casen4 > 9) {
        UT.alert("casen의 최대 갯수는 9 입니다.");
        return;
    }

    me.onSetting();
    me.set("areaInfo.adjunction.casen", me.casenInfo);
    this.$.saveCasenInfo.body = {
        areaInfo: me.areaInfo
    };
    UT.request(me.$.saveCasenInfo);
};

threeJsCommonFunc.completeSaveCasen = function(e, res) {
    var me = this,
        message = "STD.N2400"; // 저장하였습니다.

    if(res.response.result_status === 'S') {
        me.onSearch();
    }
};

threeJsCommonFunc.createCasenModel = function(casenList) {
    var me = this;
    var casenList = casenList;

    for(var idx in casenList) {
        var item = casenList[idx];
        var param = {
            x: item.x,
            y: item.y,
            z: item.z
        }; // sensor 모델 생성

        me.player.addCasen(param);
    }
};

threeJsCommonFunc.destroyed = function(popup, e) {
    var me = this;
    clearInterval(me.voxelInterval); //		if (!UT.isEmpty(me.player.getScene().getObjectByName("workerGroup"))) {
    //			var workerList = me.player.getScene().getObjectByName("workerGroup").children;
    //			for(var i=0; i<workerList.length; i++) {
    //				var len = workerList[i].children.length;
    //				for(var k = len-1 ; k>=0; k--) {
    //					// 선원 수, 선원명 툴팁 제거
    //					workerList[i].remove(workerList[i].children[k]);
    //				}
    //			}
    //		}

    me.player.stop();
    me.player.dispose();
    reloadObj();
    clearTimeout(me.setTimeInfo);
    clearTimeout(me.setTimeInfo1);
    
    if(me.requestAnimate){
    	cancelAnimationFrame(me.requestAnimate);
    }
};

threeJsCommonFunc.connectSocketServer = function() {
    var me = this;

    if(me.ws) {
        me.ws.close();
    }

    var userInfo = SCSessionManager.currentUser;

    if(UT.isEmpty(userInfo)) {
        userInfo = {
            ws_use: "Y",
            ws_from_hr: 0,
            ws_to_hr: 24
        };
    }

    if(userInfo.ws_use == "Y") {
        var support = "MozWebSocket" in window ? 'MozWebSocket' : "WebSocket" in window ? 'WebSocket' : null;

        if(support == null) {
            alert(noSupportMessage);
            return;
        }

        console.log("* [Notify] ws Connecting to server... : " + SCMdiManager.searchParam.site_id); //     	ws = new window[support](conf.ws);

        me.ws = new WebSocket(conf.ws + SCMdiManager.searchParam.site_id); // when data is comming from the server, this metod is called

        me.ws.onmessage = function(evt) {
            //         	console.log("# [Notify] onmessage : " + evt.data); //con.raycloud.co.kr
            if(evt && evt.data && _typeof(evt.data) == "object") {
                var socketData = JSON.parse(evt.data).body; // 현재시간

                var nowDt = new Date();
                var hour = nowDt.getHours(); // 수신시간

                var startHr = Number(userInfo.ws_from_hr || 0);
                var endHr = Number(userInfo.ws_to_hr || 23); // 사용자 정보에 설정된 수신시간에만 수행 

                if(hour >= startHr && hour <= endHr) {
                    // 알람 수신 아이콘(빨간동그라미) 표시
                    var notiIconEl = $('#notiIcon')[0]; // 알람 타입 추가

                    var data = JSON.parse(evt.data);
                    var eventType = data.eventType;
                    var content = data.body;
                    var alarmType = content.type; // alarm key

                    var msg = content.body;

                    if(eventType != "Alarm") {
                        return;
                    } else {
                        if(UT.isNotEmpty(notiIconEl)) {
                            notiIconEl.style.visibility = 'visible';
                        }
                    } // 긴급호출 : 메시지(error) 표시 및 경고음


                    if(alarmType == "emergency") {
                        me.set("searchCondition.layerGroupIds", [0]);

                        if(me.gridWorkerList) {
                            for(var i = 0; i < me.gridWorkerList.length; i++) {
                                if(socketData.targetInfo.workerId == me.gridWorkerList[i].targetId) {
                                    var grid = me.$.gridWorkerPanel;
                                    var provider = grid.getDataProvider();
                                    var index = grid.searchItem("targetId", socketData.targetInfo.workerId, 0);
                                    provider.setItemAt(index.itemIndex, {
                                        emergency: '1'
                                    });

                                    try {
                                        var value = me.gridWorkerList[i].positionId;
                                        var workerId = me.gridWorkerList[i].targetId;
                                        me.player.initializeGroupLabel("workerGroup");
                                        var data = me.gridWorkerList[i];

                                        for(var j = 0; j < me.positionInfoList.length; j++) {
                                            if(me.positionInfoList[j].positionId == value) {
                                                data.x = me.positionInfoList[j].x;
                                                data.y = me.positionInfoList[j].y;
                                                data.z = me.positionInfoList[j].z;
                                            }
                                        }

                                        me.set("emergencyInfo", me.gridWorkerList[i]);

                                        if(value == "null") { //                		   					var xPos = 0;
                                            //                		        			var yPos = 0;
                                            //                		        			var zPos = 0;
                                            //                		        			
                                            //                		   					if(workerId == "null"){
                                            //                		   						var workerTextBox = $('#tooltip_' + value);
                                            //                		   						workerTextBox.css("background-color", "rgba(192,0,0, 0.8)");
                                            //                		   						
                                            //                		   						xPos = data.x || 0;
                                            //                		   	        			yPos = data.y || 0;
                                            //                		   	        			zPos = data.z || 0;
                                            //                		   						//hys
                                            //                		   					}else{
                                            //                		   						var workerTextBox = $('#tooltip_' + value);
                                            //                		   						workerTextBox.css("background-color", "rgba(192,0,0, 0.8)");
                                            //                		   						
                                            //                		   						xPos = data.x || 0;
                                            //                		   	        			yPos = data.y || 0;
                                            //                		   	        			zPos = data.z || 0;
                                            //                		   	        			
                                            //                		   	        			me.player.setCameraPosition(me.player.getCamera().position.x + (Number(xPos) - me.player.getControls().target.x),
                                            //                		   	 	    				me.player.getCamera().position.y + (Number(yPos) - me.player.getControls().target.y),
                                            //                		   	 	    				me.player.getCamera().position.z + (Number(zPos) - me.player.getControls().target.z));
                                            //                		   	        			me.player.setControlsTarget(Number(xPos),Number(yPos),Number(zPos));		//me.monitor1.moveTo(xPos,yPos,zPos);
                                            //                		   					}
                                        } else {
                                            //                							me.player.changeLabelColorGroup(value, "rgba(192,0,0, 0.8)");
                                            xPos = data.x || 0;
                                            yPos = data.y || 0;
                                            zPos = data.z || 0; //                		        			me.player.setCameraPosition(me.player.getCamera().position.x + (Number(xPos) - me.player.getControls().target.x),
                                            //                		    	    				me.player.getCamera().position.y + (Number(yPos) - me.player.getControls().target.y),
                                            //                		    	    				me.player.getCamera().position.z + (Number(zPos) - me.player.getControls().target.z));
                                            //                		        			me.player.setControlsTarget(Number(xPos),Number(yPos),Number(zPos));		//me.monitor1.moveTo(xPos,yPos,zPos);
                                            //                 		        			me.player.getScene().getObjectByName("workerGroup").remove(me.player.getScene().getObjectByName("dangerGroup"));
                                            //                		        			me.dangerAlarm(Number(xPos),Number(yPos),Number(zPos));
                                        }
                                    } catch (e) {}
                                }
                            }
                        }
                    }
                }
            }
        }; // when the connection is established, this method is called


        me.ws.onopen = function() {
            console.log('* [Notify] ws Connection open...');
            var param = {
                "eventType": "UserCommand",
                "body": {
                    "command": "login",
                    "parameter": SCSessionManager && SCSessionManager.currentUser && SCSessionManager.currentUser.usr_id ? SCSessionManager.currentUser.usr_id : "ADMIN"
                }
            };
            me.ws.send(JSON.stringify(param)); //             console.log('open');
            //             {"eventType":"UserCommand", "body":{"command":"login", "parameter":"ADMIN"} }
        };

        me.ws.onerror = function(error) {
            console.log('*[Notify] ws Connection err ' + error + '<br/>');
        }; // when the connection is closed, this method is called


        me.ws.onclose = function() {
            console.log('*[Notify] ws Connection closed...');
        };
    } //me.set("ws", ws);


    me.startInterval();
};

threeJsCommonFunc.startInterval = function() {
    var me = this;
    var date = new Date();
    me.timerId = setTimeout(function() {
        me.intervalId = setInterval(function() {
            // 네트워크 끊겼을 때, WebSocket 연결 해제
            if(!navigator.onLine) {
                //console.log("You are Offline");
                me.ws.close();
            } // Ready State Constants
            // 0: 연결이 수립되지 않은 상태
            // 1: 연결이 수립되어 데이터가 오고갈 수 있는 상태
            // 2: 연결이 닫히는 중
            // 3: 연결이 종료되었거나, 연결에 실패한 경우


            if(UT.isEmpty(me.ws)) {
                clearInterval(me.timerId);
                return;
            }

            if(navigator.onLine && me.ws.readyState >= 2) {
                clearInterval(me.timerId);
                me.connectSocketServer();
            }
        }, 60 * 1000);
    }, 0);
};

threeJsCommonFunc.completeFindListBeacon = function(e, res) {
    var me = this;
    var resultList = res.response;
    me.set("beaconList", resultList);
};

threeJsCommonFunc.onShowBeacon = function() {
    var me = this;
    var allList = me.beaconList;

    if(me.beaconFlag) {
        if(!UT.isEmpty(me.player.getScene().getObjectByName("sphereGroup"))) {
            var sphereList = me.player.getScene().getObjectByName("beacon").children;

            for(var i = 0; i < sphereList.length; i++) {
                var len = sphereList[i].children.length;

                for(var k = len - 1; k >= 0; k--) {
                    // 비콘 id 툴팁 제거
                    sphereList[i].remove(sphereList[i].children[k]);
                }
            }
        }

        me.player.getScene().getObjectByName("sphereGroup").remove(me.player.getScene().getObjectByName("sphereGroup").getObjectByName("beacon"));
        me.$.beaconBtn.text = "위치 보기";
        me.beaconFlag = false;
        return;
    } else {
        me.createBeaconModel(allList);
        me.$.beaconBtn.text = "위치 숨기기";
        me.beaconFlag = true;
    }
};

threeJsCommonFunc.createBeaconModel = function(positionList) {
    var me = this;
    var positionList = positionList;
    var color;

    for(var idx in positionList) {
        var item = positionList[idx];

        if(!item.property) {
            continue;
        }

        if(item.property && item.property.type == "gateway") {
            color = "green";
        } else {
            color = "red";
        }

        var param = {
            radius: 1,
            color: color,
            x: item.x,
            y: item.y,
            z: item.z,
            message: item.minor,
            positionId: item.id,
            layerId: item.layerGroupId,
            groupName: item.property.type
        }; // sensor 모델 생성

        me.player.addSphere(param);
    }
};

threeJsCommonFunc.onRowStyle = function(data) {
    if(data["emergency"] == "1") {
        return {
            "background": "#f54242",
            "fontColor": "#ffffff"
        };
    }
};

threeJsCommonFunc.changeAllShow = function(e) {
    var me = this;

    if(e.detail) {
        if(!UT.isEmpty(me.player.getScene().getObjectByName("sphereGroup"))) {
            var sphereList = me.player.getScene().getObjectByName("sphereGroup").children;

            for(var i = 0; i < sphereList.length; i++) {
                var len = sphereList[i].children.length;

                for(var k = len - 1; k >= 0; k--) {
                    sphereList[i].remove(sphereList[i].children[k]);
                }
            }
        }

        me.player.getScene().remove(me.player.getScene().getObjectByName("sphereGroup"));
        me.createSensorModel(me.positionInfoList, "all");
    } else {
        if(me.$.tabNavi.selectedItem.id == "gridWorkerPanel") {
            if(!UT.isEmpty(me.player.getScene().getObjectByName("sphereGroup"))) {
                var sphereList = me.player.getScene().getObjectByName("sphereGroup").children;

                for(var i = 0; i < sphereList.length; i++) {
                    var len = sphereList[i].children.length;

                    for(var k = len - 1; k >= 0; k--) {
                        sphereList[i].remove(sphereList[i].children[k]);
                    }
                }
            }

            me.player.getScene().remove(me.player.getScene().getObjectByName("sphereGroup"));
            me.createSensorModel(me.positionInfoList, "worker");
        } else if(me.$.tabNavi.selectedItem.id == "gridVehiclePanel") {
            if(!UT.isEmpty(me.player.getScene().getObjectByName("sphereGroup"))) {
                var sphereList = me.player.getScene().getObjectByName("sphereGroup").children;

                for(var i = 0; i < sphereList.length; i++) {
                    var len = sphereList[i].children.length;

                    for(var k = len - 1; k >= 0; k--) {
                        sphereList[i].remove(sphereList[i].children[k]);
                    }
                }
            }

            me.player.getScene().remove(me.player.getScene().getObjectByName("sphereGroup"));
            me.createSensorModel(me.positionInfoList, "vehicle");
        }
    }
};

threeJsCommonFunc.onSelectGroup = function(event) {
    var me = this; //	var layerGroupId = "";
    //	var groupName = "";

    var selectedItem = event.target.selectedItems[0];

    if(UT.isNotEmpty(selectedItem)) { //선택됐는데,
        if(selectedItem.id == 0) {
            //id = 0 인경우는 전체..
            clearInterval(me.threeGroupInterval);
            me.threeGroupInterval = setInterval(function() {
                if(UT.isNotEmpty(me.player)) {
                    me.player.getScene().getObjectByName("siteGroup").children.forEach(function(e) {
                        if(me.isInside == false || e.name.indexOf("_OUT") == -1) {
                            e.visible = true;
                        } else {
                            e.visible = false;
                        }
                    });
                    clearInterval(me.threeGroupInterval);
                }
            }, 200);

            me.set("searchCondition.layerGroupId", null);
            me.set("selectedLayerGroup", null);
        } else {
            //id !=0 인 경우는 그놈만..
            if(selectedItem.property && selectedItem.property.modelNames) {
                var groupNames = selectedItem.property.modelNames;
                clearInterval(me.threeGroupInterval);
                me.threeGroupInterval = setInterval(function() {
                    if(me.player) {
                        me.player.getScene().getObjectByName("siteGroup").children.forEach(function(e) {
                            if(groupNames.indexOf(e.name) != -1) {
                                if(me.isInside == false || e.name.indexOf("_OUT") == -1) {
                                    e.visible = true;
                                } else {
                                    e.visible = false;
                                }
                            } else {
                                e.visible = false;
                            }
                        });
                        clearInterval(me.threeGroupInterval);
                    }

                }, 200);
            }

            me.layerGroupId.value = selectedItem.id;
            me.groupName.value = selectedItem.name;
            me.set("searchCondition.layerGroupId", me.layerGroupId.value);
            me.set("selectedLayerGroup", selectedItem);
        }
        // player 가 있을 때(3D가 로드 되었을 때)만 onSearch를 진행한다. 초기에 너무 많이 호출함. 
        if(me.player) {
            me.onSearch();
        }
    }
};

threeJsCommonFunc.changeInOut = function(e) {
    var me = this;

    if(me.changeBtnName == "내부 보기") {
        me.changeBtnName = "외관 보기";
        me.isInside = true;
    } else {
        me.changeBtnName = "내부 보기";
        me.isInside = false;
    }

    if(!UT.isEmpty(me.player.getScene().getObjectByName("siteGroup"))) {
        var siteGroup = me.player.getScene().getObjectByName("siteGroup");
        var outList = [];

        for(var i = 0; i < siteGroup.children.length; i++) {
            if(!me.selectedLayerGroup && siteGroup.children[i].name.indexOf("_OUT") != -1 || siteGroup.children[i].name.indexOf("_OUT") != -1 && me.selectedLayerGroup.property && me.selectedLayerGroup.property.modelNames.includes(siteGroup.children[i].name)) {
                siteGroup.children[i].visible = !siteGroup.children[i].visible;
            }
        }
    }
};