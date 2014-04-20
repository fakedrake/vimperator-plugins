// Save the latest image on imgur and post the link

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

function imgur_replace(imgur_py) {
    let elem = liberator.focus;
    let title = editor.selectedText();
    let command = imgur_py + " \"" + title+ "\"";
    let sed_cmd = " | sed -n 's/URL: \\(.*\\)/\\1/p'";

    url = io.system(command + sed_cmd);
    selection_replace(elem, url);
}


mappings.add(
    [modes.INSERT, modes.TEXTAREA],
    ["<A-i>"],
    "Latest image in Pictures with title selection.",
    function () imgur_replace("~/bin/imgur.py"));
