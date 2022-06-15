import styled from 'styled-components'
import { Colors } from '../../../constants/colors'

const PaletteComponentStyled = styled.div`
  padding: 10px;
  margin: 10px;
  position: relative;
  width: 150px;
  height: 30px;
  cursor: grab;
  border: solid;
  display: flex;
  align-items: center;
  border: 1px solid ${Colors.dividerColor};
  color: ${Colors.battleshipGrey};
`

PaletteComponentStyled.title = styled.div`
  margin-left: 15px;
`

export default PaletteComponentStyled
