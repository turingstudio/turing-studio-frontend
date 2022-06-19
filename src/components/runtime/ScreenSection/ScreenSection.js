import React from 'react'
import ScreenSectionStyled from './screen_section_styles'

const ScreenSection = (props) => {
  const { height } = props
  return <ScreenSectionStyled style={{ height }} />
}

export default ScreenSection
