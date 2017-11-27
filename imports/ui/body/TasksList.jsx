import React, {Component} from 'react'
import {Table} from 'react-bootstrap'
import {TransitionGroup} from 'react-transition-group'

import Task from './Task'
import {Fade} from './Fade'

class TasksList extends Component {
    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.props.shownTasks === 'done') {
          filteredTasks = filteredTasks.filter(task => task.done)
        } else if (this.props.shownTasks === 'undone') {
          filteredTasks = filteredTasks.filter(task => !task.done)
        }
        return (
          filteredTasks.map(task => {
            return (
              <Fade key={task._id}>
                <Task task={task}/>
              </Fade>
            )
          })
        )
    }

    render() {
        return (
            <Table responsive style={{tableLayout: 'fixed'}}>
                <thead>
                    <tr className="active">
                        <th></th>
                        <th>Автор</th>
                        <th>Задача</th>
                        <th>Срок выполнения</th>
                        <th></th>
                    </tr>
                </thead>
                <TransitionGroup component = "tbody">
                    {this.renderTasks()}
                </TransitionGroup> 
            </Table>
        )
    }
}

export default TasksList