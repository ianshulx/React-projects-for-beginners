import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const QuickSort = () =>{
   const myState = useSelector(state => state.updateProps);
   const dispatch = useDispatch();

   let values = myState.values.map((item) => item[0]);
   let ids = myState.values.map((item) => item[1]);

   const swap = (arr,i,j) => {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
   }

   const partition = (values,ids,l,r,timer) => {
      let pivot = values[r];

      let j = l-1;
      for(let i = l; i < r; i++){
         if(values[i]<pivot){
            j++;
            swap(values,i,j);
            swap(ids,i,j);
            document.getElementById(ids[i]).style.transform = `translateX(${i*11}px)`;
            document.getElementById(ids[j]).style.transform = `translateX(${j*11}px)`;
         }
      }
      swap(values,r,j+1);
      swap(ids,r,j+1);

      setTimeout(() => {

         document.getElementById(ids[j+1]).childNodes[1].style.backgroundColor = 'black';
         setTimeout(() => {
            document.getElementById(ids[j+1]).childNodes[1].style.backgroundColor = myState.color;
         },myState.speed*6-10)

         document.getElementById(ids[r]).style.transform = `translateX(${r*11}px)`;
         document.getElementById(ids[j+1]).style.transform = `translateX(${(j+1)*11}px)`;

      },myState.speed*timer*6);
      return j+1;
   }

   const quickSort = (values,ids,l,r,timer) => {
      if(l<r){
         let ind = partition(values,ids,l,r,timer);
         quickSort(values,ids,l,ind-1,timer-1);
         quickSort(values,ids,ind+1,r,timer-1);
      }
   }
   
   const solve = () => {

      quickSort(values,ids,0,values.length-1,Math.ceil(Math.log(values.length+1)));

      setTimeout(() => {
         dispatch({
            type:'PLAY_PAUSE',
            _play:false
         })

         dispatch({
            type:'UPDATE_COLOR',
            color: 'rgb(0, 182, 0)'
         })
      },6*myState.speed*(1+Math.ceil(Math.log(values.length+1)))+100);
   }
   
   useEffect(() => {
      if(myState.algorithm==='quick'){
         if(myState.play)
            solve();
      }
   },[myState.play]);

   return <></>;
}

export default QuickSort;