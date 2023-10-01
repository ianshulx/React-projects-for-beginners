import React, { useState, useCallback } from 'react';


const ScrollToTop = () => {

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = useCallback(() => {
    if (!showScroll && window.pageYOffset > 100) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 100) {
      setShowScroll(false)
    }
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
    <i onClick={scrollToTop} style={{ fontSize: 40, display: showScroll ? 'flex' : 'none' }} className="scrollTop pi pi-arrow-circle-up"></i>
  );
}

export default React.memo(ScrollToTop);
