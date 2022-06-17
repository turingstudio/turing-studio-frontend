import React from 'react'
import classNames from 'classnames'
import DatePickerComponent from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const DatePicker = ({ className, value = new Date(), onChange, ...props }) => {
  return (
    <DatePickerComponent
      className={classNames(className, 'date-picker-default')}
      selected={value}
      onChange={onChange}
    />
  )
}

export default DatePicker
