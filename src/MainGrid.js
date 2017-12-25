import ReactGridLayout from 'react-grid-layout'
import React, {Component} from 'react';
import {LeftPane, RightPane} from './Panes'

class MyFirstGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currHost: ''
    }
  }

  render() {
    const handleHostChange = (currHost) => {
      this.setState({ currHost });
      console.log(`Selected: ${currHost.label}`);
    }

    const handleHostAdd = (currHost) => {
      //TODO: check connection, add host to web storage
      this.setState({ currHost });
      console.log(`Added: ${currHost.label}`);
    }

    const props = {
      handleHostChange: handleHostChange.bind(this),
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

export {MyFirstGrid};
