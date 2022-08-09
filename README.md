#### 技术栈: 
  - Vue3 TypeScript Vue-Router Axios Element-plus Vite

#### 功能: 
  登录: JWT + localStorage 前端验证 
  用户信息展示与修改 用户权限展示与变更
  商品信息展示 商品参数添加与修改 商品分类管理 
  订单物流信息展示 数据统计

#### 优化:
  - 用户体验优化: 合理的弹窗提示, 错误提示等
  - 开发优化: 分模块(网络请求, 路由, 工具函数等), 重构代码
  - 打包优化: Element-plus Icons 按需引入, 分包(rollup, rollup-plugin-visualizer)
  - 代码压缩(gzip 使单个文件体积减少 50% 以上)

#### 部署:
  - Docker(NodeJS): 后台服务
  - Docker(MariaDB): 数据库
  - Docker(Nginx): 升级 HTTPS, 开启 gzip 等
