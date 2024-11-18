<script lang="ts" setup>
import { onMounted } from 'vue';

import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { Card, Col, message, Row } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { changePassword, getUserProfile, updateProfile } from '#/api/sys/user';

import { changePasswordFormSchemas, dataFormSchemas } from './schemas';

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [...(dataFormSchemas.schema as any)],
  showDefaultActions: true,
  layout: 'vertical',
});

onMounted(() => {
  getUserData();
});

async function getUserData() {
  const result = await getUserProfile();
  if (result.code === 0) {
    formApi.setValues(result.data);
  }
}

const [ChangePassForm] = useVbenForm({
  handleSubmit: onSubmitChangePassword,
  schema: [...(changePasswordFormSchemas.schema as any)],
  showDefaultActions: true,
  layout: 'vertical',
});

async function onSubmitChangePassword(values: Record<string, any>) {
  const result = await changePassword(values as any);
  if (result.code === 0) {
    message.success($t('common.successful'));
  }
}

async function onSubmit(values: Record<string, any>) {
  const result = await updateProfile(values as any);
  if (result.code === 0) {
    message.success($t('common.successful'));
  }
}
</script>

<template>
  <Page>
    <Row>
      <Col :span="11">
        <Card :title="$t('sys.user.profile')">
          <Form />
        </Card>
      </Col>
      <Col :offset="1" :span="11">
        <Card :title="$t('sys.user.changePassword')"> <ChangePassForm /> </Card>
      </Col>
    </Row>
  </Page>
</template>
