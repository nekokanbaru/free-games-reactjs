import {FaShoppingCart, FaHeart, FaUser} from 'react-icons/fa'


export default function Navbar()
{
    return <div className="navbar">
        <div className="navbar-left list">
            {/* replace with react router later on */}
            <ul>
                <li>Home</li>
                <li>Streams</li>
                <li>Game Store</li>
                <li>News</li>
            </ul>
        </div>
        <div className="navbar-right list">
            <ul>
                <li><FaShoppingCart/></li>
                <li><FaHeart/></li>
                <li><FaUser/></li>
            </ul>
        </div>
    </div>
}

