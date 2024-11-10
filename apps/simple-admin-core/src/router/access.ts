import type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
} from '@vben/types';

import { generateAccessible } from '@vben/access';
import { preferences } from '@vben/preferences';

import { array2tree } from '@axolo/tree-array';
import { message } from 'ant-design-vue';

import { getMenuListByRole } from '#/api/sys/menu';
import { ParentIdEnum } from '#/enums/common';
import { BasicLayout, IFrame } from '#/layouts';
import { $t } from '#/locales';

const forbiddenComponent = () => import('#/views/_core/fallback/forbidden.vue');

async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  const pageMap: ComponentRecordType = import.meta.glob('../views/**/*.vue');

  const layoutMap: ComponentRecordType = {
    BasicLayout,
    IFrame,
  };

  return await generateAccessible(preferences.app.accessMode, {
    ...options,
    fetchMenuListAsync: async () => {
      message.loading({
        content: `${$t('common.loadingMenu')}...`,
        duration: 1.5,
      });
      const menuData = await getMenuListByRole();
      menuData.data.data.forEach((val, _idx, _arr) => {
        if (val.component === 'LAYOUT') {
          val.component = '';
        }
      });
      menuData.data.data.push({
        id: ParentIdEnum.DEFAULT,
        component: 'BasicLayout',
        meta: {
          icon: 'ic:baseline-view-in-ar',
          keepAlive: true,
          sort: -1,
          title: $t('sys.menu.managementCenter'),
        },
        path: '/',
        name: 'Root',
      });
      return array2tree(menuData.data.data);
    },
    // 可以指定没有权限跳转403页面
    forbiddenComponent,
    // 如果 route.meta.menuVisibleWithForbidden = true
    layoutMap,
    pageMap,
  });
}

export { generateAccess };
