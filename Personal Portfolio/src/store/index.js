import { configureStore, createSlice } from '@reduxjs/toolkit'
import { knowMode, setMode, getTheme, setTheme } from './utils'
import {
  getContactFormName,
  getContactFormEmail,
  getContactFormMessage,
  setContactFormEmail,
  setContactFormMessage,
  setContactFormName,
  setIsHireMeSubmitted,
  setIsSayHiSubmitted,
  getIsHireMeSubmitted,
  getIsSayHiSubmitted,
} from './utils'

const initialModeState = {
  darkMode: knowMode(),
  colorTheme: getTheme(),
}

const initialConfettiState = {
  confetti: false,
}

const initialContactFormState = {
  name: getContactFormName() ? getContactFormName() : '',
  email: getContactFormEmail() ? getContactFormEmail() : '',
  message: getContactFormMessage() ? getContactFormMessage() : '',
  isHireMeSubmitted: getIsHireMeSubmitted() ? true : false,
  isSayHiSubmitted: getIsSayHiSubmitted() ? true : false,
}

const modeSlice = createSlice({
  name: 'mode',
  initialState: initialModeState,
  reducers: {
    toggle(state) {
      state.darkMode = !state.darkMode
      setMode(state.darkMode ? 'dark' : 'light')
      state.colorTheme = setTheme(state.darkMode)
      // css variables update on theme change
      document.documentElement.setAttribute(
        'style',
        `--underline-color: ${state.darkMode ? '#fff' : '#000'}`,
      )
      document.getElementById('favicon').href = state.darkMode
        ? '/tab-logo/2.png'
        : '/tab-logo/1.png'
    },
  },
})

const confettiSlice = createSlice({
  name: 'confetti',
  initialState: initialConfettiState,
  reducers: {
    toggle(state) {
      state.confetti = !state.confetti
    },
  },
})

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState: initialContactFormState,
  reducers: {
    updateName(state, action) {
      state.name = action.payload
      setContactFormName(state.name)
    },
    updateEmail(state, action) {
      state.email = action.payload
      setContactFormEmail(state.email)
    },
    updateMessage(state, action) {
      state.message = action.payload
      setContactFormMessage(state.message)
    },
    updateIsHireMeSubmitted(state, action) {
      if (state.isSayHiSubmitted && action.payload) {
        state.isSayHiSubmitted = false
        setIsSayHiSubmitted(false)
      }
      state.isHireMeSubmitted = action.payload
      setIsHireMeSubmitted(state.isHireMeSubmitted)
    },
    updateIsSayHiSubmitted(state, action) {
      if (state.isHireMeSubmitted && action.payload) {
        state.isHireMeSubmitted = false
        setIsHireMeSubmitted(false)
      }
      state.isSayHiSubmitted = action.payload
      setIsSayHiSubmitted(state.isSayHiSubmitted)
    },
  },
})

export const store = configureStore({
  reducer: {
    mode: modeSlice.reducer,
    confetti: confettiSlice.reducer,
    contactForm: contactFormSlice.reducer,
  },
})

export const modeActions = modeSlice.actions
export const confettiActions = confettiSlice.actions
export const contactFormActions = contactFormSlice.actions
