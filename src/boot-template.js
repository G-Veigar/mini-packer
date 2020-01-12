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
    _require_('<% entry %>')
})({
    <% modules %>
})