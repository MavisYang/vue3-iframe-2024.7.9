# iframe 微前端

# 项目介绍

基于 iframe，将每一个菜单对应的子页面嵌入到主页面中，实现统一的前端架构，只限于样式展示，逻辑处理还是单独每一个子页面处理，有局限性。

- parentPage：主页面，通过 iframe 嵌入子页面
- childPage：子页面，被嵌入到主页面中

# iframe 微前端配置及问题

## 1. iframe 微前端配置

- parentPage：主页面，通过 iframe 嵌入子页面
- childPage：子页面，被嵌入到主页面中

### 1.1 parentPage 配置

- 在 parentPage 中，通过 iframe 嵌入子页面，并设置 iframe 的 src 为子页面的地址
- 在 parentPage 中，通过 iframe 的 onload 事件，获取子页面的 window 对象，并调用子页面的方法

```js
// parentPage
<template>
  <div>
    <iframe
      ref="iframe"
      src="http://localhost:3000"
      frameborder="0"
      width="100%"
      height="100%"
      @load="onLoad"
    ></iframe>
  </div>
</template>

<script>
export default {
  methods: {
    onLoad() {
      const iframe = this.$refs.iframe;
      const iframeWindow = iframe.contentWindow;
      iframeWindow.init();
    },
  },
};
</script>
```

### 1.2 childPage 配置

- 在 childPage 中，通过 window.parent 获取父页面的 window 对象，并调用父页面的方法

```js
// childPage
export default {
  mounted() {
    window.parent.init();
  },
  methods: {
    init() {
      console.log("childPage init");
    },
  },
};
```

## 2. iframe 微前端问题

- iframe 微前端存在跨域问题，需要配置跨域
- iframe 微前端存在样式冲突问题，需要统一样式
- iframe 微前端存在性能问题，需要优化加载速度
- iframe 微前端存在安全性问题，需要防止 XSS 攻击
- iframe 微前端存在兼容性问题，需要兼容不同浏览器

# 参考链接

- [为 iframe 正名，你可能并不需要微前端](https://juejin.cn/post/7185070739064619068)
