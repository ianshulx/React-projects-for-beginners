import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product"

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchProductData(){
    setLoading(true);

    try{
      const res = await fetch(API_URL);
      const data = await res.json();

      setPosts(data);
    }
    catch(err){
      alert("Error");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect( () => {
    fetchProductData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {
        loading ? <Spinner /> : 
        posts.length > 0 ?
        (<div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh] mt-16">
          {
            posts.map( (post) => (
              <Product key={post.id} post={post} />
              ) )
              }
        </div>) :
        (<div className="flex justify-center items-center">
          <p>No data found</p>
        </div>)
      }

    </div>
  );
};

export default Home;
