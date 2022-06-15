import styled from 'styled-components'
import { Colors } from '../../constants/colors'

const AppModal = styled.div`
  font-family: Arial;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  min-height: 155px;
  font-size: 18px;
  color: ${Colors.aquamarine};
  padding-top: 20px;
  padding-bottom: 20px;
`

AppModal.title = styled.div`
  padding-bottom: 15px;
`

AppModal.subtitle = styled.div`
  font-size: 16px;
  padding-bottom: 25px;
`

AppModal.buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
`

AppModal.singleButton = styled.div`
  display: flex;
  justify-content: center;
  width: 220px;
`
export default AppModal
