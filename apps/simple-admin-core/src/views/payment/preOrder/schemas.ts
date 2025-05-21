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
      title: $t('payment.preOrder.orderNo'),
      field: 'orderNo',
    },
    {
      title: $t('payment.preOrder.userId'),
      field: 'userId',
    },
    {
      title: $t('payment.preOrder.tradeType'),
      field: 'tradeType',
    },
    {
      title: $t('payment.preOrder.price'),
      field: 'price',
    },
    {
      title: $t('payment.preOrder.attach'),
      field: 'attach',
    },
    {
      title: $t('payment.preOrder.paidAt'),
      field: 'paidAt',
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
      fieldName: 'orderNo',
      label: $t('payment.preOrder.orderNo'),
      component: 'Input',
    },
    {
      fieldName: 'userId',
      label: $t('payment.preOrder.userId'),
      component: 'Input',
    },
    {
      fieldName: 'prepayId',
      label: $t('payment.preOrder.prepayId'),
      component: 'Input',
    },
    {
      fieldName: 'transactionId',
      label: $t('payment.preOrder.transactionId'),
      component: 'Input',
    },
    {
      fieldName: 'price',
      label: $t('payment.preOrder.price'),
      component: 'InputNumber',
    },
    {
      fieldName: 'attach',
      label: $t('payment.preOrder.attach'),
      component: 'Input',
    },
    {
      fieldName: 'tradeState',
      label: $t('payment.preOrder.tradeState'),
      component: 'Input',
    },
    {
      fieldName: 'mqStatus',
      label: $t('payment.preOrder.mqStatus'),
      component: 'InputNumber',
    },
    {
      fieldName: 'errCode',
      label: $t('payment.preOrder.errCode'),
      component: 'Input',
    },
    {
      fieldName: 'providerId',
      label: $t('payment.preOrder.providerId'),
      component: 'InputNumber',
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
      fieldName: 'orderNo',
      label: $t('payment.preOrder.orderNo'),
      component: 'Input',
    },
    {
      fieldName: 'userId',
      label: $t('payment.preOrder.userId'),
      component: 'Input',
    },
    {
      fieldName: 'prepayId',
      label: $t('payment.preOrder.prepayId'),
      component: 'Input',
    },
    {
      fieldName: 'transactionId',
      label: $t('payment.preOrder.transactionId'),
      component: 'Input',
    },
    {
      fieldName: 'outTradeNo',
      label: $t('payment.preOrder.outTradeNo'),
      component: 'Input',
    },
    {
      fieldName: 'tradeType',
      label: $t('payment.preOrder.tradeType'),
      component: 'Input',
    },
    {
      fieldName: 'price',
      label: $t('payment.preOrder.price'),
      component: 'InputNumber',
    },
    {
      fieldName: 'attach',
      label: $t('payment.preOrder.attach'),
      component: 'Input',
    },
    {
      fieldName: 'notifyData',
      label: $t('payment.preOrder.notifyData'),
      component: 'Input',
    },
    {
      fieldName: 'tradeState',
      label: $t('payment.preOrder.tradeState'),
      component: 'Input',
    },
    {
      fieldName: 'expiredAt',
      label: $t('payment.preOrder.expiredAt'),
      component: 'InputNumber',
    },
    {
      fieldName: 'paidAt',
      label: $t('payment.preOrder.paidAt'),
      component: 'InputNumber',
    },
    {
      fieldName: 'mqStatus',
      label: $t('payment.preOrder.mqStatus'),
      component: 'InputNumber',
    },
    {
      fieldName: 'errCode',
      label: $t('payment.preOrder.errCode'),
      component: 'Input',
    },
    {
      fieldName: 'errCodeDesc',
      label: $t('payment.preOrder.errCodeDesc'),
      component: 'Input',
    },
    {
      fieldName: 'providerId',
      label: $t('payment.preOrder.providerId'),
      component: 'InputNumber',
    },
  ],
};
