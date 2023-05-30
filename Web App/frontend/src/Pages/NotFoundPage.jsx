import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <>
    <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
        <div>
            <h1 style={{ color: "red", fontSize: 100 }}>404</h1>
        </div>
        <div>
            <h3>Page Not Found</h3>
        </div>  
        <div>
            <p>
                <Link to="/">Go Back</Link>
            </p>
        </div>  
    </div>
    </>
  )
}

export default NotFoundPage