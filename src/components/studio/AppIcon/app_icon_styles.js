import styled from 'styled-components'

const AppIconStyled = styled.div``

AppIconStyled.titleContainer = styled.div`
  width: 120px;
  border: solid;
`
AppIconStyled.title = styled.abbr`
  margin-top: 5px;
  font-size: 14px;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 120px;
  text-align: center;
`

AppIconStyled.container = styled.div`
  padding: 10px 0 10px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 130px;
  cursor: pointer;
`

export default AppIconStyled
