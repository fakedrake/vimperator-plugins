function Facebook () {

    return {
	cmd_map: {
	    notifications: facebook.toggle_notifications,
	    messages: facebook.toggle_messages
	},

	_toggle_jewel: function(name) {
	    buffer.followLink(content.document.getElementsByName(name)[0]);
	},

	toggle_notifications: function() {
	    facebook._toggle_jewel("notifications");
	},

	toggle_messages: function() {
	    facebook._toggle_jewel("messages");
	},

	_execute: function(args){
	    var name = args.length ? args.shift() : 'notifications';
	    if (typeof facebook.cmd_map[name] == 'undefined'){
		liberator.echoerr('Unsupported facebook command: ' + name);
		return false;
	    }
	    return facebook.cmd_map[name](args, args.count > 1 ? args.count : 1);
	},

	_completer: function(context){
	    context.completions = [[c, ''] for each (c in Object.keys(facebook.cmd_map))];
	}
    };
}

var facebook = new Facebook();

commands.add(['facebook'],
	     'Control facebook from within vimperator.',
	     function(args) { facebook._execute(args); },
	     { count: true, argCount: '*', completer: facebook._completer }
	    );

liberator.echomsg(typeof facebook.cmd_map['notifications']);
