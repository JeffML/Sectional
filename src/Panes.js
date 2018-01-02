import React from 'react'
import {HostInput, HostAdd, SelectPanel, SelectDatabase} from './LeftPaneComponents'

const redStyle = {
  backgroundColor: 'red',
  height: '100%'
}
const blueStyle = {
  backgroundColor: 'blue',
  height: '100%'
}

const LeftPane = (props) => {
  return <div style={blueStyle}>
    <SelectPanel {...props}/>
    <HostInput {...props}/>
    <HostAdd {...props}/>
    <SelectDatabase {...props}/>
  </div>
}

const RightPane = (props) => (<div style={redStyle}>left</div>)

export {
  LeftPane,
  RightPane
}
