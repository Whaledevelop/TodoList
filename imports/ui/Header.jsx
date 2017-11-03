import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor'

import AccountsUIWrapper from './AccountsUIWrapper';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const text = this.state.text;
    Meteor.call('tasks.insert', text);
    e.target.input.value = ''
  }

  renderForm() {
    if (this.props.currentUser) {
      return (
        <form className="new-task" onSubmit={this.handleSubmit} >
          <input
            id="input"
            type="text"
            onChange={e => {
              this.setState({ 
                text: e.target.value 
              })
            }}
            placeholder='Write a new task here'/>
        </form>
      )
    } else return ''
  }

  render() {
    return (
      <header>
        <h5>Активный пользователь: <AccountsUIWrapper /></h5>
        <hr/>
        <h1>Todo list</h1>
        <a 
          className="btn btn-primary">
          Добавить новую задачу
        </a>  
        {this.renderForm()}       
      </header>
    )
  }
}

export default Header