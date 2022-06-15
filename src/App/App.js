import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Modal from 'react-modal'
import { ModalProvider } from 'react-modal-hook'
import styled from 'styled-components'
import AppStyled from './app_styles'
import { Colors } from '../constants/colors'
import Apps from '../workflow/Apps/Apps'
import Screens from '../workflow/Screens/Screens'
import Forms from '../workflow/Forms/Forms'
import Preview from '../workflow/Preview/Preview'
import { GlobalStyles } from '../styles/global'
import { action } from '../state/actions'
import { SET_CURRENT_TAB } from '../state/action_types'

import { APPS_TAB, SCREENS_TAB, FORMS_TAB, PREVIEW_TAB } from '../constants/constants'

const App = () => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(<div />)

  const appState = useSelector((state) => state.app)
  const { currentTab } = appState

  const tabConfig = [
    {
      key: APPS_TAB,
      label: 'Applications',
      content: <Apps />,
    },
    {
      key: SCREENS_TAB,
      label: 'Screens',
      content: <Screens />,
    },
    {
      key: FORMS_TAB,
      label: 'Forms',
      content: <Forms />,
    },
    {
      key: PREVIEW_TAB,
      label: 'Preview',
      content: <Preview />,
    },
  ]

  const Tabs = ({ children, onClick }) => (
    <TabsContainer>
      {children.map(({ label, key }) => {
        const handleOnClick = (event) => {
          event.preventDefault()
          onClick(key)
        }
        const isActive = currentTab === key
        return (
          <Tab key={label} onClick={handleOnClick} active={isActive}>
            {label}
          </Tab>
        )
      })}
    </TabsContainer>
  )

  const handleOnClick = (tab) => {
    dispatch(action({ type: SET_CURRENT_TAB, data: tab }))
  }

  return (
    <AppStyled>
      <GlobalStyles />
      <AppStyled.title>Turing Studio</AppStyled.title>
      <Tabs onClick={handleOnClick}>{tabConfig}</Tabs>
      <ModalProvider>
        <DndProvider backend={HTML5Backend}>
          <TabContent>{tabConfig.find((tab) => tab.key === currentTab).content}</TabContent>
        </DndProvider>
      </ModalProvider>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        {modalContent}
      </Modal>
    </AppStyled>
  )
}

const TabsContainer = styled.div`
  margin-top: 50px;
  display: flex;
  max-width: 1220px;
`
const Tab = styled.div`
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#fafafa' : '#ffffff')};
  color: ${({ active, theme }) => (active ? Colors.darkText : Colors.softGrey)};
  ${({ active, theme }) => active && `border-bottom: solid ${Colors.darkText} 4px !important`};
  padding: 12px;
  width: 150px;
  text-align: center;
  font-size: 18px;
  border: solid #f2f2f2 1px;
`

const TabContent = styled.div``

export default App
