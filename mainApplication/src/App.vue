<!--
 * @Author: yangmiaomiao
 * @Date: 2024-07-03 16:52:53
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-09 10:38:24
 * @Description: 
-->
<template>
    <el-config-provider namespace="ep">
        <el-container class="unified-container">
            <Sidebar v-show="route.name !== 'home'" />
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-config-provider>
</template>

<script setup>
import Sidebar from '@/sidebar'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
