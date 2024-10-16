import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';


// mui imports
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppState } from '@/store/store';

export default function NavItem({ item, level, pathDirect, hideMenu, onClick }) {
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const customizer = useSelector((state) => state.customizer);
  const Icon = item?.icon;
  const theme = useTheme();
  const { t } = useTranslation();
  const itemIcon =
    level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.3rem" />;

  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: 'nowrap',
    marginBottom: '2px',
    padding: '8px 10px',
    borderRadius: `${customizer.borderRadius}px`,
    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
    color:
      level > 1 && pathDirect === item?.href
        ? `${theme.palette.primary.main}!important`
        : theme.palette.text.secondary,
    paddingLeft: hideMenu ? '10px' : level > 2 ? `${level * 15}px` : '10px',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    '&.Mui-selected': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
  }));

  const listItemProps = {
    component: item?.external ? 'a' : Link,
    to: item?.href,
    href: item?.external ? item?.href : '',
    target: item?.external ? '_blank' : '',
  };

  return (
    <List component="li" disablePadding key={item?.id && item.title}>
      <Link href={item.href}>
        <ListItemStyled
          // {...listItemProps}
          disabled={item?.disabled}
          selected={pathDirect === item?.href}
          onClick={lgDown ? onClick : undefined}
        >
          <ListItemIcon
            sx={{
              minWidth: '36px',
              p: '3px 0',
              color:
                level > 1 && pathDirect === item?.href
                  ? `${theme.palette.primary.main}!important`
                  : 'inherit',
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            {hideMenu ? '' : <>{t(`${item?.title}`)}</>}
            <br />
            {item?.subtitle ? (
              <Typography variant="caption">{hideMenu ? '' : item?.subtitle}</Typography>
            ) : (
              ''
            )}
          </ListItemText>

          {!item?.chip || hideMenu ? null : (
            <Chip
              color={item?.chipColor}
              variant={item?.variant ? item?.variant : 'filled'}
              size="small"
              label={item?.chip}
            />
          )}
        </ListItemStyled>
      </Link>
    </List>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  pathDirect: PropTypes.any,
  hideMenu: PropTypes.any,
  onClick: PropTypes.func,
};
