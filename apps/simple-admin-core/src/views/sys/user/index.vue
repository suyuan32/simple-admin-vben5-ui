<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { UserInfo } from '#/api/sys/model/userModel';

import { h } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { Button, message, Switch } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getUserList, updateUser } from '#/api/sys/user';
import UserForm from '#/views/sys/user/UserForm.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: UserForm,
});

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
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
    // {
    //   fieldName: 'roleIds',
    //   label: $t('sys.role.roleTitle'),
    //   component: 'ApiMultipleSelect',
    //   componentProps: {
    //     api: getRoleList,
    //     params: {
    //       page: 1,
    //       pageSize: 100,
    //     },
    //     resultField: 'data.data',
    //     labelField: 'trans',
    //     valueField: 'id',
    //   },
    // },
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
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeGridProps<UserInfo> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    {
      title: $t('sys.login.username'),
      field: 'username',
    },
    {
      title: $t('sys.user.nickname'),
      field: 'nickname',
    },
    {
      title: $t('sys.login.email'),
      field: 'email',
    },
    {
      title: $t('common.status'),
      field: 'status',
      slots: {
        default: (e) =>
          h(Switch, {
            checked: e.row.status === 1,
            onClick: () => {
              if (e.row.username === 'admin') {
                message.warn($t('sys.role.adminStatusChangeForbidden'));
                return;
              }

              const newStatus = e.row.status === 1 ? 2 : 1;
              updateUser({ id: e.row.id, status: newStatus }).then(() => {
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
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const res = await getUserList({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        return res.data;
      },
    },
  },
};

function openFormModal() {
  formModalApi.open();
}

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });
</script>

<template>
  <Page auto-content-height>
    <FormModal />
    <Grid>
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="openFormModal">
          {{ $t('sys.user.addUser') }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
