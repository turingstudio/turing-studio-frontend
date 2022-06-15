import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import Modal from 'react-modal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faTrashPlus } from '@fortawesome/pro-regular-svg-icons'
import TrashStyled from './trash_styles'
import AppModal from '../app_modal_styles'
import { DarkButton, LightButton } from '../Button/button_styles'

const Trash = (props) => {
  const app = useSelector((state) => state.app)

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isScreenModalOpen, setIsScreenModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  Modal.setAppElement('#root')

  const openRemoveFormItemDialog = (item) => {
    console.log('FORM TRASH ITEM', item)
    setCurrentItem(item)
    setIsFormModalOpen(true)
  }

  const openRemoveScreenItemDialog = (item) => {
    console.log('SCREEN TRASH ITEM', item)
    setCurrentItem(item)
    setIsScreenModalOpen(true)
  }

  const removeFormComponent = () => {
    console.log('REMOVING FORM ITEM', currentItem)
    props.removeFormComponent(currentItem)
    setIsFormModalOpen(false)
  }

  const removeScreenComponent = () => {
    console.log('REMOVING SCREEN ITEM', currentItem)
    props.removeScreenComponent(currentItem)
    setIsScreenModalOpen(false)
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['screen-component', 'form-component'],
    drop: (item) => (props.type === 'screen' ? openRemoveScreenItemDialog(item) : openRemoveFormItemDialog(item)),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <TrashStyled ref={drop} isOver={isOver}>
      <FontAwesomeIcon icon={isOver ? faTrashPlus : faTrash} size="3x" />
      <Modal
        isOpen={isScreenModalOpen}
        onRequestClose={() => setIsScreenModalOpen(false)}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <AppModal>
          <AppModal.title>Remove Screen Component</AppModal.title>
          <AppModal.subtitle>Remove: {currentItem && currentItem.name}?</AppModal.subtitle>
          <AppModal.buttons>
            <LightButton onClick={() => setIsScreenModalOpen(false)}>Cancel</LightButton>
            <DarkButton onClick={() => removeScreenComponent()}>Remove</DarkButton>
          </AppModal.buttons>
        </AppModal>
      </Modal>

      <Modal
        isOpen={isFormModalOpen}
        onRequestClose={() => setIsFormModalOpen(false)}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <AppModal>
          <AppModal.title>Remove Form Component</AppModal.title>
          <AppModal.subtitle>Remove: {currentItem && currentItem.name}?</AppModal.subtitle>
          <AppModal.buttons>
            <LightButton onClick={() => setIsFormModalOpen(false)}>Cancel</LightButton>
            <DarkButton onClick={() => removeFormComponent()}>Remove</DarkButton>
          </AppModal.buttons>
        </AppModal>
      </Modal>
    </TrashStyled>
  )
}

export default Trash
