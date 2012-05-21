/**
 * @author RVA
 */
function getUserMedia () {
	try {
		navigator.webkitGetUserMedia({audio:false, video:true}, onUserMediaSuccess, onUserMediaError);
		console.log("Requested access to local media with new syntax.");
	} catch (e) {
		try {
			navigator.webkitGetUserMedia("video,audio", onUserMediaSuccess, onUserMediaError);
			console.log("Requested access to local media with old syntax.");
		} catch (e) {
			alert ("webkitGetUserMedia() failed. Is the MediaStream flag enabled in about:flags?");
			console.log ("webkitGetUserMedia failed with exception: " + e.message);
		}
	}
}

/******************************************
 * Events
 */
function onUserMediaSuccess (stream) {
	console.log ("User has granted access to local media.");
	var url = webkitURL.createObjectURL(stream);
	webcam.src = url;
}

function onUserMediaError (error) {
	var message = "Failed to get access to local media. Error code was " + error.code;
	console.log(message);
	alert(message);
}
