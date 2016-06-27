window.addEventListener('message', function(message) {
	console.log(message);
	if (message.data.caller === "setup") {
		getImages();
		getIndex();
	} else if (message.data.caller === "flip") {
		console.log("Flip to the next image from " + url);
		setIndex(message.data.currIndex);
	}
	
});

function getImages() {
	console.log("Let's get the images from " + url);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.responseType = "json";
	xhr.onload = function(e) {
		var responseJson = this.response;
		var images = [];
		console.log(responseJson);
		for (let post of responseJson.response.posts) {
			if (post.photos) {
				console.log("Found " + post.photos.length + " photos");
				var url = post.photos[0].original_size.url;
				console.log(url);
				images.push(url);
			}
		}
		window.postMessage({
			"images": images,
			"command": "getImages"},
			"resource://funkymushroom");
	};
	xhr.send();
}

function getIndex() {
	console.log('Getting index');
	var xhr = new XMLHttpRequest();
	xhr.open("GET", hurl);
	xhr.responseType = "json";
	xhr.onload = function(e) {
		console.log(this.response);
		indexResponse = this.response;
		currIndex = indexResponse.currid[0].currid;
		console.log(currIndex);
		window.postMessage({
			"currIndex": currIndex,
			"command": "getIndex"},
			"resource://funkymushroom");
	}
	xhr.send();
}

function setIndex(currIndex) {
	console.log('Setting index to ' + currIndex);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", hurl);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(JSON.stringify({'newid': currIndex++}));	
	getIndex();
}