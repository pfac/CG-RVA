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
include('js/jcanvas.min.js');
include('js/camera.js');
include('js/params.js');

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

var param;
var raster;
var detector;
var resultMat;

var ctx;
var img;

/********************
 * FUNCS
 *******************/
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
	flar_param     = new FLARParam(w, h)
	detector       = new FLARMultiIdMarkerDetector(flar_param, 80)
	detector.setContinueMode(true)
	resultMat = new NyARTransMatResult()

	// Raster creation for marker detection from the camera canvas
	raster    = new NyARRgbRaster_Canvas2D(_camera.canvas)
}

function updateDimesions() {
	w = toInt($("#dim_width").text());
	h = toInt($("#dim_height").text());

	_camera.setSize(w, h);
	_marker.setSize(w, h);
	_render_initial.setSize(w, h);
	_render_final.setSize(w, h);
}

function loadImg() {
	img = new Image()
	img.src = 'markers/0'// + toInt(Math.random() * 100).toString()
}
/////////////////////////////
function render() {
	//canvas.drawRect({x: 0, y: 0});

	var dt = new Date().getTime();
	_camera.ctx.drawImage(video, 0, 0, w, h);
	_camera.canvas.changed = true;

	_marker.ctx.fillStyle = "white";
	_marker.ctx.fillRect(0, 0, w, h);
	//_marker.ctx.drawImage(video, 0, 0, w, h);

	var detect_count = detector.detectMarkerLite(raster, 160);

	var ctx = _marker.ctx;
	ctx.save();
		ctx.translate(w/2, h/2);
		ctx.strokeStyle = 'red';
		var sc;
		for(var idx = 0; idx < detect_count; ++idx) {
			var id = detector.getIdMarkerData(idx);
			var square = detector.getSquare(idx);

			detector.getTransformMatrix(idx, resultMat);

		ctx = _marker.ctx;
		sc = 940 / resultMat.m23;
		ctx.save();
			ctx.scale(sc, sc);
			ctx.transform(resultMat.m00, resultMat.m01, -resultMat.m10, -resultMat.m11, resultMat.m03*3/4, resultMat.m13*3/4);
			ctx.strokeRect(-26, -26, 53, 53);
		ctx.restore();
		}
	ctx.restore();
}

/*********************
 * EVENTS
 ********************/
function onLoad() {
	init()
	loadImg()

	setInterval(render, 16)
}

