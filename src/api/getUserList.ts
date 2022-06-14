import axios from 'axios'
import { ElMessage } from 'element-plus'

interface GetUserListResponse {
  data: {
    total: number,
    pagenum: number,
    users: [User]
  },
  meta: {
    msg: string,
    status: number
  }
}

export interface User {
  id: number,
  username: string,
  mobile: string,
  type: number,
  email: string,
  create_time: string,
  mg_state: boolean,
  role_name: string
}

export interface QueryParam {
  query: string,
  pagenum: number,
  pagesize: number
}

// 添加用户
export interface PostUser {
  username: string,
  password: string,
  email?: string,
  mobile?: string
}

// 修改用户信息
export interface EditeUserInfo {
  username: string,
  email: string,
  mobile: string
}

export async function getUserList(queryParam: QueryParam) {
  const { data: res }: { data: GetUserListResponse } = await axios.get('users', { params: queryParam })
  if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
  ElMessage.success(res.meta.msg)
  return res.data
}

// 修改用户状态
export async function putUserState(id: number, state: boolean) {
  await axios.put(`users/${ id }/state/${ state }`)
}

// 添加用户
export async function postUser(postUser: PostUser) {
  const { data: res }: { data: GetUserListResponse } = await axios.post('users', postUser)
  if (res.meta.status !== 201) throw ElMessage.error(res.meta.msg)
  ElMessage.success(res.meta.msg)
  return res
}

// 修改用户信息
export async function putUserInfo(id: number, userInfo: EditeUserInfo) {
  const { data: res } = await axios.put(`users/${ id }`, userInfo)
  if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
  ElMessage.success(res.meta.msg)
}

// 删除某用户
export async function deleteUser(id: number) {
  const { data: res } = await axios.delete(`users/${ id }`)
  return res
}
