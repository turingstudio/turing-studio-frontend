import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import DividerStyled from './divider_styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripDots } from '@fortawesome/pro-regular-svg-icons'

const Divider = (props) => {
  const { moveComponent, orderId, name, id } = props

  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop({
    accept: 'screen-component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.orderId
      const hoverIndex = orderId
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current && ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveComponent(dragIndex, hoverIndex)
      item.orderId = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'screen-component',
    item: () => {
      return { orderId, name, id }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div>
      <DividerStyled ref={preview} style={{ opacity }} data-handler-id={handlerId} />
      <DividerStyled.handle ref={ref}>
        <FontAwesomeIcon icon={faGripDots} />
      </DividerStyled.handle>
    </div>
  )
}

export default Divider
