/*
 * @Author: yangmiaomiao
 * @Date: 2024-01-13 14:13:04
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-02-29 08:55:26
 * @Description:
 */
import express from 'express'
import expressWebSocket from 'express-ws'
let wsInstance

function localServer() {
    let app = express()
    if (!wsInstance)
        wsInstance = expressWebSocket(app, null, {
            perMessageDeflate: true
        })
    app.ws('/ws', rtspRequestHandle)
    app.listen(8801)
    console.log('express listened')
}

const sendSuffix = ''
let n = 0

function rtspRequestHandle(ws, req) {
    let url = req.query.url
    console.log('连接地址参数url:', url)

    const send = (str) => {
        console.log('发送消息:', str)
        ws.send(str + sendSuffix)
    }

    ws.on('message', function (msg) {
        const sp = msg.split(sendSuffix).filter((el) => el.length > 0)
        // console.log('收到消息:', sp) //[ '~' ]
        for (let i = 0; i < sp.length; i++) {
            const el = sp[i]
            if ('~' === el) {
                const returnData = {
                    num: n++,
                    list: [1].map((v, i) => {
                        return {
                            label: new Date().getTime(),
                            // value: randomMoreNum(12, n, 1000)
                            value: randomNum(1, 1000)
                        }
                    })
                }
                send(JSON.stringify(returnData))
            }
        }
    })
    ws.send('')

    ws.on('close', () => {})
}

localServer()

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns {Number}
 */
function randomNum(min, max) {
    let num = Math.floor(Math.random() * (min - max) + max)
    return num
}

/**
 * @description 指定范围内n个不重复的随机数
 * @param {Number} num 个数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns {Number}
 */
function randomMoreNum(num, min, max) {
    let numArray = []
    for (let i = 0; i < num; i++) {
        numArray[i] = randomNum(min, max)
        for (let z = 0; z < i; z++) {
            if (numArray[i] == numArray[z]) {
                i--
                break
            }
        }
    }
    return numArray
}
