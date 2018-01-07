import React from 'react'
import {HostInput, HostAdd, SelectPanel, SelectDatabase, SelectView} from './LeftPaneComponents'

const redStyle = {
  backgroundColor: 'red',
  height: '100%'
}
const blueStyle = {
  backgroundColor: 'blue',
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
  const server = props.currHost
    ? props.currHost.label
    : '';
  const db = props.selectedDatabase
    ? props.selectedDatabase.label
    : '';
  const serverdb = `${server}/${db}`

  return (<div style={redStyle}>
    <input name="host-db" type="text" readOnly={true} value={serverdb}/>
  </div>)
}

export {
  LeftPane,
  RightPane
}
