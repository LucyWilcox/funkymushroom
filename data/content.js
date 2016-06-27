window.addEventListener('message', function(message) {
	console.log(message.data);
	console.log(message.origin);
	console.log(message);
	if (message.data.caller === "imageGetter") {
		console.log("Let's get the images from " + url);
		getImages();
	} else if (message.data.caller === "imageFlipper") {
		console.log("Flip to the next image from " + url);
	}
	
});

function getImages() {
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
				images.push(url)
			}
		}
		window.postMessage({
			"images": images,
			"caller": "content.js"},
			"resource://funkymushroom");
	};
	xhr.send();
}



/*
document.body.addEventListener("click", function(event) {
	console.log("Send click message from content to page");
});

window.addEventListener("message", function(event) {
	alert("Content: I got something: " + event.data.message);
});
*/