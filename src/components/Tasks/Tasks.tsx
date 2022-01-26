import { FC, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from 'components/Tasks/Tasks.module.scss';
import { AppRootState } from 'redux/store';
import {
  deleteTask,
  getTasks,
  setAllChecked,
  setChecked,
  TaskType,
} from 'redux/taskListReducer';

export const Tasks: FC = () => {
  const dispatch = useDispatch();
  const taskList = useSelector<AppRootState, TaskType[]>(state => state.taskList.tasks);

  const checkboxRef = useRef<HTMLInputElement>(null);
  const arrayCheckboxRef = useRef<HTMLInputElement[]>([]);
  arrayCheckboxRef.current = [];

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const getArrayOfRefs = (el: any): void => {
    if (el && !arrayCheckboxRef.current.includes(el)) {
      arrayCheckboxRef.current.push(el);
    }
  };

  const deleteTaskHandle = (): void => {
    const id = [] as number[];
    taskList.forEach(task => {
      if (task.isActive) {
        id.push(task.id);
      }
    });
    dispatch(deleteTask(id));
  };

  const setToggleAllCheckbox = (): void => {
    if (checkboxRef.current) dispatch(setAllChecked(checkboxRef.current.checked));
  };

  const fetchInitialState = (): void => {
    dispatch(getTasks());
  };

  return (
    <div>
      <input type="checkbox" ref={checkboxRef} onChange={setToggleAllCheckbox} />
      <button type="button" onClick={fetchInitialState}>
        Reset
      </button>
      {taskList.map(({ id, title, description, isActive }, index) => {
        const handleChecked = (): void => {
          dispatch(setChecked(id, arrayCheckboxRef.current[index].checked));
        };

        return (
          <div className={style.box} key={id}>
            <h1>{title}</h1>
            <h1>{description}</h1>
            <input
              ref={getArrayOfRefs}
              type="checkbox"
              checked={isActive}
              onChange={handleChecked}
            />
          </div>
        );
      })}
      <button type="button" onClick={deleteTaskHandle}>
        Delete Task
      </button>
    </div>
  );
};
