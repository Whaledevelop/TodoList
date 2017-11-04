import React, {Component} from 'react'
import {FormGroup, FormControl} from 'react-bootstrap'

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.text)
    e.target.input.value = ''
  }

  handleInput(e) {
    this.setState({ 
      text: e.target.value 
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
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

