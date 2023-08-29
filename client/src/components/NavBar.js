import React from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NavBar({ updateUser }) {

    const handleLogout = () => {
        fetch('/logout', {
            method: 'DELETE',
        })
            .then(() => {
                updateUser(null);
                toast.success('Lougout Successful!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                })
            });

    };

    return (
        <nav className="nav-bar">
            <ul className='nav-item'>
                <NavLink to='/'>
                    <button type='button'>Home</button></NavLink>
            </ul>
            <ul className='nav-item'>
                <NavLink to='/Members'>
                    <button type='button'>Members</button></NavLink>
            </ul>
            <ul className='nav-item'>
                <NavLink to='/SocialEvents'>
                    <button type='button'>Social Events</button></NavLink>
            </ul>
            <ul className='nav-item'>
                <NavLink to='/Initiation'>
                    <button type='button'>Initiation/Log In</button></NavLink>
            </ul>
            <ul className='nav-item'>
                <NavLink to='/Groups'>
                    <button type='button'>Groups</button></NavLink>
            </ul>
            <ul className="nav-item">
                <button onClick={handleLogout}>Logout</button>
            </ul>
            <ToastContainer />
        </nav>

    )
}

export default NavBar;