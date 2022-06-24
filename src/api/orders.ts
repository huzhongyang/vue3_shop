import axios from 'axios'

export type QueryParam = {
  query?: string,
  pagenum: number,
  pagesize: number
}

export type Order = {
  order_id: number,
  user_id: number,
  order_number: string,
  order_price: number,
  order_pay: string,
  is_send: string,
  trade_no: string,
  order_fapiao_title: string,
  order_fapiao_company: string,
  order_fapiao_content: string,
  consignee_addr: string,
  pay_status: string,
  create_time: Date,
  update_time: Date
}

export async function getOrders(querParam: QueryParam) {
  const { data: res } = await axios.get('orders', { params: querParam })
  return res.data as {
    total: number,
    pagenum: string,
    goods: Order[]
  }
}
