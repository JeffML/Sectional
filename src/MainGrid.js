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
      knownHosts: JSON.parse(localStorage.knownHosts || "[]"),
      databases: []
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.knownHosts !== nextState.knownHosts) {
      console.log('update knownHosts')
      localStorage.knownHosts = JSON.stringify(nextState.knownHosts);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.cx && (this.state.cx !== prevState.cx)) {
      this.state.cx.db.list((err, databases) => {
        if (err) {
          throw err;
        }
        this.setState({
          databases: databases.map(db => ({label: db, value: db}))
        })
      });
    }
  }

  render() {
    const handleHostSelect = (selectedHost) => {
      this.setState({selectedHost});
      console.log(`Selected: ${selectedHost.label}`);
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

    const handleDatabaseSelect = (selectedDatabase) => {
      console.log({selectedDatabase})
      this.setState({selectedDatabase});
    }

    const props = {
      handleHostSelect: handleHostSelect.bind(this),
      handleHostAdd: handleHostAdd.bind(this),
      handleHostUse: handleHostUse.bind(this),
      handleHostDelete: handleHostDelete.bind(this),
      handleDatabaseSelect: handleDatabaseSelect.bind(this)
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
