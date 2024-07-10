//全局监听路由变化
window.addEventListener('message', (e) => {
    const { data, type, webApp } = e.data || {}
    // console.log(type, data, webApp, 'unified-app')
    if ((type === 'beforeHistoryChange' || type === 'afterHistoryChange') && data?.url) {
        // 这里先采用一个兜底的URL承接任意地址
        // const entry = `/config-web/${webApp}?entry=${encodeURIComponent(data.url)}`
        const entry = `/config-web/${webApp}/${data.url}`
        // 地址不一样才需要更新
        if (location.pathname + location.search !== entry) {
            window.history.replaceState(null, '', entry)
        }
    }
})
