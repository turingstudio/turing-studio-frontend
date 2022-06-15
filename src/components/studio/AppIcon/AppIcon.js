import React, { useState } from 'react'
import Avatar, { ConfigProvider } from 'react-avatar'
import { useDrag } from 'react-dnd'
import AppIconStyled from './app_icon_styles'

const iconColors = ['#ae94d1', '#fff1e6', '#fde2e4', '#fad2e1', '#e2ece9', '#a7d6dd', '#f0efeb', '#dfe7fd', '#cddafd']

const AppIcon = function (props) {
  const [isSelected, setIsSelected] = useState(false)
  const { id, name, type = '', draggable, onClick } = props

  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { id, name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const handleOnClick = () => {
    setIsSelected(true)
    onClick(id)
  }

  return (
    <AppIconStyled ref={draggable && drag}>
      <AppIconStyled.container>
        <ConfigProvider colors={iconColors}>
          <Avatar name={name} size="100" round="20px" maxInitials={3} onClick={handleOnClick} />
        </ConfigProvider>
        <AppIconStyled.title title={name}>{name}</AppIconStyled.title>
      </AppIconStyled.container>
    </AppIconStyled>
  )
}

export default AppIcon
