import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import reducer from './../reducers'
import storage from 'redux-persist/lib/storage'
import createEncryptor from 'redux-persist-transform-encrypt'
import { persistEncryptKey } from './../config'

const encryptor = createEncryptor({
  secretKey: persistEncryptKey
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'settings'],
  transforms: [
    encryptor
  ]
}

const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = [
  thunk,
  createLogger()
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
)

const persistor = persistStore(store)

export { store, persistor }
