import React, {Component} from 'react'
import Task from './Task'

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hideCompleted: false
    }
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked)
    }
    return (
      filteredTasks.map(task => {
        console.log (task);
        return (
          <Task 
            key={task._id} 
            task={task}/>
        )    
      })
    )
  }

  render() {
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Выполнено - {' '} 
              <a 
                onClick={() => {
                  this.setState(prevState => {
                    hideCompleted: !prevState.hideCompleted
                  })
                }}>
                скрыть выполненные задачи
              </a>
            </th>
            <th>Ответственный</th>
            <th>Задача</th>
            <th>Срок выполнения</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTasks()}
        </tbody>
      </table>
    )
  }
}

export default TaskList