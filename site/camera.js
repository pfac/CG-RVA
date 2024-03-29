/**
 * @author RVA
 */
function uniGetUserMedia (type, onSuccess, onError) {
	if (navigator.getUserMedia)
		return navigator.getUserMedia(type, onSuccess, onError);
	else if (navigator.webkitGetUserMedia)
		return navigator.webkitGetUserMedia(type, onSuccess, onError);
	else if (navigator.mozGetUserMedia)
		return navigator.mozGetUserMedia(type, onSuccess, onError);
	else if (navigator.msGetUserMedia)
		return navigator.msGetUserMedia(type, onSuccess, onError);
	else
		onError(new Error("No getUserMedia implementation found. Didn't you forget a flag or something like that?"));
}



function getUserMedia(element) {
	var URL = window.URL || window.webkitURL;
	var createObjectURL = URL.createObjectURL || webkitURL.createObjectURL;
	
	if (!createObjectURL)
		throw new Error("URL.createObjectURL not found.");
	
	var onUserMediaSuccess = function (stream) {
		console.log ("User has granted access to local media.");
		var url = createObjectURL(stream);
		console.log("Stream URL: "+url);
		element.src = url;
	};
	
	var onUserMediaError = function (error) {
		var message = "Failed to get access to local media. Error code was " + error.code;
		console.log(message);
		alert(message);
	}
	
	try {
		uniGetUserMedia({audio:false, video:true}, onUserMediaSuccess, onUserMediaError);
		console.log("Requested access to local media with new syntax.");
	} catch (e) {
		try {
			uniGetUserMedia("video", onUserMediaSuccess, onUserMediaError);
			console.log("Requested access to local media with old syntax.");
		} catch (e) {
			alert ("webkitGetUserMedia() failed. Is the MediaStream flag enabled in about:flags?");
			console.log ("webkitGetUserMedia failed with exception: " + e.message);
		}
	}
}
