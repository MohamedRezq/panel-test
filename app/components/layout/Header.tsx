"use client";
import { FC, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  NotificationsOutlined,
  Menu,
  ExitToAppOutlined,
} from "@mui/icons-material";
// import { signOut } from "next-auth/react";
// import { useSession } from "next-auth/react";
import Image from "next/image";
import logo from "@/public/images/panda-logo.png";
import Link from "next/link";
import GenericModal from "../common/GenericModal";
import { destroyCookie, parseCookies } from "nookies";
import { IUser } from "@/lib/auth/types";
import { useRouter } from "next/navigation";
//-------------------------------------------------------------//
//-------------------------------------------------------------//
interface HeaderProps {
  toggleSidebar: Function;
  //   expanded: boolean;
  //   session: any;
}
//-------------------------------------------------------------//
//-------------------------------------------------------------//
const Header: FC<HeaderProps> = (props) => {
  //-----------------------------------------------------------//
  const router = useRouter();
  //-----------------------------------------------------------//
  useEffect(() => {
    const { panda_console_session } = parseCookies();
    const session = JSON.parse(panda_console_session);
    setUser(session);
  }, []);
  //-----------------------------------------------------------//
  const [user, setUser] = useState<IUser>();
  const [openLogoutConfirmModal, setOpenLogoutConfirmModal] = useState(false);
  // const handleOpenLogoutConfirmModal = () => setOpenLogoutConfirmModal(true);
  //-----------------------------------------------------------//
  const handleSignOut = async () => {
    destroyCookie(null, "panda_console_session");
    destroyCookie(null, "panda_console_access_token");
    destroyCookie(null, "panda_console_refresh_token");
    router.push(`/login`);
  };
  //-----------------------------------------------------------//
  return (
    <AppBar color="default" position="static">
      <Toolbar
        sx={{ display: "flex", gap: "5px", justifyContent: "space-between" }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => props.toggleSidebar()}
          >
            <Menu />
          </IconButton>
          <Typography display={{ xs: "none", md: "block" }} fontSize={18}>
            Picker Dashboard
          </Typography>
        </Box>
        {/* {props.expanded && <Image width={100} src={logo} alt="Panda" />} */}
        {/* <div style={{ flexGrow: 1 }}></div> */}
        <Link href="/dashboard/picker">
          <Image src={logo} height={30} alt="Panda" />
        </Link>

        <Box display="flex" alignItems="center">
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <NotificationsOutlined />
            </IconButton>
          </Tooltip>

          <Box className="user-section" sx={{ display: "flex", gap: "10px" }}>
            <Link href="">
              <Avatar alt="User" />
            </Link>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              className="user-data"
            >
              <Typography fontSize={12} className="user-name">
                {user?.name}
              </Typography>
              <Typography fontSize={10} className="user-category">
                {user?.permissions?.join(" | ")}
              </Typography>
            </Box>
          </Box>

          <Box marginLeft={2}>
            <Tooltip title="Sign out">
              <IconButton
                color="inherit"
                onClick={() =>
                  setOpenLogoutConfirmModal(!openLogoutConfirmModal)
                }
              >
                <ExitToAppOutlined />
              </IconButton>
            </Tooltip>
            <GenericModal
              type="confirmation"
              question="Are you leaving the dashboard?"
              open={openLogoutConfirmModal}
              onConfirm={() => handleSignOut()}
              onClose={() => setOpenLogoutConfirmModal(!openLogoutConfirmModal)}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
