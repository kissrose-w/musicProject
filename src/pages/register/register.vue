
<script setup lang='ts'>
import { reactive } from 'vue'

interface data {
  name: string,
  pas: string,
  isPas: string,
  tel: number | null,
  cap: number | null,
}

const formData = reactive<data>({
  name: '',
  pas: '',
  isPas: '',
  tel: null,
  cap: null
})





</script>

<template>
  <view class="title">注册</view>
  <view class="">
		<uni-forms :modelValue="formData">
			<uni-forms-item required label="昵称" name="name">
				<uni-easyinput type="text" v-model="formData.name" placeholder="请输入昵称" />
			</uni-forms-item>
			<uni-forms-item required label="密码" name="pas">
				<uni-easyinput type="text" v-model="formData.pas" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item required name="isPas" label="确认密码">
				<uni-easyinput type="text" v-model="formData.isPas" placeholder="确认密码" />
			</uni-forms-item>
			<uni-forms-item required name="tel" label="手机号">
				<uni-easyinput type="number" v-model="formData.tel" placeholder="请输入手机号" />
			</uni-forms-item>
			<uni-forms-item required name="cap" label="验证码">
				<uni-easyinput type="number" v-model="formData.cap" placeholder="请输入验证码" />
			</uni-forms-item>
		</uni-forms>
		<button>提交</button>
	</view>
</template>

<style lang='scss' scoped>
  .title{
    font-size: 50px;
    font-weight: 700;
  }
</style>