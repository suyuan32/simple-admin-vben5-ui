import type { BaseListResp } from '../../model/baseModel';

/**
 *  @description: Provider info response
 */
export interface ProviderInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  name?: string;
  providerType?: string;
  appid?: string;
  mchid?: string;
  serialNo?: string;
  apiKey?: string;
  privateKey?: string;
  alipayAppCert?: string;
  alipayRootCert?: string;
  alipayPublicCert?: string;
}

/**
 *  @description: Provider list response
 */

export type ProviderListResp = BaseListResp<ProviderInfo>;
