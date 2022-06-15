import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'
import FormBuilderStyled from './form_builder_styles'
import { ADD_FORM_COMPONENT, ADD_FORM_TEMPLATE_COMPONENT } from '../../../state/action_types'
import { action } from '../../../state/actions'

const FormBuilder = (props) => {
  const app = useSelector((state) => state.app)
  const { form } = app
  console.log('FormBuilder form', form)
  const dispatch = useDispatch()
  const { children, isTemplate } = props

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'palette-component',
      drop: (component) => {
        console.log('FormBuilder form dispatch', form)
        dispatch(
          action({ type: isTemplate ? ADD_FORM_TEMPLATE_COMPONENT : ADD_FORM_COMPONENT, data: { component, form } })
        )
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [form]
  )

  return <FormBuilderStyled ref={drop}>{children}</FormBuilderStyled>
}

export default FormBuilder
