import React, {Component} from 'react'
import {Panel} from 'react-bootstrap'

import AccountsUIWrapper from './AccountsUIWrapper';

class AdminPanel extends Component {
  render() {
    return (
      <div style={{height: '50px', marginTop: '10px'}}>
        <h5 style={{float: 'left'}}>
          {this.props.user ? 'Активный пользователь' : 'Авторизуйтесь'} : <AccountsUIWrapper />
        </h5>
      </div>
    )
  }
}

export default AdminPanel

