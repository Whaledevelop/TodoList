import React, { Component} from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import {Tasks} from '../api/tasks'
import {firstLetterUpperCase} from '../modules/firstLetterUpperCase'
 
class Task extends Component {
  toggleChecked() {
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  renderDueDate(dueDate) {
    return (
      dueDate.split('T')[1] === '23:59'
      ? moment(dueDate).format('DD MMMM')
      : moment(dueDate).format('DD MMMM - HH:mm')
    )   
  }

  taskStatus() {
    const {checked, dueDate} = this.props.task;
    if (checked) {
      return 'success'
    } else if (moment()._d > moment(dueDate)._d) {
        return 'danger'
    } else if (moment()._d > moment(dueDate).subtract(1, 'd')._d) {
      return 'warning'
    } 
  }

  renderCheckbox(owner) {
    if (Meteor.userId() === null) {
      return ''
    } else if (Meteor.userId() === owner){
      return (
        <input
        type="checkbox"
        readOnly
        onClick = {this.toggleChecked.bind(this)}/>
      ) 
    }
  }

  render() {
    const {owner, username, text, dueDate} = this.props.task;
    return (
      <tr className={this.taskStatus()}>
        <td>{this.renderCheckbox(owner)}</td>
        <td><strong>{username}</strong></td>
        <td>{firstLetterUpperCase(text)}</td>
        <td>{this.renderDueDate(dueDate)}</td>
        <td><button className="delete" onClick={this.deleteTask.bind(this)}>&times;</button></td>   
       </tr>
    );
  }
}

export default Task
 