import type { BaseListResp } from '../../model/baseModel';

/**
 *  @description: PreOrder info response
 */
export interface PreOrderInfo {
  id?: string;
  createdAt?: number;
  updatedAt?: number;
  orderNo?: string;
  userId?: string;
  prepayId?: string;
  transactionId?: string;
  outTradeNo?: string;
  tradeType?: string;
  price?: number;
  attach?: string;
  notifyData?: string;
  tradeState?: string;
  expiredAt?: number;
  paidAt?: number;
  mqStatus?: number;
  errCode?: string;
  errCodeDesc?: string;
  providerId?: number;
}

/**
 *  @description: PreOrder list response
 */

export type PreOrderListResp = BaseListResp<PreOrderInfo>;
