const bundle = require('./bundle')
const path = require('path')
const createGraph = require('./create-graph')

const entryPath = path.resolve(__dirname, '../example/index.js')

// 根据入口文件创建依赖图
const Graph = createGraph(entryPath)

bundle(Graph)