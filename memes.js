function snippet_replace(memes_py) {
    let elem = liberator.focus;

    // Get the previous word if there is no selection
    if (!editor.selectedText()) {
	elem.setSelectionRange(editor.findCharBackward(' ', 1) + 1, elem.value.length)
    }

    let name = editor.selectedText().replace(/ /gm, "_");

    if (!name) {
	liberator.echomsg("No snippet...");
	return;
    }

    let command = memes_py + " " + name;
    let url = io.system(command);

    if (url != "No meme found.") {
	// (91) lol  : lol.com
	let match = /\(([0-9]+)\)\s*(.*?)\s*:\s+(.*)/g.exec(url)
	let cert = match[1];
	let key = match[2]
	url = match[3];
	selection_replace(elem, url);
	liberator.echomsg("'" + name + "' -> '" + url +"' certainty: " + cert + "%, key: '" + key +"'. C-z to undo.");
    } else {
	liberator.echomsg("Nothing suitable for: " + name);
	return;
    }
}

function range_replace(elem, text, start, end) {
    let curTop = elem.scrollTop;
    let curLeft = elem.scrollLeft;

    let before = elem.value.substring(0, start);
    let mid = text;
    let after = elem.value.substring(end);
    elem.value = before + mid + after;

    cur = (before + mid).length;
    elem.setSelectionRange(cur, cur);

    elem.scrollTop = curTop;
    elem.scrollLeft = curLeft;
}

function selection_replace(elem, text) {
    range_replace(elem, text, elem.selectionStart, elem.selectionEnd);
}

function meme_save(name, url, memes_py) {
    io.system(memes_py + " " + name + " " + url);
}

mappings.add(
    [modes.INSERT, modes.TEXTAREA],
    ["<C-m>"],
    "Replace selection with snippet.",
    function () {snippet_replace("~/bin/memes.py");});

commands.addUserCommand(
    ['meme'],
    'Add a meme with memes.py.',
    function(name) { meme_save(name, buffer.URL, "~/bin/memes.py"); },
    { count: true, argCount: "1"},
    true
);
