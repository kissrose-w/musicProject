import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loginStatusApi } from '@/services';
import type { UserInfo } from '@/services/type';




export const useUserStore = defineStore('counter', () => {
	const userInfo = ref<UserInfo>();


	const loginStatus = async () => {
  try {
			const res = await loginStatusApi();
			console.log(res);
			userInfo.value = res.data;
		} catch (e) {
			console.log(e)
		}
	}
	loginStatus();
	return { userInfo, loginStatus };
});