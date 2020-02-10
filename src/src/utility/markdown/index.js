module.exports = {mark}

async function mark(dir){
    try {
        const readData = await reader(dir, 'utf8')
        const content = fm(readData)
        
        let {attributes: {template, code, name}, body} = content
        let cssCode, css;
        
        // ${template} from component.doc.md
        template = await reader(template, 'utf8')
        
        try {
            // ${code.css} from component.doc
            cssCode = await reader(code.css, 'utf8')
            code.css = `${cssCode}`     
        } catch (error) {
            cssCode = null
            code.css = ''
        }

        //evaluate ${code.css}, ${template}, ${code.js} from component.doc.md file
        let evalBody = eval('`'+body+'`')
        const docMDContent = `\n${evalBody}`
        
        try {
            // generate component.md file
            const newLine = `* [${name}](${name}.md)`
            return await makeDocFile({name, newLine, docMDContent})

        } catch (error) {
            throw error
        }

    } catch (error) {
        throw error
    }
}

async function makeDocFile({name, newLine, docMDContent}){
    try {
        // make component.md file
        const MDdocFile = await writer(`./docs/${name}.md`, docMDContent)

        // append new line for component in _sidebar.md
        const lines = (await reader('./docs/_sidebar.md', 'utf8')).split('\n')
        const _sidebar = await update_sidebarMD(lines, newLine)

        return {MDdocFile, _sidebar}
        
    } catch (error) {
        return Promise.reject(error)
    }
}

async function update_sidebarMD(lines, newLine){
    const findLine = lines.filter((aLine) => newLine === aLine)

    if (findLine < 1 ) {
        try {
            return await appender('./docs/_sidebar.md', `\n${newLine}`)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
