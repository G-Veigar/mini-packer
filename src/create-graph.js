const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const path = require('path')

// const entryDir = path.resolve(__dirname, '../example')
// const entryPath = path.resolve(__dirname, '../example/index.js')

// 模块id
// let ID = 0

// 创建函数依赖
function createAsset(filePath) {
    let dependencies = []
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    // 将代码解析成AST
    let Ast = parser.parse(fileContent, {
        sourceType: 'module'
    })
    // 从AST中找到所有的import语句，收集依赖
    traverse(Ast, {
        ImportDeclaration: ({node}) => {
            let file =node.source.value
            dependencies.push(file)
        }
    })
    // 根据AST转换代码，如模块语法兼容，babel处理，或者其他plugin处理
    // const code = transformFromAst(ast)
    const code = fileContent

    return {
        id: filePath,   // 模块id，标识一个唯一的模块
        fileName: filePath, // 模块的绝对文件路径
        dependencies,   // 当前模块的依赖数组，数组项是依赖的相对路径，相对于当前模块
        code,   // 模块代码
        mapping: {} // 用于保存依赖关系的对象
    }
}

// 创建依赖图
module.exports = function(entry) {
    let entryAsset = createAsset(entry)
    let queue = [entryAsset]
    queue.forEach(asset => {
        // 当前模块所在的目录.
        const dirname = path.dirname(asset.fileName)
        asset.dependencies.forEach(depRelativePath => {
            // 获取依赖模块的文件路径
            const depAbsolutePath = path.join(dirname, depRelativePath)
            // 获取到依赖模块的asset对象
            const depAsset = createAsset(depAbsolutePath)
            // asset的mapping依赖表更新依赖关系
            asset.mapping[depRelativePath] = depAsset.id;
            queue.push(depAsset)
        })
    })
    return queue
}

