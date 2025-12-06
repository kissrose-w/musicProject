import { reactive } from "vue"

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
				errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符',
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
				errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符',
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
				minLength: 3,
				maxLength: 5,
				errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符',
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
        validateFunction() {
          
        }
			},
			{
				minLength: 11,
				maxLength: 11,
				errorMessage: '{label}长度为 {minLength} 个字符',
			}
		],
		label:'手机号',
		validateTrigger:'submit'
	},
})