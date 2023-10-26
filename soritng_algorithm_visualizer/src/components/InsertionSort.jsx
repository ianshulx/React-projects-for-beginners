import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const InsertionSort = () =>{
   const myState = useSelector(state => state.updateProps);
   const dispatch = useDispatch();

   let values = myState.values.map((item) => item[0]);
   let ids = myState.values.map((item) => item[1]);
   let timer = 0;
   let total_time = 0;
   let timing_map = new Map();

   for(let i = 0; i < values.length; i++){
      let j = i+1;
      while(j>0 && values[j]<values[j-1]){
         let temp = values[j];
         values[j] = values[j-1];
         values[j-1] = temp;
         total_time++;
         j--;
      }
      timing_map.set(i+1,i+1-j);
   }

   values = myState.values.map((item) => item[0]);
   
   const solve = () => {
      
      for(let i = 0; i < values.length-1; i++){
            let ind = i+1;

            while(ind>0 && values[ind]<values[ind-1]){

               let j = ind;

               let temp = values[j];
               values[j] = values[j-1];
               values[j-1] = temp;

               temp = ids[j];
               ids[j] = ids[j-1];
               ids[j-1] = temp;

               let new_ids = [...ids];
               
               setTimeout(() => {
                  
                  document.getElementById(new_ids[j]).style.transform = `translateX(${j*11}px)`;
                  document.getElementById(new_ids[j-1]).childNodes[1].style.backgroundColor = 'black';
                  
                  setTimeout(() => {
                     document.getElementById(new_ids[j-1]).childNodes[1].style.backgroundColor = myState.color;
                  },myState.speed-10);
                  
                  document.getElementById(new_ids[j-1]).style.transform = `translateX(${(j-1)*11}px)`;  
               },timer*myState.speed);

               timer++;
               ind--;
            }
      }
      
      setTimeout(() => {
         dispatch({
            type:'PLAY_PAUSE',
            _play:false
         })

         dispatch({
            type:'UPDATE_COLOR',
            color: 'rgb(0, 182, 0)'
         })
      },(total_time+1)*myState.speed+50);
   }
   
   useEffect(() => {
      if(myState.algorithm==='insertion'){
         if(myState.play)
            solve();
      }
   },[myState.play]);

   return <></>;
}

export default InsertionSort;