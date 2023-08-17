import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <ul className = 'nav-item'>
                <NavLink to = '/'>
                    <button type = 'button'>Home</button></NavLink>
            </ul>
            <ul className = 'nav-item'>
                <NavLink to = '/Members'>
                    <button type = 'button'>Members</button></NavLink>
            </ul>
            <ul className = 'nav-item'>
                <NavLink to = '/SocialEvents'>
                    <button type = 'button'>Social Events</button></NavLink>
            </ul>
            <ul className = 'nav-item'>
                <NavLink to = '/Initiation'>
                    <button type = 'button'>Initiation/Sign Up</button></NavLink>
            </ul>
            <ul className = 'nav-item'>
                <NavLink to ='/Groups'>
                    <button type = 'button'>Groups</button></NavLink>
            </ul>
        </nav>
    )
}

export default NavBar;