var flow = require('flow-bin'),
    ex = require('child_process').execFile,
    fs = require('fs');

var running = false;

var initFlow = function () {
    ex(flow, ['init']);
};

module.exports = {
    start: function () {
        if (!fs.existsSync('./.flowconfig')) {
            initFlow();
        }

        ex(flow, ['start'], function () {
            running = true;
        });
    },
    check: function () {
        if (!fs.existsSync('./.flowconfig')) {
            initFlow();
        }
        
        if (running) {
            ex(flow, function (err, stdout, stderr) {
                console.log(stdout);
            });
        } else {
            console.log('starting and checking');
            ex(flow, ['check'], function (err, stdout, stderr) {
                console.log(stdout);
            });
        }
    },
    stop: function () {
        ex(flow, ['stop'], function () {
            running = false;
        });
    }
};
