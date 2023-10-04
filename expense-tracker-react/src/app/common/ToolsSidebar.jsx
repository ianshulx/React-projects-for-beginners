import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import Calculator from "./calculator/Calculator";

const ToolsSidebar = (props) => {
  return (
    <Sidebar visible={props.visible} position="right" onHide={props.onHide} style={{ width: '345px' }}>
      <h1 className="p-card-title">Tools</h1>
      {props.visible && <Calculator isVisible={props.visible} />}
    </Sidebar>
  );
}

export default React.memo(ToolsSidebar);
