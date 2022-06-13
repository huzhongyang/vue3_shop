import axios from 'axios'

export interface MenuItem {
  id: number,
  authName: string,
  path: string,
  children: [MenuItem | []],
  order: number | null
}

interface AsideMenusData {
  data: [MenuItem],
  meta: { msg: string, status: number }
}

async function getAsideMenus() {
  const { data: res }: { data: AsideMenusData } = await axios.get('menus')
  if (res.meta.status === 400) throw new Error(res.meta.msg)
  return res
}

export { getAsideMenus }
