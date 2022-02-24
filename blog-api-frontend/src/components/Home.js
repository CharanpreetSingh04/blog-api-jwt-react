import React from "react";
import { Link } from "react-router-dom";
function Home() {
    return(
        <div className='home'>
            <h1>
                Home Page
            </h1>
            <br/>
            <br/>
            <h3>
                Welcome to home page
            </h3>
            <br/>
            <br/>
            <h3>
                Blogs are very important part for gaining knowledge.
            </h3>
            <br/>
            <br/>
            <h3>
                You can cover all types of blogs and can write your own blogs that can be seen by other users. They can provide feedback on your blog.
            </h3>
            <br/>
            <br/>
            <h3>
                Serving you with all our hearts
            </h3>
            <br/>
            <br/>
            <h3>
                Happy Blogging:)
            </h3>

            <br/>
            <h3>
                You can reach out to us at +(91) 1234567890
            </h3>
            <Link to="/register">
                <h2> Register now!</h2>
            </Link>
        </div>
    )
    
}

export default React.memo(Home);