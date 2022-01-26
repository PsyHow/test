import { FC, FormEvent } from 'react';

import { useDispatch } from 'react-redux';

import style from './Form.module.css';

import { addTask } from 'bll';
import { useInputHook } from 'hooks';

export const Form: FC = () => {
  const dispatch = useDispatch();

  const [title, description, error, setError, onChangeTitle, onChangeDescription] =
    useInputHook();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (title === '' || description === '') {
      setError('Title and description Required');
    }
    if (title.length < 3 || description.length < 3) {
      setError('Minimum Length 3');
    } else {
      dispatch(addTask(title, description));
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="enter task Title"
          value={title}
          onChange={onChangeTitle}
        />
        <input
          type="text"
          placeholder="enter task description"
          value={description}
          onChange={onChangeDescription}
        />
        <button type="submit">Add Task</button>
        {error ? <span>{error}</span> : <span> </span>}
      </div>
    </form>
  );
};
