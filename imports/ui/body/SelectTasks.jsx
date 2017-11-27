import React, {Component} from 'react'
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap'

class SelectTasks extends Component {
  render() {
    return (
      <FormGroup controlId="formControlsSelect" style={{width: '20%'}}>
        <ControlLabel>Показать задачи :</ControlLabel>
        <FormControl 
          componentClass="select" 
          placeholder="select" 
          onClick={e => {
            this.props.onClick(e.target.value)
          }}
        >
          <option value="all">Все</option>
          <option value="done">Выполненные</option>
          <option value="undone">Невыполненные</option>
        </FormControl>
      </FormGroup>
    )
  }
}

export default SelectTasks 