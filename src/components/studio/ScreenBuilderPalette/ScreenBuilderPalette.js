import React from 'react'
import { faAlignJustify, faLineColumns, faHorizontalRule, faImage, faText } from '@fortawesome/pro-regular-svg-icons'
import ScreenBuilderPaletteStyled from './screen_builder_palette_styles'
import PaletteComponent from '../PaletteComponent/PaletteComponent'
import PaletteSubcomponent from '../PaletteComponent/PaletteSubcomponent'
import Trash from '../Trash/Trash'

const ScreenBuilderPalette = ({ removeScreenComponent }) => {
  return (
    <ScreenBuilderPaletteStyled>
      <ScreenBuilderPaletteStyled.title>Components</ScreenBuilderPaletteStyled.title>
      <hr />
      <ScreenBuilderPaletteStyled.components>
        <PaletteComponent icon={faAlignJustify} key="screen_section" name="ScreenSection" title="One Column" />
        <PaletteComponent icon={faLineColumns} key="screen_section_two" name="ScreenSectionTwo" title="Two Column" />
        <PaletteSubcomponent icon={faImage} key="image" type="image" name="Image" title="Image" />
        <PaletteSubcomponent icon={faText} key="text" type="text" name="Text" title="Text" />
        <PaletteComponent icon={faHorizontalRule} key="divider" name="Divider" title="Divider" />
      </ScreenBuilderPaletteStyled.components>
      <ScreenBuilderPaletteStyled.trash>
        <Trash removeScreenComponent={removeScreenComponent} type="screen" />
      </ScreenBuilderPaletteStyled.trash>
    </ScreenBuilderPaletteStyled>
  )
}

export default ScreenBuilderPalette
