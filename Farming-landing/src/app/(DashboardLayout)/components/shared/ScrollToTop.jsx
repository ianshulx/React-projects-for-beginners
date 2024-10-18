import { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';

export default function ScrollToTop({ children }) {
  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return children || null;
}
