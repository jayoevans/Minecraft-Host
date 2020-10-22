import React from 'react'
import{Nav,NavLink,Bars,NavMenu} from './NavbarElements'
const Navbar = () => {
    return(
        <>
            <Nav>
                <NavLink to='/home'>
                    <img src={require("../../images/minecraft.png")} alt=""/>
                </NavLink>
                <Bars/>
                <NavMenu>
                    <NavLink to='/newWorld' >
                        New World
                    </NavLink>
                    <NavLink to='/account' >
                        Account
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )
};

export default Navbar;
