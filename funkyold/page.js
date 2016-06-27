chrome.runtime.onMessage.addListener(function(request, sender, response) {
	if (request.action == "fuckme") {
		document.body.style.border = "10px solid red";
	}
})

window.addEventListener("load", getImages);
document.body.addEventListener("click", function(event) {
	getImage();

	console.log("pagescript: clicked the body");
	window.postMessage({
		direction: "fromBody",
		message: "yo what's good"
	}, "*");
	notifyExtension(event);
});

window.addEventListener("message", function(event) {
	console.log("I got something: " + event.data.message);
});

function notifyExtension(e) {
  console.log("page script sending message to runtime");
  chrome.runtime.sendMessage({"url": e});
	}



globalResponse = "";
images = [];
index = 0;


function getImages() {
	console.log("Let's get the images");
}

function getImage() {
	if (index >= images.length) {
		console.log("Reached end of images, wrapping around");
		index = 0;
	}
	console.log("i tried to get image");
}