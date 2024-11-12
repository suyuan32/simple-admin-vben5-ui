<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getDepartmentList } from '#/api/sys/department';
import { getPositionList } from '#/api/sys/position';
import { getRoleList } from '#/api/sys/role';

defineOptions({
  name: 'UserForm',
});

const record = ref();
const isUpdate = ref(false);
const gridApi = ref();

function onSubmit(values: Record<string, any>) {
  message.info(JSON.stringify(values)); // 只会执行一次
}

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    // {
    //   fieldName: 'avatar',
    //   label: $t('sys.user.avatar'),
    //   defaultValue: '',
    //   component: 'CropperAvatar',
    //   componentProps: {
    //     // uploadApi: uploadApi,
    //     btnText: $t('sys.user.changeAvatar'),
    //     width: 100,
    //     formValueType: 'string',
    //   },
    // },
    {
      fieldName: 'id',
      label: 'ID',
      component: 'Input',
    },
    {
      fieldName: 'username',
      label: $t('sys.login.username'),
      component: 'Input',
    },
    {
      fieldName: 'nickname',
      label: $t('sys.user.nickname'),
      component: 'Input',
    },
    {
      fieldName: 'description',
      label: $t('sys.user.description'),
      component: 'Input',
    },
    {
      fieldName: 'homePath',
      label: $t('sys.user.homePath'),
      defaultValue: '/dashboard',
      component: 'Input',
    },
    {
      fieldName: 'mobile',
      label: $t('sys.login.mobile'),
      component: 'Input',
    },
    {
      fieldName: 'email',
      label: $t('sys.login.email'),
      component: 'Input',
    },
    {
      fieldName: 'password',
      label: $t('sys.login.password'),
      component: 'Input',
    },
    {
      fieldName: 'roleIds',
      label: $t('sys.role.roleTitle'),
      component: 'ApiSelect',
      componentProps: {
        api: getRoleList,
        params: {
          page: 1,
          pageSize: 100,
        },
        resultField: 'data.data',
        labelField: 'trans',
        valueField: 'id',
        multiple: true,
      },
    },
    {
      fieldName: 'departmentId',
      label: $t('sys.department.userDepartment'),
      component: 'ApiTreeSelect',
      componentProps: {
        api: getDepartmentList,
        params: {
          page: 1,
          pageSize: 1000,
        },
        resultField: 'data.data',
        labelField: 'trans',
        valueField: 'id',
      },
    },
    {
      fieldName: 'positionId',
      label: $t('sys.position.userPosition'),
      component: 'ApiSelect',
      componentProps: {
        api: getPositionList,
        params: {
          page: 1,
          pageSize: 1000,
          name: '',
        },
        resultField: 'data.data',
        labelField: 'trans',
        valueField: 'id',
        multiple: true,
      },
    },
    {
      fieldName: 'status',
      label: $t('common.status'),
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
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    await formApi.submitForm();
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    isUpdate.value = modalApi.getData()?.isUpdate ?? false;
    record.value = isOpen ? modalApi.getData()?.record || {} : {};
    gridApi.value = isOpen ? modalApi.getData()?.gridApi : null;
    if (isOpen) {
      formApi.setValues(record.value);
    }
  },
  title: isUpdate.value ? $t('sys.user.editUser') : $t('sys.user.addUser'),
});

defineExpose(modalApi);
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
