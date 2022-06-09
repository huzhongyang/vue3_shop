import axios from 'axios'

interface MenuItem {
  id: number,
  authName: string,
  path: string,
  children: [MenuItem | []],
  order: number
}

interface AsideMenusData {
  data: [MenuItem],
  meta: { msg: string, status: number }
}

async function getAsideMenus () {
  const { data: res }: { data: AsideMenusData } = await axios.get('menus')
  return res
}

export { getAsideMenus }
