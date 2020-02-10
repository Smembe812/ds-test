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
        .pipe(dest('./docs'))
}

function makeDocForCurrentFile(es){
    return es.map((file, cb) => {
        mark(file.path)
        return cb(null, file)
    })
}

async function mark(dir){
    try {
        const readData = await readFile(dir)

        const content = fm(readData)

        
        let {attributes: {template, code, name}, body} = content
        let cssCode, css;
        
        const something = "I've been parsed"
        template = await readFile(template)
        
        try {
            cssCode = await readFile(code.css)
            code.css = `${cssCode}`     
        } catch (error) {
            cssCode = null
            code.css = ''
        }
        let evalBody = eval('`'+body+'`')
        
        const md = `\n${evalBody}`
        const newLine = `* [${name}](${name}.md)`

        try {
            const mdFile = await writeMD(`./docs/${name}.md`, md)  
            const lines = await reader('./docs/_sidebar.md', 'utf8')

            //find if line already exists
            const linesArray = lines.split('\n')
            const findLine = linesArray.filter((aLine) => newLine === aLine)

            //append new line if new component
            const append = findLine < 1 ? await appender('./docs/_sidebar.md', `\n${newLine}`) : ''
        } catch (error) {
            throw error
        }
    } catch (error) {
        throw error
    }
}

async function writeMD(dir, content){
    try {
        return await writer(dir, content)
    } catch (error) {
        return Promise.reject(error)
    }
}


async function readFile(dir){
    try {
        const content = await reader(dir, 'utf8')
        return content
    } catch (error) {
        return error
    }
}