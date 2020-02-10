const {task, src, dest, parallel} = require("gulp")
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const sass = require('gulp-sass')
const es = require('event-stream');

const markdown = require("./src/utility/markdown")

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
 * Build component css, bundled css, minified bundles css
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

/**
 * compile component.html from component.hbs
 */
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

/**
 * build MD docs for Dosify.js from component.doc.md
 */
function doc(){
    return src('./src/components/**/*doc.md')
        .pipe(makeDocForCurrentFile(es))
}

function makeDocForCurrentFile(es){
    return es.map(async (file, cb) => {
        const docFile = await markdown(file.path)
        return cb(null, docFile)
    })
}