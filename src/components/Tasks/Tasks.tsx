import { FC, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  AppRootState,
  deleteTask,
  getTasks,
  setAllChecked,
  setChecked,
  TaskType,
} from 'bll';
import style from 'components/Tasks/Tasks.module.css';

export const Tasks: FC = () => {
  const dispatch = useDispatch();
  const taskList = useSelector<AppRootState, TaskType[]>(state => state.taskList.tasks);

  const checkboxRef = useRef<HTMLInputElement>(null);
  const arrayCheckboxRef = useRef<HTMLInputElement[]>([]);
  arrayCheckboxRef.current = [];

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const getArrayOfRefs = (el: HTMLInputElement): void => {
    if (el && !arrayCheckboxRef.current.includes(el)) {
      arrayCheckboxRef.current.push(el);
    }
  };

  const deleteTaskHandle = (): void => {
    const id = [] as string[];
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
      <table className={style.table}>
        <thead>
          <tr>
            <td>
              <input type="checkbox" ref={checkboxRef} onChange={setToggleAllCheckbox} />
            </td>
            <td>Title</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          {taskList.map(({ id, title, description, isActive }, index) => {
            const handleChecked = (): void => {
              dispatch(setChecked(id, arrayCheckboxRef.current[index].checked));
            };

            return (
              <tr key={id}>
                <td>
                  <input
                    ref={getArrayOfRefs}
                    type="checkbox"
                    checked={isActive}
                    onChange={handleChecked}
                  />
                </td>
                <td>{title}</td>
                <td>{description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={style.settings}>
        <button type="button" onClick={fetchInitialState}>
          Reset
        </button>
        <button type="button" onClick={deleteTaskHandle}>
          Delete Task
        </button>
      </div>
    </div>
  );
};
