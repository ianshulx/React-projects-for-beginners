export function knowMode() {
  const mode = localStorage.getItem('mode')
  if (mode == 'dark') {
    document.documentElement.setAttribute('style', '--underline-color: #fff')
    return true
  } else if (mode == 'light') {
    document.documentElement.setAttribute('style', '--underline-color: #000')
    return false
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('style', '--underline-color: #fff')
    return true
  }
  document.documentElement.setAttribute('style', '--underline-color: #000')
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  localStorage.setItem('mode', isDark ? 'dark' : 'light')
  return isDark
}

export function setMode(mode) {
  localStorage.setItem('mode', mode)
}

const darkTheme = {
  primaryBg: '#0E2954',
  secondaryBg: '#2a2c2e',
  primaryText: '#e1e1e1',
  secondaryText: '#e1e1e1',
  mainHeading: '#FFA41B',
}

const lightTheme = {
  primaryBg: '#ffffff',
  secondaryBg: '#e1e1e1',
  primaryText: '#1a1c1e',
  secondaryText: '#2a2c2e',
  mainHeading: '#0B2447',
}

export function getTheme() {
  return knowMode() ? darkTheme : lightTheme
}

export function setTheme(mode) {
  return mode ? darkTheme : lightTheme
}

export function getContactFormName() {
  return sessionStorage.getItem('name')
}

export function getContactFormEmail() {
  return sessionStorage.getItem('email')
}

export function getContactFormMessage() {
  return sessionStorage.getItem('message')
}

export function setContactFormName(name) {
  sessionStorage.setItem('name', name)
}

export function setContactFormEmail(email) {
  sessionStorage.setItem('email', email)
}

export function setContactFormMessage(message) {
  sessionStorage.setItem('message', message)
}

export function getIsHireMeSubmitted() {
  return sessionStorage.getItem('isHireMeSubmitted')
}

export function getIsSayHiSubmitted() {
  return sessionStorage.getItem('isSayHiSubmitted')
}

export function setIsHireMeSubmitted(isHireMeSubmitted) {
  sessionStorage.setItem('isHireMeSubmitted', isHireMeSubmitted)
}

export function setIsSayHiSubmitted(isSayHiSubmitted) {
  sessionStorage.setItem('isSayHiSubmitted', isSayHiSubmitted)
}
