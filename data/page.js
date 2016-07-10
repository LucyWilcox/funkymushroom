window.images = [];
window.currIndex = 0;
/*
On tab load, ask content script to grab images and index
Then, display the desired image
*/

// On click, ask content script to increment the index
document.body.addEventListener("click", function(event) {
	window.postMessage({
			caller: "flip",
			currIndex: currIndex
		},
		"resource://funkymushroom");
});

// Listen to updates from content script
window.addEventListener("message", function(event) {
	if (!event.data.hasOwnProperty("command")) {
		return;
	}
	console.log("Page says: got event, data has keys " + Object.keys(event.data));
	if (event.data.command === "getImages") {
		window.images = event.data.images;
		window.postMessage({
				caller: "locate"
			},
			"resource://funkymushroom");
	} else if (event.data.command === "getIndex") {
		window.currIndex = event.data.currIndex;
		getImage();
	}
}, false);

function getImage() {
	if (window.currIndex >= window.images.length) {
		console.log("Reached end of images, wrapping around");
		window.currIndex = 0;
	}
	var img = window.images[window.currIndex];
	console.log(img);
	document.body.style.backgroundImage = "url(" + img + ")"
	window.currIndex++;
}