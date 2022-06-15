import React from 'react'
import TextInputStyled from './text_input_styles'

const TextInput = props => {
  const { placeholder, label, value, errorMessage, onChange } = props
  return (
    <TextInputStyled>
      <TextInputStyled.itemLabel>{label}</TextInputStyled.itemLabel>
      <TextInputStyled.input
        {...props}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <TextInputStyled.errorMsg>{errorMessage}</TextInputStyled.errorMsg>
    </TextInputStyled>
  )
}

export default TextInput
