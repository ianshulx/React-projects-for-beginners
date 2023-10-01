import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import * as yup from 'yup';
import * as dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

import CurrencySidebar from './../common/CurrencySidebar';

import axios from './../../Axios';
import { incomeApiEndpoints } from './../../API';
import { useTracked } from './../../Store';

const StyledSwal = Swal.mixin({
  customClass: {
    container: 'container-class',
    popup: 'popup-class',
    header: 'header-class',
    title: 'p-card-title',
    content: 'content-class',
    closeButton: 'close-button-class',
    image: 'image-class',
    input: 'input-class',
    actions: 'actions-class',
    confirmButton: 'p-button p-button-raised p-button-danger p-button-text-icon-left',
    cancelButton: 'p-button p-button-raised p-button-info p-button-text-icon-left',
    footer: 'footer-class'
  },
  buttonsStyling: false
});

let messages;

const addIncomeValidationSchema = yup.object().shape({
  source: yup.string().required('Income source field is required').max(100, 'Income source must be at most 100 characters'),
  category: yup.object().required('Income category field is required'),
  notes: yup.string().max(200, 'Income notes must be at most 200 characters'),
  amount: yup.string().required('Income amount field is required'),
});

const Income = (props) => {

  const [state] = useTracked();
  const { register, handleSubmit, setValue, errors, setError, reset, control } = useForm({
    validationSchema: addIncomeValidationSchema
  });
  const [datatable, setDatatable] = useState({
    sortField: 'id',
    sortOrder: -1,
    rowsPerPage: 5,
    currentPage: 1
  });
  const [currencyVisible, setCurrencyVisible] = useState(false);
  const [incomeSummary, setIncomeSummary] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [income, setIncome] = useState({ incomes: {}, fetching: true });

  useEffect(() => {
    requestIncomeSummary();
    requestIncomeCategory();
  }, []);

  useEffect(() => {
    requestIncome();
  }, [datatable]);

  const requestIncomeCategory = async () => {
    await axios.get(incomeApiEndpoints.incomeCategory + '?sort_col=category_name&sort_order=asc', {})
      .then(response => {
        // console.log(response.data);
        if (response.data.data.length > 0) {
          setIncomeCategories(response.data.data);
        }
        else {

        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const requestIncome = async () => {
    setIncome({ ...income, fetching: true });
    await axios.get(incomeApiEndpoints.income + '?page=' + datatable.currentPage + '&sort_col=' + datatable.sortField + '&per_page=' + datatable.rowsPerPage + '&sort_order=' + (datatable.sortOrder > 0 ? 'asc' : 'desc'), {})
      .then(response => {
        // console.log('success', response.data);
        if (response.data.data) {
          setIncome({
            ...income,
            incomes: response.data,
            fetching: false
          });
        }
        else {
          setIncome({
            ...income,
            fetching: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const requestIncomeSummary = async () => {
    await axios.get(incomeApiEndpoints.summary, {})
      .then(response => {
        // console.log(response.data);
        setIncomeSummary(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteIncome = (data) => {
    // console.log(data);
    StyledSwal.fire({
      title: 'Are you sure?',
      text: `Confirm to delete income on ${data.spent_on}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<span class="pi pi-trash p-button-icon-left"></span><span class="p-button-text">Delete</span>',
      cancelButtonText: '<span class="pi pi-ban p-button-icon-left"></span><span class="p-button-text">No</span>',
      // confirmButtonColor: '#f76452',
      // cancelButtonColor: '#3085d6',
      focusConfirm: false,
      focusCancel: true
    })
      .then((result) => {
        if (result.value) {
          axios.delete(incomeApiEndpoints.income + '/' + data.id, {})
            .then(response => {
              // console.log(response.data);
              if (response.status === 200) {

                requestIncome();
                requestIncomeSummary();

                messages.show({
                  severity: 'success',
                  detail: 'Your income on ' + data.spent_on + ' deleted successfully.',
                  sticky: false,
                  closable: false,
                  life: 5000
                });
              }

            })
            .catch(error => {
              console.log('error', error.response);

              if (error.response.status === 401) {
                messages.clear();
                messages.show({
                  severity: 'error',
                  detail: 'Something went wrong. Try again.',
                  sticky: true,
                  closable: true,
                  life: 5000
                });
              }

            });
        }
      });
  };

  const submitIncome = (data) => {

    data.category_id = data.category.id;
    data.currency_id = state.currentCurrency.id;
    data.income_date = dayjs(data.income_date).format('YYYY-MM-DD HH:mm:ss');

    axios.post(incomeApiEndpoints.income, JSON.stringify(data))
      .then(response => {
        // console.log('success');
        if (response.status === 201) {
          reset();
          setSubmitting(false);
          setValue('income_date', dayjs(response.data.request.income_date).toDate());
          requestIncome();
          requestIncomeSummary();

          messages.show({
            severity: 'success',
            detail: 'Your income on ' + response.data.request.spent_on + ' added.',
            sticky: false,
            closable: false,
            life: 5000
          });
        }
      })
      .catch(error => {
        console.log('error', error.response);

        if (error.response.status === 401) {
          messages.clear();
          messages.show({
            severity: 'error',
            detail: 'Something went wrong. Try again.',
            sticky: true,
            closable: true,
            life: 5000
          });
        }
        else if (error.response.status === 422) {
          let errors = Object.entries(error.response.data).map(([key, value]) => {
            return { name: key, message: value[0] }
          });
          setError(errors);
        }

        setSubmitting(false)
      })
  };

  const renderIncomeSummary = (data) => {
    if (data && data.length > 0) {
      return data.map((item, index) => {
        return <div key={index}>
          <div className="color-link text-center">{item.total.toLocaleString()} <span className="color-title">{item.currency_code + '.'}</span></div>
          <hr />
        </div>
      })
    }
    else {
      return <div>
        <div className="text-center">No income data found.</div>
        <hr />
      </div>
    }
  };

  return (
    <div>
      <Helmet title="Income" />

      <CurrencySidebar visible={currencyVisible} onHide={(e) => setCurrencyVisible(false)} />

      <div className="p-grid p-nogutter">
        <div className="p-col-12">
          <div className="p-fluid">
            <Messages ref={(el) => messages = el} />
          </div>
        </div>
      </div>

      <div className="p-grid p-nogutter">
        <div className="p-col-12">
          <div className="p-fluid">

            <div className="p-grid">
              <div className="p-col-6">
                <div className="p-panel p-component">
                  <div className="p-panel-titlebar"><span className="color-title text-bold">Income This Month</span>
                  </div>
                  <div className="p-panel-content-wrapper p-panel-content-wrapper-expanded" id="pr_id_1_content"
                    aria-labelledby="pr_id_1_label" aria-hidden="false">
                    <div className="p-panel-content">
                      {renderIncomeSummary(incomeSummary.income_month)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-col-6">
                <div className="p-panel p-component">
                  <div className="p-panel-titlebar"><span className="color-title text-bold">Income Today</span></div>
                  <div className="p-panel-content-wrapper p-panel-content-wrapper-expanded" id="pr_id_1_content"
                    aria-labelledby="pr_id_1_label" aria-hidden="false">
                    <div className="p-panel-content">
                      {renderIncomeSummary(incomeSummary.income_today)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="p-grid">

        <div className="p-col-12 p-md-6">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title p-grid p-nogutter p-justify-between">Add Income</div>
              <div className="p-card-subtitle">Add your income information below.</div>
            </div>
            <br />
            <form onSubmit={handleSubmit(submitIncome)}>
              <div className="p-fluid">
                <Controller
                  name="income_date"
                  defaultValue={new Date()}
                  onChange={([e]) => {
                    // console.log(e);
                    return e.value;
                  }}
                  control={control}
                  as={
                    <Calendar
                      dateFormat="yy-mm-dd"
                      showTime={true}
                      hourFormat="12"
                      showButtonBar={true}
                      maxDate={new Date()}
                      touchUI={window.innerWidth < 768}
                    />
                  }
                />
                <p className="text-error">{errors.income_date?.message}</p>
              </div>
              <div className="p-fluid">
                <Controller
                  name="category"
                  onChange={([e]) => {
                    return e.value
                  }}
                  control={control}
                  as={
                    <Dropdown
                      filter={true}
                      filterPlaceholder="Search here"
                      showClear={true}
                      filterInputAutoFocus={false}
                      options={incomeCategories}
                      style={{ width: '100%' }}
                      placeholder="Income Category"
                      optionLabel="category_name"
                    />
                  }
                />
                <p className="text-error">{errors.category?.message}</p>
              </div>
              <div className="p-fluid">
                <input type="text" ref={register} placeholder="Income Source" name="source" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.source?.message}</p>
              </div>
              <div className="p-fluid">
                <div className="p-inputgroup">
                  <input type="number" step="0.00" ref={register} keyfilter="money" placeholder="Amount" name="amount" className="p-inputtext p-component p-filled" />
                  <Button
                    label={`${state.currencies.length === 0 ? 'loading' : state.currentCurrency.currency_code}`}
                    type="button"
                    onClick={(e) => setCurrencyVisible(true)} />
                </div>
                <p className="text-error">{errors.amount?.message}</p>
              </div>
              <div className="p-fluid">
                <textarea ref={register} rows={5} placeholder="Income Notes" name="notes" className="p-inputtext p-inputtextarea p-component p-inputtextarea-resizable" />
                <p className="text-error">{errors.notes?.message}</p>
              </div>
              <div className="p-fluid">
                <Button disabled={submitting} type="submit" label="Add Income" icon="pi pi-plus"
                  className="p-button-raised" />
              </div>
            </form>
          </Card>
        </div>

        <div className="p-col-12 p-md-6">
          <Card className="rounded-border">
            <div className='p-grid'>
              <div className='p-col-6'>
                <div className="p-card-title p-grid p-nogutter p-justify-between">View Incomes</div>
                <div className="p-card-subtitle">Here are few incomes you've added.</div>
              </div>
              <div className="p-col-6" align="right">
                {income.fetching ? <ProgressSpinner style={{ height: '25px', width: '25px' }} strokeWidth={'4'} /> : ''}
              </div>
            </div>
            <br />
            <DataTable
              value={income.incomes.data}
              sortField={datatable.sortField}
              sortOrder={datatable.sortOrder}
              responsive={true}
              paginator={true}
              rows={datatable.rowsPerPage}
              rowsPerPageOptions={[5, 10, 20]}
              totalRecords={income.incomes.total}
              lazy={true}
              first={income.incomes.from - 1}
              onPage={(e) => {
                // console.log(e);
                setDatatable({
                  ...datatable,
                  currentPage: (e.page + 1),
                  rowsPerPage: e.rows,
                });
              }}
              onSort={e => {
                // console.log(e);
                setDatatable({
                  ...datatable,
                  sortField: e.sortField,
                  sortOrder: e.sortOrder,
                });
              }}
              className="text-center"
            >
              <Column field="id" header="Serial" sortable={true} />
              <Column field="source" header="Source" sortable={true} />
              <Column field="amount" header="Amount" sortable={true}
                body={(rowData, column) => {
                  return rowData.amount.toLocaleString() + ' ' + rowData.currency_name
                }}
              />
              <Column field="income_date" header="Date" sortable={true}
                body={(rowData, column) => {
                  return dayjs(rowData.income_date).format('YYYY-MM-DD hh:mm a')
                }}
              />
              <Column
                body={(rowData, column) => {
                  // console.log(rowData);
                  return (
                    <div>
                      <Link to={`/income/${rowData.id}/edit`}>
                        <Button label="Edit" value={rowData.id}
                          icon="pi pi-pencil"
                          className="p-button-raised p-button-rounded p-button-info" />
                      </Link>
                      <Button label="Delete"
                        onClick={() => deleteIncome(rowData)}
                        icon="pi pi-trash"
                        className="p-button-raised p-button-rounded p-button-danger" />
                    </div>
                  )
                }}
                header="Action"
                style={{ textAlign: 'center', width: '8em' }}
              />
            </DataTable>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default React.memo(Income);
