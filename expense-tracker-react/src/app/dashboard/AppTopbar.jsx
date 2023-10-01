import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ToolsSidebar from './../common/ToolsSidebar';
import { Link } from 'react-router-dom';

const AppTopbar = (props) => {

  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div>
      <ToolsSidebar visible={sidebarVisible} position="right" onHide={() => setSidebarVisible(false)}/>
      <div className="layout-topbar clearfix">
        <a className="layout-menu-button" onClick={props.onToggleMenu}>
          <span className="pi pi-bars" />
        </a>
        <div className="layout-topbar-icons">
          <a onClick={() => setSidebarVisible(true)}>
            <span className="layout-topbar-item-text">Tools</span>
            <span className="layout-topbar-icon pi pi-briefcase" />
          </a>
        </div>
      </div>
    </div>
  );
}

AppTopbar.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
};

export default React.memo(AppTopbar);
