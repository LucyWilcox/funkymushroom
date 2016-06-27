var tabs = require("sdk/tabs");
var self = require('sdk/self');
var data = self.data;
var prefsService = require('sdk/preferences/service');

console.log("loaded app.js");

tabs.on('open', function(tab) {
    if (tab.url === 'about:newtab') {
        inject(tab);
    } else if(tab.url === 'resource://funkymushroom/data/bg.html') {
        attachScripts(tab);
    }
});
tabs.on('ready', function(tab) {
    if (tab.url === 'about:newtab') {
        inject(tab);
    } else if(tab.url === 'resource://funkymushroom/data/bg.html') {
        attachScripts(tab);
    }
});
for (let tab of tabs) {
    if (tab.url === 'about:newtab') {
        inject(tab);
    } else if(tab.url === 'resource://funkymushroom/data/bg.html') {
        attachScripts(tab);
    }
}

function inject(tab) {
    console.log("tab loaded: " + tab);
    tab.url = data.url("./bg.html");
}

function attachScripts(tab) {
    console.log("attaching scripts");
    tab.attach({
        contentScriptFile: [data.url('./content.js'), data.url('./secret.js')],
        contentStyleFile: data.url('./style.css')
    });
}