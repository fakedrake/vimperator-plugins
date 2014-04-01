Cu.import("resource://gre/modules/devtools/dbg-server.jsm");

function set_remote_debug(torf) {
    user_pref("devtools.debugger.remote-enabled", true);
    DebuggerServer.init();
    DebuggerServer.openListener(6000);
}
