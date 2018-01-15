import React from 'react'
import {HostInput, HostAdd, SelectPanel, SelectDatabase, SelectView} from './LeftPaneComponents'
import {Location, TabbedPane} from './RightPaneComponents'

const blueStyle = {
  backgroundColor: 'blue',
  height: '100%'
}

const redStyle = {
  backgroundColor: 'red',
  height: '100%'
}

const selectStyle = {
  margin: "20px 20px, 20px, 0"
}

const LeftPane = (props) => {
  return <div style={blueStyle}>
    <SelectPanel {...props}/>
    <HostInput {...props}/>
    <HostAdd {...props}/>
    <SelectDatabase {...props} style={selectStyle}/><hr/>
    <SelectView {...props} style={selectStyle}/>
  </div>
}

const RightPane = (props) => {
  return <div style={redStyle}>
    <Location {...props}/>
    <TabbedPane {...props}/>
  </div>
}

export {
  LeftPane,
  RightPane
}
