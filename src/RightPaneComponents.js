import React, {Component} from 'react'

const Location = (props) => {
  const server = props.currHost
    ? props.currHost.label
    : '';
  const db = props.selectedDatabase
    ? props.selectedDatabase.label
    : '';
  const serverdb = `${server}/${db}`

  return <input name="host-db" type="text" readOnly={true} value={serverdb}/>
}

const ViewTab = (props) => (<button name={"tab"} key={0} data-entity={"View"} style={props.tabPaneTab} onClick={props.handleTabClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>{"View"}</button>)

const ConflictTab = (props) => (<button name={"tab"} key={1} data-entity={"Conflicts"} style={props.tabPaneTab} onClick={props.handleTabClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>{"Conflict"}</button>)

class TabbedPane extends Component {
  state: {}

  tabPaneStyle: {
    overflow: "hidden",
    border: "1px solid #ccc",
    backgroundColor: "#f1f1f1"
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedTab !== this.props.selectedTab) {
      const els = document.getElementsByName('tab') //NodeList
      for (var i = 0; i < els.length; i++) {
        const e = els[i]
        if (e.dataset.entity === this.props.selectedTab) {
          e.style.backgroundColor = "dodgerblue"
        }
      }
    }
  }

  render() {
    const tabPaneTab = {
      backgroundColor: "inherit",
      float: "left",
      border: "none",
      outline: "none",
      cursor: "pointer",
      padding: "14px 16px",
      transition: "0.3s"
    }

    const onMouseEnter = (e) => {
      if (this.props.selectedTab && this.props.selectedTab === e.target.dataset.entity) {
        e.target.style.backgroundColor = "dodgerblue"
      } else {
        e.target.style.backgroundColor = "powderblue"
      }
    }

    const onMouseLeave = (e) => {
      if (this.props.selectedTab && this.props.selectedTab === e.target.dataset.entity) {
        e.target.style.backgroundColor = "dodgerblue"
      } else {
        e.target.style.backgroundColor = "#f1f1f1"
      }
    }

    const props = {
      tabPaneTab,
      onMouseEnter,
      onMouseLeave
    }
    Object.assign(props, this.props, this.state)

    return (<div style={this.tabPaneStyle}>
      <ViewTab {...props}/>
      <ConflictTab {...props}/>
    </div>)
  }
}

export {
  Location,
  TabbedPane
}
