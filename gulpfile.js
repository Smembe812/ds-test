const {task, src, dest, parallel} = require("gulp")
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const sass = require('gulp-sass')

task("default", testDefault)

task("compile:css", css)

/**
 * Return promise so gulp knows task is finished
 */
function testDefault() {
    console.log("default task")
    return Promise.resolve() 
}

/**
 * Build component css, library css, minified library css
 */
function css() {
    return src('./src/components/*/*.scss', {base: './src/components'})
        .pipe(sass())
        //build component css
        .pipe(dest('./dist/components'))

        //build library css
        .pipe(concat('style.css'))
        .pipe(dest('./dist/build/'))

        //build minified library css
        .pipe(concat('style.min.css'))
        .pipe(minifyCSS())
        .pipe(dest('./dist/build/'))
}