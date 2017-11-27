import React, {Component} from 'react'
import {Panel} from 'react-bootstrap'

import AddForm from './AddForm'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddForm: false,
      errorMessage: ''
    }
    this.handleOpenAddForm = this.handleOpenAddForm.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState({
        errorMessage: ''
      })
    }
  }

  handleOpenAddForm() {
    if (this.props.currentUser) {
      this.setState({
        openAddForm: !this.state.openAddForm
      })
    } else {
      this.setState({
        errorMessage: 'Authorize to add tasks'
      })
    } 
  }

  openFormButtonClassName() {
    return this.props.currentUser ? 'btn btn-primary' : 'btn btn-primary disabled' 
  }

  render() {
    return (
      <header style={{height: '115px'}}>
        <div style={{position: 'absolute', top: '10px', left: '37%', width: '26%'}}>
          <div
            style={{width: '100%', padding: '6px  0px'}}
            className={this.openFormButtonClassName()}
            onClick={this.handleOpenAddForm}>
            Добавить новую задачу
          </div>
          <Panel collapsible expanded={this.state.openAddForm}>  
            <AddForm/>
          </Panel>
          <h2 style={{color: 'red'}}>{this.state.errorMessage}</h2>
        </div>        
      </header>
    )
  }
}

export default Header