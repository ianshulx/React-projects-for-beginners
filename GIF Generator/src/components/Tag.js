import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import useGif from '../hooks/useGif';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Tag = () => {
    const [gif, setGif] = useState('');
    const [loading, setLoading] = useState(false);
    const [tag, setTag] = useState('');
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;

    async function fetchData(){
      setLoading(true);
      const {data} = await axios.get(url);
      const imageSource = data.data.images.downsized_large.url;
      setGif(imageSource);
      setLoading(false);
    }
    
    // CURIOSITY
    // const a = {};
    // a.a1 = {
    //   name:"Raj",
    //   age:15,
    //   class:"5th"
    // };
    // a.a2 = {
    //   name:"rahul",
    //   age:16,
    //   class:"6th"
    // };
    // const {a2} = a;
    // console.log(a2); 

    useEffect(() => {
      fetchData();
    }, [])
    
    // const {gif, loading, fetchData} = useGif(tag);

    // function clickHandler(){
    //   fetchData();
    // }

  return (
    <div className='w-full bg-blue-400 rounded-lg border border-black flex 
    flex-col items-center gap-y-5 mt-[15px]'>
        <h1 className='text-2xl underline uppercase font-bold pt-2'>
          Random {tag} GIF
        </h1>
         {
          loading ? (<Spinner />) : (<img src={gif} width="450" />)
         }
        <input 
          className='w-10/12 text-lg py-2 rounded-lg text-center'
          value={tag}
          onChange={(event) => setTag(event.target.value)}
        />
        <button onClick={() => fetchData()}
        className='w-10/12 bg-orange-100 text-lg py-2 rounded-lg mb-[20px]'>
            Generate
        </button>
    </div>
  )
}

export default Tag