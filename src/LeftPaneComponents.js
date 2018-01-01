import React, {Component} from 'react'

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ReactGridLayout from 'react-grid-layout'

var buttonStyle = {
  margin: '10px 10px 10px 0'
};

const hostState = {inputHost: null}

var layout = [
  {i: 'select', x: 0, y: 0, w: 8, h: 20, static: true},
  {i: 'use', x: 8, y: 0, w: 2, h: 20},
  {i: 'delete',  x: 10, y: 0, w: 2, h: 20}
];

const panelStyle = {backgroundColor: "violet"}

class SelectPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const props = {...this.props}

    return (
      <ReactGridLayout className="layout" style={panelStyle} layout={layout} cols={12} rowHeight={30} width={385}>
        <div key="select">
          <HostSelect {...props}/>
        </div>
        <div key="use">
          <HostUse/>
        </div>
        <div key="delete"><HostDelete/></div>
      </ReactGridLayout>
    )
  }
}


const HostSelect = (props) => (
  <Select
    name="form-field-name"
    placeholder="Select CouchDB Host"
    value={props.currHost.value}
    onChange={props.handleHostChange}
    options={props.knownHosts}
  />
)

const HostInput = (props) => (
  <input type='text' ref={input => {hostState.inputHost = input;}}  />
)

const HostAdd = (props) => (
  <button
        className="btn btn-default"
        style={buttonStyle}
        onClick={() => {props.handleHostAdd({value: hostState.inputHost.value, label: hostState.inputHost.value})}}>Add Host</button>
)

const HostUse = (props) => (
  <button
        className="btn btn-default"
        style={buttonStyle}
        onClick={() => {props.handleHostAdd({value: hostState.inputHost.value, label: hostState.inputHost.value})}}>Use</button>
)

const HostDelete = (props) => (
  <button
        className="btn btn-default"
        style={buttonStyle}
        onClick={() => {props.handleHostAdd({value: hostState.inputHost.value, label: hostState.inputHost.value})}}>Delete</button>
)

export {HostInput, HostAdd, SelectPanel}
