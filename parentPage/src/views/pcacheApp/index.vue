<!--
 * @Author: yangmiaomiao
 * @Date: 2024-06-15 15:00:39
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-09 10:37:43
 * @Description: 参数缓存 dpscn-apaas-pcache-web
 root/#4S@Qr*p4m
 
-->
<template>
    <!-- <iframe src="http://10.64.16.180:8080/#/login" /> -->
    <Iframe iframeRef="pcacheApp" :appUrl="APP_URL" />
</template>

<script setup name="pcacheApp">
import Iframe from '@/components/Iframe'
const APP_URL = import.meta.env.VITE_APP_PCACHE
</script>
<style lang="scss" scoped></style>
