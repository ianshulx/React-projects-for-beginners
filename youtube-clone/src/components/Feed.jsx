import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import SideBar from "./SideBar";
import Videos from "./Videos";
import { api } from "../utils/api";

const Feed = () => {

    const [selectedCategory, setselectedCategory] = useState("New")
    const [videos, setVideos] = useState([])

    useEffect(() => {
        api(`search?part=snippet&q=${selectedCategory}`)
        .then((data) => {setVideos(data.items)})
    }, [selectedCategory])
    
    return(
        <Stack sx={{ flexDirection:{ sx:"column", md:"row"}}}>
            <Box 
            sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 }}}
            >
                <SideBar
                    selectedCategory={selectedCategory}
                    setselectedCategory={setselectedCategory}
                />
                <Typography 
                className="copyright" variant="body2" 
                sx={{ color:"#fff"}}
                >
                    Copyright &copy; <a href="https://accodes21.github.io/Profile/" target="blank" 
                    style={{color:"#fff"}}
                    >
                        Aarya Chopkar
                    </a>
                </Typography>
            </Box>
            <Box p={2} sx={{ overflowY: "auto", height: "90vh"}}>
                <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                    {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
                </Typography>

                <Videos videos={videos} />
            </Box>
        </Stack>
    )
};

export default Feed