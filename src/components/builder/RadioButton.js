import React from 'react'
import classNames from 'classnames'

const testData = [
  { value: '1', label: 'Foo', name: 'fooBar' },
  { value: '2', label: 'Bar', name: 'fooBar' },
]

export const RadioButton = ({ className, value, data = testData, onChange, ...props }) => {
  const handleChange = (e) => {
    onChange && onChange(e)
    value = e.target.value
  }

  return (
    <div className={classNames(className, 'radio-button-default')}>
      {data &&
        [...data].map((x, i) => (
          <div key={i} className="radio-button-default__item">
            <label htmlFor={`${x.name}_${i}`} className="radio-button-default__label">
              {x.label}
            </label>
            <input
              type="radio"
              className="radio-button-default__button"
              name={x.name}
              value={x.value}
              defaultChecked={x.value === value}
              onChange={handleChange}
              {...props}
            />
          </div>
        ))}
    </div>
  )
}

export default RadioButton
