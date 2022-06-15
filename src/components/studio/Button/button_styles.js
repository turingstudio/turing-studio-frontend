import styled from 'styled-components'
import { Colors } from '../../../constants/colors'

import Button from './Button'

export const DarkButton = styled(Button)`
  font-size: 16px;
  background-color: ${Colors.aquamarine};
  border-radius: 0;
  padding: 5px 15px 5px 15px;
  width: 110px;
  height: 45px;
  color: ${Colors.white};
  border: solid 1px ${Colors.aquamarine};
`

export const LightButton = styled(Button)`
  font-size: 16px;
  color: ${Colors.aquamarine};
  border-radius: 0;
  padding: 5px 15px 5px 15px;
  width: 110px;
  height: 45px;
  background-color: ${Colors.white};
  border: solid 1px ${Colors.aquamarine};
`
