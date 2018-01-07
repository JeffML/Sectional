import React, {Component} from 'react'

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'react-simple-flex-grid/lib/main.css'
import {Row, Col} from 'react-simple-flex-grid'

var buttonStyle = {
  margin: '10px 10px 10px 0'
};

const hostState = {
  inputHost: null
}

class SelectPanel extends Component {
  render() {
    const props = {
      ...this.props
    }

    return (<Row>
      <Col span={7}><HostSelect {...props}/></Col>
      <Col span={3}><HostUse {...props}/></Col>
      <Col span={2}><HostDelete {...props}/></Col>
    </Row>)
  }
}

const HostSelect = (props) => (<Select name="host-select" placeholder="Select CouchDB Host" value={props.selectedHost && props.selectedHost.value} onChange={props.handleHostSelect} options={props.knownHosts}/>)

const HostInput = (props) => (<input type='text' ref={input => {
    hostState.inputHost = input
  }}/>)

const HostAdd = (props) => (<button className="btn btn-default" style={buttonStyle} onClick={() => {
    props.handleHostAdd({value: hostState.inputHost.value, label: hostState.inputHost.value})
  }}>Add Host</button>)

const HostUse = (props) => (<button className="btn btn-default" style={buttonStyle} onClick={() => {
    props.handleHostUse({value: props.selectedHost.value, label: props.selectedHost.value})
  }}>Use</button>)

const HostDelete = (props) => (<button className="btn" style={buttonStyle} onClick={() => {
    props.handleHostDelete({value: props.selectedHost.value, label: props.selectedHost.value})
  }}>Delete</button>)

const SelectDatabase = (props) => (<Select name="db-select" placeholder="Select Database" value={props.selectedDatabase && props.selectedDatabase.value} onChange={props.handleDatabaseSelect} options={props.databases}/>)

const SelectView = (props) => (<Select name="view-select" placeholder="Select View" value={props.selectedView && props.selectedView.value} onChange={props.handleViewSelect} options={props.views}/>)

export {
  HostInput,
  HostAdd,
  SelectPanel,
  SelectDatabase,
  SelectView
}
