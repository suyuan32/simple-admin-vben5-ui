<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';

import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  message,
  Row,
} from 'ant-design-vue';

import { initializeFileDatabase } from '#/api/fms/initialize';
import { initializeMMSDatabase } from '#/api/member/initialize';
// api
import {
  initializeJobDatabase,
  initializeMcmsDatabase,
  initialzeCoreDatabase,
} from '#/api/sys/initialize';

defineOptions({
  name: 'InitializationPage',
});
const ACard = Card;
const ACol = Col;
const ARow = Row;
const coreInitButtonLoading = ref<boolean>(false);
const fileInitButtonLoading = ref<boolean>(false);
const mmsInitButtonLoading = ref<boolean>(false);
const jobInitButtonLoading = ref<boolean>(false);
const mcmsInitButtonLoading = ref<boolean>(false);
const customInitButtonLoading = ref<boolean>(false);
const customInitUrl = ref<string>('http://localhost');
const customInitPort = ref<string>('9100');
const customInitService = ref<string>('');

async function initCustomDatabase() {
  const serviceName: string =
    customInitService.value === '' ? '' : `/${customInitService.value}`;
  customInitButtonLoading.value = true;
  window.open(
    `${customInitUrl.value}:${customInitPort.value}${
      serviceName
    }/init/database`,
    '_blank',
  );
  customInitButtonLoading.value = false;
}

async function initCoreDatabase() {
  coreInitButtonLoading.value = true;
  const result = await initialzeCoreDatabase().finally(() => {
    coreInitButtonLoading.value = false;
  });
  if (result.code === 0) {
    message.success(result.msg, 3);
  }
}

async function initFileDatabase() {
  fileInitButtonLoading.value = true;
  const result = await initializeFileDatabase().finally(() => {
    fileInitButtonLoading.value = false;
  });
  if (result.code === 0) {
    message.success(result.msg, 3);
  }
}

async function initMMSDatabase() {
  mmsInitButtonLoading.value = true;
  const result = await initializeMMSDatabase().finally(() => {
    mmsInitButtonLoading.value = false;
  });
  if (result.code === 0) {
    message.success(result.msg, 3);
  }
}

async function initJobDatabase() {
  jobInitButtonLoading.value = true;
  const result = await initializeJobDatabase().finally(() => {
    jobInitButtonLoading.value = false;
  });
  if (result.code === 0) {
    message.success(result.msg, 3);
  }
}

async function initMcmsDatabase() {
  mcmsInitButtonLoading.value = true;
  const result = await initializeMcmsDatabase().finally(() => {
    mcmsInitButtonLoading.value = false;
  });
  if (result.code === 0) {
    message.success(result.msg, 3);
  }
}
</script>
<template>
  <Page>
    <ARow :gutter="[16, 16]">
      <ACol :span="6">
        <ACard :hoverable="true" :title="$t('sys.init.initCoreDatabase')">
          <p>
            <a href="https://github.com/suyuan32/simple-admin-core">
              Core Github
            </a>
          </p>
          <Button
            :loading="coreInitButtonLoading"
            type="primary"
            @click="initCoreDatabase"
          >
            {{ $t('common.start') }}
          </Button>
        </ACard>
      </ACol>
      <ACol :span="6">
        <ACard :hoverable="true" :title="$t('sys.init.initFileDatabase')">
          <p>
            <a href="https://github.com/suyuan32/simple-admin-file">
              File Manager Github
            </a>
          </p>
          <Button
            :loading="fileInitButtonLoading"
            type="primary"
            @click="initFileDatabase"
          >
            {{ $t('common.start') }}
          </Button>
        </ACard>
      </ACol>
      <ACol :span="6">
        <ACard :hoverable="true" :title="$t('sys.init.initMMSDatabase')">
          <p>
            <a href="https://github.com/suyuan32/simple-admin-member-api">
              Member Github
            </a>
          </p>
          <Button
            :loading="mmsInitButtonLoading"
            type="primary"
            @click="initMMSDatabase"
          >
            {{ $t('common.start') }}
          </Button>
        </ACard>
      </ACol>
      <ACol :span="6">
        <ACard :hoverable="true" :title="$t('sys.init.initJobDatabase')">
          <p>
            <a href="https://github.com/suyuan32/simple-admin-job">
              Job Github
            </a>
          </p>
          <Button
            :loading="jobInitButtonLoading"
            type="primary"
            @click="initJobDatabase"
          >
            {{ $t('common.start') }}
          </Button>
        </ACard>
      </ACol>
      <ACol :span="6">
        <ACard :hoverable="true" :title="$t('sys.init.initMcmsDatabase')">
          <p>
            <a href="https://github.com/suyuan32/simple-admin-message-center">
              Mcms Github
            </a>
          </p>
          <Button
            :loading="mcmsInitButtonLoading"
            type="primary"
            @click="initMcmsDatabase"
          >
            {{ $t('common.start') }}
          </Button>
        </ACard>
      </ACol>
    </ARow>
    <Divider />
    <ARow>
      <ACol :span="12">
        <ACard :hoverable="true" :title="$t('sys.init.initCustom')">
          <p>{{ $t('sys.init.initUrl') }}</p>
          <p>
            <Input v-model:value="customInitUrl" />
          </p>
          <p>{{ $t('sys.init.initPort') }}</p>
          <p>
            <Input v-model:value="customInitPort" />
          </p>
          <p>{{ $t('sys.init.initService') }}</p>
          <p>
            <Input
              v-model:value="customInitService"
              :placeholder="$t('sys.init.initOptional')"
            />
          </p>
          <p>{{ $t('sys.init.initRedirect') }}</p>
          <p>
            <Button
              :loading="customInitButtonLoading"
              type="primary"
              @click="initCustomDatabase"
            >
              {{ $t('common.start') }}
            </Button>
          </p>
        </ACard>
      </ACol>
    </ARow>
  </Page>
</template>
