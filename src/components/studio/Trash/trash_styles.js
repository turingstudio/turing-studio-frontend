import styled from 'styled-components'
import { Colors } from '../../../constants/colors'

const TrashStyled = styled.div`
  // border: ${(props) => (props.isOver ? 'solid 1px rgb(112, 118, 137)' : 'none')};
  color: ${Colors.battleshipGrey};
`

TrashStyled.title = styled.div`
  margin-left: 15px;
`

export default TrashStyled
