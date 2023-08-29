export const getClasses = (classes) =>
  classes
    .filter((item) => item !== '')
    .join(' ')
    .trim();
