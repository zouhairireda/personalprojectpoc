var gulp = require('gulp');
var browserSync = require('browser-sync').create();
//var uglify = require('gulp-uglify');
//var concat = require('gulp-concat');
//var environments = require('gulp-environments');

//var development = environments.development;
//var production = environments.production;
/** load config file based on enviroment */
//var configFile = production() ? "./src/env/prod.js" : "./src/env/dev.js";

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public",
			// The key is the url to match
			// The value is which folder to serve (relative to your current working directory)
			routes: {
				"/node_modules": "node_modules"
			}
        },
		browser:"firefox"
    });
});

gulp.task('serve', ['browser-sync'], function() {
	gulp.watch("./public/**/*.*").on('change', browserSync.reload);
});