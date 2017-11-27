import React, {Component} from 'react'

import AdminPanel from './admin/AdminPanel'
import AddPanel from './add/AddPanel'

class Header extends Component {
  render() {
    return (
      <header style={{height: '115px'}}>
        <AdminPanel user={this.props.currentUser}/>
        <AddPanel user={this.props.currentUser}/>         
      </header>
    )
  }
}

export default Header