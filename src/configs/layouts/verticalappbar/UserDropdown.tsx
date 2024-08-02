// ** React Imports
import { useState, SyntheticEvent, Fragment } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** MUI Imports
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";

// ** Icon Imports

// ** Context
import { useAuth } from "src/configs/g_hooks/useAuth";

// ** Type Imports
import IconifyIcon from "src/configs/theme/components/icon";
import { useSelector } from "react-redux";
import { StateFromReducersMapObject } from "redux";
import { Settings } from "src/configs/g_types/types";

interface Props {
  settings: Settings;
}

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const MenuItemStyled = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  "&:hover .MuiBox-root, &:hover .MuiBox-root svg": {
    color: theme.palette.primary.main,
  },
}));

const UserDropdown = (props: Props) => {
  const userData = useSelector(
    (state: Record<string, any>) => state?.data?.userdata?.logindata?.userData
  );

  // ** Props
  const { settings } = props;

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  // ** Hooks
  const router = useRouter();
  const { logout } = useAuth();

  // ** Vars
  const { direction } = settings;

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const styles = {
    px: 4,
    py: 1.75,
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "text.primary",
    textDecoration: "none",
    "& svg": {
      mr: 2.5,
      color: "text.primary",
    },
  };

  const handleLogout = () => {
    logout();
    handleDropdownClose();
  };

  return (
    <Fragment>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: "pointer" }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Avatar onClick={handleDropdownOpen} sx={{ width: 40, height: 40 }}>
          {userData?.name?.slice(0, 1)}
        </Avatar>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, mt: 4.5 } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
      >
        <Box sx={{ py: 1.75, px: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Avatar sx={{ width: "2.5rem", height: "2.5rem" }}>
                {userData?.name?.slice(0, 1)}
              </Avatar>
            </Badge>
            <Box
              sx={{
                display: "flex",
                ml: 2.5,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>{userData?.name}</Typography>
              <Typography variant="body2">{userData?.role?.name}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: (theme) => `${theme.spacing(2)} !important` }} />
        {/* <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <IconifyIcon icon="tabler:user-check" />
            My Profile
          </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <IconifyIcon icon="tabler:mail" />
            Inbox
          </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <IconifyIcon icon="tabler:message-2" />
            Chat
          </Box>
        </MenuItemStyled>
        <Divider sx={{ my: (theme) => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <IconifyIcon icon="tabler:settings" />
            Settings
          </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <IconifyIcon icon="tabler:currency-dollar" />
            Pricing
          </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <IconifyIcon icon="tabler:help" />
            FAQ
          </Box>
        </MenuItemStyled> */}
        {/* <Divider sx={{ my: (theme) => `${theme.spacing(2)} !important` }} /> */}
        <MenuItemStyled
          onClick={handleLogout}
          sx={{ py: 2, "& svg": { mr: 2, fontSize: "1.375rem" } }}
        >
          <IconifyIcon icon="tabler:logout" />
          Logout
        </MenuItemStyled>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
