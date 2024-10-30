
export const host = process.env.REACT_APP_API_HOST;

export const authApiEndpoints = {
  login: '/api/v1/auth/login',
  refresh: '/api/v1/auth/refresh',
  register: '/api/v1/auth/register',
  logout: '/api/v1/auth/logout',
  sendPin: '/api/v1/auth/send_code',
  verifyMobile: '/api/v1/auth/mobile_verify',
};

export const userApiEndpoints = {
  user: '/api/v1/user',
  password: '/api/v1/user/password',
  profile: '/api/v1/user/update',
  self: '/api/v1/user/profile',
};

export const expenseApiEndpoints = {
  expense: '/api/v1/expense',
  expenseCategory: '/api/v1/expense/category',
  summary: '/api/v1/expense/summary',
};

export const incomeApiEndpoints = {
  income: '/api/v1/income',
  incomeCategory: '/api/v1/income/category',
  summary: '/api/v1/income/summary',
};

export const currencyApiEndpoints = {
  currency: '/api/v1/currency',
};

export const reportApiEndpoints = {
  monthlyExpenseSummary: '/api/v1/report/expense/months/summary',
  monthlyIncomeSummary: '/api/v1/report/income/months/summary',
  transaction: '/api/v1/report/transaction',
};

export const chartApiEndpoints = {
  incomeExpenseCategories: '/api/v1/chart/income-expense/category',
  incomeExpenseMonthWise: '/api/v1/chart/income-expense/month-wise',
  incomeExpenseCategoryWise: '/api/v1/chart/income-expense/category-wise',
};
