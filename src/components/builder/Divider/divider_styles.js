import styled from 'styled-components'
import { Colors } from '../../../constants/colors'

const DividerStyled = styled.div`
  height: 2px;
  width: 100%;
  margin: 10px 0 10px 0;
  background-color: ${Colors.dividerColor};
  cursor: grab;
`

DividerStyled.handle = styled.div`
  margin-left: 5px;
  cursor: grab;
`

export default DividerStyled
