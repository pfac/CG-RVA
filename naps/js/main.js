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

include('js/jquery-1.7.2.min.js')
include('js/jcanvas.min.js')
include('js/camera.js')

window.onload = onLoad;

/********************
 * GLOBAL VARS
 *******************/
var w, h
var video
var canvas
var param
var ctx
var img
var raster
var detector
var resultMat


/********************
 * FUNCS
 *******************/

function init() {
	w = 300
	h = 300
	video = $('<video>', {id: 'video', width: w, height: h})[0]

	$(video).css('background', 'blue')
	$(video).appendTo('body')

	getUserMedia(video);
	video.play()

	canvas = $("<canvas>", {
			id: "canvas",
			width: w,
			height: h}
	).appendTo("body")
	canvas.attr("width", w)
	canvas.attr("height", h)

	canvas = canvas[0]

	ctx       = canvas.getContext("2d")
	param     = new FLARParam(w, h)
	raster    = new NyARRgbRaster_Canvas2D(canvas)
	detector  = new FLARMultiIdMarkerDetector(param, 80)
	detector.setContinueMode(true)
	resultMat = new NyARTransMatResult()
}

function loadImg() {
	img = new Image()
	img.src = 'markers/0'// + toInt(Math.random() * 100).toString()
	img.width = w
	img.height = h
}
/////////////////////////////
function render() {
	//canvas.drawRect({x: 0, y: 0});

	var dt = new Date().getTime()
	ctx.drawImage(video, 0, 0, w, h)
	canvas.changed = true

	var detect_count = detector.detectMarkerLite(raster, 80)
	if (detect_count > 0) console.log(detect_count)
	for(var idx = 0; idx < detect_count; ++idx) {
		var id = detector.getIdMarkerData(idx)

		// read data from i_code via Marsia--Marshal bla bla bla
		var currId;
		if (id.packetLength > 4) {
			currId = -1
		} else {
			currId = 0

			for(var i = 0; i < id.packetLength; ++i) {
				currId = (currId << 8) | id.getPacketData(i)
			}
		}

		detector.getTransformMatrix(idx, resultMat)

		ctx.save()
			ctx.translate(150, 150)
			var sc = 940 / resultMat.m23
			ctx.scale(sc, sc)
			ctx.transform(resultMat.m00, resultMat.m01, -resultMat.m10, -resultMat.m11, resultMat.m03*3/4, resultMat.m13*3/4)
			ctx.fillStyle = 'red'
			ctx.fillRect(-26, -26, 53, 53)
			ctx.fillText(currId.toString(), -24, 24)
			ctx.fillRect(-26, -26, 53, 53)
			ctx.fillText(currId.toString(), -24, 24)
		ctx.restore()
	}
}

/*********************
 * EVENTS
 ********************/
function onLoad() {
	init()
	loadImg()

	setInterval(render, 16)
}

