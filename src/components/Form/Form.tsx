import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import style from './Form.module.css';

import { addTask } from 'redux/taskListReducer';

export const Form: FC = () => {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaskTitle(e.currentTarget.value);
  };

  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaskDescription(e.currentTarget.value);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(addTask(taskTitle, taskDescription));
    setTaskTitle('');
    setTaskDescription('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="enter task Title"
          value={taskTitle}
          onChange={onChangeTitle}
        />
        <input
          type="text"
          placeholder="enter task description"
          value={taskDescription}
          onChange={onChangeDescription}
        />
        <button type="submit">Add Task</button>
      </div>
    </form>
  );
};
