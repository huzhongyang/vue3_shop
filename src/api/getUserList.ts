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
  userename: string,
  mobile: string,
  type: number,
  email: string,
  create_time: string,
  mg_state: boolean,
  role_name: string
}

export interface QueryParam {
  query?: string,
  pagenum: number,
  pagesize: number
}

export async function getUserList(queryParam: QueryParam) {
  const { data: res }: { data: GetUserListResponse } = await axios.get('users', { params: queryParam })
  if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
  ElMessage.success(res.meta.msg)
  console.log(res)
  return res.data
}
