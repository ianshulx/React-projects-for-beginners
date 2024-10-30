import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';

import { chartApiEndpoints } from './../../API';
import axios from './../../Axios';

let messages;

const Analytics = (props) => {

  const [incomeExpenseCategoryId, setIncomeExpenseCategoryId] = useState(null)
  const [incomeExpenseCategories, setIncomeExpenseCategories] = useState([])

  const [monthWiseChartData, setMonthWiseChartData] = useState({
    barChartData: {},
    barChartDataOptions: {},
    barChartDataLoading: true
  });

  const [categoryWiseChartData, setCategoryWiseChartData] = useState({
    barChartData: {},
    barChartDataOptions: {},
    barChartDataLoading: false
  });

  useEffect(() => {
    requestIncomeExpenseCategories();
    requestMonthWiseChartData();
  }, []);

  useEffect(() => {
    requestCategoryWiseChartData();
  }, [incomeExpenseCategoryId])

  const requestIncomeExpenseCategories = () => {
    axios.get(chartApiEndpoints.incomeExpenseCategories, {})
      .then(response => {
        // console.log(response.data);
        setIncomeExpenseCategories(response.data);
      })
      .catch(error => {
        // console.log(error);
        setIncomeExpenseCategories([]);
      });
  };

  const requestMonthWiseChartData = () => {
    axios.get(chartApiEndpoints.incomeExpenseMonthWise, {})
      .then(response => {
        // console.log(response.data);
        setMonthWiseChartData({ ...monthWiseChartData, barChartData: response.data.data.barChartData, barChartDataOptions: response.data.data.options, barChartDataLoading: false });
      })
      .catch(error => {
        // console.log(error);
        setMonthWiseChartData({ ...monthWiseChartData, barChartDataLoading: false });
      });
  };

  const requestCategoryWiseChartData = () => {
    if (incomeExpenseCategoryId) {
      setCategoryWiseChartData({ ...categoryWiseChartData, barChartDataLoading: true })
      axios.get(chartApiEndpoints.incomeExpenseCategoryWise, {
        params: { category_id: incomeExpenseCategoryId }
      })
        .then(response => {
          // console.log(response.data);
          setCategoryWiseChartData({ ...categoryWiseChartData, barChartData: response.data.data.barChartData, barChartDataOptions: response.data.data.options, barChartDataLoading: false });
        })
        .catch(error => {
          // console.log(error);
          setCategoryWiseChartData({ ...categoryWiseChartData, barChartDataLoading: false });
        });
    }
  };

  return (
    <div>
      <Helmet title="Analytics" />

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
            <div className='p-grid'>
              <div className='p-col-9'>
                <div className="p-card-title p-grid p-nogutter p-justify-between">Monthly Income & Expense Chart</div>
                <div className="p-card-subtitle">Glimpse of your incomes and expenses for a year.</div>
              </div>
              <div className="p-col-3" align="right">
                {monthWiseChartData.barChartDataLoading ? <ProgressSpinner style={{ height: '25px', width: '25px' }} strokeWidth={'4'} /> : ''}
              </div>
            </div>
            <br />
            <div>
              <Chart type="bar" data={monthWiseChartData.barChartData} options={monthWiseChartData.barChartDataOptions} />
            </div>
          </Card>
        </div>

        <div className="p-col-12">
          <Card className="rounded-border">
            <div className='p-grid'>
              <div className='p-col-9'>
                <div className="p-card-title p-grid p-nogutter p-justify-between">Category Wise Income & Expense Chart</div>
                <div className="p-card-subtitle">Glimpse of your incomes and expenses for a category.</div>
              </div>
              <div className="p-col-3" align="right">
                {categoryWiseChartData.barChartDataLoading ? <ProgressSpinner style={{ height: '25px', width: '25px' }} strokeWidth={'4'} /> : ''}
              </div>
            </div>
            <br />
            <div>
              <Dropdown
                onChange={(e) => setIncomeExpenseCategoryId(e.value)}
                value={incomeExpenseCategoryId}
                itemTemplate={option => {
                  return option.category_name + ' (' + option.category_type + ')';
                }}
                filter={true}
                filterBy="category_name,category_type"
                filterPlaceholder="Search here"
                showClear={true}
                filterInputAutoFocus={false}
                options={incomeExpenseCategories}
                style={{ width: '100%' }}
                placeholder="Select an Income Expense Category"
                optionLabel="category_name"
                optionValue="id"
              />
            </div>
            <br />
            <div>
              <Chart type="bar" data={categoryWiseChartData.barChartData} options={categoryWiseChartData.barChartDataOptions} />
            </div>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default React.memo(Analytics);
