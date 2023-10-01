import React from 'react';
import PropTypes from 'prop-types';

import AppSubmenu from './AppSubmenu';

const AppMenu = (props) => {
  return (
    <div className="menu">
      <AppSubmenu items={props.model} className="layout-main-menu" onMenuItemClick={props.onMenuItemClick} root={true} />
    </div>
  )
}

AppMenu.defaultProps = {
  model: null,
  onMenuItemClick: null
};

AppMenu.propTypes = {
  model: PropTypes.array,
  onMenuItemClick: PropTypes.func
};

export default React.memo(AppMenu);
