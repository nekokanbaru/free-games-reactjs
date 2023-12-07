import {Link} from 'react-router-dom'
import React from 'react'
import '../styles/error.css'

export default function Error() {
    return <div className="error-container">
        <h1>404</h1>
        <p>the page was not found</p>
        <Link to={`/`}><button className='btn'>Back to home</button></Link>
    </div>
}