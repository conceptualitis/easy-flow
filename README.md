Easy Flow
=========

Easy Flow allows you to simply integrate [Facebook's Flow](http://flowtype.org/) with your task runners (like Gulp).

## Install
`npm install easy-flow`

## Sample task
```js
var flow = require('easy-flow');

gulp.task('build', function (cb) {
  flow.check(cb); // passing the callback for gulp isn't necessary, but makes the output prettier
});

// or a watch task, which will set up the utilize the Flow server
gulp.task('flow', function (cb) {
  flow.check(cb)
});

gulp.task('watch', function () {
  flow.start();
  gulp.watch('./src/file.js', ['flow']);
});
```
