import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import * as yup from "yup";

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import { userApiEndpoints } from './../../API';
import axios from './../../Axios';
import { useTracked } from './../../Store';

let messages;

const passwordValidationSchema = yup.object().shape({
  old_password: yup.string().required('This field is required').min(6, 'Password must be at most 6 character'),
  new_password: yup.string().required('This field is required').min(6, 'Password must be at most 6 character'),
  confirm_password: yup.string().required('This field is required').oneOf([yup.ref('new_password')], 'Confirm password does not match')
});

const Profile = (props) => {

  const [state] = useTracked();
  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: passwordValidationSchema
  });
  const [submitting, setSubmitting] = useState(false);

  const submitChangePassword = (data) => {
    setSubmitting(true);
    axios.put(userApiEndpoints.password, JSON.stringify(data))
      .then(response => {
        // console.log('success');
        // console.log(response.data);

        if (response.status === 200) {

          reset();
          setSubmitting(false);

          messages.show({
            severity: 'success',
            detail: 'Your password updated successfully.',
            sticky: false,
            closable: false,
            life: 5000
          });
        }

      })
      .catch(error => {
        console.log('error');
        console.log(error.response);

        reset();
        setSubmitting(false);

        messages.clear();

        if (error.response.status === 401) {
          messages.show({
            severity: 'error',
            detail: 'Something went wrong. Try again.',
            sticky: true,
            closable: true,
            life: 5000
          });
        }

        if (error.response.status === 422) {
          if (error.response.data.data === 'password_mismatch') {
            messages.show({
              severity: 'error',
              detail: 'Current password does not match.',
              sticky: true,
              closable: true,
              life: 5000
            });
          }
          else if (error.response.data.data === 'old_password') {
            messages.show({
              severity: 'error',
              detail: 'Your new password is same as old password.',
              sticky: true,
              closable: true,
              life: 5000
            });
          }
        }

      })
  };

  return (
    <div>
      <Helmet title="Profile" />

      <div className="p-grid p-nogutter">
        <div className="p-col-12">
          <div className="p-fluid">
            <Messages ref={(el) => messages = el} />
          </div>
        </div>
      </div>

      <div className="p-grid">

        <div className="p-col-12 p-md-6">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title p-grid p-nogutter p-justify-between">Profile Info</div>
              <div className="p-card-subtitle">Detail of your current account information.</div>
            </div>
            <div className="p-grid p-nogutter p-justify-between">
              <h3 className="color-title p-col-6">
                Name:
                </h3>
              <h3 className="color-highlight p-col-6">
                {state.user.name}
              </h3>
            </div>
            <div className="p-grid p-nogutter p-justify-between">
              <h3 className="color-title p-col-6">
                Email:
                </h3>
              <h3 className="color-highlight p-col-6">
                {state.user.email}
              </h3>
            </div>

            <div className="p-card-footer p-fluid">
              <Link to={'/profile/edit'}>
                <Button label="Edit" className="" icon="pi pi-pencil" />
              </Link>
            </div>
          </Card>
        </div>

        <div className="p-col-12 p-md-6">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title p-grid p-nogutter p-justify-between">Password Info</div>
              <div className="p-card-subtitle">Manage your current password here.</div>
            </div>
            <br />

            <form onSubmit={handleSubmit(submitChangePassword)}>
              <div className="p-fluid">
                <input type='password' name='old_password' ref={register} autoComplete="off" placeholder="Old Password" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.old_password?.message}</p>
              </div>
              <div className="p-fluid">
                <input type='password' name='new_password' ref={register} autoComplete="off" placeholder="New Password" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.new_password?.message}</p>
              </div>
              <div className="p-fluid">
                <input type='password' name='confirm_password' ref={register} autoComplete="off" placeholder="Confirm Password" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.confirm_password?.message}</p>
              </div>
              <div className="p-fluid">
                <Button disabled={submitting} type="submit" label="Change Password" icon="pi pi-key"
                  className="p-button-raised" />
              </div>
            </form>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default Profile;
