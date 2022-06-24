// 校验邮箱
export const checkEmail = (rule: any, value: any, callBack: any) => {
  const regEmail = /^[A-Za-z\d\u4e00-\u9fa5]+@[a-zA-Z\d_-]+(\.[a-zA-Z\d_-]+)+$/
  if (regEmail.test(value)) {
    return callBack()
  }
  callBack(new Error('请输入正确的邮箱'))
}

// 校验手机号
export const checkMobile = (rule: any, value: any, callBack: any) => {
  const regMobile = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  if (regMobile.test(value)) {
    return callBack()
  }
  callBack(new Error('请输入正确的手机号'))
}

export function timeFormat(addTime: string) {
  return new Date(addTime).toLocaleString()
}
