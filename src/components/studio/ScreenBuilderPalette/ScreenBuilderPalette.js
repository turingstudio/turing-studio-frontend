import React from 'react'
import ScreenBuilderPaletteStyled from './screen_builder_palette_styles'
import PaletteComponent from '../PaletteComponent/PaletteComponent'
import Trash from '../Trash/Trash'

const ScreenBuilderPalette = ({ removeScreenComponent }) => {
  return (
    <ScreenBuilderPaletteStyled>
      <ScreenBuilderPaletteStyled.title>Components</ScreenBuilderPaletteStyled.title>
      <hr />
      <ScreenBuilderPaletteStyled.components>
        <PaletteComponent key="screen_section" name="ScreenSection" title="One Column" />
        <PaletteComponent key="screen_section_two" name="ScreenSectionTwo" title="Two Column" />
        <PaletteComponent key="image" name="Image" title="Image" />
        <PaletteComponent key="text" name="Text" title="Text" />
        <PaletteComponent key="divider" name="Divider" title="Divider" />
      </ScreenBuilderPaletteStyled.components>
      <ScreenBuilderPaletteStyled.trash>
        <Trash removeScreenComponent={removeScreenComponent} type="screen" />
      </ScreenBuilderPaletteStyled.trash>
    </ScreenBuilderPaletteStyled>
  )
}

export default ScreenBuilderPalette
