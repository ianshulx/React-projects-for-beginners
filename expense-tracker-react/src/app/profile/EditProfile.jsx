import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import { userApiEndpoints, currencyApiEndpoints } from './../../API';
import axios from './../../Axios';
import { useTracked } from './../../Store';

const updateProfileValidationSchema = yup.object().shape({
  name: yup.string().required('Name field is required').min(4, 'Name must be at most 4 character'),
  email: yup.string().required('Email field is required').min(6, 'Email must be at most 6 character'),
  currency: yup.object().required('Currency field is required'),
});

let messages; // For alert message

const EditProfile = (props) => {

  const [state, setState] = useTracked();
  const { register, handleSubmit, errors, setValue, setError, control } = useForm({
    validationSchema: updateProfileValidationSchema
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    requestCurrencies();
    requestProfileInfo();
  }, []);

  const requestCurrencies = useCallback(async () => {
    if (state.currencies.length === 0) {
      await axios.get(currencyApiEndpoints.currency, {})
        .then(response => {
          // console.log(response.data);
          if (response.data.data.length > 0) {
            setState(prev => ({ ...prev, currencies: response.data.data }))
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [state.currencies.length]);

  const currencyTemplate = (option) => {
    return (<span><span className="color-highlight text-bold">{option.currency_code}</span> - {option.currency_name}</span>);
  };

  const requestProfileInfo = async () => {
    await axios.get(userApiEndpoints.self, {})
      .then(response => {
        // console.log('success', response.data);
        setValue([
          { name: response.data.name },
          { email: response.data.email },
          { currency: response.data.currency },
        ]);
        let { currency, ...rest } = response.data;
        setState(prev => ({ ...prev, user: rest }));
      })
      .catch(error => {
        console.log('error', error.response);

        if (error.response.status === 401) {
          messages.show({
            severity: 'error',
            detail: 'Something went wrong. Try again.',
            sticky: true,
            closable: true,
            life: 5000
          });
        }

      })
  };

  const submitUpdateProfile = (data) => {

    data.currency_id = data.currency.id;

    axios.put(userApiEndpoints.profile, JSON.stringify(data))
      .then(response => {
        // console.log('success', response.data.request);
        if (response.status === 200) {
          setSubmitting(false);
          setValue([
            { name: response.data.request.name },
            { email: response.data.request.email },
            { currency: state.currencies.find(el => el.id === response.data.request.currency_id ? el : null) },
          ]);

          let { currency, ...rest } = response.data.request;
          setState(prev => ({ ...prev, user: rest }));

          messages.show({
            severity: 'success',
            detail: 'Your profile info updated successfully.',
            sticky: false,
            closable: false,
            life: 5000
          });
        }

      })
      .catch(error => {
        console.log('error', error.response);

        setSubmitting(false);

        messages.clear();

        if (error.response.status === 422) {
          let errors = Object.entries(error.response.data).map(([key, value]) => {
            return { name: key, message: value[0] }
          });
          setError(errors);
        }
        else if (error.response.status === 401) {
          messages.show({
            severity: 'error',
            detail: 'Something went wrong. Try again.',
            sticky: true,
            closable: true,
            life: 5000
          });
        }

      })
  };

  return (
    <div>
      <Helmet title="Edit Profile" />

      <div className="p-grid p-nogutter">
        <div className="p-col-12">
          <div className="p-fluid">
            <Messages ref={(el) => messages = el} />
          </div>
        </div>
      </div>

      <div className="p-grid">

        <div className="p-col-12">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title p-grid p-nogutter p-justify-between">Edit Profile</div>
              <div className="p-card-subtitle">Edit current profile information below.</div>
            </div>
            <br />
            <form onSubmit={handleSubmit(submitUpdateProfile)}>
              <div className="p-fluid">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" ref={register} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.name?.message}</p>
              </div>
              <div className="p-fluid">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" ref={register} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.email?.message}</p>
              </div>
              <div className="p-fluid">
                <label>Currency</label>
                <Controller
                  name="currency"
                  onChange={([e]) => {
                    setState(prev => ({ ...prev, currentCurrency: e.value }));
                    return e.value;
                  }}
                  defaultValue={state.currency}
                  control={control}
                  as={
                    <Dropdown
                      filter={true}
                      filterBy="currency_code,currency_name"
                      filterPlaceholder="Search here"
                      showClear={true}
                      filterInputAutoFocus={false}
                      options={state.currencies}
                      style={{ width: '100%' }}
                      itemTemplate={currencyTemplate}
                      placeholder="Select a currency"
                      optionLabel="currency_code"
                    />
                  }
                />
                <p className="text-error">{errors.currency?.message}</p>
              </div>
              <div className="p-fluid">
                <Button disabled={submitting} type="submit" label="Update Profile" icon="pi pi-refresh" className="p-button-raised" />
              </div>
            </form>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default React.memo(EditProfile);
