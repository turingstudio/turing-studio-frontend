import styled from 'styled-components'
import { Colors } from '../constants/colors'

const AppStyled = styled.div`
  margin: 30px;
  font-family: Arial;
  font-weight: normal;
`

AppStyled.title = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 24px;
`

AppStyled.screenDivider = styled.div`
  height: 100%;
  width: 1px;
  background-color: ${Colors.dividerColor};
`

export default AppStyled
