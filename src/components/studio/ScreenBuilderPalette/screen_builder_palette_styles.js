import styled from 'styled-components'
import { Colors } from '../../../constants/colors'

const ScreenBuilderPaletteStyled = styled.div`
  height: 600px;
  width: 270px;
  margin: 10px;
  padding: 10px;
  border: 1px solid ${Colors.dividerColor};
`

ScreenBuilderPaletteStyled.title = styled.div`
  margin: 10px 0 10px 0;
  font-size: 18px;
  text-align: center;
`
ScreenBuilderPaletteStyled.components = styled.div`
  margin: 25px 10px 10px 10px;
  height: 470px;
`

ScreenBuilderPaletteStyled.trash = styled.div`
  display: flex;
  justify-content: center;
`

export default ScreenBuilderPaletteStyled
