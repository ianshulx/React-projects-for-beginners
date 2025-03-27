import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Button, TextField, Typography } from '@mui/material';

const BMICalculators = () => {
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [bmiValue, setBmiValue] = useState();
    const [message, setMessage] = useState("");


    const handleBmiCalculate = () => {

        if (!height || !weight) {
            return alert("Please Enter the height and weight values")
        }

        const result = (weight / (height * height)).toFixed(2);
        setBmiValue(result);

        if (result < 18.5) {
            setMessage("UnderWeight");
        } else if (result < 24.9) {
            setMessage("Normal Weight");
        } else if (result < 29.9) {
            setMessage("Overweight");
        } else {
            setMessage("Obsese")
        }

    };

    return (
        <Box sx={{ minWidth: "350px", minHeight: "auto", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRadius: "10px", boxShadow: "10px 15px 15px rgba(155, 199, 171, 0.6)", gap: 2, bgcolor:"white" }}>
            <Typography variant='h4' component="h2">BMI Calculator</Typography>
            <TextField
                required
                label="Height in meter"
                placeholder='eg:1.75'
                value={height}
                onChange={(e) => setHeight(e.target.value)}
            />
            <TextField
                required
                label="Weight in kg"
                placeholder='eg:60'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            <Button variant='contained' fullWidth onClick={handleBmiCalculate}>Calculate BMI</Button>
            {
                bmiValue && (
                    <>
                        <Typography variant='h6' component="body1">Your BMI:{bmiValue} </Typography>
                        <Typography variant='subtitle1' component="body1" mt="-14px">{message}</Typography>
                    </>
                )
            }
        </Box>
    )
}

export default BMICalculators