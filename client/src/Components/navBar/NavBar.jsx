import React from 'react'
import userIcon from '../../Assets/navBar/userIcon.png'
import './NavBar.css'

const NavBar = () => {
    return (
        <div className='navBarContainer'>
                <div className="avatarContainer">
                        <img src={userIcon} alt="userIcon" className='userIcon'/>
                </div>
                
        </div>
    )
}

export default NavBar