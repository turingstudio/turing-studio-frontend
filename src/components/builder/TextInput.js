import React from 'react'
import classNames from 'classnames'
import './style/style.css'

export const TextInput = function (props) {
  const { className, placeholder, onChange, value } = props
  return (
    <input
      className={classNames(className, 'text-input-default')}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  )
}

export default TextInput
