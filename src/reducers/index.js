import enStrings from './../resources/strings.json'
import ptStrings from './../resources/strings.pt-br.json'

import {
  LOGIN,
  LOGOUT,
  SHOW_TOAST,
  CHANGE_LANGUAGE
} from './../actions'

import { REHYDRATE } from 'redux-persist'

const initialState = {
  R: { strings: enStrings },
  settings: { language: 'en' },
  user: null,
  showToast: 0,
  toastMessage: ''
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.user
      }

    case LOGOUT:
      return {
        ...state,
        user: null
      }

    case SHOW_TOAST:
      return {
        ...state,
        showToast: new Date().getTime(),
        toastMessage: action.message
      }

    case CHANGE_LANGUAGE:
      const strings = action.language === 'pt-br' ? ptStrings : enStrings

      return {
        ...state,
        settings: { language: action.language },
        R: { strings }
      }

    case REHYDRATE:
      if (action.payload &&
        action.payload.settings &&
        action.payload.settings.language === 'pt-br') {
        return {
          ...state,
          R: { strings: ptStrings }
        }
      } else {
        return state
      }

    default:
      return (state)
  }
}

export default reducer
