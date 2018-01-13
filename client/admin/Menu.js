import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuExampleInvertedVertical extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Menu inverted vertical attached='bottom' className='admin-menu'>
        <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick} />
        <Menu.Item name='products' active={activeItem === 'products'} onClick={this.handleItemClick} />
        <Menu.Item name='orders' active={activeItem === 'orders'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}
