import * as React from "react";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Container,
  Typography,
  TextField,
  Box,
  FormLabel,
  Button,
} from "@mui/material";
let inputResponsiveWidth = {
  xs: "350px",
  sm: "500px",
  md: "500px",
  lg: "500px",
  xl: "500px",
};
export default function MainProfitMarginCalc() {
  const [companyRevenue, setCompanyRevenue] = useState();
  const [goodsSold, setGoodsSold] = useState();
  const [operatingExpense, setOperatingExpense] = useState();
  const [interestExpense, setInterestExpense] = useState();
  const [taxes, setTaxes] = useState();
  //Loading
  const [loading, setLoading] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);

  //Gross Profit Margin = ((Revenue - COGS) / Revenue) * 100
  const [grossProfitMargin, setGrossProfitMargin] = useState();

  //Operating Profit Margin = ((Revenue - COGS - Operating Expenses) / Revenue) * 100
  const [operatingProfitMargin, setOperatingProfitMargin] = useState();

  //Net Profit Margin = ((Revenue - COGS - Operating Expenses - Interest Expense - Taxes) / Revenue) * 100
  const [netProfitMargin, SetNetProfitMargin] = useState();

  const HandleProfitMargin = () => {
    console.log(typeof companyRevenue);
    console.log(goodsSold);
    console.log(operatingExpense);
    const res =
      ((Number(companyRevenue) - Number(goodsSold) - Number(operatingExpense)) /
        Number(companyRevenue)) *
      100;
    console.log(res);
    setOperatingProfitMargin(() => res);
  };

  const HandleGrossProfitMargin = () => {
    const res =
      ((Number(companyRevenue) - Number(goodsSold)) / Number(companyRevenue)) *
      100;
    setGrossProfitMargin(() => res);
  };

  const HandleNetProfitMargin = () => {
    const res =
      ((Number(companyRevenue) -
        Number(goodsSold) -
        Number(operatingExpense) -
        Number(interestExpense) -
        Number(taxes)) /
        Number(companyRevenue)) *
      100;
    SetNetProfitMargin(() => res);
  };
  const HandleSubmition = (e) => {
    setLoading(true);
    e.preventDefault();
    HandleProfitMargin();
    HandleGrossProfitMargin();
    HandleNetProfitMargin();
    setLoading(false);
    setDisplayResult(true);
  };
  return (
    <Container
      maxWidth="lg"
      sx={{ bgcolor: "#eeeeee", minHeight: "90vh", paddingY: "10" }}
    >
      <Typography pt={1} variant="h5" align="center">
        Profit Margin Calculator
      </Typography>
      <hr />
      <br />
      <Box
        sx={{
          width: "100%",
          height: "100%",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {displayResult && (
          <>
            <Typography sx={{ fontSize: 28, textAlign: "center" }}>
              Results
            </Typography>
            <hr />

            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: 25,
                  textAlign: "left",
                  marginTop: 5,
                  marginBottom: 1,
                }}
              >
                Gross Profit Margin:
              </Typography>
              <Typography
                sx={{
                  backgroundColor: "#FFCC66",
                  fontSize: 20,
                  padding: 0.5,
                  borderRadius: 0.5,
                  textAlign: "center",
                }}
              >
                <h2>{`${grossProfitMargin}%
                `}</h2>
                <br />
                {`which means that for every ruppee in revenue, the company retains ${
                  grossProfitMargin / (100).toFixed(2)
                }₹ after covering the cost of goods sold.`}
              </Typography>
              <Typography
                sx={{
                  fontSize: 25,
                  textAlign: "left",
                  marginTop: 5,
                  marginBottom: 1,
                }}
              >
                Operating Profit Margin:
              </Typography>
              <Typography
                sx={{
                  backgroundColor: "#FFCC66",
                  fontSize: 20,
                  padding: 0.5,
                  borderRadius: 0.5,
                  textAlign: "center",
                }}
              >
                <h2> {`${operatingProfitMargin} %`}</h2>
                <br />
                {`which represents the profit from core business operations after accounting for both the cost of goods sold and operating expenses.`}
              </Typography>
              <Typography
                sx={{
                  fontSize: 25,
                  textAlign: "left",
                  marginTop: 5,
                  marginBottom: 1,
                }}
              >
                Net Profit Margin:
              </Typography>
              <Typography
                sx={{
                  backgroundColor: "#FFCC66",
                  fontSize: 20,
                  padding: 0.5,
                  borderRadius: 0.5,
                  textAlign: "center",
                }}
              >
                <h2> {` ${netProfitMargin} %`}</h2>
                <br />

                {` which represents the overall profitability of the business after considering all expenses, including interest and taxes.`}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  "&:hover": { backgroundColor: "#EC6F66" },
                  width: inputResponsiveWidth,
                  marginTop: "20px",
                }}
                onClick={() => setDisplayResult(false)}
              >
                Back
              </Button>
            </Box>
          </>
        )}
        {!loading && !displayResult && (
          <Box>
            <form onSubmit={HandleSubmition}>
              <FormLabel
                type="primary"
                sx={{ fontStyle: "normal", color: "#000" }}
              >
                Total Company Revenue
              </FormLabel>
              <br />
              <br />

              <TextField
                label="Total Revenue"
                sx={{
                  width: inputResponsiveWidth,
                }}
                variant="outlined"
                type="number"
                onChange={(e) => setCompanyRevenue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                required
              />
              <br />
              <br />
              <FormLabel
                type="primary"
                sx={{ fontStyle: "normal", color: "#000" }}
              >
                Cost of Goods Sold (COGS):
              </FormLabel>
              <br />
              <br />

              <TextField
                label="Total Cost Associated with Producing or Delivering the Products or Services."
                sx={{
                  width: inputResponsiveWidth,
                }}
                variant="outlined"
                type="number"
                onChange={(e) => {
                  setGoodsSold(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                required
              />
              <br />
              <br />
              <FormLabel
                type="primary"
                sx={{ fontStyle: "normal", color: "#000" }}
              >
                Operating Expense
              </FormLabel>
              <br />
              <br />

              <TextField
                label="Indirect costs of Running the Business,ex Rent, Utilities, Salaries, etc."
                sx={{
                  width: inputResponsiveWidth,
                }}
                variant="outlined"
                onChange={(e) => setOperatingExpense(e.target.value)}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                required
              />
              <br />
              <br />
              <FormLabel
                type="primary"
                sx={{ fontStyle: "normal", color: "#000" }}
              >
                Interest Expense
              </FormLabel>
              <br />
              <br />

              <TextField
                label="Interest paid on Loans or debt."
                onChange={(e) => setInterestExpense(e.target.value)}
                sx={{
                  width: inputResponsiveWidth,
                }}
                variant="outlined"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                required
              />
              <br />
              <br />
              <FormLabel
                type="primary"
                sx={{ fontStyle: "normal", color: "#000" }}
              >
                Taxes
              </FormLabel>
              <br />
              <br />

              <TextField
                label="Income taxes paid by the business."
                onChange={(e) => {
                  setTaxes(e.target.value);
                }}
                sx={{
                  width: inputResponsiveWidth,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                variant="outlined"
                type="number"
                required
              />
              <br />
              <br />
              <Button
                variant="contained"
                sx={{
                  "&:hover": { backgroundColor: "#EC6F66" },
                  width: inputResponsiveWidth,
                  marginTop: "20px",
                }}
                type="submit"
              >
                Calculate Profit
              </Button>
            </form>
          </Box>
        )}
        {loading && !displayResult && <h1>Calculating Results ....</h1>}
      </Box>
    </Container>
  );
}
