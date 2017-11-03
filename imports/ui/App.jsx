import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'

import {Tasks} from '../api/tasks'
import AccountsUIWrapper from './AccountsUIWrapper';
import Task from './Task'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      hideCompleted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleHideCompleted = this.toggleHideCompleted.bind(this);
  }

  handleChange(e) {
    this.setState({text: e.target.value})  
  }

  handleSubmit(e) {
    e.preventDefault();
    const text = this.state.text;
    Meteor.call('tasks.insert', text);
    e.target.input.value = ''
  }

  toggleHideCompleted() {
    this.setState(prevState => {
      return {
        hideCompleted: !prevState.hideCompleted
      }   
    })
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked)
    }
    return (
      filteredTasks.map(task => {
        const currentUserId = this.props.currentUser && this.props.currentUser._id;
        const showPrivateButton = task.owner === currentUserId;
        return (
          <Task 
            key={task._id} 
            task={task}
            showPrivateButton = {showPrivateButton}/>
        )    
      })
    )
  }

  renderForm() {
    if (this.props.currentUser) {
      return (
        <form className="new-task" onSubmit={this.handleSubmit} >
          <input
            id="input"
            type="text"
            onChange={this.handleChange}
            placeholder='Write a new task here'/>
        </form>
      )
    } else return ''
  }

  render () {
    return (
      <div className="container">
        <header>
          <h1>Todo list ({this.props.incompleteCount})</h1>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted}/>
            Hide Completed Tasks
          </label>
          <AccountsUIWrapper />
          {this.renderForm()}       
        </header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, {sort: { createdAt: -1}}).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user()
  }
})(App);