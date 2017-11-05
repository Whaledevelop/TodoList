import React, {Component} from 'react'
import { Meteor } from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'

import {Tasks} from '../api/tasks'
import Header from './header/Header'
import TaskList from './body/TaskList'

class App extends Component {
  render () {
    return (
      <div className="container">
        <Header currentUser={this.props.currentUser}/>
        <TaskList tasks={this.props.tasks}/>
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, {sort: { createdAt: -1}}).fetch(),
    currentUser: Meteor.user()
  }
})(App);