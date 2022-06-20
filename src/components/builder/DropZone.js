import React from 'react'
import { useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { action } from '../../state/actions'
import './style/style.css'
import { ADD_TEXT_COMPONENT, ADD_IMAGE_COMPONENT } from '../../state/action_types'

function DropZone(props) {
  const { children, componentId } = props
  const dispatch = useDispatch()
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'palette-subcomponent',
    drop: (item) => {
      console.log('DROP ITEM', item)
      console.log('DROP ITEM ID', componentId)
      if (item.type === 'text') {
        dispatch(action({ type: ADD_TEXT_COMPONENT, data: { item, componentId } }))
      }
      if (item.type === 'image') {
        dispatch(action({ type: ADD_IMAGE_COMPONENT, data: { item, componentId } }))
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div className="dropzone-default" ref={drop}>
      {children}
    </div>
  )
}

export default DropZone
