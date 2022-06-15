import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import classNames from 'classnames'
import './style/style.css'

export const TextArea = function (props) {
  const { className, placeholder, onChange, value, moveComponent, orderId, name, id } = props

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

  const [{ isDragging }, drag] = useDrag({
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
    <input
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className={classNames(className, 'text-input-default')}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  )
}

export default TextArea
