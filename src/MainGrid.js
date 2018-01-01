import ReactGridLayout from 'react-grid-layout'
import React, {Component} from 'react';
import {LeftPane, RightPane} from './Panes'
import nano from 'nano'

class MainGrid extends Component {
  constructor(props) {
    super(props)

    if (typeof (Storage) === "undefined") {
        alert("Sorry, but this application requires browser support for Web Storage")
    }

    this.state = {
      currHost: '',
      knownHosts: JSON.parse(localStorage.knownHosts || "[]")
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.knownHosts !== nextState.knownHosts) {
      console.log('update knownHosts')
      localStorage.knownHosts = JSON.stringify(nextState.knownHosts);
    }
  }

  render() {
    const handleHostSelect = (selectedHost) => {
      this.setState({ selectedHost });
      console.log(`Selected: ${selectedHost.label}`);
    }

    const handleHostAdd = (currHost) => {
      //check connection
      try {
        const cx = nano(currHost.value)
        this.setState({cx})
        this.setState({knownHosts: this.state.knownHosts.concat([currHost])})
        this.setState({ currHost });
        console.log(`Added: ${currHost.label}`);
      } catch(e) {
        alert(`Unable to connect to ${currHost.value}`)
      }
    }

    const props = {
      handleHostSelect: handleHostSelect.bind(this),
      handleHostAdd: handleHostAdd.bind(this)
    }

    Object.assign(props, this.props, this.state)

    // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'left', x: 0, y: 0, w: 4, h: 20, static: true},
      {i: 'right', x: 5, y: 0, w: 8, h: 20}
    ];

    return (
      <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key="left"><LeftPane {...props}/></div>
        <div key="right"><RightPane/></div>
      </ReactGridLayout>
    )
  }
};

export {MainGrid};
