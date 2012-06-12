/*********************
 * PRELUDE
 ********************/
function include(filename) {
	var head = document.getElementsByTagName('head')[0];
	script = document.createElement('script');
	script.src = filename;
	script.type = 'text/javascript';
	head.appendChild(script)
}

include('js/jquery-1.7.2.min.js');
include('js/camera.js');
include('js/params.js');
include('js/Three.js');

window.onload = onLoad;

/********************
 * GLOBAL VARS
 *******************/

function MyCanvas(id) {
 	this.id = id;
 	this.jcanvas  = $(id);
 	this.canvas   = this.jcanvas[0]
 	this.ctx = this.canvas.getContext("2d");

 	this.setSize = function(w, h) {
 		this.jcanvas.attr("width", w);
 		this.jcanvas.attr("height", h);
 	}

 	this.setSize(w, h);
}

var _camera, _marker, _render_initial, _render_final
var video;
var marker_canvas;
var render_initial_canvas;
var render_final_canvas;
var marker_ctx;

var ctx;
var img;

var arMatTemp;	// array to temporarily hold matrix data
var arParam;
var arRaster;
var arDetector;
var arMarkers;

var renderer; 	// Three Renderer
var texVideo;	// texture hoding video images

var camAR;		// WebGL camera according to the webcam
var sceneVideo;
var sceneAR;	// 3D scene with augmented reality

/********************
 * FUNCS
 *******************/

/**
 * Initialization of stuff
 */
function init() {
	// Initialize video feed
	video = $('#camera_video')[0];
	getUserMedia(video);
	video.play();

	// Create all the canvas
	_camera         = new MyCanvas("#camera_feed");
	_marker         = new MyCanvas("#marker_detection");
	_render_initial = new MyCanvas("#render_initial");
	_render_final   = new MyCanvas("#render_final");

	// JSARToolKit stuff
	arParam     = new FLARParam(w, h);
	arDetector       = new FLARMultiIdMarkerDetector(arParam, 80);
	arDetector.setContinueMode(true);
	resultMat = new NyARTransMatResult();

	// Raster creation for marker detection from the camera canvas
	arRaster    = new NyARRgbRaster_Canvas2D(_camera.canvas);

	arMatTemp = new Float32Array(16);
	arParam.copyCameraMatrix(arMatTemp, 1, 2000);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(w, h);
	renderer.setClearColorHex(0x777777, 1.0);

	texVideo = new THREE.Texture(_camera.canvas);
	var bbGeo = new THREE.PlaneGeometry(2, 2, 0);
	var bbMat = new THREE.MeshBasicMaterial({map: texVideo});
	var bbPlane = new THREE.Mesh(bbGeo, bbMat);
	bbPlane.rotation.x += Math.PI / 2;
	bbPlane.depthTest  = false;
	bbPlane.depthWrite = false;

	camVideo = new THREE.Camera();
	sceneVideo = new THREE.Scene();

	sceneVideo.add(bbPlane);
	sceneVideo.add(camVideo);

	var lightPoint1 = new THREE.PointLight(0xffffff, 2.0);
	lightPoint1.position.set(400, 500, 100);

	camAR = new THREE.Camera();
	camAR.projectionMatrix.setFromArray(arMatTemp);

	sceneAR = new THREE.Scene();
	sceneAR.add(lightPoint1);
	sceneAR.add(camAR);

	arMarkers = {};
}

/**
 * something like glutResizeFunc
 */
function updateDimesions() {
	w = toInt($("#dim_width").text());
	h = toInt($("#dim_height").text());

	_camera.setSize(w, h);
	_marker.setSize(w, h);
	_render_initial.setSize(w, h);
	_render_final.setSize(w, h);
}

/**
 * image loading
 */
function loadImg() {
	img = new Image()
	img.src = 'markers/0'// + toInt(Math.random() * 100).toString()
}
/////////////////////////////
/**
 * something like glutRenderFunc
 */
function render() {
	//canvas.drawRect({x: 0, y: 0});

	_camera.ctx.drawImage(video, 0, 0, w, h);
	_marker.ctx.drawImage(video, 0, 0, w, h);
	_camera.canvas.changed = true;

	var ctx = _marker.ctx;
	//ctx.fillStyle = "white";
	//ctx.fillRect(0, 0, w, h);
	//_marker.ctx.drawImage(video, 0, 0, w, h);

	var detect_count = arDetector.detectMarkerLite(arRaster, 100);
	
	for(var i = 0; i < detected; ++i) {
		var id = arDetector.getIdMarkerData(i);
		var current;
		if (id.packetLength > 4)
			current = -1
		else {
			current = 0;
			for(var j = 0; j < id.packetLength; ++j)
				current = (current << 8) | id.getPacketData(j);
		}

		if (!arMarkers[current])
			arMarkers[current] = {};
		
		arDetector.getTransformMatrix(i, arMatResult);

		arMarkers[current].age = 0;
		arMarkers[current].transform = Object.asCopy(arMatResult);
	}


	for(var i in arMarkers) {
		var marker = arMarkers[i];
		if (!marker.model) {
			var cubeGeo = new THREE.CubeGeometry(100, 100, 100);
			var cubeMat = new THREE.MeshLambertMaterial({color: 0xff0000});
			var cube = new THREE.Mesh(cubeGeo, cubeMat);
			cube.position.z = -50;
			cube.doubleSided = true;

			marker.model = new THREE.Object3D();
			marker.model.matrixAutoUpdate = false;
			marker.model.add(cube);

			sceneAR.add(marker.model);
		}

		copyMatrix(marker.transform, arMatTemp);
		marker.model.matrix.setFromArray(arMatTemp);
		marker.model.matrixWorldNeedsUpdate = true;
	}

	renderer.autoClear = false;
	renderer.clear();
	renderer.render(sceneVideo, _camera);
	renderer.clear(0x0, 0xffffffff, 0x0);
	renderer.render(sceneAR, camAR);
}



function copyMatrix(mat, cm) {
	cm[0] = mat.m00;
	cm[1] = -mat.m10;
	cm[2] = mat.m20;
	cm[3] = 0;
	cm[4] = mat.m01;
	cm[5] = -mat.m11;
	cm[6] = mat.m21;
	cm[7] = 0;
	cm[8] = -mat.m02;
	cm[9] = mat.m12;
	cm[10] = -mat.m22;
	cm[11] = 0;
	cm[12] = mat.m03;
	cm[13] = -mat.m13;
	cm[14] = mat.m23;
	cm[15] = 1;
}

/*********************
 * EVENTS
 ********************/
function onLoad() {
	init();
	loadImg();

	THREE.Matrix4.prototype.setFromArray = function(m) {
	return this.set(
		m[0], m[4], m[8], m[12],
		m[1], m[5], m[9], m[13],
		m[2], m[6], m[10], m[14],
		m[3], m[7], m[11], m[15]);
	}

	setInterval(render, 16);	
}

