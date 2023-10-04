
import './App.css';

import {useState} from 'react'

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap';


// function getselectedvalue(){
//   var selectedvalue = document.getElementById('playto').value;
//   console.log(selectedvalue)
// }

function App() {

  


const [counter, setCounter]=useState(0)
const [count, setCount]=useState(0)
const [name, setName] = useState('')

const Reset=()=>{
  setCounter(0)
  setCount(0)
  p1button.disabled = false 
  p2button.disabled =false
  
}

const Display=()=>{
  let val = name;
 val= parseInt(val);

//winning vala display
if(counter === val ){

  if(counter<10)
return (
<p><span className='p1green'> 0{counter} </span> : <span className='p2red'>0{count}</span> </p>
)   
else
return (
  <p><span className='p1green'>{counter} </span> : <span className='p2red'>{count}</span> </p>
  )   
}
//normal vala display
if(count===val){
  if(count<10)
return (
<p><span className='p2red'> 0{counter} </span> : <span className='p2green'>0{count}</span> </p>
)   
else
return (
  <p><span className='p1green'>{counter} </span> : <span className='p2red'>{count}</span> </p>
  )   
}


   else if(counter < 10 && count < 10)
   return (
   <p> 0{counter} : 0{count} </p>
   )   
   else if(counter < 10 && count >= 10)
   return (
   <p > 0{counter} : {count} </p>
   )   
   else if(counter >= 10 && count < 10)
   return (
   <p > {counter} : 0{count} </p>
   )   
       else
        return (
        <p> {counter} : {count} </p>
        )
       

        
   
}



var p1button = document.querySelector('#player1');
var p2button = document.querySelector('#player2');

const Logic=()=>{

  // var element = document.getElementById("myDIV");
  // element.classList.add("mystyle");
  
  console.log("name",name);
  let val = name;
  
 val= parseInt(val);
 console.log("name , val",typeof(name),typeof(val)); //string,number
  if(counter === val && count < val){
  p1button.disabled = true 
  p2button.disabled = true 
  
  return (
  <p className="winner">WINNER : PLAYER 1</p>
  )}
  if(count === val && counter < val){
  p2button.disabled = true 
  p1button.disabled = true 
  return (
  <p className="winner">WINNER : PLAYER 2</p>
  )}
}





  return (
    <div className="App">
    

      <div class="card container mb-5" style={{width:'34rem',backgroundColor: '#bbbbbb'}}>
      <div class="card-header">
      
      <div className='displayscore' Display>
      <Display style={{fontFamily:'Gill Sans'}}/>

        </div>

        <Logic onChange={(event) => setName(event.target.value )}/>
  </div>        


  <img src="https://th.bing.com/th/id/R.2659c2b68507e1f0d169d03f1b655c82?rik=ka8PnSzCk5otbQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-Z0OmjMEt9n0%2fTwnOeyjSuJI%2fAAAAAAAAM6A%2fw-jgOZVfqh4%2fs1600%2fTennis%2bRacket%2bAnd%2bBalls_9710.jpg&ehk=pp7zUR1bIGmkAwRZCOOIKSgr4Mu8%2bAEv%2f55ms6mJMKI%3d&risl=&pid=ImgRaw&r=0" class="card-img-top" style={{height:'16em'}} />
  <div class="card-body">
    <h5 class="card-title">Let's Play</h5>
    <p class="card-text">Use the Buttons below to keep Score...</p>

    <select class="form-select" id='playto' aria-label="Default select example" onChange={(event) => setName(event.target.value)} onClick={Reset}>
  <option selected>Select Range</option>
  <option value="3" >3</option>
  <option value="5">5</option>
  <option value="10">10</option>
  <option value="12">12</option>
 
</select>

{/* <TheSelectComponent value={currentValue} onChange={(event) => setName(event.target.value)} /> */}


  </div>
</div>





<div class="container mt-3 mb-3">
<button type="button" class="btn m-2 col-2" id='player1' onClick={()=>setCounter(counter+1)} style={{backgroundColor:'rgb(255 12 144)'}}>Player1 + </button>
<button type="button" class="btn m-2 col-2" id="player2" onClick={()=>setCount(count+1)} style={{backgroundColor:'rgb(67 190 184)'}}>Player2 + </button>
</div>
<button type="button" class="btn btn-danger col-3 " onClick={Reset}> Reset </button>


    </div>
  );
}


export default App;
