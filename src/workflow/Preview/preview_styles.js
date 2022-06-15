import styled from 'styled-components'
import { Colors } from '../../constants/colors'

const PreviewStyled = styled.div`
  min-height: 1000px;
  height: 100%;
  width: 100%;
  padding-top: 30px;
  border: 1px solid ${Colors.dividerColor};
`
PreviewStyled.title = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
`

PreviewStyled.app = styled.div`
  min-height: 1000px;
  height: 100%;
  width: 100%;
  border: 1px solid ${Colors.dividerColor};
`

export default PreviewStyled
