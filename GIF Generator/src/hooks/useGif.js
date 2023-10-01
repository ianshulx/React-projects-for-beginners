import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

const useGif = (tag) => {
    const [gif, setGif] = useState('');
    const [loading, setLoading] = useState(false);

    async function fetchData(){
      setLoading(true);
      const {data} = await axios.get(tag ? `${url}&tag=${tag}` : url);
      const imageSource = data.data.images.downsized_large.url;
      setGif(imageSource);
      setLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, [])

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

    return {gif, loading, fetchData}  
}

export default useGif