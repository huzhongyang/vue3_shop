import axios from 'axios'

export async function getReports() {
  const { data: res } = await axios.get('reports/type/1')
  return res.data
}
