<!--
 * @Author: yangmiaomiao
 * @Date: 2024-06-15 15:00:58
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-09 10:38:13
 * @Description: 分布式序列 dpscn-apaas-seq-web
 admin/123456
-->
<template>
    <!-- <iframe src="http://10.64.16.180:8888/#/login" /> -->
    <Iframe iframeRef="seqApp" :appUrl="APP_URL" />
</template>

<script setup name="seqApp">
import Iframe from '@/components/Iframe'
const APP_URL = import.meta.env.VITE_APP_SEQ
</script>

<style lang="scss" scoped></style>
