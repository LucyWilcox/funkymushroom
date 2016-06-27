window.images = [];
window.index = 0;

window.addEventListener("load", getImages);
document.body.addEventListener("click", getImage);
window.addEventListener("message", function(event) {
	if (event.data.caller === "content.js") {
		console.log(event);
		console.log(event.data);
		console.log(event.data.images);
		window.images = event.data.images;
		getImage();
	}
}, false);

function getImages(event) {
	window.postMessage({caller: "imageGetter"},
		"resource://funkymushroom");
}

function getImage() {
	if (window.index >= window.images.length) {
		console.log("Reached end of images, wrapping around");
		window.index = 0;
	}
	var img = window.images[window.index];
	console.log(img);
	document.body.style.backgroundImage = "url(" + img + ")"
	window.index++;
}