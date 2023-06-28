一个基于React18和Express的SSR服务端渲染项目

# dependency
webpack:
  webpack webpack-cli webpack-merge webpack-node-externals copy-webpack-plugin
babel:
  @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/runtime @babel/plugin-transform-runtime
react18:
  react react-dom react-router react-redux @reduxjs/toolkit
  @types/react @types/react-dom
css:
  css-loader sass sass-loader postcss postcss-loader postcss-preset-env mini-css-extract-plugin css-minimizer-webpack-plugin
js:
  terser-webpack-plugin
http:
  axios
system: 
  cross-env dotenv
node:
  express
  @types/express

# 业务需求
购物
toC前端：注册、登录，个人信息维护，商品信息展示、搜索，下单，订单管理
toB前端：管理员登录，用户管理，维护商品信息，订单信息展示

# 构建
