import { v4 } from 'uuid'
import { APPS_TAB, MAIN_SUBSCREEN, SUCCESS } from '../constants/constants'
import {
  SET_CURRENT_TAB,
  SET_SUBSCREEN,
  CREATE_SCREEN,
  GET_SCREEN,
  GET_APP,
  GET_APP_TEMPLATE,
  GET_APPS,
  GET_APP_SCREENS,
  GET_APP_TEMPLATE_SCREENS,
  GET_APP_TEMPLATES,
  GET_SCREENS,
  GET_SCREEN_TEMPLATES,
  GET_FORMS,
  GET_FORM_TEMPLATE,
  GET_FORM_TEMPLATES,
  SET_CONTENT,
  SET_TEMPLATE_CONTENT,
  ADD_SCREEN_COMPONENT,
  GET_APP_TEMPLATE_SCREEN,
  GET_SCREEN_TEMPLATE,
  ADD_SCREEN_TEMPLATE_COMPONENT,
  ADD_FORM_TEMPLATE_COMPONENT,
  PREVIEW,
} from './action_types'

const INITIAL_STATE = {
  app: null,
  appTemplate: null,
  screen: null,
  screenTemplate: null,
  apps: null,
  appScreens: null,
  appTemplates: null,
  appTemplateScreens: null,
  screens: null,
  screenTemplates: null,
  forms: null,
  formTemplate: null,
  formTemplates: null,
  currentTab: APPS_TAB,
  subscreen: MAIN_SUBSCREEN,
  currentScreenContent: [],
  currentScreenTemplateContent: [],
  isAppTemplate: false,
}

export default function (state = INITIAL_STATE, action) {
  const addContent = (component) => {
    const content = [...state.currentScreenContent, ...[component]]
    content.forEach((item) => {
      if (item.ScreenComponent.name) {
        item.ScreenComponent = item.ScreenComponent.name
      }
    })
    const wrappedContent = { content }
    return JSON.stringify(wrappedContent)
  }

  const addTemplateContent = (component) => {
    const content = [...state.currentScreenTemplateContent, ...[component]]
    content.forEach((item) => {
      if (item.ScreenComponent.name) {
        item.ScreenComponent = item.ScreenComponent.name
      }
    })
    const wrappedContent = { content }
    return JSON.stringify(wrappedContent)
  }

  console.log('ACTION', action)
  switch (action.type) {
    case `${ADD_FORM_TEMPLATE_COMPONENT}-${SUCCESS}`:
      return { ...state, form: action.data }
    case `${ADD_SCREEN_COMPONENT}-${SUCCESS}`:
      return {
        ...state,
        screen: { ...state.screen, content: addContent(action.data) },
        currentScreenContent: [...state.currentScreenContent, ...[action.data]],
      }
    case `${ADD_SCREEN_TEMPLATE_COMPONENT}-${SUCCESS}`:
      return {
        ...state,
        screenTemplate: { ...state.screenTemplate, content: addTemplateContent(action.data) },
        currentScreenTemplateContent: [...state.currentScreenTemplateContent, ...[action.data]],
      }
    case SET_CONTENT:
      return { ...state, currentScreenContent: action.data }
    case SET_TEMPLATE_CONTENT:
      return { ...state, currentScreenTemplateContent: action.data }
    case SET_CURRENT_TAB:
      return { ...state, currentTab: action.data, subscreen: MAIN_SUBSCREEN }
    case SET_SUBSCREEN:
      return { ...state, subscreen: action.data }
    case `${GET_APPS}-${SUCCESS}`:
      return { ...state, apps: action.data }
    case `${GET_APP_TEMPLATES}-${SUCCESS}`:
      return { ...state, appTemplates: action.data }
    case `${GET_APP}-${SUCCESS}`:
      return { ...state, isAppTemplate: false, app: action.data }
    case `${GET_APP_TEMPLATE}-${SUCCESS}`:
      return { ...state, isAppTemplate: true, appTemplate: action.data }
    case `${GET_APP_SCREENS}-${SUCCESS}`:
      return { ...state, appScreens: action.data }
    case `${GET_APP_TEMPLATE_SCREENS}-${SUCCESS}`:
      return { ...state, appTemplateScreens: action.data }
    case `${GET_FORMS}-${SUCCESS}`:
      return { ...state, forms: action.data }
    case `${GET_FORM_TEMPLATE}-${SUCCESS}`:
      return { ...state, form: action.data }
    case `${GET_FORM_TEMPLATES}-${SUCCESS}`:
      return { ...state, formTemplates: action.data }
    case `${GET_SCREEN_TEMPLATES}-${SUCCESS}`:
      return { ...state, screenTemplates: action.data }
    case `${GET_SCREEN}-${SUCCESS}`:
      return { ...state, screen: action.data }
    case `${PREVIEW}-${SUCCESS}`:
      return { ...state, screen: action.data }
    case `${GET_SCREEN_TEMPLATE}-${SUCCESS}`:
      return { ...state, screenTemplate: action.data }
    case `${GET_APP_TEMPLATE_SCREEN}-${SUCCESS}`:
      return { ...state, screen: action.data }
    case `${CREATE_SCREEN}-${SUCCESS}`:
      return state
    case `${GET_SCREENS}-${SUCCESS}`:
      return { ...state, screens: action.data }

    default:
      return state
  }
}
