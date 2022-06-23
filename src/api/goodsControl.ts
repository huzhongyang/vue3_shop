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

export async function putCategory(categoryId: number, categoryName: string) {
  const { data: res } = await axios.put(`categories/${ categoryId }`, { cat_name: categoryName })
  if (res.meta.status !== 200) {
    ElMessage.error(res.meta.msg)
  } else {
    ElMessage.success(res.meta.msg)
  }
}

export interface CategoryAttribute {
  // 分类参数 ID
  attr_id: number,
  // 分类参数名称
  attr_name: string,
  // 分类参数所属分类
  cat_id: number,
  // only:输入框(唯一) many:后台下拉列表/前台单选框
  attr_sel: 'only' | 'many',
  // manual:手工录入 list:从列表选择
  attr_write: 'manual' | 'list',
  // 如果 attr_write:list,那么有值，该值以逗号分隔
  attr_vals?: string
}

export async function getCategoryAttributes(categoryId: number, type: 'only' | 'many') {
  const { data: res } = await axios.get(`categories/${ categoryId }/attributes`, { params: { sel: type } })
  if (res.meta.status !== 200) {
    ElMessage.error(res.meta.msg)
  } else {
    ElMessage.success(res.meta.msg)
  }
  return res.data as [CategoryAttribute]
}

export type AttributeData = Omit<CategoryAttribute, 'attr_write'>

export async function postCategoryAttribute(attr: AttributeData) {
  const { data: res } = await axios.post(`categories/${ attr.cat_id }/attributes`, attr)
  if (res.meta.status !== 201) {
    ElMessage.error(res.meta.msg)
  } else {
    ElMessage.success(res.meta.msg)
  }
}

export async function deleteAttribute(categoryId: number, attributeId: number) {
  const { data: res } = await axios.delete(`categories/${ categoryId }/attributes/${ attributeId }`)
  if (res.meta.status !== 200) {
    ElMessage.error(res.meta.msg)
  } else {
    ElMessage.success(res.meta.msg)
  }
}

export async function putParam(attr: AttributeData, attrId: number) {
  const { data: res } = await axios.put(`categories/${ attr.cat_id }/attributes/${ attrId }`, attr)
  if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
}

export interface ExpandRowData {
  tagInputVisable: boolean,
  tagInputData: string,
  data: AttributeData
}

export type GoodListQueryParam = {
  pagenum: number,
  pagesize: number,
  query?: string
}

export interface GodListResponseData {
  total: number,
  pagenum: number,
  goods: [Good]
}

export interface Good {
  goods_id: number,
  goods_name: string,
  goods_price: number,
  goods_number: number,
  goods_weight: number,
  goods_state: null,
  add_time: string,
  upd_time: bigint,
  hot_number: number,
  is_promote: boolean,
  goods_cat: string,
  pics?: { pic: string } [],
  goods_introduce?: string
}

export async function getGoodList(queryParam: GoodListQueryParam) {
  const { data: res } = await axios.get('goods', { params: queryParam })
  if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
  return res.data as GodListResponseData
}

export async function postGoods(goods: Good) {
  const { data: res } = await axios.post('goods', goods)
  return res
}
