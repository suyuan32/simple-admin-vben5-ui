import type { VxeGridProps } from '#/adapter/vxe-table';
import type { VbenFormProps } from '@vben/common-ui';

import { updateStudent } from '#/api/example/student';
import { $t } from '@vben/locales';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';

export const tableColumns: VxeGridProps = {
  columns: [
    {
      type: 'checkbox',
      width: 60,
    },

    {
      title: $t('example.student.name'),
      field: 'name',
    },
    {
      title: $t('example.student.age'),
      field: 'age',
    },
    {
      title: $t('example.student.address'),
      field: 'address',
    },
    {
      title: $t('example.student.score'),
      field: 'score',
    },
    {
      title: $t('example.student.weight'),
      field: 'weight',
    },
    {
      title: $t('example.student.healthy'),
      field: 'healthy',
    },
    {
      title: $t('example.student.code'),
      field: 'code',
    },
    {
      title: $t('example.student.identifyId'),
      field: 'identifyId',
    },
    {
      title: $t('example.student.height'),
      field: 'height',
    },
    {
      title: $t('example.student.expiredAt'),
      field: 'expiredAt',
    },
    {
      title: $t('example.student.studentNumber'),
      field: 'studentNumber',
    },
    {
      title: $t('common.status'),
      field: 'status',
      slots: {
        default: (e) =>
          h(Switch, {
            checked: e.row.status === 1,
            onClick: () => {
              const newStatus = e.row.status === 1 ? 2 : 1;
              updateStudent({ id: e.row.id, status: newStatus }).then(() => {
                e.row.status = newStatus;
              });
            },
          }),
      },
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
      fieldName: 'status',
      label: $t('example.student.status'),
      component: 'InputNumber',
    },
    {
      fieldName: 'name',
      label: $t('example.student.name'),
      component: 'Input',
    },
    {
      fieldName: 'age',
      label: $t('example.student.age'),
      component: 'InputNumber',
    },
    {
      fieldName: 'address',
      label: $t('example.student.address'),
      component: 'Input',
    },
    {
      fieldName: 'score',
      label: $t('example.student.score'),
      component: 'InputNumber',
    },
    {
      fieldName: 'weight',
      label: $t('example.student.weight'),
      component: 'InputNumber',
    },
    {
      fieldName: 'healthy',
      label: $t('example.student.healthy'),
      component: 'RadioButtonGroup',
      defaultValue: true,
      componentProps: {
        options: [
          { label: $t('common.on'), value: true },
          { label: $t('common.off'), value: false },
        ],
      },
    },
    {
      fieldName: 'code',
      label: $t('example.student.code'),
      component: 'InputNumber',
    },
    {
      fieldName: 'identifyId',
      label: $t('example.student.identifyId'),
      component: 'Input',
    },
    {
      fieldName: 'height',
      label: $t('example.student.height'),
      component: 'InputNumber',
    },
    {
      fieldName: 'expiredAt',
      label: $t('example.student.expiredAt'),
      component: 'InputNumber',
    },
    {
      fieldName: 'studentNumber',
      label: $t('example.student.studentNumber'),
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
      label: $t('example.student.name'),
      component: 'Input',
    },
    {
      fieldName: 'age',
      label: $t('example.student.age'),
      component: 'InputNumber',
    },
    {
      fieldName: 'address',
      label: $t('example.student.address'),
      component: 'Input',
    },
    {
      fieldName: 'score',
      label: $t('example.student.score'),
      component: 'InputNumber',
    },
    {
      fieldName: 'weight',
      label: $t('example.student.weight'),
      component: 'InputNumber',
    },
    {
      fieldName: 'healthy',
      label: $t('example.student.healthy'),
      component: 'RadioButtonGroup',
      defaultValue: true,
      componentProps: {
        options: [
          { label: $t('common.on'), value: true },
          { label: $t('common.off'), value: false },
        ],
      },
    },
    {
      fieldName: 'code',
      label: $t('example.student.code'),
      component: 'InputNumber',
    },
    {
      fieldName: 'identifyId',
      label: $t('example.student.identifyId'),
      component: 'Input',
    },
    {
      fieldName: 'height',
      label: $t('example.student.height'),
      component: 'InputNumber',
    },
    {
      fieldName: 'expiredAt',
      label: $t('example.student.expiredAt'),
      component: 'InputNumber',
    },
    {
      fieldName: 'studentNumber',
      label: $t('example.student.studentNumber'),
      component: 'Input',
    },
    {
      fieldName: 'status',
      label: $t('example.student.status'),
      component: 'RadioButtonGroup',
      defaultValue: 1,
      componentProps: {
        options: [
          { label: $t('common.on'), value: 1 },
          { label: $t('common.off'), value: 2 },
        ],
      },
    },
  ],
};
