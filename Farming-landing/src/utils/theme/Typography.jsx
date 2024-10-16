import { Plus_Jakarta_Sans } from "next/font/google";

export const plus = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const typography = {
  fontFamily: plus.style.fontFamily,
  h1: {
    fontWeight: 600,
    fontSize: '2.25rem',
    lineHeight: '2.75rem',
  },
  h2: {
    fontWeight: 600,
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: '1.75rem',
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.3125rem',
    lineHeight: '1.6rem',
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: '1.6rem',
  },
  h6: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: '1.2rem',
  },
  button: {
    textTransform: 'capitalize',
    fontWeight: 400,
  },
  body1: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.334rem',
  },
  body2: {
    fontSize: '0.75rem',
    letterSpacing: '0rem',
    fontWeight: 400,
    lineHeight: '1rem',
  },
  subtitle1: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
};

export default typography;
