const presets = [
  [
    '@babel/preset-env', // 可以简写成 'env' 或 '@babel/env'
    {
      targets: {
        node: 'current',
      },
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
];

// preset 对code进行语法层面转换
// polyfill (core-js) 对code进行api层面转换
// 两者互为补充

// babel为什么存在polyfill (core-js):
// 因为babel的转译只是语法层次的转译，例如箭头函数、解构赋值、class，对一些新增api以及全局函数
// 例如：Promise 无法进行转译，这个时候就需要在代码中引入babel-polyfill (core-js)，让代码完美支持ES6+环境

const plugins = [
  // 让 Babel 在编译中复用辅助函数，从而减小打包文件体积, 用到的辅助函数都从 @babel/runtime 中去加载
  '@babel/plugin-transform-runtime',
  '@babel/plugin-proposal-class-properties', // 添加类属性支持
];

module.exports = { presets, plugins };
