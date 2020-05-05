export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS';
export const EDIT_TASK ='EDIT_TASK';

export const addNewTask = (text, status) => ({
  type: ADD_NEW_TASK,
  data: {
    text,
    status,
  },
});

export const removeTask = task => ({
  type: DELETE_TASK,
  task
});

export const editTask = (task, text) => {
  return {
    type: EDIT_TASK,
    text,
    task,
  }
};

export const taskStatusUpdate = (task, transferStatus) => ({
  type: UPDATE_TASK_STATUS,
  task,
  transferStatus,
})
