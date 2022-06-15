import { combineReducers } from 'redux'
import AppReducer from './app_reducer'
import FormReducer from './form_reducer'

const rootReducer = combineReducers({
  app: AppReducer,
  form: FormReducer,
})

export default rootReducer
