import React, { Component} from 'react';
import { Meteor } from 'meteor/meteor'

import {Tasks} from '../api/tasks'
 
class Task extends Component {
  toggleChecked() {
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  render() {
    return (
      <tr>
        <td>
          <input
            type="checkbox"
            readOnly
            checked = {this.props.task.checked}
            onClick = {this.toggleChecked.bind(this)}/>
        </td>
        <td>
          <strong>{this.props.task.username}</strong>
        </td>
        <td>
          {this.props.task.text}
        </td>
        <td>
          <i className="fa fa-times-circle-o" onClick = {this.deleteTask.bind(this)}></i>
          <i className="fa fa-window-close" aria-hidden="true"></i>
        </td>  
      </tr>
    );
  }
}

export default Task
 