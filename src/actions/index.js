export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SHOW_TOAST = 'SHOW_TOAST'
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

export function login (user) {
  return {
    type: LOGIN,
    user
  }
}

export function logout () {
  return {
    type: LOGOUT
  }
}

export function showToast (message) {
  return {
    type: SHOW_TOAST,
    message
  }
}

export function changeLanguage (language) {
  return {
    type: CHANGE_LANGUAGE,
    language
  }
}
