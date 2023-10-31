"use client";

import { FC, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import { IoMdNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import userIcon from "@/public/images/user.jpg";
import { SlMenu } from "react-icons/sl";
import { signOut } from "next-auth/react";

interface HeaderProps {
  setExpanded: Function;
  expanded: boolean;
  session: any;
}

const Header: FC<HeaderProps> = (props) => {
  const expand = "sm";
  useEffect(() => {}, []);

  //-------------------------------------------------//
  return (
    <Navbar
      key={expand}
      expand={expand}
      className="header border-bottom border-bottom-1 border-start border-start-1"
    >
      <Container fluid>
        <Navbar.Brand href="#" className="d-flex gap-3 align-items-center">
          <div
            onClick={() => props.setExpanded(!props.expanded)}
            className=" rounded-3 p-2 bg-primary"
          >
            <SlMenu size={25} className="text-white" />
          </div>
          {props.expanded && <Image width={100} src={logo} alt="Panda" />}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Collapse className="justify-content-end align-items-center gap-3 h-100">
          <div>
            <IoMdNotificationsOutline size={25} />
          </div>
          <div className="vertical-barrier" />
          <div className="user-section d-flex gap-2 align-items-center justify-content-center">
            <Image
              src={userIcon}
              alt="User"
              width={36}
              height={36}
              onClick={() => {
                signOut();
              }}
              style={{ cursor: "pointer" }}
            />
            <div className="d-flex flex-column justify-content-center">
              <div className="user-name d-flex align-items-end">
                {props?.session?.user?.data?.user?.name}
              </div>
              <div className="user-category">
                {props?.session?.user?.data?.user?.permissions?.join(" | ")}
              </div>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
