var yatzee_py = "/home/fakedrake/bin/py/bin/python /home/fakedrake/bin/yatzee.py";
// Update links with
// /home/fakedrake/bin/py/bin/python /home/fakedrake/bin/yatzee.py > /home/fakedrake/bin/yazee_links.txt
var yazee_links = "/home/fakedrake/bin/yazee_links.txt";

function inner_link(elem)
{
    var url = elem.previousElementSibling.href;
    var title = elem.innerHTML;
    elem.innerHTML = '<a href="'+url+'">' + title +"</a>";
}

function titles_to_links() {
    var titles = content.document.wrappedJSObject.getElementsByClassName("title");
    for (var i = 0; i < titles.length; i++) {
	inner_link(titles[i]);
    }
}

function oldest_escapist() {
    var h = yatzee_history();
    var u = yatzee_all().filter(function (i) {return h.indexOf(i) < 0;});
    var ret = u.concat(h);

    liberator.echomsg("Unwatched("+u[0]+"): "+u.length+", History("+h[0]+"): "+h.length+ ", All: "+ret.length);
    liberator.open(ret[0]);
//     return liberator.open(history.get("zero-punctuation/", 500).pop().url);
}

function yatzee_history() {
    return history.get("zero-punctuation/", 500).reverse().map(function(x) x.url);
}

function yatzee_all() {
    return io.File(yazee_links).read().split("\n");
}

commands.addUserCommand(
    ['escapistlinks'],
    'Turn titles to links.',
    function() { titles_to_links(); }
);


commands.addUserCommand(
    ['oldestzeropunction'],
    'Open the oldes zero punctuation video in history.',
    function () {oldest_escapist();}
);
