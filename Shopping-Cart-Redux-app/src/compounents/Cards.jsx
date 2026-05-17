import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../services/reducer/reducer'

function Cards({ProductImage, dis,title,price,item}) {
  const dispatch = useDispatch((state)=>state.Cart)
  const HandleaddToCart= (item)=>{
    dispatch(addToCart(item))
  
  }
  
  
  return (
    <div className='my-3'>
        
<a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src= {ProductImage} alt=""/>
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>

        <p className="mb-3 font-normal  text-white">  {dis}</p>
        <p className=' font-bold text-2xl text-white'> Rs . {price} </p>
    <button className = " bg-white    text-black" onClick={()=>HandleaddToCart(item)} >ADD To cart</button>
    </div>
</a>

    </div>
  )
}

export default Cards
