import styled, { css } from 'styled-components'
import { Colors } from '../../constants/colors'

const AppsStyled = styled.div`
  min-height: 1000px;
  height: 100%;
  width: 100%;
  border: 1px solid ${Colors.dividerColor};
`

AppsStyled.container = styled.div`
  width: 100%;
  margin: 0;
`

AppsStyled.mainContainer = styled.div`
  margin: 0 40px 40px 40px;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  width: 1200px;
`

AppsStyled.appContainer = styled.div`
  width: 100%;
  overflow: hidden;
`

AppsStyled.appScreensContainer = styled.div`
  margin: 0 40px 40px 40px;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  width: 1200px;
`

AppsStyled.menubar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: ${Colors.softGrey};
  color: ${Colors.white};
  padding: 0 15px 0 15px;
`

AppsStyled.menubarAppName = styled.div`
  width: 300px;
`
AppsStyled.menubarThemeSelect = styled.div`
  padding: 0 20px 0 20px;
`

AppsStyled.select = styled.select`
  margin-left: 10px;
  padding-left: 5px;
  padding-right: 5px;
  height: 25px;
  border-radius: 4px;
`

AppsStyled.sectionWrapper = styled.div``

AppsStyled.sectionTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
`

AppsStyled.section = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  align-content: flex-start;
  height: 530px;
  width: 530px;
  border: 1px solid ${Colors.dividerColor};
  border-radius: 20px;
  padding: 20px;
  overflow: auto;
`

AppsStyled.menubarButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s;
  color: ${Colors.white};
  background-color: ${Colors.softGrey};
  font-size: 16px;
  margin: 0 20px 0 20px;

  &:hover {
    opacity: 0.75;
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      opacity: 0.3;
      pointer-events: none;

      &:hover {
        opacity: 0.3;
      }
    `}
`

export default AppsStyled
