import { FC } from 'react';

import { Form } from 'components/Form/Form';
import { Tasks } from 'components/Tasks/Tasks';

const App: FC = () => (
  <div>
    <Tasks />
    <Form />
  </div>
);

export default App;
