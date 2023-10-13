import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import {Stack, Box, Typography} from "@mui/material"
import { CheckCircle } from "@mui/icons-material";

import Videos from "./Videos";
import { api } from "../utils/api";

const Video = () => {

    const {id} = useParams();
    const [videoDetail, setVideoDetail] = useState(null)
    const [videos, setVideos] = useState(null)

    useEffect(() => {
        api(`videos?part=snippet,statistics&id=${id}`)
            .then((data) => setVideoDetail(data.items[0]))

        api(`search?part=snippet&relatedToVideoId=${id}&type=video`)
            .then((data) => setVideos(data.items))
    },[id])

    if(!videoDetail?.snippet) return "Loading..."

    const {snippet: {title, channelId, channelTitle}, statistics:{viewCount, likeCount}} = videoDetail

    return(
        <Box minHeight="95vh">
            <Stack direction={{xs : 'column', md : "row"}}>
                <Box flex={1}>
                    <Box sx={{width: '100%', position: "sticky", top:"80px"}}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} height="77vh" width="100%" controls/>
                        <Typography variant="h5" color="white" fontWeight="bold" p={1}>
                            {title}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" sx={{color:"#fff"}} paddingLeft={1}>
                            <Link to={`/channel/${channelId}`}>
                                <Typography variant={{xs:"subtitle1", md:"h6"}} color="#fff">
                                    {channelTitle}
                                    <CheckCircle sx={{fontSize:"12px", color:"gray", ml:"5px"}}/>
                                </Typography>
                            </Link>
                            <Stack direction="row" gap="20px" alignItems="center">
                                <Typography variant="body1">
                                    {parseInt(viewCount).toLocaleString()} views
                                </Typography>
                                <Typography variant="body1">
                                👍{parseInt(likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
                    <Videos videos={videos} direction="column" />
                </Box>
            </Stack>
        </Box>
    )
};

export default Video