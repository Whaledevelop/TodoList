import React, {Component} from 'react'
import {Panel} from 'react-bootstrap'

import AccountsUIWrapper from './AccountsUIWrapper';

class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openInfo: false
    }
  }
  
  render() {
    return (
      <div style={{height: '50px', marginTop: '10px'}}>
        <h5 style={{float: 'left'}}>Активный пользователь: <AccountsUIWrapper /></h5>
        <div style={{float: 'right', width: '30%'}}>
          <a
            style={{paddingLeft: '60px'}}
            onClick={() => {this.setState({openInfo: !this.state.openInfo})}}>
            Информация для Milk&Cartoons
          </a>
          <Panel collapsible expanded={this.state.openInfo}>
            <p>Пароль для входа в аккаунт Admin - 123456, User - 123456. Admin может выполнять операции со всеми задачами, User и новый аккаунты только со своими задачами</p>
          </Panel>
        </div>
      </div>
    )
  }
}

export default InfoPanel

