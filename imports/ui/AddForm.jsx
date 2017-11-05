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
      info: '',
      infoColor: 'black'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSubmit(e) {
    const {text, dueDate, info} = this.state;
    e.preventDefault();
    if (info === 'Нажмите enter') { 
      Meteor.call('tasks.insert', text, dueDate);
      e.target.input.value = ''
      this.setState({
        text: '',
        dueDate: '',
        info: '',
        infoColor: 'black'
      })
    } else {
      this.setState({infoColor: 'red'})
    }
  }

  handleInput(e) {
    const {taskText, dueDate, info} = dueDateFromText(e.target.value);  
    let infoColor = 'black';
    if (info === 'Нажмите enter') {
      infoColor = 'blue'
    }
    this.setState({ 
      text: taskText,
      dueDate: dueDate,
      info: info, 
      infoColor: infoColor
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <ControlLabel style={{color: `${this.state.infoColor}`}}>{this.state.info}</ControlLabel>
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

