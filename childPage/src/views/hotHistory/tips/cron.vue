<!--
 * @Author: yangmiaomiao
 * @Date: 2024-01-10 16:37:06
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-01-10 16:47:24
 * @Description: 
-->
<template>
	<h2>Cron表达式说明</h2>

	<ul>
		<li>
			cron的表达式是字符串，实际上是由七子表达式，描述个别细节的时间表。这些子表达式是分开的空白，代表：1.
			Seconds 2. Minutes 3. Hours 4. Day-of-Month 5. Month 6. Day-of-Week 7.Year
			(可选字段)
		</li>
		<li>每一个字段都有一套可以指定有效值，如:</li>
		<li>Seconds (秒) ：可以用数字0－59 表示</li>
		<li>Minutes(分) ：可以用数字0－59 表示</li>
		<li>Hours(时) ：可以用数字0-23表示</li>
		<li>
			Day-of-Month(天) ：可以用数字1-31 中的任一一个值，但要注意一些特别的月份
		</li>
		<li>
			Month(月) ：可以用0-11 或用字符串 “JAN, FEB, MAR, APR, MAY, JUN, JUL,
			AUG,SEP, OCT, NOV and DEC” 表示
		</li>
		<li>
			Day-of-Week(每周)：可以用数字1-7表示（1 ＝星期日）或用字符口串“SUN, MON,
			TUE, WED, THU, FRI and SAT”表示
		</li>
		<li>
			“/”：为特别单位，表示为“每”如“0/15”表示每隔15分钟执行一次,“0”表示为从“0”分开始,
		</li>
		<li>“3/20”表示表示每隔20分钟执行一次，“3”表示从第3分钟开始执行</li>
		<li>“?”：表示每月的某一天，或第周的某一天</li>
		<li>
			“L”：用于每月，或每周，表示为每月的最后一天，或每个月的最后星期几如“6L”表示“每月的最后一个星期五”
		</li>
		<li>
			“W”：表示为最近工作日，如“15W”放在每月（day-of-month）字段上表示为“到本月15日最近的工作日”
		</li>
		<li>
			““#”：是用来指定“的”每月第n个工作日,例在每周（day-of-week）这个字段中内容为"6#3"
			or "FRI#3"则表示“每月第三个星期五”
		</li>
	</ul>
	<h2>常用Cron表达式</h2>
	<ul>
		<li>
			<span class="left"> 0 15 10 * * ? *</span>
			<span>每天10点15分触发</span>
		</li>
		<li>
			<span class="left">0 15 10 * * ? 2017</span>
			<span>2017年每天10点15分触发</span>
		</li>
		<li>
			<span class="left">0 * 14 * * ?</span>
			<span>每天下午的 2点到2点59分每分触发</span>
		</li>
		<li>
			<span class="left">0 0/5 14 * * ?</span>
			<span>每天下午的 2点到2点59分(整点开始，每隔5分触发)</span>
		</li>
		<li>
			<span class="left">0 0/5 14,18 * * ?</span>
			<span
				>每天下午的 2点到2点59分、18点到18点59分(整点开始，每隔5分触发)</span
			>
		</li>
		<li>
			<span class="left">0 0-5 14 * * ?</span>
			<span>每天下午的 2点到2点05分每分触发</span>
		</li>
		<li>
			<span class="left">0 15 10 ? * 6L</span>
			<span>每月最后一周的星期五的10点15分触发</span>
		</li>
		<li>
			<span class="left">0 15 10 ? * 6#3</span>
			<span>每月的第三周的星期五开始触发</span>
		</li>
	</ul>

	也点击连接查看更多内容
	<a href="https://www.pppet.net/jiaocheng.html" target="_blank">Cron表达式</a>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.left {
	width: 100px;
	color: blue;
}
</style>
