# MimicPhoto Clone

> AI Photo Editing 平台前端复刻项目 — 基于 Vue 3 + Vite + TypeScript

复刻 [mimicphoto.com](https://mimicphoto.com) 的全部前端功能，包含 28+ AI 工具的完整交互界面。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue 3 | ^3.4.0 | Composition API + `<script setup>` |
| TypeScript | ~5.6.0 | 严格模式 |
| Vite | ^5.0.0 | 构建工具 |
| Vue Router | ^4.2.5 | 路由管理 |
| Pinia | ^2.1.7 | 状态管理 |
| @vueuse/core | ^10.7.0 | 组合式工具函数 |
| Sass | ^1.69.0 | CSS 预处理 |
| ESLint | ^10.9.1 | 代码检查 |
| Prettier | ^3.9.6 | 代码格式化 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目脚本

```bash
npm run dev          # 启动 Vite 开发服务器
npm run build        # 类型检查 + 生产构建
npm run preview      # 预览生产构建
npm run type-check   # 仅运行 TypeScript 类型检查
npm run lint         # ESLint 自动修复
npm run lint:check   # ESLint 仅检查（不修复）
npm run format       # Prettier 格式化代码
npm run format:check # Prettier 仅检查
```

## 项目结构

```
├── public/
│   └── favicon.svg              # 网站图标
├── src/
│   ├── api/
│   │   └── tools.ts             # 工具数据、定价数据、Mock API
│   ├── assets/
│   │   └── styles/
│   │       ├── variables.scss   # 设计令牌（颜色、间距、字体等）
│   │       ├── mixins.scss      # SCSS 混入（响应式、flex、动画等）
│   │       ├── reset.scss       # CSS 重置与基础样式
│   │       └── main.scss        # 全局样式入口
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.vue    # 顶部导航栏（响应式 + 移动端菜单）
│   │   │   └── AppFooter.vue    # 页脚
│   │   ├── tools/
│   │   │   ├── ToolGrid.vue     # 工具网格（分类筛选）
│   │   │   └── ToolCarousel.vue # 工具横向滚动轮播
│   │   └── ui/
│   │       ├── SectionHeader.vue # 通用区块标题
│   │       ├── ToolCard.vue      # 工具卡片
│   │       └── FaqItem.vue       # FAQ 手风琴组件
│   ├── hooks/
│   │   ├── index.ts             # Hooks 统一导出
│   │   ├── useScrollPosition.ts # 滚动位置追踪
│   │   ├── useFileUpload.ts     # 文件上传（拖拽 + 选择）
│   │   └── useIntersectionObserver.ts # 滚动动画观察器
│   ├── router/
│   │   └── index.ts             # 路由配置 + 导航守卫
│   ├── stores/
│   │   ├── index.ts             # Store 统一导出
│   │   ├── app.ts               # 全局 UI 状态（菜单、主题、Toast）
│   │   ├── editor.ts            # 编辑器状态（上传、滑块、处理）
│   │   └── user.ts              # 用户/认证状态
│   ├── types/
│   │   └── index.ts             # TypeScript 类型定义
│   ├── utils/
│   │   └── index.ts             # 工具函数（格式化、验证、存储等）
│   ├── views/
│   │   ├── HomePage.vue         # 首页
│   │   ├── ExplorePage.vue      # 工具浏览页
│   │   ├── PricingPage.vue      # 定价页
│   │   ├── ToolPage.vue         # 工具编辑器页（动态）
│   │   └── NotFoundPage.vue     # 404 页面
│   ├── App.vue                  # 根组件（布局 + Toast）
│   ├── main.ts                  # 应用入口
│   └── env.d.ts                 # 类型声明
├── eslint.config.js             # ESLint 配置（flat config）
├── .prettierrc                  # Prettier 配置
├── .prettierignore              # Prettier 忽略规则
├── .gitignore                   # Git 忽略规则
├── index.html                   # HTML 入口
├── package.json                 # 项目配置
├── tsconfig.json                # TypeScript 配置
├── tsconfig.node.json           # Node TypeScript 配置
└── vite.config.ts               # Vite 配置
```

## 架构设计

### 模块划分

```
types/      → 纯类型定义，零依赖
utils/      → 纯函数，无副作用
api/        → 数据层 + Mock API
stores/     → Pinia 状态管理（app / editor / user）
hooks/      → 可复用组合式函数
components/ → UI 组件（layout / tools / ui 三级分类）
views/      → 页面级组件
router/     → 路由配置 + 守卫
```

### 数据流

```
用户操作 → Hook (useFileUpload) → Store (editor) → API (processImage) → Store → View
```

### 编辑器模式

ToolPage 根据工具的 `editorType` 字段动态渲染不同 UI：

| editorType | 适用工具 | 界面 |
|---|---|---|
| `sliders` | Face Expression Editor, Relight, Upscale 等 | 上传图片 + 滑块参数调节 |
| `prompt` | Create Image, Image Translator, Create Video | 文本输入 + 设置选项 |
| `multi-upload` | AI Photo Editor, Photo to Video, Video Effects | 多文件上传 + 文本提示 + 设置 |
| `dual-upload` | Face Swap, Couple Photo Maker, Hug & Kiss | 双图片上传 |
| `time-slider` | Time Travel Photo Generator | 上传图片 + 时间轴滑块 |

## 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | HomePage | 首页（Hero、工具选择、推荐、优势、FAQ、CTA） |
| `/apps/explore` | ExplorePage | 全部工具浏览（搜索 + 分类筛选） |
| `/apps/pricing` | PricingPage | 定价方案 + 积分说明 + FAQ |
| `/apps/:toolSlug` | ToolPage | 动态工具编辑器页面 |
| `*` | NotFoundPage | 404 页面 |

## 设计系统

### 颜色

```scss
$color-primary:    #6c5ce7   // 主色（紫色）
$color-secondary:  #00cec9   // 辅助色（青色）
$color-accent:     #fd79a8   // 强调色（粉色）
$color-bg:         #0a0a0f   // 背景色（深黑）
$color-bg-card:    #13131a   // 卡片背景
$color-text:       #e8e8f0   // 主文字
$color-border:     #2a2a38   // 边框色
```

### 断点

```scss
$breakpoint-sm:  640px
$breakpoint-md:  768px
$breakpoint-lg:  1024px
$breakpoint-xl:  1280px
$breakpoint-2xl: 1536px
```

### 混入

```scss
@include sm { }          // min-width: 640px
@include md { }          // min-width: 768px
@include lg { }          // min-width: 1024px
@include mobile { }      // max-width: 767px
@include flex-center     // 居中 flex
@include flex-between    // 两端对齐 flex
@include glass           // 毛玻璃效果
@include gradient-text   // 渐变文字
@include text-clamp(2)   // 文字截断
```

## 工具列表（28 个）

### 图像工具（18 个）

| 工具 | 编辑器类型 | 积分 |
|------|-----------|------|
| Face Expression Editor 🔥 | sliders | Free |
| AI Photo Editor 🆓 | multi-upload | 2 cr |
| Create Image | prompt | Varies |
| AI Couple Photo Maker | dual-upload | 5 cr |
| Add Person to Photo | dual-upload | 3 cr |
| Image Effects | sliders | 19 cr |
| Photo Pose Editor | dual-upload | 3 cr |
| Photo Angle Changer | sliders | 2 cr |
| Virtual Try-On | multi-upload | 5 cr |
| Relight | sliders | 2 cr |
| Face Swap 🆓 | dual-upload | 2 cr |
| Background Remove 🆓 | sliders | Free |
| Unblur Image | sliders | 5 cr |
| Upscale 🆓 | sliders | 2 cr |
| Colorization 🆓 | sliders | Free |
| Image Translator | prompt | 2 cr |
| Object Remover | prompt | 1 cr |
| Remove Reflection | sliders | 2 cr |
| Time Travel Photo Generator | time-slider | 15 cr |

### 视频工具（10 个）

| 工具 | 编辑器类型 | 积分 |
|------|-----------|------|
| Create Video 🔥 | prompt | Varies |
| Photo to Video 🆕 | multi-upload | 75 cr |
| Drone FPV Video | multi-upload | 50 cr |
| Motion Control | dual-upload | 75 cr |
| Talking Photo | multi-upload | 3 cr/sec |
| Video Effects | multi-upload | Varies |
| Hug & Kiss Video | dual-upload | Varies |
| Video Upscaler | multi-upload | Varies |
| Wan2.5 Video 🆕 | prompt | Varies |
| Video Watermark Remover | multi-upload | 2 cr/sec |

## 代码规范

- **ESLint** — flat config，集成 `eslint-plugin-vue` + `@vue/eslint-config-typescript`
- **Prettier** — 单引号、无分号、100 字符宽度
- **TypeScript** — 严格模式，所有组件使用 `<script setup lang="ts">`
- **SCSS** — BEM 命名规范，设计令牌统一管理
- **Git** — `.gitignore` 已配置，排除 `node_modules`、`dist`、环境变量等

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 许可

本项目仅供学习和参考用途。
