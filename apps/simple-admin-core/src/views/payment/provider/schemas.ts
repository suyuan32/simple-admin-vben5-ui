import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';

import { $t } from '@vben/locales';

export const tableColumns: VxeGridProps = {
  columns: [
    {
      type: 'checkbox',
      width: 60,
    },

    {
      title: $t('payment.provider.name'),
      field: 'name',
    },
    {
      title: $t('payment.provider.providerType'),
      field: 'providerType',
    },
    {
      title: $t('payment.provider.appid'),
      field: 'appid',
    },
    {
      title: $t('payment.provider.sandbox'),
      field: 'sandbox',
    },

    {
      title: $t('common.createTime'),
      field: 'createdAt',
      formatter: 'formatDateTime',
    },
  ],
};

export const searchFormSchemas: VbenFormProps = {
  schema: [
    {
      fieldName: 'name',
      label: $t('payment.provider.name'),
      component: 'Input',
    },
    {
      fieldName: 'providerType',
      label: $t('payment.provider.providerType'),
      component: 'Input',
    },
    {
      fieldName: 'appid',
      label: $t('payment.provider.appid'),
      component: 'Input',
    },
  ],
};

export const dataFormSchemas: VbenFormProps = {
  schema: [
    {
      fieldName: 'id',
      label: 'ID',
      component: 'Input',
      dependencies: {
        show: false,
        triggerFields: ['id'],
      },
    },
    {
      fieldName: 'name',
      label: $t('payment.provider.name'),
      component: 'Input',
    },
    {
      fieldName: 'providerType',
      label: $t('payment.provider.providerType'),
      component: 'Select',
      componentProps: {
        options: [
          { label: $t('payment.provider.alipay'), value: 'alipay' },
          { label: $t('payment.provider.wechatpay'), value: 'wechat_pay' },
        ],
        class: 'w-full',
      },
    },
    {
      fieldName: 'appid',
      label: $t('payment.provider.appid'),
      component: 'Input',
    },
    {
      fieldName: 'mchid',
      label: $t('payment.provider.mchid'),
      component: 'Input',
      dependencies: {
        triggerFields: ['providerType'],
        show(values, _) {
          return values.providerType === 'wechat_pay';
        },
      },
    },
    {
      fieldName: 'serialNo',
      label: $t('payment.provider.serialNo'),
      component: 'Input',
      dependencies: {
        triggerFields: ['providerType'],
        show(values, _) {
          return values.providerType === 'wechat_pay';
        },
      },
    },
    {
      fieldName: 'apiKey',
      label: $t('payment.provider.apiKey'),
      component: 'Input',
      dependencies: {
        triggerFields: ['providerType'],
        show(values, _) {
          return values.providerType === 'wechat_pay';
        },
      },
    },
    {
      fieldName: 'privateKey',
      label: $t('payment.provider.privateKey'),
      component: 'Input',
      dependencies: {
        triggerFields: ['providerType'],
        show(values, _) {
          return values.providerType === 'wechat_pay';
        },
      },
    },
    {
      fieldName: 'alipayAppCert',
      label: $t('payment.provider.alipayAppCert'),
      component: 'Input',
      dependencies: {
        triggerFields: ['providerType'],
        show(values, _) {
          return values.providerType === 'alipay';
        },
      },
    },
    {
      fieldName: 'alipayRootCert',
      label: $t('payment.provider.alipayRootCert'),
      component: 'Input',
      dependencies: {
        triggerFields: ['providerType'],
        show(values, _) {
          return values.providerType === 'alipay';
        },
      },
    },
    {
      fieldName: 'alipayPublicCert',
      label: $t('payment.provider.alipayPublicCert'),
      component: 'Input',
      dependencies: {
        triggerFields: ['providerType'],
        show(values, _) {
          return values.providerType === 'alipay';
        },
      },
    },
    {
      fieldName: 'notifyUrl',
      label: $t('payment.provider.notifyUrl'),
      component: 'Input',
    },
    {
      fieldName: 'orderExpiredTime',
      label: $t('payment.provider.orderExpiredTime'),
      component: 'InputNumber',
    },
    {
      fieldName: 'sandbox',
      label: $t('payment.provider.sandbox'),
      component: 'RadioButtonGroup',
      defaultValue: true,
      componentProps: {
        options: [
          { label: $t('common.on'), value: true },
          { label: $t('common.off'), value: false },
        ],
      },
    },
  ],
};
