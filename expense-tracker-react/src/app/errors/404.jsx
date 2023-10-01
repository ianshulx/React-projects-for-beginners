import React from 'react'

const PageNotFound = (props) => {

  return (
    <div style={{ padding: '5em' }}>
      <div className="p-grid p-align-center p-justify-center">
        <div className="color-title" style={{ fontSize: 72 }}>404</div>
      </div>
      <p className="p-grid p-justify-center p-card-subtitle">Make sure you know where you're going.</p>
    </div>
  )

}

export default React.memo(PageNotFound);
