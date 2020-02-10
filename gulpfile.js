const {task, src, dest, parallel} = require("gulp")
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const sass = require('gulp-sass')

const {log} = require('gulp-util');


const fs = require('fs')
  , fm = require('front-matter')

const util = require('util');
const reader = util.promisify(fs.readFile);
const writer = util.promisify(fs.writeFile)
const appender = util.promisify(fs.appendFile)

const es = require('event-stream');

const {markdown} = require('./src/utility')

task("default", testDefault)

task("compile:css", css)

task('compile:html', html);

task('compile:docs', doc)

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
    return src('./src/components/*/*.scss')
        .pipe(sass())
        //build component css
        .pipe(dest('./dist/css/components/'))

        //build library css
        .pipe(concat('style.css'))
        .pipe(dest('./dist/css/'))

        //build minified library css
        .pipe(concat('style.min.css'))
        .pipe(minifyCSS())
        .pipe(dest('./dist/css/'))
}

function html(){
    const templateData = {
        firstName: 'Kaanon'
    },
    options = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
        partials : {
            footer : '<footer>the end</footer>'
        },
    }
    
    return src('./src/components/*/*.hbs', {base: './'})
        .pipe(handlebars(templateData, options))
        .pipe(rename((path) => {
            //rename to component-name.html
            path.basename = path.basename.split('.')[0]
            path.extname = `.html`
        }))
        .pipe(dest('./'))
}

function doc(){
    return src('./src/components/**/*doc.md')
        .pipe(makeDocForCurrentFile(es))
}

function makeDocForCurrentFile(es){
    return es.map(async (file, cb) => {
        const docFile = await markdown(file.path)
        return cb(null, file)
    })
}