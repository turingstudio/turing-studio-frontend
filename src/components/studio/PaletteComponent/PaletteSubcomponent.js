import React from 'react'
import { useDrag } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PaletteComponentStyled from './palette_component_styles'

const PaletteSubcomponent = (props) => {
  const { id, name, title, type, icon } = props
  const orderId = 0
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'palette-subcomponent',
    item: { id, name, title, orderId, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <PaletteComponentStyled ref={drag}>
      <FontAwesomeIcon icon={icon} />
      <PaletteComponentStyled.title>{title}</PaletteComponentStyled.title>
    </PaletteComponentStyled>
  )
}

export default PaletteSubcomponent
