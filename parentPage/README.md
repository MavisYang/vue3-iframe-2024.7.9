# unifiedWeb

统一前端

## 项目介绍

基于 iframe，将每一个菜单对应的子页面嵌入到主页面中，实现统一的前端架构，只限于样式展示，逻辑处理还是单独每一个子页面处理，有局限性。

## 安装依赖

```
yarn
```

## 项目启动

```
yarn  dev
```

## 项目打包

```
yarn  build
```

# 项目结构

```
├── index.html
├── src
│   ├── App.vue
│   ├── main.js
│   ├── assets
│   │   ├── img
│   │   └── iconfont

│   ├── components
│   │   ├── 404.vue
│   ├── router
│   │   └── index.js
│   ├── stores
│   │   └── index.js
│   ├── styles
│   ├   ├── element.scss
│   │   └── index.scss
│   ├── utils
│   │   └── index.js
│   ├── sidebar
│   │   └── index.vue
│   └── views
│       ├── fileWebApp
│       ├── parameterCacheApp
│       └── Home.vue
├── .env.development
├── .env.production
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
└── yarn.lock
```

## 技术栈

-   vite 5
-   vue 3
-   vue Router 4
-   pinia
-   element-plus
-   sass

## 链接

-   [为 iframe 正名，你可能并不需要微前端](https://juejin.cn/post/7185070739064619068)
