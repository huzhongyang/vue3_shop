import axios from 'axios'
import { ElMessage } from 'element-plus'

export interface Goods {
  cat_id: number,
  cat_name: string,
  cat_pid: number,
  cat_level: number,
  cat_deleted: boolean,
  children?: [Goods]
}

export type QueryParam = {
  type?: 1 | 2 | 3,
  pagenum?: number,
  pagesize?: number
}

export interface GetGoodsCategoryList {
  pagenum: number,
  pagesize: number,
  total: number,
  result: [Goods]
}

export interface AddGoodsCategoryParam {
  // 分类名称
  cat_name: string,
  // 分类层级
  cat_level: number,
  // 分类父 ID
  cat_pid: number
}

export async function getGoodsCategoryList(param: QueryParam = {}) {
  const { data: res } = await axios.get('categories', { params: param })
  if (res.meta.status !== 200) {
    ElMessage.error(res.meta.msg)
  } else {
    ElMessage.success(res.meta.msg)
  }
  return res.data as GetGoodsCategoryList | [Goods]
}

export async function postCategory(param: AddGoodsCategoryParam) {
  const { data: res } = await axios.post('categories', param)
  if (res.meta.status !== 201) {
    ElMessage.error(res.meta.msg)
  } else {
    ElMessage.success(res.meta.msg)
  }
}

export async function deleteCategory(categoryId: number) {
  const { data: res } = await axios.delete(`categories/${ categoryId }`)
  if (res.meta.status !== 200) {
    ElMessage.error(res.meta.msg)
  } else {
    ElMessage.success(res.meta.msg)
  }
}
