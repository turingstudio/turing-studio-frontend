import styled, { css } from 'styled-components'
import { Colors } from '../../../constants/colors'

const Button = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s;
  color: ${Colors.white};
  background-color: ${Colors.softGrey};
  font-size: 16px;
  margin: 0 20px 0 20px;

  &:hover {
    opacity: 0.75;
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      opacity: 0.3;
      pointer-events: none;

      &:hover {
        opacity: 0.3;
      }
    `}
`

export default Button
