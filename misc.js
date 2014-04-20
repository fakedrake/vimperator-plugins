

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

function open_in_editor(text, file_tag) {
    var fname = "/tmp/firefox-" + file_tag + "-" + new Date().getTime();
    var envsrv = Cc["@mozilla.org/process/environment;1"].
	    createInstance(Ci.nsIEnvironment);
    var cmd = ((envsrv.get("EDITOR") || default_editor) + " " + fname);

    my_write(fname, text);
    my_async_execute(cmd);
}


function content_in_editor(elem) {
    open_in_editor(elem.textContent);
}

// Remove history and search bar which tend to open.
function clear_xul() {
    try {toggleSidebar();} catch(e) {};
    gFindBar.close();
}

hints.addMode('i', 'Jump to input',
	      function (e) buffer.focusElement(e),
	      function () util.makeXPath(["input[not(@type='hidden')]", "textarea"]));


// Copy code block
hints.addMode('c', "Code block in editor.",
	      content_in_editor,
	      function () util.makeXPath(["code", "pre"]));

mappings.addUserMap(
    modes.all,
    ["<C-g>"],
    "This is a radical esc basically.",
    function () {
	buffer.shiftFrameFocus(1, true);
	modes.reset();
	clear_xul();
	liberator.echomsg("Focus to frame 1.");
    });
