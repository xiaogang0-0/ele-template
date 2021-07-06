import Cookies from 'js-cookie'

const TokenKey = 'YXKJ_Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // let millisecond = new Date().getTime();
  // let expiresTime = new Date(millisecond + 1000*20);
  return Cookies.set(TokenKey, token, { expires: 1 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
