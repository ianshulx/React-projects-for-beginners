import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from "react-router-dom";

const AppSubmenu = (props) => {

  const [activeIndex, setActiveIndex] = useState(null);

  const onMenuItemClick = (event, item, index) => {
    //avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    //execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    //prevent hash change
    if (item.items || !item.url) {
      event.preventDefault();
    }

    if (index === activeIndex)
      setActiveIndex(null);
    else
      setActiveIndex(index);

    if (props.onMenuItemClick) {
      props.onMenuItemClick({
        originalEvent: event,
        item: item
      });
    }
  }

  let items = props.items && props.items.map((item, i) => {
    // console.log(item.items);
    let active = activeIndex === i || item.url === window.location.hash.substring(1);
    let styleClass = classNames(item.badgeStyleClass, { 'active-menuitem': active });
    let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>;
    let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon" />;
    let rootActive = item.items && item.items.find(el => el.url === window.location.hash.substring(1));

    return (
      <li className={`${styleClass} ${rootActive && 'active-menuitem'}`} key={i}>
        {item.items && props.root === true && <div className='arrow' />}
        <Link to={item.url} onClick={(e) => onMenuItemClick(e, item, i)} target={item.target}>
          <i className={item.icon} />
          <span>{item.label}</span>
          {submenuIcon}
          {badge}
        </Link>
        <AppSubmenu items={item.items} onMenuItemClick={props.onMenuItemClick} />
      </li>
    );
  });

  return items ? <ul className={props.className}>{items}</ul> : null;
}

AppSubmenu.defaultProps = {
  className: null,
  items: null,
  onMenuItemClick: null,
  root: false
};

AppSubmenu.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  onMenuItemClick: PropTypes.func,
  root: PropTypes.bool
};

export default React.memo(AppSubmenu);
