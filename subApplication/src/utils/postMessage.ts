/*
 * @Author: yangmiaomiao
 * @Date: 2024-07-10 15:47:04
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-11 15:01:08
 * @Description:
 */
// 和主应用连接通信
const postMessage = function (type: string, data: any) {
    if (window.parent !== window) {
        window.parent.postMessage(
            {
                type: type,
                data: data,
                webApp: 'hotrec-web',
            },
            '*',
        )
    }
}
// 为了让URL地址尽早地更新，这段代码需要尽可能前置，例如可以直接放在document.head中
postMessage('afterHistoryChange', { url: location.href })

// 在路由变化前、跳转前，子应用路由拦截 router.beforeEach方法中，需要先通知主应用，让主应用更新URL地址
function beforeRedirect(href: string) {
    postMessage('beforeHistoryChange', { url: href })
}

//vue + Element-UI下iframe子页面弹窗蒙层只能遮罩子页面问题和弹框内容居中显示
//子页面通过postMessage通知主页面,子页面根据isDialog的值来修改蒙层样式
const dialogPostMessage = (isDialog: boolean, dialogModalClass: string) => {
    // iframe 弹框样式修改
    postMessage('changeDialog', {
        isDialog,
        dialogModalClass,
    })
}

// 主页面通过postMessage通知子页面，接收父页面发送的消息--动态设置el-overlay-dialog的样式，解决弹框居中的问题
const changeDialogStyle = (event: any) => {
    const { type, data } = event.data || {}
    // console.log('我是父页面传递过来的', data)
    if (type === 'style-left' && data) {
        const { dialogModalClass, left } = data
        document.getElementsByClassName(dialogModalClass)[0].getElementsByClassName('el-overlay-dialog')[0].style.left =
            left
    }
}
export { beforeRedirect, dialogPostMessage, changeDialogStyle }
