<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { BasicOption } from '@vben/types';

import { computed, h, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { AuthenticationRegister, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { Image, Input, message } from 'ant-design-vue';

import { getCaptcha, getEmailCaptcha, getSmsCaptcha } from '#/api/sys/captcha';
import { register, registerByEmail, registerBySms } from '#/api/sys/user';

defineOptions({ name: 'Register' });

const loading = ref(false);
const router = useRouter();

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
            values.selectLoginType === 'email' ||
            values.selectLoginType === 'captcha'
              ? $t('sys.login.emailPlaceholder')
              : $t('sys.login.mobilePlaceholder');

          formData.target = values.target;
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['selectLoginType', 'target'],
      },
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: $t('authentication.password'),
      },
      dependencies: {
        if(values) {
          return values.selectLoginType === 'captcha';
        },
        // 只有指定的字段改变时，才会触发
        triggerFields: ['selectLoginType'],
      },
      renderComponentContent() {
        return {
          strengthText: () => $t('authentication.passwordStrength'),
        };
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(6, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.confirmPassword'),
      },
      dependencies: {
        rules(values) {
          const { password } = values;
          return z
            .string({ required_error: $t('authentication.passwordTip') })
            .min(1, { message: $t('authentication.passwordTip') })
            .refine((value) => value === password, {
              message: $t('authentication.confirmPasswordTip'),
            });
        },
        triggerFields: ['password'],
      },
      fieldName: 'confirmPassword',
      label: $t('authentication.confirmPassword'),
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

async function handleRegister(values: any) {
  loading.value = true;
  switch (values.selectLoginType) {
    case 'captcha': {
      register({
        password: values.password,
        username: values.username,
        captcha: values.captcha,
        captchaId: formData.captchaId,
        email: formData.target,
      })
        .then((data) => {
          if (data.code === 0) {
            message.info($t('sys.login.signupSuccessTitle'));
            router.push('/auth/login');
          } else if (data.code !== 0) {
            getCaptchaData();
          }
        })
        .catch(() => {
          getCaptchaData();
        })
        .finally(() => {
          loading.value = false;
        });

      break;
    }
    case 'email': {
      registerByEmail({
        captcha: values.captchaVerified,
        username: values.username,
        password: values.password,
        email: values.target,
      })
        .then((data) => {
          if (data.code === 0) {
            message.info($t('sys.login.signupSuccessTitle'));
            router.push('/auth/login');
          } else if (data.code !== 0) {
            getCaptchaData();
          }
        })
        .catch(() => {
          getCaptchaData();
        })
        .finally(() => {
          loading.value = false;
        });

      break;
    }
    case 'mobile': {
      registerBySms({
        captcha: values.captchaVerified,
        phoneNumber: values.target,
        username: values.username,
        password: values.password,
      })
        .then((data) => {
          if (data.code === 0) {
            message.info($t('sys.login.signupSuccessTitle'));
            router.push('/auth/login');
          } else if (data.code !== 0) {
            getCaptchaData();
          }
        })
        .catch(() => {
          getCaptchaData();
        })
        .finally(() => {
          loading.value = false;
        });

      break;
    }
    // No default
  }
}
</script>

<template>
  <AuthenticationRegister
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleRegister"
  />
</template>
