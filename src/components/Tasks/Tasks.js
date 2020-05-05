import React from 'react';

import Input from '../../common/Input';
import Task from '../../common/Task';
import styles from './tasks.scss';

class Tasks extends React.Component {
  constructor() {
    super();
    this.state = {
      taskText: '',
      draggedData: {},
      diting: false,
      edit: false,
    };
  }

  handlechange = ({ target }) => this.setState({ taskText: target.value });

  addTask = status => () => {
    const { createTask } = this.props;
    const { taskText } = this.state;
    if (taskText) {
      createTask(taskText, status);
      this.setState({ taskText: '' });
    }    
  }

  onDragOver = ev => {
    ev.preventDefault();
  }

  onDrop = status => ev => {
    const { updateTask } = this.props;
    const id = ev.dataTransfer.getData("id");
    const text = ev.dataTransfer.getData("text");
    if (status !== ev.dataTransfer.getData("status")) {
      updateTask({
        id,
        status,
        text,
      }, ev.dataTransfer.getData("status"));
    }
  }

  onDragStart = task => ev => {
    ev.dataTransfer.setData("id", task.id);
    ev.dataTransfer.setData("text", task.text);    
    ev.dataTransfer.setData("status", task.status);
  };
 

  render() {
    const { status, tasks, deleteTask , updateValue} = this.props;
    const { taskText } = this.state;
    return (
      <div
        className={styles.tasksContainer}
      >
        <div className={styles.tasks}>
          <h3>{status}</h3>
          <div
            className={styles.tasksDiv}
            onDragOver={(e) => this.onDragOver(e)}                    
            onDrop={this.onDrop(status)}
          >
            {tasks.length > 0 &&
              tasks.filter(t => t.status == status)
              .map(task =>
                <Task
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  onDragStart={this.onDragStart}
                  updateValue={(value) => updateValue(task, value) }
                />
            )}
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <Input
            type="text"
            className={styles.text}
            value={taskText}
            onChange={this.handlechange}
          />
          <Input
            type="button"
            value="Add"
            onClick={this.addTask(status)}
          />                  
        </div>
      </div>
    );    
  }
}

export default Tasks;
