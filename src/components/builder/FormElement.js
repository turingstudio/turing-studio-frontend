import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/pro-regular-svg-icons'
import './style/style.css'
import TextInput from './TextInput'
import TextArea from './TextArea'
import Select from './Select'
import Checkbox from './Checkbox'
import FormElementTypes from '../../constants/form_element_types'

const types = {
  [FormElementTypes.TEXT_INPUT]: TextInput,
  [FormElementTypes.TEXT_AREA]: TextArea,
  [FormElementTypes.SELECT]: Select,
  [FormElementTypes.CHECKBOX]: Checkbox,
}

export const FormElement = ({
  id,
  className,
  label = 'First Name',
  sublabel,
  error,
  type,
  name,
  value,
  defaultValue,
  placeholder,
  required,
  rows,
  cols,
  data,
  onChange,
  onClick,
  checked,
  moveComponent,
  orderId,
  ...props
}) => {
  const FormComponent = types[type]

  console.log('FormElement data', data)

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
      return { orderId, name, id, type }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div
      className={classNames(className, 'form-element-default')}
      {...props}
      data-handler-id={handlerId}
      ref={ref}
      style={{ opacity }}
    >
      <div className="form-element-default__label">
        {type !== FormElementTypes.CHECKBOX && <div className="form-element-default__label-text">{label}</div>}
        {required && <div className="form-element-default__required">*</div>}
      </div>
      <FormComponent
        placeholder={placeholder}
        data={data}
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        label={label}
        sublabel={sublabel}
        onChange={onChange}
        onClick={onClick}
        checked={checked}
      />
      <div className="form-element-default__error">
        {error && (
          <>
            <FontAwesomeIcon icon={faCircleExclamation} className="form-element-default__error-icon" />
            <div className="form-element-default__error-text">{error}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default FormElement
