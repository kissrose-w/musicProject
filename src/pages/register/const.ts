import { reactive } from "vue"

export type data = {
  name: string,
  pas: string,
  isPas: string,
  tel: number | null,
  cap: number | null,
}

export const rules = reactive({
	// 对name字段进行必填验证
	name: {
		// name 字段的校验规则
		rules:[
			// 校验 name 不能为空
			{
				required: true,
				errorMessage: '请填写昵称',
			},
			// 对name字段进行长度验证
			{
				minLength: 3,
				maxLength: 5,
				errorMessage: '请输入 {minLength} 到 {maxLength} 位昵称',
			}
		],
		// 当前表单域的字段中文名，可不填写
		label:'昵称',
		validateTrigger:'submit'
	},
	pas: {
		rules:[
			{
				required: true,
				errorMessage: '请填写密码',
			},
			{
				minLength: 3,
				maxLength: 5,
				errorMessage: '请输入 {minLength} 到 {maxLength} 位密码',
			}
		],
		label:'密码',
		validateTrigger:'submit'
	},
	isPas: {
		rules:[
			{
				required: true,
				errorMessage: '请确认密码',
			},
      {
        validator: (value: string, form: {pas: string, isPas: string}) => value === form.pas, 
        errorMessage: '两次输入的密码不一致' 
      },
			{
				minLength: 3,
				maxLength: 5,
				errorMessage: '请输入 {minLength} 到 {maxLength} 位密码',
			}
		],
		label:'确认密码',
		validateTrigger:'submit'
	},
	tel: {
		rules:[
			{
				required: true,
				errorMessage: '请输入手机号',
			},
      {
        pattern: /^1[3-9]\d{9}$/, // 手机号正则校验
        errorMessage: '请输入正确的手机号格式',
      },
			{
				minLength: 11,
				maxLength: 11,
				errorMessage: '请输入 {minLength} 位数字',
			}
		],
		label:'手机号',
		validateTrigger:'submit'
	},
	cap: {
		rules:[
			{
				required: true,
				errorMessage: '请输入验证码',
			},
			{
				minLength: 4,
				maxLength: 4,
				errorMessage: '请输入 {minLength} 位数字',
			}
		],
		label:'验证码',
		validateTrigger:'submit'
	},
})

