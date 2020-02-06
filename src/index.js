var fs = require('fs')
  , fm = require('front-matter')

const util = require('util');
const reader = util.promisify(fs.readFile);

mark('../docs/with-front-matter.md')

async function mark(dir){
    try {
        const readData = await readFile(dir)

        const content = fm(readData)

        const {attributes: {template, code}, body} = content
        let cssCode, css;
        
        try {
            cssCode = await readFile(code.css)
            css = `~~~css
${cssCode}
`     
        } catch (error) {
            cssCode = null
            css = ''
        }

        const md = `
${body}

~~~html
${template}
~~~

~~~js
${code.js}
~~~

${css}
`

        console.log(md, content)
        writeMD('../docs/gen.md', md)      
    } catch (error) {
        console.log(error)
    }
}

function writeMD(dir, content){
    fs.writeFile(dir, content, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}


async function readFile(dir){
    try {
        const content = await reader(dir, 'utf8')
        return content
    } catch (error) {
        return error
    }
}