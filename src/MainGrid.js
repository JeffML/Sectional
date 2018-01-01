import React, {Component} from 'react';
import {LeftPane, RightPane} from './Panes'
import nano from 'nano'
import 'react-simple-flex-grid/lib/main.css'
import {Row, Col} from 'react-simple-flex-grid'

class MainGrid extends Component {
  constructor(props) {
    super(props)

    if (typeof(Storage) === "undefined") {
      alert("Sorry, but this application requires browser support for Web Storage")
    }

    this.state = {
      currHost: '',
      dbs: [],
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
      this.setState({selectedHost});
      console.log(`Selected: ${selectedHost.label}`);
    }

    const getDbs = () => {
      this.state.cx.db.list(function(err, body) {
        if (err) {
          throw err;
        }
        body.forEach(function(db) {
          console.log(db);
        });
      });
    }

    const handleHostAdd = (currHost) => {
      //check connection
      try {
        const cx = nano(currHost.value)
        this.setState({cx})
        this.setState({
          knownHosts: this.state.knownHosts.concat([currHost])
        })
        this.setState({currHost});
        getDbs()
        console.log(`Added: ${currHost.label}`);
      } catch (e) {
        console.error("error: ", e)
        alert(`Unable to connect to ${currHost.value}`)
      }
    }

    const handleHostUse = (currHost) => {
      //check connection
      try {
        const cx = nano(currHost.value)
        this.setState({cx})
        this.setState({currHost});
        getDbs()
        console.log(`Using: ${currHost.label}`);
      } catch (e) {
        alert(`Unable to connect to ${currHost.value}`)
      }
    }

    const handleHostDelete = (currHost) => {
      //check connection
      this.setState({
        knownHosts: this.state.knownHosts.filter(host => host.value !== currHost.value)
      })
      console.log(`Deleted: ${currHost.label}`);
    }

    const props = {
      handleHostSelect: handleHostSelect.bind(this),
      handleHostAdd: handleHostAdd.bind(this),
      handleHostUse: handleHostUse.bind(this),
      handleHostDelete: handleHostDelete.bind(this)
    }

    Object.assign(props, this.props, this.state)

    return (<Row>
      <Col span={4}>
        <div key="left"><LeftPane {...props}/></div>
      </Col>
      <Col span={8}><RightPane/></Col>
    </Row>)
  };
};

export {
  MainGrid
};
