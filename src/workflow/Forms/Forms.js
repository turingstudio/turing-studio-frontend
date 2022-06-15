import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import update from 'immutability-helper'
import { useModal } from 'react-modal-hook'
import Modal from 'react-modal'
import { action } from '../../state/actions'
import AppIcon from '../../components/studio/AppIcon/AppIcon'
import FormsStyled from './forms_styles'
import {
  CREATE_FORM_TEMPLATE,
  GET_FORM_TEMPLATE,
  GET_FORM_TEMPLATES,
  SET_CONTENT,
  SET_CURRENT_TAB,
  SET_SUBSCREEN,
  UPDATE_FORM_TEMPLATE,
} from '../../state/action_types'
import { FORM_TEMPLATE_SUBSCREEN, FORMS_TAB, MAIN_SUBSCREEN } from '../../constants/constants'
import FormBuilder from '../../components/studio/FormBuilder/FormBuilder'
import FormBuilderPalette from '../../components/studio/FormBuilderPalette/FormBuilderPalette'
import AppModal from '../../components/studio/app_modal_styles'
import TextInput from '../../components/studio/TextInput/TextInput'
import { DarkButton, LightButton } from '../../components/studio/Button/button_styles'
import * as Constants from '../../constants/constants'
import * as Components from '../../components/builder'

const Forms = function () {
  const dispatch = useDispatch()
  const app = useSelector((state) => state.app)
  const { formTemplates, subscreen, form } = app
  const [formTemplateNames, setFormTemplateNames] = useState([])
  const [currentFormId, setCurrentFormId] = useState()
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState([])
  const [formTemplateName, setFormTemplateName] = useState('')
  const [formTemplateNameValid, setFormTemplateNameValid] = useState(false)

  useEffect(() => {
    dispatch(action({ type: GET_FORM_TEMPLATES }))
  }, [])

  useEffect(() => {
    if (form && form.data) {
      console.log('=================== CURRENT FORM ID', form.id)
      if (form.id) {
        setCurrentFormId(form.id)
      }
      const dataDeserialized = deserialize(form.data).data
      const dataSorted = dataDeserialized.sort((a, b) => (b.orderId < a.orderId ? 1 : -1))
      console.log('DATA SORTED', dataSorted)
      setFormData(dataSorted)
    }
  }, [form])

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

  const handleFormTemplateIconClick = (id) => {
    dispatch(action({ type: GET_FORM_TEMPLATE, data: id }))
    dispatch(action({ type: SET_CURRENT_TAB, data: FORMS_TAB }))
    dispatch(action({ type: SET_SUBSCREEN, data: FORM_TEMPLATE_SUBSCREEN }))
  }

  const onFormTemplateNameChange = (e) => {
    const name = e.target.value
    setFormTemplateNameValid(name && name.length && !formTemplateNames.includes(name))
    setFormTemplateName(name)
    if ((name && !name.length) || formTemplateNames.includes(name)) {
      setErrors({ errors, formTemplateName: 'Name in use' })
    } else {
      setErrors({ errors, formTemplateName: '' })
    }
  }

  const moveComponent = (orderId, hoverIndex) => {
    console.log('IN moveComponent()')
    const dragIndex = orderId - 1
    const dragComponent = formData[dragIndex]
    const updatedFormContent = update(formData, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragComponent],
      ],
    })
    setFormData(updatedFormContent)
    dispatch(action({ type: UPDATE_FORM_TEMPLATE, data: { id: form.id, content: updatedFormContent } }))
  }

  const [showFormTemplateModal, hideFormTemplateModal] = useModal(
    () => (
      <Modal
        isOpen
        onRequestClose={() => hideFormTemplateModal()}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <AppModal>
          <AppModal.title>Add Form Template</AppModal.title>
          <TextInput
            label="Form Template Name"
            onChange={onFormTemplateNameChange}
            errorMessage={errors.formTemplateName}
          />
          <AppModal.buttons>
            <LightButton onClick={() => hideFormTemplateModal()}>Cancel</LightButton>
            <DarkButton
              disabled={!formTemplateNameValid}
              onClick={() => {
                addFormTemplate()
              }}
            >
              Add
            </DarkButton>
          </AppModal.buttons>
        </AppModal>
      </Modal>
    ),
    [formTemplateNames, formTemplateNameValid, formTemplateName, onFormTemplateNameChange]
  )

  const addFormTemplate = () => {
    dispatch(action({ type: CREATE_FORM_TEMPLATE, data: { name: formTemplateName } }))
    hideFormTemplateModal()
  }

  const removeFormComponent = (currentItem) => {
    console.log('REMOVING FORM ITEM', currentItem)
    const filteredData = formData.filter((component) => component.id !== currentItem.id)
    setFormData(filteredData)
    dispatch(action({ type: UPDATE_FORM_TEMPLATE, data: { id: form.id, data: filteredData } }))
  }

  const openAddFormTemplateDialog = (item) => {
    const name = item?.name || 'Blank'
    setErrors({})
    setFormTemplateNameValid(false)
    setFormTemplateName(name)
    showFormTemplateModal()
  }

  const renderAuthoringScreen = () => {
    console.log('FORM', form)
    console.log('FORM DATA', formData)
    if (formData.length) {
      return formData.map((item) => {
        console.log('FORM ITEM', item)
        if (item) {
          const { ScreenComponent, orderId, name, id } = item
          return <ScreenComponent key={orderId} moveComponent={moveComponent} orderId={orderId} name={name} id={id} />
        }
      })
    }
    return <div />
  }

  return (
    <FormsStyled>
      {subscreen === MAIN_SUBSCREEN && (
        <>
          <FormsStyled.menubar>
            <FormsStyled.menubarButton onClick={() => openAddFormTemplateDialog()}>
              Add Form Template
            </FormsStyled.menubarButton>
          </FormsStyled.menubar>
          <FormsStyled.mainContainer>
            <FormsStyled.sectionWrapper>
              <FormsStyled.sectionTitle>Templates</FormsStyled.sectionTitle>
              <FormsStyled.section>
                {formTemplates &&
                  formTemplates.map((template) => (
                    <AppIcon
                      name={template.name}
                      key={template.id}
                      id={template.id}
                      onClick={(id) => handleFormTemplateIconClick(id)}
                    />
                  ))}
              </FormsStyled.section>
            </FormsStyled.sectionWrapper>
          </FormsStyled.mainContainer>
        </>
      )}
      {subscreen === FORM_TEMPLATE_SUBSCREEN && (
        <FormsStyled.screenContainer>
          <FormsStyled.menubar>
            <FormsStyled.menubarAppName>Form Template: {form?.name}</FormsStyled.menubarAppName>
          </FormsStyled.menubar>
          <FormsStyled.screenBuilderContainer>
            <FormBuilder isTemplate>{renderAuthoringScreen()}</FormBuilder>
            <FormBuilderPalette removeFormComponent={removeFormComponent}>
              <div>Components</div>
            </FormBuilderPalette>
          </FormsStyled.screenBuilderContainer>
        </FormsStyled.screenContainer>
      )}
    </FormsStyled>
  )
}

export default Forms
