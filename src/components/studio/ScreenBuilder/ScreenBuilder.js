import React from 'react'
import { useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import ScreenBuilderStyled from './screen_builder_styles'
import { ADD_SCREEN_COMPONENT, ADD_SCREEN_TEMPLATE_COMPONENT } from '../../../state/action_types'
import { action } from '../../../state/actions'

const ScreenBuilder = (props) => {
  const dispatch = useDispatch()
  const { children, isTemplate } = props

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'palette-component',
    drop: (item) =>
      dispatch(action({ type: isTemplate ? ADD_SCREEN_TEMPLATE_COMPONENT : ADD_SCREEN_COMPONENT, data: item })),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return <ScreenBuilderStyled ref={drop}>{children}</ScreenBuilderStyled>
}

export default ScreenBuilder
