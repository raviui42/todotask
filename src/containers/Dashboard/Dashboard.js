import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  addNewTask,
  removeTask,
  taskStatusUpdate,
  editTask,
} from './dashboardActions';
import styles from './dashboard.scss';
import Tasks from '../../components/Tasks/Tasks';

class Dashboard extends React.PureComponent {
  // constructor() {
  //   super();
  //   this.state = {
  //     title: 'Home',
  //     id: '',
  //     author: '',
  //     published: '',
  //   };
  // }

  render() {
    const {
      tasks,
      createTask,
      deleteTask,
      updateTask,
      updateValue,
    } = this.props;
    return (
      <div className={styles.container}>
        <h1>Task Manager</h1>
        <div className={styles.tasksWrapper}>
          {Object.keys(tasks).length > 0 &&
            Object.keys(tasks).map(status => (
            <Tasks
              key={status}
              status={status}
              tasks={tasks[status]}
              deleteTask={deleteTask}
              createTask={createTask}
              updateTask={updateTask}
              updateValue={updateValue}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ DashboardReducer }) => ({
  tasks: DashboardReducer.tasks,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createTask: addNewTask,
    deleteTask: removeTask,
    updateTask: taskStatusUpdate,
    updateValue: editTask,
  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
