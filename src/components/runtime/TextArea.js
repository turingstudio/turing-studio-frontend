import React from 'react'
import classNames from 'classnames'

export const TextArea = function ({ className, placeholder, onChange, value }) {
  return (
    <input
      className={classNames(className, 'text-input-default')}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  )
}

export default TextArea
