CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth) {
    var lines = String(text).split("\n");
    var lineHeight = this.measureText("M").width*1.2;

    for (var i = 0; i < lines.length; i++) {

        var words = lines[i].split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = this.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                this.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        this.fillText(line, x, y);
        y += lineHeight;
    }
};

HTMLCanvasElement.prototype.saveAsImage = function (destFile) {
    // convert string filepath to an nsIFile
    var file = Components.classes["@mozilla.org/file/local;1"]
            .createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath(destFile);

    // create a data url from the canvas and then create URIs of the source and targets
    var io = Components.classes["@mozilla.org/network/io-service;1"]
            .getService(Components.interfaces.nsIIOService);
    var source = io.newURI(this.toDataURL("image/png", ""), "UTF8", null);
    var target = io.newFileURI(file);

    // prepare to save the canvas data
    var persist = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"]
            .createInstance(Components.interfaces.nsIWebBrowserPersist);

    persist.persistFlags = Components.interfaces.nsIWebBrowserPersist.PERSIST_FLAGS_REPLACE_EXISTING_FILES;
    persist.persistFlags |= Components.interfaces.nsIWebBrowserPersist.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION;

    // save the canvas data to the file
    persist.saveURI(source, null, null, null, null, file, null);
};

function save_meme (imgURI, caption, destFile) {
    var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = imgURI;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img,0,0);
    ctx.fillStyle = '#fff';
    ctx.font = 'italic bold 30px sans-serif';
    ctx.textBaseline = 'bottom';

    ctx.wrapText(caption, 10, 50, canvas.width-10);

    canvas.saveAsImage(destFile);
}

function memegen(imgURI, caption) {
    alert(caption);
    var destFile = "~/Pictures/" + (String(caption).replace(" ",  "_")) + ".png";

    save_meme(imgURI, caption, destFile);
    liberator.echomsg("Saved to " + destFile);
}

commands.addUserCommand(
    ['genmeme'],
    'Set a caption to the top of a picture.',
    function(caption) { memegen(buffer.URL, caption); },
    { count: true, argCount: "1"},
    true
);
