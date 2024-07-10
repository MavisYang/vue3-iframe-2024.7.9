# iframe 微前端

# 项目介绍

基于 iframe，将每一个菜单对应的子应用嵌入到主应用中，实现统一的前端架构，只限于样式展示，逻辑处理还是单独每一个子应用处理，有局限性。

# iframe 微前端配置

- mainApplication：主应用，通过 iframe 嵌入子应用
- subApplication：子应用，被嵌入到主应用中

## 1. mainApplication 配置

- 在 mainApplication 中，通过 iframe 嵌入子应用，并设置 iframe 的 src 为子应用的地址
- 在 mainApplication 中，通过 iframe 的 onload 事件，获取子应用的 window 对象，并调用子应用的方法

### 1.1 主应用监听子应用

- 全局监听，放置在 html 中

```js
//全局监听路由变化--
window.addEventListener("message", (e) => {
  const { data, type, webApp } = e.data || {};
  // console.log(type, data, webApp, 'unified-app')
  if (
    (type === "beforeHistoryChange" || type === "afterHistoryChange") &&
    data?.url
  ) {
    // 这里先采用一个兜底的URL承接任意地址
    // const entry = `/config-web/${webApp}?entry=${encodeURIComponent(data.url)}`
    const entry = `/config-web/${webApp}/${data.url}`;
    // 地址不一样才需要更新
    if (location.pathname + location.search !== entry) {
      window.history.replaceState(null, "", entry);
    }
  }
});
```

### 1.2 设置 iframe 的 src

```vue
<template>
  <iframe
    ref="iframe"
    :src="iframeSrc"
    frameborder="0"
    width="100%"
    height="100%"
  />
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const APP_URL = import.meta.env.VITE_APP_HOT;
const iframeSrc = ref(APP_URL + "");

watchEffect(() => {
  console.log("页面刷新");
  iframeSrc.value = APP_URL + route.hash;
});
</script>
```

### 1.3 .env.development 配置

```js
VITE_APP_HOT = "http://localhost:8090/";
```

## 2 subApplication 配置

- 在 subApplication 中，通过 window.parent 获取父应用的 window 对象，并调用父应用的方法

### 2.1 子应用调用父应用方法

- 子应用和主应用连接通信：为了让 URL 地址尽早地更新，这段代码需要尽可能前置，例如可以直接放在 document.head 中

```js
// 和主应用连接通信
const postMessage = function (type: string, data: any) {
  if (window.parent !== window) {
    window.parent.postMessage(
      {
        type: type,
        data: data,
        webApp: "hotrec-web",
      },
      "*"
    );
  }
};
// 为了让URL地址尽早地更新，这段代码需要尽可能前置，例如可以直接放在document.head中
postMessage("afterHistoryChange", { url: location.href });

// 在路由变化前、跳转前，子应用路由拦截 router.beforeEach方法中，需要先通知主应用，让主应用更新URL地址
function beforeRedirect(href: string) {
  postMessage("beforeHistoryChange", { url: href });
}

export { beforeRedirect };
```

### 2.2

- router 配置页面，在路由变化前、跳转前，子应用路由拦截 router.beforeEach 方法中，需要先通知主应用，让主应用更新 URL 地址

```js

import { beforeRedirect } from '@/utils/postMessage'
/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to: any, from, next) => {
    // 子应用路由变化反馈给到主应用
    beforeRedirect(to.href || to.fullPath)
    ...
})

```

# iframe 微前端开发中遇到的问题

- iframe 微前端存在跨域问题，需要配置跨域
- iframe 微前端存在样式冲突问题，需要统一样式
- iframe 微前端存在性能问题，需要优化加载速度
- iframe 微前端存在安全性问题，需要防止 XSS 攻击
- iframe 微前端存在兼容性问题，需要兼容不同浏览器

# 参考链接

- [为 iframe 正名，你可能并不需要微前端](https://juejin.cn/post/7185070739064619068)
