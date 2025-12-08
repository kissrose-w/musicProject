
<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { rules, type data } from './const'

const formData = reactive<data>({
  name: '',
  pas: '',
  isPas: '',
  tel: null,
  cap: null
})
const form = ref(null)

const submit = () => {
	// 优先校验两次密码是否一致
	if (formData.pas !== formData.isPas) {
		// 使用 uni.showToast 提示用户（uni-app 全局API）
		// icon: 'none' 显示普通文本提示
		// 若你的环境没有 uni，全局提示可以替换为其他实现
		uni.showToast({ title: '两次输入的密码不一致', icon: 'none' })
		return
	}
	form.value.validate()
}





</script>

<template>
  <view class="page">
    <view class="title">注册</view>
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<uni-forms-item required label="昵称" name="name">
				<uni-easyinput type="text" v-model="formData.name" placeholder="请输入昵称" />
			</uni-forms-item>
			<uni-forms-item required label="密码" name="pas">
				<uni-easyinput type="text" v-model="formData.pas" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item required name="isPas" label="确认密码" width="60px">
				<uni-easyinput type="text" v-model="formData.isPas" placeholder="确认密码" />
			</uni-forms-item>
			<uni-forms-item required name="tel" label="手机号">
				<uni-easyinput type="number" v-model="formData.tel" placeholder="请输入手机号" />
			</uni-forms-item>
			<uni-forms-item required name="cap" label="验证码">
				<uni-easyinput type="number" v-model="formData.cap" placeholder="请输入验证码" />
			</uni-forms-item>
		</uni-forms>
		<button @click="submit">提交</button>
	</view>
</template>

<style lang='scss' scoped>
  .title{
    font-size: 50px;
    font-weight: 700;
  }
  .page{
    padding: 10px;
  }
</style>