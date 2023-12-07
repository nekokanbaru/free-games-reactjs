import {Link} from 'react-router-dom'
import React from 'react'
import '../styles/error.css'
import background from '../assets/404.jpeg'

export default function Error() {
    return <div className="error-wrapper">
        <div className="image-container">
        <img src={background} alt="sylvanas" />
        <div className="image-shadow"></div>
        </div>

        <div className="error-container">
        <h1>404</h1>
        <p>the page was not found</p>
        <Link to={`/`}><button className='btn'>Back to home</button></Link>
        </div>
        
    </div>
}