import axios from 'axios'
import { ElMessage } from 'element-plus'

export interface Right {
  id: number,
  authName: string,
  level: '0' | '1' | '2',
  pid: number,
  path: string
}

type Meta = {
  msg: string,
  status: number
}

interface GetRightResponse {
  data: [Right],
  meta: Meta
}

export interface Role {
  id: number,
  roleName: string,
  roleDesc: string,
  children?: [SubRole]
}

export type RoleInfo = Pick<Role, 'roleName' | 'roleDesc'>

type SubRole = {
  id: number,
  authName: string,
  path: string,
  children?: [SubRole]
}

export async function getRightsList(type: 'list' | 'tree') {
  const { data: res }: { data: GetRightResponse } = await axios.get(`rights/${ type }`)
  if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
  return res.data
}

export async function getRolesList() {
  const { data: res } = await axios.get('roles')
  if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
  return res.data as [Role]
}

export async function postRole(roleInfo: RoleInfo) {
  const { data: res } = await axios.post('roles', roleInfo)
  if (res.meta.status !== 201) ElMessage.error(res.meta.msg)
  ElMessage.success(res.meta.msg)
}

export async function getRoleInfo(id: number) {
  const { data: res } = await axios.get(`roles/${ id }`)
  if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
  return res.data as RoleInfo
}

export async function putRoleInfo(id: number, roleInfo: RoleInfo) {
  const { data: res } = await axios.put(`roles/${ id }`, roleInfo)
  if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
}
