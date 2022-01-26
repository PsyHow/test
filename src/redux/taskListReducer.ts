import { ACTION_TYPE } from 'enums/enums';

const initialState = {
  initial: [
    { id: 1, title: 'task1', description: 'need to do', isActive: false },
    { id: 2, title: 'task2', description: 'need to do2', isActive: false },
    { id: 3, title: 'task3', description: 'need to do3', isActive: false },
  ],
  tasks: [] as TaskType[],
};

export const taskList = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case ACTION_TYPE.ADD_TASK: {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: 4,
            title: action.payload.title,
            description: action.payload.description,
            isActive: false,
          },
        ],
      };
    }
    case ACTION_TYPE.SET_CHECKED: {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, isActive: action.payload.checked }
            : task,
        ),
      };
    }
    case ACTION_TYPE.SET_ALL_CHECKED: {
      return {
        ...state,
        tasks: state.tasks.map(task => ({ ...task, isActive: action.payload })),
      };
    }
    case ACTION_TYPE.DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter(f => !action.payload.includes(f.id)),
      };
    }
    case ACTION_TYPE.GET_TASKS: {
      return {
        ...state,
        tasks: state.initial,
      };
    }
    default:
      return state;
  }
};

export const addTask = (title: string, description: string) =>
  ({
    type: ACTION_TYPE.ADD_TASK,
    payload: { title, description },
  } as const);

export const setChecked = (id: number, checked: boolean) =>
  ({
    type: ACTION_TYPE.SET_CHECKED,
    payload: { id, checked },
  } as const);

export const setAllChecked = (checked: boolean) =>
  ({
    type: ACTION_TYPE.SET_ALL_CHECKED,
    payload: checked,
  } as const);

export const deleteTask = (id: number[]) =>
  ({
    type: ACTION_TYPE.DELETE_TASK,
    payload: id,
  } as const);

export const getTasks = () =>
  ({
    type: ACTION_TYPE.GET_TASKS,
  } as const);

type InitialStateType = typeof initialState;
type ActionTypes =
  | ReturnType<typeof addTask>
  | ReturnType<typeof setChecked>
  | ReturnType<typeof setAllChecked>
  | ReturnType<typeof deleteTask>
  | ReturnType<typeof getTasks>;

export type TaskType = {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
};
