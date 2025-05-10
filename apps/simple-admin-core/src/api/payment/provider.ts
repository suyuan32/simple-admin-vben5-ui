import type {
  BaseDataResp,
  BaseIDReq,
  BaseIDsReq,
  BaseListReq,
  BaseResp,
} from '#/api/model/baseModel';

import type { ProviderInfo, ProviderListResp } from './model/providerModel';

import { requestClient } from '#/api/request';

enum Api {
  CreateProvider = '/payment-api/provider/create',
  DeleteProvider = '/payment-api/provider/delete',
  GetProviderById = '/payment-api/provider',
  GetProviderList = '/payment-api/provider/list',
  UpdateProvider = '/payment-api/provider/update',
}

/**
 * @description: Get provider list
 */

export const getProviderList = (params: BaseListReq) => {
  return requestClient.post<BaseDataResp<ProviderListResp>>(
    Api.GetProviderList,
    params,
  );
};

/**
 *  @description: Create a new provider
 */
export const createProvider = (params: ProviderInfo) => {
  return requestClient.post<BaseResp>(Api.CreateProvider, params);
};

/**
 *  @description: Update the provider
 */
export const updateProvider = (params: ProviderInfo) => {
  return requestClient.post<BaseResp>(Api.UpdateProvider, params);
};

/**
 *  @description: Delete providers
 */
export const deleteProvider = (params: BaseIDsReq) => {
  return requestClient.post<BaseResp>(Api.DeleteProvider, params);
};

/**
 *  @description: Get provider By ID
 */
export const getProviderById = (params: BaseIDReq) => {
  return requestClient.post<BaseDataResp<ProviderInfo>>(
    Api.GetProviderById,
    params,
  );
};
