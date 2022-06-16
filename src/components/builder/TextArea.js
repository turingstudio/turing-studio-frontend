import React from 'react'
import classNames from 'classnames'
import './style/style.css'

export const TextArea = function (props) {
  const { className, placeholder, onChange, value } = props
  return (
    <textarea className={classNames(className, 'textarea-default')} onChange={onChange} placeholder={placeholder}>
      {value}
    </textarea>
  )
}

export default TextArea
