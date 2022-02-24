import React from "react";
import notFound from '../not-found.webp'
function NotFound(){
    return(
        <div style={{minHeight: "600px"}}>
            <img src={notFound} style={{width: "80%",height: "600px"}} alt=""/>
        </div>
    )
}

export default React.memo(NotFound);