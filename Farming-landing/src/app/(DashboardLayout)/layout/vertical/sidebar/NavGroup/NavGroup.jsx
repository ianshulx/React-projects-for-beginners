import PropTypes from 'prop-types';
import ListSubheader from '@mui/material/ListSubheader';

import { styled } from '@mui/material/styles';
import { IconDots } from '@tabler/icons-react';
import React from 'react';


const NavGroup = ({ item, hideMenu }) => {
  const ListSubheaderStyle = styled((props) => (
    <ListSubheader disableSticky {...props} />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: '700',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    color: 'text.Primary',
    lineHeight: '26px',
    padding: '3px 12px',
    marginLeft: hideMenu ? '' : '-10px',
  }));

  return (
    <ListSubheaderStyle>{hideMenu ? <IconDots size="14" /> : item?.subheader}</ListSubheaderStyle>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
  hideMenu: PropTypes.any,
};


export default NavGroup;
