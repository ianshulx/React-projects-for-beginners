import React from 'react';
import styled from 'styled-components';
import Navbar from "../components/Navbar"
import Loginlogo from '../images/Loginlogo.png';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Container = styled.div`

`;
const Wrapper = styled.div`
  background:#FDEEEF;
  display:flex;
  align-items:center;
  justify-content:center;
  height:95vh;

`;
const Details = styled.div`
  height:85%;
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
const Title = styled.h2`
  margin:20px;
`;
const DetailsCont = styled.div`
  width:70%;
  padding:20px;
  background:;
  border:1px solid grey;
  margin-left:50px;
`;


const Text = styled.p`
  margin-bottom:5px;
  font-weight:600;
  font-size:16px;
`;

const Input = styled.input`
  width:95%;
  font-weight:500;
  font-size:15px;
  margin-bottom:10px;
  border: 2px solid lightgrey;
  padding:8px ;
  &:focus-visible {
    outline: none;
  } w
`;


const Terms = styled.p`
  font-size:16px;
  font-weight:500;
  margin:10px 0px;
`;

const Btn =styled.button`
  margin:10px 0px;  
  width:95%;  
  height:35px;
  font-size:16px;
  background:#FFA500;
  border:none;
  border-radius:5px;
  color:white;
`;


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    isAdmin:'',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  return (
    <Container>
      <Navbar/>
      <Wrapper>
        <Details>
            <Left>
              <Heading>Looks like you're new here!</Heading>
              <Desc>Sign up with mobile number or email to get started</Desc>
              <Image src={Loginlogo}/>
            </Left>
            <Right>
                <Title>CREATE ACCOUNT</Title>
                <DetailsCont>
                <form onSubmit={handleSubmit}>
                    <Text>Your Name</Text>
                    <Input
                      name='name'
                      placeholder='First and last name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Text>Username</Text>
                    <Input
                      name='username'
                      placeholder='Enter username'
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <Text>Email id</Text>
                    <Input
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <Text>Password</Text>
                    <Input
                      name='password'
                      placeholder='At least 8 characters'
                      type='password'
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Text>Is Admin</Text>
                    <Input
                      name='isAdmin'
                      placeholder='Enter true or false'
                      value={formData.isAdmin}
                      onChange={handleChange}
                      required
                    />
                    <Terms>
                      <input type='checkbox' required /> By signing up on MediSwift you accept our Terms & Conditions
                    </Terms>
                    <Btn type='submit'>Confirm</Btn>
                    <Btn>
                     <Link to={`/login`}>Already have an Account? Login</Link> 
                    </Btn>
              </form>
                </DetailsCont>

            </Right>
        </Details>
      </Wrapper>
    </Container>
  )
}

export default Register;
