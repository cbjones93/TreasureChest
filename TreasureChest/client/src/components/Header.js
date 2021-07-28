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
import CategoryList from './Category/CategoryList';

export default function Header({ isLoggedIn }) {

  
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Treasure Chest</NavbarBrand>

        <Nav className="mr-auto" navbar>
          { /* When isLoggedIn === true, we will render the Home link */}
          {isLoggedIn &&
            <NavItem>
              <NavLink tag={RRNavLink} to="/">Home</NavLink>
            </NavItem>
          }
        </Nav>


        <Nav navbar>
          {isLoggedIn &&
            <>
              <NavItem>
              <NavLink tag={RRNavLink} to="/posts">Posts</NavLink>
              </NavItem>
              <UncontrolledDropdown>
              <DropdownToggle>Categories</DropdownToggle>
              <DropdownMenu>
                <CategoryList />
              </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <a aria-current="page" className="nav-link"
                  style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
              </NavItem>
            </>
          }
          {!isLoggedIn &&
            <>
              <NavItem>
                <NavLink tag={RRNavLink} to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/register">Register</NavLink>
              </NavItem>
            </>
          }

        </Nav>

      </Navbar>
    </div>
  );
}
