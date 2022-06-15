import styled from 'styled-components'
import { Colors } from '../../../constants/colors'

const ScreenSectionStyled = styled.div`
  opacity: ${(props) => props.opacity};
  min-height: 50px;
  width: 100%;
  margin: 10px;
  border: solid 1px ${Colors.dividerColor};
  resize: vertical;
  overflow: hidden;
`

ScreenSectionStyled.handle = styled.div`
  margin-left: 5px;
  cursor: grab;
`

export default ScreenSectionStyled
