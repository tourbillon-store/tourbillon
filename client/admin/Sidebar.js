import React, { Component } from 'react'
import { Sidebar, Segment, Button, Image, Icon, Menu } from 'semantic-ui-react'
import Header from './Header'
import Table from './Table'

class SidebarLeftUncover extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      // using Sidebar to render header
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar width='thin' visible={true}>
            <h1>ADMIN</h1>
          </Sidebar>
          <Sidebar.Pusher>
            <Header />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} width='thin' visible={true} icon='labeled' vertical inverted>
            <Menu.Item name='Users' active={activeItem === 'home'} onClick={this.handleItemClick} />
            <Menu.Item name='Products' active={activeItem === 'messages'} onClick={this.handleItemClick} />
            <Menu.Item name='Orders' active={activeItem === 'friends'} onClick={this.handleItemClick} />
          </Sidebar>
          <Sidebar.Pusher>
            <Table />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarLeftUncover
