import type { BaseListResp } from '../../model/baseModel';

/**
 *  @description: Student info response
 */
export interface StudentInfo {
  id?: string;
  createdAt?: number;
  updatedAt?: number;
  status?: number;
  name?: string;
  age?: number;
  address?: string;
  score?: number;
  weight?: number;
  healthy?: boolean;
  code?: number;
  identifyId?: string;
  height?: number;
  expiredAt?: number;
  studentNumber?: string;
}

/**
 *  @description: Student list response
 */

export type StudentListResp = BaseListResp<StudentInfo>;
