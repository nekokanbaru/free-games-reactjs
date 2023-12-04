import {FaHeart, FaUser} from 'react-icons/fa'
import '../styles/navbar.css' 


export default function Navbar()
{
    return <div className="navbar">
        {/* <div className="navbar-left list">
            
            <ul>
                <li>Home</li>
            </ul>
        </div>
        <div className="navbar-right list">
            <ul>
                <li><FaUser size={25} className='navbar-icon'/></li>
            </ul>
        </div> */}

        {/* replace with logo later */}
        <p>Home</p>
        <FaUser size={25} className='navbar-icon'></FaUser>
    </div>
}

