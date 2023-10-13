import {Box, CardMedia, CardContent, Typography} from '@mui/material'
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';

const ChannelCard = ({channelDetail, marginTop}) =>(
    <Box
      sx={{ 
        borderRadius: "20px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:{xs:"356px", md:"350px"},
        height:"330px",
        margin:"auto",
        marginTop
    }}
    >
        <Link to={`channel/${channelDetail?.id?.channelId}`}>
            <CardContent sx={{display:"flex", flexDirection:"column", justifyContent:"center", textAlign:"center", color:"#fff"}}>
                <CardMedia 
                component="img"
                image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
                alt={channelDetail?.snippet?.title}
                sx={{height:"180px", width:"180px", borderRadius:"50%", textAlign:"center"}}
                />
                <Typography variant='h6'>
                    {channelDetail?.snippet?.title}
                    <CheckCircle sx={{fontSize: 14, ml:"5px"}}/>
                </Typography>
                {channelDetail?.statistics?.subscriberCount && (
                    <Typography>
                        {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString()} Subscribers
                    </Typography>
                )}
            </CardContent>
        </Link>
    </Box>
)


export default ChannelCard;