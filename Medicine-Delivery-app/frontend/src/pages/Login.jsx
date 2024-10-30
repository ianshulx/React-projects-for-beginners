import React, { useState} from 'react';
import styled from 'styled-components';
import Navbar from "../components/Navbar"
import Loginlogo from '../images/Loginlogo.png'
import { login } from '../redux/apiCalls';
import { useDispatch,useSelector  } from 'react-redux';


const Container = styled.div`

`;
const Wrapper = styled.div`
  background:#FDEEEF;
  display:flex;
  align-items:center;
  justify-content:center;
  height:90vh;

`;
const Logsection = styled.div`
  height:80%;
  width:60%;
  background:white;
  display:flex;

`;

const Left = styled.div`
  flex:45%;
  background:#03B0BE;
  color:white;
`;

const Heading = styled.p`
  font-size:35px;
  font-weight:500;
  margin: 30px 20px 10px 20px;  
`;
const Desc = styled.p`
  opacity:0.75;
  font-size:18px;
  margin:20px;
 
`;

const Image = styled.img`
    height:400px;
    width:400px;
`;

const Right = styled.div`
  flex:55%;
`;
const DetailsWrapper = styled.div`
  margin-top:60px;
  display:flex;
  flex-direction:column; 
  margin-left:45px;
  width:80%;
`;
const Input = styled.input`
  width:100%;
  height:30px;
  font-size:16px;
  border:none;
  margin-top:25px;
  &:focus-visible {
    outline: none;
  } 
`;
const Text = styled.p`
  margin-top:30px;
  font-size:12px;
  color:grey;
`;

const OtpBtn = styled.button`
  margin-top:20px;
  height:40px;
  width:100%;
  font-size:20px;
  font-weight:500;
  background:orange;
  border:none;
  border-radius:5px;
  color:white;
  cursor:pointer;
`;

const Bottomline = styled.div`
  display:flex;
  justify-content:center;
  margin-top:50px;
  
`;
const BotText = styled.p`
  color: blue;
  font-weight:500;
`;
const Error = styled.span`
  color: red;
`;


const Login = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) =>{
    e.preventDefault()
    login(dispatch,{ username,password})
  }
  return (
    <Container>
      <Navbar/>
      <Wrapper>
        <Logsection>
            <Left>
              <Heading>Login</Heading>
              <Desc>Get access to your Orders,<br></br>Wishlist and Recommendations</Desc>
              <Image src={Loginlogo}/>
            </Left>
            <Right>
                <DetailsWrapper>
                  <Input placeholder='Enter Email/username' onChange={(e) => setUsername(e.target.value)}/>
                  <hr/>
                  <Input placeholder='Enter password'  onChange={(e) => setPassword(e.target.value)}/>
                  <hr/>
                  <Text>By continuing, you agree to MediSwift Terms of Use and Privacy Policy.</Text>
                  <OtpBtn onClick={handleClick} disabled={isFetching}>Continue</OtpBtn>
                  {error && <Error>Something went wrong...</Error>}
                  <Bottomline>
                    <BotText>New to MediSwift? Create an Account</BotText>
                  </Bottomline>
                </DetailsWrapper>
            </Right>
        </Logsection>
      </Wrapper>
    </Container>
  )
}

export default Login;

