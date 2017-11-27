import React, {Component} from 'react'

import SelectTasks from './SelectTasks'
import TasksList from './TasksList'

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shownTasks: 'all'
    }
  }

  render() {
    return (
      <div>
        <SelectTasks 
          onClick={shownTasks => {
              this.setState({
                shownTasks: shownTasks
              })
            }
          }       
        />
        <TasksList
          shownTasks = {this.state.shownTasks}
          tasks = {this.props.tasks}
        />
      </div>  
    )
  }
}

export default Body