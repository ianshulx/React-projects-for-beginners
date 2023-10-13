import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { demoVideoUrl, demoThumbnailUrl, demoChannelTitle, demoVideoTitle, demoChannelUrl } from "../utils/constants";

const VideoCard = ({video:{id :{videoId}, snippet }}) =>{
    // console.log(statistics);
    return(
        <Card sx={{width: { xs: '100%', sm: '358px', md: "320px"}, borderRadius:"10px"}}>
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                <CardMedia 
                component="img"
                image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
                alt={snippet?.title}
                sx={{ width: { xs: '100%', sm: '358px'},height:180, objectFit:"cover"}}/>
            </Link>
            <CardContent sx={{backgroundColor : "black", height:"100px"}}>
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                <Typography variant="subtitle1" color="white" fontWeight="bold">
                    {snippet?.title.slice(0,60) || demoVideoTitle.slice(0,60)}
                </Typography>
            </Link>
            <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
                <Typography variant="subtitle2" color="gray" fontWeight="bold">
                    {snippet?.channelTitle || demoChannelTitle}
                    <CheckCircle sx={{fontSize: 12, ml:"5px"}}/>
                </Typography>
            </Link>
            </CardContent>
        </Card>
    )
}

export default VideoCard;