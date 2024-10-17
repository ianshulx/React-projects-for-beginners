import React  from 'react'
import loading from "../assets/loading.gif"

const Loading = () => {
    return (
        <div className="text-center">
        <img src={loading} alt="" style={{width:"80px"}} />
        </div>
    )

}

export default Loading