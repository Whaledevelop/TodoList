import React, {Component} from 'react'
import {Table, ControlLabel, FormControl, FormGroup } from 'react-bootstrap'
import { Meteor } from 'meteor/meteor'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import moment from 'moment';

import {firstLetterUpperCase} from '../modules/firstLetterUpperCase'
import '../../client/main.css'

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={1000}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shownTasks: 'all'
    }
    this.toggleShownTasks = this.toggleShownTasks.bind(this)
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.shownTasks === 'done') {
      filteredTasks = filteredTasks.filter(task => task.done)
    } else if (this.state.shownTasks === 'undone') {
      filteredTasks = filteredTasks.filter(task => !task.done)
    }
    return (
      filteredTasks.map(task => {
        const {_id, done, owner, dueDate, username, text} = task
        return (
          <Fade key={_id}>
            <tr className={this.taskStatus(done, dueDate)}>
              <td>{this.renderCheckbox(_id, done, owner)}</td>
              <td><strong>{username}</strong></td>
              <td>{firstLetterUpperCase(text)}</td>
              <td>{this.renderDueDate(dueDate)}</td>
              <td><button className="delete" onClick={() => this.deleteTask(_id)}>&times;</button></td>   
            </tr>
          </Fade>
        )
      })
    )
  }

  taskStatus(done, dueDate) {
    if (done) {
      return 'success'
    } else if (moment()._d > moment(dueDate)._d) {
        return 'danger'
    } else if (moment()._d > moment(dueDate).subtract(1, 'd')._d) {
      return 'warning'
    } 
  }

  renderCheckbox(id, done, owner) {
    if (Meteor.userId() === null) {
      return ''
    } else if (Meteor.userId() === owner){
      return (
        <input
          type="checkbox"
          readOnly
          onClick = {() => this.toggleDone(id, done)}/>
      ) 
    }
  }

  toggleDone(id, done) {
    Meteor.call('tasks.setDone', id, !done);
  }

  renderDueDate(dueDate) {
    return (
      dueDate.split('T')[1] === '23:59'
      ? moment(dueDate).format('DD MMMM')
      : moment(dueDate).format('DD MMMM - HH:mm')
    )   
  }

  deleteTask(id) {
    Meteor.call('tasks.remove', id);
  }

  toggleShownTasks(e) {
    this.setState({
      shownTasks: e.target.value
    })
  }  

  render() {
    return (
      <div>
        <FormGroup controlId="formControlsSelect" style={{width: '20%'}}>
          <ControlLabel>Показать задачи :</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onClick={this.toggleShownTasks}>
            <option value="all">Все</option>
            <option value="done">Выполненные</option>
            <option value="undone">Невыполненные</option>
          </FormControl>
        </FormGroup>
        <Table responsive style={{tableLayout: 'fixed'}}>
          <thead>
            <tr className="active">
              <th></th>
              <th>Автор</th>
              <th>Задача</th>
              <th>Срок выполнения</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <TransitionGroup component = "tbody">
            {this.renderTasks()}
          </TransitionGroup> 
        </Table>
      </div>
      
    )
  }
}

export default TaskList