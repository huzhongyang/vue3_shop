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

export async function getRightsList(type: 'list' | 'tree') {
  const { data: res }: { data: GetRightResponse } = await axios.get(`rights/${ type }`)
  if (res.meta.status !== 200) ElMessage.error(res.meta.msg)
  return res.data
}
