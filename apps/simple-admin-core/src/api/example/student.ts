import type {
  BaseDataResp,
  BaseListReq,
  BaseResp,
  BaseUUIDReq,
  BaseUUIDsReq,
} from '#/api/model/baseModel';

import type { StudentInfo, StudentListResp } from './model/studentModel';

import { requestClient } from '#/api/request';

enum Api {
  CreateStudent = '/example-api/student/create',
  DeleteStudent = '/example-api/student/delete',
  GetStudentById = '/example-api/student',
  GetStudentList = '/example-api/student/list',
  UpdateStudent = '/example-api/student/update',
}

/**
 * @description: Get student list
 */

export const getStudentList = (params: BaseListReq) => {
  return requestClient.post<BaseDataResp<StudentListResp>>(
    Api.GetStudentList,
    params,
  );
};

/**
 *  @description: Create a new student
 */
export const createStudent = (params: StudentInfo) => {
  return requestClient.post<BaseResp>(Api.CreateStudent, params);
};

/**
 *  @description: Update the student
 */
export const updateStudent = (params: StudentInfo) => {
  return requestClient.post<BaseResp>(Api.UpdateStudent, params);
};

/**
 *  @description: Delete students
 */
export const deleteStudent = (params: BaseUUIDsReq) => {
  return requestClient.post<BaseResp>(Api.DeleteStudent, params);
};

/**
 *  @description: Get student By ID
 */
export const getStudentById = (params: BaseUUIDReq) => {
  return requestClient.post<BaseDataResp<StudentInfo>>(
    Api.GetStudentById,
    params,
  );
};
