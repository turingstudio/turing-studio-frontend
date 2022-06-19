import styled from 'styled-components'
import { Colors } from '../../../constants/colors'

const ScreenSectionTwoStyled = styled.div`
  display: flex;
  min-height: 50px;
  width: 100%;
  margin: 10px;
  border: dotted 1px ${Colors.dividerColor};
`

ScreenSectionTwoStyled.one = styled.div`
  height: 100%;
  width: 100%;
  margin: 10px;
  border: dotted 1px ${Colors.dividerColor};
`

ScreenSectionTwoStyled.two = styled.div`
  height: 100%;
  width: 100%;
  margin: 10px;
  border: dotted 1px ${Colors.dividerColor};
`

export default ScreenSectionTwoStyled
