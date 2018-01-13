import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import watches from './watches'
import watch from './watch'
import cart from './cart'
import unauthcart from './unauthcart'

const reducer = combineReducers({user, watches, watch, cart})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './watches'
export * from './watch'
export * from './cart'
export * from './unauthcart'
