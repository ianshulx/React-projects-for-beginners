import { Stack } from "@mui/material";
import {categories} from "../utils/constants"

const SideBar = ({selectedCategory, setselectedCategory}) => (
    <Stack
    direction="row"
    sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "94%" },
        flexDirection: { md: "column" },
      }} 
    >
        {categories.map((category) => (
            <button
                className="category-btn"
                onClick={() => setselectedCategory(category.name)}
                style={{
                    background: category.name === selectedCategory && '#FC1503',
                    color:"white"
                }}
                key={category.name}
            >
                <span style={{color: 
                    category.name === selectedCategory ? 'white' : 'red', marginRight:"12px"}}
                >
                    {category.icon}
                </span>
                <span>{category.name}</span>
            </button>
        ))}
    </Stack>
);

export default SideBar