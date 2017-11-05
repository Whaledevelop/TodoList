import React, {Component} from 'react'
import {Table, ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

import Task from './Task'
import '../../client/main.css'

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shownTasks: 'all'
    }
    this.toggleShownTasks = this.toggleShownTasks.bind(this)
  }

  toggleShownTasks(e) {
    this.setState({
      shownTasks: e.target.value
    })
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.shownTasks === 'done') {
      filteredTasks = filteredTasks.filter(task => task.checked)
    } else if (this.state.shownTasks === 'undone') {
      filteredTasks = filteredTasks.filter(task => !task.checked)
    }
    return (
      filteredTasks.map(task => (
        <Fade key={task}
          <Task 
            key={task._id} 
            task={task}/>
        )    
      )
    )
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