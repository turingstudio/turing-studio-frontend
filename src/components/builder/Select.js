import React from 'react'
import classNames from 'classnames'

export function Select({ className, placeholder, defaultValue, data, ...props }) {
  const emptyOption = { key: '', label: 'select...' }
  if (data && data[0].key !== '') {
    data?.unshift(emptyOption)
  }
  return (
    <select className={classNames(className, 'select-default')} placeholder={placeholder} {...props}>
      {data?.map(({ key, label }) => (
        <option key={key} value={key} selected={defaultValue === key}>
          {' '}
          {label}
        </option>
      ))}
    </select>
  )
}

export default Select
