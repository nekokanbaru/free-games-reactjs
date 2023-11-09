
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
                <li><img src="../src/assets/icons/shopping-cart.svg" alt="cart" /></li>
                <li><img src="../src/assets/icons/heart.svg" alt="favorites" /></li>
                <li><img src="../src/assets/icons/user.svg" alt="profile" /></li>
            </ul>
        </div>
    </div>
}

