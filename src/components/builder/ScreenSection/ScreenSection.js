import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { faGripDots } from '@fortawesome/pro-regular-svg-icons'
import { useDrag, useDrop } from 'react-dnd'
import _, { isArray } from 'lodash'
import Measure from 'react-measure'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ResizableRect from 'react-resizable-rotatable-draggable'
import ScreenSectionStyled from './screen_section_styles'
import DropZone from '../DropZone'
import AppIcon from '../../studio/AppIcon/AppIcon'

function ScreenSection(props) {
  const { moveComponent, orderId, name, id, height, updateHeight, json } = props
  console.log('JSON', json)

  const [resizedOnce, setIsResizedOnce] = useState(false)

  const ref = useRef(null)

  const app = useSelector((state) => state.app)
  const { screen } = app

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
    <Measure
      bounds
      onResize={_.debounce((contentRect) => {
        if (resizedOnce) {
          updateHeight(id, Math.floor(contentRect?.bounds?.height))
        } else {
          setIsResizedOnce(true)
        }
      }, 1000)}
    >
      {({ measureRef }) => (
        <div ref={measureRef}>
          <DropZone componentId={id} screenId={screen?.id}>
            <ScreenSectionStyled ref={preview} style={{ opacity, height }} data-handler-id={handlerId}>
              {json?.subcomponents &&
                json.subcomponents.map((subcomponent) => (
                  <ResizableRect
                    key={subcomponent.id}
                    id={subcomponent.id}
                    parentId={subcomponent.parentId}
                    x={subcomponent.x}
                    y={subcomponent.y}
                    height={subcomponent.height}
                    width={subcomponent.width}
                  />
                ))}
            </ScreenSectionStyled>
          </DropZone>
          <ScreenSectionStyled.handle ref={ref}>
            <FontAwesomeIcon icon={faGripDots} />
          </ScreenSectionStyled.handle>
        </div>
      )}
    </Measure>
  )
}

export default ScreenSection
