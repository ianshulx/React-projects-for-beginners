import React, {useState}from "react";
import styled from "styled-components";
import "../index.css";
import {
  AccountCircle,
  KeyboardArrowDown,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import Logo from "../images/Logo.png";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import { logout } from "../redux/userRedux";
import axios from "axios";
import SearchDropDown from "../components/ShowDropDown"






const Container = styled.div`
  position: relative;
`;
const Wrapper = styled.div`
  height: 10vh;
  background: #03b0be;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Left = styled.div`
  flex: 20%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const Center = styled.div`
  flex: 45%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchWrapper = styled.div`
  height: 35px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
`;
const SerachInput = styled.input`
  width: 90%;
  height: 100%;
  border: none;
  font-size: 16px;
  &:focus-visible {
    outline: none;
  }
`;

const Img = styled.img`
  height: 90%;
  margin-left: 30px;
`;
const DeliveryPin = styled.div`
  color: white;
`;
const ExpDel = styled.div``;
const SelectPin = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
`;
const Right = styled.div`
  flex: 35%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 40px;
`;
const Button = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 2px;
  border: none;
  margin: 0px 15px;
  font-weight: 600;

  &:hover {
    color: white;
  }
`;
const Cart = styled.div`
  color: white;
`;
const Profile = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 15px;
`;
const Name = styled.div`
  font-size: 18px;
  margin: 0px 5px;
`;

const Navbar = () => {
  const quantity = useSelector(state=> state.cart.quantity);
  const user = useSelector(state=>state.user.currentUser);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState(""); // State to hold the search input value
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  const [showDropdown, setShowDropdown] = useState(false);


  const handleSearch = async () => {
    // Handle the search logic here, making an API call to fetch products based on searchInput
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/search?title=${searchInput}`
      );
      setSearchResults(response.data);
      setShowDropdown(response.data.length > 0);
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  const handleSearchIconClick = () => {
    // Toggle the dropdown when the search icon is clicked
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };
  
  const handleLogout = () => {
    dispatch(logout()); 
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Img src={Logo} />
        </Left>
        <Center>
        <SearchWrapper>
            <SerachInput
              type="text"
              placeholder="Search Medicines/Healthcare Products"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            ></SerachInput>
            <Search onClick={handleSearch} />
            {showDropdown && <SearchDropDown results={searchResults} />}
        </SearchWrapper>
          <DeliveryPin>
            <ExpDel>Express Delivery to</ExpDel>
            <SelectPin>
              Select Pincode <KeyboardArrowDown />
            </SelectPin>
          </DeliveryPin>
        </Center>
        <Right>
        {user ? (
            // User is logged in, show Logout button
            <>
              <Button onClick={handleLogout}>Logout</Button>
              <Profile>
                <AccountCircle />
                <Name>{user.name}</Name>
              </Profile>
            </>
          ) : (
            // User is not logged in, show Register and Login buttons
            <>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </>
          )}
          <Link to="/cart">
            <Cart>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCart />
              </Badge>
            </Cart>
          </Link>
        </Right>
      </Wrapper>
            
    </Container>
  );
};

export default Navbar;
