import axios from 'axios'
import { ElMessage } from 'element-plus'

export interface Right {
  id: number,
  authName: string,
  level: '0' | '1' | '2',
  pid: number,
  path: string
}

export interface RightTree {
  id: number,
  authName: string,
  path: null,
  pid: number | string,
  children?: [RightTree]
}

export interface Role {
  id: number,
  roleName: string,
  roleDesc: string,
  children?: [SubRole]
}

export type RoleInfo = Pick<Role, 'roleName' | 'roleDesc'>

export type SubRole = {
  id: number,
  authName: string,
  path: string,
  children?: [SubRole]
}

export async function getRightsList(type: 'list' | 'tree') {
  const { data: res } = await axios.get(`rights/${ type }`)
  if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
  switch (type) {
    case 'list':
      return res.data as [Right]
    case 'tree':
      return res.data as [RightTree]
  }
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

export async function deleteRole(id: number) {
  const { data: res } = await axios.delete(`roles/${ id }`)
  if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
}

// 删除角色的某个三级权限
export async function deleteRolePermission(roleId: number, permissionId: number) {
  const { data: res } = await axios.delete(`roles/${ roleId }/rights/${ permissionId }`)
  if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
  ElMessage.success(res.meta.msg)
  return res.data
}

// 为角色分配权限
export async function postRights(roleId: number, rightsId: string) {
  const { data: res } = await axios.post(`roles/${ roleId }/rights`, { rids: rightsId })
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
  ElMessage.success(res.meta.msg)
}
