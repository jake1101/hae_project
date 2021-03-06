/**
 * Orbiting camera node type
 *
 * @author xeolabs / http://xeolabs.com
 *
 * <p>Usage</p>
 * <pre>
 * someNode.addNode({
 *      type: "cameras/orbit",
 *      eye:{ x: y:0 },
 *      look:{ y:0 },
 *      yaw: 340,,
 *      pitch: -20,
 *      zoom: 350,
 *      zoomSensitivity:10.0,
 * });
 * </pre>
 * <p>The camera is initially positioned at the given 'eye' and 'look', then the distance of 'eye' is zoomed out
 * away from 'look' by the amount given in 'zoom', and then 'eye' is rotated by 'yaw' and 'pitch'.</p>
 *
 */
SceneJS.Types.addType("cameras/orbit", {

    construct: function (params) {

        var lookat = this.addNode({
            type: "lookAt",

            // A plugin node type is responsible for attaching specified
            // child nodes within itself
            nodes: params.nodes
        });

        var yaw = params.yaw || 0;
        var pitch = params.pitch || 0;
        var zoom = params.zoom || 10;
        var minPitch = params.minPitch;
        var maxPitch = params.maxPitch;
        var zoomSensitivity = params.zoomSensitivity || 1.0;

        // hys
        var downX;
        var downY;
        var lastX;
        var lastY;
        var dragging = false;
        var lookatDirty = false;

        var eye = params.eye || { x: 0, y: 0, z: 0 };
        var look = params.look || { x: 0, y: 0, z: 0};

        lookat.setEye({ x: eye.x, y: eye.y, z: -zoom });
        lookat.setLook({ x: look.x, y: look.y, z: look.z });
        lookat.setUp({ x: 0, y: 1, z: 0 });

        var spin = params.spin;


        if (params.spin || params.spinYaw || params.spinPitch) {
            var spinYaw = 0;
            var spinPitch = 0;
            if (params.spin) {
                spinYaw = params.spin;
            } else {
                spinYaw = params.spinYaw || 0.0;
                spinPitch = params.spinPitch || 0.0;
            }

            this._tick = this.getScene().on("tick",
                function () {
                    yaw -= spinYaw;
                    pitch -= spinPitch;
                    update();
                });
        }

        var canvas = this.getScene().getCanvas();
        //hys
        var scene = this.getScene();
        
        function mouseDown(event) {
            lastX =downX = event.clientX;
            lastY = downY =event.clientY;
            dragging = true;
        }

        function touchStart(event) {
            lastX =downX = event.targetTouches[0].clientX;
            lastY =downY = event.targetTouches[0].clientY;
            dragging = true;
        }

        function mouseUp(event) {
            // hys
        	if (dragging && closeEnough(event.clientX, downX) && closeEnough(event.clientY, downY)) {
                pick(event.clientX, event.clientY);
            }
            dragging = false;
        }
        
        function touchEnd(event) {
            // hys
        	if (dragging && closeEnough(event.clientX, downX) && closeEnough(event.clientY, downY)) {
                pick(event.clientX, event.clientY);
            }
            dragging = false;
        }

        function mouseMove(event) {
            var posX = event.clientX;
            var posY = event.clientY;
            actionMove(posX, posY);
        }

        function touchMove(event) {
            var posX = event.targetTouches[0].clientX;
            var posY = event.targetTouches[0].clientY;
            actionMove(posX, posY);
        }

        function actionMove(posX, posY) {
            if (dragging) {

                yaw -= (posX - lastX) * 0.1;
                pitch -= (posY - lastY) * 0.1;

                update();

                lastX = posX;
                lastY = posY;
            }
        }

        function mouseWheel(event) {
            var delta = 0;
            if (!event) event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            } else if (event.detail) {
                delta = -event.detail / 3;
            }
            if (delta) {
                if (delta < 0) {
                    zoom -= zoomSensitivity;
                } else {
                    zoom += zoomSensitivity;
                }
            }
            if (event.preventDefault) {
                event.preventDefault();
            }
            event.returnValue = false;
            update();

        }
       /* console.log(canvas.hasAttribute("onmousedown"));
        canvas.addEventListener('mousedown', mouseDown, true);
        canvas.addEventListener('mousemove', mouseMove, true);
        canvas.addEventListener('mouseup', mouseUp, true);
        canvas.addEventListener('touchstart', touchStart, true);
        canvas.addEventListener('touchmove', touchMove, true);
        canvas.addEventListener('touchend', touchEnd, true);
        canvas.addEventListener('mousewheel', mouseWheel, true);
        canvas.addEventListener('DOMMouseScroll', mouseWheel, true);
        */
        canvas.onmousedown = mouseDown;
        canvas.onmousemove = mouseMove;
        canvas.onmouseup = mouseUp;
        canvas.ontouchstart = touchStart;
        canvas.ontouchmove = touchMove;
        canvas.ontouchend = touchEnd;
        canvas.onmousewheel = mouseWheel;
        canvas.onDOMMouseScroll = mouseWheel;
       
        // hys
        function pick(canvasX, canvasY) {
        	scene.pick({ canvasPos :[canvasX, canvasY], rayPick: true });
        }
        function closeEnough(x, y) {
            return (x > y) ? (x - y < 5) : (y - x < 5);
        }
        ///
        
        
        function update() {

            if (minPitch != undefined && pitch < minPitch) {
                pitch = minPitch;
            }

            if (maxPitch != undefined && pitch > maxPitch) {
                pitch = maxPitch;
            }

            var eye = [0, 0, zoom];
            var look = [0, 0, 0];
            var up = [0, 1, 0];

            // TODO: These references are to private SceneJS math methods, which are not part of API

            var eyeVec = SceneJS_math_subVec3(eye, look, []);
            var axis = SceneJS_math_cross3Vec3(up, eyeVec, []);

            var pitchMat = SceneJS_math_rotationMat4v(pitch * 0.0174532925, axis);
            var yawMat = SceneJS_math_rotationMat4v(yaw * 0.0174532925, up);

            var eye3 = SceneJS_math_transformPoint3(pitchMat, eye);
            eye3 = SceneJS_math_transformPoint3(yawMat, eye3);

            lookat.setEye({x: eye3[0], y: eye3[1], z: eye3[2] });
        }

        update();
    },

    setLook: function (l) {


    },
    
    
    destruct: function () {
        this.getScene().off(this.tick);
        // TODO: remove mouse handlers
    }
});
