<!--
 * @Author: yangmiaomiao
 * @Date: 2024-02-04 15:44:58
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-02-29 10:24:10
 * @Description: 
-->
<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
	<component :is="LayoutClassic" />
</template>

<script setup lang="ts" name="layout">
import LayoutClassic from "./LayoutClassic/index.vue";
</script>

<style scoped lang="scss">
.layout {
	min-width: 980px;
}
</style>
