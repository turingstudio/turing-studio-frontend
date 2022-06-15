import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PreviewStyled from './preview_styles'
import * as Constants from '../../constants/constants'
import * as Components from '../../components/runtime'

const Preview = function () {
  const [content, setContent] = useState([])
  const app = useSelector((state) => state.app)
  const { screen } = app

  const reviver = (key, value) => {
    if (typeof value === 'string' && value.startsWith('constants.')) {
      const constantKey = value.substring('constants.'.length)
      return Constants[constantKey]
    }
    if (key === 'ScreenComponent') {
      console.log('REVIVING', value)
      return Components[value]
    }
    if (value === 'undefined') {
      return undefined
    }
    return value
  }

  const deserialize = (json) => {
    const parsed = JSON.parse(json, reviver)
    return parsed
  }

  useEffect(() => {
    if (screen && screen.content) {
      console.log('=================== CURRENT SCREEN ID', screen.id)
      const contentDeserialized = deserialize(screen.content).content
      const contentSorted = contentDeserialized.sort((a, b) => (b.orderId < a.orderId ? 1 : -1))
      console.log('CONTENT SORTED', contentSorted)
      setContent(contentSorted)
    }
  }, [screen])

  const renderApp = () => {
    if (content.length) {
      return content.map((item) => {
        const { ScreenComponent, orderId, name, id, height } = item
        return <ScreenComponent key={orderId} orderId={orderId} name={name} id={id} height={height} />
      })
    }
    return <div />
  }

  return (
    <PreviewStyled>
      <PreviewStyled.title>Preview</PreviewStyled.title>
      <PreviewStyled.app>{renderApp()}</PreviewStyled.app>
    </PreviewStyled>
  )
}

export default Preview
