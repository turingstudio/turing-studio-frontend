import React from 'react'
import { faInputText, faListDropdown, faSquareCheck } from '@fortawesome/pro-regular-svg-icons'
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
        <PaletteComponent
          icon={faInputText}
          key="text_input"
          name="FormElement"
          type={FormElementTypes.TEXT_INPUT}
          title="Text Input"
        />
        <PaletteComponent
          icon={faInputText}
          key="text_area"
          name="FormElement"
          type={FormElementTypes.TEXT_AREA}
          title="Text Area"
        />
        <PaletteComponent
          icon={faListDropdown}
          key="dropdown"
          name="FormElement"
          type={FormElementTypes.SELECT}
          title="Dropdown"
        />
        <PaletteComponent
          icon={faSquareCheck}
          key="checkbox"
          name="FormElement"
          type={FormElementTypes.CHECKBOX}
          title="Checkbox"
        />
      </FormBuilderPaletteStyled.components>
      <FormBuilderPaletteStyled.trash>
        <Trash removeFormComponent={removeFormComponent} type="form" />
      </FormBuilderPaletteStyled.trash>
    </FormBuilderPaletteStyled>
  )
}

export default FormBuilderPalette
