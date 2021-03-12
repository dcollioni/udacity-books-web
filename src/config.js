export const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || window.env.API_ENDPOINT

export const authConfig = {
  domain: process.env.REACT_APP_AUTH_DOMAIN || window.env.AUTH_DOMAIN,
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID || window.env.AUTH_CLIENT_ID,
  callbackUrl: process.env.REACT_APP_AUTH_CALLBACK_URL || window.env.AUTH_CALLBACK_URL,
  logoutReturnUrl: process.env.REACT_APP_AUTH_LOGOUT_RETURN_URL || window.env.AUTH_LOGOUT_RETURN_URL,
}

export const persistEncryptKey = process.env.REACT_APP_PERSIST_ENCRYPT_KEY || window.env.PERSIST_ENCRYPT_KEY
