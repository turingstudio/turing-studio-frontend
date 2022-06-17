import React from 'react'
import classNames from 'classnames'

export const Checkbox = ({ className, label = 'Test Label', sublabel, checked, onClick, ...props }) => {
  return (
    <div className={classNames(className, 'checkbox-default')}>
      <input type="checkbox" className="checkbox-default__box" checked={checked} onClick={onClick} {...props} />
      <div className="checkbox-default__label">{label}</div>
      <div className="checkbox-default__sublabel">{sublabel}</div>
    </div>
  )
}

export default Checkbox
