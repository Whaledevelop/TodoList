import React from 'react'
import {Table} from 'react-bootstrap'
import {TransitionGroup} from 'react-transition-group'

import Task from './Task'
import {Fade} from './Fade'

const TasksList = ({ tasks, shownTasks }) => {
    const filteredTasks = tasks.filter(task => shownTasks === 'done' ? task.done : !task.done)
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
                {filteredTasks.map(task => (
                    <Fade key={task._id}>
                        <Task task={task}/>
                    </Fade>
                ))}
            </TransitionGroup> 
        </Table>
    )
}

export default TasksList