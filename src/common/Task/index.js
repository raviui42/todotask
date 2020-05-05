// eslint-disable-next-line jsx-a11y/href-no-hash
import React from 'react';

import styles from './task.scss';

class Task extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      type: props.type || 'text',
      edit: false,
      value: props.task.text ||'',
    }
  }

  editTaskValue = () => {
    this.setState({edit: !this.state.edit})
  }

  keyUpData = (event) => {
    if(event.key==='Escape') {
      this.setState({edit:false, value: this.props.task.text})
    }
    if(event.key==='Enter') {
      this.setState({edit:false})
      this.props.updateValue(event.target.value)
    }
  }

  onChangeValue = (event) => {
    this.setState({value:event.target.value})
  }

  render(){
    const { task, deleteTask, onDragStart } = this.props;
    return(
    <div
      className={styles.task}
      onDragStart={onDragStart(task)}
      draggable
    >
      {this.state.edit===true &&
        <input type={this.state.type}
          value={this.state.value}
          onKeyPress={this.keyUpData}
          onChange={this.onChangeValue}
        />
        ||
        <span onClick={this.editTaskValue}> {task.text} </span>
      }
      
      <span onClick={() => deleteTask(task)}>x</span>
    </div>
    )
  }
}

export default Task;
