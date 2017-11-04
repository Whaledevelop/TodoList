import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor'
import {Panel} from 'react-bootstrap'

import AccountsUIWrapper from './AccountsUIWrapper';
import AddForm from './AddForm'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.openAddForm = this.openAddForm.bind(this)
  }

  openAddForm() {
    if (this.props.currentUser) {
      this.setState({
        open: !this.state.open
      })
    } else alert('You are not authorized to add tasks') 
  }

  openFormClassName() {
    return this.props.currentUser ? 'btn btn-primary' : 'btn btn-primary disabled' 
  }

  render() {
    return (
      <header style={{height: '120px'}}>
        <div style={{height: '50px', marginTop: '10px'}}>
          <h5 style={{float: 'left'}}>Активный пользователь: <AccountsUIWrapper /></h5>
          <h5 style={{float: 'right'}}>Информация для Milk&Cartoons</h5>
        </div>
        <h2 style={{position:'absolute', margin: '0px'}}>Todo list</h2>
        <div style={{position: 'absolute', left: '40%', width: '20%'}}>
          <div
            style={{width: '100%', padding: '6px  0px'}}
            className={this.openFormClassName()}
            onClick={this.openAddForm}>
            Добавить новую задачу
          </div>
          <Panel collapsible expanded={this.state.open}>  
            <AddForm onSubmit={text => Meteor.call('tasks.insert', text)}/>
          </Panel>
        </div>        
      </header>
    )
  }
}

export default Header