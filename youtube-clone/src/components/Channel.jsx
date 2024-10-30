import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"

import Videos from "./Videos"
import { api } from "../utils/api";
import ChannelCard from "./ChannelCard";

const Channel = () => {
    const [channelDetail, setChannelDetail] = useState(null)
    const [videos, setVideos] = useState([])

    const {id} = useParams();

    // console.log(videos);
    useEffect(() => {
        api(`channels?part=snippet&id=${id}`)
        .then((data) => {setChannelDetail(data?.items[0])})

        api(`search?channelId=${id}&part=snippet&order=date`)
        .then((data) => {setVideos(data?.items)})
    }, [id])

    return (
        <Box minHeight="95vh">
            <Box>
                <div
                style={{
                background: "linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)",
                zIndex:"2",
                height:"300px"
                }}
                />
                <ChannelCard channelDetail={channelDetail} marginTop="-90px"/>
            </Box>
            <Box display="flex" p="2" sx={{ml:{xs:0,md:"30px"}}}>
                {/* <Box sx={{mr: {sm: '80px'}}} /> */}
                <Videos videos={videos}/>
            </Box>
        </Box>
    )
}

export default Channel