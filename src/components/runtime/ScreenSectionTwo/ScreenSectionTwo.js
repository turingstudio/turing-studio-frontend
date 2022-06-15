import React from 'react'
import ScreenSectionTwoStyled from './screen_section_two_styles'

const ScreenSectionTwo = (props) => {
  const { height } = props
  return (
    <ScreenSectionTwoStyled style={{ height }}>
      <ScreenSectionTwoStyled.one />
      <ScreenSectionTwoStyled.two />
    </ScreenSectionTwoStyled>
  )
}

export default ScreenSectionTwo
