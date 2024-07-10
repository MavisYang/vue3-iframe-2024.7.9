<!--
 * @Author: yangmiaomiao
 * @Date: 2024-02-29 14:07:02
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-02-29 15:03:12
 * @Description: 
-->
<template>
  <div class="card content-box">
    <span class="text"> Element-plus/icons图标 🍓🍇🍈🍉</span>
    <SelectIcon v-model:icon-value="iconValue" />
    <span class="text"> 自定义/icons/svgIcons.js图标 🍓🍇🍈🍉</span>
    <SvgIcons />

    <!-- <el-descriptions title="配置项 📚" :column="1" border>
			<el-descriptions-item label="iconValue">
				双向绑定的icon值，使用示例：v-model:icon-value="iconValue"
			</el-descriptions-item>
			<el-descriptions-item label="title"> 弹窗标题 </el-descriptions-item>
			<el-descriptions-item label="clearable">
				是否可清空，默认为 true
			</el-descriptions-item>
			<el-descriptions-item label="placeholder">
				输入框占位文本
			</el-descriptions-item>
		</el-descriptions> -->
  </div>
</template>

<script setup lang="ts" name="selectIcon">
import { ref } from 'vue';
import SelectIcon from '@/views/demo/components/SelectIcon/index.vue';
import SvgIcons from '@/views/demo/components/SelectIcon/SvgIcons.vue';
const iconValue = ref('');
</script>
