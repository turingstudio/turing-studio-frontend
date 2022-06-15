import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'
import Modal from 'react-modal'
import { useModal } from 'react-modal-hook'
import AppsStyled from './apps_styles'
import AppModal from '../../components/studio/app_modal_styles'
import AppIcon from '../../components/studio/AppIcon/AppIcon'
import { DarkButton, LightButton } from '../../components/studio/Button/button_styles'
import TextInput from '../../components/studio/TextInput/TextInput'
import {
  APP_SUBSCREEN,
  APP_TEMPLATE_SUBSCREEN,
  SCREEN_SUBSCREEN,
  MAIN_SUBSCREEN,
  SCREENS_TAB,
  SCREEN_TEMPLATE_SUBSCREEN,
} from '../../constants/constants'
import { action } from '../../state/actions'
import {
  GET_APPS,
  GET_APP_TEMPLATES,
  SET_CURRENT_TAB,
  SET_SUBSCREEN,
  GET_APP,
  CREATE_APP,
  CREATE_APP_TEMPLATE,
  GET_APP_SCREENS,
  GET_SCREEN_TEMPLATES,
  GET_SCREEN,
  CREATE_SCREEN,
  GET_APP_TEMPLATE,
  GET_APP_TEMPLATE_SCREENS,
  CREATE_APP_TEMPLATE_SCREEN,
  GET_APP_TEMPLATE_SCREEN,
  GET_SCREEN_TEMPLATE,
} from '../../state/action_types'

const Apps = function () {
  Modal.setAppElement('#root')
  const dispatch = useDispatch()

  const [appNameValid, setAppNameValid] = useState(false)
  const [appTemplateNameValid, setAppTemplateNameValid] = useState(false)
  const [screenNameValid, setScreenNameValid] = useState(false)
  const [appTemplateScreenNameValid, setTemplateScreenNameValid] = useState(false)
  const [appNames, setAppNames] = useState([])
  const [appTemplateNames, setAppTemplateNames] = useState([])
  const [screenNames, setScreenNames] = useState([])
  const [appTemplateScreenNames, setTemplateScreenNames] = useState([])
  const [errors, setErrors] = useState({})
  const [screenName, setScreenName] = useState('')
  const [appTemplateScreenName, setTemplateScreenName] = useState('')
  const [appName, setAppName] = useState('')
  const [appTemplateName, setAppTemplateName] = useState('')
  const [templateName, setTemplateName] = useState('')

  const onAppNameChange = (e) => {
    const name = e.target.value
    setAppNameValid(name && name.length && !appNames.includes(name))
    setAppName(name)
    if ((name && !name.length) || appNames.includes(name)) {
      setErrors({ errors, appName: 'Name in use' })
    } else {
      setErrors({ errors, appName: '' })
    }
  }

  const onAppTemplateNameChange = (e) => {
    const name = e.target.value
    setAppTemplateNameValid(name && name.length && !appTemplateNames.includes(name))
    setAppTemplateName(name)
    if ((name && !name.length) || appTemplateNames.includes(name)) {
      setErrors({ errors, appTemplateName: 'Name in use' })
    } else {
      setErrors({ errors, appTemplateName: '' })
    }
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

  const [showTemplateScreenModal, hideTemplateScreenModal] = useModal(
    () => (
      <Modal
        isOpen
        onRequestClose={() => hideTemplateScreenModal()}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <AppModal>
          <AppModal.title>Add Screen to Template</AppModal.title>
          <AppModal.subtitle>Template: {templateName}</AppModal.subtitle>
          <TextInput
            label="Screen Name"
            onChange={onAppTemplateScreenNameChange}
            errorMessage={errors.appTemplateScreenName}
          />
          <AppModal.buttons>
            <LightButton onClick={() => hideTemplateScreenModal()}>Cancel</LightButton>
            <DarkButton
              disabled={!appTemplateScreenNameValid}
              onClick={() => {
                addTemplateScreen()
              }}
            >
              Add
            </DarkButton>
          </AppModal.buttons>
        </AppModal>
      </Modal>
    ),
    [
      appTemplateScreenNames,
      appTemplateScreenNameValid,
      appTemplateScreenName,
      templateName,
      onAppTemplateScreenNameChange,
    ]
  )

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

  const [showAppModal, hideAppModal] = useModal(
    () => (
      <Modal
        isOpen
        onRequestClose={() => hideAppModal()}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <AppModal>
          <AppModal.title>Add Application</AppModal.title>
          <AppModal.subtitle>Template: {templateName}</AppModal.subtitle>
          <TextInput label="Application Name" onChange={onAppNameChange} errorMessage={errors.appName} />
          <AppModal.buttons>
            <LightButton onClick={() => hideAppModal()}>Cancel</LightButton>
            <DarkButton
              disabled={!appNameValid}
              onClick={() => {
                addApp()
              }}
            >
              Add
            </DarkButton>
          </AppModal.buttons>
        </AppModal>
      </Modal>
    ),
    [appNames, appNameValid, appName, templateName, onAppNameChange]
  )

  const [showAppTemplateModal, hideAppTemplateModal] = useModal(
    () => (
      <Modal
        isOpen
        onRequestClose={() => hideAppTemplateModal()}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <AppModal>
          <AppModal.title>Add Application Template</AppModal.title>
          <TextInput
            label="Application Template Name"
            onChange={onAppTemplateNameChange}
            errorMessage={errors.appTemplateName}
          />
          <AppModal.buttons>
            <LightButton onClick={() => hideAppTemplateModal()}>Cancel</LightButton>
            <DarkButton
              disabled={!appTemplateNameValid}
              onClick={() => {
                addAppTemplate()
              }}
            >
              Add
            </DarkButton>
          </AppModal.buttons>
        </AppModal>
      </Modal>
    ),
    [appNames, appNameValid, appName, templateName, onAppNameChange]
  )

  const appState = useSelector((state) => state.app)
  const { app, appTemplate, apps, appTemplates, appScreens, appTemplateScreens, screenTemplates, subscreen } = appState

  useEffect(() => {
    dispatch(action({ type: GET_APPS }))
    dispatch(action({ type: GET_APP_TEMPLATES }))
  }, [])

  useEffect(() => {
    setScreenNames(appScreens && appScreens.map(({ name }) => name))
  }, [appScreens])

  useEffect(() => {
    setTemplateScreenNames(appTemplateScreens && appTemplateScreens.map(({ name }) => name))
  }, [appTemplateScreens])

  useEffect(() => {
    setAppNames(apps && apps.map(({ name }) => name))
  }, [apps])

  useEffect(() => {
    setAppTemplateNames(appTemplates && appTemplates.map(({ name }) => name))
  }, [appTemplates])

  const addScreen = () => {
    const { id } = app
    dispatch(action({ type: CREATE_SCREEN, data: { app_id: id, name: screenName } }))
    hideScreenModal()
  }

  const addTemplateScreen = () => {
    const { id } = appTemplate
    dispatch(action({ type: CREATE_APP_TEMPLATE_SCREEN, data: { app_template_id: id, name: appTemplateScreenName } }))
    hideTemplateScreenModal()
  }

  const addApp = () => {
    dispatch(action({ type: CREATE_APP, data: { name: appName } }))
    hideAppModal()
  }

  const addAppTemplate = () => {
    dispatch(action({ type: CREATE_APP_TEMPLATE, data: { name: appTemplateName } }))
    hideAppTemplateModal()
  }

  const openAddAppDialog = (item) => {
    const name = item?.name || 'Blank'
    setErrors({})
    setAppNameValid(false)
    setTemplateName(name)
    showAppModal()
  }

  const openAddAppTemplateDialog = () => {
    setErrors({})
    setAppTemplateNameValid(false)
    showAppTemplateModal()
  }

  const openAddScreenDialog = (item) => {
    const name = item?.name || 'Blank'
    setErrors({})
    setScreenNameValid(false)
    setTemplateName(name)
    showScreenModal()
  }

  const openAddTemplateScreenDialog = (item) => {
    const name = item?.name || 'Blank'
    setErrors({})
    setTemplateScreenNameValid(false)
    setTemplateName(name)
    showTemplateScreenModal()
  }

  const [{ isAppTemplateOver }, appsDrop] = useDrop(() => ({
    accept: 'app-template-icon',
    drop: (item) => openAddAppDialog(item),
    collect: (monitor) => ({
      isAppTemplateOver: !!monitor.isOver(),
    }),
  }))

  const [{ isScreenTemplateOver }, appScreensDrop] = useDrop(() => ({
    accept: 'screen-template-icon',
    drop: (item) => openAddScreenDialog(item),
    collect: (monitor) => ({
      isScreenTemplateOver: !!monitor.isOver(),
    }),
  }))

  const [{ isAppTemplateScreenTemplateOver }, appTemplateScreensDrop] = useDrop(() => ({
    accept: 'screen-template-icon',
    drop: (item) => openAddTemplateScreenDialog(item),
    collect: (monitor) => ({
      isAppTemplateScreenTemplateOver: !!monitor.isOver(),
    }),
  }))

  const handleAppIconClick = (id) => {
    dispatch(action({ type: GET_APP, data: id }))
    dispatch(action({ type: GET_APP_SCREENS, data: id }))
    dispatch(action({ type: GET_SCREEN_TEMPLATES }))
    dispatch(action({ type: SET_SUBSCREEN, data: APP_SUBSCREEN }))
  }

  const handleAppTemplateIconClick = (id) => {
    dispatch(action({ type: GET_APP_TEMPLATE, data: id }))
    dispatch(action({ type: GET_APP_TEMPLATE_SCREENS, data: id }))
    dispatch(action({ type: GET_SCREEN_TEMPLATES }))
    dispatch(action({ type: SET_SUBSCREEN, data: APP_TEMPLATE_SUBSCREEN }))
  }

  const handleAppTemplateScreenIconClick = (id) => {
    dispatch(action({ type: GET_APP_TEMPLATE_SCREEN, data: id }))
    dispatch(action({ type: SET_CURRENT_TAB, data: SCREENS_TAB }))
    dispatch(action({ type: SET_SUBSCREEN, data: SCREEN_SUBSCREEN }))
  }

  const handleScreenIconClick = (id) => {
    dispatch(action({ type: GET_SCREEN, data: id }))
    dispatch(action({ type: SET_CURRENT_TAB, data: SCREENS_TAB }))
    dispatch(action({ type: SET_SUBSCREEN, data: SCREEN_SUBSCREEN }))
  }

  const handleScreenTemplateIconClick = (id) => {
    dispatch(action({ type: GET_SCREEN_TEMPLATE, data: id }))
    dispatch(action({ type: SET_CURRENT_TAB, data: SCREENS_TAB }))
    dispatch(action({ type: SET_SUBSCREEN, data: SCREEN_TEMPLATE_SUBSCREEN }))
  }

  return (
    <AppsStyled>
      <AppsStyled.container>
        {subscreen === MAIN_SUBSCREEN && (
          <AppsStyled.appContainer>
            <AppsStyled.menubar>
              <AppsStyled.menubarAppName>Select an Application</AppsStyled.menubarAppName>
              <AppsStyled.menubarThemeSelect>
                Theme:
                <AppsStyled.select>
                  <option>Theme 1</option>
                  <option>Theme 2</option>
                  <option>Theme 3</option>
                </AppsStyled.select>
              </AppsStyled.menubarThemeSelect>
              <AppsStyled.menubarButton onClick={() => openAddAppDialog()}>Add Application</AppsStyled.menubarButton>
              <AppsStyled.menubarButton onClick={() => openAddAppTemplateDialog()}>
                Add Application Template
              </AppsStyled.menubarButton>
            </AppsStyled.menubar>

            <AppsStyled.mainContainer>
              <AppsStyled.sectionWrapper>
                <AppsStyled.sectionTitle>Applications</AppsStyled.sectionTitle>
                <AppsStyled.section ref={appsDrop}>
                  {apps &&
                    apps.map((application) => (
                      <AppIcon
                        id={application.id}
                        type="app-icon"
                        key={application.id}
                        name={application.name}
                        onClick={(id) => handleAppIconClick(id)}
                      />
                    ))}
                </AppsStyled.section>
              </AppsStyled.sectionWrapper>

              <AppsStyled.sectionWrapper>
                <AppsStyled.sectionTitle>Application Templates</AppsStyled.sectionTitle>
                <AppsStyled.section>
                  {appTemplates &&
                    appTemplates.map((template) => (
                      <AppIcon
                        type="app-template-icon"
                        key={template.id}
                        name={template.name}
                        draggable
                        onClick={() => handleAppTemplateIconClick(template.id)}
                      />
                    ))}
                </AppsStyled.section>
              </AppsStyled.sectionWrapper>
            </AppsStyled.mainContainer>
          </AppsStyled.appContainer>
        )}
        {subscreen === APP_SUBSCREEN && (
          <AppsStyled.appContainer>
            <AppsStyled.menubar>
              <AppsStyled.menubarAppName>App: {app?.name}</AppsStyled.menubarAppName>
              <AppsStyled.menubarThemeSelect>
                Theme:
                <AppsStyled.select>
                  <option>Theme 1</option>
                  <option>Theme 2</option>
                  <option>Theme 3</option>
                </AppsStyled.select>
              </AppsStyled.menubarThemeSelect>
              <AppsStyled.menubarButton onClick={() => openAddScreenDialog()}>Add Screen</AppsStyled.menubarButton>
              <AppsStyled.menubarButton>Publish</AppsStyled.menubarButton>
              <AppsStyled.menubarButton onClick={() => dispatch(action({ type: SET_SUBSCREEN, data: MAIN_SUBSCREEN }))}>
                Back
              </AppsStyled.menubarButton>
            </AppsStyled.menubar>
            <AppsStyled.mainContainer>
              <AppsStyled.sectionWrapper>
                <AppsStyled.sectionTitle>Application Screens</AppsStyled.sectionTitle>
                <AppsStyled.section ref={appScreensDrop}>
                  {appScreens &&
                    appScreens.map((screen) => (
                      <AppIcon
                        id={screen.id}
                        type="screen-icon"
                        key={screen.id}
                        name={screen.name}
                        onClick={(id) => handleScreenIconClick(id)}
                      />
                    ))}
                </AppsStyled.section>
              </AppsStyled.sectionWrapper>

              <AppsStyled.sectionWrapper>
                <AppsStyled.sectionTitle>Screen Templates</AppsStyled.sectionTitle>
                <AppsStyled.section>
                  {screenTemplates &&
                    screenTemplates.map((template) => (
                      <AppIcon
                        id={template.id}
                        type="screen-template-icon"
                        name={template.name}
                        key={template.id}
                        draggable
                        onClick={(id) => handleScreenTemplateIconClick(id)}
                      />
                    ))}
                </AppsStyled.section>
              </AppsStyled.sectionWrapper>
            </AppsStyled.mainContainer>
          </AppsStyled.appContainer>
        )}
        {subscreen === APP_TEMPLATE_SUBSCREEN && (
          <AppsStyled.appContainer>
            <AppsStyled.menubar>
              <AppsStyled.menubarAppName>App Template: {appTemplate?.name}</AppsStyled.menubarAppName>
              <AppsStyled.menubarThemeSelect>
                Theme:
                <AppsStyled.select>
                  <option>Theme 1</option>
                  <option>Theme 2</option>
                  <option>Theme 3</option>
                </AppsStyled.select>
              </AppsStyled.menubarThemeSelect>
              <AppsStyled.menubarButton onClick={() => openAddTemplateScreenDialog()}>
                Add Screen
              </AppsStyled.menubarButton>
              <AppsStyled.menubarButton onClick={() => dispatch(action({ type: SET_SUBSCREEN, data: MAIN_SUBSCREEN }))}>
                Back
              </AppsStyled.menubarButton>
            </AppsStyled.menubar>
            <AppsStyled.mainContainer>
              <AppsStyled.sectionWrapper>
                <AppsStyled.sectionTitle>App Template Screens</AppsStyled.sectionTitle>
                <AppsStyled.section ref={appTemplateScreensDrop}>
                  {appTemplateScreens &&
                    appTemplateScreens.map((screen) => (
                      <AppIcon
                        id={screen.id}
                        type="screen-icon"
                        key={screen.id}
                        name={screen.name}
                        onClick={(id) => handleAppTemplateScreenIconClick(id)}
                      />
                    ))}
                </AppsStyled.section>
              </AppsStyled.sectionWrapper>

              <AppsStyled.sectionWrapper>
                <AppsStyled.sectionTitle>Screen Templates</AppsStyled.sectionTitle>
                <AppsStyled.section>
                  {screenTemplates &&
                    screenTemplates.map((template) => (
                      <AppIcon
                        id={template.id}
                        type="screen-template-icon"
                        name={template.name}
                        key={template.id}
                        draggable
                        onClick={(id) => handleScreenTemplateIconClick(id)}
                      />
                    ))}
                </AppsStyled.section>
              </AppsStyled.sectionWrapper>
            </AppsStyled.mainContainer>
          </AppsStyled.appContainer>
        )}
      </AppsStyled.container>
    </AppsStyled>
  )
}

export default Apps
