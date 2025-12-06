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
      <svg t="1764921902405" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10863" width="48" height="48"><path d="M999.883967 426.598898a17.066652 17.066652 0 0 0-14.557855 19.251184C988.34691 467.592997 989.865842 489.847912 989.865842 512.000427c0 263.492047-214.374221 477.866268-477.866269 477.866268S34.133305 775.492474 34.133305 512.000427 248.507526 34.134158 511.999573 34.134158c56.661286 0 111.940173 9.625592 164.300663 28.637843a17.032519 17.032519 0 0 0 21.862382-10.205858 17.100786 17.100786 0 0 0-10.222925-21.879449A514.132905 514.132905 0 0 0 511.999573 0.000853C229.683009 0.000853 0 229.683862 0 512.000427s229.683009 511.999573 511.999573 511.999573 511.999573-229.683009 511.999574-511.999573a517.972902 517.972902 0 0 0-4.863996-70.826608 17.100786 17.100786 0 0 0-19.251184-14.574921" fill="#e6e6e6" p-id="10864"></path><path d="M700.227683 503.432967a17.169052 17.169052 0 0 0-17.749318 16.36692 131.652157 131.652157 0 0 1-0.529067 7.731193C673.979172 615.970473 600.899766 682.666951 511.999573 682.666951c-94.105522 0-170.666524-76.561003-170.666524-170.666524s76.561003-170.666524 170.666524-170.666525c10.222925 0 20.49705 0.921599 30.498108 2.713598a17.066652 17.066652 0 1 0 6.041595-33.604239A207.632894 207.632894 0 0 0 511.999573 307.200597c-112.930039 0-204.799829 91.86979-204.799829 204.79983s91.86979 204.799829 204.799829 204.799829c106.700711 0 194.372105-80.0426 203.946497-186.145978 0.290133-3.140264 0.512-6.297595 0.631466-9.471992a17.049586 17.049586 0 0 0-16.349853-17.749319" fill="#e6e6e6" p-id="10865"></path><path d="M511.999573 443.733817c-37.649035 0-68.26661 30.617574-68.266609 68.26661s30.617574 68.26661 68.266609 68.266609 68.26661-30.617574 68.26661-68.266609-30.617574-68.26661-68.26661-68.26661z m0 102.399915c-18.824518 0-34.133305-15.308787-34.133305-34.133305s15.308787-34.133305 34.133305-34.133305 34.133305 15.308787 34.133305 34.133305-15.308787 34.133305-34.133305 34.133305zM1017.428485 3.618984a17.049586 17.049586 0 0 0-14.643187-3.106131l-273.066439 68.26661A17.066652 17.066652 0 0 0 716.799403 85.334116v307.199744c0 28.228243-22.971714 51.199957-51.199958 51.199957s-51.199957-22.971714-51.199957-51.199957 22.971714-51.199957 51.199957-51.199958a17.066652 17.066652 0 0 0 0-34.133305c-47.052761 0-85.333262 38.280501-85.333262 85.333263s38.280501 85.333262 85.333262 85.333262 85.333262-38.280501 85.333263-85.333262V173.961242l209.134759-55.057021a17.066652 17.066652 0 1 0-8.66986-33.006906L750.932708 138.667404V98.663171l238.933134-59.733283V324.26725c0 28.228243-22.971714 51.199957-51.199958 51.199957s-51.199957-22.971714-51.199957-51.199957 22.971714-51.199957 51.199957-51.199958a17.066652 17.066652 0 0 0 0-34.133304c-47.052761 0-85.333262 38.280501-85.333262 85.333262s38.280501 85.333262 85.333262 85.333262 85.333262-38.280501 85.333263-85.333262V17.067506a17.032519 17.032519 0 0 0-6.570662-13.448522M165.188129 292.062477a17.066652 17.066652 0 0 0-17.066652 29.559442l125.405762 72.413806a17.083719 17.083719 0 0 0 17.066652-29.576509l-125.405762-72.396739M379.272217 299.145137a17.100786 17.100786 0 0 0 14.762655-25.599978L321.621065 148.139397a17.066652 17.066652 0 1 0-29.576508 17.066652l72.430873 125.405762c3.157331 5.478395 8.891726 8.533326 14.796787 8.533326M858.811018 731.938377a17.083719 17.083719 0 0 0 17.066652-29.559442l-125.405762-72.413807a17.066652 17.066652 0 1 0-17.066653 29.576509l125.405763 72.39674M636.21067 727.125581a17.100786 17.100786 0 0 0-6.246395 23.330114l72.413806 125.405762a17.066652 17.066652 0 0 0 29.576509-17.066653l-72.413806-125.405762a17.083719 17.083719 0 0 0-23.330114-6.263461" fill="#e6e6e6" p-id="10866"></path></svg>
      音乐登录
    </view>
    <view class="loginForm">
      <uni-forms ref="formRef" :modelValue="formData" label-position="center" :rules="rules" errorType="text">
        <uni-forms-item label="手机号" name="tel">
          <uni-easyinput type="tel" v-model="formData.tel" placeholder="请输入手机号" />
        </uni-forms-item>
        <uni-forms-item label="密码" name="password">
          <uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
        </uni-forms-item>
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
  background-color: #cd5451;
  >p{
    text-align: center;
    margin-top: 100px;
    font-size: 14px;
    color: #fff;
  }
}
.title{
  height: 600rpx;
  width: 100%;
  text-align: center;
  line-height: 600rpx;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  font-family: "楷体";
}
.loginForm{
  margin: 15px 40px 0;
  background: #fff;
  padding: 10px;
  border-radius: 20px;
}
::v-deep .uni-forms-item__error {
  color: #2c0909;
  font-size: 24rpx;
  margin-top: 8rpx;
  text-align: left;
  padding-left: 20rpx;
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