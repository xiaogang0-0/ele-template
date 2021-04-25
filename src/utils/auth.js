import Cookies from 'js-cookie'

const TokenKey = 'ShoppingMall_Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 1 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 设置userInfo
const UserInfoKey = 'ShoppingMall_userInfo'

export function getUserInfo() {
  return Cookies.get(UserInfoKey)
}

export function setUserInfo(info) {
  return Cookies.set(UserInfoKey, info, { expires: 1 })
}

export function removeUserInfo() {
  return Cookies.remove(UserInfoKey)
}
