import React, { Component} from 'react';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';

import {firstLetterUpperCase} from '../../modules/firstLetterUpperCase'
 
class Task extends Component {
  taskStatus(done, dueDate) {
    return done 
      ? 'success' : (
        (moment()._d > moment(dueDate)._d) 
        ? 'danger' : (
          (moment()._d > moment(dueDate).subtract(1, 'd')._d) 
          ? 'warning' : null
        )
      )
  }

  renderCheckbox(id, done, owner) {
    return (Meteor.userId() === owner || Meteor.user().username === 'Admin') ?
      (
        <input
          type="checkbox"
          readOnly
          checked={done}
          onClick = {() => {
            Meteor.call('tasks.setDone', id, !done)
          }}/>
      ) : '' 
  }

  renderDueDate(dueDate) {
    return (
      dueDate.split('T')[1] === '23:59'
      ? moment(dueDate).format('DD MMMM')
      : moment(dueDate).format('DD MMMM - HH:mm')
    )   
  }

  renderDeleteButton(id, owner) {
    return (Meteor.userId() === owner || Meteor.user().username === 'Admin') ?
      (
        <button 
          className="delete" 
          onClick={() => {
            Meteor.call('tasks.remove', id);
          }}
        >
          &times;
        </button>
      ) : '' 
  }

  render () {
    const {_id, done, dueDate, owner, text, username} = this.props.task
    return (
      <tr className={this.taskStatus(done, dueDate)}>
        <td>{this.renderCheckbox(_id, done, owner)}</td>
        <td><strong>{username}</strong></td>
        <td>{firstLetterUpperCase(text)}</td>
        <td>{this.renderDueDate(dueDate)}</td>
        <td>{this.renderDeleteButton(_id, owner)}</td>   
      </tr>
    )
  }
}

export default Task