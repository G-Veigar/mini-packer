const fs = require('fs')
const path = require('path')

const bootTemplatePath = path.resolve(__dirname, './boot-template.js')
// boot函数模板
const bootTemplate = fs.readFileSync(bootTemplatePath, 'utf-8')

// 根据依赖图生成boot函数并输出文件
module.exports = function(modules) {
    // 最终输出的内容
    let output
    // 主入口模块id
    output = bootTemplate.replace('<% entry %>', modules[0].id)
    // 所有打包的模块map
    output = output.replace('<% modules %>', JSON.stringify(modules)) 
    // 输出
    const outputPath = path.resolve(__dirname, '../dist/output.js')
    fs.writeFileSync(outputPath, output)
}