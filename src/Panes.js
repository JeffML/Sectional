import React from 'react'
import {HostSelect, HostInput, HostAdd} from './LeftPaneComponents'

const redStyle = {backgroundColor:'red', height: '100%' }
const blueStyle = {backgroundColor:'blue', height: '100%' }

const LeftPane = (props) => {
  return <div style={blueStyle}>
    <HostSelect {...props}/>
    <HostInput {...props}/>
    <HostAdd {...props}/>
  </div>
}

const RightPane = (props) => (
  <div style={redStyle}>left</div>
)

export {LeftPane, RightPane}
