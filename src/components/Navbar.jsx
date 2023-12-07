import {FaHeart, FaUser} from 'react-icons/fa'
import '../styles/navbar.css' 


export default function Navbar()
{
    return <div className="navbar">
        <h1>Free-to-play games</h1>
        <FaUser size={25} className='navbar-icon'></FaUser>
    </div>
}

