self.port.on("setup", function(payload) {
	console.log("App port says: Getting images " + payload);
	getImages();
});

window.addEventListener('message', function(message) {
	if (!message.data.hasOwnProperty("caller")) {
		return;
	}
	console.log("Content received a message: " + Object.keys(message.data));

	if (message.data.caller === "locate") {
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
				//console.log("Found " + post.photos.length + " photos");
				var url = post.photos[0].original_size.url;
				//console.log(url);
				images.push(url);
			}
		}
		window.postMessage({
				"images": images,
				"command": "getImages"
			},
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
		currIndex = indexResponse.currid;
		console.log(currIndex);
		window.postMessage({
				"currIndex": currIndex,
				"command": "getIndex"
			},
			"resource://funkymushroom");
	}
	xhr.send();
}

function setIndex(currIndex) {
	console.log('Setting index to ' + currIndex);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", hurl);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(JSON.stringify({
		'newid': currIndex++
	}));
	getIndex();
}