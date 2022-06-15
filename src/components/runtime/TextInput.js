import React from 'react'
import classNames from 'classnames'

export const TextInput = function ({ className, placeholder, onChange, value }) {
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
