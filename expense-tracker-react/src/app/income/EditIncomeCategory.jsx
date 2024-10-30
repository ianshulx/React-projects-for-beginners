import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import { incomeApiEndpoints } from './../../API';
import axios from './../../Axios';

let messages;

const incomeCategoryValidationSchema = yup.object().shape({
  category_name: yup.string().required('Category name field is required').max(100, 'Category name must be at most 100 characters')
});

const EditIncomeCategory = (props) => {

  useEffect(() => {
    requestIncomeCategory();
  }, []);

  const { register, handleSubmit, errors, setError, setValue } = useForm({
    validationSchema: incomeCategoryValidationSchema
  });
  const [submitting, setSubmitting] = useState(false);

  const requestIncomeCategory = async () => {
    await axios.get(incomeApiEndpoints.incomeCategory + '/' + props.match.params.category_id, {})
      .then(response => {
        // console.log('success', response.data);
        setValue('category_name', response.data.category_name);
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

  const submitUpdateIncomeCategory = async (data) => {
    await axios.put(incomeApiEndpoints.incomeCategory + '/' + props.match.params.category_id, JSON.stringify(data))
      .then(response => {
        console.log('success', response.data.request);

        if (response.status === 200) {
          setSubmitting(false);

          messages.show({
            severity: 'success',
            detail: 'Your income category info updated successfully.',
            sticky: false,
            closable: false,
            life: 5000
          });
        }

      })
      .catch(error => {
        console.log('error', error);

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
      <Helmet title="Edit Income" />

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
              <div className="p-card-title p-grid p-nogutter p-justify-between">Edit Income Category</div>
              <div className="p-card-subtitle">Edit selected income category information below.</div>
            </div>
            <br />
            <form onSubmit={handleSubmit(submitUpdateIncomeCategory)}>
              <div className="p-fluid">
                <label>Category Name</label>
                <div className="p-fluid">
                  <input type="text" ref={register} placeholder="Category name" name="category_name" className="p-inputtext p-component p-filled" />
                  <p className="text-error">{errors.category_name?.message}</p>
                </div>
              </div>
              <div className="p-fluid">
                <Button disabled={submitting} type="submit" label="Save Changes" icon="pi pi-save" className="p-button-raised" />
              </div>
            </form>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default React.memo(EditIncomeCategory);
