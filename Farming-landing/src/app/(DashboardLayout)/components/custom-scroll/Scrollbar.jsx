import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Box, SxProps } from "@mui/material";
import {styled} from '@mui/system';

const SimpleBarStyle = styled(SimpleBar)(() => ({
  maxHeight: "100%",
}));


const Scrollbar = (props) => {
  const { children, sx, ...other } = props;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  if (isMobile) {
    return <Box sx={{ overflowX: "auto" }}>{children}</Box>;
  }

  return (
    <SimpleBarStyle sx={sx} {...other}>
      {children}
    </SimpleBarStyle>
  );
};

export default Scrollbar;
