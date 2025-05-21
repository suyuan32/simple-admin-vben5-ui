import type {
  BaseDataResp,
  BaseListReq,
  BaseResp,
  BaseUUIDReq,
  BaseUUIDsReq,
} from '#/api/model/baseModel';

import type { PreOrderInfo, PreOrderListResp } from './model/preOrderModel';

import { requestClient } from '#/api/request';

enum Api {
  CreatePreOrder = '/payment-api/pre_order/create',
  DeletePreOrder = '/payment-api/pre_order/delete',
  GetPreOrderById = '/payment-api/pre_order',
  GetPreOrderList = '/payment-api/pre_order/list',
  UpdatePreOrder = '/payment-api/pre_order/update',
}

/**
 * @description: Get pre order list
 */

export const getPreOrderList = (params: BaseListReq) => {
  return requestClient.post<BaseDataResp<PreOrderListResp>>(
    Api.GetPreOrderList,
    params,
  );
};

/**
 *  @description: Create a new pre order
 */
export const createPreOrder = (params: PreOrderInfo) => {
  return requestClient.post<BaseResp>(Api.CreatePreOrder, params);
};

/**
 *  @description: Update the pre order
 */
export const updatePreOrder = (params: PreOrderInfo) => {
  return requestClient.post<BaseResp>(Api.UpdatePreOrder, params);
};

/**
 *  @description: Delete pre orders
 */
export const deletePreOrder = (params: BaseUUIDsReq) => {
  return requestClient.post<BaseResp>(Api.DeletePreOrder, params);
};

/**
 *  @description: Get pre order By ID
 */
export const getPreOrderById = (params: BaseUUIDReq) => {
  return requestClient.post<BaseDataResp<PreOrderInfo>>(
    Api.GetPreOrderById,
    params,
  );
};
