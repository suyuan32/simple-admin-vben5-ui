<script lang="ts" setup>
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';
import type { UserInfo } from '#/api/sys/model/userModel';

import { h, ref } from 'vue';

import { Page, useVbenModal, type VbenFormProps } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { Button, message, Modal, Switch } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getRoleList } from '#/api/sys/role';
import { deleteUser, getUserList, updateUser } from '#/api/sys/user';
import { type ActionItem, TableAction } from '#/components/table/table-action';
import UserForm from '#/views/sys/user/UserForm.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: UserForm,
});

const showDeleteButton = ref<boolean>(false);

const gridEvents: VxeGridListeners<any> = {
  checkboxChange(e) {
    showDeleteButton.value = e.$table.getCheckboxRecords().length > 0;
  },
  checkboxAll(e) {
    showDeleteButton.value = e.$table.getCheckboxRecords().length > 0;
  },
};

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
  toolbarConfig: {
    slots: {
      buttons: 'toolbar-buttons',
    },
  },
  columns: [
    {
      type: 'checkbox',
      width: 60,
    },
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
    {
      title: $t('common.action'),
      fixed: 'right',
      field: 'action',
      slots: {
        default: ({ row }) =>
          h(TableAction, {
            actions: [
              {
                label: '',
                type: 'link',
                size: 'small',
                icon: 'clarity:note-edit-line',
                onClick: openFormModal.bind(null, row),
              },
              {
                icon: 'bx:log-out-circle',
                type: 'link',
                color: 'error',
                tooltip: $t('sys.user.forceLoggingOut'),
                popConfirm: {
                  title: $t('sys.user.forceLoggingOut'),
                  placement: 'left',
                  // confirm: handleLogout.bind(null, record),
                },
              },
              {
                icon: 'ant-design:delete-outlined',
                type: 'link',
                color: 'error',
                popConfirm: {
                  title: $t('common.deleteConfirm'),
                  placement: 'left',
                  // confirm: handleDelete.bind(null, record),
                },
              },
            ] as ActionItem[],
          }),
      },
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

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents,
});

function openFormModal(record: any) {
  if (record) {
    formModalApi.setData({
      record,
      isUpdate: true,
      gridApi,
    });
  }
  formModalApi.open();
}

function batchDelete() {
  Modal.confirm({
    title: $t('common.deleteConfirm'),
    async onOk() {
      const rowData = gridApi.grid.getCheckboxRecords();
      if (rowData.some((row) => row.nickname === 'admin')) {
        message.warn($t('common.notAllowDeleteAdminData'));
        return;
      }

      const ids = gridApi.grid.getCheckboxRecords().map((item: any) => item.id);

      const result = await deleteUser({
        ids,
      });
      if (result.code === 0) {
        await gridApi.reload();
        showDeleteButton.value = false;
      }
    },
  });
}
</script>

<template>
  <Page auto-content-height>
    <FormModal />
    <Grid @checkbox-change="openFormModal">
      <template #toolbar-buttons>
        <Button
          v-show="showDeleteButton"
          danger
          type="primary"
          @click="batchDelete"
        >
          {{ $t('common.delete') }}
        </Button>
      </template>

      <template #toolbar-tools>
        <Button type="primary" @click="openFormModal">
          {{ $t('sys.user.addUser') }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
