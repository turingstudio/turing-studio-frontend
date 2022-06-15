import React from 'react'
import { useDrag } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAlignJustify,
  faLineColumns,
  faHorizontalRule,
  faInputText,
  faImage,
  faText,
} from '@fortawesome/pro-regular-svg-icons'
import PaletteComponentStyled from './palette_component_styles'

const PaletteComponent = (props) => {
  const { id, name, title } = props
  const orderId = 0
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'palette-component',
    item: { id, name, title, orderId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const icons = {
    FormElement: faInputText,
    TextInput: faInputText,
    ScreenSection: faAlignJustify,
    ScreenSectionTwo: faLineColumns,
    Divider: faHorizontalRule,
    Image: faImage,
    Text: faText,
  }

  return (
    <PaletteComponentStyled ref={drag}>
      <FontAwesomeIcon icon={icons[name]} />
      <PaletteComponentStyled.title>{title}</PaletteComponentStyled.title>
    </PaletteComponentStyled>
  )
}

export default PaletteComponent
