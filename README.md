

# 🗨️ OnlineChatSystem-Vue3

一个基于 Vue 3 + Vite 开发的在线聊天系统，支持好友聊天、群聊、好友/群申请处理、主题切换等功能。该系统注重界面美观与用户体验，适合学习 Vue 3 + Element Plus 项目开发结构与组件通信的优秀示例。

## 🚀 项目预览

> 可部署后访问或使用 `pnpm dev` 启动本地预览。

展示视频：https://www.bilibili.com/video/BV13fhGznEVq/?spm_id_from=333.1387.homepage.video_card.click

## ✨ 核心功能

- 🧑‍🤝‍🧑 好友聊天 & 群聊系统
- 🔔 好友/群申请审核与状态反馈
- 💬 聊天记录持久化展示（模拟）
- 🎨 多主题颜色切换（默认、深色、黄色）
- 🧭 动态路由、登录与会话保持
- 📁 使用 Element Plus 构建高可用 UI

## 🧱 技术栈

| 技术                                      | 说明                           |
| ----------------------------------------- | ------------------------------ |
| [Vue 3](https://vuejs.org/)               | Composition API 构建响应式界面 |
| [Vite](https://vitejs.dev/)               | 快速构建工具                   |
| [Element Plus](https://element-plus.org/) | UI 组件库                      |
| [Pinia](https://pinia.vuejs.org/)         | 状态管理                       |
| TypeScript                                | 静态类型提升开发体验           |

## 📦 本地开发

### 环境准备

确保你已安装 `pnpm` 和 `Node.js (>= 16)`。

### 安装依赖

```bash
pnpm install
```



### 启动开发服务器

```bash
pnpm dev
```

### 打包构建

```bash
pnpm build
```

### 格式检查（可选）

```bash
pnpm lint
```

## 📁 项目结构

```bash
├── src/
│   ├── api/               # 所有后端请求封装
│   ├── assets/            # 静态资源
│   ├── components/        # 通用组件
│   ├── router/            # 路由配置
│   ├── stores/            # Pinia 状态管理
│   ├── views/             # 页面组件
│   └── App.vue            # 根组件
├── public/                # 公共资源
├── vite.config.js         # Vite 配置
└── package.json
```

## 🧩 模拟数据与接口

项目中部分数据使用模拟 JSON 与接口响应模拟，可根据需要替换为真实后端服务。

## 🧑‍💻 开发者指南

- 可根据目录结构扩展聊天类型、添加表情包、语音视频功能等；
- 已封装好友/群申请组件，可按需复用；
- 主题切换通过 `body` class 与 CSS 变量实现。
