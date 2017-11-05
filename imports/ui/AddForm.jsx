import React, {Component} from 'react'
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import { Meteor } from 'meteor/meteor'

import {dueDateFromText} from '../modules/dueDateFromText'

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: '',
      info: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSubmit(e) {
    const {text, dueDate, info} = this.state;
    if (info === 'Нажмите enter') {
      e.preventDefault(); 
      Meteor.call('tasks.insert', text, dueDate);
      e.target.input.value = ''
    } else alert('Write correct task with correct dueDate')
  }

  handleInput(e) {
    const {taskText, dueDate, info} = dueDateFromText(e.target.value);  
    console.log (taskText, dueDate, info);
    this.setState({ 
      text: taskText,
      dueDate: dueDate,
      info: info
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <ControlLabel>{this.state.info}</ControlLabel>
          <FormControl
            id="input"
            type="text"
            style={{width: '100%', padding: '6px 0px 6px 2px'}}
            onChange={this.handleInput}
            placeholder='Write a new task here'/>
        </FormGroup>     
      </form>
    )
  }
}

export default AddForm

