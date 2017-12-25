import React from 'react'

import Select from 'react-select';
import 'react-select/dist/react-select.css';

var buttonStyle = {
  margin: '10px 10px 10px 0'
};

const HostSelect = (props) => (
  <Select
    name="form-field-name"
    placeholder="Select CouchDB Host"
    value={props.currHost.value}
    onChange={props.handleHostChange}
    options={[
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ]}
  />
)

const HostInput = (props) => (
  <input type='text' />
)

const HostAdd = (props) => (
  <button
        className="btn btn-default"
        style={buttonStyle}
        onClick={props.handleHostAdd}>Add Host</button>
)
export {HostSelect, HostInput, HostAdd}
