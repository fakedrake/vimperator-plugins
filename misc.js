hints.addMode('i', 'Jump to input',
	      function (e) buffer.focusElement(e),
	      function () util.makeXPath(["input[not(@type='hidden')]", "textarea"]));

mappings.addUserMap(
    modes.all,
    ["<C-g>"],
    "This is a radical esc basically.",
    function () {
	buffer.shiftFrameFocus(1, true);
	modes.reset();
	liberator.echomsg("Focus to frame 1.");
    });
