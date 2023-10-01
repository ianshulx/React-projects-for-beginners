export const loadState = () => {
  try {
    const serialisedState = localStorage.getItem('expense-tracker-state');
    if (serialisedState === null) {
      return undefined;
    }
    return JSON.parse(serialisedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('expense-tracker-state', serialisedState);
  } catch (error) {
    // Ignore write errors.
  }
};

// Get item from localstorage
export const getItem = (item, def = undefined) => {
  try {
    const localItem = localStorage.getItem(item);
    if (localItem === null) {
      return def;
    }
    return JSON.parse(localItem);
  }
  catch (e) {
    return undefined;
  }
};

// Save item in localstorage
export const setItem = (item, value) => {
  localStorage.setItem(item, JSON.stringify(value));
};

// Remove item from localstorage
export const removeItem = (item) => {
  localStorage.removeItem(item);
};

// Check if user logged in from localstorage
export const isLoggedIn = () => {
  return getItem('access_token') && getItem('token_created') && getItem('expires_in');
};
