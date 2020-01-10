// boot是一个立即执行函数
// TODO: 兼容ES module和commonJS 的方式
(function(modules) {
    // 保存引入过的模块对象
    let installedModuleMap = {}
    // 定义模块引入函数require - 引入模块并执行模块
    function _require_(moduleId) {
        // 模块只执行一次
        if(installedModuleMap[moduleId]) return installedModuleMap[moduleId].exports
        let currentModule = installedModuleMap[moduleId] = {
            exports: {}
        }
        // 模块执行函数
        let moduleFun = modules[moduleId]
        moduleFun.call(currentModule, currentModule.exports, _require_)
        return currentModule.exports
    }
    // 执行入口文件
    _require_('index.js')
})({
    'index.js': function(_exports_, _require_) {
        // import a from './utils/a.js'
        // let b = require('./utils/b.js')
        // console.log(a, b)

        let a = _require_('./utils/a.js').default
        _require_('./utils/a.js')
        let b = _require_('./utils/b.js').b
        console.log(a, b)
    },
    './utils/a.js': function(_exports_, _require_){
        // let a = 'module a'
        // export default a

        let a = 'module a'
        _exports_.default = a
    },
    './utils/b.js': function(_exports_, _require_){
        // exports.b = 'module b'

        _exports_.b = 'module b'
    }
})