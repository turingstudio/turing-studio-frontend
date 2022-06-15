import styled from 'styled-components'
import { Colors } from '../../../constants/colors'

const ScreenSectionTwoStyled = styled.div`
  display: flex;
  min-height: 50px;
  width: 100%;
  margin: 10px;
  border: solid 1px ${Colors.dividerColor};
  cursor: grab;
  resize: vertical;
  overflow: hidden;
`

ScreenSectionTwoStyled.one = styled.div`
  min-height: 40px;
  width: 100%;
  margin: 10px;
  border: solid 1px ${Colors.dividerColor};
`

ScreenSectionTwoStyled.two = styled.div`
  min-height: 40px;
  width: 100%;
  margin: 10px;
  border: solid 1px ${Colors.dividerColor};
`

ScreenSectionTwoStyled.handle = styled.div`
  margin-left: 5px;
  cursor: grab;
`

export default ScreenSectionTwoStyled
