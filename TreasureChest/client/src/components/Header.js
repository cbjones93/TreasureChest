import React from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { logout } from '../modules/authManager';
import { Image } from 'cloudinary-react';
import "./Header.css"

const imgStyle = {
  maxHeight: 100,
  maxWidth: 100,



}
export default function Header({ isLoggedIn }) {


  return (
    <div className="header">
      <Navbar style={{backgroundColor: 'rgb(18 19 30)'}} light expand="md">
        <div className="headerImg">
          <Image style={imgStyle} cloudName="dmhi6ysqi" publicId="https://res.cloudinary.com/dmhi6ysqi/image/upload/v1627930687/TreasureChest_vk2fxk.png" />
        </div>
        <NavbarBrand className="text-white" tag={RRNavLink} to="/">Treasure Chest</NavbarBrand>

        <Nav className="mr-auto" navbar>
          { /* When isLoggedIn === true, we will render the Home link */}
          {isLoggedIn &&
            <NavItem>
              <NavLink className="text-white" tag={RRNavLink} to="/">Home</NavLink>
            </NavItem>
          }
        </Nav>


        <Nav navbar>
          {isLoggedIn &&
            <>
              <NavItem>
                <NavLink className="text-white" tag={RRNavLink} to="/posts">Posts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-white" tag={RRNavLink} to="/myaccount">My Account</NavLink>
              </NavItem>
              <NavItem>
                <a aria-current="page" className="nav-link text-white"
                  style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
              </NavItem>
            </>
          }
          {!isLoggedIn &&
            <>
              <NavItem>
                <NavLink className="text-white" tag={RRNavLink} to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-white" tag={RRNavLink} to="/register">Register</NavLink>
              </NavItem>
            </>
          }

        </Nav>

      </Navbar>
    </div>
  );
}
