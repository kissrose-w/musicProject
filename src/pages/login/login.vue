<script setup lang="ts">
import { ref } from 'vue';
import { telLoginApi,getKeyApi,getQRCodeApi,getStatusApi  } from '@/services';
const formRef = ref(null) 
const show = ref(false)
const cookie = ref('') //存cookie
const keyData = ref('') //二维码key
const imgSrc = ref('') //二维码图片地址
const timeOut = ref(null)
const formData = ref({
  tel:'',
  password:''
})
const rules = ref({
	// 对tel字段进行必填验证
	tel: {
		rules:[
			// 校验 name 不能为空
			{
				required: true,
				errorMessage: '请填写',
			},
			// 对name字段进行长度验证
			{
        pattern: /^1[3-9]\d{9}$/, // 手机号正则校验
        errorMessage: '请输入正确的手机号格式',
      }
		],
		// 当前表单域的字段中文名，可不填写
		label:'手机号',
    validateTrigger:'submit'
	},
  password:{
    rules:[
			// 校验 name 不能为空
			{
				required: true,
				errorMessage: '请填写',
			},
			// 对name字段进行长度验证
			{
				minLength:6,
        maxLength:9,
				errorMessage: '请输入6-9位密码',
			}
		],
		// 当前表单域的字段中文名，可不填写
		label:'密码',
    validateTrigger:'submit'
  }
})

const loginTo = async () =>{
  if(!formRef.value) return
  console.log(formRef.value.validate())
  console.log(formData.value.tel,formData.value.password)
  try{
    const res = await telLoginApi(formData.value.tel,formData.value.password)
    console.log(res)
  }catch(e){
    console.error('登陆失败', e);
  }
}

//获取二维码key
const getKey = async () =>{
  try{
    const res = await getKeyApi()
    keyData.value = res.data.unikey
    console.log(keyData.value)
  }catch(e){
    console.error(e)
    uni.showToast({ title: '获取二维码失败', icon: 'none' });
    show.value = false;
  }
}
getKey()


//获取二维码图片
const QRlogin = async () =>{
  show.value = true
  try{
    const res = await getQRCodeApi(keyData.value,"qrimg")
    imgSrc.value = res.data.qrimg
    console.log(res.data)
    timeOut.value = setTimeout(()=>{
      getStatus()
    },8000)
  }catch(e){
    console.error(e)
  }
}

//获取登录状态
const getStatus = async () =>{
  try{
    const res = await getStatusApi(keyData.value)
    console.log(res.data)
    if(res.code===803){
      show.value=false
      uni.switchTab({
        url:'/pages/index/index'
      })
      if(timeOut.value) clearTimeout(timeOut.value)
      uni.showToast({ title: '登录成功', icon: 'success' });
    }
    else if(res.code===801){
      // getStatus()
      timeOut.value = setTimeout(()=>{
        getStatus()
      },5000)
    }
    else{
      if(timeOut.value) clearInterval(timeOut.value)
      uni.showToast({ title: '登录失败，刷新重试', icon: 'none' });
    }
  }catch(e){
    console.error(e)
  }
}



</script>

<template>
  <view class="login">
    <view class="title">
      <svg t="1765119141291" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6150" width="64" height="64"><path d="M625.288 13.035c27.693-7.553 57.903-7.553 85.596 0 32.728 7.553 62.938 22.658 88.113 42.798 10.07 7.552 17.623 15.105 22.658 27.693 7.553 17.622 5.035 37.762-5.035 52.868-7.553 12.587-22.658 22.657-40.28 25.175-12.588 2.517-25.176 0-37.763-7.553-5.035-2.517-10.07-10.07-17.623-12.587-17.622-10.07-35.245-20.14-55.385-17.623-15.105 0-27.693 7.553-35.246 17.623-10.07 10.07-12.587 22.657-10.07 35.245 7.553 25.175 12.588 52.868 20.14 78.043 50.351 2.518 98.184 15.105 140.982 40.28 40.28 25.176 78.043 57.903 108.253 95.666 25.175 32.728 45.316 70.49 55.386 110.771 12.587 42.798 17.622 88.113 12.587 130.911-2.517 37.763-10.07 73.008-22.657 108.254-32.728 83.078-90.631 158.603-168.674 206.436-55.386 35.246-120.841 57.903-186.297 65.456-45.315 5.035-90.63 5.035-135.946-2.518-93.148-15.105-178.744-60.42-246.717-128.393-65.456-65.456-110.771-151.052-130.911-241.682-7.553-67.973-7.553-135.946 7.552-203.92 17.623-80.56 60.42-158.603 115.806-219.024 47.833-50.35 105.736-88.113 168.674-115.806 7.553-2.517 12.588-5.035 20.14-7.552 15.106-2.518 30.21 0 42.798 10.07 17.623 12.587 25.175 32.728 22.658 52.868-2.518 20.14-17.623 37.763-35.245 45.315-62.938 25.175-120.841 67.973-161.122 120.841-37.763 52.868-62.938 110.771-70.49 171.192-7.553 60.42 0 120.84 20.14 178.744 30.21 83.078 93.148 153.568 171.191 193.849 47.833 25.175 100.701 37.762 153.57 37.762 42.797 0 88.112-7.552 128.393-22.657 35.245-12.588 70.49-32.728 98.183-57.903 27.693-22.658 50.35-52.868 65.456-83.078 7.552-15.106 17.622-32.728 20.14-50.35 15.105-50.351 17.622-105.737 2.517-156.087-12.587-42.798-37.763-80.56-70.49-108.254-15.106-12.587-30.21-25.175-47.833-35.245-15.105-7.552-30.21-15.105-47.833-17.622 12.587 45.315 22.658 90.63 35.245 133.428 2.518 10.07 5.035 22.658 5.035 32.728 2.518 45.315-15.105 93.148-45.315 128.393-27.693 32.728-67.973 57.903-110.771 65.456-45.316 10.07-95.666 0-135.946-25.175-37.763-25.175-65.456-62.938-80.56-103.219-7.554-22.657-12.589-47.832-12.589-73.008-2.517-55.385 12.588-108.253 42.798-153.568 35.246-52.868 93.149-90.631 156.087-108.254-5.035-17.622-10.07-35.245-12.588-52.868-12.588-37.763-10.07-80.56 7.553-113.288 10.07-20.14 22.657-37.763 40.28-50.35 22.658-20.14 42.798-32.728 65.455-40.281M479.272 420.873c-17.622 17.623-27.693 40.28-32.728 62.938-5.035 20.14-5.035 42.798 0 65.456s17.623 45.315 37.763 60.42c15.105 10.07 35.246 15.106 55.386 10.07 35.245-5.034 62.938-37.762 62.938-73.008-2.518-7.552-2.518-17.622-5.035-25.175-12.588-47.833-25.175-98.183-37.763-146.016-30.21 7.553-57.903 22.658-80.56 45.315z" fill="#d81e06" p-id="6151"></path></svg>
    </view>
    <view class="loginForm">
      <uni-forms ref="formRef" :modelValue="formData" label-position="center" :rules="rules" errorType="text">
          <uni-easyinput type="tel" v-model="formData.tel" placeholder="请输入手机号" />
          <uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
      </uni-forms>
      <button @click="loginTo">登录</button>
    </view>
    <p @click="QRlogin">二维码登录</p>
  </view>
  <view class="dialog" v-if="show">
    <view class="close" @click="show=false">❌</view>
    <view class="dialog-con">
      <image :src="imgSrc" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login{
  width: 100vw;
  height: 100vh;
  background-color: #f3f7fa;
  // background: linear-gradient(45deg, #f093fb 0%, #f5576c 50%, #4facfe 100%);

  >p{
    text-align: center;
    margin-top: 100px;
    font-size: 14px;
    color: #d81e06;
  }
}
.title{
  height: 600rpx;
  width: 100%;
  text-align: center;
  line-height: 600rpx;
  font-size: 40px;
  font-weight: 700;
  color: #d81e06;
  font-family: "楷体";
}
.loginForm{
  margin: 15px 40px 0;
  padding: 10px;
  border-radius: 20px;
  >button{
    background: #fff;
    font-family: "楷体";
    font-size: 20px;
    background: #d81e06;
  }
}
::v-deep .uni-forms-item__error {
  color: #2c0909;
  font-size: 24rpx;
  margin-top: 8rpx;
  text-align: left;
  padding-left: 20rpx;
}
::v-deep span{
  color: #d81e06 !important;
  font-size: 18px;
  font-family: "楷体";
}

.dialog{
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  opacity: 0.8;
}
.dialog-con{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 200px;
  height: 200px;
  >image{
    width: 100%;
    height: 100%;
  }

}

</style>