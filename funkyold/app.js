console.log("loaded the background script");

function workMagic(tab) {
	console.log("Trying to create a tab");
	chrome.tabs.update(tab.id, {
		url: 'bg.html',
		active: true
	});
	console.log("Created a tab");
}

chrome.tabs.onCreated.addListener(function(tab) {
	if (tab.url == "about:newtab") {
		workMagic(tab);
	}
});

function processResult(result) {
	console.log("This is the result: " + result);
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	console.log("attempting injection by background script");
	if (changeInfo.status == "complete") {
		if (tab.url == "moz-extension://f5d2aefe-ba35-4bbe-a1f5-e6267fb488d2/bg.html") {
			chrome.tabs.executeScript(null, {
				//code: 'document.body.style.border = "5px solid red";',
				file: '/content.js',
				matchAboutBlank: true,
				allFrames: true
			}, processResult);
		}
		console.log("successful injection by background script");
	}
});