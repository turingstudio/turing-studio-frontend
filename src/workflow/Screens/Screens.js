import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import { useModal } from 'react-modal-hook'
import update from 'immutability-helper'
import ScreensStyled from './screens_styles'
import ScreenBuilderPalette from '../../components/studio/ScreenBuilderPalette/ScreenBuilderPalette'
import ScreenBuilder from '../../components/studio/ScreenBuilder/ScreenBuilder'
import AppIcon from '../../components/studio/AppIcon/AppIcon'
import * as Constants from '../../constants/constants'
import { action } from '../../state/actions'
import * as Components from '../../components/builder'
import {
  GET_SCREEN_TEMPLATES,
  PUBLISH,
  PREVIEW,
  SET_CURRENT_TAB,
  CREATE_SCREEN,
  UPDATE_SCREEN,
  UPDATE_SCREEN_TEMPLATE,
  SET_CONTENT,
  SET_TEMPLATE_CONTENT,
  UPDATE_APP_TEMPLATE_SCREEN,
  CREATE_SCREEN_TEMPLATE,
  GET_SCREEN,
  SET_SUBSCREEN,
  GET_APP_TEMPLATE_SCREEN,
  GET_SCREEN_TEMPLATE,
} from '../../state/action_types'
import {
  PREVIEW_TAB,
  MAIN_SUBSCREEN,
  SCREEN_SUBSCREEN,
  SCREEN_TEMPLATE_SUBSCREEN,
  SCREENS_TAB,
} from '../../constants/constants'
import AppsStyled from '../Apps/apps_styles'
import AppModal from '../../components/studio/app_modal_styles'
import TextInput from '../../components/studio/TextInput/TextInput'
import { DarkButton, LightButton } from '../../components/studio/Button/button_styles'

const Screens = function () {
  const [content, setContent] = useState([])
  const [templateContent, setTemplateContent] = useState([])
  const [currentScreenId, setCurrentScreenId] = useState()
  const [appTemplateScreenNameValid, setTemplateScreenNameValid] = useState(false)
  const [currentScreenTemplateId, setCurrentScreenTemplateId] = useState()
  const [screenNameValid, setScreenNameValid] = useState(false)
  const [screenTemplateNameValid, setScreenTemplateNameValid] = useState(false)
  const [screenNames, setScreenNames] = useState([])
  const [screenTemplateNames, setScreenTemplateNames] = useState([])
  const [errors, setErrors] = useState({})
  const [screenName, setScreenName] = useState('')
  const [templateName, setTemplateName] = useState('')

  const dispatch = useDispatch()
  const app = useSelector((state) => state.app)
  const { isAppTemplate, screen, screenTemplate, screenTemplates, subscreen, app: appInstance } = app

  useEffect(() => {
    dispatch(action({ type: GET_SCREEN_TEMPLATES }))
  }, [])

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

  useEffect(() => {
    if (screen && screen.content) {
      console.log('=================== CURRENT SCREEN ID', screen.id)
      if (screen.id) {
        setCurrentScreenId(screen.id)
      }
      const contentDeserialized = deserialize(screen.content).content
      const contentSorted = contentDeserialized.sort((a, b) => (b.orderId < a.orderId ? 1 : -1))
      console.log('CONTENT SORTED', contentSorted)
      dispatch(action({ type: SET_CONTENT, data: contentSorted }))
      setContent(contentSorted)
    }
  }, [screen])

  useEffect(() => {
    if (screenTemplate && screenTemplate.content) {
      console.log('=================== CURRENT SCREEN TEMPLATE ID', screenTemplate.id)
      if (screenTemplate.id) {
        setCurrentScreenTemplateId(screenTemplate.id)
      }
      const contentDeserialized = deserialize(screenTemplate.content).content
      const contentSorted = contentDeserialized.sort((a, b) => (b.orderId < a.orderId ? 1 : -1))
      console.log('TEMPLATE CONTENT SORTED', contentSorted)
      dispatch(action({ type: SET_TEMPLATE_CONTENT, data: contentSorted }))
      setTemplateContent(contentSorted)
    }
  }, [screenTemplate])

  useEffect(() => {
    console.log('CONTENT CHANGED', content)
    if (screen) {
      console.log('SCREEN', screen)
      dispatch(
        action({
          type: isAppTemplate ? UPDATE_APP_TEMPLATE_SCREEN : UPDATE_SCREEN,
          data: { id: currentScreenId, content },
        })
      )
    }
  }, [content])

  useEffect(() => {
    console.log('TEMPLATE CONTENT CHANGED', templateContent)
    if (screenTemplate) {
      console.log('=================== CURRENT SCREEN TEMPLATE ID', currentScreenTemplateId)
      console.log('SCREEN TEMPLATE', screenTemplate)
      dispatch(action({ type: UPDATE_SCREEN_TEMPLATE, data: { id: currentScreenTemplateId, templateContent } }))
    }
  }, [templateContent])

  useEffect(() => {
    setScreenNames(screenTemplates && screenTemplates.map(({ name }) => name))
  }, [screenTemplates])

  const addScreen = () => {
    const { id } = app
    dispatch(action({ type: CREATE_SCREEN, data: { app_id: id, name: screenName } }))
    hideScreenModal()
  }

  const addScreenTemplate = () => {
    dispatch(action({ type: CREATE_SCREEN_TEMPLATE, data: { name: screenName } }))
    hideScreenTemplateModal()
  }

  const openAddScreenDialog = (item) => {
    const name = item?.name || 'Blank'
    setErrors({})
    setScreenNameValid(false)
    setTemplateName(name)
    showScreenModal()
  }

  const openAddScreenTemplateDialog = () => {
    setErrors({})
    setScreenTemplateNameValid(false)
    showScreenTemplateModal()
  }

  const openAddTemplateScreenDialog = (item) => {
    const name = item?.name || 'Blank'
    setErrors({})
    setTemplateScreenNameValid(false)
    setTemplateName(name)
    showTemplateScreenModal()
  }

  const moveComponent = (orderId, hoverIndex) => {
    console.log('IN moveComponent()')
    const dragIndex = orderId - 1
    const dragComponent = content[dragIndex]
    const updatedContent = update(content, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragComponent],
      ],
    })
    setContent(updatedContent)
    dispatch(action({ type: UPDATE_SCREEN, data: { id: screen.id, content: updatedContent } }))
  }

  const updateHeight = (id, height) => {
    console.log(`Update ${id} height to ${height}`)
    content.find((component) => component.id === id).height = height
    dispatch(action({ type: UPDATE_SCREEN, data: { id: screen.id, content } }))
  }

  const moveTemplateComponent = (orderId, hoverIndex) => {
    console.log('IN moveTemplateComponent()')
    const dragIndex = orderId - 1
    const dragComponent = content[dragIndex]
    const updatedTemplateContent = update(content, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragComponent],
      ],
    })
    setTemplateContent(updatedTemplateContent)
    dispatch(action({ type: UPDATE_SCREEN_TEMPLATE, data: { id: screenTemplate.id, content: updatedTemplateContent } }))
  }

  const handleScreenTemplateIconClick = (id) => {
    dispatch(action({ type: GET_SCREEN_TEMPLATE, data: id }))
    dispatch(action({ type: SET_CURRENT_TAB, data: SCREENS_TAB }))
    dispatch(action({ type: SET_SUBSCREEN, data: SCREEN_TEMPLATE_SUBSCREEN }))
  }

  const renderAuthoringScreen = () => {
    if (content.length) {
      return content.map((item) => {
        if (item) {
          const { ScreenComponent, orderId, name, id, height } = item
          return (
            <ScreenComponent
              key={orderId}
              moveComponent={moveComponent}
              orderId={orderId}
              name={name}
              id={id}
              height={height}
              updateHeight={updateHeight}
            />
          )
        }
      })
    }
    return <div />
  }

  const renderTemplateAuthoringScreen = () => {
    if (templateContent.length) {
      return templateContent.map((item) => {
        if (item) {
          const { ScreenComponent, orderId, name, id } = item
          return (
            <ScreenComponent
              key={orderId}
              moveComponent={moveTemplateComponent}
              orderId={orderId}
              name={name}
              id={id}
            />
          )
        }
      })
    }
    return <div />
  }

  const removeScreenComponent = (currentItem) => {
    console.log('REMOVING ITEM', currentItem)
    const filteredContent = content.filter((component) => component.id !== currentItem.id)
    setContent(filteredContent)
    dispatch(action({ type: UPDATE_SCREEN, data: { id: screen.id, content: filteredContent } }))
  }

  const removeScreenTemplateComponent = (currentItem) => {
    console.log('REMOVING ITEM', currentItem)
    const filteredContent = content.filter((component) => component.id !== currentItem.id)
    setTemplateContent(filteredContent)
    dispatch(action({ type: UPDATE_SCREEN_TEMPLATE, data: { id: screenTemplate.id, content: filteredContent } }))
  }

  const onScreenNameChange = (e) => {
    const name = e.target.value
    setScreenNameValid(name && name.length && !screenNames.includes(name))
    setScreenName(name)
    if ((name && !name.length) || screenNames.includes(name)) {
      setErrors({ errors, screenName: 'Name in use' })
    } else {
      setErrors({ errors, screenName: '' })
    }
  }

  const onScreenTemplateNameChange = (e) => {
    const name = e.target.value
    setScreenTemplateNameValid(name && name.length && !screenNames.includes(name))
    setScreenName(name)
    if ((name && !name.length) || screenNames.includes(name)) {
      setErrors({ errors, screenTemplateName: 'Name in use' })
    } else {
      setErrors({ errors, screenTemplateName: '' })
    }
  }

  const onAppTemplateScreenNameChange = (e) => {
    const name = e.target.value
    setTemplateScreenNameValid(name && name.length && !appTemplateScreenNames.includes(name))
    setTemplateScreenName(name)
    if ((name && !name.length) || appTemplateScreenNames.includes(name)) {
      setErrors({ errors, appTemplateScreenName: 'Name in use' })
    } else {
      setErrors({ errors, appTemplateScreenName: '' })
    }
  }

  const [showScreenModal, hideScreenModal] = useModal(
    () => (
      <Modal
        isOpen
        onRequestClose={() => hideScreenModal()}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <AppModal>
          <AppModal.title>Add Screen</AppModal.title>
          <AppModal.subtitle>Template: {templateName}</AppModal.subtitle>
          <TextInput label="Screen Name" onChange={onScreenNameChange} errorMessage={errors.screenName} />
          <AppModal.buttons>
            <LightButton onClick={() => hideScreenModal()}>Cancel</LightButton>
            <DarkButton
              disabled={!screenNameValid}
              onClick={() => {
                addScreen()
              }}
            >
              Add
            </DarkButton>
          </AppModal.buttons>
        </AppModal>
      </Modal>
    ),
    [screenNames, screenNameValid, screenName, templateName, onScreenNameChange]
  )

  const [showScreenTemplateModal, hideScreenTemplateModal] = useModal(
    () => (
      <Modal
        isOpen
        onRequestClose={() => hideScreenTemplateModal()}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <AppModal>
          <AppModal.title>Add Screen Template</AppModal.title>
          <TextInput
            label="Screen Template Name"
            onChange={onScreenTemplateNameChange}
            errorMessage={errors.screenTemplateName}
          />
          <AppModal.buttons>
            <LightButton onClick={() => hideScreenTemplateModal()}>Cancel</LightButton>
            <DarkButton
              disabled={!screenTemplateNameValid}
              onClick={() => {
                addScreenTemplate()
              }}
            >
              Add
            </DarkButton>
          </AppModal.buttons>
        </AppModal>
      </Modal>
    ),
    [screenNames, screenNameValid, screenName, templateName, onScreenNameChange]
  )

  return (
    <ScreensStyled>
      <ScreensStyled.container>
        {subscreen === MAIN_SUBSCREEN && (
          <>
            <AppsStyled.menubar>
              <AppsStyled.menubarButton onClick={() => openAddScreenTemplateDialog()}>
                Add Screen Template
              </AppsStyled.menubarButton>
            </AppsStyled.menubar>
            <ScreensStyled.mainContainer>
              <ScreensStyled.sectionWrapper>
                <ScreensStyled.sectionTitle>Screen Templates</ScreensStyled.sectionTitle>
                <ScreensStyled.section>
                  {screenTemplates &&
                    screenTemplates.map((template) => (
                      <AppIcon
                        name={template.name}
                        key={template.id}
                        id={template.id}
                        onClick={(id) => handleScreenTemplateIconClick(id)}
                      />
                    ))}
                </ScreensStyled.section>
              </ScreensStyled.sectionWrapper>
            </ScreensStyled.mainContainer>
          </>
        )}
        {subscreen === SCREEN_SUBSCREEN && (
          <ScreensStyled.screenContainer>
            <ScreensStyled.menubar>
              <ScreensStyled.menubarAppName>Screen: {screen?.name}</ScreensStyled.menubarAppName>
              <ScreensStyled.menubarThemeSelect>
                Theme:
                <ScreensStyled.select>
                  <option>Theme 1</option>
                  <option>Theme 2</option>
                  <option>Theme 3</option>
                </ScreensStyled.select>
              </ScreensStyled.menubarThemeSelect>
              <ScreensStyled.menubarButton
                onClick={() => {
                  dispatch(action({ type: PREVIEW, data: appInstance?.id }))
                  dispatch(action({ type: SET_CURRENT_TAB, data: PREVIEW_TAB }))
                }}
              >
                Preview
              </ScreensStyled.menubarButton>
              <ScreensStyled.menubarButton onClick={() => dispatch(action({ type: PUBLISH, data: appInstance?.id }))}>
                Publish
              </ScreensStyled.menubarButton>
            </ScreensStyled.menubar>
            <ScreensStyled.screenBuilderContainer>
              <ScreenBuilder>{renderAuthoringScreen()}</ScreenBuilder>
              <ScreenBuilderPalette removeScreenComponent={removeScreenComponent}>
                <div>Components</div>
              </ScreenBuilderPalette>
            </ScreensStyled.screenBuilderContainer>
          </ScreensStyled.screenContainer>
        )}
        {subscreen === SCREEN_TEMPLATE_SUBSCREEN && (
          <ScreensStyled.screenContainer>
            <ScreensStyled.menubar>
              <ScreensStyled.menubarAppName>Screen Template: {screenTemplate?.name}</ScreensStyled.menubarAppName>
              <ScreensStyled.menubarThemeSelect>
                Theme:
                <ScreensStyled.select>
                  <option>Theme 1</option>
                  <option>Theme 2</option>
                  <option>Theme 3</option>
                </ScreensStyled.select>
              </ScreensStyled.menubarThemeSelect>
            </ScreensStyled.menubar>
            <ScreensStyled.screenBuilderContainer>
              <ScreenBuilder isTemplate>{renderTemplateAuthoringScreen()}</ScreenBuilder>
              <ScreenBuilderPalette removeScreenComponent={removeScreenTemplateComponent}>
                <div>Components</div>
              </ScreenBuilderPalette>
            </ScreensStyled.screenBuilderContainer>
          </ScreensStyled.screenContainer>
        )}
      </ScreensStyled.container>
    </ScreensStyled>
  )
}

export default Screens
