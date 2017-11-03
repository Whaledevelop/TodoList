import React, { Component} from 'react';
import { Meteor } from 'meteor/meteor'
import classnames from 'classnames';

import {Tasks} from '../api/tasks'
 
export default class Task extends Component {
  toggleChecked() {
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
  }

  renderPrivateButton() {
    if (this.props.showPrivateButton ) {
      console.log (this.props.task);
      return (
        <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
          {this.props.task.private ? 'Private' : 'Public'}
        </button>
      )
    } else return '' 
  }

  render() {
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });
    return (
      <li className = {taskClassName}>
        <button className = "delete" onClick = {this.deleteTask.bind(this)}>
          &times;
        </button>
        <input
          type="checkbox"
          readOnly
          checked = {this.props.task.checked}
          onClick = {this.toggleChecked.bind(this)}/>
        {this.renderPrivateButton()}
        <span className="text">
          <strong>{this.props.task.username}</strong> : {this.props.task.text}
        </span>
        <span>
          2030
        </span>
      </li>
    );
  }
}
 