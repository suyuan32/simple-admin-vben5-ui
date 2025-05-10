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
      title: $t('payment.provider.mchid'),
      field: 'mchid',
    },
    {
      title: $t('payment.provider.serialNo'),
      field: 'serialNo',
    },
    {
      title: $t('payment.provider.apiKey'),
      field: 'apiKey',
    },
    {
      title: $t('payment.provider.privateKey'),
      field: 'privateKey',
    },
    {
      title: $t('payment.provider.alipayAppCert'),
      field: 'alipayAppCert',
    },
    {
      title: $t('payment.provider.alipayRootCert'),
      field: 'alipayRootCert',
    },
    {
      title: $t('payment.provider.alipayPublicCert'),
      field: 'alipayPublicCert',
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
      fieldName: 'createdAtBegin',
      label: $t('payment.provider.createdAtBegin'),
      component: 'InputNumber',
    },
    {
      fieldName: 'createdAtEnd',
      label: $t('payment.provider.createdAtEnd'),
      component: 'InputNumber',
    },
    {
      fieldName: 'updatedAtBegin',
      label: $t('payment.provider.updatedAtBegin'),
      component: 'InputNumber',
    },
    {
      fieldName: 'updatedAtEnd',
      label: $t('payment.provider.updatedAtEnd'),
      component: 'InputNumber',
    },
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
    {
      fieldName: 'mchid',
      label: $t('payment.provider.mchid'),
      component: 'Input',
    },
    {
      fieldName: 'serialNo',
      label: $t('payment.provider.serialNo'),
      component: 'Input',
    },
    {
      fieldName: 'apiKey',
      label: $t('payment.provider.apiKey'),
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
      component: 'Input',
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
    },
    {
      fieldName: 'serialNo',
      label: $t('payment.provider.serialNo'),
      component: 'Input',
    },
    {
      fieldName: 'apiKey',
      label: $t('payment.provider.apiKey'),
      component: 'Input',
    },
    {
      fieldName: 'privateKey',
      label: $t('payment.provider.privateKey'),
      component: 'Input',
    },
    {
      fieldName: 'alipayAppCert',
      label: $t('payment.provider.alipayAppCert'),
      component: 'Input',
    },
    {
      fieldName: 'alipayRootCert',
      label: $t('payment.provider.alipayRootCert'),
      component: 'Input',
    },
    {
      fieldName: 'alipayPublicCert',
      label: $t('payment.provider.alipayPublicCert'),
      component: 'Input',
    },
  ],
};
