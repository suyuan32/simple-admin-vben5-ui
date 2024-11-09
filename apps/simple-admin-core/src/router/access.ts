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
import { IFrame, LAYOUT } from '#/layouts';
import { $t } from '#/locales';

const forbiddenComponent = () => import('#/views/_core/fallback/forbidden.vue');

async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  const pageMap: ComponentRecordType = import.meta.glob('../views/**/*.vue');

  const layoutMap: ComponentRecordType = {
    LAYOUT,
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
      menuData.data.data.push({
        id: ParentIdEnum.DEFAULT,
        component: 'LAYOUT',
        meta: {
          icon: 'ic:baseline-view-in-ar',
          keepAlive: true,
          sort: -1,
          title: $t('sys.menu.managementCenter'),
        },
        path: '/',
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
