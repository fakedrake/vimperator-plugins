function VimperatorTabNotifier () {
}

VimperatorTabNotifier.prototype = {
    tnh: TabNotifier.helper,
    default_cmd: "kill-all",

    cmd_map: function() {
	return {"kill-all": this.kill_all_notifications};
    },

    kill_all_notifications: function () {
	TabNotifier.helper.cancelAllNotifications();
    },

    _execute: function(args){
	var name = args.length ? args.shift() : this.default_cmd;
	var cmd = this.cmd_map()[name];
	if (!cmd){
            liberator.echoerr('Unsupported tabnotifier command: ' + name);
            return false;
	}
	return cmd(args, args.count > 1 ? args.count : 1);
    },

    _completer: function(context) {
	var commands = Object.keys(this.cmd_map());
	context.completions = [[c, ''] for each (c in commands)];
    }
};

commands.addUserCommand(['tabnotifier'],
  'Control TabNotifier from within vimperator.',
  function(args) { (new VimperatorTabNotifier)._execute(args); },
  { count: true, argCount: '*', completer: (new VimperatorTabNotifier)._completer }
);
