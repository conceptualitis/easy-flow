var flow = require('flow-bin'),
    ex = require('child_process').execFile,
    fs = require('fs');

var running = false;

var flowInit = function () {
    if (!fs.existsSync('.flowconfig')) {
        ex(flow, ['init']);
    }
};

var ezflow = {
    watch: function () {
        flowInit();

        process.stdin.resume();
        process.on('SIGINT', function () {
            ezflow.stop();
            process.exit();
        });

        ex(flow, ['start'], function () {
            running = true;
        });
    },
    check: function (next) {
        var cmds = [];

        flowInit();

        if (!running) cmds.push('check');

        ex(flow, cmds, function (err, stdout, stderr) {
            console.log(stdout);
            next();
        });
    },
    stop: function () {
        ex(flow, ['stop'], function () {
            running = false;
        });
    }
};

module.exports = ezflow;
