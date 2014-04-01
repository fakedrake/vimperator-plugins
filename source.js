// Copyright (c) 2014 by Chris Perivolaropoulos <cperivol@csail.mit.edu>
//
// Note that I actively tried to use as little vimperator specific
// stuff here as possible. Also this is different from the vimperator
// provided functionality in that it gets the current document
// source. It doesn't load it again.

let default_editor = "emacsclient";
let Ci = Components.interfaces;
let Cc = Components.classes;

function my_async_execute(command) {
    var executable = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
    executable.initWithPath("/bin/sh");
    var proc = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
    proc.init(executable);
    proc.run(false, ["-c", command], 2);
}

function my_write(fname, text) {
    var file = Cc["@mozilla.org/file/local;1"].
	    createInstance(Ci.nsILocalFile);
    file.initWithPath(fname);

    var ofstream = Cc["@mozilla.org/network/file-output-stream;1"].
	    createInstance(Ci.nsIFileOutputStream);

    ofstream.init(file, -1, -1, 0);
    ofstream.write(text, text.length);
    ofstream.close();
}

function open_source() {
    var fname = "/tmp/firefox-src-"+new Date().getTime();
    var mycontent = gBrowser.contentDocument.wrappedJSObject.documentElement.outerHTML;
    var envsrv = Cc["@mozilla.org/process/environment;1"].
	    createInstance(Ci.nsIEnvironment);
    var cmd = ((envsrv.get("EDITOR") || default_editor) + " " + fname);

    my_write(fname, mycontent);
    my_async_execute(cmd);
}

commands.addUserCommand(
    ['externalsource'],
    'Open current source in external editor.',
    function() { open_source(); },
    { count: true, argCount: "0"},
    true
);

mappings.addUserMap(
    config.browserModes,
    ["gF"],
    "Open source in external editor.",
    function () open_source()
);
