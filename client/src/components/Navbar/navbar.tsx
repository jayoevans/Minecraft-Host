import React, { Component } from 'react'
import{Nav,NavLink,Bars,NavMenu,NavBtn,NavBtnLink} from './NavbarElements'
const Navbar = () => {
    return(
        <>
            <Nav>
                <NavLink to='/'>
                    <h1>Logo</h1>
                </NavLink>
                <Bars/>
                <NavMenu>
                    <NavLink to='/newWorld' activeStyle>
                        New World
                    </NavLink>
                    <NavLink to='/account' activeStyle>
                        Account
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )
};

export default Navbar;
