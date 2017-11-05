import React, {Component} from 'react'
import {Panel} from 'react-bootstrap'

import InfoPanel from './InfoPanel'
import AddForm from './AddForm'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddForm: false
    }
    this.handleOpenAddForm = this.handleOpenAddForm.bind(this)
  }

  handleOpenAddForm() {
    if (this.props.currentUser) {
      this.setState({
        openAddForm: !this.state.openAddForm
      })
    } else alert('You are not authorized to add tasks') 
  }

  openFormButtonClassName() {
    return this.props.currentUser ? 'btn btn-primary' : 'btn btn-primary disabled' 
  }

  render() {
    return (
      <header style={{height: '90px'}}>
        <InfoPanel/>
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
        </div>        
      </header>
    )
  }
}

export default Header