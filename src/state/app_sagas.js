import { put, call, takeLatest } from 'redux-saga/effects'
import { v4 } from 'uuid'
import API from './api'
import { actionSuccess, actionError } from './actions'
import * as Components from '../components/builder'
import {
  ADD_FORM_TEMPLATE_COMPONENT,
  ADD_IMAGE_COMPONENT,
  ADD_SCREEN_COMPONENT,
  ADD_TEXT_COMPONENT,
  ADD_SCREEN_TEMPLATE_COMPONENT,
  CREATE_APP,
  CREATE_APP_TEMPLATE,
  CREATE_FORM_TEMPLATE,
  CREATE_SCREEN,
  CREATE_APP_TEMPLATE_SCREEN,
  GET_APP,
  GET_APPS,
  GET_APP_SCREENS,
  GET_APP_TEMPLATE,
  GET_APP_TEMPLATES,
  GET_APP_TEMPLATE_SCREEN,
  GET_APP_TEMPLATE_SCREENS,
  GET_FORM,
  GET_FORMS,
  GET_FORM_TEMPLATES,
  GET_SCREEN,
  GET_SCREEN_TEMPLATE,
  GET_SCREEN_TEMPLATES,
  GET_SCREENS,
  PREVIEW,
  PUBLISH,
  UPDATE_SCREEN,
  UPDATE_SCREEN_TEMPLATE,
  UPDATE_APP_TEMPLATE_SCREEN,
  CREATE_SCREEN_TEMPLATE,
  GET_FORM_TEMPLATE,
  UPDATE_FORM_TEMPLATE,
} from './action_types'
import * as Constants from '../constants/constants'

const reviver = (key, value) => {
  if (typeof value === 'string' && value.startsWith('constants.')) {
    const constantKey = value.substring('constants.'.length)
    return Constants[constantKey]
  }
  if (key === 'ScreenComponent') {
    console.log('REVIVING', value)
    return Components[value]
  }
  if (value === 'undefined') {
    return undefined
  }
  return value
}

const deserialize = (json) => {
  const parsed = JSON.parse(json, reviver)
  return parsed
}

export const addFormTemplateComponent = function* (action) {
  const { type, data } = action
  try {
    const { form, component } = data
    console.log('FORM TEMPLATE', form)
    const dataDeserialized = deserialize(form.data)

    const newComponent = {
      id: v4(),
      name: component.title,
      orderId: component.orderId,
      type: component.type,
      ScreenComponent: Components[component.name],
    }
    console.log('NEW FORM TEMPLATE COMPONENT', newComponent)
    console.log('OLD FORM TEMPLATE', dataDeserialized)
    dataDeserialized.data.push(newComponent)
    console.log('NEW FORM TEMPLATE', dataDeserialized)

    dataDeserialized.data.forEach((item) => {
      if (item.ScreenComponent.name) {
        item.componentName = item.ScreenComponent.name
      }
    })
    const payload = { data: dataDeserialized, id: form.id }
    const result = yield call(API.updateFormTemplate, payload)
    yield put(actionSuccess(result, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchAddFormTemplateComponent = function* () {
  yield takeLatest(ADD_FORM_TEMPLATE_COMPONENT, addFormTemplateComponent)
}

export const addTextComponent = function* (action) {
  const { type, data } = action
  try {
    console.log('ITEM', data)
    const newTextComponent = {
      id: v4(),
      parentId: data.parentComponentId,
      height: 50,
      width: 100,
      type: data.type,
    }
    // const payload = { data: dataDeserialized, id: form.id }
    // const result = yield call(API.updateFormTemplate, payload)
    // yield put(actionSuccess(result, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchAddTextComponent = function* () {
  yield takeLatest(ADD_TEXT_COMPONENT, addTextComponent)
}

export const addScreenComponent = function* (action) {
  const { type, data: component } = action
  try {
    const newComponent = {
      id: v4(),
      name: component.title,
      orderId: component.orderId,
      ScreenComponent: Components[component.name],
    }
    console.log('NEW SCREEN COMPONENT', newComponent)
    yield put(actionSuccess(newComponent, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchAddScreenComponent = function* () {
  yield takeLatest(ADD_SCREEN_COMPONENT, addScreenComponent)
}

export const addScreenTemplateComponent = function* (action) {
  const { type, data: component } = action
  try {
    const newComponent = {
      id: v4(),
      name: component.title,
      orderId: component.orderId,
      ScreenComponent: Components[component.name],
    }
    console.log('NEW SCREEN TEMPLATE COMPONENT', newComponent)
    yield put(actionSuccess(newComponent, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchAddScreenTemplateComponent = function* () {
  yield takeLatest(ADD_SCREEN_TEMPLATE_COMPONENT, addScreenTemplateComponent)
}

export const createApp = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.createApp, action.data)
    yield put(actionSuccess(data, type))
    const data2 = yield call(API.getApps)
    yield put(actionSuccess(data2, GET_APPS))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchCreateApp = function* () {
  yield takeLatest(CREATE_APP, createApp)
}

export const createAppTemplate = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.createAppTemplate, action.data)
    yield put(actionSuccess(data, type))
    const data2 = yield call(API.getAppTemplates)
    yield put(actionSuccess(data2, GET_APP_TEMPLATES))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchCreateAppTemplate = function* () {
  yield takeLatest(CREATE_APP_TEMPLATE, createAppTemplate)
}

export const createFormTemplate = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.createFormTemplate, action.data)
    yield put(actionSuccess(data, type))
    const data2 = yield call(API.getFormTemplates)
    yield put(actionSuccess(data2, GET_FORM_TEMPLATES))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchCreateFormTemplate = function* () {
  yield takeLatest(CREATE_FORM_TEMPLATE, createFormTemplate)
}

export const createScreen = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.createScreen, action.data)
    yield put(actionSuccess(data, type))
    const data2 = yield call(API.getAppScreens, action.data.app_id)
    yield put(actionSuccess(data2, GET_APP_SCREENS))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchCreateScreen = function* () {
  yield takeLatest(CREATE_SCREEN, createScreen)
}

export const createScreenTemplate = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.createScreenTemplate, action.data)
    yield put(actionSuccess(data, type))
    const data2 = yield call(API.getScreenTemplates, action.data.app_id)
    yield put(actionSuccess(data2, GET_SCREEN_TEMPLATES))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchCreateScreenTemplate = function* () {
  yield takeLatest(CREATE_SCREEN_TEMPLATE, createScreenTemplate)
}

export const createAppTemplateScreen = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.createAppTemplateScreen, action.data)
    yield put(actionSuccess(data, type))
    const data2 = yield call(API.getAppTemplateScreens, action.data.app_template_id)
    yield put(actionSuccess(data2, GET_APP_TEMPLATE_SCREENS))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchCreateTemplateScreen = function* () {
  yield takeLatest(CREATE_APP_TEMPLATE_SCREEN, createAppTemplateScreen)
}

export const getAppTemplateScreen = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getAppTemplateScreen, action.data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetTemplateScreen = function* () {
  yield takeLatest(GET_APP_TEMPLATE_SCREEN, getAppTemplateScreen)
}

export const getApp = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getApp, action.data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetApp = function* () {
  yield takeLatest(GET_APP, getApp)
}

export const getAppTemplate = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getAppTemplate, action.data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetAppTemplate = function* () {
  yield takeLatest(GET_APP_TEMPLATE, getAppTemplate)
}

export const getApps = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getApps)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetApps = function* () {
  yield takeLatest(GET_APPS, getApps)
}

export const getAppScreens = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getAppScreens, action.data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetAppScreens = function* () {
  yield takeLatest(GET_APP_SCREENS, getAppScreens)
}

export const getAppTemplates = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getAppTemplates)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetAppTemplates = function* () {
  yield takeLatest(GET_APP_TEMPLATES, getAppTemplates)
}

export const getAppTemplateScreens = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getAppTemplateScreens, action.data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetAppTemplateScreens = function* () {
  yield takeLatest(GET_APP_TEMPLATE_SCREENS, getAppTemplateScreens)
}

export const getForm = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getForm)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetForm = function* () {
  yield takeLatest(GET_FORM, getForm)
}

export const getFormTemplate = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getFormTemplate, action.data)
    console.log('GET FORM TEMPLATE DATA', data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetFormTemplate = function* () {
  yield takeLatest(GET_FORM_TEMPLATE, getFormTemplate)
}

export const getForms = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getForms)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetForms = function* () {
  yield takeLatest(GET_FORMS, getForms)
}

export const getFormTemplates = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getFormTemplates)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetFormTemplates = function* () {
  yield takeLatest(GET_FORM_TEMPLATES, getFormTemplates)
}

export const getScreen = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getScreen, action.data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetScreen = function* () {
  yield takeLatest(GET_SCREEN, getScreen)
}

export const getScreens = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getScreens)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetScreens = function* () {
  yield takeLatest(GET_SCREENS, getScreens)
}

export const getScreenTemplate = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getScreenTemplate, action.data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetScreenTemplate = function* () {
  yield takeLatest(GET_SCREEN_TEMPLATE, getScreenTemplate)
}

export const getScreenTemplates = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.getScreenTemplates)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchGetScreenTemplates = function* () {
  yield takeLatest(GET_SCREEN_TEMPLATES, getScreenTemplates)
}

export const preview = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.preview, action.data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchPreview = function* () {
  yield takeLatest(PREVIEW, preview)
}

export const publish = function* (action) {
  const { type } = action
  try {
    const data = yield call(API.publish, action.data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchPublish = function* () {
  yield takeLatest(PUBLISH, publish)
}

export const updateAppTemplateScreen = function* (action) {
  const { type } = action
  try {
    action.data.content.forEach((item) => {
      if (item.ScreenComponent.name) {
        item.componentName = item.ScreenComponent.name
      }
    })

    const data = yield call(API.updateAppTemplateScreen, action.data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchUpdateAppTemplateScreen = function* () {
  yield takeLatest(UPDATE_APP_TEMPLATE_SCREEN, updateAppTemplateScreen)
}

export const updateFormTemplate = function* (action) {
  console.log('===== updateFormTemplate action', action)
  const { type } = action
  try {
    action.data.data.forEach((item) => {
      if (item.ScreenComponent.name) {
        item.componentName = item.ScreenComponent.name
      }
    })

    const newData = { id: action.data.id, data: action.data }

    const data = yield call(API.updateFormTemplate, newData)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchUpdateFormTemplate = function* () {
  yield takeLatest(UPDATE_FORM_TEMPLATE, updateFormTemplate)
}

export const updateScreen = function* (action) {
  const { type } = action
  try {
    action.data.content.forEach((item) => {
      if (item.ScreenComponent.name) {
        item.componentName = item.ScreenComponent.name
      }
    })

    const data = yield call(API.updateScreen, action.data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchUpdateScreen = function* () {
  yield takeLatest(UPDATE_SCREEN, updateScreen)
}

export const updateScreenTemplate = function* (action) {
  const { type } = action
  try {
    action.data.templateContent.forEach((item) => {
      if (item.ScreenComponent.name) {
        item.componentName = item.ScreenComponent.name
      }
    })

    const data = yield call(API.updateScreenTemplate, action.data)
    yield put(actionSuccess(data, type))
  } catch (error) {
    yield put(actionError(error, type))
  }
}
export const watchUpdateScreenTemplate = function* () {
  yield takeLatest(UPDATE_SCREEN_TEMPLATE, updateScreenTemplate)
}
