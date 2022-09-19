<template>
  <el-select v-model="value" placeholder="请选择" @change="change">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
			>
			<span style="float: left">{{ item.label }}</span>
			<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </el-select>
</template>

<script>
  export default {
		name: 'my-select',
		props: ['options',],
    data() {
      return {
        value:'',
      }
    },
		methods: {
			change(val) {
				this.$emit('change',val);
			}
		}
  }
</script>