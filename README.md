# mini-packer

## 模块带包器解决了哪些问题

* 全局变量污染
    整个bootstrap函数也是一个立即执行函数，不污染全局
    模块最终被打包到成一个函数，所以不管是commonJs规范，还是ES module规范，最终都会被处理为浏览器支持的函数形式
* 管理模块依赖
    所有的依赖根据依赖关系被打包到输出中