import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

// mui imports
// mui imports
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';


const NavItem = ({ item, level, pathDirect, onClick }) => {
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const customizer = useSelector((state) => state.customizer);
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon =
    level > 1 ? (
      <Icon stroke={1.5} size="1rem" />
    ) : (
      <Icon stroke={1.5} size="1.1rem" />
    );

  const ListItemStyled2 = styled(ListItem)(() => ({
    padding: "5px 10px",
    gap: "10px",
    borderRadius: `${customizer.borderRadius}px`,
    marginBottom: level > 1 ? "3px" : "0px",
    color:
      level > 1 && pathDirect === item.href
        ? `${theme.palette.primary.main}!important`
        : theme.palette.text.secondary,

    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    "&.Mui-selected": {
      color: level > 1 ? theme.palette.primary.main : "white!important",
      backgroundColor: level > 1 ? "transparent" : theme.palette.primary.main,
      "&:hover": {
        backgroundColor: level > 1 ? "" : theme.palette.primary.main,
        color: "white",
      },
    },
  }));

  const listItemProps = {
    component: item?.external ? "a" : Link,
    to: item?.href,
    href: item?.external ? item?.href : "",
    target: item?.external ? "_blank" : "",
  };

  return (
    <List component="li" disablePadding key={item.id}>
      <Link href={item.href}>
        <ListItemStyled2
          disabled={item.disabled}
          selected={pathDirect === item.href}
          onClick={lgDown ? onClick : undefined}
        >
          <ListItemIcon
            sx={{
              minWidth: "auto",
              p: "3px 0",
              color: "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>{item.title}</ListItemText>
        </ListItemStyled2>
      </Link>
    </List>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  pathDirect: PropTypes.any,
  hideMenu: PropTypes.any,
};

export default NavItem;
