import axios from 'axios'

interface LoginDate {
  username: string
  password: string
}

// login 请求返回 数据类型
interface LoginResponse {
  data: {
          email: string
          id: number
          mobile: string
          rid: number
          token: string
          username: string
        } | null
  meta: {
    msg: string
    status: number
  }
}

export default {
  /**
   * login 请求
   * @param {LoginDate} loginDate
   * @returns {Promise<LoginResponse>}
   */
  async login(loginDate: LoginDate) {

    const { data: res }: { data: LoginResponse } = await axios.post('login', loginDate)
    return res

  }
}
