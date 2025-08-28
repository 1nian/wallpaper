# Wallpaper App

这是一个基于 UniApp 开发的壁纸应用，使用 Vue 3 和 TypeScript 构建。该应用允许用户浏览、预览和下载壁纸，具有分类筛选功能和用户个人中心。

## 功能特性

- 壁纸浏览与分类筛选
- 壁纸预览（支持滑动切换）
- 壁纸下载功能
- 用户个人中心
- 响应式设计，支持多端运行

## 技术栈

- [UniApp](https://uniapp.dcloud.io/) - 跨平台开发框架
- Vue 3 Composition API
- TypeScript
- SCSS 样式预处理器
- [@dcloudio/uni-ui](https://uniapp.dcloud.io/component/README?id=uniui) - UniApp UI 组件库

## 目录结构

```
src/
├── pages/              # 页面组件
│   ├── home/           # 首页
│   ├── category/       # 分类页
│   ├── preview/        # 预览页
│   └── user/           # 用户中心
├── components/         # 公共组件
├── api/                # API 接口
├── utils/              # 工具函数
├── type/               # TypeScript 类型定义
└── static/             # 静态资源
```

## 开发指南

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
pnpm install
```

### 开发运行

```bash
# 启动 H5 开发服务器
pnpm run dev:h5

# 启动微信小程序开发服务器
pnpm run dev:mp-weixin

# 查看所有可用的开发命令
pnpm run
```

### 构建部署

```bash
# 构建 H5 版本
pnpm run build:h5

# 构建微信小程序版本
pnpm run build:mp-weixin

# 查看所有可用的构建命令
pnpm run
```

### 类型检查

```bash
pnpm run type-check
```

## 项目配置

- `src/pages.json` - 页面路由和 tabBar 配置
- `src/manifest.json` - 应用配置
- `vite.config.ts` - Vite 配置
- `tsconfig.json` - TypeScript 配置

## 开发资源

- [UniApp 官方文档](https://uniapp.dcloud.io/)
- [UniApp TypeScript 类型文档](https://uni-typed.netlify.app/guide/why.html)
- [Vue 3 官方文档](https://v3.vuejs.org/)