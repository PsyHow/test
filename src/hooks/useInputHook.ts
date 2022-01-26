import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

export const useInputHook = (): [
  string,
  string,
  string | null,
  Dispatch<SetStateAction<string | null>>,
  (event: ChangeEvent<HTMLInputElement>) => void,
  (event: ChangeEvent<HTMLInputElement>) => void,
] => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.currentTarget.value);
    setError(null);
  };

  const onChangeDescription = (event: ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.currentTarget.value);
    setError(null);
  };
  return [title, description, error, setError, onChangeTitle, onChangeDescription];
};
