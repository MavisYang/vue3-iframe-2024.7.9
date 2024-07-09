<!--
 * @Author: yangmiaomiao
 * @Date: 2024-01-11 19:30:54
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-02-29 15:46:31
 * @Description: 
-->
<template>
	<ul class="box">
		<li v-for="name in svgIcons" key="item" v-copy="name">
			<SvgIcon :name="name" size="50px" />
			<span>{{ name }}</span>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { svgIcons } from "@/assets/icons/svgIcons";
import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<style scoped lang="scss">
.box {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	li {
		width: 20%;
		height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		color: var(--el-text-color-regular);
		.svg-icon {
			:hover,
			:active {
				color: #79bbff !important;
				fill: #79bbff !important;
			}
		}
	}
}
</style>
