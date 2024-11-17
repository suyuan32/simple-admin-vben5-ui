import type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
} from '@vben/types';

import type { RouteItem } from '#/api/sys/model/menuModel';

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

      // 兼容旧版本，将 dashboard 添加目录, 未来将移除
      menuData.data.data.push({
        id: -1,
        component: 'BasicLayout',
        meta: {
          icon: 'ic:baseline-view-in-ar',
          keepAlive: false,
          sort: -1,
          title: $t('sys.menu.managementCenter'),
        },
        path: '/dashboard_dir',
        name: 'DashBoardDir',
        parentId: ParentIdEnum.DEFAULT,
      });

      menuData.data.data.forEach((val, _idx, _arr) => {
        if (val.component === 'LAYOUT') {
          val.component = '';
        }

        if (val.name === 'Dashboard') {
          val.parentId = -1;
        }

        val.meta.hideInMenu = val.meta.hideMenu as any;
        val.meta.hideInTab = val.meta.hideTab as any;
        val.meta.hideInBreadcrumb = val.meta.hideBreadcrumb as any;
        val.meta.keepAlive = !val.meta.ignoreKeepAlive as boolean;
      });

      const treeData: RouteItem[] = array2tree(
        menuData.data.data,
      ) as RouteItem[];
      treeData.forEach((val, idx, arr) => {
        if (val.component === '' && arr[idx]) {
          arr[idx].component = 'BasicLayout';
        }
      });
      return treeData;
    },
    // 可以指定没有权限跳转403页面
    forbiddenComponent,
    // 如果 route.meta.menuVisibleWithForbidden = true
    layoutMap,
    pageMap,
  });
}

export { generateAccess };
