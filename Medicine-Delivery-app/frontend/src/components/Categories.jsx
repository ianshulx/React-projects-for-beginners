import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import React , {useState} from 'react';
import styled from 'styled-components';
import CategoryHead from './CategoryHead';
import CategoryItem from './CategoryItem';
import { CategoryData, FeatureBrand,Offers } from '../categoriesdata';

const Container = styled.div`
  overflow:hidden;
  position:relative;
`;
const Wrapper = styled.div`
  height:30vh;
  width:100vw;
  ${'' /* background:yellow; */}
  display:flex;
  align-items:center;
  justify-content:center;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideindex * -100}px);
  position:relative;
`;

const Arrow = styled.div`
    cursor:pointer;
    width: 50px;
    height: 50px;
    display: flex;
    background:grey;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin: auto;
    opacity: 0.5;
    z-index: 2 ;
`
const Items = styled.div`
    height:100%;
    transition: all 1.5s ease;
    transform: translateX(${(props) => props.slideindex * -150}px);
    flex-direction:row;
    display:flex;
    flex-direction:row;

`;


const Categories = (props) => {
  const [slideIndex,setSlideIndex] = useState(-2)
  const handleClick = (direction)=>{
      if(direction==="left"){
        setSlideIndex(slideIndex>0 ? slideIndex -1 :2);
      }
      else{
        setSlideIndex(slideIndex<2 ? slideIndex +1 :-2);
      }
  }
  const { CategoryType,background } = props;
  let data ;
  switch(CategoryType){
    case 'CategoryData':
      data = CategoryData;
      break;

    case 'FeatureBrand':
      data = FeatureBrand;
      break;

    case 'Offers':
      data = Offers;
      break;

    default:
      data = CategoryData;
      break;
  }
  
  return (
    <Container style={{background:background}}>
      <CategoryHead Headingtext={props.Heading}  />
      <Wrapper >
        <Arrow style={{left:"30px"}}>
            <ArrowLeft onClick={()=>{ handleClick("left")}} />
        </Arrow>
        <Items slideindex={slideIndex} >    
              {
                data.map((item)=>(
                  <CategoryItem item={item} key={item.id} itemType={CategoryType} />
                ))
              }
        </Items>
        <Arrow style={{right :"30px"}} >
            <ArrowRight onClick={()=>{ handleClick("right")}}/>
        </Arrow>
        
      </Wrapper>
    </Container>
  )
}

export default Categories;
