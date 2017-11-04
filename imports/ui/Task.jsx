import React, { Component} from 'react';
import { Meteor } from 'meteor/meteor'
import '../css/fa/css/font-awesome.min.css'
import '../css/themify-icons/themify-icons.css'

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
        <td></td>
        <td>
          <button className="delete" onClick={this.deleteTask.bind(this)}>
            &times;
          </button>
        </td>  
      </tr>
    );
  }
}

export default Task
 