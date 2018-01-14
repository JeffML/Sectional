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
      databases: [],
      currentTab: "view"
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.knownHosts !== nextState.knownHosts) {
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
    if (this.state.selectedDatabase !== prevState.selectedDatabase) {
      //TODO fetch view docs
      const currdb = this.state.cx.use(this.state.selectedDatabase.value);
      currdb.list({
        startkey: "_design/",
        endkey: "_design0",
        include_docs: true,
        limit: 501
      }, (err, body) => {
        if (err) {
          console.error(err)
        } else {
          this.setState({
            views: body.rows.map(v => ({label: v.id, value: v.id}))
          })
        }
      })
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
      this.setState({selectedDatabase});
    }

    const handleViewSelect = (selectedView) => {
      this.setState({selectedView});
    }

    const handleTabClick = (e) => {
      document.getElementsByName('tab').forEach(e => e.style.backgroundColor = "#f1f1f1")

      if (e.target.dataset.entity) {
        this.setState({selectedTab: e.target.dataset.entity});
      }
    }

    const props = {
      handleHostSelect,
      handleHostAdd,
      handleHostUse,
      handleHostDelete,
      handleDatabaseSelect,
      handleViewSelect,
      handleTabClick
    }

    Object.assign(props, this.props, this.state)

    return (<Row>
      <Col span={4}>
        <div key="left"><LeftPane {...props}/></div>
      </Col>
      <Col span={8}><RightPane {...props}/></Col>
    </Row>)
  };
};

export {
  MainGrid
};
