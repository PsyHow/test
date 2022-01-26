export { store } from './store';
export type { AppRootState } from './store';

export {
  taskList,
  getTasks,
  deleteTask,
  addTask,
  setChecked,
  setAllChecked,
} from './taskListReducer';
export type { TaskType } from './taskListReducer';
