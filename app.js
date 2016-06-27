var tabs = require("sdk/tabs");
var self = require('sdk/self');
var data = self.data;
var prefsService = require('sdk/preferences/service');

console.log("loaded app.js");

tabs.on('open', function(tab) {
    if (tab.url === 'about:newtab') {
        inject(tab);
    } else if(tab.url === 'resource://funkymushroom/data/bg.html') {
        console.log("attaching scripts");
        attachScripts(tab);
    }
});
tabs.on('ready', function(tab) {
    if (tab.url === 'about:newtab') {
        inject(tab);
    } else if(tab.url === 'resource://funkymushroom/data/bg.html') {
        console.log("attaching scripts");
        attachScripts(tab);
    }
});
for (let tab of tabs) {
    if (tab.url === 'about:newtab') {
        inject(tab);
    } else if(tab.url === 'resource://funkymushroom/data/bg.html') {
        console.log("attaching scripts");
        attachScripts(tab);
    }
}

function inject(tab) {
    console.log("tab loaded: " + tab);
    tab.url = data.url("./bg.html");
}

function attachScripts(tab) {
    tab.attach({
        contentScriptFile: [data.url('./content.js'), data.url('./secret.js')],
        contentStyleFile: data.url('./style.css'),
        contentScriptOptions: {
            //img: data.url('content_script/refresh.png'),
            newtabpage: prefsService.get('browser.newtabpage.enabled')
        }
    });
}

function workMagic(tab) {
    console.log("Trying to create a tab");
    chrome.tabs.update(tab.id, {
        url: 'bg.html',
        active: true
    });
    console.log("Created a tab");
}

function processResult(result) {
    console.log("This is the result: " + result);
}

function backgroundScriptListener(tabId, changeInfo, tab) {
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
};