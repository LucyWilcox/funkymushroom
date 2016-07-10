var tabs = require("sdk/tabs");
var self = require('sdk/self');
var pageMod = require("sdk/page-mod");
var data = self.data;
var prefsService = require('sdk/preferences/service');

console.log("loaded app.js");

pageMod.PageMod({
    include: "resource://funkymushroom/*",
    contentScriptFile: [data.url('./content.js'), data.url('./secret.js')],
    contentStyleFile: data.url('./style.css'),
    onAttach: function(worker) {
        worker.port.emit("setup");
    }
});

tabs.on('open', function(tab) {
    inject(tab);
});

tabs.on('ready', function(tab) {
    inject(tab);
});

function inject(tab) {
    if (tab.url === 'about:newtab') {
        console.log("tab loaded: " + Object.keys(tab));
        tab.url = data.url("./bg.html");
    }
}