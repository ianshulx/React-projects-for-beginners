import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';

import { Card } from "primereact/card";
import { Messages } from "primereact/messages";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

import LocaleToggle from './../locale/LocaleToggle';

import axios from './../../Axios';
import { setItem } from "./../../Helpers";
import { authApiEndpoints } from "./../../API";
import { useTracked } from './../../Store';

const loginValidationSchema = yup.object().shape({
  email: yup.string().required('Email field is required.').email('Email must be a valid email.'),
  password: yup.string().required('Password field is required.').min(6, 'Must be 6 characters.'),
});

let messages; // For alert message

const Login = (props) => {

  const [state, setState] = useTracked();
  const [submitting, setSubmitting] = useState(false);

  // console.log('Login', state);

  // Login form handle
  const { register, handleSubmit, errors } = useForm({
    validationSchema: loginValidationSchema
  });

  const submitLogin = (data) => {
    messages.clear(); // Clear existing messages
    setSubmitting(true);
    axios.post(authApiEndpoints.login, JSON.stringify(data))
      .then(response => {
        // console.log('success');
        // console.log(response.data);

        if (response.status === 200) {
          setItem('expires_in', response.data.expires_in);
          setItem('access_token', response.data.access_token);
          setItem('token_created', response.data.token_created);

          setState(prev => ({ ...prev, user: response.data.user }));

          props.location.state === undefined ? props.history.replace('/dashboard') : props.history.replace(props.location.state.from.pathname);
        }

      })
      .catch(error => {
        // console.log('error', error.response);

        if (error.response && error.response.status === 422) {
          messages.show({ severity: 'error', detail: 'Incorrect email or password.', sticky: true });
        }
        else {
          messages.show({ severity: 'error', detail: 'Something went wrong. Try again.', sticky: true });
        }
        setSubmitting(false);
      })
  };

  return (
    <div>
      <Helmet title='Login' />
      <div className="p-grid p-nogutter p-align-center p-justify-center" style={{ height: '95vh' }}>
        <Card className="p-sm-12 p-md-6 p-lg-4" style={{ borderRadius: 5, minHeight: 65 }}>
          <div className="p-col-12 p-fluid">
            <Messages ref={(el) => messages = el} />
          </div>
          <div className="p-col-12">
            <div className="p-card-title p-grid p-nogutter p-justify-between">Login <LocaleToggle /></div>
            <div className="p-card-subtitle">Enter login credentials</div>
          </div>

          <form onSubmit={handleSubmit(submitLogin)}>
            <div className="p-col-12 p-fluid">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon"><i className="pi pi-envelope" /></span>
                <input type="text" name="email" placeholder={'Email'} ref={register} className="p-inputtext p-component p-filled" />
              </div>
              <p className="text-error">{errors.email?.message}</p>
            </div>
            <div className="p-col-12 p-fluid">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon"><i className="pi pi-key" /></span>
                <input type="password" name="password" placeholder={'Password'} ref={register} className="p-inputtext p-component p-filled" />
              </div>
              <p className="text-error">{errors.password?.message}</p>
            </div>
            <div className="p-col-12 p-fluid">
              <Button disabled={submitting} type="submit" label={'Sign In'} icon="pi pi-sign-in" className="p-button-raised" />
            </div>
            <div className="p-grid p-nogutter p-col-12 p-justify-center">
              <Link to="/register">Register</Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default React.memo(Login);
