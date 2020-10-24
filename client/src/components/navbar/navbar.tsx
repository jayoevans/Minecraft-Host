import React from 'react'
import{Nav,NavLink,Bars,NavMenu} from './navbar-elements'
const Navbar = () => {
    return(
        <>
            <Nav>
                <NavLink to='/home'>
                    <img src={require("../../images/minecraft.png")} alt=""/>
                </NavLink>
                <Bars/>
                <NavMenu>
                    <NavLink to='/account' >
                        Account
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )
};

export default Navbar;
