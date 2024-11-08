<script lang="ts" setup>
import type { BasicOption } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';

import { computed, h, reactive, ref } from 'vue';

import { AuthenticationLogin, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { Image, Input } from 'ant-design-vue';

import { getCaptcha, getEmailCaptcha, getSmsCaptcha } from '#/api/sys/captcha';
import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const loginType: BasicOption[] = [
  {
    label: $t('sys.login.captcha'),
    value: 'captcha',
  },
  {
    label: $t('sys.login.mobile'),
    value: 'mobile',
  },
  {
    label: $t('sys.login.email'),
    value: 'email',
  },
];
const formData = reactive({
  msgType: 'captcha',
  account: '',
  password: '',
  captcha: '',
  captchaId: '',
  imgPath: '',
  target: '',
  captchaVerified: '',
});

const captchaImgUrl = computed(() => {
  return formData.imgPath;
});

// get captcha
async function getCaptchaData() {
  const captcha = await getCaptcha();
  if (captcha.code === 0) {
    formData.captchaId = captcha.data.captchaId;
    formData.imgPath = captcha.data.imgPath;
  }
}

getCaptchaData();

async function handleSendCaptcha(): Promise<boolean> {
  if (formData.msgType === 'email') {
    const result = await getEmailCaptcha({ email: formData.target });
    return result.code === 0;
  } else {
    const result = await getSmsCaptcha({ phoneNumber: formData.target });
    return result.code === 0;
  }
}

const emailOrPhonePlaceholder = ref('');

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenSelect',
      componentProps: {
        options: loginType,
      },
      label: 'Login Type',
      fieldName: 'selectLoginType',
      rules: z.string().optional().default('captcha'),
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
      dependencies: {
        if(values) {
          return values.selectLoginType === 'captcha';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['selectLoginType'],
      },
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: emailOrPhonePlaceholder,
      },
      label: 'Target',
      fieldName: 'target',
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
      dependencies: {
        trigger(values, _) {
          emailOrPhonePlaceholder.value =
            values.selectLoginType === 'email'
              ? $t('sys.login.emailPlaceholder')
              : $t('sys.login.mobilePlaceholder');

          formData.target = values.target;
        },
        if(values) {
          return values.selectLoginType !== 'captcha';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['selectLoginType', 'target'],
      },
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      dependencies: {
        if(values) {
          return values.selectLoginType === 'captcha';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['selectLoginType'],
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(6, { message: $t('authentication.passwordTip') }),
    },
    {
      component: h(Input),
      componentProps: {
        maxlength: 5,
      },
      fieldName: 'captcha',
      label: $t('authentication.password'),
      dependencies: {
        if(values) {
          return values.selectLoginType === 'captcha';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['selectLoginType'],
      },
      rules: z
        .string()
        .length(5, { message: $t('sys.login.captchaRequired') })
        .max(5),
      renderComponentContent: () => ({
        suffix: () => {
          return h(Image, {
            src: captchaImgUrl.value,
            width: 120,
            height: 40,
            preview: false,
            onClick: getCaptchaData,
          });
        },
      }),
    },
    {
      component: 'VbenPinInput',
      componentProps: {
        createText: (countdown: number) => {
          const text =
            countdown > 0
              ? $t('authentication.sendText', [countdown])
              : $t('authentication.sendCode');
          return text;
        },
        placeholder: $t('authentication.code'),
        codeLength: 5,
        handleSendCode: handleSendCaptcha,
      },
      dependencies: {
        if(values) {
          return values.selectLoginType !== 'captcha';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['selectLoginType'],
      },
      fieldName: 'captchaVerified',
      label: $t('authentication.code'),
      rules: z
        .string()
        .length(5, { message: $t('sys.login.captchaRequired') })
        .max(5),
    },
  ];
});

async function handleLogin(values) {
  switch (values.selectLoginType) {
    case 'captcha': {
      authStore
        .authLogin(
          {
            password: values.password,
            username: values.username,
            captcha: values.captcha,
            captchaId: formData.captchaId,
          },
          'captcha',
        )
        .then(() => {})
        .catch(() => {
          getCaptchaData();
        });

      break;
    }
    case 'email': {
      authStore
        .authLogin(
          {
            captcha: values.captchaVerified,
            email: values.target,
          },
          'email',
        )
        .then(() => {})
        .catch(() => {});

      break;
    }
    case 'sms': {
      authStore
        .authLogin(
          {
            captcha: values.captchaVerified,
            phoneNumber: values.target,
          },
          'sms',
        )
        .then(() => {})
        .catch(() => {});

      break;
    }
    // No default
  }
}
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    :show-code-login="false"
    :show-qrcode-login="false"
    @submit="handleLogin"
  />
</template>
