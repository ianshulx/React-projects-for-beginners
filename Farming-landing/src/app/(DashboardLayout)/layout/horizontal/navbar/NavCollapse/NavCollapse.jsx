import React from "react";
import PropTypes from 'prop-types';
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";

// mui imports
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";

import { useSelector } from 'react-redux';

// custom imports
import NavItem from "../NavItem/NavItem";

// plugins
import { IconChevronDown } from "@tabler/icons-react";

// FC Component For Dropdown Menu
const NavCollapse = ({
  menu,
  level,
  pathWithoutLastPart,
  pathDirect,
  hideMenu, onClick
}) => {
  const Icon = menu.icon;
  const theme = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const customizer = useSelector((state) => state.customizer);
  const menuIcon =
    level > 1 ? (
      <Icon stroke={1.5} size="1rem" />
    ) : (
      <Icon stroke={1.5} size="1.1rem" />
    );

  React.useEffect(() => {
    setOpen(false);
    menu.children.forEach((item) => {
      if (item.href === pathname) {
        setOpen(true);
      }
    });
  }, [pathname, menu.children]);

  const ListItemStyled = styled(ListItemButton)(() => ({
    width: "auto",
    padding: "5px 10px",
    position: "relative",
    flexGrow: "unset",
    gap: "10px",
    borderRadius: `${customizer.borderRadius}px`,
    whiteSpace: "nowrap",
    color:
      open || pathname.includes(menu.href) || level < 1
        ? "white"
        : theme.palette.text.secondary,
    backgroundColor:
      open || pathname.includes(menu.href) ? theme.palette.primary.main : "",

    "&:hover": {
      backgroundColor:
        open || pathname.includes(menu.href)
          ? theme.palette.primary.main
          : theme.palette.primary.light,
    },
    "&:hover > .SubNav": { display: "block" },
  }));

  const ListSubMenu = styled(Box)(() => ({
    display: "none",
    position: "absolute",
    top: level > 1 ? `0px` : "35px",
    left: level > 1 ? `${level + 228}px` : "0px",
    padding: "10px",
    width: "250px",
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[8],
    backgroundColor: theme.palette.background.paper,
  }));

  const listItemProps = {
    component: 'li',
  };

  // If Menu has Children
  const submenus = menu.children?.map((item) => {
    if (item.children) {
      return (
        <NavCollapse
          key={item.id}
          menu={item}
          level={level + 1}
          pathWithoutLastPart={pathWithoutLastPart}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={undefined}
        />
      );
    } else {
      return (
        <NavItem
          key={item.id}
          item={item}
          level={level + 1}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    }
  });

  return (
    <React.Fragment key={menu.id}>
      <ListItemStyled
        {...listItemProps}
        selected={pathWithoutLastPart === menu.href}
        className={open ? "selected" : ""}
      >
        <ListItemIcon
          sx={{
            minWidth: "auto",
            p: "3px 0",
            color: "inherit",
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText color="inherit" sx={{ mr: "auto" }}>
          {menu.title}
        </ListItemText>
        <IconChevronDown size="1rem" />
        <ListSubMenu component={"ul"} className="SubNav">
          {submenus}
        </ListSubMenu>
      </ListItemStyled>
    </React.Fragment>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
  pathDirect: PropTypes.any,
  pathWithoutLastPart: PropTypes.any,
  hideMenu: PropTypes.any,
};

export default NavCollapse;
