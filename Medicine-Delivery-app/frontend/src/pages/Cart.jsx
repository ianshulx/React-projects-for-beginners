import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components';
// import demoimg from "../images/demoimg.png"
import { DeleteOutline, FavoriteBorder, VerifiedUser } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import { useSelector } from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from '../RequestMethods';
import cors from "cors";

const KEY = "pk_test_51NvaZySCBtJ08adKz0kQshcPvz44QrjVKQO4BmTv0EcTHBUYFu4yfBpDbItpInJQYLrzriXO9AkW3YijcwgOANXH00Mo0oMPBI"

const Container = styled.div`
    height:auto;
    background:#EAEDED;
    display:flex;
    justify-content:center;
    align-items:center;

`;
const Wrapper = styled.div`
    display:flex;
    height:90%;
    width:90%;  
`;
const Left = styled.div`
    flex:70%;
    margin-right:10px;
    display:flex;
    flex-direction:column;
    height:auto;
       
`;
const Address = styled.div`
    height:8%;
    margin-bottom:15px;
    background:white;
    display:flex;
    justify-content:space-between;
    align-items:center;
    
`;

const SavedAdd = styled.div`
    font-weight:500;
    margin-left:20px;
`;
const Pincode = styled.div`
    margin-right:20px;
    font-weight:600;
    color:blue;
    border:1px solid lightgrey;
    height:20px;
    padding:5px 15px;
    
`;

const Product = styled.div`
    background:white;
    
`;
const Product1 = styled.div`
    margin:20px;
`;

const ProductDetails = styled.div`
    display:flex;
    

`;
const Img = styled.img`
    flex:15%;
    height:180px;
    
`;
const Desc = styled.div`
    flex:50%;
    margin-left:40px;
`;
const ProdTitle = styled.h2`
    font-size:22px;
    
`;
const Specs = styled.p`
    color:grey;
    opacity:0.75;
`;
const Seller = styled.div`
    font-size:18px;
    color:grey;
    opacity:0.9;
    margin:10px 0px;
`;
const Price = styled.div`
    display:flex;
    margin:20px 0px;
    align-items:center;

`;
const Mrp = styled.div`
    color:grey;
    margin-right:10px;
    font-weight:500;
    font-size:16px;
    text-decoration:line-through;
`;
const SellingPrice = styled.div`
    font-weight:700;
    font-size:22px;
    margin-right:15px;
`;
const Discount = styled.div`
    color:green;
    font-weigth:800;
    font-size:16px;
`;
const Save = styled.div`
    display:flex;

`;
const Button = styled.div`
    display:flex;
    align-items:center;
    margin-right:20px;
`;

var Sub ;
const Add =  Sub =styled.button`
    height:30px;
    width:30px;
    background:white;
    border-radius:50%;
    border:1px solid grey;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:25px;
    font-weight:700;
    margin-right:10px;
`;
const Box = styled.div`
    height:25px;
    width:40px;
    border:1px solid black;
    font-size:18px;
    font-weight:600;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:10px;

`;
var Remove ;
const Wishlist = Remove =styled.button`
    display:flex;
    align-items:center;
    justify-content:center;
    height:35px;
    width:30%;
    border:none;
    margin-right:20px;
    font-weight:700;
    font-size:18px;
    color:white;
    background:${props => props.color};
    border-radius:2px;

`;
// const Remove = styled.button``;
const Delivery = styled.div`;
    flex:30%;
    display:flex;
    flex-direction:column;
    margin-left:20px;
   
`;

const DelText = styled.p`
    font-weight:700;
    `;
const Fees = styled.p`
    font-weight:600;
    color:green;
    display:flex;
    margin-top:10px;

`;
const Cut = styled.p`
    text-decoration:line-through;
    color:lightgrey;
    font-weight:500;
    margin-left:8px;
`
const Hr = styled.hr`
    margin:30px 0px;
    opacity:0.75;
`
const Placeorder = styled.div`
    height:10vh;
    background:white;
    box-shadow: 5px 2px 20px  lightgrey;
    display:flex;
    justify-content:flex-end;
    align-items:center;
`;
const Order = styled.button`
    margin-right:40px;
    padding:5px 40px;
    height:40px;
    border:none;
    background:#FB641B;
    color:white;
    font-size:18px;
    font-weight:700;
`;

const Right = styled.div`
    flex:30%;
    margin-left:10px; 
    height:650px; 
`;
const PriceWrapper= styled.div`
    background:white;
    height:60%;
`;
const Heading = styled.div`
    padding-left:20px;
    padding-top: 10px;
    font-size:20px;
    color:grey;
`;
const PriceSpec = styled.div`
    margin:10px 25px;
    font-size:18px;
`;
const PriceList = styled.div`
    display:flex;
    justify-content:space-between;
    margin-bottom:15px;
`;
const PriceDesc = styled.div``;
const Amount = styled.div`
    color : ${props => props.color};
    font-weight:600;
`;
const Total = styled.div`
    display:flex;
    justify-content:space-between;
    font-size:20px;
    font-weight:700;
    margin:0px 25px;
`;
const TotalDesc = styled.div`

`;
const TotalAmt = styled.div``;
const Savings = styled.div`
    margin: 0px 25px;
    color:green;
    font-weight:700;
    font-size:18px;
`;
const Hr1 = styled.hr`
    border: 1px dashed;
    color:lightgrey;
    margin: 15px 20px;

`;
const Security = styled.div`
    margin:10px 25px;
    display:flex;
    align-items:center;
    font-weight:600;
    color:grey;
`;

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useNavigate();

    const onToken = (token) =>{
        setStripeToken(token);
    };
    useEffect(()=>{
        const makeRequest = async () => {
            try{
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total*100,
                })
                history.push("/sucess", {data: res.data});
            }catch{

            }
        }
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, history])
    console.log(cart);
    // App.use(cors());
    
    // const quantity = useSelector((state)=> state.cart.quantity);
  return (
    <>
    <Navbar/>
    <Container>
        <Wrapper>
            <Left>
                <Address>
                    <SavedAdd>From Saved Address</SavedAdd>
                    <Pincode>Enter Delivery Pincode  </Pincode>
                </Address>
                <Product>
                   {cart.products.map((product)=>( 
                
                    <Product1>
                        <ProductDetails>
                            <Img src={product.img} />
                            <Desc>
                                <ProdTitle>{product.title}</ProdTitle>
                                {/* <Specs>Size:M | Mens</Specs> */}
                                <Seller>id:{product._id}</Seller>
                                <Price>
                                    <Mrp>₹ 2000</Mrp>
                                    <SellingPrice>₹{product.price*product.quantity}</SellingPrice>
                                    <Discount>40% Discount, 1 Coupon & 4 Offers applied</Discount>
                                </Price>
                                <Save>
                                    <Button>
                                        <Add >+</Add>
                                        <Box>{product.quantity}</Box>   
                                        <Sub>-</Sub>
                                    </Button>
                                    <Wishlist color='#FF527B'><FavoriteBorder/>Wishlist</Wishlist>
                                    <Remove color='red  '><DeleteOutline/>Remove</Remove>
                                </Save>
                            </Desc>
                            <Delivery>
                                <DelText>Delivery by Thursday 10th Aug</DelText>
                                <Fees>Free | <Cut>₹40</Cut></Fees>
                            </Delivery>
                        </ProductDetails>
                        <Hr/>
                    </Product1>
                ))}
                </Product>


                <Placeorder>
                    <StripeCheckout
                    name= "Medical Shop"
                    billingAddress
                    shippingAddress
                    description= {`Your total is $${cart.total}`}
                    amount={cart.total*100}
                    token={onToken}
                    stripeKey={KEY}
                    >
                    <Order>Place Order</Order>
                    </StripeCheckout>
                    
                </Placeorder>
            </Left>
            <Right>
                <PriceWrapper>
                    <Heading>PRICE DETAILS</Heading>
                    <Hr/>
                    <PriceSpec>
                        <PriceList>
                            <PriceDesc>Price (2items) </PriceDesc>
                            <Amount >₹{cart.total}</Amount>
                        </PriceList>
                        <PriceList>
                            <PriceDesc>Discount</PriceDesc>
                            <Amount color='green'>-₹1600</Amount>
                        </PriceList>
                        <PriceList>
                            <PriceDesc>Coupons for you</PriceDesc>
                            <Amount color='green'>-₹40</Amount>
                        </PriceList>
                        <PriceList>
                            <PriceDesc>Delivery Charges</PriceDesc>
                            <Amount color='green'>Free</Amount>
                        </PriceList>    
                        <PriceList>
                            <PriceDesc>Secure Packaging Fees</PriceDesc>
                            <Amount >₹40</Amount>
                        </PriceList>
                    </PriceSpec>
                    <Hr1/>
                    <Total>
                        <TotalDesc>Total Amount</TotalDesc>
                        <TotalAmt>₹{cart.total}</TotalAmt>
                    </Total>
                    <Hr1/>
                    <Savings>You will save ₹1600 on this order</Savings>
                </PriceWrapper>
                <Security>
                        <VerifiedUser/>Safe and Secure Payments.Easy returns. 100% Authentic products.
                </Security>
            </Right>
        </Wrapper>
    </Container>
    <Footer/>
    </>
  )
}

export default Cart;
