<script lang="ts" setup>
import type { Recordable } from '@vben/types';
import type { SelectValue } from 'ant-design-vue/es/select';

import { onMounted, type PropType, ref, unref, watch } from 'vue';

import { LoadingOutlined } from '@ant-design/icons-vue';
import { useVModel } from '@vueuse/core';
import { TreeSelect } from 'ant-design-vue';
import { isArray, isFunction } from 'remeda';

import { get } from '#/utils/object';
import { buildTreeNode } from '#/utils/tree';

const props = defineProps({
  value: {
    type: [Array, Object, String, Number] as PropType<SelectValue>,
    default: undefined,
  },
  api: {
    type: Function as Function as PropType<(arg?: any) => Promise<any>>,
    default: undefined,
  },
  params: { type: Object, default: undefined },
  immediate: { type: Boolean, default: true },
  resultField: {
    type: String,
    default: '',
  },
  labelField: {
    type: String,
    default: '',
  },
  valueField: {
    type: String,
    default: '',
  },
  idKeyField: {
    type: String,
    default: 'id',
  },
  parentKeyField: {
    type: String,
    default: 'parentId',
  },
  childrenKeyField: {
    type: String,
    default: 'children',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  defaultValue: { type: Object, default: undefined },
});

const emits = defineEmits(['update:value', 'optionsChange']);
const state = useVModel(props, 'value', emits, {
  defaultValue: props.value,
  passive: true,
});

const treeData = ref<Recordable<any>[]>([]);
const isFirstLoaded = ref<Boolean>(false);
const loading = ref(false);

watch(
  () => props.params,
  () => {
    !unref(isFirstLoaded) && fetch();
  },
  { deep: true },
);

watch(
  () => props.immediate,
  (v) => {
    v && !isFirstLoaded.value && fetch();
  },
);

onMounted(() => {
  props.immediate && fetch();
});

async function fetch() {
  const { api } = props;
  if (!api || !isFunction(api)) return;
  loading.value = true;
  treeData.value = [];
  let result;
  try {
    result = await api(props.params);
  } catch (error) {
    console.error(error);
  }
  loading.value = false;
  if (!result) return;
  if (!isArray(result)) {
    result = get(result, props.resultField);
  }
  treeData.value = buildTreeNode(result, {
    idKeyField: props.idKeyField,
    parentKeyField: props.parentKeyField,
    childrenKeyField: props.childrenKeyField,
    valueField: props.valueField,
    labelField: props.labelField,
    defaultValue: props.defaultValue,
  });

  emits('optionsChange', treeData.value);

  isFirstLoaded.value = true;
}
</script>

<template>
  <TreeSelect
    v-model:value="state"
    :multiple="$props.multiple"
    class="w-full"
    @dropdown-visible-change="fetch"
  >
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template v-if="loading" #suffixIcon>
      <LoadingOutlined spin />
    </template>
  </TreeSelect>
</template>
