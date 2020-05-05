/* eslint-disable no-undef */
import {
  DELETE_TASK,
  ADD_NEW_TASK,
  UPDATE_TASK_STATUS,
  EDIT_TASK,
} from './dashboardActions';

const initialState = {
  tasks: {
    NEW: [],
    PENDING: [],
    ONHOLD: [],
    COMPLETED: [],
  },
  counter: 0,
};

export default function DashboardReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_TASK: {
      const { status, text } = action.data;
      return Object.assign({}, state, {
        ...state,
        tasks: Object.assign({}, state.tasks, {
          ...state.tasks,
          [status]: state.tasks[status].concat({
            id: state.counter,
            text,
            status,
          }),
        }),
        counter: state.counter + 1,
      });
    }
    
    case DELETE_TASK: {
      const { id, status } = action.task;
      return Object.assign({}, state, {
        ...state,
        tasks: Object.assign({}, state.tasks, {
          ...state.tasks,
          [status]: state.tasks[status].filter(t => t.id !== id),
        }),
      });
    }

    case UPDATE_TASK_STATUS: {
      const { task, transferStatus } = action;
      return Object.assign({}, state, {
        ...state,
        tasks: Object.assign( {}, state.tasks, {
          ...state.tasks,
          [task.status]: state.tasks[task.status].concat({
            id: parseInt(task.id, 10),
            status: task.status,
            text: task.text,
          }),
          [transferStatus]: state.tasks[transferStatus].filter(t => t.id !== parseInt(task.id, 10)),
        }),
      });
    }

    case EDIT_TASK: {
      const { task, text } = action;
      return {
        ...state,
        tasks: {
            ...state.tasks,
            [task.status]: state.tasks[task.status].map((t) => t.id === task.id ? { ...t, text: text } : t)
        }
      }
      
    }
    default: return state;
  }
}
