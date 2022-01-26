import { combineReducers, createStore } from 'redux';

import { taskList } from 'redux/taskListReducer';

const reducers = combineReducers({
  taskList,
});

export const store = createStore(reducers);

export type AppRootState = ReturnType<typeof reducers>;
