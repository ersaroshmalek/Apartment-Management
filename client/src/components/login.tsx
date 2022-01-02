import { ReactElement, useState } from 'react';
import { Button, Form, TextInput } from 'carbon-components-react';
import { Wrapper } from './wrapper';
import { Formik } from 'formik';
import { useLoginMutMutation } from '../generated/graphql';

const TextInputProps = {
  id: 'username',
  labelText: 'username',
  placeholder: 'Username',
};

const PasswordProps = {
  id: 'password',
  placeholder: 'Password',
  labelText: 'Password',
};

const invaliProp = {
  invalidText: 'user name or password is incorrect',
};

export default function Login(): ReactElement {
  const [errorState, setError] = useState(false);
  const [, loginMut] = useLoginMutMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const result = await loginMut(values);
          if (result.data?.login.errors) {
            setError(true);
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '2rem' }}>
              <TextInput
                {...TextInputProps}
                {...invaliProp}
                onChange={handleChange}
                type="email"
                required
              />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <TextInput
                {...PasswordProps}
                {...invaliProp}
                invalid={errorState}
                onChange={handleChange}
                type="password"
                required
              />
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Button kind="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
