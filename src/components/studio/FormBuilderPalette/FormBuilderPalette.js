import React from 'react'
import FormBuilderPaletteStyled from './form_builder_palette_styles'
import PaletteComponent from '../PaletteComponent/PaletteComponent'
import Trash from '../Trash/Trash'
import FormElementTypes from '../../../constants/form_element_types'

const FormBuilderPalette = ({ removeFormComponent }) => {
  return (
    <FormBuilderPaletteStyled>
      <FormBuilderPaletteStyled.title>Components</FormBuilderPaletteStyled.title>
      <hr />
      <FormBuilderPaletteStyled.components>
        <PaletteComponent key="textInput" name="FormElement" type={FormElementTypes.TEXT_INPUT} title="Text Input" />
        <PaletteComponent key="textArea" name="FormElement" type={FormElementTypes.TEXT_AREA} title="Text Area" />
        <PaletteComponent key="dropdown" name="FormElement" type={FormElementTypes.SELECT} title="Dropdown" />
      </FormBuilderPaletteStyled.components>
      <FormBuilderPaletteStyled.trash>
        <Trash removeFormComponent={removeFormComponent} type="form" />
      </FormBuilderPaletteStyled.trash>
    </FormBuilderPaletteStyled>
  )
}

export default FormBuilderPalette
