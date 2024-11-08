import type { BaseDataResp } from '#/api/model/baseModel';
import type {
  GetUserInfoModel,
  LoginByEmailReq,
  LoginBySmsReq,
  LoginReq,
  LoginResp,
} from '#/api/sys/model/userModel';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { notification } from 'ant-design-vue';
import { defineStore } from 'pinia';

import { getAccessCodesApi, logoutApi } from '#/api';
import { getUserInfo, login, loginByEmail, loginBySms } from '#/api/sys/user';
import { $t } from '#/locales';

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   * @param loginType
   * @param onSuccess
   */
  async function authLogin(
    params: LoginByEmailReq | LoginBySmsReq | LoginReq,
    loginType: 'captcha' | 'email' | 'mobile',
    onSuccess?: () => Promise<void> | void,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    let userInfo: GetUserInfoModel = {
      avatar: '',
      homePath: '',
      nickname: '',
      roleName: [],
      userId: '',
      username: '',
    };

    try {
      loginLoading.value = true;

      let resp: BaseDataResp<LoginResp>;

      switch (loginType) {
        case 'captcha': {
          resp = await login(params as LoginReq);
          break;
        }
        case 'email': {
          resp = await loginByEmail(params as LoginByEmailReq);
          break;
        }
        case 'mobile': {
          resp = await loginBySms(params as LoginBySmsReq);
          break;
        }
        // No default
      }

      const { data } = resp;

      // 如果成功获取到 accessToken
      if (data.token) {
        accessStore.setAccessToken(data.token);

        // 获取用户信息并存储到 accessStore 中
        const [fetchUserInfoResult, accessCodes] = await Promise.all([
          fetchUserInfo(),
          getAccessCodesApi(),
        ]);

        userInfo = fetchUserInfoResult;

        accessStore.setAccessCodes(accessCodes);

        if (accessStore.loginExpired) {
          accessStore.setLoginExpired(false);
        } else {
          onSuccess
            ? await onSuccess?.()
            : await router.push(userInfo?.homePath || DEFAULT_HOME_PATH);
        }

        if (userInfo?.nickname) {
          notification.success({
            description: `${$t('authentication.loginSuccessDesc')}:${userInfo?.nickname}`,
            duration: 3,
            message: $t('authentication.loginSuccess'),
          });
        }
      }
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  }

  async function logout(redirect: boolean = true) {
    try {
      await logoutApi();
    } catch {
      // 不做任何处理
    }
    resetAllStores();
    accessStore.setLoginExpired(false);

    // 回登录页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }

  async function fetchUserInfo() {
    let userInfo: GetUserInfoModel;
    const result = await getUserInfo();
    // eslint-disable-next-line prefer-const
    userInfo = result.data;
    if (
      userInfo.avatar === undefined ||
      userInfo.avatar === null ||
      userInfo.avatar === ''
    ) {
      userInfo.avatar = preferences.app.defaultAvatar;
    }
    userStore.setUserInfo(userInfo as any);
    return userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
