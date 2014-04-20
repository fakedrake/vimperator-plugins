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

commands.addUserCommand(
    ['escapistlinks'],
    'Turn titles to links.',
    function() { titles_to_links(); }
);
